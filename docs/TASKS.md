# Tasks

## Phase 1 - Foundation

- [x] Create Next.js 16.2+ project.
- [x] Configure TypeScript strict mode.
- [x] Configure Tailwind CSS.
- [x] Add shadcn/ui.
- [x] Add base layout and metadata.
- [x] Create brand colour tokens.
- [x] Create typography scale.
- [x] Add linting.

## Phase 2 - Convex and Clerk

- [x] Initialise Convex foundation.
- [x] Define initial Convex schema.
- [x] Add Clerk.
- [x] Configure protected routes.
- [ ] Configure Clerk organisation support.
- [ ] Add Clerk webhook route.
- [x] Mirror required role identity data into Convex.
- [x] Add permission helpers.

## Phase 3 - Public website

- [x] Build homepage hero.
- [x] Build proof strip.
- [x] Build what we build section.
- [x] Build studio method section.
- [x] Build selected builds section.
- [x] Build services section.
- [ ] Build insights preview.
- [x] Build contact CTA.
- [x] Add mobile navigation.
- [x] Add SEO metadata.

## Phase 4 - Contact and enquiries

- [x] Build contact form.
- [x] Add validation.
- [x] Save enquiries to Convex.
- [ ] Add deterministic fit scoring.
- [ ] Add studio notification flow.
- [x] Add enquiry admin view.
- [x] Add status updates.
- [x] Add conversion from enquiry to project.

## Phase 5 - Client portal

- [x] Create authenticated portal layout.
- [x] Add Studio OS overview navigation.
- [x] Add projects, systems, tasks, and activity foundation routes.
- [x] Add polished workspace empty states.
- [ ] Add organisation switcher.
- [x] Add projects list.
- [x] Add project detail page.
- [x] Add project updates.
- [ ] Add project tasks.
- [x] Add document metadata.
- [x] Add visibility rules for internal and client content.

## Studio OS operations dashboard

- [x] Add Clerk sign-in and sign-up routes with `/app` redirects.
- [x] Protect `/app/*` in both proxy and the authenticated layout.
- [x] Automatically assign the primary McCaigs email to the owner role.
- [x] Add owner, admin, staff, and client role records and Convex permission helpers.
- [x] Add clients, projects, project assets, project updates, and lead assignments.
- [x] Add role-aware studio and client navigation.
- [x] Add live overview metrics and recently updated projects.
- [x] Add lead conversion, project creation, and existing-project assignment actions.
- [x] Add client creation and Clerk identity linking fields.
- [x] Add project filtering, creation, status control, updates, internal notes, and URL resources.
- [x] Add owner-only user and role management settings.
- [x] Add an owner-only idempotent Studio OS seed action for the initial McCaigs client and project portfolio.
- [ ] Add Clerk invitation and webhook-backed user provisioning.
- [ ] Add explicit staff assignment controls to project settings.
- [ ] Add project task CRUD and due-date workflows.
- [ ] Add Convex file storage after the URL-resource workflow is proven.

## Phase 6 - AI assistance

- [ ] Add AI provider abstraction.
- [ ] Add brief summary action.
- [ ] Add proposal outline draft action.
- [ ] Add fit score explanation action.
- [ ] Store AI run metadata.
- [ ] Add human review state.
- [ ] Add eval dataset.

## Phase 7 - Content system

- [x] Add markdown or MDX insights.
- [x] Add Convex Blog post metadata.
- [x] Add owner-only Studio OS Blog management.
- [x] Add local MDX creation and frontmatter editing.
- [x] Add Blog scheduling and public publication queries.
- [x] Replace production filesystem writes with a GitHub-backed commit workflow.
- [ ] Add scheduled style or formatting checks.
- [ ] Add related posts.
- [x] Add sitemap.

## Phase 8 - Deployment

- [ ] Configure Vercel project.
- [ ] Configure Convex production deployment.
- [ ] Configure Clerk production keys.
- [ ] Add environment variables.
- [x] Add health check.
- [ ] Test protected routes.
- [ ] Test enquiry flow.
- [ ] Test mobile performance.
- [ ] Launch production.

## Phase 9 - Monitoring and improvement

- [ ] Add error monitoring.
- [ ] Add analytics.
- [ ] Track enquiry conversion.
- [ ] Track function failures.
- [ ] Review AI outputs.
- [ ] Run evals after prompt changes.
- [ ] Maintain changelog.

## Refinement pass

- [x] Sharpen homepage hierarchy and studio positioning copy.
- [x] Refine selected systems with credible technical signals.
- [x] Improve enquiry form options, field validation, preview fallback, and success state.
- [x] Constrain enquiry enums at the Convex mutation and schema layers.
- [x] Expand `/app` into a labelled Studio OS foundation.
- [x] Add clearly marked preview workspace content where useful.

