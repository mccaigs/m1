# Agent Instructions

## Role

You are helping build McCaigs, Scotland's Elite Technical Studio.

Every contribution should make the product feel more precise, premium, technically serious, and commercially useful.

## Working principles

- British English.
- Deterministic first.
- Typed models.
- No hardcoded business logic.
- No fake data unless clearly labelled as mock data.
- Write tests for logic that matters.
- Prefer clear code over clever code.
- Keep the brand understated and confident.

## Stack assumptions

- Next.js 16.2+
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Convex
- Clerk
- Optional FastAPI
- Optional Pydantic

## Before building

Check:

- Is this public website, client portal, internal studio tooling, or future SaaS foundation?
- Does this need Convex, or can it be static?
- Does this need AI, or can deterministic logic solve it?
- Does this need Python, or can TypeScript handle it?
- Is the user-facing copy aligned with the McCaigs positioning?

## Code rules

- Use strict TypeScript.
- Use reusable components.
- Keep feature folders self-contained.
- Use named exports unless a framework requires default export.
- Avoid global state unless justified.
- Keep server-only code away from client components.
- Use environment variables safely.
- Add loading, empty, and error states.

## Convex rules

- Define schema carefully.
- Add indexes for common queries.
- Keep mutations small and auditable.
- Use actions for external APIs and model calls.
- Keep queries fast.
- Check organisation permissions in private functions.

## Clerk rules

- Use Clerk for identity and organisations.
- Mirror only the data needed for app queries and display.
- Handle Clerk webhooks idempotently.
- Never trust client-side role checks alone.

## AI rules

- AI explains, drafts, classifies, or summarises.
- AI does not decide business-critical truth.
- Always validate inputs before AI calls.
- Store outputs that influence project state.
- Show confidence and uncertainty where useful.

## Content rules

For Insights publishing, follow `docs/INSIGHTS.md`. Use only `src/content/insights/` and `src/lib/insights.ts`; do not introduce a second content source, CMS, blog route, or Pages Router directory.

Use phrases like:

- Scotland's Elite Technical Studio
- deterministic AI systems
- intelligent workflows
- modern digital products
- built with precision
- senior technical delivery

Avoid phrases like:

- cutting-edge AI solutions
- unlock your business potential
- AI transformation journey
- revolutionary chatbot technology
- next-generation innovation partner

## Current foundation

The repository now has a Next.js application. Run `pnpm lint` and `pnpm build` after edits. Run `npx convex dev` after linking a deployment whenever files in `convex/` change.
