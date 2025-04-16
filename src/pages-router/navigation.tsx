
import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';

// Define the type for the router context
interface RouterContextType {
  pathname: string;
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  query: Record<string, string>;
}

// Create the context
const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Router provider component
export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [pathname, setPathname] = useState(window.location.pathname);

  // Parse URL parameters (similar to dynamic routes in Next.js)
  const extractParams = useCallback((currentPath: string, pattern: string): Record<string, string> => {
    const patternSegments = pattern.split('/');
    const pathSegments = currentPath.split('/');
    const params: Record<string, string> = {};

    if (patternSegments.length !== pathSegments.length) return params;

    for (let i = 0; i < patternSegments.length; i++) {
      if (patternSegments[i].startsWith(':')) {
        const paramName = patternSegments[i].substring(1);
        params[paramName] = pathSegments[i];
      }
    }

    return params;
  }, []);

  // Extract URL query parameters
  const getQueryParams = useCallback((): Record<string, string> => {
    const query: Record<string, string> = {};
    const searchParams = new URLSearchParams(window.location.search);
    
    searchParams.forEach((value, key) => {
      query[key] = value;
    });
    
    return query;
  }, []);

  const push = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setPathname(path);
    // Dispatch a custom event to notify components about route change
    window.dispatchEvent(new CustomEvent('customNavigation'));
  }, []);

  const replace = useCallback((path: string) => {
    window.history.replaceState({}, '', path);
    setPathname(path);
    window.dispatchEvent(new CustomEvent('customNavigation'));
  }, []);

  const back = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const value = {
    pathname,
    push,
    replace,
    back,
    query: getQueryParams(),
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
};

// Hook to use the router
export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  
  return context;
};

// Link component
export const Link: React.FC<{
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ href, className, children, onClick }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick(e);
    router.push(href);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};
