// Run after `npm run build`. Exercises the actual compiled HTTP endpoint and CSRF middleware.
// All outbound requests are mocked; no Google Form submissions are made.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { fromCrossJSON, toJSON } from "seroval";
import server from "../node_modules/.nitro/vite/services/ssr/index.js";

const assets = new URL("../node_modules/.nitro/vite/services/ssr/assets/", import.meta.url);
const handlerFile = (await readdir(assets)).find(
  (file) => file.startsWith("submit-signup") && file.endsWith(".js"),
);
assert.ok(handlerFile, "Build the app before running endpoint tests");
const compiledHandler = await readFile(new URL(handlerFile, assets), "utf8");
const id = compiledHandler.match(/id: "([a-f0-9]+)"/)?.[1];
assert.ok(id, "Expected a registered signup server function");

function request(data, crossSite = false) {
  return new Request(`http://localhost:8080/_serverFn/${id}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tsr-serverFn": "true",
      origin: crossSite ? "https://unrelated.example" : "http://localhost:8080",
      "sec-fetch-site": crossSite ? "cross-site" : "same-origin",
    },
    body: JSON.stringify(toJSON({ data, context: {} })),
  });
}

const waitlist = { kind: "waitlist", email: "test@example.com" };
const prebook = {
  kind: "prebook",
  name: "Test Example",
  email: "test@example.com",
  country: "India",
  usage: ["Health & wellness", "Remember everyday conversations"],
  device: "AIRA Loop (Wrist band )",
  consent:
    "I agree to AIRA’s Privacy & Terms, consent to the processing of my personal information, and agree to receive communications from AIRA via email.",
};

for (const data of [waitlist, prebook]) {
  test(`compiled ${data.kind} endpoint returns confirmed success to the client`, async (t) => {
    const stub = t.mock.method(globalThis, "fetch", async (url, options) => {
      assert.equal(new URL(url).hostname, "docs.google.com");
      assert.equal(options.method, "POST");
      const response = new Response('<div class="vHW8K">Your response has been recorded.</div>', {
        headers: { "content-type": "text/html" },
      });
      Object.defineProperty(response, "url", { value: String(url) });
      return response;
    });
    const response = await server.fetch(request(data));
    assert.equal(response.status, 200);
    const payload = fromCrossJSON(await response.json(), {});
    assert.deepEqual(payload.result, { ok: true });
    assert.equal(stub.mock.calls.length, 1);
  });
}

test("compiled endpoint passes an unconfirmed result back instead of showing success", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new TypeError("Network unavailable");
  });
  const response = await server.fetch(request(prebook));
  assert.equal(response.status, 200);
  const payload = fromCrossJSON(await response.json(), {});
  assert.equal(payload.result.ok, false);
  assert.match(payload.result.message, /couldn't confirm/);
});

test("cross-site submissions are rejected before reaching Google", async (t) => {
  const stub = t.mock.method(globalThis, "fetch", async () => assert.fail("Must not send"));
  const response = await server.fetch(request(prebook, true));
  assert.equal(response.status, 403);
  assert.equal(stub.mock.calls.length, 0);
});
