import { useState } from 'react';
import { Eye, Search, Settings, Download, ChevronUp, ChevronDown } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for rental activity
const mockRentalActivity = [
  {
    id: 305034,
    listingName: 'La Dimora Del Cavaliere',
    occupancyRate: 85.5,
    occupancyTrend: 'up', // 'up', 'down', 'stable'
    occupancyChange: 5.2,
    cedolareSeccaAirbnb: 255.37,
    cedolareSeccaBooking: 0.0,
    cedolareSeccaDomus: 107.82,
    cedolareSeccaTotale: 363.19,
    cleaningFee: 50.0,
    towelChangeFee: 15.0,
    midstayCleaningFee: 80.0,
    roomRequestFee: 25.0,
    reservationChangeFee: 30.0,
    checkinFee: 20.0,
    lateCheckoutFee: 40.0,
    otherFees: 0.0,
    ivaBooking: 55.0,
    ivaCommissioni: 12.5,
    marginalitaProprietario: 1200.0,
    percentualePropertyManager: 15.0,
    ricavoBookingPrePMePulizie: 1500.0,
    ricavoLordo: 1800.0,
    tassaDiSoggiorno: 45.0,
  },
  {
    id: 305225,
    listingName: 'Polacchi42',
    occupancyRate: 72.3,
    occupancyTrend: 'down',
    occupancyChange: -3.1,
    cedolareSeccaAirbnb: 0.0,
    cedolareSeccaBooking: 198.84,
    cedolareSeccaDomus: 103.96,
    cedolareSeccaTotale: 302.8,
    cleaningFee: 60.0,
    towelChangeFee: 20.0,
    midstayCleaningFee: 100.0,
    roomRequestFee: 30.0,
    reservationChangeFee: 35.0,
    checkinFee: 25.0,
    lateCheckoutFee: 50.0,
    otherFees: 15.0,
    ivaBooking: 65.0,
    ivaCommissioni: 15.0,
    marginalitaProprietario: 1400.0,
    percentualePropertyManager: 18.0,
    ricavoBookingPrePMePulizie: 1700.0,
    ricavoLordo: 2000.0,
    tassaDiSoggiorno: 50.0,
  },
  {
    id: 305421,
    listingName: 'Superattico - Via Del Corso 43',
    occupancyRate: 91.8,
    occupancyTrend: 'up',
    occupancyChange: 8.7,
    cedolareSeccaAirbnb: 112.35,
    cedolareSeccaBooking: 219.59,
    cedolareSeccaDomus: 184.03,
    cedolareSeccaTotale: 515.97,
    cleaningFee: 80.0,
    towelChangeFee: 25.0,
    midstayCleaningFee: 120.0,
    roomRequestFee: 40.0,
    reservationChangeFee: 45.0,
    checkinFee: 30.0,
    lateCheckoutFee: 60.0,
    otherFees: 20.0,
    ivaBooking: 85.0,
    ivaCommissioni: 20.0,
    marginalitaProprietario: 2000.0,
    percentualePropertyManager: 20.0,
    ricavoBookingPrePMePulizie: 2500.0,
    ricavoLordo: 3000.0,
    tassaDiSoggiorno: 75.0,
  },
  {
    id: 308582,
    listingName: 'Monteverde - Quattroventi',
    occupancyRate: 78.2,
    occupancyTrend: 'stable',
    occupancyChange: 0.0,
    cedolareSeccaAirbnb: 228.6,
    cedolareSeccaBooking: 0.0,
    cedolareSeccaDomus: 140.6,
    cedolareSeccaTotale: 369.2,
    cleaningFee: 70.0,
    towelChangeFee: 18.0,
    midstayCleaningFee: 110.0,
    roomRequestFee: 35.0,
    reservationChangeFee: 40.0,
    checkinFee: 28.0,
    lateCheckoutFee: 55.0,
    otherFees: 10.0,
    ivaBooking: 75.0,
    ivaCommissioni: 18.0,
    marginalitaProprietario: 1600.0,
    percentualePropertyManager: 16.0,
    ricavoBookingPrePMePulizie: 2000.0,
    ricavoLordo: 2400.0,
    tassaDiSoggiorno: 60.0,
  },
  {
    id: 317154,
    listingName: '[5 Min From Trastevere] Chic Apt',
    occupancyRate: 88.9,
    occupancyTrend: 'up',
    occupancyChange: 4.3,
    cedolareSeccaAirbnb: 305.59,
    cedolareSeccaBooking: 83.29,
    cedolareSeccaDomus: 262.41,
    cedolareSeccaTotale: 651.29,
    cleaningFee: 90.0,
    towelChangeFee: 30.0,
    midstayCleaningFee: 140.0,
    roomRequestFee: 50.0,
    reservationChangeFee: 55.0,
    checkinFee: 35.0,
    lateCheckoutFee: 70.0,
    otherFees: 25.0,
    ivaBooking: 95.0,
    ivaCommissioni: 22.0,
    marginalitaProprietario: 2200.0,
    percentualePropertyManager: 22.0,
    ricavoBookingPrePMePulizie: 2800.0,
    ricavoLordo: 3400.0,
    tassaDiSoggiorno: 85.0,
  },
  {
    id: 345603,
    listingName: 'Via Dei Marruccini | San Lorenzo',
    occupancyRate: 65.4,
    occupancyTrend: 'down',
    occupancyChange: -7.2,
    cedolareSeccaAirbnb: 241.4,
    cedolareSeccaBooking: 0.0,
    cedolareSeccaDomus: 115.76,
    cedolareSeccaTotale: 357.16,
    cleaningFee: 55.0,
    towelChangeFee: 16.0,
    midstayCleaningFee: 95.0,
    roomRequestFee: 32.0,
    reservationChangeFee: 38.0,
    checkinFee: 26.0,
    lateCheckoutFee: 52.0,
    otherFees: 12.0,
    ivaBooking: 70.0,
    ivaCommissioni: 16.0,
    marginalitaProprietario: 1500.0,
    percentualePropertyManager: 17.0,
    ricavoBookingPrePMePulizie: 1800.0,
    ricavoLordo: 2200.0,
    tassaDiSoggiorno: 55.0,
  },
  {
    id: 372243,
    listingName: 'Luxury Stay in Rome - Steps from Metro A Cornelia',
    occupancyRate: 94.1,
    occupancyTrend: 'up',
    occupancyChange: 2.8,
    cedolareSeccaAirbnb: 360.66,
    cedolareSeccaBooking: 0.0,
    cedolareSeccaDomus: 176.14,
    cedolareSeccaTotale: 536.8,
    cleaningFee: 100.0,
    towelChangeFee: 35.0,
    midstayCleaningFee: 160.0,
    roomRequestFee: 60.0,
    reservationChangeFee: 65.0,
    checkinFee: 40.0,
    lateCheckoutFee: 80.0,
    otherFees: 30.0,
    ivaBooking: 110.0,
    ivaCommissioni: 25.0,
    marginalitaProprietario: 2800.0,
    percentualePropertyManager: 25.0,
    ricavoBookingPrePMePulizie: 3500.0,
    ricavoLordo: 4200.0,
    tassaDiSoggiorno: 105.0,
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
  const [columnSettingsAnchor, setColumnSettingsAnchor] = useState<null | HTMLElement>(null);
  const [columnSearchTerm, setColumnSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Define all available columns
  const allColumns = [
    { key: 'listingName', label: 'Listing', sortable: true, mandatory: true },
    { key: 'id', label: 'Listing ID', sortable: true, mandatory: true },
    { key: 'occupancyRate', label: 'Occupancy Rate', sortable: true, mandatory: true },
    { key: 'cedolareSeccaAirbnb', label: 'Cedolare Secca Airbnb Classico', sortable: true },
    { key: 'cedolareSeccaBooking', label: 'Cedolare Secca Booking Classico', sortable: true },
    { key: 'cedolareSeccaDomus', label: 'Cedolare Secca Domus Feriae', sortable: true },
    { key: 'cedolareSeccaTotale', label: 'Cedolare Secca Totale Classica', sortable: true },
    { key: 'cleaningFee', label: 'Cleaning Fee Per Appartamento', sortable: true },
    { key: 'towelChangeFee', label: 'Towel change fee', sortable: true },
    { key: 'midstayCleaningFee', label: 'Midstay cleaning fee', sortable: true },
    { key: 'roomRequestFee', label: 'Room request fee', sortable: true },
    { key: 'reservationChangeFee', label: 'Reservation change fee', sortable: true },
    { key: 'checkinFee', label: 'Checkin fee', sortable: true },
    { key: 'lateCheckoutFee', label: 'Late checkout fee', sortable: true },
    { key: 'otherFees', label: 'Other fees', sortable: true },
    { key: 'ivaBooking', label: 'IVA Booking', sortable: true },
    { key: 'ivaCommissioni', label: 'IVA Commissioni', sortable: true },
    { key: 'marginalitaProprietario', label: 'Marginalita Proprietario', sortable: true },
    { key: 'percentualePropertyManager', label: 'Percentuale Property Manager', sortable: true },
    { key: 'ricavoBookingPrePMePulizie', label: 'Ricavo Booking Pre P Me Pulizie', sortable: true },
    { key: 'ricavoLordo', label: 'Ricavo Lordo', sortable: true },
    { key: 'tassaDiSoggiorno', label: 'Tassa Di Soggiorno', sortable: true },
  ];

  // Default visible columns
  const [visibleColumns, setVisibleColumns] = useState([
    'listingName',
    'id',
    'cedolareSeccaAirbnb',
    'cedolareSeccaBooking',
    'cedolareSeccaDomus',
    'cedolareSeccaTotale',
  ]);

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

  const handleColumnSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setColumnSettingsAnchor(event.currentTarget);
  };

  const handleColumnSettingsClose = () => {
    setColumnSettingsAnchor(null);
  };

  const handleListingClick = (listingId: number) => {
    router.push(`/listings/${listingId}/edit`);
  };

  const handleColumnToggle = (columnKey: string) => {
    const column = allColumns.find((col) => col.key === columnKey);

    // Prevent removing mandatory columns
    if (column?.mandatory) {
      return;
    }

    setVisibleColumns((prev) =>
      prev.includes(columnKey) ? prev.filter((col) => col !== columnKey) : [...prev, columnKey]
    );
  };

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const filteredData = mockRentalActivity;

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    return sortDirection === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  // Filter columns based on search
  const filteredColumns = allColumns.filter((column) =>
    column.label.toLowerCase().includes(columnSearchTerm.toLowerCase())
  );

  // Calculate totals for visible columns
  const totals = visibleColumns.reduce(
    (acc, columnKey) => {
      const column = allColumns.find((col) => col.key === columnKey);
      if (column && columnKey !== 'listingName' && columnKey !== 'id') {
        acc[columnKey] = sortedData.reduce((sum, item) => {
          const value = item[columnKey as keyof typeof item];
          return sum + (typeof value === 'number' ? value : 0);
        }, 0);
      }
      return acc;
    },
    {} as Record<string, number>
  );

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
              startIcon={<Download size={16} />}
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
            startIcon={<Eye size={16} />}
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
          <TextField size="small" placeholder="Check-in" sx={{ minWidth: 120 }} />
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
        <TableContainer sx={{ maxHeight: 600, overflowX: 'auto', overflowY: 'auto' }}>
          <Table sx={{ minWidth: visibleColumns.length * 150 }}>
            <TableHead>
              <TableRow>
                {visibleColumns.map((columnKey) => {
                  const column = allColumns.find((col) => col.key === columnKey);
                  if (!column) return null;

                  return (
                    <TableCell
                      key={columnKey}
                      align={columnKey === 'listingName' ? 'left' : 'center'}
                      sx={{
                        fontWeight: 600,
                        cursor: column.sortable ? 'pointer' : 'default',
                        minWidth: columnKey === 'listingName' ? 200 : 150,
                        whiteSpace: 'nowrap',
                        '&:hover': column.sortable ? { bgcolor: 'grey.50' } : {},
                      }}
                      onClick={() => column.sortable && handleSort(columnKey)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {column.label}
                        {column.sortable && (
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ChevronUp
                              size={12}
                              color={
                                sortColumn === columnKey && sortDirection === 'asc'
                                  ? '#00A76F'
                                  : '#666'
                              }
                            />
                            <ChevronDown
                              size={12}
                              color={
                                sortColumn === columnKey && sortDirection === 'desc'
                                  ? '#00A76F'
                                  : '#666'
                              }
                            />
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                  );
                })}
                {/* Settings Column */}
                <TableCell
                  align="center"
                  sx={{
                    minWidth: 60,
                    width: 60,
                    position: 'sticky',
                    right: 0,
                    bgcolor: 'background.paper',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                    zIndex: 1,
                    px: 0,
                  }}
                >
                  <IconButton
                    onClick={handleColumnSettingsClick}
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        bgcolor: 'grey.100',
                        color: 'text.primary',
                      },
                    }}
                  >
                    <Settings size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{
                    bgcolor: index % 2 === 0 ? 'white' : 'grey.50',
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  {visibleColumns.map((columnKey) => {
                    const column = allColumns.find((col) => col.key === columnKey);
                    if (!column) return null;

                    const value = item[columnKey as keyof typeof item];
                    const isNumeric = typeof value === 'number';

                    return (
                      <TableCell
                        key={columnKey}
                        align={columnKey === 'listingName' ? 'left' : 'center'}
                        sx={{
                          minWidth: columnKey === 'listingName' ? 200 : 150,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {columnKey === 'listingName' ? (
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              cursor: 'pointer',
                              color: 'primary.main',
                              '&:hover': { textDecoration: 'underline' },
                            }}
                            onClick={() => handleListingClick(item.id)}
                          >
                            {value as string}
                          </Typography>
                        ) : (
                          <Typography variant="body2" sx={{ fontWeight: isNumeric ? 500 : 400 }}>
                            {isNumeric ? `€${value.toFixed(2)}` : String(value)}
                          </Typography>
                        )}
                      </TableCell>
                    );
                  })}
                  {/* Empty Settings Column */}
                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 60,
                      width: 60,
                      position: 'sticky',
                      right: 0,
                      bgcolor: index % 2 === 0 ? 'white' : 'grey.50',
                      borderLeft: '1px solid',
                      borderColor: 'divider',
                      zIndex: 1,
                      px: 0,
                    }}
                  >
                    {/* Empty cell for settings column */}
                  </TableCell>
                </TableRow>
              ))}

              {/* Totals Row */}
              <TableRow sx={{ bgcolor: 'grey.100', fontWeight: 600 }}>
                {visibleColumns.map((columnKey) => {
                  const column = allColumns.find((col) => col.key === columnKey);
                  if (!column) return null;

                  return (
                    <TableCell
                      key={`total-${columnKey}`}
                      align={columnKey === 'listingName' ? 'left' : 'center'}
                      sx={{
                        fontWeight: 600,
                        minWidth: columnKey === 'listingName' ? 200 : 150,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {columnKey === 'listingName' ? (
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Total
                        </Typography>
                      ) : columnKey === 'id' ? (
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          -
                        </Typography>
                      ) : (
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          €{totals[columnKey]?.toFixed(2) || '0.00'}
                        </Typography>
                      )}
                    </TableCell>
                  );
                })}
                {/* Empty Settings Column */}
                <TableCell
                  align="center"
                  sx={{
                    minWidth: 60,
                    width: 60,
                    position: 'sticky',
                    right: 0,
                    bgcolor: 'grey.100',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                    zIndex: 1,
                    px: 0,
                  }}
                >
                  {/* Empty cell for settings column */}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Show
            </Typography>
            <TextField
              size="small"
              value={itemsPerPage}
              sx={{ width: 60 }}
              inputProps={{ style: { textAlign: 'center' } }}
            />
            <Typography variant="body2" color="text.secondary">
              per page
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button size="small" variant="outlined">
              FIRST
            </Button>
            <Button size="small" variant="outlined">
              &lt;
            </Button>
            <Button size="small" variant="contained">
              {currentPage}
            </Button>
            <Button size="small" variant="outlined">
              &gt;
            </Button>
            <Button size="small" variant="outlined">
              LAST
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Column Settings Popover */}
      <Popover
        open={Boolean(columnSettingsAnchor)}
        anchorEl={columnSettingsAnchor}
        onClose={handleColumnSettingsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPopover-paper': {
            width: 300,
            maxHeight: 400,
            overflow: 'auto',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Search */}
          <TextField
            fullWidth
            size="small"
            placeholder="Find column"
            value={columnSearchTerm}
            onChange={(e) => setColumnSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search size={16} color="#666" style={{ marginRight: 8 }} />,
            }}
            sx={{ mb: 2 }}
          />

          {/* Column List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {filteredColumns.map((column) => (
              <FormControlLabel
                key={column.key}
                control={
                  <Checkbox
                    checked={visibleColumns.includes(column.key)}
                    onChange={() => handleColumnToggle(column.key)}
                    disabled={column.mandatory}
                    size="small"
                    sx={{
                      color: 'primary.main',
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                      '&.Mui-disabled': {
                        color: 'grey.400',
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.875rem',
                      color: column.mandatory ? 'grey.500' : 'text.primary',
                      fontWeight: column.mandatory ? 500 : 400,
                    }}
                  >
                    {column.label}
                    {column.mandatory && ' (Required)'}
                  </Typography>
                }
                sx={{ margin: 0 }}
              />
            ))}
          </Box>
        </Box>
      </Popover>
    </DashboardContent>
  );
}
