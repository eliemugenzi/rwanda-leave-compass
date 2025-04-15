
export type LeaveType = 'PTO' | 'Sick' | 'Compassionate' | 'Maternity';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

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
