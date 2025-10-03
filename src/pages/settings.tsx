import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { HeaderSection } from 'src/layouts/core';

// ----------------------------------------------------------------------

export default function SettingsPage() {
  return (
    <>
      <HeaderSection>
        <Typography variant="h4">Settings</Typography>
      </HeaderSection>

      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Card>
          <CardHeader title="General Settings" />
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              Configure your general application settings here.
            </Typography>
          </Box>
        </Card>

        <Card>
          <CardHeader title="Account Settings" />
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              Manage your account preferences and security settings.
            </Typography>
          </Box>
        </Card>

        <Card>
          <CardHeader title="Notifications" />
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              Control how and when you receive notifications.
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
}
