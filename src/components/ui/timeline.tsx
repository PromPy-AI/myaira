import { useEffect, useRef, type ReactNode } from "react";

export interface TimelineEntry {
  title: string;
  content: ReactNode;
  featured?: boolean;
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    const progress = progressRef.current;
    if (!container || !progress) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = container.getBoundingClientRect();
      const value = preference.matches
        ? 1
        : Math.min(
            1,
            Math.max(
              0,
              (window.innerHeight * 0.65 - rect.top) /
                Math.max(1, rect.height - window.innerHeight * 0.1),
            ),
          );
      progress.style.transform = `scaleY(${value})`;
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(container);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    update();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={ref} className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[11px] -z-10 w-px overflow-hidden bg-border md:left-[15px]"
      >
        <div
          ref={progressRef}
          style={{ transform: "scaleY(0)" }}
          className="h-full w-full origin-top bg-gradient-to-b from-champagne via-sage to-forest"
        />
      </div>
      <ol aria-label="AIRA product roadmap">
        {data.map((item, index) => (
          <li
            key={item.title}
            className={`relative grid gap-6 pb-16 pl-10 last:pb-0 md:gap-12 md:pb-28 md:pl-16 ${item.featured ? "md:grid-cols-1" : "md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)]"}`}
          >
            <div className={`relative self-start ${item.featured ? "" : "md:sticky md:top-28"}`}>
              <span
                aria-hidden="true"
                className="absolute top-1 -left-10 flex h-6 w-6 items-center justify-center rounded-full border border-sage/40 bg-background md:-left-16 md:h-8 md:w-8"
              >
                <span className="h-2 w-2 rounded-full bg-sage" />
              </span>
              <p className="mb-3 text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase">
                Chapter {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="text-2xl tracking-[-0.04em] md:text-4xl">{item.title}</h2>
            </div>
            <div className="min-w-0">{item.content}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
