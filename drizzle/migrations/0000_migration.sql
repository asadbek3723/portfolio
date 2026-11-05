create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

-- Owner email becomes admin automatically on account creation
create or replace function public.grant_owner_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if lower(new.email) = 'hello@asadbek.uz' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users
for each row execute function public.grant_owner_admin();

create table public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "Public reads site content" on public.site_content for select to anon, authenticated
  using (key not in ('history', 'media'));
create policy "Admins read all content" on public.site_content for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "Admins insert content" on public.site_content for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update content" on public.site_content for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete content" on public.site_content for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  subject text not null default '' check (char_length(subject) <= 300),
  body text not null check (char_length(body) between 1 and 5000),
  read boolean not null default false,
  created_at timestamptz not null default now()
);
grant insert on public.messages to anon, authenticated;
grant select, update, delete on public.messages to authenticated;
grant all on public.messages to service_role;
alter table public.messages enable row level security;
create policy "Anyone can send a message" on public.messages for insert to anon, authenticated with check (read = false);
create policy "Admins read messages" on public.messages for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update messages" on public.messages for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete messages" on public.messages for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

alter publication supabase_realtime add table public.site_content;