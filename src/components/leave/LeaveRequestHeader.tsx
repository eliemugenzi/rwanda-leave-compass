
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "@/pages-router/navigation";

export const LeaveRequestHeader = () => {
  const router = useRouter();
  
  return (
    <div className="flex items-center mb-6">
      <Button variant="ghost" className="mr-4" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <div>
        <h1 className="text-2xl font-bold mb-1">Leave Request Details</h1>
        <p className="text-muted-foreground">
          View detailed information about this leave request
        </p>
      </div>
    </div>
  );
};
