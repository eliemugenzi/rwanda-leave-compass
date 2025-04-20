
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { LeaveRequestFormValues } from "@/validation/leave-request.schema";

interface ReasonFieldProps {
  form: UseFormReturn<LeaveRequestFormValues>;
}

export function ReasonField({ form }: ReasonFieldProps) {
  return (
    <FormField
      control={form.control}
      name="reason"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Reason</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Please provide a reason for your leave request"
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormDescription>
            Please be specific about the reason for your leave.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
