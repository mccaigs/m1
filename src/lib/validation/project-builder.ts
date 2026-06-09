import { z } from "zod";

export const projectBuilderSubmissionSchema = z.object({
  company: z.string().trim().min(2, "Add your company or organisation name.").max(140),
  complexity: z.object({
    adminAreaRequired: z.boolean(),
    aiRequired: z.boolean(),
    existingSoftware: z.boolean(),
    humanReview: z.boolean(),
    integrations: z.string().trim().min(1, "Choose the number of integrations."),
    loginRequired: z.boolean(),
    paymentsRequired: z.boolean(),
    users: z.string().trim().min(1, "Choose the number of users."),
  }),
  desiredOutcome: z.string().trim().min(2, "Choose the desired outcome.").max(240),
  desiredOutcomeDetail: z.string().trim().min(15, "Describe what success should look like.").max(1200),
  email: z.string().trim().email("Add a valid email address.").max(320),
  industry: z.string().trim().min(2, "Add the industry.").max(120),
  name: z.string().trim().min(2, "Add your name.").max(100),
  problem: z.string().trim().min(2, "Choose the closest business problem.").max(240),
  problemDetail: z.string().trim().min(15, "Describe the business problem.").max(1200),
  website: z.string().trim().max(240).optional(),
});

export type ProjectBuilderSubmission = z.infer<typeof projectBuilderSubmissionSchema>;
