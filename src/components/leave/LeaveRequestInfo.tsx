
import { Calendar, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, calculateDuration, getStatusBadgeStyle } from "@/utils/leaveRequestUtils";
import { LeaveRequest, LeaveStatus } from "@/types/leave";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/pages-router/navigation";
import { useState } from "react";
import { updateLeaveRequestStatus } from "@/services/api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface LeaveRequestInfoProps {
  leaveRequest: LeaveRequest;
  isAdminOrHR: boolean;
  isSupervisor: boolean;
}

export const LeaveRequestInfo = ({ leaveRequest, isAdminOrHR, isSupervisor }: LeaveRequestInfoProps) => {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const isPending = leaveRequest.status === LeaveStatus.PENDING;

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      await updateLeaveRequestStatus(leaveRequest.id, { status: "APPROVED" });
      toast({
        title: "Leave request approved",
        description: "The employee has been notified about your decision.",
      });
      // Reload page or redirect
      router.push("/supervisor-dashboard");
    } catch (error) {
      console.error("Error approving leave request:", error);
      toast({
        title: "Error approving request",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setShowApproveConfirm(false);
    }
  };

  const handleReject = async () => {
    if (!comment.trim()) {
      toast({
        title: "Comment required",
        description: "Please provide a reason for rejecting this leave request.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await updateLeaveRequestStatus(leaveRequest.id, { 
        status: "REJECTED", 
        rejectionReason: comment 
      });
      toast({
        title: "Leave request rejected",
        description: "The employee has been notified about your decision.",
      });
      // Reload page or redirect
      router.push("/supervisor-dashboard");
    } catch (error) {
      console.error("Error rejecting leave request:", error);
      toast({
        title: "Error rejecting request",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setShowRejectConfirm(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{leaveRequest.type} Leave</CardTitle>
            <CardDescription>
              Requested on {formatDate(leaveRequest.createdAt)}
            </CardDescription>
            
            {isAdminOrHR && leaveRequest.employeeName && (
              <div className="mt-2 text-sm text-muted-foreground">
                Requested by <span className="font-semibold">{leaveRequest.employeeName}</span>
              </div>
            )}
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
            
            {leaveRequest.rejectionReason && (
              <div>
                <p className="font-medium mb-1">Rejection Reason</p>
                <div className="bg-muted p-3 rounded-md text-sm text-destructive">
                  {leaveRequest.rejectionReason}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {(isAdminOrHR || isSupervisor) && isPending && (
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
              onClick={() => setShowRejectConfirm(true)}
            >
              Reject Request
            </Button>
            <Button 
              variant="default"
              disabled={isSubmitting}
              onClick={() => setShowApproveConfirm(true)}
            >
              Approve Request
            </Button>
          </div>
        </CardFooter>
      )}

      {/* Approve Confirmation Dialog */}
      <AlertDialog open={showApproveConfirm} onOpenChange={setShowApproveConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Leave Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve this leave request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleApprove} 
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={showRejectConfirm} onOpenChange={setShowRejectConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Leave Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this leave request? This action cannot be undone.
              {!comment.trim() && (
                <p className="text-destructive mt-2">Please provide a reason for rejection in the comment field.</p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleReject} 
              disabled={isSubmitting || !comment.trim()}
              className="bg-destructive hover:bg-destructive/90"
            >
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
