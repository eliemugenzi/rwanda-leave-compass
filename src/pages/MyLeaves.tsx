
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaveRequestList } from "@/components/leave/LeaveRequestList";
import { useQuery } from "@tanstack/react-query";
import { fetchUserLeaveRequests } from "@/services/api";
import { LeaveStatus } from "@/types/leave";

const MyLeaves = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const { data: userLeaveRequests, isLoading } = useQuery({
    queryKey: ['leaveRequests', 'user', currentPage],
    queryFn: () => fetchUserLeaveRequests(undefined, currentPage, pageSize),
  });

  const requests = userLeaveRequests?.data.content || [];
  
  // Filter leaves by status
  const pendingLeaves = requests.filter(
    (leave) => leave.status === LeaveStatus.PENDING
  );
  const approvedLeaves = requests.filter(
    (leave) => leave.status === LeaveStatus.APPROVED
  );
  const rejectedLeaves = requests.filter(
    (leave) => leave.status === LeaveStatus.REJECTED
  );

  const totalPages = userLeaveRequests?.data.totalPages || 0;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[200px]">
          <p>Loading your leave requests...</p>
        </div>
      </AppLayout>
    );
  }

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
              <LeaveRequestList 
                requests={requests} 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6">
              {pendingLeaves.length > 0 ? (
                <LeaveRequestList 
                  requests={pendingLeaves} 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No pending leave requests found
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="approved" className="mt-6">
              {approvedLeaves.length > 0 ? (
                <LeaveRequestList 
                  requests={approvedLeaves} 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No approved leave requests found
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="rejected" className="mt-6">
              {rejectedLeaves.length > 0 ? (
                <LeaveRequestList 
                  requests={rejectedLeaves} 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
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
