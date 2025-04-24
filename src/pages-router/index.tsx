
import React, { Suspense } from 'react';
import { RouterProvider } from './navigation';
import { routes } from './routes';
import { Loader } from 'lucide-react';

// Create a custom router implementation
const PagesRouter = () => {
  const [currentRoute, setCurrentRoute] = React.useState(() => {
    return routes.find((route) => route.path === window.location.pathname) || routes.find((route) => route.path === '*');
  });

  React.useEffect(() => {
    const handleRouteChange = () => {
      const newRoute = routes.find((route) => {
        if (route.path === '*') return false;
        if (route.path === window.location.pathname) return true;
        
        // Handle dynamic routes like /leave-details/:id
        if (route.path && route.path.includes(':')) {
          const routeParts = route.path.split('/');
          const pathParts = window.location.pathname.split('/');
          
          if (routeParts.length !== pathParts.length) return false;
          
          return routeParts.every((part, i) => {
            if (part.startsWith(':')) return true;
            return part === pathParts[i];
          });
        }
        
        return false;
      }) || routes.find((route) => route.path === '*');
      
      setCurrentRoute(newRoute);
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('customNavigation', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('customNavigation', handleRouteChange);
    };
  }, []);

  return (
    <RouterProvider>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      }>
        {currentRoute?.element}
      </Suspense>
    </RouterProvider>
  );
};

export default PagesRouter;
