
import * as React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { User } from "lucide-react";

interface LeaveEmployeeListPopoverProps {
  employees: string[];
  children: React.ReactNode;
}

export const LeaveEmployeeListPopover = ({ employees, children }: LeaveEmployeeListPopoverProps) => {
  // If there are no employees, just return children directly
  if (!employees.length) return <>{children}</>;

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer">
          {children}
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top" align="center" className="p-3 w-56">
        <div className="mb-2 flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">Employees on Leave</span>
        </div>
        <ul className="list-disc list-inside text-sm text-muted-foreground max-h-32 overflow-auto">
          {employees.map((name, index) => (
            <li key={`${name}-${index}`}>{name}</li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};
