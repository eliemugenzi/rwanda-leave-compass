
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "@/pages-router/navigation";
import { useAuth } from "@/context/AuthContext";

export const LeaveRequestHeader = () => {
  const router = useRouter();
  const { user } = useAuth();
  
  const handleBackClick = () => {
    // Depending on the user role, navigate to different pages
    if (user && (user.role === "admin" || user.role?.toLowerCase().includes("admin") || user.role?.toLowerCase().includes("hr"))) {
      router.push("/admin-dashboard");
    } else if (user && user.role === "supervisor") {
      router.push("/supervisor-dashboard");
    } else {
      router.push("/my-leaves");
    }
  };
  
  return (
    <div className="flex items-center mb-6">
      <Button variant="ghost" className="mr-4" onClick={handleBackClick}>
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
