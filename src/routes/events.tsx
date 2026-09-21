import { AiraFooter } from "@/components/ui/aira-footer";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { events, embeddedEvents, type AiraEvent, type EmbeddedAiraEvent } from "@/data/events";
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () => ({
    meta: [
      { title: "AIRA Events — Experience what we're building" },
      {
        name: "description",
        content:
          "Explore upcoming AIRA events and revisit past gatherings. Meet the people behind AIRA and discover what we're building.",
      },
      { property: "og:title", content: "AIRA Events" },
      {
        property: "og:description",
        content:
          "Meet the people behind AIRA. Explore upcoming events, conversations and product experiences.",
      },
      { property: "og:url", content: "https://useaira.netlify.app/events" },
    ],
    links: [{ rel: "canonical", href: "https://useaira.netlify.app/events" }],
  }),
});

const shell = "mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16";
const tabs = [
  { value: "upcoming", label: "Upcoming events" },
  { value: "past", label: "Past events" },
] as const;

function EventCard({ event }: { event: AiraEvent | EmbeddedAiraEvent }) {
  const title = event.title || "AIRA event";
  const detailsUrl = "embedUrl" in event ? event.lumaUrl || event.embedUrl : event.lumaUrl;
  const date = event.startsAt && event.timeZone ? new Date(event.startsAt) : null;
  const dateLabel =
    date &&
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: event.timeZone,
    }).format(date);
  const timeLabel =
    date &&
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
      timeZone: event.timeZone,
    }).format(date);

  return (
    <li className="min-w-0">
      <article className="grid grid-cols-[76px_minmax(0,1fr)] items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-sage/60 sm:grid-cols-[128px_minmax(0,1fr)] sm:items-center sm:gap-5">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt=""
            loading="lazy"
            width={128}
            height={128}
            className="aspect-square w-full rounded-lg border border-border object-cover"
          />
        ) : (
          <div className="flex aspect-square flex-col items-center justify-center gap-3 rounded-lg border border-border bg-secondary">
            <img
              src={logoImg}
              alt=""
              width={40}
              height={40}
              className="h-8 w-8 object-contain sm:h-10 sm:w-10"
            />
            <span className="text-[0.55rem] tracking-[0.24em] text-forest sm:text-[0.65rem]">
              AIRA
            </span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="text-lg leading-snug tracking-[-0.02em] sm:text-2xl">{title}</h2>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-sage/10 px-2.5 py-1.5 text-forest">
              {event.location ? (
                <>
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  {event.location}
                </>
              ) : event.status === "past" ? (
                "Past event"
              ) : (
                "Upcoming event"
              )}
            </span>
            {dateLabel && timeLabel && (
              <>
                <time
                  dateTime={event.startsAt}
                  className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1.5 text-muted-foreground"
                >
                  <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  {dateLabel}
                </time>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1.5 text-muted-foreground">
                  <Clock3 aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  {timeLabel}
                </span>
              </>
            )}
          </div>
          <a
            href={detailsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} on Luma (opens in a new tab)`}
            className="mt-4 inline-flex items-center gap-3 rounded-lg border border-border bg-secondary px-5 py-3 text-sm text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            View details
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </article>
    </li>
  );
}

function EventsPage() {
  return (
    <div className="aira-site aira-events flex min-h-screen flex-col bg-background">
      <header className="aira-header border-b border-border">
        <div className={`${shell} flex flex-wrap items-center justify-between gap-5 py-8`}>
          <Link to="/" aria-label="AIRA home" className="flex items-center gap-3">
            <img src={logoImg} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
            <span className="text-sm tracking-[0.42em] uppercase">AIRA</span>
          </Link>
          <nav aria-label="Main navigation">
            <Link to="/" hash="early-access">
              Join Waitlist
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1100px] flex-1 px-6 pt-16 pb-24 sm:px-10 sm:pt-24 sm:pb-32">
        <div className="text-center">
          <p className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
            Meet AIRA
          </p>
          <h1 className="mx-auto mt-6 max-w-[22ch] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.035em]">
            <span className="font-serif font-normal italic">Experience</span> what we&rsquo;re
            building.
          </h1>
          <p className="mx-auto mt-6 max-w-[61ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
            Meet the people behind AIRA. Explore our gatherings, conversations and product
            experiences as we bring Loop to life.
          </p>
        </div>

        <Tabs defaultValue="past" className="mt-12 sm:mt-14">
          <div className="flex justify-center">
            <TabsList
              aria-label="Event schedule"
              className="grid h-auto w-full max-w-lg grid-cols-2 rounded-full border border-border bg-secondary p-1"
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-full px-3 py-3 text-xs font-normal tracking-[0.02em] data-[state=active]:bg-card data-[state=active]:shadow-sm sm:text-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabs.map((tab) => {
            const matchingEmbeds = embeddedEvents.filter((event) => event.status === tab.value);
            const matchingEvents = events
              .filter((event) => event.status === tab.value)
              .sort((a, b) => {
                const difference = Date.parse(a.startsAt) - Date.parse(b.startsAt);
                return tab.value === "upcoming" ? difference : -difference;
              });
            return (
              <TabsContent key={tab.value} value={tab.value} className="mt-10 rounded-2xl sm:mt-12">
                {matchingEvents.length > 0 || matchingEmbeds.length > 0 ? (
                  <ul className="grid w-full grid-cols-1 gap-3 sm:gap-4" aria-label={tab.label}>
                    {matchingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                    {matchingEmbeds.map((event) => (
                      <li key={event.id} className="min-w-0">
                        <article className="w-full overflow-hidden rounded-2xl border border-border bg-card p-3 transition-colors hover:border-sage/60 sm:p-5">
                          <iframe
                            src={event.embedUrl}
                            title={`${tab.value === "past" ? "Past" : "Upcoming"} AIRA event on Luma`}
                            width="100%"
                            height={450}
                            loading="lazy"
                            allow="fullscreen; payment"
                            aria-hidden={false}
                            tabIndex={0}
                            className="block h-[450px] w-full rounded-lg border-0 bg-card"
                          />
                        </article>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center sm:py-20">
                    <h2 className="mt-6 text-xl tracking-[-0.02em] sm:text-2xl">
                      {tab.value === "upcoming"
                        ? "Our next gathering starts here."
                        : "A place for shared moments."}
                    </h2>
                    <p className="mx-auto mt-3 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
                      {tab.value === "upcoming"
                        ? "No upcoming events announced yet. Check back here for dates and registration details."
                        : "No past events listed yet. Previous gatherings will appear here once shared."}
                    </p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </main>

      <AiraFooter />
    </div>
  );
}
