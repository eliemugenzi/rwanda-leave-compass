
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveRequestList } from "@/components/leave/LeaveRequestList";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchAllLeaveRequests } from "@/services/api";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const pageSize = 10;
  
  const { data: requests, isLoading } = useQuery({
    queryKey: ['leaveRequests', selectedStatus, currentPage],
    queryFn: () => fetchAllLeaveRequests(selectedStatus, currentPage, pageSize),
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status === "ALL" ? undefined : status);
    setCurrentPage(0); // Reset to first page when changing status
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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>View and manage all leave requests</CardDescription>
            </div>
            <Select value={selectedStatus || "ALL"} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Requests</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <LeaveRequestList 
              requests={requests?.data.content || []}
              currentPage={currentPage}
              totalPages={requests?.data.totalPages || 0}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default AdminDashboard;

