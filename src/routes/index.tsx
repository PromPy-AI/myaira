import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import logo from "@/assets/aira-logo.png.asset.json";
import logoImg from "@/assets/logo.png";
import manAiraSenseImg from "@/assets/man-aira-sense.png";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AIRA" },
      {
        name: "description",
        content:
          "AIRA is a wearable that learns from your life, your health, your voice, your stories, and the moments that matter.",
      },
      { property: "og:title", content: "AIRA" },
      {
        property: "og:description",
        content: "A wearable that learns from your life, monitors your health, preserves what matters, and helps your legacy live on.",
      },
      {
        property: "og:image",
        content: `https://useaira.netlify.app/assets/man-aira-sense-BQjR8dKc.png`,
      },
      {
        name: "twitter:image",
        content: `https://useaira.netlify.app/assets/man-aira-sense-BQjR8dKc.png`,
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
    label: "LIVE",
    title: "Understand yourself today.",
    body: "Health and wellness insights designed to help you understand your body, activity, sleep, stress, and everyday patterns.",
  },
  {
    index: "02",
    label: "REMEMBER",
    title: "Preserve what matters.",
    body: "AIRA builds a private, evolving memory of the moments, conversations, stories, and experiences you choose to keep.",
  },
  {
    index: "03",
    label: "LEGACY",
    title: "Leave something behind.",
    body: "Your memories can become part of a legacy you intentionally leave for the people who matter most.",
  },
];

const controls = [
  { state: "ACTIVE", action: "Remember" },
  { state: "MUTE", action: "Pause" },
  { state: "BLOCK", action: "Don't remember" },
];

const products = ["AIRA Loop (wristband)", "AIRA Sense", "AIRA Life"];


const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSe3beJyYrFt3ZAhtMRYrLtnU-_YdqdC5DV45e6wF7OZqyIDew/formResponse";
const GOOGLE_FORM_EMAIL_ENTRY = "entry.1695628208";

function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "done">("idle");

  return (
    <>
      <iframe name="aira-waitlist-sink" title="hidden" className="hidden" aria-hidden />
      <form
        action="https://docs.google.com/forms/d/e/1FAIpQLSe3beJyYrFt3ZAhtMRYrLtnU-_YdqdC5DV45e6wF7OZqyIDew/formResponse"
        method="POST"
        target="aira-waitlist-sink"
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          const form = e.currentTarget;
          setStatus("done");
          setTimeout(() => form.reset(), 500);
        }}
        className="mt-12 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
        aria-label="Early access signup"
      >
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="entry.1695628208"
          type="email"
          required
          placeholder="Enter your email"
          className="w-full flex-1 border border-border bg-transparent px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-none border border-primary bg-primary px-7 py-4 text-sm tracking-[0.14em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-transparent hover:text-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
        >
          Join Early Access
        </button>
        <p aria-live="polite" className="sr-only">
          {status === "done" ? "Thank you, you are on the list." : ""}
        </p>
        {status === "done" && (
          <span className="self-center text-sm text-muted-foreground">You're on the list.</span>
        )}
      </form>
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
          <div
            aria-hidden
            className="pointer-events-none absolute -top-[18%] -right-[22%] h-[78vmax] w-[78vmax] rounded-full opacity-[0.14]"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.95 0.03 88) 0%, transparent 72%)",
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
              AIRA is a wearable that learns from your life, monitors your health, preserves
              what matters, and helps your legacy live on.
            </p>

          </div>
        </section>

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
              <figure className="relative overflow-hidden rounded-2xl bg-deep">
                <img
                  src={manAiraSenseImg}
                  alt="A person wearing AIRA, eyes closed, in low light"
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full rounded-2xl object-cover select-none"
                  style={{
                    maskImage:
                      "radial-gradient(120% 120% at 50% 50%, #000 62%, transparent 100%)",
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
          <div className={`${shell} grid gap-16 border-t border-border pt-16 sm:grid-cols-3 sm:gap-10`}>
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
            <p className="text-xs tracking-[0.3em] text-[oklch(0.95_0.015_88)]/55 uppercase">
              Private by design
            </p>
            <h2 className="mt-10 max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
              Your life. Your data. Your decision.
            </h2>
            <p className="mt-10 max-w-[56ch] text-base leading-relaxed text-[oklch(0.95_0.015_88)]/65">
              AIRA is designed around control. Pause it. Mute it. Block it. Delete what you
              don't want remembered. Decide what stays, what goes, and who can access your
              legacy.
            </p>
            <ControlToggle />

          </div>
        </section>

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
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div
          className={`${shell} flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between`}
        >
          <span className="text-sm tracking-[0.42em] uppercase">AIRA</span>
          <nav className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy & Terms
            </a>
             <a href="use-cases" className="transition-colors hover:text-foreground">
              Use Case
            </a>
            <Link
            to="/" hash="early-access">
              Contact
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">© 2026 AIRA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
