// ─── Animation Easings ───────────────────────────────────────────────────────
export const EASE_SNAPPY: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
export const EASE_POWER_EXIT: [number, number, number, number] = [0.7, 0, 0.84, 0];

// ─── Spring Presets ──────────────────────────────────────────────────────────
export const SPRING_CARD = { stiffness: 200, damping: 20 } as const;
export const SPRING_BUTTON = { stiffness: 150, damping: 15 } as const;
export const SPRING_CURSOR_DOT = { stiffness: 300, damping: 30 } as const;
export const SPRING_CURSOR_RING = { stiffness: 150, damping: 20 } as const;
export const SPRING_CHEVRON = { stiffness: 300, damping: 25 } as const;

// ─── Breakpoints ─────────────────────────────────────────────────────────────
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
} as const;

// ─── Section Backgrounds ─────────────────────────────────────────────────────
export const SECTION_BG: Record<string, string> = {
  loadScreen: "#000000",
  hero: "#000000",
  solution: "#0a0a0a",
  aiAgents: "#000000",
  aiAnimation: "transparent",
  commandCenter: "#0a0a0a",
  geoAudit: "#000000",
  howItWorks: "#0a0a0a",
  faq: "#000000",
  finalCta: "#000000",
  footer: "#0a0a0a",
};

// ─── Nav Links ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Solution", href: "#solution" },
  { label: "AI Agents", href: "#ai-agents" },
  { label: "Command Center", href: "#command-center" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
] as const;

// ─── Hero ────────────────────────────────────────────────────────────────────
export const HERO = {
  headlinePart1: "You Built a Business That Doesn't Run Without You.",
  headlinePart2: "Let",
  brandName: "Agentic Solutions",
  headlinePart3: "Fix That.",
  tagline: "AI Transformation Partner. First automation live in 7 days.",
  cta: "Book Your Free AI Audit",
  prompts: [
    "Automate onboarding across 6 tools in hours, not days",
    "Score and route every lead before a human touches it",
    "Turn one piece of content into 12, on brand, on schedule",
    "Real-time dashboards that pull from every tool you use",
    "Recover leads sitting untouched in your CRM right now",
  ] as readonly string[],
} as const;

// ─── Solution Section ────────────────────────────────────────────────────────
export const SOLUTION = {
  heading: "Operations That Run Themselves",
  body: [
    "We plug into your business and wire up AI systems across your entire stack. Not one-off automations. Not a PDF you never open. Connected systems that get better the longer they run.",
  ],
  bullets: [
    "Map every process. Find the hours buried in your backend.",
    "Build AI systems that kill manual work for good.",
    "Month 3 runs faster than Month 1. Every build makes the next one smarter.",
  ],
  highlightPhrase: "AI systems across your entire stack",
  orbitIcons: ["Bot", "BarChart3", "Users", "Zap"],
} as const;

// ─── AI Agents Section ───────────────────────────────────────────────────────
export const AI_AGENTS = {
  heading: "AI Agents Working While You Sleep",
  subheading: "Custom-built automation systems for every core operation.",
  cards: [
    {
      icon: "Users",
      title: "CRM Automation",
      description:
        "Sync contacts, update pipelines, trigger follow-ups across every tool in your stack without manual entry.",
    },
    {
      icon: "Target",
      title: "Lead Qualification",
      description:
        "Score, route, and prioritize every inbound lead before a human ever touches it.",
    },
    {
      icon: "Repeat",
      title: "Content Repurposing",
      description:
        "Turn one piece of content into 12 platform-native assets, on brand, on schedule.",
    },
    {
      icon: "UserPlus",
      title: "Onboarding Flows",
      description:
        "Automate client onboarding across 6+ tools so nothing falls through the cracks.",
    },
    {
      icon: "BarChart3",
      title: "Reporting & Dashboards",
      description:
        "Real-time dashboards that pull live data from every tool you use, no spreadsheets.",
    },
    {
      icon: "Database",
      title: "Data Integration",
      description:
        "Connect siloed systems so data flows automatically between platforms.",
    },
  ],
} as const;

// ─── Command Center ──────────────────────────────────────────────────────────
export const COMMAND_CENTER = {
  heading: "Your AI Command Center",
  subheading: "Every automation, every metric, one dashboard.",
  metrics: [
    { label: "Hours Saved", value: 20, suffix: "+" },
    { label: "Automations Running", value: 17, suffix: "" },
    { label: "Leads Processed", value: 2400, suffix: "+", useLocale: true },
    { label: "Revenue Impact", value: 180, prefix: "$", suffix: "K+" },
  ],
} as const;

