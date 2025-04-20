
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeaveRequestList } from "@/components/leave/LeaveRequestList";
import { mockLeaveRequests } from "@/data/mockData";
import { AppLayout } from "@/components/layout/AppLayout";
import { Check, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const pendingRequests = mockLeaveRequests.filter(request => request.status === "Pending");

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
            <LeaveRequestList requests={pendingRequests} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Leave Requests</CardTitle>
            <CardDescription>View all leave requests history</CardDescription>
          </CardHeader>
          <CardContent>
            <LeaveRequestList requests={mockLeaveRequests} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
