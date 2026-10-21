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
import gmailIcon from "@/assets/google-gmail.svg";
import calendarIcon from "@/assets/google-calendar.svg";
import meetIcon from "@/assets/google-meet.svg";
import tasksIcon from "@/assets/google-tasks.webp";
import {
  Activity,
  AudioLines,
  Battery,
  Globe2,
  ShieldCheck,
} from "lucide-react";

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
      { property: "og:url", content: "https://myaira.life/" },
    ],
    links: [{ rel: "canonical", href: "https://myaira.life/" }],
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
              <figure className="relative flex items-center justify-center rounded-2xl">
                <img
                  src={loopstackimages}
                  alt="AIRA Loop wristband product concepts in three finishes"
                  loading="lazy"
                  draggable={false}
                  className="h-auto max-h-[520px] w-full rounded-2xl object-contain select-none"
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
                  alt="AIRA Loop wristband"
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

        <section className="aira-specs" aria-label="AIRA Loop features">
          <div className={shell}>
            <div className="aira-specs-grid">
              <article className="aira-spec-card aira-spec-premium">
                <h3>Premium body frame</h3>
                <p>Thoughtfully crafted for everyday wear.</p>
              </article>
              <article className="aira-spec-card aira-spec-light">
                <svg viewBox="34 28 173 184" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="m53.76 206.48c-5.44-1.57-10-4.26-13.16-8.92a4.45 4.45 0 0 1 -.12-5.45c14.67-23.84 34.14-42.57 58.87-55.77 10.59-5.65 21.28-11.11 31.76-17 12.89-7.15 24.39-16.21 32.89-28.51 3.16-4.58 5.72-9.57 8.54-14.38a3 3 0 0 0 .38-1.65 5.94 5.94 0 0 0 -.55.67c-8.78 14.89-21.49 25.44-37 32.65-10.93 5.08-22.13 9.57-33.21 14.33-16.09 6.91-31.07 15.55-43.75 27.88a8.45 8.45 0 0 1 -.83.63c-4.24-8.7-6.36-17.79-5.3-27.32 2.66-24 15.5-40.45 37.4-50.15 11.45-5.07 23.51-8.07 35.68-10.75 7.45-1.64 14.94-3.18 22.3-5.17 17.85-4.82 25.54-9.66 38.07-23.4a3.57 3.57 0 0 1 .58.67c18.2 34.77 19.41 69.78.51 104.58-12.59 23.19-32.87 36.11-58.58 40.84-13.52 2.49-27 2.4-40.15-2-4.12-1.36-8-3.33-12.31-5.12-9.78 9.22-15.84 21.26-22.02 33.34z" fill="#a3c48a" />
                </svg>
                <h3>Lightweight</h3>
                <p>Comfortable from morning to night.</p>
              </article>
              <article className="aira-spec-card aira-spec-battery">
                <Battery aria-hidden="true" />
                <h3>3-day battery life</h3>
                <p>More of your day, between charges.</p>
              </article>
              <figure className="aira-spec-product">
                <img
                  src={AiraloopImg}
                  alt="AIRA Loop screenless AI wristband"
                  loading="lazy"
                  draggable={false}
                />
              </figure>
              <article className="aira-spec-card aira-spec-mics">
                <AudioLines aria-hidden="true" />
                <h3>Two microphones</h3>
                <p>Whisper when you need to.</p>
              </article>
              <article className="aira-spec-card aira-spec-languages">
                <Globe2 aria-hidden="true" />
                <h3>100+ languages</h3>
                <p>Speak in the language that feels like you.</p>
              </article>
              <article className="aira-spec-card aira-spec-privacy">
                <ShieldCheck aria-hidden="true" />
                <h3>One-switch privacy control</h3>
                <div className="aira-spec-control" aria-label="Active, mute, or block recording">
                  <span>Active</span>
                  <span>Mute</span>
                  <span>Block</span>
                </div>
              </article>
              <article className="aira-spec-card aira-spec-app">
                <img
                  src="https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public/aira-blob-nobg.png"
                  alt=""
                  loading="lazy"
                  draggable={false}
                />
                <div>
                  <h3>Your agentic companion app</h3>
                  <p>Your day, connected and understood.</p>
                </div>
              </article>
              <article className="aira-spec-card aira-spec-health">
                <Activity aria-hidden="true" />
                <div>
                  <h3>Monitor your health metrics</h3>
                  <p>Understand sleep, activity, recovery and stress.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Everyday app connections */}
        <section className="aira-integrations" aria-labelledby="integrations-title">
          <div className={`${shell} aira-integrations-grid`}>
            <div className="aira-integrations-copy">
              <p className="aira-integrations-eyebrow">AIRA, together with your day</p>
              <h2 id="integrations-title">Works with the apps you use daily.</h2>
              <p>
                Bring your Mail, Calendar, Meet and Notion into one place. Connect the tools you
                already use in the AIRA companion app, then let AIRA help you keep up with what
                matters.
              </p>
              <div className="aira-integration-logos" aria-label="Mail, Calendar, Meet and Notion">
                <span className="aira-integration-app"><img src={gmailIcon} alt="" />Mail</span>
                <span className="aira-integration-app"><img src={calendarIcon} alt="" />Calendar</span>
                <span className="aira-integration-app"><img src={meetIcon} alt="" />Meet</span>
                <span className="aira-integration-app"><span className="aira-notion-mark" aria-hidden="true">N</span>Notion</span>
                <span className="aira-integration-app"><img src={tasksIcon} alt="" />Google Tasks</span>
              </div>
              <p className="aira-integrations-note">Connect in the AIRA companion app</p>
            </div>
            <div className="aira-activity-card" aria-label="Example of AIRA organizing your day">
              <div className="aira-activity-heading"><span />What AIRA helped with today</div>
              <div className="aira-activity-row">
                <span className="aira-activity-icon aira-notion-mark">N</span>
                <span className="aira-activity-status">Saved</span>
                <span className="aira-activity-text">the meeting notes</span>
                <span className="aira-activity-check" aria-hidden="true">✓</span>
              </div>
              <div className="aira-activity-row">
                <span className="aira-activity-icon"><img src={calendarIcon} alt="" /></span>
                <span className="aira-activity-status">Planned</span>
                <span className="aira-activity-text">your day around what's next</span>
                <span className="aira-activity-check" aria-hidden="true">✓</span>
              </div>
              <div className="aira-activity-row">
                <span className="aira-activity-icon"><img src={gmailIcon} alt="" /></span>
                <span className="aira-activity-status">Drafted</span>
                <span className="aira-activity-text">a follow-up after your call</span>
                <span className="aira-activity-check" aria-hidden="true">✓</span>
              </div>
              <div className="aira-activity-row">
                <span className="aira-activity-icon"><img src={meetIcon} alt="" /></span>
                <span className="aira-activity-status">Scheduled</span>
                <span className="aira-activity-text">Meet with Alex · 11:00 AM</span>
                <span className="aira-activity-check" aria-hidden="true">✓</span>
              </div>
              <div className="aira-activity-row">
                <span className="aira-activity-icon"><img src={tasksIcon} alt="" /></span>
                <span className="aira-activity-status">Added</span>
                <span className="aira-activity-text">follow up on your action items</span>
                <span className="aira-activity-check" aria-hidden="true">✓</span>
              </div>
            </div>
          </div>
        </section>

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
            <PreBookingForm />
            <WaitlistForm />
          </div>
        </section>
      </main>

      <AiraFooter />
    </div>
  );
}
