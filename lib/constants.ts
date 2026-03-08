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
  trustedBy: "#0a0a0a",
  problem: "#000000",
  solution: "#0a0a0a",
  aiAgents: "#000000",
  aiAnimation: "transparent",
  commandCenter: "#0a0a0a",
  geoAudit: "#000000",
  howItWorks: "#0a0a0a",
  valueStack: "#000000",
  proof: "#0a0a0a",
  pricing: "#000000",
  guarantee: "#0a0a0a",
  faq: "#000000",
  finalCta: "#000000",
  footer: "#0a0a0a",
};

// ─── Nav Links ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

// ─── Hero ────────────────────────────────────────────────────────────────────
export const HERO = {
  badge: "AI Transformation Partner \u00B7 Only 5 Founding Spots",
  headline: "You Built a Business That Can\u2019t Run Without You.",
  morphingWords: ["Let Agentic Solutions Fix That.", "We\u2019ll Automate It.", "Time to Scale.", "Let AI Take Over."],
  subheadline:
    "We take over your operations, rebuild them with AI, and hand you back 20+ hours a week. For info product creators, SaaS founders, and agency owners doing $500K\u2013$5M who are tired of being the most expensive employee on their own payroll.",
  ctaPrimary: "Book Your Free AI Audit Call",
  ctaSecondary: "See How It Works",
  supportingLine:
    "First automation live in 7 days. Full operational audit in Week 1. Only taking 5 clients.",
  stats: [
    { value: 20, suffix: "+", unit: "hrs/week saved" },
    { value: 7, suffix: "", unit: "days to first result" },
    { value: 83, suffix: "%", unit: "audit\u2192dev conversion" },
    { value: 180, prefix: "$", suffix: "K", unit: "recovered" },
  ],
} as const;

// ─── Trusted By ──────────────────────────────────────────────────────────────
export const TRUSTED_BY = {
  heading: "As Featured In",
  logos: [
    "Partner One",
    "Partner Two",
    "Partner Three",
    "Partner Four",
    "Partner Five",
    "Partner Six",
  ],
} as const;

// ─── Problem Section ─────────────────────────────────────────────────────────
export const PROBLEM = {
  heading: "You Built a Business That Can\u2019t Run Without You",
  cards: [
    {
      icon: "Clock",
      title: "Manual Ops Bottleneck",
      body: "Your team spends 10\u201320 hours a week compiling reports, copying data between tools, and doing work that doesn\u2019t require a human brain. At blended rates, that\u2019s $30,000\u2013$78,000 a year in labor on tasks a system should handle.",
      highlight: "$30,000\u2013$78,000/year",
      counterValue: 78000,
      counterPrefix: "$",
    },
    {
      icon: "Layers",
      title: "Tool Chaos",
      body: "You\u2019re paying for 12+ tools that don\u2019t talk to each other. The average business wastes $89,000 a year on redundant or underused SaaS \u2014 about $5,500 per employee, with 50% of licenses sitting unused. Your team isn\u2019t using software. They\u2019re babysitting it.",
      highlight: "$89,000/year wasted",
      counterValue: 89000,
      counterPrefix: "$",
    },
    {
      icon: "TrendingDown",
      title: "Revenue Leaking Out the Back",
      body: "Your average lead response time is somewhere around 42 hours. That\u2019s the industry norm. It\u2019s also why 78% of buyers choose whoever responds first \u2014 and it\u2019s not you. Dead leads sit in your CRM untouched. One client recovered $80,000 in a single month just by reactivating leads nobody was following up with.",
      highlight: "42 hours avg response time",
      counterValue: 42,
      counterSuffix: "hrs",
    },
    {
      icon: "GitBranch",
      title: "Scaling Multiplies the Problem",
      body: "Every new client, cohort, or team member multiplies the same manual work. You\u2019re not scaling the business. You\u2019re scaling the bottleneck.",
      highlight: "bottleneck",
    },
  ],
} as const;

