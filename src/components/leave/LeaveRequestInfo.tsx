
import { Calendar, Clock, FileText, FileUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, calculateDuration, getStatusBadgeStyle } from "@/utils/leaveRequestUtils";
import { LeaveRequest, LeaveStatus } from "@/types/leave";
import { useAuth } from "@/context/AuthContext";
import { ReviewedComment } from "./ReviewedComment";
import { RejectionReason } from "./RejectionReason";
import { ReviewActions } from "./ReviewActions";
import { DocumentPreview } from "./DocumentPreview";

interface LeaveRequestInfoProps {
  leaveRequest: LeaveRequest;
  isAdminOrHR: boolean;
  isSupervisor: boolean;
}

export const LeaveRequestInfo = ({ leaveRequest, isAdminOrHR, isSupervisor }: LeaveRequestInfoProps) => {
  const { user } = useAuth();
  const isPending = leaveRequest.status === LeaveStatus.PENDING;

  // Determine the correct properties for reviewed comment
  const approverComment = (leaveRequest as any).approverComment; // from backend sometimes
  const supervisorComment = leaveRequest.supervisorComment;
  const approverName = (leaveRequest as any).approverName;
  const supervisorName = leaveRequest.supervisorName;
  const reviewedAt = leaveRequest.reviewedAt;

  // Supporting document information
  const hasDocument = !!(leaveRequest.supportingDocumentUrl && leaveRequest.supportingDocumentName);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{leaveRequest.type} Leave</CardTitle>
            <CardDescription>
              Requested on {formatDate(leaveRequest.createdAt)}
            </CardDescription>
            {(leaveRequest.employeeName) && (
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
                {leaveRequest.durationType && formatDate(leaveRequest.startDate) === formatDate(leaveRequest.endDate) && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Duration: {leaveRequest.durationType === 'HALF_DAY' ? 'Half Day' : 'Full Day'}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-muted-foreground">
                  {calculateDuration(leaveRequest.startDate, leaveRequest.endDate, leaveRequest.durationType)} days
                </p>
              </div>
            </div>
            {hasDocument && (
              <div className="flex items-start">
                <FileUp className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="font-medium">Supporting Document</p>
                  <DocumentPreview 
                    documentUrl={leaveRequest.supportingDocumentUrl!}
                    documentName={leaveRequest.supportingDocumentName!}
                    isAdminOrHR={isAdminOrHR || isSupervisor}
                  />
                </div>
              </div>
            )}
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
            {/* Approver or supervisor comment */}
            <ReviewedComment
              isAdminOrHR={isAdminOrHR}
              approverComment={approverComment}
              supervisorComment={supervisorComment}
              approverName={approverName}
              supervisorName={supervisorName}
              reviewedAt={reviewedAt}
            />
            {/* Rejection Reason */}
            <RejectionReason rejectionReason={leaveRequest.rejectionReason} />
          </div>
        </div>
      </CardContent>
      {/* Review Actions */}
      {(isAdminOrHR || isSupervisor) && isPending && (
        <CardFooter className="flex-col items-stretch border-t pt-6">
          <ReviewActions leaveRequest={leaveRequest} isAdminOrHR={isAdminOrHR} isSupervisor={isSupervisor} />
        </CardFooter>
      )}
    </Card>
  );
};
