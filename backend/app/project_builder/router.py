from fastapi import APIRouter

from .engine import estimate, start_reference, store_submission
from .schemas import (
    ProjectBuilderInput,
    ProjectBuilderStartResponse,
    ProjectBuilderSubmitResponse,
    ProjectEstimate,
)


router = APIRouter(prefix="/project-builder", tags=["project-builder"])


@router.post("/start", response_model=ProjectBuilderStartResponse)
def project_builder_start() -> ProjectBuilderStartResponse:
    return ProjectBuilderStartResponse(reference=start_reference())


@router.post("/estimate", response_model=ProjectEstimate)
def project_builder_estimate(request: ProjectBuilderInput) -> ProjectEstimate:
    return estimate(request)


@router.post("/submit", response_model=ProjectBuilderSubmitResponse)
def project_builder_submit(request: ProjectBuilderInput) -> ProjectBuilderSubmitResponse:
    project_estimate = estimate(request)
    reference = store_submission(request, project_estimate)
    return ProjectBuilderSubmitResponse(estimate=project_estimate, reference=reference, stored=True)
