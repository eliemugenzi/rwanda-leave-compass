
import { useEffect } from 'react';
import { useRouter } from '@/pages-router/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Logout = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Perform logout
    logout();
    
    // Show toast notification
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Redirect to login
    setTimeout(() => {
      router.push('/login');
    }, 500);
  }, [logout, router, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Logging out...</h1>
        <p className="text-muted-foreground">Redirecting you to the login page</p>
      </div>
    </div>
  );
};

export default Logout;
