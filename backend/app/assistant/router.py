from fastapi import APIRouter

from .engine import answer_message, starting_prompts
from .schemas import (
    AssistantMessageRequest,
    AssistantMessageResponse,
    TopicResponse,
)


router = APIRouter(prefix="/assistant", tags=["assistant"])


@router.post("/message", response_model=AssistantMessageResponse)
def assistant_message(request: AssistantMessageRequest) -> AssistantMessageResponse:
    return answer_message(request.message)


@router.get("/topics", response_model=TopicResponse)
def assistant_topics() -> TopicResponse:
    return TopicResponse(prompts=starting_prompts())
