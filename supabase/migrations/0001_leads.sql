-- Taula de captura d'email del quiz de diagnòstic (primer lliurable).
-- No conté dades d'usuari autenticat -- això vindrà amb el motor d'entrenament (fase 2).
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  locale text not null default 'es',
  answers jsonb not null,
  diagnostic jsonb not null,
  consent_health_data boolean not null default false,
  consent_marketing boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- El formulari públic només pot INSERIR el seu propi lead, mai llegir/actualitzar/esborrar dades.
create policy "anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);
