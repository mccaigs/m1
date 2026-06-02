# McCaigs Technical Studio

Multi-page public website and Studio OS foundation for McCaigs, Scotland's Elite Technical Studio for practical AI, automation, websites, internal systems, and digital products.

## Stack

- Next.js 16.2 App Router
- TypeScript and Tailwind CSS
- shadcn/ui
- Convex
- Clerk
- Vercel deployment target

## Run locally

```bash
pnpm install
Copy-Item .env.example .env.local
pnpm dev
```

The public website remains previewable without service keys. The gated contact flow activates once its server-only webhook and mobile settings are configured. Protected portal access activates once Convex and Clerk are configured.

The `/assistant` route uses an approved local deterministic fallback when `NEXT_PUBLIC_ASSISTANT_API_URL` is empty. The `/start-project` route provides a separate deterministic qualification and indicative planning flow. Set that variable to the Railway service URL to use the Python 3.12 backend for both experiences.

The Python Assistant discovers its reviewed JSON knowledge sources in `backend/knowledge/`, scores normalised phrases and keywords, ranks approved offers, and returns approved response fragments with structured CTA and follow-up metadata. It never calls a general-purpose language model. The preview fallback imports the same approved corpus so local and API-backed behaviour stay aligned.

## Configure services

1. Run `npx convex dev` and follow the prompt to link a Convex deployment.
2. Add the generated `NEXT_PUBLIC_CONVEX_URL` and `CONVEX_DEPLOYMENT` values to `.env.local`.
3. Create a Clerk application and activate its Convex integration.
4. Add the Clerk publishable key, secret key, and Frontend API URL as `CLERK_JWT_ISSUER_DOMAIN`.
5. Add `CLERK_JWT_ISSUER_DOMAIN` to the Convex dashboard environment variables, then run `npx convex dev` again.

## Configure qualified enquiries

Add these server-only values to `.env.local` and Vercel:

```bash
GOOGLE_APPS_SCRIPT_WEBHOOK_URL=
DIRECT_CONTACT_MOBILE=
```

`POST /api/enquiries` validates the structured payload, consent, and deterministic captcha before calling the Google Apps Script webhook. The direct mobile number is returned only after the webhook accepts a qualified enquiry. Do not prefix either value with `NEXT_PUBLIC_`.

## Run the deterministic assistant backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Then set:

```bash
NEXT_PUBLIC_ASSISTANT_API_URL=http://localhost:8000
PROJECT_BUILDER_SUBMISSIONS_PATH=./data/project-builder-submissions.jsonl
```

`PROJECT_BUILDER_SUBMISSIONS_PATH` is a backend-only setting. Use a persistent volume path in Railway when submitted project summaries need to survive deployments.

## Quality checks

```bash
pnpm lint
pnpm build
```

Product and engineering documentation lives in [`docs/`](./docs).
