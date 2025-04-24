
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

export async function createLeaveRequest(payload: CreateLeaveRequestPayload, supportingDocument?: File): Promise<CreateLeaveRequestResponse> {
  if (supportingDocument) {
    // Use FormData for requests with file uploads
    const formData = new FormData();
    formData.append('type', payload.type);
    formData.append('startDate', payload.startDate);
    formData.append('endDate', payload.endDate);
    formData.append('reason', payload.reason);
    
    if (payload.durationType) {
      formData.append('durationType', payload.durationType);
    }
    
    formData.append('supportingDocument', supportingDocument);

    return fetchWithAuth<CreateLeaveRequestResponse>(`${BASE_URL}/leave-requests`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header when using FormData
      // The browser will set it automatically with the proper boundary
    });
  } else {
    // Use JSON for requests without file uploads
    return fetchWithAuth<CreateLeaveRequestResponse>(`${BASE_URL}/leave-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  }
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
