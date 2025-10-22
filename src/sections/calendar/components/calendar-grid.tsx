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
    // Generate specific dates from Sun 28 to Mon 6 as shown in the image
    const days = [];
    const startDate = new Date(2024, 9, 28); // October 28, 2024 (Sunday)

    for (let i = 0; i < 10; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const getBookingForDate = (date: string, listingId: number) =>
    bookings.find((b) => b.date === date && b.listingId === listingId);

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
                                icon={
                                  (booking.source === 'Airbnb'
                                    ? 'logos:airbnb'
                                    : 'logos:booking-dot-com') as any
                                }
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
    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
      {/* Calendar Header */}
      <Box sx={{ display: 'flex', mb: 1 }}>
        <Box sx={{ width: 200, p: 1, bgcolor: 'white', border: 1, borderColor: 'grey.300' }}>
          <Typography variant="body2" fontWeight={600}>
            Property
          </Typography>
        </Box>
        {calendarDays.map((day) => (
          <Box
            key={formatDate(day)}
            sx={{
              flex: 1,
              p: 1,
              textAlign: 'center',
              minWidth: 80,
              bgcolor: 'white',
              border: 1,
              borderColor: 'grey.300',
              borderLeft: 0,
            }}
          >
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
              <Box
                sx={{
                  width: 200,
                  p: 1,
                  border: 1,
                  borderColor: 'grey.300',
                  bgcolor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {listing.name}
                </Typography>
              </Box>

              {/* Calendar Days */}
              {calendarDays.map((day) => {
                const dateStr = formatDate(day);
                const isBooked = day.getDate() === 4 && day.getMonth() === 9; // Simulate booked dates (Sat 4 Oct)

                return (
                  <Box
                    key={dateStr}
                    sx={{
                      flex: 1,
                      minWidth: 80,
                      minHeight: 60,
                      border: 1,
                      borderColor: 'grey.300',
                      borderLeft: 0,
                      cursor: 'pointer',
                      position: 'relative',
                      bgcolor: isBooked ? 'grey.200' : 'white',
                      color: 'text.primary',
                      opacity: isCurrentMonth(day) ? 1 : 0.3,
                      '&:hover': {
                        bgcolor: isBooked ? 'grey.300' : 'grey.50',
                      },
                    }}
                    onClick={() => onDateClick(dateStr, listing.id)}
                  >
                    <Box
                      sx={{
                        p: 1,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        €{listing.price}
                      </Typography>
                    </Box>
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
