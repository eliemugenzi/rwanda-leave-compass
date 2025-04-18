
import Dashboard from '@/pages/Dashboard';
import LeaveRequest from '@/pages/LeaveRequest';
import MyLeaves from '@/pages/MyLeaves';
import Calendar from '@/pages/Calendar';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import LeaveDetails from '@/pages/LeaveDetails';
import SupervisorDashboard from '@/pages/SupervisorDashboard';
import Login from '@/pages/Login';
import Logout from '@/pages/Logout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  protection?: {
    enabled: boolean;
    roles?: string[];
  };
}

/**
 * Routes configuration that mimics Next.js Pages Router
 * In a real Next.js app, this would be automatically generated from the file system
 */
export const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    protection: {
      enabled: true,
    }
  },
  {
    path: '/request',
    component: () => (
      <ProtectedRoute>
        <LeaveRequest />
      </ProtectedRoute>
    ),
    protection: {
      enabled: true,
    }
  },
  {
    path: '/my-leaves',
    component: () => (
      <ProtectedRoute>
        <MyLeaves />
      </ProtectedRoute>
    ),
    protection: {
      enabled: true,
    }
  },
  {
    path: '/leave-details/:id',
    component: () => (
      <ProtectedRoute>
        <LeaveDetails />
      </ProtectedRoute>
    ),
    protection: {
      enabled: true,
    }
  },
  {
    path: '/supervisor-dashboard',
    component: () => (
      <ProtectedRoute requiredRoles={['supervisor', 'admin']}>
        <SupervisorDashboard />
      </ProtectedRoute>
    ),
    protection: {
      enabled: true,
      roles: ['supervisor', 'admin'],
    }
  },
  {
    path: '/calendar',
    component: () => (
      <ProtectedRoute>
        <Calendar />
      </ProtectedRoute>
    ),
    protection: {
      enabled: true,
    }
  },
  {
    path: '/profile',
    component: () => (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    protection: {
      enabled: true,
    }
  },
  {
    path: '/settings',
    component: () => (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
    protection: {
      enabled: true,
    }
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/logout',
    component: Logout,
  },
  {
    path: '*',
    component: NotFound,
  },
];
