import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { ProjectCard } from "@/components/site/project-card";
import { projectDetailQuery } from "@/lib/queries";

export const Route = createFileRoute("/_site/portfolio/$slug")({
  loader: async ({ context, params }) => {
    const d = await context.queryClient.ensureQueryData(projectDetailQuery(params.slug));
    if (!d) throw notFound();
    return { title: d.project.title, summary: d.project.summary };
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} | Luxe Interiors Ke` : "Project | Luxe Interiors Ke" },
      { name: "description", content: loaderData?.summary ?? "Interior design project by Luxe Interiors Ke." },
      { property: "og:title", content: loaderData?.title ?? "Project" },
      { property: "og:description", content: loaderData?.summary ?? "Interior design project by Luxe Interiors Ke." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `/portfolio/${params.slug}` }],
  }),
  notFoundComponent: () => (
    <div className="container-luxe section-y text-center">
      <h1 className="text-4xl text-emerald">Project not found</h1>
      <Button asChild className="mt-8"><Link to="/portfolio">Back to portfolio</Link></Button>
    </div>
  ),
  errorComponent: () => <div className="container-luxe section-y text-center">This project couldn't load. Please refresh.</div>,
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(projectDetailQuery(slug));
  if (!data) return null;
  const { project: p, images, related, prev, next } = data;
  const blocks = [["Project overview", p.overview], ["Design concept", p.concept], ["Client requirements", p.requirements]].filter(([, t]) => t);
  const before = images.filter((i) => i.kind === "before");
  const after = images.filter((i) => i.kind === "after");
  return (
    <>
      <section className="relative">
        {p.cover_image && <img src={p.cover_image} alt={p.title} className="h-[60vh] min-h-80 w-full object-cover" />}
      </section>
      <section className="section-y">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {p.is_sample && <span className="inline-block border border-gold/60 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">Sample project</span>}
            <p className="eyebrow mt-5">{p.category}{p.location ? ` · ${p.location}` : ""}</p>
            <h1 className="mt-4 text-5xl text-emerald">{p.title}</h1>
            <span className="gold-rule mt-6" />
            <p className="mt-6 text-muted-foreground">{p.summary}</p>
            {p.materials.length > 0 && (
              <>
                <h2 className="mt-10 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">Materials and finishes</h2>
                <ul className="mt-4 flex flex-wrap gap-2">{p.materials.map((m) => <li key={m} className="border border-border px-3 py-1.5 text-xs">{m}</li>)}</ul>
              </>
            )}
          </div>
          <div className="space-y-10 lg:col-span-8">
            {blocks.map(([h, t]) => (
              <div key={h}><h2 className="text-3xl text-emerald">{h}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{t}</p></div>
            ))}
            <div className="grid gap-4 sm:grid-cols-2">
              {images.filter((i) => i.kind === "gallery").map((img) => (
                <figure key={img.id}><img src={img.url} alt={img.caption ?? p.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />{img.caption && <figcaption className="mt-2 text-xs text-muted-foreground">{img.caption}</figcaption>}</figure>
              ))}
            </div>
            {before.length > 0 && after.length > 0 && (
              <div><h2 className="text-3xl text-emerald">Before and after</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <figure><img src={before[0]!.url} alt="Before" loading="lazy" className="aspect-[4/3] w-full object-cover" /><figcaption className="mt-2 text-xs">Before</figcaption></figure>
                  <figure><img src={after[0]!.url} alt="After" loading="lazy" className="aspect-[4/3] w-full object-cover" /><figcaption className="mt-2 text-xs">After</figcaption></figure>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {(prev || next) && (
        <nav aria-label="Project navigation" className="border-y border-border">
          <div className="container-luxe flex justify-between gap-4 py-8 text-sm">
            {prev && <Link to="/portfolio/$slug" params={{ slug: prev.slug }} className="flex items-center gap-2 text-emerald hover:text-gold-deep"><ArrowLeft className="size-4" />{prev.title}</Link>}
            {next && <Link to="/portfolio/$slug" params={{ slug: next.slug }} className="ml-auto flex items-center gap-2 text-emerald hover:text-gold-deep">{next.title}<ArrowRight className="size-4" /></Link>}
          </div>
        </nav>
      )}
      {related.length > 0 && (
        <section className="section-y bg-soft">
          <div className="container-luxe">
            <h2 className="text-4xl text-emerald">Related projects</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">{related.map((r) => <ProjectCard key={r.id} project={r} imageClassName="aspect-[4/5]" />)}</div>
          </div>
        </section>
      )}
      <CtaBand cta="Book a Consultation" />
    </>
  );
}
