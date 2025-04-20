
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveRequestList } from "@/components/leave/LeaveRequestList";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchAllLeaveRequests } from "@/services/api";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  
  const { data: allRequests, isLoading: isLoadingAll } = useQuery({
    queryKey: ['leaveRequests', 'all', currentPage],
    queryFn: () => fetchAllLeaveRequests(undefined, currentPage, pageSize),
  });

  const { data: pendingRequests, isLoading: isLoadingPending } = useQuery({
    queryKey: ['leaveRequests', 'pending', currentPage],
    queryFn: () => fetchAllLeaveRequests('PENDING', currentPage, pageSize),
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
              <LeaveRequestList 
                requests={pendingRequests?.data.content || []}
                currentPage={currentPage}
                totalPages={pendingRequests?.data.totalPages || 0}
                onPageChange={handlePageChange}
              />
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
              <LeaveRequestList 
                requests={allRequests?.data.content || []}
                currentPage={currentPage}
                totalPages={allRequests?.data.totalPages || 0}
                onPageChange={handlePageChange}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
