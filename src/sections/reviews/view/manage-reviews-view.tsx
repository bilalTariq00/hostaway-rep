import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    guestName: 'John Smith',
    reservationId: 'RES-001',
    externalReservationId: 'EXT-001',
    listingName: 'Villa Del Sol',
    listingExternalName: 'Luxury Villa with Pool',
    listingId: 'LST-001',
    channel: 'Airbnb',
    origin: 'Direct',
    checkIn: '2024-02-15',
    checkOut: '2024-02-20',
    status: 'Published',
    schedule: '2024-02-21',
    triggerName: 'Post-Checkout Review',
    overallRating: 5,
    reviewText: 'Amazing stay! The villa was perfect and the host was very responsive.',
  },
  {
    id: 2,
    guestName: 'Sarah Johnson',
    reservationId: 'RES-002',
    externalReservationId: 'EXT-002',
    listingName: 'Navigli Apartment',
    listingExternalName: 'Modern Apartment in Milan',
    listingId: 'LST-002',
    channel: 'Booking.com',
    origin: 'OTA',
    checkIn: '2024-02-10',
    checkOut: '2024-02-14',
    status: 'Pending',
    schedule: '2024-02-15',
    triggerName: 'Auto Review Request',
    overallRating: 4,
    reviewText: 'Great location and clean apartment. Would stay again.',
  },
  {
    id: 3,
    guestName: 'Mike Wilson',
    reservationId: 'RES-003',
    externalReservationId: 'EXT-003',
    listingName: 'Polacchi42',
    listingExternalName: 'Cozy Studio in City Center',
    listingId: 'LST-003',
    channel: 'Direct',
    origin: 'Website',
    checkIn: '2024-02-05',
    checkOut: '2024-02-09',
    status: 'Draft',
    schedule: '2024-02-10',
    triggerName: 'Manual Review',
    overallRating: 3,
    reviewText: 'Good value for money, but could use some improvements.',
  },
  {
    id: 4,
    guestName: 'Emily Davis',
    reservationId: 'RES-004',
    externalReservationId: 'EXT-004',
    listingName: 'Superattico - Via Del C...',
    listingExternalName: 'Penthouse with City View',
    listingId: 'LST-004',
    channel: 'Airbnb',
    origin: 'Direct',
    checkIn: '2024-01-28',
    checkOut: '2024-02-02',
    status: 'Published',
    schedule: '2024-02-03',
    triggerName: 'Post-Checkout Review',
    overallRating: 5,
    reviewText: 'Absolutely stunning views and perfect location!',
  },
  {
    id: 5,
    guestName: 'David Brown',
    reservationId: 'RES-005',
    externalReservationId: 'EXT-005',
    listingName: 'Villa Del Sol',
    listingExternalName: 'Luxury Villa with Pool',
    listingId: 'LST-001',
    channel: 'Booking.com',
    origin: 'OTA',
    checkIn: '2024-01-20',
    checkOut: '2024-01-25',
    status: 'Rejected',
    schedule: '2024-01-26',
    triggerName: 'Auto Review Request',
    overallRating: 2,
    reviewText: 'Had some issues with cleanliness and communication.',
  },
];

