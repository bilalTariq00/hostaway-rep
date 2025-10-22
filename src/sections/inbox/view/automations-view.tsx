import React, { useState, useEffect } from 'react';
import { Plus, Edit, Copy, Search, Trash2, Filter, ExternalLink } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for automations
const mockAutomations = [
  {
    id: 1,
    title: 'POLACCHI: Prenotazione confermata',
    subject: 'Thank you for your reservation! 👋',
    defaultMessage: 'Thank you for your reservation! We look forward to hosting you.',
    eventTrigger: 'booking_confirmed',
    ccEmail1: 'host@example.com',
    ccEmail2: '',
    selectedChannels: ['booking', 'airbnb'],
    selectedListings: [{ id: 1, name: 'Polacchi42' }],
    channels: [
      { name: 'Booking.com', color: '#003580', icon: '🏨' },
      { name: 'Airbnb Pro', color: '#FF5A5F', icon: '🏠' },
    ],
    listing: 'Polacchi42',
    creationDate: '6 September 2024 at 2:54 pm',
    lastEdit: '13 January 2025 at 9:53 am',
    automationId: '212426',
    isActive: true,
  },
  {
    id: 2,
    title: 'Welcome Message Automation',
    subject: 'Welcome to your stay!',
    defaultMessage: 'Welcome to your stay! We hope you have a wonderful time.',
    eventTrigger: 'booking_confirmed',
    ccEmail1: 'welcome@example.com',
    ccEmail2: '',
    selectedChannels: ['airbnb', 'booking'],
    selectedListings: [{ id: 2, name: 'Beach House Villa' }],
    channels: [
      { name: 'Airbnb', color: '#FF5A5F', icon: '🏠' },
      { name: 'Booking.com', color: '#003580', icon: '🏨' },
    ],
    listing: 'Beach House Villa',
    creationDate: '15 January 2024 at 10:30 am',
    lastEdit: '20 January 2024 at 3:15 pm',
    automationId: 'AUTO-001',
    isActive: true,
  },
  {
    id: 3,
    title: 'Check-in Instructions',
    subject: 'Your check-in details',
    defaultMessage: 'Here are your check-in instructions. Please follow them carefully.',
    eventTrigger: 'check_in_reminder',
    ccEmail1: 'checkin@example.com',
    ccEmail2: '',
    selectedChannels: ['airbnb', 'vrbo'],
    selectedListings: [{ id: 3, name: 'Downtown Apartment' }],
    channels: [
      { name: 'Airbnb', color: '#FF5A5F', icon: '🏠' },
      { name: 'VRBO', color: '#00A699', icon: '🏖️' },
    ],
    listing: 'Downtown Apartment',
    creationDate: '10 January 2024 at 9:00 am',
    lastEdit: '18 January 2024 at 2:45 pm',
    automationId: 'AUTO-002',
    isActive: false,
  },
  {
    id: 4,
    title: 'Review Request',
    subject: 'How was your stay?',
    defaultMessage: 'Thank you for staying with us! Please share your experience.',
    eventTrigger: 'review_request',
    ccEmail1: 'reviews@example.com',
    ccEmail2: '',
    selectedChannels: ['airbnb', 'booking', 'vrbo'],
    selectedListings: [{ id: 4, name: 'City Center Loft' }],
    channels: [
      { name: 'Airbnb', color: '#FF5A5F', icon: '🏠' },
      { name: 'Booking.com', color: '#003580', icon: '🏨' },
      { name: 'VRBO', color: '#00A699', icon: '🏖️' },
    ],
    listing: 'City Center Loft',
    creationDate: '8 January 2024 at 11:20 am',
    lastEdit: '15 January 2024 at 4:30 pm',
    automationId: 'AUTO-004',
    isActive: true,
  },
];

