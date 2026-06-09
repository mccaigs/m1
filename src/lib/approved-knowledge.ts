import budgetsKnowledge from "../../backend/knowledge/budgets.json";
import businessQuestionsKnowledge from "../../backend/knowledge/business-questions.json";
import companyFaqKnowledge from "../../backend/knowledge/company-faq.json";
import fallbacksKnowledge from "../../backend/knowledge/fallbacks.json";
import mccaigsKnowledge from "../../backend/knowledge/mccaigs.json";
import processKnowledge from "../../backend/knowledge/process.json";
import servicesKnowledge from "../../backend/knowledge/services.json";
import specialOffersKnowledge from "../../backend/knowledge/special-offers.json";
import timelinesKnowledge from "../../backend/knowledge/timelines.json";

export type ApprovedKnowledgeBlock = {
  cta: {
    href: string;
    label: string;
  };
  fragments: string[];
  keywords?: string[];
  phrases?: string[];
  priority?: number;
  related_offer_ids?: string[];
  suggested_questions: string[];
  topic: string;
};

export type ApprovedFallbackRoute = ApprovedKnowledgeBlock;

export type ApprovedFallbackKnowledge = {
  closest_routes: ApprovedFallbackRoute[];
  starting_prompts: string[];
  unknown: ApprovedKnowledgeBlock;
};

export type SpecialOffer = {
  cta_href: string;
  cta_label: string;
  excludes: string[];
  id: string;
  includes: string[];
  keywords: string[];
  phrases?: string[];
  price: string;
  priority?: number;
  related_response_fragment: string;
  response_fragments: string[];
  suggested_questions: string[];
  summary: string;
  title: string;
};

type CompanyFaqEntry = {
  aliases?: string[];
  answer: string;
  id: string;
  keywords?: string[];
  question: string;
};

const SEARCH_STOP_WORDS = new Set(["the", "and", "for", "what", "who", "how", "does", "did", "can", "you", "about", "tell"]);

const topicKnowledge = [
  budgetsKnowledge,
  businessQuestionsKnowledge,
  mccaigsKnowledge,
  processKnowledge,
  servicesKnowledge,
  timelinesKnowledge,
] as { topics: ApprovedKnowledgeBlock[] }[];

export const specialOffers = specialOffersKnowledge.offers as SpecialOffer[];

export const approvedKnowledgeBlocks: ApprovedKnowledgeBlock[] = [
  ...(companyFaqKnowledge.questions as CompanyFaqEntry[]).map(faqEntryToBlock),
  ...topicKnowledge.flatMap((knowledge) => knowledge.topics),
  ...specialOffers.map((offer) => ({
    cta: { href: offer.cta_href, label: offer.cta_label },
    fragments: offer.response_fragments,
    keywords: offer.keywords,
    phrases: offer.phrases,
    priority: offer.priority,
    suggested_questions: offer.suggested_questions,
    topic: `offer_${offer.id.replaceAll("-", "_")}`,
  })),
];

export const approvedFallbackKnowledge = fallbacksKnowledge as ApprovedFallbackKnowledge;

function faqEntryToBlock(entry: CompanyFaqEntry): ApprovedKnowledgeBlock {
  const phrases = generateFaqAliases(entry);
  const keywords = [...new Set([...(entry.keywords ?? []), ...phrases.flatMap((phrase) => searchableTokens(phrase))])];

  return {
    cta: { href: "/start-project", label: "Start a project" },
    fragments: [entry.answer],
    keywords,
    phrases,
    priority: 8,
    suggested_questions: suggestedQuestionsForFaq(entry),
    topic: `company_faq_${entry.id}`,
  };
}

function generateFaqAliases(entry: CompanyFaqEntry) {
  const question = entry.question.toLowerCase();
  const id = entry.id.toLowerCase();
  const generated = [
    entry.question,
    question.replace(/\?$/, ""),
    id.replaceAll("_", " "),
  ];

  if (id.includes("david") || question.includes("david robertson")) {
    generated.push("david robertson");
  }

  if (id === "who_is_david") {
    generated.push("tell me about david", "mccaigs founder", "who runs mccaigs", "who owns mccaigs");
  }

  if (id.includes("deterministic") || question.includes("deterministic")) {
    generated.push("deterministic ai", "rules based system", "what does deterministic mean", "controlled assistant");
  }

  if (id.includes("mvp")) {
    generated.push("do you build mvps", "can you build an mvp", "rapid mvp development", "minimum viable product");
  }

  if (id.includes("established")) {
    generated.push("how old is mccaigs", "when was mccaigs founded", "when did mccaigs start");
  }

  return [...new Set([...generated, ...(entry.aliases ?? [])].map((alias) => alias.trim()).filter(Boolean))];
}

function searchableTokens(value: string) {
  return value
    .toLowerCase()
    .match(/[a-z0-9+&'-]+/g)
    ?.filter((token) => token.length > 2 && !SEARCH_STOP_WORDS.has(token)) ?? [];
}

function suggestedQuestionsForFaq(entry: CompanyFaqEntry) {
  const suggestions = [entry.question, "What makes McCaigs different?", "How do we get started?"];
  return [...new Set(suggestions)].slice(0, 3);
}
