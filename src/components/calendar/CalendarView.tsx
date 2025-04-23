
import { DayProps } from "react-day-picker";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { LeaveEmployeeListPopover } from "./LeaveEmployeeListPopover";
import { useAuth } from "@/context/AuthContext";

interface CalendarViewProps {
  date: Date;
  onDateSelect: (date: Date | undefined) => void;
  getLeaveInfo: (date: Date) => { type: string; status: string; employeeName?: string } | undefined;
  getLeaveDayClassName: (date: Date) => string;
  getEmployeesOnLeave?: (date: Date) => string[] | undefined;
  showEmployeePopover?: boolean;
}

export const CalendarView = ({
  date,
  onDateSelect,
  getLeaveInfo,
  getLeaveDayClassName,
  getEmployeesOnLeave,
  showEmployeePopover = false
}: CalendarViewProps) => {
  return (
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
          onSelect={onDateSelect}
          className="rounded-md border w-full"
          modifiersClassNames={{
            selected: "bg-primary text-primary-foreground",
          }}
          modifiers={{
            booked: (date) => !!getLeaveInfo(date),
          }}
          components={{
            Day: ({ date: dayDate, ...props }: DayProps) => {
              const isBooked = !!getLeaveInfo(dayDate);
              const employees =
                showEmployeePopover && getEmployeesOnLeave
                  ? getEmployeesOnLeave(dayDate) || []
                  : [];

              // Remove displayMonth from props to avoid the React warning
              const { displayMonth, ...dayProps } = props as any;
              
              let dayContent = (
                <div
                  className={`${props.className || ''} ${isBooked ? getLeaveDayClassName(dayDate) : ''}`}
                  {...dayProps}
                >
                  {dayDate.getDate()}
                </div>
              );

              if (showEmployeePopover && isBooked && employees.length > 0) {
                return (
                  <LeaveEmployeeListPopover employees={employees}>
                    {dayContent}
                  </LeaveEmployeeListPopover>
                );
              }
              
              return dayContent;
            }
          }}
        />
      </CardContent>
    </Card>
  );
};
