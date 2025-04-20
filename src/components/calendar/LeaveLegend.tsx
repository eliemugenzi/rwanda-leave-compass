
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const LeaveLegend = () => {
  return (
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
  );
};
