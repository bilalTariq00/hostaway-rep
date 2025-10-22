import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for auto-payments
const mockAutoPayments = [
  {
    id: 1,
    title: 'VRBO | PAGINA WEB',
    channels: ['Vrbo', 'Booking Engine'],
    autoCharges: [
      {
        id: 1,
        type: 'Charge',
        title: 'Prenotazione Web | VRB',
        method: 'Credit card',
        amount: 100,
        amountType: '%',
        scheduledBy: 'At',
        reservationEvent: 'Reservation creation',
      },
    ],
    applyForNewListings: true,
    selectedListings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    status: 'Active',
    createdAt: '2024-02-15',
  },
  {
    id: 2,
    title: 'Airbnb | Direct Booking',
    channels: ['Airbnb'],
    autoCharges: [
      {
        id: 2,
        type: 'Charge',
        title: 'Security Deposit',
        method: 'Credit card',
        amount: 200,
        amountType: '€',
        scheduledBy: 'At',
        reservationEvent: 'Check-in',
      },
    ],
    applyForNewListings: false,
    selectedListings: [1, 3, 5],
    status: 'Active',
    createdAt: '2024-02-10',
  },
];

// Mock data for listings matching the image
const mockListings = [
  {
    id: 1,
    name: 'La Dimora Del Cavaliere',
    listingId: '305034',
    image: '/assets/images/cover/cover-1.webp',
    type: 'Villa',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Navigli',
    listingId: '305035',
    image: '/assets/images/cover/cover-2.webp',
    type: 'Apartment',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Polacchi42',
    listingId: '305225',
    image: '/assets/images/cover/cover-3.webp',
    type: 'Studio',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Superattico - Via Del Corso 43',
    listingId: '305421',
    image: '/assets/images/cover/cover-4.webp',
    type: 'Penthouse',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Montecatini Terme',
    listingId: '306532',
    image: '/assets/images/cover/cover-5.webp',
    type: 'Apartment',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Monteverde - Quattroventi',
    listingId: '308582',
    image: '/assets/images/cover/cover-6.webp',
    type: 'Villa',
    status: 'Active',
  },
  {
    id: 7,
    name: 'La Storta',
    listingId: '310867',
    image: '/assets/images/cover/cover-7.webp',
    type: 'Loft',
    status: 'Active',
  },
  {
    id: 8,
    name: '[5 Min From Trastevere] Chic Apt',
    listingId: '317154',
    image: '/assets/images/cover/cover-8.webp',
    type: 'Studio',
    status: 'Active',
  },
  {
    id: 9,
    name: 'Via Poggio Tulliano',
    listingId: '332386',
    image: '/assets/images/cover/cover-9.webp',
    type: 'Apartment',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Via Dei Marruccini | San Lorenzo',
    listingId: '345603',
    image: '/assets/images/cover/cover-10.webp',
    type: 'Penthouse',
    status: 'Active',
  },
  {
    id: 11,
    name: 'Via di Acqua Bullicante 113',
    listingId: '363365',
    image: '/assets/images/cover/cover-11.webp',
    type: 'Cottage',
    status: 'Active',
  },
  {
    id: 12,
    name: 'Via Matera 23A',
    listingId: '363366',
    image: '/assets/images/cover/cover-12.webp',
    type: 'Hotel',
    status: 'Active',
  },
];

