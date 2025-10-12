import { Box, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

export function SmartLocksView() {
  return (
    <DashboardContent maxWidth={false}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#000000' }}>
          Smart locks & devices
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        {/* Keypad Image - Full Width */}
        <Box
          sx={{
            width: '100%',
            height: { xs: 250, sm: 350, md: 400 },
            backgroundImage: 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          {/* Overlay to enhance the keypad visibility */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)',
            }}
          />
        </Box>

        {/* Main Message */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600, 
            color: '#000000',
            textAlign: 'left',
            fontSize: { xs: '1.5rem', md: '1.75rem' }
          }}
        >
          Your Smart locks & devices are not currently connected
        </Typography>
        
        {/* Sub Message */}
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#000000',
            textAlign: 'left',
            fontSize: '1rem',
            maxWidth: 500,
            lineHeight: 1.5
          }}
        >
          Please contact the account holder to enable Smart Locks.
        </Typography>
      </Box>
    </DashboardContent>
  );
}
