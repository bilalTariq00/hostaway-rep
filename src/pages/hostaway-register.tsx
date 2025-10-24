import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useAuth } from 'src/contexts/auth-context';
import { hostawayApi } from 'src/services/hostaway-api';

export function HostawayRegister() {
  const navigate = useNavigate();
  const { isLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    hostawayApiKey: '',
    hostawayAccountId: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Mock registration - create user data
      if (formData.email && formData.password.length >= 6) {
        const userData = {
          id: Date.now().toString(),
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          role: formData.hostawayApiKey && formData.hostawayAccountId ? 'super-admin' : 'user',
          hostawayApiKey: formData.hostawayApiKey,
          hostawayAccountId: formData.hostawayAccountId,
        };

        // Store user data
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Store Hostaway credentials separately for security
        if (formData.hostawayApiKey && formData.hostawayAccountId) {
          const hostawayCredentials = {
            apiKey: formData.hostawayApiKey,
            accountId: formData.hostawayAccountId,
            userId: userData.id,
          };
          localStorage.setItem('hostawayCredentials', JSON.stringify(hostawayCredentials));
          hostawayApi.setCredentials(hostawayCredentials);
        }

        console.log('Registration successful, navigating to dashboard...');
        navigate('/dashboard', { replace: true });
      } else {
        setError('Please fill all fields and ensure password is at least 6 characters');
      }
    } catch {
      setError('Registration failed. Please try again.');
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
            Manage the job
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

      {/* Right Side - Register Form */}
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
              Get started absolutely free
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Already have an account?{' '}
              <Link
                href="/login"
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

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* First Name and Last Name Row */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="First name"
                value={formData.firstName}
                onChange={handleChange('firstName')}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Last name"
                value={formData.lastName}
                onChange={handleChange('lastName')}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                  },
                }}
              />
            </Box>

            {/* Email Field */}
            <TextField
              fullWidth
              label="Email address"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
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

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange('password')}
              required
              helperText="6+ characters"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                },
                '& .MuiFormHelperText-root': {
                  color: 'text.secondary',
                  fontSize: '12px',
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

            {/* Hostaway API Credentials Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: 600 }}>
                Hostaway Integration (Optional)
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Connect your Hostaway account to sync your property data
              </Typography>
              
              <TextField
                fullWidth
                label="Hostaway API Key"
                type="password"
                value={formData.hostawayApiKey}
                onChange={handleChange('hostawayApiKey')}
                placeholder="Enter your Hostaway API key"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                  },
                }}
              />
              
              <TextField
                fullWidth
                label="Hostaway Account ID"
                value={formData.hostawayAccountId}
                onChange={handleChange('hostawayAccountId')}
                placeholder="Enter your Hostaway Account ID"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                  },
                }}
              />
              
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '12px' }}>
                You can find these in your Hostaway account → Settings → API
              </Typography>
            </Box>

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
              {isLoading ? 'Creating Account...' : 'Create account'}
            </Button>
          </form>

          {/* Footer */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              By signing up, I agree to{' '}
              <Link href="#" sx={{ color: '#FF6B35', textDecoration: 'none' }}>
                Terms of service
              </Link>{' '}
              and{' '}
              <Link href="#" sx={{ color: '#FF6B35', textDecoration: 'none' }}>
                Privacy policy
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
