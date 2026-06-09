import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const userRole = v.union(
  v.literal("owner"),
  v.literal("admin"),
  v.literal("staff"),
  v.literal("client"),
  v.literal("studioAdmin"),
  v.literal("teamMember"),
  v.literal("clientAdmin"),
  v.literal("clientMember"),
);

const enquiryStatus = v.union(
  v.literal("new"),
  v.literal("reviewed"),
  v.literal("contacted"),
  v.literal("quoted"),
  v.literal("won"),
  v.literal("lost"),
  v.literal("accepted"),
  v.literal("rejected"),
  v.literal("archived"),
);

const budgetRange = v.union(
  v.literal("Under £15,000"),
  v.literal("£15,000 - £30,000"),
  v.literal("£30,000 - £60,000"),
  v.literal("£60,000 - £100,000"),
  v.literal("£100,000+"),
  v.literal("Not defined yet"),
);

const projectType = v.union(
  v.literal("AI & business automation"),
  v.literal("Internal business system"),
  v.literal("Website or digital platform"),
  v.literal("Controlled AI assistant"),
  v.literal("Product or SaaS build"),
  v.literal("Technical review or AI audit"),
  v.literal("Something else"),
);

const enquiryTimeline = v.union(
  v.literal("As soon as practical"),
  v.literal("Within 1 - 3 months"),
  v.literal("Within 3 - 6 months"),
  v.literal("More than 6 months"),
  v.literal("Exploring the right timing"),
);

const projectStatus = v.union(
  v.literal("enquiry"),
  v.literal("discovery"),
  v.literal("research"),
  v.literal("planning"),
  v.literal("proposal"),
  v.literal("build"),
  v.literal("live"),
  v.literal("scoped"),
  v.literal("active"),
  v.literal("review"),
  v.literal("shipped"),
  v.literal("paused"),
  v.literal("archived"),
);

const taskStatus = v.union(
  v.literal("todo"),
  v.literal("inProgress"),
  v.literal("blocked"),
  v.literal("done"),
);

const blogPostStatus = v.union(
  v.literal("draft"),
  v.literal("scheduled"),
  v.literal("published"),
  v.literal("archived"),
);

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    role: userRole,
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_clerk_user_id", ["clerkUserId"]),

  enquiries: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.string(),
    budgetRange,
    projectType,
    timeline: enquiryTimeline,
    message: v.string(),
    consent: v.boolean(),
    source: v.string(),
    status: enquiryStatus,
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),

  quoteBuilderSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.string(),
    website: v.optional(v.string()),
    industry: v.string(),
    problem: v.string(),
    problemDetail: v.string(),
    desiredOutcome: v.string(),
    desiredOutcomeDetail: v.string(),
    answers: v.object({
      users: v.string(),
      integrations: v.string(),
      loginRequired: v.boolean(),
      paymentsRequired: v.boolean(),
      adminAreaRequired: v.boolean(),
      existingSoftware: v.boolean(),
      aiRequired: v.boolean(),
      humanReview: v.boolean(),
    }),
    projectType: v.string(),
    urgency: v.string(),
    estimatedBudget: v.string(),
    estimatedTimeline: v.string(),
    complexity: v.string(),
    complexityScore: v.number(),
    recommendedRoute: v.string(),
    summary: v.string(),
    assumptions: v.array(v.string()),
    source: v.string(),
    status: enquiryStatus,
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),

  projects: defineTable({
    clientId: v.optional(v.id("clients")),
    organisationId: v.optional(v.string()),
    title: v.string(),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    codename: v.optional(v.string()),
    summary: v.optional(v.string()),
    status: projectStatus,
    type: v.optional(v.string()),
    projectType: v.string(),
    priority: v.optional(v.string()),
    budgetRange: v.optional(v.string()),
    commercialSensitivity: v.boolean(),
    startDate: v.optional(v.number()),
    targetLaunchDate: v.optional(v.number()),
    targetDate: v.optional(v.number()),
    staffClerkUserIds: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_client", ["clientId"])
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_updated_at", ["updatedAt"]),

  clients: defineTable({
    name: v.string(),
    company: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    clerkUserId: v.optional(v.string()),
    status: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_clerk_user_id", ["clerkUserId"])
    .index("by_status", ["status"]),

  projectAssets: defineTable({
    projectId: v.id("projects"),
    type: v.union(
      v.literal("screenshot"),
      v.literal("previewLink"),
      v.literal("github"),
      v.literal("document"),
      v.literal("note"),
      v.literal("handover"),
      v.literal("figma"),
      v.literal("loom"),
      v.literal("other"),
    ),
    title: v.string(),
    url: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    approvedForClient: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_project", ["projectId"]),

  projectUpdates: defineTable({
    projectId: v.id("projects"),
    title: v.string(),
    body: v.string(),
    visibility: v.union(v.literal("internal"), v.literal("client")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_project", ["projectId"]),

  leadAssignments: defineTable({
    leadId: v.string(),
    source: v.union(
      v.literal("enquiry"),
      v.literal("projectBuilderSubmission"),
      v.literal("studioSeed"),
    ),
    clientId: v.optional(v.id("clients")),
    projectId: v.optional(v.id("projects")),
    status: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_lead", ["source", "leadId"])
    .index("by_client", ["clientId"])
    .index("by_project", ["projectId"]),

  userRoles: defineTable({
    clerkUserId: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("staff"),
      v.literal("client"),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_user_id", ["clerkUserId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  systems: defineTable({
    projectId: v.optional(v.id("projects")),
    name: v.string(),
    codename: v.optional(v.string()),
    summary: v.string(),
    status: v.string(),
    visibility: v.union(v.literal("internal"), v.literal("client"), v.literal("public")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_project", ["projectId"]),

  tasks: defineTable({
    projectId: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    status: taskStatus,
    assigneeId: v.optional(v.id("users")),
    dueDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_project", ["projectId"]),

  auditLogs: defineTable({
    actorId: v.optional(v.id("users")),
    action: v.string(),
    entityType: v.string(),
    entityId: v.string(),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_entity", ["entityType", "entityId"])
    .index("by_created_at", ["createdAt"]),

  blogPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    authorKey: v.string(),
    featuredImage: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    seoTitle: v.string(),
    seoDescription: v.string(),
    status: blogPostStatus,
    contentFile: v.string(),
    publishedAt: v.optional(v.number()),
    scheduledFor: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    createdBy: v.string(),
    updatedBy: v.string(),
    githubPath: v.optional(v.string()),
    githubSha: v.optional(v.string()),
    lastCommitSha: v.optional(v.string()),
    lastCommitUrl: v.optional(v.string()),
    lastGitHubSyncAt: v.optional(v.number()),
    githubSyncStatus: v.optional(
      v.union(v.literal("pending"), v.literal("synced"), v.literal("failed")),
    ),
    githubSyncError: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_author", ["authorKey"])
    .index("by_published_at", ["publishedAt"])
    .index("by_scheduled_for", ["scheduledFor"]),
});
