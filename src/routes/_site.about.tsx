import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/site/reveal";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About Us | Luxe Interiors Ke" },
      { name: "description", content: "Learn about Luxe Interiors Ke, a luxury interior design studio in Kenya focused on elegance, functionality and individuality." },
      { property: "og:title", content: "About Us | Luxe Interiors Ke" },
      { property: "og:description", content: "Learn about Luxe Interiors Ke, a luxury interior design studio in Kenya focused on elegance, functionality and individuality." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const VALUES = ["Creativity", "Excellence", "Integrity", "Innovation", "Attention to detail", "Customer satisfaction"];

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Creating Spaces That Inspire." image={IMG.grandSalon} imageAlt="Formal salon with emerald tufted sofa and crystal chandelier" />
      <section className="section-y">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Our studio" title="Elegance, function and individuality." />
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              Luxe Interiors Ke is dedicated to creating exceptional interior environments that combine elegance, functionality and individuality. We believe every space deserves thoughtful design, refined aesthetics and attention to detail. Our approach brings together creativity, quality finishes and an understanding of how people experience their spaces.
            </p>
          </Reveal>
          <Reveal delay={120}><img src={IMG.materials} alt="Marble, velvet, brass and oak material samples" loading="lazy" className="aspect-[4/5] w-full object-cover" /></Reveal>
        </div>
      </section>
      <section className="section-y bg-soft">
        <div className="container-luxe grid gap-12 md:grid-cols-2">
          <Reveal><p className="eyebrow">Vision</p><h3 className="mt-4 text-3xl text-emerald">To be a defining name in luxury interior design in Kenya, known for spaces that are as livable as they are beautiful.</h3></Reveal>
          <Reveal delay={100}><p className="eyebrow">Mission</p><h3 className="mt-4 text-3xl text-emerald">To transform homes and businesses through thoughtful design, quality finishes and a personal, client-focused approach.</h3></Reveal>
        </div>
      </section>
      <section className="section-y">
        <div className="container-luxe">
          <SectionHeading eyebrow="Core values" title="What guides our work." align="center" />
          <ul className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <li key={v} className="bg-background p-8"><span className="font-display text-4xl text-gold">0{i + 1}</span><p className="mt-3 text-2xl text-emerald">{v}</p></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section-y bg-soft">
        <div className="container-luxe">
          <SectionHeading eyebrow="Our team" title="The people behind the designs." text="Team profiles will be added here once they are shared by Luxe Interiors Ke." align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border border-border bg-background p-8 text-center">
                <div className="mx-auto size-24 rounded-full bg-soft" />
                <p className="mt-5 font-display text-2xl text-emerald">Team member</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">Role · Placeholder</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand cta="Book a Consultation" />
    </>
  );
}
