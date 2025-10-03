import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
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

// Mock data for occupancy report
const mockOccupancyData = [
  {
    id: 1,
    listingName: 'La Dimora Del Cavaliere',
    nightsAvailable: 30,
    nightsBooked: 25,
    ownerStayNights: 2,
    occupancyRate: 83.3,
    totalCheckin: 15,
  },
  {
    id: 2,
    listingName: 'Navigli',
    nightsAvailable: 28,
    nightsBooked: 20,
    ownerStayNights: 1,
    occupancyRate: 71.4,
    totalCheckin: 12,
  },
  {
    id: 3,
    listingName: 'Polacchi42',
    nightsAvailable: 31,
    nightsBooked: 18,
    ownerStayNights: 3,
    occupancyRate: 58.1,
    totalCheckin: 8,
  },
  {
    id: 4,
    listingName: 'Superattico - Via Del C...',
    nightsAvailable: 29,
    nightsBooked: 24,
    ownerStayNights: 1,
    occupancyRate: 82.8,
    totalCheckin: 18,
  },
];

export function OccupancyReportView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(2);
  const [viewType, setViewType] = useState('standards');
  const [blockedDates, setBlockedDates] = useState('excluded');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [downloadAnchor, setDownloadAnchor] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/financial-reportings/analytics');
    if (newValue === 1) router.push('/financial-reportings/rental-activity');
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

  const totalPages = Math.ceil(mockOccupancyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = mockOccupancyData.slice(startIndex, endIndex);

  // Calculate totals
  const totals = mockOccupancyData.reduce(
    (acc, item) => ({
      nightsAvailable: acc.nightsAvailable + item.nightsAvailable,
      nightsBooked: acc.nightsBooked + item.nightsBooked,
      ownerStayNights: acc.ownerStayNights + item.ownerStayNights,
      totalCheckin: acc.totalCheckin + item.totalCheckin,
    }),
    { nightsAvailable: 0, nightsBooked: 0, ownerStayNights: 0, totalCheckin: 0 }
  );

  const overallOccupancyRate = totals.nightsAvailable > 0 
    ? ((totals.nightsBooked / totals.nightsAvailable) * 100).toFixed(1)
    : '0';

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
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Occupancy Report
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained">
              New Custom View
            </Button>
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
              variant={viewType === 'standards' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setViewType('standards')}
            >
              Standards
            </Button>
            <Button
              variant={viewType === 'by-month' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setViewType('by-month')}
            >
              By Month
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant={blockedDates === 'excluded' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setBlockedDates('excluded')}
            >
              Excluded Blocked Dates
            </Button>
            <Button
              variant={blockedDates === 'included' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setBlockedDates('included')}
            >
              Included Blocked Dates
            </Button>
          </Box>
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

      {/* Occupancy Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Listing Name</TableCell>
                <TableCell align="center">Nights Available</TableCell>
                <TableCell align="center">Nights Booked</TableCell>
                <TableCell align="center">Owner Stay Nights</TableCell>
                <TableCell align="center">Occupancy Rate</TableCell>
                <TableCell align="center">Total Check-in</TableCell>
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
                      {item.nightsAvailable}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.nightsBooked}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {item.ownerStayNights}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={`${item.occupancyRate}%`}
                      size="small"
                      color={item.occupancyRate >= 80 ? 'success' : item.occupancyRate >= 60 ? 'warning' : 'error'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.totalCheckin}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small">
                      <Iconify icon={"eva:settings-fill" as any} width={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {/* Totals Row */}
              <TableRow sx={{ bgcolor: 'grey.50', fontWeight: 600 }}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Total
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {totals.nightsAvailable}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {totals.nightsBooked}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {totals.ownerStayNights}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={`${overallOccupancyRate}%`}
                    size="small"
                    color={parseFloat(overallOccupancyRate) >= 80 ? 'success' : parseFloat(overallOccupancyRate) >= 60 ? 'warning' : 'error'}
                  />
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {totals.totalCheckin}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {/* Empty cell for actions column */}
                </TableCell>
              </TableRow>
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
