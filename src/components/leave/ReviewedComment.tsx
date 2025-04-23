
import { formatDate } from "@/utils/leaveRequestUtils";

interface ReviewedCommentProps {
  isAdminOrHR: boolean;
  approverComment?: string;
  supervisorComment?: string;
  approverName?: string;
  supervisorName?: string;
  reviewedAt?: string;
}

export const ReviewedComment = ({
  isAdminOrHR,
  approverComment,
  supervisorComment,
  approverName,
  supervisorName,
  reviewedAt,
}: ReviewedCommentProps) => {
  const comment = isAdminOrHR ? approverComment : supervisorComment;
  const name = isAdminOrHR ? approverName : supervisorName;

  if (!comment) return null;

  return (
    <div>
      <p className="font-medium mb-1">
        {isAdminOrHR ? "Approver Comment" : "Supervisor Comment"}
      </p>
      <div className="bg-muted p-3 rounded-md text-sm">
        {comment}
      </div>
      {(name || reviewedAt) && (
        <p className="text-xs text-muted-foreground mt-1">
          - {name ?? ""} {reviewedAt ? `(${formatDate(reviewedAt as string)})` : ""}
        </p>
      )}
    </div>
  );
};
