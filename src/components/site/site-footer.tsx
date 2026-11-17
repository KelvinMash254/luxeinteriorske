import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { COMPANY, MAILTO, NAV_LINKS, TEL, whatsappUrl } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { settingsQuery } from "@/lib/queries";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter-form";
import { WhatsAppIcon } from "./whatsapp-icon";

const SOCIALS = [
  { key: "social_instagram", label: "Instagram", Icon: Instagram },
  { key: "social_facebook", label: "Facebook", Icon: Facebook },
  { key: "social_linkedin", label: "LinkedIn", Icon: Linkedin },
] as const;

export function SiteFooter() {
  const { data: settings } = useQuery(settingsQuery());
  const socials = SOCIALS.filter((s) => settings?.[s.key]);
  const extra = [
    settings?.["social_tiktok"] ? { label: "TikTok", href: settings["social_tiktok"] } : null,
    settings?.["social_pinterest"] ? { label: "Pinterest", href: settings["social_pinterest"] } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="bg-forest text-on-dark">
      <div className="container-luxe grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="eyebrow mt-6 text-gold-light">{COMPANY.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-dark-muted">
            Luxe Interiors Ke is a luxury interior design studio in Kenya, creating elegant, functional and
            deeply personal residential and commercial spaces.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socials.map(({ key, label, Icon }) => (
              <a
                key={key}
                href={settings?.[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center border border-on-dark/20 text-gold-light transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="size-4" />
              </a>
            ))}
            {extra.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-xs text-gold-light hover:text-gold">
                {s.label}
              </a>
            ))}
            {socials.length === 0 && extra.length === 0 && (
              <p className="text-xs text-on-dark-muted">Social media links coming soon.</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-on-dark-muted transition-colors hover:text-gold-light">{l.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/book-consultation" className="text-on-dark-muted transition-colors hover:text-gold-light">Book a Consultation</Link>
            </li>
            <li>
              <Link to="/design-brief" className="text-on-dark-muted transition-colors hover:text-gold-light">Design Brief Assistant</Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold">Services</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="text-on-dark-muted transition-colors hover:text-gold-light">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={MAILTO} className="flex items-start gap-3 break-all text-on-dark-muted hover:text-gold-light">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" /> {COMPANY.email}
              </a>
            </li>
            <li>
              <a href={TEL} className="flex items-center gap-3 text-on-dark-muted hover:text-gold-light">
                <Phone className="size-4 shrink-0 text-gold" /> {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-on-dark-muted hover:text-gold-light">
                <WhatsAppIcon className="size-4 shrink-0 text-gold" /> WhatsApp {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 text-on-dark-muted">
              <MapPin className="size-4 shrink-0 text-gold" /> {COMPANY.location}
            </li>
          </ul>
          <h3 className="mt-8 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold">Newsletter</h3>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-gold/20">
        <div className="container-luxe flex flex-col gap-3 py-6 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Luxe Interiors Ke. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-gold-light">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
