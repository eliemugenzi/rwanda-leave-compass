
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/pages-router/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/services/api';
import { loginSchema, type LoginFormData } from '@/validation/login.schema';

export const useLoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // We'll let the AuthContext handle token storage
      const success = await login(data.email, data.password);
      
      if (success) {
        toast({
          title: 'Login successful',
          description: 'Welcome back!',
        });
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Invalid email or password. Please try again.';
      
      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);
          if (parsedError && parsedError.message) {
            errorMessage = parsedError.message;
          }
        } catch (e) {
          errorMessage = error.message;
        }
      }

      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
};
