
import { BASE_URL, fetchWithAuth } from './config';
import { LeaveBalanceResponse } from './types/leave';

export async function fetchLeaveBalances(): Promise<LeaveBalanceResponse> {
  return fetchWithAuth<LeaveBalanceResponse>(`${BASE_URL}/leave-balances/me`);
}
