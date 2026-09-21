import gmailLogo from "@/assets/google-gmail.svg";
import meetLogo from "@/assets/google-meet.svg";
import calendarLogo from "@/assets/google-calendar.svg";
import healthIcon from "@/assets/aira-health-icon.png";
import chatIcon from "@/assets/aira-chat-icon.png";
import notesIcon from "@/assets/aira-notes-icon.png";

const groups = [
  [gmailLogo, meetLogo, calendarLogo],
  [healthIcon, chatIcon, notesIcon],
] as const;

export function AgentIconStack() {
  return (
    <span
      className="aira-agent-services"
      role="img"
      aria-label="Gmail, Google Meet, Google Calendar, health, conversations and notes"
    >
      <span className="aira-agent-icon-track" aria-hidden="true">
        {/* Repeat the opening row so the upward loop resets seamlessly. */}
        {[...groups, groups[0]].map((group, index) => (
          <span className="aira-agent-icon-row" key={index}>
            {group.map((source) => (
              <img key={source} src={source} alt="" width={56} height={56} draggable={false} />
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}
