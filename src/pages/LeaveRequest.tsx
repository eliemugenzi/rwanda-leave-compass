
import { AppLayout } from "@/components/layout/AppLayout";
import { toast } from "@/hooks/use-toast";
import { LeaveRequestForm } from "@/components/leave/LeaveRequestForm";
import { LeaveRequestFormValues } from "@/validation/leave-request.schema";
import { LeavePolicy } from "@/components/leave/LeavePolicy";
import { createLeaveRequest } from "@/services/api";
import { format } from "date-fns";
import { LeaveType } from "@/types/leave";

const LeaveRequest = () => {
  async function onSubmit(values: LeaveRequestFormValues) {
    try {
      const payload = {
        type: values.leaveType as LeaveType,
        startDate: format(values.startDate, 'yyyy-MM-dd'),
        endDate: format(values.endDate, 'yyyy-MM-dd'),
        reason: values.reason
      };

      await createLeaveRequest(payload);
      
      toast({
        title: "Leave request submitted",
        description: "Your request has been sent to your supervisor for approval.",
      });
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast({
        title: "Error submitting request",
        description: "There was an error submitting your leave request. Please try again.",
        variant: "destructive"
      });
    }
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Request Leave</h1>
        <p className="text-muted-foreground">
          Submit a new leave request for approval
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <LeaveRequestForm onSubmit={onSubmit} />
          <LeavePolicy />
        </div>
      </div>
    </AppLayout>
  );
};

export default LeaveRequest;
