
interface RejectionReasonProps {
  rejectionReason?: string | null;
}

export const RejectionReason = ({ rejectionReason }: RejectionReasonProps) => {
  if (!rejectionReason) return null;

  return (
    <div>
      <p className="font-medium mb-1">Rejection Reason</p>
      <div className="bg-muted p-3 rounded-md text-sm text-destructive">
        {rejectionReason}
      </div>
    </div>
  );
};
