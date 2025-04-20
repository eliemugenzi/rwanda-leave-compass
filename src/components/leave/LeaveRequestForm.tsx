
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { userProfile } from "@/data/temporaryMockData";
import { DatePickerField } from "./form-fields/DatePickerField";
import { LeaveTypeField } from "./form-fields/LeaveTypeField";
import { ReasonField } from "./form-fields/ReasonField";
import { leaveRequestSchema, LeaveRequestFormValues } from "@/validation/leave-request.schema";

interface LeaveRequestFormProps {
  onSubmit: (values: LeaveRequestFormValues) => void;
}

export function LeaveRequestForm({ onSubmit }: LeaveRequestFormProps) {
  const form = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      reason: "",
    },
  });

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (values: LeaveRequestFormValues) => {
    onSubmit(values);
    form.reset();
    setStartDate(undefined);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <LeaveTypeField form={form} />
        <DatePickerField
          name="startDate"
          label="Start Date"
          form={form}
          minDate={new Date(new Date().setHours(0, 0, 0, 0))}
        />
        <DatePickerField
          name="endDate"
          label="End Date"
          form={form}
          minDate={startDate}
        />
        <ReasonField form={form} />
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">
            Your request will be sent to: <span className="font-medium">{userProfile.supervisorName || "Your supervisor"}</span>
          </p>
        </div>
        
        <Button type="submit">Submit Leave Request</Button>
      </form>
    </Form>
  );
}
