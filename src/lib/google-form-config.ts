import { z } from "zod";

export const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSe3beJyYrFt3ZAhtMRYrLtnU-_YdqdC5DV45e6wF7OZqyIDew/formResponse";
export const GOOGLE_FORM_EMAIL_ENTRY = "entry.1695628208";

export const PREBOOK_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSd1mh1cEgaaCWwTavEu1OojHRF7L0YJ9wCwQBzgVYOKGPKDqg/formResponse";
export const PREBOOK_ENTRY = {
  name: "entry.1927162729",
  email: "entry.1393360373",
  country: "entry.646913968",
  usage: "entry.1442413605",
  device: "entry.758994742",
  consent: "entry.1565231005",
} as const;

export const PREBOOK_DEVICE = "AIRA Loop (Wrist band )";
export const PREBOOK_CONSENT_VALUE =
  "I agree to AIRA’s Privacy & Terms, consent to the processing of my personal information, and agree to receive communications from AIRA via email.";

export const prebookUsageOptions = [
  "Remember everyday conversations",
  "Health & wellness",
  "Meetings & work",
  "Learnings",
  "Personal AI",
  "Family memories",
  "Preserving my voice & stories",
  "Something else",
] as const;

const emailSchema = z.string().trim().email("Enter a valid email address.").max(254);

export const signupSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("waitlist"), email: emailSchema }),
  z.object({
    kind: z.literal("prebook"),
    name: z.string().trim().min(1, "Enter your name.").max(150),
    email: emailSchema,
    country: z.string().trim().min(1, "Enter your country.").max(100),
    usage: z.array(z.enum(prebookUsageOptions)).min(1, "Select at least one use case.").max(8),
    device: z.literal(PREBOOK_DEVICE),
    consent: z.literal(PREBOOK_CONSENT_VALUE),
  }),
]);

export type SignupData = z.infer<typeof signupSchema>;
export type SignupResult = { ok: true } | { ok: false; message: string };
