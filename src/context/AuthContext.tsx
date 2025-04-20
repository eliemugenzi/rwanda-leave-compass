
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
      
      console.log("API Response:", response); // Log the full response to see what we're getting
      
      // Extract user data, ensuring we handle missing data
      // For now, using hardcoded values for testing if API doesn't return names
      const firstName = response.data.firstName || 'John';
      const lastName = response.data.lastName || 'Doe';
      
      const authenticatedUser: AuthUser = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        name: `${firstName} ${lastName}`.trim(),
        role: response.data.role || 'ROLE_USER'
      };
      
      console.log("Authenticated User:", authenticatedUser); // Log the user object we're saving
      
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
