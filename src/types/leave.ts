export enum LeaveType {
  ANNUAL = 'ANNUAL',
  SICK = 'SICK',
  MATERNITY = 'MATERNITY',
  PATERNITY = 'PATERNITY',
  UNPAID = 'UNPAID',
  BEREAVEMENT = 'BEREAVEMENT'
}

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface LeaveBalance {
  type: LeaveType;
  available: number;
  used: number;
  total: number;
}

export interface LeaveRequest {
  id: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  createdAt: string;
  supervisorId?: string;
  supervisorName?: string;
  supervisorComment?: string;
  reviewedAt?: string;
  // Added from the API response
  employeeName?: string;
  rejectionReason?: string | null;
  approver?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'supervisor' | 'admin';
  department: string;
  position: string;
  supervisorId?: string;
  supervisorName?: string;
}

