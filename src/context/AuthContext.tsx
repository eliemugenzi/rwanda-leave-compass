import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser } from '@/services/api';
import { AuthContextType, AuthUser } from '@/types/auth';
import { useAuthStorage } from '@/hooks/useAuthStorage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getStoredUser, storeUser, removeUser } = useAuthStorage();

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await loginUser({ email, password });
      console.log("API Response:", response);

      if (!response.data.firstName || !response.data.lastName) {
        console.error("Missing user data in response:", response.data);
        return false;
      }

      const authenticatedUser: AuthUser = {
        email: email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        name: `${response.data.firstName} ${response.data.lastName}`.trim(),
        role: response.data.role || 'ROLE_USER'
      };

      console.log("Authenticated User:", authenticatedUser);
      storeUser(authenticatedUser);
      setUser(authenticatedUser);
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
