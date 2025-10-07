import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for payment methods
const mockPaymentMethods = [
  {
    id: 1,
    name: 'Credit Card Auto-Pay',
    type: 'Credit Card',
    status: 'Active',
    lastUsed: '2024-02-15',
  },
  {
    id: 2,
    name: 'Bank Transfer',
    type: 'Bank Transfer',
    status: 'Active',
    lastUsed: '2024-02-10',
  },
  {
    id: 3,
    name: 'PayPal Auto',
    type: 'PayPal',
    status: 'Inactive',
    lastUsed: '2024-01-20',
  },
  {
    id: 4,
    name: 'Stripe Payment',
    type: 'Stripe',
    status: 'Active',
    lastUsed: '2024-02-12',
  },
];

// Mock data for listings
const mockListings = [
  {
    id: 1,
    name: 'Villa Del Sol',
    image: '/assets/images/cover/cover-1.webp',
    type: 'Villa',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Navigli Apartment',
    image: '/assets/images/cover/cover-2.webp',
    type: 'Apartment',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Polacchi42',
    image: '/assets/images/cover/cover-3.webp',
    type: 'Studio',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Superattico - Via Del C...',
    image: '/assets/images/cover/cover-4.webp',
    type: 'Penthouse',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Milan City Center',
    image: '/assets/images/cover/cover-5.webp',
    type: 'Apartment',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Lake View Villa',
    image: '/assets/images/cover/cover-6.webp',
    type: 'Villa',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Historic Center Loft',
    image: '/assets/images/cover/cover-7.webp',
    type: 'Loft',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Modern Studio',
    image: '/assets/images/cover/cover-8.webp',
    type: 'Studio',
    status: 'Active',
  },
  {
    id: 9,
    name: 'Garden Apartment',
    image: '/assets/images/cover/cover-9.webp',
    type: 'Apartment',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Luxury Penthouse',
    image: '/assets/images/cover/cover-10.webp',
    type: 'Penthouse',
    status: 'Active',
  },
  {
    id: 11,
    name: 'Cozy Cottage',
    image: '/assets/images/cover/cover-11.webp',
    type: 'Cottage',
    status: 'Active',
  },
  {
    id: 12,
    name: 'Business Hotel',
    image: '/assets/images/cover/cover-12.webp',
    type: 'Hotel',
    status: 'Active',
  },
];

