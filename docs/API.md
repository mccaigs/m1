# API

## API philosophy

Use Convex functions first for application state. Add HTTP routes where an external integration or server-only boundary creates genuine value.

## Implemented HTTP endpoints

```txt
GET /api/health
POST /api/enquiries
```

`POST /api/enquiries` validates the qualified public contact payload before calling the server-only Google Apps Script webhook. The direct mobile number is never included in the initial page payload and is returned only after an accepted submission.

## Qualified contact flow

```txt
Contact form
  -> Validate fields, timeline, consent, and deterministic captcha
  -> POST /api/enquiries
  -> Forward structured payload to Google Apps Script webhook
  -> Reveal server-only direct mobile number after accepted submission
  -> Future: mirror qualified enquiry into Convex and notify studio owner
```

## Deterministic enquiry assistant

The flagship Assistant page uses deterministic topic matching and approved JSON knowledge. The frontend calls the Python service when `NEXT_PUBLIC_ASSISTANT_API_URL` is configured and retains a constrained local fallback for public previews. It does not call an LLM or invent answers.

```txt
POST /assistant/message
GET /assistant/topics
POST /project-builder/start
POST /project-builder/estimate
POST /project-builder/submit
```

The Assistant remains a demonstration. It may surface reviewed fixed offers from the approved JSON corpus; broader budget questions route visitors to Start a Project for an indicative planning estimate.

`POST /assistant/message` normalises the question, scores approved phrases and keywords across automatically discovered JSON sources in `backend/knowledge/`, ranks approved offer blocks alongside ordinary knowledge blocks, and composes the strongest reviewed fragments into a natural British English answer. If no answer passes the threshold, it returns a helpful approved fallback and the closest sensible route where one can be identified. It returns:

```txt
answer
confidence
matched_topics
cta_label
cta_href
suggested_questions
```

`POST /project-builder/estimate` classifies a project and returns one approved indicative planning range based on structured discovery answers and weighted complexity signals. It never returns a binding commercial quote. `POST /project-builder/submit` stores the business details, classification, score, estimate, and generated summary in the backend submission store.

## Convex functions

### Public enquiries

```txt
mutation enquiries:create
query enquiries:listForStudio
mutation enquiries:updateStatus
mutation enquiries:convertToProject
```

The typed Convex enquiry foundation remains available for future workflow integration.

### Projects

```txt
query projects:listForOrganisation
query projects:getById
mutation projects:create
mutation projects:updateStatus
mutation projects:updateDetails
```

### Tasks

```txt
query tasks:listForProject
mutation tasks:create
mutation tasks:updateStatus
mutation tasks:assign
```

## Planned HTTP endpoints

```txt
POST /api/webhooks/clerk
POST /api/webhooks/stripe
```

## API rules

- Validate all inputs.
- Authenticate private calls.
- Authorise organisation access.
- Log important workflow events.
- Return structured errors.
- Do not expose webhook URLs, private contact details, or provider errors to the browser.
- Do not call AI inside public request paths unless latency and cost are controlled.
