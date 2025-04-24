
import { z } from "zod";

export const leaveRequestSchema = z.object({
  leaveType: z.string({
    required_error: "Please select a leave type",
  }),
  startDate: z.date({
    required_error: "Please select a start date",
  }),
  endDate: z.date({
    required_error: "Please select an end date",
  }),
  reason: z.string().min(5, {
    message: "Reason must be at least 5 characters",
  }),
  durationType: z.enum(["FULL_DAY", "HALF_DAY"]).optional(),
  supportingDocument: z.instanceof(File).optional(),
});

export type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;

export enum DurationType {
  FULL_DAY = "FULL_DAY",
  HALF_DAY = "HALF_DAY"
}

