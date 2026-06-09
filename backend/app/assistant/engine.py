import json
import re
from functools import lru_cache
from pathlib import Path

from .schemas import AssistantMessageResponse


KNOWLEDGE_DIR = Path(__file__).resolve().parents[2] / "knowledge"
FALLBACKS_FILE = "fallbacks.json"
SEARCH_STOP_WORDS = {"the", "and", "for", "what", "who", "how", "does", "did", "can", "you", "about", "tell"}


@lru_cache
def load_knowledge_file(filename: str) -> dict:
    with (KNOWLEDGE_DIR / filename).open(encoding="utf-8") as file:
        return json.load(file)


@lru_cache
def load_knowledge_blocks() -> tuple[dict, ...]:
    blocks: list[dict] = []
    for path in sorted(KNOWLEDGE_DIR.glob("*.json")):
        if path.name == FALLBACKS_FILE:
            continue
        source = path.stem
        knowledge = load_knowledge_file(path.name)
        for block in knowledge.get("topics", []):
            blocks.append({**block, "source": source})
        for offer in knowledge.get("offers", []):
            blocks.append(offer_to_block(offer, source))
        for question in knowledge.get("questions", []):
            blocks.append(faq_to_block(question, source))
    return tuple(blocks)


@lru_cache
def load_offers() -> tuple[dict, ...]:
    offers: list[dict] = []
    for path in sorted(KNOWLEDGE_DIR.glob("*.json")):
        offers.extend(load_knowledge_file(path.name).get("offers", []))
    return tuple(offers)


def offer_to_block(offer: dict, source: str) -> dict:
    return {
        "topic": f"offer_{offer['id'].replace('-', '_')}",
        "keywords": offer["keywords"],
        "phrases": offer.get("phrases", []),
        "fragments": offer["response_fragments"],
        "cta": {"label": offer["cta_label"], "href": offer["cta_href"]},
        "suggested_questions": offer["suggested_questions"],
        "source": source,
        "priority": offer.get("priority", 0),
    }


def faq_to_block(question: dict, source: str) -> dict:
    phrases = generate_faq_aliases(question)
    keywords = list(
        dict.fromkeys(
            [
                *(question.get("keywords", [])),
                *(token for phrase in phrases for token in searchable_tokens(phrase)),
            ]
        )
    )

    return {
        "topic": f"company_faq_{question['id']}",
        "keywords": keywords,
        "phrases": phrases,
        "fragments": [question["answer"]],
        "cta": {"label": "Start a project", "href": "/start-project"},
        "suggested_questions": list(
            dict.fromkeys(
                [
                    question["question"],
                    "What makes McCaigs different?",
                    "How do we get started?",
                ]
            )
        )[:3],
        "source": source,
        "priority": 8,
    }


def generate_faq_aliases(question: dict) -> list[str]:
    question_text = question["question"]
    normalised_question = question_text.lower()
    question_id = question["id"].lower()
    generated = [
        question_text,
        question_text.rstrip("?"),
        question_id.replace("_", " "),
    ]

    if "david" in question_id or "david robertson" in normalised_question:
        generated.append("david robertson")

    if question_id == "who_is_david":
        generated.extend(["tell me about david", "mccaigs founder", "who runs mccaigs", "who owns mccaigs"])

    if "deterministic" in question_id or "deterministic" in normalised_question:
        generated.extend(["deterministic ai", "rules based system", "what does deterministic mean", "controlled assistant"])

    if "mvp" in question_id:
        generated.extend(["do you build mvps", "can you build an mvp", "rapid mvp development", "minimum viable product"])

    if "established" in question_id:
        generated.extend(["how old is mccaigs", "when was mccaigs founded", "when did mccaigs start"])

    return list(dict.fromkeys(alias.strip() for alias in [*generated, *question.get("aliases", [])] if alias.strip()))


def searchable_tokens(value: str) -> list[str]:
    return [token for token in re.findall(r"[a-z0-9+&'-]+", value.lower()) if len(token) > 2 and token not in SEARCH_STOP_WORDS]


def normalise_query(query: str) -> str:
    return " ".join(re.findall(r"[a-z0-9+&'-]+", query.lower()))


def contains_term(query: str, term: str) -> bool:
    normalised_term = normalise_query(term)
    return bool(normalised_term) and (
        f" {normalised_term} " in f" {query} " or f" {query} " in f" {normalised_term} "
    )


def score_block(query: str, block: dict) -> int:
    score = block.get("priority", 0)
    for phrase in block.get("phrases", []):
        score += score_phrase(query, phrase)
    for keyword in block.get("keywords", []):
        score += score_keyword(query, keyword)
    return score


def score_phrase(query: str, phrase: str) -> int:
    normalised_phrase = normalise_query(phrase)
    if not normalised_phrase or not query:
        return 0
    word_count = len(normalised_phrase.split())
    if query == normalised_phrase:
        return 18 * word_count
    if contains_term(query, normalised_phrase):
        return 12 * word_count

    overlap = token_overlap(query, normalised_phrase)
    similarity_score = similarity(query, normalised_phrase)
    return round(overlap * 5 + (similarity_score * 10 if similarity_score >= 0.72 else 0))


