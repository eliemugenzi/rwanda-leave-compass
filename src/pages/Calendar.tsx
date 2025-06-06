
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { format, isBefore, isWithinInterval, parseISO } from "date-fns";
import { LeaveType } from "@/types/leave";
import { useQuery } from "@tanstack/react-query";
import { fetchAllLeaveRequests, getDepartments } from "@/services/api";
import { CalendarView } from "@/components/calendar/CalendarView";
import { LeaveLegend } from "@/components/calendar/LeaveLegend";
import { ScheduledLeaves } from "@/components/calendar/ScheduledLeaves";
import { useAuth } from "@/context/AuthContext";
import { DepartmentFilter } from "@/components/calendar/DepartmentFilter";
import { CalendarExport } from "@/components/calendar/CalendarExport";
import { CalendarLoading } from "@/components/calendar/CalendarLoading";

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  
  const { data: departments, isLoading: isDepartmentsLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: () => getDepartments(),
  });
  
  const { data: leaveRequests, isLoading: isLeavesLoading } = useQuery({
    queryKey: ['leaveRequests', 'calendar', selectedDepartment],
    queryFn: () => fetchAllLeaveRequests(undefined, 0, 100, selectedDepartment !== "all" ? selectedDepartment : undefined),
  });

  const approvedLeaveRequests = (leaveRequests?.data.content || []).filter(
    (request) => request.status === "APPROVED"
  );

  const { user } = useAuth();
  const isAdminOrHR = user?.role === "admin" || 
                     user?.role === "ROLE_ADMIN" || 
                     user?.role === "hr" || 
                     user?.role === "ROLE_HR";

  // Helper functions
  const getDatesInRange = (startDate: string, endDate: string) => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const dates = [];
    let currentDate = start;

    while (isBefore(currentDate, end) || currentDate.getTime() === end.getTime()) {
      dates.push(format(currentDate, "yyyy-MM-dd"));
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }

    return dates;
  };

  const allLeaveDates = approvedLeaveRequests.flatMap((request) => {
    const dates = getDatesInRange(request.startDate, request.endDate);
    return dates.map((date) => ({
      date,
      type: request.type,
      status: request.status,
      employeeName: request.employeeName,
      departmentId: request.departmentId
    }));
  });

  const getLeaveInfo = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return allLeaveDates.find((leaveDate) => leaveDate.date === dateStr);
  };

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

  const getEmployeesOnLeave = (date: Date): string[] => {
    const dateStr = format(date, "yyyy-MM-dd");
    const matching = approvedLeaveRequests.filter(req =>
      req.status === "APPROVED" &&
      (format(parseISO(req.startDate), "yyyy-MM-dd") <= dateStr) &&
      (format(parseISO(req.endDate), "yyyy-MM-dd") >= dateStr) &&
      req.employeeName
    );
    
    return Array.from(new Set(matching.map(req => req.employeeName || "").filter(Boolean)));
  };

  if (isLeavesLoading || isDepartmentsLoading) {
    return (
      <AppLayout>
        <CalendarLoading />
      </AppLayout>
    );
  }

  const monthLeaves = approvedLeaveRequests.filter((request) => {
    const currentMonthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const currentMonthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = parseISO(request.startDate);
    const endDate = parseISO(request.endDate);
    
    return isWithinInterval(startDate, { start: currentMonthStart, end: currentMonthEnd }) ||
           isWithinInterval(endDate, { start: currentMonthStart, end: currentMonthEnd }) ||
           (isBefore(startDate, currentMonthStart) && isBefore(currentMonthEnd, endDate));
  });

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Leave Calendar</h1>
        <p className="text-muted-foreground">View all scheduled leaves</p>
      </div>

      {isAdminOrHR && departments?.data && (
        <div className="mb-6 flex items-center gap-4">
          <div className="max-w-xs flex-1">
            <DepartmentFilter
              selectedDepartment={selectedDepartment}
              departments={departments.data}
              onDepartmentChange={setSelectedDepartment}
            />
          </div>
          <CalendarExport
            departments={departments.data}
            selectedDepartment={selectedDepartment}
            data={leaveRequests?.data.content || []}
          />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CalendarView
            date={date}
            onDateSelect={(newDate) => newDate && setDate(newDate)}
            getLeaveInfo={getLeaveInfo}
            getLeaveDayClassName={getLeaveDayClassName}
            showEmployeePopover={isAdminOrHR}
            getEmployeesOnLeave={getEmployeesOnLeave}
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
