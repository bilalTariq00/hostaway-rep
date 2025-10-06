import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Chart, useChart } from 'src/components/chart';

// Mock data for analytics
const mockAnalyticsData = {
  rentalRevenue: 12500,
  nightsBooked: 45,
  occupancyRate: 78.5,
  averageDailyRate: 278,
  averageRevenuePerStay: 1250,
};

const mockChannelData = [
  { channel: 'Airbnb', revenue: 7500, nights: 25, color: '#FF5A5F' },
  { channel: 'Booking.com', revenue: 3500, nights: 15, color: '#003580' },
  { channel: 'Expedia', revenue: 1500, nights: 5, color: '#FF6600' },
];

// Chart data
const revenueChartData = {
  series: [
    {
      name: 'Revenue',
      data: [12000, 13500, 11000, 15000, 12500, 14000, 13000],
    },
  ],
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
};

const channelRevenueData = {
  series: [
    { name: 'Airbnb', data: [7500, 8200, 6800, 9100, 7800] },
    { name: 'Booking.com', data: [3500, 4200, 3800, 4100, 3900] },
    { name: 'Expedia', data: [1500, 1800, 1200, 1900, 1600] },
  ],
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
};

const nightsBookedData = {
  series: [
    { name: 'Airbnb', data: [25, 28, 22, 30, 26] },
    { name: 'Booking.com', data: [15, 18, 16, 17, 19] },
    { name: 'Expedia', data: [5, 6, 4, 7, 6] },
  ],
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
};

const revenuePerReservationData = {
  series: [
    { name: 'Airbnb', data: [300, 320, 310, 330, 315] },
    { name: 'Booking.com', data: [233, 250, 240, 260, 245] },
    { name: 'Expedia', data: [300, 300, 300, 271, 267] },
  ],
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
};

