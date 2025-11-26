import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useAuth } from 'src/contexts/auth-context';

export function HostawayLogin() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('superadmin@hostaway.com');
  const [password, setPassword] = useState('superadmin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const success = await login(email, password);

      if (success) {
        // Get the stored user data to check role
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          console.log('Login successful, navigating to dashboard...', userData);

          // Navigate based on user role
          if (userData.role === 'team') {
            navigate('/team-dashboard', { replace: true });
          } else if (['associate', 'supervisor', 'manager'].includes(userData.role)) {
            navigate('/dashboard', { replace: true });
          } else {
            navigate('/dashboard', { replace: true });
          }
        } else {
          // Fallback to main dashboard if no user data
          navigate('/dashboard', { replace: true });
        }
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        bgcolor: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Left Side - Illustration */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'grey.50',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,147,30,0.1) 100%)',
            opacity: 0.3,
          }}
        />

        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', p: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#333' }}>
            Hi, Welcome back
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontWeight: 400 }}>
            More effectively with optimized workflows.
          </Typography>

          {/* Hostaway Image */}
          <img
            src="/assets/image.png"
            alt="Hostaway Dashboard"
            style={{
              width: '100%',
              maxWidth: '600px',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>

      {/* Right Side - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'white',
          p: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#333' }}>
              Sign in to your account
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                sx={{
                  color: '#FF6B35',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Get started
              </Link>
            </Typography>
          </Box>

          {/* Demo Credentials Section */}
          <Card sx={{ mb: 3 }}>
            <CardHeader
              title="Demo Credentials"
              subheader="Use these credentials to test different user roles"
              sx={{ pb: 1 }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="Super Admin" color="error" size="small" />
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    admin@hostaway.com / admin123
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="Manager" color="warning" size="small" />
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    manager@hostaway.com / manager123
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="Supervisor" color="info" size="small" />
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    supervisor@hostaway.com / supervisor123
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="Associate" color="success" size="small" />
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    associate@hostaway.com / associate123
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="Team" color="primary" size="small" />
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    team@hostaway.com / team123
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                },
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <Link
                href="#"
                sx={{
                  fontSize: '14px',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                py: 1.5,
                mb: 3,
                borderRadius: 2,
                bgcolor: '#333',
                color: 'white',
                '&:hover': {
                  bgcolor: '#555',
                },
                '&:disabled': {
                  bgcolor: 'grey.300',
                },
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign in'}
            </Button>
          </form>

          {/* Footer */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              By signing in, you agree to our{' '}
              <Link href="#" sx={{ color: '#FF6B35', textDecoration: 'none' }}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" sx={{ color: '#FF6B35', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
