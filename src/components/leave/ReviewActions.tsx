
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/pages-router/navigation";
import { useState } from "react";
import { updateLeaveRequestStatus } from "@/services/api";
import { LeaveRequest } from "@/types/leave";

interface ReviewActionsProps {
  leaveRequest: LeaveRequest;
  isAdminOrHR: boolean;
  isSupervisor: boolean;
}

export const ReviewActions = ({
  leaveRequest,
  isAdminOrHR,
  isSupervisor,
}: ReviewActionsProps) => {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const payload: any = {
        status: "APPROVED"
      };
      if (isAdminOrHR) {
        payload.approverComment = comment.trim();
      } else if (isSupervisor) {
        payload.supervisorComment = comment.trim();
      }
      await updateLeaveRequestStatus(leaveRequest.id, payload);
      toast({
        title: "Leave request approved",
        description: "The employee has been notified about your decision.",
      });
      router.push("/supervisor-dashboard");
    } catch (error) {
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
      const payload: any = {
        status: "REJECTED",
        rejectionReason: comment.trim(),
      };
      if (isAdminOrHR) {
        payload.approverComment = comment.trim();
      } else if (isSupervisor) {
        payload.supervisorComment = comment.trim();
      }
      await updateLeaveRequestStatus(leaveRequest.id, payload);
      toast({
        title: "Leave request rejected",
        description: "The employee has been notified about your decision.",
      });
      router.push("/supervisor-dashboard");
    } catch (error) {
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
    <>
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
    </>
  );
};
