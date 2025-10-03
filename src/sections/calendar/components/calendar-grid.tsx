
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

type CalendarGridProps = {
  currentMonth: Date;
  listings: Array<{
    id: number;
    name: string;
    price: number;
    bookings: number;
  }>;
  bookings: Array<{
    id: number;
    listingId: number;
    date: string;
    guests: number;
    price: number;
    status: string;
    source: string;
    guestName?: string;
  }>;
  onBookingClick: (booking: any) => void;
  onDateClick: (date: string, listingId: number) => void;
  view: 'grid' | 'list';
};

export function CalendarGrid({
  currentMonth,
  listings,
  bookings,
  onBookingClick,
  onDateClick,
  view,
}: CalendarGridProps) {

  // Generate calendar days
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

  const getBookingForDate = (date: string, listingId: number) => bookings.find(b => b.date === date && b.listingId === listingId);

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

  if (view === 'list') {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Calendar List View
        </Typography>
        <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
          {listings.map((listing) => (
            <Box key={listing.id} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {listing.name}
              </Typography>
              <Grid container spacing={1}>
                {calendarDays.slice(0, 7).map((day) => {
                  const dateStr = formatDate(day);
                  const booking = getBookingForDate(dateStr, listing.id);
                  
                  return (
                    <Grid size={1.7} key={dateStr}>
                      <Box
                        sx={{
                          p: 1,
                          minHeight: 60,
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          cursor: 'pointer',
                          bgcolor: booking ? getBookingColor(booking.status) : 'transparent',
                          color: booking ? 'white' : 'text.primary',
                          '&:hover': {
                            bgcolor: booking ? getBookingColor(booking.status) : 'action.hover',
                          },
                        }}
                        onClick={() => onDateClick(dateStr, listing.id)}
                      >
                        <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                          {day.getDate()}
                        </Typography>
                        {booking && (
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                              {booking.guests} guests
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                              <Iconify
                                icon={(booking.source === 'Airbnb' ? 'logos:airbnb' : 'logos:booking-dot-com') as any}
                                width={12}
                              />
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      {/* Calendar Header */}
      <Box sx={{ display: 'flex', mb: 1 }}>
        <Box sx={{ width: 200, p: 1 }}>
          <Typography variant="body2" fontWeight={600}>
            Property
          </Typography>
        </Box>
        {calendarDays.slice(0, 10).map((day) => (
          <Box key={formatDate(day)} sx={{ flex: 1, p: 1, textAlign: 'center', minWidth: 80 }}>
            <Typography variant="body2" fontWeight={600}>
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {day.getDate()}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Calendar Body */}
      <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
        {listings.map((listing) => (
          <Box key={listing.id} sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
              {/* Property Name */}
              <Box sx={{ width: 200, p: 1, borderRight: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {listing.name}
                </Typography>
              </Box>

              {/* Calendar Days */}
              {calendarDays.slice(0, 10).map((day) => {
                const dateStr = formatDate(day);
                const booking = getBookingForDate(dateStr, listing.id);
                const isToday = dateStr === formatDate(new Date());
                
                return (
                  <Box
                    key={dateStr}
                    sx={{
                      flex: 1,
                      minWidth: 80,
                      minHeight: 80,
                      borderRight: 1,
                      borderColor: 'divider',
                      cursor: 'pointer',
                      position: 'relative',
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
                    onClick={() => onDateClick(dateStr, listing.id)}
                  >
                    {booking ? (
                      <Box sx={{ p: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              bgcolor: 'rgba(255,255,255,0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                            }}
                          >
                            {booking.guestName?.charAt(0) || 'G'}
                          </Box>
                          <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
                            {booking.guestName || 'Guest'}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ fontSize: '0.7rem', mb: 0.5 }}>
                          {booking.guests} guests
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Iconify
                            icon={(booking.source === 'Airbnb' ? 'logos:airbnb' : 'logos:booking-dot-com') as any}
                            width={12}
                          />
                        </Box>
                      </Box>
                    ) : (
                      <Box sx={{ p: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          €{listing.price}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
