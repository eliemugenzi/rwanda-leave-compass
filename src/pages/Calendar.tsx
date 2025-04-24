
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { format, isBefore, isWithinInterval, parseISO } from "date-fns";
import { LeaveType } from "@/types/leave";
import { useQuery } from "@tanstack/react-query";
import { fetchAllLeaveRequests } from "@/services/api";
import { CalendarView } from "@/components/calendar/CalendarView";
import { LeaveLegend } from "@/components/calendar/LeaveLegend";
import { ScheduledLeaves } from "@/components/calendar/ScheduledLeaves";
import { addDays } from "date-fns";
import { Loader } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  
  const { data: leaveRequests, isLoading } = useQuery({
    queryKey: ['leaveRequests', 'calendar'],
    queryFn: () => fetchAllLeaveRequests(),
  });

  // Helper function to get all dates in a date range
  const getDatesInRange = (startDate: string, endDate: string) => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const dates = [];
    let currentDate = start;

    while (isBefore(currentDate, end) || currentDate.getTime() === end.getTime()) {
      dates.push(format(currentDate, "yyyy-MM-dd"));
      currentDate = addDays(currentDate, 1);
    }

    return dates;
  };

  // Only include APPROVED leaves (new filtering)
  const approvedLeaveRequests = (leaveRequests?.data.content || []).filter(
    (request) => request.status === "APPROVED"
  );

  // Generate all leave dates (only for approved leaves)
  const allLeaveDates = approvedLeaveRequests.flatMap((request) => {
    const dates = getDatesInRange(request.startDate, request.endDate);
    return dates.map((date) => ({
      date,
      type: request.type,
      status: request.status
    }));
  });

  // Function to check if a date has any leave requests
  const getLeaveInfo = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return allLeaveDates.find((leaveDate) => leaveDate.date === dateStr);
  };

  const getMonthLeaves = () => {
    const currentMonthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const currentMonthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    return approvedLeaveRequests.filter((request) => {
      const startDate = parseISO(request.startDate);
      const endDate = parseISO(request.endDate);
      
      return isWithinInterval(startDate, { start: currentMonthStart, end: currentMonthEnd }) ||
             isWithinInterval(endDate, { start: currentMonthStart, end: currentMonthEnd }) ||
             (isBefore(startDate, currentMonthStart) && isBefore(currentMonthEnd, endDate));
    });
  };

  // Classname generator for leave types, with color for compassionate leave
  const getLeaveDayClassName = (date: Date): string => {
    const leaveInfo = getLeaveInfo(date);
    if (!leaveInfo) return "";
    
    switch (leaveInfo.type) {
      case LeaveType.ANNUAL:
        return "bg-primary/20 text-primary-foreground hover:bg-primary/30";
      case LeaveType.SICK:
        return "bg-amber-500/20 text-amber-900 hover:bg-amber-500/30";
      case LeaveType.MATERNITY:
        return "bg-pink-500/20 text-pink-900 hover:bg-pink-500/30";
      case LeaveType.PATERNITY:
        return "bg-emerald-500/20 text-emerald-900 hover:bg-emerald-500/30";
      case LeaveType.BEREAVEMENT:
        return "bg-cyan-500/20 text-cyan-900 hover:bg-cyan-500/30";
      default:
        return "";
    }
  };

  const { user } = useAuth();

  // Determine if the user is admin or HR (assuming role === 'admin' is sufficient, extend as needed)
  const isAdminOrHR = user?.role === "admin" || user?.role === "hr";

  // Helper to get all employee names on leave for a given date
  const getEmployeesOnLeave = (date: Date): string[] => {
    const dateStr = format(date, "yyyy-MM-dd");
    // Filter by all leaves that match this date
    const matching = (leaveRequests?.data.content || []).filter(req =>
      req.status === "APPROVED" &&
      (format(parseISO(req.startDate), "yyyy-MM-dd") <= dateStr) &&
      (format(parseISO(req.endDate), "yyyy-MM-dd") >= dateStr)
    );
    // Distinct names
    return Array.from(new Set(matching.map(req => req.employeeName).filter(Boolean)));
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader className="h-8 w-8 animate-spin text-primary mb-2" aria-label="Loading calendar" />
          <span className="text-muted-foreground">Loading calendar...</span>
        </div>
      </AppLayout>
    );
  }

  const monthLeaves = getMonthLeaves();

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Leave Calendar</h1>
        <p className="text-muted-foreground">View all scheduled leaves</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CalendarView
            date={date}
            onDateSelect={(newDate) => newDate && setDate(newDate)}
            getLeaveInfo={getLeaveInfo}
            getLeaveDayClassName={getLeaveDayClassName}
            // Only show employee popover if admin/HR
            showEmployeePopover={isAdminOrHR}
            getEmployeesOnLeave={isAdminOrHR ? getEmployeesOnLeave : undefined}
          />
        </div>

        <div>
          <LeaveLegend />
          <ScheduledLeaves date={date} leaves={monthLeaves} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Calendar;
