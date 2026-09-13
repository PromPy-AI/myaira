import { r as __toESM } from "../_runtime.mjs";
import { i as PREBOOK_ENTRY, n as GOOGLE_FORM_EMAIL_ENTRY, o as prebookUsageOptions, r as PREBOOK_DEVICE, s as signupSchema, t as GOOGLE_FORM_ACTION } from "./google-form-config-DVOa25mc.mjs";
import { t as logo_default } from "./logo-aw0wNKq8.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-BZK_1iZM.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { _ as Brain, a as Moon, c as ListChecks, d as History, f as HeartPulse, g as CalendarDays, h as CheckCheck, i as Search, l as Link2, m as ClipboardList, n as Thermometer, o as Mic, p as Footprints, r as ShieldCheck, s as MessageCircle, t as TrendingUp, u as Lightbulb, v as AudioLines, y as Activity } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D1JQAZjM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var submitSignup = createServerFn({ method: "POST" }).validator(signupSchema).handler(createSsrRpc("01e9f5a1bbc1d07a52fe21045332c131b9c530896e6351d6fdfbd5622648e427"));
var Aira_loop_fade_default = "/assets/Aira-loop-fade-C_r_3lYP.png";
var healthFeatures = [
	{
		icon: HeartPulse,
		title: "Heart rate & HRV",
		description: "Follow your heart rate and heart rate variability over time."
	},
	{
		icon: Moon,
		title: "Sleep insights",
		description: "Explore sleep duration, consistency and your nightly patterns."
	},
	{
		icon: Footprints,
		title: "Activity & movement",
		description: "Keep track of steps, daily activity and the rhythm of your day."
	},
	{
		icon: Activity,
		title: "Recovery & stress-related signals",
		description: "Understand recovery trends and changes in physiological stress signals."
	},
	{
		icon: Thermometer,
		title: "Temperature & blood oxygen trends",
		description: "Bring additional wellness signals into your personal health picture."
	},
	{
		icon: TrendingUp,
		title: "Personal baseline changes",
		description: "See how today's signals compare with your own usual patterns."
	},
	{
		icon: Link2,
		title: "Health patterns, connected",
		description: "Explore correlations across sleep, stress, activity and recovery."
	},
	{
		icon: ClipboardList,
		title: "Daily health summary",
		description: "A daily wellness score and a clear recap of what changed today."
	},
	{
		icon: MessageCircle,
		title: "Ask about your health",
		description: "Ask \"What changed today?\" and explore the patterns behind your summary."
	}
];
var memoryFeatures = [
	{
		icon: Mic,
		title: "Everyday conversation capture",
		description: "Continuously capture conversations through Loop while device is active."
	},
	{
		icon: AudioLines,
		title: "AI notes & summaries",
		description: "Turn conversations and meetings into clear summaries and key takeaways."
	},
	{
		icon: Search,
		title: "Searchable personal memory",
		description: "Find a detail, decision or conversation without searching through scattered notes."
	},
	{
		icon: ListChecks,
		title: "Commitments & tasks",
		description: "Surface follow-ups, recall what you promised and assign tasks to your assistant."
	},
	{
		icon: Lightbulb,
		title: "Ideas & learning",
		description: "Keep thoughts, explanations and moments of inspiration ready to revisit."
	},
	{
		icon: History,
		title: "Your personal timeline",
		description: "Return to saved conversations, experiences and memories with their context."
	},
	{
		icon: Brain,
		title: "An AI built around your memory",
		description: "Ask questions about your day using the conversations and information you keep."
	},
	{
		icon: CalendarDays,
		title: "Daily memory recap",
		description: "Revisit important discussions, ideas and outstanding commitments in one place."
	},
	{
		icon: ShieldCheck,
		title: "Your memory, your control",
		description: "Pause recording, choose what stays and delete what you don't want remembered."
	}
];
function FeatureTable({ title, subtitle, icon: Icon, features }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "w-full table-fixed border-collapse text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("caption", {
			className: "border-b border-white/20 px-5 pb-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					"aria-hidden": "true",
					strokeWidth: 1.25,
					className: "mx-auto mb-6 h-9 w-9 text-champagne"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-2xl tracking-[-0.02em] text-white sm:text-3xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-white/65",
					children: subtitle
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: features.map(({ icon: FeatureIcon, title: featureTitle, description }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
			className: "border-b border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
				className: "px-5 py-8 sm:px-8 md:h-[170px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureIcon, {
						"aria-hidden": "true",
						strokeWidth: 1.4,
						className: "mx-auto mb-4 h-6 w-6 text-champagne"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-medium text-white",
						children: featureTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2 max-w-[39ch] text-sm leading-relaxed text-white/65",
						children: description
					})
				]
			})
		}, featureTitle)) })]
	});
}
function LoopFeatures() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "loop-features",
		"aria-labelledby": "loop-features-title",
		className: "overflow-hidden bg-[#101916] text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-[1320px] px-6 py-24 sm:px-10 sm:py-32 lg:px-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-10 pb-20 md:grid-cols-[1.25fr_1fr] md:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.3em] text-champagne uppercase",
							children: "Explore AIRA Loop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							id: "loop-features-title",
							className: "mt-7 max-w-[17ch] text-[clamp(2.3rem,5vw,4.5rem)] leading-[1.04] tracking-[-0.035em]",
							children: [
								"Your second brain.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Your health.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"One wristband."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-7 max-w-[46ch] text-base leading-relaxed text-white/65",
							children: "Remember what was said. Understand how you feel. Bring your conversations and wellness patterns together with Loop and the AIRA app."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs tracking-[0.12em] text-champagne uppercase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Screenless wristband" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Companion app" })]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "mx-auto w-full max-w-[380px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: Aira_loop_fade_default,
							alt: "AIRA Loop wristband product concept",
							loading: "lazy",
							width: 480,
							height: 480,
							className: "aspect-square w-full object-contain [mask-image:radial-gradient(ellipse_at_center,black_48%,transparent_72%)]"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "mt-3 text-center text-xs tracking-[0.2em] text-white/60 uppercase",
							children: "AIRA Loop"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-start gap-16 md:grid-cols-2 md:gap-12 lg:gap-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureTable, {
						title: "Health & wellness",
						subtitle: "Understand your body, a day at a time.",
						icon: HeartPulse,
						features: healthFeatures
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureTable, {
						title: "AI second brain",
						subtitle: "Stay in the moment. Come back to the details.",
						icon: Brain,
						features: memoryFeatures
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-20 border border-white/15 bg-white/[0.025] p-7 sm:p-10 lg:p-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.24em] text-champagne uppercase",
								children: "Memory meets health"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-3xl leading-tight tracking-[-0.025em] sm:text-4xl",
								children: "“What changed today?”"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-[44ch] text-sm leading-relaxed text-white/65",
								children: "A daily health summary with the context of your day. Explore changes in your baseline alongside your sleep, activity and saved conversations."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-white/10",
							children: [
								"See what moved away from your personal baseline.",
								"Explore patterns across health, sleep, stress and activity.",
								"Revisit your day's conversations and commitments.",
								"Ask AIRA follow-up questions about what changed."
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-4 py-5 first:pt-0 last:pb-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, {
									"aria-hidden": "true",
									className: "mt-0.5 h-5 w-5 shrink-0 text-champagne",
									strokeWidth: 1.4
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm leading-relaxed text-white/85",
									children: item
								})]
							}, item))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-[62ch] text-xs leading-relaxed text-white/60",
						children: "Planned Loop capabilities. Hardware and features are in development and subject to testing and validation."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#early-access",
						className: "inline-flex shrink-0 items-center justify-center border border-champagne bg-champagne px-7 py-4 text-xs tracking-[0.15em] text-deep uppercase transition-colors hover:bg-transparent hover:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne",
						children: "Join Loop early access"
					})]
				})
			]
		})
	});
}
var loop_stack_image_default = "/assets/loop-stack-image-BaV_m3ix.png";
var aira_loop_nobg_default = "/assets/aira-loop-nobg-DG2BgP9v.png";
var shell = "mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16";
var ideas = [
	{
		index: "01",
		label: "REMEMBER",
		title: "Your everyday second brain.",
		body: "Stay present in the conversation. AIRA turns what you capture into searchable memories, clear summaries and commitments you can come back to. Ask your AI when you need a detail."
	},
	{
		index: "02",
		label: "UNDERSTAND",
		title: "Your health, in perspective.",
		body: "Explore your sleep, activity, recovery and stress-related signals. A daily health summary helps you see your personal baseline and understand what changed today."
	},
	{
		index: "03",
		label: "CONNECT",
		title: "See your day as a whole.",
		body: "Bring your conversations and health patterns into one personal AI. Explore connections across your routines and wellness, recall what matters, and follow through on your day."
	}
];
var controls = [
	{
		state: "ACTIVE",
		action: "Remember"
	},
	{
		state: "MUTE",
		action: "Pause"
	},
	{
		state: "BLOCK",
		action: "Don't remember"
	}
];
var products = ["AIRA Loop", "Screenless wristband + companion app"];
var submissionError = "We couldn't confirm your submission. Please check your connection before trying again. Your details have been kept.";
function WaitlistForm() {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)("");
	const submitting = (0, import_react.useRef)(false);
	async function handleSubmit(event) {
		event.preventDefault();
		if (submitting.current) return;
		const form = event.currentTarget;
		const parsed = signupSchema.safeParse({
			kind: "waitlist",
			email: new FormData(form).get(GOOGLE_FORM_EMAIL_ENTRY)
		});
		if (!parsed.success) {
			setError(parsed.error.issues[0]?.message ?? "Check your email address.");
			setStatus("error");
			return;
		}
		submitting.current = true;
		setStatus("submitting");
		setError("");
		try {
			const result = await submitSignup({ data: parsed.data });
			if (!result.ok) {
				setError(result.message);
				setStatus("error");
				return;
			}
			form.reset();
			setStatus("done");
		} catch {
			setError(submissionError);
			setStatus("error");
		} finally {
			submitting.current = false;
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		action: GOOGLE_FORM_ACTION,
		method: "POST",
		onSubmit: handleSubmit,
		"aria-busy": status === "submitting",
		className: "mt-12 flex w-full max-w-xl flex-col gap-3 sm:flex-row",
		"aria-label": "Early access signup",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "email",
				className: "sr-only",
				children: "Email address"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "email",
				name: GOOGLE_FORM_EMAIL_ENTRY,
				type: "email",
				required: true,
				placeholder: "Enter your email",
				className: "w-full flex-1 border border-border bg-transparent px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: status === "submitting",
				className: "cursor-pointer rounded-none border border-primary bg-primary px-7 py-4 text-sm tracking-[0.14em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-transparent hover:text-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
				children: status === "submitting" ? "Submitting…" : "Join Waitlist"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"aria-live": "polite",
				className: "sr-only",
				children: status === "done" ? "Thank you, you are on the list." : ""
			}),
			status === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "self-center text-sm text-muted-foreground",
				children: "You're on the list."
			})
		]
	}), status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "mt-3 max-w-xl text-sm text-destructive",
		children: error
	})] });
}
var prebookDeviceOptions = [{
	value: PREBOOK_DEVICE,
	label: "AIRA Loop",
	caption: "Wrist band",
	image: aira_loop_nobg_default
}];
var earlyAccessPrices = {
	USD: {
		early: 250,
		regular: 300,
		locale: "en-US"
	},
	INR: {
		early: 23500,
		regular: 28500,
		locale: "en-IN"
	}
};
function PreBookingForm() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)("");
	const submitting = (0, import_react.useRef)(false);
	const modalContent = (0, import_react.useRef)(null);
	const [currency, setCurrency] = (0, import_react.useState)("USD");
	const price = earlyAccessPrices[currency];
	const formatPrice = (amount) => new Intl.NumberFormat(price.locale, {
		style: "currency",
		currency,
		maximumFractionDigits: 0
	}).format(amount);
	async function handleSubmit(event) {
		event.preventDefault();
		if (submitting.current) return;
		const form = event.currentTarget;
		const fields = new FormData(form);
		const parsed = signupSchema.safeParse({
			kind: "prebook",
			name: fields.get(PREBOOK_ENTRY.name),
			email: fields.get(PREBOOK_ENTRY.email),
			country: fields.get(PREBOOK_ENTRY.country),
			usage: fields.getAll(PREBOOK_ENTRY.usage),
			device: fields.get(PREBOOK_ENTRY.device),
			consent: fields.get(PREBOOK_ENTRY.consent)
		});
		if (!parsed.success) {
			setError(parsed.error.issues[0]?.message ?? "Check your details and consent.");
			setStatus("error");
			return;
		}
		submitting.current = true;
		setStatus("submitting");
		setError("");
		try {
			const result = await submitSignup({ data: parsed.data });
			if (!result.ok) {
				setError(result.message);
				setStatus("error");
				return;
			}
			form.reset();
			setStatus("done");
			modalContent.current?.scrollTo({ top: 0 });
		} catch {
			setError(submissionError);
			setStatus("error");
		} finally {
			submitting.current = false;
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => {
			setStatus("idle");
			setError("");
			setOpen(true);
		},
		className: "mt-6 inline-block cursor-pointer rounded-none border border-primary bg-secondary px-7 py-4 text-sm tracking-[0.14em] text-primary uppercase transition-colors duration-300 hover:bg-transparent hover:text-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
		children: "Reserve Early Access"
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Early access and free pre-booking",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
			onClick: () => {
				if (!submitting.current) setOpen(false);
			},
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: modalContent,
			className: "relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto border border-border bg-background p-8 shadow-2xl sm:p-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setOpen(false),
				"aria-label": "Close",
				disabled: status === "submitting",
				className: "absolute top-5 right-5 cursor-pointer text-2xl leading-none text-muted-foreground transition-colors hover:text-foreground",
				children: "×"
			}), status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "status",
				className: "py-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl tracking-[-0.02em]",
						children: "You're on the list."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted-foreground",
						children: "You're among the first to join the AIRA community. Early access will be offered to the first 500 selected members in this batch. If your early access is confirmed, we'll reach out to you directly via email."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-xs tracking-[0.24em] text-muted-foreground uppercase",
						children: "Batch #01"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen(false),
						className: "mt-8 inline-block cursor-pointer border border-primary bg-primary px-7 py-3 text-sm tracking-[0.14em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-transparent hover:text-primary",
						children: "Close"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-2xl tracking-[-0.02em]",
					children: "Reserve your AIRA."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: "Join early access and pre-book for free."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					action: "https://docs.google.com/forms/d/e/1FAIpQLSd1mh1cEgaaCWwTavEu1OojHRF7L0YJ9wCwQBzgVYOKGPKDqg/formResponse",
					method: "POST",
					onSubmit: handleSubmit,
					"aria-busy": status === "submitting",
					className: "mt-8 flex flex-col gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "prebook-name",
								className: "text-sm font-medium",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "prebook-name",
								name: PREBOOK_ENTRY.name,
								type: "text",
								required: true,
								placeholder: "Your name",
								className: "w-full border border-border bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "prebook-email",
								className: "text-sm font-medium",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "prebook-email",
								name: PREBOOK_ENTRY.email,
								type: "email",
								required: true,
								placeholder: "you@example.com",
								className: "w-full border border-border bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "prebook-country",
								className: "text-sm font-medium",
								children: "Country"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "prebook-country",
								name: PREBOOK_ENTRY.country,
								type: "text",
								required: true,
								placeholder: "Your country",
								className: "w-full border border-border bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "mb-1 text-sm font-medium",
								children: "What would you use AIRA for?"
							}), prebookUsageOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-center gap-3 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									name: PREBOOK_ENTRY.usage,
									value: option,
									className: "h-4 w-4 shrink-0 accent-primary"
								}), option]
							}, option))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "flex flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "mb-1 text-sm font-medium",
									children: "Your device"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "prebook-currency",
										className: "text-xs text-muted-foreground",
										children: "Select payment currency"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "prebook-currency",
										value: currency,
										onChange: (event) => setCurrency(event.target.value === "INR" ? "INR" : "USD"),
										className: "cursor-pointer rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "USD",
											children: "USD"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "INR",
											children: "INR"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 gap-3",
									children: prebookDeviceOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-ring has-[:checked]:border-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "radio",
												name: PREBOOK_ENTRY.device,
												value: option.value,
												defaultChecked: true,
												required: true,
												className: "peer sr-only"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "relative block w-full bg-deep px-5 pt-12 pb-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "absolute top-4 left-4 text-[0.6rem] tracking-[0.18em] text-champagne uppercase",
														children: "Early access"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "absolute top-3 right-3 rounded-full border border-emerald-300/25 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900",
														children: ["Save ", formatPrice(price.regular - price.early)]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: option.image,
														alt: option.label,
														loading: "lazy",
														draggable: false,
														className: "mx-auto h-40 w-full select-none object-contain [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex flex-col gap-4 p-5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex flex-wrap items-end justify-between gap-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-base font-medium text-foreground",
														children: option.label
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "mt-1 block text-xs text-muted-foreground",
														children: option.caption
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-xs text-muted-foreground",
														children: "Starts at"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "mt-1 flex flex-wrap items-baseline gap-2",
														"aria-live": "polite",
														"aria-atomic": "true",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-3xl font-medium tracking-[-0.04em] text-primary",
															children: formatPrice(price.early)
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-sm text-muted-foreground",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "sr-only",
																children: "Regular price "
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("s", { children: formatPrice(price.regular) })]
														})]
													})] })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground",
													children: ["2-month free subscription trial for pre-booking users.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "mt-2 block font-medium text-primary",
														children: "Free reservation. No payment today."
													})]
												})]
											})
										]
									}, option.value))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								name: PREBOOK_ENTRY.consent,
								value: "I agree to AIRA’s Privacy & Terms, consent to the processing of my personal information, and agree to receive communications from AIRA via email.",
								required: true,
								className: "mt-0.5 h-4 w-4 shrink-0 accent-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"I agree to AIRA’s",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/privacy",
									className: "underline underline-offset-2 transition-colors hover:text-foreground",
									children: "Privacy & Terms"
								}),
								", consent to the processing of my personal information, and agree to receive communications from AIRA via email."
							] })]
						}),
						status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "text-sm leading-relaxed text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: status === "submitting",
							className: "mt-2 cursor-pointer border border-primary bg-primary px-7 py-4 text-sm tracking-[0.14em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-transparent hover:text-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
							children: status === "submitting" ? "Submitting…" : "Submit"
						})
					]
				})
			] })]
		})]
	})] });
}
function ControlToggle() {
	const [active, setActive] = (0, import_react.useState)(controls[0].state);
	const current = controls.find((c) => c.state === active) ?? controls[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "radiogroup",
				"aria-label": "Memory control",
				className: "inline-flex items-center gap-px border border-[oklch(0.95_0.015_88)]/15 p-1",
				children: controls.map((c) => {
					const isOn = c.state === active;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "radio",
						"aria-checked": isOn,
						onClick: () => setActive(c.state),
						className: `px-6 py-3 text-[0.68rem] tracking-[0.28em] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne ${isOn ? "bg-champagne text-deep" : "text-[oklch(0.95_0.015_88)]/55 hover:text-[oklch(0.95_0.015_88)]"}`,
						children: c.state
					}, c.state);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"aria-live": "polite",
				className: "mt-5 text-sm text-[oklch(0.95_0.015_88)]/70",
				children: current.action
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-[0.62rem] tracking-[0.24em] text-[oklch(0.95_0.015_88)]/40 uppercase",
				children: products.join("  ·  ")
			})
		]
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "absolute inset-x-0 top-0 z-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${shell} flex items-center justify-between py-8`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "?ref=src-nav",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_default,
							alt: "AIRA logo",
							width: 28,
							height: 28,
							draggable: false,
							className: "h-7 w-7 shrink-0 select-none object-contain"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm leading-none tracking-[0.42em] text-[oklch(0.95_0.02_88)] uppercase",
							children: "AIRA"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#early-access",
						className: "text-xs tracking-[0.22em] text-[oklch(0.95_0.02_88)]/70 uppercase transition-colors duration-300 hover:text-[oklch(0.95_0.02_88)]",
						children: "Join Waitlist"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-hero surface-grain relative flex min-h-[100svh] items-end overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-x-0 top-24 z-10 flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "?src=pre-seed-badge",
									className: "inline-flex items-center gap-2 border border-[oklch(0.95_0.03_88)]/25 bg-[oklch(0.95_0.03_88)]/8 px-4 py-2 text-[0.68rem] tracking-[0.22em] text-[oklch(0.95_0.015_88)]/80 uppercase backdrop-blur-sm transition-colors duration-300 hover:border-[oklch(0.95_0.03_88)]/50 hover:text-[oklch(0.95_0.015_88)]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.06_88)] opacity-80" }),
										"Our Pre-seed",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											xmlns: "http://www.w3.org/2000/svg",
											width: "10",
											height: "10",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											"aria-hidden": true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14M12 5l7 7-7 7" })
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": true,
								className: "pointer-events-none absolute -top-[18%] -right-[22%] h-[78vmax] w-[78vmax] rounded-full opacity-[0.14]",
								style: { background: "radial-gradient(closest-side, oklch(0.95 0.03 88) 0%, transparent 72%)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": true,
								className: "pointer-events-none absolute -bottom-[46%] left-[8%] h-[86vmax] w-[86vmax] rounded-[50%] border border-[oklch(0.95_0.03_88)]/12"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `${shell} relative z-10 pt-40 pb-24 sm:pb-32`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "reveal max-w-[16ch] text-[clamp(2.9rem,9vw,7.5rem)] leading-[0.94] font-normal tracking-[-0.035em] text-[oklch(0.97_0.015_88)]",
									children: "Remember what makes you, you."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "reveal mt-10 max-w-[46ch] text-base leading-relaxed text-[oklch(0.97_0.015_88)]/72 sm:text-lg",
									style: { animationDelay: "220ms" },
									children: "AIRA Loop is a screenless AI wristband designed to help you remember everyday conversations, track your health and ask questions about your day."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden border-y border-border bg-background py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "animate-marquee flex w-max gap-0",
							children: [0, 1].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex shrink-0 items-center",
								"aria-hidden": i === 1,
								children: [
									"Personal AI Assistant",
									"Meetings & Summarisation",
									"Voice Capture",
									"AI Second Brain",
									"Health & Wellness",
									"Daily Health Summary",
									"Tasks & Commitments",
									"Everyday Conversations",
									"Personal Timeline"
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-6 px-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs tracking-[0.22em] text-muted-foreground uppercase whitespace-nowrap",
										children: item
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-px w-8 bg-border",
										"aria-hidden": true
									})]
								}, item))
							}, i))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "py-32 sm:py-48",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: shell,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.3em] text-muted-foreground uppercase",
								children: "A life, remembered."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-12 grid items-center gap-14 lg:grid-cols-2 lg:gap-20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "max-w-[20ch] text-[clamp(2rem,5.4vw,4.25rem)] leading-[1.02] tracking-[-0.03em]",
										children: "The longer you wear it, the more of you it remembers."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-10 max-w-[54ch] text-base leading-relaxed text-muted-foreground sm:text-lg",
										children: "AIRA quietly builds a private understanding of your life over time, from the conversations you choose to preserve to the moments, experiences, and patterns that make you uniquely you."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-6 text-xs tracking-[0.24em] text-muted-foreground uppercase",
										children: "The AI You. Built from your life."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
									className: "relative overflow-hidden rounded-2xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: loop_stack_image_default,
										alt: "AIRA Loop wristband product concepts in three finishes",
										loading: "lazy",
										draggable: false,
										className: "h-full w-full rounded-2xl object-cover select-none",
										style: {
											maskImage: "radial-gradient(120% 120% at 50% 50%, #000 62%, transparent 100%)",
											WebkitMaskImage: "radial-gradient(120% 120% at 50% 50%, #000 62%, transparent 100%)"
										}
									})
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "pb-32 sm:pb-48",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `${shell} grid gap-16 border-t border-border pt-16 sm:grid-cols-3 sm:gap-10`,
							children: ideas.map((idea) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "max-w-[34ch]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs tracking-[0.28em] text-muted-foreground uppercase",
										children: [
											idea.index,
											" ",
											idea.label
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-6 text-2xl leading-snug tracking-[-0.02em]",
										children: idea.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-sm leading-relaxed text-muted-foreground",
										children: idea.body
									})
								]
							}, idea.index))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "bg-deep text-[oklch(0.95_0.015_88)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `${shell} py-28 sm:py-40`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid items-center gap-14 lg:grid-cols-2 lg:gap-20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs tracking-[0.3em] text-[oklch(0.95_0.015_88)]/55 uppercase",
										children: "Private by design"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-10 max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.05] tracking-[-0.03em]",
										children: "Your life. Your data. Your decision."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-10 max-w-[56ch] text-base leading-relaxed text-[oklch(0.95_0.015_88)]/65",
										children: "AIRA is designed around control. Pause it. Mute it. Block it. Delete what you don't want remembered. You decide which conversations and memories become part of your second brain."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlToggle, {})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
									className: "relative overflow-hidden rounded-2xl lg:order-first",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: aira_loop_nobg_default,
										alt: "Aira loop demo device",
										loading: "lazy",
										draggable: false,
										className: "h-full w-full rounded-2xl object-cover opacity-[0.2] select-none",
										style: {
											maskImage: "radial-gradient(120% 120% at 50% 50%, #000 62%, transparent 100%)",
											WebkitMaskImage: "radial-gradient(120% 120% at 50% 50%, #000 62%, transparent 100%)"
										}
									})
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoopFeatures, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "early-access",
						className: "py-32 sm:py-48",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: shell,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "max-w-[16ch] text-[clamp(2rem,5.4vw,4.25rem)] leading-[1.02] tracking-[-0.03em]",
									children: "Something worth remembering is coming."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-8 max-w-[44ch] text-base leading-relaxed text-muted-foreground sm:text-lg",
									children: "Join the early access list and be among the first to experience AIRA."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaitlistForm, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreBookingForm, {})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${shell} flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm tracking-[0.42em] uppercase",
							children: "AIRA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex gap-8 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/privacy",
									className: "transition-colors hover:text-foreground",
									children: "Privacy & Terms"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "use-cases",
									className: "transition-colors hover:text-foreground",
									children: "Use Cases"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									hash: "early-access",
									children: "Contact"
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
export { Index as component };
