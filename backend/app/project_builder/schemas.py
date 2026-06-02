from typing import Literal

from pydantic import BaseModel, Field


ProjectClassification = Literal[
    "Technical review",
    "Website and workflow upgrade",
    "Automation project",
    "Internal system",
    "Controlled AI assistant",
    "Product / SaaS build",
]


class ComplexityInput(BaseModel):
    admin_area_required: bool = False
    ai_required: bool = False
    existing_software: bool = False
    human_review: bool = False
    integrations: str
    login_required: bool = False
    payments_required: bool = False
    users: str


class ProjectBuilderInput(BaseModel):
    company: str = Field(min_length=2, max_length=140)
    complexity: ComplexityInput
    desired_outcome: str = Field(min_length=2, max_length=240)
    desired_outcome_detail: str = Field(min_length=15, max_length=1200)
    email: str = Field(pattern=r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
    industry: str = Field(min_length=2, max_length=120)
    name: str = Field(min_length=2, max_length=100)
    problem: str = Field(min_length=2, max_length=240)
    problem_detail: str = Field(min_length=15, max_length=1200)
    website: str | None = Field(default=None, max_length=240)


class ProjectBuilderStartResponse(BaseModel):
    reference: str


class ProjectEstimate(BaseModel):
    assumptions: list[str]
    classification: ProjectClassification
    complexity: Literal["Low", "Medium", "High"]
    complexity_score: int
    indicative_budget: str
    likely_timeline: str
    recommended_route: str
    summary: str


class ProjectBuilderSubmitResponse(BaseModel):
    estimate: ProjectEstimate
    reference: str
    stored: bool
