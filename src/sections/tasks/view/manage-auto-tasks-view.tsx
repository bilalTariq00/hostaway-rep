import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for auto-tasks
const mockAutoTasks = [
  {
    id: 1,
    name: 'Daily Property Check',
    startingEvent: 'Check-in',
    dueBefore: '2 hours',
    linkedChannel: 'Airbnb',
    linkedListing: 'Villa Del Sol',
    status: 'Active',
    description: 'Perform daily inspection of property condition',
  },
  {
    id: 2,
    name: 'Guest Welcome Package',
    startingEvent: 'Booking Confirmed',
    dueBefore: '24 hours',
    linkedChannel: 'Booking.com',
    linkedListing: 'Navigli Apartment',
    status: 'Active',
    description: 'Prepare and deliver welcome package to guests',
  },
  {
    id: 3,
    name: 'Post-Checkout Cleanup',
    startingEvent: 'Check-out',
    dueBefore: '4 hours',
    linkedChannel: 'Direct',
    linkedListing: 'Polacchi42',
    status: 'Inactive',
    description: 'Clean and prepare property for next guests',
  },
  {
    id: 4,
    name: 'Maintenance Alert',
    startingEvent: 'Issue Reported',
    dueBefore: '1 hour',
    linkedChannel: 'Airbnb',
    linkedListing: 'Superattico - Via Del C...',
    status: 'Active',
    description: 'Address maintenance issues immediately',
  },
];

export function ManageAutoTasksView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/tasks/manage-tasks');
    if (newValue === 2) router.push('/tasks/checklist-templates');
    if (newValue === 3) router.push('/tasks/archive');
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const handleAddAutoTask = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleStatusToggle = (autoTaskId: number) => {
    // In a real app, this would update the auto-task status
    console.log('Toggle auto-task status:', autoTaskId);
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Tasks
          </Typography>
          <Button variant="contained" onClick={handleAddAutoTask}>
            Add Tasks
          </Button>
        </Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
            },
            '& .Mui-selected': {
              color: 'primary.main',
              fontWeight: 600,
            },
            '& .MuiTabs-indicator': {
              bgcolor: 'primary.main',
            },
          }}
        >
          <Tab label="Manage Tasks" />
          <Tab label="Manage Auto-tasks" />
          <Tab label="Checklist Templates" />
          <Tab label="Archive" />
        </Tabs>
      </Box>

      {/* Auto-tasks Cards */}
      <Grid container spacing={3}>
        {mockAutoTasks.map((autoTask) => (
          <Grid key={autoTask.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card 
              sx={{ 
                height: '100%',
                bgcolor: autoTask.status === 'Active' ? 'grey.50' : 'background.paper',
                border: 1,
                borderColor: 'grey.200',
                '&:hover': {
                  boxShadow: 2,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                    {autoTask.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Switch
                      checked={autoTask.status === 'Active'}
                      onChange={() => handleStatusToggle(autoTask.id)}
                      size="small"
                    />
                    <IconButton 
                      size="small" 
                      onClick={handleActionMenuOpen}
                    >
                      <Iconify icon={"eva:more-vertical-fill" as any} width={16} />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {autoTask.description}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Starting Event:
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {autoTask.startingEvent}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Due Before:
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {autoTask.dueBefore}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Linked Channel:
                    </Typography>
                    <Chip
                      label={autoTask.linkedChannel}
                      size="small"
                      color="primary"
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Linked Listing:
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {autoTask.linkedListing}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                  <IconButton size="small">
                    <Iconify icon={"eva:edit-fill" as any} width={16} />
                  </IconButton>
                  <IconButton size="small">
                    <Iconify icon={"eva:copy-fill" as any} width={16} />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'error.main' }}>
                    <Iconify icon={"eva:trash-2-fill" as any} width={16} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Auto-task Sidebar */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={handleSidebarClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 500,
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add Auto-task
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <Iconify icon={"eva:close-fill" as any} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Auto-task Name"
            placeholder="Enter auto-task name..."
          />

          <TextField
            fullWidth
            label="Description"
            placeholder="Enter auto-task description..."
            multiline
            rows={3}
          />

          <FormControl fullWidth>
            <InputLabel>Starting Event</InputLabel>
            <Select label="Starting Event">
              <MenuItem value="checkin">Check-in</MenuItem>
              <MenuItem value="checkout">Check-out</MenuItem>
              <MenuItem value="booking">Booking Confirmed</MenuItem>
              <MenuItem value="issue">Issue Reported</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Due Before"
            placeholder="e.g., 2 hours, 24 hours, 1 day"
          />

          <FormControl fullWidth>
            <InputLabel>Linked Channel</InputLabel>
            <Select label="Linked Channel">
              <MenuItem value="airbnb">Airbnb</MenuItem>
              <MenuItem value="booking">Booking.com</MenuItem>
              <MenuItem value="direct">Direct</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Linked Listing</InputLabel>
            <Select label="Linked Listing">
              <MenuItem value="villa">Villa Del Sol</MenuItem>
              <MenuItem value="navigli">Navigli Apartment</MenuItem>
              <MenuItem value="polacchi">Polacchi42</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleSidebarClose}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSidebarClose}
            >
              Add Auto-task
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:edit-fill" as any} sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:copy-fill" as any} sx={{ mr: 1 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:play-circle-fill" as any} sx={{ mr: 1 }} />
          Run Now
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose} sx={{ color: 'error.main' }}>
          <Iconify icon={"eva:trash-2-fill" as any} sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}

