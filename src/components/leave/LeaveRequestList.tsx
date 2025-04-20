
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "@/pages-router/navigation";
import { LeaveRequest } from "@/services/api";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface LeaveRequestListProps {
  requests: LeaveRequest[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function LeaveRequestList({ 
  requests,
  currentPage = 0,
  totalPages = 1,
  onPageChange = () => {},
}: LeaveRequestListProps) {
  const router = useRouter();

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "REJECTED":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-amber-500 hover:bg-amber-600";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      console.error("Invalid date format:", dateString);
      return dateString;
    }
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const viewLeaveDetails = (id: string) => {
    router.push(`/leave-details/${id}`);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxDisplayedPages = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxDisplayedPages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxDisplayedPages - 1);

    if (endPage - startPage + 1 < maxDisplayedPages) {
      startPage = Math.max(0, endPage - maxDisplayedPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No leave requests found
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.type}</TableCell>
                  <TableCell>{formatDate(request.startDate)}</TableCell>
                  <TableCell>{formatDate(request.endDate)}</TableCell>
                  <TableCell>
                    {calculateDuration(request.startDate, request.endDate)} days
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeStyle(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" onClick={() => viewLeaveDetails(request.id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(currentPage - 1)}
                className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {renderPaginationItems()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(currentPage + 1)}
                className={currentPage === totalPages - 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
