
import { format } from "date-fns";
import { LeaveStatus } from "@/types/leave";

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "MMMM dd, yyyy");
};

export const calculateDuration = (startDate: string, endDate: string, durationType?: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  // If it's the same day and half day is selected
  if (days === 1 && durationType === "HALF_DAY") {
    return 0.5;
  }
  
  return days;
};

export const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case LeaveStatus.APPROVED:
      return "bg-emerald-500 hover:bg-emerald-600";
    case LeaveStatus.REJECTED:
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-amber-500 hover:bg-amber-600";
  }
};