// ─── Solution Section ────────────────────────────────────────────────────────
export const SOLUTION = {
  heading: "What If Your Operations Ran Themselves?",
  body: [
    "Agentic Solutions is an AI Transformation Partner. Not a chatbot agency. Not a one-off build shop. Not a consultant who hands you a report and disappears.",
    "We embed into your business, map every process, find the hours hiding in your backend, and build AI systems that eliminate manual work permanently. CRM automation, lead processing, onboarding flows, reporting dashboards, content workflows \u2014 whatever\u2019s eating your team\u2019s time, we build the system that replaces it.",
    "The difference: we don\u2019t sell isolated automations. We build integrated AI operating systems that compound over time. Every month, the systems get smarter. Every engagement produces reusable assets that make the next one faster. Your operations don\u2019t just improve \u2014 they accelerate.",
  ],
  highlightPhrase: "integrated AI operating systems",
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
        "Contacts scored, tagged, and routed automatically. Follow-ups triggered by behavior, not memory.",
    },
    {
      icon: "Target",
      title: "Lead Qualification",
      description:
        "Every inbound lead scored, enriched, and prioritized before a human touches it. Response time drops from days to minutes.",
    },
    {
      icon: "Repeat",
      title: "Content Repurposing",
      description:
        "One piece of content becomes 12. Podcast to blog to social to email \u2014 automated, on-brand, on-schedule.",
    },
    {
      icon: "UserPlus",
      title: "Onboarding Flows",
      description:
        "New clients or students onboarded in hours, not days. Every step tracked, every handoff automated.",
    },
    {
      icon: "BarChart3",
      title: "Reporting & Dashboards",
      description:
        "Real-time dashboards that pull from every tool. No more Monday morning spreadsheet assembly.",
    },
    {
      icon: "Database",
      title: "Data Integration",
      description:
        "Connect your entire stack. Eliminate manual data entry between tools. Single source of truth.",
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
  body: "When prospects ask AI \u201CWho\u2019s the best at AI automation?\u201D \u2014 your name should come up first. Our GEO Audit maps how AI models currently see your brand, identifies gaps, and builds the content strategy that puts you in the answer.",
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
        "We map every process, every tool handoff, every manual task across your business. No guessing. We find the exact hours and dollars hiding in your operations. Full process mapping, stakeholder interviews, automation ROI scorecard, and a 90-day prioritized roadmap.",
    },
    {
      number: "02",
      title: "Quick Win",
      subtitle: "Day 7",
      description:
        "Before the audit report is even finalized, your first automation is live and saving time. We target the highest-ROI, lowest-complexity opportunity first. This is how you know we\u2019re real \u2014 results before the first invoice clears.",
    },
    {
      number: "03",
      title: "Build",
      subtitle: "Months 1\u20133",
      description:
        "Up to 5 custom automations per month. CRM integrations, lead qualification systems, onboarding flows, reporting pipelines, content repurposing workflows. Every build comes with SOPs and walkthroughs so your team actually understands what\u2019s running.",
    },
    {
      number: "04",
      title: "Compound",
      subtitle: "Ongoing",
      description:
        "We build a living context profile for your business \u2014 a RACP \u2014 that documents every system, workflow, and insight. It compounds over time. Month 3 delivers more value than Month 1 because every previous build informs the next one. Your operations don\u2019t just stabilize. They accelerate.",
    },
  ],
} as const;

// ─── Value Stack ─────────────────────────────────────────────────────────────
export const VALUE_STACK = {
  heading: "Everything Inside the AI Operations Takeover",
  deliverables: [
    {
      name: "AI Operations Audit & Roadmap",
      description:
        "Complete process mapping, stakeholder interviews, automation ROI scorecard, tech stack assessment, 90-day prioritized plan. Done in Week 1.",
      value: 5000,
    },
    {
      name: "Custom AI System Builds",
      description:
        "Up to 5 automations/month \u2014 CRM, lead processing, marketing, onboarding, data workflows. SOPs and Loom walkthroughs for every build. First one live in 7 days.",
      value: 10000,
    },
    {
      name: "Strategic AI Consulting",
      description:
        "2 strategy calls per month (recorded). Slack and email access. Quarterly AI landscape briefing. Roadmap updates as your business evolves.",
      value: 3000,
      valueSuffix: "/mo",
    },
    {
      name: "Business RACP",
      description:
        "A living context profile for YOUR business. Every system, prompt, workflow, and insight documented and compounding. No other firm builds this.",
      value: 2500,
    },
    {
      name: "Ongoing Monitoring & Optimization",
      description:
        "Automated monitoring of every deployed system. Monthly ROI dashboard. Priority support. Proactive optimization before things break.",
      value: 1500,
      valueSuffix: "/mo",
    },
  ],
  totalValue: 25491,
  bonuses: [
    {
      name: "Quick Win Playbook",
      description:
        "5 pre-built automation templates for common ops pain points. Replaces your $2K/mo VA on Day 1.",
      value: 997,
    },
    {
      name: "AI Marketing Arsenal",
      description:
        "AI copywriting system calibrated to your brand voice. Content repurposing workflow. Competitive intel automation.",
      value: 1997,
    },
    {
      name: "Team AI Readiness Kit",
      description:
        "Transition guide, role-specific AI training (async), change management framework so your team actually adopts what we build.",
      value: 497,
    },
  ],
} as const;

