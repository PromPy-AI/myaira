import { a as PREBOOK_FORM_ACTION, i as PREBOOK_ENTRY, n as GOOGLE_FORM_EMAIL_ENTRY, s as signupSchema, t as GOOGLE_FORM_ACTION } from "./google-form-config-DVOa25mc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/google-forms.server--yUn5N4z.js
var unconfirmedMessage = "We couldn't confirm your submission. It may have reached us. Please check your connection before trying again; your details are still here.";
async function submitGoogleForm(input, send = fetch) {
	const validation = signupSchema.safeParse(input);
	if (!validation.success) return {
		ok: false,
		message: validation.error.issues[0]?.message ?? "Check your details."
	};
	const data = validation.data;
	const body = new URLSearchParams({
		fvv: "1",
		pageHistory: "0"
	});
	const action = data.kind === "waitlist" ? GOOGLE_FORM_ACTION : PREBOOK_FORM_ACTION;
	if (data.kind === "waitlist") body.set(GOOGLE_FORM_EMAIL_ENTRY, data.email);
	else {
		body.set(PREBOOK_ENTRY.name, data.name);
		body.set(PREBOOK_ENTRY.email, data.email);
		body.set(PREBOOK_ENTRY.country, data.country);
		body.set(PREBOOK_ENTRY.device, data.device);
		body.set(PREBOOK_ENTRY.consent, data.consent);
		for (const usage of new Set(data.usage)) body.append(PREBOOK_ENTRY.usage, usage);
	}
	try {
		const response = await send(`${action}?hl=en`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
				Accept: "text/html"
			},
			body,
			redirect: "follow",
			signal: AbortSignal.timeout(15e3)
		});
		if (!response.ok) return {
			ok: false,
			message: response.status === 400 ? "The form provider did not accept these details. Check your entries and try again." : unconfirmedMessage
		};
		const finalUrl = new URL(response.url);
		const expectedUrl = new URL(action);
		if (finalUrl.origin !== expectedUrl.origin || finalUrl.pathname !== expectedUrl.pathname || !response.headers.get("content-type")?.includes("text/html")) return {
			ok: false,
			message: unconfirmedMessage
		};
		const html = await response.text();
		return /<div\b[^>]*\bclass\s*=\s*["'][^"']*\b(?:vHW8K|freebirdFormviewerViewResponseConfirmationMessage)\b[^"']*["'][^>]*>\s*[^<\s][\s\S]*?<\/div>/i.test(html) ? { ok: true } : {
			ok: false,
			message: unconfirmedMessage
		};
	} catch {
		return {
			ok: false,
			message: unconfirmedMessage
		};
	}
}
//#endregion
export { submitGoogleForm };
