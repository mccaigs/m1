import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const userRole = v.union(
  v.literal("owner"),
  v.literal("studioAdmin"),
  v.literal("teamMember"),
  v.literal("clientAdmin"),
  v.literal("clientMember"),
);

const enquiryStatus = v.union(
  v.literal("new"),
  v.literal("reviewing"),
  v.literal("qualified"),
  v.literal("declined"),
  v.literal("converted"),
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
  v.literal("discovery"),
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

  projects: defineTable({
    organisationId: v.optional(v.string()),
    title: v.string(),
    codename: v.optional(v.string()),
    summary: v.string(),
    status: projectStatus,
    projectType: v.string(),
    commercialSensitivity: v.boolean(),
    startDate: v.optional(v.number()),
    targetDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status", ["status"]),

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
});
