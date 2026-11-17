import { z } from "zod";

const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;

const base = {
  full_name: z.string().trim().min(2, "Please enter your full name").max(120, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid phone number, e.g. +254 7XX XXX XXX"),
  service: z.string().trim().min(1, "Please choose a service").max(120),
  project_location: z.string().trim().max(160, "Location is too long").optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  description: z
    .string()
    .trim()
    .min(10, "Please tell us a little more about your project (at least 10 characters)")
    .max(3000, "Please keep your description under 3000 characters"),
};

export const inquirySchema = z.object(base);
export type InquiryInput = z.infer<typeof inquirySchema>;

export const CONSULTATION_METHOD_VALUES = ["phone", "whatsapp", "video", "in_person"] as const;

/** Returns today's date as YYYY-MM-DD in local time. */
export function todayISO(now: Date = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function makeConsultationSchema(now: Date = new Date()) {
  const today = todayISO(now);
  return z.object({
    ...base,
    preferred_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a preferred date")
      .refine((v) => v > today, "Please choose a date from tomorrow onwards"),
    method: z.enum(CONSULTATION_METHOD_VALUES, {
      errorMap: () => ({ message: "Please choose how you would like to meet" }),
    }),
  });
}
export type ConsultationInput = z.infer<ReturnType<typeof makeConsultationSchema>>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255),
});

/** Normalises optional text inputs to null before saving. */
export function emptyToNull(v: string | undefined | null) {
  const t = (v ?? "").trim();
  return t.length ? t : null;
}
