import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as logo_default, t as AiraFooter } from "./logo-DrSPY8m2.mjs";
import { E as AudioLines, O as ArrowRight, S as CheckCheck, T as Brain, _ as HeartPulse, a as ShieldCheck, b as ClipboardList, c as Pause, d as MessageCircle, g as History, h as Lightbulb, j as Activity, k as ArrowLeft, l as Moon, m as Link2, n as TrendingUp, o as Search, p as ListChecks, r as Thermometer, s as Play, t as X, u as Mic, v as Footprints, w as CalendarDays, x as Check } from "../_libs/lucide-react.mjs";
import { a as prebookUsageOptions, n as GOOGLE_FORM_EMAIL_ENTRY, o as signupSchema, t as GOOGLE_FORM_ACTION } from "./google-form-config-CxXHXH5F.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-BxL3UnHh.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/aira-loop-nobg-D2UeDTwd.js
var aira_loop_nobg_default = "/assets/aira-loop-nobg-DG2BgP9v.png";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B66LEHpU.js
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
function formatReceipt(receipt) {
	const paidAt = receipt.paidAt ? new Intl.DateTimeFormat("en-IN", {
		dateStyle: "medium",
		timeStyle: "medium",
		timeZone: "Asia/Kolkata"
	}).format(new Date(receipt.paidAt)) + " IST" : "Not paid";
	const amount = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: receipt.currency
	}).format(receipt.amount / 100);
	const status = receipt.status.replaceAll("_", " ").replace(/^./, (x) => x.toUpperCase());
	return [
		`Name: ${receipt.name.replace(/[\r\n]+/g, " ")}`,
		`Token: ${receipt.ticketId || "Not issued"}`,
		`Device: ${receipt.device}`,
		`Status: ${status}`,
		`Amount: ${amount}`,
		`Paid at: ${paidAt}`
	].join("\n");
}
var endpoint = "https://pybtosxsnfblfeswgojb.supabase.co/functions/v1/aira-prebook";
var publicKey = "sb_publishable_bKSs08g8dctPvH6v7UBzjA_OJ9GemtR";
var storageKey = "aira-prebooking-receipt-v1";
var PrebookingError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.status = status;
	}
};
async function prebookingRequest(action, data = {}) {
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			apikey: publicKey
		},
		body: JSON.stringify({
			action,
			...data
		}),
		signal: AbortSignal.timeout(3e4)
	});
	const result = await response.json();
	if (!response.ok) throw new PrebookingError(result.error || "Unable to check your pre-booking. Please try again.", response.status);
	return result;
}
function savedToken() {
	try {
		return localStorage.getItem(storageKey);
	} catch {
		return null;
	}
}
function makeToken() {
	const token = Array.from(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(32)), (b) => b.toString(16).padStart(2, "0")).join("");
	try {
		localStorage.setItem(storageKey, token);
	} catch {
		throw new Error("Please allow browser storage so we can safely recover your payment.");
	}
	return token;
}
function clearUnusedToken() {
	localStorage.removeItem(storageKey);
}
var checkoutScript;
function loadRazorpay() {
	if (window.Razorpay) return Promise.resolve();
	if (!checkoutScript) checkoutScript = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		const timer = window.setTimeout(() => fail(), 15e3);
		function fail() {
			clearTimeout(timer);
			script.remove();
			checkoutScript = void 0;
			reject(/* @__PURE__ */ new Error("Checkout could not load. Check your connection and try again."));
		}
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		script.async = true;
		script.onload = () => {
			clearTimeout(timer);
			if (window.Razorpay) resolve();
			else fail();
		};
		script.onerror = fail;
		document.head.appendChild(script);
	});
	return checkoutScript;
}
var prebookingBenefits = [
	"Reserve a spot in the initial batch",
	"₹99 fully refundable · credited toward your device order",
	"₹5,000 off AIRA Loop",
	"6 months of complimentary subscription",
	"Monthly insider updates",
	"Exclusive benefits, enhanced warranty & more surprises to come"
];
var buttonClass = "w-full rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
var fieldClass = "w-full rounded-xl border border-border bg-white px-4 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring";
var secondaryActionClass = "whitespace-nowrap border-0 bg-transparent p-0 text-xs leading-6 text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:opacity-50";
var supportEmail = "nandigiridhar29@gmail.com";
function Benefits() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 space-y-3 text-sm leading-relaxed",
		children: prebookingBenefits.map((benefit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				"aria-hidden": true,
				className: "mt-0.5 h-4 w-4 shrink-0 text-primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: benefit })]
		}, benefit))
	});
}
function PreBookingForm() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [available, setAvailable] = (0, import_react.useState)(null);
	const [receipt, setReceipt] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [hasPending, setHasPending] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(void 0);
	const tokenRef = (0, import_react.useRef)(null);
	const busy = (0, import_react.useRef)(false);
	const opener = (0, import_react.useRef)(null);
	const panel = (0, import_react.useRef)(null);
	const isBusy = phase !== "idle";
	const confirmed = receipt?.status === "paid" && Boolean(receipt.ticketId);
	const refunded = receipt?.status === "refunded" || receipt?.status === "partially_refunded";
	(0, import_react.useEffect)(() => {
		if (!open || phase === "checkout") return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		if (editing) panel.current?.querySelector("#prebook-name")?.focus();
		else panel.current?.focus();
		function keydown(e) {
			if (e.key === "Escape" && !busy.current) setOpen(false);
			if (e.key !== "Tab") return;
			const nodes = Array.from(panel.current?.querySelectorAll("a[href],button:not([disabled]),input:not([disabled]),[tabindex=\"0\"]") || []).filter((x) => x.getClientRects().length > 0 && !x.matches(":disabled"));
			const first = nodes[0], last = nodes[nodes.length - 1];
			if (!first) {
				e.preventDefault();
				panel.current?.focus();
				return;
			}
			if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
				e.preventDefault();
				last?.focus();
			} else if (!e.shiftKey && (document.activeElement === last || document.activeElement === panel.current)) {
				e.preventDefault();
				first.focus();
			}
		}
		document.addEventListener("keydown", keydown);
		return () => {
			document.body.style.overflow = previous;
			document.removeEventListener("keydown", keydown);
		};
	}, [
		open,
		phase,
		editing
	]);
	function close() {
		if (!busy.current) {
			setOpen(false);
			opener.current?.focus();
		}
	}
	function showError(e) {
		setError(e instanceof Error && e.name !== "TimeoutError" ? e.message : "The response is taking longer than expected. Check payment status before paying again.");
	}
	async function checkStatus() {
		if (!tokenRef.current) return null;
		const result = await prebookingRequest("status", { token: tokenRef.current });
		setReceipt(result);
		setHasPending(true);
		return result;
	}
	async function openForm() {
		if (busy.current) return;
		setOpen(true);
		setEditing(false);
		setError("");
		setPhase("loading");
		busy.current = true;
		tokenRef.current = savedToken();
		setHasPending(Boolean(tokenRef.current));
		try {
			const config = await prebookingRequest("config");
			const livePaymentsAvailable = config.enabled && config.mode === "live";
			setAvailable(livePaymentsAvailable);
			if (tokenRef.current && livePaymentsAvailable) try {
				await checkStatus();
			} catch (e) {
				if (e instanceof PrebookingError && e.status === 404) {
					clearUnusedToken();
					tokenRef.current = null;
					setHasPending(false);
					setReceipt(null);
				} else throw e;
			}
		} catch (e) {
			if (!tokenRef.current) {
				setAvailable(false);
				setError("Pre-booking payments are currently unavailable. You can join the waitlist or try again later.");
			} else showError(e);
		} finally {
			busy.current = false;
			setPhase("idle");
		}
	}
	async function verifyPayment(result) {
		setPhase("verifying");
		setError("");
		try {
			let current = await prebookingRequest("verify", {
				token: tokenRef.current,
				orderId: result.razorpay_order_id,
				paymentId: result.razorpay_payment_id,
				signature: result.razorpay_signature
			});
			setReceipt(current);
			for (let attempt = 0; attempt < 5 && ![
				"paid",
				"refunded",
				"partially_refunded"
			].includes(current.status); attempt++) {
				await new Promise((resolve) => setTimeout(resolve, 2500));
				current = await checkStatus();
			}
			if (![
				"paid",
				"refunded",
				"partially_refunded"
			].includes(current.status)) setError("Your payment is awaiting confirmation. Check its status shortly. Please do not pay again.");
		} catch (e) {
			showError(e);
		} finally {
			busy.current = false;
			setPhase("idle");
			panel.current?.scrollTo({ top: 0 });
		}
	}
	async function launchCheckout(order, prefill) {
		setReceipt(order);
		setHasPending(true);
		if ([
			"paid",
			"refunded",
			"partially_refunded"
		].includes(order.status)) {
			busy.current = false;
			setPhase("idle");
			return;
		}
		if (!order.orderId || !order.keyId) throw new Error("Your checkout is still being prepared. Contact AIRA with the reservation reference below before starting another payment.");
		if (order.mode !== "live" || !order.keyId.startsWith("rzp_live_")) throw new Error("This checkout is no longer available. Contact AIRA to start a new pre-booking.");
		await loadRazorpay();
		const Razorpay = window.Razorpay;
		let completed = false;
		const checkout = new Razorpay({
			key: order.keyId,
			order_id: order.orderId,
			amount: order.amount,
			currency: order.currency,
			name: "AIRA",
			description: "Early pre-booking · India Batch #1 · Refundable ₹99 deposit",
			...prefill ? { prefill } : {},
			modal: {
				confirm_close: true,
				ondismiss: () => {
					if (completed) return;
					busy.current = false;
					setPhase("idle");
					setError("Checkout closed. Check payment status if you were charged, or resume the same checkout.");
				}
			},
			handler: (result) => {
				completed = true;
				verifyPayment(result);
			}
		});
		checkout.on("payment.failed", () => setError("The payment attempt was unsuccessful. You can retry within checkout or close it and check payment status."));
		setPhase("checkout");
		checkout.open();
	}
	async function submit(event) {
		event.preventDefault();
		if (busy.current) return;
		const form = new FormData(event.currentTarget);
		const usage = form.getAll("usage");
		if (!usage.length) {
			setError("Choose at least one use for AIRA.");
			return;
		}
		busy.current = true;
		setPhase("loading");
		setError("");
		try {
			tokenRef.current = tokenRef.current || makeToken();
			const details = {
				name: String(form.get("name")).trim(),
				email: String(form.get("email")).trim(),
				country: "India",
				device: "AIRA Loop",
				usage,
				consent: form.get("consent") === "on"
			};
			const order = await prebookingRequest(editing ? "update" : "create", {
				token: tokenRef.current,
				details
			});
			setEditing(false);
			await launchCheckout(order, {
				name: details.name,
				email: details.email
			});
		} catch (e) {
			showError(e);
			if (!editing) setHasPending(Boolean(tokenRef.current));
			busy.current = false;
			setPhase("idle");
		}
	}
	async function recover(resume = false) {
		if (busy.current) return;
		busy.current = true;
		setPhase("loading");
		setError("");
		let handedToCheckout = false;
		try {
			if (resume) {
				const order = await prebookingRequest("resume", { token: tokenRef.current });
				await launchCheckout(order, order.prefill);
				handedToCheckout = busy.current;
				return;
			}
			const current = await checkStatus();
			if (current && ![
				"paid",
				"refunded",
				"partially_refunded"
			].includes(current.status)) setError("No completed payment has been confirmed yet. If your bank shows a debit, please wait and check again before retrying.");
		} catch (e) {
			if (e instanceof PrebookingError && e.status === 404) {
				clearUnusedToken();
				tokenRef.current = null;
				setHasPending(false);
				setReceipt(null);
				setError("No checkout was created. Please enter your details to begin.");
			} else showError(e);
		} finally {
			if (!handedToCheckout) {
				busy.current = false;
				setPhase("idle");
			}
		}
	}
	async function editPrebooking() {
		if (busy.current) return;
		busy.current = true;
		setPhase("loading");
		setError("");
		try {
			const result = await prebookingRequest("edit", { token: tokenRef.current });
			setReceipt(result);
			if ([
				"paid",
				"partially_refunded",
				"refunded"
			].includes(result.status)) return;
			if (!result.details) throw new Error("We couldn’t load your saved details. Please try again.");
			setDraft(result.details);
			setEditing(true);
		} catch (e) {
			showError(e);
		} finally {
			busy.current = false;
			setPhase("idle");
		}
	}
	async function downloadReceipt() {
		if (!receipt) return;
		if (busy.current) return;
		busy.current = true;
		setPhase("loading");
		setError("");
		try {
			const latest = await prebookingRequest("resume", { token: tokenRef.current });
			setReceipt(latest);
			const name = latest.name || latest.prefill?.name;
			if (!name) throw new Error("We couldn’t load your receipt name. Please try again.");
			const content = formatReceipt({
				...latest,
				name,
				device: latest.device || "AIRA Loop"
			});
			const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
			const a = document.createElement("a");
			a.href = url;
			a.download = `AIRA-${latest.ticketId || "receipt"}.txt`;
			a.click();
			setTimeout(() => URL.revokeObjectURL(url), 1e3);
		} catch (e) {
			showError(e);
		} finally {
			busy.current = false;
			setPhase("idle");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "aira-reserve-trigger relative mt-6 inline-flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			ref: opener,
			type: "button",
			onClick: () => void openForm(),
			id: "early-prebooking-trigger",
			className: "inline-block cursor-pointer rounded-full border border-primary bg-secondary px-7 py-5 text-sm tracking-[0.1em] text-primary uppercase transition hover:bg-transparent",
			children: "Early pre-bookings"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute right-0 top-0 rounded-sm bg-primary px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-background",
			children: "INDIA · BATCH #1"
		})]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `aira-reserve-overlay fixed inset-0 z-50 items-center justify-center p-3 sm:p-6 ${phase === "checkout" ? "hidden" : "flex"}`,
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "prebook-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
			onClick: close,
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: panel,
			tabIndex: -1,
			className: "aira-reserve-panel relative z-10 max-h-[90dvh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-3xl border border-border bg-background p-6 shadow-2xl outline-none sm:p-9",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: close,
					disabled: isBusy,
					"aria-label": "Close early pre-bookings",
					className: "absolute right-5 top-5 rounded-full cursor-pointer text-muted-foreground disabled:opacity-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						size: 19,
						"aria-hidden": "true"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 pr-10 text-xs tracking-[0.16em] text-muted-foreground uppercase",
					children: "AIRA Loop · India · Batch #1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "prebook-title",
					className: "pr-6 text-3xl tracking-[-0.04em]",
					children: confirmed ? "You’re pre-booked." : refunded ? "Your deposit status." : "Early pre-bookings."
				}),
				confirmed || refunded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					role: "status",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-sage/30 bg-sage/10 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									className: "mb-4 h-7 w-7 text-primary",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: refunded ? receipt?.status === "refunded" ? "₹99 deposit refunded" : "Deposit partially refunded" : "₹99 deposit received"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-xs uppercase tracking-widest text-muted-foreground",
									children: "Your ticket ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 break-all text-3xl font-semibold tracking-tight",
									children: receipt?.ticketId || "Not issued"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs leading-relaxed text-muted-foreground",
									children: refunded ? "Contact AIRA if you have questions about your refund or eligibility." : "Keep this ID for your pre-booking and future device order. Your ₹99 will be deducted when you order."
								})
							]
						}),
						!refunded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mt-6 text-base font-medium",
							children: "Your Batch #1 benefits"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefits, {})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: isBusy,
							className: `${buttonClass} mt-7`,
							onClick: () => void downloadReceipt(),
							children: "Save your receipt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs leading-relaxed text-muted-foreground",
							children: [
								"Refund requests:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "underline",
									href: `mailto:${supportEmail}?subject=AIRA%20pre-booking%20refund`,
									children: "contact AIRA"
								}),
								" ",
								"with your ticket ID. This is a deposit toward a future device order."
							]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 overflow-hidden rounded-2xl border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative bg-[#f3f4ef] px-5 pt-8 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute right-3 top-3 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900",
								children: "Save ₹5,000"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/aira-loop-nobg-DG2BgP9v.png",
								draggable: false,
								alt: "AIRA Loop wristband",
								className: "mx-auto h-36 w-full object-contain"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "AIRA Loop · Early-access device price"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 flex flex-wrap items-baseline gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-3xl tracking-tight",
										children: "₹23,500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("s", {
										className: "text-sm text-muted-foreground",
										children: "₹28,500"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 border-t border-border pt-3 text-sm font-medium text-primary",
									children: "Pay ₹99 now · Deducted from your device order"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefits, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-xs leading-relaxed text-muted-foreground",
						children: "The final product design may vary slightly. We’ll email you when device orders open, with details on how to claim your pre-booking benefits. Our target launch is H2 2027."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 text-xs leading-relaxed text-muted-foreground",
						children: [
							"We’re starting in India with AIRA events, live hardware demos and platform walkthroughs. Global pre-bookings are planned for Batch #2.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#early-access",
								onClick: close,
								className: "underline underline-offset-2",
								children: "Join the global waitlist."
							})
						]
					}),
					hasPending && !editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-xl border border-border p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-sm font-medium",
								children: "Your saved checkout"
							}),
							receipt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 break-all text-xs text-muted-foreground",
								children: ["Reference: ", receipt.reservationId]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs leading-relaxed text-muted-foreground",
								children: "We’ll check the existing payment before reopening checkout. Your ticket appears only after payment is confirmed."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `${buttonClass} mt-4`,
								disabled: isBusy || available !== true,
								onClick: () => void recover(true),
								type: "button",
								children: "Resume checkout"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: secondaryActionClass,
										disabled: isBusy || available !== true,
										onClick: () => void recover(),
										type: "button",
										children: "Check payment status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: secondaryActionClass,
										disabled: isBusy || available !== true,
										onClick: () => void editPrebooking(),
										type: "button",
										children: "Edit pre-booking"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: secondaryActionClass,
										href: `mailto:${supportEmail}?subject=AIRA%20pre-booking%20help`,
										children: "Need help with your payment?"
									})
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						onSubmit: submit,
						className: "mt-7",
						"aria-busy": isBusy,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							disabled: isBusy,
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "prebook-name",
									className: "mb-2 block text-sm font-medium",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: fieldClass,
									id: "prebook-name",
									name: "name",
									defaultValue: editing ? draft?.name : "",
									type: "text",
									autoComplete: "name",
									required: true,
									minLength: 2,
									maxLength: 120,
									placeholder: "Your name"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "prebook-email",
									className: "mb-2 block text-sm font-medium",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: fieldClass,
									id: "prebook-email",
									name: "email",
									defaultValue: editing ? draft?.email : "",
									type: "email",
									autoComplete: "email",
									required: true,
									maxLength: 254,
									placeholder: "you@example.com"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "prebook-country",
									className: "mb-2 block text-sm font-medium",
									children: "Country"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: `${fieldClass} text-muted-foreground`,
									id: "prebook-country",
									name: "country",
									type: "text",
									value: "India",
									readOnly: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "mb-3 text-sm font-medium",
									children: "What would you use AIRA for?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3",
									children: prebookUsageOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "aira-prebook-use-case flex cursor-pointer items-center gap-3 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											name: "usage",
											value: option,
											defaultChecked: editing && Boolean(draft?.usage.includes(option)),
											className: "h-4 w-4 shrink-0 accent-primary"
										}), option]
									}, option))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3 text-xs leading-relaxed text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										name: "consent",
										required: true,
										className: "mt-1 h-4 w-4 shrink-0 accent-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"I’m in India and agree to AIRA’s",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/privacy",
											className: "underline",
											children: "Privacy & Terms"
										}),
										" ",
										"and the deposit terms above. I consent to processing my details and receiving pre-booking communications and monthly updates."
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs leading-relaxed text-muted-foreground",
									children: [
										"The ₹99 deposit is fully refundable and does not complete a device purchase. To request a refund,",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `mailto:${supportEmail}?subject=AIRA%20pre-booking%20refund`,
											className: "underline",
											children: "contact AIRA"
										}),
										" ",
										"with your ticket ID."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: isBusy || available !== true,
									className: buttonClass,
									children: available === false ? "Payments temporarily unavailable" : isBusy ? "Preparing checkout…" : editing ? "Save & continue to payment" : "Pre-book for ₹99"
								})
							]
						})
					}),
					available === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center text-xs text-muted-foreground",
						children: "Payments are temporarily unavailable. Please try again later or contact AIRA."
					})
				] }),
				isBusy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					className: "mt-5 text-center text-sm text-primary",
					children: phase === "verifying" ? "Confirming your payment and ticket…" : "Checking your pre-booking…"
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "mt-5 rounded-xl border border-border bg-secondary/30 p-4 text-sm leading-relaxed",
					children: error
				}),
				available !== true && !isBusy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "mt-3 text-sm underline",
					type: "button",
					onClick: () => void openForm(),
					children: "Retry connection"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-center text-[11px] text-muted-foreground",
					children: "Secure payment via Razorpay · AIRA never stores card details"
				})
			]
		})]
	})] });
}
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
		className: "aira-features overflow-hidden bg-[#101916] text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-[1200px] px-6 py-24 sm:px-10 sm:py-32 lg:px-16",
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
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Screenless wristband" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Companion app" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Up to 3-day battery" })
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "mx-auto w-full max-w-[380px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public/orange-loop1.png",
							alt: "AIRA Loop wristband product concept",
							draggable: false,
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
/** Shows the active slide and three previews, rotating through every supplied slide. */
function SqueezeCarousel({ slides, label, autoplay = false, interval = 2e3 }) {
	const [active, setActive] = (0, import_react.useState)(0);
	const [imageRatios, setImageRatios] = (0, import_react.useState)({});
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const [focused, setFocused] = (0, import_react.useState)(false);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [reducedMotion, setReducedMotion] = (0, import_react.useState)(false);
	const id = (0, import_react.useId)();
	const tabs = (0, import_react.useRef)([]);
	const pointer = (0, import_react.useRef)(null);
	const swiped = (0, import_react.useRef)(false);
	const count = slides.length;
	const rememberImageSize = (0, import_react.useCallback)((source, image) => {
		if (!image.naturalWidth || !image.naturalHeight) return;
		const ratio = image.naturalWidth / image.naturalHeight;
		setImageRatios((previous) => previous[source] === ratio ? previous : {
			...previous,
			[source]: ratio
		});
	}, []);
	(0, import_react.useEffect)(() => {
		slides.forEach((slide, index) => {
			const image = tabs.current[index]?.querySelector("img");
			if (image?.complete) rememberImageSize(slide.image, image);
		});
	}, [slides, rememberImageSize]);
	const rotating = autoplay && !hovered && !focused && !paused && !reducedMotion && count > 1;
	(0, import_react.useEffect)(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReducedMotion(query.matches);
		update();
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!rotating) return;
		const timer = window.setInterval(() => {
			if (!document.hidden) setActive((index) => (index + 1) % count);
		}, interval);
		return () => window.clearInterval(timer);
	}, [
		rotating,
		interval,
		count
	]);
	const current = slides[active];
	if (!current) return null;
	const select = (index) => setActive((index + count) % count);
	const onKeyDown = (event) => {
		let next;
		switch (event.key) {
			case "ArrowRight":
				next = (active + 1) % count;
				break;
			case "ArrowLeft":
				next = (active - 1 + count) % count;
				break;
			case "Home":
				next = 0;
				break;
			case "End":
				next = count - 1;
				break;
			default: return;
		}
		event.preventDefault();
		select(next);
		tabs.current[next]?.focus({ preventScroll: true });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "aira-squeeze",
		role: "region",
		"aria-roledescription": "carousel",
		"aria-label": label,
		onMouseEnter: () => setHovered(true),
		onMouseLeave: () => setHovered(false),
		onFocusCapture: () => setFocused(true),
		onBlurCapture: (event) => {
			if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "aira-squeeze-panels",
			style: { "--active-image-ratio": imageRatios[current.image] ?? 16 / 9 },
			role: "tablist",
			"aria-label": "Choose a Loop experience",
			onKeyDown,
			onPointerDown: (event) => {
				if (!event.isPrimary || event.button !== 0) return;
				pointer.current = {
					x: event.clientX,
					y: event.clientY
				};
				swiped.current = false;
			},
			onPointerCancel: () => {
				pointer.current = null;
			},
			onPointerUp: (event) => {
				const start = pointer.current;
				pointer.current = null;
				if (!start) return;
				const dx = event.clientX - start.x;
				const dy = event.clientY - start.y;
				if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
					swiped.current = true;
					select(active + (dx < 0 ? 1 : -1));
				}
			},
			children: slides.map((slide, index) => {
				const position = (index - active + count) % count;
				const selected = index === active;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					ref: (node) => {
						tabs.current[index] = node;
					},
					type: "button",
					role: "tab",
					id: `${id}-tab-${slide.id}`,
					"aria-controls": `${id}-caption`,
					"aria-selected": selected,
					"aria-label": slide.title,
					tabIndex: selected ? 0 : -1,
					"data-position": position,
					className: "aira-squeeze-panel",
					style: { "--preview-position": position },
					onClick: () => {
						if (swiped.current) {
							swiped.current = false;
							return;
						}
						select(index);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: slide.image,
						alt: slide.imageAlt,
						loading: "lazy",
						decoding: "async",
						draggable: false,
						onLoad: (event) => rememberImageSize(slide.image, event.currentTarget)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "aira-squeeze-number",
						"aria-hidden": "true",
						children: String(index + 1).padStart(2, "0")
					})]
				}, slide.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "aira-squeeze-footer",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: `${id}-caption`,
				role: "tabpanel",
				"aria-labelledby": `${id}-tab-${current.id}`,
				"aria-live": rotating ? "off" : "polite",
				"aria-atomic": "true",
				className: "aira-squeeze-caption",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: current.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: current.description })] }, current.id)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "aira-squeeze-controls",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"aria-hidden": "true",
						children: [
							String(active + 1).padStart(2, "0"),
							" / ",
							String(count).padStart(2, "0")
						]
					}),
					autoplay && !reducedMotion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": paused ? "Resume autoplay" : "Pause autoplay",
						onClick: () => setPaused((value) => !value),
						children: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
							"aria-hidden": "true",
							size: 17
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
							"aria-hidden": "true",
							size: 17
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Previous experience",
						onClick: () => select(active - 1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							"aria-hidden": "true",
							size: 19
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Next experience",
						onClick: () => select(active + 1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							"aria-hidden": "true",
							size: 19
						})
					})
				]
			})]
		})]
	});
}
var assetBase = "https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public";
var slides = [
	{
		id: "activity",
		title: "Move with more awareness.",
		description: "Follow your activity, movement and daily rhythm, all in one place.",
		image: `${assetBase}/aira-activity.png`,
		imageAlt: "AIRA activity and movement experience"
	},
	{
		id: "stress",
		title: "Understand your stress patterns.",
		description: "Explore stress-related signals and see how they change throughout your day.",
		image: `${assetBase}/aira-stress-indicator.png`,
		imageAlt: "AIRA stress indicator experience"
	},
	{
		id: "meetings",
		title: "Stay present. AIRA remembers what matters.",
		description: "AIRA turns captured conversations into clear summaries, key decisions and follow-ups.",
		image: `${assetBase}/aira-for-meetings.png`,
		imageAlt: "AIRA meeting memory experience"
	},
	{
		id: "sleep",
		title: "Better nights make for better days.",
		description: "Wake up to a deeper understanding of your sleep, with Loop’s insights into your nightly patterns.",
		image: `${assetBase}/aira-sleep-cycle.png`,
		imageAlt: "AIRA sleep cycle experience"
	},
	{
		id: "app-preview",
		title: "Your day, connected in one app.",
		description: "Explore your daily wellness score, detailed health metrics, revisit saved conversations and ask AIRA about what matters to you.",
		image: `${assetBase}/aira-app-frame1.png`,
		imageAlt: "AIRA app preview showing a daily wellness score, conversation recall and saved memories"
	}
];
function LoopExperienceCarousel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "aira-experiences mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SqueezeCarousel, {
			slides,
			label: "Explore life with AIRA Loop",
			autoplay: true,
			interval: 2400
		})
	});
}
var loop_stack_image_default = "/assets/loop-stack-image-BaV_m3ix.png";
var groups = [[
	"data:image/svg+xml,%3c?xml%20version='1.0'%20?%3e%3csvg%20id='Capa_1'%20style='enable-background:new%200%200%20150%20150;'%20version='1.1'%20viewBox='0%200%20150%20150'%20xml:space='preserve'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%231A73E8;}%20.st1{fill:%23EA4335;}%20.st2{fill:%234285F4;}%20.st3{fill:%23FBBC04;}%20.st4{fill:%2334A853;}%20.st5{fill:%234CAF50;}%20.st6{fill:%231E88E5;}%20.st7{fill:%23E53935;}%20.st8{fill:%23C62828;}%20.st9{fill:%23FBC02D;}%20.st10{fill:%231565C0;}%20.st11{fill:%232E7D32;}%20.st12{fill:%23F6B704;}%20.st13{fill:%23E54335;}%20.st14{fill:%234280EF;}%20.st15{fill:%2334A353;}%20.st16{clip-path:url(%23SVGID_2_);}%20.st17{fill:%23188038;}%20.st18{opacity:0.2;fill:%23FFFFFF;enable-background:new%20;}%20.st19{opacity:0.3;fill:%230D652D;enable-background:new%20;}%20.st20{clip-path:url(%23SVGID_4_);}%20.st21{opacity:0.3;fill:url(%23_45_shadow_1_);enable-background:new%20;}%20.st22{clip-path:url(%23SVGID_6_);}%20.st23{fill:%23FA7B17;}%20.st24{opacity:0.3;fill:%23174EA6;enable-background:new%20;}%20.st25{opacity:0.3;fill:%23A50E0E;enable-background:new%20;}%20.st26{opacity:0.3;fill:%23E37400;enable-background:new%20;}%20.st27{fill:url(%23Finish_mask_1_);}%20.st28{fill:%23FFFFFF;}%20.st29{fill:%230C9D58;}%20.st30{opacity:0.2;fill:%23004D40;enable-background:new%20;}%20.st31{opacity:0.2;fill:%233E2723;enable-background:new%20;}%20.st32{fill:%23FFC107;}%20.st33{opacity:0.2;fill:%231A237E;enable-background:new%20;}%20.st34{opacity:0.2;}%20.st35{fill:%231A237E;}%20.st36{fill:url(%23SVGID_7_);}%20.st37{fill:%23FBBC05;}%20.st38{clip-path:url(%23SVGID_9_);fill:%23E53935;}%20.st39{clip-path:url(%23SVGID_11_);fill:%23FBC02D;}%20.st40{clip-path:url(%23SVGID_13_);fill:%23E53935;}%20.st41{clip-path:url(%23SVGID_15_);fill:%23FBC02D;}%20%3c/style%3e%3cg%3e%3cpath%20class='st5'%20d='M121.1,57.9L99.1,74.3v35.8h15.4c3.6,0,6.6-2.9,6.6-6.6V57.9z'/%3e%3cpath%20class='st6'%20d='M28.9,57.9l21.9,16.5v35.8H35.5c-3.6,0-6.6-2.9-6.6-6.6V57.9z'/%3e%3cpolygon%20class='st7'%20points='99.1,46.9%2075,65%2050.9,46.9%2050.9,74.3%2075,92.4%2099.1,74.3%20'/%3e%3cpath%20class='st8'%20d='M28.9,49.3v8.6l21.9,16.5V46.9L44,41.8c-1.6-1.2-3.6-1.9-5.7-1.9l0,0C33.1,39.9,28.9,44.1,28.9,49.3z'/%3e%3cpath%20class='st9'%20d='M121.1,49.3v8.6L99.1,74.3V46.9l6.9-5.1c1.6-1.2,3.6-1.9,5.7-1.9l0,0C116.9,39.9,121.1,44.1,121.1,49.3z'/%3e%3c/g%3e%3c/svg%3e",
	"data:image/svg+xml,%3c?xml%20version='1.0'%20?%3e%3csvg%20id='Capa_1'%20style='enable-background:new%200%200%20150%20150;'%20version='1.1'%20viewBox='0%200%20150%20150'%20xml:space='preserve'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%231A73E8;}%20.st1{fill:%23EA4335;}%20.st2{fill:%234285F4;}%20.st3{fill:%23FBBC04;}%20.st4{fill:%2334A853;}%20.st5{fill:%234CAF50;}%20.st6{fill:%231E88E5;}%20.st7{fill:%23E53935;}%20.st8{fill:%23C62828;}%20.st9{fill:%23FBC02D;}%20.st10{fill:%231565C0;}%20.st11{fill:%232E7D32;}%20.st12{fill:%23F6B704;}%20.st13{fill:%23E54335;}%20.st14{fill:%234280EF;}%20.st15{fill:%2334A353;}%20.st16{clip-path:url(%23SVGID_2_);}%20.st17{fill:%23188038;}%20.st18{opacity:0.2;fill:%23FFFFFF;enable-background:new%20;}%20.st19{opacity:0.3;fill:%230D652D;enable-background:new%20;}%20.st20{clip-path:url(%23SVGID_4_);}%20.st21{opacity:0.3;fill:url(%23_45_shadow_1_);enable-background:new%20;}%20.st22{clip-path:url(%23SVGID_6_);}%20.st23{fill:%23FA7B17;}%20.st24{opacity:0.3;fill:%23174EA6;enable-background:new%20;}%20.st25{opacity:0.3;fill:%23A50E0E;enable-background:new%20;}%20.st26{opacity:0.3;fill:%23E37400;enable-background:new%20;}%20.st27{fill:url(%23Finish_mask_1_);}%20.st28{fill:%23FFFFFF;}%20.st29{fill:%230C9D58;}%20.st30{opacity:0.2;fill:%23004D40;enable-background:new%20;}%20.st31{opacity:0.2;fill:%233E2723;enable-background:new%20;}%20.st32{fill:%23FFC107;}%20.st33{opacity:0.2;fill:%231A237E;enable-background:new%20;}%20.st34{opacity:0.2;}%20.st35{fill:%231A237E;}%20.st36{fill:url(%23SVGID_7_);}%20.st37{fill:%23FBBC05;}%20.st38{clip-path:url(%23SVGID_9_);fill:%23E53935;}%20.st39{clip-path:url(%23SVGID_11_);fill:%23FBC02D;}%20.st40{clip-path:url(%23SVGID_13_);fill:%23E53935;}%20.st41{clip-path:url(%23SVGID_15_);fill:%23FBC02D;}%20%3c/style%3e%3cg%3e%3cpolygon%20class='st6'%20points='28.5,59.9%2028.5,90.1%2050.1,90.1%2050.1,59.9%20'/%3e%3cpath%20class='st5'%20d='M102,75v30.3c0,3.6-2.9,6.5-6.5,6.5H50.1V90.1h30.3V75H102z'/%3e%3cpath%20class='st9'%20d='M102,44.7V75H80.4V59.9H50.1V38.2h45.4C99.1,38.2,102,41.1,102,44.7z'/%3e%3cpath%20class='st10'%20d='M50.1,90.1v21.6H35c-3.6,0-6.5-2.9-6.5-6.5V90.1H50.1z'/%3e%3cpolygon%20class='st7'%20points='50.1,38.2%2050.1,59.9%2028.5,59.9%20'/%3e%3cpolygon%20class='st11'%20points='104.2,75%20102,93.3%2080.4,75%20102,56.7%20'/%3e%3cpath%20class='st5'%20d='M121.5,45V105c0,1.8-2.1,2.8-3.5,1.7L102,93.3V56.7L118,43.3C119.4,42.1,121.5,43.1,121.5,45z'/%3e%3c/g%3e%3c/svg%3e",
	"data:image/svg+xml,%3c?xml%20version='1.0'%20?%3e%3csvg%20id='Capa_1'%20style='enable-background:new%200%200%20150%20150;'%20version='1.1'%20viewBox='0%200%20150%20150'%20xml:space='preserve'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%231A73E8;}%20.st1{fill:%23EA4335;}%20.st2{fill:%234285F4;}%20.st3{fill:%23FBBC04;}%20.st4{fill:%2334A853;}%20.st5{fill:%234CAF50;}%20.st6{fill:%231E88E5;}%20.st7{fill:%23E53935;}%20.st8{fill:%23C62828;}%20.st9{fill:%23FBC02D;}%20.st10{fill:%231565C0;}%20.st11{fill:%232E7D32;}%20.st12{fill:%23F6B704;}%20.st13{fill:%23E54335;}%20.st14{fill:%234280EF;}%20.st15{fill:%2334A353;}%20.st16{clip-path:url(%23SVGID_2_);}%20.st17{fill:%23188038;}%20.st18{opacity:0.2;fill:%23FFFFFF;enable-background:new%20;}%20.st19{opacity:0.3;fill:%230D652D;enable-background:new%20;}%20.st20{clip-path:url(%23SVGID_4_);}%20.st21{opacity:0.3;fill:url(%23_45_shadow_1_);enable-background:new%20;}%20.st22{clip-path:url(%23SVGID_6_);}%20.st23{fill:%23FA7B17;}%20.st24{opacity:0.3;fill:%23174EA6;enable-background:new%20;}%20.st25{opacity:0.3;fill:%23A50E0E;enable-background:new%20;}%20.st26{opacity:0.3;fill:%23E37400;enable-background:new%20;}%20.st27{fill:url(%23Finish_mask_1_);}%20.st28{fill:%23FFFFFF;}%20.st29{fill:%230C9D58;}%20.st30{opacity:0.2;fill:%23004D40;enable-background:new%20;}%20.st31{opacity:0.2;fill:%233E2723;enable-background:new%20;}%20.st32{fill:%23FFC107;}%20.st33{opacity:0.2;fill:%231A237E;enable-background:new%20;}%20.st34{opacity:0.2;}%20.st35{fill:%231A237E;}%20.st36{fill:url(%23SVGID_7_);}%20.st37{fill:%23FBBC05;}%20.st38{clip-path:url(%23SVGID_9_);fill:%23E53935;}%20.st39{clip-path:url(%23SVGID_11_);fill:%23FBC02D;}%20.st40{clip-path:url(%23SVGID_13_);fill:%23E53935;}%20.st41{clip-path:url(%23SVGID_15_);fill:%23FBC02D;}%20%3c/style%3e%3cg%3e%3cpolygon%20class='st6'%20points='79.2,67.2%2081.8,70.9%2085.8,68%2085.8,89%2090.1,89%2090.1,61.4%2086.5,61.4%20'/%3e%3cpath%20class='st6'%20d='M72.3,74.4c1.6-1.4,2.6-3.5,2.6-5.7c0-4.4-3.9-8-8.6-8c-4,0-7.5,2.5-8.4,6.2l4.2,1.1c0.4-1.7,2.2-2.9,4.2-2.9%20c2.4,0,4.3,1.6,4.3,3.6c0,2-1.9,3.6-4.3,3.6h-2.5v4.4h2.5c2.7,0,5,1.9,5,4.1c0,2.3-2.2,4.1-4.9,4.1c-2.4,0-4.5-1.5-4.8-3.6%20l-4.2,0.7c0.7,4.1,4.6,7.2,9.1,7.2c5.1,0,9.2-3.8,9.2-8.5C75.6,78.2,74.3,75.9,72.3,74.4z'/%3e%3cpolygon%20class='st9'%20points='100.2,120.3%2049.8,120.3%2049.8,100.2%20100.2,100.2%20'/%3e%3cpolygon%20class='st5'%20points='120.3,100.2%20120.3,49.8%20100.2,49.8%20100.2,100.2%20'/%3e%3cpath%20class='st6'%20d='M100.2,49.8V29.7h-63c-4.2,0-7.6,3.4-7.6,7.6v63h20.1V49.8H100.2z'/%3e%3cpolygon%20class='st7'%20points='100.2,100.2%20100.2,120.3%20120.3,100.2%20'/%3e%3cpath%20class='st10'%20d='M112.8,29.7h-12.6v20.1h20.1V37.2C120.3,33,117,29.7,112.8,29.7z'/%3e%3cpath%20class='st10'%20d='M37.2,120.3h12.6v-20.1H29.7v12.6C29.7,117,33,120.3,37.2,120.3z'/%3e%3c/g%3e%3c/svg%3e"
], [
	"/assets/aira-health-icon-CYm_4ytF.png",
	"/assets/aira-chat-icon-C8Q7pGFV.png",
	"/assets/aira-notes-icon-BlAn4UEB.png"
]];
function AgentIconStack() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "aira-agent-services",
		role: "img",
		"aria-label": "Gmail, Google Meet, Google Calendar, health, conversations and notes",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "aira-agent-icon-track",
			"aria-hidden": "true",
			children: [...groups, groups[0]].map((group, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "aira-agent-icon-row",
				children: group.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: source,
					alt: "",
					width: 56,
					height: 56,
					draggable: false
				}, source))
			}, index))
		})
	});
}
var shell = "mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16";
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
	const heroImage = (0, import_react.useRef)(null);
	const [heroImageReady, setHeroImageReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (heroImage.current?.complete && heroImage.current.naturalWidth > 0) setHeroImageReady(true);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "aira-site aira-home min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "aira-header",
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Main navigation",
						className: "flex items-center gap-5 sm:gap-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#early-access",
							className: "text-xs tracking-[0.12em] text-[oklch(0.95_0.02_88)]/70 uppercase transition-colors duration-300 hover:text-[oklch(0.95_0.02_88)]",
							children: "Join Waitlist"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "aira-hero",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "aira-hero-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "reveal max-w-[16ch] text-[clamp(2.9rem,9vw,7.5rem)] leading-[0.94] font-normal tracking-[-0.035em] text-[oklch(0.97_0.015_88)]",
									children: "Remember what makes you, you."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "reveal mt-10 max-w-[46ch] text-base leading-relaxed text-[oklch(0.97_0.015_88)]/72 sm:text-lg",
									style: { animationDelay: "220ms" },
									children: "AIRA Loop is a screenless AI wristband designed to help you remember everyday conversations, track your health and ask questions about your day."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "aira-hero-actions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#early-access",
										className: "aira-button",
										onClick: (event) => {
											const trigger = document.getElementById("early-prebooking-trigger");
											if (trigger) {
												event.preventDefault();
												trigger.click();
											}
										},
										children: ["Early pre-booking ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											children: "↗"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#loop-features",
										className: "aira-text-link",
										children: ["Explore AIRA Loop ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											children: "↓"
										})]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
							className: "aira-hero-visual",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								ref: heroImage,
								"data-ready": heroImageReady,
								src: "https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public/aira-hand-loop-hero.png",
								alt: "AIRA Loop worn on a wrist",
								fetchPriority: "high",
								draggable: false,
								decoding: "async",
								onLoad: () => setHeroImageReady(true),
								onError: (event) => {
									setHeroImageReady(false);
									event.currentTarget.onerror = null;
									if (!event.currentTarget.src.endsWith("/assets/aira-loop-nobg-DG2BgP9v.png")) event.currentTarget.src = aira_loop_nobg_default;
								}
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aira-marquee overflow-hidden border-y border-border bg-background py-4",
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
						className: "aira-story py-32 sm:py-48",
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
						className: "aira-pillars pb-32 sm:pb-48",
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
						className: "aira-privacy bg-deep text-[oklch(0.95_0.015_88)]",
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
										alt: "AIRA Loop wristband",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `${shell} aira-agent-statement`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "aira-agent-name",
								children: ["AIRA", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public/aira-blog-agent.png",
									alt: "",
									width: 64,
									draggable: false,
									height: 64,
									loading: "lazy",
									className: "aira-agent-avatar"
								})]
							}),
							", your AI second brain",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "aira-agent-action",
								children: [
									"that gets ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentIconStack, {}),
									" done"
								]
							})
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoopExperienceCarousel, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoopFeatures, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "early-access",
						className: "aira-access py-32 sm:py-48",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiraFooter, {})
		]
	});
}
//#endregion
export { Index as component };
