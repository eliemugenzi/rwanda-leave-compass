
import { BASE_URL } from './config';

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  departmentId: string;
  jobTitleId: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  status: number;
  data: {
    accessToken: string;
    refreshToken: string;
    tokenType: string | null;
    firstName: string;
    lastName: string;
    role?: string;
  };
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }
  
  return data;
}

export async function registerUser(payload: RegisterPayload) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }
  
  return data;
}
