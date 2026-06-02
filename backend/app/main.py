import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .assistant.router import router as assistant_router
from .project_builder.router import router as project_builder_router


app = FastAPI(title="McCaigs Deterministic Assistant", version="0.1.0")

allowed_origins = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:3001").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["content-type"],
)
app.include_router(assistant_router)
app.include_router(project_builder_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
