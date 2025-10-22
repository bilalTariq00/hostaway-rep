import React from 'react';
import { Home, Star, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _myAccount } from 'src/_mock';

// ----------------------------------------------------------------------

export function TeamAnalyticsView() {
  // Mock data for Hostaway property rental analytics
  const weeklyStats = [
    {
      title: 'Total Revenue',
      value: '$714k',
      change: '+2.6%',
      trend: 'up',
      icon: <DollarSign size={24} />,
      color: '#4CAF50',
      bgColor: '#E8F5E8',
      chartData: [65, 59, 80, 81, 56, 55, 40, 70, 65, 80, 75, 85],
    },
    {
      title: 'Active Bookings',
      value: '1,247',
      change: '+12.3%',
      trend: 'up',
      icon: <Calendar size={24} />,
      color: '#2196F3',
      bgColor: '#E3F2FD',
      chartData: [45, 35, 60, 70, 55, 65, 50, 45, 55, 60, 50, 65],
    },
    {
      title: 'Properties Listed',
      value: '342',
      change: '+5.2%',
      trend: 'up',
      icon: <Home size={24} />,
      color: '#FF9800',
      bgColor: '#FFF3E0',
      chartData: [80, 75, 90, 85, 70, 80, 75, 85, 90, 95, 85, 90],
    },
    {
      title: 'Guest Reviews',
      value: '4.8★',
      change: '+0.3',
      trend: 'up',
      icon: <Star size={24} />,
      color: '#9C27B0',
      bgColor: '#F3E5F5',
      chartData: [30, 25, 40, 35, 30, 35, 40, 45, 50, 45, 40, 50],
    },
  ];

  const channelPerformance = [
    { name: 'Airbnb', value: '9.12k', color: '#FF5A5F', icon: 'A', bookings: 234 },
    { name: 'Booking.com', value: '6.98k', color: '#003580', icon: 'B', bookings: 189 },
    { name: 'VRBO', value: '4.25k', color: '#00A699', icon: 'V', bookings: 156 },
    { name: 'Direct', value: '2.15k', color: '#4CAF50', icon: 'D', bookings: 98 },
  ];

  const pieChartData = [
    { label: 'Booked', value: 68.5, color: '#4CAF50' },
    { label: 'Available', value: 18.3, color: '#2196F3' },
    { label: 'Blocked', value: 8.7, color: '#FF9800' },
    { label: 'Maintenance', value: 4.5, color: '#F44336' },
  ];

  const barChartData = [
    { month: 'Jan', airbnb: 45, booking: 35 },
    { month: 'Feb', airbnb: 52, booking: 48 },
    { month: 'Mar', airbnb: 38, booking: 42 },
    { month: 'Apr', airbnb: 65, booking: 58 },
    { month: 'May', airbnb: 42, booking: 38 },
    { month: 'Jun', airbnb: 58, booking: 62 },
    { month: 'Jul', airbnb: 72, booking: 68 },
    { month: 'Aug', airbnb: 48, booking: 52 },
    { month: 'Sep', airbnb: 55, booking: 48 },
    { month: 'Oct', airbnb: 68, booking: 72 },
  ];

  const recentBookings = [
    {
      id: 1,
      guest: 'Sarah Johnson',
      property: 'Downtown Loft',
      checkIn: '2024-01-15',
      status: 'confirmed',
      amount: '$245',
    },
    {
      id: 2,
      guest: 'Mike Chen',
      property: 'Beach House',
      checkIn: '2024-01-16',
      status: 'pending',
      amount: '$189',
    },
    {
      id: 3,
      guest: 'Emily Davis',
      property: 'Mountain Cabin',
      checkIn: '2024-01-17',
      status: 'confirmed',
      amount: '$156',
    },
    {
      id: 4,
      guest: 'David Wilson',
      property: 'City Apartment',
      checkIn: '2024-01-18',
      status: 'cancelled',
      amount: '$98',
    },
    {
      id: 5,
      guest: 'Lisa Brown',
      property: 'Lakeside Villa',
      checkIn: '2024-01-19',
      status: 'confirmed',
      amount: '$312',
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Property Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor your rental property performance and guest satisfaction
        </Typography>
      </Box>

      {/* Top Row - Key Metric Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        {weeklyStats.map((stat, index) => (
          <Card
            key={index}
            sx={{
              p: 3,
              position: 'relative',
              overflow: 'hidden',
              background: `linear-gradient(135deg, ${stat.bgColor} 0%, ${stat.bgColor}80 100%)`,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 0.5px, transparent 0.5px)',
                backgroundSize: '12px 12px',
                opacity: 0.3,
                zIndex: 0,
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 2,
                }}
              >
                <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {stat.trend === 'up' ? (
                    <TrendingUp size={16} color={stat.color} />
                  ) : (
                    <TrendingDown size={16} color={stat.color} />
                  )}
                  <Typography variant="body2" sx={{ color: stat.color, fontWeight: 600 }}>
                    {stat.change}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                {stat.value}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {stat.title}
              </Typography>

              {/* Mini Chart */}
              <Box sx={{ height: 40, display: 'flex', alignItems: 'end', gap: 0.5 }}>
                {stat.chartData.map((value, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 4,
                      height: `${(value / 100) * 40}px`,
                      bgcolor: stat.color,
                      borderRadius: 0.5,
                      opacity: 0.8,
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Bottom Section */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
        {/* Left Column - Property Occupancy (Pie Chart) */}
        <Card sx={{ p: 2, height: 400, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Property Occupancy
          </Typography>

          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative', width: 200, height: 200 }}>
              {/* Simple Pie Chart SVG matching the image */}
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                style={{ position: 'relative', zIndex: 1 }}
              >
                {pieChartData.map((segment, index) => {
                  const startAngle = pieChartData
                    .slice(0, index)
                    .reduce((acc, item) => acc + (item.value / 100) * 360, 0);
                  const endAngle = startAngle + (segment.value / 100) * 360;
                  const startAngleRad = (startAngle - 90) * (Math.PI / 180);
                  const endAngleRad = (endAngle - 90) * (Math.PI / 180);

                  const radius = 60;
                  const centerX = 100;
                  const centerY = 100;

                  const x1 = centerX + radius * Math.cos(startAngleRad);
                  const y1 = centerY + radius * Math.sin(startAngleRad);
                  const x2 = centerX + radius * Math.cos(endAngleRad);
                  const y2 = centerY + radius * Math.sin(endAngleRad);

                  const largeArcFlag = segment.value > 50 ? 1 : 0;

                  const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z',
                  ].join(' ');

                  return (
                    <path
                      key={index}
                      d={pathData}
                      fill={segment.color}
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>

              {/* Center Content - matching the image */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  zIndex: 2,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5, lineHeight: 1 }}
                >
                  100%
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  Occupancy Rate
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Simple Legend */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {pieChartData.map((segment, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: segment.color,
                    borderRadius: '50%',
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {segment.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>

        {/* Right Column - Channel Performance (Bar Chart) */}
        <Card sx={{ p: 2, height: 400, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Channel Performance
          </Typography>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Legend */}
            <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: '#FF5A5F',
                    borderRadius: 1,
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Airbnb
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: '#003580',
                    borderRadius: 1,
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Booking.com
                </Typography>
              </Box>
            </Box>

            {/* Bar Chart */}
            <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 1, px: 1 }}>
              {barChartData.map((data, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5,
                      height: 150,
                      justifyContent: 'end',
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: `${(data.airbnb / 80) * 100}%`,
                        bgcolor: '#FF5A5F',
                        borderRadius: '2px 2px 0 0',
                      }}
                    />
                    <Box
                      sx={{
                        width: '100%',
                        height: `${(data.booking / 80) * 100}%`,
                        bgcolor: '#003580',
                        borderRadius: '0 0 2px 2px',
                      }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '10px' }}>
                    {data.month}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Summary Stats */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 1,
                mt: 2,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#FF5A5F' }}>
                  {barChartData.reduce((acc, data) => acc + data.airbnb, 0)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Airbnb
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#003580' }}>
                  {barChartData.reduce((acc, data) => acc + data.booking, 0)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Booking.com
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                  +23%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Growth
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Bottom Row - Channel Performance and Recent Bookings */}
      <Box
        sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3, mt: 3 }}
      >
        {/* Channel Performance */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Channel Performance
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {channelPerformance.map((channel, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: channel.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {channel.icon}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {channel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {channel.bookings} bookings
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {channel.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>

        {/* Recent Bookings */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Recent Bookings
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentBookings.map((booking, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Avatar
                  src={_myAccount.photoURL}
                  alt={booking.guest}
                  sx={{ width: 40, height: 40 }}
                >
                  {booking.guest
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {booking.guest}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {booking.property} • {booking.checkIn}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Chip
                    label={booking.status}
                    size="small"
                    color={
                      booking.status === 'confirmed'
                        ? 'success'
                        : booking.status === 'pending'
                          ? 'warning'
                          : 'error'
                    }
                    sx={{ mb: 0.5 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {booking.amount}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Card>
      </Box>
    </Container>
  );
}
