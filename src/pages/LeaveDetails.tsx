
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "@/pages-router/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchUserLeaveRequests, fetchAllLeaveRequests } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { LeaveRequestHeader } from "@/components/leave/LeaveRequestHeader";
import { LeaveRequestInfo } from "@/components/leave/LeaveRequestInfo";
import { LeaveType, LeaveStatus } from "@/types/leave";
import { Loader } from "lucide-react";

const LeaveDetails = () => {
  const router = useRouter();
  const { user } = useAuth();

  const extractIdFromPath = () => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
  };

  const [id, setId] = useState<string>(extractIdFromPath());

  useEffect(() => {
    const updateId = () => {
      setId(extractIdFromPath());
    };

    window.addEventListener('customNavigation', updateId);
    return () => {
      window.removeEventListener('customNavigation', updateId);
    };
  }, []);

  const { data: userLeaveRequestsResponse, isLoading: isLoadingUserRequests } = useQuery({
    queryKey: ['leaveRequests', 'me', id],
    queryFn: () => fetchUserLeaveRequests(),
  });

  const { data: allLeaveRequestsResponse, isLoading: isLoadingAllRequests } = useQuery({
    queryKey: ['leaveRequests', 'all', id],
    queryFn: () => fetchAllLeaveRequests(),
  });

  // Find the request and convert the type and status from string to their respective enums
  const leaveRequest = id ? (() => {
    const foundRequest = (userLeaveRequestsResponse?.data.content || []).find(req => req.id === id) ||
      (allLeaveRequestsResponse?.data.content || []).find(req => req.id === id);
    
    if (foundRequest) {
      // Convert the string type and status to their respective enums
      return {
        ...foundRequest,
        type: foundRequest.type as unknown as LeaveType,
        status: foundRequest.status as unknown as LeaveStatus
      };
    }
    return null;
  })() : null;

  const isLoading = isLoadingUserRequests || isLoadingAllRequests;

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-16">
          <Loader className="h-8 w-8 animate-spin text-primary" aria-label="Loading leave request details" />
        </div>
      </AppLayout>
    );
  }

  if (!leaveRequest) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <h1 className="text-2xl font-bold mb-4">Leave Request Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested leave details could not be found (ID: {id}).</p>
          <Button onClick={() => router.push("/my-leaves")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to My Leaves
          </Button>
        </div>
      </AppLayout>
    );
  }

  const isAdminOrHR = user && (
    (user.role && user.role.toLowerCase().includes("admin")) ||
    (user.role && user.role.toLowerCase().includes("hr"))
  );

  const isSupervisor = user && (user.role === "supervisor" || user.role === "admin");

  return (
    <AppLayout>
      <LeaveRequestHeader />
      <div className="grid gap-6">
        <LeaveRequestInfo
          leaveRequest={leaveRequest}
          isAdminOrHR={isAdminOrHR}
          isSupervisor={isSupervisor}
        />
      </div>
    </AppLayout>
  );
};

export default LeaveDetails;
