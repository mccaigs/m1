# McCaigs Technical Studio Starter

## Positioning

McCaigs is Scotland's Elite Technical Studio.

The site should feel like a high-calibre creative technical partner for real businesses, not another generic AI agency, enterprise consultancy, or normal web design studio. The public positioning is built around practical AI, automation, websites, internal systems, and digital products for ambitious Scottish and UK businesses.

## Product direction

This project is the foundation for the new mccaigs.com website and studio operating system. It should support:

- A premium public website for positioning, case studies, services, and enquiries.
- A private client portal for projects, briefs, documents, builds, and delivery status.
- Deterministic AI workflows where rules, scoring, validation, and explainability come before model output.
- A future product layer for reusable internal tools, client dashboards, and SaaS experiments.

## Target stack

- Next.js 16.2+
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Convex
- Clerk
- FastAPI where a Python service is genuinely needed
- Pydantic for Python validation
- Vercel for the web app
- Convex Cloud for data, realtime state, functions, and files
- Railway or Fly.io for optional Python services

## Core principle

Do not use AI where deterministic software is better.

AI should explain, summarise, draft, classify, or assist. It should not be trusted as the first source of truth for pricing, scoring, eligibility, routing, validation, or critical project state.

## Repository structure

```txt
app/                    Next.js app routes
components/             Shared UI components
convex/                 Convex schema, queries, mutations, actions
lib/                    Shared TypeScript helpers
features/               Feature-specific modules
public/                 Static assets
styles/                 Global styles and design tokens
python/                 Optional FastAPI services
docs/                   Product, architecture, rules, tasks, evals
```

## Development commands

```bash
pnpm install
Copy-Item .env.example .env.local
pnpm dev
npx convex dev
```

Optional Python service:

```bash
cd python
uv sync
uv run fastapi dev main.py
```

## Environment variables

```bash
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
CONVEX_DEPLOYMENT=
CLERK_JWT_ISSUER_DOMAIN=
GOOGLE_APPS_SCRIPT_WEBHOOK_URL=
DIRECT_CONTACT_MOBILE=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```

Only add model provider keys when the feature genuinely requires them.

## Public website status

The public website now includes `/`, `/studio`, `/systems`, `/services`, `/assistant`, `/insights`, `/process`, `/start-project`, and `/contact`. The Assistant page contains the flagship fixed local demonstration. Start a Project owns structured qualification and an indicative planning output. The Contact page remains available for direct qualified enquiries and reveals the server-only mobile value only after an accepted submission.

The application foundation includes typed Convex schema and enquiry functions, Clerk provider and `proxy.ts` protection, sign-in routes, the protected `/app` Studio OS shell, and a health endpoint.

## Deployment

- Vercel deploys the Next.js app.
- Convex deploys backend functions, database schema, auth integration, and realtime state.
- Railway or Fly.io deploys optional Python services.
- Clerk manages authentication, organisations, and user sessions.
