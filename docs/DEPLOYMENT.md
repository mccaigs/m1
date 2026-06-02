# Deployment

## Environments

Use three environments:

- Local
- Preview
- Production

## Hosting

### Vercel

Hosts the Next.js application.

Responsibilities:

- Public website.
- Client portal frontend.
- Route handlers.
- Edge-safe middleware.
- Preview deployments.

### Convex Cloud

Hosts the primary backend.

Responsibilities:

- Database.
- Queries and mutations.
- Actions.
- Scheduled functions.
- File storage.
- Realtime state.

### Clerk

Hosts authentication and organisation management.

Responsibilities:

- User sessions.
- Sign-in and sign-up.
- Organisations.
- User profile management.
- Webhooks.

### Railway or Fly.io

Hosts the Python 3.12 deterministic assistant service.

Responsibilities:

- Approved JSON business knowledge.
- Deterministic intent matching.
- Controlled fallbacks.
- Rules-based project qualification and indicative planning ranges.

## Environment variables

Vercel:

```bash
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
GOOGLE_APPS_SCRIPT_WEBHOOK_URL=
DIRECT_CONTACT_MOBILE=
NEXT_PUBLIC_ASSISTANT_API_URL=
```

Convex:

```bash
CLERK_JWT_ISSUER_DOMAIN=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```

Python service, if used:

```bash
ALLOWED_ORIGINS=https://www.mccaigs.com
PROJECT_BUILDER_SUBMISSIONS_PATH=/data/mccaigs-project-builder-submissions.jsonl
```

## Deployment checks

Before production deploy:

- TypeScript passes.
- Lint passes.
- Convex schema deploys.
- Clerk auth works.
- Contact form creates enquiry.
- Protected routes reject unauthenticated users.
- Organisation permissions are enforced.
- Health endpoint returns OK.
- CORS is locked down for any external API.
- Error monitoring is configured.
- No secrets are exposed client-side.
- Qualified enquiries reach the Google Apps Script webhook.
- Direct mobile contact is absent from the initial page payload and revealed only after accepted submission.
- Assistant API uses the Railway URL from `NEXT_PUBLIC_ASSISTANT_API_URL`.
- Assistant responses stay within approved JSON knowledge.
- Project builder returns only approved indicative ranges.
- Project-builder submission storage is configured for the production environment.

## First release note

The public website can deploy without service credentials for visual review. Production enquiry handling requires the server-only Apps Script webhook and direct mobile values. Portal access requires Clerk and Convex environment variables before launch.

## Monitoring

Track:

- Contact form submissions.
- Enquiry conversion.
- API failures.
- Convex function errors.
- Model provider failures.
- Latency.
- Auth errors.
- Client portal activity.

## Rollback

Use Vercel rollback for frontend issues.

Use Convex deploy history and schema discipline for backend changes.

Avoid destructive migrations without a written rollback note.
