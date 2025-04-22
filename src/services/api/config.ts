
import { handleApiResponse } from './utils';

export const BASE_URL = 'https://time-away-backend-production.up.railway.app/api/v1';

export const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export async function fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
    'Authorization': token ? `Bearer ${token}` : '',
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  return handleApiResponse<T>(response);
}
