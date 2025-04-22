
import { toast } from '@/hooks/use-toast';

// We can't use the useAuth hook in a regular function, so we'll create 
// a function that performs the logout actions directly
export const performLogout = () => {
  // Clear auth data from storage
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  
  // Show toast notification
  toast({
    title: "Session expired",
    description: "Please log in again to continue",
    variant: "destructive",
  });
  
  // Redirect to login page
  window.location.href = '/login';
};

export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) {
    // Handle unauthorized response by logging out
    performLogout();
    
    throw new Error('Unauthorized');
  }
  
  if (!response.ok) {
    throw new Error('API request failed');
  }
  
  return response.json();
}
