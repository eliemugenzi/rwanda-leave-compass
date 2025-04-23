
import React, { useState, useEffect } from 'react';
import { routes } from './routes';
import { RouterProvider } from './navigation';

/**
 * Pages Router component that mimics Next.js routing based on file system
 * without using React Router DOM
 */
const PagesRouter: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('customNavigation', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('customNavigation', handleRouteChange);
    };
  }, []);

  // Find the matching route
  const findRouteComponent = () => {
    // First try to find exact matches
    const exactRoute = routes.find(route => {
      // Handle root path special case
      if (route.path === '/' && currentPath === '/') return true;
      
      // For other routes, compare paths
      if (route.path === currentPath) return true;
      
      return false;
    });

    if (exactRoute) {
      return exactRoute.element;
    }

    // If no exact match, try to match dynamic routes
    const dynamicRoute = routes.find(route => {
      if (route.path === '*') return false; // Skip the catch-all route for now
      
      const routeSegments = route.path.split('/');
      const pathSegments = currentPath.split('/');
      
      if (routeSegments.length !== pathSegments.length) return false;
      
      for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i].startsWith(':')) continue; // Dynamic segment, always matches
        if (routeSegments[i] !== pathSegments[i]) return false;
      }
      
      return true;
    });

    if (dynamicRoute) {
      return dynamicRoute.element;
    }

    // If no match found, use the 404 (catch-all) route
    const notFoundRoute = routes.find(route => route.path === '*');
    if (notFoundRoute) {
      return notFoundRoute.element;
    }

    // Fallback if somehow no 404 route is defined
    return <div>Page not found</div>;
  };

  return (
    <RouterProvider>
      {findRouteComponent()}
    </RouterProvider>
  );
};

export default PagesRouter;
