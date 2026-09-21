import { SqueezeCarousel, type SqueezeSlide } from "@/components/ui/carousel-squeeze";

const assetBase = "https://obpgdfxxqufrzhbplgty.supabase.co/storage/v1/object/public/aira-public";
const slides: SqueezeSlide[] = [
  {
    id: "activity",
    title: "Move with more awareness.",
    description: "Follow your activity, movement and daily rhythm, all in one place.",
    image: `${assetBase}/aira-activity.png`,
    imageAlt: "AIRA activity and movement experience",
  },
  {
    id: "stress",
    title: "Understand your stress patterns.",
    description: "Explore stress-related signals and see how they change throughout your day.",
    image: `${assetBase}/aira-stress-indicator.png`,
    imageAlt: "AIRA stress indicator experience",
  },
  {
    id: "meetings",
    title: "Stay present. AIRA remembers what matters.",
    description:
      "AIRA turns captured conversations into clear summaries, key decisions and follow-ups.",
    image: `${assetBase}/aira-for-meetings.png`,
    imageAlt: "AIRA meeting memory experience",
  },
  {
    id: "sleep",
    title: "Better nights make for better days.",
    description:
      "Wake up to a deeper understanding of your sleep, with Loop’s insights into your nightly patterns.",
    image: `${assetBase}/aira-sleep-cycle.png`,
    imageAlt: "AIRA sleep cycle experience",
  },
  {
    id: "app-preview",
    title: "Your day, connected in one app.",
    description:
      "Explore your daily wellness score, detailed health metrics, revisit saved conversations and ask AIRA about what matters to you.",
    image: `${assetBase}/aira-app-frame1.png`,
    imageAlt:
      "AIRA app preview showing a daily wellness score, conversation recall and saved memories",
  },
];

export function LoopExperienceCarousel() {
  return (
    <div className="aira-experiences mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16">
      <SqueezeCarousel
        slides={slides}
        label="Explore life with AIRA Loop"
        autoplay
        interval={2400}
      />
    </div>
  );
}
