
import { BASE_URL, getAuthToken } from './config';
import { LeaveBalanceResponse } from './types/leave';

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
