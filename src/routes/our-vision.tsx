import { AiraFooter } from "@/components/ui/aira-footer";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  Brain,
  HeartPulse,
  Mic,
  Car,
  ShoppingBasket,
  type LucideIcon,
} from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import logoImg from "@/assets/logo.png";
import loopBandImg from "@/assets/aira-loop-nobg.png";

export const Route = createFileRoute("/our-vision")({
  component: OurVision,
  head: () => ({
    meta: [
      { title: "Our Vision At AIRA" },
      {
        name: "description",
        content:
          "Explore AIRA’s roadmap: from a personal AI memory and health companion to booking rides, ordering essentials and supporting everyday life through voice.",
      },
      { property: "og:title", content: "Our Vision At AIRA" },
      {
        property: "og:description",
        content:
          "Your memory. Your health. Your day, made simpler. Explore the AIRA roadmap through early 2028.",
      },
    ],
    links: [{ rel: "canonical", href: "https://useaira.netlify.app/our-vision" }],
  }),
});

const shell = "mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16";

function AgenticVision() {
  return (
    <article className="aira-agentic-hero">
      <p className="aira-agentic-eyebrow">Our ambition</p>
      <h3 className="aira-agentic-title">
        <span className="aira-agentic-ranking">
          World’s <span className="aira-agentic-number">#1</span>
        </span>{" "}
        AI Agentic
        <br />
        <em>Human Intelligence.</em>
      </h3>
      <div className="aira-agentic-body">
        <div>
          <p className="aira-agentic-lead">
            The things you do online. An AI that can do them for you.
          </p>
          <p className="aira-agentic-description">
            We’re building a personal assistant that can work across the apps and services you use.
            Tell AIRA what you need, and let it take care of the steps—with you in control.
          </p>
          <ul className="aira-agentic-tasks">
            <li>Book rides, metro tickets, travel, stays and tables.</li>
            <li>Make calls, order food and groceries, and pay bills.</li>
            <li>Handle technical work, manage your calendar and organize your day.</li>
          </ul>
        </div>
        <div className="aira-agentic-routine">
          <p className="aira-agentic-eyebrow">A little less on your mind</p>
          <blockquote>
            “AIRA, book my ride at 9 every morning. And get the groceries on Sunday.”
          </blockquote>
          <p>Once, any day, or every day. Set the routine and let AIRA handle the details.</p>
        </div>
      </div>
      <p className="aira-agentic-note">
        Our early-2028 vision. Capabilities will roll out as connected services become available.
      </p>
    </article>
  );
}

function VoiceExample({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: string;
}) {
  return (
    <div className="aira-vision-example">
      <div className="mb-4 flex items-center gap-2 text-[0.65rem] tracking-[0.12em] text-muted-foreground uppercase">
        <Icon aria-hidden="true" className="h-4 w-4" />
        {label}
      </div>
      <p className="text-sm leading-relaxed text-forest">&ldquo;{children}&rdquo;</p>
    </div>
  );
}

const milestones = [
  {
    date: "Late 2026",
    label: "Build & validate",
    title: "A foundation built around you.",
    description:
      "Develop and test the physical Loop prototype alongside our MVP app. Bring conversation capture, personal memory and health sensing together.",
    points: [
      "Test comfort, battery life and recording controls.",
      "Validate conversation recall with early users.",
    ],
    visual: (
      <div className="flex flex-wrap gap-3">
        {[
          { icon: Mic, label: "Voice capture" },
          { icon: Brain, label: "Personal memory" },
          { icon: HeartPulse, label: "Health signals" },
        ].map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/5 px-4 py-2 text-xs text-forest"
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
            {label}
          </span>
        ))}
      </div>
    ),
  },
  {
    date: "Q1 2027",
    label: "Product development & testing",
    title: "Refine Loop, inside and out.",
    description:
      "Continue developing Loop’s hardware, firmware and companion app. Test how voice capture, personal memory and health sensing work together in everyday use.",
    points: [
      "Refine battery life, comfort and device reliability.",
      "Test sensor performance, recording controls and app connectivity.",
    ],
    visual: (
      <VoiceExample icon={Mic} label="Built for everyday use">
        One wristband. My conversations, my health and my personal AI.
      </VoiceExample>
    ),
  },
  {
    date: "Q2 2027",
    label: "Pilot & refine",
    title: "Make the everyday feel effortless.",
    description:
      "Pilot Loop with early users. Refine how AIRA captures conversations, recalls commitments and explains personal wellness patterns.",
    points: [
      "Improve recall quality through real-world feedback.",
      "Refine daily health summaries and personal baselines.",
    ],
    visual: (
      <VoiceExample icon={Brain} label="Personal memory">
        What did we agree on in yesterday’s conversation?
      </VoiceExample>
    ),
  },
  {
    date: "Mid 2027",
    label: "Initial launch",
    title: "Your second brain, on your wrist.",
    description:
      "Target our first 1,000 Loop units, available through our website to waitlist members and new customers. Bring memory and wellness into one personal AI.",
    points: [
      "Recall conversations, find commitments and follow through.",
      "Explore sleep, activity and stress-related patterns together.",
    ],
    visual: (
      <VoiceExample icon={HeartPulse} label="Your daily health summary">
        What changed in my sleep and activity this week?
      </VoiceExample>
    ),
  },
  {
    date: "Q4 2027",
    label: "Next-gen Loop development",
    title: "Say it once. Make it a routine.",
    description:
      "Build the next generation of Loop: a wearable that moves from understanding your day to helping you act on it. Develop voice-led routines for rides, groceries and the services you rely on.",
    points: [
      "Set your 9 AM ride once, for every workday.",
      "Schedule groceries for any day, or make them a weekly routine.",
    ],
    visual: (
      <div className="grid gap-3 sm:grid-cols-2">
        <VoiceExample icon={Car} label="Daily rides">
          Book me a ride to the office every day at 9 AM.
        </VoiceExample>
        <VoiceExample icon={ShoppingBasket} label="Recurring groceries">
          Have my usual groceries delivered every Sunday at 8 AM.
        </VoiceExample>
      </div>
    ),
  },
];