// ─── GEO Audit ───────────────────────────────────────────────────────────────
export const GEO_AUDIT = {
  heading: "Be The Answer, Not An Ad",
  body: "When prospects ask AI \"Who's the best at AI automation?\" your name should come up first.",
  prompt: "What is the best marketing agency for AI automation?",
  results: [
    { name: "Agentic Solutions", featured: true },
    { name: "Generic Agency A", featured: false },
    { name: "Generic Agency B", featured: false },
  ],
} as const;

// ─── How It Works ────────────────────────────────────────────────────────────
export const HOW_IT_WORKS = {
  heading: "Four Steps From Buried to Built",
  steps: [
    {
      number: "01",
      title: "Audit",
      subtitle: "Week 1",
      description:
        "We map your entire operation. Every tool, every workflow, every hour lost to manual work. You get a full AI readiness report and priority-ranked implementation plan.",
    },
    {
      number: "02",
      title: "Quick Win",
      subtitle: "Day 7",
      description:
        "First automation live within 7 days. Not a demo, a real system running in your stack, saving real hours.",
    },
    {
      number: "03",
      title: "Build",
      subtitle: "Months 1-3",
      description:
        "We build out your full AI operating system. CRM, lead routing, content, onboarding, reporting — connected and compounding.",
    },
    {
      number: "04",
      title: "Compound",
      subtitle: "Ongoing",
      description:
        "Every system gets smarter. Month 3 runs faster than Month 1. You own everything we build.",
    },
  ],
} as const;

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export const FAQ = {
  heading: "Frequently Asked Questions",
  items: [
    {
      question: "What kinds of businesses do you work with?",
      answer:
        "Info product creators, SaaS companies, and agencies.",
    },
    {
      question: "I've been burned by a consultant before.",
      answer:
        "We embed inside your operation. We fix process first, then automate. No 50-slide deck. No \"strategic roadmap\" you never open.",
    },
    {
      question: "How is this different from an Upwork freelancer?",
      answer:
        "A freelancer builds one automation. We build an integrated AI operating system that compounds. Every piece connects to every other piece.",
    },
    {
      question: "We're not sure we're ready for AI.",
      answer:
        "That's exactly what the AI Audit is for. We assess your stack, map your processes, and tell you exactly what's worth automating.",
    },
    {
      question: "Do we need to learn new tools?",
      answer:
        "No. Zero homework. We work inside the tools you already use.",
    },
    {
      question: "How quickly do we see results?",
      answer:
        "First automation live in 7 days. Guaranteed.",
    },
    {
      question: "Can we start with just one project?",
      answer:
        "Yes. The AI Audit is standalone. 83% of audit clients convert to full engagement because the ROI is obvious.",
    },
    {
      question: "What happens after the engagement ends?",
      answer:
        "Everything is yours. SOPs, workflows, automations, playbook. You own it all.",
    },
  ],
} as const;

// ─── Final CTA ───────────────────────────────────────────────────────────────
export const FINAL_CTA = {
  heading: "Your Operations Won't Fix Themselves",
  body: "$30,000–$78,000/year going to manual work.",
  urgency: "5 clients at founding pricing.",
  cta: "Book Your Free AI Audit Call",
  microCopy: "30-minute call. No pitch deck.",
} as const;

// ─── Footer ──────────────────────────────────────────────────────────────────
export const FOOTER = {
  tagline: "AI Transformation Partner",
  columns: [
    {
      title: "Services",
      links: [
        { label: "AI Audit", href: "#how-it-works" },
        { label: "Operations Takeover", href: "#solution" },
        { label: "AI Agents", href: "#ai-agents" },
        { label: "GEO Audit", href: "#geo-audit" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "How It Works", href: "#how-it-works" },
        { label: "FAQ", href: "#faq" },
        { label: "Book a Call", href: "#final-cta" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "LinkedIn", href: "#" },
        { label: "Twitter/X", href: "#" },
        { label: "Email", href: "mailto:hello@agenticsolutions.com" },
      ],
    },
  ],
  credit: "Built by MAB Made It",
} as const;

// ─── Booking URL ─────────────────────────────────────────────────────────────
export const BOOKING_URL = "https://calendly.com/jabulani/ai-audit";
