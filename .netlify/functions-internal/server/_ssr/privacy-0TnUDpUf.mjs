import { t as logo_default } from "./logo-aw0wNKq8.mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-0TnUDpUf.js
var import_jsx_runtime = require_jsx_runtime();
var shell = "mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16";
var principles = [
	{
		title: "Privacy by design",
		body: "Privacy is considered throughout the design of our devices, software, infrastructure, and AI systems."
	},
	{
		title: "Data minimization",
		body: "We collect and retain only information reasonably necessary to provide the features you choose to use."
	},
	{
		title: "You control what AIRA remembers",
		body: "You can pause, mute, block, delete, and manage memories through the AIRA application."
	},
	{
		title: "Raw audio is not your permanent archive",
		body: "Where technically and operationally possible, raw audio is processed into the information required to provide the service and is deleted according to our applicable retention rules and your settings."
	},
	{
		title: "We do not sell your personal data",
		body: "AIRA does not sell personal information to advertisers or data brokers."
	},
	{
		title: "Your memories are not our AI-training dataset",
		body: "We do not use your private conversations, memories, voice recordings, or health information to train general-purpose AI models without your separate, explicit permission, except where necessary to provide the service or where legally permitted with appropriate safeguards."
	},
	{
		title: "Security is fundamental",
		body: "We use appropriate technical and organizational safeguards to protect your information."
	}
];
function SectionHeading({ number, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
		className: "mt-16 mb-6 text-xl tracking-[-0.02em] sm:text-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mr-3 text-muted-foreground",
			children: [number, "."]
		}), title]
	});
}
function BulletList({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 list-disc space-y-1 pl-6 text-sm leading-relaxed text-muted-foreground sm:text-base",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
	});
}
function Privacy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${shell} flex items-center justify-between py-8`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_default,
							alt: "AIRA logo",
							width: 28,
							height: 28,
							draggable: false,
							className: "h-7 w-7 shrink-0 select-none object-contain"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm leading-none tracking-[0.42em] uppercase",
							children: "AIRA"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-xs tracking-[0.22em] text-muted-foreground uppercase transition-colors hover:text-foreground",
						children: "Back"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "pt-24 pb-16 sm:pt-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: shell,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.3em] text-muted-foreground uppercase",
							children: "Legal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-10 max-w-[20ch] text-[clamp(2.2rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.03em]",
							children: "AIRA Privacy Policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm text-muted-foreground",
							children: "Last updated: August 2026"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "pb-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${shell} max-w-[860px] border-t border-border pt-16`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: "At AIRA, we believe your memories belong to you."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: "AIRA is designed to help you understand your health, remember what matters, and preserve your stories, voice, experiences, and personal memories."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: "Because AIRA may process highly personal information, including voice recordings, conversations, memories, wellness information, biometric information, and, for certain devices, EEG signals, we design our services around privacy, security, transparency, and user control."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: "This Privacy Policy explains what information AIRA collects, how we use it, how we protect it, when it may be shared, and the choices available to you."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "1",
							title: "Our Privacy Principles"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-medium tracking-[-0.01em]",
							children: "Your life. Your data. Your control."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: "AIRA follows these principles:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 space-y-6",
							children: principles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: p.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted-foreground",
								children: p.body
							})] }, p.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "2",
							title: "What Is AIRA?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground sm:text-base",
							children: "AIRA includes wearable devices, mobile applications, cloud services, AI services, websites, and related products."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base",
							children: "Depending on the AIRA product and features you use, AIRA may collect information from:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
							"AIRA Loop",
							"AIRA Sense",
							"AIRA Life",
							"the AIRA mobile application",
							"your AIRA account",
							"AIRA's website",
							"connected devices and services",
							"information you voluntarily provide"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs text-muted-foreground",
							children: "Not every device collects every category of information."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "3",
							title: "Information We Collect"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 text-base font-medium",
							children: "A. Account Information"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "We may collect:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
							"name",
							"email address",
							"phone number",
							"date of birth where required",
							"country or region",
							"profile information",
							"device information",
							"subscription information"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-8 text-base font-medium",
							children: "B. Voice & Audio Data"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: "When the microphone is enabled, AIRA may temporarily capture audio containing your voice and surrounding sounds. Depending on your settings and the functionality you use, this information may be processed to:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
							"identify speech",
							"create transcripts",
							"identify the primary user's voice",
							"organize conversations",
							"create summaries",
							"create personal memories",
							"answer questions about previously preserved experiences",
							"provide other AIRA features"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mt-6 text-sm font-medium",
							children: "Raw Audio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: "AIRA is designed around a local-first capture architecture. Where supported, audio may initially be stored temporarily on the device rather than continuously transmitted to the cloud. Audio may subsequently be transferred for processing when the device synchronizes according to the product's operating mode. After the necessary processing has been completed, raw audio may be deleted according to our retention architecture, your settings, and applicable legal requirements."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: "We will clearly describe the actual retention period and deletion behavior of each product before launch."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "4",
							title: "Health & Wellness Information"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "Depending on your AIRA device, we may collect information such as:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
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
							"other sensor measurements"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "AIRA Sense and AIRA Life may additionally collect EEG signals and other physiological signals supported by the device."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "These measurements may be processed to provide wellness insights, trends, summaries, and personalized experiences."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs font-medium text-muted-foreground",
							children: "Important: Unless expressly stated otherwise and supported by appropriate regulatory authorization, AIRA's wellness features are not intended to diagnose, treat, cure, or prevent disease."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "5",
							title: "Memories & Personal Information"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "AIRA may transform information you choose to preserve into structured personal memories. These may include:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
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
							"other information you intentionally preserve"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "AIRA may combine these memories with information generated from your device sensors to provide contextual experiences. For example, information may be associated with a particular period, conversation, or event."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "6",
							title: "Voice & Personality Preservation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "If you activate AIRA's legacy or voice-preservation features, we may retain selected voice samples and information necessary to create a personalized voice experience. This may include:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
							"voice recordings selected for preservation",
							"voice characteristics",
							"speech patterns",
							"transcripts",
							"conversational patterns",
							"personality/context information derived from memories"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "These features will be subject to additional controls and consent requirements."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "7",
							title: "Memory Preservation & Access"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "AIRA may allow you to designate up to three nominees or other authorized individuals who can access the memories and legacy information you choose to preserve."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "Nominees do not automatically receive unrestricted access to your AIRA account or personal information. AIRA will verify the appropriate eligibility and authorization before enabling preserved-memory access, and additional authentication may be required."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "You remain in control of what you choose to preserve, what remains private, and who you allow to access it."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "8",
							title: "Active, Mute & Block Controls"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "AIRA is designed to give you direct control over when the microphone can capture information."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "ACTIVE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "The device can capture information according to your configured settings."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "MUTE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Microphone capture is temporarily disabled."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "BLOCK"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "You can designate a period or information as excluded from your personal memory system."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "DELETE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "You can delete memories or other eligible information through the AIRA application."
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs text-muted-foreground",
							children: "The exact technical behavior of these controls will depend on the device and software version."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "9",
							title: "Information About Other People"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "AIRA may inadvertently capture information about people around you. You are responsible for using AIRA lawfully and respectfully and for obtaining any consent required by applicable law before recording or processing another person's voice or conversation."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "AIRA may use technical measures such as speaker identification to distinguish the registered user's voice from other speakers. However, speaker identification cannot guarantee that every third-party voice or piece of third-party information will be detected or excluded. Users should therefore use MUTE/BLOCK controls when recording is inappropriate."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "10",
							title: "How We Use Information"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "We may use information to:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
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
							"provide features you explicitly request"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "11",
							title: "AI Processing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "AIRA uses artificial intelligence and machine-learning technologies for functions including:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
							"speech recognition",
							"transcription",
							"summarization",
							"memory extraction",
							"search",
							"personalization",
							"conversational responses",
							"voice processing",
							"contextual analysis"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "Some AI processing may be performed by third-party technology providers. Your private memories are not automatically used to train general AI models."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "If AIRA introduces an optional program that allows users to contribute data to model training or research, we will provide a separate explanation and obtain consent where required."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "12",
							title: "Third-Party Service Providers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "AIRA may use carefully selected third-party providers for:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
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
							"shipping and logistics"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "These providers may process information only as necessary to provide their contracted services and subject to appropriate contractual and security protections. We do not authorize service providers to use your personal information for their own unrelated advertising or commercial purposes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "13",
							title: "Payments"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "Payment information may be processed by third-party payment processors. AIRA generally does not need to store your complete payment-card information. Payment providers may independently process your information under their own privacy policies."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "14",
							title: "Security"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "We use reasonable technical and organizational measures designed to protect personal information. These may include:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
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
							"restricted employee access"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "No system connected to the internet can be guaranteed to be completely secure."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "15",
							title: "Authentication & Sensitive Access"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "Certain AIRA information may require additional authentication. Depending on the implementation, sensitive areas may require:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
							"device authentication",
							"biometric authentication supported by your device",
							"passcode",
							"security code",
							"multi-factor authentication",
							"other verification methods"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "Health dashboards may have different access requirements from highly sensitive memory and legacy information."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "16",
							title: "Data Retention"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "We retain information only for as long as reasonably necessary to:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
							"provide the service",
							"maintain your memories",
							"maintain your account",
							"meet legal obligations",
							"resolve disputes",
							"enforce agreements",
							"maintain security"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mt-6 text-sm font-medium",
							children: "Raw Audio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: "Raw audio is intended to have a substantially shorter retention period than processed memories. Where our architecture permits, raw audio will be deleted after the processing necessary to provide the requested feature has been completed."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mt-6 text-sm font-medium",
							children: "Memories"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: "Structured memories may remain available until you delete them, your account is deleted, the applicable retention period expires, or we are legally required to remove them. Specific retention periods may vary by data type and product."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "17",
							title: "Your Privacy Rights"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "Depending on where you live, you may have rights to:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
							"access your personal information",
							"correct inaccurate information",
							"delete information",
							"export or receive a copy of information",
							"withdraw consent",
							"object to certain processing",
							"restrict certain processing",
							"manage marketing preferences",
							"control certain device permissions",
							"request information about how your data is processed"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "You can exercise applicable rights through the AIRA application or by contacting us."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "18",
							title: "Deleting Your Memories"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "AIRA is designed around user-controlled deletion. You may be able to delete:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
							"individual memories",
							"conversations",
							"voice samples",
							"selected records",
							"health history",
							"your entire account"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "When you delete information, we will take reasonable steps to remove it from active systems and handle backups according to our backup lifecycle. Some information may need to be retained where required by law or necessary for legitimate security/legal purposes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "19",
							title: "Data Export"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "Where technically supported, AIRA may allow you to export your personal information. Depending on the product and information type, exports may include:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
							"memories",
							"transcripts",
							"profile information",
							"health/wellness records",
							"voice data",
							"account information"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "We will describe supported export formats within the application."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "20",
							title: "Location Information"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "AIRA may request location information if a feature requires it. Location may be used for:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
							"contextual memories",
							"timeline features",
							"device functionality",
							"security",
							"product features you explicitly enable"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "You can manage location permissions through your device settings where supported."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "21",
							title: "Website Data & Cookies"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "When you visit the AIRA website, we may collect technical information such as:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: [
							"IP address",
							"browser type",
							"device type",
							"operating system",
							"pages visited",
							"approximate location",
							"referral information",
							"website interaction data"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "We may use cookies and similar technologies for website functionality, security, preferences, analytics, and performance. We will provide appropriate cookie controls where required."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "22",
							title: "Advertising & Tracking"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "AIRA does not sell personal information to advertisers. We do not use your private memories, health information, or voice data to create advertising profiles. If we use analytics or advertising technologies on our public website, those technologies will be described in our cookie/consent mechanisms as required by applicable law."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "23",
							title: "International Data Transfers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "AIRA may operate internationally. Your information may therefore be processed or stored in countries other than the country where you live. Where required, we will use legally recognized mechanisms and appropriate safeguards for international transfers."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "24",
							title: "Children's Privacy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "AIRA is not intended for children below the minimum age permitted under applicable law. We do not knowingly collect personal information from children where prohibited by applicable law. If we learn that we have collected information in violation of applicable children's privacy requirements, we will take appropriate steps to delete it."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							number: "25",
							title: "Changes to This Privacy Policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "We may update this Privacy Policy as AIRA's products, technology, and legal obligations evolve. If we make material changes, we will provide appropriate notice and, where required, obtain additional consent. The latest version will always be available on the AIRA website."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-20 border-t border-border pt-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg font-medium tracking-[-0.01em]",
									children: "Your life. Your data. Your control."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-sm leading-relaxed text-muted-foreground",
									children: "AIRA is built around one simple principle: your memories belong to you."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm leading-relaxed text-muted-foreground",
									children: "Your voice, conversations, health information, experiences and memories are deeply personal. We don't sell them. We don't use your private memories to train general AI models without your explicit permission. And we give you control over what AIRA remembers, what it forgets, and who can access your legacy."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-xs tracking-[0.24em] text-muted-foreground uppercase",
									children: "Private by design. Personal by nature."
								})
							]
						})
					]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${shell} flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm tracking-[0.42em] uppercase",
							children: "AIRA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex gap-8 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/use-cases",
									className: "transition-colors hover:text-foreground",
									children: "Use Cases"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/privacy",
									className: "transition-colors hover:text-foreground",
									children: "Privacy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "transition-colors hover:text-foreground",
									children: "Home"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "© 2026 AIRA. All rights reserved."
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Privacy as component };
