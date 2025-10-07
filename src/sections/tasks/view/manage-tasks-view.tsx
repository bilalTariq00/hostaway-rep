import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedListing, setSelectedListing] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [sortOrder, setSortOrder] = useState('dueDate');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) router.push('/tasks/manage-auto-tasks');
    if (newValue === 2) router.push('/tasks/checklist-templates');
    if (newValue === 3) router.push('/tasks/archive');
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const handleAddTask = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleFilterModalOpen = () => {
    setFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };

  const totalPages = Math.ceil(mockTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = mockTasks.slice(startIndex, endIndex);

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
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Listing</InputLabel>
              <Select
                value={selectedListing}
                label="Listing"
                onChange={(e) => setSelectedListing(e.target.value)}
              >
                <MenuItem value="">All Listings</MenuItem>
                <MenuItem value="villa">Villa Del Sol</MenuItem>
                <MenuItem value="navigli">Navigli Apartment</MenuItem>
                <MenuItem value="polacchi">Polacchi42</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Supervisor</InputLabel>
              <Select
                value={selectedSupervisor}
                label="Supervisor"
                onChange={(e) => setSelectedSupervisor(e.target.value)}
              >
                <MenuItem value="">All Supervisors</MenuItem>
                <MenuItem value="jane">Jane Smith</MenuItem>
                <MenuItem value="sarah">Sarah Wilson</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Button
              variant="outlined"
              onClick={handleFilterModalOpen}
              startIcon={<Iconify icon={"eva:more-horizontal-fill" as any} />}
              fullWidth
            >
              More Filter
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tasks Table or Empty State */}
      {mockTasks.length === 0 ? (
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
                        <IconButton size="small">
                          <Iconify icon={"eva:edit-fill" as any} width={16} />
                        </IconButton>
                        <IconButton size="small">
                          <Iconify icon={"eva:copy-fill" as any} width={16} />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={handleActionMenuOpen}
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
      )}

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

      {/* Add Task Sidebar */}
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
            Add Task
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <Iconify icon={"eva:close-fill" as any} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Task Title"
            placeholder="Enter task title..."
          />

          <TextField
            fullWidth
            label="Description"
            placeholder="Enter task description..."
            multiline
            rows={3}
          />

          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select label="Priority">
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Assignee</InputLabel>
            <Select label="Assignee">
              <MenuItem value="john">John Doe</MenuItem>
              <MenuItem value="mike">Mike Johnson</MenuItem>
              <MenuItem value="tom">Tom Brown</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Supervisor</InputLabel>
            <Select label="Supervisor">
              <MenuItem value="jane">Jane Smith</MenuItem>
              <MenuItem value="sarah">Sarah Wilson</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="date"
            label="Due Date"
            InputLabelProps={{ shrink: true }}
          />

          <FormControl fullWidth>
            <InputLabel>Channel</InputLabel>
            <Select label="Channel">
              <MenuItem value="airbnb">Airbnb</MenuItem>
              <MenuItem value="booking">Booking.com</MenuItem>
              <MenuItem value="direct">Direct</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Listing</InputLabel>
            <Select label="Listing">
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
              Add Task
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* More Filter Modal */}
      <Dialog open={filterModalOpen} onClose={handleFilterModalClose} maxWidth="md" fullWidth>
        <DialogTitle>More Filters</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select 
                  label="Status" 
                  multiple
                  value={[]}
                  onChange={() => {}}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select 
                  label="Priority" 
                  multiple
                  value={[]}
                  onChange={() => {}}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="From Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="To Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterModalClose}>Cancel</Button>
          <Button variant="contained" onClick={handleFilterModalClose}>
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
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:edit-fill" as any} sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:copy-fill" as any} sx={{ mr: 1 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:checkmark-circle-fill" as any} sx={{ mr: 1 }} />
          Mark Complete
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose} sx={{ color: 'error.main' }}>
          <Iconify icon={"eva:trash-2-fill" as any} sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}

