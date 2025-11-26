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

import { API_URL } from 'src/config/environment';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

export function ManageAutoTasksView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedAutoTask, setSelectedAutoTask] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [autoTaskToDelete, setAutoTaskToDelete] = useState<any>(null);

  const [autoTasks, setAutoTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch auto-tasks from backend
  useEffect(() => {
    const fetchAutoTasks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/api/auto-tasks?limit=1000`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setAutoTasks(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching auto-tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAutoTasks();
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
    router.push(`/tasks/auto-tasks/${autoTask._id || autoTask.id}/edit`);
  };

  const handleDuplicateAutoTask = (autoTask: any) => {
    router.push(`/tasks/auto-tasks/${autoTask._id || autoTask.id}/duplicate`);
  };

  const handleDeleteAutoTask = (autoTask: any) => {
    setAutoTaskToDelete(autoTask);
    setDeleteDialogOpen(true);
    handleActionMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (autoTaskToDelete) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('Not authenticated');
          return;
        }

        const response = await fetch(`${API_URL}/api/auto-tasks/${autoTaskToDelete._id || autoTaskToDelete.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Refresh auto-tasks list
          setAutoTasks((prev) => prev.filter((task: any) => (task._id || task.id) !== (autoTaskToDelete._id || autoTaskToDelete.id)));
        } else {
          const data = await response.json();
          alert(data.message || 'Failed to delete auto-task');
        }
      } catch (error) {
        console.error('Error deleting auto-task:', error);
        alert('Failed to delete auto-task');
      }
    }
    setDeleteDialogOpen(false);
    setAutoTaskToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAutoTaskToDelete(null);
  };

  const handleStatusToggle = async (autoTask: any) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Not authenticated');
        return;
      }

      const newStatus = autoTask.status === 'Active' ? 'Inactive' : 'Active';
      const response = await fetch(`${API_URL}/api/auto-tasks/${autoTask._id || autoTask.id}/toggle-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Update local state
          setAutoTasks((prev) =>
            prev.map((task: any) =>
              (task._id || task.id) === (autoTask._id || autoTask.id)
                ? { ...task, status: newStatus }
                : task
            )
          );
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to toggle status');
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to toggle status');
    }
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
      {loading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Loading auto-tasks...
          </Typography>
        </Box>
      ) : autoTasks.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
              No auto-tasks found
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
              Get started by creating your first auto-task
            </Typography>
            <Button variant="contained" onClick={handleAddAutoTask}>
              Add Auto-task
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {autoTasks.map((autoTask: any) => (
            <Grid key={autoTask._id || autoTask.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                      onChange={() => handleStatusToggle(autoTask)}
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
                      {autoTask.startingEvent || '-'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Due Before:
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {autoTask.shouldEndByValue && autoTask.shouldEndByUnit
                        ? `${autoTask.shouldEndByValue} ${autoTask.shouldEndByUnit}`
                        : autoTask.dueBefore || '-'}
                    </Typography>
                  </Box>

                  {autoTask.linkedChannel && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">
                        Linked Channel:
                      </Typography>
                      <Chip label={autoTask.linkedChannel} size="small" color="primary" />
                    </Box>
                  )}

                  {autoTask.linkedListing && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">
                        Linked Listing:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {typeof autoTask.linkedListing === 'string'
                          ? autoTask.linkedListing
                          : autoTask.linkedListing?.name || 'Multiple Listings'}
                      </Typography>
                    </Box>
                  )}
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
      )}

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
