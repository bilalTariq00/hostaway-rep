import { useState } from 'react';
import {
  X,
  Copy,
  Info,
  Play,
  Filter,
  Pencil,
  Search,
} from 'lucide-react';

import {
  Box,
  Tab,
  Chip,
  Tabs,
  Paper,
  Radio,
  Table,
  Button,
  Dialog,
  Drawer,
  Select,
  Switch,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  InputLabel,
  Pagination,
  RadioGroup,
  Typography,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  InputAdornment,
  TableContainer,
  FormControlLabel,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

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
];

export function AutomationsView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  
  // New state for automation management
  const [automations, setAutomations] = useState(mockAutomations);
  const [editingAutomation, setEditingAutomation] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [automationToDelete, setAutomationToDelete] = useState<any>(null);
  
  // Form data for sidebar
  const [formData, setFormData] = useState({
    type: 'Expense',
    name: '',
    description: '',
    categories: '',
    amount: 0,
    repeatEvery: 1,
    repeatPeriod: 'month',
    repeatOn: 31,
    expenseAppliesTo: 'Listings',
    listings: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/expenses-extras/expenses');
    if (newValue === 1) router.push('/expenses-extras/extras');
    if (newValue === 2) router.push('/expenses-extras/categories');
  };

  // Form handlers
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmountChange = (delta: number) => {
    setFormData(prev => ({ ...prev, amount: Math.max(0, prev.amount + delta) }));
  };

  const handleCreateAutomation = () => {
    if (formData.name.trim()) {
      const newAutomation = {
        id: Math.max(...automations.map(a => a.id)) + 1,
        name: formData.name,
        description: formData.description,
        trigger: `${formData.repeatEvery} ${formData.repeatPeriod}`,
        action: formData.type,
        status: 'Active',
        lastRun: new Date().toLocaleString(),
      };

      if (editingAutomation) {
        if (editingAutomation.isDuplicating) {
          setAutomations(prev => [...prev, newAutomation]);
        } else {
          setAutomations(prev => prev.map(automation => 
            automation.id === editingAutomation.id ? { ...newAutomation, id: editingAutomation.id } : automation
          ));
        }
      } else {
        setAutomations(prev => [...prev, newAutomation]);
      }

      setSidebarOpen(false);
      setEditingAutomation(null);
      setFormData({
        type: 'Expense',
        name: '',
        description: '',
        categories: '',
        amount: 0,
        repeatEvery: 1,
        repeatPeriod: 'month',
        repeatOn: 31,
        expenseAppliesTo: 'Listings',
        listings: '',
      });
    }
  };

  const handleEditAutomation = (automation: any) => {
    setEditingAutomation(automation);
    setFormData({
      type: automation.action,
      name: automation.name,
      description: automation.description,
      categories: '',
      amount: 0,
      repeatEvery: 1,
      repeatPeriod: 'month',
      repeatOn: 31,
      expenseAppliesTo: 'Listings',
      listings: '',
    });
    setSidebarOpen(true);
  };

  const handleDuplicateAutomation = (automation: any) => {
    setEditingAutomation({ ...automation, isDuplicating: true });
    setFormData({
      type: automation.action,
      name: `${automation.name} (Copy)`,
      description: automation.description,
      categories: '',
      amount: 0,
      repeatEvery: 1,
      repeatPeriod: 'month',
      repeatOn: 31,
      expenseAppliesTo: 'Listings',
      listings: '',
    });
    setSidebarOpen(true);
  };

  const handleAddAutomation = () => {
    setEditingAutomation(null);
    setFormData({
      type: 'Expense',
      name: '',
      description: '',
      categories: '',
      amount: 0,
      repeatEvery: 1,
      repeatPeriod: 'month',
      repeatOn: 31,
      expenseAppliesTo: 'Listings',
      listings: '',
    });
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setEditingAutomation(null);
    setFormData({
      type: 'Expense',
      name: '',
      description: '',
      categories: '',
      amount: 0,
      repeatEvery: 1,
      repeatPeriod: 'month',
      repeatOn: 31,
      expenseAppliesTo: 'Listings',
      listings: '',
    });
  };

  const handleDeleteClick = (automation: any) => {
    setAutomationToDelete(automation);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (automationToDelete) {
      setAutomations(prev => prev.filter(automation => automation.id !== automationToDelete.id));
    }
    setDeleteDialogOpen(false);
    setAutomationToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAutomationToDelete(null);
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const handleStatusToggle = (automationId: number) => {
    setAutomations(prev => prev.map(automation => 
      automation.id === automationId 
        ? { ...automation, status: automation.status === 'Active' ? 'Inactive' : 'Active' }
        : automation
    ));
  };

  const filteredAutomations = automations.filter(automation =>
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
          <Button variant="outlined" startIcon={<Filter size={16} />}>
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
                  <Search size={16} color="#666" />
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
                      <IconButton 
                        size="small" 
                        onClick={() => handleStatusToggle(automation.id)}
                        sx={{ '&:hover': { bgcolor: 'success.lighter' } }}
                      >
                        <Play size={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDuplicateAutomation(automation)}
                        sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
                      >
                        <Copy size={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditAutomation(automation)}
                        sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteClick(automation)}
                        sx={{ '&:hover': { bgcolor: 'error.lighter' } }}
                      >
                        <X size={16} color="#ef4444" />
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
            onChange={(event: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
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
            {editingAutomation?.isDuplicating ? 'Duplicate automation' : editingAutomation ? 'Edit automation' : 'Add new automation'}
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <X size={20} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Name *"
            placeholder="Enter automation name..."
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Info size={16} color="#666" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Description"
            placeholder="Enter automation description..."
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Info size={16} color="#666" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth>
            <InputLabel>Categories</InputLabel>
            <Select 
              label="Categories"
              value={formData.categories}
              onChange={(e) => handleInputChange('categories', e.target.value)}
            >
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="utilities">Utilities</MenuItem>
              <MenuItem value="marketing">Marketing</MenuItem>
              <MenuItem value="transportation">Transportation</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 60 }}>Amount *</Typography>
            <IconButton 
              size="small" 
              onClick={() => handleAmountChange(-1)}
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              <Typography variant="body2">-</Typography>
            </IconButton>
            <TextField
              size="small"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
              sx={{ flex: 1 }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 100 }}>Repeat every *</Typography>
            <TextField
              size="small"
              type="number"
              value={formData.repeatEvery}
              onChange={(e) => handleInputChange('repeatEvery', parseInt(e.target.value) || 1)}
              sx={{ width: 80 }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <Select 
                value={formData.repeatPeriod}
                onChange={(e) => handleInputChange('repeatPeriod', e.target.value)}
                size="small"
              >
                <MenuItem value="day">day</MenuItem>
                <MenuItem value="week">week</MenuItem>
                <MenuItem value="month">month</MenuItem>
                <MenuItem value="year">year</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 100 }}>Repeat on *</Typography>
            <TextField
              size="small"
              type="number"
              value={formData.repeatOn}
              onChange={(e) => handleInputChange('repeatOn', parseInt(e.target.value) || 1)}
              sx={{ width: 80 }}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              st day of the month
            </Typography>
            <Info size={16} color="#666" />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              Expense applies to
              <Info size={16} color="#666" />
            </Typography>
            <RadioGroup
              value={formData.expenseAppliesTo}
              onChange={(e) => handleInputChange('expenseAppliesTo', e.target.value)}
            >
              <FormControlLabel value="Listings" control={<Radio />} label="Listings" />
              <FormControlLabel value="Owners" control={<Radio />} label="Owners" />
            </RadioGroup>
          </Box>

          <FormControl fullWidth>
            <InputLabel>Listing(s)</InputLabel>
            <Select 
              label="Listing(s)"
              value={formData.listings}
              onChange={(e) => handleInputChange('listings', e.target.value)}
            >
              <MenuItem value="all">All Listings</MenuItem>
              <MenuItem value="listing1">Via di Acqua Bullicante 113</MenuItem>
              <MenuItem value="listing2">Stylish Apt | Balcony + AC + Aqueduct View</MenuItem>
              <MenuItem value="listing3">Navigli</MenuItem>
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
              onClick={handleCreateAutomation}
              sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              {editingAutomation?.isDuplicating ? 'Duplicate' : editingAutomation ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Automation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete &quot;{automationToDelete?.name}&quot;? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
