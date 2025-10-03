import { useState } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { DetailedMessageCard } from '../detailed-message-card';
import { DetailedReservationCard } from '../detailed-reservation-card';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for reservations
  const reservationData = {
    todaysCheckout: [
      { id: '1', name: 'John Smith', checkOut: '11:00 AM', status: 'Checking out' },
      { id: '2', name: 'Sarah Johnson', checkOut: '12:00 PM', status: 'Checking out' },
      { id: '3', name: 'Mike Wilson', checkOut: '1:00 PM', status: 'Checking out' },
    ],
    todaysCheckins: [
      { id: '4', name: 'Emily Davis', checkIn: '3:00 PM', status: 'Arriving' },
      { id: '5', name: 'David Brown', checkIn: '4:00 PM', status: 'Arriving' },
    ],
    needApproval: [
      { id: '6', name: 'Lisa Anderson', status: 'Pending approval' },
    ],
    upcoming: [
      { id: '7', name: 'Robert Taylor', checkIn: 'Tomorrow', status: 'Upcoming' },
      { id: '8', name: 'Jennifer White', checkIn: 'Day after', status: 'Upcoming' },
    ],
    stayingGuests: [
      { id: '9', name: 'Michael Garcia', status: 'Currently staying' },
      { id: '10', name: 'Amanda Martinez', status: 'Currently staying' },
      { id: '11', name: 'Christopher Lee', status: 'Currently staying' },
    ],
    pendingInquiries: [
      { id: '12', name: 'Jessica Thompson', status: 'Awaiting response' },
      { id: '13', name: 'Daniel Harris', status: 'Awaiting response' },
    ],
  };

  // Mock data for messages - expanded for pagination
  const messageData = [
    { id: '1', name: 'Guest Inquiry #1', lastMessage: 'Hello, I have a question about...', timestamp: '2 min ago' },
    { id: '2', name: 'Booking Request', lastMessage: 'Can I book for next week?', timestamp: '5 min ago' },
    { id: '3', name: 'Support Ticket', lastMessage: 'Need help with check-in', timestamp: '10 min ago' },
    { id: '4', name: 'Review Response', lastMessage: 'Thank you for your feedback', timestamp: '15 min ago' },
    { id: '5', name: 'Cancellation Request', lastMessage: 'I need to cancel my booking', timestamp: '20 min ago' },
    { id: '6', name: 'Guest Inquiry #2', lastMessage: 'What amenities are available?', timestamp: '25 min ago' },
    { id: '7', name: 'Booking Request #2', lastMessage: 'Is parking available?', timestamp: '30 min ago' },
    { id: '8', name: 'Support Ticket #2', lastMessage: 'WiFi password not working', timestamp: '35 min ago' },
    { id: '9', name: 'Review Response #2', lastMessage: 'Great stay, thank you!', timestamp: '40 min ago' },
    { id: '10', name: 'Cancellation Request #2', lastMessage: 'Need to cancel due to emergency', timestamp: '45 min ago' },
    { id: '11', name: 'Guest Inquiry #3', lastMessage: 'Check-in time flexibility?', timestamp: '50 min ago' },
    { id: '12', name: 'Booking Request #3', lastMessage: 'Group booking for 8 people', timestamp: '55 min ago' },
    { id: '13', name: 'Support Ticket #3', lastMessage: 'Air conditioning not working', timestamp: '1 hour ago' },
    { id: '14', name: 'Review Response #3', lastMessage: 'Excellent service provided', timestamp: '1 hour ago' },
    { id: '15', name: 'Cancellation Request #3', lastMessage: 'Weather concerns for outdoor event', timestamp: '1 hour ago' },
    { id: '16', name: 'Guest Inquiry #4', lastMessage: 'Pet policy information', timestamp: '1 hour ago' },
    { id: '17', name: 'Booking Request #4', lastMessage: 'Long-term stay inquiry', timestamp: '1 hour ago' },
    { id: '18', name: 'Support Ticket #4', lastMessage: 'Key card not working', timestamp: '1 hour ago' },
    { id: '19', name: 'Review Response #4', lastMessage: 'Will definitely return', timestamp: '1 hour ago' },
    { id: '20', name: 'Cancellation Request #4', lastMessage: 'Change in travel plans', timestamp: '1 hour ago' },
    { id: '21', name: 'Guest Inquiry #5', lastMessage: 'Early check-in possible?', timestamp: '1 hour ago' },
    { id: '22', name: 'Booking Request #5', lastMessage: 'Corporate booking inquiry', timestamp: '1 hour ago' },
    { id: '23', name: 'Support Ticket #5', lastMessage: 'TV remote not working', timestamp: '1 hour ago' },
    { id: '24', name: 'Review Response #5', lastMessage: 'Perfect location and service', timestamp: '1 hour ago' },
    { id: '25', name: 'Cancellation Request #5', lastMessage: 'Family emergency occurred', timestamp: '1 hour ago' },
  ];

  // Calculate total pages for pagination
  const itemsPerPage = 4;
  const totalPages = Math.ceil(messageData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Dashboard Overview
      </Typography>

      {/* Reservations Section */}
      <Card sx={{ mb: 4, bgcolor: 'white' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Reservations
          </Typography>
          
          {/* First 6 cards in 2 columns */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailedReservationCard
                title="Today's Checkout"
                value="12"
                subtitle="checkout today"
                badgeText="Next 7 days"
                badgeColor="#2F9F9F"
                data={reservationData.todaysCheckout}
                variant="first6"
                color="primary"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailedReservationCard
                title="Today's Check-ins"
                value="8"
                subtitle="check-ins today"
                badgeText="Next 7 days"
                badgeColor="#2F9F9F"
                data={reservationData.todaysCheckins}
                variant="first6"
                color="success"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailedReservationCard
                title="Reservations That need your approval"
                value="3"
                subtitle="approval today"
                badgeText="Next 7 days"
                badgeColor="#2F9F9F"
                data={reservationData.needApproval}
                variant="first6"
                color="warning"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailedReservationCard
                title="Upcoming reservation(s)"
                value="25"
                subtitle="upcoming today"
                badgeText="Next 7 days"
                badgeColor="#2F9F9F"
                data={reservationData.upcoming}
                variant="first6"
                color="info"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailedReservationCard
                title="Staying Guest"
                value="18"
                subtitle="staying today"
                badgeText="Next 7 days"
                badgeColor="#2F9F9F"
                data={reservationData.stayingGuests}
                variant="first6"
                color="secondary"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailedReservationCard
                title="Pending inquiries"
                value="7"
                subtitle="inquiries today"
                badgeText="Next 7 days"
                badgeColor="#2F9F9F"
                data={reservationData.pendingInquiries}
                variant="first6"
                color="error"
              />
            </Grid>
          </Grid>

          {/* Last 4 cards in one row */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DetailedReservationCard
                title="Check-in"
                value="85%"
                subtitle="completion today"
                badgeText="Last 30 days"
                badgeColor="#2F9F9F"
                data={[]}
                variant="last4"
                color="success"
                profitLoss={{ value: 12, isPositive: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DetailedReservationCard
                title="Revenue"
                value="$12,450"
                subtitle="revenue today"
                badgeText="Last 30 days"
                badgeColor="#2F9F9F"
                data={[]}
                variant="last4"
                color="primary"
                profitLoss={{ value: 8, isPositive: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DetailedReservationCard
                title="Revenue"
                value="$8,920"
                subtitle="revenue today"
                badgeText="Last 30 days"
                badgeColor="#2F9F9F"
                data={[]}
                variant="last4"
                color="info"
                profitLoss={{ value: -5, isPositive: false }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <DetailedReservationCard
                title="Confirmed"
                value="92%"
                subtitle="confirmed today"
                badgeText="Last 30 days"
                badgeColor="#2F9F9F"
                data={[]}
                variant="last4"
                color="success"
                profitLoss={{ value: 15, isPositive: true }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Messages Section */}
      <Card sx={{ mb: 4, bgcolor: 'white' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Messages
          </Typography>
          
          <Grid container spacing={3}>
            {/* Left side - 6 cards in 2 columns */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DetailedMessageCard
                    title="Sent"
                    value="156"
                    subtitle="sent today"
                    badgeText="Last 30 days"
                    badgeColor="#1C84C6"
                    data={[]}
                    variant="first6"
                    color="primary"
                    profitLoss={{ value: 12, isPositive: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DetailedMessageCard
                    title="Average Sent"
                    value="23"
                    subtitle="average today"
                    badgeText="Last 30 days"
                    badgeColor="#1C84C6"
                    data={[]}
                    variant="first6"
                    color="info"
                    profitLoss={{ value: 8, isPositive: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DetailedMessageCard
                    title="Received"
                    value="89"
                    subtitle="received today"
                    badgeText="Last 30 days"
                    badgeColor="#1C84C6"
                    data={[]}
                    variant="first6"
                    color="success"
                    profitLoss={{ value: -3, isPositive: false }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DetailedMessageCard
                    title="Average Received"
                    value="15"
                    subtitle="average today"
                    badgeText="Last 30 days"
                    badgeColor="#1C84C6"
                    data={[]}
                    variant="first6"
                    color="warning"
                    profitLoss={{ value: 5, isPositive: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DetailedMessageCard
                    title="Automation"
                    value="67%"
                    subtitle="automation today"
                    badgeText="Last 30 days"
                    badgeColor="#1C84C6"
                    data={[]}
                    variant="first6"
                    color="secondary"
                    profitLoss={{ value: 10, isPositive: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DetailedMessageCard
                    title="Automation (Avg)"
                    value="45%"
                    subtitle="automation avg today"
                    badgeText="Last 30 days"
                    badgeColor="#1C84C6"
                    data={[]}
                    variant="first6"
                    color="info"
                    profitLoss={{ value: -2, isPositive: false }}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            {/* Right side - 1 card with different styling */}
            <Grid size={{ xs: 12, md: 4 }}>
              <DetailedMessageCard
                title="Unread conversation(s)"
                value="12"
                subtitle=""
                badgeText="Last 30 days"
                badgeColor="#1C84C6"
                data={messageData}
                variant="last1"
                color="error"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </DashboardContent>
  );
}
