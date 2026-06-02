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
- [ ] Mirror required user data into Convex.
- [ ] Add permission helpers.

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
- [ ] Add enquiry admin view.
- [ ] Add status updates.
- [ ] Add conversion from enquiry to project.

## Phase 5 - Client portal

- [x] Create authenticated portal layout.
- [x] Add Studio OS overview navigation.
- [x] Add projects, systems, tasks, and activity foundation routes.
- [x] Add polished workspace empty states.
- [ ] Add organisation switcher.
- [ ] Add projects list.
- [ ] Add project detail page.
- [ ] Add project updates.
- [ ] Add project tasks.
- [ ] Add document metadata.
- [ ] Add visibility rules for internal and client content.

## Phase 6 - AI assistance

- [ ] Add AI provider abstraction.
- [ ] Add brief summary action.
- [ ] Add proposal outline draft action.
- [ ] Add fit score explanation action.
- [ ] Store AI run metadata.
- [ ] Add human review state.
- [ ] Add eval dataset.

## Phase 7 - Content system

- [ ] Add markdown or MDX insights.
- [ ] Add post metadata.
- [ ] Add GitHub-managed content workflow.
- [ ] Add scheduled style or formatting checks.
- [ ] Add related posts.
- [ ] Add sitemap.

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
- [x] Generate the final Current Offers summary from the approved special-offers JSON source.

## Brand assets and metadata

- [x] Add a shared Logo component backed by `public/logo.svg`.
- [x] Apply the canonical logo across public, mobile, Studio OS, loading, Assistant, and Start a Project surfaces.
- [x] Serve `public/favicon.ico` through root App Router metadata.
- [x] Generate local Apple touch, Open Graph, and Twitter assets from the canonical logo.
- [x] Add a local web app manifest with McCaigs branding.
