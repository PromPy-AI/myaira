export const AMOUNT = 9900;
export const CURRENCY = "INR";
export const USAGES = [
  "Remember everyday conversations",
  "Health & wellness",
  "Meetings & work",
  "Learnings",
  "Personal AI",
  "Family memories",
  "Preserving my voice & stories",
  "Something else",
];
export class PublicError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}
export function validateDetails(input: Record<string, unknown>) {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const usage = Array.isArray(input.usage) ? [...new Set(input.usage)].sort() : [];
  if (name.length < 2 || name.length > 120)
    throw new PublicError("Enter your full name (2–120 characters).");
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new PublicError("Enter a valid email address.");
  if (input.country !== "India" || input.device !== "AIRA Loop")
    throw new PublicError("Batch #1 is for AIRA Loop customers in India.");
  if (!usage.length || usage.length > 8 || usage.some((x) => !USAGES.includes(x)))
    throw new PublicError("Choose at least one use for AIRA.");
  if (input.consent !== true) throw new PublicError("Please accept the pre-booking terms.");
  return {
    name,
    email,
    usage: usage as string[],
    country: "India",
    device: "AIRA Loop",
    consent: true,
  };
}
export function validateToken(token: unknown): asserts token is string {
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token))
    throw new PublicError("Invalid receipt token.", 401);
}
export async function hash(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}
export async function verifySignature(secret: string, message: string, signature: unknown) {
  if (typeof signature !== "string" || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const bytes = Uint8Array.from(signature.match(/.{2}/g)!, (s) => parseInt(s, 16));
  return crypto.subtle.verify("HMAC", key, bytes, new TextEncoder().encode(message));
}
export type Booking = {
  id: string;
  name: string;
  email: string;
  usage: string[];
  device: string;
  key_id: string;
  mode: string;
  razorpay_order_id: string | null;
  payment_status: string;
  ticket_id: string | null;
  paid_at: string | null;
  refunded_amount: number;
};
export type Payment = {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  amount_refunded?: number;
};
export function assertPayment(payment: Payment, booking: Booking) {
  if (
    !/^pay_[A-Za-z0-9]+$/.test(payment.id) ||
    payment.order_id !== booking.razorpay_order_id ||
    payment.amount !== AMOUNT ||
    payment.currency !== CURRENCY ||
    !["created", "authorized", "captured", "refunded", "failed"].includes(payment.status) ||
    !Number.isInteger(payment.amount_refunded ?? 0) ||
    (payment.amount_refunded ?? 0) < 0 ||
    (payment.amount_refunded ?? 0) > AMOUNT ||
    (payment.status === "refunded" && !payment.amount_refunded)
  )
    throw new PublicError("Payment details could not be verified.", 409);
}
export function receipt(b: Booking) {
  return {
    name: b.name,
    device: b.device,
    reservationId: b.id,
    orderId: b.razorpay_order_id,
    status: b.payment_status,
    ticketId: b.ticket_id,
    paidAt: b.paid_at,
    mode: b.mode,
    amount: AMOUNT,
    currency: CURRENCY,
    refundedAmount: b.refunded_amount,
  };
}
