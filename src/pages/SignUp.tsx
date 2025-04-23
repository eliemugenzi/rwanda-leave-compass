
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from '@/pages-router/navigation';
import { Logo } from '@/components/layout/Logo';
import { SignUpFormFields } from '@/components/auth/SignUpFormFields';
import { useSignUpForm } from '@/hooks/useSignUpForm';
import { Separator } from '@/components/ui/separator';
import { BASE_URL } from '@/services/api/config';
import { icons } from 'lucide-react';

const Microsoft = icons["microsoft"];

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

  /**
   * Remove trailing /api/v1 segment from BASE_URL to get the root server URL
   * Then append the oauth path.
   */
  const handleMicrosoftLogin = () => {
    // Remove '/api/v1' if it is at the end of BASE_URL
    let rootUrl = BASE_URL.replace(/\/api\/v1\/?$/, '');
    const oauthUrl = `${rootUrl}/oauth2/authorization/azure-ad`;
    window.location.href = oauthUrl;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Logo className="mx-auto mb-4" />
          <CardDescription>Create your account to manage leave requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleMicrosoftLogin}
            >
              <Microsoft className="mr-2 h-4 w-4" />
              Sign up with Microsoft
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
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
          </div>
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
