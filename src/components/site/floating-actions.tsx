import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./whatsapp-icon";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3 sm:bottom-7 sm:right-7">
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "grid size-11 place-items-center border border-border bg-background text-emerald shadow-soft transition-all duration-300 hover:border-gold hover:text-gold-deep",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="size-4" />
      </button>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Luxe Interiors Ke on WhatsApp"
        className="group grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-soft transition-transform duration-300 hover:scale-110"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </div>
  );
}
