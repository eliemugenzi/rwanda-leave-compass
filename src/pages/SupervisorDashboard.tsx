
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLeaveRequests as typedMockLeaveRequests, employees } from "@/data/mockData";
import { LeaveRequestList } from "@/components/leave/LeaveRequestList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { LeaveRequest } from "@/services/api";

const SupervisorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 1; // Since we're using mock data, we'll set this to 1
  
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
  
  // Filter leaves by status for the supervisor view
  const pendingLeaves = mockLeaveRequests.filter(
    (leave) => leave.status === "PENDING"
  );
  const approvedLeaves = mockLeaveRequests.filter(
    (leave) => leave.status === "APPROVED"
  );
  const rejectedLeaves = mockLeaveRequests.filter(
    (leave) => leave.status === "REJECTED"
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Supervisor Dashboard</h1>
        <p className="text-muted-foreground">
          Manage leave requests from your team members
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingLeaves.length}</div>
            <p className="text-muted-foreground">Require your attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{employees.length}</div>
            <p className="text-muted-foreground">Under your supervision</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Processed Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{approvedLeaves.length + rejectedLeaves.length}</div>
            <p className="text-muted-foreground">In the past 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Team Leave Requests</CardTitle>
              <CardDescription>
                Review and manage leave requests from your team
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search requests..."
                  className="w-full md:w-[200px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Users className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
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
            
            <TabsContent value="pending" className="mt-6">
              <LeaveRequestList 
                requests={pendingLeaves}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </TabsContent>
            
            <TabsContent value="approved" className="mt-6">
              <LeaveRequestList 
                requests={approvedLeaves}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </TabsContent>
            
            <TabsContent value="rejected" className="mt-6">
              <LeaveRequestList 
                requests={rejectedLeaves}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default SupervisorDashboard;
