
export interface AuthUser {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
