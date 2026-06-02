import budgetsKnowledge from "../../backend/knowledge/budgets.json";
import businessQuestionsKnowledge from "../../backend/knowledge/business-questions.json";
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