export function AutoPaymentsView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(12);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [autoCharges, setAutoCharges] = useState({
    type: '',
    title: '',
    method: '',
    amount: '',
    scheduleBy: '',
    reservationCreation: '',
  });
  const [applyForNewListings, setApplyForNewListings] = useState(false);
  const [selectedListings, setSelectedListings] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/guest-payments/charges');
    if (newValue === 2) router.push('/guest-payments/document-templates');
  };

  const handleChannelChange = (event: any) => {
    setSelectedChannels(event.target.value);
  };

  const handleListingToggle = (listingId: number) => {
    setSelectedListings(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };


  const totalPages = Math.ceil(mockListings.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = mockListings.slice(startIndex, endIndex);

  const filteredListings = currentListings.filter(listing =>
    listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Guest Payments
        </Typography>

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

      <Grid container spacing={3}>
        {/* Left Sidebar - Payment Methods */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2, height: 'fit-content' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Payment Methods
              </Typography>
              <Button
                variant="contained"
                size="small"
                startIcon={<Iconify icon={"eva:plus-fill" as any} />}
              >
                Add Auto Payment
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {mockPaymentMethods.map((method) => (
                <Card
                  key={method.id}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: selectedPaymentMethod === method.id ? 2 : 1,
                    borderColor: selectedPaymentMethod === method.id ? 'primary.main' : 'grey.200',
                    '&:hover': {
                      boxShadow: 2,
                    },
                  }}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {method.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {method.type}
                      </Typography>
                    </Box>
                    <Chip
                      label={method.status}
                      size="small"
                      color={method.status === 'Active' ? 'success' : 'default'}
                    />
                  </Box>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right Content Area */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            {/* Header with Action Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Payment Method Configuration
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" color="error">
                  <Iconify icon={"eva:trash-2-fill" as any} sx={{ mr: 1 }} />
                  Delete
                </Button>
                <Button variant="outlined">
                  <Iconify icon={"eva:close-fill" as any} sx={{ mr: 1 }} />
                  Discard Changes
                </Button>
                <Button variant="contained">
                  <Iconify icon={"eva:checkmark-fill" as any} sx={{ mr: 1 }} />
                  Save
                </Button>
              </Box>
            </Box>

            {/* Channel Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Channel
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Select Channels</InputLabel>
                <Select
                  multiple
                  value={selectedChannels}
                  onChange={handleChannelChange}
                  label="Select Channels"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="airbnb">Airbnb</MenuItem>
                  <MenuItem value="booking">Booking.com</MenuItem>
                  <MenuItem value="direct">Direct</MenuItem>
                  <MenuItem value="vrbo">VRBO</MenuItem>
                  <MenuItem value="expedia">Expedia</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Auto Charges Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Auto Charges
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={autoCharges.type}
                      onChange={(e) => setAutoCharges(prev => ({ ...prev, type: e.target.value }))}
                      label="Type"
                    >
                      <MenuItem value="accommodation">Accommodation</MenuItem>
                      <MenuItem value="security-deposit">Security Deposit</MenuItem>
                      <MenuItem value="cleaning-fee">Cleaning Fee</MenuItem>
                      <MenuItem value="additional-services">Additional Services</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={autoCharges.title}
                    onChange={(e) => setAutoCharges(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter charge title..."
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Method</InputLabel>
                    <Select
                      value={autoCharges.method}
                      onChange={(e) => setAutoCharges(prev => ({ ...prev, method: e.target.value }))}
                      label="Method"
                    >
                      <MenuItem value="credit-card">Credit Card</MenuItem>
                      <MenuItem value="bank-transfer">Bank Transfer</MenuItem>
                      <MenuItem value="paypal">PayPal</MenuItem>
                      <MenuItem value="stripe">Stripe</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={autoCharges.amount}
                    onChange={(e) => setAutoCharges(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0.00"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Schedule By</InputLabel>
                    <Select
                      value={autoCharges.scheduleBy}
                      onChange={(e) => setAutoCharges(prev => ({ ...prev, scheduleBy: e.target.value }))}
                      label="Schedule By"
                    >
                      <MenuItem value="check-in">Check-in</MenuItem>
                      <MenuItem value="check-out">Check-out</MenuItem>
                      <MenuItem value="booking-confirmation">Booking Confirmation</MenuItem>
                      <MenuItem value="custom">Custom</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Reservation Creation</InputLabel>
                    <Select
                      value={autoCharges.reservationCreation}
                      onChange={(e) => setAutoCharges(prev => ({ ...prev, reservationCreation: e.target.value }))}
                      label="Reservation Creation"
                    >
                      <MenuItem value="immediate">Immediate</MenuItem>
                      <MenuItem value="24-hours">24 Hours</MenuItem>
                      <MenuItem value="48-hours">48 Hours</MenuItem>
                      <MenuItem value="1-week">1 Week</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* Listings Section */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Listings
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={applyForNewListings}
                      onChange={(e) => setApplyForNewListings(e.target.checked)}
                    />
                  }
                  label="Apply for new listings automatically"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon={"eva:search-fill" as any} />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Type</InputLabel>
                  <Select label="Type">
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="villa">Villa</MenuItem>
                    <MenuItem value="apartment">Apartment</MenuItem>
                    <MenuItem value="studio">Studio</MenuItem>
                    <MenuItem value="penthouse">Penthouse</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Select Tags</InputLabel>
                  <Select 
                    label="Select Tags" 
                    multiple
                    value={[]}
                    onChange={() => {}}
                  >
                    <MenuItem value="luxury">Luxury</MenuItem>
                    <MenuItem value="budget">Budget</MenuItem>
                    <MenuItem value="family">Family</MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Available Listings Grid */}
              <Grid container spacing={2}>
                {filteredListings.map((listing) => (
                  <Grid key={listing.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                      sx={{
                        p: 2,
                        border: selectedListings.includes(listing.id) ? 2 : 1,
                        borderColor: selectedListings.includes(listing.id) ? 'primary.main' : 'grey.200',
                        cursor: 'pointer',
                        '&:hover': {
                          boxShadow: 2,
                        },
                      }}
                      onClick={() => handleListingToggle(listing.id)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Checkbox
                          checked={selectedListings.includes(listing.id)}
                          onChange={() => handleListingToggle(listing.id)}
                        />
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1,
                            bgcolor: 'grey.200',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Iconify icon={"eva:home-fill" as any} width={20} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {listing.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {listing.type}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Showing {startIndex + 1}-{Math.min(endIndex, mockListings.length)} of {mockListings.length}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      disabled={currentPage === 0}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                      <Iconify icon={"eva:arrow-back-fill" as any} />
                    </Button>
                    <Button
                      size="small"
                      disabled={currentPage >= totalPages - 1}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                      <Iconify icon={"eva:arrow-forward-fill" as any} />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
