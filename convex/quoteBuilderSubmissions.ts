import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireStudioStaff } from "./studioAuth";

const submissionStatus = v.union(
  v.literal("new"),
  v.literal("reviewed"),
  v.literal("contacted"),
  v.literal("quoted"),
  v.literal("won"),
  v.literal("lost"),
  // Retained so existing records remain valid during the status migration.
  v.literal("accepted"),
  v.literal("rejected"),
  v.literal("archived"),
);

const submissionStatusUpdate = v.union(
  v.literal("new"),
  v.literal("reviewed"),
  v.literal("contacted"),
  v.literal("quoted"),
  v.literal("won"),
  v.literal("lost"),
  v.literal("archived"),
);

const complexityAnswers = v.object({
  adminAreaRequired: v.boolean(),
  aiRequired: v.boolean(),
  existingSoftware: v.boolean(),
  humanReview: v.boolean(),
  integrations: v.string(),
  loginRequired: v.boolean(),
  paymentsRequired: v.boolean(),
  users: v.string(),
});

const submissionInput = {
  assumptions: v.array(v.string()),
  company: v.string(),
  complexity: v.string(),
  complexityScore: v.number(),
  desiredOutcome: v.string(),
  desiredOutcomeDetail: v.string(),
  email: v.string(),
  estimatedBudget: v.string(),
  estimatedTimeline: v.string(),
  industry: v.string(),
  name: v.string(),
  problem: v.string(),
  problemDetail: v.string(),
  projectType: v.string(),
  recommendedRoute: v.string(),
  summary: v.string(),
  urgency: v.string(),
  website: v.optional(v.string()),
  answers: complexityAnswers,
};

function validateSubmission(args: {
  company: string;
  desiredOutcome: string;
  desiredOutcomeDetail: string;
  email: string;
  industry: string;
  name: string;
  problem: string;
  problemDetail: string;
}) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (args.name.trim().length < 2 || args.name.length > 100) {
    throw new Error("Please enter a valid name.");
  }
  if (!emailPattern.test(args.email) || args.email.length > 320) {
    throw new Error("Please enter a valid email address.");
  }
  if (args.company.trim().length < 2 || args.company.length > 140) {
    throw new Error("Please enter a valid company name.");
  }
  if (args.industry.trim().length < 2 || args.industry.length > 120) {
    throw new Error("Please enter a valid industry.");
  }
  if (!args.problem.trim() || args.problemDetail.trim().length < 15) {
    throw new Error("Please describe the business problem.");
  }
  if (!args.desiredOutcome.trim() || args.desiredOutcomeDetail.trim().length < 15) {
    throw new Error("Please describe the desired outcome.");
  }
}

export const create = mutation({
  args: submissionInput,
  handler: async (ctx, args) => {
    validateSubmission(args);
    const now = Date.now();
    const submissionId = await ctx.db.insert("quoteBuilderSubmissions", {
      ...args,
      name: args.name.trim(),
      email: args.email.trim().toLowerCase(),
      company: args.company.trim(),
      industry: args.industry.trim(),
      website: args.website?.trim() || undefined,
      problemDetail: args.problemDetail.trim(),
      desiredOutcomeDetail: args.desiredOutcomeDetail.trim(),
      source: "mccaigs.com/start-project",
      status: "new",
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("auditLogs", {
      action: "quote_builder_submission.created",
      entityType: "quoteBuilderSubmission",
      entityId: submissionId,
      createdAt: now,
    });

    return submissionId;
  },
});

export const listForStudio = query({
  args: { limit: v.optional(v.number()), status: v.optional(submissionStatus) },
  handler: async (ctx, { limit = 20, status }) => {
    await requireStudioStaff(ctx);

    if (status) {
      return ctx.db.query("quoteBuilderSubmissions").withIndex("by_status", (q) => q.eq("status", status)).order("desc").take(limit);
    }

    return ctx.db.query("quoteBuilderSubmissions").withIndex("by_created_at").order("desc").take(limit);
  },
});

export const updateStatus = mutation({
  args: { status: submissionStatusUpdate, submissionId: v.id("quoteBuilderSubmissions") },
  handler: async (ctx, { status, submissionId }) => {
    await requireStudioStaff(ctx);

    const now = Date.now();
    await ctx.db.patch(submissionId, { status, updatedAt: now });
    await ctx.db.insert("auditLogs", {
      action: "quote_builder_submission.status_updated",
      entityType: "quoteBuilderSubmission",
      entityId: submissionId,
      metadata: { status },
      createdAt: now,
    });
  },
});
