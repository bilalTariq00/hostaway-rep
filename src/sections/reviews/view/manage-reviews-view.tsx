import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for reviews matching the image
const mockReviews = [
  {
    id: 1,
    guestName: 'Enrique Guzmán De La Vega',
    reservationId: '38968192',
    externalReservationId: '305035-guest-526039194-confirmation-HMFT3XXWR5',
    listingName: 'Navigli',
    listingExternalName: '[Navigli] Beautiful Apartment in MILAN Near TRAM',
    listingId: '305035',
    channel: 'Airbnb',
    origin: 'Host',
    checkIn: '2025-08-10 15:00:00',
    checkOut: '2025-08-14 10:00:00',
    status: 'Published',
    schedule: '2 day checklist',
    triggerEvent: '2 days after check-out',
    overallReview: 'Gentilissimi, speriamo di poterli ospitare di nuovo al più presto ❤️',
    rating: 5,
  },
  {
    id: 2,
    guestName: 'Enrique Guzmán De La Vega',
    reservationId: '38968192',
    externalReservationId: '305035-guest-526039194-confirmation-HMFT3XXWR5',
    listingName: 'Navigli',
    listingExternalName: '[Navigli] Beautiful Apartment in MILAN Near TRAM',
    listingId: '305035',
    channel: 'Airbnb',
    origin: 'Guest',
    checkIn: '2025-08-10 15:00:00',
    checkOut: '2025-08-14 10:00:00',
    status: 'Published',
    schedule: '',
    triggerEvent: '',
    overallReview: '',
    rating: 0,
  },
  {
    id: 3,
    guestName: 'Luis Aguilera Pernas',
    reservationId: '45716494',
    externalReservationId: '305035-guest-534176264-confirmation-HMPQJ5CJH2',
    listingName: 'Navigli',
    listingExternalName: '[Navigli] Beautiful Apartment in MILAN Near TRAM',
    listingId: '305035',
    channel: 'Airbnb',
    origin: 'Host',
    checkIn: '2025-08-14 15:00:00',
    checkOut: '2025-08-17 10:00:00',
    status: 'Published',
    schedule: '2 day checklist',
    triggerEvent: '2 days after check-out',
    overallReview:
      'El apartamento esta muy bien ubicado con muchos bares cerca, y bien equipado. Tuvimos un problema con el aire acondicionicionado y Manu... More',
    rating: 5,
  },
  {
    id: 4,
    guestName: 'Luis Aguilera Pernas',
    reservationId: '45716494',
    externalReservationId: '305035-guest-534176264-confirmation-HMPQJ5CJH2',
    listingName: 'Navigli',
    listingExternalName: '[Navigli] Beautiful Apartment in MILAN Near TRAM',
    listingId: '305035',
    channel: 'Airbnb',
    origin: 'Guest',
    checkIn: '2025-08-14 15:00:00',
    checkOut: '2025-08-17 10:00:00',
    status: 'Published',
    schedule: '',
    triggerEvent: '',
    overallReview: 'Ottimi ospiti speriamo di poterli riaccogliere 😊',
    rating: 5,
  },
  {
    id: 5,
    guestName: 'Agata Szydlo',
    reservationId: '46339070',
    externalReservationId: '6523373137',
    listingName: 'Navigli',
    listingExternalName: '[Navigli] Beautiful Apartment in MILAN Near TRAM',
    listingId: '305035',
    channel: 'Booking.com',
    origin: 'Guest',
    checkIn: '2025-08-17 15:00:00',
    checkOut: '2025-08-19 10:00:00',
    status: 'Pending',
    schedule: '',
    triggerEvent: '',
    overallReview:
      'La casa perfecta para una estancia de vacaciones en Milán, cerca del transporte público, acogedora y muy bonita, muy cómoda para ... More',
    rating: 5,
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
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    guestName: true,
    reservationId: true,
    externalReservationId: true,
    listingName: true,
    listingExternalName: true,
    listingId: true,
    channel: true,
    origin: true,
    checkIn: true,
    checkOut: true,
    status: true,
    schedule: true,
    triggerEvent: true,
    overallReview: true,
    rating: true,
  });

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

  const handleSettingsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchor(null);
  };

  const handleColumnToggle = (column: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column as keyof typeof prev],
    }));
  };

  const handleReservationClick = (reservationId: string) => {
    router.push(`/reservations/${reservationId}`);
  };

  const handleListingClick = (listingId: string) => {
    router.push(`/listings/${listingId}`);
  };

  const totalPages = Math.ceil(mockReviews.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentReviews = mockReviews.slice(startIndex, endIndex);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
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
            startIcon={<Iconify icon={'eva:download-fill' as any} />}
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
              <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
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
              <Select value={guest} label="Guest" onChange={(e) => setGuest(e.target.value)}>
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
              <Select value={listing} label="Listing" onChange={(e) => setListing(e.target.value)}>
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
              <Select value={tags} label="Tags" onChange={(e) => setTags(e.target.value)}>
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
              <Select value={origin} label="Origin" onChange={(e) => setOrigin(e.target.value)}>
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
              startIcon={<Iconify icon={'eva:refresh-fill' as any} />}
              fullWidth
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Reviews Table */}
      <Paper sx={{ mb: 3 }}>
        {/* Table Header with Settings */}
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Reviews Table</Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={'eva:settings-fill' as any} />}
            onClick={handleSettingsOpen}
          >
            Column Settings
          </Button>
        </Box>
        <TableContainer
          sx={{
            maxHeight: 600,
            overflowX: 'auto',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#c1c1c1',
              borderRadius: '4px',
              '&:hover': {
                background: '#a8a8a8',
              },
            },
          }}
        >
          <Table
            stickyHeader
            sx={{
              '& .MuiTableHead-root': {
                position: 'sticky',
                top: 0,
                zIndex: 2,
                backgroundColor: 'background.paper',
              },
              '& .MuiTableCell-root': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
              '& .MuiTableRow-root': {
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              },
            }}
          >
            <TableHead>
              <TableRow>
                {visibleColumns.guestName && (
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: 0,
                      bgcolor: 'background.paper',
                      zIndex: 3,
                      minWidth: 150,
                      borderRight: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    Guest Name
                  </TableCell>
                )}
                {visibleColumns.reservationId && (
                  <TableCell sx={{ minWidth: 120 }}>Reservation ID</TableCell>
                )}
                {visibleColumns.externalReservationId && (
                  <TableCell sx={{ minWidth: 200 }}>External Reservation ID</TableCell>
                )}
                {visibleColumns.listingName && (
                  <TableCell sx={{ minWidth: 120 }}>Listing Name</TableCell>
                )}
                {visibleColumns.listingExternalName && (
                  <TableCell sx={{ minWidth: 250 }}>Listing External Name</TableCell>
                )}
                {visibleColumns.listingId && (
                  <TableCell sx={{ minWidth: 100 }}>Listing ID</TableCell>
                )}
                {visibleColumns.channel && <TableCell sx={{ minWidth: 100 }}>Channel</TableCell>}
                {visibleColumns.origin && <TableCell sx={{ minWidth: 80 }}>Origin</TableCell>}
                {visibleColumns.checkIn && <TableCell sx={{ minWidth: 150 }}>Check-in</TableCell>}
                {visibleColumns.checkOut && <TableCell sx={{ minWidth: 150 }}>Check-out</TableCell>}
                {visibleColumns.status && <TableCell sx={{ minWidth: 120 }}>Status</TableCell>}
                {visibleColumns.schedule && <TableCell sx={{ minWidth: 120 }}>Schedule</TableCell>}
                {visibleColumns.triggerEvent && (
                  <TableCell sx={{ minWidth: 150 }}>Trigger Event</TableCell>
                )}
                {visibleColumns.overallReview && (
                  <TableCell sx={{ minWidth: 300 }}>Overall Review</TableCell>
                )}
                {visibleColumns.rating && <TableCell sx={{ minWidth: 100 }}>Rating</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentReviews.map((review) => (
                <TableRow key={review.id} hover>
                  {visibleColumns.guestName && (
                    <TableCell
                      sx={{
                        position: 'sticky',
                        left: 0,
                        bgcolor: 'background.paper',
                        zIndex: 2,
                        borderRight: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: 'primary.main', cursor: 'pointer' }}
                      >
                        {review.guestName}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.reservationId && (
                    <TableCell sx={{ minWidth: 120 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: 'primary.main', cursor: 'pointer' }}
                        onClick={() => handleReservationClick(review.reservationId)}
                      >
                        {review.reservationId}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.externalReservationId && (
                    <TableCell sx={{ minWidth: 200 }}>
                      <Typography variant="body2">{review.externalReservationId}</Typography>
                    </TableCell>
                  )}
                  {visibleColumns.listingName && (
                    <TableCell sx={{ minWidth: 120 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: 'primary.main', cursor: 'pointer' }}
                        onClick={() => handleListingClick(review.listingId)}
                      >
                        {review.listingName}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.listingExternalName && (
                    <TableCell sx={{ minWidth: 250 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: 'primary.main', cursor: 'pointer' }}
                        onClick={() => handleListingClick(review.listingId)}
                      >
                        {review.listingExternalName}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.listingId && (
                    <TableCell sx={{ minWidth: 100 }}>
                      <Typography variant="body2">{review.listingId}</Typography>
                    </TableCell>
                  )}
                  {visibleColumns.channel && (
                    <TableCell sx={{ minWidth: 100 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: review.channel === 'Airbnb' ? 'error.main' : 'primary.main',
                          }}
                        />
                        <Typography variant="body2">{review.channel}</Typography>
                      </Box>
                    </TableCell>
                  )}
                  {visibleColumns.origin && (
                    <TableCell sx={{ minWidth: 80 }}>
                      <Typography variant="body2">{review.origin}</Typography>
                    </TableCell>
                  )}
                  {visibleColumns.checkIn && (
                    <TableCell sx={{ minWidth: 150 }}>
                      <Typography variant="body2">{review.checkIn}</Typography>
                    </TableCell>
                  )}
                  {visibleColumns.checkOut && (
                    <TableCell sx={{ minWidth: 150 }}>
                      <Typography variant="body2">{review.checkOut}</Typography>
                    </TableCell>
                  )}
                  {visibleColumns.status && (
                    <TableCell sx={{ minWidth: 120 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {review.status === 'Published' ? (
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: 1,
                              bgcolor: 'success.main',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '12px',
                            }}
                          >
                            ✓
                          </Box>
                        ) : review.status === 'Pending' ? (
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: '50%',
                              bgcolor: 'warning.main',
                            }}
                          />
                        ) : null}
                        <Typography variant="body2">{review.status}</Typography>
                      </Box>
                    </TableCell>
                  )}
                  {visibleColumns.schedule && (
                    <TableCell sx={{ minWidth: 120 }}>
                      <Typography variant="body2">{review.schedule || '-'}</Typography>
                    </TableCell>
                  )}
                  {visibleColumns.triggerEvent && (
                    <TableCell sx={{ minWidth: 150 }}>
                      <Typography variant="body2">{review.triggerEvent || '-'}</Typography>
                    </TableCell>
                  )}
                  {visibleColumns.overallReview && (
                    <TableCell sx={{ minWidth: 300 }}>
                      <Typography variant="body2" sx={{ maxWidth: 300 }}>
                        {review.overallReview}
                        {review.overallReview.includes('More') && (
                          <Typography component="span" sx={{ color: 'primary.main', ml: 1 }}>
                            More
                          </Typography>
                        )}
                      </Typography>
                    </TableCell>
                  )}
                  {visibleColumns.rating && (
                    <TableCell sx={{ minWidth: 100 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {renderStars(review.rating)}
                      </Box>
                    </TableCell>
                  )}
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
          <Iconify icon={'eva:file-text-fill' as any} sx={{ mr: 1 }} />
          Export to Excel
        </MenuItem>
        <MenuItem onClick={handleDownloadMenuClose}>
          <Iconify icon={'eva:file-pdf-fill' as any} sx={{ mr: 1 }} />
          Export to PDF
        </MenuItem>
        <MenuItem onClick={handleDownloadMenuClose}>
          <Iconify icon={'eva:file-csv-fill' as any} sx={{ mr: 1 }} />
          Export to CSV
        </MenuItem>
      </Menu>

      {/* Column Settings Popover */}
      <Popover
        open={Boolean(settingsAnchor)}
        anchorEl={settingsAnchor}
        onClose={handleSettingsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, minWidth: 250 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Show/Hide Columns
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select which columns to display in the table
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              maxHeight: 300,
              overflowY: 'auto',
            }}
          >
            {Object.entries(visibleColumns).map(([key, value]) => {
              const columnLabels: { [key: string]: string } = {
                guestName: 'Guest Name',
                reservationId: 'Reservation ID',
                externalReservationId: 'External Reservation ID',
                listingName: 'Listing Name',
                listingExternalName: 'Listing External Name',
                listingId: 'Listing ID',
                channel: 'Channel',
                origin: 'Origin',
                checkIn: 'Check-in',
                checkOut: 'Check-out',
                status: 'Status',
                schedule: 'Schedule',
                triggerEvent: 'Trigger Event',
                overallReview: 'Overall Review',
                rating: 'Rating',
              };

              return (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={value}
                      onChange={() => handleColumnToggle(key)}
                      size="small"
                    />
                  }
                  label={columnLabels[key] || key}
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                />
              );
            })}
          </Box>
          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Button
              size="small"
              onClick={() => {
                setVisibleColumns({
                  guestName: true,
                  reservationId: true,
                  externalReservationId: true,
                  listingName: true,
                  listingExternalName: true,
                  listingId: true,
                  channel: true,
                  origin: true,
                  checkIn: true,
                  checkOut: true,
                  status: true,
                  schedule: true,
                  triggerEvent: true,
                  overallReview: true,
                  rating: true,
                });
              }}
            >
              Show All
            </Button>
            <Button
              size="small"
              onClick={() => {
                setVisibleColumns({
                  guestName: true,
                  reservationId: true,
                  externalReservationId: false,
                  listingName: true,
                  listingExternalName: false,
                  listingId: true,
                  channel: true,
                  origin: true,
                  checkIn: true,
                  checkOut: true,
                  status: true,
                  schedule: false,
                  triggerEvent: false,
                  overallReview: true,
                  rating: true,
                });
              }}
              sx={{ ml: 1 }}
            >
              Show Essential
            </Button>
          </Box>
        </Box>
      </Popover>
    </DashboardContent>
  );
}
