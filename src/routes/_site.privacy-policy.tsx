import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, MAILTO } from "@/lib/site";

export const Route = createFileRoute("/_site/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Luxe Interiors Ke" },
      { name: "description", content: "How Luxe Interiors Ke collects, uses and protects the information you share through this website." },
      { property: "og:title", content: "Privacy Policy | Luxe Interiors Ke" },
      { property: "og:description", content: "How Luxe Interiors Ke collects, uses and protects the information you share through this website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <section className="section-y">
      <div className="container-luxe max-w-3xl space-y-6 text-muted-foreground">
        <p className="eyebrow">Legal</p>
        <h1 className="text-5xl text-emerald">Privacy Policy</h1>
        <p>This policy explains how Luxe Interiors Ke handles information you share through this website.</p>
        <h2 className="pt-4 text-3xl text-emerald">Information we collect</h2>
        <p>When you send an inquiry, request a consultation or subscribe to our newsletter, we collect the details you provide, such as your name, email address, phone number and project information.</p>
        <h2 className="pt-4 text-3xl text-emerald">How we use it</h2>
        <p>We use this information only to respond to you, plan consultations and share updates you asked for. We do not sell your personal information.</p>
        <h2 className="pt-4 text-3xl text-emerald">Your choices</h2>
        <p>You can ask us to update or delete your information at any time by emailing <a href={MAILTO} className="text-emerald underline">{COMPANY.email}</a>.</p>
      </div>
    </section>
  );
}
