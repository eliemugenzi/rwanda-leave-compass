
import { useState, useEffect, useCallback } from 'react';

const listeners: ((url: string) => void)[] = [];

interface RouterState {
  pathname: string;
  asPath: string;
  query: Record<string, string>;
}

let currentPath = window.location.pathname;

/**
 * A navigation utility that mimics Next.js's useRouter
 */
export const useRouter = () => {
  const [routerState, setRouterState] = useState<RouterState>({
    pathname: window.location.pathname,
    asPath: window.location.pathname,
    query: {}
  });

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

  // Listen for URL changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const newState = {
        pathname: url,
        asPath: url,
        query: {}
      };
      setRouterState(newState);
    };

    window.addEventListener('popstate', () => {
      handleRouteChange(window.location.pathname);
    });

    listeners.push(handleRouteChange);

    return () => {
      const index = listeners.indexOf(handleRouteChange);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [extractParams]);

  const push = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    currentPath = path;
    listeners.forEach(listener => listener(path));
  }, []);

  const replace = useCallback((path: string) => {
    window.history.replaceState({}, '', path);
    currentPath = path;
    listeners.forEach(listener => listener(path));
  }, []);

  const back = useCallback(() => {
    window.history.back();
  }, []);

  // Extract any params from the current path
  const params = useCallback(() => {
    // Match the current path against known routes with parameters
    // This is simplistic; you might need to enhance this for more complex route patterns
    return {};
  }, []);

  return {
    ...routerState,
    push,
    replace,
    back,
    pathname: routerState.pathname,
    query: routerState.query,
    params: params(),
    route: routerState.pathname,
  };
};

/**
 * Link component that mimics Next.js Link
 */
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
