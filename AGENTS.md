<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Ported portfolio code lives in src/portfolio and navigates via src/lib/router-compat.tsx (string-based Link/useParams over TanStack Router); route files in src/routes only wire pages and head metadata. Why: keeps migrated components unchanged.
- AI calls live in src/lib/*.server.ts (AI Gateway, Responses API, streamed) behind createServerFn wrappers in *.functions.ts; model output is validated against portfolioData before returning. Why: keeps the key server-side and prevents invented items.
- Detail-page share metadata comes from src/lib/seo.ts detailHead(); share images are 1200x630 copies in public/og named after the source asset. Why: one place for per-item SEO.
- Admin routes use a dedicated /admin layout and shared schema-driven editors in src/admin; portfolio and admin read the same repository/store interface. Why: isolates administration styling and allows a future backend adapter without rewriting pages.
- Admin content is stored in Supabase (see the backend bullet); localStorage only caches it in the browser, and the inbox is never cached there. Admin access is enforced by RLS and `has_role`, while the /admin route guard is UX only. Why: real authorization lives in the database, not in client code.
- Admin login is Supabase email/password plus an admin `user_roles` row; sign-out clears the session and cached content. The public contact form saves via the `sendContactMessage` server function (rate limit + honeypot) and `/match` is rate limited per IP. Why: public endpoints that write data or spend AI credits must be throttled server-side.
- Home portrait media is imported through a CDN asset pointer and experience is defined in a browser-safe presentation module. Why: avoids repository binaries and keeps the displayed experience testable.
- Backend is the user's own Supabase project (odckcrbdompiaqvfdxlb): schema in supabase/migrations, scripts in scripts/ (`bun run db:migrate | db:seed | db:admin`), secrets only in .env.local. Each collection has its own table (projects, services, blog_posts, skills, certificates, achievements, events, gallery_items, testimonials, faq_items, timeline_items, uses_items, plus profile, site_settings, seo_entries, media_assets, change_history, messages); src/admin/data/tables.ts maps items to rows (unlisted fields go to `extra` jsonb) and remote.ts syncs only changed rows. Images live in the public `media` Storage bucket and content stores their URLs; admin = user_roles row. Why: replaces the Lovable Cloud database; separate tables keep data queryable and the migration, not a hardcoded email, decides who is admin.
