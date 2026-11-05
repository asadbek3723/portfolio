-- Portfolio content: one table per collection (replaces the single site_content table).
-- Every list table shares: id, position (display order), status, extra (fields without a column), timestamps.

drop table if exists public.site_content;

create table if not exists public.profile (
  id int primary key default 1 check (id = 1),
  name text not null,
  role jsonb, bio jsonb,
  email text, phone text,
  location jsonb, socials jsonb, stats jsonb,
  cv_url text, portrait text,
  available boolean not null default true,
  extra jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  site_name text not null,
  default_lang text not null default 'uz' check (default_lang in ('uz', 'en', 'ru')),
  hidden_sections text[] not null default '{}',
  admin_theme text not null default 'dark' check (admin_theme in ('dark', 'light')),
  updated_at timestamptz not null default now()
);

create table if not exists public.seo_entries (
  path text primary key,
  title text not null default '',
  description text not null default '',
  image text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id text primary key, position int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  slug text, featured boolean not null default false, year int, category text,
  title jsonb, summary jsonb, problem jsonb, solution jsonb,
  stack text[] not null default '{}', cover text, images text[] not null default '{}',
  live_url text, repo_url text,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id text primary key, position int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  slug text, icon text, title jsonb, tagline jsonb, description jsonb, price jsonb, timeline jsonb, cover text,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id text primary key, position int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  slug text, published_on text, read_min int, tags text[] not null default '{}',
  title jsonb, excerpt jsonb, body jsonb,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id text primary key, position int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  name text, category text, level int,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id text primary key, position int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  slug text, title text, issuer text, issued_on text, skills text[] not null default '{}',
  credential_id text, hours int, verify_url text, image text,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

create table if not exists public.achievements (
  id text primary key, position int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  slug text, awarded_on text, title jsonb, description jsonb, place jsonb, cover text,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id text primary key, position int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  slug text, title text, location text, event_date text, role jsonb, description jsonb, cover text,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id text primary key, position int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  src text, caption jsonb,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id text primary key, position int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  name text, role text, quote jsonb,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

create table if not exists public.faq_items (
  id text primary key, position int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  question jsonb, answer jsonb,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

create table if not exists public.timeline_items (
  id text primary key, position int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  period text, title jsonb, place text, description jsonb,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

create table if not exists public.uses_items (
  id text primary key, position int not null default 0,
  status text not null default 'published' check (status in ('published', 'draft')),
  group_name text, name text, note jsonb,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

-- Admin-only tables ---------------------------------------------------------------
create table if not exists public.media_assets (
  id text primary key, position int not null default 0,
  name text, src text, size int, path text,
  created_at timestamptz not null default now(),
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

create table if not exists public.change_history (
  id text primary key, position int not null default 0,
  at timestamptz not null default now(), who text, action text, collection text, label text,
  extra jsonb not null default '{}', updated_at timestamptz not null default now()
);

-- Row Level Security -------------------------------------------------------------
do $$
declare t text;
begin
  -- list tables with a publish status: public reads published rows, admins do everything
  foreach t in array array['projects','services','blog_posts','skills','certificates','achievements',
                           'events','gallery_items','testimonials','faq_items','timeline_items','uses_items']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('drop policy if exists "Public reads published" on public.%I', t);
    execute format('create policy "Public reads published" on public.%I for select to anon, authenticated using (status = ''published'')', t);
    execute format('drop policy if exists "Admins manage" on public.%I', t);
    execute format('create policy "Admins manage" on public.%I for all to authenticated using (public.has_role(auth.uid(), ''admin'')) with check (public.has_role(auth.uid(), ''admin''))', t);
  end loop;

  -- always public: profile, settings, seo
  foreach t in array array['profile','site_settings','seo_entries']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('drop policy if exists "Public reads" on public.%I', t);
    execute format('create policy "Public reads" on public.%I for select to anon, authenticated using (true)', t);
    execute format('drop policy if exists "Admins manage" on public.%I', t);
    execute format('create policy "Admins manage" on public.%I for all to authenticated using (public.has_role(auth.uid(), ''admin'')) with check (public.has_role(auth.uid(), ''admin''))', t);
  end loop;

  -- admin only: media library and change history
  foreach t in array array['media_assets','change_history']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('drop policy if exists "Admins manage" on public.%I', t);
    execute format('create policy "Admins manage" on public.%I for all to authenticated using (public.has_role(auth.uid(), ''admin'')) with check (public.has_role(auth.uid(), ''admin''))', t);
  end loop;

  -- realtime: the public site refreshes when content changes
  foreach t in array array['profile','site_settings','seo_entries','projects','services','blog_posts','skills',
                           'certificates','achievements','events','gallery_items','testimonials','faq_items',
                           'timeline_items','uses_items']
  loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then null; end;
  end loop;
end $$;
