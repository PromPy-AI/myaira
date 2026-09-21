import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ShieldCheck, X } from "lucide-react";
import loopImage from "@/assets/aira-loop-nobg.png";
import { prebookUsageOptions } from "@/lib/google-form-config";
import { formatReceipt } from "@/lib/receipt-format";
import {
  clearUnusedToken,
  loadRazorpay,
  makeToken,
  PrebookingError,
  prebookingBenefits,
  prebookingRequest,
  savedToken,
  type Receipt,
} from "@/lib/prebooking";

const buttonClass =
  "w-full rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const fieldClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring";
const secondaryActionClass =
  "whitespace-nowrap border-0 bg-transparent p-0 text-xs leading-6 text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:opacity-50";
const supportEmail = "nandigiridhar29@gmail.com";
type Phase = "idle" | "loading" | "checkout" | "verifying";

function Benefits() {
  return (
    <ul className="mt-4 space-y-3 text-sm leading-relaxed">
      {prebookingBenefits.map((benefit) => (
        <li key={benefit} className="flex items-start gap-3">
          <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{benefit}</span>
        </li>
      ))}
    </ul>
  );
}

export function PreBookingForm() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [available, setAvailable] = useState<boolean | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [error, setError] = useState("");
  const [hasPending, setHasPending] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Receipt["details"]>(undefined);
  const tokenRef = useRef<string | null>(null);
  const busy = useRef(false);
  const opener = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const isBusy = phase !== "idle";
  const confirmed = receipt?.status === "paid" && Boolean(receipt.ticketId);
  const refunded = receipt?.status === "refunded" || receipt?.status === "partially_refunded";

  useEffect(() => {
    if (!open || phase === "checkout") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (editing) panel.current?.querySelector<HTMLInputElement>("#prebook-name")?.focus();
    else panel.current?.focus();
    function keydown(e: KeyboardEvent) {
      if (e.key === "Escape" && !busy.current) setOpen(false);
      if (e.key !== "Tab") return;
      const nodes = Array.from(
        panel.current?.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),[tabindex="0"]',
        ) || [],
      ).filter((x) => x.getClientRects().length > 0 && !x.matches(":disabled"));
      const first = nodes[0],
        last = nodes[nodes.length - 1];
      if (!first) {
        e.preventDefault();
        panel.current?.focus();
        return;
      }
      if (
        e.shiftKey &&
        (document.activeElement === first || document.activeElement === panel.current)
      ) {
        e.preventDefault();
        last?.focus();
      } else if (
        !e.shiftKey &&
        (document.activeElement === last || document.activeElement === panel.current)
      ) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", keydown);
    };
  }, [open, phase, editing]);

  function close() {
    if (!busy.current) {
      setOpen(false);
      opener.current?.focus();
    }
  }
  function showError(e: unknown) {
    setError(
      e instanceof Error && e.name !== "TimeoutError"
        ? e.message
        : "The response is taking longer than expected. Check payment status before paying again.",
    );
  }
  async function checkStatus() {
    if (!tokenRef.current) return null;
    const result = await prebookingRequest<Receipt>("status", { token: tokenRef.current });
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
      const config = await prebookingRequest<{ enabled: boolean; mode: string | null }>("config");
      const livePaymentsAvailable = config.enabled && config.mode === "live";
      setAvailable(livePaymentsAvailable);
      if (tokenRef.current && livePaymentsAvailable) {
        try {
          await checkStatus();
        } catch (e) {
          if (e instanceof PrebookingError && e.status === 404) {
            clearUnusedToken();
            tokenRef.current = null;
            setHasPending(false);
            setReceipt(null);
          } else throw e;
        }
      }
    } catch (e) {
      if (!tokenRef.current) {
        setAvailable(false);
        setError(
          "Pre-booking payments are currently unavailable. You can join the waitlist or try again later.",
        );
      } else showError(e);
    } finally {
      busy.current = false;
      setPhase("idle");
    }
  }
  async function verifyPayment(result: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) {
    setPhase("verifying");
    setError("");
    try {
      let current = await prebookingRequest<Receipt>("verify", {
        token: tokenRef.current,
        orderId: result.razorpay_order_id,
        paymentId: result.razorpay_payment_id,
        signature: result.razorpay_signature,
      });
      setReceipt(current);
      // Authorized payments may be captured shortly after checkout returns.
      for (
        let attempt = 0;
        attempt < 5 && !["paid", "refunded", "partially_refunded"].includes(current.status);
        attempt++
      ) {
        await new Promise((resolve) => setTimeout(resolve, 2500));
        current = (await checkStatus())!;
      }
      if (!["paid", "refunded", "partially_refunded"].includes(current.status))
        setError(
          "Your payment is awaiting confirmation. Check its status shortly. Please do not pay again.",
        );
    } catch (e) {
      showError(e);
    } finally {
      busy.current = false;
      setPhase("idle");
      panel.current?.scrollTo({ top: 0 });
    }
  }
  async function launchCheckout(order: Receipt, prefill?: { name: string; email: string }) {
    setReceipt(order);
    setHasPending(true);
    if (["paid", "refunded", "partially_refunded"].includes(order.status)) {
      busy.current = false;
      setPhase("idle");
      return;
    }
    if (!order.orderId || !order.keyId)
      throw new Error(
        "Your checkout is still being prepared. Contact AIRA with the reservation reference below before starting another payment.",
      );
    if (order.mode !== "live" || !order.keyId.startsWith("rzp_live_"))
      throw new Error(
        "This checkout is no longer available. Contact AIRA to start a new pre-booking.",
      );
    await loadRazorpay();
    const Razorpay = window.Razorpay!;
    let completed = false;
    const checkout = new Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: "AIRA",
      description: "Early pre-booking · India Batch #1 · Refundable ₹99 deposit",
      ...(prefill ? { prefill } : {}),
      modal: {
        confirm_close: true,
        ondismiss: () => {
          if (completed) return;
          busy.current = false;
          setPhase("idle");
          setError(
            "Checkout closed. Check payment status if you were charged, or resume the same checkout.",
          );
        },
      },
      handler: (result) => {
        completed = true;
        void verifyPayment(result);
      },
    });
    checkout.on("payment.failed", () =>
      setError(
        "The payment attempt was unsuccessful. You can retry within checkout or close it and check payment status.",
      ),
    );
    setPhase("checkout");
    checkout.open();
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
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
        consent: form.get("consent") === "on",
      };
      const order = await prebookingRequest<Receipt>(editing ? "update" : "create", {
        token: tokenRef.current,
        details,
      });
      setEditing(false);
      await launchCheckout(order, { name: details.name, email: details.email });
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
        const order = await prebookingRequest<Receipt>("resume", { token: tokenRef.current });
        await launchCheckout(order, order.prefill);
        handedToCheckout = busy.current;
        return;
      }
      const current = await checkStatus();
      if (current && !["paid", "refunded", "partially_refunded"].includes(current.status))
        setError(
          "No completed payment has been confirmed yet. If your bank shows a debit, please wait and check again before retrying.",
        );
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
      const result = await prebookingRequest<Receipt>("edit", { token: tokenRef.current });
      setReceipt(result);
      if (["paid", "partially_refunded", "refunded"].includes(result.status)) return;
      if (!result.details)
        throw new Error("We couldn’t load your saved details. Please try again.");
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
      // Also supports receipts issued before names were included in the API response.
      const latest = await prebookingRequest<Receipt>("resume", { token: tokenRef.current });
      setReceipt(latest);
      const name = latest.name || latest.prefill?.name;
      if (!name) throw new Error("We couldn’t load your receipt name. Please try again.");
      const content = formatReceipt({ ...latest, name, device: latest.device || "AIRA Loop" });
      const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = `AIRA-${latest.ticketId || "receipt"}.txt`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      showError(e);
    } finally {
      busy.current = false;
      setPhase("idle");
    }
  }

  return (
    <>
      <div className="aira-reserve-trigger relative mt-6 inline-flex">
        <button
          ref={opener}
          type="button"
          onClick={() => void openForm()}
          id="early-prebooking-trigger"
          className="inline-block cursor-pointer rounded-full border border-primary bg-secondary px-7 py-5 text-sm tracking-[0.1em] text-primary uppercase transition hover:bg-transparent"
        >
          Early pre-bookings
        </button>
        <span className="absolute right-0 top-0 rounded-sm bg-primary px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-background">
          INDIA · BATCH #1
        </span>
      </div>
      {open && (
        <div
          className={`aira-reserve-overlay fixed inset-0 z-50 items-center justify-center p-3 sm:p-6 ${phase === "checkout" ? "hidden" : "flex"}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="prebook-title"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <div
            ref={panel}
            tabIndex={-1}
            className="aira-reserve-panel relative z-10 max-h-[90dvh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-3xl border border-border bg-background p-6 shadow-2xl outline-none sm:p-9"
          >
            <button
              type="button"
              onClick={close}
              disabled={isBusy}
              aria-label="Close early pre-bookings"
              className="absolute right-5 top-5 rounded-full cursor-pointer text-muted-foreground disabled:opacity-40"
            >
              <X size={19} aria-hidden="true" />
            </button>
            <p className="mb-3 pr-10 text-xs tracking-[0.16em] text-muted-foreground uppercase">
              AIRA Loop · India · Batch #1
            </p>
            <h3 id="prebook-title" className="pr-6 text-3xl tracking-[-0.04em]">
              {confirmed
                ? "You’re pre-booked."
                : refunded
                  ? "Your deposit status."
                  : "Early pre-bookings."}
            </h3>

            {confirmed || refunded ? (
              <div className="mt-6" role="status">
                <div className="rounded-2xl border border-sage/30 bg-sage/10 p-6">
                  <ShieldCheck className="mb-4 h-7 w-7 text-primary" aria-hidden />
                  <p className="text-sm font-medium">
                    {refunded
                      ? receipt?.status === "refunded"
                        ? "₹99 deposit refunded"
                        : "Deposit partially refunded"
                      : "₹99 deposit received"}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
                    Your ticket ID
                  </p>
                  <p className="mt-1 break-all text-3xl font-semibold tracking-tight">
                    {receipt?.ticketId || "Not issued"}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {refunded
                      ? "Contact AIRA if you have questions about your refund or eligibility."
                      : "Keep this ID for your pre-booking and future device order. Your ₹99 will be deducted when you order."}
                  </p>
                </div>
                {!refunded && (
                  <>
                    <h4 className="mt-6 text-base font-medium">Your Batch #1 benefits</h4>
                    <Benefits />
                  </>
                )}
                <button
                  type="button"
                  disabled={isBusy}
                  className={`${buttonClass} mt-7`}
                  onClick={() => void downloadReceipt()}
                >
                  Save your receipt
                </button>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Refund requests:{" "}
                  <a
                    className="underline"
                    href={`mailto:${supportEmail}?subject=AIRA%20pre-booking%20refund`}
                  >
                    contact AIRA
                  </a>{" "}
                  with your ticket ID. This is a deposit toward a future device order.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                  <div className="relative bg-[#f3f4ef] px-5 pt-8 pb-3">
                    <span className="absolute right-3 top-3 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                      Save ₹5,000
                    </span>
                    <img
                      src={loopImage}
                      draggable={false}
                      alt="AIRA Loop wristband"
                      className="mx-auto h-36 w-full object-contain"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-medium">AIRA Loop · Early-access device price</p>
                    <p className="mt-2 flex flex-wrap items-baseline gap-3">
                      <span className="text-3xl tracking-tight">₹23,500</span>
                      <s className="text-sm text-muted-foreground">₹28,500</s>
                    </p>
                    <p className="mt-3 border-t border-border pt-3 text-sm font-medium text-primary">
                      Pay ₹99 now · Deducted from your device order
                    </p>
                  </div>
                </div>
                <Benefits />
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  The final product design may vary slightly. We’ll email you when device orders
                  open, with details on how to claim your pre-booking benefits. Our target launch is
                  H2 2027.
                </p>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  We’re starting in India with AIRA events, live hardware demos and platform
                  walkthroughs. Global pre-bookings are planned for Batch #2.{" "}
                  <a href="#early-access" onClick={close} className="underline underline-offset-2">
                    Join the global waitlist.
                  </a>
                </p>

                {hasPending && !editing ? (
                  <div className="mt-6 rounded-xl border border-border p-4">
                    <h4 className="text-sm font-medium">Your saved checkout</h4>
                    {receipt && (
                      <p className="mt-2 break-all text-xs text-muted-foreground">
                        Reference: {receipt.reservationId}
                      </p>
                    )}
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      We’ll check the existing payment before reopening checkout. Your ticket
                      appears only after payment is confirmed.
                    </p>
                    <button
                      className={`${buttonClass} mt-4`}
                      disabled={isBusy || available !== true}
                      onClick={() => void recover(true)}
                      type="button"
                    >
                      Resume checkout
                    </button>
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                      <button
                        className={secondaryActionClass}
                        disabled={isBusy || available !== true}
                        onClick={() => void recover()}
                        type="button"
                      >
                        Check payment status
                      </button>
                      <button
                        className={secondaryActionClass}
                        disabled={isBusy || available !== true}
                        onClick={() => void editPrebooking()}
                        type="button"
                      >
                        Edit pre-booking
                      </button>
                      <a
                        className={secondaryActionClass}
                        href={`mailto:${supportEmail}?subject=AIRA%20pre-booking%20help`}
                      >
                        Need help with your payment?
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submit} className="mt-7" aria-busy={isBusy}>
                    <fieldset disabled={isBusy} className="space-y-5">
                      <div>
                        <label htmlFor="prebook-name" className="mb-2 block text-sm font-medium">
                          Name
                        </label>
                        <input
                          className={fieldClass}
                          id="prebook-name"
                          name="name"
                          defaultValue={editing ? draft?.name : ""}
                          type="text"
                          autoComplete="name"
                          required
                          minLength={2}
                          maxLength={120}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="prebook-email" className="mb-2 block text-sm font-medium">
                          Email
                        </label>
                        <input
                          className={fieldClass}
                          id="prebook-email"
                          name="email"
                          defaultValue={editing ? draft?.email : ""}
                          type="email"
                          autoComplete="email"
                          required
                          maxLength={254}
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="prebook-country" className="mb-2 block text-sm font-medium">
                          Country
                        </label>
                        <input
                          className={`${fieldClass} text-muted-foreground`}
                          id="prebook-country"
                          name="country"
                          type="text"
                          value="India"
                          readOnly
                        />
                      </div>
                      <fieldset>
                        <legend className="mb-3 text-sm font-medium">
                          What would you use AIRA for?
                        </legend>
                        <div className="space-y-3">
                          {prebookUsageOptions.map((option) => (
                            <label
                              key={option}
                              className="aira-prebook-use-case flex cursor-pointer items-center gap-3 text-sm text-muted-foreground"
                            >
                              <input
                                type="checkbox"
                                name="usage"
                                value={option}
                                defaultChecked={editing && Boolean(draft?.usage.includes(option))}
                                className="h-4 w-4 shrink-0 accent-primary"
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
                        <input
                          type="checkbox"
                          name="consent"
                          required
                          className="mt-1 h-4 w-4 shrink-0 accent-primary"
                        />
                        <span>
                          I’m in India and agree to AIRA’s{" "}
                          <Link to="/privacy" className="underline">
                            Privacy &amp; Terms
                          </Link>{" "}
                          and the deposit terms above. I consent to processing my details and
                          receiving pre-booking communications and monthly updates.
                        </span>
                      </label>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        The ₹99 deposit is fully refundable and does not complete a device purchase.
                        To request a refund,{" "}
                        <a
                          href={`mailto:${supportEmail}?subject=AIRA%20pre-booking%20refund`}
                          className="underline"
                        >
                          contact AIRA
                        </a>{" "}
                        with your ticket ID.
                      </p>
                      <button
                        type="submit"
                        disabled={isBusy || available !== true}
                        className={buttonClass}
                      >
                        {available === false
                          ? "Payments temporarily unavailable"
                          : isBusy
                            ? "Preparing checkout…"
                            : editing
                              ? "Save & continue to payment"
                              : "Pre-book for ₹99"}
                      </button>
                    </fieldset>
                  </form>
                )}
                {available === false && (
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Payments are temporarily unavailable. Please try again later or contact AIRA.
                  </p>
                )}
              </>
            )}
            {isBusy && (
              <p role="status" className="mt-5 text-center text-sm text-primary">
                {phase === "verifying"
                  ? "Confirming your payment and ticket…"
                  : "Checking your pre-booking…"}
              </p>
            )}
            {error && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-border bg-secondary/30 p-4 text-sm leading-relaxed"
              >
                {error}
              </p>
            )}
            {available !== true && !isBusy && (
              <button
                className="mt-3 text-sm underline"
                type="button"
                onClick={() => void openForm()}
              >
                Retry connection
              </button>
            )}
            <p className="mt-5 text-center text-[11px] text-muted-foreground">
              Secure payment via Razorpay · AIRA never stores card details
            </p>
          </div>
        </div>
      )}
    </>
  );
}