def score_keyword(query: str, keyword: str) -> int:
    normalised_keyword = normalise_query(keyword)
    if not normalised_keyword or not query:
        return 0
    if contains_term(query, normalised_keyword):
        return 4 * len(normalised_keyword.split()) + 2
    overlap = token_overlap(query, normalised_keyword)
    return overlap * 2 if overlap >= 1 else 0


def token_overlap(left: str, right: str) -> int:
    left_tokens = {token for token in left.split() if token not in SEARCH_STOP_WORDS}
    return sum(1 for token in right.split() if token not in SEARCH_STOP_WORDS and token in left_tokens)


def similarity(left: str, right: str) -> float:
    longest_length = max(len(left), len(right))
    if longest_length == 0:
        return 1
    return 1 - levenshtein(left, right) / longest_length


def levenshtein(left: str, right: str) -> int:
    previous = list(range(len(right) + 1))
    for left_index, left_character in enumerate(left):
        last = left_index
        previous[0] = left_index + 1
        for right_index, right_character in enumerate(right):
            old = previous[right_index + 1]
            previous[right_index + 1] = (
                last
                if left_character == right_character
                else min(last + 1, previous[right_index] + 1, previous[right_index + 1] + 1)
            )
            last = old
    return previous[len(right)]


def compose_fragments(fragments: list[str]) -> str:
    return "\n\n".join(fragment.strip() for fragment in fragments if fragment.strip())


def calculate_confidence(score: int) -> float:
    if score <= 0:
        return 0.0
    return round(min(0.98, 0.52 + score / 180), 2)


def answer_message(message: str) -> AssistantMessageResponse:
    query = normalise_query(message)
    matches = sorted(
        (
            {"block": block, "score": score_block(query, block)}
            for block in load_knowledge_blocks()
        ),
        key=lambda match: match["score"],
        reverse=True,
    )
    best_match = matches[0]
    if best_match["score"] < 6:
        return fallback_response(query)

    relevant_topics = [
        match["block"]["topic"]
        for match in matches
        if match["score"] >= max(6, best_match["score"] * 0.45)
    ][:3]
    relevant_matches = [
        match
        for match in matches
        if match["score"] >= max(6, best_match["score"] * 0.45)
    ][:3]
    return response_from_block(
        enrich_block_with_related_offers(combine_relevant_faq_blocks(best_match["block"], relevant_matches)),
        confidence=calculate_confidence(best_match["score"]),
        matched_topics=relevant_topics,
    )


def response_from_block(block: dict, confidence: float, matched_topics: list[str]) -> AssistantMessageResponse:
    cta = block.get("cta", {})
    return AssistantMessageResponse(
        answer=compose_fragments(block["fragments"]),
        confidence=confidence,
        matched_topics=matched_topics,
        cta_label=cta.get("label"),
        cta_href=cta.get("href"),
        suggested_questions=block["suggested_questions"],
    )


def enrich_block_with_related_offers(block: dict) -> dict:
    related_offer_ids = block.get("related_offer_ids", [])
    if not related_offer_ids:
        return block

    related_offers = [offer for offer in load_offers() if offer["id"] in related_offer_ids]
    return {
        **block,
        "fragments": [
            *block["fragments"],
            *(offer["related_response_fragment"] for offer in related_offers),
        ],
        "suggested_questions": list(
            dict.fromkeys(
                [
                    *(offer["suggested_questions"][0] for offer in related_offers),
                    *block["suggested_questions"],
                ]
            )
        )[:3],
    }


def combine_relevant_faq_blocks(best_block: dict, relevant_matches: list[dict]) -> dict:
    if not is_faq_block(best_block):
        return best_block

    related_faq_blocks = [
        match["block"]
        for match in relevant_matches
        if match["block"]["topic"] != best_block["topic"] and is_faq_block(match["block"]) and match["score"] >= 10
    ][:2]

    if not related_faq_blocks:
        return best_block

    return {
        **best_block,
        "fragments": [
            *best_block["fragments"],
            *(fragment for block in related_faq_blocks for fragment in block["fragments"]),
        ],
        "suggested_questions": list(
            dict.fromkeys(
                [
                    *best_block["suggested_questions"],
                    *(question for block in related_faq_blocks for question in block["suggested_questions"]),
                ]
            )
        )[:3],
    }


def is_faq_block(block: dict) -> bool:
    return block["topic"].startswith("company_faq_")


def fallback_response(query: str) -> AssistantMessageResponse:
    fallback_knowledge = load_knowledge_file(FALLBACKS_FILE)
    fallback = fallback_knowledge["unknown"]
    closest_routes = sorted(
        (
            {"route": route, "score": score_block(query, route)}
            for route in fallback_knowledge["closest_routes"]
        ),
        key=lambda match: match["score"],
        reverse=True,
    )
    closest_match = closest_routes[0]
    if closest_match["score"] < 6:
        return response_from_block(fallback, confidence=0.0, matched_topics=[])

    closest_route = closest_match["route"]
    return response_from_block(
        {
            **fallback,
            "fragments": [*fallback["fragments"], *closest_route["fragments"]],
            "cta": closest_route["cta"],
            "suggested_questions": closest_route["suggested_questions"],
        },
        confidence=0.0,
        matched_topics=[],
    )


def starting_prompts() -> list[str]:
    return load_knowledge_file(FALLBACKS_FILE)["starting_prompts"]


# Warm the approved knowledge cache when FastAPI imports the assistant engine.
load_knowledge_blocks()
