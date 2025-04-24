
import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useRouter } from "./navigation";

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
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/auth-callback",
    element: <AuthCallback />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/leave-request",
    element: (
      <ProtectedRoute>
        <LeaveRequest />
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
        <MyLeaves />
      </ProtectedRoute>
    ),
  },
  {
    path: "/calendar",
    element: (
      <ProtectedRoute>
        <Calendar />
      </ProtectedRoute>
    ),
  },
  {
    path: "/leave-details/:id",
    element: (
      <ProtectedRoute>
        <LeaveDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/supervisor-dashboard",
    element: (
      <ProtectedRoute>
        <SupervisorDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
