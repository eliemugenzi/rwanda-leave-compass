
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaveRequestList } from "@/components/leave/LeaveRequestList";
import { mockLeaveRequests } from "@/data/mockData";

const MyLeaves = () => {
  // Filter leaves by status
  const pendingLeaves = mockLeaveRequests.filter(
    (leave) => leave.status === "Pending"
  );
  const approvedLeaves = mockLeaveRequests.filter(
    (leave) => leave.status === "Approved"
  );
  const rejectedLeaves = mockLeaveRequests.filter(
    (leave) => leave.status === "Rejected"
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
