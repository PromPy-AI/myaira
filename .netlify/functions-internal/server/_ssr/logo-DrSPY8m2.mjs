import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-DrSPY8m2.js
var import_jsx_runtime = require_jsx_runtime();
function AiraFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "aira-footer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "aira-footer-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					"aria-label": "AIRA home",
					className: "aira-footer-brand",
					children: "AIRA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Footer navigation",
					className: "aira-footer-links",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/our-vision",
							children: "Our Vision"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							children: "Privacy & Terms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/use-cases",
							children: "Use Cases"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/events",
							children: "Events"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "early-access",
							children: "Contact"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "aira-footer-copyright",
					children: "© 2026 AIRA. All rights reserved."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "aira-footer-wordmark",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 320 120",
				focusable: "false",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "50%",
					y: "50%",
					dominantBaseline: "middle",
					textAnchor: "middle",
					className: "fill-neutral-300 font-semibold tracking-tighter transition-colors duration-300 dark:fill-white/20",
					fontSize: "110",
					children: "AIRA"
				})
			})
		})]
	});
}
var logo_default = "/assets/logo-C7bCSu5f.png";
//#endregion
export { logo_default as n, AiraFooter as t };
