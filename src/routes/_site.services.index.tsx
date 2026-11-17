import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/site/reveal";
import { IMG } from "@/lib/images";
import { SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/services/")({
  head: () => ({
    meta: [
      { title: "Interior Design Services | Luxe Interiors Ke" },
      { name: "description", content: "Residential, commercial and office interior design, space planning, styling, renovation, lighting design and 3D visualisation in Kenya." },
      { property: "og:title", content: "Interior Design Services | Luxe Interiors Ke" },
      { property: "og:description", content: "Residential, commercial and office interior design, space planning, styling, renovation, lighting design and 3D visualisation in Kenya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Our Expertise. Your Vision." text="Thoughtfully curated interior design solutions tailored to your lifestyle, aspirations and business needs." image={IMG.lighting} imageAlt="Living room with layered architectural lighting" />
      <section className="section-y">
        <div className="container-luxe space-y-20 lg:space-y-28">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <img src={s.image} alt={s.title} loading="lazy" className={cn("aspect-[4/3] w-full object-cover", i % 2 && "lg:order-2")} />
              <div>
                <span className="font-display text-5xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 text-4xl text-emerald sm:text-5xl">{s.title}</h2>
                <span className="gold-rule mt-6" />
                <p className="mt-6 leading-relaxed text-muted-foreground">{s.intro}</p>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
                  Learn more <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
