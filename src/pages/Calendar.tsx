
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { addDays, format, isBefore, isWithinInterval, parseISO } from "date-fns";
import { LeaveType, LeaveStatus } from "@/types/leave";
import { useQuery } from "@tanstack/react-query";
import { fetchAllLeaveRequests } from "@/services/api";

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

  // Generate all leave dates
  const allLeaveDates = (leaveRequests?.data.content || []).flatMap((request) => {
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
    
    return (leaveRequests?.data.content || []).filter((request) => {
      const startDate = parseISO(request.startDate);
      const endDate = parseISO(request.endDate);
      
      return isWithinInterval(startDate, { start: currentMonthStart, end: currentMonthEnd }) ||
             isWithinInterval(endDate, { start: currentMonthStart, end: currentMonthEnd }) ||
             (isBefore(startDate, currentMonthStart) && isBefore(currentMonthEnd, endDate));
    });
  };

  const monthLeaves = getMonthLeaves();

  // Classname generator for leave types
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
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading calendar...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Leave Calendar</h1>
        <p className="text-muted-foreground">View all scheduled leaves</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>
                Colored dates indicate scheduled leaves
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border w-full"
                modifiersClassNames={{
                  selected: "bg-primary text-primary-foreground",
                }}
                modifiers={{
                  booked: (date) => !!getLeaveInfo(date),
                }}
                classNames={{
                  day_booked: getLeaveDayClassName,
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Leave Legend</CardTitle>
              <CardDescription>Color coding for leave types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                  <span>Annual Leave/PTO</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20"></div>
                  <span>Sick Leave</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-pink-500/20"></div>
                  <span>Maternity Leave</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20"></div>
                  <span>Paternity Leave</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Scheduled Leaves</CardTitle>
              <CardDescription>For {format(date, 'MMMM yyyy')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthLeaves.length > 0 ? (
                  monthLeaves.map((leave) => (
                    <div key={leave.id} className="border-l-4 pl-3 py-2" 
                      style={{ 
                        borderColor: 
                          leave.type === LeaveType.ANNUAL ? 'hsl(262, 83%, 58%)' : 
                          leave.type === LeaveType.SICK ? '#f59e0b' :
                          leave.type === LeaveType.MATERNITY ? '#ec4899' : '#10b981'
                      }}>
                      <div className="font-medium">
                        {leave.type === LeaveType.ANNUAL ? 'Annual Leave/PTO' :
                         leave.type === LeaveType.SICK ? 'Sick Leave' :
                         leave.type === LeaveType.MATERNITY ? 'Maternity Leave' : 'Paternity Leave'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(parseISO(leave.startDate), 'MMM dd')} - {format(parseISO(leave.endDate), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No leaves scheduled for this month
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Calendar;
