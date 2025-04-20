
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveRequest } from "@/services/api";
import { LeaveType } from "@/types/leave";

interface ScheduledLeavesProps {
  date: Date;
  leaves: LeaveRequest[];
}

export const ScheduledLeaves = ({ date, leaves }: ScheduledLeavesProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Scheduled Leaves</CardTitle>
        <CardDescription>For {format(date, 'MMMM yyyy')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaves.length > 0 ? (
            leaves.map((leave) => (
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
  );
};
