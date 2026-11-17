import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Check, ClipboardCopy, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { IMG } from "@/lib/images";
import { BUDGET_OPTIONS } from "@/lib/site";
import {
  BRIEF_NOTES_MAX,
  BRIEF_PREFILL_KEY,
  briefInputSchema,
  briefToText,
  type DesignBrief,
} from "@/lib/design-brief";
import { createDesignBrief } from "@/lib/design-brief.functions";

const TITLE = "Design Brief Assistant | Luxe Interiors Ke";
const DESCRIPTION =
  "Describe your interior design project in your own words and get a clear, organised design brief to share with Luxe Interiors Ke.";

export const Route = createFileRoute("/_site/design-brief")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/design-brief" }],
  }),
  component: DesignBriefPage,
});

const field =
  "mt-2 w-full border border-input bg-background px-4 py-3 text-sm focus:border-emerald focus:outline-none";
const labelCls = "font-sans text-xs font-semibold uppercase tracking-[0.16em] text-charcoal";

function DesignBriefPage() {
  const generate = useServerFn(createDesignBrief);
  const navigate = useNavigate();
  const [form, setForm] = useState({ notes: "", space_type: "", location: "", budget: "", timeline: "" });
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState<DesignBrief | null>(null);
  const [copied, setCopied] = useState(false);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = briefInputSchema.safeParse(form);
    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Please check your notes");
      return;
    }
    setFieldError(null);
    setLoading(true);
    try {
      const result = await generate({ data: parsed.data });
      if (result.ok) {
        setBrief(result.brief);
        requestAnimationFrame(() => document.getElementById("brief-result")?.scrollIntoView({ behavior: "smooth" }));
      } else {
        setError(result.error);
      }
    } catch {
      setError("We couldn't reach the brief assistant. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyBrief() {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(briefToText(brief, 10000));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy. Please select the text and copy it manually.");
    }
  }

  function useInConsultation() {
    if (!brief) return;
    sessionStorage.setItem(BRIEF_PREFILL_KEY, briefToText(brief));
    navigate({ to: "/book-consultation" });
  }

  return (
    <>
      <PageHero
        eyebrow="Design brief assistant"
        title="Tell Us About Your Space."
        text="Share your ideas in your own words, however rough. We'll organise them into a clear design brief you can review and send to our team."
        image={IMG.spacePlanning}
        imageAlt="Floor plan with marble, velvet and brass material samples"
      />

      <section className="section-y">
        <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:gap-20">
          <aside className="lg:col-span-4">
            <p className="eyebrow">How it works</p>
            <ol className="mt-6 space-y-6">
              {[
                ["Describe", "Write about the space, how you use it, what you love and what isn't working."],
                ["Review", "Get an organised brief with your priorities, style direction and open questions."],
                ["Send", "Use the brief in a consultation request, or copy it to share with us."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="font-display text-3xl text-gold">0{i + 1}</span>
                  <div>
                    <p className="font-display text-2xl text-emerald">{t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 border-l-2 border-gold pl-4 text-xs leading-relaxed text-muted-foreground">
              Briefs are drafted by AI from your notes, so please review them before sending. Your notes are not
              saved unless you choose to send a consultation request.
            </p>
          </aside>

          <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            <label className="block sm:col-span-2">
              <span className={labelCls}>
                Your project notes<span className="text-gold-deep"> *</span>
              </span>
              <textarea
                rows={9}
                maxLength={BRIEF_NOTES_MAX}
                value={form.notes}
                onChange={set("notes")}
                placeholder="e.g. We've just bought a three-bedroom apartment in Nairobi. The living room feels dark and we entertain often. We love deep greens, natural wood and a bit of brass, but want it to feel calm, not heavy…"
                className={field}
                aria-invalid={!!fieldError}
                aria-describedby="notes-help"
              />
              <span id="notes-help" className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span className={fieldError ? "text-destructive" : ""}>{fieldError ?? "The more detail, the better the brief."}</span>
                <span>
                  {form.notes.length}/{BRIEF_NOTES_MAX}
                </span>
              </span>
            </label>
            <label className="block">
              <span className={labelCls}>Type of space</span>
              <input value={form.space_type} onChange={set("space_type")} placeholder="e.g. Apartment, office, restaurant" className={field} />
            </label>
            <label className="block">
              <span className={labelCls}>Project location</span>
              <input value={form.location} onChange={set("location")} placeholder="e.g. Nairobi" className={field} />
            </label>
            <label className="block">
              <span className={labelCls}>Estimated budget</span>
              <select value={form.budget} onChange={set("budget")} className={field}>
                <option value="">Prefer not to say</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={labelCls}>Desired timeline</span>
              <input value={form.timeline} onChange={set("timeline")} placeholder="e.g. Before March" className={field} />
            </label>
            {error && (
              <p role="alert" className="text-sm text-destructive sm:col-span-2">
                {error}
              </p>
            )}
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                {loading ? "Creating your brief…" : brief ? "Create a new brief" : "Create my design brief"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {brief && (
        <section id="brief-result" className="section-y scroll-mt-24 bg-soft">
          <div className="container-luxe max-w-4xl">
            <article className="border border-border bg-background p-8 sm:p-12">
              <p className="eyebrow">Your design brief · Draft</p>
              <h2 className="mt-4 text-4xl text-emerald sm:text-5xl">{brief.title}</h2>
              <span className="gold-rule mt-6" />
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{brief.summary}</p>

              <dl className="mt-10 grid gap-6 border-y border-border py-6 sm:grid-cols-2">
                <div>
                  <dt className={labelCls}>Project type</dt>
                  <dd className="mt-2 font-display text-xl text-emerald">{brief.project_type || "Not specified yet"}</dd>
                </div>
                <div>
                  <dt className={labelCls}>Budget and timeline</dt>
                  <dd className="mt-2 font-display text-xl text-emerald">{brief.budget_and_timeline || "Not specified yet"}</dd>
                </div>
              </dl>

              <div className="mt-10 grid gap-10 sm:grid-cols-2">
                <BriefList title="Spaces" items={brief.spaces} />
                <BriefList title="Style direction" items={brief.style_direction} />
                <BriefList title="Priorities" items={brief.priorities} />
                <BriefList title="Constraints" items={brief.constraints} />
              </div>

              {brief.suggested_services.length > 0 && (
                <div className="mt-10">
                  <h3 className={labelCls}>Services that may fit</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {brief.suggested_services.map((s) => (
                      <li key={s} className="border border-gold/50 px-3 py-1.5 text-xs text-emerald">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {brief.questions_to_discuss.length > 0 && (
                <div className="mt-10 bg-soft p-6">
                  <h3 className={labelCls}>Questions to discuss in your consultation</h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    {brief.questions_to_discuss.map((q) => (
                      <li key={q} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-8 text-xs text-muted-foreground">
                This draft was prepared by AI from your notes. Our designers will review and refine it with you.
              </p>

              <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
                <Button size="lg" onClick={useInConsultation}>
                  Request a consultation with this brief
                </Button>
                <Button size="lg" variant="outline-emerald" onClick={copyBrief}>
                  {copied ? <Check /> : <ClipboardCopy />} {copied ? "Copied" : "Copy brief"}
                </Button>
                <Button variant="ghost" className="h-12" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <RotateCcw /> Edit notes
                </Button>
              </div>
            </article>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Prefer to talk it through? <Link to="/contact" className="text-emerald underline underline-offset-4">Contact us</Link>.
            </p>
          </div>
        </section>
      )}
    </>
  );
}

function BriefList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className={labelCls}>{title}</h3>
      {items.length ? (
        <ul className="mt-4 space-y-2 text-sm leading-relaxed">
          {items.map((i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 h-px w-3 shrink-0 bg-gold" />
              {i}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">Not specified yet</p>
      )}
    </div>
  );
}
