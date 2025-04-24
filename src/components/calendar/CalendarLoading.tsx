
import { Loader } from "lucide-react";

export function CalendarLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader className="h-8 w-8 animate-spin text-primary mb-2" aria-label="Loading calendar" />
      <span className="text-muted-foreground">Loading calendar...</span>
    </div>
  );
}
