import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

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

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Return null while redirecting (this should be very brief)
  return null;
}
