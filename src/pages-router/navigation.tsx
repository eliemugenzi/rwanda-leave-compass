
import { useNavigate } from 'react-router-dom';

/**
 * A navigation utility that mimics Next.js's useRouter
 */
export const useRouter = () => {
  const navigate = useNavigate();

  return {
    push: (path: string) => navigate(path),
    replace: (path: string) => navigate(path, { replace: true }),
    back: () => navigate(-1),
    pathname: window.location.pathname,
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
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(href);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};