export function AutoPaymentsView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [autoPayments, setAutoPayments] = useState(mockAutoPayments);
  const [selectedAutoPayment, setSelectedAutoPayment] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(12);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    channels: [] as string[],
    autoCharges: [] as any[],
    applyForNewListings: false,
    selectedListings: [] as number[],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/guest-payments/charges');
    if (newValue === 2) router.push('/guest-payments/document-templates');
  };

  const handleAddAutoPayment = () => {
    setSelectedAutoPayment(null);
    setIsEditMode(false);
    setFormData({
      title: '',
      channels: [],
      autoCharges: [],
      applyForNewListings: false,
      selectedListings: [],
    });
  };

  const handleEditAutoPayment = (autoPayment: any) => {
    setSelectedAutoPayment(autoPayment);
    setIsEditMode(true);
    setFormData({
      title: autoPayment.title,
      channels: autoPayment.channels,
      autoCharges: autoPayment.autoCharges,
      applyForNewListings: autoPayment.applyForNewListings,
      selectedListings: autoPayment.selectedListings,
    });
  };

  const handleSaveAutoPayment = () => {
    if (isEditMode && selectedAutoPayment) {
      // Update existing
      setAutoPayments((prev) =>
        prev.map((ap) => (ap.id === selectedAutoPayment.id ? { ...ap, ...formData } : ap))
      );
    } else {
      // Add new
      const newAutoPayment = {
        id: Date.now(),
        ...formData,
        status: 'Active',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setAutoPayments((prev) => [...prev, newAutoPayment]);
    }
    handleAddAutoPayment(); // Reset form
  };

  const handleDeleteAutoPayment = () => {
    if (selectedAutoPayment) {
      setAutoPayments((prev) => prev.filter((ap) => ap.id !== selectedAutoPayment.id));
      handleAddAutoPayment(); // Reset form
    }
  };

  const handleAddAutoCharge = () => {
    const newCharge = {
      id: Date.now(),
      type: 'Charge',
      title: '',
      method: 'Credit card',
      amount: 0,
      amountType: '%',
      scheduledBy: 'At',
      reservationEvent: 'Reservation creation',
    };
    setFormData((prev) => ({
      ...prev,
      autoCharges: [...prev.autoCharges, newCharge],
    }));
  };

  const handleRemoveAutoCharge = (chargeId: number) => {
    setFormData((prev) => ({
      ...prev,
      autoCharges: prev.autoCharges.filter((charge) => charge.id !== chargeId),
    }));
  };

  const handleAutoChargeChange = (chargeId: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      autoCharges: prev.autoCharges.map((charge) =>
        charge.id === chargeId ? { ...charge, [field]: value } : charge
      ),
    }));
  };

  const handleChannelChange = (event: any) => {
    setFormData((prev) => ({ ...prev, channels: event.target.value }));
  };

  const handleListingToggle = (listingId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedListings: prev.selectedListings.includes(listingId)
        ? prev.selectedListings.filter((id) => id !== listingId)
        : [...prev.selectedListings, listingId],
    }));
  };

  const handleUnselectAllListings = () => {
    setFormData((prev) => ({ ...prev, selectedListings: [] }));
  };

  const totalPages = Math.ceil(mockListings.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = mockListings.slice(startIndex, endIndex);

  const filteredListings = currentListings.filter(
    (listing) =>
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.listingId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'Vrbo':
        return '#FF5A5F';
      case 'Booking Engine':
        return '#FFD700';
      case 'Airbnb':
        return '#FF5A5F';
      case 'Direct':
        return '#00C853';
      default:
        return '#9E9E9E';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Vrbo':
        return 'W';
      case 'Booking Engine':
        return 'B';
      case 'Airbnb':
        return 'A';
      case 'Direct':
        return 'D';
      default:
        return '?';
    }
  };

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
          <Tab label="Auto-payments" />
          <Tab label="Document Templates" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {/* Left Sidebar - Auto Payments List */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2, height: 'fit-content' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Auto Payments
              </Typography>
              <Button
                variant="contained"
                size="small"
                startIcon={<Iconify icon={'eva:plus-fill' as any} />}
                onClick={handleAddAutoPayment}
                sx={{ bgcolor: 'primary.main' }}
              >
                Add auto-payment
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {autoPayments.map((autoPayment) => (
                <Card
                  key={autoPayment.id}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: selectedAutoPayment?.id === autoPayment.id ? 2 : 1,
                    borderColor:
                      selectedAutoPayment?.id === autoPayment.id ? 'primary.main' : 'grey.200',
                    '&:hover': {
                      boxShadow: 2,
                    },
                  }}
                  onClick={() => handleEditAutoPayment(autoPayment)}
                >
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                        {autoPayment.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5 }}>
                        {autoPayment.channels.map((channel: string, index: number) => (
                          <Box
                            key={index}
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: '50%',
                              bgcolor: getChannelColor(channel),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '0.6rem',
                              fontWeight: 600,
                            }}
                          >
                            {getChannelIcon(channel)}
                          </Box>
                        ))}
                        {autoPayment.channels.length > 2 && (
                          <Typography variant="caption" sx={{ ml: 0.5 }}>
                            +{autoPayment.channels.length - 2}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Chip
                      label={autoPayment.status}
                      size="small"
                      color={autoPayment.status === 'Active' ? 'success' : 'default'}
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
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {isEditMode ? formData.title || 'Edit Auto Payment' : 'Create Auto Payment'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteAutoPayment}
                  disabled={!isEditMode}
                >
                  Delete
                </Button>
                <Button variant="outlined" onClick={handleAddAutoPayment}>
                  Discard changes
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSaveAutoPayment}
                  sx={{ bgcolor: 'primary.main' }}
                >
                  Save
                </Button>
              </Box>
            </Box>

            {/* Title Field */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Title *"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter auto payment title..."
              />
            </Box>

            {/* Channels Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Channels
                </Typography>
                <Tooltip title="Select channels for this auto payment">
                  <Iconify icon={'eva:info-fill' as any} width={16} />
                </Tooltip>
              </Box>
              <FormControl fullWidth>
                <InputLabel>Select Channels</InputLabel>
                <Select
                  multiple
                  value={formData.channels}
                  onChange={handleChannelChange}
                  label="Select Channels"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Box key={value} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              bgcolor: getChannelColor(value),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '0.5rem',
                              fontWeight: 600,
                            }}
                          >
                            {getChannelIcon(value)}
                          </Box>
                          <Chip
                            label={value}
                            size="small"
                            onDelete={() =>
                              setFormData((prev) => ({
                                ...prev,
                                channels: prev.channels.filter((c) => c !== value),
                              }))
                            }
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="Vrbo">Vrbo</MenuItem>
                  <MenuItem value="Booking Engine">Booking Engine</MenuItem>
                  <MenuItem value="Airbnb">Airbnb</MenuItem>
                  <MenuItem value="Direct">Direct</MenuItem>
                  <MenuItem value="Expedia">Expedia</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Auto Charges Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Auto charges
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Auto-payment consists of auto charges and pre authorisations. Add them and build
                suitable payment plan for your guests. Depending on the setup and reservation time,
                we merge several payments into one. The reservation&apos;s currency will be used.
              </Typography>

              {/* Auto Charges Table */}
              <Box sx={{ mb: 2 }}>
                {formData.autoCharges.map((charge) => (
                  <Box
                    key={charge.id}
                    sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}
                  >
                    <FormControl sx={{ minWidth: 120 }}>
                      <Select
                        value={charge.type}
                        onChange={(e) => handleAutoChargeChange(charge.id, 'type', e.target.value)}
                      >
                        <MenuItem value="Charge">Charge</MenuItem>
                        <MenuItem value="Refund">Refund</MenuItem>
                        <MenuItem value="Deposit">Deposit</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      placeholder="Title"
                      value={charge.title}
                      onChange={(e) => handleAutoChargeChange(charge.id, 'title', e.target.value)}
                      sx={{ minWidth: 200 }}
                    />

                    <FormControl sx={{ minWidth: 150 }}>
                      <Select
                        value={charge.method}
                        onChange={(e) =>
                          handleAutoChargeChange(charge.id, 'method', e.target.value)
                        }
                      >
                        <MenuItem value="Credit card">Credit card</MenuItem>
                        <MenuItem value="Bank transfer">Bank transfer</MenuItem>
                        <MenuItem value="PayPal">PayPal</MenuItem>
                        <MenuItem value="Stripe">Stripe</MenuItem>
                      </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TextField
                        type="number"
                        value={charge.amount}
                        onChange={(e) =>
                          handleAutoChargeChange(charge.id, 'amount', e.target.value)
                        }
                        sx={{ width: 80 }}
                      />
                      <FormControl sx={{ minWidth: 60 }}>
                        <Select
                          value={charge.amountType}
                          onChange={(e) =>
                            handleAutoChargeChange(charge.id, 'amountType', e.target.value)
                          }
                        >
                          <MenuItem value="%">%</MenuItem>
                          <MenuItem value="€">€</MenuItem>
                          <MenuItem value="$">$</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <FormControl sx={{ minWidth: 80 }}>
                      <Select
                        value={charge.scheduledBy}
                        onChange={(e) =>
                          handleAutoChargeChange(charge.id, 'scheduledBy', e.target.value)
                        }
                      >
                        <MenuItem value="At">At</MenuItem>
                        <MenuItem value="Before">Before</MenuItem>
                        <MenuItem value="After">After</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 150 }}>
                      <Select
                        value={charge.reservationEvent}
                        onChange={(e) =>
                          handleAutoChargeChange(charge.id, 'reservationEvent', e.target.value)
                        }
                      >
                        <MenuItem value="Reservation creation">Reservation creation</MenuItem>
                        <MenuItem value="Check-in">Check-in</MenuItem>
                        <MenuItem value="Check-out">Check-out</MenuItem>
                        <MenuItem value="Booking confirmation">Booking confirmation</MenuItem>
                      </Select>
                    </FormControl>

                    <IconButton
                      size="small"
                      onClick={() => handleRemoveAutoCharge(charge.id)}
                      color="error"
                    >
                      <Iconify icon={'eva:close-fill' as any} />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill' as any} />}
                onClick={handleAddAutoCharge}
                sx={{ bgcolor: 'primary.main' }}
              >
                Add auto charge
              </Button>
            </Box>

            {/* Listings Section */}
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Listings
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.applyForNewListings}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, applyForNewListings: e.target.checked }))
                      }
                    />
                  }
                  label="Apply for new listings automatically"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  placeholder="Type to search listings"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Select tags</InputLabel>
                  <Select
                    label="Select tags"
                    multiple
                    value={selectedTags}
                    onChange={(e) => setSelectedTags(e.target.value as string[])}
                  >
                    <MenuItem value="luxury">Luxury</MenuItem>
                    <MenuItem value="budget">Budget</MenuItem>
                    <MenuItem value="family">Family</MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  onClick={handleUnselectAllListings}
                  sx={{ minWidth: 120 }}
                >
                  Unselect all
                </Button>
              </Box>

              {/* Listings Grid */}
              <Grid container spacing={2}>
                {filteredListings.map((listing) => (
                  <Grid key={listing.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                      sx={{
                        p: 2,
                        border: formData.selectedListings.includes(listing.id) ? 2 : 1,
                        borderColor: formData.selectedListings.includes(listing.id)
                          ? 'primary.main'
                          : 'grey.200',
                        cursor: 'pointer',
                        position: 'relative',
                        '&:hover': {
                          boxShadow: 2,
                        },
                      }}
                      onClick={() => handleListingToggle(listing.id)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1,
                            bgcolor: 'grey.200',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundImage: `url(${listing.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {listing.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ({listing.listingId})
                          </Typography>
                        </Box>
                      </Box>
                      {formData.selectedListings.includes(listing.id) && (
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            bgcolor: 'success.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Iconify icon={'eva:checkmark-fill' as any} width={12} color="white" />
                        </Box>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button
                    size="small"
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(0)}
                  >
                    FIRST
                  </Button>
                  <Button
                    size="small"
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    <Iconify icon={'eva:arrow-back-fill' as any} />
                  </Button>
                  <Typography variant="body2" sx={{ px: 2 }}>
                    {currentPage + 1} / {totalPages}
                  </Typography>
                  <Button
                    size="small"
                    disabled={currentPage >= totalPages - 1}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    <Iconify icon={'eva:arrow-forward-fill' as any} />
                  </Button>
                  <Button
                    size="small"
                    disabled={currentPage >= totalPages - 1}
                    onClick={() => setCurrentPage(totalPages - 1)}
                  >
                    LAST
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
