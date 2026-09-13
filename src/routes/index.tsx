import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import {
  GOOGLE_FORM_ACTION,
  GOOGLE_FORM_EMAIL_ENTRY,
  PREBOOK_FORM_ACTION,
  PREBOOK_ENTRY,
  PREBOOK_DEVICE,
  PREBOOK_CONSENT_VALUE,
  prebookUsageOptions,
  signupSchema,
} from "@/lib/google-form-config";
import { submitSignup } from "@/lib/submit-signup";
import { LoopFeatures } from "@/components/LoopFeatures";
import logoImg from "@/assets/logo.png";
import loopstackimages from "@/assets/loop-stack-image.png";
import AiraloopImg from "@/assets/aira-loop-nobg.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AIRA" },
      {
        name: "google-site-verification",
        content: "g3ztuAaXUBq989dq0wlM74iRlSIlnTWUZ1peokfFEWs",
      },
      {
        name: "description",
        content:
          "Meet AIRA Loop, a screenless AI wristband designed to help you recall conversations, track your health and understand your daily patterns.",
      },
      { property: "og:title", content: "AIRA" },
      {
        property: "og:description",
        content:
          "Your AI second brain and health companion. AIRA Loop brings conversation memory, wellness insights and a personal AI together in one screenless wristband.",
      },
      {
        property: "og:image",
        content: `https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public/man-aira-loop.png`,
      },
      {
        name: "twitter:image",
        content: `https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public/man-aira-loop.png`,
      },
      { property: "og:url", content: "https://useaira.netlify.app/" },
    ],
    links: [{ rel: "canonical", href: "https://useaira.netlify.app/" }],
  }),
});

const shell = "mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16";

const ideas = [
  {
    index: "01",
    label: "REMEMBER",
    title: "Your everyday second brain.",
    body: "Stay present in the conversation. AIRA turns what you capture into searchable memories, clear summaries and commitments you can come back to. Ask your AI when you need a detail.",
  },
  {
    index: "02",
    label: "UNDERSTAND",
    title: "Your health, in perspective.",
    body: "Explore your sleep, activity, recovery and stress-related signals. A daily health summary helps you see your personal baseline and understand what changed today.",
  },
  {
    index: "03",
    label: "CONNECT",
    title: "See your day as a whole.",
    body: "Bring your conversations and health patterns into one personal AI. Explore connections across your routines and wellness, recall what matters, and follow through on your day.",
  },
];

const controls = [
  { state: "ACTIVE", action: "Remember" },
  { state: "MUTE", action: "Pause" },
  { state: "BLOCK", action: "Don't remember" },
];

const products = ["AIRA Loop", "Screenless wristband + companion app"];

type SubmissionStatus = "idle" | "submitting" | "done" | "error";
const submissionError =
  "We couldn't confirm your submission. Please check your connection before trying again. Your details have been kept.";

