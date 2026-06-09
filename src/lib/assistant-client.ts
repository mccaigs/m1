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
const searchStopWords = new Set(["the", "and", "for", "what", "who", "how", "does", "did", "can", "you", "about", "tell"]);

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

  const relevantMatches = matches
    .filter((match) => match.score >= Math.max(6, bestMatch.score * 0.45))
    .slice(0, 3);
  const matchedTopics = relevantMatches
    .slice(0, 3)
    .map((match) => match.block.topic);
  const responseBlock = combineRelevantFaqBlocks(bestMatch.block, relevantMatches);

  return {
    ...replyFromBlock(responseBlock, matchedTopics),
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

function combineRelevantFaqBlocks(bestBlock: ApprovedKnowledgeBlock, relevantMatches: { block: ApprovedKnowledgeBlock; score: number }[]) {
  if (!isFaqBlock(bestBlock)) return bestBlock;

  const relatedFaqBlocks = relevantMatches
    .filter((match) => match.block.topic !== bestBlock.topic && isFaqBlock(match.block) && match.score >= 10)
    .map((match) => match.block)
    .slice(0, 2);

  if (!relatedFaqBlocks.length) return bestBlock;

  return {
    ...bestBlock,
    fragments: [...bestBlock.fragments, ...relatedFaqBlocks.flatMap((block) => block.fragments)],
    suggested_questions: [...new Set([...bestBlock.suggested_questions, ...relatedFaqBlocks.flatMap((block) => block.suggested_questions)])].slice(0, 3),
  };
}

function isFaqBlock(block: ApprovedKnowledgeBlock) {
  return block.topic.startsWith("company_faq_");
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
  return Boolean(normalisedTerm) && (` ${query} `.includes(` ${normalisedTerm} `) || ` ${normalisedTerm} `.includes(` ${query} `));
}

function scoreBlock(query: string, block: Pick<ApprovedKnowledgeBlock, "keywords" | "phrases" | "priority">) {
  const phraseScore = (block.phrases ?? []).reduce((score, phrase) => score + scorePhrase(query, phrase), 0);
  const keywordScore = (block.keywords ?? []).reduce((score, keyword) => score + scoreKeyword(query, keyword), 0);
  return (block.priority ?? 0) + phraseScore + keywordScore;
}

function scorePhrase(query: string, phrase: string) {
  const normalisedPhrase = normaliseQuery(phrase);
  if (!normalisedPhrase || !query) return 0;
  const wordCount = normalisedPhrase.split(" ").length;
  if (query === normalisedPhrase) return 18 * wordCount;
  if (containsTerm(query, normalisedPhrase)) return 12 * wordCount;

  const overlap = tokenOverlap(query, normalisedPhrase);
  const similarityScore = similarity(query, normalisedPhrase);
  return Math.round(overlap * 5 + (similarityScore >= 0.72 ? similarityScore * 10 : 0));
}

function scoreKeyword(query: string, keyword: string) {
  const normalisedKeyword = normaliseQuery(keyword);
  if (!normalisedKeyword || !query) return 0;
  if (containsTerm(query, normalisedKeyword)) return 4 * normalisedKeyword.split(" ").length + 2;
  const overlap = tokenOverlap(query, normalisedKeyword);
  return overlap >= 1 ? overlap * 2 : 0;
}

function tokenOverlap(left: string, right: string) {
  const leftTokens = new Set(left.split(" ").filter((token) => token && !searchStopWords.has(token)));
  const rightTokens = right.split(" ").filter((token) => token && !searchStopWords.has(token));
  return rightTokens.filter((token) => leftTokens.has(token)).length;
}

function similarity(left: string, right: string) {
  const longestLength = Math.max(left.length, right.length);
  if (!longestLength) return 1;
  return 1 - levenshtein(left, right) / longestLength;
}

function levenshtein(left: string, right: string) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 0; leftIndex < left.length; leftIndex += 1) {
    let last = leftIndex;
    previous[0] = leftIndex + 1;

    for (let rightIndex = 0; rightIndex < right.length; rightIndex += 1) {
      const old = previous[rightIndex + 1];
      previous[rightIndex + 1] =
        left[leftIndex] === right[rightIndex]
          ? last
          : Math.min(last + 1, previous[rightIndex] + 1, previous[rightIndex + 1] + 1);
      last = old;
    }
  }

  return previous[right.length];
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
