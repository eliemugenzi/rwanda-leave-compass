
import Dashboard from '@/pages/Dashboard';
import LeaveRequest from '@/pages/LeaveRequest';
import MyLeaves from '@/pages/MyLeaves';
import Calendar from '@/pages/Calendar';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import LeaveDetails from '@/pages/LeaveDetails';
import SupervisorDashboard from '@/pages/SupervisorDashboard';

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
}

/**
 * Routes configuration that mimics Next.js Pages Router
 * In a real Next.js app, this would be automatically generated from the file system
 */
export const routes: RouteConfig[] = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/request',
    component: LeaveRequest,
  },
  {
    path: '/my-leaves',
    component: MyLeaves,
  },
  {
    path: '/leave-details/:id',
    component: LeaveDetails,
  },
  {
    path: '/supervisor-dashboard',
    component: SupervisorDashboard,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '*',
    component: NotFound,
  },
];
