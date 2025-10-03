import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for properties
const mockProperties = [
  { id: 1, name: 'Cozy Downtown Apartment', priceEarned: 2400 },
  { id: 2, name: 'Beach House Villa', priceEarned: 5000 },
  { id: 3, name: 'Mountain Cabin Retreat', priceEarned: 3600 },
];

// Mock data for monthly bookings
const mockMonthlyBookings = [
  {
    id: 1,
    date: '2024-01-15',
    source: 'Airbnb',
    price: 120,
    minStay: 2,
    guests: 2,
    status: 'confirmed',
  },
  {
    id: 2,
    date: '2024-01-20',
    source: 'Booking.com',
    price: 250,
    minStay: 3,
    guests: 4,
    status: 'confirmed',
  },
  {
    id: 3,
    date: '2024-01-25',
    source: 'Airbnb',
    price: 180,
    minStay: 1,
    guests: 2,
    status: 'pending',
  },
];

export function CalendarMonthlyView() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [propertyAnchor, setPropertyAnchor] = useState<null | HTMLElement>(null);
  const [upcomingWeeksToggle, setUpcomingWeeksToggle] = useState(false);
  const [filters] = useState(['All Properties', 'Confirmed']);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handlePropertyClick = (event: React.MouseEvent<HTMLElement>) => {
    setPropertyAnchor(event.currentTarget);
  };

  const handlePropertyClose = () => {
    setPropertyAnchor(null);
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

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getBookingForDate = (date: string) => mockMonthlyBookings.find(b => b.date === date);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const isCurrentMonth = (date: Date) => date.getMonth() === currentMonth.getMonth();

  const getBookingColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success.main';
      case 'pending':
        return 'warning.main';
      case 'cancelled':
        return 'error.main';
      default:
        return 'grey.500';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Airbnb':
        return 'logos:airbnb';
      case 'Booking.com':
        return 'logos:booking-dot-com';
      default:
        return 'eva:home-fill';
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Calendar
          </Typography>
          
          {/* Property Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handlePropertyClick}
              endIcon={<Iconify icon={"eva:arrow-down-fill" as any} width={16} />}
            >
              Available Properties
            </Button>
            <Button variant="contained" size="small">
              Listing
            </Button>
            <Button variant="contained" size="small">
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

        <Menu
          anchorEl={propertyAnchor}
          open={Boolean(propertyAnchor)}
          onClose={handlePropertyClose}
        >
          {mockProperties.map((property) => (
            <MenuItem key={property.id} onClick={handlePropertyClose}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {property.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ${property.priceEarned} earned
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Controls */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="outlined" size="small">
              Today
            </Button>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={() => navigateMonth('prev')} size="small">
                <Iconify icon={"eva:arrow-left-fill" as any} width={16} />
              </IconButton>
              <Typography variant="h6" sx={{ minWidth: 120, textAlign: 'center' }}>
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </Typography>
              <IconButton onClick={() => navigateMonth('next')} size="small">
                <Iconify icon={"eva:arrow-right-fill" as any} width={16} />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">Commission Booking</Typography>
            <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 600 }}>
              $1,200
            </Typography>
          </Box>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          {filters.map((filter) => (
            <Chip key={filter} label={filter} variant="outlined" size="small" />
          ))}
          <Button size="small" startIcon={<Iconify icon={"eva:plus-fill" as any} width={16} />}>
            Add Filter
          </Button>
        </Box>

        {/* Upcoming Weeks Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">Calendar</Typography>
          <Switch
            checked={upcomingWeeksToggle}
            onChange={(e) => setUpcomingWeeksToggle(e.target.checked)}
            size="small"
          />
          <Typography variant="body2">Upcoming Weeks</Typography>
        </Box>
      </Paper>

      {/* Calendar Content */}
      {upcomingWeeksToggle ? (
        // Upcoming Weeks View
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upcoming Weeks Availability
          </Typography>
          <Grid container spacing={2}>
            {Array.from({ length: 4 }, (_, i) => {
              const weekStart = new Date();
              weekStart.setDate(weekStart.getDate() + (i * 7));
              
              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                  <Paper sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Week {i + 1}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
                      {new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        label="Available"
                        color="success"
                        size="small"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      ) : (
        // Monthly Calendar View
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Monthly Calendar
          </Typography>
          
          {/* Calendar Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, mb: 1 }}>
            {weekDays.map((day) => (
              <Box key={day} sx={{ p: 1, textAlign: 'center' }}>
                <Typography variant="body2" fontWeight={600}>
                  {day}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
            {calendarDays.map((day) => {
              const dateStr = formatDate(day);
              const booking = getBookingForDate(dateStr);
              const isToday = dateStr === formatDate(new Date());
              
              return (
                <Box
                  key={dateStr}
                  sx={{
                    p: 1,
                    minHeight: 80,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    cursor: 'pointer',
                    bgcolor: booking 
                      ? getBookingColor(booking.status) 
                      : isToday 
                        ? 'action.selected' 
                        : 'transparent',
                    color: booking ? 'white' : 'text.primary',
                    opacity: isCurrentMonth(day) ? 1 : 0.3,
                    '&:hover': {
                      bgcolor: booking 
                        ? getBookingColor(booking.status) 
                        : 'action.hover',
                    },
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: '0.75rem',
                      fontWeight: isToday ? 600 : 400,
                    }}
                  >
                    {day.getDate()}
                  </Typography>
                  
                  {booking && (
                    <Box sx={{ mt: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                        <Iconify
                          icon={getSourceIcon(booking.source) as any}
                          width={12}
                        />
                        <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                          {booking.source}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                        ${booking.price}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', display: 'block' }}>
                        {booking.minStay} min stay
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Paper>
      )}
    </DashboardContent>
  );
}
