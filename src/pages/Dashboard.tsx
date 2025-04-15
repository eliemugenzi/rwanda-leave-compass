
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveBalanceCard } from "@/components/dashboard/LeaveBalanceCard";
import { LeaveRequestList } from "@/components/leave/LeaveRequestList";
import { mockLeaveBalances, mockLeaveRequests, userProfile } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {userProfile.name}</h1>
          <p className="text-muted-foreground">Here's an overview of your leave status</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex gap-1"
            onClick={() => window.location.href = '/calendar'}
          >
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
          <Button 
            className="flex gap-1"
            onClick={() => window.location.href = '/request'}
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
            <LeaveRequestList requests={mockLeaveRequests} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
