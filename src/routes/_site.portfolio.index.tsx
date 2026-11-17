import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { CtaBand } from "@/components/site/cta-band";
import { IMG } from "@/lib/images";
import { projectsQuery } from "@/lib/queries";
import { PROJECT_CATEGORIES } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio | Luxe Interiors Ke" },
      { name: "description", content: "Explore luxury residential, commercial, hospitality and office interiors by Luxe Interiors Ke." },
      { property: "og:title", content: "Portfolio | Luxe Interiors Ke" },
      { property: "og:description", content: "Explore luxury residential, commercial, hospitality and office interiors by Luxe Interiors Ke." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery()),
  errorComponent: () => <div className="container-luxe section-y text-center">The portfolio couldn't load. Please refresh.</div>,
  notFoundComponent: () => <div className="container-luxe section-y text-center">No projects found.</div>,
  component: Portfolio,
});

function Portfolio() {
  const { data: projects } = useSuspenseQuery(projectsQuery());
  const [cat, setCat] = useState<string>("All");
  const shown = cat === "All" ? projects : projects.filter((p) => p.category === cat);
  return (
    <>
      <PageHero eyebrow="Portfolio" title="Spaces We've Transformed." text="Discover beautiful environments shaped by creativity, thoughtful planning and exceptional design." image={IMG.dining} imageAlt="Formal dining room with emerald velvet chairs" />
      <section className="section-y">
        <div className="container-luxe">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {["All", ...PROJECT_CATEGORIES].map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c}
                className={cn("border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors", cat === c ? "border-emerald bg-emerald text-primary-foreground" : "border-border hover:border-gold hover:text-gold-deep")}>
                {c}
              </button>
            ))}
          </div>
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {shown.map((p, i) => (
              <div key={p.id} className="mb-4 break-inside-avoid">
                <ProjectCard project={p} imageClassName={i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"} />
              </div>
            ))}
          </div>
          {shown.length === 0 && <p className="mt-10 text-muted-foreground">No projects in this category yet.</p>}
          <p className="mt-6 text-xs text-muted-foreground">Projects marked "Sample project" are demonstration concepts.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
