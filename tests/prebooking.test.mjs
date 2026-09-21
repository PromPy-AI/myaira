import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import {
  AMOUNT,
  validateDetails,
  validateToken,
  verifySignature,
  assertPayment,
  receipt,
} from "../supabase/functions/aira-prebook/core.ts";

const env = {
  SUPABASE_URL: "https://database.example",
  SUPABASE_SERVICE_ROLE_KEY: "server-only-secret",
  RAZORPAY_KEY_ID: "rzp_test_example",
  RAZORPAY_SECRET: "test-secret",
  RAZORPAY_WEBHOOK_SECRET: "webhook-secret",
  AIRA_PAYMENTS_ENABLED: "true",
  AIRA_ALLOWED_ORIGINS: "http://localhost:8080",
};
globalThis.Deno = { env: { get: (key) => env[key] }, serve: () => {} };
const { handleRequest } = await import("../supabase/functions/aira-prebook/index.ts");
delete env.RAZORPAY_SECRET;
const { handleRequest: disabledHandler } =
  await import("../supabase/functions/aira-prebook/index.ts?disabled");
env.RAZORPAY_SECRET = "test-secret";
delete env.RAZORPAY_WEBHOOK_SECRET;
env.AIRA_PAYMENTS_ENABLED = "false";
const { handleRequest: keyPairHandler } =
  await import("../supabase/functions/aira-prebook/index.ts?key-pair-only");
