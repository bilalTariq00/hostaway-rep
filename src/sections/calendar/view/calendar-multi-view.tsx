import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { CalendarGrid } from '../components/calendar-grid';
import { ManageDatesModal } from '../components/manage-dates-modal';
import { BookingDetailsModal } from '../components/booking-details-modal';

// Mock data for listings
const mockListings = [
  { id: 1, name: 'Cozy Downtown Apartment', price: 120, bookings: 15 },
  { id: 2, name: 'Beach House Villa', price: 250, bookings: 8 },
  { id: 3, name: 'Mountain Cabin Retreat', price: 180, bookings: 12 },
  { id: 4, name: 'City Center Loft', price: 95, bookings: 20 },
];

// Mock data for calendar bookings
const mockBookings = [
  {
    id: 1,
    listingId: 1,
    date: '2024-01-15',
    guests: 2,
    price: 120,
    status: 'confirmed',
    source: 'Airbnb',
    checkIn: '2024-01-15',
    checkOut: '2024-01-17',
    nights: 2,
    commission: 12,
    payout: 108,
  },
  {
    id: 2,
    listingId: 2,
    date: '2024-01-20',
    guests: 4,
    price: 250,
    status: 'confirmed',
    source: 'Booking.com',
    checkIn: '2024-01-20',
    checkOut: '2024-01-25',
    nights: 5,
    commission: 25,
    payout: 225,
  },
];

export function CalendarMultiView() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedDates, setSelectedDates] = useState<any>(null);
  const [searchAnchor, setSearchAnchor] = useState<null | HTMLElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'grid' | 'list'>('grid');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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

  const handleSearchClick = (event: React.MouseEvent<HTMLElement>) => {
    setSearchAnchor(event.currentTarget);
  };

  const handleSearchClose = () => {
    setSearchAnchor(null);
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
          <Button variant="contained" size="small">
            Available Listing
          </Button>
          
          <Chip label="All Properties" variant="outlined" />
          <Chip label="Confirmed" variant="outlined" />
          <Chip label="Pending" variant="outlined" />
          <Chip label="Cancelled" variant="outlined" />
          
          <Box sx={{ flexGrow: 1 }} />
          
          <TextField
            size="small"
            placeholder="Search..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchClick} size="small">
                    <Iconify icon={"eva:arrow-down-fill" as any} width={16} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />
          
          <Typography variant="body2" color="text.secondary">
            (24)
          </Typography>
        </Box>

        <Menu
          anchorEl={searchAnchor}
          open={Boolean(searchAnchor)}
          onClose={handleSearchClose}
        >
          <MenuItem>All Listings</MenuItem>
          <MenuItem>Available Only</MenuItem>
          <MenuItem>Booked Only</MenuItem>
          <MenuItem>Custom Filter</MenuItem>
        </Menu>
      </Paper>

      {/* Calendar Controls */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="outlined" size="small">
              Today
            </Button>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={() => navigateYear('prev')} size="small">
                <Iconify icon={"eva:arrow-left-fill" as any} width={16} />
              </IconButton>
              <Typography variant="h6" sx={{ minWidth: 120, textAlign: 'center' }}>
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </Typography>
              <IconButton onClick={() => navigateYear('next')} size="small">
                <Iconify icon={"eva:arrow-right-fill" as any} width={16} />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={() => navigateMonth('prev')} size="small">
                <Iconify icon={"eva:arrow-left-fill" as any} width={16} />
              </IconButton>
              <Typography variant="body1">
                {currentMonth.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
              </Typography>
              <IconButton onClick={() => navigateMonth('next')} size="small">
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
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Listings ({mockListings.length})
            </Typography>
            
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Show per page:
              </Typography>
              <Chip label="50" size="small" />
            </Box>
            
            {mockListings.map((listing) => (
              <Box
                key={listing.id}
                sx={{
                  p: 2,
                  mb: 1,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {listing.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${listing.price}/night • {listing.bookings} bookings
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
