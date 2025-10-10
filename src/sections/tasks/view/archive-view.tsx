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
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

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

  // Load archived tasks from localStorage
  const loadArchivedTasks = () => {
    const savedTasks = localStorage.getItem('archivedTasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return mockArchivedTasks;
  };

  useEffect(() => {
    setArchivedTasks(loadArchivedTasks());
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
      const tasksData = loadArchivedTasks();
      const updatedTasks = tasksData.filter((task: any) => task.id !== selectedTask.id);
      localStorage.setItem('archivedTasks', JSON.stringify(updatedTasks));
      setArchivedTasks(updatedTasks);
    }
    handleActionMenuClose();
  };

  const handleDeleteTask = () => {
    setDeleteDialogOpen(true);
    handleActionMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (selectedTask) {
      const tasksData = loadArchivedTasks();
      const updatedTasks = tasksData.filter((task: any) => task.id !== selectedTask.id);
      localStorage.setItem('archivedTasks', JSON.stringify(updatedTasks));
      setArchivedTasks(updatedTasks);
    }
    setDeleteDialogOpen(false);
    setSelectedTask(null);
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
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Supervisor</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Archived Date</TableCell>
                <TableCell>Channel</TableCell>
                <TableCell>Listing</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {task.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {task.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.status}
                      size="small"
                      color="default"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.priority}
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
                  <TableCell>
                    <Typography variant="body2">
                      {task.assignee}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {task.supervisor}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {task.dueDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {task.archivedDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {task.channel}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {task.listing}
                    </Typography>
                  </TableCell>
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
            Are you sure you want to duplicate this task? This will create a copy with "(Copy)" added to the title.
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
    </DashboardContent>
  );
}

