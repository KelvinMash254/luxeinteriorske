import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Compass,
  Feather,
  Gem,
  Hammer,
  HandHeart,
  Layers,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { TestimonialGrid } from "@/components/site/testimonials";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { IMG } from "@/lib/images";
import { PROCESS_PREVIEW } from "@/lib/process";
import { projectsQuery, testimonialsQuery } from "@/lib/queries";
import { SERVICES } from "@/lib/services";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const TITLE = "Luxe Interiors Ke | Luxury Interior Design in Kenya";
const DESCRIPTION =
  "Discover Luxe Interiors Ke, a luxury interior design company creating elegant, functional and sophisticated residential and commercial spaces in Kenya.";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(projectsQuery()),
      context.queryClient.ensureQueryData(testimonialsQuery()),
    ]),
  component: HomePage,
});

const PRINCIPLES = [
  { Icon: Gem, title: "Timeless Elegance", text: "Interiors that feel considered today and remain beautiful for years to come." },
  { Icon: Compass, title: "Thoughtful Functionality", text: "Every layout is planned around how the space is truly used and lived in." },
  { Icon: Hammer, title: "Exceptional Craftsmanship", text: "Careful detailing, quality finishes and respect for how things are made." },
  { Icon: Feather, title: "Individual Expression", text: "Spaces that reflect the personality, story and aspirations of each client." },
];

const DIFFERENCE = [
  { Icon: Sparkles, title: "Personalized design solutions", text: "Every scheme begins with your brief, never a template." },
  { Icon: Lightbulb, title: "Creative concepts", text: "Fresh, considered ideas that give each space its own character." },
  { Icon: ShieldCheck, title: "Professional approach", text: "Clear communication, organised planning and dependable follow-through." },
  { Icon: Layers, title: "Quality materials and finishes", text: "Materials selected for beauty, durability and how they feel to live with." },
  { Icon: HandHeart, title: "Attention to detail", text: "From joinery to styling, the small decisions are given real care." },
  { Icon: Users, title: "Client-focused execution", text: "Your goals, timelines and priorities guide every step of the work." },
];

