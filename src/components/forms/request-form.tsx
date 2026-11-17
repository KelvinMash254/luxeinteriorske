import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { emptyToNull, inquirySchema, makeConsultationSchema, todayISO } from "@/lib/schemas";
import { BUDGET_OPTIONS, CONSULTATION_METHODS } from "@/lib/site";
import { SERVICES } from "@/lib/services";

type Values = {
  full_name: string;
  email: string;
  phone: string;
  service: string;
  project_location?: string;
  budget?: string;
  description: string;
  preferred_date?: string;
  method?: string;
};
const field = "mt-2 w-full border border-input bg-background px-4 py-3 text-sm focus:border-emerald focus:outline-none";

export function RequestForm({ kind }: { kind: "inquiry" | "consultation" }) {
  const schema = kind === "inquiry" ? inquirySchema : makeConsultationSchema();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema as never),
  });
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  async function onSubmit(v: Values) {
    setFailed(false);
    const common = {
      full_name: v.full_name!, email: v.email!, phone: v.phone!, service: v.service!,
      project_location: emptyToNull(v.project_location), budget: emptyToNull(v.budget), description: v.description!,
    };
    const { error } = kind === "inquiry"
      ? await supabase.from("inquiries").insert(common)
      : await supabase.from("consultations").insert({ ...common, preferred_date: v.preferred_date!, method: v.method! });
    if (error) { setFailed(true); return; }
    reset(); setDone(true);
  }

  if (done) {
    return (
      <div role="status" className="border border-gold/50 bg-soft p-10 text-center">
        <CheckCircle2 className="mx-auto size-10 text-emerald" />
        <h3 className="mt-5 text-3xl text-emerald">Thank you. Your request has been received.</h3>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          {kind === "consultation"
            ? "Your consultation is not yet confirmed. Our team will contact you to confirm a date that works."
            : "Our team will review your project details and get back to you."}
        </p>
        <Button variant="outline-emerald" className="mt-6" onClick={() => setDone(false)}>Send another request</Button>
      </div>
    );
  }

  const err = (k: keyof Values) => errors[k]?.message ? <p className="mt-1 text-xs text-destructive">{String(errors[k]?.message)}</p> : null;
  const label = (t: string, req = false) => <span className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">{t}{req && <span className="text-gold-deep"> *</span>}</span>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6 sm:grid-cols-2">
      <label className="block">{label("Full name", true)}<input className={field} autoComplete="name" {...register("full_name")} />{err("full_name")}</label>
      <label className="block">{label("Email address", true)}<input type="email" className={field} autoComplete="email" {...register("email")} />{err("email")}</label>
      <label className="block">{label("Phone number", true)}<input type="tel" className={field} autoComplete="tel" {...register("phone")} />{err("phone")}</label>
      <label className="block">{label("Service required", true)}
        <select className={field} defaultValue="" {...register("service")}>
          <option value="" disabled>Choose a service</option>
          {SERVICES.map((s) => <option key={s.slug}>{s.title}</option>)}
          <option>Not sure yet</option>
        </select>{err("service")}</label>
      <label className="block">{label("Project location")}<input className={field} placeholder="e.g. Nairobi" {...register("project_location")} />{err("project_location")}</label>
      <label className="block">{label("Estimated budget")}
        <select className={field} defaultValue="" {...register("budget")}>
          <option value="">Prefer not to say</option>
          {BUDGET_OPTIONS.map((b) => <option key={b}>{b}</option>)}
        </select></label>
      {kind === "consultation" && (
        <>
          <label className="block">{label("Preferred date", true)}<input type="date" min={todayISO()} className={field} {...register("preferred_date")} />{err("preferred_date")}</label>
          <label className="block">{label("Preferred method", true)}
            <select className={field} defaultValue="" {...register("method")}>
              <option value="" disabled>Choose a method</option>
              {CONSULTATION_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>{err("method")}</label>
        </>
      )}
      <label className="block sm:col-span-2">{label("Project description", true)}<textarea rows={5} className={field} {...register("description")} />{err("description")}</label>
      {failed && <p role="alert" className="text-sm text-destructive sm:col-span-2">We couldn't send your request. Please try again, or contact us by phone or WhatsApp.</p>}
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="animate-spin" />}
          {kind === "consultation" ? "Request Consultation" : "Send Inquiry"}
        </Button>
      </div>
    </form>
  );
}
