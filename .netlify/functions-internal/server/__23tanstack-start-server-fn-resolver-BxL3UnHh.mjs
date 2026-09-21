//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-BxL3UnHh.js
var manifest = { "01e9f5a1bbc1d07a52fe21045332c131b9c530896e6351d6fdfbd5622648e427": {
	functionName: "submitSignup_createServerFn_handler",
	importer: () => import("./_ssr/submit-signup-lucfrPiY.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