export function AutomationsView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('automations');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [automations, setAutomations] = useState(mockAutomations);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [automationToDelete, setAutomationToDelete] = useState<number | null>(null);

  // Load automations from localStorage on component mount
  useEffect(() => {
    const savedAutomations = localStorage.getItem('automations');
    if (savedAutomations) {
      const parsedAutomations = JSON.parse(savedAutomations);
      // Sort by ID (which is timestamp) to show newest first
      const sortedAutomations = parsedAutomations.sort((a: any, b: any) => b.id - a.id);
      setAutomations((prev) => [...sortedAutomations, ...prev]);
    }
  }, []);

  // Update localStorage whenever automations change
  useEffect(() => {
    // Only save to localStorage if we have automations (avoid saving on initial load)
    if (automations.length > 0) {
      const savedAutomations = automations.filter((a) => a.id > 1000); // Only save user-created automations (IDs > 1000)
      localStorage.setItem('automations', JSON.stringify(savedAutomations));
    }
  }, [automations]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'automations') {
      router.push(`/inbox/${newValue}`);
    }
  };

  const handleCreateNew = () => {
    router.push('/inbox/automation-create');
  };

  const handleToggleActive = (id: number) => {
    setAutomations((prev) =>
      prev.map((automation) =>
        automation.id === id ? { ...automation, isActive: !automation.isActive } : automation
      )
    );
  };

  const handleEdit = (id: number) => {
    router.push(`/inbox/automation-edit/${id}`);
  };

  const handleCreateSimilar = (id: number) => {
    // Find the automation to copy
    const automationToCopy = automations.find((a) => a.id === id);
    if (automationToCopy) {
      // Store the automation data to copy in localStorage
      localStorage.setItem('automationToCopy', JSON.stringify(automationToCopy));
      router.push('/inbox/automation-create');
    }
  };

  const handleDelete = (id: number) => {
    setAutomationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (automationToDelete) {
      setAutomations((prev) => prev.filter((automation) => automation.id !== automationToDelete));
      setDeleteDialogOpen(false);
      setAutomationToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setAutomationToDelete(null);
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Guest Messaging
        </Typography>

        {/* Tabs */}
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Inbox" value="" />
          <Tab label="Message Templates" value="message-templates" />
          <Tab label="Automations" value="automations" />
          <Tab label="Manage Messages" value="manage-messages" />
        </Tabs>
      </Box>

      {/* Control Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<Filter size={16} />}
            sx={{
              borderColor: '#4caf50',
              color: '#4caf50',
              '&:hover': {
                borderColor: '#45a049',
                backgroundColor: 'rgba(76, 175, 80, 0.04)',
              },
            }}
          >
            Filters
          </Button>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              displayEmpty
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
              }}
            >
              <MenuItem value="date">Sort by</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>
          </FormControl>

          <TextField
            placeholder="Search"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Button
          variant="contained"
          startIcon={<Plus size={16} />}
          onClick={handleCreateNew}
          sx={{
            bgcolor: '#4caf50',
            '&:hover': { bgcolor: '#45a049' },
            px: 3,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          Create new +
        </Button>
      </Box>

      {/* Automations List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {automations.map((automation) => (
          <Card key={automation.id} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1 }}>
                <Switch
                  checked={automation.isActive}
                  onChange={() => handleToggleActive(automation.id)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#4caf50',
                      '& + .MuiSwitch-track': {
                        backgroundColor: '#4caf50',
                      },
                    },
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: '1.1rem' }}>
                    {automation.title}
                  </Typography>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5, fontSize: '0.75rem' }}
                      >
                        Subject
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        {automation.subject}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5, fontSize: '0.75rem' }}
                      >
                        Event
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        {automation.eventTrigger}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5, fontSize: '0.75rem' }}
                      >
                        Channels
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {automation.channels.map((channel, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: 'grey.100',
                              fontSize: '0.75rem',
                            }}
                          >
                            <span>{channel.icon}</span>
                            <span>{channel.name}</span>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5, fontSize: '0.75rem' }}
                      >
                        Listing
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            color: '#4caf50',
                          }}
                        >
                          {automation.listing}
                        </Typography>
                        <ExternalLink size={12} color="#4caf50" />
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5, fontSize: '0.75rem' }}
                      >
                        Creation date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        {automation.creationDate}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5, fontSize: '0.75rem' }}
                      >
                        Last edit
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        {automation.lastEdit}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5, fontSize: '0.75rem' }}
                      >
                        Automation id
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, fontSize: '0.875rem', fontFamily: 'monospace' }}
                      >
                        {automation.automationId}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Edit size={14} />}
                  onClick={() => handleEdit(automation.id)}
                  sx={{
                    borderColor: '#4caf50',
                    color: '#4caf50',
                    fontSize: '0.75rem',
                    px: 2,
                    py: 0.5,
                    '&:hover': {
                      borderColor: '#45a049',
                      backgroundColor: 'rgba(76, 175, 80, 0.04)',
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Copy size={14} />}
                  onClick={() => handleCreateSimilar(automation.id)}
                  sx={{
                    borderColor: '#4caf50',
                    color: '#4caf50',
                    fontSize: '0.75rem',
                    px: 2,
                    py: 0.5,
                    '&:hover': {
                      borderColor: '#45a049',
                      backgroundColor: 'rgba(76, 175, 80, 0.04)',
                    },
                  }}
                >
                  Create Similar
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Trash2 size={14} />}
                  onClick={() => handleDelete(automation.id)}
                  sx={{
                    borderColor: '#f44336',
                    color: '#f44336',
                    fontSize: '0.75rem',
                    px: 2,
                    py: 0.5,
                    '&:hover': {
                      borderColor: '#d32f2f',
                      backgroundColor: 'rgba(244, 67, 54, 0.04)',
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={cancelDelete} maxWidth="sm" fullWidth>
        <DialogTitle>Delete Automation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this automation? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
