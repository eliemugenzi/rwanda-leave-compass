
import { BASE_URL, fetchWithAuth } from './config';
import { LeaveRequestResponse, CreateLeaveRequestPayload, CreateLeaveRequestResponse } from './types/leave';

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
