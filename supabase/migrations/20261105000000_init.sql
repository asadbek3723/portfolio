-- Portfolio backend part 1: roles, contact messages and the public media bucket.
-- Content tables live in the next migration. Safe to re-run.

do $$ begin
  create type public.app_role as enum ('admin', 'user');
exception when duplicate_object then null; end $$;

-- Roles ---------------------------------------------------------------------
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
alter table public.user_roles enable row level security;
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
drop policy if exists "Users read own roles" on public.user_roles;
create policy "Users read own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;
revoke all on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;

-- Contact messages ------------------------------------------------------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  subject text not null default '' check (char_length(subject) <= 300),
  body text not null check (char_length(body) between 1 and 5000),
  read boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;
grant insert on public.messages to anon, authenticated;
grant select, update, delete on public.messages to authenticated;
grant all on public.messages to service_role;

drop policy if exists "Anyone can send a message" on public.messages;
create policy "Anyone can send a message" on public.messages
  for insert to anon, authenticated with check (read = false);
drop policy if exists "Admins read messages" on public.messages;
create policy "Admins read messages" on public.messages
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
drop policy if exists "Admins update messages" on public.messages;
create policy "Admins update messages" on public.messages
  for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
drop policy if exists "Admins delete messages" on public.messages;
create policy "Admins delete messages" on public.messages
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Media bucket (public read, admin write) --------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880,
        array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'application/pdf'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins list media" on storage.objects;
create policy "Admins list media" on storage.objects
  for select to authenticated
  using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
drop policy if exists "Admins upload media" on storage.objects;
create policy "Admins upload media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
drop policy if exists "Admins update media" on storage.objects;
create policy "Admins update media" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
drop policy if exists "Admins delete media" on storage.objects;
create policy "Admins delete media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
