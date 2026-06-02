import {
  approvedFallbackKnowledge,
  approvedKnowledgeBlocks,
  specialOffers,
  type ApprovedKnowledgeBlock,
} from "@/lib/approved-knowledge";

export type AssistantCta = {
  href: string;
  label: string;
};

export type AssistantReply = {
  confidence?: number;
  ctas: AssistantCta[];
  followups: string[];
  intent: AssistantIntent;
  matchedTopics?: string[];
  response: string;
};

export type AssistantIntent = string;

const assistantApiUrl = process.env.NEXT_PUBLIC_ASSISTANT_API_URL?.replace(/\/$/, "");

export const startingPrompts = approvedFallbackKnowledge.starting_prompts;

export const initialAssistantReply = replyFromBlock(
  approvedKnowledgeBlocks.find((block) => block.topic === "what_mccaigs_does")!,
  ["what_mccaigs_does"],
);

export async function askAssistant(message: string): Promise<AssistantReply> {
  if (!assistantApiUrl) return getLocalReply(message);
  try {
    const response = await fetch(`${assistantApiUrl}/assistant/message`, {
      body: JSON.stringify({ message }),
      headers: { "content-type": "application/json" },
      method: "POST",
    });
    if (!response.ok) throw new Error("Assistant API request failed.");
    return fromApiReply((await response.json()) as AssistantApiReply);
  } catch {
    return getLocalReply(message);
  }
}

function getLocalReply(message: string): AssistantReply {
  const query = normaliseQuery(message);
  const matches = approvedKnowledgeBlocks
    .map((block) => ({ block, score: scoreBlock(query, block) }))
    .sort((left, right) => right.score - left.score);
  const bestMatch = matches[0];

  if (!bestMatch || bestMatch.score < 6) return getFallbackReply(query);

  const matchedTopics = matches
    .filter((match) => match.score >= Math.max(6, bestMatch.score * 0.45))
    .slice(0, 3)
    .map((match) => match.block.topic);

  return {
    ...replyFromBlock(bestMatch.block, matchedTopics),
    confidence: calculateConfidence(bestMatch.score),
  };
}

function getFallbackReply(query: string): AssistantReply {
  const fallback = approvedFallbackKnowledge.unknown;
  const closestMatch = approvedFallbackKnowledge.closest_routes
    .map((route) => ({ route, score: scoreBlock(query, route) }))
    .sort((left, right) => right.score - left.score)[0];

  if (!closestMatch || closestMatch.score < 6) return replyFromBlock(fallback, []);

  return replyFromBlock(
    {
      ...fallback,
      cta: closestMatch.route.cta,
      fragments: [...fallback.fragments, ...closestMatch.route.fragments],
      suggested_questions: closestMatch.route.suggested_questions,
    },
    [],
  );
}

function replyFromBlock(block: ApprovedKnowledgeBlock, matchedTopics: string[]): AssistantReply {
  const enrichedBlock = enrichBlockWithRelatedOffers(block);
  return {
    ctas: enrichedBlock.cta ? [enrichedBlock.cta] : [],
    followups: enrichedBlock.suggested_questions,
    intent: matchedTopics[0] ?? "fallback",
    matchedTopics,
    response: enrichedBlock.fragments.map((fragment) => fragment.trim()).filter(Boolean).join("\n\n"),
  };
}

function enrichBlockWithRelatedOffers(block: ApprovedKnowledgeBlock): ApprovedKnowledgeBlock {
  const relatedOffers = specialOffers.filter((offer) => block.related_offer_ids?.includes(offer.id));
  if (!relatedOffers.length) return block;

  return {
    ...block,
    fragments: [...block.fragments, ...relatedOffers.map((offer) => offer.related_response_fragment)],
    suggested_questions: [...new Set([...relatedOffers.map((offer) => offer.suggested_questions[0]), ...block.suggested_questions])].slice(0, 3),
  };
}

function normaliseQuery(query: string) {
  return query.toLowerCase().match(/[a-z0-9+&'-]+/g)?.join(" ") ?? "";
}

function containsTerm(query: string, term: string) {
  const normalisedTerm = normaliseQuery(term);
  return Boolean(normalisedTerm) && ` ${query} `.includes(` ${normalisedTerm} `);
}

function scoreBlock(query: string, block: Pick<ApprovedKnowledgeBlock, "keywords" | "phrases" | "priority">) {
  const phraseScore = (block.phrases ?? []).reduce(
    (score, phrase) => score + (containsTerm(query, phrase) ? 12 * normaliseQuery(phrase).split(" ").length : 0),
    0,
  );
  const keywordScore = (block.keywords ?? []).reduce(
    (score, keyword) => score + (containsTerm(query, keyword) ? 4 * normaliseQuery(keyword).split(" ").length + 2 : 0),
    0,
  );
  return (block.priority ?? 0) + phraseScore + keywordScore;
}

function calculateConfidence(score: number) {
  return Math.min(0.98, Number((0.52 + score / 180).toFixed(2)));
}

function fromApiReply(reply: AssistantApiReply): AssistantReply {
  return {
    confidence: reply.confidence,
    ctas: reply.cta_label && reply.cta_href ? [{ href: reply.cta_href, label: reply.cta_label }] : [],
    followups: reply.suggested_questions,
    intent: reply.matched_topics[0] ?? "fallback",
    matchedTopics: reply.matched_topics,
    response: reply.answer,
  };
}

type AssistantApiReply = {
  answer: string;
  confidence: number;
  cta_href?: string | null;
  cta_label?: string | null;
  matched_topics: string[];
  suggested_questions: string[];
};
