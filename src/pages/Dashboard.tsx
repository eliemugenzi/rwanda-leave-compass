
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveBalanceCard } from "@/components/dashboard/LeaveBalanceCard";
import { LeaveRequestList } from "@/components/leave/LeaveRequestList";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useRouter } from "@/pages-router/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import { useQuery } from "@tanstack/react-query";
import { LeaveType } from "@/types/leave";
import { fetchUserLeaveRequests, fetchLeaveBalances } from "@/services/api";
import { Loader } from "lucide-react";

const Dashboard = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  
  const { data: userLeaveRequests, isLoading: isLoadingRequests } = useQuery({
    queryKey: ['leaveRequests', 'user', currentPage],
    queryFn: () => fetchUserLeaveRequests(undefined, currentPage, pageSize),
    enabled: !!user && user.role === 'ROLE_USER',
  });

  const { data: leaveBalancesData, isLoading: isLoadingBalances } = useQuery({
    queryKey: ['leaveBalances'],
    queryFn: fetchLeaveBalances,
    enabled: !!user && user.role === 'ROLE_USER',
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader className="h-8 w-8 animate-spin text-primary" aria-label="Loading dashboard" />
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

  if (user.role === "ROLE_HR" || user.role === "ROLE_ADMIN") {
    return <AdminDashboard />;
  }

  // Convert API response to LeaveBalance array safely
  const leaveBalances = leaveBalancesData && leaveBalancesData.data ? 
    Object.entries(leaveBalancesData.data).map(([type, data]) => {
      if (!data) return null;
      return {
        type: type as LeaveType,
        total: data.totalDays || 0,
        available: data.remainingDays || 0,
        used: data.usedDays || 0
      };
    }).filter(Boolean) : [];

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
            {isLoadingBalances ? (
              <div className="flex justify-center items-center h-24">
                <Loader className="h-6 w-6 animate-spin text-primary" aria-label="Loading leave balances" />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {leaveBalances.map((balance) => (
                  balance && <LeaveBalanceCard key={balance.type} leaveBalance={balance} />
                ))}
              </div>
            )}
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
              <div className="flex justify-center items-center h-24">
                <Loader className="h-6 w-6 animate-spin text-primary" aria-label="Loading your requests" />
              </div>
            ) : (
              <LeaveRequestList 
                requests={userLeaveRequests?.data.content || []} 
                currentPage={currentPage}
                totalPages={userLeaveRequests?.data.totalPages || 0}
                onPageChange={handlePageChange}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
