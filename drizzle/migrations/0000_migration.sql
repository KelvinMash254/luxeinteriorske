-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "Users read own roles" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create or replace function public.handle_new_user_role()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if lower(new.email) = 'luxeinteriorskenyake@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  end if;
  return new;
end;
$$;
create trigger on_auth_user_created_role after insert on auth.users
  for each row execute function public.handle_new_user_role();

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  location text,
  summary text not null default '',
  overview text not null default '',
  concept text not null default '',
  requirements text not null default '',
  materials text[] not null default '{}',
  cover_image text,
  is_sample boolean not null default false,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.projects to anon;
grant select, insert, update, delete on public.projects to authenticated;
grant all on public.projects to service_role;
alter table public.projects enable row level security;
create policy "Public reads published projects" on public.projects for select to anon, authenticated
  using (published = true or public.has_role(auth.uid(), 'admin'));
create policy "Admins insert projects" on public.projects for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update projects" on public.projects for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete projects" on public.projects for delete to authenticated using (public.has_role(auth.uid(), 'admin'));
create trigger projects_touch before update on public.projects for each row execute function public.touch_updated_at();

create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url text not null,
  caption text,
  kind text not null default 'gallery' check (kind in ('gallery','before','after')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index on public.project_images(project_id);
grant select on public.project_images to anon;
grant select, insert, update, delete on public.project_images to authenticated;
grant all on public.project_images to service_role;
alter table public.project_images enable row level security;
create policy "Public reads images of published projects" on public.project_images for select to anon, authenticated
  using (exists (select 1 from public.projects p where p.id = project_id and (p.published = true or public.has_role(auth.uid(), 'admin'))));
create policy "Admins insert project images" on public.project_images for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update project images" on public.project_images for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete project images" on public.project_images for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Inquiries
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 255),
  phone text not null check (char_length(phone) between 7 and 30),
  service text not null check (char_length(service) <= 120),
  project_location text check (char_length(project_location) <= 160),
  budget text check (char_length(budget) <= 80),
  description text not null check (char_length(description) between 10 and 3000),
  status text not null default 'new' check (status in ('new','contacted','in_progress','completed','archived')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant insert on public.inquiries to anon;
grant select, insert, update, delete on public.inquiries to authenticated;
grant all on public.inquiries to service_role;
alter table public.inquiries enable row level security;
create policy "Anyone can submit an inquiry" on public.inquiries for insert to anon, authenticated
  with check (status = 'new' and notes is null);
create policy "Admins read inquiries" on public.inquiries for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update inquiries" on public.inquiries for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete inquiries" on public.inquiries for delete to authenticated using (public.has_role(auth.uid(), 'admin'));
create trigger inquiries_touch before update on public.inquiries for each row execute function public.touch_updated_at();

-- Consultations
create table public.consultations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 255),
  phone text not null check (char_length(phone) between 7 and 30),
  service text not null check (char_length(service) <= 120),
  project_location text check (char_length(project_location) <= 160),
  budget text check (char_length(budget) <= 80),
  preferred_date date not null,
  method text not null check (method in ('phone','whatsapp','video','in_person')),
  description text not null check (char_length(description) between 10 and 3000),
  status text not null default 'pending' check (status in ('pending','accepted','declined','completed','cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant insert on public.consultations to anon;
grant select, insert, update, delete on public.consultations to authenticated;
grant all on public.consultations to service_role;
alter table public.consultations enable row level security;
create policy "Anyone can request a consultation" on public.consultations for insert to anon, authenticated
  with check (status = 'pending' and notes is null);
create policy "Admins read consultations" on public.consultations for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update consultations" on public.consultations for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete consultations" on public.consultations for delete to authenticated using (public.has_role(auth.uid(), 'admin'));
create trigger consultations_touch before update on public.consultations for each row execute function public.touch_updated_at();

-- Testimonials
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_role text,
  quote text not null,
  is_placeholder boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.testimonials to anon;
grant select, insert, update, delete on public.testimonials to authenticated;
grant all on public.testimonials to service_role;
alter table public.testimonials enable row level security;
create policy "Public reads published testimonials" on public.testimonials for select to anon, authenticated
  using (published = true or public.has_role(auth.uid(), 'admin'));
create policy "Admins insert testimonials" on public.testimonials for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update testimonials" on public.testimonials for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete testimonials" on public.testimonials for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Site settings
create table public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);
grant select on public.site_settings to anon;
grant select, insert, update, delete on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "Public reads settings" on public.site_settings for select to anon, authenticated using (true);
create policy "Admins insert settings" on public.site_settings for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update settings" on public.site_settings for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete settings" on public.site_settings for delete to authenticated using (public.has_role(auth.uid(), 'admin'));
create trigger site_settings_touch before update on public.site_settings for each row execute function public.touch_updated_at();

insert into public.site_settings (key, value) values
  ('social_instagram', ''), ('social_facebook', ''), ('social_tiktok', ''), ('social_linkedin', ''), ('social_pinterest', '');

insert into public.testimonials (client_name, client_role, quote, is_placeholder, sort_order) values
  ('Client name', 'Residential client · Placeholder', 'This is a placeholder testimonial. Genuine client feedback will appear here once it has been shared with Luxe Interiors Ke.', true, 1),
  ('Client name', 'Commercial client · Placeholder', 'Placeholder text reserved for a real review describing the design experience, communication and the finished space.', true, 2),
  ('Client name', 'Hospitality client · Placeholder', 'Placeholder testimonial. Replace this from the admin dashboard with feedback from a completed project.', true, 3);

-- Storage policies (private bucket, readable via signed URLs)
create policy "Anyone reads project image files" on storage.objects for select to anon, authenticated using (bucket_id = 'project-images');
create policy "Admins upload project image files" on storage.objects for insert to authenticated with check (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));
create policy "Admins update project image files" on storage.objects for update to authenticated using (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete project image files" on storage.objects for delete to authenticated using (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));