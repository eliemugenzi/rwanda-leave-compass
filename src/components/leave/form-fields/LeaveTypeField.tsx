
import { UseFormReturn } from "react-hook-form";
import { LeaveType } from "@/types/leave";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockLeaveBalances } from "@/data/temporaryMockData";
import { LeaveRequestFormValues } from "@/validation/leave-request.schema";

interface LeaveTypeFieldProps {
  form: UseFormReturn<LeaveRequestFormValues>;
}

export function LeaveTypeField({ form }: LeaveTypeFieldProps) {
  return (
    <FormField
      control={form.control}
      name="leaveType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Leave Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a leave type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Leave Types</SelectLabel>
                {mockLeaveBalances.map((balance) => (
                  <SelectItem key={balance.type} value={balance.type}>
                    {balance.type === LeaveType.ANNUAL ? 'Annual Leave/PTO' : balance.type} ({balance.available} days available)
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
