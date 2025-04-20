import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveBalanceCard } from "@/components/dashboard/LeaveBalanceCard";
import { LeaveRequestList } from "@/components/leave/LeaveRequestList";
import { mockLeaveBalances } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useRouter } from "@/pages-router/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import { useQuery } from "@tanstack/react-query";
import { fetchUserLeaveRequests } from "@/services/api";

const Dashboard = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  
  const { data: userLeaveRequests, isLoading: isLoadingRequests } = useQuery({
    queryKey: ['leaveRequests', 'user'],
    queryFn: () => fetchUserLeaveRequests(),
    enabled: !!user && user.role === 'ROLE_USER',
  });

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[200px]">
          <p>Loading...</p>
        </div>
      </AppLayout>
    );
  }

  if (!user) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[200px]">
          <p>Please log in to view your dashboard</p>
        </div>
      </AppLayout>
    );
  }

  // Show admin dashboard for HR and Admin users
  if (user.role === "ROLE_HR" || user.role === "ROLE_ADMIN") {
    return <AdminDashboard />;
  }

  // Regular user dashboard
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {user.firstName} {user.lastName}
          </h1>
          <p className="text-muted-foreground">Here's an overview of your leave status</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex gap-1"
            onClick={() => router.push('/calendar')}
          >
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
          <Button 
            className="flex gap-1"
            onClick={() => router.push('/request')}
          >
            <Plus className="h-4 w-4" />
            Request Leave
          </Button>
        </div>
      </div>

      <div className="grid gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Leave Balance</CardTitle>
            <CardDescription>Your current leave allowances and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {mockLeaveBalances.map((balance) => (
                <LeaveBalanceCard key={balance.type} leaveBalance={balance} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Leave Requests</CardTitle>
            <CardDescription>Your leave requests from the past 90 days</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingRequests ? (
              <div className="text-center py-4">Loading your requests...</div>
            ) : (
              <LeaveRequestList requests={userLeaveRequests?.data || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
