
import { useState } from 'react';
import { useRouter } from '@/pages-router/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@/pages-router/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { Department, JobTitle } from '@/types/api';
import { getDepartments, getJobTitles, registerUser } from '@/services/api';
import { Logo } from '@/components/layout/Logo';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  departmentId: z.string({
    required_error: 'Please select a department.',
  }),
  jobTitleId: z.string({
    required_error: 'Please select a job title.',
  }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
    }),
});

type FormData = z.infer<typeof formSchema>;

interface AuthResponse {
  message: string;
  status: number;
  data: {
    accessToken: string;
    refreshToken: string;
    tokenType: string | null;
  };
}

const SignUp = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch departments
  const { data: departmentsResponse } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
  });

  const departments = departmentsResponse?.data || [];

  // Fetch job titles when department is selected
  const { data: jobTitlesResponse, refetch: refetchJobTitles } = useQuery({
    queryKey: ['jobTitles'],
    queryFn: () => {
      const deptId = form.getValues('departmentId');
      return deptId ? getJobTitles(deptId) : Promise.resolve({ data: [] });
    },
    enabled: false,
  });

  const jobTitles = jobTitlesResponse?.data || [];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      departmentId: '',
      jobTitleId: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response: AuthResponse = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        departmentId: data.departmentId,
        jobTitleId: data.jobTitleId,
        role: 'ROLE_USER',
      });
      
      // Save the access token to localStorage
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
      // Extract the error message from the API response
      let errorMessage = 'An error occurred during registration. Please try again.';
      
      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);
          if (parsedError && parsedError.message) {
            errorMessage = parsedError.message;
          }
        } catch (e) {
          // If parsing fails, use the original error message
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Logo className="mx-auto mb-4" />
          <CardDescription>Create your account to manage leave requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your work email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue('jobTitleId', '');
                        refetchJobTitles();
                      }} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your job title" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobTitles.map((title) => (
                          <SelectItem key={title.id} value={title.id}>
                            {title.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
          <p>Already have an account?</p>
          <Link href="/login" className="text-primary hover:underline">
            Sign in here
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
