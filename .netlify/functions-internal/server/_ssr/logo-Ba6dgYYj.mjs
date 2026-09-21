import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as CalendarDays, p as Mail } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-Ba6dgYYj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AiraFooter() {
	const footerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const footer = footerRef.current;
		if (!footer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				entry.target.setAttribute("data-visible", "true");
				observer.unobserve(entry.target);
			}
		}, { threshold: .12 });
		footer.querySelectorAll("[data-footer-reveal]").forEach((item) => observer.observe(item));
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "aira-footer",
		ref: footerRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "aira-footer-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "aira-footer-top",
					"data-footer-reveal": true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "AIRA home",
						className: "aira-footer-brand",
						children: "AIRA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "aira-footer-contact",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:nandigiridhar29@gmail.com",
							"aria-label": "Email AIRA",
							title: "Email AIRA",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
								size: 20,
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://cal.eu/giridhar-orange/team-aira",
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": "Meet the AIRA team",
							title: "Meet the team",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
								size: 20,
								"aria-hidden": "true"
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "aira-footer-links",
					"aria-label": "Footer navigation",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-footer-reveal": true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Discover" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									hash: "loop-features",
									children: "AIRA Loop"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/use-cases",
									children: "Use Cases"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									hash: "early-access",
									children: "Early Access"
								}) })
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-footer-reveal": true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Our World" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/our-vision",
									children: "Our Vision"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/events",
									children: "Events"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									children: "Home"
								}) })
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-footer-reveal": true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Let’s Talk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:nandigiridhar29@gmail.com",
								children: "Contact Us"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://cal.eu/giridhar-orange/team-aira",
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Meet Our Team"
							}) })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-footer-reveal": true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your Trust" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								children: "Privacy & Terms"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:nandigiridhar29@gmail.com?subject=AIRA%20pre-booking%20help",
								children: "Pre-booking Help"
							}) })] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aira-footer-wordmark",
					"data-footer-reveal": true,
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 1000 285",
						fill: "none",
						focusable: "false",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: "500",
							y: "241",
							textAnchor: "middle",
							textLength: "970",
							lengthAdjust: "spacingAndGlyphs",
							fill: "currentColor",
							children: "AIRA"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "aira-footer-bottom",
					"data-footer-reveal": true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your life. Your memory. Your AI." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 AIRA. All rights reserved." })]
				})
			]
		})
	});
}
var logo_default = "/assets/logo-C7bCSu5f.png";
//#endregion
export { logo_default as n, AiraFooter as t };
