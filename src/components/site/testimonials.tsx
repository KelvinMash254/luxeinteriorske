import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/queries";
import { Reveal } from "./reveal";

export function TestimonialGrid({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {items.map((t, i) => (
        <Reveal key={t.id} delay={i * 100} as="article" className="flex flex-col border border-border bg-background p-8 lg:p-10">
          <Quote className="size-8 text-gold" aria-hidden="true" />
          <blockquote className="mt-6 flex-1 font-display text-xl leading-snug text-charcoal sm:text-2xl">
            {t.quote}
          </blockquote>
          <div className="mt-8 border-t border-border pt-5">
            <p className="font-display text-xl text-emerald">{t.client_name}</p>
            {t.client_role && <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.client_role}</p>}
            {t.is_placeholder && (
              <span className="mt-3 inline-block border border-gold/50 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                Placeholder testimonial
              </span>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
