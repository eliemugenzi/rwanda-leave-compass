
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
import { useQuery } from "@tanstack/react-query";
import { fetchLeaveBalances } from "@/services/api";
import { LeaveRequestFormValues } from "@/validation/leave-request.schema";

interface LeaveTypeFieldProps {
  form: UseFormReturn<LeaveRequestFormValues>;
}

export function LeaveTypeField({ form }: LeaveTypeFieldProps) {
  const { data: leaveBalances, isLoading } = useQuery({
    queryKey: ['leaveBalances'],
    queryFn: fetchLeaveBalances
  });

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
                {leaveBalances && leaveBalances.data && Object.entries(leaveBalances.data).map(([type, balance]) => (
                  balance && (
                    <SelectItem key={type} value={type}>
                      {type === LeaveType.ANNUAL ? 'Annual Leave/PTO' : type} ({balance.remainingDays} days available)
                    </SelectItem>
                  )
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
