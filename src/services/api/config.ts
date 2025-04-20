
export const BASE_URL = 'https://time-away-backend-production.up.railway.app/api/v1';

export const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

