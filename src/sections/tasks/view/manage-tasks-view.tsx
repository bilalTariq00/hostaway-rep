import { useState } from 'react';
import {
  Pencil,
  Trash2,
  MoreVertical,
  MoreHorizontal,
} from 'lucide-react';

import {
  Box,
  Tab,
  Card,
  Chip,
  Menu,
  Tabs,
  Paper,
  Table,
  Button,
  Dialog,
  Select,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  CardContent,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  TableContainer,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for tasks
const mockTasks = [
  {
    id: 1,
    title: 'Property Inspection',
    description: 'Conduct thorough inspection of Villa Del Sol',
    status: 'In Progress',
    priority: 'High',
    assignee: 'John Doe',
    supervisor: 'Jane Smith',
    dueDate: '2024-02-15',
    channel: 'Airbnb',
    listing: 'Villa Del Sol',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'Guest Check-in',
    description: 'Prepare welcome package for incoming guests',
    status: 'Pending',
    priority: 'Medium',
    assignee: 'Mike Johnson',
    supervisor: 'Sarah Wilson',
    dueDate: '2024-02-10',
    channel: 'Booking.com',
    listing: 'Navigli Apartment',
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    title: 'Maintenance Request',
    description: 'Fix air conditioning unit in bedroom',
    status: 'Completed',
    priority: 'High',
    assignee: 'Tom Brown',
    supervisor: 'Jane Smith',
    dueDate: '2024-01-30',
    channel: 'Direct',
    listing: 'Polacchi42',
    createdAt: '2024-01-10',
  },
];

export function ManageTasksView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<any>(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    listing: '',
    channel: '',
    assignee: '',
    supervisor: '',
    status: [] as string[],
    priority: [] as string[],
    fromDate: '',
    toDate: '',
  });
  
  // Task management
  const [tasks, setTasks] = useState(mockTasks);
  const [sortOrder, setSortOrder] = useState('dueDate');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) router.push('/tasks/manage-auto-tasks');
    if (newValue === 2) router.push('/tasks/checklist-templates');
    if (newValue === 3) router.push('/tasks/archive');
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

  const handleEditTask = (task: any) => {
    router.push(`/tasks/${task.id}/edit`);
  };


  const handleDeleteTask = () => {
    setTaskToDelete(selectedTask);
    setDeleteDialogOpen(true);
    handleActionMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      setTasks(prev => prev.filter(task => task.id !== taskToDelete.id));
    }
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleFilterChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFilterModalOpen = () => {
    setFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };

  const handleApplyFilters = () => {
    // Filters are applied in the filteredTasks calculation
    handleFilterModalClose();
  };

  const handleResetFilters = () => {
    setFilters({
      listing: '',
      channel: '',
      assignee: '',
      supervisor: '',
      status: [],
      priority: [],
      fromDate: '',
      toDate: '',
    });
  };

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => 
    (!filters.listing || task.listing === filters.listing) &&
    (!filters.channel || task.channel === filters.channel) &&
    (!filters.assignee || task.assignee === filters.assignee) &&
    (!filters.supervisor || task.supervisor === filters.supervisor) &&
    (filters.status.length === 0 || filters.status.includes(task.status)) &&
    (filters.priority.length === 0 || filters.priority.includes(task.priority)) &&
    (!filters.fromDate || task.dueDate >= filters.fromDate) &&
    (!filters.toDate || task.dueDate <= filters.toDate)
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortOrder) {
      case 'dueDate': {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      case 'priority': {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
      }
      case 'status': {
        return a.status.localeCompare(b.status);
      }
      case 'createdAt': {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      default: {
        return 0;
      }
    }
  });

  const totalPages = Math.ceil(sortedTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = sortedTasks.slice(startIndex, endIndex);

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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
            <FormControl fullWidth size="small">
              <InputLabel>Listing</InputLabel>
              <Select
                value={filters.listing}
                label="Listing"
                onChange={(e) => handleFilterChange('listing', e.target.value)}
              >
                <MenuItem value="">All Listings</MenuItem>
                <MenuItem value="Villa Del Sol">Villa Del Sol</MenuItem>
                <MenuItem value="Navigli Apartment">Navigli Apartment</MenuItem>
                <MenuItem value="Polacchi42">Polacchi42</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
            <FormControl fullWidth size="small">
              <InputLabel>Channel</InputLabel>
              <Select
                value={filters.channel}
                label="Channel"
                onChange={(e) => handleFilterChange('channel', e.target.value)}
              >
                <MenuItem value="">All Channels</MenuItem>
                <MenuItem value="Airbnb">Airbnb</MenuItem>
                <MenuItem value="Booking.com">Booking.com</MenuItem>
                <MenuItem value="Direct">Direct</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
            <FormControl fullWidth size="small">
              <InputLabel>Assignee</InputLabel>
              <Select
                value={filters.assignee}
                label="Assignee"
                onChange={(e) => handleFilterChange('assignee', e.target.value)}
              >
                <MenuItem value="">All Assignees</MenuItem>
                <MenuItem value="John Doe">John Doe</MenuItem>
                <MenuItem value="Mike Johnson">Mike Johnson</MenuItem>
                <MenuItem value="Tom Brown">Tom Brown</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
            <FormControl fullWidth size="small">
              <InputLabel>Supervisor</InputLabel>
              <Select
                value={filters.supervisor}
                label="Supervisor"
                onChange={(e) => handleFilterChange('supervisor', e.target.value)}
              >
                <MenuItem value="">All Supervisors</MenuItem>
                <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                <MenuItem value="Sarah Wilson">Sarah Wilson</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort Order</InputLabel>
              <Select
                value={sortOrder}
                label="Sort Order"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <MenuItem value="dueDate">Due Date</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="createdAt">Created Date</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
            <Button
              variant="outlined"
              onClick={handleFilterModalOpen}
              startIcon={<MoreHorizontal size={16} />}
              fullWidth
            >
              More Filter
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Tasks Table or Empty State */}
      {sortedTasks.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center', mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
              No tasks found
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
              Get started by creating your first task
            </Typography>
            <Button variant="contained" onClick={handleAddTask}>
              Add Task
            </Button>
          </CardContent>
        </Card>
      ) : (
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
                  <TableCell>Channel</TableCell>
                  <TableCell>Listing</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTasks.map((task) => (
                  <TableRow key={task.id} hover>
                    <TableCell>
                      <Box>
                        <Typography 
                          variant="body2" 
                          sx={{ fontWeight: 500, cursor: 'pointer', color: 'primary.main' }}
                          onClick={() => handleEditTask(task)}
                        >
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
                        color={
                          task.status === 'Completed'
                            ? 'success'
                            : task.status === 'In Progress'
                              ? 'warning'
                              : 'default'
                        }
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
                        <IconButton 
                          size="small" 
                          onClick={() => handleEditTask(task)}
                          sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
                        >
                          <Pencil size={16} />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={(e) => handleActionMenuOpen(e, task)}
                          sx={{ '&:hover': { bgcolor: 'grey.100' } }}
                        >
                          <MoreVertical size={16} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Pagination */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Show 50 per page
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {startIndex + 1}-{Math.min(endIndex, sortedTasks.length)} of {sortedTasks.length}
          </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Button
                size="small"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
            </Button>
            <Button
                size="small"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
            </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* More Filter Modal */}
      <Dialog open={filterModalOpen} onClose={handleFilterModalClose} maxWidth="md" fullWidth>
        <DialogTitle>More Filters</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select 
                  label="Status" 
                  multiple
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select 
                  label="Priority" 
                  multiple
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <TextField
                fullWidth
                type="date"
                label="From Date"
                value={filters.fromDate}
                onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <TextField
                fullWidth
                type="date"
                label="To Date"
                value={filters.toDate}
                onChange={(e) => handleFilterChange('toDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetFilters}>Reset Filters</Button>
          <Button onClick={handleFilterModalClose}>Cancel</Button>
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={() => handleEditTask(selectedTask)}>
          <Pencil size={16} style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteTask} sx={{ color: 'error.main' }}>
          <Trash2 size={16} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete &quot;{taskToDelete?.title}&quot;? This action cannot be undone.
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

