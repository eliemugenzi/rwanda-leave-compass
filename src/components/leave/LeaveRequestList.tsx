
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
import { LeaveRequest } from "@/types/leave";
import { format } from "date-fns";

interface LeaveRequestListProps {
  requests: LeaveRequest[];
}

export function LeaveRequestList({ requests }: LeaveRequestListProps) {
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "Rejected":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-amber-500 hover:bg-amber-600";
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
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
          {requests.map((request) => (
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
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
