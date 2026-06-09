import json
import os
import tempfile
from datetime import UTC, datetime
from pathlib import Path
from uuid import uuid4

from .schemas import ProjectBuilderInput, ProjectEstimate


DATA_DIR = Path(__file__).resolve().parent.parent / "data"
SUBMISSIONS_PATH = Path(
    os.getenv(
        "PROJECT_BUILDER_SUBMISSIONS_PATH",
        str(Path(tempfile.gettempdir()) / "mccaigs-project-builder-submissions.jsonl"),
    )
)

PROJECT_SHAPES = {
    "Low": "Focused",
    "Medium": "Structured",
    "High": "Multi-part",
}


def load_json(filename: str) -> dict:
    with (DATA_DIR / filename).open(encoding="utf-8") as file:
        return json.load(file)


def start_reference() -> str:
    return f"MCG-{uuid4().hex[:10].upper()}"


def classify(problem: str) -> str:
    rules = load_json("project_rules.json")
    for rule in rules["classification_rules"]:
        if any(keyword.lower() in problem.lower() for keyword in rule["keywords"]):
            return rule["classification"]
    return "Technical review"


def score_complexity(request: ProjectBuilderInput) -> tuple[int, str]:
    weights = load_json("complexity_rules.json")
    complexity = request.complexity
    score = 0
    score += weights["users"].get(complexity.users, 0)
    score += weights["integrations"].get(complexity.integrations, 0)
    for field, weight in weights["boolean_signals"].items():
        if getattr(complexity, field):
            score += weight
    if score >= weights["thresholds"]["high"]:
        return score, "High"
    if score >= weights["thresholds"]["medium"]:
        return score, "Medium"
    return score, "Low"


def estimate(request: ProjectBuilderInput) -> ProjectEstimate:
    classification = classify(request.problem)
    score, complexity = score_complexity(request)
    project_shape = PROJECT_SHAPES[complexity]
    pricing = load_json("pricing_rules.json")["routes"][classification]
    timeline = load_json("timeline_rules.json")["routes"][classification]
    assumptions = [
        "The range assumes a focused first release.",
        "Final scope depends on requirements, integrations, data quality, urgency, and delivery constraints.",
        (
            "The project shape suggests planning around the upper part of the approved range."
            if complexity == "High"
            else "The current answers suggest a focused starting scope."
        ),
    ]
    summary = "\n".join(
        [
            f"Business Problem: {request.problem_detail or request.problem}",
            f"Desired Outcome: {request.desired_outcome_detail or request.desired_outcome}",
            f"Recommended Route: {classification}",
            f"Project Shape: {project_shape}",
            f"Indicative Budget: {pricing['range']}",
            f"Estimated Timeline: {timeline}",
        ]
    )
    return ProjectEstimate(
        assumptions=assumptions,
        classification=classification,
        complexity=complexity,
        complexity_score=score,
        indicative_budget=pricing["range"],
        likely_timeline=timeline,
        recommended_route=pricing["recommended_route"],
        summary=summary,
    )


def store_submission(request: ProjectBuilderInput, project_estimate: ProjectEstimate) -> str:
    reference = start_reference()
    SUBMISSIONS_PATH.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "estimate": project_estimate.model_dump(),
        "reference": reference,
        "submitted_at": datetime.now(UTC).isoformat(),
        "user_details": request.model_dump(),
    }
    with SUBMISSIONS_PATH.open("a", encoding="utf-8") as file:
        file.write(json.dumps(payload) + "\n")
    return reference
