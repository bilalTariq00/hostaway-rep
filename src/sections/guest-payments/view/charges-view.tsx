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

// Mock data for charges matching the images
const mockCharges = [
  {
    id: 1,
    guestName: 'Alexandre Vilmet',
    listing: 'Superattico - Via Del Corso 43 (305421)',
    reservationId: '47409150',
    checkIn: '2025-10-02',
    checkOut: '2025-10-06',
    type: 'CHARGE',
    chargeName: 'Prenotazione Web | VRBO',
    status: 'FAILED',
    dueDate: '09 Sep 2025 10:58 pm',
    chargeDate: '09 Sep 2025 11:00 pm',
    chargeId: '20614431',
    amount: 2207.00,
    channel: 'VRBO',
    balance: { paid: 0, total: 2207 },
  },
  {
    id: 2,
    guestName: 'Stephanie Macias',
    listing: 'Luxury Stay in Rome - Steps from Metro A Cornelia (372243)',
    reservationId: '372243',
    checkIn: '2025-07-11',
    checkOut: '2025-07-14',
    type: 'CHARGE',
    chargeName: 'Prenotazione Web | VRBO',
    status: 'CANCELLED',
    dueDate: '12 Jul 2025 1:00 am',
    chargeDate: '',
    chargeId: '12515684',
    amount: 591.00,
    channel: 'VRBO',
    balance: { paid: 0, total: 591 },
  },
  {
    id: 3,
    guestName: 'zheng wei',
    listing: '[10 min Duomo] Modern Chic Apt, 20 min Linate (385794)',
    reservationId: '385794',
    checkIn: '2025-07-06',
    checkOut: '2025-07-08',
    type: 'CHARGE',
    chargeName: 'Prenotazione Web | VRBO',
    status: 'CANCELLED',
    dueDate: '12 Jul 2025 1:00 am',
    chargeDate: '',
    chargeId: '12515684',
    amount: 196.00,
    channel: 'VRBO',
    balance: { paid: 0, total: 196 },
  },
  {
    id: 4,
    guestName: 'Maddalena',
    listing: 'La Dimora Del Cavaliere (305034)',
    reservationId: '305034',
    checkIn: '2025-08-03',
    checkOut: '2025-09-03',
    type: 'CHARGE',
    chargeName: 'Bonifico',
    status: 'PAID',
    dueDate: '15 May 2025 3:31 am',
    chargeDate: '15 May 2025 3:31 am',
    chargeId: '12515684',
    amount: 340.00,
    channel: 'Direct',
    balance: { paid: 340, total: 340 },
  },
  {
    id: 5,
    guestName: 'Eva Riccini Margarucci',
    listing: 'Via di Acqua Bullicante 113 (363365)',
    reservationId: '363365',
    checkIn: '2025-12-19',
    checkOut: '2025-12-26',
    type: 'CHARGE',
    chargeName: 'Prenotazione Web | VRBO',
    status: 'CANCELLED',
    dueDate: '12 Jul 2025 1:00 am',
    chargeDate: '',
    chargeId: '12515684',
    amount: 591.00,
    channel: 'VRBO',
    balance: { paid: 0, total: 591 },
  },
  {
    id: 6,
    guestName: 'Alessia Leonardi',
    listing: 'La Dimora Del Cavaliere (305034)',
    reservationId: '305034',
    checkIn: '2025-07-28',
    checkOut: '2025-08-03',
    type: 'CHARGE',
    chargeName: 'Manual charge',
    status: 'PAID',
    dueDate: '15 May 2025 3:31 am',
    chargeDate: '15 May 2025 3:31 am',
    chargeId: '12515684',
    amount: 340.00,
    channel: 'Direct',
    balance: { paid: 340, total: 340 },
  },
  {
    id: 7,
    guestName: 'SHADY Ebrabim',
    listing: 'Via Poggio Tulliano (332386)',
    reservationId: '35768003',
    checkIn: '2025-02-03',
    checkOut: '2025-02-08',
    type: 'CHARGE',
    chargeName: 'Manual charge',
    status: 'DUE',
    dueDate: '12 Mar 2025 2:04 am',
    chargeDate: '',
    chargeId: '12515684',
    amount: 340.00,
    channel: 'Hostaway',
    balance: { paid: 0, total: 340 },
  },
  {
    id: 8,
    guestName: 'ivana Colás',
    listing: '[5 Min From Trastevere] Chic Apt (317154)',
    reservationId: '38531425',
    checkIn: '2025-09-07',
    checkOut: '2025-09-11',
    type: 'CHARGE',
    chargeName: 'Prenotazione Web | VRBO',
    status: 'FAILED',
    dueDate: '04 Mar 2025 6:10 pm',
    chargeDate: '04 Mar 2025 6:15 pm',
    chargeId: '14470884',
    amount: 591.00,
    channel: 'VRBO',
    balance: { paid: 0, total: 591 },
  },
  {
    id: 9,
    guestName: 'Margherita Barabesi Margherita Barabesi',
    listing: '[5 Min From Trastevere] Chic Apt (317154)',
    reservationId: '37343663',
    checkIn: '2025-02-07',
    checkOut: '2025-02-09',
    type: 'CHARGE',
    chargeName: 'Prenotazione Web | VRBO',
    status: 'FAILED',
    dueDate: '03 Feb 2025 4:28 am',
    chargeDate: '03 Feb 2025 4:30 am',
    chargeId: '13628282',
    amount: 196.00,
    channel: 'Google',
    balance: { paid: 0, total: 196 },
  },
];

