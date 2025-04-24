
import { DayProps } from "react-day-picker";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isSameDay } from "date-fns";
import { LeaveEmployeeListPopover } from "./LeaveEmployeeListPopover";
import { getRwandaHolidays } from "@/utils/rwandaHolidays";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  // Get holidays for current and next year
  const holidays = getRwandaHolidays();

  const isHoliday = (date: Date) => {
    return holidays.some(holiday => isSameDay(holiday.date, date));
  };

  const getHolidayInfo = (date: Date) => {
    return holidays.find(holiday => isSameDay(holiday.date, date));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar View</CardTitle>
        <CardDescription>
          {showEmployeePopover ? "Hover over colored dates to see employees on leave" : "Colored dates indicate scheduled leaves"}
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
            holiday: "bg-green-100 text-green-600 font-bold hover:bg-green-200"
          }}
          modifiers={{
            booked: (date) => !!getLeaveInfo(date),
            holiday: isHoliday
          }}
          components={{
            Day: ({ date: dayDate, ...props }: DayProps) => {
              const isBooked = !!getLeaveInfo(dayDate);
              const holidayInfo = getHolidayInfo(dayDate);
              const isCurrentDayHoliday = isHoliday(dayDate);
              
              const employees = 
                showEmployeePopover && getEmployeesOnLeave && isBooked
                  ? getEmployeesOnLeave(dayDate) || []
                  : [];

              // Get className and other props safely
              const { displayMonth, ...dayProps } = props as any;
              const className = (props as any).className || '';
              
              let dayContent = (
                <div
                  className={`${className} ${isBooked ? getLeaveDayClassName(dayDate) : ''} ${isCurrentDayHoliday ? 'bg-green-100 text-green-600 font-bold hover:bg-green-200' : ''}`}
                  {...dayProps}
                >
                  {dayDate.getDate()}
                </div>
              );

              // If it's a holiday, wrap with tooltip
              if (holidayInfo) {
                dayContent = (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {dayContent}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{holidayInfo.name}</p>
                        {holidayInfo.description && (
                          <p className="text-xs text-muted-foreground">{holidayInfo.description}</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }

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
