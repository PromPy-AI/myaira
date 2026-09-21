const endpoint = "https://pybtosxsnfblfeswgojb.supabase.co/functions/v1/aira-prebook";
const publicKey = "sb_publishable_bKSs08g8dctPvH6v7UBzjA_OJ9GemtR";
const storageKey = "aira-prebooking-receipt-v1";

export type Receipt = {
  name?: string;
  device?: string;
  details?: { name: string; email: string; usage: string[] };
  reservationId: string;
  orderId: string | null;
  status: string;
  ticketId: string | null;
  mode: "test" | "live";
  amount: number;
  currency: string;
  refundedAmount: number;
  paidAt: string | null;
  keyId?: string;
  prefill?: { name: string; email: string };
};
export class PrebookingError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
export async function prebookingRequest<T>(
  action: string,
  data: Record<string, unknown> = {},
): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: publicKey },
    body: JSON.stringify({ action, ...data }),
    signal: AbortSignal.timeout(30000),
  });
  const result = await response.json();
  if (!response.ok)
    throw new PrebookingError(
      result.error || "Unable to check your pre-booking. Please try again.",
      response.status,
    );
  return result as T;
}
export function savedToken() {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}
export function makeToken() {
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
  // Persist before any request: a refresh must not accidentally create a second order.
  try {
    localStorage.setItem(storageKey, token);
  } catch {
    throw new Error("Please allow browser storage so we can safely recover your payment.");
  }
  return token;
}
export function clearUnusedToken() {
  localStorage.removeItem(storageKey);
}

type CheckoutResult = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  image: string;
  prefill?: { name: string; email: string };
  theme: { color: string; backdrop_color: string };
  modal: { ondismiss: () => void; confirm_close: boolean };
  handler: (result: CheckoutResult) => void;
};
type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", callback: () => void) => void;
};
declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
let checkoutScript: Promise<void> | undefined;
export function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve();
  if (!checkoutScript)
    checkoutScript = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      const timer = window.setTimeout(() => fail(), 15000);
      function fail() {
        clearTimeout(timer);
        script.remove();
        checkoutScript = undefined;
        reject(new Error("Checkout could not load. Check your connection and try again."));
      }
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        clearTimeout(timer);
        if (window.Razorpay) resolve();
        else fail();
      };
      script.onerror = fail;
      document.head.appendChild(script);
    });
  return checkoutScript;
}

export const prebookingBenefits = [
  "Reserve a spot in the initial batch",
  "₹99 fully refundable · credited toward your device order",
  "₹5,000 off AIRA Loop",
  "6 months of complimentary subscription",
  "Monthly insider updates",
  "Exclusive benefits, enhanced warranty & more surprises to come",
];
