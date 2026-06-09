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
- `/start-project` places the workflow on the same warm `#f6f3ec` editorial stage as the Assistant. The builder uses a light planning card, subtle navy rules, accessible light inputs, and restrained dark accents instead of a heavy grey-blue application panel.
- The final planning output includes a small Current Offers section generated from `backend/knowledge/special-offers.json`.

## Brand asset decisions

- `public/logo.svg` is the single authored McCaigs brand mark. A shared `Logo` component is used by public navigation, mobile navigation, the footer, Studio OS, loading UI, and Assistant branding. The Start a Project workspace relies on the global site header rather than repeating the brand mark inside the workflow.
- `public/favicon.ico` is served explicitly through root metadata for browser tabs, bookmarks, and search-engine icon discovery. The previous competing App Router favicon has been removed.
- Apple touch, Open Graph, and Twitter images are generated locally from `public/logo.svg`; no external asset URL is required.
- The web app manifest uses the local favicon and SVG mark with the McCaigs navy theme colour.

## Homepage publishing refinement

- The homepage hero keeps its original structure and line breaks while using a slightly tighter type scale and vertical rhythm so the next section arrives sooner.
- The former radar decoration is replaced by a muted, looping product reel generated from the local Assistant, Start a Project, and Studio OS interfaces. It is presentation-only, uses demo data, and has no external media dependency.
- The technology ecosystem copy now explains the commercial value of proven infrastructure: faster delivery, dependable foundations, and less spend recreating solved technology.
- The OpenAI workshop tile uses the current Blossom mark as a local asset. The remaining technology tiles continue to use aligned monochrome vector marks from `simple-icons`.

## Mobile navigation refinement

- The public mobile drawer uses a compact `100dvh` shell with a fixed logo and close-button header plus a dedicated `overflow-y-auto` content region.
- Primary links retain comfortable tap targets with tighter spacing. Client portal and Start a Project actions remain grouped below the main navigation so short portrait and landscape screens can reach every route without changing the desktop header.

## Mobile homepage refinement

- Homepage sections now use a tighter mobile rhythm while restoring the established spacing from the `sm` breakpoint upwards, preserving the desktop composition.
- The mobile hero reaches the product reel sooner, technology cards use compact workshop spacing, editorial comparison and classified-build sections carry less empty space, and problem/service cards are easier to scan.
- The closing CTA and footer use reduced mobile padding while retaining accessible links and button targets.

## Technical SEO and entity decisions

- `src/lib/seo.ts` is the source of truth for the production origin, public route metadata, factual FAQ answers, and McCaigs entity schema. Production canonicals and social image URLs resolve against `https://mccaigs.com`; preview hosts must not leak into metadata.
- Every public route exports specific metadata through the shared helper. `/app`, `/sign-in`, and `/sign-up` explicitly opt out of indexing.
- `robots.txt` and `sitemap.xml` are generated through App Router metadata routes. The sitemap contains the public route inventory and describes the homepage product reel as a local video asset.
- Root JSON-LD identifies McCaigs, `MCCAIGS GROUP LTD`, Edinburgh, the LinkedIn and X profiles, the website SearchAction, and the six approved service areas. The SearchAction opens the deterministic Assistant with a prefilled question and never invokes an unrestricted model.
- The homepage FAQ is visible editorial content backed by the same factual data as its FAQPage JSON-LD. Answers remain concise and do not make invented client, scale, or performance claims.
- The footer is a restrained studio directory: public routes, technologies, company access, social profiles, legal entity name, and Edinburgh location. It reinforces trust without adding a logo strip or changing the locked visual system.

## MDX Insights decisions

