import React, { useState } from 'react';
import { Home, Plus, Waves, Plane, Globe, Upload, MapPin, Trash2, Calendar, Download } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import StepContent from '@mui/material/StepContent';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';


// Mock data for channels
const mockChannels = [
  {
    id: 1,
    name: 'Airbnb',
    icon: Home,
    status: 'active',
    type: 'config',
  },
  {
    id: 2,
    name: 'Booking.com',
    icon: Calendar,
    status: 'not-connected',
    type: 'activate',
  },
  {
    id: 3,
    name: 'VRBO',
    icon: Waves,
    status: 'active',
    type: 'config',
  },
  {
    id: 4,
    name: 'Expedia',
    icon: Plane,
    status: 'not-connected',
    type: 'activate',
  },
  {
    id: 5,
    name: 'Direct Booking',
    icon: Globe,
    status: 'active',
    type: 'config',
  },
];

// Mock data for Airbnb users
const mockUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@example.com',
  },
];

const steps = [
  'Connect your account',
  'Verify permissions',
  'Sync your listings',
  'Complete setup',
];

export function ChannelsView() {
  const router = useRouter();
  const [configOpen, setConfigOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === 'listing-mapping') {
      router.push('/channel-manager/listing-mapping');
    }
  };

  const handleConfigClick = (channel: any) => {
    setSelectedChannel(channel);
    setConfigOpen(true);
  };

  const handleActivateClick = (channel: any) => {
    setSelectedChannel(channel);
    setActivateOpen(true);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStatusChip = (status: string) => {
    if (status === 'active') {
      return (
        <Box
          sx={{
            bgcolor: 'success.main',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          Active
        </Box>
      );
    }
    return (
      <Box
        sx={{
          bgcolor: 'grey.300',
          color: 'text.secondary',
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        Not Connected
      </Box>
    );
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Channel Manager
        </Typography>
        
        {/* Tabs */}
        <Tabs value="channels" onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Listing Mapping" value="listing-mapping" />
          <Tab label="Channels" value="channels" />
        </Tabs>
      </Box>

      {/* Channels Grid */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {mockChannels.map((channel) => (
          <Card key={channel.id} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {getStatusChip(channel.status)}
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                  {React.createElement(channel.icon, { size: 24, color: 'white' })}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {channel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {channel.status === 'active' ? 'Connected and synced' : 'Not connected'}
                  </Typography>
                </Box>
              </Box>
              
              <Box>
                {channel.type === 'config' ? (
                  <Button
                    variant="outlined"
                    onClick={() => handleConfigClick(channel)}
                    sx={{ textTransform: 'none' }}
                  >
                    Config
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleActivateClick(channel)}
                    sx={{ textTransform: 'none' }}
                  >
                    Activate
                  </Button>
                )}
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Configuration Dialog */}
      <Dialog
        open={configOpen}
        onClose={() => setConfigOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
              {selectedChannel?.icon && React.createElement(selectedChannel.icon, { size: 20, color: 'white' })}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {selectedChannel?.name} Configuration
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Connect your {selectedChannel?.name} account
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                sx={{ textTransform: 'none' }}
              >
                Connect Existing {selectedChannel?.name} Account
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ textTransform: 'none' }}
              >
                Create New {selectedChannel?.name} Account
              </Button>
            </Box>
          </Box>

          {/* Users List */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Connected Accounts
            </Typography>
            {mockUsers.map((user) => (
              <Card key={user.id} sx={{ mb: 2, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button size="small" variant="outlined" startIcon={<Plus size={14} />} sx={{ textTransform: 'none' }}>
                      Create New Listing
                    </Button>
                    <Button size="small" variant="outlined" startIcon={<Download size={14} />} sx={{ textTransform: 'none' }}>
                      Export Listing
                    </Button>
                    <Button size="small" variant="outlined" startIcon={<Upload size={14} />} sx={{ textTransform: 'none' }}>
                      Import
                    </Button>
                    <Button size="small" variant="outlined" startIcon={<MapPin size={14} />} sx={{ textTransform: 'none' }}>
                      Mapping
                    </Button>
                    <Button size="small" color="error" startIcon={<Trash2 size={14} />} sx={{ textTransform: 'none' }}>
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfigOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Activation Dialog */}
      <Dialog
        open={activateOpen}
        onClose={() => setActivateOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
              {selectedChannel?.icon && React.createElement(selectedChannel.icon, { size: 20, color: 'white' })}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Activate {selectedChannel?.name}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Follow the steps to connect your {selectedChannel?.name} account and start syncing your listings.
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mr: 1, textTransform: 'none' }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ textTransform: 'none' }}
                    >
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
              <Typography variant="body2" color="success.dark">
                All steps completed - {selectedChannel?.name} is now activated!
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActivateOpen(false)}>
            Cancel
          </Button>
          {activeStep === steps.length && (
            <Button onClick={handleReset} sx={{ textTransform: 'none' }}>
              Reset
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
