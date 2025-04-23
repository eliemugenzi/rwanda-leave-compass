
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from '@/pages-router/navigation';
import { Logo } from '@/components/layout/Logo';
import { LoginFormFields } from '@/components/auth/LoginFormFields';
import { useLoginForm } from '@/hooks/useLoginForm';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { BASE_URL } from '@/services/api/config';

const Login = () => {
  const { form, isLoading, onSubmit } = useLoginForm();

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
          <CardDescription>Sign in to access your leave management dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleMicrosoftLogin}
            >
              <Globe className="mr-2 h-4 w-4" />
              Sign in with Microsoft
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
            
            <LoginFormFields
              form={form}
              isLoading={isLoading}
              onSubmit={onSubmit}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
          <p>Don't have an account?</p>
          <Link href="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

