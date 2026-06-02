from pydantic import BaseModel, Field


class AssistantMessageRequest(BaseModel):
    message: str = Field(min_length=1, max_length=1000)


class AssistantMessageResponse(BaseModel):
    answer: str
    confidence: float = Field(ge=0, le=1)
    matched_topics: list[str]
    cta_label: str | None = None
    cta_href: str | None = None
    suggested_questions: list[str]


class TopicResponse(BaseModel):
    prompts: list[str]
