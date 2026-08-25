import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/aira-logo.png.asset.json";

export const Route = createFileRoute("/use-cases")({
  component: UseCases,
  head: () => ({
    meta: [
      { title: "AIRA Use Cases — Health, Memory, Legacy" },
      {
        name: "description",
        content:
          "How people use AIRA: everyday health and sleep, private memory, family stories, voice preservation and digital legacy.",
      },
      { property: "og:title", content: "AIRA Use Cases — Health, Memory, Legacy" },
      {
        property: "og:description",
        content:
          "From daily health signals to preserved voices and digital legacy — the ways AIRA fits into a life.",
      },
      { property: "og:image", content: `https://myaira.lovable.app${logo.url}` },
      { name: "twitter:image", content: `https://myaira.lovable.app${logo.url}` },
      { property: "og:url", content: "https://myaira.lovable.app/use-cases" },
    ],
    links: [{ rel: "canonical", href: "https://myaira.lovable.app/use-cases" }],
  }),
});

const shell = "mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16";

const categories = [
  { label: "Health", items: ["Everyday Health", "Sleep", "Stress", "Recovery"] },
  {
    label: "Memory",
    items: ["Personal Memory", "Meetings", "Learning", "Work", "Journal"],
  },
  {
    label: "People",
    items: ["Family", "Parents", "Couples", "Long Distance", "Caregiving"],
  },
  {
    label: "Legacy",
    items: ["Life Story", "Voice", "Messages", "Nominees", "Digital Legacy"],
  },
  {
    label: "Intelligence",
    items: ["Personal AI", "Preferences", "Timeline", "Life Review"],
  },
  {
    label: "Professional",
    items: ["Meetings", "Interviews", "Research", "Creative Work", "Founders"],
  },
];

const cases: { index: string; title: string; lead: string; body: string; note?: string }[] = [
  {
    index: "01",
    title: "Know Yourself",
    lead: "Your health, understood over time.",
    body: "Track sleep, heart rate, HRV, stress, activity and other everyday signals to understand the patterns that shape how you feel and live.",
  },
  {
    index: "02",
    title: "Know Your Body, Every Day",
    lead: "Your body, in daily context.",
    body: "AIRA continuously tracks your activity, heart rate, HRV, stress, sleep, calories, temperature, blood oxygen SPO2 and other wellness signals, helping you understand your body, your habits, and how your daily life affects you.",
  },
  {
    index: "03",
    title: "Remember Everything That Matters",
    lead: "The moments you don't want to lose.",
    body: "AIRA builds a private, evolving memory from the conversations, experiences, stories and moments you choose to preserve.",
  },
  {
    index: "04",
    title: "Ask About Your Past",
    lead: "Your life, searchable.",
    body: "Forgot something from a conversation, meeting or moment months ago? Ask AIRA and find the memories you've chosen to keep.",
  },
  {
    index: "05",
    title: "Meetings & Work",
    lead: "Your conversations have a memory.",
    body: "Remember decisions, ideas, questions and important details from meetings and conversations, with the appropriate consent.",
  },
  {
    index: "06",
    title: "Learn Without Forgetting",
    lead: "Turn experiences into lasting knowledge.",
    body: "Preserve lectures, discussions, explanations and ideas so you can return to what you learned whenever you need it.",
  },
  {
    index: "07",
    title: "A Personal AI",
    lead: "The AI You. Built from your life.",
    body: "Unlike a generic AI, AIRA gradually understands your experiences, preferences, memories, relationships and the context that makes you uniquely you.",
  },
  {
    index: "08",
    title: "For Alzheimer's & Memory Loss",
    lead: "When remembering becomes difficult.",
    body: "AIRA can help preserve familiar people, stories, routines, conversations and personal context, giving individuals and caregivers another way to reconnect with what matters.",
    note: "Designed as a supportive memory tool, not a medical diagnosis or treatment.",
  },
  {
    index: "09",
    title: "Preserve Their Stories",
    lead: "A lifetime of memories, in their own words.",
    body: "Capture the stories, wisdom, experiences and voice of parents and grandparents while they're here to tell them.",
  },
  {
    index: "10",
    title: "Family History",
    lead: "Give future generations a way to know you.",
    body: "Preserve family stories, traditions, experiences and memories that might otherwise disappear from one generation to the next.",
  },
  {
    index: "11",
    title: "Your Voice, Preserved",
    lead: "Keep the voice that sounds like home.",
    body: "With explicit consent, AIRA can preserve curated voice samples as part of a person's digital legacy.",
  },
  {
    index: "12",
    title: "Leave Something Behind",
    lead: "More than photographs. More than words.",
    body: "Create a lasting collection of your memories, stories, voice and experiences for the people you love.",
  },
  {
    index: "13",
    title: "Messages for the Future",
    lead: "Say something to someone you haven't met yet.",
    body: "Leave stories, advice, memories and personal messages for your children, grandchildren and future generations.",
  },
  {
    index: "14",
    title: "Your Digital Legacy",
    lead: "You decide what lives on.",
    body: "Choose what AIRA remembers, what gets deleted, and who can access your memories and legacy after you're gone.",
  },
  {
    index: "15",
    title: "Life, Remembered",
    lead: "See the story of your life unfold.",
    body: "Over months and years, AIRA can become a private timeline of the people, places, conversations and experiences that shaped you.",
  },
];

