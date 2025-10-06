import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for extras
const mockExtras = [
  {
    id: 1,
    name: 'Airport Transfer',
    date: '2024-01-15',
    category: 'Transportation',
    listing: 'La Dimora Del Cavaliere',
    reservation: 'RES-001',
    owner: 'John Doe',
    ownerStatement: 'ST-001',
    amount: 75.00,
    hasAttachment: true,
  },
  {
    id: 2,
    name: 'Welcome Basket',
    date: '2024-01-14',
    category: 'Amenities',
    listing: 'Navigli',
    reservation: 'RES-002',
    owner: 'Jane Smith',
    ownerStatement: 'ST-002',
    amount: 45.00,
    hasAttachment: false,
  },
  {
    id: 3,
    name: 'Late Check-out',
    date: '2024-01-13',
    category: 'Services',
    listing: 'Polacchi42',
    reservation: 'RES-003',
    owner: 'Mike Johnson',
    ownerStatement: 'ST-003',
    amount: 30.00,
    hasAttachment: true,
  },
  {
    id: 4,
    name: 'Concierge Service',
    date: '2024-01-12',
    category: 'Services',
    listing: 'Superattico - Via Del C...',
    reservation: 'RES-004',
    owner: 'Sarah Wilson',
    ownerStatement: 'ST-004',
    amount: 100.00,
    hasAttachment: false,
  },
];

export function ExtrasView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [customViewModalOpen, setCustomViewModalOpen] = useState(false);
  const [downloadAnchor, setDownloadAnchor] = useState<null | HTMLElement>(null);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/expenses/expenses');
    if (newValue === 2) router.push('/expenses/categories');
    if (newValue === 3) router.push('/expenses/automations');
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedExtras(mockExtras.map(extra => extra.id));
    } else {
      setSelectedExtras([]);
    }
  };

  const handleSelectExtra = (extraId: number) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleDownloadClick = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadAnchor(event.currentTarget);
  };

  const handleDownloadClose = () => {
    setDownloadAnchor(null);
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const handleAddExtra = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleImportClick = () => {
    setImportModalOpen(true);
  };

  const handleImportClose = () => {
    setImportModalOpen(false);
  };

  const handleCustomViewClick = () => {
    setCustomViewModalOpen(true);
  };

  const handleCustomViewClose = () => {
    setCustomViewModalOpen(false);
  };

  const filteredExtras = mockExtras.filter(extra =>
    extra.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredExtras.reduce((sum, extra) => sum + extra.amount, 0);
  const totalPages = Math.ceil(filteredExtras.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExtras = filteredExtras.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Expenses and Extras
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={handleImportClick}>
              Import
            </Button>
            <Button
              variant="outlined"
              onClick={handleDownloadClick}
              endIcon={<Iconify icon={"eva:arrow-down-fill" as any} />}
            >
              Download Report
            </Button>
            <Menu
              anchorEl={downloadAnchor}
              open={Boolean(downloadAnchor)}
              onClose={handleDownloadClose}
            >
              <MenuItem onClick={handleDownloadClose}>Export CSV</MenuItem>
              <MenuItem onClick={handleDownloadClose}>Export Excel</MenuItem>
              <MenuItem onClick={handleDownloadClose}>Export PDF</MenuItem>
            </Menu>
            <Button variant="contained" onClick={handleAddExtra}>
              Add Extra
            </Button>
          </Box>
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

      {/* Extras Title and Actions */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Extras
          </Typography>
          <Button variant="outlined" onClick={handleCustomViewClick}>
            New Custom View
          </Button>
        </Box>
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

      {/* Extras Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedExtras.length > 0 && selectedExtras.length < mockExtras.length}
                    checked={selectedExtras.length === mockExtras.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Listing</TableCell>
                <TableCell>Reservation</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Owner Statement</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentExtras.map((extra) => (
                <TableRow key={extra.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedExtras.includes(extra.id)}
                      onChange={() => handleSelectExtra(extra.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {extra.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {extra.date}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={extra.category}
                      size="small"
                      color="secondary"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {extra.listing}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {extra.reservation}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {extra.owner}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {extra.ownerStatement}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      €{extra.amount.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small">
                        <Iconify icon={"eva:attach-2-fill" as any} width={16} />
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

      {/* Total Amount - Sticky */}
      <Paper sx={{ p: 2, mb: 2, position: 'sticky', bottom: 0, bgcolor: 'background.paper', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Total Amount
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            €{totalAmount.toFixed(2)}
          </Typography>
        </Box>
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

      {/* Add Extra Sidebar */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={handleSidebarClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 400,
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add Extra
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <Iconify icon={"eva:close-fill" as any} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Name"
            placeholder="Enter extra name..."
          />

          <TextField
            fullWidth
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select label="Category">
              <MenuItem value="transportation">Transportation</MenuItem>
              <MenuItem value="amenities">Amenities</MenuItem>
              <MenuItem value="services">Services</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Listing</InputLabel>
            <Select label="Listing">
              <MenuItem value="listing1">La Dimora Del Cavaliere</MenuItem>
              <MenuItem value="listing2">Navigli</MenuItem>
              <MenuItem value="listing3">Polacchi42</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Amount"
            type="number"
            placeholder="0.00"
          />

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
              Add Extra
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Import Modal */}
      <Dialog open={importModalOpen} onClose={handleImportClose} maxWidth="sm" fullWidth>
        <DialogTitle>Import Data</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Upload your extras data file
            </Typography>
            <Button variant="contained" component="label">
              Choose File
              <input type="file" hidden />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImportClose}>Cancel</Button>
          <Button variant="contained" onClick={handleImportClose}>
            Import
          </Button>
        </DialogActions>
      </Dialog>

      {/* Custom View Modal */}
      <Dialog open={customViewModalOpen} onClose={handleCustomViewClose} maxWidth="sm" fullWidth>
        <DialogTitle>New Custom View</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="View Name"
            placeholder="Enter view name..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCustomViewClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCustomViewClose}>
            Create View
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
          Copy
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose} sx={{ color: 'error.main' }}>
          <Iconify icon={"eva:trash-2-fill" as any} sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}
