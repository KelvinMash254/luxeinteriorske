import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { getService } from "@/lib/services";

export const Route = createFileRoute("/_site/services/$slug")({
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return { slug: s.slug, title: s.title, short: s.short };
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} | Luxe Interiors Ke` : "Service | Luxe Interiors Ke" },
      { name: "description", content: loaderData?.short ?? "Interior design services in Kenya." },
      { property: "og:title", content: loaderData ? `${loaderData.title} | Luxe Interiors Ke` : "Service" },
      { property: "og:description", content: loaderData?.short ?? "Interior design services in Kenya." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `/services/${params.slug}` }],
  }),
  notFoundComponent: () => (
    <div className="container-luxe section-y text-center">
      <h1 className="text-4xl text-emerald">Service not found</h1>
      <Button asChild className="mt-8"><Link to="/services">View all services</Link></Button>
    </div>
  ),
  errorComponent: () => <div className="container-luxe section-y text-center">This service couldn't load.</div>,
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const s = getService(slug)!;
  return (
    <>
      <PageHero eyebrow="Service" title={s.title} text={s.short} image={s.image} imageAlt={s.title} />
      <section className="section-y">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">{s.intro}</p>
            <h2 className="mt-12 text-3xl text-emerald">Key benefits</h2>
            <ul className="mt-6 space-y-4">
              {s.benefits.map((b) => <li key={b} className="flex gap-3 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-gold-deep" />{b}</li>)}
            </ul>
            <h2 className="mt-12 text-3xl text-emerald">What's included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {s.includes.map((b) => <li key={b} className="border border-border px-4 py-3 text-sm">{b}</li>)}
            </ul>
          </div>
          <img src={s.detailImage} alt={`${s.title} example`} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </div>
      </section>
      <section className="section-y bg-soft">
        <div className="container-luxe">
          <p className="eyebrow">Design approach</p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {s.approach.map((a, i) => (
              <div key={a.title}><span className="font-display text-5xl text-gold">0{i + 1}</span><h3 className="mt-3 text-3xl text-emerald">{a.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.text}</p></div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand cta="Book a Consultation" />
    </>
  );
}
