
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { userProfile } from "@/data/temporaryMockData";
import { DatePickerField } from "./form-fields/DatePickerField";
import { LeaveTypeField } from "./form-fields/LeaveTypeField";
import { ReasonField } from "./form-fields/ReasonField";
import { SupportingDocumentField } from "./form-fields/SupportingDocumentField";
import { DurationTypeField } from "./form-fields/DurationTypeField";
import { leaveRequestSchema, LeaveRequestFormValues } from "@/validation/leave-request.schema";
import { format, isEqual } from "date-fns";

interface LeaveRequestFormProps {
  onSubmit: (values: LeaveRequestFormValues) => void;
}

export function LeaveRequestForm({ onSubmit }: LeaveRequestFormProps) {
  const form = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      reason: "",
      durationType: "FULL_DAY"
    },
  });

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isSameDay, setIsSameDay] = useState<boolean>(false);

  // Watch for changes to the date fields
  const watchStartDate = form.watch("startDate");
  const watchEndDate = form.watch("endDate");
  
  // Update state when form fields change
  useEffect(() => {
    if (watchStartDate) {
      setStartDate(watchStartDate);
    }
    
    if (watchEndDate) {
      setEndDate(watchEndDate);
    }
    
    // Determine if start and end dates are the same
    if (watchStartDate && watchEndDate) {
      const sameDay = isEqual(
        new Date(format(watchStartDate, 'yyyy-MM-dd')),
        new Date(format(watchEndDate, 'yyyy-MM-dd'))
      );
      setIsSameDay(sameDay);
      
      // If dates are not the same day, clear durationType
      if (!sameDay && form.getValues("durationType")) {
        form.setValue("durationType", undefined);
      } else if (sameDay && !form.getValues("durationType")) {
        form.setValue("durationType", "FULL_DAY");
      }
    }
  }, [watchStartDate, watchEndDate, form]);

  const handleSubmit = (values: LeaveRequestFormValues) => {
    onSubmit(values);
    form.reset();
    setStartDate(undefined);
    setEndDate(undefined);
    setIsSameDay(false);
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
        <DurationTypeField form={form} showField={isSameDay} />
        <ReasonField form={form} />
        <SupportingDocumentField form={form} />
        
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