const checkinData = {
  series: [
    { name: 'Check-ins', data: [12, 15, 18, 14, 16, 20, 17] },
  ],
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

const reservationsPerChannelData = {
  series: [45, 25, 15, 10, 5],
  labels: ['Airbnb', 'Booking.com', 'Expedia', 'Direct', 'Other'],
};


export function AnalyticsView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [chartType, setChartType] = useState('bar');
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) router.push('/financial-reportings/rental-activity');
    if (newValue === 2) router.push('/financial-reportings/occupancy-report');
    if (newValue === 3) router.push('/financial-reportings/quickbooks');
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
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
              bgcolor: 'primary.main',
            },
          }}
        >
          <Tab label="Analytics" />
          <Tab label="Rental Activity" />
          <Tab label="Occupancy Report" />
          <Tab label="QuickBooks" />
        </Tabs>
      </Box>

      {/* Financial Reporting Title */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Financial Reporting
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Listings"
            sx={{ minWidth: 120 }}
          />
          <TextField
            size="small"
            placeholder="Tags"
            sx={{ minWidth: 120 }}
          />
          <TextField
            size="small"
            type="date"
            label="From"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 120 }}
          />
          <TextField
            size="small"
            type="date"
            label="To (incl.)"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 120 }}
          />
          <TextField
            size="small"
            placeholder="Quick dates"
            sx={{ minWidth: 120 }}
          />
          <TextField
            size="small"
            placeholder="Channels"
            sx={{ minWidth: 120 }}
          />
          <Button variant="outlined">
            Reset
          </Button>
        </Box>
      </Paper>

      {/* Key Metrics Card */}
      <Card sx={{ mb: 3, bgcolor: 'grey.100' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  €{mockAnalyticsData.rentalRevenue.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rental Revenue
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {mockAnalyticsData.nightsBooked}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nights Booked
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {mockAnalyticsData.occupancyRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Occupancy Rate
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  €{mockAnalyticsData.averageDailyRate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Daily Rate
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  €{mockAnalyticsData.averageRevenuePerStay}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Revenue per Stay
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Chart Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Revenue Chart
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Reservation</InputLabel>
                    <Select value="total" label="Reservation">
                      <MenuItem value="total">Total</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Price</InputLabel>
                    <Select value="total" label="Price">
                      <MenuItem value="total">Total</MenuItem>
                      <MenuItem value="net">Net</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Channel</InputLabel>
                    <Select value="all" label="Channel">
                      <MenuItem value="all">All Channels</MenuItem>
                      <MenuItem value="airbnb">Airbnb</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Check-in</InputLabel>
                    <Select value="all" label="Check-in">
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                    </Select>
                  </FormControl>
                  <IconButton
                    onClick={() => setChartType(chartType === 'bar' ? 'line' : 'bar')}
                    size="small"
                  >
                    <Iconify icon={chartType === 'bar' ? "eva:bar-chart-fill" as any : "eva:trending-up-fill" as any} />
                  </IconButton>
                </Box>
              </Box>
              <Chart
                type={chartType === 'bar' ? 'bar' : 'line'}
                series={revenueChartData.series}
                options={useChart({
                  xaxis: { categories: revenueChartData.categories },
                  tooltip: { y: { formatter: (value: number) => `€${value.toLocaleString()}` } },
                  yaxis: { labels: { formatter: (value: number) => `€${value.toLocaleString()}` } },
                })}
                sx={{ height: 300 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ bgcolor: 'grey.100' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Per Channel Total
              </Typography>
              {mockChannelData.map((channel) => (
                <Box key={channel.channel} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: channel.color,
                      borderRadius: '50%',
                      mr: 1,
                    }}
                  />
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {channel.channel}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    €{channel.revenue.toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Rental Revenue per Channel
              </Typography>
              <Chart
                type="bar"
                series={channelRevenueData.series}
                options={useChart({
                  xaxis: { categories: channelRevenueData.categories },
                  tooltip: { y: { formatter: (value: number) => `€${value.toLocaleString()}` } },
                  yaxis: { labels: { formatter: (value: number) => `€${value.toLocaleString()}` } },
                })}
                sx={{ height: 200 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Booked Nights per Channel
              </Typography>
              <Chart
                type="bar"
                series={nightsBookedData.series}
                options={useChart({
                  xaxis: { categories: nightsBookedData.categories },
                  tooltip: { y: { formatter: (value: number) => `${value} nights` } },
                  yaxis: { labels: { formatter: (value: number) => `${value}` } },
                })}
                sx={{ height: 200 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Rental Revenue per Reservation per Channel
              </Typography>
              <Chart
                type="bar"
                series={revenuePerReservationData.series}
                options={useChart({
                  xaxis: { categories: revenuePerReservationData.categories },
                  tooltip: { y: { formatter: (value: number) => `€${value}` } },
                  yaxis: { labels: { formatter: (value: number) => `€${value}` } },
                })}
                sx={{ height: 200 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Check-in Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Check-in by Channels
                </Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Chart Type</InputLabel>
                  <Select value={chartType} onChange={(e) => setChartType(e.target.value)} label="Chart Type">
                    <MenuItem value="bar">Bar Chart</MenuItem>
                    <MenuItem value="line">Line Chart</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Chart
                type={chartType === 'bar' ? 'bar' : 'line'}
                series={checkinData.series}
                options={useChart({
                  xaxis: { categories: checkinData.categories },
                  tooltip: { y: { formatter: (value: number) => `${value} check-ins` } },
                  yaxis: { labels: { formatter: (value: number) => `${value}` } },
                })}
                sx={{ height: 300 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Reservations per Channel
              </Typography>
              <Chart
                type="donut"
                series={reservationsPerChannelData.series}
                options={useChart({
                  labels: reservationsPerChannelData.labels,
                  tooltip: { y: { formatter: (value: number) => `${value} reservations` } },
                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            label: 'Total Reservations',
                            formatter: () => '100',
                          },
                        },
                      },
                    },
                  },
                })}
                sx={{ height: 300 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Upcoming Period */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Upcoming
          </Typography>
          <TextField
            size="small"
            type="date"
            label="From"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 120 }}
          />
          <TextField
            size="small"
            type="date"
            label="To"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 120 }}
          />
          <Button variant="outlined">
            Reset
          </Button>
        </Box>
      </Paper>

      {/* Upcoming Metrics Card */}
      <Card sx={{ bgcolor: 'grey.100' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  €8,500
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rental Revenue
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  32
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nights Booked
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  65.2%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Occupancy Rate
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  €265
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Daily Rate
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  €1,100
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Revenue per Stay
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </DashboardContent>
  );
}
