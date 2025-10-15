import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from 'src/contexts/auth-context';

// ----------------------------------------------------------------------

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'team';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/login');
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        // Redirect to appropriate dashboard based on user role
        if (user.role === 'team') {
          navigate('/team-dashboard');
        } else {
          navigate('/');
        }
        return;
      }

      // If user is logged in but on wrong dashboard, redirect them
      if (user.role === 'team' && window.location.pathname === '/') {
        navigate('/team-dashboard');
      } else if (user.role === 'user' && window.location.pathname.startsWith('/team-dashboard')) {
        navigate('/');
      }
    }
  }, [user, isLoading, navigate, requiredRole]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!user) {
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
