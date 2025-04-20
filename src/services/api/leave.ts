
import { LeaveType } from '@/types/leave';
import { BASE_URL, getAuthToken } from './config';

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
}

export interface CreateLeaveRequestPayload {
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface CreateLeaveRequestResponse {
  message: string;
  status: number;
  data: LeaveRequest;
}

export interface LeaveBalanceResponse {
  message: string;
  status: number;
  data: {
    [key in LeaveType]: number;
  };
}

export async function fetchAllLeaveRequests(status?: string, page: number = 0, size: number = 10): Promise<LeaveRequestResponse> {
  const url = new URL(`${BASE_URL}/leave-requests`);
  if (status) {
    url.searchParams.append('status', status);
  }
  url.searchParams.append('page', page.toString());
  url.searchParams.append('size', size.toString());
  
  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch leave requests');
  }
  
  return response.json();
}

export async function fetchUserLeaveRequests(status?: string, page: number = 0, size: number = 10): Promise<LeaveRequestResponse> {
  const url = new URL(`${BASE_URL}/leave-requests/me`);
  if (status) {
    url.searchParams.append('status', status);
  }
  url.searchParams.append('page', page.toString());
  url.searchParams.append('size', size.toString());
  
  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user leave requests');
  }
  
  return response.json();
}

export async function fetchLeaveBalances(): Promise<LeaveBalanceResponse> {
  const response = await fetch(`${BASE_URL}/leave-balances/me`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch leave balances');
  }
  
  return response.json();
}

export async function createLeaveRequest(payload: CreateLeaveRequestPayload): Promise<CreateLeaveRequestResponse> {
  const response = await fetch(`${BASE_URL}/leave-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create leave request');
  }

  return response.json();
}
