# Darul-Huda Wal-Furquran — school website & MCP tools

A Vite + React + TypeScript site for an Arabic and Islamic studies school, with
a set of read-only MCP tools that expose the same public information to AI
clients.

> The school details in `src/data/school.ts` are placeholders. Replace them with
> real details before publishing.

## Stack

- React 18, React Router 7, TypeScript
- Zod 4 for validation shared by the form, MCP tool and edge function
- Tailwind CSS + shadcn/ui (Radix primitives)
- Supabase Auth and Postgres
- `@lovable.dev/mcp-js` for the MCP definition and the Supabase edge function
- Vite 8

## Getting started

Requires Node.js 22 or newer.

```sh
npm install
cp .env.example .env   # then fill in the Supabase values
npm run dev
```

The dev server runs on <http://localhost:8080>.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server with HMR |
| `npm run build` | Type-aware production build; also regenerates the MCP edge function |
| `npm run check` | TypeScript + ESLint + tests (use this before committing) |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | ESLint only |
| `npm test` | Content-consistency and validation tests |
| `npm run preview` | Preview the production build |

## Architecture

```
src/data/school.ts          single source of truth for content, contact and terms
src/lib/admission.ts        shared Zod validation + phone rules + field metadata
src/lib/admin.ts            pipeline statuses, SLA and admin display helpers
src/lib/mcp/data.ts         MCP adapters derived from the shared modules
src/lib/mcp/tools/*         four read-only MCP tools
src/pages/Admission.tsx     public form + conditional logic + receipt view
src/pages/admin/Admissions.tsx  staff pipeline (filter, placement, fees, audit)
src/components/AdminRoute.tsx   session + admin-allowlist route guard
src/layouts/MainLayout.tsx  shared banner / header / footer via <Outlet />
src/config/navigation.ts    single source for header and footer links
```

Pages import content directly from `src/data/school.ts`; there is no client-side
fetch layer for content. The admission form's only write path is the
`submit-admission` edge function — direct public inserts are revoked.

### Admission applications

Apply the migrations in order:

```sh
supabase db push
# supabase/migrations/0001_admission_applications.sql
# supabase/migrations/0002_admissions_pipeline.sql
```

`0002` adds the pipeline statuses (`NEW → CONTACTED → PLACEMENT_DONE →
ENROLLED`, plus `ARCHIVED`), admin-only placement/payment fields, an audit log,
and RLS that lets only allowlisted admins read or update applications.

Deploy the submission endpoint and set its secrets:

```sh
supabase functions deploy submit-admission
supabase secrets set RESEND_API_KEY=... ADMISSION_ALERT_EMAIL=info@darulhuda.ng
# optional: NOTIFICATION_FROM_EMAIL, WHATSAPP_TOKEN, WHATSAPP_PHONE_ID,
#           ADMISSIONS_WHATSAPP_NUMBER, WHATSAPP_API_VERSION
```

The function imports the shared Zod schema from `src/lib/admission.ts`, so
client and server validation cannot drift. It normalises Nigerian phone
numbers, drops honeypot submissions, deduplicates identical name + phone within
24 hours (returning the original reference), generates a `DHF-YYYY-NNNN`
reference from a database sequence, and sends best-effort admin/applicant
notifications. Notification failures never lose an application.

#### Granting staff access

Create a Supabase Auth user for each staff member, then add their ID to the
allowlist:

```sql
insert into public.admin_users (user_id)
select id from auth.users where email = 'staff@darulhuda.ng';
```

They can then sign in at `/login` and open `/admin/admissions`. The dashboard
mirrors the five public steps, flags `NEW` applications against the three-working-day
call SLA, and records every status, placement and payment change in
`admission_audit_log`.

`src/integrations/supabase/types.ts` contains matching generated types;
regenerate it from the live schema when the Supabase CLI is available.

### MCP edge function

`supabase/functions/mcp/index.ts` is **generated** by the Vite plugin during
`npm run build` and is deliberately gitignored. Deploy the function from a
POSIX environment after building:

```sh
npm run build
supabase functions deploy mcp
```

The generator currently mis-bundles on Windows (it emits an absolute `npm:`
path for the entry), so do not deploy a function generated there.

## Configuration

`.env` is ignored; only `.env.example` is committed. Required client variables:

- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

The office phone number in `src/data/school.ts` is a **placeholder**; all
`tel:` and WhatsApp links derive from `SCHOOL_PHONE`, so replace that one value
before publishing. The terms dialog text and other school details in that file
are placeholders too.
