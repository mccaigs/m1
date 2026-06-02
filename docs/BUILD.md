# Build Notes

## Current direction

McCaigs is being repositioned as Scotland's Elite Technical Studio.

The build should support a premium public website, a future client portal, and reusable deterministic AI product foundations.

## Key decisions

### Use Next.js 16.2+

Use the App Router, TypeScript, React Server Components where appropriate, and modern metadata handling.

### Use Convex as the primary backend

Convex should handle application data, realtime state, functions, files, scheduled jobs, and workflow orchestration.

### Use Clerk for authentication

Clerk should handle users, sessions, organisations, and account management.

### Use FastAPI only when needed

Python should be optional, not automatic. Use it for scoring engines, evaluation pipelines, document analysis, or Python-only integrations.

### Keep AI behind deterministic workflows

The studio's technical differentiation is that systems are explainable, validated, and practical. AI should add leverage, not chaos.

## Lessons to preserve

- Avoid unnecessary model usage.
- Avoid generic AI positioning.
- Build repeatable foundations.
- Keep project state structured.
- Make every AI feature auditable.
- Do not over-engineer the first version.

## Suggested first build order

1. Public website shell.
2. Design system tokens and base components.
3. Homepage sections.
4. Contact form into Convex.
5. Clerk authentication.
6. Client portal shell.
7. Projects schema.
8. Project updates and tasks.
9. AI-assisted summaries.
10. Evals and monitoring.

## Build quality bar

A feature is not complete until it has:

- Empty state.
- Loading state.
- Error state.
- Basic accessibility.
- Mobile layout.
- Validation.
- Clear copy.
- Test coverage where logic matters.

## First release decisions

- Next.js `16.2.6` and React `19.2.4` are pinned by the initial scaffold.
- Tailwind CSS v4 and shadcn/ui provide the owned component foundation.
- Clerk is wired through `src/proxy.ts`, following the Next.js 16 proxy convention.
- Convex is wired through `ConvexProviderWithClerk` and `convex/auth.config.ts`.
- The public site can render without external credentials so design review is not blocked by service setup.
- Public enquiry validation is shared through a typed Zod schema before the Convex mutation is called.

## Refinement decisions

- The homepage hero now uses a more editorial, asymmetric composition with a restrained technical system panel rather than a generic SaaS layout.
- Public copy emphasises direct senior involvement, operational truth, and selective engagements.
- Codenamed selected systems include technical signals such as validation gates, workflow state, traceability, and audit trails without inventing client claims.
- The enquiry form exposes preview mode before submission, reports field-level errors, and uses a dedicated success state with a human-review message.
- Budget and project-type values are constrained consistently in the Zod schema, Convex mutation arguments, and Convex table schema.
- `/app` is now a Studio OS foundation with overview, projects, systems, tasks, and activity routes. Preview content is explicitly labelled and does not represent live client data.

## Multi-page studio website decisions

- The visual system is locked. The public site has been restructured into `/`, `/studio`, `/systems`, `/services`, `/process`, and `/contact` without redesigning the brand.
- The homepage is intentionally concise: hero, short positioning, capability preview, selected systems preview, and a contact CTA.
- The contact page owns qualification. Its assistant is deterministic and local: fixed knowledge topics, fixed responses, and a controlled fallback. No LLM is called.
- The contact form validates fields, timeline, consent, and the deterministic captcha before calling `POST /api/enquiries`.
- `GOOGLE_APPS_SCRIPT_WEBHOOK_URL` and `DIRECT_CONTACT_MOBILE` are server-only environment variables. The direct mobile number is returned only after the webhook accepts a qualified submission.
- The existing typed Convex enquiry foundation remains available for future portal and workflow integration.

## SME repositioning decisions

- The locked dark technical design system remains intact. The public language is warmer, clearer, and more relevant to Scottish SMEs, startups, owner-led businesses, and specialist firms.
- The homepage now includes six recognisable operational problems: scattered enquiries, repeated admin, knowledge trapped in people's heads, underperforming websites, software workarounds, and unclear AI opportunities.
- Public copy avoids enterprise transformation language and reduces repeated use of `deterministic`. The simpler public principle is: AI where it helps, software where it matters, human judgement where it counts.
- Services are grouped as AI & Business Automation, Internal Business Systems, Websites & Digital Platforms, Controlled AI Assistants, Product & SaaS Development, and Technical Reviews & AI Audits.
- The Services page includes typical engagement shapes and timing ranges to signal SME/startup accessibility without publishing fixed prices.

## Homepage credibility decisions

- The homepage now places a workshop-style technology ecosystem directly below the hero. It presents OpenAI, Anthropic, Google AI, Convex, Clerk, Vercel, Next.js, and TypeScript as integrated build components, never as endorsements or partners.
- Technology marks use palette-adapted vectors from `simple-icons` where available. The interface keeps the marks monochrome and secondary to the system labels.
- A practical intelligence comparison makes the studio's logic-first position explicit: do not pay for intelligence when logic is enough.
- The homepage studio-note cards use the same shared codenamed build records as the Systems page, including problem, solution, outcome, and build-time fields.

