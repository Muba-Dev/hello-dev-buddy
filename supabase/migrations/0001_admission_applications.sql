-- Applications submitted from the public admission form.
-- Only inserts are allowed: applicants (and the public) cannot read submissions.
create table if not exists public.admission_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  age integer not null check (age between 4 and 99),
  phone text not null,
  email text,
  gender text not null check (gender in ('female', 'male')),
  program_slug text not null,
  home_address text not null,
  previous_education text,
  emergency_contact text not null
);

alter table public.admission_applications enable row level security;

create policy "Anyone can submit an admission application"
  on public.admission_applications
  for insert
  to anon, authenticated
  with check (true);
