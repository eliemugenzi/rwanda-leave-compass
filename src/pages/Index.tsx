
import { Button } from "@/components/ui/button";
import { Link } from "@/pages-router/navigation";
import { useAuth } from "@/context/AuthContext";
import { Calendar, FileText, Clock } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  // Check if user is admin or HR
  const isAdminOrHR = user?.role === 'admin' || 
                      user?.role === 'ROLE_ADMIN' || 
                      user?.role === 'hr' || 
                      user?.role === 'ROLE_HR';

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Time Away
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Streamline your time off requests, track leave balances, and manage 
          team schedules with ease.
        </p>

        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard" className="w-full">
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            {!isAdminOrHR && (
              <>
                <Link href="/leave-request" className="w-full">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Request Leave
                  </Button>
                </Link>
                <Link href="/my-leaves" className="w-full">
                  <Button variant="outline" className="w-full">
                    <Clock className="mr-2 h-4 w-4" />
                    My Leaves
                  </Button>
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <Button>
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline">
                Create Account
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
