
import { AppLayout } from "@/components/layout/AppLayout";
import { toast } from "@/hooks/use-toast";
import { LeaveRequestForm, LeaveRequestFormValues } from "@/components/leave/LeaveRequestForm";
import { LeavePolicy } from "@/components/leave/LeavePolicy";
import { userProfile } from "@/data/temporaryMockData";

const LeaveRequest = () => {
  function onSubmit(values: LeaveRequestFormValues) {
    // In a real app, you would send this data to your backend
    const newLeaveRequest = {
      ...values,
      supervisorName: userProfile.supervisorName,
      supervisorId: userProfile.supervisorId,
    };
    
    console.log("Submitting leave request:", newLeaveRequest);
    
    // Show success toast
    toast({
      title: "Leave request submitted",
      description: "Your request has been sent to your supervisor for approval.",
    });
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
