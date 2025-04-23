
import { useEffect, useState } from 'react';
import { useRouter } from '@/pages-router/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { AuthUser } from '@/types/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader } from 'lucide-react';

const AuthCallback = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processOAuthResponse = async () => {
      try {
        // If we already have a user, redirect to home
        if (user) {
          router.replace('/');
          return;
        }

        // Extract query params from URL
        const searchParams = new URLSearchParams(window.location.search);
        
        // Check if there's an error
        const errorParam = searchParams.get('error');
        if (errorParam) {
          setError(errorParam);
          toast({
            title: 'Authentication failed',
            description: errorParam,
            variant: 'destructive',
          });
          setIsProcessing(false);
          return;
        }

        // Extract authentication data
        const token = searchParams.get('token');
        const refreshToken = searchParams.get('refreshToken');
        const email = searchParams.get('email');
        const firstName = searchParams.get('firstName');
        const lastName = searchParams.get('lastName');
        const role = searchParams.get('role');

        // Validate required fields
        if (!token || !email || !firstName || !lastName) {
          setError('Missing authentication data');
          toast({
            title: 'Authentication failed',
            description: 'Invalid response from authentication provider',
            variant: 'destructive',
          });
          setIsProcessing(false);
          return;
        }

        // Store the access token
        localStorage.setItem('accessToken', token);
        
        // If there's a refresh token, store it too
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }

        // Create the authenticated user object
        const authenticatedUser: AuthUser = {
          email: email,
          firstName: firstName,
          lastName: lastName,
          name: `${firstName} ${lastName}`.trim(),
          role: role || 'ROLE_USER'
        };

        // Store the user in local storage
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        
        // Show success message
        toast({
          title: 'Login successful',
          description: 'Welcome back!',
        });

        // Redirect to home page
        router.replace('/');
      } catch (err) {
        console.error('Error processing OAuth callback:', err);
        setError('Failed to process authentication response');
        toast({
          title: 'Authentication failed',
          description: 'An unexpected error occurred',
          variant: 'destructive',
        });
        setIsProcessing(false);
      }
    };

    processOAuthResponse();
  }, [router, toast, user]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <AlertTitle>Authentication Failed</AlertTitle>
            <AlertDescription>
              {error}
              <div className="mt-4">
                <a 
                  href="/login" 
                  className="text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/login');
                  }}
                >
                  Return to login
                </a>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Processing your login...</p>
    </div>
  );
};

export default AuthCallback;
