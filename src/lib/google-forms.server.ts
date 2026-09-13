import {
  GOOGLE_FORM_ACTION,
  GOOGLE_FORM_EMAIL_ENTRY,
  PREBOOK_FORM_ACTION,
  PREBOOK_ENTRY,
  signupSchema,
  type SignupData,
  type SignupResult,
} from "./google-form-config.ts";

const unconfirmedMessage =
  "We couldn't confirm your submission. It may have reached us. Please check your connection before trying again; your details are still here.";

export async function submitGoogleForm(
  input: SignupData,
  send: typeof fetch = fetch,
): Promise<SignupResult> {
  const validation = signupSchema.safeParse(input);
  if (!validation.success) {
    return { ok: false, message: validation.error.issues[0]?.message ?? "Check your details." };
  }
  const data = validation.data;
  const body = new URLSearchParams({ fvv: "1", pageHistory: "0" });
  const action = data.kind === "waitlist" ? GOOGLE_FORM_ACTION : PREBOOK_FORM_ACTION;

  if (data.kind === "waitlist") {
    body.set(GOOGLE_FORM_EMAIL_ENTRY, data.email);
  } else {
    body.set(PREBOOK_ENTRY.name, data.name);
    body.set(PREBOOK_ENTRY.email, data.email);
    body.set(PREBOOK_ENTRY.country, data.country);
    body.set(PREBOOK_ENTRY.device, data.device);
    body.set(PREBOOK_ENTRY.consent, data.consent);
    for (const usage of new Set(data.usage)) body.append(PREBOOK_ENTRY.usage, usage);
  }

  try {
    // Read Google's acknowledgement on the server: no cross-origin frame or opaque fetch.
    // Do not retry automatically, since an interrupted response may already have been saved.
    const response = await send(`${action}?hl=en`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "text/html",
      },
      body,
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return {
        ok: false,
        message:
          response.status === 400
            ? "The form provider did not accept these details. Check your entries and try again."
            : unconfirmedMessage,
      };
    }

    const finalUrl = new URL(response.url);
    const expectedUrl = new URL(action);
    if (
      finalUrl.origin !== expectedUrl.origin ||
      finalUrl.pathname !== expectedUrl.pathname ||
      !response.headers.get("content-type")?.includes("text/html")
    ) {
      return { ok: false, message: unconfirmedMessage };
    }

    const html = await response.text();
    // Google can return HTTP 200 for validation, closed-form and sign-in pages.
    // Require its actual confirmation element, including custom confirmation messages.
    const confirmed =
      /<div\b[^>]*\bclass\s*=\s*["'][^"']*\b(?:vHW8K|freebirdFormviewerViewResponseConfirmationMessage)\b[^"']*["'][^>]*>\s*[^<\s][\s\S]*?<\/div>/i.test(
        html,
      );
    return confirmed ? { ok: true } : { ok: false, message: unconfirmedMessage };
  } catch {
    // Do not log names, email addresses, consent text, or Google's response body.
    return { ok: false, message: unconfirmedMessage };
  }
}
