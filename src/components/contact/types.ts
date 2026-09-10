import { z } from "zod";

export const CONTACT_SUBJECTS = [
  { id: "seo", label: "SEO Services" },
  { id: "web", label: "Web Development" },
  { id: "branding", label: "Branding & Creative" },
  { id: "marketing", label: "Performance Marketing" },
  { id: "other", label: "Other" },
];

// ─── Form Schema ────────────────────────────────────────────────
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Please leave a message (at least 10 characters)"),
  // Honeypot: real visitors never see or fill this field (hidden off-screen).
  // Deliberately unconstrained here — the API route checks it and quietly
  // no-ops instead of saving, rather than rejecting it as a validation
  // error (which would tip off a bot that it tripped a trap).
  website_url: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
