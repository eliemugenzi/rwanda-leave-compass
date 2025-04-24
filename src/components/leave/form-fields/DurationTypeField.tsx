
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LeaveRequestFormValues } from "@/validation/leave-request.schema";

interface DurationTypeFieldProps {
  form: UseFormReturn<LeaveRequestFormValues>;
  showField: boolean;
}

export function DurationTypeField({ form, showField }: DurationTypeFieldProps) {
  if (!showField) return null;

  return (
    <FormField
      control={form.control}
      name="durationType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Duration</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue="FULL_DAY"
              value={field.value}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FULL_DAY" id="full_day" />
                <Label htmlFor="full_day">Full Day</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="HALF_DAY" id="half_day" />
                <Label htmlFor="half_day">Half Day</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

