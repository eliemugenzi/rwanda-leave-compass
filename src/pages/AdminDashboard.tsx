
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveRequestList } from "@/components/leave/LeaveRequestList";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchAllLeaveRequests } from "@/services/api";

const AdminDashboard = () => {
  const { user } = useAuth();
  
  const { data: allRequests, isLoading: isLoadingAll } = useQuery({
    queryKey: ['leaveRequests', 'all'],
    queryFn: () => fetchAllLeaveRequests(),
  });

  const { data: pendingRequests, isLoading: isLoadingPending } = useQuery({
    queryKey: ['leaveRequests', 'pending'],
    queryFn: () => fetchAllLeaveRequests('PENDING'),
  });

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-muted-foreground">
          Manage leave requests and approvals
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Leave Requests</CardTitle>
            <CardDescription>Review and manage leave requests from employees</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingPending ? (
              <div className="text-center py-4">Loading pending requests...</div>
            ) : (
              <LeaveRequestList requests={pendingRequests?.data || []} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Leave Requests</CardTitle>
            <CardDescription>View all leave requests history</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingAll ? (
              <div className="text-center py-4">Loading all requests...</div>
            ) : (
              <LeaveRequestList requests={allRequests?.data || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
