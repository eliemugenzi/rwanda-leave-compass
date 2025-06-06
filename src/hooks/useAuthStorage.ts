
import { AuthUser } from '@/types/auth';

export const useAuthStorage = () => {
  const getStoredUser = (): AuthUser | null => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const storeUser = (user: AuthUser): void => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeUser = (): void => {
    localStorage.removeItem('user');
  };

  const getToken = (): string | null => {
    return localStorage.getItem('accessToken');
  };

  const storeToken = (token: string): void => {
    localStorage.setItem('accessToken', token);
  };

  const removeToken = (): void => {
    localStorage.removeItem('accessToken');
  };

  return {
    getStoredUser,
    storeUser,
    removeUser,
    getToken,
    storeToken,
    removeToken,
  };
};
