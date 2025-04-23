
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveRequestList } from "@/components/leave/LeaveRequestList";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchAllLeaveRequests, searchLeaveRequests } from "@/services/api";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { Loader } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const pageSize = 10;
  
  const { data: requests, isLoading } = useQuery({
    queryKey: ['leaveRequests', selectedStatus, currentPage, debouncedSearch],
    queryFn: () => 
      debouncedSearch 
        ? searchLeaveRequests(debouncedSearch, currentPage, pageSize)
        : fetchAllLeaveRequests(selectedStatus, currentPage, pageSize),
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status === "ALL" ? undefined : status);
    setCurrentPage(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>View and manage all leave requests</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by employee name..."
                  className="w-full md:w-[250px] pl-8"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
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
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <Loader className="h-8 w-8 animate-spin text-primary" aria-label="Loading leave requests" />
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