const questions = [
  "Tell me about when we first met.",
  "What was your favorite memory of us?",
  "What would you want me to remember?",
];

function UseCases() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className={`${shell} flex items-center justify-between py-8`}>
          <Link to="/" className="flex items-center gap-3">
            <img
              src="src/assets/logo.png"
              alt="AIRA logo"
              width={28}
              height={28}
              draggable={false}
              className="h-7 w-7 shrink-0 select-none object-contain"
            />
            <span className="text-sm leading-none tracking-[0.42em] uppercase">AIRA</span>
          </Link>
          <Link
            to="/"
            className="text-xs tracking-[0.22em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            Back
          </Link>
        </div>
      </header>

      <main>
        <section className="pt-24 pb-16 sm:pt-32">
          <div className={shell}>
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              AIRA — Use Cases
            </p>
            <h1 className="mt-10 max-w-[20ch] text-[clamp(2.2rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.03em]">
              Every way a life can be remembered.
            </h1>
          </div>
        </section>

        {/* Categories */}
        <section className="pb-24">
          <div className={`${shell} grid gap-12 border-t border-border pt-16 sm:grid-cols-2 lg:grid-cols-3`}>
            {categories.map((c) => (
              <div key={c.label}>
                <h2 className="text-[0.68rem] tracking-[0.28em] text-muted-foreground uppercase">
                  {c.label}
                </h2>
                <p className="mt-4 text-lg leading-relaxed tracking-[-0.01em]">
                  {c.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Numbered cases as FAQ-style list */}
        <section className="pb-28">
          <div className={`${shell} border-t border-border`}>
            <dl>
              {cases.map((c) => (
                <div
                  key={c.index}
                  className="grid gap-6 border-b border-border py-12 lg:grid-cols-[10rem_1fr] lg:gap-12"
                >
                  <dt className="text-[0.68rem] tracking-[0.28em] text-muted-foreground uppercase">
                    {c.index} {c.title}
                  </dt>
                  <dd>
                    <p className="max-w-[34ch] text-xl leading-snug tracking-[-0.02em] sm:text-2xl">
                      {c.lead}
                    </p>
                    <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {c.body}
                    </p>
                    {c.note && (
                      <p className="mt-4 text-xs tracking-[0.06em] text-muted-foreground/80">
                        {c.note}
                      </p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Dominant legacy statement */}
        <section className="surface-hero surface-grain relative overflow-hidden text-[oklch(0.97_0.015_88)]">
          <div className={`${shell} relative z-10 py-36 sm:py-52`}>
            <p className="max-w-[24ch] text-[clamp(2.1rem,6.4vw,5.25rem)] leading-[0.98] tracking-[-0.035em]">
              One day, you may ask AIRA about them.
            </p>
            <p className="mt-10 max-w-[24ch] text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.06] tracking-[-0.03em] text-[oklch(0.97_0.015_88)]/80">
              And hear their voice answer.
            </p>

            <div className="mt-16 flex flex-col gap-3 border-l border-[oklch(0.97_0.015_88)]/25 pl-6">
              {questions.map((q) => (
                <p key={q} className="text-base text-[oklch(0.97_0.015_88)]/75 italic sm:text-lg">
                  “{q}”
                </p>
              ))}
            </div>

            <p className="mt-14 max-w-[58ch] text-base leading-relaxed text-[oklch(0.97_0.015_88)]/70">
              AIRA responds from the memories and experiences that person actually chose to
              preserve, not from an invented biography.
            </p>
            <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-[oklch(0.97_0.015_88)]/70">
              AIRA's legacy isn't created after someone is gone. It is built slowly, while
              they're here, through the memories, stories, conversations and voice they chose to
              preserve.
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="py-32 sm:py-44">
          <div className={shell}>
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              A Life, Remembered.
            </p>
            <h2 className="mt-10 max-w-[20ch] text-[clamp(2rem,5.4vw,4.25rem)] leading-[1.02] tracking-[-0.03em]">
              The longer you wear it, the more of you it remembers.
            </h2>
            <Link
              to="/"
              hash="early-access"
              className="mt-12 inline-block border border-primary bg-primary px-7 py-4 text-sm tracking-[0.14em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-transparent hover:text-primary"
            >
              Join Early Access
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div
          className={`${shell} flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between`}
        >
          <span className="text-sm tracking-[0.42em] uppercase">AIRA</span>
          <nav className="flex gap-8 text-sm text-muted-foreground">
            <Link to="/use-cases" className="transition-colors hover:text-foreground">
              Use Cases
            </Link>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="/?ref=use-case-footer" className="transition-colors hover:text-foreground">
              Home
            </a>
          </nav>
          <p className="text-xs text-muted-foreground">© 2026 AIRA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