// ─── Proof / Case Studies ────────────────────────────────────────────────────
export const PROOF = {
  heading: "The Numbers From Real Engagements",
  caseStudies: [
    {
      number: "01",
      title: "Onboarding Automation",
      narrative:
        "A $200K/month info product business was spending 7 hours every week running a 14-step onboarding checklist across 6 tools. Three people involved. Students still fell through cracks. We mapped the process, found a broken handoff at step 7 that nobody had documented, and rebuilt the entire flow.",
      metrics: [
        { label: "Revenue Generated", value: 180, prefix: "$", suffix: "K" },
        { label: "Onboarding Time", before: "4 days", after: "6 hours" },
        { label: "Enrollment Scale", before: "20/day", after: "200+/day" },
      ],
    },
    {
      number: "02",
      title: "SaaS Stack Consolidation",
      narrative:
        "3 people spent 3 hours every morning pulling data from 3 tools into a Google Sheet. Eleven more hours a week manually copying data between Kajabi, CRM, and ClickUp. 23 manual data transfer points per week. We connected the existing stack instead of replacing it.",
      metrics: [
        { label: "Hours/Week Freed", value: 26, suffix: "hrs" },
        { label: "SaaS Costs Saved", value: 16800, prefix: "$", suffix: "/yr" },
        { label: "Data Entry Errors", before: "5\u20138/week", after: "Zero" },
      ],
    },
    {
      number: "03",
      title: "20 Hours Recovered",
      narrative:
        "A $2M/year info product founder working 60-hour weeks. Our audit found 31 hours of manual work nobody was counting \u2014 spread across CRM data entry, hand-written follow-up emails, report pulling from 3 tools, and manual client onboarding. We automated all four categories in under 3 weeks.",
      metrics: [
        { label: "Hours/Week Recovered", value: 20, suffix: "+" },
        { label: "Revenue From Freed Time", value: 180, prefix: "$", suffix: "K" },
        { label: "Annual Labor Savings", value: 78000, prefix: "$", suffix: "" },
      ],
    },
  ],
} as const;

// ─── Pricing ─────────────────────────────────────────────────────────────────
export const PRICING = {
  heading: "Choose How Deep You Want to Go",
  foundingNote:
    "The first 3 clients lock in these prices for life. After the first 5 clients, pricing increases $500/month per tier. This page won\u2019t always show these numbers.",
  tiers: [
    {
      name: "AI Audit",
      price: 3500,
      period: "one-time",
      featured: false,
      description: "For businesses that want clarity before commitment.",
      features: [
        "Full process mapping",
        "Stakeholder interviews",
        "Automation ROI scorecard",
        "Tech stack assessment",
        "90-day prioritized roadmap",
        "1 strategy call",
      ],
      cta: "Start With The Audit",
      note: "83% of audit clients move to ongoing engagement.",
    },
    {
      name: "The AI Operations Takeover",
      price: 5000,
      period: "/month",
      commitment: "3-month minimum",
      featured: true,
      description: "For businesses ready to transform now.",
      features: [
        "Everything in Tier 1 (Month 1)",
        "Up to 5 custom automations/month",
        "Bi-monthly strategy calls",
        "Monitoring dashboards",
        "Quick Win Playbook",
        "AI Marketing Arsenal",
        "Team AI Readiness Kit",
      ],
      cta: "Book Your AI Audit Call",
      note: "$5,000/month for a $25,491 value stack.",
    },
    {
      name: "The Full Partnership",
      price: 8500,
      period: "/month",
      commitment: "6-month minimum",
      featured: false,
      description: "For businesses scaling aggressively.",
      features: [
        "Everything in Tier 2",
        "Unlimited builds",
        "Weekly strategy calls",
        "Full RACP development",
        "Quarterly AI landscape briefings",
        "Priority response",
        "First access to new capabilities",
      ],
      cta: "Apply For Partnership",
      note: "An embedded AI transformation partner, not a vendor.",
    },
  ],
} as const;

