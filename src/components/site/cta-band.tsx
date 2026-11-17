import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./whatsapp-icon";

export function CtaBand({
  title = "Your Vision. Our Creativity. Extraordinary Spaces.",
  text = "Let's bring your dream interior to life. Get in touch with Luxe Interiors Ke and take the first step towards an exceptional space.",
  cta = "Start Your Project",
}: {
  title?: string;
  text?: string;
  cta?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-gold/20" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full border border-gold/15" />
      <div className="container-luxe section-y relative text-center">
        <p className="eyebrow text-gold-light">Begin your project</p>
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl text-on-dark sm:text-5xl lg:text-6xl">{title}</h2>
        <span className="gold-rule mx-auto mt-8" />
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-on-dark-muted sm:text-lg">{text}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="gold" size="lg">
            <Link to="/book-consultation">{cta}</Link>
          </Button>
          <Button asChild variant="outline-light" size="lg">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" /> Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
