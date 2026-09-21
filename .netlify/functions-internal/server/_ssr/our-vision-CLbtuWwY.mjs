import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as logo_default, t as AiraFooter } from "./logo-DrSPY8m2.mjs";
import { A as ArrowDown, C as Car, D as ArrowUpRight, T as Brain, _ as HeartPulse, i as ShoppingBasket, u as Mic } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/our-vision-CLbtuWwY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Timeline({ data }) {
	const ref = (0, import_react.useRef)(null);
	const progressRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const container = ref.current;
		const progress = progressRef.current;
		if (!container || !progress) return;
		const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
		let frame = 0;
		const update = () => {
			frame = 0;
			const rect = container.getBoundingClientRect();
			const value = preference.matches ? 1 : Math.min(1, Math.max(0, (window.innerHeight * .65 - rect.top) / Math.max(1, rect.height - window.innerHeight * .1)));
			progress.style.transform = `scaleY(${value})`;
		};
		const schedule = () => {
			if (!frame) frame = window.requestAnimationFrame(update);
		};
		const observer = new ResizeObserver(schedule);
		observer.observe(container);
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);
		preference.addEventListener("change", schedule);
		update();
		return () => {
			window.cancelAnimationFrame(frame);
			observer.disconnect();
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			preference.removeEventListener("change", schedule);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative isolate",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-y-0 left-[11px] -z-10 w-px overflow-hidden bg-border md:left-[15px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: progressRef,
				style: { transform: "scaleY(0)" },
				className: "h-full w-full origin-top bg-gradient-to-b from-champagne via-sage to-forest"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			"aria-label": "AIRA product roadmap",
			children: data.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: `relative grid gap-6 pb-16 pl-10 last:pb-0 md:gap-12 md:pb-28 md:pl-16 ${item.featured ? "md:grid-cols-1" : "md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)]"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `relative self-start ${item.featured ? "" : "md:sticky md:top-28"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							className: "absolute top-1 -left-10 flex h-6 w-6 items-center justify-center rounded-full border border-sage/40 bg-background md:-left-16 md:h-8 md:w-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-sage" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-3 text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase",
							children: ["Chapter ", String(index + 1).padStart(2, "0")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl tracking-[-0.04em] md:text-4xl",
							children: item.title
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0",
					children: item.content
				})]
			}, item.title))
		})]
	});
}
var shell = "mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16";
function AgenticVision() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "aira-agentic-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "aira-agentic-eyebrow",
				children: "Our ambition"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "aira-agentic-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "aira-agentic-ranking",
						children: ["World’s ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "aira-agentic-number",
							children: "#1"
						})]
					}),
					" ",
					"AI Agentic",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Human Intelligence." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "aira-agentic-body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "aira-agentic-lead",
						children: "The things you do online. An AI that can do them for you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "aira-agentic-description",
						children: "We’re building a personal assistant that can work across the apps and services you use. Tell AIRA what you need, and let it take care of the steps—with you in control."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "aira-agentic-tasks",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Book rides, metro tickets, travel, stays and tables." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Make calls, order food and groceries, and pay bills." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Handle technical work, manage your calendar and organize your day." })
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "aira-agentic-routine",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "aira-agentic-eyebrow",
							children: "A little less on your mind"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: "“AIRA, book my ride at 9 every morning. And get the groceries on Sunday.”" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Once, any day, or every day. Set the routine and let AIRA handle the details." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "aira-agentic-note",
				children: "Our early-2028 vision. Capabilities will roll out as connected services become available."
			})
		]
	});
}
function VoiceExample({ icon: Icon, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "aira-vision-example",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2 text-[0.65rem] tracking-[0.12em] text-muted-foreground uppercase",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				"aria-hidden": "true",
				className: "h-4 w-4"
			}), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm leading-relaxed text-forest",
			children: [
				"“",
				children,
				"”"
			]
		})]
	});
}
var milestones = [
	{
		date: "Late 2026",
		label: "Build & validate",
		title: "A foundation built around you.",
		description: "Develop and test the physical Loop prototype alongside our MVP app. Bring conversation capture, personal memory and health sensing together.",
		points: ["Test comfort, battery life and recording controls.", "Validate conversation recall with early users."],
		visual: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-3",
			children: [
				{
					icon: Mic,
					label: "Voice capture"
				},
				{
					icon: Brain,
					label: "Personal memory"
				},
				{
					icon: HeartPulse,
					label: "Health signals"
				}
			].map(({ icon: Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/5 px-4 py-2 text-xs text-forest",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					"aria-hidden": "true",
					className: "h-4 w-4"
				}), label]
			}, label))
		})
	},
	{
		date: "Q1 2027",
		label: "Product development & testing",
		title: "Refine Loop, inside and out.",
		description: "Continue developing Loop’s hardware, firmware and companion app. Test how voice capture, personal memory and health sensing work together in everyday use.",
		points: ["Refine battery life, comfort and device reliability.", "Test sensor performance, recording controls and app connectivity."],
		visual: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceExample, {
			icon: Mic,
			label: "Built for everyday use",
			children: "One wristband. My conversations, my health and my personal AI."
		})
	},
	{
		date: "Q2 2027",
		label: "Pilot & refine",
		title: "Make the everyday feel effortless.",
		description: "Pilot Loop with early users. Refine how AIRA captures conversations, recalls commitments and explains personal wellness patterns.",
		points: ["Improve recall quality through real-world feedback.", "Refine daily health summaries and personal baselines."],
		visual: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceExample, {
			icon: Brain,
			label: "Personal memory",
			children: "What did we agree on in yesterday’s conversation?"
		})
	},
	{
		date: "Mid 2027",
		label: "Initial launch",
		title: "Your second brain, on your wrist.",
		description: "Target our first 1,000 Loop units, available through our website to waitlist members and new customers. Bring memory and wellness into one personal AI.",
		points: ["Recall conversations, find commitments and follow through.", "Explore sleep, activity and stress-related patterns together."],
		visual: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceExample, {
			icon: HeartPulse,
			label: "Your daily health summary",
			children: "What changed in my sleep and activity this week?"
		})
	},
	{
		date: "Q4 2027",
		label: "Next-gen Loop development",
		title: "Say it once. Make it a routine.",
		description: "Build the next generation of Loop: a wearable that moves from understanding your day to helping you act on it. Develop voice-led routines for rides, groceries and the services you rely on.",
		points: ["Set your 9 AM ride once, for every workday.", "Schedule groceries for any day, or make them a weekly routine."],
		visual: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceExample, {
				icon: Car,
				label: "Daily rides",
				children: "Book me a ride to the office every day at 9 AM."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceExample, {
				icon: ShoppingBasket,
				label: "Recurring groceries",
				children: "Have my usual groceries delivered every Sunday at 8 AM."
			})]
		})
	}
];
function OurVision() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "aira-site aira-vision min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "aira-header border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${shell} flex flex-wrap items-center justify-between gap-5 py-7`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						"aria-label": "AIRA home",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_default,
							alt: "",
							width: 28,
							height: 28
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm tracking-[0.42em]",
							children: "AIRA"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Main navigation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "early-access",
							children: "Join Waitlist"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: `${shell} aira-page-intro pt-20 pb-16 sm:pt-28 sm:pb-24`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase",
							children: "Our Vision · 2026 — 2028"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-7 max-w-[15ch] text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.05em]",
							children: [
								"More time for living.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-serif font-normal text-forest italic",
									children: "That’s the vision."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col justify-between gap-8 sm:flex-row sm:items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-[49ch] text-base leading-relaxed text-muted-foreground sm:text-lg",
								children: "Remember the details. Understand your health. Take a few things off your plate. Here’s how we’re building AIRA, one step at a time."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#roadmap",
								className: "inline-flex shrink-0 items-center gap-3 self-start border-b border-sage/50 pb-2 text-xs tracking-[0.12em] uppercase sm:self-auto",
								children: ["Explore the roadmap ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
									"aria-hidden": "true",
									className: "h-4 w-4"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-10 max-w-2xl text-xs leading-relaxed text-muted-foreground",
							children: "Our planned direction. Timing and availability will evolve with testing, service partnerships and regional support."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "roadmap",
					"aria-label": "Our planned milestones",
					className: `${shell} scroll-mt-10 pb-20 sm:pb-28`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, { data: [...milestones.map((milestone) => ({
						title: milestone.date,
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: `rounded-2xl border border-border bg-card p-6 sm:p-9 ${milestone.date === "Q4 2027" ? "aira-nextgen" : ""}`,
							children: [
								milestone.date === "Q4 2027" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									className: "aira-nextgen-band",
									src: "/assets/aira-loop-nobg-DG2BgP9v.png",
									alt: "",
									"aria-hidden": "true",
									loading: "lazy",
									draggable: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.6rem] tracking-[0.22em] text-sage uppercase",
									children: milestone.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-2xl leading-tight tracking-[-0.03em] sm:text-3xl",
									children: milestone.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base",
									children: milestone.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-5 space-y-2",
									children: milestone.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3 text-sm leading-relaxed text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											className: "mt-2 h-1 w-1 shrink-0 rounded-full bg-sage"
										}), point]
									}, point))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-7 border-t border-border pt-6",
									children: milestone.visual
								})
							]
						})
					})), {
						title: "Early 2028",
						featured: true,
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgenticVision, {})
					}] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-deep text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${shell} py-16 sm:py-24`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.65rem] tracking-[0.25em] text-champagne uppercase",
								children: "The ambition"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-6 max-w-[22ch] text-3xl leading-tight tracking-[-0.03em] sm:text-5xl",
								children: [
									"Your day belongs to you.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-serif italic",
										children: "Let’s keep it that way."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-xl text-sm leading-relaxed text-primary-foreground/70 sm:text-base",
								children: "Just talk to AIRA. Remember a conversation, understand your health or plan the essentials. Our vision is to make everyday tasks feel lighter, so you can stay present."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								hash: "early-access",
								className: "mt-8 inline-flex items-center gap-4 border border-champagne/50 px-6 py-4 text-xs tracking-[0.12em] uppercase transition-colors hover:bg-champagne hover:text-deep",
								children: ["Be part of what’s next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
									"aria-hidden": "true",
									className: "h-4 w-4"
								})]
							})
						]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiraFooter, {})
		]
	});
}
//#endregion
export { OurVision as component };
