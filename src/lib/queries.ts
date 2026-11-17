import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectImage = Database["public"]["Tables"]["project_images"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

export const STORAGE_BUCKET = "project-images";
export const STORAGE_PREFIX = "storage:";

/** Images uploaded from the dashboard are stored as "storage:<path>" and served through signed links. */
export async function resolveImageUrls(urls: (string | null | undefined)[]) {
  const paths = Array.from(
    new Set(urls.filter((u): u is string => !!u && u.startsWith(STORAGE_PREFIX)).map((u) => u.slice(STORAGE_PREFIX.length))),
  );
  const map = new Map<string, string>();
  if (paths.length) {
    const { data } = await supabase.storage.from(STORAGE_BUCKET).createSignedUrls(paths, 60 * 60 * 24 * 7);
    data?.forEach((d) => {
      if (d.path && d.signedUrl) map.set(STORAGE_PREFIX + d.path, d.signedUrl);
    });
  }
  return (u: string | null | undefined) => (u ? (map.get(u) ?? (u.startsWith(STORAGE_PREFIX) ? "" : u)) : "");
}

const PROJECT_COLUMNS =
  "id, slug, title, category, location, summary, overview, concept, requirements, materials, cover_image, is_sample, featured, published, sort_order, created_at, updated_at";

export const projectsQuery = () =>
  queryOptions({
    queryKey: ["projects", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(PROJECT_COLUMNS)
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      const resolve = await resolveImageUrls(data.map((p) => p.cover_image));
      return data.map((p) => ({ ...p, cover_image: resolve(p.cover_image) }));
    },
  });

export const projectDetailQuery = (slug: string) =>
  queryOptions({
    queryKey: ["projects", "detail", slug],
    queryFn: async () => {
      const { data: list, error } = await supabase
        .from("projects")
        .select(PROJECT_COLUMNS)
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      const index = list.findIndex((p) => p.slug === slug);
      if (index === -1) return null;
      const project = list[index]!;
      const { data: images, error: imgErr } = await supabase
        .from("project_images")
        .select("id, project_id, url, caption, kind, sort_order, created_at")
        .eq("project_id", project.id)
        .order("sort_order", { ascending: true });
      if (imgErr) throw imgErr;
      const related = list.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3);
      const fill = list.filter((p) => p.id !== project.id && !related.includes(p));
      const relatedFull = [...related, ...fill].slice(0, 3);
      const prev = list[(index - 1 + list.length) % list.length]!;
      const next = list[(index + 1) % list.length]!;
      const resolve = await resolveImageUrls([
        project.cover_image,
        ...images.map((i) => i.url),
        ...relatedFull.map((p) => p.cover_image),
      ]);
      return {
        project: { ...project, cover_image: resolve(project.cover_image) },
        images: images.map((i) => ({ ...i, url: resolve(i.url) })).filter((i) => i.url),
        related: relatedFull.map((p) => ({ ...p, cover_image: resolve(p.cover_image) })),
        prev: list.length > 1 ? { slug: prev.slug, title: prev.title } : null,
        next: list.length > 1 ? { slug: next.slug, title: next.title } : null,
      };
    },
  });

export const testimonialsQuery = () =>
  queryOptions({
    queryKey: ["testimonials", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, client_name, client_role, quote, is_placeholder, published, sort_order, created_at")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

export const settingsQuery = () =>
  queryOptions({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key, value");
      if (error) throw error;
      return Object.fromEntries(data.map((r) => [r.key, r.value])) as Record<string, string>;
    },
    staleTime: 5 * 60 * 1000,
  });
