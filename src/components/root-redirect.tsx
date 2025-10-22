import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from 'src/contexts/auth-context';

// ----------------------------------------------------------------------

export function RootRedirect() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // No user logged in, redirect to login
        navigate('/login', { replace: true });
      } else {
        // User is logged in, redirect to appropriate dashboard based on role
        if (user.role === 'team') {
          navigate('/team-dashboard', { replace: true });
        } else {
          // For all other roles (user, manager, supervisor, associate), go to main dashboard
          navigate('/dashboard', { replace: true });
        }
      }
    }
  }, [user, isLoading, navigate]);

  // Return null while redirecting
  return null;
}
