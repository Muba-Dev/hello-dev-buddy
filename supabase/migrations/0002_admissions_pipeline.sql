-- Admissions pipeline: statuses, admin-only fields, audit trail and RLS.
-- Applied after 0001_admission_applications.sql.

-- Enum types (guarded so the migration is safe to re-run).
do $$ begin
  create type public.admission_status as enum
    ('NEW', 'CONTACTED', 'PLACEMENT_DONE', 'ENROLLED', 'ARCHIVED');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.payment_status as enum ('UNPAID', 'PAID');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.payment_method as enum ('CASH_AT_OFFICE', 'BANK_TRANSFER');
exception when duplicate_object then null; end $$;

-- Human-readable reference numbers, e.g. DHF-2026-0042. The sequence is
-- database-owned so concurrent submissions cannot produce the same value.
create sequence if not exists public.admission_reference_seq;

create or replace function public.generate_admission_reference()
returns text
language sql
volatile
set search_path = public
as $$
  select 'DHF-' || to_char(now(), 'YYYY') || '-' ||
         lpad(nextval('public.admission_reference_seq')::text, 4, '0');
$$;

-- Operational columns.
alter table public.admission_applications
  add column if not exists reference_id text unique,
  add column if not exists guardian_name text,
  add column if not exists status public.admission_status not null default 'NEW',
  add column if not exists assigned_level text,
  add column if not exists teacher_notes text,
  add column if not exists payment_status public.payment_status not null default 'UNPAID',
  add column if not exists payment_method public.payment_method,
  add column if not exists receipt_note text,
  add column if not exists payment_verified_at timestamptz,
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists updated_by uuid references auth.users(id) on delete set null,
  add column if not exists agreed_to_terms boolean not null default false;

-- Fill references for any rows created before this migration.
update public.admission_applications
  set reference_id = public.generate_admission_reference()
  where reference_id is null;

alter table public.admission_applications
  alter column reference_id set not null,
  alter column reference_id set default public.generate_admission_reference();

-- Replace the original age bound and add cross-field guarantees.
alter table public.admission_applications
  drop constraint if exists admission_applications_age_check;
alter table public.admission_applications
  add constraint admission_applications_age_check check (age between 4 and 100);

alter table public.admission_applications
  drop constraint if exists admission_applications_terms_check;
alter table public.admission_applications
  add constraint admission_applications_terms_check check (agreed_to_terms);

alter table public.admission_applications
  drop constraint if exists admission_applications_guardian_check;
alter table public.admission_applications
  add constraint admission_applications_guardian_check
  check (age >= 18 or (guardian_name is not null and length(btrim(guardian_name)) >= 3));

alter table public.admission_applications
  drop constraint if exists admission_applications_payment_check;
alter table public.admission_applications
  add constraint admission_applications_payment_check
  check (
    payment_status = 'UNPAID' or
    (payment_verified_at is not null and payment_method is not null)
  );

create index if not exists admission_applications_status_created_idx
  on public.admission_applications (status, created_at desc);
create index if not exists admission_applications_dedup_idx
  on public.admission_applications (lower(full_name), phone, created_at desc);

-- Admin allowlist. Populate manually: insert into public.admin_users (user_id)
-- select id from auth.users where email = 'staff@darulhuda.ng';
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

-- SECURITY DEFINER so RLS on admin_users cannot recurse when policies call it.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

-- Immutable audit trail of every status, placement and payment change.
create table if not exists public.admission_audit_log (
  id bigint generated always as identity primary key,
  application_id uuid not null
    references public.admission_applications(id) on delete cascade,
  changed_by uuid references auth.users(id) on delete set null,
  action text not null,
  from_status public.admission_status,
  to_status public.admission_status,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.admission_audit_log enable row level security;

create or replace function public.log_admission_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if TG_OP = 'INSERT' then
    insert into public.admission_audit_log (application_id, changed_by, action, to_status, details)
    values (NEW.id, auth.uid(), 'CREATED', NEW.status,
            jsonb_build_object('reference_id', NEW.reference_id));
    return NEW;
  end if;

  NEW.updated_at := now();
  NEW.updated_by := auth.uid();

  if NEW.status is distinct from OLD.status then
    insert into public.admission_audit_log
      (application_id, changed_by, action, from_status, to_status)
    values (NEW.id, auth.uid(), 'STATUS_CHANGED', OLD.status, NEW.status);
  end if;

  if NEW.assigned_level is distinct from OLD.assigned_level then
    insert into public.admission_audit_log (application_id, changed_by, action, details)
    values (NEW.id, auth.uid(), 'PLACEMENT_SET',
            jsonb_build_object('assigned_level', NEW.assigned_level));
  end if;

  if NEW.payment_status is distinct from OLD.payment_status then
    insert into public.admission_audit_log (application_id, changed_by, action, details)
    values (NEW.id, auth.uid(), 'PAYMENT_UPDATED',
            jsonb_build_object('payment_status', NEW.payment_status,
                               'payment_method', NEW.payment_method,
                               'receipt_note', NEW.receipt_note));
  end if;

  return NEW;
end;
$$;

drop trigger if exists admission_applications_audit on public.admission_applications;
create trigger admission_applications_audit
  before insert or update on public.admission_applications
  for each row execute function public.log_admission_change();

-- Permissions ---------------------------------------------------------------
-- Direct public writes are disabled: every submission must go through the
-- submit-admission edge function, which validates, deduplicates and notifies.
revoke all on public.admission_applications from anon, authenticated;
grant select, update on public.admission_applications to authenticated;

drop policy if exists "Anyone can submit an admission application"
  on public.admission_applications;

drop policy if exists "Admins can read applications" on public.admission_applications;
create policy "Admins can read applications"
  on public.admission_applications for select to authenticated
  using (public.is_admin());

drop policy if exists "Admins can update applications" on public.admission_applications;
create policy "Admins can update applications"
  on public.admission_applications for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

grant execute on function public.is_admin() to authenticated;

revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;
drop policy if exists "Admins can view admin list" on public.admin_users;
create policy "Admins can view admin list"
  on public.admin_users for select to authenticated
  using (public.is_admin());

revoke all on public.admission_audit_log from anon, authenticated;
grant select on public.admission_audit_log to authenticated;
drop policy if exists "Admins can read audit log" on public.admission_audit_log;
create policy "Admins can read audit log"
  on public.admission_audit_log for select to authenticated
  using (public.is_admin());
