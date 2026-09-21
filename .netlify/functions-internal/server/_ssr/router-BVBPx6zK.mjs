import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BVBPx6zK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C902YQsz.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$5 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AIRA — Remember what makes you, you." },
			{
				name: "description",
				content: "AIRA is a wearable that learns from your life — your health, your voice, your stories, and the moments that matter."
			},
			{
				name: "author",
				content: "AIRA"
			},
			{
				property: "og:title",
				content: "AIRA — Remember what makes you, you."
			},
			{
				property: "og:description",
				content: "A wearable that understands your life today and preserves what matters."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@ MY AIRA"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$5.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$4 = () => import("./routes-B66LEHpU.mjs");
var Route$4 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({
		meta: [
			{ title: "AIRA" },
			{
				name: "google-site-verification",
				content: "g3ztuAaXUBq989dq0wlM74iRlSIlnTWUZ1peokfFEWs"
			},
			{
				name: "description",
				content: "Meet AIRA Loop, a screenless AI wristband designed to help you recall conversations, track your health and understand your daily patterns."
			},
			{
				property: "og:title",
				content: "AIRA"
			},
			{
				property: "og:description",
				content: "Your AI second brain and health companion. AIRA Loop brings conversation memory, wellness insights and a personal AI together in one screenless wristband."
			},
			{
				property: "og:image",
				content: `https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public/man-aira-loop.png`
			},
			{
				name: "twitter:image",
				content: `https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public/man-aira-loop.png`
			},
			{
				property: "og:url",
				content: "https://myaira.life/"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://myaira.life/"
		}]
	})
});
var $$splitComponentImporter$3 = () => import("./events-EGdBlswh.mjs");
var Route$3 = createFileRoute("/events")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({
		meta: [
			{ title: "AIRA Events — Experience what we're building" },
			{
				name: "description",
				content: "Explore upcoming AIRA events and revisit past gatherings. Meet the people behind AIRA and discover what we're building."
			},
			{
				property: "og:title",
				content: "AIRA Events"
			},
			{
				property: "og:description",
				content: "Meet the people behind AIRA. Explore upcoming events, conversations and product experiences."
			},
			{
				property: "og:url",
				content: "https://myaira.life/events"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://myaira.life/events"
		}]
	})
});
var $$splitComponentImporter$2 = () => import("./our-vision-CLbtuWwY.mjs");
var Route$2 = createFileRoute("/our-vision")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({
		meta: [
			{ title: "Our Vision At AIRA" },
			{
				name: "description",
				content: "Explore AIRA’s roadmap: from a personal AI memory and health companion to booking rides, ordering essentials and supporting everyday life through voice."
			},
			{
				property: "og:title",
				content: "Our Vision At AIRA"
			},
			{
				property: "og:description",
				content: "Your memory. Your health. Your day, made simpler. Explore the AIRA roadmap through early 2028."
			}
		],
		links: [{
			rel: "canonical",
			href: "https://myaira.life/our-vision"
		}]
	})
});
var $$splitComponentImporter$1 = () => import("./privacy-DpX84bPN.mjs");
var Route$1 = createFileRoute("/privacy")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({
		meta: [
			{ title: "Privacy Policy - AIRA" },
			{
				name: "description",
				content: "AIRA Privacy Policy. Your life. Your data. Your control. Learn how AIRA collects, uses, and protects your personal information."
			},
			{
				property: "og:title",
				content: "Privacy Policy - AIRA"
			},
			{
				property: "og:description",
				content: "Your life. Your data. Your control. Learn how AIRA collects, uses, and protects your personal information."
			},
			{
				property: "og:url",
				content: "https://myaira.life/privacy"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://myaira.life/privacy"
		}]
	})
});
var $$splitComponentImporter = () => import("./use-cases-DNOO0sqN.mjs");
var Route = createFileRoute("/use-cases")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({
		meta: [
			{ title: "AIRA Use Cases" },
			{
				name: "description",
				content: "How people use AIRA: everyday health and sleep, private memory, family stories, voice preservation and digital legacy."
			},
			{
				property: "og:title",
				content: "AIRA Use Cases"
			},
			{
				property: "og:description",
				content: "From daily health signals to preserved voices and digital legacy - the ways AIRA fits into a life."
			},
			{
				property: "og:image",
				content: `https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public/man-aira-loop.png`
			},
			{
				name: "twitter:image",
				content: `https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public/man-aira-loop.png`
			},
			{
				property: "og:url",
				content: "https://myaira.life/use-cases"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://myaira.life/use-cases"
		}]
	})
});
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	EventsRoute: Route$3.update({
		id: "/events",
		path: "/events",
		getParentRoute: () => Route$5
	}),
	OurVisionRoute: Route$2.update({
		id: "/our-vision",
		path: "/our-vision",
		getParentRoute: () => Route$5
	}),
	PrivacyRoute: Route$1.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$5
	}),
	UseCasesRoute: Route.update({
		id: "/use-cases",
		path: "/use-cases",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
