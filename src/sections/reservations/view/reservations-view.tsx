import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for reservations
const mockReservations = [
  {
    id: 1,
    guestName: 'John Smith',
    checkInDate: '2024-10-15',
    status: 'Confirmed',
    property: 'La Dimora Del Cavaliere',
    nights: 3,
    guests: 2,
    totalAmount: 225,
  },
  {
    id: 2,
    guestName: 'Maria Garcia',
    checkInDate: '2024-10-20',
    status: 'Pending',
    property: 'Navigli',
    nights: 2,
    guests: 4,
    totalAmount: 270,
  },
  {
    id: 3,
    guestName: 'David Johnson',
    checkInDate: '2024-10-25',
    status: 'Confirmed',
    property: 'Polacchi42',
    nights: 5,
    guests: 3,
    totalAmount: 600,
  },
  {
    id: 4,
    guestName: 'Sarah Wilson',
    checkInDate: '2024-11-01',
    status: 'Cancelled',
    property: 'Superattico - Via Del C...',
    nights: 2,
    guests: 2,
    totalAmount: 400,
  },
];

export function ReservationsView() {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState(['Status: Confirmed']);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [downloadAnchor, setDownloadAnchor] = useState<null | HTMLElement>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const handleDownloadClick = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadAnchor(event.currentTarget);
  };

  const handleDownloadClose = () => {
    setDownloadAnchor(null);
  };

  const handleRemoveFilter = (filterToRemove: string) => {
    setActiveFilters(activeFilters.filter(filter => filter !== filterToRemove));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredReservations = mockReservations.filter(reservation =>
    reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReservations = filteredReservations.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Reservations
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={() => router.push('/reservations/custom-fields')}>
              Custom Fields
            </Button>
            <Button variant="outlined" onClick={() => router.push('/reservations/guestbook')}>
              Guestbook
            </Button>
            <Button variant="outlined" onClick={() => router.push('/reservations/coupons')}>
              Coupons
            </Button>
            <Button
              variant="outlined"
              onClick={handleDownloadClick}
              endIcon={<Iconify icon={"eva:arrow-down-fill" as any} />}
            >
              Download Guest Data
            </Button>
            <Menu
              anchorEl={downloadAnchor}
              open={Boolean(downloadAnchor)}
              onClose={handleDownloadClose}
            >
              <MenuItem onClick={handleDownloadClose}>Export CSV</MenuItem>
              <MenuItem onClick={handleDownloadClose}>Export Excel</MenuItem>
              <MenuItem onClick={handleDownloadClose}>Download Report</MenuItem>
            </Menu>
            <Button variant="outlined">
              Import
            </Button>
            <Button variant="contained">
              Add Reservation
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={handleFilterClick}
              startIcon={<Iconify icon={"eva:funnel-fill" as any} />}
              sx={{ position: 'relative' }}
            >
              Filter
              {activeFilters.length > 0 && (
                <Chip
                  label={activeFilters.length}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    bgcolor: 'warning.main',
                    color: 'white',
                    fontSize: '0.7rem',
                    height: 18,
                    minWidth: 18,
                  }}
                />
              )}
            </Button>
            <Menu
              anchorEl={filterAnchor}
              open={Boolean(filterAnchor)}
              onClose={handleFilterClose}
            >
              <MenuItem onClick={handleFilterClose}>Status</MenuItem>
              <MenuItem onClick={handleFilterClose}>Date Range</MenuItem>
              <MenuItem onClick={handleFilterClose}>Property</MenuItem>
              <MenuItem onClick={handleFilterClose}>Guest</MenuItem>
            </Menu>
          </Box>
          <TextField
            size="small"
            placeholder="Search by guest name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
        </Box>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="body2" color="error.main">
              Filtered by:
            </Typography>
            {activeFilters.map((filter) => (
              <Chip
                key={filter}
                label={filter}
                size="small"
                onDelete={() => handleRemoveFilter(filter)}
                sx={{ bgcolor: 'error.light', color: 'white' }}
              />
            ))}
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Viewing {currentReservations.length} of {filteredReservations.length} reservations
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Reservations Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Guest Name</TableCell>
                <TableCell>Check-in Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Property</TableCell>
                <TableCell>Nights</TableCell>
                <TableCell>Guests</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {reservation.guestName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(reservation.checkInDate).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={reservation.status}
                      size="small"
                      color={getStatusColor(reservation.status) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {reservation.property}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {reservation.nights}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {reservation.guests}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      €{reservation.totalAmount}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small">
                        <Iconify icon={"eva:edit-fill" as any} width={16} />
                      </IconButton>
                      <IconButton size="small">
                        <Iconify icon={"eva:message-circle-fill" as any} width={16} />
                      </IconButton>
                      <IconButton size="small">
                        <Iconify icon={"eva:calendar-fill" as any} width={16} />
                      </IconButton>
                      <IconButton size="small">
                        <Iconify icon={"eva:more-vertical-fill" as any} width={16} />
                      </IconButton>
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Show
            </Typography>
            <TextField
              select
              size="small"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              sx={{ minWidth: 80 }}
              SelectProps={{ native: true }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </TextField>
            <Typography variant="body2" color="text.secondary">
              per page
            </Typography>
          </Box>
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
