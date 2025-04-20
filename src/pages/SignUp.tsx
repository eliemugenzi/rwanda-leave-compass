
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from '@/pages-router/navigation';
import { Logo } from '@/components/layout/Logo';
import { SignUpFormFields } from '@/components/auth/SignUpFormFields';
import { useSignUpForm } from '@/hooks/useSignUpForm';

const SignUp = () => {
  const {
    form,
    isLoading,
    departments,
    jobTitles,
    refetchJobTitles,
    onSubmit,
  } = useSignUpForm();

  const handleDepartmentChange = () => {
    form.setValue('jobTitleId', '');
    refetchJobTitles();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Logo className="mx-auto mb-4" />
          <CardDescription>Create your account to manage leave requests</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SignUpFormFields
              form={form}
              departments={departments}
              jobTitles={jobTitles}
              onDepartmentChange={handleDepartmentChange}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
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
