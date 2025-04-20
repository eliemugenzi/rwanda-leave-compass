
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LeaveBalance, LeaveType } from "@/types/leave";
import { cn } from "@/lib/utils";

interface LeaveBalanceCardProps {
  leaveBalance: LeaveBalance;
}

export function LeaveBalanceCard({ leaveBalance }: LeaveBalanceCardProps) {
  const { type, available, used, total } = leaveBalance;
  const percentUsed = Math.round((used / total) * 100);

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
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between">
          <span>
            {type === LeaveType.ANNUAL ? "Annual Leave/PTO" : 
             type === LeaveType.SICK ? "Sick Leave" :
             type === LeaveType.MATERNITY ? "Maternity Leave" : "Paternity Leave"}
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
