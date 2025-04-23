
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User } from "lucide-react";

interface LeaveEmployeeListPopoverProps {
  employees: string[];
  children: React.ReactNode;
}

export const LeaveEmployeeListPopover = ({ employees, children }: LeaveEmployeeListPopoverProps) => {
  // If there are no employees, just return children directly
  if (!employees.length) return <>{children}</>;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full h-full cursor-pointer">
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent side="top" align="center" className="p-3 w-56">
        <div className="mb-2 flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">Employees on Leave</span>
        </div>
        <ul className="list-disc list-inside text-sm text-muted-foreground max-h-32 overflow-auto">
          {employees.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
