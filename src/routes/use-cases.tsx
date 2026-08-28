import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/aira-logo.png.asset.json";
import logoImg from "@/assets/logo.png";

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
      { property: "og:image", content: `https://useaira.netlify.app${logo.url}` },
      { name: "twitter:image", content: `https://useaira.netlify.app${logo.url}` },
      { property: "og:url", content: "https://useaira.netlify.app/use-cases" },
    ],
    links: [{ rel: "canonical", href: "https://useaira.netlify.app/use-cases" }],
  }),
});

const shell = "mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16";

const categories = [
  { label: "Health", items: ["Body", "Sleep", "Stress", "Recovery", "Sports"] },
  {
    label: "Memory",
    items: ["Everyday Memory", "Conversations", "Meetings", "Ideas", "Journal"],
  },
  {
    label: "Learning",
    items: ["Lectures", "Students", "Research", "Brainstorming", "Creativity"],
  },
  {
    label: "Life",
    items: ["Family", "Parents", "Travel", "Personal AI", "Timeline"],
  },
  {
    label: "Work",
    items: ["Meetings", "Productivity", "Action Items", "Follow-ups"],
  },
  {
    label: "Legacy",
    items: ["Stories", "Voice", "Messages", "Family History", "Digital Legacy"],
  },
];

const cases: { index: string; title: string; lead: string; body: string; note?: string }[] = [
  {
    index: "01",
    title: "Know Your Body",
    lead: "Your health, understood over time.",
    body: "Track activity, heart rate, HRV, sleep, stress, temperature, blood oxygen and other wellness signals to understand your body and your daily patterns.",
  },
  {
    index: "02",
    title: "Your Everyday Memory",
    lead: "Remember the things your mind lets go.",
    body: "Conversations, ideas, names, plans, places and little moments—AIRA helps turn everyday experiences into a searchable personal memory.",
  },
  {
    index: "03",
    title: "Everyday Conversations",
    lead: "Stay present. Remember later.",
    body: "Whether it's a conversation with a friend, a family discussion, an important call or a spontaneous idea, AIRA can help preserve what matters—with appropriate consent.",
  },
  {
    index: "04",
    title: "Ask Your Memory",
    lead: "Your life, searchable.",
    body: "\"What did we decide yesterday?\" \"What was that restaurant we talked about?\" \"What did Mom tell me last week?\" Ask AIRA about the memories you've chosen to preserve.",
  },
  {
    index: "05",
    title: "Meetings",
    lead: "Be in the conversation, not in your notes.",
    body: "AIRA can capture meetings, summarize discussions, surface decisions and identify follow-ups—with appropriate consent.",
  },
  {
    index: "06",
    title: "Work & Productivity",
    lead: "Turn conversations into action.",
    body: "Extract tasks, commitments, ideas and follow-ups from the conversations that matter.",
  },
  {
    index: "07",
    title: "Learning",
    lead: "Learn today. Remember tomorrow.",
    body: "Capture lectures, explanations, discussions and ideas, then return to them through your personal memory.",
  },
  {
    index: "08",
    title: "Students",
    lead: "Your classes have a memory.",
    body: "Preserve explanations, questions, discussions and ideas so you can revisit what you learned later.",
  },
  {
    index: "09",
    title: "Brainstorming",
    lead: "Think out loud. Keep the ideas.",
    body: "Capture spontaneous thoughts and conversations, then use your accumulated context to develop them further.",
  },
  {
    index: "10",
    title: "Ideas & Creativity",
    lead: "Great ideas don't wait for a notebook.",
    body: "Capture ideas while walking, travelling, creating, designing or simply thinking—and return to them whenever you're ready.",
  },
  {
    index: "11",
    title: "Sports & Training",
    lead: "Understand your performance over time.",
    body: "Track activity, movement, sleep, recovery and physiological signals to understand how your routines and training affect you.",
  },
  {
    index: "12",
    title: "Travel",
    lead: "Remember the journey, not just the photos.",
    body: "Preserve conversations, places, ideas, experiences and moments from the trips that become part of your story.",
  },
  {
    index: "13",
    title: "Family",
    lead: "Keep the moments between the big moments.",
    body: "Preserve everyday conversations, stories, traditions, jokes and experiences shared with the people closest to you.",
  },
  {
    index: "14",
    title: "Parents & Grandparents",
    lead: "A lifetime of stories, in their own words.",
    body: "Preserve stories, experiences, wisdom and family history while the people who lived them can still tell them.",
  },
  {
    index: "15",
    title: "Personal Journal",
    lead: "A journal that happens naturally.",
    body: "AIRA can help turn your everyday thoughts, experiences and reflections into a private, evolving record of your life.",
  },
  {
    index: "16",
    title: "Personal AI",
    lead: "The AI You. Built from your life.",
    body: "AIRA gradually understands your experiences, preferences, memories, relationships and context—creating an AI that becomes increasingly personal over time.",
  },
  {
    index: "17",
    title: "Personal Timeline",
    lead: "See your life through your own memories.",
    body: "Explore the people, places, conversations, ideas and experiences that have shaped your life over time.",
  },
  {
    index: "18",
    title: "Life Review",
    lead: "Look back with context.",
    body: "Revisit important periods, experiences and conversations and see how your life has changed over time.",
  },
];

