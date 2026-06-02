import { z } from "zod";
import { budgetRanges, projectTypes } from "@/lib/studio-content";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Add your name so we know who to reply to.").max(100),
  email: z.email("Add a valid work email address."),
  company: z.string().trim().min(2, "Add your company or organisation name.").max(140),
  budgetRange: z.enum(budgetRanges, "Choose the closest working budget range."),
  projectType: z.enum(projectTypes, "Choose the closest project type."),
  message: z.string().trim().min(30, "Add a little more detail about the problem or opportunity.").max(4000),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
