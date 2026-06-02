import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

const enquiryInput = {
  name: v.string(),
  email: v.string(),
  company: v.string(),
  budgetRange,
  projectType,
  timeline: enquiryTimeline,
  message: v.string(),
  consent: v.boolean(),
};

function validatePublicEnquiry(args: {
  name: string;
  email: string;
  company: string;
  consent: boolean;
  message: string;
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
  if (args.message.trim().length < 30 || args.message.length > 4000) {
    throw new Error("Please add a little more project detail.");
  }
  if (!args.consent) {
    throw new Error("Consent is required.");
  }
}

export const create = mutation({
  args: enquiryInput,
  handler: async (ctx, args) => {
    validatePublicEnquiry(args);
    const now = Date.now();
    const enquiryId = await ctx.db.insert("enquiries", {
      ...args,
      name: args.name.trim(),
      email: args.email.trim().toLowerCase(),
      company: args.company.trim(),
      message: args.message.trim(),
      source: "website",
      status: "new",
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("auditLogs", {
      action: "enquiry.created",
      entityType: "enquiry",
      entityId: enquiryId,
      createdAt: now,
    });

    return enquiryId;
  },
});

export const listForStudio = query({
  args: { status: v.optional(enquiryStatus) },
  handler: async (ctx, { status }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required.");
    }

    if (status) {
      return ctx.db.query("enquiries").withIndex("by_status", (q) => q.eq("status", status)).order("desc").collect();
    }

    return ctx.db.query("enquiries").withIndex("by_created_at").order("desc").collect();
  },
});

export const updateStatus = mutation({
  args: { enquiryId: v.id("enquiries"), status: enquiryStatus },
  handler: async (ctx, { enquiryId, status }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required.");
    }

    await ctx.db.patch(enquiryId, { status, updatedAt: Date.now() });
  },
});
