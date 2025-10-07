import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for checklist templates
const mockChecklistTemplates = [
  {
    id: 1,
    name: 'Property Inspection Checklist',
    tasks: [
      'Check all lights and switches',
      'Test air conditioning',
      'Inspect bathroom fixtures',
      'Check kitchen appliances',
      'Verify internet connection',
      'Test door locks and keys',
    ],
  },
  {
    id: 2,
    name: 'Guest Welcome Checklist',
    tasks: [
      'Prepare welcome package',
      'Set up guest information folder',
      'Check cleanliness standards',
      'Verify amenities are working',
      'Prepare local recommendations',
      'Set up contact information',
    ],
  },
  {
    id: 3,
    name: 'Post-Checkout Cleanup',
    tasks: [
      'Remove all trash',
      'Clean all surfaces',
      'Wash and replace linens',
      'Restock amenities',
      'Check for damages',
      'Prepare for next guests',
    ],
  },
  {
    id: 4,
    name: 'Maintenance Checklist',
    tasks: [
      'Check HVAC system',
      'Inspect plumbing',
      'Test electrical outlets',
      'Check smoke detectors',
      'Inspect exterior areas',
      'Document any issues',
    ],
  },
  {
    id: 5,
    name: 'Emergency Preparedness',
    tasks: [
      'Check emergency contacts',
      'Verify first aid kit',
      'Test emergency lighting',
      'Check fire extinguishers',
      'Review evacuation procedures',
      'Update emergency information',
    ],
  },
  {
    id: 6,
    name: 'Seasonal Maintenance',
    tasks: [
      'Check heating system',
      'Inspect windows and doors',
      'Clean gutters',
      'Check outdoor furniture',
      'Prepare for weather changes',
      'Update seasonal amenities',
    ],
  },
];

export function ChecklistTemplatesView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(2);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/tasks/manage-tasks');
    if (newValue === 1) router.push('/tasks/manage-auto-tasks');
    if (newValue === 3) router.push('/tasks/archive');
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const handleAddTemplate = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
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

      {/* Checklist Templates Grid */}
      <Grid container spacing={3}>
        {mockChecklistTemplates.map((template) => (
          <Grid key={template.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                    {template.name}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={handleActionMenuOpen}
                  >
                    <Iconify icon={"eva:more-vertical-fill" as any} width={16} />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {template.tasks.length} tasks to complete
                </Typography>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Tasks we have to do:
                  </Typography>
                  <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
                    {template.tasks.slice(0, 4).map((task, index) => (
                      <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Checkbox
                            size="small"
                            disabled
                            sx={{ p: 0.5 }}
                          />
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                              {task}
                            </Typography>
                          } 
                        />
                      </ListItem>
                    ))}
                    {template.tasks.length > 4 && (
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

      {/* Add Template Sidebar */}
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
            Add Checklist Template
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <Iconify icon={"eva:close-fill" as any} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Template Name"
            placeholder="Enter template name..."
          />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Tasks
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter task..."
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              placeholder="Enter task..."
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              placeholder="Enter task..."
              size="small"
              sx={{ mb: 1 }}
            />
            <Button variant="outlined" size="small" startIcon={<Iconify icon={"eva:plus-fill" as any} />}>
              Add Task
            </Button>
          </Box>

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
              Add Template
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
          <Iconify icon={"eva:download-fill" as any} sx={{ mr: 1 }} />
          Export
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose} sx={{ color: 'error.main' }}>
          <Iconify icon={"eva:trash-2-fill" as any} sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}

