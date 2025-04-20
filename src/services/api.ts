import { ApiResponse, Department, JobTitle } from '@/types/api';

const BASE_URL = 'https://time-away-backend-production.up.railway.app/api/v1';

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  departmentId: string;
  jobTitleId: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  status: number;
  data: {
    accessToken: string;
    refreshToken: string;
    tokenType: string | null;
    firstName: string;
    lastName: string;
    role?: string; // Added role as an optional property
  };
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }
  
  return data;
}

export async function registerUser(payload: RegisterPayload) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }
  
  return data;
}

export async function getDepartments(): Promise<ApiResponse<Department[]>> {
  const response = await fetch(`${BASE_URL}/departments`);
  if (!response.ok) {
    throw new Error('Failed to fetch departments');
  }
  return response.json();
}

export async function getJobTitles(departmentId: string): Promise<ApiResponse<JobTitle[]>> {
  const response = await fetch(`${BASE_URL}/job-titles/department/${departmentId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch job titles');
  }
  return response.json();
}

export interface LeaveRequestResponse {
  success: boolean;
  message: string;
  status: number;
  data: LeaveRequest[];
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
}

export async function fetchAllLeaveRequests(status?: string): Promise<LeaveRequestResponse> {
  const url = new URL(`${BASE_URL}/leave-requests`);
  if (status) {
    url.searchParams.append('status', status);
  }
  
  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch leave requests');
  }
  
  return response.json();
}

export async function fetchUserLeaveRequests(status?: string): Promise<LeaveRequestResponse> {
  const url = new URL(`${BASE_URL}/leave-requests/me`);
  if (status) {
    url.searchParams.append('status', status);
  }
  
  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user leave requests');
  }
  
  return response.json();
}
