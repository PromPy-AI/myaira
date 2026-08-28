import { createFileRoute, Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — AIRA" },
      {
        name: "description",
        content:
          "AIRA Privacy Policy. Your life. Your data. Your control. Learn how AIRA collects, uses, and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy — AIRA" },
      {
        property: "og:description",
        content:
          "Your life. Your data. Your control. Learn how AIRA collects, uses, and protects your personal information.",
      },
      { property: "og:url", content: "https://useaira.netlify.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://useaira.netlify.app/privacy" }],
  }),
});

const shell = "mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16";

const principles = [
  {
    title: "Privacy by design",
    body: "Privacy is considered throughout the design of our devices, software, infrastructure, and AI systems.",
  },
  {
    title: "Data minimization",
    body: "We collect and retain only information reasonably necessary to provide the features you choose to use.",
  },
  {
    title: "You control what AIRA remembers",
    body: "You can pause, mute, block, delete, and manage memories through the AIRA application.",
  },
  {
    title: "Raw audio is not your permanent archive",
    body: "Where technically and operationally possible, raw audio is processed into the information required to provide the service and is deleted according to our applicable retention rules and your settings.",
  },
  {
    title: "We do not sell your personal data",
    body: "AIRA does not sell personal information to advertisers or data brokers.",
  },
  {
    title: "Your memories are not our AI-training dataset",
    body: "We do not use your private conversations, memories, voice recordings, or health information to train general-purpose AI models without your separate, explicit permission, except where necessary to provide the service or where legally permitted with appropriate safeguards.",
  },
  {
    title: "Security is fundamental",
    body: "We use appropriate technical and organizational safeguards to protect your information.",
  },
];

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="mt-16 mb-6 text-xl tracking-[-0.02em] sm:text-2xl">
      <span className="mr-3 text-muted-foreground">{number}.</span>
      {title}
    </h2>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-1 pl-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Privacy() {
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
              Legal
            </p>
            <h1 className="mt-10 max-w-[20ch] text-[clamp(2.2rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.03em]">
              AIRA Privacy Policy
            </h1>
            <p className="mt-6 text-sm text-muted-foreground">Last updated: August 2026</p>
          </div>
        </section>

        <section className="pb-28">
          <div className={`${shell} max-w-[860px] border-t border-border pt-16`}>
            {/* Preamble */}
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              At AIRA, we believe your memories belong to you.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              AIRA is designed to help you understand your health, remember what matters, and
              preserve your stories, voice, experiences, and personal memories.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Because AIRA may process highly personal information—including voice recordings,
              conversations, memories, wellness information, biometric information, and, for
              certain devices, EEG signals—we design our services around privacy, security,
              transparency, and user control.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              This Privacy Policy explains what information AIRA collects, how we use it, how we
              protect it, when it may be shared, and the choices available to you.
            </p>

            {/* 1. Our Privacy Principles */}
            <SectionHeading number="1" title="Our Privacy Principles" />
            <p className="text-lg font-medium tracking-[-0.01em]">
              Your life. Your data. Your control.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              AIRA follows these principles:
            </p>
            <div className="mt-6 space-y-6">
              {principles.map((p) => (
                <div key={p.title}>
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>

            {/* 2. What Is AIRA? */}
            <SectionHeading number="2" title="What Is AIRA?" />
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              AIRA includes wearable devices, mobile applications, cloud services, AI services,
              websites, and related products.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Depending on the AIRA product and features you use, AIRA may collect information from:
            </p>
            <BulletList
              items={[
                "AIRA Loop",
                "AIRA Sense",
                "AIRA Life",
                "the AIRA mobile application",
                "your AIRA account",
                "AIRA's website",
                "connected devices and services",
                "information you voluntarily provide",
              ]}
            />
            <p className="mt-4 text-xs text-muted-foreground">
              Not every device collects every category of information.
            </p>

            {/* 3. Information We Collect */}
            <SectionHeading number="3" title="Information We Collect" />
            <h3 className="mt-6 text-base font-medium">A. Account Information</h3>
            <p className="mt-2 text-sm text-muted-foreground">We may collect:</p>
            <BulletList
              items={[
                "name",
                "email address",
                "phone number",
                "date of birth where required",
                "country or region",
                "profile information",
                "device information",
                "subscription information",
              ]}
            />

            <h3 className="mt-8 text-base font-medium">B. Voice & Audio Data</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              When the microphone is enabled, AIRA may temporarily capture audio containing your
              voice and surrounding sounds. Depending on your settings and the functionality you
              use, this information may be processed to:
            </p>
            <BulletList
              items={[
                "identify speech",
                "create transcripts",
                "identify the primary user's voice",
                "organize conversations",
                "create summaries",
                "create personal memories",
                "answer questions about previously preserved experiences",
                "provide other AIRA features",
              ]}
            />

            <h4 className="mt-6 text-sm font-medium">Raw Audio</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              AIRA is designed around a local-first capture architecture. Where supported, audio
              may initially be stored temporarily on the device rather than continuously
              transmitted to the cloud. Audio may subsequently be transferred for processing when
              the device synchronizes according to the product's operating mode. After the
              necessary processing has been completed, raw audio may be deleted according to our
              retention architecture, your settings, and applicable legal requirements.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We will clearly describe the actual retention period and deletion behavior of each
              product before launch.
            </p>

            {/* 4. Health & Wellness Information */}
            <SectionHeading number="4" title="Health & Wellness Information" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Depending on your AIRA device, we may collect information such as:
            </p>
            <BulletList
              items={[
                "heart rate",
                "heart-rate variability",
                "blood oxygen / SpO₂",
                "skin temperature",
                "activity",
                "steps",
                "movement",
                "sleep information",
                "estimated calories",
                "physiological stress indicators",
                "electrodermal activity / GSR",
                "other sensor measurements",
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              AIRA Sense and AIRA Life may additionally collect EEG signals and other
              physiological signals supported by the device.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              These measurements may be processed to provide wellness insights, trends,
              summaries, and personalized experiences.
            </p>
            <p className="mt-4 text-xs font-medium text-muted-foreground">
              Important: Unless expressly stated otherwise and supported by appropriate
              regulatory authorization, AIRA's wellness features are not intended to diagnose,
              treat, cure, or prevent disease.
            </p>

            {/* 5. Memories & Personal Information */}
            <SectionHeading number="5" title="Memories & Personal Information" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              AIRA may transform information you choose to preserve into structured personal
              memories. These may include:
            </p>
            <BulletList
              items={[
                "conversations",
                "transcripts",
                "stories",
                "people and relationships",
                "important events",
                "preferences",
                "personal experiences",
                "places",
                "dates",
                "ideas",
                "notes",
                "contextual information",
                "summaries",
                "voice characteristics",
                "other information you intentionally preserve",
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              AIRA may combine these memories with information generated from your device sensors
              to provide contextual experiences. For example, information may be associated with
              a particular period, conversation, or event.
            </p>

            {/* 6. Voice & Personality Preservation */}
            <SectionHeading number="6" title="Voice & Personality Preservation" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              If you activate AIRA's legacy or voice-preservation features, we
              may retain selected voice samples and information necessary to create a
              personalized voice experience. This may include:
            </p>
            <BulletList
              items={[
                "voice recordings selected for preservation",
                "voice characteristics",
                "speech patterns",
                "transcripts",
                "conversational patterns",
                "personality/context information derived from memories",
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              These features will be subject to additional controls and consent requirements.
            </p>

            {/* 7. Memory Preservation & Access */}
            <SectionHeading number="7" title="Memory Preservation & Access" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              AIRA may allow you to designate up to three nominees or other authorized
              individuals who can access the memories and legacy information you choose to
              preserve.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Nominees do not automatically receive unrestricted access to your AIRA account or
              personal information. AIRA will verify the appropriate eligibility and
              authorization before enabling preserved-memory access, and additional
              authentication may be required.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              You remain in control of what you choose to preserve, what remains private, and
              who you allow to access it.
            </p>

            {/* 8. Active, Mute & Block Controls */}
            <SectionHeading number="8" title="Active, Mute & Block Controls" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              AIRA is designed to give you direct control over when the microphone can capture
              information.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm font-medium">ACTIVE</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The device can capture information according to your configured settings.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">MUTE</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Microphone capture is temporarily disabled.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">BLOCK</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  You can designate a period or information as excluded from your personal memory
                  system.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">DELETE</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  You can delete memories or other eligible information through the AIRA
                  application.
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              The exact technical behavior of these controls will depend on the device and
              software version.
            </p>

            {/* 9. Information About Other People */}
            <SectionHeading number="9" title="Information About Other People" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              AIRA may inadvertently capture information about people around you. You are
              responsible for using AIRA lawfully and respectfully and for obtaining any consent
              required by applicable law before recording or processing another person's voice
              or conversation.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              AIRA may use technical measures such as speaker identification to distinguish the
              registered user's voice from other speakers. However, speaker identification
              cannot guarantee that every third-party voice or piece of third-party information
              will be detected or excluded. Users should therefore use MUTE/BLOCK controls when
              recording is inappropriate.
            </p>

            {/* 10. How We Use Information */}
            <SectionHeading number="10" title="How We Use Information" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              We may use information to:
            </p>
            <BulletList
              items={[
                "operate AIRA devices",
                "provide health and wellness features",
                "process speech",
                "create transcripts",
                "create memories",
                "provide AI responses",
                "search personal memories",
                "provide voice features",
                "synchronize devices",
                "maintain accounts",
                "process subscriptions and payments",
                "provide customer support",
                "troubleshoot technical problems",
                "improve reliability",
                "detect fraud and abuse",
                "maintain security",
                "comply with legal obligations",
                "conduct appropriately governed research and development",
                "provide features you explicitly request",
              ]}
            />

            {/* 11. AI Processing */}
            <SectionHeading number="11" title="AI Processing" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              AIRA uses artificial intelligence and machine-learning technologies for functions
              including:
            </p>
            <BulletList
              items={[
                "speech recognition",
                "transcription",
                "summarization",
                "memory extraction",
                "search",
                "personalization",
                "conversational responses",
                "voice processing",
                "contextual analysis",
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Some AI processing may be performed by third-party technology providers. Your
              private memories are not automatically used to train general AI models.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              If AIRA introduces an optional program that allows users to contribute data to
              model training or research, we will provide a separate explanation and obtain
              consent where required.
            </p>

            {/* 12. Third-Party Service Providers */}
            <SectionHeading number="12" title="Third-Party Service Providers" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              AIRA may use carefully selected third-party providers for:
            </p>
            <BulletList
              items={[
                "cloud infrastructure",
                "data storage",
                "speech recognition",
                "AI processing",
                "voice processing",
                "authentication",
                "payments",
                "customer support",
                "security",
                "analytics",
                "communications",
                "shipping and logistics",
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              These providers may process information only as necessary to provide their
              contracted services and subject to appropriate contractual and security
              protections. We do not authorize service providers to use your personal information
              for their own unrelated advertising or commercial purposes.
            </p>

            {/* 13. Payments */}
            <SectionHeading number="13" title="Payments" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Payment information may be processed by third-party payment processors. AIRA
              generally does not need to store your complete payment-card information. Payment
              providers may independently process your information under their own privacy
              policies.
            </p>

            {/* 14. Security */}
            <SectionHeading number="14" title="Security" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              We use reasonable technical and organizational measures designed to protect
              personal information. These may include:
            </p>
            <BulletList
              items={[
                "encryption in transit",
                "encryption at rest",
                "secure authentication",
                "access controls",
                "device-level security",
                "encrypted local storage where appropriate",
                "secure API communication",
                "monitoring",
                "vulnerability testing",
                "security audits",
                "restricted employee access",
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              No system connected to the internet can be guaranteed to be completely secure.
            </p>

            {/* 15. Authentication & Sensitive Access */}
            <SectionHeading number="15" title="Authentication & Sensitive Access" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Certain AIRA information may require additional authentication. Depending on the
              implementation, sensitive areas may require:
            </p>
            <BulletList
              items={[
                "device authentication",
                "biometric authentication supported by your device",
                "passcode",
                "security code",
                "multi-factor authentication",
                "other verification methods",
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Health dashboards may have different access requirements from highly sensitive
              memory and legacy information.
            </p>

            {/* 16. Data Retention */}
            <SectionHeading number="16" title="Data Retention" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              We retain information only for as long as reasonably necessary to:
            </p>
            <BulletList
              items={[
                "provide the service",
                "maintain your memories",
                "maintain your account",
                "meet legal obligations",
                "resolve disputes",
                "enforce agreements",
                "maintain security",
              ]}
            />
            <h4 className="mt-6 text-sm font-medium">Raw Audio</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Raw audio is intended to have a substantially shorter retention period than
              processed memories. Where our architecture permits, raw audio will be deleted
              after the processing necessary to provide the requested feature has been completed.
            </p>
            <h4 className="mt-6 text-sm font-medium">Memories</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Structured memories may remain available until you delete them, your account is
              deleted, the applicable retention period expires, or we are legally required to
              remove them. Specific retention periods may vary by data type and product.
            </p>

            {/* 17. Your Privacy Rights */}
            <SectionHeading number="17" title="Your Privacy Rights" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Depending on where you live, you may have rights to:
            </p>
            <BulletList
              items={[
                "access your personal information",
                "correct inaccurate information",
                "delete information",
                "export or receive a copy of information",
                "withdraw consent",
                "object to certain processing",
                "restrict certain processing",
                "manage marketing preferences",
                "control certain device permissions",
                "request information about how your data is processed",
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              You can exercise applicable rights through the AIRA application or by contacting
              us.
            </p>

            {/* 18. Deleting Your Memories */}
            <SectionHeading number="18" title="Deleting Your Memories" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              AIRA is designed around user-controlled deletion. You may be able to delete:
            </p>
            <BulletList
              items={[
                "individual memories",
                "conversations",
                "voice samples",
                "selected records",
                "health history",
                "your entire account",
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              When you delete information, we will take reasonable steps to remove it from active
              systems and handle backups according to our backup lifecycle. Some information may
              need to be retained where required by law or necessary for legitimate
              security/legal purposes.
            </p>

            {/* 19. Data Export */}
            <SectionHeading number="19" title="Data Export" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Where technically supported, AIRA may allow you to export your personal
              information. Depending on the product and information type, exports may include:
            </p>
            <BulletList
              items={[
                "memories",
                "transcripts",
                "profile information",
                "health/wellness records",
                "voice data",
                "account information",
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We will describe supported export formats within the application.
            </p>

            {/* 20. Location Information */}
            <SectionHeading number="20" title="Location Information" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              AIRA may request location information if a feature requires it. Location may be
              used for:
            </p>
            <BulletList
              items={[
                "contextual memories",
                "timeline features",
                "device functionality",
                "security",
                "product features you explicitly enable",
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              You can manage location permissions through your device settings where supported.
            </p>

            {/* 21. Website Data & Cookies */}
            <SectionHeading number="21" title="Website Data & Cookies" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              When you visit the AIRA website, we may collect technical information such as:
            </p>
            <BulletList
              items={[
                "IP address",
                "browser type",
                "device type",
                "operating system",
                "pages visited",
                "approximate location",
                "referral information",
                "website interaction data",
              ]}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We may use cookies and similar technologies for website functionality, security,
              preferences, analytics, and performance. We will provide appropriate cookie
              controls where required.
            </p>

            {/* 22. Advertising & Tracking */}
            <SectionHeading number="22" title="Advertising & Tracking" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              AIRA does not sell personal information to advertisers. We do not use your private
              memories, health information, or voice data to create advertising profiles. If we
              use analytics or advertising technologies on our public website, those technologies
              will be described in our cookie/consent mechanisms as required by applicable law.
            </p>

            {/* 23. International Data Transfers */}
            <SectionHeading number="23" title="International Data Transfers" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              AIRA may operate internationally. Your information may therefore be processed or
              stored in countries other than the country where you live. Where required, we will
              use legally recognized mechanisms and appropriate safeguards for international
              transfers.
            </p>

            {/* 24. Children's Privacy */}
            <SectionHeading number="24" title="Children's Privacy" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              AIRA is not intended for children below the minimum age permitted under applicable
              law. We do not knowingly collect personal information from children where
              prohibited by applicable law. If we learn that we have collected information in
              violation of applicable children's privacy requirements, we will take appropriate
              steps to delete it.
            </p>

            {/* 26. Changes to This Privacy Policy */}
            <SectionHeading number="25" title="Changes to This Privacy Policy" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              We may update this Privacy Policy as AIRA's products, technology, and legal
              obligations evolve. If we make material changes, we will provide appropriate notice
              and, where required, obtain additional consent. The latest version will always be
              available on the AIRA website.
            </p>

            {/* Closing statement */}
            <div className="mt-20 border-t border-border pt-12">
              <p className="text-lg font-medium tracking-[-0.01em]">
                Your life. Your data. Your control.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                AIRA is built around one simple principle: your memories belong to you.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Your voice, conversations, health information, experiences and memories are
                deeply personal. We don't sell them. We don't use your private memories to train
                general AI models without your explicit permission. And we give you control over
                what AIRA remembers, what it forgets, and who can access your legacy.
              </p>
              <p className="mt-6 text-xs tracking-[0.24em] text-muted-foreground uppercase">
                Private by design. Personal by nature.
              </p>
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
            <Link to="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">© 2026 AIRA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
