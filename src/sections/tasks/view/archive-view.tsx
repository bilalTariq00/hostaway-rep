import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for archived tasks
const mockArchivedTasks = [
  {
    id: 1,
    title: 'Old Property Inspection',
    description: 'Conduct inspection of old property',
    status: 'Archived',
    priority: 'Low',
    assignee: 'John Doe',
    supervisor: 'Jane Smith',
    dueDate: '2023-12-15',
    channel: 'Airbnb',
    listing: 'Old Villa',
    archivedDate: '2024-01-01',
  },
  {
    id: 2,
    title: 'Legacy Guest Check-in',
    description: 'Prepare welcome package for old system',
    status: 'Archived',
    priority: 'Medium',
    assignee: 'Mike Johnson',
    supervisor: 'Sarah Wilson',
    dueDate: '2023-11-20',
    channel: 'Booking.com',
    listing: 'Old Apartment',
    archivedDate: '2023-12-01',
  },
  {
    id: 3,
    title: 'Deprecated Maintenance',
    description: 'Fix old air conditioning system',
    status: 'Archived',
    priority: 'High',
    assignee: 'Tom Brown',
    supervisor: 'Jane Smith',
    dueDate: '2023-10-30',
    channel: 'Direct',
    listing: 'Old Property',
    archivedDate: '2023-11-15',
  },
];

