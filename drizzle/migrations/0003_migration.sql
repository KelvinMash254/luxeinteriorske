-- site_settings: only public social-link settings are readable by visitors; admins read everything
drop policy if exists "Public reads settings" on public.site_settings;
create policy "Public reads social link settings" on public.site_settings for select to anon, authenticated
  using (key like 'social\_%' or public.has_role(auth.uid(), 'admin'));

-- newsletter: validate what is inserted instead of accepting any row
drop policy if exists "Anyone can subscribe" on public.newsletter_subscribers;
create policy "Anyone can subscribe with a valid email" on public.newsletter_subscribers for insert to anon, authenticated
  with check (
    char_length(email) between 5 and 255
    and email = lower(email)
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

-- storage: visitors can only read files used by published projects; admins read all
drop policy if exists "Anyone reads project image files" on storage.objects;
create policy "Public reads published project image files" on storage.objects for select to anon, authenticated
  using (
    bucket_id = 'project-images'
    and (
      public.has_role(auth.uid(), 'admin')
      or exists (
        select 1 from public.projects p
        where p.published = true and p.cover_image = 'storage:' || storage.objects.name
      )
      or exists (
        select 1 from public.project_images pi
        join public.projects p on p.id = pi.project_id
        where p.published = true and pi.url = 'storage:' || storage.objects.name
      )
    )
  );