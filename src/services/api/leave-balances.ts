
import { BASE_URL, fetchWithAuth } from './config';
import { handleApiResponse } from './utils';
import { LeaveBalanceResponse } from './types/leave';

export async function fetchLeaveBalances(): Promise<LeaveBalanceResponse> {
  const response = await fetchWithAuth(`${BASE_URL}/leave-balances/me`);
  return handleApiResponse<LeaveBalanceResponse>(response);
}