## Business-owner clarity decisions

- The visual design remains locked. This pass changes copy and section order only.
- The Services page begins with six recognisable operational problems before introducing any service category. Each problem includes a useful business outcome so readers can identify the value before the type of build.
- The homepage operational-problems cards now sit directly before the services teaser and use plain-English descriptions without implementation language.
- Public Services copy avoids consultancy-contrast phrasing and focuses on missed opportunities, repeated admin, scattered information, underperforming websites, and tools that no longer fit.

## Assistant and insights decisions

- The visual design remains locked. The assistant pass uses existing cards, labels, spacing, and colour tokens without introducing new effects.
- Public navigation now exposes Studio, Systems, Services, Assistant, Insights, Process, and Contact. Client Portal remains available as a separate existing-customer utility.
- `/assistant` is the flagship deterministic assistant demonstration. It reuses the fixed local knowledge base, predefined topic matching, and controlled fallback rather than calling a model.
- `/contact` now stays focused on qualification and links to the Assistant demonstration for visitors who want to check fit first.
- `/insights` establishes the static editorial route and topic structure before repository-managed posts are added.

## Guided assistant architecture

- `/assistant` is a standalone conversation-first experience rather than a Q&A or documentation page. A short introduction leads directly into the full-width assistant shell.
- The shell includes a seeded approved response, user bubbles, an initial thinking state, character-by-character progressive reveal with short punctuation pauses, suggested prompts, contextual actions, conversation history, and a sticky composer.
- Progressive reveal is presentation only. The approved deterministic result is selected before display, reduced-motion preferences skip staged animation, and assistive technology receives the complete approved response.
- `/assistant` contains only the dark hero, the warm off-white assistant stage, and the standard site footer. The interaction demonstrates the concept without a supporting explainer section.
- The assistant stage is a centred editorial layout on one continuous `#f6f3ec` background. It has no enclosing dashboard panel, coloured header strip, fixed-height scroll panel, or dark composer bar.
- Suggested questions use a compact responsive wrapped layout rather than horizontal scrolling.
- The Assistant remains a demonstration and does not generate project estimates. It may present reviewed fixed offers from the approved JSON corpus; broader pricing questions still route to `/start-project`.
- Assistant CTAs use explicit white text so dark buttons remain readable on the warm editorial background.
- The frontend calls `NEXT_PUBLIC_ASSISTANT_API_URL` when configured. A constrained local fallback keeps preview deployments usable.
- `backend/knowledge/` is the canonical assistant knowledge layer. The Python service discovers approved topic and offer files automatically, while preview mode imports the same reviewed corpus.
- The Python composer normalises the question, scores approved phrases and keywords, retrieves the strongest reviewed block, combines its fragments into British English copy, and returns confidence, matched topics, CTA metadata, and suggested questions.
- `business-questions.json` adds practical SME coverage for customer service, quoting, data quality, integrations, maintenance, SEO, lead generation, and audience fit across owner-managed Scottish and UK businesses.
- `special-offers.json` is a first-class ranked knowledge source. Its Standard Business Website offer is reused by the Assistant and the Start a Project summary rather than duplicated in frontend copy.
- Broader budget answers retain their approved planning guidance and append a related reviewed offer fragment when one exists.
- `backend/` contains a Python 3.12 FastAPI service prepared for Railway. Its project-builder JSON files remain separate from the assistant knowledge corpus.
- The Assistant service exposes `POST /assistant/message` and `GET /assistant/topics`. Matching and composition are deterministic; no model provider is called.

## Project-builder architecture

- Every public Start a Project CTA routes to `/start-project`, which owns structured qualification and indicative planning.
- The project builder collects business details, the operational problem, desired outcome, deterministic classification, and weighted complexity signals before returning an approved range and structured summary.
- The backend exposes `POST /project-builder/start`, `POST /project-builder/estimate`, and `POST /project-builder/submit`.
- Submitted builder records include user details, classification, complexity score, generated estimate, and summary. The Railway skeleton uses an append-only JSONL submission path configured through `PROJECT_BUILDER_SUBMISSIONS_PATH`; production should point this at suitable persistent storage.
- The estimator never produces a binding quotation or invents pricing.
- `/start-project` keeps its dark project-builder card but now places the workflow on the same warm `#f6f3ec` editorial stage as the Assistant.
- The final planning output includes a small Current Offers section generated from `backend/knowledge/special-offers.json`.

## Brand asset decisions

- `public/logo.svg` is the single authored McCaigs brand mark. A shared `Logo` component is used by public navigation, mobile navigation, the footer, Studio OS, loading UI, Assistant branding, and the Start a Project workflow.
- `public/favicon.ico` is served explicitly through root metadata for browser tabs, bookmarks, and search-engine icon discovery. The previous competing App Router favicon has been removed.
- Apple touch, Open Graph, and Twitter images are generated locally from `public/logo.svg`; no external asset URL is required.
- The web app manifest uses the local favicon and SVG mark with the McCaigs navy theme colour.
