import React, { useState, useEffect } from 'react';
import { Save, Info, ArrowLeft } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for listings
const mockListings = [
  { id: 1, name: 'Luxury Villa Rome', image: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-5.webp', selected: false },
  { id: 2, name: 'Modern Apartment Milan', image: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-6.webp', selected: false },
  { id: 3, name: 'Cozy Studio Florence', image: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-4.webp', selected: false },
  { id: 4, name: 'Beach House Naples', image: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-5.webp', selected: false },
  { id: 5, name: 'Mountain Cabin Turin', image: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-6.webp', selected: false },
  { id: 6, name: 'City Loft Venice', image: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-4.webp', selected: false },
];

const channelOptions = [
  { value: 'airbnb', label: 'Airbnb', color: '#FF5A5F' },
  { value: 'booking', label: 'Booking.com', color: '#003580' },
  { value: 'vrbo', label: 'VRBO', color: '#00A699' },
  { value: 'expedia', label: 'Expedia', color: '#FFB800' },
  { value: 'all', label: 'All Channels', color: '#6c757d' },
];

const eventOptions = [
  { value: 'booking_confirmed', label: 'Booking Confirmed' },
  { value: 'check_in_reminder', label: 'Check-in Reminder' },
  { value: 'check_out_reminder', label: 'Check-out Reminder' },
  { value: 'review_request', label: 'Review Request' },
  { value: 'cancellation', label: 'Cancellation' },
];

export function AutomationEditView() {
  const router = useRouter();
  const [automationId, setAutomationId] = useState<number | null>(null);
  const [automationName, setAutomationName] = useState('');
  const [ccEmail1, setCcEmail1] = useState('');
  const [ccEmail2, setCcEmail2] = useState('');
  const [subject, setSubject] = useState('');
  const [defaultMessage, setDefaultMessage] = useState('');
  const [eventTrigger, setEventTrigger] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [listings, setListings] = useState(mockListings);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  // Load automation data on component mount
  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const id = parseInt(pathParts[pathParts.length - 1]);
    setAutomationId(id);

    // First check localStorage for user-created automations
    const savedAutomations = localStorage.getItem('automations');
    let automation = null;
    
    if (savedAutomations) {
      const parsedAutomations = JSON.parse(savedAutomations);
      automation = parsedAutomations.find((a: any) => a.id === id);
    }
    
    // If not found in localStorage, check mock data (for demo purposes)
    if (!automation) {
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
        },
      ];
      automation = mockAutomations.find((a: any) => a.id === id);
    }
    
    if (automation) {
      setAutomationName(automation.title || '');
      setCcEmail1(automation.ccEmail1 || '');
      setCcEmail2(automation.ccEmail2 || '');
      setSubject(automation.subject || '');
      setDefaultMessage(automation.defaultMessage || '');
      setEventTrigger(automation.eventTrigger || '');
      setSelectedChannels(automation.selectedChannels || []);
      setListings(mockListings.map(l => ({
        ...l,
        selected: automation.selectedListings?.some((sl: any) => sl.id === l.id) || false
      })));
    } else {
      router.push('/inbox/automations'); // Redirect if automation not found
    }
  }, [router]);

  const handleSave = () => {
    const updatedAutomation = {
      id: automationId,
      title: automationName,
      ccEmail1,
      ccEmail2,
      subject,
      defaultMessage,
      eventTrigger,
      selectedChannels,
      selectedListings: listings.filter(l => l.selected),
      isActive: true,
      creationDate: new Date().toISOString(),
      lastEdit: new Date().toLocaleString(),
      automationId: `AUTO-${Date.now()}`,
    };

    const existingAutomations = JSON.parse(localStorage.getItem('automations') || '[]');
    const updatedAutomationsList = existingAutomations.map((a: any) => 
      a.id === automationId ? updatedAutomation : a
    );
    localStorage.setItem('automations', JSON.stringify(updatedAutomationsList));
    router.push('/inbox/automations');
  };

  const handleBack = () => {
    router.push('/inbox/automations');
  };

  const handleChannelToggle = (channel: string) => {
    setSelectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const handleListingToggle = (listingId: number) => {
    setListings(prev => prev.map(listing => 
      listing.id === listingId 
        ? { ...listing, selected: !listing.selected }
        : listing
    ));
  };

  const handleSelectAll = () => {
    const allSelected = listings.every(l => l.selected);
    setListings(prev => prev.map(l => ({ ...l, selected: !allSelected })));
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = showSelectedOnly ? listing.selected : true;
    return matchesSearch && matchesFilter;
  });

  const selectedCount = listings.filter(l => l.selected).length;

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleBack} sx={{ p: 1 }}>
            <ArrowLeft size={20} />
          </IconButton>
          <Typography variant="h4">Edit Automation</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={handleBack}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSave}
            disabled={!automationName || !subject || !defaultMessage}
            startIcon={<Save size={20} />}
          >
            Save
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        {/* Left Side - Automation Form */}
        <Box sx={{ flex: 2, minWidth: 0 }}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Automation Details</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Automation Name"
                value={automationName}
                onChange={(e) => setAutomationName(e.target.value)}
                fullWidth
                required
              />
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="CC Email 1"
                  value={ccEmail1}
                  onChange={(e) => setCcEmail1(e.target.value)}
                  fullWidth
                  type="email"
                />
                <TextField
                  label="CC Email 2"
                  value={ccEmail2}
                  onChange={(e) => setCcEmail2(e.target.value)}
                  fullWidth
                  type="email"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  fullWidth
                  required
                />
                <Tooltip title="Add placeholder">
                  <IconButton>
                    <Info size={20} />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <TextField
                  label="Default Message"
                  value={defaultMessage}
                  onChange={(e) => setDefaultMessage(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  required
                />
                <Tooltip title="Add placeholder">
                  <IconButton>
                    <Info size={20} />
                  </IconButton>
                </Tooltip>
              </Box>

              <FormControl fullWidth>
                <InputLabel>Event Trigger</InputLabel>
                <Select
                  value={eventTrigger}
                  onChange={(e) => setEventTrigger(e.target.value)}
                  label="Event Trigger"
                >
                  {eventOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Card>

          {/* Additional Conditions */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Additional Conditions</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>Channels</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {channelOptions.map((channel) => (
                    <Box
                      key={channel.value}
                      onClick={() => handleChannelToggle(channel.value)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: selectedChannels.includes(channel.value) ? channel.color : 'grey.300',
                        bgcolor: selectedChannels.includes(channel.value) ? `${channel.color}20` : 'white',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: selectedChannels.includes(channel.value) ? `${channel.color}30` : 'grey.50',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: channel.color,
                        }}
                      />
                      <Typography variant="body2">{channel.label}</Typography>
                      {selectedChannels.includes(channel.value) && (
                        <Box sx={{ ml: 1, color: channel.color }}>
                          ×
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Right Side - Listings */}
        <Box sx={{ flex: 1, minWidth: 350, maxWidth: 400 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Listings</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: <Info size={16} style={{ marginRight: 8, color: '#666' }} />,
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showSelectedOnly}
                      onChange={(e) => setShowSelectedOnly(e.target.checked)}
                    />
                  }
                  label="Show selected only"
                />
                <Button size="small" onClick={handleSelectAll}>
                  Select All
                </Button>
              </Box>

              <Typography variant="body2" color="text.secondary">
                {selectedCount} of {listings.length} selected
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: 400, overflowY: 'auto' }}>
                {filteredListings.map((listing) => (
                  <Box
                    key={listing.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      border: '1px solid',
                      borderColor: listing.selected ? 'primary.main' : 'grey.200',
                      borderRadius: 1,
                      bgcolor: listing.selected ? 'primary.50' : 'white',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: listing.selected ? 'primary.100' : 'grey.50',
                      },
                    }}
                    onClick={() => handleListingToggle(listing.id)}
                  >
                    <Checkbox
                      checked={listing.selected}
                      onChange={() => handleListingToggle(listing.id)}
                    />
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        backgroundImage: `url('${listing.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {listing.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </DashboardContent>
  );
}
