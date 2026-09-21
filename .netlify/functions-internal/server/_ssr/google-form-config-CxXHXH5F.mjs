import { a as objectType, i as literalType, n as discriminatedUnionType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/google-form-config-CxXHXH5F.js
var GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSe3beJyYrFt3ZAhtMRYrLtnU-_YdqdC5DV45e6wF7OZqyIDew/formResponse";
var GOOGLE_FORM_EMAIL_ENTRY = "entry.1695628208";
var PREBOOK_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSd1mh1cEgaaCWwTavEu1OojHRF7L0YJ9wCwQBzgVYOKGPKDqg/formResponse";
var PREBOOK_ENTRY = {
	name: "entry.1927162729",
	email: "entry.1393360373",
	country: "entry.646913968",
	usage: "entry.1442413605",
	device: "entry.758994742",
	consent: "entry.1565231005"
};
var PREBOOK_DEVICE = "AIRA Loop (Wrist band )";
var PREBOOK_CONSENT_VALUE = "I agree to AIRA’s Privacy & Terms, consent to the processing of my personal information, and agree to receive communications from AIRA via email.";
var prebookUsageOptions = [
	"Remember everyday conversations",
	"Health & wellness",
	"Meetings & work",
	"Learnings",
	"Personal AI",
	"Family memories",
	"Preserving my voice & stories",
	"Something else"
];
var emailSchema = stringType().trim().email("Enter a valid email address.").max(254);
var signupSchema = discriminatedUnionType("kind", [objectType({
	kind: literalType("waitlist"),
	email: emailSchema
}), objectType({
	kind: literalType("prebook"),
	name: stringType().trim().min(1, "Enter your name.").max(150),
	email: emailSchema,
	country: literalType("India", { errorMap: () => ({ message: "Batch #1 founding access is currently available only in India. Join the global waitlist for Batch #2." }) }),
	usage: arrayType(enumType(prebookUsageOptions)).min(1, "Select at least one use case.").max(8),
	device: literalType(PREBOOK_DEVICE),
	consent: literalType(PREBOOK_CONSENT_VALUE)
})]);
//#endregion
export { prebookUsageOptions as a, PREBOOK_FORM_ACTION as i, GOOGLE_FORM_EMAIL_ENTRY as n, signupSchema as o, PREBOOK_ENTRY as r, GOOGLE_FORM_ACTION as t };
