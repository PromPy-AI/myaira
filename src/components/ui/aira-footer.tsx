import { Link } from "@tanstack/react-router";

export function AiraFooter() {
  return (
    <footer className="aira-footer">
      <div className="aira-footer-inner">
        <Link to="/" aria-label="AIRA home" className="aira-footer-brand">
          AIRA
        </Link>
        <nav aria-label="Footer navigation" className="aira-footer-links">
          <Link to="/our-vision">Our Vision</Link>
          <Link to="/privacy">Privacy &amp; Terms</Link>
          <Link to="/use-cases">Use Cases</Link>
          <Link to="/events">Events</Link>
          <Link to="/" hash="early-access">
            Contact
          </Link>
        </nav>
        <p className="aira-footer-copyright">© 2026 AIRA. All rights reserved.</p>
      </div>
      <div className="aira-footer-wordmark" aria-hidden="true">
        <svg viewBox="0 0 320 120" focusable="false">
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-neutral-300 font-semibold tracking-tighter transition-colors duration-300 dark:fill-white/20"
            fontSize="110"
          >
            AIRA
          </text>
        </svg>
      </div>
    </footer>
  );
}
