import React, { useState } from 'react';
import { Plus, Edit, Copy, Search, Trash2, MoreVertical } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for automations
const mockAutomations = [
  {
    id: 1,
    title: 'Welcome Message Automation',
    subject: 'Welcome to your stay!',
    event: 'Booking Confirmed',
    channels: ['Airbnb', 'Booking.com'],
    listing: 'Beach House Villa',
    creationDate: '2024-01-15',
    lastEdit: '2024-01-20',
    automationId: 'AUTO-001',
    isActive: true,
  },
  {
    id: 2,
    title: 'Check-in Instructions',
    subject: 'Your check-in details',
    event: '24 Hours Before Check-in',
    channels: ['Airbnb', 'VRBO'],
    listing: 'Downtown Apartment',
    creationDate: '2024-01-10',
    lastEdit: '2024-01-18',
    automationId: 'AUTO-002',
    isActive: true,
  },
  {
    id: 3,
    title: 'Check-out Reminder',
    subject: 'Check-out tomorrow',
    event: '1 Day Before Check-out',
    channels: ['Airbnb'],
    listing: 'Mountain Cabin',
    creationDate: '2024-01-05',
    lastEdit: '2024-01-12',
    automationId: 'AUTO-003',
    isActive: false,
  },
  {
    id: 4,
    title: 'Review Request',
    subject: 'How was your stay?',
    event: 'After Check-out',
    channels: ['Airbnb', 'Booking.com', 'VRBO'],
    listing: 'City Center Loft',
    creationDate: '2024-01-08',
    lastEdit: '2024-01-15',
    automationId: 'AUTO-004',
    isActive: true,
  },
];

export function AutomationsView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('automations');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [numberFilter, setNumberFilter] = useState('10');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'automations') {
      router.push(`/inbox/${newValue}`);
    }
  };

  const handleCreateNew = () => {
    // Navigate to create automation form
    console.log('Navigate to create automation form');
  };

  const handleToggleActive = (id: number) => {
    // Toggle automation active status
    console.log('Toggle automation:', id);
  };

  const handleEdit = (id: number) => {
    // Navigate to edit automation
    console.log('Edit automation:', id);
  };

  const handleCreateSimilar = (id: number) => {
    // Create similar automation
    console.log('Create similar automation:', id);
  };

  const handleDelete = (id: number) => {
    // Delete automation
    console.log('Delete automation:', id);
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
          <Tab label="Inbox" value="inbox" />
          <Tab label="Message Templates" value="message-templates" />
          <Tab label="Automations" value="automations" />
          <Tab label="Manage Messages" value="manage-messages" />
        </Tabs>
      </Box>

      {/* Filters and Search */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="Search automations..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ minWidth: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Filter by</InputLabel>
              <Select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                label="Filter by"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="listing">Listing</MenuItem>
                <MenuItem value="event">Event</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort by"
              >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="status">Status</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel>Number</InputLabel>
              <Select
                value={numberFilter}
                onChange={(e) => setNumberFilter(e.target.value)}
                label="Number"
              >
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="50">50</MenuItem>
                <MenuItem value="100">100</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={handleCreateNew}
              sx={{ ml: 'auto' }}
            >
              Create New
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Automations List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {mockAutomations.map((automation) => (
          <Card key={automation.id} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <Switch
                  checked={automation.isActive}
                  onChange={() => handleToggleActive(automation.id)}
                  color="primary"
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {automation.title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Subject
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {automation.subject}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Event
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {automation.event}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Channels
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {automation.channels.map((channel, index) => (
                          <Chip
                            key={index}
                            label={channel}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Listing
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {automation.listing}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Creation Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {automation.creationDate}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Last Edit
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {automation.lastEdit}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Automation ID
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
                        {automation.automationId}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                <IconButton size="small" color="primary" onClick={() => handleEdit(automation.id)}>
                  <Edit size={16} />
                </IconButton>
                <IconButton size="small" color="default" onClick={() => handleCreateSimilar(automation.id)}>
                  <Copy size={16} />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDelete(automation.id)}>
                  <Trash2 size={16} />
                </IconButton>
                <IconButton size="small">
                  <MoreVertical size={16} />
                </IconButton>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </DashboardContent>
  );
}
