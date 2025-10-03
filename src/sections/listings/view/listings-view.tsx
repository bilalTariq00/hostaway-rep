import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
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
import RadioGroup from '@mui/material/RadioGroup';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for listings
const mockListings = [
  {
    id: 1,
    image: '/assets/images/covers/cover_1.jpg',
    propertyName: 'La Dimora Del Cavaliere',
    listingId: '305034',
    externalName: 'Cavaliere Luxury Apartment',
    location: 'Milan, Italy',
    tags: ['Luxury', 'Downtown'],
    channels: ['Airbnb', 'Booking.com'],
    insurance: 'Active',
  },
  {
    id: 2,
    image: '/assets/images/covers/cover_2.jpg',
    propertyName: 'Navigli',
    listingId: '305035',
    externalName: 'Navigli Canal View',
    location: 'Milan, Italy',
    tags: ['Canal View', 'Historic'],
    channels: ['Airbnb'],
    insurance: 'Active',
  },
  {
    id: 3,
    image: '/assets/images/covers/cover_3.jpg',
    propertyName: 'Polacchi42',
    listingId: '305225',
    externalName: 'Polacchi Modern Suite',
    location: 'Rome, Italy',
    tags: ['Modern', 'City Center'],
    channels: ['Booking.com', 'Expedia'],
    insurance: 'Pending',
  },
  {
    id: 4,
    image: '/assets/images/covers/cover_4.jpg',
    propertyName: 'Superattico - Via Del C...',
    listingId: '305421',
    externalName: 'Superattico Penthouse',
    location: 'Rome, Italy',
    tags: ['Penthouse', 'Luxury'],
    channels: ['Airbnb', 'Booking.com', 'Expedia'],
    insurance: 'Active',
  },
];

export function ListingsView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) router.push('/listings/custom-fields');
  };

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const filteredListings = mockListings.filter(listing =>
    listing.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Listing
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined">
              Quick Match
            </Button>
            <Button variant="outlined" endIcon={<Iconify icon={"eva:download-fill" as any} />}>
              Export CSV
            </Button>
          </Box>
        </Box>

        {/* Tabs */}
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
          <Tab label="Listing" />
          <Tab label="Custom Fields" />
        </Tabs>
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleFilterOpen}
            startIcon={<Iconify icon={"eva:funnel-fill" as any} />}
          >
            Filter
          </Button>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort by"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="location">Location</MenuItem>
              <MenuItem value="listingId">Listing ID</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={"eva:search-fill" as any} sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
        </Box>
      </Paper>

      {/* Listings Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Listing</TableCell>
                <TableCell>Listing ID</TableCell>
                <TableCell>External Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Channels</TableCell>
                <TableCell>Insurance</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={listing.image}
                        alt={listing.propertyName}
                        sx={{ width: 48, height: 48 }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {listing.propertyName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {listing.listingId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {listing.externalName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {listing.location}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {listing.tags.map((tag, index) => (
                        <Chip key={index} label={tag} size="small" />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {listing.channels.map((channel, index) => (
                        <Chip key={index} label={channel} size="small" color="primary" />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={listing.insurance}
                      size="small"
                      color={listing.insurance === 'Active' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small">
                        <Iconify icon={"eva:edit-fill" as any} width={16} />
                      </IconButton>
                      <IconButton size="small">
                        <Iconify icon={"eva:calendar-fill" as any} width={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={handleActionMenuOpen}
                      >
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
          <Typography variant="body2" color="text.secondary">
            Show 20 per page
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      </Paper>

      {/* Filter Modal */}
      <Dialog open={filterOpen} onClose={handleFilterClose} maxWidth="md" fullWidth>
        <DialogTitle>Filter Listings</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Tags"
                  placeholder="Select tags..."
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Country"
                  placeholder="Select country..."
                  size="small"
                />
                <TextField
                  fullWidth
                  label="City"
                  placeholder="Select city..."
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Unit Type"
                  placeholder="Select unit type..."
                  size="small"
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search..."
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon={"eva:search-fill" as any} />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl component="fieldset">
                  <RadioGroup>
                    <FormControlLabel value="all" control={<Radio />} label="All Listings" />
                    <FormControlLabel value="active" control={<Radio />} label="Active Only" />
                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive Only" />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterClose}>Cancel</Button>
          <Button variant="contained" onClick={handleFilterClose}>
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:edit-fill" as any} sx={{ mr: 1 }} />
          Edit Internal Listing Name
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:edit-fill" as any} sx={{ mr: 1 }} />
          Edit External Listing Name
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:list-fill" as any} sx={{ mr: 1 }} />
          See Listing Tasks
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:link-fill" as any} sx={{ mr: 1 }} />
          iCal Link
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}
