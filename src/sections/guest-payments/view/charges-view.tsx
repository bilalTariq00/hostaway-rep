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
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for charges
const mockCharges = [
  {
    id: 1,
    guestName: 'John Smith',
    listing: 'Villa Del Sol',
    reservationId: 'RES-001',
    checkIn: '2024-02-15',
    checkOut: '2024-02-20',
    type: 'Accommodation',
    chargeName: 'Villa Rental Fee',
    status: 'Pending',
    dueDate: '2024-02-14',
    chargeDate: '2024-02-10',
    chargeId: 'CHG-001',
    amount: 2500.00,
  },
  {
    id: 2,
    guestName: 'Sarah Johnson',
    listing: 'Navigli Apartment',
    reservationId: 'RES-002',
    checkIn: '2024-02-10',
    checkOut: '2024-02-14',
    type: 'Security Deposit',
    chargeName: 'Security Deposit',
    status: 'Paid',
    dueDate: '2024-02-09',
    chargeDate: '2024-02-08',
    chargeId: 'CHG-002',
    amount: 500.00,
  },
  {
    id: 3,
    guestName: 'Mike Wilson',
    listing: 'Polacchi42',
    reservationId: 'RES-003',
    checkIn: '2024-02-05',
    checkOut: '2024-02-09',
    type: 'Cleaning Fee',
    chargeName: 'Cleaning Service',
    status: 'Overdue',
    dueDate: '2024-02-04',
    chargeDate: '2024-02-01',
    chargeId: 'CHG-003',
    amount: 150.00,
  },
  {
    id: 4,
    guestName: 'Emily Davis',
    listing: 'Superattico - Via Del C...',
    reservationId: 'RES-004',
    checkIn: '2024-01-28',
    checkOut: '2024-02-02',
    type: 'Additional Services',
    chargeName: 'Airport Transfer',
    status: 'Pending',
    dueDate: '2024-01-27',
    chargeDate: '2024-01-25',
    chargeId: 'CHG-004',
    amount: 75.00,
  },
  {
    id: 5,
    guestName: 'David Brown',
    listing: 'Villa Del Sol',
    reservationId: 'RES-005',
    checkIn: '2024-01-20',
    checkOut: '2024-01-25',
    type: 'Accommodation',
    chargeName: 'Villa Rental Fee',
    status: 'Paid',
    dueDate: '2024-01-19',
    chargeDate: '2024-01-18',
    chargeId: 'CHG-005',
    amount: 2200.00,
  },
];

