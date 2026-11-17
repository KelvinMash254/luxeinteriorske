import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/site/reveal";
import { IMG } from "@/lib/images";
import { PROCESS_STEPS } from "@/lib/process";

export const Route = createFileRoute("/_site/process")({
  head: () => ({
    meta: [
      { title: "Our Design Process | Luxe Interiors Ke" },
      { name: "description", content: "From initial consultation to final styling and handover, discover the seven-step Luxe Interiors Ke design process." },
      { property: "og:title", content: "Our Design Process | Luxe Interiors Ke" },
      { property: "og:description", content: "From initial consultation to final styling and handover, discover the seven-step Luxe Interiors Ke design process." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/process" }],
  }),
  component: Process,
});

function Process() {
  return (
    <>
      <PageHero eyebrow="Our process" title="A Considered Journey, Step by Step." image={IMG.spacePlanning} imageAlt="Floor plan with marble, velvet and brass samples" />
      <section className="section-y">
        <ol className="container-luxe relative max-w-4xl border-l border-gold/40 pl-8 sm:pl-14">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 60} className="relative pb-16 last:pb-0">
              <span className="absolute -left-[2.55rem] top-3 size-3 rounded-full bg-gold sm:-left-[3.95rem]" />
              <span className="font-display text-5xl text-gold">{s.n}</span>
              <h2 className="mt-2 text-3xl text-emerald sm:text-4xl">{s.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>
      <CtaBand />
    </>
  );
}
