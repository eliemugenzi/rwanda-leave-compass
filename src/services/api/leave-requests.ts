
import { BASE_URL, getAuthToken } from './config';
import { LeaveRequestResponse, CreateLeaveRequestPayload, CreateLeaveRequestResponse } from './types/leave';

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