export function ChargesView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage] = useState(25);
  const [downloadMenuAnchor, setDownloadMenuAnchor] = useState<null | HTMLElement>(null);
  const [settingsMenuAnchor, setSettingsMenuAnchor] = useState<null | HTMLElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterTab, setFilterTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [grouping, setGrouping] = useState('no-grouping');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) router.push('/guest-payments/auto-payments');
    if (newValue === 2) router.push('/guest-payments/document-templates');
  };

  const handleDownloadMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
  };

  const handleDownloadMenuClose = () => {
    setDownloadMenuAnchor(null);
  };

  const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenuAnchor(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setSettingsMenuAnchor(null);
  };

  const handleAddCharge = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };


  const totalPages = Math.ceil(mockCharges.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCharges = mockCharges.slice(startIndex, endIndex);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs and Actions */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Guest Payments
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleDownloadMenuOpen}
              startIcon={<Iconify icon={"eva:download-fill" as any} />}
            >
              Download Report
            </Button>
            <Button
              variant="contained"
              onClick={handleAddCharge}
              startIcon={<Iconify icon={"eva:plus-fill" as any} />}
            >
              Add Charge
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
          <Tab label="Charges" />
          <Tab label="Auto Payment" />
          <Tab label="Document Templates" />
        </Tabs>
      </Box>

      {/* Filters Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              placeholder="Search charges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon={"eva:search-fill" as any} />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Grouping</InputLabel>
              <Select
                value={grouping}
                label="Grouping"
                onChange={(e) => setGrouping(e.target.value)}
              >
                <MenuItem value="no-grouping">No Grouping</MenuItem>
                <MenuItem value="by-guest">By Guest</MenuItem>
                <MenuItem value="by-listing">By Listing</MenuItem>
                <MenuItem value="by-status">By Status</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Filter Tabs */}
        <Tabs
          value={filterTab}
          onChange={(e, newValue) => setFilterTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              minWidth: 'auto',
              px: 2,
            },
            '& .Mui-selected': {
              color: 'primary.main',
              fontWeight: 600,
            },
          }}
        >
          <Tab label="All" />
          <Tab label="Pending" />
          <Tab label="Past Due" />
          <Tab label="By Reservation" />
        </Tabs>
      </Paper>

      {/* Charges Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Guest Name
                    <IconButton size="small" onClick={handleSettingsMenuOpen}>
                      <Iconify icon={"eva:settings-fill" as any} width={16} />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>Listing</TableCell>
                <TableCell>Reservation</TableCell>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Charge Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Charge Date</TableCell>
                <TableCell>Charge ID</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCharges.map((charge) => (
                <TableRow key={charge.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {charge.guestName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {charge.listing}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {charge.reservationId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {charge.checkIn}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {charge.checkOut}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {charge.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {charge.chargeName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={charge.status}
                      size="small"
                      color={
                        charge.status === 'Paid'
                          ? 'success'
                          : charge.status === 'Pending'
                            ? 'warning'
                            : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {charge.dueDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {charge.chargeDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {charge.chargeId}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formatCurrency(charge.amount)}
                    </Typography>
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
            page={currentPage + 1}
            onChange={(_, page) => setCurrentPage(page - 1)}
            color="primary"
          />
        </Box>
      </Paper>

      {/* Add Charge Sidebar */}
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
            Add Charge
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <Iconify icon={"eva:close-fill" as any} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Guest Name"
            placeholder="Select or enter guest name..."
          />

          <TextField
            fullWidth
            label="Listing"
            placeholder="Select listing..."
          />

          <TextField
            fullWidth
            label="Reservation ID"
            placeholder="Enter reservation ID..."
          />

          <FormControl fullWidth>
            <InputLabel>Charge Type</InputLabel>
            <Select label="Charge Type">
              <MenuItem value="accommodation">Accommodation</MenuItem>
              <MenuItem value="security-deposit">Security Deposit</MenuItem>
              <MenuItem value="cleaning-fee">Cleaning Fee</MenuItem>
              <MenuItem value="additional-services">Additional Services</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Charge Name"
            placeholder="Enter charge name..."
          />

          <TextField
            fullWidth
            label="Amount"
            type="number"
            placeholder="0.00"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />

          <TextField
            fullWidth
            type="date"
            label="Due Date"
            InputLabelProps={{ shrink: true }}
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select label="Status">
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="overdue">Overdue</MenuItem>
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
              Add Charge
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Download Menu */}
      <Menu
        anchorEl={downloadMenuAnchor}
        open={Boolean(downloadMenuAnchor)}
        onClose={handleDownloadMenuClose}
      >
        <MenuItem onClick={handleDownloadMenuClose}>
          <Iconify icon={"eva:file-text-fill" as any} sx={{ mr: 1 }} />
          Export to Excel
        </MenuItem>
        <MenuItem onClick={handleDownloadMenuClose}>
          <Iconify icon={"eva:file-pdf-fill" as any} sx={{ mr: 1 }} />
          Export to PDF
        </MenuItem>
        <MenuItem onClick={handleDownloadMenuClose}>
          <Iconify icon={"eva:file-csv-fill" as any} sx={{ mr: 1 }} />
          Export to CSV
        </MenuItem>
      </Menu>

      {/* Settings Menu */}
      <Menu
        anchorEl={settingsMenuAnchor}
        open={Boolean(settingsMenuAnchor)}
        onClose={handleSettingsMenuClose}
      >
        <MenuItem onClick={handleSettingsMenuClose}>
          <Iconify icon={"eva:plus-fill" as any} sx={{ mr: 1 }} />
          Add Column
        </MenuItem>
        <MenuItem onClick={handleSettingsMenuClose}>
          <Iconify icon={"eva:minus-fill" as any} sx={{ mr: 1 }} />
          Remove Column
        </MenuItem>
        <MenuItem onClick={handleSettingsMenuClose}>
          <Iconify icon={"eva:settings-fill" as any} sx={{ mr: 1 }} />
          Fix Columns
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}
