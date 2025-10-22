import { useState } from 'react';
import {
  Minus,
  Search,
  Download,
  Settings,
  ChevronUp,
  TrendingUp,
  ChevronDown,
  TrendingDown,
} from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
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
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for occupancy report
const mockOccupancyData = [
  {
    id: 1,
    listingName: 'La Dimora Del Cavaliere',
    nightsAvailable: 30,
    nightsBooked: 25,
    ownerStayNights: 2,
    occupancyRate: 83.3,
    occupancyTrend: 'up', // 'up', 'down', 'stable'
    occupancyChange: 5.2,
    totalCheckin: 15,
  },
  {
    id: 2,
    listingName: 'Navigli',
    nightsAvailable: 28,
    nightsBooked: 20,
    ownerStayNights: 1,
    occupancyRate: 71.4,
    occupancyTrend: 'down',
    occupancyChange: -3.1,
    totalCheckin: 12,
  },
  {
    id: 3,
    listingName: 'Polacchi42',
    nightsAvailable: 31,
    nightsBooked: 18,
    ownerStayNights: 3,
    occupancyRate: 58.1,
    occupancyTrend: 'stable',
    occupancyChange: 0.0,
    totalCheckin: 8,
  },
  {
    id: 4,
    listingName: 'Superattico - Via Del C...',
    nightsAvailable: 29,
    nightsBooked: 24,
    ownerStayNights: 1,
    occupancyRate: 82.8,
    occupancyTrend: 'up',
    occupancyChange: 8.7,
    totalCheckin: 18,
  },
];

