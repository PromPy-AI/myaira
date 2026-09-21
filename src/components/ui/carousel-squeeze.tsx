import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

export type SqueezeSlide = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

/** Shows the active slide and three previews, rotating through every supplied slide. */
export function SqueezeCarousel({
  slides,
  label,
  autoplay = false,
  interval = 2000,
}: {
  slides: SqueezeSlide[];
  label: string;
  autoplay?: boolean;
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const count = slides.length;
  const rememberImageSize = useCallback((source: string, image: HTMLImageElement) => {
    if (!image.naturalWidth || !image.naturalHeight) return;
    const ratio = image.naturalWidth / image.naturalHeight;
    setImageRatios((previous) =>
      previous[source] === ratio ? previous : { ...previous, [source]: ratio },
    );
  }, []);

  useEffect(() => {
    // Also measure images that loaded from cache before hydration.
    slides.forEach((slide, index) => {
      const image = tabs.current[index]?.querySelector("img");
      if (image?.complete) rememberImageSize(slide.image, image);
    });
  }, [slides, rememberImageSize]);
  const rotating = autoplay && !hovered && !focused && !paused && !reducedMotion && count > 1;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % count);
    }, interval);
    return () => window.clearInterval(timer);
  }, [rotating, interval, count]);
  const current = slides[active];
  if (!current) return null;

  const select = (index: number) => setActive((index + count) % count);
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = (active + 1) % count;
        break;
      case "ArrowLeft":
        next = (active - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div
      className="aira-squeeze"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div
        className="aira-squeeze-panels"
        style={{ "--active-image-ratio": imageRatios[current.image] ?? 16 / 9 } as CSSProperties}
        role="tablist"
        aria-label="Choose a Loop experience"
        onKeyDown={onKeyDown}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          pointer.current = { x: event.clientX, y: event.clientY };
          swiped.current = false;
        }}
        onPointerCancel={() => {
          pointer.current = null;
        }}
        onPointerUp={(event) => {
          const start = pointer.current;
          pointer.current = null;
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            swiped.current = true;
            select(active + (dx < 0 ? 1 : -1));
          }
        }}
      >
        {slides.map((slide, index) => {
          const position = (index - active + count) % count;
          const selected = index === active;
          return (
            <button
              key={slide.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${slide.id}`}
              aria-controls={`${id}-caption`}
              aria-selected={selected}
              aria-label={slide.title}
              tabIndex={selected ? 0 : -1}
              data-position={position}
              className="aira-squeeze-panel"
              style={{ "--preview-position": position } as CSSProperties}
              onClick={() => {
                if (swiped.current) {
                  swiped.current = false;
                  return;
                }
                select(index);
              }}
            >
              <img
                src={slide.image}
                alt={slide.imageAlt}
                loading="lazy"
                decoding="async"
                draggable={false}
                onLoad={(event) => rememberImageSize(slide.image, event.currentTarget)}
              />
              <span className="aira-squeeze-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
      <div className="aira-squeeze-footer">
        <div
          id={`${id}-caption`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${current.id}`}
          aria-live={rotating ? "off" : "polite"}
          aria-atomic="true"
          className="aira-squeeze-caption"
        >
          <div key={current.id}>
            <h3>{current.title}</h3>
            <p>{current.description}</p>
          </div>
        </div>
        <div className="aira-squeeze-controls">
          <span aria-hidden="true">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          {autoplay && !reducedMotion && (
            <button
              type="button"
              aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? (
                <Play aria-hidden="true" size={17} />
              ) : (
                <Pause aria-hidden="true" size={17} />
              )}
            </button>
          )}
          <button type="button" aria-label="Previous experience" onClick={() => select(active - 1)}>
            <ArrowLeft aria-hidden="true" size={19} />
          </button>
          <button type="button" aria-label="Next experience" onClick={() => select(active + 1)}>
            <ArrowRight aria-hidden="true" size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}
