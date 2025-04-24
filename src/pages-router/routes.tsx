
import React, { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useRouter } from "./navigation";
import { Loader } from "lucide-react";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader className="h-8 w-8 animate-spin text-primary" />
  </div>
);

// Custom redirect component that uses our custom router
const Redirect = ({ to }: { to: string }) => {
  const router = useRouter();
  
  // Effect to perform the redirect
  React.useEffect(() => {
    router.replace(to);
  }, [router, to]);
  
  return null;
};

// Pages
const Index = lazy(() => import("@/pages/Index"));
const Login = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Logout = lazy(() => import("@/pages/Logout"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const LeaveRequest = lazy(() => import("@/pages/LeaveRequest"));
const MyLeaves = lazy(() => import("@/pages/MyLeaves"));
const Calendar = lazy(() => import("@/pages/Calendar"));
const LeaveDetails = lazy(() => import("@/pages/LeaveDetails"));
const Profile = lazy(() => import("@/pages/Profile"));
const Settings = lazy(() => import("@/pages/Settings"));
const SupervisorDashboard = lazy(() => import("@/pages/SupervisorDashboard"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AuthCallback = lazy(() => import("@/pages/AuthCallback"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Suspense fallback={<LoadingFallback />}><Index /></Suspense>,
  },
  {
    path: "/login",
    element: <Suspense fallback={<LoadingFallback />}><Login /></Suspense>,
  },
  {
    path: "/signup",
    element: <Suspense fallback={<LoadingFallback />}><SignUp /></Suspense>,
  },
  {
    path: "/logout",
    element: <Suspense fallback={<LoadingFallback />}><Logout /></Suspense>,
  },
  {
    path: "/auth-callback",
    element: <Suspense fallback={<LoadingFallback />}><AuthCallback /></Suspense>,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/leave-request",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <LeaveRequest />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    // Replace Navigate with custom Redirect component
    path: "/request",
    element: <Redirect to="/leave-request" />,
  },
  {
    path: "/my-leaves",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <MyLeaves />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/calendar",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Calendar />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/leave-details/:id",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <LeaveDetails />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Profile />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Settings />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/supervisor-dashboard",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <SupervisorDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <AdminDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Suspense fallback={<LoadingFallback />}><NotFound /></Suspense>,
  },
];
