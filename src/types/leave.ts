
export type LeaveType = 'PTO' | 'Sick' | 'Compassionate' | 'Maternity';

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
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}
