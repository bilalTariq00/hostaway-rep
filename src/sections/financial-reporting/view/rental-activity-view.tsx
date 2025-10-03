import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for rental activity
const mockRentalActivity = [
  {
    id: 1,
    listingName: 'La Dimora Del Cavaliere',
    reservations: 15,
    revenue: 2250,
    nights: 45,
    averageRate: 150,
  },
  {
    id: 2,
    listingName: 'Navigli',
    reservations: 8,
    revenue: 1080,
    nights: 24,
    averageRate: 135,
  },
  {
    id: 3,
    listingName: 'Polacchi42',
    reservations: 12,
    revenue: 1440,
    nights: 36,
    averageRate: 120,
  },
  {
    id: 4,
    listingName: 'Superattico - Via Del C...',
    reservations: 20,
    revenue: 4000,
    nights: 60,
    averageRate: 200,
  },
];

export function RentalActivityView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [viewType, setViewType] = useState('per-reservation');
  const [showZeroReservations, setShowZeroReservations] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [downloadAnchor, setDownloadAnchor] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/financial-reportings/analytics');
    if (newValue === 2) router.push('/financial-reportings/occupancy-report');
    if (newValue === 3) router.push('/financial-reportings/quickbooks');
  };

  const handleDownloadClick = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadAnchor(event.currentTarget);
  };

  const handleDownloadClose = () => {
    setDownloadAnchor(null);
  };

  const handleListingClick = (listingId: number) => {
    console.log('Open listing details for:', listingId);
    // This would open a new page with listing details
  };

  const filteredData = showZeroReservations 
    ? mockRentalActivity 
    : mockRentalActivity.filter(item => item.reservations > 0);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

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

      {/* Title and Actions */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Rental Activity</InputLabel>
              <Select value="rental-activity" label="Rental Activity">
                <MenuItem value="rental-activity">Rental Activity</MenuItem>
                <MenuItem value="revenue">Revenue</MenuItem>
                <MenuItem value="occupancy">Occupancy</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={handleDownloadClick}
              endIcon={<Iconify icon={"eva:arrow-down-fill" as any} />}
            >
              Download Report
            </Button>
            <Menu
              anchorEl={downloadAnchor}
              open={Boolean(downloadAnchor)}
              onClose={handleDownloadClose}
            >
              <MenuItem onClick={handleDownloadClose}>Export CSV</MenuItem>
              <MenuItem onClick={handleDownloadClose}>Export Excel</MenuItem>
              <MenuItem onClick={handleDownloadClose}>Export PDF</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant={viewType === 'per-reservation' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setViewType('per-reservation')}
            >
              Per Reservation
            </Button>
            <Button
              variant={viewType === 'per-listing' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setViewType('per-listing')}
            >
              Per Listing
            </Button>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setShowZeroReservations(!showZeroReservations)}
            startIcon={<Iconify icon={"eva:eye-fill" as any} />}
          >
            Show Listings with 0 Reservations
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
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
          <Button variant="outlined" size="small">
            MTD
          </Button>
          <TextField
            size="small"
            placeholder="Check-in"
            sx={{ minWidth: 120 }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select label="Status">
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select label="Status">
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" size="small">
            Reset Filter
          </Button>
        </Box>
      </Paper>

      {/* Listing Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Listing Name</TableCell>
                <TableCell align="center">Reservations</TableCell>
                <TableCell align="center">Revenue</TableCell>
                <TableCell align="center">Nights</TableCell>
                <TableCell align="center">Average Rate</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ 
                        fontWeight: 500, 
                        cursor: 'pointer',
                        color: 'primary.main',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                      onClick={() => handleListingClick(item.id)}
                    >
                      {item.listingName}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.reservations}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      €{item.revenue.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {item.nights}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      €{item.averageRate}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small">
                      <Iconify icon={"eva:settings-fill" as any} width={16} />
                    </IconButton>
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
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      </Paper>
    </DashboardContent>
  );
}
