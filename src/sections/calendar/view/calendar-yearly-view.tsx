import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for properties
const mockProperties = [
  { id: 1, name: 'Cozy Downtown Apartment', priceEarned: 2400 },
  { id: 2, name: 'Beach House Villa', priceEarned: 5000 },
  { id: 3, name: 'Mountain Cabin Retreat', priceEarned: 3600 },
];

// Mock data for yearly bookings
const mockYearlyBookings = [
  { month: 0, bookings: 8, revenue: 1200 }, // January
  { month: 1, bookings: 12, revenue: 1800 }, // February
  { month: 2, bookings: 15, revenue: 2250 }, // March
  { month: 3, bookings: 18, revenue: 2700 }, // April
  { month: 4, bookings: 22, revenue: 3300 }, // May
  { month: 5, bookings: 25, revenue: 3750 }, // June
  { month: 6, bookings: 28, revenue: 4200 }, // July
  { month: 7, bookings: 26, revenue: 3900 }, // August
  { month: 8, bookings: 20, revenue: 3000 }, // September
  { month: 9, bookings: 16, revenue: 2400 }, // October
  { month: 10, bookings: 12, revenue: 1800 }, // November
  { month: 11, bookings: 10, revenue: 1500 }, // December
];

export function CalendarYearlyView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(2); // Yearly tab
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [propertyAnchor, setPropertyAnchor] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/calendar/multi');
    if (newValue === 1) router.push('/calendar/monthly');
  };

  const handlePropertyClose = () => {
    setPropertyAnchor(null);
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentYear(currentYear + 1);
    }
  };

  const getBookingForMonth = (month: number) => mockYearlyBookings.find((b) => b.month === month);

  const getMonthName = (month: number) => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthNames[month];
  };

  const getBookingIntensity = (bookings: number) => {
    if (bookings >= 20) return 'high';
    if (bookings >= 15) return 'medium';
    if (bookings >= 10) return 'low';
    return 'very-low';
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high':
        return 'success.dark';
      case 'medium':
        return 'success.main';
      case 'low':
        return 'success.light';
      case 'very-low':
        return 'grey.300';
      default:
        return 'grey.300';
    }
  };

  const handleMonthClick = (month: number) => {
    // Navigate to monthly view with selected month
    console.log('Navigate to monthly view for month:', month);
    // This would typically use router to navigate to monthly view
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
            <Button variant="contained">Direct Booking</Button>
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

      {/* Year Controls */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="outlined" size="small">
              Today
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={() => navigateYear('prev')} size="small">
                <Iconify icon={'eva:arrow-left-fill' as any} width={16} />
              </IconButton>
              <Typography variant="h6" sx={{ minWidth: 80, textAlign: 'center' }}>
                {currentYear}
              </Typography>
              <IconButton onClick={() => navigateYear('next')} size="small">
                <Iconify icon={'eva:arrow-right-fill' as any} width={16} />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">Total Revenue</Typography>
            <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 600 }}>
              ${mockYearlyBookings.reduce((sum, b) => sum + b.revenue, 0).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Yearly Calendar Grid */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {currentYear} Overview
        </Typography>

        <Grid container spacing={2}>
          {Array.from({ length: 12 }, (month, monthIdx) => {
            const booking = getBookingForMonth(monthIdx);
            const intensity = booking ? getBookingIntensity(booking.bookings) : 'very-low';
            const intensityColor = getIntensityColor(intensity);

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={monthIdx}>
                <Paper
                  sx={{
                    p: 2,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    },
                  }}
                  onClick={() => handleMonthClick(monthIdx)}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    {getMonthName(monthIdx)}
                  </Typography>

                  {/* Booking Lines */}
                  <Box sx={{ mb: 2 }}>
                    {Array.from({ length: 5 }, (_, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          height: 3,
                          mb: 0.5,
                          borderRadius: 1,
                          bgcolor: idx < (booking?.bookings || 0) / 5 ? intensityColor : 'grey.200',
                          transition: 'background-color 0.2s ease-in-out',
                        }}
                      />
                    ))}
                  </Box>

                  {booking && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {booking.bookings} bookings
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'success.main' }}>
                        ${booking.revenue}
                      </Typography>
                    </Box>
                  )}

                  {!booking && (
                    <Typography variant="body2" color="text.secondary">
                      No bookings
                    </Typography>
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      {/* Legend */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Booking Intensity Legend
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 20, height: 3, bgcolor: 'success.dark', borderRadius: 1 }} />
            <Typography variant="caption">High (20+ bookings)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 20, height: 3, bgcolor: 'success.main', borderRadius: 1 }} />
            <Typography variant="caption">Medium (15-19 bookings)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 20, height: 3, bgcolor: 'success.light', borderRadius: 1 }} />
            <Typography variant="caption">Low (10-14 bookings)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 20, height: 3, bgcolor: 'grey.300', borderRadius: 1 }} />
            <Typography variant="caption">Very Low (&lt;10 bookings)</Typography>
          </Box>
        </Box>
      </Paper>
    </DashboardContent>
  );
}
