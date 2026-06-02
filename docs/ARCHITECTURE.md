# Architecture

## Overview

McCaigs uses a modern TypeScript-first architecture with Convex as the main backend layer and Clerk for authentication.

The platform should be simple enough to ship quickly, but structured enough to support a serious studio website, client portal, internal tools, and future SaaS products.

## Core flow

```txt
Browser
  ↓
Next.js 16.2+ App Router
  ↓
Clerk authentication
  ↓
Convex queries, mutations, actions
  ↓
Convex database, files, scheduled functions
  ↓
Optional FastAPI services
  ↓
Deterministic engines, external APIs, model providers
```

## Frontend

Use Next.js App Router with TypeScript.

Responsibilities:

- Public marketing pages.
- Authenticated client portal.
- Server components where appropriate.
- Client components for interactive views.
- Design system integration.
- Form handling.
- SEO metadata.

The public marketing page is server-rendered by default. Client boundaries are limited to the provider bridge, mobile navigation, and enquiry form.

## Authentication

Use Clerk for:

- Sign-in and sign-up.
- User identity.
- Organisations.
- Role-based access.
- Session management.
- Webhooks into Convex.

The first release uses Clerk's Next.js 16 `clerkMiddleware()` integration in `src/proxy.ts`. The public site remains previewable without credentials; configured environments protect `/app`.

Roles:

- Owner
- Studio admin
- Team member
- Client admin
- Client member

## Convex

Use Convex as the primary application backend.

Responsibilities:

- Database schema.
- Queries and mutations.
- Realtime project state.
- Contact enquiries.
- Client portal data.
- Scheduled tasks.
- File metadata.
- Webhook processing.
- Server-side workflow orchestration.

## Optional FastAPI service

Use Python only when it is genuinely useful.

Good reasons:

- Complex scoring engines.
- Data processing.
- Heavy integrations.
- Specialist AI evaluation pipelines.
- Python-only libraries.

Bad reasons:

- Basic CRUD.
- Simple forms.
- Anything Convex can handle cleanly.

## Deterministic engine

Use deterministic logic for:

- Lead scoring.
- Project qualification.
- Routing.
- Status rules.
- Validation.
- Pricing bands.
- Fit analysis.
- Evaluation checks.

AI may explain the result, but it should not invent the result.

## AI providers

AI should be wrapped behind provider abstractions.

Use cases:

- Summarising project briefs.
- Drafting internal notes.
- Generating proposal outlines.
- Analysing uploaded discovery documents.
- Explaining deterministic scores.

Rules:

- Never call an LLM before validation.
- Never let an LLM be the only source of truth.
- Store prompts, model, provider, output, and review status where relevant.

## Data ownership

Convex stores application data. External APIs should be treated as dependencies, not foundations.

Project state must remain usable even if a model provider or external integration fails.
