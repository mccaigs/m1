import { z } from "zod";
import {
  budgetRanges,
  projectTypes,
  timelineOptions,
} from "@/lib/studio-content";

const consentSchema = z.preprocess(
  (value) => value === true || value === "on",
  z.literal(true, "Confirm that McCaigs may use these details to reply to your enquiry."),
);

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Add your name so we know who to reply to.").max(100),
  company: z.string().trim().min(2, "Add your company or organisation name.").max(140),
  email: z.email("Add a valid work email address."),
  projectType: z.enum(projectTypes, "Choose the closest project type."),
  budgetRange: z.enum(budgetRanges, "Choose the closest working budget range."),
  timeline: z.enum(timelineOptions, "Choose the closest expected timeline."),
  message: z.string().trim().min(30, "Add a little more detail about the problem or opportunity.").max(4000),
  consent: consentSchema,
  captcha: z
    .string()
    .trim()
    .toLowerCase()
    .refine((answer) => answer === "ai", "Check the two hidden letters and try again."),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
