import { AiraFooter } from "@/components/ui/aira-footer";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  GOOGLE_FORM_ACTION,
  GOOGLE_FORM_EMAIL_ENTRY,
  signupSchema,
} from "@/lib/google-form-config";
import { submitSignup } from "@/lib/submit-signup";
import { PreBookingForm } from "@/components/PreBookingForm";
import { LoopFeatures } from "@/components/LoopFeatures";
import { LoopExperienceCarousel } from "@/components/LoopExperienceCarousel";
import logoImg from "@/assets/logo.png";
import loopstackimages from "@/assets/loop-stack-image.png";
import AiraloopImg from "@/assets/aira-loop-nobg.png";
import { AgentIconStack } from "@/components/ui/agent-icon-stack";

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

const shell = "mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16";

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
  const heroImage = useRef<HTMLImageElement>(null);
  const [heroImageReady, setHeroImageReady] = useState(false);

  useEffect(() => {
    // Cached images can finish loading before React attaches the load handler.
    if (heroImage.current?.complete && heroImage.current.naturalWidth > 0) {
      setHeroImageReady(true);
    }
  }, []);

  return (
    <div className="aira-site aira-home min-h-screen bg-background">
      <header className="aira-header">
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
          <nav aria-label="Main navigation" className="flex items-center gap-5 sm:gap-8">
            <a
              href="#early-access"
              className="text-xs tracking-[0.12em] text-[oklch(0.95_0.02_88)]/70 uppercase transition-colors duration-300 hover:text-[oklch(0.95_0.02_88)]"
            >
              Join Waitlist
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="aira-hero">
          {/* Pre-seed story floating pill */}
          <div className="aira-hero-badge">
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
          <div className="aira-hero-copy">
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
            <div className="aira-hero-actions">
              <a
                href="#early-access"
                className="aira-button"
                onClick={(event) => {
                  const trigger = document.getElementById("early-prebooking-trigger");
                  if (trigger) {
                    event.preventDefault();
                    trigger.click();
                  }
                }}
              >
                Early pre-booking <span aria-hidden="true">↗</span>
              </a>
              <a href="#loop-features" className="aira-text-link">
                Explore AIRA Loop <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <figure className="aira-hero-visual">
            <img
              ref={heroImage}
              data-ready={heroImageReady}
              src="https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public/aira-hand-loop-hero.png"
              alt="AIRA Loop worn on a wrist"
              fetchPriority="high"
              draggable={false}
              decoding="async"
              onLoad={() => setHeroImageReady(true)}
              onError={(event) => {
                setHeroImageReady(false);
                event.currentTarget.onerror = null;
                if (!event.currentTarget.src.endsWith(AiraloopImg))
                  event.currentTarget.src = AiraloopImg;
              }}
            />
          </figure>
        </section>

        {/* Feature marquee */}
        <div className="aira-marquee overflow-hidden border-y border-border bg-background py-4">
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
        <section className="aira-story py-32 sm:py-48">
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
        <section className="aira-pillars pb-32 sm:pb-48">
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
        <section className="aira-privacy bg-deep text-[oklch(0.95_0.015_88)]">
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

        <div className={`${shell} aira-agent-statement`}>
          <p>
            <span className="aira-agent-name">
              AIRA
              <img
                src="https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public/aira-blog-agent.png"
                alt=""
                width={64}
                draggable={false}
                height={64}
                loading="lazy"
                className="aira-agent-avatar"
              />
            </span>
            , your AI second brain{" "}
            <span className="aira-agent-action">
              that gets <AgentIconStack /> done
            </span>
          </p>
        </div>

        <LoopExperienceCarousel />

        <LoopFeatures />

        {/* Final CTA */}
        <section id="early-access" className="aira-access py-32 sm:py-48">
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

      <AiraFooter />
    </div>
  );
}