function HomePage() {
  const { data: projects } = useSuspenseQuery(projectsQuery());
  const { data: testimonials } = useSuspenseQuery(testimonialsQuery());
  const featured = (projects.filter((p) => p.featured).length >= 4 ? projects.filter((p) => p.featured) : projects).slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate -mt-px overflow-hidden bg-forest">
        <img
          src={IMG.hero}
          alt="Luxury living room with an emerald velvet sofa, marble feature wall and champagne gold accents"
          className="absolute inset-0 -z-10 h-full w-full animate-fade-in object-cover"
          width={1920}
          height={1152}
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="container-luxe flex min-h-[calc(100svh-5rem)] flex-col justify-center py-24">
          <p className="eyebrow animate-fade-up text-gold-light">Elevating Spaces. Defining Luxury.</p>
          <h1 className="mt-6 max-w-4xl animate-fade-up text-[2.9rem] leading-[1.02] text-on-dark [animation-delay:120ms] sm:text-7xl lg:text-[5.6rem]">
            Redefining Luxury.
            <br />
            <em className="font-normal text-gold-light">Transforming Spaces.</em>
          </h1>
          <span className="gold-rule mt-9 w-24 origin-left animate-line-grow [animation-delay:350ms]" />
          <p className="mt-8 max-w-xl animate-fade-up text-base leading-relaxed text-on-dark-muted [animation-delay:260ms] sm:text-lg">
            At Luxe Interiors Ke, we create extraordinary spaces through thoughtful design, timeless elegance and
            exceptional craftsmanship.
          </p>
          <div className="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:380ms] sm:flex-row">
            <Button asChild variant="gold" size="lg">
              <Link to="/portfolio">Explore Our Portfolio</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link to="/book-consultation">Book a Consultation</Link>
            </Button>
          </div>
        </div>
        <a
          href="#introduction"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.3em] text-on-dark-muted sm:flex"
        >
          Scroll
          <span className="h-10 w-px animate-scroll-cue bg-gold" />
        </a>
      </section>

      {/* Introduction */}
      <section id="introduction" className="section-y">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative lg:col-span-6">
            <img
              src={IMG.curvedSofa}
              alt="Curved emerald velvet sofa beneath a gold ring chandelier"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
              width={1200}
              height={1500}
            />
            <div className="absolute -bottom-6 -right-6 -z-10 hidden h-2/3 w-2/3 border border-gold/60 lg:block" />
          </Reveal>
          <Reveal className="lg:col-span-6" delay={120}>
            <p className="eyebrow">About the studio</p>
            <h2 className="mt-4 text-4xl text-emerald sm:text-5xl lg:text-6xl">Where Vision Meets Exceptional Design.</h2>
            <span className="gold-rule mt-8" />
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              Every space has a story waiting to be told. At Luxe Interiors Ke, we bring creativity, expertise and
              attention to detail together to transform environments into beautiful, functional and inspiring
              spaces.
            </p>
            <Button asChild size="lg" className="mt-10">
              <Link to="/about">Discover Our Story</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section-y bg-soft">
        <div className="container-luxe">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <SectionHeading
              eyebrow="Services"
              title="Our Expertise. Your Vision."
              text="Thoughtfully curated interior design solutions tailored to your lifestyle, aspirations and business needs."
            />
            <Link to="/services" className="link-underline inline-flex items-center gap-2 pb-1 text-sm font-medium text-emerald">
              All services <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 80} as="article">
                <Link to="/services/$slug" params={{ slug: s.slug }} className="group block">
                  <div className="overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-6 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
                  <h3 className="mt-5 text-2xl text-emerald">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
                    Learn more <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="section-y">
        <div className="container-luxe">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <SectionHeading
              eyebrow="Portfolio"
              title="Spaces We've Transformed."
              text="Discover beautiful environments shaped by creativity, thoughtful planning and exceptional design."
            />
            <Button asChild variant="outline-emerald" size="lg">
              <Link to="/portfolio">View All Projects</Link>
            </Button>
          </div>
          <div className="mt-14 grid auto-rows-[18rem] gap-4 sm:grid-cols-2 lg:auto-rows-[15rem] lg:grid-cols-12">
            {featured.map((p, i) => (
              <Reveal
                key={p.id}
                delay={i * 90}
                className={cn(
                  "h-full",
                  i === 0 && "sm:col-span-2 lg:col-span-7 lg:row-span-3",
                  i === 1 && "lg:col-span-5 lg:row-span-2",
                  i === 2 && "lg:col-span-5 lg:row-span-2",
                  i === 3 && "lg:col-span-4 lg:row-span-2",
                  i === 4 && "sm:col-span-2 lg:col-span-3 lg:row-span-2",
                  i === 2 && "lg:row-start-3 lg:col-start-8",
                )}
              >
                <ProjectCard project={p} className="h-full" />
              </Reveal>
            ))}
          </div>
          {projects.some((p) => p.is_sample) && (
            <p className="mt-6 text-xs text-muted-foreground">
              Projects marked "Sample project" are demonstration concepts and will be replaced with completed Luxe Interiors Ke work.
            </p>
          )}
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative overflow-hidden bg-emerald">
        <div className="container-luxe section-y">
          <Reveal className="max-w-4xl">
            <p className="eyebrow text-gold-light">Design philosophy</p>
            <h2 className="mt-5 text-4xl text-on-dark sm:text-5xl lg:text-6xl">
              Design Is More Than What You See. <em className="text-gold-light">It's How a Space Makes You Feel.</em>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px bg-on-dark/10 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 100} className="bg-emerald p-8 lg:p-10">
                <Icon className="size-8 text-gold" strokeWidth={1.2} aria-hidden="true" />
                <h3 className="mt-8 text-2xl text-on-dark">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-y">
        <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Why Luxe Interiors Ke" title="The Difference Is in the Details." />
            <Reveal className="mt-10 hidden lg:block">
              <img src={IMG.materials} alt="Marble, velvet, brass and oak material samples" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </Reveal>
          </div>
          <div className="grid content-start gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:pt-28">
            {DIFFERENCE.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 2) * 100}>
                <div className="grid size-12 place-items-center border border-gold/50">
                  <Icon className="size-5 text-emerald" strokeWidth={1.4} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-2xl text-emerald">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process preview */}
      <section className="section-y bg-soft">
        <div className="container-luxe">
          <SectionHeading eyebrow="Our process" title="From First Conversation to Final Detail." align="center" />
          <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {PROCESS_PREVIEW.map((s, i) => (
              <Reveal key={s.n} as="li" delay={i * 100} className="relative lg:px-8 lg:first:pl-0 lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-gold/30">
                <span className="font-display text-6xl text-gold">{s.n}</span>
                <h3 className="mt-4 text-3xl text-emerald">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14 text-center">
            <Button asChild variant="outline-emerald" size="lg">
              <Link to="/process">Explore Our Process</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-y">
          <div className="container-luxe">
            <SectionHeading eyebrow="Testimonials" title="What Our Clients Say." align="center" />
            <TestimonialGrid items={testimonials} />
          </div>
        </section>
      )}

      {/* WhatsApp strip */}
      <section className="border-y border-border">
        <div className="container-luxe flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <p className="font-display text-2xl text-emerald sm:text-3xl">Have a project in mind? Let's talk on WhatsApp.</p>
          <Button asChild size="lg" className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" /> Message Us
            </a>
          </Button>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
