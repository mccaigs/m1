import {
  Blocks,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  FileStack,
  Inbox,
  Lightbulb,
  LayoutDashboard,
  MessagesSquare,
  MonitorCheck,
  Wrench,
} from "lucide-react";

export const navigation = [
  { label: "Studio", href: "/studio" },
  { label: "Systems", href: "/systems" },
  { label: "Services", href: "/services" },
  { label: "Assistant", href: "/assistant" },
  { label: "Insights", href: "/insights" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
] as const;

export const proofPoints = [
  "Practical AI and automation",
  "Direct senior involvement",
  "Built in Scotland",
  "Made for real operations",
] as const;

export const capabilities = [
  {
    title: "AI & business automation",
    description:
      "Practical AI and automation for the repetitive work that slows a good business down.",
    icon: BrainCircuit,
  },
  {
    title: "Internal business systems",
    description:
      "Replace fragile spreadsheets and disconnected tools with software shaped around the operation.",
    icon: LayoutDashboard,
  },
  {
    title: "Websites & digital platforms",
    description:
      "Websites that explain the business clearly, generate enquiries, and connect into the work behind them.",
    icon: MonitorCheck,
  },
  {
    title: "SaaS product builds",
    description:
      "Modern product foundations for founders who need a capable technical partner from first release onwards.",
    icon: Blocks,
  },
  {
    title: "Data-backed decision systems",
    description:
      "Explainable routing, qualification, and reporting layers grounded in structured data.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "AI-assisted operations",
    description:
      "Practical assistance for research, drafting, and summarisation, added where it creates measurable value.",
    icon: Bot,
  },
] as const;

export const services = [
  {
    title: "AI & Business Automation",
    description:
      "Reduce repeated admin across enquiries, documents, emails, customer questions, and everyday business processes.",
    forWhom:
      "For teams spending too much time moving information, answering the same questions, or keeping manual processes alive.",
    outcome:
      "Less repeated admin, clearer hand-offs, and more time for the work that needs people.",
    icon: BrainCircuit,
  },
  {
    title: "Internal Business Systems",
    description:
      "Replace fragile spreadsheets, disconnected tools, and manual tracking with software designed around the way the business actually operates.",
    forWhom:
      "For businesses where valuable information is hard to find, updates are easy to miss, or the current software creates workarounds.",
    outcome:
      "A visible, repeatable way of working with the right information in the right place.",
    icon: LayoutDashboard,
  },
  {
    title: "Websites & Digital Platforms",
    description:
      "Websites and platforms that explain the business clearly, generate enquiries, support customers, and contribute to the work behind them.",
    forWhom:
      "For businesses whose website looks acceptable but does not work hard enough for customers or the team behind it.",
    outcome:
      "A stronger digital front door that supports the business instead of sitting apart from it.",
    icon: MonitorCheck,
  },
  {
    title: "Controlled AI Assistants",
    description:
      "Knowledge-based assistants that help staff or customers get useful answers without behaving like uncontrolled general chatbots.",
    forWhom:
      "For businesses with repeatable questions, valuable internal knowledge, or customer journeys that need clearer guidance.",
    outcome:
      "Faster access to approved answers, with clear boundaries and a controlled fallback.",
    icon: MessagesSquare,
  },
  {
    title: "Product & SaaS Development",
    description:
      "New digital products, portals, marketplaces, and software-enabled services built with a practical first-release scope.",
    forWhom:
      "For startups and businesses with a strong product idea that needs capable technical execution.",
    outcome:
      "A credible, maintainable product foundation ready for real users and informed iteration.",
    icon: Blocks,
  },
  {
    title: "Technical Reviews & AI Audits",
    description:
      "A practical review of existing systems, workflows, websites, data, automation ideas, and AI opportunities before committing to a larger build.",
    forWhom:
      "For businesses that know something should improve but need clarity on the most useful place to start.",
    outcome:
      "A prioritised, commercially grounded route forward with a sensible place to start.",
    icon: ChartNoAxesCombined,
  },
] as const;

export const typicalProblems = [
  {
    title: "Enquiries arrive from everywhere",
    copy: "Website forms, email, WhatsApp, phone calls, social media, and referrals. It is easy for good opportunities to be missed or answered differently.",
    icon: Inbox,
  },
  {
    title: "Too much time is spent on admin",
    copy: "People are repeating emails, copying details, chasing updates, and moving information around by hand.",
    icon: FileStack,
  },
  {
    title: "Knowledge lives in people's heads",
    copy: "Important know-how depends on one person remembering how everything works. It becomes hard to find and easy to lose.",
    icon: Lightbulb,
  },
  {
    title: "The website does not work hard enough",
    copy: "It looks acceptable, but brings in too few enquiries and does little to help customers or staff.",
    icon: MonitorCheck,
  },
  {
    title: "Software does not fit the business",
    copy: "The business has changed, but the software has not. Staff rely on extra steps, workarounds, and spreadsheets.",
    icon: Wrench,
  },
  {
    title: "AI feels interesting but unclear",
    copy: "It is difficult to tell what would genuinely help and what would simply add cost without improving the work.",
    icon: Bot,
  },
] as const;

export const commonServiceProblems = [
  {
    title: "Too many enquiries, not enough time",
    copy: "Leads arrive through email, forms, phone calls, social media, and referrals. Valuable opportunities get missed or handled inconsistently.",
    outcome: "A clearer enquiry process with qualification, routing, tracking, and faster response times.",
    icon: Inbox,
  },
  {
    title: "Staff spend too much time on administration",
    copy: "Important people are repeating tasks that software should handle.",
    outcome: "Less repetitive admin, fewer manual hand-offs, and more time spent on valuable work.",
    icon: FileStack,
  },
  {
    title: "Information lives in too many places",
    copy: "Documents, emails, spreadsheets, and internal knowledge are difficult to search and easy to lose.",
    outcome: "A single reliable place to find information when it is needed.",
    icon: Lightbulb,
  },
  {
    title: "The website exists but does not contribute enough",
    copy: "The website looks acceptable but does not generate enough enquiries, support the day-to-day work, or improve the customer experience.",
    outcome: "A website that actively supports the business rather than simply existing online.",
    icon: MonitorCheck,
  },
  {
    title: "Software no longer matches how the business operates",
    copy: "Processes have evolved but the systems have not.",
    outcome: "Tools and processes that fit the reality of the business today.",
    icon: Wrench,
  },
  {
    title: "AI looks interesting but the practical value is unclear",
    copy: "There is pressure to adopt AI but uncertainty around where it creates genuine value.",
    outcome: "A practical roadmap focused on measurable business improvement rather than experimentation.",
    icon: Bot,
  },
] as const;

export const typicalEngagements = [
  {
    title: "Technical review",
    duration: "1 - 2 weeks",
    copy: "For businesses that need clarity before committing to a larger build.",
  },
  {
    title: "Website and workflow upgrade",
    duration: "2 - 6 weeks",
    copy: "For businesses that need a stronger website, better enquiry flow, and practical automation.",
  },
  {
    title: "Automation or internal tool project",
    duration: "4 - 12 weeks",
    copy: "For teams ready to replace manual admin, spreadsheets, or disconnected systems.",
  },
  {
    title: "Product or platform build",
    duration: "8 - 16+ weeks",
    copy: "For startups or businesses building a digital product, portal, marketplace, or SaaS-style system.",
  },
] as const;

export const processSteps = [
  ["01", "Diagnose", "Understand the operational problem, the evidence, and the constraints."],
  ["02", "Design", "Define the smallest coherent system and the rules it must respect."],
  ["03", "Build", "Ship working software in focused, visible increments."],
  ["04", "Evaluate", "Test the rules, outputs, and edge cases against reality."],
  ["05", "Ship", "Deploy a useful release with clear ownership and observability."],
  ["06", "Improve", "Use real feedback to sharpen the system where it matters."],
] as const;

export const selectedSystems = [
  {
    slug: "project-harbour",
    codename: "Project Harbour",
    type: "Decision system",
    summary:
      "A rule-based matching engine that turns layered suitability criteria into ranked, explainable recommendations.",
    status: "Rules engine",
    signals: ["Weighted criteria", "Validation gates", "Explainable output"],
    problem: "Important recommendations depended on manually comparing layered suitability criteria.",
    solution: "A rule-based matching engine with weighted criteria, validation gates, and explainable recommendations.",
    outcome: "A faster, more consistent route from evidence to a reviewable decision.",
    buildTime: "6 weeks",
  },
  {
    slug: "project-ledger",
    codename: "Project Ledger",
    type: "Operations platform",
    summary:
      "A data-heavy operational workflow brought into one calm interface with structured hand-offs and visible ownership.",
    status: "Internal tooling",
    signals: ["Workflow state", "Role-based views", "Audit trail"],
    problem: "Operational information was scattered across disconnected tools with no reliable view of ownership.",
    solution: "A calm internal platform with structured hand-offs, role-based views, and an audit trail.",
    outcome: "A clearer operating picture with fewer manual updates and fewer missed actions.",
    buildTime: "10 weeks",
  },
  {
    slug: "project-atlas",
    codename: "Project Atlas",
    type: "Research system",
    summary:
      "An assisted research workflow where source material, generated drafts, and human decisions remain traceable.",
    status: "Assisted workflow",
    signals: ["Source traceability", "Review queue", "Evaluated output"],
    problem: "Research work was slow to assemble and difficult to review without losing the source trail.",
    solution: "An assisted workflow that keeps source material, generated drafts, and human decisions traceable.",
    outcome: "Faster research preparation while keeping evidence and review visible.",
    buildTime: "8 weeks",
  },
] as const;

export const practicalIntelligence = {
  ai: [
    "Knowledge retrieval",
    "Document analysis",
    "Research workflows",
    "Content generation",
    "Classification",
    "Data extraction",
  ],
  deterministic: [
    "Lead routing",
    "Enquiry handling",
    "Booking systems",
    "Internal workflows",
    "Approval processes",
    "Business rules",
    "Reporting systems",
  ],
} as const;

export const assistantComparison = [
  {
    title: "Typical AI chatbot",
    points: [
      "Generates responses dynamically",
      "Can invent information",
      "Difficult to audit",
      "Behaviour varies between conversations",
      "Often unsuitable for compliance or operational guidance",
    ],
  },
  {
    title: "McCaigs deterministic assistant",
    points: [
      "Answers from approved knowledge",
      "Clear boundaries and fallback behaviour",
      "Traceable response logic",
      "Consistent outputs",
      "Designed for operational and business use",
    ],
  },
] as const;

export const assistantUseCases = [
  ["Internal knowledge bases", "Help teams find approved information quickly."],
  ["Staff onboarding", "Provide consistent answers to common internal questions."],
  ["Customer support", "Handle predictable questions with approved responses."],
  ["Compliance & governance", "Provide guidance from controlled documentation."],
  ["Operational procedures", "Support teams using defined business processes."],
  ["Product documentation", "Make technical information easier to access."],
] as const;

export const insightAreas = [
  ["Practical AI for SMEs", "Where carefully applied AI can remove friction without adding unnecessary complexity."],
  ["Deterministic AI systems", "Why controlled answers, clear limits, and sensible fallbacks matter in real businesses."],
  ["Internal business systems", "How calmer tools can replace scattered spreadsheets, inboxes, and repeated admin."],
  ["Workflow automation", "Practical ways to reduce manual handling while keeping responsibility visible."],
  ["Studio notes", "Observations from designing, building, and improving useful systems."],
  ["Build logs", "Readable records of what was built, what changed, and what the work taught us."],
  ["Product thinking", "How to define the first useful release and improve it using evidence."],
  ["AI myths & misconceptions", "Plain-English explanations of what AI can do, what it cannot do, and where caution matters."],
] as const;

export const principles = [
  ["Use the simplest reliable tool", "Use software rules where software rules are better. Add AI where it creates practical value."],
  ["Truth over fluency", "A clear, correct answer is more useful than a polished guess."],
  ["Clear interfaces", "Complex systems should still feel calm to operate."],
  ["Fast feedback loops", "Build, observe, evaluate, and improve in tight cycles."],
  ["Cost-aware architecture", "Spend complexity and compute where they create value."],
  ["Human review where needed", "Responsibility stays visible when judgement matters."],
] as const;

export const projectTypes = [
  "AI & business automation",
  "Internal business system",
  "Website or digital platform",
  "Controlled AI assistant",
  "Product or SaaS build",
  "Technical review or AI audit",
  "Something else",
] as const;

export const budgetRanges = [
  "Under £15,000",
  "£15,000 - £30,000",
  "£30,000 - £60,000",
  "£60,000 - £100,000",
  "£100,000+",
  "Not defined yet",
] as const;

export const timelineOptions = [
  "As soon as practical",
  "Within 1 - 3 months",
  "Within 3 - 6 months",
  "More than 6 months",
  "Exploring the right timing",
] as const;

export const studioAudiences = [
  {
    title: "Scottish SMEs",
    copy: "For established teams that need better websites, smoother operations, and practical technology without building a large internal software department.",
  },
  {
    title: "Owner-led businesses",
    copy: "For ambitious businesses where the owner can see untapped opportunities but standard agencies and off-the-shelf tools are not enough.",
  },
  {
    title: "Startups and specialists",
    copy: "For founders and specialist firms with valuable knowledge, a strong idea, or operational complexity that deserves a better system.",
  },
] as const;
