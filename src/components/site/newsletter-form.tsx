import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { newsletterSchema } from "@/lib/schemas";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setState("error");
      setMessage(parsed.error.issues[0]?.message ?? "Please enter a valid email address");
      return;
    }
    setState("loading");
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: parsed.data.email.toLowerCase() });
    if (error && error.code !== "23505") {
      setState("error");
      setMessage("We couldn't save your email. Please try again.");
      return;
    }
    setState("done");
    setMessage(error ? "You're already on our list. Thank you." : "Thank you for subscribing.");
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="mt-5" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <div className="flex border-b border-on-dark/30 focus-within:border-gold">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-on-dark placeholder:text-on-dark-muted focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="shrink-0 px-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-light transition-colors hover:text-gold disabled:opacity-60"
        >
          {state === "loading" ? <Loader2 className="size-4 animate-spin" /> : "Subscribe"}
        </button>
      </div>
      {message && (
        <p role="status" className={state === "error" ? "mt-2 text-xs text-gold-light" : "mt-2 text-xs text-on-dark-muted"}>
          {message}
        </p>
      )}
    </form>
  );
}