// Helper function to render occupancy rate with trend
const renderOccupancyRate = (rate: number, trend: string, change: number) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} color="#00A76F" />;
      case 'down':
        return <TrendingDown size={14} color="#FF5630" />;
      case 'stable':
        return <Minus size={14} color="#637381" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return '#00A76F';
      case 'down':
        return '#FF5630';
      case 'stable':
        return '#637381';
      default:
        return '#637381';
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Chip
        label={`${rate}%`}
        size="small"
        color={rate >= 80 ? 'success' : rate >= 60 ? 'warning' : 'error'}
      />
      {change !== 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
          {getTrendIcon()}
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.75rem',
              color: getTrendColor(),
              fontWeight: 500,
            }}
          >
            {Math.abs(change)}%
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export function OccupancyReportView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(2);
  const [viewType, setViewType] = useState('standards');
  const [blockedDates, setBlockedDates] = useState('excluded');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [downloadAnchor, setDownloadAnchor] = useState<null | HTMLElement>(null);
  const [columnSettingsAnchor, setColumnSettingsAnchor] = useState<null | HTMLElement>(null);
  const [columnSearchTerm, setColumnSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Define all available columns
  const allColumns = [
    { key: 'listingName', label: 'Listing Name', sortable: true, mandatory: true },
    { key: 'nightsAvailable', label: 'Nights Available', sortable: true },
    { key: 'nightsBooked', label: 'Nights Booked', sortable: true },
    { key: 'ownerStayNights', label: 'Owner Stay Nights', sortable: true },
    { key: 'occupancyRate', label: 'Occupancy Rate', sortable: true, mandatory: true },
    { key: 'totalCheckin', label: 'Total Check-in', sortable: true },
  ];

  // Default visible columns
  const [visibleColumns, setVisibleColumns] = useState([
    'listingName',
    'nightsAvailable',
    'nightsBooked',
    'ownerStayNights',
    'occupancyRate',
    'totalCheckin',
  ]);

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
    router.push(`/listings/${listingId}/edit`);
  };

  const handleColumnSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setColumnSettingsAnchor(event.currentTarget);
  };

  const handleColumnSettingsClose = () => {
    setColumnSettingsAnchor(null);
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

  const totalPages = Math.ceil(mockOccupancyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Sort data
  const sortedData = [...mockOccupancyData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aStr = String(aValue || '');
    const bStr = String(bValue || '');

    return sortDirection === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });

  const currentData = sortedData.slice(startIndex, endIndex);

  // Filter columns for settings popover
  const filteredColumns = allColumns.filter((column) =>
    column.label.toLowerCase().includes(columnSearchTerm.toLowerCase())
  );

  // Calculate totals
  const totals = mockOccupancyData.reduce(
    (acc, item) => ({
      nightsAvailable: acc.nightsAvailable + item.nightsAvailable,
      nightsBooked: acc.nightsBooked + item.nightsBooked,
      ownerStayNights: acc.ownerStayNights + item.ownerStayNights,
      totalCheckin: acc.totalCheckin + item.totalCheckin,
      occupancyChange: acc.occupancyChange + item.occupancyChange,
    }),
    { nightsAvailable: 0, nightsBooked: 0, ownerStayNights: 0, totalCheckin: 0, occupancyChange: 0 }
  );

  const overallOccupancyRate =
    totals.nightsAvailable > 0
      ? ((totals.nightsBooked / totals.nightsAvailable) * 100).toFixed(1)
      : '0';

  // Calculate overall trend
  const overallTrend =
    totals.occupancyChange > 0 ? 'up' : totals.occupancyChange < 0 ? 'down' : 'stable';

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
            <Button variant="contained">New Custom View</Button>
            <Button
              variant="outlined"
              onClick={handleDownloadClick}
              endIcon={<Download size={16} />}
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

      {/* Occupancy Table */}
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
                      align="center"
                      sx={{
                        fontWeight: 600,
                        minWidth: 150,
                        whiteSpace: 'nowrap',
                        cursor: column.sortable ? 'pointer' : 'default',
                        '&:hover': column.sortable ? { bgcolor: 'grey.50' } : {},
                      }}
                      onClick={() => column.sortable && handleSort(columnKey)}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 0.5,
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {column.label}
                        </Typography>
                        {column.sortable && (
                          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 0.5 }}>
                            <ChevronUp
                              size={12}
                              color={
                                sortColumn === columnKey && sortDirection === 'asc'
                                  ? '#00A76F'
                                  : '#637381'
                              }
                            />
                            <ChevronDown
                              size={12}
                              color={
                                sortColumn === columnKey && sortDirection === 'desc'
                                  ? '#00A76F'
                                  : '#637381'
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
              {currentData.map((item) => (
                <TableRow key={item.id}>
                  {visibleColumns.map((columnKey) => {
                    const column = allColumns.find((col) => col.key === columnKey);
                    if (!column) return null;

                    return (
                      <TableCell
                        key={columnKey}
                        align="center"
                        sx={{
                          minWidth: 150,
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
                            {item.listingName}
                          </Typography>
                        ) : columnKey === 'occupancyRate' ? (
                          renderOccupancyRate(
                            item.occupancyRate,
                            item.occupancyTrend,
                            item.occupancyChange
                          )
                        ) : (
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: columnKey === 'ownerStayNights' ? 400 : 500 }}
                          >
                            {item[columnKey as keyof typeof item]}
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
                      bgcolor: 'background.paper',
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
              <TableRow sx={{ bgcolor: 'grey.50', fontWeight: 600 }}>
                {visibleColumns.map((columnKey) => {
                  const column = allColumns.find((col) => col.key === columnKey);
                  if (!column) return null;

                  return (
                    <TableCell
                      key={columnKey}
                      align="center"
                      sx={{
                        minWidth: 150,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {columnKey === 'listingName' ? (
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Total
                        </Typography>
                      ) : columnKey === 'occupancyRate' ? (
                        renderOccupancyRate(
                          parseFloat(overallOccupancyRate),
                          overallTrend,
                          totals.occupancyChange
                        )
                      ) : (
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {totals[columnKey as keyof typeof totals]}
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
                    bgcolor: 'grey.50',
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
        PaperProps={{
          sx: {
            width: 300,
            maxHeight: 400,
            p: 2,
          },
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Column Settings
          </Typography>

          <TextField
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