function WaitlistForm() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState("");
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const parsed = signupSchema.safeParse({
      kind: "waitlist",
      email: new FormData(form).get(GOOGLE_FORM_EMAIL_ENTRY),
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

  return (
    <>
      <form
        action={GOOGLE_FORM_ACTION}
        method="POST"
        onSubmit={handleSubmit}
        aria-busy={status === "submitting"}
        className="mt-12 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
        aria-label="Early access signup"
      >
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name={GOOGLE_FORM_EMAIL_ENTRY}
          type="email"
          required
          placeholder="Enter your email"
          className="w-full flex-1 border border-border bg-transparent px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="cursor-pointer rounded-none border border-primary bg-primary px-7 py-4 text-sm tracking-[0.14em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-transparent hover:text-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
        >
          {status === "submitting" ? "Submitting…" : "Join Waitlist"}
        </button>
        <p aria-live="polite" className="sr-only">
          {status === "done" ? "Thank you, you are on the list." : ""}
        </p>
        {status === "done" && (
          <span className="self-center text-sm text-muted-foreground">You're on the list.</span>
        )}
      </form>
      {status === "error" && (
        <p role="alert" className="mt-3 max-w-xl text-sm text-destructive">
          {error}
        </p>
      )}
    </>
  );
}

const prebookDeviceOptions = [
  {
    value: PREBOOK_DEVICE,
    label: "AIRA Loop",
    caption: "Wrist band",
    image: AiraloopImg,
  },
];

const earlyAccessPrices = {
  USD: { early: 250, regular: 300, locale: "en-US" },
  INR: { early: 23500, regular: 28500, locale: "en-IN" },
} as const;

function PreBookingForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const modalContent = useRef<HTMLDivElement>(null);
  const [currency, setCurrency] = useState<keyof typeof earlyAccessPrices>("USD");
  const price = earlyAccessPrices[currency];
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat(price.locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
      consent: fields.get(PREBOOK_ENTRY.consent),
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

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setStatus("idle");
          setError("");
          setOpen(true);
        }}
        className="mt-6 inline-block cursor-pointer rounded-none border border-primary bg-secondary px-7 py-4 text-sm tracking-[0.14em] text-primary uppercase transition-colors duration-300 hover:bg-transparent hover:text-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
      >
        Reserve Early Access
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Early access and free pre-booking"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              if (!submitting.current) setOpen(false);
            }}
            aria-hidden
          />
          <div
            ref={modalContent}
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto border border-border bg-background p-8 shadow-2xl sm:p-10"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              disabled={status === "submitting"}
              className="absolute top-5 right-5 cursor-pointer text-2xl leading-none text-muted-foreground transition-colors hover:text-foreground"
            >
              &times;
            </button>

            {status === "done" ? (
              <div role="status" className="py-8 text-center">
                <h3 className="text-2xl tracking-[-0.02em]">You're on the list.</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  You're among the first to join the AIRA community. Early access will be offered to
                  the first 500 selected members in this batch. If your early access is confirmed,
                  we'll reach out to you directly via email.
                </p>
                <p className="mt-6 text-xs tracking-[0.24em] text-muted-foreground uppercase">
                  Batch #01
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-8 inline-block cursor-pointer border border-primary bg-primary px-7 py-3 text-sm tracking-[0.14em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-transparent hover:text-primary"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl tracking-[-0.02em]">Reserve your AIRA.</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Join early access and pre-book for free.
                </p>
                <form
                  action={PREBOOK_FORM_ACTION}
                  method="POST"
                  onSubmit={handleSubmit}
                  aria-busy={status === "submitting"}
                  className="mt-8 flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="prebook-name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="prebook-name"
                      name={PREBOOK_ENTRY.name}
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full border border-border bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="prebook-email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="prebook-email"
                      name={PREBOOK_ENTRY.email}
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full border border-border bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="prebook-country" className="text-sm font-medium">
                      Country
                    </label>
                    <input
                      id="prebook-country"
                      name={PREBOOK_ENTRY.country}
                      type="text"
                      required
                      placeholder="Your country"
                      className="w-full border border-border bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>

                  <fieldset className="flex flex-col gap-3">
                    <legend className="mb-1 text-sm font-medium">
                      What would you use AIRA for?
                    </legend>
                    {prebookUsageOptions.map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground"
                      >
                        <input
                          type="checkbox"
                          name={PREBOOK_ENTRY.usage}
                          value={option}
                          className="h-4 w-4 shrink-0 accent-primary"
                        />
                        {option}
                      </label>
                    ))}
                  </fieldset>

                  <fieldset className="flex flex-col gap-3">
                    <legend className="mb-1 text-sm font-medium">Your device</legend>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label htmlFor="prebook-currency" className="text-xs text-muted-foreground">
                        Select payment currency
                      </label>
                      <select
                        id="prebook-currency"
                        value={currency}
                        onChange={(event) =>
                          setCurrency(event.target.value === "INR" ? "INR" : "USD")
                        }
                        className="cursor-pointer rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {prebookDeviceOptions.map((option) => (
                        <label
                          key={option.value}
                          className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-ring has-[:checked]:border-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2"
                        >
                          <input
                            type="radio"
                            name={PREBOOK_ENTRY.device}
                            value={option.value}
                            defaultChecked
                            required
                            className="peer sr-only"
                          />
                          <span className="relative block w-full bg-deep px-5 pt-12 pb-4">
                            <span className="absolute top-4 left-4 text-[0.6rem] tracking-[0.18em] text-champagne uppercase">
                              Early access
                            </span>
                            <span className="absolute top-3 right-3 rounded-full border border-emerald-300/25 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                              Save {formatPrice(price.regular - price.early)}
                            </span>
                            <img
                              src={option.image}
                              alt={option.label}
                              loading="lazy"
                              draggable={false}
                              className="mx-auto h-40 w-full select-none object-contain [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]"
                            />
                          </span>
                          <span className="flex flex-col gap-4 p-5">
                            <span className="flex flex-wrap items-end justify-between gap-4">
                              <span>
                                <span className="block text-base font-medium text-foreground">
                                  {option.label}
                                </span>
                                <span className="mt-1 block text-xs text-muted-foreground">
                                  {option.caption}
                                </span>
                              </span>
                              <span>
                                <span className="block text-xs text-muted-foreground">
                                  Starts at
                                </span>
                                <span
                                  className="mt-1 flex flex-wrap items-baseline gap-2"
                                  aria-live="polite"
                                  aria-atomic="true"
                                >
                                  <span className="text-3xl font-medium tracking-[-0.04em] text-primary">
                                    {formatPrice(price.early)}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    <span className="sr-only">Regular price </span>
                                    <s>{formatPrice(price.regular)}</s>
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                              2-month free subscription trial for pre-booking users.
                              <span className="mt-2 block font-medium text-primary">
                                Free reservation. No payment today.
                              </span>
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
                    <input
                      type="checkbox"
                      name={PREBOOK_ENTRY.consent}
                      value={PREBOOK_CONSENT_VALUE}
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                    />
                    <span>
                      I agree to AIRA&rsquo;s{" "}
                      <Link
                        to="/privacy"
                        className="underline underline-offset-2 transition-colors hover:text-foreground"
                      >
                        Privacy &amp; Terms
                      </Link>
                      , consent to the processing of my personal information, and agree to receive
                      communications from AIRA via email.
                    </span>
                  </label>

                  {status === "error" && (
                    <p role="alert" className="text-sm leading-relaxed text-destructive">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-2 cursor-pointer border border-primary bg-primary px-7 py-4 text-sm tracking-[0.14em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-transparent hover:text-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {status === "submitting" ? "Submitting…" : "Submit"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ControlToggle() {
  const [active, setActive] = useState<string>(controls[0]!.state);
  const current = controls.find((c) => c.state === active) ?? controls[0]!;

  return (
    <div className="mt-16">
      <div
        role="radiogroup"
        aria-label="Memory control"
        className="inline-flex items-center gap-px border border-[oklch(0.95_0.015_88)]/15 p-1"
      >
        {controls.map((c) => {
          const isOn = c.state === active;
          return (
            <button
              key={c.state}
              type="button"
              role="radio"
              aria-checked={isOn}
              onClick={() => setActive(c.state)}
              className={`px-6 py-3 text-[0.68rem] tracking-[0.28em] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne ${
                isOn
                  ? "bg-champagne text-deep"
                  : "text-[oklch(0.95_0.015_88)]/55 hover:text-[oklch(0.95_0.015_88)]"
              }`}
            >
              {c.state}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-5 text-sm text-[oklch(0.95_0.015_88)]/70">
        {current.action}
      </p>
      <p className="mt-10 text-[0.62rem] tracking-[0.24em] text-[oklch(0.95_0.015_88)]/40 uppercase">
        {products.join("  ·  ")}
      </p>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className={`${shell} flex items-center justify-between py-8`}>
          <a href="?ref=src-nav" className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="AIRA logo"
              width={28}
              height={28}
              draggable={false}
              className="h-7 w-7 shrink-0 select-none object-contain"
            />
            <span className="text-sm leading-none tracking-[0.42em] text-[oklch(0.95_0.02_88)] uppercase">
              AIRA
            </span>
          </a>
          <a
            href="#early-access"
            className="text-xs tracking-[0.22em] text-[oklch(0.95_0.02_88)]/70 uppercase transition-colors duration-300 hover:text-[oklch(0.95_0.02_88)]"
          >
            Join Waitlist
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="surface-hero surface-grain relative flex min-h-[100svh] items-end overflow-hidden">
          {/* Pre-seed story floating pill */}
          <div className="absolute inset-x-0 top-24 z-10 flex justify-center">
            <a
              href="?src=pre-seed-badge"
              className="inline-flex items-center gap-2 border border-[oklch(0.95_0.03_88)]/25 bg-[oklch(0.95_0.03_88)]/8 px-4 py-2 text-[0.68rem] tracking-[0.22em] text-[oklch(0.95_0.015_88)]/80 uppercase backdrop-blur-sm transition-colors duration-300 hover:border-[oklch(0.95_0.03_88)]/50 hover:text-[oklch(0.95_0.015_88)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.06_88)] opacity-80" />
              Our Pre-seed
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-[18%] -right-[22%] h-[78vmax] w-[78vmax] rounded-full opacity-[0.14]"
            style={{
              background: "radial-gradient(closest-side, oklch(0.95 0.03 88) 0%, transparent 72%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[46%] left-[8%] h-[86vmax] w-[86vmax] rounded-[50%] border border-[oklch(0.95_0.03_88)]/12"
          />
          <div className={`${shell} relative z-10 pt-40 pb-24 sm:pb-32`}>
            <h1 className="reveal max-w-[16ch] text-[clamp(2.9rem,9vw,7.5rem)] leading-[0.94] font-normal tracking-[-0.035em] text-[oklch(0.97_0.015_88)]">
              Remember what makes you, you.
            </h1>
            <p
              className="reveal mt-10 max-w-[46ch] text-base leading-relaxed text-[oklch(0.97_0.015_88)]/72 sm:text-lg"
              style={{ animationDelay: "220ms" }}
            >
              AIRA Loop is a screenless AI wristband designed to help you remember everyday
              conversations, track your health and ask questions about your day.
            </p>
          </div>
        </section>

        {/* Feature marquee */}
        <div className="overflow-hidden border-y border-border bg-background py-4">
          <div className="animate-marquee flex w-max gap-0">
            {[0, 1].map((i) => (
              <div key={i} className="flex shrink-0 items-center" aria-hidden={i === 1}>
                {[
                  "Personal AI Assistant",
                  "Meetings & Summarisation",
                  "Voice Capture",
                  "AI Second Brain",
                  "Health & Wellness",
                  "Daily Health Summary",
                  "Tasks & Commitments",
                  "Everyday Conversations",
                  "Personal Timeline",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-6 px-6">
                    <span className="text-xs tracking-[0.22em] text-muted-foreground uppercase whitespace-nowrap">
                      {item}
                    </span>
                    <span className="h-px w-8 bg-border" aria-hidden />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* The idea */}
        <section className="py-32 sm:py-48">
          <div className={shell}>
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              A life, remembered.
            </p>
            <div className="mt-12 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <h2 className="max-w-[20ch] text-[clamp(2rem,5.4vw,4.25rem)] leading-[1.02] tracking-[-0.03em]">
                  The longer you wear it, the more of you it remembers.
                </h2>
                <p className="mt-10 max-w-[54ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                  AIRA quietly builds a private understanding of your life over time, from the
                  conversations you choose to preserve to the moments, experiences, and patterns
                  that make you uniquely you.
                </p>
                <p className="mt-6 text-xs tracking-[0.24em] text-muted-foreground uppercase">
                  The AI You. Built from your life.
                </p>
              </div>
              <figure className="relative overflow-hidden rounded-2xl">
                <img
                  src={loopstackimages}
                  alt="AIRA Loop wristband product concepts in three finishes"
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full rounded-2xl object-cover select-none"
                  style={{
                    maskImage: "radial-gradient(120% 120% at 50% 50%, #000 62%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(120% 120% at 50% 50%, #000 62%, transparent 100%)",
                  }}
                />
              </figure>
            </div>
          </div>
        </section>

        {/* Three ideas */}
        <section className="pb-32 sm:pb-48">
          <div
            className={`${shell} grid gap-16 border-t border-border pt-16 sm:grid-cols-3 sm:gap-10`}
          >
            {ideas.map((idea) => (
              <article key={idea.index} className="max-w-[34ch]">
                <p className="text-xs tracking-[0.28em] text-muted-foreground uppercase">
                  {idea.index} {idea.label}
                </p>
                <h3 className="mt-6 text-2xl leading-snug tracking-[-0.02em]">{idea.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{idea.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section className="bg-deep text-[oklch(0.95_0.015_88)]">
          <div className={`${shell} py-28 sm:py-40`}>
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="text-xs tracking-[0.3em] text-[oklch(0.95_0.015_88)]/55 uppercase">
                  Private by design
                </p>
                <h2 className="mt-10 max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
                  Your life. Your data. Your decision.
                </h2>
                <p className="mt-10 max-w-[56ch] text-base leading-relaxed text-[oklch(0.95_0.015_88)]/65">
                  AIRA is designed around control. Pause it. Mute it. Block it. Delete what you
                  don't want remembered. You decide which conversations and memories become part of
                  your second brain.
                </p>
                <ControlToggle />
              </div>
              <figure className="relative overflow-hidden rounded-2xl lg:order-first">
                <img
                  src={AiraloopImg}
                  alt="Aira loop demo device"
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full rounded-2xl object-cover opacity-[0.2] select-none"
                  style={{
                    maskImage: "radial-gradient(120% 120% at 50% 50%, #000 62%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(120% 120% at 50% 50%, #000 62%, transparent 100%)",
                  }}
                />
              </figure>
            </div>
          </div>
        </section>

        <LoopFeatures />

        {/* Final CTA */}
        <section id="early-access" className="py-32 sm:py-48">
          <div className={shell}>
            <h2 className="max-w-[16ch] text-[clamp(2rem,5.4vw,4.25rem)] leading-[1.02] tracking-[-0.03em]">
              Something worth remembering is coming.
            </h2>
            <p className="mt-8 max-w-[44ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              Join the early access list and be among the first to experience AIRA.
            </p>
            <WaitlistForm />
            <PreBookingForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div
          className={`${shell} flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between`}
        >
          <span className="text-sm tracking-[0.42em] uppercase">AIRA</span>
          <nav className="flex gap-8 text-sm text-muted-foreground">
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy & Terms
            </Link>
            <a href="use-cases" className="transition-colors hover:text-foreground">
              Use Cases
            </a>
            <Link to="/" hash="early-access">
              Contact
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">© 2026 AIRA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
