# McCaigs Insights And Blog Publishing Workflow

## One Source Of Truth

McCaigs article bodies use static MDX files only.

The single source of truth is:

```txt
src/content/insights/
```

Each post must be one `.mdx` file inside that directory. Do not store article
body content in a database, CMS, JSON file, API, or second content folder.

Studio OS Blog metadata is stored in the Convex `blogPosts` table. It controls
workflow state, authorship, SEO fields, scheduling, and public Insights visibility,
but it never replaces the local MDX body.

The public routes are:

```txt
/insights
/insights/[slug]
```

The site uses the Next.js App Router only. Do not create a `/pages` directory
or another content source. `/insights` is the single public editorial index.
Convex-managed Blog metadata publishes the same MDX files under
`/insights/[slug]`. Legacy `/blog` URLs redirect into Insights.

All public post discovery must go through:

```txt
src/lib/insights.ts
```

Do not bypass this loader for MDX content. It parses frontmatter, validates
repository-published Insights, estimates reading time, and safely loads Blog
content files selected by Convex metadata.

## Publication States

Each post must include one valid status:

```txt
draft
scheduled
published
archived
```

For repository-managed posts, only `status: "published"` appears publicly.
For Studio OS-managed posts, Convex metadata is authoritative: published posts
and scheduled posts whose publication time has passed appear under Insights
and in the sitemap.

Draft and archived posts must never appear on public routes. Keep a new post as `draft` unless publication is explicitly requested.

## Post Template

Create one lowercase kebab-case `.mdx` file whose filename matches its slug:

```mdx
---
title: ""
slug: ""
excerpt: ""
publishedAt: ""
updatedAt: ""
category: ""
tags: []
seoTitle: ""
seoDescription: ""
status: "draft"
coverImage: ""
author: "McCaigs"
readingTime: ""
---
```

`readingTime` may be left empty because the loader can estimate it. Drafts may be incomplete while they are being written. Before publication, fill in every required published field and use a valid date for `publishedAt`. Use `updatedAt` when the note has been materially revised.

## Studio OS Blog Workflow

Owners can manage Blog posts at:

```txt
/app/blog
/app/blog/new
/app/blog/[id]
```

Creating a post writes an MDX file from `mdx-template.md` and inserts its
Convex metadata. Editing updates frontmatter while preserving the MDX body.
Publishing requires a title, slug, excerpt, author, matching content filename,
and SEO description. Scheduling requires a future date.

The Studio OS editor keeps metadata fields separate from the large
`MDX Content` field. Editors enter the article body in that field. On save,
publish, or schedule, the server generates frontmatter from the Convex
metadata and combines it with the submitted body. If full MDX containing
frontmatter is pasted into the field, the pasted frontmatter is discarded so
the managed metadata remains authoritative.

Tags may arrive as a comma-separated value, an array of strings, or an empty
value. They are normalised before validation, Convex storage, frontmatter
generation, and public rendering.

The supported author keys are `david`, `matt`, and `kirsty`. Author profiles
live in `src/lib/blog-authors.ts`.

The file API is owner-authenticated and uses the Node.js runtime. It supports
two write modes:

```env
BLOG_WRITE_MODE=local
BLOG_WRITE_MODE=github
```

Development defaults to `local`; production defaults to `github`. Local mode
writes MDX and images directly into the working tree. GitHub mode uses the
server-only GitHub Contents API and requires:

```env
GITHUB_OWNER=
GITHUB_REPO=
GITHUB_BRANCH=main
GITHUB_TOKEN=
```

The token must have permission to read and write repository contents on the
target branch. It is never exposed to client components or public routes.

In GitHub mode, the generated metadata-plus-body MDX is committed to
`src/content/insights/[slug].mdx`. Uploaded featured images are committed to
`public/content/insights/[slug].[extension]`.

Convex stores the GitHub path, blob SHA, last commit SHA and URL, sync time,
sync status, and a safe error message. A save writes metadata to Convex first
with `pending` status. Successful commits become `synced`; failed commits
remain recoverable as `failed` and expose a Retry GitHub sync button.

Scheduled visibility remains controlled entirely by Convex. The MDX file is
committed when the schedule is saved, but no second GitHub commit is required
when the scheduled time arrives. Convex promotes the post and the public
queries also treat due scheduled posts as visible.

GitHub commits trigger the repository's normal Vercel deployment. Until that
deployment includes a newly created MDX file, public rendering may briefly
return no article body even though Convex metadata is already synced.

## Codex Instructions

When creating a new McCaigs Insight:

1. Create one new `.mdx` file in `src/content/insights/`.
2. Use a lowercase kebab-case filename matching the slug.
3. Fill in all required frontmatter.
4. Keep status as `draft` unless explicitly told to publish.
5. Preserve the single MDX content source.
6. Do not install CMS packages.
8. Run `pnpm validate:insights`, `pnpm lint`, and `pnpm build`.
9. Report the new post path and status.

## Validation

Run the fast publishing preflight:

```bash
pnpm validate:insights
```

The script checks:

- Every `.mdx` file has a valid status.
- Every published post contains the required frontmatter.
- Every published filename matches its slug.
- Published dates are valid.
- Published slugs are unique.

The production build also validates published posts through `src/lib/insights.ts`. A published post with invalid metadata must fail the build loudly. An incomplete draft must remain private and must not fail the build.

## Guardrails

- Do not install or connect another CMS.
- Do not use Supabase, Convex, or another database for article body content.
- Convex may store Studio OS Blog metadata only.
- Never expose `GITHUB_TOKEN` or call the GitHub publishing API from a client component.
- Do not create a `/pages` directory.
- Do not mix Pages Router and App Router.
- Do not add a second post source.
- Do not duplicate article rendering logic.
- Do not bypass `src/lib/insights.ts`.

These constraints keep local development, Vercel builds, and assistant-led edits predictable.