export function ArchiveView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [archivedTasks, setArchivedTasks] = useState<any[]>([]);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    task: true,
    description: true,
    status: true,
    priority: true,
    assignee: true,
    supervisor: true,
    group: true,
    startDate: true,
    endDate: true,
    category: true,
    listing: true,
    channel: true,
    reservation: true,
    cost: true,
    archivedDate: true,
  });

  // Load tasks from localStorage (both archived and regular tasks)
  const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    const savedArchivedTasks = localStorage.getItem('archivedTasks');
    
    let allTasks: any[] = [];
    
    if (savedTasks) {
      allTasks = [...allTasks, ...JSON.parse(savedTasks)];
    }
    
    if (savedArchivedTasks) {
      allTasks = [...allTasks, ...JSON.parse(savedArchivedTasks)];
    }
    
    // If no saved tasks, use mock data
    if (allTasks.length === 0) {
      allTasks = mockArchivedTasks;
    }
    
    return allTasks;
  };

  useEffect(() => {
    setArchivedTasks(loadTasks());
  }, []);

  // Refresh data when component becomes visible (e.g., returning from form)
  useEffect(() => {
    const handleFocus = () => {
      setArchivedTasks(loadTasks());
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/tasks/manage-tasks');
    if (newValue === 1) router.push('/tasks/manage-auto-tasks');
    if (newValue === 2) router.push('/tasks/checklist-templates');
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, task: any) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedTask(task);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedTask(null);
  };

  const handleAddTask = () => {
    router.push('/tasks/new');
  };

  const handleViewTask = () => {
    if (selectedTask) {
      router.push(`/tasks/${selectedTask.id}/view`);
    }
    handleActionMenuClose();
  };

  const handleEditTask = () => {
    if (selectedTask) {
      router.push(`/tasks/${selectedTask.id}/edit`);
    }
    handleActionMenuClose();
  };

  const handleDuplicateTask = () => {
    setDuplicateDialogOpen(true);
    handleActionMenuClose();
  };

  const handleDuplicateConfirm = () => {
    if (selectedTask) {
      router.push(`/tasks/${selectedTask.id}/duplicate`);
    }
    setDuplicateDialogOpen(false);
    setSelectedTask(null);
  };

  const handleDuplicateCancel = () => {
    setDuplicateDialogOpen(false);
    setSelectedTask(null);
  };

  const handleRestoreTask = () => {
    if (selectedTask) {
      const tasksData = loadTasks();
      const updatedTasks = tasksData.filter((task: any) => task.id !== selectedTask.id);
      localStorage.setItem('archivedTasks', JSON.stringify(updatedTasks));
      setArchivedTasks(updatedTasks);
    }
    handleActionMenuClose();
  };

  const handleDeleteTask = () => {
    console.log('Delete task clicked for:', selectedTask?.id, selectedTask?.title);
    setDeleteDialogOpen(true);
    handleActionMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (selectedTask) {
      console.log('Deleting task:', selectedTask.id, selectedTask.title);
      
      // Remove from both storage locations
      const savedTasks = localStorage.getItem('tasks');
      const savedArchivedTasks = localStorage.getItem('archivedTasks');
      
      let updatedTasks = [];
      let updatedArchived = [];
      
      if (savedTasks) {
        try {
          const tasksData = JSON.parse(savedTasks);
          updatedTasks = tasksData.filter((task: any) => {
            // Handle both string and number IDs
            const taskId = typeof task.id === 'string' ? parseInt(task.id) : task.id;
            const selectedId = typeof selectedTask.id === 'string' ? parseInt(selectedTask.id) : selectedTask.id;
            return taskId !== selectedId;
          });
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          console.log('Updated tasks:', updatedTasks.length);
        } catch (error) {
          console.error('Error parsing tasks data:', error);
        }
      }
      
      if (savedArchivedTasks) {
        try {
          const archivedData = JSON.parse(savedArchivedTasks);
          updatedArchived = archivedData.filter((task: any) => {
            // Handle both string and number IDs
            const taskId = typeof task.id === 'string' ? parseInt(task.id) : task.id;
            const selectedId = typeof selectedTask.id === 'string' ? parseInt(selectedTask.id) : selectedTask.id;
            return taskId !== selectedId;
          });
          localStorage.setItem('archivedTasks', JSON.stringify(updatedArchived));
          console.log('Updated archived:', updatedArchived.length);
        } catch (error) {
          console.error('Error parsing archived data:', error);
        }
      }
      
      // Combine remaining tasks and update state directly
      const remainingTasks = [...updatedTasks, ...updatedArchived];
      console.log('Remaining tasks after delete:', remainingTasks.length);
      setArchivedTasks(remainingTasks);
    }
    setDeleteDialogOpen(false);
    setSelectedTask(null);
  };

  const handleSettingsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchor(null);
  };

  const handleColumnToggle = (column: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column as keyof typeof prev]
    }));
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedTask(null);
  };

  const totalPages = Math.ceil(archivedTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = archivedTasks.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Tasks
          </Typography>
          <Button variant="contained" onClick={handleAddTask}>
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

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Listing</InputLabel>
              <Select
                value={selectedListing}
                label="Listing"
                onChange={(e) => setSelectedListing(e.target.value)}
              >
                <MenuItem value="">All Listings</MenuItem>
                <MenuItem value="old-villa">Old Villa</MenuItem>
                <MenuItem value="old-apartment">Old Apartment</MenuItem>
                <MenuItem value="old-property">Old Property</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Channel</InputLabel>
              <Select
                value={selectedChannel}
                label="Channel"
                onChange={(e) => setSelectedChannel(e.target.value)}
              >
                <MenuItem value="">All Channels</MenuItem>
                <MenuItem value="airbnb">Airbnb</MenuItem>
                <MenuItem value="booking">Booking.com</MenuItem>
                <MenuItem value="direct">Direct</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Assignee</InputLabel>
              <Select
                value={selectedAssignee}
                label="Assignee"
                onChange={(e) => setSelectedAssignee(e.target.value)}
              >
                <MenuItem value="">All Assignees</MenuItem>
                <MenuItem value="john">John Doe</MenuItem>
                <MenuItem value="mike">Mike Johnson</MenuItem>
                <MenuItem value="tom">Tom Brown</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              variant="outlined"
              startIcon={<Iconify icon={"eva:more-horizontal-fill" as any} />}
              fullWidth
            >
              More Filter
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Data Mapping - Archived Tasks Table */}
      <Paper sx={{ mb: 3 }}>
        {/* Table Header with Settings */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Tasks Table</Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={"eva:settings-fill" as any} />}
            onClick={handleSettingsOpen}
          >
            Column Settings
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {visibleColumns.task && <TableCell>Task</TableCell>}
                {visibleColumns.description && <TableCell>Description</TableCell>}
                {visibleColumns.status && <TableCell>Status</TableCell>}
                {visibleColumns.priority && <TableCell>Priority</TableCell>}
                {visibleColumns.assignee && <TableCell>Assignee</TableCell>}
                {visibleColumns.supervisor && <TableCell>Supervisor</TableCell>}
                {visibleColumns.group && <TableCell>Group</TableCell>}
                {visibleColumns.startDate && <TableCell>Start Date</TableCell>}
                {visibleColumns.endDate && <TableCell>End Date</TableCell>}
                {visibleColumns.category && <TableCell>Category</TableCell>}
                {visibleColumns.listing && <TableCell>Listing</TableCell>}
                {visibleColumns.channel && <TableCell>Channel</TableCell>}
                {visibleColumns.reservation && <TableCell>Reservation</TableCell>}
                {visibleColumns.cost && <TableCell>Cost</TableCell>}
                {visibleColumns.archivedDate && <TableCell>Archived Date</TableCell>}
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTasks.map((task) => (
                <TableRow key={task.id}>
                  {visibleColumns.task && (
                  <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {task.title || 'Untitled Task'}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.description && (
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {task.description || '-'}
                      </Typography>
                  </TableCell>
                  )}
                  {visibleColumns.status && (
                  <TableCell>
                    <Chip
                        label={task.status || 'Pending'}
                      size="small"
                      color="default"
                    />
                  </TableCell>
                  )}
                  {visibleColumns.priority && (
                  <TableCell>
                    <Chip
                        label={task.priority || 'Medium'}
                      size="small"
                      color={
                        task.priority === 'High'
                          ? 'error'
                          : task.priority === 'Medium'
                            ? 'warning'
                            : 'success'
                      }
                    />
                  </TableCell>
                  )}
                  {visibleColumns.assignee && (
                    <TableCell>
                      <Typography variant="body2">
                        {task.assignee || '-'}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.supervisor && (
                    <TableCell>
                      <Typography variant="body2">
                        {task.supervisor || '-'}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.group && (
                    <TableCell>
                      <Typography variant="body2">
                        {task.group || '-'}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.startDate && (
                    <TableCell>
                      <Typography variant="body2">
                        {task.startDate || '-'}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.endDate && (
                  <TableCell>
                    <Typography variant="body2">
                        {task.endDate || '-'}
                    </Typography>
                  </TableCell>
                  )}
                  {visibleColumns.category && (
                  <TableCell>
                    <Typography variant="body2">
                        {task.category || '-'}
                    </Typography>
                  </TableCell>
                  )}
                  {visibleColumns.listing && (
                  <TableCell>
                    <Typography variant="body2">
                        {task.listing || '-'}
                    </Typography>
                  </TableCell>
                  )}
                  {visibleColumns.channel && (
                  <TableCell>
                      <Typography variant="body2">
                        {task.channel || '-'}
                    </Typography>
                  </TableCell>
                  )}
                  {visibleColumns.reservation && (
                  <TableCell>
                    <Typography variant="body2">
                        {task.reservation || '-'}
                    </Typography>
                  </TableCell>
                  )}
                  {visibleColumns.cost && (
                  <TableCell>
                    <Typography variant="body2">
                        {task.cost ? `$${task.cost}` : '-'}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.archivedDate && (
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {task.archivedDate || '-'}
                    </Typography>
                  </TableCell>
                  )}
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small" onClick={() => router.push(`/tasks/${task.id}/view`)}>
                        <Iconify icon={"eva:eye-fill" as any} width={16} />
                      </IconButton>
                      <IconButton size="small" onClick={() => { setSelectedTask(task); setDuplicateDialogOpen(true); }}>
                        <Iconify icon={"eva:copy-fill" as any} width={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleActionMenuOpen(e, task)}
                      >
                        <Iconify icon={"eva:more-vertical-fill" as any} width={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Show 50 per page
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={handleViewTask}>
          <Iconify icon={"eva:eye-fill" as any} sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleEditTask}>
          <Iconify icon={"eva:edit-fill" as any} sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDuplicateTask}>
          <Iconify icon={"eva:copy-fill" as any} sx={{ mr: 1 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleRestoreTask}>
          <Iconify icon={"eva:refresh-fill" as any} sx={{ mr: 1 }} />
          Restore
        </MenuItem>
        <MenuItem onClick={handleDeleteTask} sx={{ color: 'error.main' }}>
          <Iconify icon={"eva:trash-2-fill" as any} sx={{ mr: 1 }} />
          Delete Permanently
        </MenuItem>
      </Menu>

      {/* Duplicate Confirmation Dialog */}
      <Dialog open={duplicateDialogOpen} onClose={handleDuplicateCancel}>
        <DialogTitle>Duplicate?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to duplicate this task? This will create a copy with &quot;(Copy)&quot; added to the title.
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
            Are you sure you want to permanently delete this task? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>No</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Column Settings Popover */}
      <Popover
        open={Boolean(settingsAnchor)}
        anchorEl={settingsAnchor}
        onClose={handleSettingsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, minWidth: 250 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Show/Hide Columns
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select which columns to display in the table
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: 300, overflowY: 'auto' }}>
            {Object.entries(visibleColumns).map(([key, value]) => {
              const columnLabels: { [key: string]: string } = {
                task: 'Task Title',
                description: 'Description',
                status: 'Status',
                priority: 'Priority',
                assignee: 'Assignee',
                supervisor: 'Supervisor',
                group: 'Group',
                startDate: 'Start Date',
                endDate: 'End Date',
                category: 'Category',
                listing: 'Listing',
                channel: 'Channel',
                reservation: 'Reservation',
                cost: 'Cost',
                archivedDate: 'Archived Date',
              };
              
              return (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={value}
                      onChange={() => handleColumnToggle(key)}
                      size="small"
                    />
                  }
                  label={columnLabels[key] || key}
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                />
              );
            })}
          </Box>
          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Button
              size="small"
              onClick={() => {
                setVisibleColumns({
                  task: true,
                  description: true,
                  status: true,
                  priority: true,
                  assignee: true,
                  supervisor: true,
                  group: true,
                  startDate: true,
                  endDate: true,
                  category: true,
                  listing: true,
                  channel: true,
                  reservation: true,
                  cost: true,
                  archivedDate: true,
                });
              }}
            >
              Show All
            </Button>
            <Button
              size="small"
              onClick={() => {
                setVisibleColumns({
                  task: true,
                  description: false,
                  status: true,
                  priority: true,
                  assignee: true,
                  supervisor: false,
                  group: false,
                  startDate: false,
                  endDate: false,
                  category: false,
                  listing: true,
                  channel: true,
                  reservation: false,
                  cost: false,
                  archivedDate: false,
                });
              }}
              sx={{ ml: 1 }}
            >
              Show Essential
            </Button>
          </Box>
        </Box>
      </Popover>
    </DashboardContent>
  );
}

