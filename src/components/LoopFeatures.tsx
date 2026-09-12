import {
  Activity,
  AudioLines,
  Brain,
  CalendarDays,
  CheckCheck,
  ClipboardList,
  Footprints,
  HeartPulse,
  History,
  Lightbulb,
  Link2,
  ListChecks,
  MessageCircle,
  Mic,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Thermometer,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import loopImage from "@/assets/Aira-loop-fade.png";

type Feature = { icon: LucideIcon; title: string; description: string };

const healthFeatures: Feature[] = [
  {
    icon: HeartPulse,
    title: "Heart rate & HRV",
    description: "Follow your heart rate and heart rate variability over time.",
  },
  {
    icon: Moon,
    title: "Sleep insights",
    description: "Explore sleep duration, consistency and your nightly patterns.",
  },
  {
    icon: Footprints,
    title: "Activity & movement",
    description: "Keep track of steps, daily activity and the rhythm of your day.",
  },
  {
    icon: Activity,
    title: "Recovery & stress-related signals",
    description: "Understand recovery trends and changes in physiological stress signals.",
  },
  {
    icon: Thermometer,
    title: "Temperature & blood oxygen trends",
    description: "Bring additional wellness signals into your personal health picture.",
  },
  {
    icon: TrendingUp,
    title: "Personal baseline changes",
    description: "See how today's signals compare with your own usual patterns.",
  },
  {
    icon: Link2,
    title: "Health patterns, connected",
    description: "Explore correlations across sleep, stress, activity and recovery.",
  },
  {
    icon: ClipboardList,
    title: "Daily health summary",
    description: "A daily wellness score and a clear recap of what changed today.",
  },
  {
    icon: MessageCircle,
    title: "Ask about your health",
    description: 'Ask "What changed today?" and explore the patterns behind your summary.',
  },
];

const memoryFeatures: Feature[] = [
  {
    icon: Mic,
    title: "Everyday conversation capture",
    description: "Continuously capture conversations through Loop while device is active.",
  },
  {
    icon: AudioLines,
    title: "AI notes & summaries",
    description: "Turn conversations and meetings into clear summaries and key takeaways.",
  },
  {
    icon: Search,
    title: "Searchable personal memory",
    description:
      "Find a detail, decision or conversation without searching through scattered notes.",
  },
  {
    icon: ListChecks,
    title: "Commitments & tasks",
    description: "Surface follow-ups, recall what you promised and assign tasks to your assistant.",
  },
  {
    icon: Lightbulb,
    title: "Ideas & learning",
    description: "Keep thoughts, explanations and moments of inspiration ready to revisit.",
  },
  {
    icon: History,
    title: "Your personal timeline",
    description: "Return to saved conversations, experiences and memories with their context.",
  },
  {
    icon: Brain,
    title: "An AI built around your memory",
    description: "Ask questions about your day using the conversations and information you keep.",
  },
  {
    icon: CalendarDays,
    title: "Daily memory recap",
    description: "Revisit important discussions, ideas and outstanding commitments in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Your memory, your control",
    description: "Pause recording, choose what stays and delete what you don't want remembered.",
  },
];

function FeatureTable({
  title,
  subtitle,
  icon: Icon,
  features,
}: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  features: Feature[];
}) {
  return (
    <table className="w-full table-fixed border-collapse text-center">
      <caption className="border-b border-white/20 px-5 pb-10">
        <Icon
          aria-hidden="true"
          strokeWidth={1.25}
          className="mx-auto mb-6 h-9 w-9 text-champagne"
        />
        <h3 className="text-2xl tracking-[-0.02em] text-white sm:text-3xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/65">{subtitle}</p>
      </caption>
      <tbody>
        {features.map(({ icon: FeatureIcon, title: featureTitle, description }) => (
          <tr key={featureTitle} className="border-b border-white/10">
            <td className="px-5 py-8 sm:px-8 md:h-[170px]">
              <FeatureIcon
                aria-hidden="true"
                strokeWidth={1.4}
                className="mx-auto mb-4 h-6 w-6 text-champagne"
              />
              <p className="text-base font-medium text-white">{featureTitle}</p>
              <p className="mx-auto mt-2 max-w-[39ch] text-sm leading-relaxed text-white/65">
                {description}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function LoopFeatures() {
  return (
    <section
      id="loop-features"
      aria-labelledby="loop-features-title"
      className="overflow-hidden bg-[#101916] text-white"
    >
      <div className="mx-auto w-full max-w-[1320px] px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="grid items-center gap-10 pb-20 md:grid-cols-[1.25fr_1fr] md:gap-16">
          <div>
            <p className="text-xs tracking-[0.3em] text-champagne uppercase">Explore AIRA Loop</p>
            <h2
              id="loop-features-title"
              className="mt-7 max-w-[17ch] text-[clamp(2.3rem,5vw,4.5rem)] leading-[1.04] tracking-[-0.035em]"
            >
              Your second brain.
              <br />
              Your health.
              <br />
              One wristband.
            </h2>
            <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-white/65">
              Remember what was said. Understand how you feel. Bring your conversations and wellness
              patterns together with Loop and the AIRA app.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs tracking-[0.12em] text-champagne uppercase">
              <span>Screenless wristband</span>
              <span>Companion app</span>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[380px]">
            <img
              src={loopImage}
              alt="AIRA Loop wristband product concept"
              loading="lazy"
              width={480}
              height={480}
              className="aspect-square w-full object-contain [mask-image:radial-gradient(ellipse_at_center,black_48%,transparent_72%)]"
            />
            <figcaption className="mt-3 text-center text-xs tracking-[0.2em] text-white/60 uppercase">
              AIRA Loop 
            </figcaption>
          </figure>
        </div>

        <div className="grid items-start gap-16 md:grid-cols-2 md:gap-12 lg:gap-20">
          <FeatureTable
            title="Health & wellness"
            subtitle="Understand your body, a day at a time."
            icon={HeartPulse}
            features={healthFeatures}
          />
          <FeatureTable
            title="AI second brain"
            subtitle="Stay in the moment. Come back to the details."
            icon={Brain}
            features={memoryFeatures}
          />
        </div>

        <div className="mt-20 border border-white/15 bg-white/[0.025] p-7 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <p className="text-xs tracking-[0.24em] text-champagne uppercase">
                Memory meets health
              </p>
              <h3 className="mt-4 text-3xl leading-tight tracking-[-0.025em] sm:text-4xl">
                &ldquo;What changed today?&rdquo;
              </h3>
              <p className="mt-5 max-w-[44ch] text-sm leading-relaxed text-white/65">
                A daily health summary with the context of your day. Explore changes in your
                baseline alongside your sleep, activity and saved conversations.
              </p>
            </div>
            <ul className="divide-y divide-white/10">
              {[
                "See what moved away from your personal baseline.",
                "Explore patterns across health, sleep, stress and activity.",
                "Revisit your day's conversations and commitments.",
                "Ask AIRA follow-up questions about what changed.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
                  <CheckCheck
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-champagne"
                    strokeWidth={1.4}
                  />
                  <span className="text-sm leading-relaxed text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-[62ch] text-xs leading-relaxed text-white/60">
            Planned Loop capabilities. Hardware and features are in development and subject to
            testing and validation.
          </p>
          <a
            href="#early-access"
            className="inline-flex shrink-0 items-center justify-center border border-champagne bg-champagne px-7 py-4 text-xs tracking-[0.15em] text-deep uppercase transition-colors hover:bg-transparent hover:text-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
          >
            Join Loop early access
          </a>
        </div>
      </div>
    </section>
  );
}
