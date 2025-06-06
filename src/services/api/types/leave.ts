
import { LeaveType } from '@/types/leave';

export interface PaginatedResponse<T> {
  content: T[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface LeaveRequestResponse {
  message: string;
  status: number;
  data: PaginatedResponse<LeaveRequest>;
}

export interface Approver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  rejectionReason: string | null;
  approver: Approver | null;
  createdAt: string;
  updatedAt: string;
  supervisorComment?: string;
  supervisorName?: string;
  reviewedAt?: string;
  approverComment?: string; // for admin/hr
  approverName?: string;    // for admin/hr
  supportingDocumentUrl?: string;
  supportingDocumentName?: string;
  durationType?: "FULL_DAY" | "HALF_DAY";
  departmentId?: string;
}

export interface CreateLeaveRequestPayload {
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  durationType?: "FULL_DAY" | "HALF_DAY";
}

export interface CreateLeaveRequestResponse {
  message: string;
  status: number;
  data: LeaveRequest;
}

export interface LeaveBalanceDetails {
  totalDays: number;
  usedDays: number;
  remainingDays: number;
}

export interface LeaveBalanceResponse {
  message: string;
  status: number;
  data: {
    [key in LeaveType]: LeaveBalanceDetails;
  };
}

export interface UpdateLeaveRequestStatusPayload {
  status: "APPROVED" | "REJECTED";
  rejectionReason?: string;
  supervisorComment?: string;
  approverComment?: string; // for admin/hr
}

export interface UpdateLeaveRequestStatusResponse {
  message: string;
  status: number;
  data: LeaveRequest;
}
