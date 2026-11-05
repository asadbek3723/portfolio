# Asadbek Jumanazarov — Portfolio

Personal portfolio built with TanStack Start (React 19, Vite, Tailwind CSS 4) and Supabase.
Content is stored in Supabase (one table per collection), images and the CV in Supabase Storage,
and the site is managed from a built-in admin panel at `/admin`.

## Stack
- React 19, TypeScript, TanStack Start / Router, Tailwind CSS 4, Framer Motion
- Supabase: Postgres + Row Level Security, Auth (admin role), Storage, Realtime
- Optional AI helper in the admin ("AI bilan yaxshilash") via `LOVABLE_API_KEY` or `OPENAI_API_KEY`

## Getting started
```sh
bun install
bun run dev        # http://localhost:5173
```

Public Supabase settings are in `.env`. Server-only secrets go in `.env.local` (git-ignored); see `.env.example`.

## Database
```sh
bun run db:migrate   # apply supabase/migrations/*.sql (needs SUPABASE_DB_URL)
bun run db:seed      # upload images + write built-in content (use -- --force to overwrite)
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='...' bun run db:admin   # create the admin account
```

## Scripts
| Command | What it does |
| --- | --- |
| `bun run dev` | Development server |
| `bun run build` | Production build |
| `bun run test` | Unit tests (Vitest) |

## Deploy (Vercel)
`vercel.json` builds with the Vercel preset (`NITRO_PRESET=vercel`). Set `VITE_SUPABASE_URL` and
`VITE_SUPABASE_PUBLISHABLE_KEY` (already in `.env`) and, for the admin AI page, `OPENAI_API_KEY`.
