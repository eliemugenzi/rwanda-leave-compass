
export const BASE_URL = 'https://time-away-backend-production.up.railway.app/api/v1';

export const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
    'Authorization': token ? `Bearer ${token}` : '',
  };

  return fetch(url, {
    ...options,
    headers,
  });
}