export function ManageReviewsView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage] = useState(25);
  const [downloadMenuAnchor, setDownloadMenuAnchor] = useState<null | HTMLElement>(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('');
  const [guest, setGuest] = useState('');
  const [listing, setListing] = useState('');
  const [tags, setTags] = useState('');
  const [origin, setOrigin] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) router.push('/reviews/auto-reviews');
    if (newValue === 2) router.push('/reviews/templates');
  };

  const handleDownloadMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
  };

  const handleDownloadMenuClose = () => {
    setDownloadMenuAnchor(null);
  };

  const handleResetFilters = () => {
    setFromDate('');
    setToDate('');
    setStatus('');
    setGuest('');
    setListing('');
    setTags('');
    setOrigin('');
  };


  const totalPages = Math.ceil(mockReviews.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentReviews = mockReviews.slice(startIndex, endIndex);

  const renderStars = (rating: number) => Array.from({ length: 5 }, (_, index) => (
    <Box
      key={index}
      component="span"
      sx={{
        color: index < rating ? '#ffc107' : '#e0e0e0',
        fontSize: 16,
        display: 'inline-block',
        width: 16,
        height: 16,
        '&::before': {
          content: '"★"',
        },
      }}
    />
  ));

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Download Dropdown */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Reviews
          </Typography>
          <Button
            variant="outlined"
            onClick={handleDownloadMenuOpen}
            startIcon={<Iconify icon={"eva:download-fill" as any} />}
          >
            Download Report
          </Button>
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
              bgcolor: 'primary.main',
            },
          }}
        >
          <Tab label="Manage Reviews" />
          <Tab label="Auto Reviews" />
          <Tab label="Review Templates" />
        </Tabs>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="From"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="To"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Guest</InputLabel>
              <Select
                value={guest}
                label="Guest"
                onChange={(e) => setGuest(e.target.value)}
              >
                <MenuItem value="">All Guests</MenuItem>
                <MenuItem value="john">John Smith</MenuItem>
                <MenuItem value="sarah">Sarah Johnson</MenuItem>
                <MenuItem value="mike">Mike Wilson</MenuItem>
                <MenuItem value="emily">Emily Davis</MenuItem>
                <MenuItem value="david">David Brown</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Listing</InputLabel>
              <Select
                value={listing}
                label="Listing"
                onChange={(e) => setListing(e.target.value)}
              >
                <MenuItem value="">All Listings</MenuItem>
                <MenuItem value="villa">Villa Del Sol</MenuItem>
                <MenuItem value="navigli">Navigli Apartment</MenuItem>
                <MenuItem value="polacchi">Polacchi42</MenuItem>
                <MenuItem value="superattico">Superattico - Via Del C...</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Tags</InputLabel>
              <Select
                value={tags}
                label="Tags"
                onChange={(e) => setTags(e.target.value)}
              >
                <MenuItem value="">All Tags</MenuItem>
                <MenuItem value="positive">Positive</MenuItem>
                <MenuItem value="negative">Negative</MenuItem>
                <MenuItem value="neutral">Neutral</MenuItem>
                <MenuItem value="follow-up">Follow-up Required</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Origin</InputLabel>
              <Select
                value={origin}
                label="Origin"
                onChange={(e) => setOrigin(e.target.value)}
              >
                <MenuItem value="">All Origins</MenuItem>
                <MenuItem value="direct">Direct</MenuItem>
                <MenuItem value="ota">OTA</MenuItem>
                <MenuItem value="website">Website</MenuItem>
                <MenuItem value="mobile">Mobile App</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Button
              variant="outlined"
              onClick={handleResetFilters}
              startIcon={<Iconify icon={"eva:refresh-fill" as any} />}
              fullWidth
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Reviews Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer sx={{ maxHeight: 600, overflowX: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ position: 'sticky', left: 0, bgcolor: 'background.paper', zIndex: 1, minWidth: 150 }}>
                  Guest Name
                </TableCell>
                <TableCell>Reservation ID</TableCell>
                <TableCell>External Reservation ID</TableCell>
                <TableCell>Listing Name</TableCell>
                <TableCell>Listing External Name</TableCell>
                <TableCell>Listing ID</TableCell>
                <TableCell>Channel</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Schedule</TableCell>
                <TableCell>Trigger Name</TableCell>
                <TableCell>Overall Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentReviews.map((review) => (
                <TableRow key={review.id} hover>
                  <TableCell sx={{ position: 'sticky', left: 0, bgcolor: 'background.paper', zIndex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {review.guestName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {review.reservationId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {review.externalReservationId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {review.listingName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {review.listingExternalName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {review.listingId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={review.channel}
                      size="small"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {review.origin}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {review.checkIn}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {review.checkOut}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={review.status}
                      size="small"
                      color={
                        review.status === 'Published'
                          ? 'success'
                          : review.status === 'Pending'
                            ? 'warning'
                            : review.status === 'Draft'
                              ? 'info'
                              : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {review.schedule}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {review.triggerName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {renderStars(review.overallRating)}
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {review.overallRating}/5
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Show 25 per page
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage + 1}
            onChange={(_, page) => setCurrentPage(page - 1)}
            color="primary"
          />
        </Box>
      </Paper>

      {/* Download Menu */}
      <Menu
        anchorEl={downloadMenuAnchor}
        open={Boolean(downloadMenuAnchor)}
        onClose={handleDownloadMenuClose}
      >
        <MenuItem onClick={handleDownloadMenuClose}>
          <Iconify icon={"eva:file-text-fill" as any} sx={{ mr: 1 }} />
          Export to Excel
        </MenuItem>
        <MenuItem onClick={handleDownloadMenuClose}>
          <Iconify icon={"eva:file-pdf-fill" as any} sx={{ mr: 1 }} />
          Export to PDF
        </MenuItem>
        <MenuItem onClick={handleDownloadMenuClose}>
          <Iconify icon={"eva:file-csv-fill" as any} sx={{ mr: 1 }} />
          Export to CSV
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}
