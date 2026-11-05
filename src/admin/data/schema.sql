-- Prepared schema for moving admin content to the database (NOT applied yet).
-- Each collection is stored as JSON documents so the existing types map 1:1.
create type public.app_role as enum ('admin', 'editor');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create table public.content_items (
  id text not null,
  collection text not null,
  position int not null default 0,
  status text not null default 'published' check (status in ('published','draft')),
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (collection, id)
);
grant select on public.content_items to anon, authenticated;
grant insert, update, delete on public.content_items to authenticated;
grant all on public.content_items to service_role;
alter table public.content_items enable row level security;
create policy "public reads published" on public.content_items for select to anon, authenticated using (status = 'published');
create policy "admins read all" on public.content_items for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admins write" on public.content_items for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.site_settings (key text primary key, value jsonb not null);
grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "public reads settings" on public.site_settings for select to anon, authenticated using (true);
create policy "admins write settings" on public.site_settings for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, subject text, body text not null,
  read boolean not null default false, starred boolean not null default false, archived boolean not null default false,
  created_at timestamptz not null default now()
);
grant insert on public.messages to anon, authenticated;
grant select, update, delete on public.messages to authenticated;
grant all on public.messages to service_role;
alter table public.messages enable row level security;
create policy "anyone can send" on public.messages for insert to anon, authenticated with check (true);
create policy "admins manage messages" on public.messages for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.content_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null, collection text not null, label text, at timestamptz not null default now()
);
grant select, insert on public.content_history to authenticated;
grant all on public.content_history to service_role;
alter table public.content_history enable row level security;
create policy "admins history" on public.content_history for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
