# System Rules

## Core rule

Deterministic first. AI second. Human accountable.

## Engineering rules

- Use TypeScript strictly.
- Validate inputs at every boundary.
- Use Convex validators for backend functions.
- Use Pydantic for Python services.
- Do not hardcode business-critical values.
- Keep configuration in typed constants or environment variables.
- Prefer simple architecture over clever architecture.
- Write tests for scoring, validation, and routing logic.
- Log important state changes.
- Handle failure states properly.

## AI rules

- Never call an LLM first.
- Never use AI as the only source of truth.
- Never hide uncertainty.
- Label AI-generated content.
- Store AI run metadata when outputs affect a project.
- Use deterministic checks before and after model calls.
- Prefer small prompts with clear inputs and expected outputs.
- Do not send sensitive client data to providers unless approved.

## Product rules

- Truth over fluency.
- Clarity over hype.
- Build useful systems before impressive demos.
- Every feature must support positioning, delivery, or client value.
- Avoid bloated dashboards.
- Avoid chatbot-first experiences unless chat is genuinely the best interface.

## Design rules

- Use the McCaigs colour system.
- Keep the interface calm, premium, and precise.
- Make mobile feel first-class.
- Use animation sparingly.
- Avoid generic AI visuals.
- Do not invent fake client logos, numbers, or claims.

## Content rules

- British English.
- No em dashes.
- No generic AI agency language.
- Avoid overclaiming.
- Use grounded examples.
- Explain technical concepts in plain language.

## First release application rule

Public pages must remain reviewable when Convex or Clerk credentials are absent. Interactive features should expose a clear setup or retry state instead of failing silently.