// ─── Guarantee ───────────────────────────────────────────────────────────────
export const GUARANTEE = {
  heading: "Two Guarantees. Zero Risk.",
  guarantees: [
    {
      number: "1",
      title: "The 90-Day Promise",
      body: "Get 20 hours a week back within 90 days \u2014 or we work for free until you do. Not a refund. We keep working at no charge until you hit the target. That\u2019s how confident we are in what we build.",
      highlight: "20 hours a week",
      conditions:
        "Conditions: Tier 2 or 3 for 90 days. You implement the automations we deploy. You show up to strategy calls. You give us the access we need. We measure results together with a joint before/after operational time audit.",
    },
    {
      number: "2",
      title: "The 7-Day Quick Win",
      body: "If we don\u2019t get at least one automation live and saving you time within 7 days of starting, your first month is free. Not next month. Not a credit. This month \u2014 free.",
      highlight: "7 days",
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
        "Info product creators, SaaS founders, and agency owners doing $500K\u2013$5M in revenue with 3\u201315 employees. You\u2019ve probably already tried Zapier or Make and hit the ceiling. You know AI can help \u2014 you just haven\u2019t implemented it in a way that actually compounds.",
    },
    {
      question: "What if we\u2019ve been burned by a consultant before?",
      answer:
        "80% of AI projects fail. Most fail because the consultant gave you a report and disappeared, or automated a broken process. We don\u2019t do that. We embed into your operations, fix the process first, then automate the fixed version. And our guarantee backs it up: 20 hours a week or we work for free until you get there.",
    },
    {
      question: "How is this different from hiring a freelancer on Upwork?",
      answer:
        "A freelancer builds you one automation and leaves. We build an integrated AI operating system for your entire business \u2014 CRM, onboarding, reporting, lead processing, content \u2014 with every piece connected and compounding. Plus strategic consulting, monitoring, and optimization. You get a partner, not a vendor.",
    },
    {
      question: "What if we\u2019re not sure we\u2019re ready for this?",
      answer:
        "That\u2019s exactly what the AI Audit is for. $3,500, no commitment. We map your operations, identify the hours and dollars hiding in your backend, and give you a prioritized roadmap. If the numbers don\u2019t justify going further, you\u2019ve still got the most thorough operational assessment anyone\u2019s ever done for your business.",
    },
    {
      question: "Do we need to learn new tools?",
      answer:
        "No. Zero homework. We work with the tools you already have \u2014 or recommend better ones and handle the migration ourselves. Every build comes with SOPs and video walkthroughs. Your team doesn\u2019t learn to build automations. They learn to use the systems we build.",
    },
    {
      question: "How quickly do we see results?",
      answer:
        "First automation live within 7 days (guaranteed \u2014 or your first month is free). Full operational audit completed in Week 1. Most clients see measurable time savings within the first 2 weeks. The 90-day mark is when compounding kicks in and the full transformation is visible.",
    },
    {
      question: "Can we start with just one project instead of a retainer?",
      answer:
        "The AI Audit (Tier 1) is a standalone engagement. $3,500, no strings. We deliver the roadmap and you decide what happens next. 83% of audit clients move to ongoing engagement because the ROI case makes itself once you see the numbers.",
    },
    {
      question: "What happens after the engagement ends?",
      answer:
        "Everything we build is yours. SOPs, workflows, dashboards, documentation \u2014 all of it stays in your business. The RACP (your living business context profile) is yours to keep. Systems continue running. You can bring us back for optimization anytime.",
    },
  ],
} as const;

// ─── Final CTA ───────────────────────────────────────────────────────────────
export const FINAL_CTA = {
  heading: "Your Operations Won\u2019t Fix Themselves",
  body: "Right now, somewhere between $30,000 and $78,000 a year is being burned on manual work your team shouldn\u2019t be doing. You know it. You\u2019ve known it for a while. The question isn\u2019t whether to fix it. It\u2019s when.",
  urgency:
    "We\u2019re taking on 5 clients at founding pricing. Once those spots fill, prices go up $500/month per tier and don\u2019t come back down. If this page is live, at least one spot is still open.",
  cta: "Book Your Free AI Audit Call",
  microCopy:
    "30-minute call. No pitch deck. We\u2019ll walk through your operations and show you exactly where the hours are hiding \u2014 whether you work with us or not.",
} as const;

// ─── Footer ──────────────────────────────────────────────────────────────────
export const FOOTER = {
  tagline: "AI Transformation Partner",
  columns: [
    {
      title: "Services",
      links: [
        { label: "AI Audit", href: "#pricing" },
        { label: "Operations Takeover", href: "#pricing" },
        { label: "Full Partnership", href: "#pricing" },
        { label: "GEO Audit", href: "#geo-audit" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "How It Works", href: "#how-it-works" },
        { label: "Case Studies", href: "#proof" },
        { label: "FAQ", href: "#faq" },
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