const legacyCases: { index: string; title: string; lead: string; body: string }[] = [
  {
    index: "19",
    title: "Stories Worth Keeping",
    lead: "Some stories deserve more than a moment.",
    body: "Preserve the stories, experiences, wisdom and memories shared by the people you love.",
  },
  {
    index: "20",
    title: "Your Voice, Your Way",
    lead: "Preserve the voice that makes you, you.",
    body: "With your permission, AIRA can preserve selected voice samples as part of your personal memory and future experiences.",
  },
  {
    index: "21",
    title: "Messages for the Future",
    lead: "Say something to someone you haven't met yet.",
    body: "Leave stories, advice, memories and personal messages for your children, grandchildren and future generations.",
  },
  {
    index: "22",
    title: "Family History",
    lead: "Give future generations a way to know you.",
    body: "Preserve family stories, traditions, experiences and memories that might otherwise disappear from one generation to the next.",
  },
  {
    index: "23",
    title: "Speak to Their Memories",
    lead: "You decide what lives on.",
    body: "Choose what AIRA remembers, what gets deleted, and who can access your memories and legacy after you're gone.",
  },
];

function UseCases() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className={`${shell} flex items-center justify-between py-8`}>
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoImg}
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

        {/* Numbered cases */}
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

        {/* Legacy section */}
        <section className="bg-deep text-[oklch(0.95_0.015_88)]">
          <div className={`${shell} py-28 sm:py-40`}>
            <p className="text-xs tracking-[0.3em] text-[oklch(0.95_0.015_88)]/55 uppercase">
              Legacy
            </p>
            <h2 className="mt-10 max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
              What you choose to leave behind.
            </h2>
            <div className="mt-16 border-t border-[oklch(0.95_0.015_88)]/15">
              <dl>
                {legacyCases.map((c) => (
                  <div
                    key={c.index}
                    className="grid gap-6 border-b border-[oklch(0.95_0.015_88)]/15 py-12 lg:grid-cols-[10rem_1fr] lg:gap-12"
                  >
                    <dt className="text-[0.68rem] tracking-[0.28em] text-[oklch(0.95_0.015_88)]/55 uppercase">
                      {c.index} {c.title}
                    </dt>
                    <dd>
                      <p className="max-w-[34ch] text-xl leading-snug tracking-[-0.02em] sm:text-2xl">
                        {c.lead}
                      </p>
                      <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-[oklch(0.95_0.015_88)]/65 sm:text-base">
                        {c.body}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Legacy statement */}
        <section className="surface-hero surface-grain relative overflow-hidden text-[oklch(0.97_0.015_88)]">
          <div className={`${shell} relative z-10 py-36 sm:py-52`}>
            <p className="max-w-[24ch] text-[clamp(2.1rem,6.4vw,5.25rem)] leading-[0.98] tracking-[-0.035em]">
              A voice. A story. A lifetime of moments.
            </p>
            <div className="mt-10 flex gap-6">
              <div className="mt-1 w-px self-stretch bg-[oklch(0.97_0.015_88)]/40" />
              <div>
                <p className="max-w-[36ch] text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.06] tracking-[-0.03em] text-[oklch(0.97_0.015_88)]/80">
                  There are things worth remembering today.
                </p>
                <p className="mt-6 max-w-[46ch] text-[clamp(1rem,2.5vw,1.5rem)] leading-[1.1] tracking-[-0.02em] text-[oklch(0.97_0.015_88)]/65">
                  And sometimes, they become even more meaningful tomorrow.
                </p>
              </div>
            </div>

            <p className="mt-14 max-w-[58ch] text-base leading-relaxed text-[oklch(0.97_0.015_88)]/70">
              AIRA responds from the memories they chose to preserve, not from an invented biography.
            </p>
          </div>
        </section>

        {/* Closing — A Life, Remembered */}
        <section className="py-32 sm:py-44">
          <div className={shell}>
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              A Life, Remembered.
            </p>
            <h2 className="mt-10 max-w-[20ch] text-[clamp(2rem,5.4vw,4.25rem)] leading-[1.02] tracking-[-0.03em]">
              The longer you wear it, the more of you it remembers.
            </h2>
            <div className="flex gap-2">
              <Link
                to="/"
                hash="early-access"
                className="mt-12 inline-block border border-primary bg-primary px-7 py-4 text-sm tracking-[0.14em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-transparent hover:text-primary"
              >
                Join Early Access
              </Link>
              <a
                href="https://cal.eu/giridhar-orange/team-aira"
                target="_blank"
                className="mt-12 inline-block border border-primary bg-secondary px-7 py-4 text-sm tracking-[0.14em] text-primary uppercase transition-colors duration-300 hover:bg-transparent hover:text-primary"
              >
                Meet Our Team
              </a>
            </div>
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
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
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
