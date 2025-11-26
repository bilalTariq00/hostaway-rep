import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useRouter } from 'src/routes/hooks';

import { API_URL } from 'src/config/environment';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

export function ChecklistTemplatesView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(2);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [checklistTemplates, setChecklistTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch checklist templates from backend
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/api/checklist-templates?limit=1000`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setChecklistTemplates(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching checklist templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/tasks/manage-tasks');
    if (newValue === 1) router.push('/tasks/manage-auto-tasks');
    if (newValue === 3) router.push('/tasks/archive');
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, template: any) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedTemplate(template);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedTemplate(null);
  };

  const handleAddTemplate = () => {
    router.push('/tasks/checklist-templates/new');
  };

  const handleEditTemplate = () => {
    if (selectedTemplate) {
      router.push(`/tasks/checklist-templates/${selectedTemplate._id || selectedTemplate.id}/edit`);
    }
    handleActionMenuClose();
  };

  const handleDuplicateTemplate = () => {
    setDuplicateDialogOpen(true);
    handleActionMenuClose();
  };

  const handleDuplicateConfirm = () => {
    if (selectedTemplate) {
      router.push(`/tasks/checklist-templates/${selectedTemplate._id || selectedTemplate.id}/duplicate`);
    }
    setDuplicateDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleDuplicateCancel = () => {
    setDuplicateDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleDeleteTemplate = () => {
    setDeleteDialogOpen(true);
    handleActionMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (selectedTemplate) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('Not authenticated');
          return;
        }

        const response = await fetch(`${API_URL}/api/checklist-templates/${selectedTemplate._id || selectedTemplate.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Refresh templates list
          setChecklistTemplates((prev) => prev.filter((template: any) => (template._id || template.id) !== (selectedTemplate._id || selectedTemplate.id)));
        } else {
          const data = await response.json();
          alert(data.message || 'Failed to delete template');
        }
      } catch (error) {
        console.error('Error deleting template:', error);
        alert('Failed to delete template');
      }
    }
    setDeleteDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Tasks
          </Typography>
          <Button variant="contained" onClick={handleAddTemplate}>
            Add checklist template
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

      {/* Checklist Templates Grid */}
      {loading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Loading checklist templates...
          </Typography>
        </Box>
      ) : checklistTemplates.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
              No checklist templates found
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
              Get started by creating your first checklist template
            </Typography>
            <Button variant="contained" onClick={handleAddTemplate}>
              Add Checklist Template
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {checklistTemplates.map((template) => (
            <Grid key={template._id || template.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 2,
                },
              }}
            >
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                    {template.name}
                  </Typography>
                  <IconButton size="small" onClick={(e) => handleActionMenuOpen(e, template)}>
                    <Iconify icon={'eva:more-vertical-fill' as any} width={16} />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {Array.isArray(template.tasks) ? template.tasks.length : 0} tasks to complete
                </Typography>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Tasks we have to do:
                  </Typography>
                  <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
                    {Array.isArray(template.tasks)
                      ? template.tasks.slice(0, 4).map((task: any, index: number) => {
                          const taskText = typeof task === 'string' ? task : task.item || '';
                          return (
                            <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <Checkbox size="small" disabled sx={{ p: 0.5 }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                    {taskText}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          );
                        })
                      : null}
                    {Array.isArray(template.tasks) && template.tasks.length > 4 && (
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <ListItemText
                          primary={
                            <Typography variant="caption" color="text.secondary">
                              +{template.tasks.length - 4} more tasks
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                  </List>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                  <IconButton
                    size="small"
                    onClick={() => router.push(`/tasks/checklist-templates/${template._id || template.id}/edit`)}
                  >
                    <Iconify icon={'eva:edit-fill' as any} width={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setDuplicateDialogOpen(true);
                    }}
                  >
                    <Iconify icon={'eva:copy-fill' as any} width={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: 'error.main' }}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setDeleteDialogOpen(true);
                    }}
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
        <MenuItem onClick={handleEditTemplate}>
          <Iconify icon={'eva:edit-fill' as any} sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDuplicateTemplate}>
          <Iconify icon={'eva:copy-fill' as any} sx={{ mr: 1 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleDeleteTemplate} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-fill' as any} sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Duplicate Confirmation Dialog */}
      <Dialog open={duplicateDialogOpen} onClose={handleDuplicateCancel}>
        <DialogTitle>Duplicate?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to duplicate this checklist template? This will create a copy with
            &quot;(Copy)&quot; added to the name.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDuplicateCancel}>No</Button>
          <Button onClick={handleDuplicateConfirm} variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this checklist template? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>No</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
