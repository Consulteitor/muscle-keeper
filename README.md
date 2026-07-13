# Muscle Keeper

App per a persones en tractament amb fàrmacs GLP-1 (Ozempic, Wegovy, Mounjaro...) que ajuda a preservar massa muscular durant la pèrdua de pes.

**Abast d'aquest repo, ara mateix:** el primer lliurable acordat — landing + quiz de diagnòstic de 12 passos + captura d'email a Supabase, en castellà/català/anglès. Res de motor d'entrenament, receptes ni biblioteca d'exercicis encara: la idea és validar conversió abans de construir la resta (vegeu `projectes/muscle-keeper/projecte.md` al repo `hq`).

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind v4)
- [next-intl](https://next-intl.dev) per a i18n (`es` per defecte, `ca`, `en`)
- Supabase (només per capturar el lead del quiz — taula `leads`, RLS només-insert)

## Desenvolupament local

```bash
npm install
cp .env.example .env.local   # emplena les claus de Supabase (vegeu més avall)
npm run dev
```

## Configurar Supabase (pendent, cal fer-ho un cop)

1. Crea un projecte nou a [supabase.com](https://supabase.com), regió UE.
2. A l'SQL Editor, executa el contingut de `supabase/migrations/0001_leads.sql`.
3. A Project Settings → API, copia `Project URL` i `anon public key` a `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
4. La taula `leads` té RLS activat amb una única policy: el rol `anon` pot fer `insert`, mai `select`/`update`/`delete`. No cal (ni s'ha de) fer servir la `service_role key` en aquest repo.

## Desplegar a Vercel (pendent, cal fer-ho un cop)

1. A [vercel.com/new](https://vercel.com/new), importa el repo `Consulteitor/muscle-keeper`.
2. Framework preset: Next.js (detectat automàticament).
3. Afegeix les env vars (Production + Preview): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, i opcionalment `NEXT_PUBLIC_CONTACT_EMAIL` (email de contacte mostrat a `/privacy`; sense configurar es mostra un placeholder visible en lloc d'un email inventat).
4. Deploy. Els següents `git push` a `main` desplegaran sols.

## Estructura

```
src/
  app/[locale]/        landing, /quiz, /privacy — routing per idioma
  components/quiz/      wizard de 12 passos, gate d'email, pantalla de resultat
  lib/diagnostic.ts     càlcul del diagnòstic (estimació, no clínic)
  lib/supabase/client.ts
  messages/{es,ca,en}.json
supabase/migrations/    esquema SQL (taula leads)
```

## Notes

- Els números del diagnòstic són una **estimació orientativa** basada en patrons generals (percentatge de massa magra perduda segons freqüència d'entrenament previ i edat), no un càlcul clínic. Es mostra sempre amb avís, tal com exigeix `CLAUDE.md` de `hq`.
- Cap dada de dosificació ni consell mèdic al copy — regla bloquejant del projecte.
