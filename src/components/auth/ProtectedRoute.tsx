
import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from '@/pages-router/navigation';
import { useToast } from '@/hooks/use-toast';

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRoles?: string[];
};

export const ProtectedRoute = ({ 
  children, 
  requiredRoles = [] 
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Don't redirect while auth is loading
    if (isLoading) return;

    // If user is not logged in, redirect to login
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      router.replace('/login');
      return;
    }

    // If roles are specified, check if user has required role
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      router.replace('/');
      return;
    }
  }, [user, isLoading, router, requiredRoles, toast]);

  // Show loading state if auth is still loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-xl font-medium mb-2">Loading...</h1>
          <p className="text-muted-foreground">Verifying your credentials</p>
        </div>
      </div>
    );
  }

  // If user is logged in and has required role, render children
  if (user && (!requiredRoles.length || requiredRoles.includes(user.role))) {
    return <>{children}</>;
  }

  // Default return empty for redirecting cases
  return null;
};
