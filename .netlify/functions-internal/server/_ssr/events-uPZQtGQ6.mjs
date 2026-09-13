import { r as __toESM } from "../_runtime.mjs";
import { t as logo_default } from "./logo-aw0wNKq8.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as MapPin, h as Clock3, v as CalendarDays, x as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-uPZQtGQ6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var events = [];
var embeddedEvents = [{
	id: "evt-E9qLlnX6Cwfo2Cv",
	status: "past",
	embedUrl: "https://luma.com/embed/event/evt-E9qLlnX6Cwfo2Cv/simple"
}];
var shell = "mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16";
var tabs = [{
	value: "upcoming",
	label: "Upcoming events"
}, {
	value: "past",
	label: "Past events"
}];
function EventCard({ event }) {
	const title = event.title || "AIRA event";
	const detailsUrl = "embedUrl" in event ? event.lumaUrl || event.embedUrl : event.lumaUrl;
	const date = event.startsAt && event.timeZone ? new Date(event.startsAt) : null;
	const dateLabel = date && new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: event.timeZone
	}).format(date);
	const timeLabel = date && new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZoneName: "short",
		timeZone: event.timeZone
	}).format(date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "min-w-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "grid grid-cols-[76px_minmax(0,1fr)] items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-sage/60 sm:grid-cols-[128px_minmax(0,1fr)] sm:items-center sm:gap-5",
			children: [event.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: event.imageUrl,
				alt: "",
				loading: "lazy",
				width: 128,
				height: 128,
				className: "aspect-square w-full rounded-lg border border-border object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex aspect-square flex-col items-center justify-center gap-3 rounded-lg border border-border bg-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: logo_default,
					alt: "",
					width: 40,
					height: 40,
					className: "h-8 w-8 object-contain sm:h-10 sm:w-10"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[0.55rem] tracking-[0.24em] text-forest sm:text-[0.65rem]",
					children: "AIRA"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg leading-snug tracking-[-0.02em] sm:text-2xl",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1.5 rounded-md bg-sage/10 px-2.5 py-1.5 text-forest",
							children: event.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								"aria-hidden": "true",
								className: "h-3.5 w-3.5 shrink-0"
							}), event.location] }) : event.status === "past" ? "Past event" : "Upcoming event"
						}), dateLabel && timeLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
							dateTime: event.startsAt,
							className: "inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1.5 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
								"aria-hidden": "true",
								className: "h-3.5 w-3.5 shrink-0"
							}), dateLabel]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1.5 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
								"aria-hidden": "true",
								className: "h-3.5 w-3.5 shrink-0"
							}), timeLabel]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: detailsUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": `View ${title} on Luma (opens in a new tab)`,
						className: "mt-4 inline-flex items-center gap-3 rounded-lg border border-border bg-secondary px-5 py-3 text-sm text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
						children: ["View details", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							"aria-hidden": "true",
							className: "h-4 w-4"
						})]
					})
				]
			})]
		})
	});
}
function EventsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${shell} flex flex-wrap items-center justify-between gap-5 py-8`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						"aria-label": "AIRA home",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_default,
							alt: "",
							width: 28,
							height: 28,
							className: "h-7 w-7 object-contain"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm tracking-[0.42em] uppercase",
							children: "AIRA"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Main navigation",
						className: "flex items-center gap-6 text-xs tracking-[0.12em] uppercase sm:gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-muted-foreground transition-colors hover:text-foreground",
							children: "Home"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/events",
							"aria-current": "page",
							className: "text-foreground",
							children: "Events"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-full max-w-[1100px] flex-1 px-6 pt-16 pb-24 sm:px-10 sm:pt-24 sm:pb-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase",
							children: "Meet AIRA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mx-auto mt-6 max-w-[22ch] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.035em]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-serif font-normal italic",
								children: "Experience"
							}), " what we’re building."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-6 max-w-[61ch] text-sm leading-relaxed text-muted-foreground sm:text-base",
							children: "Meet the people behind AIRA. Explore our gatherings, conversations and product experiences as we bring Loop to life."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "past",
					className: "mt-12 sm:mt-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
							"aria-label": "Event schedule",
							className: "grid h-auto w-full max-w-lg grid-cols-2 rounded-full border border-border bg-secondary p-1",
							children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: tab.value,
								className: "rounded-full px-3 py-3 text-xs font-normal tracking-[0.02em] data-[state=active]:bg-card data-[state=active]:shadow-sm sm:text-sm",
								children: tab.label
							}, tab.value))
						})
					}), tabs.map((tab) => {
						const matchingEmbeds = embeddedEvents.filter((event) => event.status === tab.value);
						const matchingEvents = events.filter((event) => event.status === tab.value).sort((a, b) => {
							const difference = Date.parse(a.startsAt) - Date.parse(b.startsAt);
							return tab.value === "upcoming" ? difference : -difference;
						});
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: tab.value,
							className: "mt-10 rounded-2xl sm:mt-12",
							children: matchingEvents.length > 0 || matchingEmbeds.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "grid w-full grid-cols-1 gap-3 sm:gap-4",
								"aria-label": tab.label,
								children: [matchingEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event }, event.id)), matchingEmbeds.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "min-w-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
										className: "w-full overflow-hidden rounded-2xl border border-border bg-card p-3 transition-colors hover:border-sage/60 sm:p-5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
											src: event.embedUrl,
											title: `${tab.value === "past" ? "Past" : "Upcoming"} AIRA event on Luma`,
											width: "100%",
											height: 450,
											loading: "lazy",
											allow: "fullscreen; payment",
											"aria-hidden": false,
											tabIndex: 0,
											className: "block h-[450px] w-full rounded-lg border-0 bg-card"
										})
									})
								}, event.id))]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card px-6 py-16 text-center sm:py-20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-6 text-xl tracking-[-0.02em] sm:text-2xl",
									children: tab.value === "upcoming" ? "Our next gathering starts here." : "A place for shared moments."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-3 max-w-[42ch] text-sm leading-relaxed text-muted-foreground",
									children: tab.value === "upcoming" ? "No upcoming events announced yet. Check back here for dates and registration details." : "No past events listed yet. Previous gatherings will appear here once shared."
								})]
							})
						}, tab.value);
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${shell} flex flex-col gap-7 py-10 sm:flex-row sm:items-center sm:justify-between`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm tracking-[0.42em] uppercase",
							children: "AIRA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							"aria-label": "Footer navigation",
							className: "flex flex-wrap gap-6 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "transition-colors hover:text-foreground",
									children: "Home"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/use-cases",
									className: "transition-colors hover:text-foreground",
									children: "Use Cases"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/privacy",
									className: "transition-colors hover:text-foreground",
									children: "Privacy & Terms"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "© 2026 AIRA. All rights reserved."
						})
					]
				})
			})
		]
	});
}
//#endregion
export { EventsPage as component };
