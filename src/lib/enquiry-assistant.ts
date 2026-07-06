export type AssistantTopic = {
  answer: string;
  id: string;
  keywords: readonly string[];
  label: string;
};

export const assistantTopics: readonly AssistantTopic[] = [
  {
    id: "studio",
    label: "What mccaigs does",
    keywords: ["mccaigs", "studio", "what do you do", "help", "build", "offer"],
    answer:
      "mccaigs is Scotland's Elite Technical Studio. We build practical AI, automation, websites, internal business systems, and digital products for ambitious businesses that need more than a standard agency can offer.",
  },
  {
    id: "fit",
    label: "Good-fit projects",
    keywords: ["fit", "good fit", "project", "suitable", "work with", "who"],
    answer:
      "A good fit is a real business problem with a useful outcome: too much manual admin, enquiries arriving everywhere, disconnected tools, a website that should work harder, or an AI opportunity that needs a practical route forward.",
  },
  {
    id: "timeline",
    label: "Expected timelines",
    keywords: ["timeline", "timing", "time", "long", "weeks", "months", "start"],
    answer:
      "Timelines depend on scope. A focused technical audit or discovery phase can move quickly. A product or operational system is usually shaped into a deliberate first release, then improved using real feedback.",
  },
  {
    id: "budget",
    label: "Typical budgets",
    keywords: ["budget", "cost", "price", "pricing", "investment", "spend"],
    answer:
      "Most engagements are shaped around the problem, the budget available, and the first useful improvement. The enquiry form uses working ranges from under £15,000 to £100,000+, with room to say the budget is not defined yet.",
  },
  {
    id: "process",
    label: "How the studio works",
    keywords: ["process", "work", "method", "approach", "engagement", "delivery"],
    answer:
      "The studio process is Diagnose, Design, Build, Evaluate, Ship, and Improve. It is senior-led, practical, and commercially grounded. The aim is to ship a useful system, not a speculative demonstration.",
  },
  {
    id: "enquiry",
    label: "When to enquire",
    keywords: ["enquire", "enquiry", "contact", "submit", "speak", "call", "conversation"],
    answer:
      "Submit an enquiry when the problem is important enough to solve properly, even if the final scope is not clear yet. A useful first conversation starts with the operational constraint or opportunity.",
  },
  {
    id: "deterministic-ai",
    label: "Controlled AI assistants",
    keywords: ["deterministic", "ai system", "artificial intelligence", "model", "llm"],
    answer:
      "A deterministic assistant answers from approved knowledge, follows clear boundaries, and uses a sensible fallback when an answer is unknown. It is useful when a business needs consistent answers rather than open-ended improvisation.",
  },
  {
    id: "workflows",
    label: "Intelligent workflows",
    keywords: ["workflow", "automation", "automate", "operations", "operational"],
    answer:
      "Intelligent workflows reduce repeated admin, clarify ownership, and make the next action clear. They can connect website enquiries, email, documents, customer updates, and internal hand-offs into a calmer way of working.",
  },
  {
    id: "internal-tools",
    label: "Internal tools",
    keywords: ["internal tool", "portal", "dashboard", "admin", "team tool"],
    answer:
      "Internal tools are focused working interfaces built around the business. They are useful when important processes are trapped in spreadsheets, inboxes, disconnected systems, or knowledge held by one person.",
  },
  {
    id: "saas",
    label: "SaaS and product builds",
    keywords: ["saas", "product", "platform", "startup", "mvp", "digital product"],
    answer:
      "mccaigs builds credible SaaS and digital product foundations with a deliberate first-release scope. That can include portals, marketplaces, and software-enabled services for startups or established businesses.",
  },
  {
    id: "audits",
    label: "Technical audits",
    keywords: ["audit", "review", "architecture", "technical review", "assessment", "aeo audit", "ai visibility check"],
    answer:
      "A technical review, AI audit, or AEO Audit looks at the website, workflows, tools, data, entity signals, structured data, and AI visibility before more money is committed. It produces a practical diagnosis and a prioritised route forward.",
  },
  {
    id: "websites",
    label: "Websites and platforms",
    keywords: ["website", "websites", "web platform", "digital platform", "site"],
    answer:
      "mccaigs builds premium websites and digital platforms that explain the business clearly, generate enquiries, support customers, and connect into the workflows behind them.",
  },
  {
    id: "answer-engine-optimisation",
    label: "Answer Engine Optimisation",
    keywords: ["answer engine optimisation", "answer engine optimization", "aeo", "answer engines", "ai answers", "ai recommendations"],
    answer:
      "Answer Engine Optimisation helps AI systems understand what a business does, who it serves, why it is credible, and when it may be a relevant recommendation. mccaigs combines technical SEO, structured data, entity clarity, FAQs, internal links, llms.txt, public assistant knowledge, and AI-ready websites.",
  },
  {
    id: "ai-visibility",
    label: "AI Visibility",
    keywords: ["ai visibility", "ai search optimisation", "ai search optimization", "ai discoverability", "chatgpt seo", "gemini", "claude", "perplexity", "google ai"],
    answer:
      "AI Visibility checks whether a business is easy for answer engines such as ChatGPT, Gemini, Claude, Perplexity, and Google AI to understand from public material. mccaigs can improve the source signals, but cannot guarantee inclusion, rankings, citations, or recommendations.",
  },
  {
    id: "llms-files",
    label: "llms.txt and public AI knowledge",
    keywords: ["llms.txt", "llms-full.txt", "public ai knowledge", "assistant knowledge", "ai knowledge json", "ai knowledge markdown"],
    answer:
      "llms.txt, llms-full.txt, and public assistant knowledge files give visitors, crawlers, and answer engines clearer approved source material. They are useful, but only one part of AI visibility alongside schema, FAQs, internal links, crawlability, and clear service pages.",
  },
  {
    id: "ai-visibility-report",
    label: "AI Visibility Report",
    keywords: ["ai visibility report", "ai readiness score", "visibility score", "prompt checks", "aeo implementation", "ai visibility management"],
    answer:
      "An AI Visibility Report can review entity clarity, structured data coverage, FAQ coverage, AI crawlability, llms.txt presence, ChatGPT visibility, Gemini visibility, Google AI visibility, and recommended next actions. It is evidence for improvement, not a guarantee of inclusion.",
  },
] as const;

export const assistantFallback =
  "That is outside this assistant's approved knowledge base. mccaigs will not invent an answer. Add the detail to the enquiry form and the studio can review it properly.";

export function answerAssistantQuestion(question: string) {
  const normalisedQuestion = question.trim().toLowerCase();
  if (!normalisedQuestion) {
    return assistantFallback;
  }

  const match = assistantTopics
    .map((topic) => ({
      answer: topic.answer,
      score: topic.keywords.reduce(
        (score, keyword) => score + (normalisedQuestion.includes(keyword) ? keyword.length : 0),
        0,
      ),
    }))
    .sort((left, right) => right.score - left.score)[0];

  return match && match.score > 0 ? match.answer : assistantFallback;
}
