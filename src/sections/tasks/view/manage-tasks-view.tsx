import { useState, useEffect } from 'react';
import { Pencil, Trash2, Archive, MoreVertical, MoreHorizontal } from 'lucide-react';

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

import { API_URL } from 'src/config/environment';
import { DashboardContent } from 'src/layouts/dashboard';

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
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('dueDate');
  const [usersMap, setUsersMap] = useState<Record<string, any>>({});

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const response = await fetch(`${API_URL}/api/users?status=active`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Create a map for quick lookup: userId -> user object
            const map: Record<string, any> = {};
            data.data.forEach((user: any) => {
              map[user.id] = user;
            });
            setUsersMap(map);
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setLoading(false);
          return;
        }

        // Build query params from filters
        const params = new URLSearchParams({
          isArchived: 'false',
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
          sortBy: sortOrder,
          sortOrder: 'asc',
        });

        if (filters.status && filters.status.length > 0) {
          filters.status.forEach((s) => params.append('status', s));
        }
        if (filters.priority && filters.priority.length > 0) {
          filters.priority.forEach((p) => params.append('priority', p));
        }
        if (filters.assignee) params.append('assignee', filters.assignee);
        if (filters.supervisor) params.append('supervisor', filters.supervisor);
        if (filters.listing) params.append('listing', filters.listing);
        if (filters.channel) params.append('channel', filters.channel);
        if (filters.fromDate) params.append('fromDate', filters.fromDate);
        if (filters.toDate) params.append('toDate', filters.toDate);

        const response = await fetch(`${API_URL}/api/tasks?${params.toString()}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setTasks(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentPage, itemsPerPage, sortOrder, filters]);

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
    router.push(`/tasks/${task._id || task.id}/edit`);
  };

  const handleDeleteTask = () => {
    setTaskToDelete(selectedTask);
    setDeleteDialogOpen(true);
    handleActionMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (taskToDelete) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('Not authenticated');
          return;
        }

        const response = await fetch(`${API_URL}/api/tasks/${taskToDelete._id || taskToDelete.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Refresh tasks list
          setTasks((prev) => prev.filter((task) => (task._id || task.id) !== (taskToDelete._id || taskToDelete.id)));
        } else {
          const data = await response.json();
          alert(data.message || 'Failed to delete task');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      }
    }
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleArchiveTask = async () => {
    if (!selectedTask) return;

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Not authenticated');
        handleActionMenuClose();
        return;
      }

      const response = await fetch(`${API_URL}/api/tasks/${selectedTask._id || selectedTask.id}/archive`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Remove task from list (it's now archived)
          setTasks((prev) => prev.filter((task) => (task._id || task.id) !== (selectedTask._id || selectedTask.id)));
          alert('Task archived successfully');
        } else {
          alert(data.message || 'Failed to archive task');
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to archive task' }));
        alert(errorData.message || 'Failed to archive task');
      }
    } catch (error) {
      console.error('Error archiving task:', error);
      alert('Failed to archive task');
    } finally {
      handleActionMenuClose();
    }
  };

  const handleFilterChange = (field: string, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
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

  // Tasks are already filtered and sorted by backend
  // Just handle pagination on frontend
  const sortedTasks = tasks || [];
  
  // Calculate pagination
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
                  <TableCell>Custom Fields</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      <Typography variant="body2" color="text.secondary">
                        Loading tasks...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : currentTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      <Typography variant="body2" color="text.secondary">
                        No tasks found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  currentTasks.map((task) => (
                    <TableRow key={task._id || task.id} hover>
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
                        {(() => {
                          // Handle populated user object or ID string
                          const assigneeId = typeof task.assignee === 'object' && task.assignee?._id
                            ? task.assignee._id.toString()
                            : task.assignee?.toString() || '';
                          const assigneeName = typeof task.assignee === 'object' && task.assignee?.name
                            ? task.assignee.name
                            : (assigneeId && usersMap[assigneeId] ? usersMap[assigneeId].name : null);
                          return assigneeName || assigneeId || '-';
                        })()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {(() => {
                          // Handle populated user object or ID string
                          const supervisorId = typeof task.supervisor === 'object' && task.supervisor?._id
                            ? task.supervisor._id.toString()
                            : task.supervisor?.toString() || '';
                          const supervisorName = typeof task.supervisor === 'object' && task.supervisor?.name
                            ? task.supervisor.name
                            : (supervisorId && usersMap[supervisorId] ? usersMap[supervisorId].name : null);
                          return supervisorName || supervisorId || '-';
                        })()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : task.dueDate || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{task.channel}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{task.listing}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {task.customFields && Array.isArray(task.customFields) && task.customFields.length > 0 ? (
                          task.customFields.map((field: any, idx: number) => (
                            <Chip
                              key={idx}
                              label={`${field.name}: ${field.type === 'boolean' 
                                ? (field.value ? 'Yes' : 'No') 
                                : field.type === 'date' 
                                  ? (field.value ? new Date(field.value).toLocaleDateString() : '-')
                                  : String(field.value || '-')}`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.7rem', height: 24 }}
                            />
                          ))
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            -
                          </Typography>
                        )}
                      </Box>
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
                  ))
                )}
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
        <MenuItem onClick={handleArchiveTask}>
          <Archive size={16} style={{ marginRight: 8 }} />
          Archive
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
            Are you sure you want to delete &quot;{taskToDelete?.title}&quot;? This action cannot be
            undone.
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
