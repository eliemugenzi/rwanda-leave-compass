
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) {
    // Get the logout function from auth context
    const { logout } = useAuth();
    
    // Show toast notification
    toast({
      title: "Session expired",
      description: "Please log in again to continue",
      variant: "destructive",
    });
    
    // Log the user out
    logout();
    
    // Redirect to login page
    window.location.href = '/login';
    
    throw new Error('Unauthorized');
  }
  
  if (!response.ok) {
    throw new Error('API request failed');
  }
  
  return response.json();
}
