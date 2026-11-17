import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { COMPANY, NAV_LINKS, TEL } from "@/lib/site";
import { Logo } from "./logo";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/95 backdrop-blur transition-shadow duration-300",
        scrolled ? "border-border shadow-soft" : "border-transparent",
      )}
    >
      <div className="container-luxe grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
        <Link to="/" aria-label="Luxe Interiors Ke — Home" className="min-w-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="link-underline pb-1 text-[0.8rem] font-medium tracking-wide text-charcoal hover:text-gold-deep data-[status=active]:text-emerald data-[status=active]:[background-size:100%_1px]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden lg:inline-flex" size="lg">
            <Link to="/book-consultation">Book a Consultation</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col border-l-0 bg-forest p-0 text-on-dark sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="border-b border-on-dark/10 px-6 py-6">
                <Logo tone="light" />
              </div>
              <nav aria-label="Mobile" className="flex flex-1 flex-col px-6 py-6">
                {NAV_LINKS.map((l, i) => (
                  <SheetClose asChild key={l.to}>
                    <Link
                      to={l.to}
                      activeOptions={{ exact: l.to === "/" }}
                      className="flex items-baseline gap-4 border-b border-on-dark/10 py-4 font-display text-3xl text-on-dark transition-colors hover:text-gold-light data-[status=active]:text-gold-light"
                    >
                      <span className="font-sans text-[0.65rem] tracking-[0.2em] text-gold">0{i + 1}</span>
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="space-y-3 px-6 pb-8">
                <SheetClose asChild>
                  <Button asChild variant="gold" size="lg" className="w-full">
                    <Link to="/book-consultation">Book a Consultation</Link>
                  </Button>
                </SheetClose>
                <a href={TEL} className="flex items-center justify-center gap-2 py-2 text-sm text-on-dark-muted hover:text-gold-light">
                  <Phone className="size-4" /> {COMPANY.phoneDisplay}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
