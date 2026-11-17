import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { RequestForm } from "@/components/forms/request-form";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/_site/book-consultation")({
  head: () => ({
    meta: [
      { title: "Book a Consultation | Luxe Interiors Ke" },
      { name: "description", content: "Request a consultation with Luxe Interiors Ke by phone, WhatsApp, video call or in person." },
      { property: "og:title", content: "Book a Consultation | Luxe Interiors Ke" },
      { property: "og:description", content: "Request a consultation with Luxe Interiors Ke by phone, WhatsApp, video call or in person." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/book-consultation" }],
  }),
  component: Book,
});

function Book() {
  return (
    <>
      <PageHero eyebrow="Book a consultation" title="Begin Your Design Journey." text="Share a few details and your preferred date. Our team will contact you to confirm the consultation." image={IMG.bedroom} imageAlt="Bedroom with emerald velvet headboard" />
      <section className="section-y">
        <div className="container-luxe max-w-4xl"><RequestForm kind="consultation" /></div>
      </section>
    </>
  );
}
