import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import type { ProjectBuilderInput, ProjectEstimate } from "@/lib/project-builder-client";
import type { ContactSubmission } from "@/lib/validation/contact";

type CreateEnquiryArgs = Omit<ContactSubmission, "captcha">;

type CreateQuoteBuilderSubmissionArgs = {
  answers: ProjectBuilderInput["complexity"];
  assumptions: string[];
  company: string;
  complexity: ProjectEstimate["complexity"];
  complexityScore: number;
  desiredOutcome: string;
  desiredOutcomeDetail: string;
  email: string;
  estimatedBudget: string;
  estimatedTimeline: string;
  industry: string;
  name: string;
  problem: string;
  problemDetail: string;
  projectType: string;
  recommendedRoute: string;
  summary: string;
  urgency: string;
  website?: string;
};

const createEnquiry = makeFunctionReference<"mutation", CreateEnquiryArgs, string>("enquiries:create");
const createQuoteBuilderSubmission = makeFunctionReference<"mutation", CreateQuoteBuilderSubmissionArgs, string>("quoteBuilderSubmissions:create");

export function isConvexConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);
}

function getConvexClient() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) return null;
  return new ConvexHttpClient(convexUrl, { logger: false });
}

export async function createConvexEnquiry(args: CreateEnquiryArgs) {
  const client = getConvexClient();
  if (!client) return null;
  return client.mutation(createEnquiry, args);
}

export async function createConvexQuoteBuilderSubmission(input: ProjectBuilderInput, estimate: ProjectEstimate) {
  const client = getConvexClient();
  if (!client) return null;

  return client.mutation(createQuoteBuilderSubmission, {
    answers: input.complexity,
    assumptions: estimate.assumptions,
    company: input.company,
    complexity: estimate.complexity,
    complexityScore: estimate.complexityScore,
    desiredOutcome: input.desiredOutcome,
    desiredOutcomeDetail: input.desiredOutcomeDetail,
    email: input.email,
    estimatedBudget: estimate.indicativeBudget,
    estimatedTimeline: estimate.likelyTimeline,
    industry: input.industry,
    name: input.name,
    problem: input.problem,
    problemDetail: input.problemDetail,
    projectType: estimate.classification,
    recommendedRoute: estimate.recommendedRoute,
    summary: estimate.summary,
    urgency: estimate.likelyTimeline,
    website: input.website?.trim() || undefined,
  });
}
