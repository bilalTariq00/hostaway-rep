import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { CalendarGrid } from '../components/calendar-grid';
import { ManageDatesModal } from '../components/manage-dates-modal';
import { BookingDetailsModal } from '../components/booking-details-modal';

// Mock data for listings
const mockListings = [
  { id: 305034, name: 'La Dimora Del Cavaliere', price: 75, bookings: 15 },
  { id: 305035, name: 'Navigli', price: 135, bookings: 8 },
  { id: 305225, name: 'Polacchi42', price: 120, bookings: 12 },
  { id: 305421, name: 'Superattico - Via Del C...', price: 200, bookings: 20 },
  { id: 306532, name: 'Montecatini Terme', price: 90, bookings: 10 },
  { id: 308582, name: 'Monteverde - Quattrov...', price: 150, bookings: 18 },
];

// Mock data for calendar bookings
const mockBookings = [
  {
    id: 1,
    listingId: 305034,
    date: '2024-10-06',
    guests: 6,
    price: 75,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Zhanna Badytsia',
    checkIn: '2024-10-06',
    checkOut: '2024-10-08',
    nights: 2,
    commission: 7.5,
    payout: 67.5,
  },
  {
    id: 2,
    listingId: 305035,
    date: '2024-10-06',
    guests: 2,
    price: 135,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Mikhail Trofimov Elizaveta T...',
    checkIn: '2024-10-06',
    checkOut: '2024-10-10',
    nights: 4,
    commission: 13.5,
    payout: 121.5,
  },
  {
    id: 3,
    listingId: 305421,
    date: '2024-10-07',
    guests: 3,
    price: 200,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Fang Lin',
    checkIn: '2024-10-07',
    checkOut: '2024-10-09',
    nights: 2,
    commission: 20,
    payout: 180,
  },
  {
    id: 4,
    listingId: 305035,
    date: '2024-10-12',
    guests: 2,
    price: 135,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Javier Merlo Vinas',
    checkIn: '2024-10-12',
    checkOut: '2024-10-14',
    nights: 2,
    commission: 13.5,
    payout: 121.5,
  },
];

export function CalendarMultiView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedDates, setSelectedDates] = useState<any>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'grid' | 'list'>('grid');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) router.push('/calendar/monthly');
    if (newValue === 2) router.push('/calendar/yearly');
  };

  const handleBookingClick = (booking: any) => {
    setSelectedBooking(booking);
  };

  const handleDateClick = (date: string, listingId: number) => {
    // Check if date is booked
    const booking = mockBookings.find(b => b.date === date && b.listingId === listingId);
    if (booking) {
      handleBookingClick(booking);
    } else {
      setSelectedDates({ date, listingId });
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    const newYear = new Date(currentMonth);
    if (direction === 'prev') {
      newYear.setFullYear(newYear.getFullYear() - 1);
    } else {
      newYear.setFullYear(newYear.getFullYear() + 1);
    }
    setCurrentMonth(newYear);
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Calendar
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" sx={{ mr: 1 }}>
              Available Properties
            </Button>
            <Button variant="contained" sx={{ mr: 1 }}>
              Listing
            </Button>
            <Button variant="contained">
              Direct Booking
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
              backgroundColor: 'primary.main',
              height: 3,
            },
          }}
        >
          <Tab label="Multi" />
          <Tab label="Monthly" />
          <Tab label="Yearly" />
        </Tabs>
      </Box>

      {/* Filters and Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Button 
            variant="contained" 
            size="small"
            sx={{ 
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            Available listings
          </Button>
          
          <Button variant="outlined" size="small">
            Tags
          </Button>
          
          <TextField
            select
            size="small"
            defaultValue="Country"
            sx={{ minWidth: 120 }}
            SelectProps={{ native: true }}
          >
            <option>Country</option>
            <option>Italy</option>
            <option>Spain</option>
            <option>France</option>
          </TextField>
          
          <TextField
            select
            size="small"
            defaultValue="City"
            sx={{ minWidth: 120 }}
            SelectProps={{ native: true }}
          >
            <option>City</option>
            <option>Rome</option>
            <option>Milan</option>
            <option>Florence</option>
          </TextField>
          
          <TextField
            select
            size="small"
            defaultValue="All units"
            sx={{ minWidth: 120 }}
            SelectProps={{ native: true }}
          >
            <option>All units</option>
            <option>Apartments</option>
            <option>Houses</option>
            <option>Villas</option>
          </TextField>
          
          <Button variant="outlined" size="small">
            Show (2)
          </Button>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <TextField
            size="small"
            placeholder="Search by listing"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={"eva:search-fill" as any} width={16} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />
        </Box>
      </Paper>

      {/* Calendar Controls */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              size="small"
              sx={{ 
                bgcolor: 'success.main',
                color: 'white',
                '&:hover': { bgcolor: 'success.dark' }
              }}
            >
              &lt; Today &gt;
            </Button>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={() => navigateMonth('prev')} size="small">
                <Iconify icon={"eva:arrow-left-fill" as any} width={16} />
              </IconButton>
              <Typography variant="h6" sx={{ minWidth: 100, textAlign: 'center', fontWeight: 600 }}>
                Oct 25
              </Typography>
              <IconButton onClick={() => navigateMonth('next')} size="small">
                <Iconify icon={"eva:arrow-right-fill" as any} width={16} />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={() => navigateYear('prev')} size="small">
                <Iconify icon={"eva:arrow-left-fill" as any} width={16} />
              </IconButton>
              <IconButton onClick={() => navigateYear('next')} size="small">
                <Iconify icon={"eva:arrow-right-fill" as any} width={16} />
              </IconButton>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setCalendarView('grid')}
              color={calendarView === 'grid' ? 'primary' : 'default'}
            >
              <Iconify icon={"eva:grid-fill" as any} width={20} />
            </IconButton>
            <IconButton
              onClick={() => setCalendarView('list')}
              color={calendarView === 'list' ? 'primary' : 'default'}
            >
              <Iconify icon={"eva:list-fill" as any} width={20} />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Main Calendar Content */}
      <Grid container spacing={3}>
        {/* Left Side - Listings */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2, height: '100%', bgcolor: 'grey.50' }}>
            {mockListings.map((listing) => (
              <Box
                key={listing.id}
                sx={{
                  p: 2,
                  mb: 1,
                  bgcolor: 'white',
                  borderRadius: 2,
                  border: 1,
                  borderColor: 'grey.200',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'grey.50',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                  {listing.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ({listing.id})
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Right Side - Calendar Grid */}
        <Grid size={{ xs: 12, md: 8 }}>
          <CalendarGrid
            currentMonth={currentMonth}
            listings={mockListings}
            bookings={mockBookings}
            onBookingClick={handleBookingClick}
            onDateClick={handleDateClick}
            view={calendarView}
          />
        </Grid>
      </Grid>

      {/* Modals */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          open={Boolean(selectedBooking)}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      {selectedDates && (
        <ManageDatesModal
          dates={selectedDates}
          open={Boolean(selectedDates)}
          onClose={() => setSelectedDates(null)}
        />
      )}
    </DashboardContent>
  );
}
