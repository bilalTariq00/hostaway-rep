import { useState } from 'react';
import { Eye, Save, EyeOff, RefreshCw } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { HeaderSection } from 'src/layouts/core';
import { useAuth } from 'src/contexts/auth-context';
import { useHostaway } from 'src/contexts/hostaway-context';

// ----------------------------------------------------------------------
 
export default function SettingsPage() {
  const { user } = useAuth();
  const { 
    hasCredentials, 
    credentials, 
    setCredentials, 
    refreshData, 
    isLoading,
    properties,
    reservations,
    guests,
    revenue 
  } = useHostaway();

  const isSuperAdmin = user?.role === 'super-admin';

  const [formData, setFormData] = useState({
    apiKey: credentials?.apiKey || '',
    accountId: credentials?.accountId || '',
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveCredentials = async () => {
    if (!formData.apiKey || !formData.accountId) {
      setMessage({ type: 'error', text: 'Please fill in both API Key and Account ID' });
      return;
    }

    try {
      const newCredentials = {
        apiKey: formData.apiKey,
        accountId: formData.accountId,
        userId: credentials?.userId || Date.now().toString(),
      };
      
      setCredentials(newCredentials);
      setMessage({ type: 'success', text: 'Hostaway credentials updated successfully!' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to update credentials. Please try again.' });
    }
  };

  const handleRefreshData = async () => {
    try {
      await refreshData();
      setMessage({ type: 'success', text: 'Data refreshed successfully!' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to refresh data. Please check your credentials.' });
    }
  };

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
        {/* Hostaway Integration Settings - Only for Super Admin */}
        {isSuperAdmin && (
          <Card>
            <CardHeader title="Hostaway Integration" />
            <Box sx={{ p: 3 }}>
              {message && (
                <Alert 
                  severity={message.type} 
                  sx={{ mb: 3 }}
                  onClose={() => setMessage(null)}
                >
                  {message.text}
                </Alert>
              )}
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Hostaway API Key"
                    type={showApiKey ? 'text' : 'password'}
                    value={formData.apiKey}
                    onChange={handleChange('apiKey')}
                    placeholder="Enter your Hostaway API key"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowApiKey(!showApiKey)} edge="end">
                            {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Hostaway Account ID"
                    value={formData.accountId}
                    onChange={handleChange('accountId')}
                    placeholder="Enter your Hostaway Account ID"
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Save size={20} />}
                  onClick={handleSaveCredentials}
                  disabled={isLoading}
                  sx={{
                    bgcolor: '#333',
                    '&:hover': { bgcolor: '#555' },
                  }}
                >
                  Save Credentials
                </Button>
                
                {hasCredentials && (
                  <Button
                    variant="outlined"
                    startIcon={<RefreshCw size={20} />}
                    onClick={handleRefreshData}
                    disabled={isLoading}
                  >
                    Refresh Data
                  </Button>
                )}
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                You can find your API credentials in your Hostaway account → Settings → API
              </Typography>
              
              {hasCredentials && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Data Status:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Properties: {properties.length} | Reservations: {reservations.length} | 
                    Guests: {guests.length} | Revenue Records: {revenue.length}
                  </Typography>
                </Box>
              )}
            </Box>
          </Card>
        )}

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