export function ChargesView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage] = useState(25);
  const [downloadMenuAnchor, setDownloadMenuAnchor] = useState<null | HTMLElement>(null);
  const [settingsMenuAnchor, setSettingsMenuAnchor] = useState<null | HTMLElement>(null);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterTab, setFilterTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [grouping, setGrouping] = useState('no-grouping');
  const [selectedCharge, setSelectedCharge] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [charges, setCharges] = useState(mockCharges);
  const [visibleColumns, setVisibleColumns] = useState({
    guestName: true,
    listing: true,
    reservationCheckIn: true,
    reservationCheckOut: true,
    type: true,
    chargeName: true,
    status: true,
    dueDate: true,
    chargeDate: true,
    chargeId: true,
    amount: true,
  });

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
    setSelectedCharge(null);
    setIsEditMode(false);
    setSidebarOpen(true);
  };

  const handleEditCharge = (charge: any) => {
    setSelectedCharge(charge);
    setIsEditMode(true);
    setSidebarOpen(true);
    setActionMenuAnchor(null);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setSelectedCharge(null);
    setIsEditMode(false);
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, charge: any) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedCharge(charge);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedCharge(null);
  };

  const handleColumnToggle = (column: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column as keyof typeof prev]
    }));
  };

  const handleSaveCharge = (chargeData: any) => {
    if (isEditMode && selectedCharge) {
      // Update existing charge
      setCharges(prev => prev.map(charge => 
        charge.id === selectedCharge.id ? { ...charge, ...chargeData } : charge
      ));
    } else {
      // Add new charge
      const newCharge = {
        ...chargeData,
        id: Date.now(),
        chargeId: `CHG-${Date.now()}`,
      };
      setCharges(prev => [...prev, newCharge]);
    }
    handleSidebarClose();
  };

  const handleRetryCharge = () => {
    if (selectedCharge) {
      setCharges(prev => prev.map(charge => 
        charge.id === selectedCharge.id ? { ...charge, status: 'PENDING' } : charge
      ));
    }
    handleActionMenuClose();
  };

  const handleCancelCharge = () => {
    if (selectedCharge) {
      setCharges(prev => prev.map(charge => 
        charge.id === selectedCharge.id ? { ...charge, status: 'CANCELLED' } : charge
      ));
    }
    handleActionMenuClose();
  };


  // Filter charges based on active filter tab
  const getFilteredCharges = () => {
    let filtered = charges;
    
    if (filterTab === 1) { // Pending
      filtered = charges.filter(charge => charge.status === 'PENDING' || charge.status === 'DUE');
    } else if (filterTab === 2) { // Past Due
      filtered = charges.filter(charge => charge.status === 'FAILED' || charge.status === 'OVERDUE');
    } else if (filterTab === 3) { // By Reservation
      // Group by reservation - for now just show all
      filtered = charges;
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(charge => 
        charge.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charge.listing.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charge.chargeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredCharges = getFilteredCharges();
  const totalPages = Math.ceil(filteredCharges.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCharges = filteredCharges.slice(startIndex, endIndex);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'success';
      case 'PENDING': return 'warning';
      case 'DUE': return 'info';
      case 'FAILED': return 'error';
      case 'CANCELLED': return 'default';
      default: return 'default';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'VRBO': return 'W';
      case 'Google': return 'G';
      case 'Hostaway': return 'H';
      case 'Direct': return 'D';
      default: return '?';
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'VRBO': return '#FF5A5F';
      case 'Google': return '#4285F4';
      case 'Hostaway': return '#FF6B35';
      case 'Direct': return '#00C853';
      default: return '#9E9E9E';
    }
  };

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
              sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              Download report
            </Button>
            <Button
              variant="contained"
              onClick={handleAddCharge}
              startIcon={<Iconify icon={"eva:plus-fill" as any} />}
              sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
            >
               Add transaction
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
          <Tab label="Auto-payments" />
          <Tab label="Document Templates" />
        </Tabs>
      </Box>

      {/* Filters Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Iconify icon={"eva:funnel-fill" as any} />}
            sx={{ 
              bgcolor: 'grey.100', 
              color: 'text.primary',
              borderColor: 'grey.300',
              '&:hover': { bgcolor: 'grey.200' }
            }}
          >
            Filters
          </Button>
          
          {/* Filter Tabs */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['All', 'Pending', 'Past Due', 'By Reservation', 'No Grouping'].map((label, index) => (
              <Button
                key={label}
                variant={filterTab === index ? 'contained' : 'outlined'}
                onClick={() => setFilterTab(index)}
                sx={{
                  minWidth: 'auto',
                  px: 2,
                  py: 1,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  bgcolor: filterTab === index ? 'grey.800' : 'transparent',
                  color: filterTab === index ? 'white' : 'text.primary',
                  borderColor: 'grey.300',
                  '&:hover': {
                    bgcolor: filterTab === index ? 'grey.700' : 'grey.100',
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Box>

        <TextField
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={"eva:search-fill" as any} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Charges Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {visibleColumns.guestName && <TableCell>Guest name</TableCell>}
                {visibleColumns.listing && <TableCell>Listing</TableCell>}
                {visibleColumns.reservationCheckIn && <TableCell>Reservation check-in</TableCell>}
                {visibleColumns.reservationCheckOut && <TableCell>Reservation check-out</TableCell>}
                {visibleColumns.type && <TableCell>Type</TableCell>}
                {visibleColumns.chargeName && <TableCell>Charge name</TableCell>}
                {visibleColumns.status && <TableCell>Status</TableCell>}
                {visibleColumns.dueDate && <TableCell>Due date</TableCell>}
                {visibleColumns.chargeDate && <TableCell>Charge date</TableCell>}
                {visibleColumns.chargeId && <TableCell>Charge ID</TableCell>}
                {visibleColumns.amount && <TableCell align="right">Amount</TableCell>}
                <TableCell>Actions</TableCell>
                <TableCell sx={{ 
                  position: 'sticky', 
                  right: 0, 
                  bgcolor: 'background.paper', 
                  zIndex: 2,
                  borderLeft: '1px solid',
                  borderColor: 'divider'
                }}>
                  <IconButton size="small" onClick={handleSettingsMenuOpen}>
                    <Iconify icon={"eva:settings-fill" as any} width={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCharges.map((charge) => (
                <TableRow key={charge.id} hover>
                  {visibleColumns.guestName && (
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'primary.main', cursor: 'pointer' }}>
                        {charge.guestName}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.listing && (
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                        {charge.listing}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.reservationCheckIn && (
                    <TableCell>
                      <Typography variant="body2">
                        {charge.checkIn}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.reservationCheckOut && (
                    <TableCell>
                      <Typography variant="body2">
                        {charge.checkOut}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.type && (
                    <TableCell>
                      <Chip
                        label={charge.type}
                        size="small"
                        sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 500 }}
                      />
                    </TableCell>
                  )}
                  {visibleColumns.chargeName && (
                    <TableCell>
                      <Typography variant="body2">
                        {charge.chargeName}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.status && (
                    <TableCell>
                      <Chip
                        label={charge.status}
                        size="small"
                        color={getStatusColor(charge.status) as any}
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                  )}
                  {visibleColumns.dueDate && (
                    <TableCell>
                      <Typography variant="body2">
                        {charge.dueDate}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.chargeDate && (
                    <TableCell>
                      <Typography variant="body2">
                        {charge.chargeDate || '-'}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.chargeId && (
                    <TableCell>
                      <Typography variant="body2">
                        {charge.chargeId}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.amount && (
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {formatCurrency(charge.amount)}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleActionMenuOpen(e, charge)}
                    >
                      <Iconify icon={"eva:more-vertical-fill" as any} />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ 
                    position: 'sticky', 
                    right: 0, 
                    bgcolor: 'background.paper', 
                    zIndex: 1,
                    borderLeft: '1px solid',
                    borderColor: 'divider'
                  }}>
                    {/* Empty cell for sticky settings column */}
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

      {/* Add/Edit Transaction Sidebar */}
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
            {isEditMode ? 'Edit transaction' : 'Add transaction'}
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <Iconify icon={"eva:close-fill" as any} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Type*</InputLabel>
            <Select 
              label="Type*" 
              defaultValue="charge"
              disabled={isEditMode}
            >
              <MenuItem value="charge">Charge</MenuItem>
              <MenuItem value="refund">Refund</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Name*"
            placeholder="Manual charge"
            defaultValue={isEditMode ? selectedCharge?.chargeName : 'Manual charge'}
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            placeholder="Enter description..."
            defaultValue={isEditMode ? selectedCharge?.description : ''}
          />

          <FormControl fullWidth>
            <InputLabel>Reservation*</InputLabel>
            <Select label="Reservation*">
              <MenuItem value="res-1">Alexandre Vilmet (47409150)</MenuItem>
              <MenuItem value="res-2">Stephanie Macias (372243)</MenuItem>
              <MenuItem value="res-3">zheng wei (385794)</MenuItem>
              <MenuItem value="res-4">Maddalena (305034)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Charge amount*"
            type="number"
            placeholder="0.00"
            defaultValue={isEditMode ? selectedCharge?.amount : ''}
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
          />

          <FormControl fullWidth>
            <InputLabel>Payment method*</InputLabel>
            <Select label="Payment method*">
              <MenuItem value="stripe">Stripe</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
              <MenuItem value="bank-transfer">Bank Transfer</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Status*</InputLabel>
            <Select label="Status*" defaultValue="due">
              <MenuItem value="due">Due</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Schedule charge
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" size="small">Register now</Button>
              <Button variant="outlined" size="small">On date</Button>
              <Button variant="outlined" size="small">On event</Button>
            </Box>
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
              onClick={() => handleSaveCharge({})}
              sx={{ bgcolor: 'success.main', '&:hover': { bgcolor: 'success.dark' } }}
            >
              {isEditMode ? 'Update charge' : 'Add charge'}
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

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={() => handleEditCharge(selectedCharge)}>
          <Iconify icon={"eva:edit-fill" as any} sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:link-fill" as any} sx={{ mr: 1 }} />
          Send payment link
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:copy-fill" as any} sx={{ mr: 1 }} />
          Copy payment link
        </MenuItem>
        <MenuItem onClick={handleRetryCharge}>
          <Iconify icon={"eva:refresh-fill" as any} sx={{ mr: 1 }} />
          Retry
        </MenuItem>
        <MenuItem onClick={handleCancelCharge}>
          <Iconify icon={"eva:close-circle-fill" as any} sx={{ mr: 1 }} />
          Cancel
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:download-fill" as any} sx={{ mr: 1 }} />
          Download receipt
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:external-link-fill" as any} sx={{ mr: 1 }} />
          View in Stripe
        </MenuItem>
      </Menu>

      {/* Settings Menu */}
      <Menu
        anchorEl={settingsMenuAnchor}
        open={Boolean(settingsMenuAnchor)}
        onClose={handleSettingsMenuClose}
      >
        <MenuItem onClick={() => handleColumnToggle('guestName')}>
          <Iconify icon={visibleColumns.guestName ? "eva:eye-fill" : "eva:eye-off-fill" as any} sx={{ mr: 1 }} />
          Guest name
        </MenuItem>
        <MenuItem onClick={() => handleColumnToggle('listing')}>
          <Iconify icon={visibleColumns.listing ? "eva:eye-fill" : "eva:eye-off-fill" as any} sx={{ mr: 1 }} />
          Listing
        </MenuItem>
        <MenuItem onClick={() => handleColumnToggle('reservationCheckIn')}>
          <Iconify icon={visibleColumns.reservationCheckIn ? "eva:eye-fill" : "eva:eye-off-fill" as any} sx={{ mr: 1 }} />
          Reservation check-in
        </MenuItem>
        <MenuItem onClick={() => handleColumnToggle('reservationCheckOut')}>
          <Iconify icon={visibleColumns.reservationCheckOut ? "eva:eye-fill" : "eva:eye-off-fill" as any} sx={{ mr: 1 }} />
          Reservation check-out
        </MenuItem>
        <MenuItem onClick={() => handleColumnToggle('type')}>
          <Iconify icon={visibleColumns.type ? "eva:eye-fill" : "eva:eye-off-fill" as any} sx={{ mr: 1 }} />
          Type
        </MenuItem>
        <MenuItem onClick={() => handleColumnToggle('chargeName')}>
          <Iconify icon={visibleColumns.chargeName ? "eva:eye-fill" : "eva:eye-off-fill" as any} sx={{ mr: 1 }} />
          Charge name
        </MenuItem>
        <MenuItem onClick={() => handleColumnToggle('status')}>
          <Iconify icon={visibleColumns.status ? "eva:eye-fill" : "eva:eye-off-fill" as any} sx={{ mr: 1 }} />
          Status
        </MenuItem>
        <MenuItem onClick={() => handleColumnToggle('dueDate')}>
          <Iconify icon={visibleColumns.dueDate ? "eva:eye-fill" : "eva:eye-off-fill" as any} sx={{ mr: 1 }} />
          Due date
        </MenuItem>
        <MenuItem onClick={() => handleColumnToggle('chargeDate')}>
          <Iconify icon={visibleColumns.chargeDate ? "eva:eye-fill" : "eva:eye-off-fill" as any} sx={{ mr: 1 }} />
          Charge date
        </MenuItem>
        <MenuItem onClick={() => handleColumnToggle('chargeId')}>
          <Iconify icon={visibleColumns.chargeId ? "eva:eye-fill" : "eva:eye-off-fill" as any} sx={{ mr: 1 }} />
          Charge ID
        </MenuItem>
        <MenuItem onClick={() => handleColumnToggle('amount')}>
          <Iconify icon={visibleColumns.amount ? "eva:eye-fill" : "eva:eye-off-fill" as any} sx={{ mr: 1 }} />
          Amount
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}
