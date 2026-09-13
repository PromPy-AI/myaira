import test from "node:test";
import assert from "node:assert/strict";
import { submitGoogleForm } from "../src/lib/google-forms.server.ts";
import {
  GOOGLE_FORM_ACTION,
  GOOGLE_FORM_EMAIL_ENTRY,
  PREBOOK_FORM_ACTION,
  PREBOOK_ENTRY,
  PREBOOK_DEVICE,
  PREBOOK_CONSENT_VALUE,
} from "../src/lib/google-form-config.ts";

// Response fixtures only; these tests never create real Google Form entries.
function googleResponse(html, { status = 200, url = PREBOOK_FORM_ACTION } = {}) {
  const response = new Response(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
  Object.defineProperty(response, "url", { value: url });
  return response;
}

const prebook = {
  kind: "prebook",
  name: "Test & Example",
  email: "test@example.com",
  country: "India",
  usage: ["Remember everyday conversations", "Health & wellness"],
  device: PREBOOK_DEVICE,
  consent: PREBOOK_CONSENT_VALUE,
};
const confirmation = '<div class="vHW8K">Your response has been recorded.</div>';

test("reservation sends all mapped fields and preserves multiple selections", async () => {
  let requests = 0;
  const result = await submitGoogleForm(prebook, async (url, options) => {
    requests++;
    assert.equal(url, `${PREBOOK_FORM_ACTION}?hl=en`);
    assert.equal(options.method, "POST");
    assert.equal(options.body.get(PREBOOK_ENTRY.name), prebook.name);
    assert.equal(options.body.get(PREBOOK_ENTRY.email), prebook.email);
    assert.equal(options.body.get(PREBOOK_ENTRY.country), prebook.country);
    assert.equal(options.body.get(PREBOOK_ENTRY.device), prebook.device);
    assert.equal(options.body.get(PREBOOK_ENTRY.consent), prebook.consent);
    assert.deepEqual(options.body.getAll(PREBOOK_ENTRY.usage), prebook.usage);
    assert.equal(options.body.get("pageHistory"), "0");
    assert.ok(options.signal instanceof AbortSignal);
    return googleResponse(confirmation);
  });
  assert.deepEqual(result, { ok: true });
  assert.equal(requests, 1);
});

test("waitlist sends the email to its own form and waits for confirmation", async () => {
  const result = await submitGoogleForm(
    { kind: "waitlist", email: "  test@example.com  " },
    async (url, options) => {
      assert.equal(url, `${GOOGLE_FORM_ACTION}?hl=en`);
      assert.equal(options.body.get(GOOGLE_FORM_EMAIL_ENTRY), "test@example.com");
      assert.equal(options.body.has(PREBOOK_ENTRY.name), false);
      return googleResponse(confirmation, { url: GOOGLE_FORM_ACTION });
    },
  );
  assert.deepEqual(result, { ok: true });
});

test("accepts Google's custom confirmation text", async () => {
  const result = await submitGoogleForm(prebook, async () =>
    googleResponse(
      '<div class="freebirdFormviewerViewResponseConfirmationMessage">Thanks for reserving your AIRA.</div>',
    ),
  );
  assert.deepEqual(result, { ok: true });
});

for (const [name, html] of [
  [
    "validation page",
    '<form action="formResponse"><input name="entry.1927162729" required></form>',
  ],
  ["closed form", "This form is no longer accepting responses."],
  ["unstructured thank-you text", "Your response has been recorded."],
  ["empty acknowledgement", '<div class="vHW8K"></div>'],
]) {
  test(`does not treat HTTP 200 ${name} as confirmation`, async () => {
    const result = await submitGoogleForm(prebook, async () => googleResponse(html));
    assert.equal(result.ok, false);
  });
}

test("rejects a sign-in redirect even when the status is 200", async () => {
  const result = await submitGoogleForm(prebook, async () =>
    googleResponse(confirmation, { url: "https://accounts.google.com/ServiceLogin" }),
  );
  assert.equal(result.ok, false);
});

for (const status of [400, 403, 429, 500]) {
  test(`does not report success for HTTP ${status}`, async () => {
    const result = await submitGoogleForm(prebook, async () =>
      googleResponse(confirmation, { status }),
    );
    assert.equal(result.ok, false);
  });
}

test("a timeout returns an uncertain result without automatically resubmitting", async () => {
  let requests = 0;
  const result = await submitGoogleForm(prebook, async () => {
    requests++;
    throw new DOMException("Timed out", "TimeoutError");
  });
  assert.equal(result.ok, false);
  assert.match(result.message, /may have reached us/);
  assert.equal(requests, 1);
});

test("invalid email, missing consent and empty use cases never reach Google", async () => {
  for (const input of [
    { kind: "waitlist", email: "invalid" },
    { ...prebook, consent: "" },
    { ...prebook, usage: [] },
    { ...prebook, device: "not a supported device" },
  ]) {
    const result = await submitGoogleForm(input, async () =>
      assert.fail("Must not send invalid data"),
    );
    assert.equal(result.ok, false);
  }
});
