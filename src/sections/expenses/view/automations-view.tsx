import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for automations
const mockAutomations = [
  {
    id: 1,
    name: 'Auto Cleaning Fee',
    description: 'Automatically add cleaning fee for bookings over 3 nights',
    trigger: 'Booking Created',
    action: 'Add Expense',
    status: 'Active',
    lastRun: '2024-01-15 10:30',
  },
  {
    id: 2,
    name: 'Utility Bill Processing',
    description: 'Process monthly utility bills and create expenses',
    trigger: 'Monthly',
    action: 'Create Expense',
    status: 'Active',
    lastRun: '2024-01-01 00:00',
  },
  {
    id: 3,
    name: 'Late Check-out Fee',
    description: 'Add late check-out fee for departures after 12 PM',
    trigger: 'Check-out',
    action: 'Add Extra',
    status: 'Inactive',
    lastRun: '2024-01-10 14:20',
  },
  {
    id: 4,
    name: 'Marketing Budget',
    description: 'Allocate monthly marketing budget across properties',
    trigger: 'Monthly',
    action: 'Create Expense',
    status: 'Active',
    lastRun: '2024-01-01 00:00',
  },
  {
    id: 5,
    name: 'Maintenance Reminder',
    description: 'Create maintenance expenses based on property usage',
    trigger: 'Property Usage',
    action: 'Create Expense',
    status: 'Inactive',
    lastRun: '2024-01-05 09:15',
  },
];

export function AutomationsView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/expenses/expenses');
    if (newValue === 1) router.push('/expenses/extras');
    if (newValue === 2) router.push('/expenses/categories');
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const handleAddAutomation = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleStatusToggle = (automationId: number) => {
    // In a real app, this would update the automation status
    console.log('Toggle automation status:', automationId);
  };

  const filteredAutomations = mockAutomations.filter(automation =>
    automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    automation.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAutomations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAutomations = filteredAutomations.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Expenses and Extras
          </Typography>
          <Button variant="contained" onClick={handleAddAutomation}>
            Add Automation
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
          <Tab label="Expenses" />
          <Tab label="Extras" />
          <Tab label="Categories" />
          <Tab label="Automations" />
        </Tabs>
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" startIcon={<Iconify icon={"eva:funnel-fill" as any} />}>
            Filter
          </Button>
          <TextField
            size="small"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={"eva:search-fill" as any} sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
        </Box>
      </Paper>

      {/* Automations Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Trigger</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Run</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentAutomations.map((automation) => (
                <TableRow key={automation.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {automation.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {automation.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={automation.trigger}
                      size="small"
                      color="info"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={automation.action}
                      size="small"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Switch
                        checked={automation.status === 'Active'}
                        onChange={() => handleStatusToggle(automation.id)}
                        size="small"
                      />
                      <Chip
                        label={automation.status}
                        size="small"
                        color={automation.status === 'Active' ? 'success' : 'default'}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {automation.lastRun}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small">
                        <Iconify icon={"eva:play-circle-fill" as any} width={16} />
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

      {/* Pagination */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Show 25 per page
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      </Paper>

      {/* Add Automation Sidebar */}
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
            Add Automation
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <Iconify icon={"eva:close-fill" as any} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Automation Name"
            placeholder="Enter automation name..."
          />

          <TextField
            fullWidth
            label="Description"
            placeholder="Enter automation description..."
            multiline
            rows={3}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Trigger"
              placeholder="Select trigger..."
              select
            >
              <MenuItem value="booking">Booking Created</MenuItem>
              <MenuItem value="checkout">Check-out</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="usage">Property Usage</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Action"
              placeholder="Select action..."
              select
            >
              <MenuItem value="add-expense">Add Expense</MenuItem>
              <MenuItem value="create-expense">Create Expense</MenuItem>
              <MenuItem value="add-extra">Add Extra</MenuItem>
              <MenuItem value="create-extra">Create Extra</MenuItem>
            </TextField>
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
              Add Automation
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
