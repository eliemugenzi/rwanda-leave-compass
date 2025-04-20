import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, FileText } from "lucide-react";
import { format } from "date-fns";
import { mockLeaveRequests, userProfile } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/pages-router/navigation";
import { LeaveStatus } from "@/types/leave";

const LeaveDetails = () => {
  const router = useRouter();
  
  // Extract ID from URL path
  const [id, setId] = useState<string | null>(null);
  
  useEffect(() => {
    // Extract ID from the current pathname
    const pathSegments = router.pathname.split('/');
    const leaveId = pathSegments[pathSegments.length - 1];
    setId(leaveId);
  }, [router.pathname]);
  
  // Find the leave request from our mock data
  const leaveRequest = id ? mockLeaveRequests.find(request => request.id === id) : null;
  
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!leaveRequest) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <h1 className="text-2xl font-bold mb-4">Leave Request Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested leave details could not be found.</p>
          <Button onClick={() => router.push("/my-leaves")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to My Leaves
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };
  
  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };
  
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "REJECTED":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-amber-500 hover:bg-amber-600";
    }
  };
  
  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Leave request approved",
        description: "The employee has been notified about your decision.",
      });
      setIsSubmitting(false);
      router.push("/supervisor-dashboard");
    }, 1000);
  };
  
  const handleReject = () => {
    if (!comment.trim()) {
      toast({
        title: "Comment required",
        description: "Please provide a reason for rejecting this leave request.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Leave request rejected",
        description: "The employee has been notified about your decision.",
      });
      setIsSubmitting(false);
      router.push("/supervisor-dashboard");
    }, 1000);
  };
  
  const isSupervisor = userProfile.role === "supervisor" || userProfile.role === "admin";
  const isPending = leaveRequest.status === LeaveStatus.PENDING;

  return (
    <AppLayout>
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
      
      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{leaveRequest.type} Leave</CardTitle>
                <CardDescription>
                  Requested on {formatDate(leaveRequest.createdAt)}
                </CardDescription>
              </div>
              <Badge className={getStatusBadgeStyle(leaveRequest.status)}>
                {leaveRequest.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4 pb-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Leave Period</p>
                    <p className="text-muted-foreground">
                      {formatDate(leaveRequest.startDate)} - {formatDate(leaveRequest.endDate)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-muted-foreground">
                      {calculateDuration(leaveRequest.startDate, leaveRequest.endDate)} days
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Reason for Leave</p>
                    <p className="text-muted-foreground">
                      {leaveRequest.reason}
                    </p>
                  </div>
                </div>
                
                {leaveRequest.supervisorComment && (
                  <div>
                    <p className="font-medium mb-1">Supervisor Comment</p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      {leaveRequest.supervisorComment}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      - {leaveRequest.supervisorName} ({leaveRequest.reviewedAt ? formatDate(leaveRequest.reviewedAt) : ''})
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          
          {isSupervisor && isPending && (
            <CardFooter className="flex-col items-stretch border-t pt-6">
              <h3 className="font-semibold mb-2">Review Leave Request</h3>
              <Textarea
                placeholder="Add your comments here..."
                className="mb-4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="destructive" 
                  disabled={isSubmitting}
                  onClick={handleReject}
                >
                  Reject Request
                </Button>
                <Button 
                  variant="default"
                  disabled={isSubmitting}
                  onClick={handleApprove}
                >
                  Approve Request
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </AppLayout>
  );
};

export default LeaveDetails;
