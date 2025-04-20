
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/pages-router/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { getDepartments, getJobTitles, registerUser } from '@/services/api';
import { signUpSchema, type SignUpFormData } from '@/validation/signup.schema';

export const useSignUpForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      departmentId: '',
      jobTitleId: '',
      password: '',
    },
  });

  const { data: departmentsResponse } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
  });

  const departments = departmentsResponse?.data || [];

  const { data: jobTitlesResponse, refetch: refetchJobTitles } = useQuery({
    queryKey: ['jobTitles'],
    queryFn: () => {
      const deptId = form.getValues('departmentId');
      return deptId ? getJobTitles(deptId) : Promise.resolve({ data: [] });
    },
    enabled: false,
  });

  const jobTitles = jobTitlesResponse?.data || [];

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const response = await registerUser({
        ...data,
        role: 'ROLE_USER',
      });
      
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }
      
      const success = await login(data.email, data.password);
      
      if (success) {
        toast({
          title: 'Registration successful',
          description: 'Welcome to Time Away!',
        });
        router.push('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'An error occurred during registration. Please try again.';
      
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
        title: 'Registration failed',
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
    departments,
    jobTitles,
    refetchJobTitles,
    onSubmit,
  };
};