env.RAZORPAY_WEBHOOK_SECRET = "webhook-secret";
env.AIRA_PAYMENTS_ENABLED = "true";
const sign = (secret, value) => createHmac("sha256", secret).update(value).digest("hex");
const token = "a".repeat(64);
const details = {
  name: "Test Customer",
  email: "TEST@example.com",
  country: "India",
  device: "AIRA Loop",
  usage: ["Meetings & work"],
  consent: true,
};
const booking = {
  usage: ["Meetings & work"],
  device: "AIRA Loop",
  id: "12345678-1234-1234-1234-123456789abc",
  name: details.name,
  email: "test@example.com",
  key_id: env.RAZORPAY_KEY_ID,
  mode: "test",
  razorpay_order_id: "order_example",
  payment_status: "pending",
  ticket_id: null,
  paid_at: null,
  refunded_amount: 0,
};
const payment = {
  id: "pay_example",
  order_id: "order_example",
  amount: 9900,
  currency: "INR",
  status: "captured",
  amount_refunded: 0,
};
function request(action, data = {}) {
  return new Request("https://edge.example/aira-prebook", {
    method: "POST",
    headers: {
      origin: "http://localhost:8080",
      apikey: "sb_publishable_bKSs08g8dctPvH6v7UBzjA_OJ9GemtR",
      "content-type": "application/json",
    },
    body: JSON.stringify({ action, token, ...data }),
  });
}
function fixture(t, { p = payment, b = booking, isNew = false } = {}) {
  const state = { b: { ...b }, orderCreates: 0, reconciles: [] };
  t.mock.method(globalThis, "fetch", async (url, options = {}) => {
    const path = new URL(url).pathname;
    const body = options.body ? JSON.parse(options.body) : null;
    if (path.startsWith("/rest/v1/")) {
      assert.equal(options.headers.apikey, "server-only-secret");
      if (path.endsWith("/rpc/aira_start_prebooking"))
        return Response.json({ is_new: isNew, booking: state.b });
      if (path.endsWith("/rpc/aira_reconcile_prebooking")) {
        state.reconciles.push(body);
        state.b = {
          ...state.b,
          payment_status:
            body.p_status === "captured"
              ? "paid"
              : body.p_status === "refunded"
                ? "refunded"
                : "pending",
          ticket_id: body.p_status === "captured" ? "TEST-AI500RA1" : null,
        };
        return Response.json(state.b);
      }
      if (path.endsWith("/aira_prebookings")) {
        if (options.method === "PATCH") state.b = { ...state.b, ...body };
        return Response.json([state.b]);
      }
    }
    if (path === "/v1/orders" && options.method === "POST") {
      state.orderCreates++;
      assert.equal(body.amount, 9900);
      assert.equal(body.currency, "INR");
      assert.equal(body.receipt, booking.id);
      return Response.json({ id: "order_example", amount: 9900, currency: "INR" });
    }
    if (path === "/v1/payments/pay_example") return Response.json(p);
    if (path === "/v1/orders/order_example/payments") return Response.json({ items: [p] });
    if (path === "/v1/orders/order_example")
      return Response.json({
        id: "order_example",
        amount: 9900,
        currency: "INR",
        receipt: booking.id,
        notes: { prebooking_id: booking.id },
      });
    throw new Error(`Unexpected request: ${url}`);
  });
  return state;
}
test("key and secret enable checkout without webhook or enable flag", async (t) => {
  const s = fixture(t, { isNew: true, b: { ...booking, razorpay_order_id: null } });
  const config = await keyPairHandler(request("config"));
  assert.equal((await config.json()).enabled, true);
  const res = await keyPairHandler(request("create", { details }));
  assert.equal(res.status, 200);
  assert.equal(s.orderCreates, 1);
});
test("callback verifies captured payment and returns ticket without webhook", async (t) => {
  const s = fixture(t);
  const res = await keyPairHandler(
    request("verify", {
      orderId: "order_example",
      paymentId: "pay_example",
      signature: sign("test-secret", "order_example|pay_example"),
    }),
  );
  assert.equal(res.status, 200);
  assert.equal((await res.json()).ticketId, "TEST-AI500RA1");
  assert.equal(s.reconciles.length, 1);
});
test("status recovers a completed payment without webhook delivery", async (t) => {
  fixture(t);
  const res = await keyPairHandler(request("status"));
  assert.equal(res.status, 200);
  assert.equal((await res.json()).status, "paid");
});
test("absent webhook secret does not permit unsigned webhook requests", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", () => {
    throw new Error("must not fetch");
  });
  const res = await keyPairHandler(
    new Request("https://edge.example/aira-prebook/webhook", { method: "POST", body: "{}" }),
  );
  assert.equal(res.status, 401);
  assert.equal(mock.mock.callCount(), 0);
});
test("missing payment credentials disable checkout without storing customer details", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", () => {
    throw new Error("must not fetch");
  });
  const config = await disabledHandler(request("config"));
  assert.equal((await config.json()).enabled, false);
  const result = await disabledHandler(request("create", { details }));
  assert.equal(result.status, 503);
  assert.equal(mock.mock.callCount(), 0);
});
test("accepts intended form data and normalizes email", () => {
  assert.equal(validateDetails(details).email, "test@example.com");
  for (const patch of [
    { country: "USA" },
    { device: "Other" },
    { consent: false },
    { usage: [] },
    { usage: ["fake"] },
    { email: "invalid" },
    { name: "x" },
  ])
    assert.throws(() => validateDetails({ ...details, ...patch }));
  assert.throws(() => validateToken("AI500RA1"));
});
test("HMAC verifies exact message, rejects tampering and malformed signatures", async () => {
  const message = "order_example|pay_example";
  assert.equal(await verifySignature("secret", message, sign("secret", message)), true);
  assert.equal(await verifySignature("secret", message + "x", sign("secret", message)), false);
  assert.equal(await verifySignature("wrong", message, sign("secret", message)), false);
  assert.equal(await verifySignature("secret", message, "bogus"), false);
});
test("rejects wrong orders, prices, currency, status, and invalid refund values", () => {
  assert.doesNotThrow(() => assertPayment(payment, booking));
  for (const patch of [
    { order_id: "order_other" },
    { amount: 99 },
    { currency: "USD" },
    { id: "bad" },
    { status: "fake" },
    { amount_refunded: -1 },
    { amount_refunded: 10000 },
    { status: "refunded", amount_refunded: 0 },
  ])
    assert.throws(() => assertPayment({ ...payment, ...patch }, booking));
});
test("receipt includes requested identity but omits email and secret access token", () => {
  const result = receipt({ ...booking, token_hash: token });
  assert.equal(result.amount, AMOUNT);
  assert.equal(result.name, booking.name);
  assert.equal(result.device, "AIRA Loop");
  for (const key of ["email", "token_hash", "key_id"]) assert.equal(key in result, false);
});
test("public requests require approved origin and correct API key", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", () => {
    throw new Error("must not fetch");
  });
  const req = request("config");
  req.headers.set("origin", "https://untrusted.example");
  assert.equal((await handleRequest(req)).status, 403);
  const req2 = request("config");
  req2.headers.set("apikey", "wrong");
  assert.equal((await handleRequest(req2)).status, 403);
  assert.equal(mock.mock.callCount(), 0);
});
test("server creates INR 99 order; client cannot override amount", async (t) => {
  const s = fixture(t, { isNew: true, b: { ...booking, razorpay_order_id: null } });
  const res = await handleRequest(request("create", { details, amount: 1, currency: "USD" }));
  assert.equal(res.status, 200);
  assert.equal(s.orderCreates, 1);
  const data = await res.json();
  assert.equal(data.orderId, "order_example");
  assert.equal(data.amount, 9900);
});
test("repeated create reuses stored order without creating another charge", async (t) => {
  const s = fixture(t);
  const res = await handleRequest(request("create", { details }));
  assert.equal(res.status, 200);
  assert.equal(s.orderCreates, 0);
});
test("tampered checkout callback cannot reconcile or issue ticket", async (t) => {
  const s = fixture(t);
  const res = await handleRequest(
    request("verify", {
      orderId: "order_example",
      paymentId: "pay_example",
      signature: "0".repeat(64),
    }),
  );
  assert.equal(res.status, 401);
  assert.equal(s.reconciles.length, 0);
});
test("signed callback still requires matching provider amount", async (t) => {
  const s = fixture(t, { p: { ...payment, amount: 1 } });
  const res = await handleRequest(
    request("verify", {
      orderId: "order_example",
      paymentId: "pay_example",
      signature: sign("test-secret", "order_example|pay_example"),
    }),
  );
  assert.equal(res.status, 409);
  assert.equal(s.reconciles.length, 0);
});
test("valid captured payment reaches backend-only reconciliation", async (t) => {
  const s = fixture(t);
  const res = await handleRequest(
    request("verify", {
      orderId: "order_example",
      paymentId: "pay_example",
      signature: sign("test-secret", "order_example|pay_example"),
    }),
  );
  assert.equal(res.status, 200);
  assert.equal(s.reconciles.length, 1);
  assert.equal(s.reconciles[0].p_status, "captured");
  assert.equal((await res.json()).ticketId, "TEST-AI500RA1");
});
test("authorized payment remains pending with no success ticket", async (t) => {
  fixture(t, { p: { ...payment, status: "authorized" } });
  const res = await handleRequest(request("status"));
  const data = await res.json();
  assert.equal(data.status, "pending");
  assert.equal(data.ticketId, null);
});
test("webhook rejects invalid raw-body signature without any database requests", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", () => {
    throw new Error("must not fetch");
  });
  const res = await handleRequest(
    new Request("https://edge.example/aira-prebook/webhook", {
      method: "POST",
      body: "{}",
      headers: { "x-razorpay-signature": "0".repeat(64) },
    }),
  );
  assert.equal(res.status, 401);
  assert.equal(mock.mock.callCount(), 0);
});
test("verified webhook recovers order association after lost create response", async (t) => {
  const s = fixture(t, { b: { ...booking, razorpay_order_id: null } });
  const body = JSON.stringify({
    event: "payment.captured",
    payload: { payment: { entity: { id: "pay_example" } } },
  });
  const res = await handleRequest(
    new Request("https://edge.example/aira-prebook/webhook", {
      method: "POST",
      body,
      headers: { "x-razorpay-signature": sign("webhook-secret", body) },
    }),
  );
  assert.equal(res.status, 200);
  assert.equal(s.b.razorpay_order_id, "order_example");
  assert.equal(s.reconciles.length, 1);
});
test("refund webhook uses provider refund amount, not untrusted payload value", async (t) => {
  const s = fixture(t, { p: { ...payment, status: "refunded", amount_refunded: 9900 } });
  const body = JSON.stringify({
    event: "refund.processed",
    payload: { refund: { entity: { payment_id: "pay_example", amount: 1 } } },
  });
  const res = await handleRequest(
    new Request("https://edge.example/aira-prebook/webhook", {
      method: "POST",
      body,
      headers: { "x-razorpay-signature": sign("webhook-secret", body) },
    }),
  );
  assert.equal(res.status, 200);
  assert.equal(s.reconciles[0].p_refunded, 9900);
});

