import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

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
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedAutoTask, setSelectedAutoTask] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [autoTaskToDelete, setAutoTaskToDelete] = useState<any>(null);

  // Load auto-tasks from localStorage or use mock data
  const loadAutoTasks = () => {
    const savedAutoTasks = localStorage.getItem('autoTasks');
    if (savedAutoTasks) {
      return JSON.parse(savedAutoTasks);
    }
    return mockAutoTasks;
  };

  const [autoTasks, setAutoTasks] = useState(loadAutoTasks());

  // Refresh auto-tasks when component mounts (when returning from form)
  useEffect(() => {
    setAutoTasks(loadAutoTasks());
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/tasks/manage-tasks');
    if (newValue === 2) router.push('/tasks/checklist-templates');
    if (newValue === 3) router.push('/tasks/archive');
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, autoTask: any) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedAutoTask(autoTask);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedAutoTask(null);
  };

  const handleAddAutoTask = () => {
    router.push('/tasks/auto-tasks/new');
  };

  const handleEditAutoTask = (autoTask: any) => {
    router.push(`/tasks/auto-tasks/${autoTask.id}/edit`);
  };

  const handleDuplicateAutoTask = (autoTask: any) => {
    router.push(`/tasks/auto-tasks/${autoTask.id}/duplicate`);
  };

  const handleDeleteAutoTask = (autoTask: any) => {
    setAutoTaskToDelete(autoTask);
    setDeleteDialogOpen(true);
    handleActionMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (autoTaskToDelete) {
      const updatedAutoTasks = autoTasks.filter((task: any) => task.id !== autoTaskToDelete.id);
      setAutoTasks(updatedAutoTasks);
      localStorage.setItem('autoTasks', JSON.stringify(updatedAutoTasks));
      setDeleteDialogOpen(false);
      setAutoTaskToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAutoTaskToDelete(null);
  };

  const handleStatusToggle = (autoTaskId: number) => {
    const updatedAutoTasks = autoTasks.map((task: any) =>
      task.id === autoTaskId
        ? { ...task, status: task.status === 'Active' ? 'Inactive' : 'Active' }
        : task
    );
    setAutoTasks(updatedAutoTasks);
    localStorage.setItem('autoTasks', JSON.stringify(updatedAutoTasks));
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
        {autoTasks.map((autoTask: any) => (
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                    {autoTask.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Switch
                      checked={autoTask.status === 'Active'}
                      onChange={() => handleStatusToggle(autoTask.id)}
                      size="small"
                    />
                    <IconButton size="small" onClick={(e) => handleActionMenuOpen(e, autoTask)}>
                      <Iconify icon={'eva:more-vertical-fill' as any} width={16} />
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
                    <Chip label={autoTask.linkedChannel} size="small" color="primary" />
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
                  <IconButton size="small" onClick={() => handleEditAutoTask(autoTask)}>
                    <Iconify icon={'eva:edit-fill' as any} width={16} />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDuplicateAutoTask(autoTask)}>
                    <Iconify icon={'eva:copy-fill' as any} width={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: 'error.main' }}
                    onClick={() => handleDeleteAutoTask(autoTask)}
                  >
                    <Iconify icon={'eva:trash-2-fill' as any} width={16} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={() => handleEditAutoTask(selectedAutoTask)}>
          <Iconify icon={'eva:edit-fill' as any} sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDuplicateAutoTask(selectedAutoTask)}>
          <Iconify icon={'eva:copy-fill' as any} sx={{ mr: 1 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={'eva:play-circle-fill' as any} sx={{ mr: 1 }} />
          Run Now
        </MenuItem>
        <MenuItem
          onClick={() => handleDeleteAutoTask(selectedAutoTask)}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon={'eva:trash-2-fill' as any} sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Auto-task</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete &quot;{autoTaskToDelete?.name}&quot;? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
