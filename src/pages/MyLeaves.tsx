
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaveRequestList } from "@/components/leave/LeaveRequestList";
import { mockLeaveRequests as typedMockLeaveRequests } from "@/data/mockData";
import { LeaveRequest } from "@/services/api";

// Convert the mock data to match the API response structure
const mockLeaveRequests: LeaveRequest[] = typedMockLeaveRequests.map(leave => ({
  id: leave.id,
  employeeName: leave.supervisorName || "Employee Name",
  type: leave.type,
  startDate: leave.startDate,
  endDate: leave.endDate,
  reason: leave.reason,
  status: leave.status.toUpperCase() as any,
  rejectionReason: null,
  approver: leave.supervisorId ? {
    id: leave.supervisorId,
    firstName: (leave.supervisorName || "").split(" ")[0] || "",
    lastName: (leave.supervisorName || "").split(" ")[1] || "",
    email: `${leave.supervisorName?.toLowerCase().replace(" ", ".")}@company.com` || "",
  } : null,
  createdAt: leave.createdAt,
  updatedAt: leave.createdAt,
}));

const MyLeaves = () => {
  // Filter leaves by status
  const pendingLeaves = mockLeaveRequests.filter(
    (leave) => leave.status === "PENDING"
  );
  const approvedLeaves = mockLeaveRequests.filter(
    (leave) => leave.status === "APPROVED"
  );
  const rejectedLeaves = mockLeaveRequests.filter(
    (leave) => leave.status === "REJECTED"
  );

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">My Leave Requests</h1>
        <p className="text-muted-foreground">
          Track and manage your leave requests
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
          <CardDescription>
            View all your leave requests and their statuses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">
                Pending <span className="ml-1 text-xs">({pendingLeaves.length})</span>
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved <span className="ml-1 text-xs">({approvedLeaves.length})</span>
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected <span className="ml-1 text-xs">({rejectedLeaves.length})</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <LeaveRequestList requests={mockLeaveRequests} />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6">
              {pendingLeaves.length > 0 ? (
                <LeaveRequestList requests={pendingLeaves} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No pending leave requests found
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="approved" className="mt-6">
              {approvedLeaves.length > 0 ? (
                <LeaveRequestList requests={approvedLeaves} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No approved leave requests found
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="rejected" className="mt-6">
              {rejectedLeaves.length > 0 ? (
                <LeaveRequestList requests={rejectedLeaves} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No rejected leave requests found
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default MyLeaves;
