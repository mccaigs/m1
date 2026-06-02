# Database

## Database layer

Convex is the primary database and backend state layer.

Data should be designed around organisations, projects, enquiries, decisions, documents, and reusable studio workflows.

## Core tables

### users

Stores the local application profile connected to Clerk.

Fields:

- clerkUserId
- name
- email
- imageUrl
- role
- createdAt
- updatedAt

### organisations

Represents McCaigs, client companies, and future workspace structures.

Fields:

- clerkOrgId
- name
- slug
- type
- website
- createdAt
- updatedAt

Types:

- studio
- client
- partner

### memberships

Connects users to organisations.

Fields:

- userId
- organisationId
- role
- createdAt

### enquiries

Stores public contact and project enquiries.

Fields:

- name
- email
- company
- projectType
- budgetRange
- message
- source
- status
- createdAt
- updatedAt

Statuses:

- new
- reviewing
- qualified
- declined
- converted

### projects

Stores client projects and internal builds.

Fields:

- organisationId
- title
- codename
- summary
- status
- projectType
- commercialSensitivity
- startDate
- targetDate
- createdAt
- updatedAt

Statuses:

- discovery
- scoped
- active
- review
- shipped
- paused
- archived

### projectUpdates

Stores progress updates for the client portal.

Fields:

- projectId
- authorId
- title
- body
- visibility
- createdAt

Visibility:

- internal
- client

### decisions

Stores important project decisions.

Fields:

- projectId
- title
- context
- decision
- rationale
- ownerId
- createdAt

### documents

Stores metadata for uploaded files or generated documents.

Fields:

- projectId
- uploadedBy
- storageId
- filename
- mimeType
- size
- visibility
- createdAt

### tasks

Stores project tasks and action items.

Fields:

- projectId
- title
- description
- status
- assigneeId
- dueDate
- createdAt
- updatedAt

### aiRuns

Stores auditable AI runs.

Fields:

- projectId
- provider
- model
- purpose
- inputHash
- output
- status
- reviewedBy
- createdAt

### evaluations

Stores checks against deterministic workflows and AI-assisted outputs.

Fields:

- name
- version
- target
- metric
- result
- passed
- notes
- createdAt

## Relationships

```txt
User → Memberships → Organisations
Organisation → Projects
Project → Updates
Project → Decisions
Project → Documents
Project → Tasks
Project → AI Runs
Enquiry → Project, when converted
```

## Indexing principles

Create indexes for:

- Clerk user IDs.
- Clerk organisation IDs.
- Organisation projects.
- Project updates.
- Enquiry status.
- Project status.
- Created date for timelines.

## Data rules

- Never store secrets in Convex documents.
- Do not duplicate Clerk state unless needed for display or querying.
- Use typed validators for every table.
- Prefer explicit statuses over loose strings.
- Keep AI output separate from human-approved decisions.

## First release schema

The initial shipped schema includes `users`, `enquiries`, `projects`, `systems`, `tasks`, and `auditLogs`. The wider portal tables remain planned for later delivery.
