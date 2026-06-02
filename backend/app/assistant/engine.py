import json
import re
from functools import lru_cache
from pathlib import Path

from .schemas import AssistantMessageResponse


KNOWLEDGE_DIR = Path(__file__).resolve().parents[2] / "knowledge"
FALLBACKS_FILE = "fallbacks.json"


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


def normalise_query(query: str) -> str:
    return " ".join(re.findall(r"[a-z0-9+&'-]+", query.lower()))


def contains_term(query: str, term: str) -> bool:
    normalised_term = normalise_query(term)
    return bool(normalised_term) and f" {normalised_term} " in f" {query} "


def score_block(query: str, block: dict) -> int:
    score = block.get("priority", 0)
    for phrase in block.get("phrases", []):
        normalised_phrase = normalise_query(phrase)
        if contains_term(query, normalised_phrase):
            score += 12 * len(normalised_phrase.split())
    for keyword in block.get("keywords", []):
        normalised_keyword = normalise_query(keyword)
        if contains_term(query, normalised_keyword):
            score += 4 * len(normalised_keyword.split()) + 2
    return score


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
    return response_from_block(
        enrich_block_with_related_offers(best_match["block"]),
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
