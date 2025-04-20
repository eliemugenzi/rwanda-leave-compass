
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from '@/pages-router/navigation';
import { Logo } from '@/components/layout/Logo';
import { LoginFormFields } from '@/components/auth/LoginFormFields';
import { useLoginForm } from '@/hooks/useLoginForm';

const Login = () => {
  const { form, isLoading, onSubmit } = useLoginForm();

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Logo className="mx-auto mb-4" />
          <CardDescription>Sign in to access your leave management dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginFormFields
            form={form}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
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
