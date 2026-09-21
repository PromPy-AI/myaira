import {
  AMOUNT,
  CURRENCY,
  PublicError,
  validateDetails,
  validateToken,
  hash,
  verifySignature,
  assertPayment,
  receipt,
  type Booking,
  type Payment,
} from "./core.ts";

const env = (key: string) => Deno.env.get(key) || "";
const publicKey = "sb_publishable_bKSs08g8dctPvH6v7UBzjA_OJ9GemtR";
const origins = [
  "https://myaira.life",
  "https://www.myaira.life",
  ...(env("AIRA_ALLOWED_ORIGINS") || "http://localhost:8080,https://useaira.netlify.app")
    .split(",")
    .map((s) => s.trim()),
];
const keyId = env("RAZORPAY_KEY_ID");
const keySecret = env("RAZORPAY_SECRET") || env("RAZORPAY_KEY_SECRET");
const webhookSecret = env("RAZORPAY_WEBHOOK_SECRET");
// Checkout needs only the merchant key pair. Webhooks are an optional recovery path.
const ready = Boolean(/^rzp_(test|live)_/.test(keyId) && keySecret);
const mode = keyId.startsWith("rzp_live_") ? "live" : "test";

type Order = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  notes?: { prebooking_id?: string };
};
async function db<T = Booking[]>(path: string, method = "GET", body?: unknown): Promise<T> {
  const secretKeys = JSON.parse(env("SUPABASE_SECRET_KEYS") || "{}");
  const legacy = env("SUPABASE_SERVICE_ROLE_KEY");
  const secret = secretKeys.default || legacy;
  if (!secret) throw new Error("Database configuration missing");
  const response = await fetch(`${env("SUPABASE_URL")}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: secret,
      ...(secret === legacy ? { Authorization: `Bearer ${legacy}` } : {}),
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    if (error.message?.includes("RATE_LIMIT"))
      throw new PublicError("Too many pre-booking attempts. Please try again later.", 429);
    if (error.message?.includes("REQUEST_CONFLICT"))
      throw new PublicError(
        "A checkout already exists in this browser. Use Resume checkout or Check payment status.",
        409,
      );
    throw new Error(`Database request failed (${response.status})`);
  }
  return response.json();
}
async function razorpay<T = Order>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`https://api.razorpay.com/v1/${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
      "Content-Type": "application/json",
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Payment provider request failed (${response.status})`);
  return response.json();
}
function requireKeys(b?: Booking) {
  if (!ready)
    throw new PublicError(
      "Payments are currently unavailable. If you’ve already paid, keep your payment reference and contact AIRA.",
      503,
    );
  if (b && b.key_id !== keyId)
    throw new PublicError(
      "This checkout belongs to an earlier payment configuration. Contact AIRA with your reservation reference.",
      409,
    );
}
async function bookingForToken(token: unknown): Promise<Booking> {
  validateToken(token);
  const rows = await db(`aira_prebookings?token_hash=eq.${await hash(token)}&limit=1`);
  if (!rows[0])
    throw new PublicError(
      "No checkout found for this receipt. You can start your pre-booking.",
      404,
    );
  return rows[0];
}
async function reconcile(b: Booking, payment: Payment): Promise<Booking> {
  assertPayment(payment, b);
  return db<Booking>("rpc/aira_reconcile_prebooking", "POST", {
    p_id: b.id,
    p_order_id: b.razorpay_order_id,
    p_payment_id: payment.id,
    p_amount: payment.amount,
    p_currency: payment.currency,
    p_status: payment.status,
    p_refunded: payment.amount_refunded || 0,
  });
}
async function refresh(b: Booking, forEdit = false): Promise<Booking> {
  requireKeys(b);
  if (!b.razorpay_order_id) return b;
  const { items } = await razorpay<{ items: Payment[] }>(
    `orders/${encodeURIComponent(b.razorpay_order_id)}/payments`,
  );
  const payments = items as Payment[];
  const successful = payments.find((p) => p.status === "captured" || p.status === "refunded");
  if (forEdit && !successful && payments.some((p) => p.status === "authorized"))
    throw new PublicError("Your payment is processing. Check payment status before editing.", 409);
  const current =
    successful ||
    payments.find((p) => p.status === "authorized") ||
    payments.find((p) => p.status === "failed");
  return current ? reconcile(b, current) : b;
}

export async function handleRequest(req: Request): Promise<Response> {
  const origin = req.headers.get("origin") || "";
  const cors: Record<string, string> = origins.includes(origin)
    ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" }
    : {};
  const headers = {
    ...cors,
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Headers": "apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  const respond = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers });
  try {
    const isWebhook = new URL(req.url).pathname.endsWith("/webhook");
    if (req.method === "OPTIONS" && !isWebhook) return new Response(null, { status: 204, headers });
    if (req.method !== "POST") return respond({ error: "Method not allowed." }, 405);
    if (!isWebhook && (!origins.includes(origin) || req.headers.get("apikey") !== publicKey))
      return respond({ error: "Unauthorized request." }, 403);
    if (Number(req.headers.get("content-length") || 0) > 16000)
      return respond({ error: "Request too large." }, 413);
    const raw = await req.text();
    if (raw.length > 16000) return respond({ error: "Request too large." }, 413);

    if (isWebhook) {
      if (
        !webhookSecret ||
        !(await verifySignature(webhookSecret, raw, req.headers.get("x-razorpay-signature")))
      )
        return respond({ error: "Invalid signature." }, 401);
      const event = JSON.parse(raw);
      if (
        !["payment.captured", "payment.failed", "order.paid", "refund.processed"].includes(
          event.event,
        )
      )
        return respond({ received: true });
      const paymentId =
        event.payload?.payment?.entity?.id || event.payload?.refund?.entity?.payment_id;
      if (typeof paymentId !== "string" || !/^pay_[A-Za-z0-9]+$/.test(paymentId))
        return respond({ error: "Missing payment." }, 400);
      const payment = await razorpay<Payment>(`payments/${paymentId}`);
      const order = await razorpay(`orders/${encodeURIComponent(payment.order_id)}`);
      const id = order.notes?.prebooking_id;
      if (typeof id !== "string" || !/^[0-9a-f-]{36}$/.test(id)) return respond({ received: true });
      let [b] = (await db(`aira_prebookings?id=eq.${id}&limit=1`)) as Booking[];
      if (!b) throw new Error("Reservation not available yet");
      if (
        b.key_id !== keyId ||
        order.receipt !== b.id ||
        order.amount !== AMOUNT ||
        order.currency !== CURRENCY
      )
        throw new PublicError("Order mismatch.", 409);
      // Recover if order creation succeeded but the browser/server lost its response.
      if (!b.razorpay_order_id) {
        await db(`aira_prebookings?id=eq.${b.id}&razorpay_order_id=is.null`, "PATCH", {
          razorpay_order_id: order.id,
          payment_status: "pending",
        });
        [b] = await db(`aira_prebookings?id=eq.${b.id}&limit=1`);
      }
      await reconcile(b!, payment);
      return respond({ received: true });
    }

    const data = JSON.parse(raw);
    if (data.action === "config") return respond({ enabled: ready, mode: ready ? mode : null });
    if (data.action === "create") {
      requireKeys();
      validateToken(data.token);
      const details = validateDetails(data.details || {});
      const result = await db<{ is_new: boolean; booking: Booking }>(
        "rpc/aira_start_prebooking",
        "POST",
        {
          p_token_hash: await hash(data.token),
          p_request_hash: await hash(JSON.stringify(details)),
          p_name: details.name,
          p_email: details.email,
          p_usage: details.usage,
          p_mode: mode,
          p_key_id: keyId,
        },
      );
      let b: Booking = result.booking;
      requireKeys(b);
      if (result.is_new) {
        const order = await razorpay("orders", {
          amount: AMOUNT,
          currency: CURRENCY,
          receipt: b.id,
          notes: { prebooking_id: b.id, device: "AIRA Loop", batch: "India Batch #1" },
        });
        if (
          !/^order_[A-Za-z0-9]+$/.test(order.id) ||
          order.amount !== AMOUNT ||
          order.currency !== CURRENCY
        )
          throw new Error("Invalid order response");
        [b] = await db(`aira_prebookings?id=eq.${b.id}`, "PATCH", {
          razorpay_order_id: order.id,
          payment_status: "pending",
          updated_at: new Date().toISOString(),
        });
      }
      return respond({ ...receipt(b), keyId });
    }
    if (data.action === "edit" || data.action === "update") {
      let b = await bookingForToken(data.token);
      b = await refresh(b, true);
      if (b.paid_at || ["paid", "partially_refunded", "refunded"].includes(b.payment_status))
        return respond(receipt(b));
      if (!b.razorpay_order_id)
        throw new PublicError(
          "Your checkout is still being prepared. Please check payment status before editing.",
          409,
        );
      if (data.action === "update") {
        const details = validateDetails(data.details || {});
        const [updated] = await db(
          `aira_prebookings?id=eq.${b.id}&paid_at=is.null&payment_status=in.(pending,failed)`,
          "PATCH",
          {
            name: details.name,
            email: details.email,
            usage: details.usage,
            request_hash: await hash(JSON.stringify(details)),
            consent_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        );
        if (!updated)
          throw new PublicError(
            "Your payment status changed. Check its status before editing.",
            409,
          );
        b = updated;
      }
      return respond({
        ...receipt(b),
        keyId,
        prefill: { name: b.name, email: b.email },
        details: { name: b.name, email: b.email, usage: b.usage },
      });
    }
    if (data.action === "status" || data.action === "resume" || data.action === "verify") {
      let b = await bookingForToken(data.token);
      requireKeys(b);
      if (data.action === "verify") {
        if (
          !b.razorpay_order_id ||
          data.orderId !== b.razorpay_order_id ||
          typeof data.paymentId !== "string" ||
          !/^pay_[A-Za-z0-9]+$/.test(data.paymentId) ||
          !(await verifySignature(
            keySecret,
            `${b.razorpay_order_id}|${data.paymentId}`,
            data.signature,
          ))
        )
          throw new PublicError("Payment signature could not be verified.", 401);
        b = await reconcile(b, await razorpay<Payment>(`payments/${data.paymentId}`));
      } else {
        b = await refresh(b);
      }
      return respond({
        ...receipt(b),
        ...(data.action === "resume" ? { keyId, prefill: { name: b.name, email: b.email } } : {}),
      });
    }
    return respond({ error: "Unknown action." }, 400);
  } catch (error) {
    if (error instanceof PublicError) return respond({ error: error.message }, error.status);
    if (error instanceof SyntaxError) return respond({ error: "Invalid request." }, 400);
    // Avoid logging request bodies, payment signatures, personal data or secrets.
    console.error(
      "aira-prebook request failed",
      error instanceof Error ? error.name : "UnknownError",
    );
    return respond(
      {
        error:
          "We could not confirm the payment service response. Check payment status before trying again; do not pay twice.",
      },
      503,
    );
  }
}
Deno.serve(handleRequest);
