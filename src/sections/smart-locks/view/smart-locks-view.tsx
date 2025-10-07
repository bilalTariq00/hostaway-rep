import { Box, Card, Button, Typography, CardContent } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

export function SmartLocksView() {
  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Smart Locks & Devices
        </Typography>
      </Box>

      {/* Main Content Card */}
      <Card sx={{ bgcolor: 'white', mb: 4 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
            {/* Left side - Image */}
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Box
                sx={{
                  width: { xs: 280, md: 400 },
                  height: { xs: 210, md: 300 },
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 'inherit',
                  }
                }}
              >
                <Box
                  sx={{
                    fontSize: { xs: 80, md: 120 },
                    color: 'white',
                    zIndex: 1,
                    fontWeight: 'bold'
                  }}
                >
                  🔐
                </Box>
              </Box>
            </Box>

            {/* Right side - Content */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  color: 'text.primary',
                  lineHeight: 1.3
                }}
              >
                Your smart locks & devices are not currently connected
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  mb: 4
                }}
              >
                Please connect holder to enable smart locks and manage your property access remotely.
              </Typography>

              <Button
                variant="contained"
                size="large"
                startIcon={<Box component="span" sx={{ fontSize: 20 }}>⚙️</Box>}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Connect Smart Locks
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Additional Info Cards */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Card sx={{ flex: 1, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ fontSize: 40, color: 'primary.main', mb: 2 }}>🔒</Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Secure Access
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Control who enters your property with encrypted smart lock technology
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ fontSize: 40, color: 'primary.main', mb: 2 }}>📲</Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Remote Control
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage locks from anywhere using your mobile device or dashboard
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ fontSize: 40, color: 'primary.main', mb: 2 }}>📋</Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Access Logs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track all entry and exit activities with detailed access logs
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </DashboardContent>
  );
}
