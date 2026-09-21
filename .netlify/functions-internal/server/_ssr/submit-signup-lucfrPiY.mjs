import { o as signupSchema } from "./google-form-config-CxXHXH5F.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/submit-signup-lucfrPiY.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var submitSignup_createServerFn_handler = createServerRpc({
	id: "01e9f5a1bbc1d07a52fe21045332c131b9c530896e6351d6fdfbd5622648e427",
	name: "submitSignup",
	filename: "src/lib/submit-signup.ts"
}, (opts) => submitSignup.__executeServer(opts));
var submitSignup = createServerFn({ method: "POST" }).validator(signupSchema).handler(submitSignup_createServerFn_handler, async ({ data }) => {
	const { submitGoogleForm } = await import("./google-forms.server-D3f4Ool3.mjs");
	return submitGoogleForm(data);
});
//#endregion
export { submitSignup_createServerFn_handler };