function OurVision() {
  return (
    <div className="aira-site aira-vision min-h-screen bg-background">
      <header className="aira-header border-b border-border">
        <div className={`${shell} flex flex-wrap items-center justify-between gap-5 py-7`}>
          <Link to="/" aria-label="AIRA home" className="flex items-center gap-3">
            <img src={logoImg} alt="" width={28} height={28} />
            <span className="text-sm tracking-[0.42em]">AIRA</span>
          </Link>
          <nav aria-label="Main navigation">
            <Link to="/" hash="early-access">
              Join Waitlist
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <section className={`${shell} aira-page-intro pt-20 pb-16 sm:pt-28 sm:pb-24`}>
          <p className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
            Our Vision · 2026 — 2028
          </p>
          <h1 className="mt-7 max-w-[15ch] text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.05em]">
            More time for living.
            <br />
            <span className="font-serif font-normal text-forest italic">That’s the vision.</span>
          </h1>
          <div className="mt-8 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <p className="max-w-[49ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              Remember the details. Understand your health. Take a few things off your plate. Here’s
              how we’re building AIRA, one step at a time.
            </p>
            <a
              href="#roadmap"
              className="inline-flex shrink-0 items-center gap-3 self-start border-b border-sage/50 pb-2 text-xs tracking-[0.12em] uppercase sm:self-auto"
            >
              Explore the roadmap <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-10 max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Our planned direction. Timing and availability will evolve with testing, service
            partnerships and regional support.
          </p>
        </section>
        <section
          id="roadmap"
          aria-label="Our planned milestones"
          className={`${shell} scroll-mt-10 pb-20 sm:pb-28`}
        >
          <Timeline
            data={[
              ...milestones.map((milestone) => ({
                title: milestone.date,
                content: (
                  <article
                    className={`rounded-2xl border border-border bg-card p-6 sm:p-9 ${milestone.date === "Q4 2027" ? "aira-nextgen" : ""}`}
                  >
                    {milestone.date === "Q4 2027" && (
                      <img
                        className="aira-nextgen-band"
                        src={loopBandImg}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        draggable={false}
                      />
                    )}
                    <p className="text-[0.6rem] tracking-[0.22em] text-sage uppercase">
                      {milestone.label}
                    </p>
                    <h3 className="mt-4 text-2xl leading-tight tracking-[-0.03em] sm:text-3xl">
                      {milestone.title}
                    </h3>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {milestone.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {milestone.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sage"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 border-t border-border pt-6">{milestone.visual}</div>
                  </article>
                ),
              })),
              { title: "Early 2028", featured: true, content: <AgenticVision /> },
            ]}
          />
        </section>
        <section className="bg-deep text-primary-foreground">
          <div className={`${shell} py-16 sm:py-24`}>
            <p className="text-[0.65rem] tracking-[0.25em] text-champagne uppercase">
              The ambition
            </p>
            <h2 className="mt-6 max-w-[22ch] text-3xl leading-tight tracking-[-0.03em] sm:text-5xl">
              Your day belongs to you.
              <br />
              <span className="font-serif italic">Let’s keep it that way.</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
              Just talk to AIRA. Remember a conversation, understand your health or plan the
              essentials. Our vision is to make everyday tasks feel lighter, so you can stay
              present.
            </p>
            <Link
              to="/"
              hash="early-access"
              className="mt-8 inline-flex items-center gap-4 border border-champagne/50 px-6 py-4 text-xs tracking-[0.12em] uppercase transition-colors hover:bg-champagne hover:text-deep"
            >
              Be part of what’s next <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <AiraFooter />
    </div>
  );
}
