
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import AdminDashboard from '@/pages/AdminDashboard';
import Calendar from '@/pages/Calendar';
import Dashboard from '@/pages/Dashboard';
import Index from '@/pages/Index';
import LeaveDetails from '@/pages/LeaveDetails';
import LeaveRequest from '@/pages/LeaveRequest';
import Login from '@/pages/Login';
import Logout from '@/pages/Logout';
import MyLeaves from '@/pages/MyLeaves';
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import SignUp from '@/pages/SignUp';
import SupervisorDashboard from '@/pages/SupervisorDashboard';
import AuthCallback from '@/pages/AuthCallback';

export interface Route {
  path: string;
  element: React.ReactNode;
}

export const routes: Route[] = [
  { path: '/', element: <Index /> },
  { path: '/login', element: <Login /> },
  { path: '/logout', element: <Logout /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/auth/callback', element: <AuthCallback /> },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRoles={['ROLE_ADMIN']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/supervisor',
    element: (
      <ProtectedRoute requiredRoles={['ROLE_SUPERVISOR', 'ROLE_ADMIN']}>
        <SupervisorDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/calendar',
    element: (
      <ProtectedRoute>
        <Calendar />
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-leaves',
    element: (
      <ProtectedRoute>
        <MyLeaves />
      </ProtectedRoute>
    ),
  },
  {
    path: '/leave-request',
    element: (
      <ProtectedRoute>
        <LeaveRequest />
      </ProtectedRoute>
    ),
  },
  {
    path: '/leave/:id',
    element: (
      <ProtectedRoute>
        <LeaveDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: '/leave-details/:id',
    element: (
      <ProtectedRoute>
        <LeaveDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <NotFound /> },
];
