import { BASE_URL, fetchWithAuth } from './config';
import { 
  LeaveRequestResponse, 
  CreateLeaveRequestPayload, 
  CreateLeaveRequestResponse, 
  UpdateLeaveRequestStatusPayload,
  UpdateLeaveRequestStatusResponse,
} from './types/leave';

export interface LeaveTypeStatistic {
  count: number;
  totalDays: number;
}

export interface MonthlyStatistic {
  year: number;
  month: number;
  approvedLeaveCount: number;
  totalLeaveDays: number;
  monthName: string;
  leaveTypeStatistics: {
    [key: string]: LeaveTypeStatistic;
  };
}

export interface MonthlyStatisticsResponse {
  message: string;
  status: number;
  data: MonthlyStatistic[];
}

export async function fetchAllLeaveRequests(status?: string, page: number = 0, size: number = 10): Promise<LeaveRequestResponse> {
  const url = new URL(`${BASE_URL}/leave-requests`);
  if (status) {
    url.searchParams.append('status', status);
  }
  url.searchParams.append('page', page.toString());
  url.searchParams.append('size', size.toString());
  
  return fetchWithAuth<LeaveRequestResponse>(url.toString());
}

export async function searchLeaveRequests(employeeName: string, page: number = 0, size: number = 10): Promise<LeaveRequestResponse> {
  const url = new URL(`${BASE_URL}/leave-requests/search`);
  url.searchParams.append('employeeName', employeeName);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('size', size.toString());
  
  return fetchWithAuth<LeaveRequestResponse>(url.toString());
}

export async function fetchUserLeaveRequests(status?: string, page: number = 0, size: number = 10): Promise<LeaveRequestResponse> {
  const url = new URL(`${BASE_URL}/leave-requests/me`);
  if (status) {
    url.searchParams.append('status', status);
  }
  url.searchParams.append('page', page.toString());
  url.searchParams.append('size', size.toString());
  
  return fetchWithAuth<LeaveRequestResponse>(url.toString());
}

export async function createLeaveRequest(payload: CreateLeaveRequestPayload): Promise<CreateLeaveRequestResponse> {
  return fetchWithAuth<CreateLeaveRequestResponse>(`${BASE_URL}/leave-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

/**
 * Approve or reject a leave request (Admin/HR only).
 * @param id Leave request ID
 * @param payload status: "APPROVED" | "REJECTED", rejectionReason (string, only required if status is "REJECTED")
 */
export async function updateLeaveRequestStatus(id: string, payload: UpdateLeaveRequestStatusPayload): Promise<UpdateLeaveRequestStatusResponse> {
  return fetchWithAuth<UpdateLeaveRequestStatusResponse>(`${BASE_URL}/leave-requests/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function fetchMonthlyLeaveStatistics(year: number): Promise<MonthlyStatisticsResponse> {
  return fetchWithAuth<MonthlyStatisticsResponse>(`${BASE_URL}/leave-requests/monthly-statistics/${year}`);
}
