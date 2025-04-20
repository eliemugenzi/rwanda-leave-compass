
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LeaveBalance, LeaveType } from "@/types/leave";
import { cn } from "@/lib/utils";

interface LeaveBalanceCardProps {
  leaveBalance: LeaveBalance;
}

export function LeaveBalanceCard({ leaveBalance }: LeaveBalanceCardProps) {
  const { type, available, used, total } = leaveBalance;
  const percentUsed = total > 0 ? Math.round((used / total) * 100) : 0;

  const getColorByType = (type: LeaveType): string => {
    switch (type) {
      case LeaveType.ANNUAL:
        return "bg-primary";
      case LeaveType.SICK:
        return "bg-amber-500";
      case LeaveType.MATERNITY:
        return "bg-pink-500";
      case LeaveType.PATERNITY:
        return "bg-emerald-500";
      case LeaveType.UNPAID:
        return "bg-slate-500";
      case LeaveType.BEREAVEMENT:
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getLeaveTypeName = (type: LeaveType): string => {
    switch (type) {
      case LeaveType.ANNUAL:
        return "Annual Leave/PTO";
      case LeaveType.SICK:
        return "Sick Leave";
      case LeaveType.MATERNITY:
        return "Maternity Leave";
      case LeaveType.PATERNITY:
        return "Paternity Leave";
      case LeaveType.UNPAID:
        return "Unpaid Leave";
      case LeaveType.BEREAVEMENT:
        return "Bereavement Leave";
      default:
        return type;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between">
          <span>
            {getLeaveTypeName(type)}
          </span>
          <span className="text-sm">
            {available} / {total} days
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress 
            value={percentUsed} 
            className="h-2" 
            style={{
              '--progress-color': getColorByType(type).replace('bg-', 'var(--')
            } as React.CSSProperties}
          />
          <div className="text-xs text-muted-foreground flex justify-between">
            <span>{used} days used</span>
            <span>{available} days available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
