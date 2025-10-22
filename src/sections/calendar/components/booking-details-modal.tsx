import {
  Box,
  Chip,
  Grid,
  Avatar,
  Button,
  Dialog,
  Divider,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

type BookingDetailsModalProps = {
  booking: {
    id: number;
    listingId: number;
    date: string;
    guests: number;
    price: number;
    status: string;
    source: string;
    guestName?: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    commission: number;
    payout: number;
  };
  open: boolean;
  onClose: () => void;
};

export function BookingDetailsModal({ booking, open, onClose }: BookingDetailsModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Booking Details</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small">
              <Iconify icon={'eva:share-fill' as any} width={20} />
            </IconButton>
            <IconButton size="small">
              <Iconify icon={'eva:message-circle-fill' as any} width={20} />
            </IconButton>
            <IconButton size="small">
              <Iconify icon={'eva:edit-fill' as any} width={20} />
            </IconButton>
            <IconButton size="small" onClick={onClose}>
              <Iconify icon={'eva:close-fill' as any} width={20} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Guest Information */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar src="/assets/images/avatar/avatar-1.webp" sx={{ width: 60, height: 60 }}>
              JD
            </Avatar>
            <Box>
              <Typography variant="h6">{booking.guestName || 'John Doe'}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Iconify icon={getSourceIcon(booking.source) as any} width={16} />
                <Typography variant="body2" color="text.secondary">
                  {booking.source}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {booking.nights} nights • {booking.guests} guests
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Booking Information */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Hostaway ID
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                HA-{booking.id.toString().padStart(6, '0')}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Channel ID
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {booking.source}-{booking.id.toString().padStart(8, '0')}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Guest Status
              </Typography>
              <Chip
                label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                color={getStatusColor(booking.status) as any}
                size="small"
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Total Price
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                ${booking.price}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Commission
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ${booking.commission}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Payout
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ${booking.payout}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Check-in/Check-out Information */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Check-in
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {new Date(booking.checkIn).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Check-out
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {new Date(booking.checkOut).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained">Edit Booking</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