test("edit loads saved details without creating another order", async (t) => {
  const s = fixture(t, { p: { ...payment, status: "failed" } });
  const res = await keyPairHandler(request("edit"));
  assert.equal(res.status, 200);
  assert.deepEqual((await res.json()).details, {
    name: booking.name,
    email: booking.email,
    usage: booking.usage,
  });
  assert.equal(s.orderCreates, 0);
});
test("update persists edited fields and retains the original order", async (t) => {
  const s = fixture(t, { p: { ...payment, status: "failed" } });
  const res = await keyPairHandler(
    request("update", {
      details: {
        ...details,
        name: "Changed Name",
        email: "changed@example.com",
        usage: ["Personal AI"],
      },
    }),
  );
  assert.equal(res.status, 200);
  assert.equal(s.b.name, "Changed Name");
  assert.equal(s.b.email, "changed@example.com");
  assert.deepEqual(s.b.usage, ["Personal AI"]);
  assert.equal(s.b.razorpay_order_id, booking.razorpay_order_id);
  assert.equal(s.orderCreates, 0);
});
test("captured payments cannot be edited", async (t) => {
  const s = fixture(t);
  const res = await keyPairHandler(
    request("update", { details: { ...details, name: "Changed Name" } }),
  );
  assert.equal(res.status, 200);
  assert.equal((await res.json()).status, "paid");
  assert.equal(s.b.name, booking.name);
});
test("authorized payments block editing until confirmed", async (t) => {
  const s = fixture(t, { p: { ...payment, status: "authorized" } });
  const res = await keyPairHandler(
    request("update", { details: { ...details, name: "Changed Name" } }),
  );
  assert.equal(res.status, 409);
  assert.equal(s.b.name, booking.name);
});
test("edit requires the private receipt token", async (t) => {
  const s = fixture(t);
  const res = await keyPairHandler(request("edit", { token: "AI500RA1" }));
  assert.equal(res.status, 401);
  assert.equal(s.reconciles.length, 0);
});