- `src/content/insights/` is the only source of truth for editorial posts. Each note is one `.mdx` file with reviewed frontmatter and content; there is no CMS, database, admin surface, or competing article model.
- `src/lib/insights.ts` reads local files during server rendering and static generation. Public routes expose only `published` notes, sort newest first, derive reading time when it is omitted, tolerate incomplete private drafts, and throw during a build when published metadata is incomplete or inconsistent.
- `/insights/[slug]` uses App Router static params and server-side MDX compilation. MDX remains content-only and receives owned McCaigs components rather than a generic typography layer.
- Article metadata includes production canonicals, article-specific Open Graph and Twitter cards, tags, publication dates, and Article JSON-LD. Published note URLs are appended to the generated sitemap.
- `docs/INSIGHTS.md` is the publishing runbook for editors and coding assistants. `pnpm validate:insights` provides a quick local publish gate before lint and the full production build.

## Studio OS Blog publishing

- `/app/blog` is an owner-only publishing surface backed by Convex metadata and the existing `src/content/insights/` MDX source.
- `blogPosts` stores workflow state, author keys, SEO metadata, scheduling, and the matching local content filename. Article body content is never stored in Convex.
- Owners can create, edit, preview, publish, schedule, archive, and delete posts. File operations pass through an authenticated Node.js route handler and preserve the MDX body when frontmatter changes.
- The Blog form separates Convex metadata from a large `MDX Content` body editor. Each save generates the final file by combining managed frontmatter with the submitted MDX body; pasted frontmatter is ignored.
- Tags are defensively normalised from comma-separated strings, string arrays, or empty values before validation, storage, MDX generation, and rendering.
- Scheduled posts are promoted by a Convex cron and are also treated as public at query time once due, preventing cron timing from delaying publication.
- Public `/blog` routes are dynamically rendered from published Convex metadata and local MDX, with article metadata, JSON-LD, author profiles, and sitemap entries.
- `BLOG_WRITE_MODE=local` writes directly to the development working tree. `BLOG_WRITE_MODE=github` commits through the server-only GitHub Contents API; production defaults to GitHub mode because Vercel Function filesystems are ephemeral.
- GitHub mode requires `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`, and `GITHUB_TOKEN`. The token stays server-only and requires repository content write access.
- Convex records the repository path, blob SHA, last commit SHA/URL, sync timestamp, status, and safe error. Metadata is saved as pending before a commit, allowing failed syncs to remain visible and retryable.
- Featured images use `public/content/insights/` in both modes. GitHub mode commits the binary asset and stores its public path in Convex with the next metadata save.
- Scheduling never depends on a deployment-time frontmatter change. The file is committed immediately and Convex remains authoritative for visibility and the scheduled-to-published transition.
- A GitHub content commit triggers the normal Vercel Git deployment. Failed syncs are repaired from the edit screen with Retry GitHub sync.

## Studio OS operations foundation

- `/sign-in` and `/sign-up` use Clerk App Router components and return authenticated users to `/app`.
- `src/proxy.ts` performs the optimistic `/app/*` protection check. The authenticated app layout also verifies the Clerk session so proxy is not the only authorization boundary.
- Convex is the authoritative permission boundary. Queries and mutations resolve the signed-in identity through `convex/studioAuth.ts` before returning or changing operational data.
- `mccaigsgroup@gmail.com` is always resolved and persisted as the `owner` role. Other new identities default to `client` until the owner changes their role.
- Studio roles are `owner`, `admin`, `staff`, and `client`. Client reads are scoped to client records matched by Clerk user ID or email, and internal project updates are filtered at the query layer.
- The operational model includes clients, projects, project assets, project updates, lead assignments, and user roles. URL-based project resources are used until a storage workflow is deliberately added.
- The Studio OS routes are `/app`, `/app/leads`, `/app/clients`, `/app/projects`, `/app/projects/[projectId]`, `/app/tasks`, `/app/activity`, and `/app/settings`.
- Lead records can be converted into clients, used to seed a project, or assigned to an existing project. These actions create explicit `leadAssignments` records.
- Existing project fields remain compatible with the earlier schema while new mutations enforce the Studio OS project shape.
- `studioSeed.seedStudioData` is an owner-only, idempotent Studio OS bootstrap mutation. It creates or repairs the internal `McCaigs Studio` client, six initial portfolio projects, one internal creation update per project, and stable `studioSeed` assignment records keyed by project slug.
- The owner Settings screen exposes the seed action under Developer Tools and reports created versus existing records after each run.
