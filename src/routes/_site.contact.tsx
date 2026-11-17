import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { RequestForm } from "@/components/forms/request-form";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { IMG } from "@/lib/images";
import { COMPANY, MAILTO, TEL, whatsappUrl } from "@/lib/site";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Luxe Interiors Ke" },
      { name: "description", content: "Contact Luxe Interiors Ke by email, phone or WhatsApp, or send us your project details." },
      { property: "og:title", content: "Contact | Luxe Interiors Ke" },
      { property: "og:description", content: "Contact Luxe Interiors Ke by email, phone or WhatsApp, or send us your project details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { Icon: Mail, label: "Email", value: COMPANY.email, href: MAILTO },
    { Icon: Phone, label: "Telephone", value: COMPANY.phone, href: TEL },
    { Icon: WhatsAppIcon, label: "WhatsApp", value: COMPANY.phone, href: whatsappUrl() },
    { Icon: MapPin, label: "Location", value: COMPANY.location },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's Talk About Your Space." image={IMG.office} imageAlt="Executive office with walnut joinery" />
      <section className="section-y">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-4xl text-emerald">Luxe Interiors Ke</h2>
            <span className="gold-rule mt-6" />
            <ul className="mt-8 space-y-6">
              {items.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <Icon className="mt-1 size-5 shrink-0 text-gold-deep" />
                  <div className="min-w-0"><p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                    {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="break-all text-emerald hover:text-gold-deep">{value}</a> : <p className="text-emerald">{value}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8"><RequestForm kind="inquiry" /></div>
        </div>
      </section>
    </>
  );
}