## Multi-page public website

- [x] Lock the existing premium technical visual direction.
- [x] Restructure the public site into home, studio, systems, services, process, and contact routes.
- [x] Keep the homepage concise with previews and a contact CTA.
- [x] Add active desktop and mobile public navigation states.
- [x] Expand studio, systems, services, and process content in British English.
- [x] Move qualification into the dedicated contact page.
- [x] Add a reusable deterministic enquiry assistant with fixed local knowledge and fallback handling.
- [x] Add a gated contact form with timeline, consent, and deterministic captcha fields.
- [x] Add server-only Google Apps Script webhook submission.
- [x] Reveal the server-only direct mobile number only after accepted submission.

## SME repositioning

- [x] Preserve the premium technical visual system while making the brand more approachable.
- [x] Reframe the homepage around practical AI, automation, websites, internal systems, and digital products.
- [x] Add the six-card typical problems section.
- [x] Rewrite Services into six business-facing groups.
- [x] Add typical engagement shapes with SME/startup timing signals.
- [x] Reduce jargon and repeated public use of deterministic language.
- [x] Align studio, systems, process, contact, and assistant copy with the approachable business-facing tone.

## Homepage credibility layer

- [x] Add a mission-control technology ecosystem beneath the hero without partner or endorsement claims.
- [x] Render monochrome technology marks as workshop components with subtle animated connection paths.
- [x] Add the practical intelligence comparison and core logic-first statement.
- [x] Replace the homepage systems preview with classified studio-note cards grounded in shared project data.

## Business-owner clarity pass

- [x] Keep the locked homepage design and move the plain-English operational problems section directly before the services teaser.
- [x] Add a major common-problems section to Services before the solution categories.
- [x] Frame each common problem with a commercially useful outcome.
- [x] Remove remaining public consultancy-contrast phrasing from Services and the enquiry assistant.

## Assistant and insights routes

- [x] Restructure public navigation around prospect exploration routes and move Client Portal into a utility position.
- [x] Add a dedicated `/assistant` flagship route using the fixed local knowledge base.
- [x] Add chatbot comparison, fallback explanation, practical use cases, and logic-first studio philosophy sections.
- [x] Refocus `/contact` on qualified enquiries with a clear link to the Assistant demonstration.
- [x] Add an `/insights` publishing foundation for practical studio notes and future repository-managed content.

## Guided assistant

- [x] Rework `/assistant` into a conversation-first guided consultation.
- [x] Add seeded approved response, prompt bubbles, staged replies, follow-ups, contextual actions, and sticky input.
- [x] Refocus `/assistant` as a standalone assistant experience with progressive deterministic response reveal.
- [x] Respect reduced-motion preferences and expose complete approved answers to assistive technology.
- [x] Add approved business-owner paths for SMEs, ordinary businesses, studio difference, and Start a Project guidance.
- [x] Simplify `/assistant` to hero, warm assistant stage, and footer with wrapped suggested questions.
- [x] Flatten the assistant stage into a centred editorial layout without a secondary wrapper panel.
- [x] Make dark assistant CTA text explicitly white for readable contrast.
- [x] Replace the Python assistant one-liner lookup with an auto-discovered approved JSON knowledge layer.
- [x] Return structured assistant metadata: answer, confidence, matched topics, CTA, and suggested questions.
- [x] Stream approved frontend responses character by character with deliberate punctuation pauses.
- [x] Add a Python 3.12 FastAPI assistant service with Railway configuration and approved JSON knowledge.
- [x] Connect the frontend through `NEXT_PUBLIC_ASSISTANT_API_URL` with an approved local preview fallback.
- [x] Add deterministic message and topic routes.
- [x] Expand approved Assistant coverage for practical Scottish and UK business-owner questions.
- [x] Add helpful closest-route fallback handling for unknown Assistant questions.
- [x] Load the ranked Standard Business Website offer from `backend/knowledge/special-offers.json`.

## Start a Project workflow

- [x] Keep Assistant as a demonstration and move qualification into `/start-project`.
- [x] Route every public Start a Project CTA into the structured project builder.
- [x] Add six-step discovery, deterministic classification, weighted complexity scoring, approved planning ranges, and structured summary.
- [x] Add email-summary, PDF-download, qualified-enquiry, and initial-conversation handoffs.
- [x] Add `POST /project-builder/start`, `POST /project-builder/estimate`, and `POST /project-builder/submit`.
- [x] Store submitted details, classification, complexity score, estimate, and summary in the backend submission store.
- [x] Place the project-builder workflow on the warm off-white editorial stage.
- [x] Restyle the project builder as a light premium planning workspace aligned with the Assistant experience.
- [x] Remove the redundant in-workspace logo panel and left-align the qualification header.
- [x] Generate the final Current Offers summary from the approved special-offers JSON source.

