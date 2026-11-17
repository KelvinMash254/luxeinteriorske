import { cn } from "@/lib/utils";

/**
 * Luxe Interiors Ke logo: an architectural arch monogram with the LUXE wordmark.
 * To use an uploaded official logo instead, replace the contents of this component with an <img>.
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <svg
      viewBox="0 0 40 48"
      aria-hidden="true"
      className={cn("shrink-0", tone === "dark" ? "text-emerald" : "text-on-dark", className)}
    >
      <path d="M4 47V18a16 16 0 0 1 32 0v29" fill="none" className="stroke-gold" strokeWidth="1.4" />
      <path d="M9 47V19.5a11 11 0 0 1 22 0V47" fill="none" className="stroke-gold" strokeWidth="0.6" opacity="0.7" />
      <text
        x="20"
        y="40"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="22"
        fontWeight="500"
        fill="currentColor"
      >
        L
      </text>
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark tone={tone} className="h-10 w-8" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.55rem] font-medium tracking-[0.34em]",
            tone === "dark" ? "text-emerald" : "text-on-dark",
          )}
        >
          LUXE
        </span>
        <span
          className={cn(
            "mt-1 text-[0.55rem] font-semibold tracking-[0.42em]",
            tone === "dark" ? "text-gold-deep" : "text-gold-light",
          )}
        >
          INTERIORS KE
        </span>
      </span>
      <span className="sr-only">Luxe Interiors Ke</span>
    </span>
  );
}
