import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingActions } from "@/components/site/floating-actions";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 animate-fade-in">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