## Brand assets and metadata

- [x] Add a shared Logo component backed by `public/logo.svg`.
- [x] Apply the canonical logo across public, mobile, Studio OS, loading, Assistant, and Start a Project surfaces.
- [x] Serve `public/favicon.ico` through root App Router metadata.
- [x] Generate local Apple touch, Open Graph, and Twitter assets from the canonical logo.
- [x] Add a local web app manifest with McCaigs branding.

## Homepage publishing refinement

- [x] Tighten the homepage hero scale and spacing without changing its structure or line breaks.
- [x] Replace the hero radar decoration with a muted looping product reel using real local McCaigs interfaces and clearly labelled demo data.
- [x] Explain the client value of the technology ecosystem in plain commercial language.
- [x] Replace the OpenAI placeholder mark with the current Blossom asset and review the remaining monochrome technology marks for consistency.

## Mobile navigation refinement

- [x] Replace the oversized mobile menu rhythm with compact accessible tap targets.
- [x] Add a `100dvh` drawer shell with a fixed header and scrollable navigation body.
- [x] Keep Client portal and Start a Project actions reachable on smaller portrait and landscape screens.

## Mobile homepage refinement

- [x] Tighten homepage section and card spacing at mobile breakpoints without changing desktop composition.
- [x] Reduce mobile hero height and bring the product reel into view sooner.
- [x] Compact the technology grid, practical-intelligence section, classified builds, problem cards, service cards, CTA, and footer.

## Technical SEO and answer-engine foundation

- [x] Centralise production URL, public route metadata, and entity details in one typed source.
- [x] Add route-specific canonicals, descriptions, Open Graph data, and Twitter card data for every public page.
- [x] Add generated `robots.txt` and `sitemap.xml` routes with the public route inventory and homepage product reel.
- [x] Add Organisation, ProfessionalService, LocalBusiness, WebSite SearchAction, and Service JSON-LD.
- [x] Add an extractable homepage FAQ section with FAQPage JSON-LD.
- [x] Prefill the deterministic Assistant from the SearchAction question parameter without auto-submitting.
- [x] Correct public heading hierarchy and strengthen contextual internal linking.
- [x] Expand the footer with legal entity, Edinburgh location, technologies, social profiles, public routes, and client portal access.
- [x] Explicitly prevent Studio OS and Clerk entry routes from being indexed.

## MDX Insights publishing

- [x] Add a single repository-managed MDX source of truth under `src/content/insights/`.
- [x] Add typed frontmatter loading, published-only filtering, date sorting, slug lookup, reading-time fallback, and related-note ranking.
- [x] Fail builds for invalid published metadata while allowing incomplete drafts to remain private.
- [x] Replace the Insights placeholder with the premium studio journal index and empty state.
- [x] Add statically generated `/insights/[slug]` article routes with canonical metadata, Article JSON-LD, and related notes.
- [x] Add McCaigs-styled MDX primitives for callouts, studio notes, build metrics, quote blocks, and dividers.
- [x] Add two approved example studio notes and include published articles in the generated sitemap.
- [x] Document the single-source Insights publishing workflow and add a fast published-post validation command.

## Studio OS Blog management

- [x] Add the `blogPosts` Convex table with owner-only CRUD.
- [x] Add David, Matt, and Kirsty author profiles.
- [x] Add `/app/blog`, new-post, edit, and owner preview routes.
- [x] Generate MDX from the shared template and preserve body content on metadata edits.
- [x] Add featured-image upload to `public/media/blog/`.
- [x] Add draft, scheduled, published, and archived states.
- [x] Add scheduled publication through Convex cron handling.
- [x] Add dynamic `/blog` and `/blog/[slug]` public routes.
- [x] Add Blog SEO metadata, Article JSON-LD, and sitemap discovery.
- [x] Add local and GitHub Blog write modes with safe production defaults.
- [x] Commit MDX and featured images through the server-only GitHub Contents API.
- [x] Store GitHub sync state and commit metadata in Convex.
- [x] Add failed-sync visibility and retry controls to Studio OS.
- [x] Add an MDX body editor and generated metadata frontmatter workflow.
- [x] Normalise Blog tags defensively across admin, Convex, MDX, and public rendering.
