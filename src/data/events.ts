export type AiraEvent = {
  id: string;
  title: string;
  status: "upcoming" | "past";
  /** ISO date and time including its UTC offset. */
  startsAt: string;
  /** IANA time zone for the event's displayed date and time. */
  timeZone: string;
  location: string;
  lumaUrl: string;
  imageUrl?: string;
};

// Add card details here when available. Embedded events below display their details via Luma.
export const events: AiraEvent[] = [];

export type EmbeddedAiraEvent = {
  id: string;
  status: AiraEvent["status"];
  embedUrl: string;
  // Add verified metadata to show it directly on the compact card.
  title?: string;
  startsAt?: string;
  timeZone?: string;
  location?: string;
  imageUrl?: string;
  lumaUrl?: string;
};

export const embeddedEvents: EmbeddedAiraEvent[] = [
  {
    id: "evt-E9qLlnX6Cwfo2Cv",
    status: "past",
    embedUrl: "https://luma.com/embed/event/evt-E9qLlnX6Cwfo2Cv/simple",
  },
];
