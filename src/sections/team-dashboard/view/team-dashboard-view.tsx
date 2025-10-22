import React, { useState } from 'react';
import {
  Star,
  Users,
  Calendar,
  TrendingUp,
  ChevronLeft,
  TrendingDown,
  ChevronRight,
  MoreVertical,
} from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

import { _myAccount } from 'src/_mock';

// ----------------------------------------------------------------------

export function TeamDashboardPage() {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

  // Carousel navigation functions
  const handleReviewNext = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % customerReviews.length);
  };

  const handleReviewPrev = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + customerReviews.length) % customerReviews.length);
  };

  const handleBookingNext = () => {
    setCurrentBookingIndex((prev) => (prev + 1) % newestBookings.length);
  };

  const handleBookingPrev = () => {
    setCurrentBookingIndex((prev) => (prev - 1 + newestBookings.length) % newestBookings.length);
  };

  // Mock data for statistics
  const statsData = {
    totalBooking: { value: '714k', change: '+2.6%', trend: 'up' },
    sold: { value: '311k', change: '+0.2%', trend: 'up' },
    canceled: { value: '124k', change: '-0.1%', trend: 'down' },
    totalIncomes: { value: '$18,765', change: '+2.6%', trend: 'up' },
  };

  const bookingStatus = [
    { status: 'PENDING', count: '9.91k', color: '#FF9800', progress: 75 },
    { status: 'CANCELED', count: '1.95k', color: '#F44336', progress: 25 },
    { status: 'SOLD', count: '9.12k', color: '#4CAF50', progress: 90 },
  ];

  const toursData = {
    available: 186,
    soldOut: 120,
    total: 306,
  };

  const circularStats = [
    { label: 'Sold', value: 38566, percentage: 73.9, color: '#4CAF50' },
    { label: 'Pending for payment', value: 18472, percentage: 45.6, color: '#FF9800' },
  ];

  const newestBookings = [
    {
      id: 1,
      name: 'Jayvion Simon',
      date: '15 Oct 2025 5:59 pm',
      duration: '3 days 2 nights',
      guests: '3-5 guests',
      price: '$83.74',
      image:
        'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/travel/travel-1.webp',
      avatar: 'JS',
    },
    {
      id: 2,
      name: 'Lucian Obrien',
      date: '14 Oct 2025 4:59 pm',
      duration: '2 days 1 night',
      guests: '2-4 guests',
      price: '$97.14',
      image:
        'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/travel/travel-2.webp',
      avatar: 'LO',
    },
    {
      id: 3,
      name: 'Deja Brady',
      date: '13 Oct 2025 3:59 pm',
      duration: '4 days 3 nights',
      guests: '1-2 guests',
      price: '$68.71',
      image:
        'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/travel/travel-1.webp',
      avatar: 'DB',
    },
    {
      id: 4,
      name: 'Harrison Stein',
      date: '12 Oct 2025 2:59 pm',
      duration: '5 days 4 nights',
      guests: '4-6 guests',
      price: '$85.21',
      image:
        'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/travel/travel-2.webp',
      avatar: 'HS',
    },
  ];

  const customerReviews = [
    {
      name: 'Jayvion Simon',
      date: 'Posted 15 Oct 2025 5:59 pm',
      rating: 4.5,
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      tags: ['Great service', 'Recommended', 'Best price'],
    },
    {
      name: 'Sarah Johnson',
      date: 'Posted 14 Oct 2025 3:30 pm',
      rating: 5.0,
      review:
        'Amazing experience! The team was professional and the service exceeded my expectations. Highly recommended for anyone looking for quality.',
      tags: ['Excellent', 'Professional', 'Exceeded expectations'],
    },
    {
      name: 'Michael Chen',
      date: 'Posted 13 Oct 2025 1:15 pm',
      rating: 4.0,
      review:
        'Good service overall. The process was smooth and the team was responsive. Would definitely use again in the future.',
      tags: ['Good service', 'Smooth process', 'Responsive'],
    },
    {
      name: 'Emily Rodriguez',
      date: 'Posted 12 Oct 2025 11:45 am',
      rating: 4.8,
      review:
        'Outstanding customer support and quick turnaround time. The quality of work was exceptional and met all our requirements perfectly.',
      tags: ['Outstanding', 'Quick turnaround', 'Exceptional quality'],
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Team Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" color="error">
            Reject
          </Button>
          <Button variant="contained" color="primary">
            Accept
          </Button>
        </Box>
      </Box>

      {/* Year Filter */}

      {/* Top Statistics Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Total Booking Card */}
        <Card sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                Total booking
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {statsData.totalBooking.value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUp size={16} color="#4CAF50" />
                <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                  {statsData.totalBooking.change}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: 130,
                height: 130,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src="/assets/team/undraw_data-at-work_3tbf.svg"
                alt="Total Booking"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
          </Box>
        </Card>

        {/* Sold Card */}
        <Card sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                Sold
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {statsData.sold.value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUp size={16} color="#4CAF50" />
                <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                  {statsData.sold.change}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: 130,
                height: 130,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src="/assets/team/undraw_working-at-home_pxaa.svg"
                alt="Sold"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
          </Box>
        </Card>

        {/* Canceled Card */}
        <Card sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                Canceled
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {statsData.canceled.value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingDown size={16} color="#F44336" />
                <Typography variant="body2" sx={{ color: '#F44336', fontWeight: 600 }}>
                  {statsData.canceled.change}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: 130,
                height: 130,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src="/assets/team/undraw_adjust-settings_6pis.svg"
                alt="Canceled"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Main Dashboard Layout - Left Grid + Right Tours Card */}
      <Box
        sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 4 }}
      >
        {/* Left Column - 2x2 Grid */}
        <Box
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}
        >
          {/* Total Incomes Card - Top Left */}
          <Card
            sx={{
              p: 4,
              background: '#004B50',
              color: '#C8FAD6',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'radial-gradient(circle at 1px 1px, rgba(200,250,214,0.2) 0.5px, transparent 0.5px)',
                backgroundSize: '12px 12px',
                opacity: 0.8,
                zIndex: 0,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'radial-gradient(circle at 6px 6px, rgba(200,250,214,0.1) 0.3px, transparent 0.3px)',
                backgroundSize: '8px 8px',
                opacity: 0.6,
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
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: '#C8FAD6', fontWeight: 500, fontSize: '1rem' }}
                >
                  Total incomes
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <TrendingUp size={16} color="#C8FAD6" />
                    <Typography
                      variant="body2"
                      sx={{ color: '#C8FAD6', fontWeight: 600, fontSize: '0.875rem' }}
                    >
                      {statsData.totalIncomes.change}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(200,250,214,0.8)', fontSize: '0.75rem' }}
                  >
                    last month
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="h2"
                sx={{ fontWeight: 700, mb: 4, color: '#C8FAD6', fontSize: '2.75rem' }}
              >
                {statsData.totalIncomes.value}
              </Typography>
              {/* Interactive Line Chart with Detailed Hover */}
              <Box sx={{ height: 80, position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 300 80" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="30" height="20" patternUnits="userSpaceOnUse">
                      <path
                        d="M 30 0 L 0 0 0 20"
                        fill="none"
                        stroke="rgba(200,250,214,0.15)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Area under the line */}
                  <path
                    d="M0,60 L30,45 L60,50 L90,25 L120,40 L150,20 L180,35 L210,15 L240,30 L270,10 L300,25 L300,80 L0,80 Z"
                    fill="rgba(200,250,214,0.15)"
                  />

                  {/* Main line */}
                  <path
                    d="M0,60 L30,45 L60,50 L90,25 L120,40 L150,20 L180,35 L210,15 L240,30 L270,10 L300,25"
                    stroke="#C8FAD6"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points with detailed hover information */}
                  {[
                    { x: 0, y: 60, value: '$15,200', month: 'Jan', change: '+2.1%' },
                    { x: 30, y: 45, value: '$16,800', month: 'Feb', change: '+10.5%' },
                    { x: 60, y: 50, value: '$16,400', month: 'Mar', change: '-2.4%' },
                    { x: 90, y: 25, value: '$18,200', month: 'Apr', change: '+11.0%' },
                    { x: 120, y: 40, value: '$17,600', month: 'May', change: '-3.3%' },
                    { x: 150, y: 20, value: '$19,100', month: 'Jun', change: '+8.5%' },
                    { x: 180, y: 35, value: '$18,500', month: 'Jul', change: '-3.1%' },
                    { x: 210, y: 15, value: '$19,800', month: 'Aug', change: '+7.0%' },
                    { x: 240, y: 30, value: '$19,200', month: 'Sep', change: '-3.0%' },
                    { x: 270, y: 10, value: '$20,100', month: 'Oct', change: '+4.7%' },
                    { x: 300, y: 25, value: '$19,600', month: 'Nov', change: '-2.5%' },
                  ].map((point, index) => (
                    <g key={index}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="3"
                        fill="#C8FAD6"
                        stroke="rgba(200,250,214,0.6)"
                        strokeWidth="1"
                        style={{ cursor: 'pointer' }}
                      >
                        <title>{`${point.month}: ${point.value} (${point.change})`}</title>
                      </circle>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        fill="transparent"
                        style={{ cursor: 'pointer' }}
                      >
                        <title>{`${point.month}: ${point.value} (${point.change})`}</title>
                      </circle>
                    </g>
                  ))}
                </svg>
              </Box>
            </Box>
          </Card>

          {/* Booked Status Card - Top Right */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Booked
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {bookingStatus.map((item, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.status}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.count}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: item.color,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Card>

          {/* Sold Statistics Card - Bottom Left */}
          <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={73.9}
                  size={120}
                  thickness={6}
                  sx={{ color: '#4CAF50' }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    73.9%
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                  38,566
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sold
                </Typography>
              </Box>
            </Box>
          </Card>

          {/* Pending for Payment Card - Bottom Right */}
          <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={45.6}
                  size={120}
                  thickness={6}
                  sx={{ color: '#FF9800' }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    45.6%
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                  18,472
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending for payment
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Right Column - Tours Available Card */}
        <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Tours available
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 4 }}>
              <CircularProgress
                variant="determinate"
                value={60}
                size={180}
                thickness={4}
                sx={{ color: '#4CAF50' }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  186
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Tours
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: '#4CAF50', borderRadius: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Sold out
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, ml: 'auto' }}>
                  120 tours
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: 'grey.300', borderRadius: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Available
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, ml: 'auto' }}>
                  66 tours
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Statistics and Reviews Row */}
      <Box
        sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 4 }}
      >
        {/* Statistics Chart Card */}
        <Card sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Statistics
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <MenuItem value="2023">Yearly</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* SVG Illustration */}

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: '#4CAF50', borderRadius: '50%' }} />
                <Typography variant="body2">Sold</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: '#F8BBD9', borderRadius: '50%' }} />
                <Typography variant="body2">Canceled</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                6.79k
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sold
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                1.23k
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Canceled
              </Typography>
            </Box>

            {/* Bar Chart */}
            <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 2, px: 2 }}>
              {[
                { sold: 75, canceled: 45 },
                { sold: 40, canceled: 45 },
                { sold: 25, canceled: 40 },
                { sold: 85, canceled: 40 },
              ].map((data, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    flex: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'end', height: 150 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: `${data.sold}%`,
                        bgcolor: '#4CAF50',
                        borderRadius: 1,
                      }}
                    />
                    <Box
                      sx={{
                        width: 20,
                        height: `${data.canceled}%`,
                        bgcolor: '#F8BBD9',
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>

        {/* Customer Reviews Card */}
        <Card sx={{ p: 3 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Customer reviews
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" onClick={handleReviewPrev}>
                <ChevronLeft size={16} />
              </IconButton>
              <IconButton size="small" onClick={handleReviewNext}>
                <ChevronRight size={16} />
              </IconButton>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {customerReviews.length} Reviews
          </Typography>

          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Box
              sx={{
                display: 'flex',
                transition: 'transform 0.3s ease-in-out',
                transform: `translateX(-${currentReviewIndex * 100}%)`,
              }}
            >
              {customerReviews.map((review, index) => (
                <Box key={index} sx={{ minWidth: '100%', width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar
                      src={_myAccount.photoURL}
                      alt={review.name}
                      sx={{ width: 40, height: 40 }}
                    >
                      {review.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {review.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        color={star <= Math.floor(review.rating) ? '#FFD700' : '#E0E0E0'}
                        fill={star <= Math.floor(review.rating) ? '#FFD700' : 'none'}
                      />
                    ))}
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {review.review}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {review.tags.map((tag, tagIndex) => (
                      <Chip
                        key={tagIndex}
                        label={tag}
                        size="small"
                        sx={{ bgcolor: 'grey.100', color: 'text.secondary' }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Dots indicator */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            {customerReviews.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: index === currentReviewIndex ? 'primary.main' : 'grey.300',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onClick={() => setCurrentReviewIndex(index)}
              />
            ))}
          </Box>
        </Card>
      </Box>

      {/* Newest Booking Section */}
      <Card sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              Newest booking
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {newestBookings.length} bookings
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" onClick={handleBookingPrev}>
              <ChevronLeft size={16} />
            </IconButton>
            <IconButton size="small" onClick={handleBookingNext}>
              <ChevronRight size={16} />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.3s ease-in-out',
              transform: `translateX(-${Math.floor(currentBookingIndex / 4) * 100}%)`,
            }}
          >
            {Array.from({ length: Math.ceil(newestBookings.length / 4) }).map((_, pageIndex) => (
              <Box key={pageIndex} sx={{ minWidth: '100%', width: '100%' }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: 3,
                  }}
                >
                  {newestBookings.slice(pageIndex * 4, (pageIndex + 1) * 4).map((bookingItem) => (
                    <Card key={bookingItem.id} sx={{ overflow: 'hidden', position: 'relative' }}>
                      <Box sx={{ p: 2, pb: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar
                              src={_myAccount.photoURL}
                              alt={bookingItem.name}
                              sx={{ width: 32, height: 32 }}
                            >
                              {bookingItem.avatar}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {bookingItem.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {bookingItem.date}
                              </Typography>
                            </Box>
                          </Box>
                          <IconButton size="small">
                            <MoreVertical size={16} />
                          </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Calendar size={14} color="#666" />
                            <Typography variant="caption" color="text.secondary">
                              {bookingItem.duration}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Users size={14} color="#666" />
                            <Typography variant="caption" color="text.secondary">
                              {bookingItem.guests}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Booking Image */}
                      <Box
                        sx={{
                          height: 120,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={bookingItem.image}
                          alt={bookingItem.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            bgcolor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {bookingItem.price}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Dots indicator */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
          {Array.from({ length: Math.ceil(newestBookings.length / 4) }).map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor:
                  index === Math.floor(currentBookingIndex / 4) ? 'primary.main' : 'grey.300',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onClick={() => setCurrentBookingIndex(index * 4)}
            />
          ))}
        </Box>
      </Card>
    </Container>
  );
}
