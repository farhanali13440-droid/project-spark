create type public.app_role as enum ('admin');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.assign_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users
for each row execute function public.assign_first_admin();

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 100),
  whatsapp text not null check (char_length(whatsapp) between 10 and 20),
  method text not null check (method in ('jazzcash','easypaisa','bank')),
  transaction_id text not null check (char_length(transaction_id) between 3 and 100),
  screenshot_path text not null,
  amount integer not null default 499,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  admin_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
grant insert on public.payments to anon, authenticated;
grant select, update on public.payments to authenticated;
grant all on public.payments to service_role;
alter table public.payments enable row level security;
create policy "Anyone can submit pending payment" on public.payments for insert to anon, authenticated
  with check (status = 'pending' and amount = 499 and admin_note is null and reviewed_at is null);
create policy "Admins read payments" on public.payments for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update payments" on public.payments for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "Anyone can upload screenshots" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'payment-screenshots');
create policy "Admins view screenshots" on storage.objects for select to authenticated
  using (bucket_id = 'payment-screenshots' and public.has_role(auth.uid(), 'admin'));