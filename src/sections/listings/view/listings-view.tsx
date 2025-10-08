import { useState } from 'react';
import { 
  Eye,
  Tag,
  Edit,
  Link,
  Filter,
  Search,
  Calendar,
  Download,
  Settings,
  CheckCircle,
  MoreHorizontal,
  List as ListIcon,
} from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for listings
const mockListings = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    propertyName: 'La Dimora Del Cavaliere',
    listingId: '305034',
    externalName: '500m From LAKE La Dimora del Cavaliere Martignano',
    location: 'Anguillara Sabazia, Italy',
    tags: ['Luxury', 'Lake View'],
    channels: ['Airbnb', 'Booking.com', 'Vrbo', 'Google'],
    insurance: '', // Empty as requested
    description: 'A LUXURY HOME is located in the heart of a NATURAL PARK, near a splendid LAKE and surrounded by a lush forest. Here you can experience a unique experience of RELAXATION and NATURE, with a breathtaking view that enchants the soul.',
    capacity: 6,
    bedrooms: 2,
    beds: 4,
    bathrooms: 1,
    propertyType: 'House',
    roomType: 'Entire home',
    price: 115,
    weeklyDiscount: 25,
    monthlyDiscount: 30,
    amenities: ['Internet', 'Air conditioning', 'Kitchen', 'Washing Machine', 'Heating', 'Essentials'],
    houseRules: 'Regulations for Accommodation: 1. Do not disturb other guests: Please refrain from creating excessive noise or disturbing other guests during your stay. 2. Pets: Please keep pets under control. 3. Contact the host: In case of any doubts or issues, please contact the host immediately for assistance.',
    checkInTime: '3:00pm',
    checkOutTime: '10:00am',
    cleaningFee: 20,
    instantBookable: true,
    minimumNights: 2,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    propertyName: 'Navigli',
    listingId: '305035',
    externalName: '[Navigli] Beautiful Apartment in MILAN Near TRAM',
    location: 'Milano, Italy',
    tags: ['Canal View', 'Historic'],
    channels: ['Airbnb', 'Booking.com', 'Vrbo', 'Google'],
    insurance: '', // Empty as requested
    description: 'Beautiful apartment in the heart of Navigli district with canal views and easy access to public transportation.',
    capacity: 4,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    propertyType: 'Apartment',
    roomType: 'Entire home',
    price: 85,
    weeklyDiscount: 20,
    monthlyDiscount: 25,
    amenities: ['Internet', 'Kitchen', 'Washing Machine', 'Heating'],
    houseRules: 'Please respect the neighbors and keep noise levels down after 10pm.',
    checkInTime: '2:00pm',
    checkOutTime: '11:00am',
    cleaningFee: 15,
    instantBookable: true,
    minimumNights: 1,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    propertyName: 'Polacchi42',
    listingId: '305225',
    externalName: 'Peaceful apartment in piazza Venezia\'s alleys',
    location: 'Roma, Italy',
    tags: ['Modern', 'City Center'],
    channels: ['Airbnb', 'Booking.com', 'Vrbo', 'Google'],
    insurance: '', // Empty as requested
    description: 'Modern apartment in the historic center of Rome, perfect for exploring the city.',
    capacity: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    propertyType: 'Apartment',
    roomType: 'Entire home',
    price: 95,
    weeklyDiscount: 15,
    monthlyDiscount: 20,
    amenities: ['Internet', 'Air conditioning', 'Kitchen', 'Heating'],
    houseRules: 'No smoking inside the apartment. Please keep the apartment clean.',
    checkInTime: '3:00pm',
    checkOutTime: '10:00am',
    cleaningFee: 20,
    instantBookable: false,
    minimumNights: 2,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    propertyName: 'Superattico - Via Del Corso 43',
    listingId: '305421',
    externalName: '[Sky Domus] Historic Center Penthouse With Jacuzzi',
    location: 'Roma, Italy',
    tags: ['Penthouse', 'Luxury', 'Jacuzzi'],
    channels: ['Airbnb', 'Booking.com', 'Vrbo', 'Google'],
    insurance: '', // Empty as requested
    description: 'Luxury penthouse in the historic center with private jacuzzi and panoramic views of Rome.',
    capacity: 8,
    bedrooms: 3,
    beds: 5,
    bathrooms: 2,
    propertyType: 'Penthouse',
    roomType: 'Entire home',
    price: 200,
    weeklyDiscount: 30,
    monthlyDiscount: 35,
    amenities: ['Internet', 'Air conditioning', 'Kitchen', 'Washing Machine', 'Heating', 'Jacuzzi', 'Balcony'],
    houseRules: 'This is a luxury property. Please treat it with respect and care.',
    checkInTime: '4:00pm',
    checkOutTime: '11:00am',
    cleaningFee: 50,
    instantBookable: true,
    minimumNights: 3,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    propertyName: 'Montecatini Terme',
    listingId: '306532',
    externalName: '[Montecatini Terme] Casa Moderna e Tranquilla',
    location: 'Montecatini Terme, Italy',
    tags: ['Modern', 'Quiet'],
    channels: ['Airbnb', 'Booking.com', 'Vrbo', 'Google'],
    insurance: '', // Empty as requested
    description: 'Modern and quiet house in Montecatini Terme',
    capacity: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    propertyType: 'House',
    roomType: 'Entire home',
    price: 80,
    weeklyDiscount: 15,
    monthlyDiscount: 20,
    amenities: ['Internet', 'Kitchen', 'Heating'],
    houseRules: 'Please keep the house clean and quiet.',
    checkInTime: '3:00pm',
    checkOutTime: '10:00am',
    cleaningFee: 15,
    instantBookable: true,
    minimumNights: 2,
  }
];

export function ListingsView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [quickTaggingOpen, setQuickTaggingOpen] = useState(false);
  const [columnSettingsOpen, setColumnSettingsOpen] = useState(false);
  const [columnSettingsAnchor, setColumnSettingsAnchor] = useState<null | HTMLElement>(null);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [listingDetailOpen, setListingDetailOpen] = useState(false);
  const [translationsOpen, setTranslationsOpen] = useState(false);
  const [currentListingTab, setCurrentListingTab] = useState('basic-info');
  const [visibleColumns, setVisibleColumns] = useState({
    listing: true,
    listingId: true,
    externalName: true,
    location: true,
    tags: true,
    channels: true,
    insurance: true,
  });
  const [quickTaggingData, setQuickTaggingData] = useState({
    replaceTags: false,
    tags: '',
    listings: '',
  });
  const [translationData, setTranslationData] = useState({
    language: 'Italian',
    listingName: '',
    description: '',
    houseRules: '',
    rentalAgreement: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) router.push('/listings/custom-fields');
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

  const handleQuickTaggingOpen = () => {
    setQuickTaggingOpen(true);
  };

  const handleQuickTaggingClose = () => {
    setQuickTaggingOpen(false);
    setQuickTaggingData({ replaceTags: false, tags: '', listings: '' });
  };

  const handleColumnSettingsOpen = (event: React.MouseEvent<HTMLElement>) => {
    console.log('Settings clicked, setting anchor:', event.currentTarget);
    setColumnSettingsAnchor(event.currentTarget);
    setColumnSettingsOpen(true);
  };

  const handleColumnSettingsClose = () => {
    setColumnSettingsOpen(false);
    setColumnSettingsAnchor(null);
  };

  const handleListingClick = (listing: any) => {
    router.push(`/listings/${listing.id}`);
  };

  const handleListingDetailClose = () => {
    setListingDetailOpen(false);
    setSelectedListing(null);
  };

  const handleEditClick = (listing: any) => {
    router.push(`/listings/${listing.id}/edit`);
  };


  const handleTranslationsOpen = () => {
    setTranslationsOpen(true);
  };

  const handleTranslationsClose = () => {
    setTranslationsOpen(false);
  };

  const handleColumnToggle = (column: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column as keyof typeof prev]
    }));
  };

  const handleQuickTaggingSubmit = () => {
    console.log('Quick tagging data:', quickTaggingData);
    handleQuickTaggingClose();
  };

  const handleTranslationSubmit = () => {
    console.log('Translation data:', translationData);
    handleTranslationsClose();
  };

  const filteredListings = mockListings.filter(listing =>
    listing.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Listings
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" startIcon={<Filter size={16} />}>
              Filters
            </Button>
            <Button variant="outlined" startIcon={<Tag size={16} />} onClick={handleQuickTaggingOpen}>
              Quick tagging
            </Button>
            <Button variant="outlined" endIcon={<Download size={16} />}>
              CSV export
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
          <Tab label="Listings" />
          <Tab label="Custom fields" />
        </Tabs>
      </Box>

      {/* Filters and Search */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} style={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {currentListings.length} of {filteredListings.length} listings
        </Typography>
      </Box>

      {/* Listings Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {visibleColumns.listing && <TableCell>Listing</TableCell>}
                {visibleColumns.listingId && <TableCell>Listing ID</TableCell>}
                {visibleColumns.externalName && <TableCell>External name</TableCell>}
                {visibleColumns.location && <TableCell>Location</TableCell>}
                {visibleColumns.tags && <TableCell>Tags</TableCell>}
                {visibleColumns.channels && <TableCell>Channels</TableCell>}
                {visibleColumns.insurance && (
                  <TableCell>
                    Insurance
                  </TableCell>
                )}
                <TableCell align="center">
                  <IconButton size="small" onClick={(e) => handleColumnSettingsOpen(e)}>
                    <Settings size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentListings.map((listing) => (
                <TableRow key={listing.id}>
                  {visibleColumns.listing && (
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={listing.image}
                        alt={listing.propertyName}
                        sx={{ width: 48, height: 48 }}
                      />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500, 
                            color: 'primary.main',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                          onClick={() => handleListingClick(listing)}
                        >
                        {listing.propertyName}
                      </Typography>
                    </Box>
                  </TableCell>
                  )}
                  {visibleColumns.listingId && (
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {listing.listingId}
                    </Typography>
                  </TableCell>
                  )}
                  {visibleColumns.externalName && (
                  <TableCell>
                    <Typography variant="body2">
                      {listing.externalName}
                    </Typography>
                  </TableCell>
                  )}
                  {visibleColumns.location && (
                  <TableCell>
                    <Typography variant="body2">
                      {listing.location}
                    </Typography>
                  </TableCell>
                  )}
                  {visibleColumns.tags && (
                  <TableCell>
                    {/* Empty as shown in image */}
                  </TableCell>
                  )}
                  {visibleColumns.channels && (
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {listing.channels.map((channel, index) => {
                          const channelIcons: { [key: string]: { icon: string; color: string } } = {
                            'Airbnb': { icon: 'A', color: '#FF5A5F' },
                            'Booking.com': { icon: 'B', color: '#003580' },
                            'Vrbo': { icon: 'W', color: '#FFB400' },
                            'Google': { icon: 'G', color: '#4285F4' },
                          };
                          const channelInfo = channelIcons[channel] || { icon: channel[0], color: '#666' };
                          return (
                            <Box
                              key={index}
                              sx={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                backgroundColor: channelInfo.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold',
                              }}
                            >
                              {channelInfo.icon}
                            </Box>
                          );
                        })}
                    </Box>
                  </TableCell>
                  )}
                  {visibleColumns.insurance && (
                  <TableCell>
                    {/* Empty as requested - no content */}
                  </TableCell>
                  )}
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Button 
                        size="small" 
                        variant="contained"
                        startIcon={<Edit size={16} />}
                        onClick={() => handleEditClick(listing)}
                        sx={{ 
                          backgroundColor: '#E3F2FD', 
                          color: '#1976D2',
                          '&:hover': { backgroundColor: '#BBDEFB' }
                        }}
                      >
                        Edit
                      </Button>
                      <IconButton 
                        size="small" 
                        onClick={() => router.push('/calendar')}
                        sx={{ color: 'text.secondary' }}
                      >
                        <Calendar size={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={handleActionMenuOpen}
                        sx={{ color: 'text.secondary' }}
                      >
                        <MoreHorizontal size={16} />
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Show
          </Typography>
          <Select
            value={itemsPerPage}
            size="small"
            sx={{ minWidth: 60 }}
          >
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
          <Typography variant="body2" color="text.secondary">
            per page
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button size="small" variant="outlined">FIRST</Button>
          <Button size="small" variant="outlined">&lt;</Button>
          <Button size="small" variant="contained">1</Button>
          <Button size="small" variant="outlined">2</Button>
          <Button size="small" variant="outlined">&gt;</Button>
          <Button size="small" variant="outlined">LAST</Button>
        </Box>
      </Box>

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
                        <Search size={16} />
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

      {/* Quick Tagging Modal */}
      <Dialog open={quickTaggingOpen} onClose={handleQuickTaggingClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Quick tagging
            </Typography>
            <IconButton onClick={handleQuickTaggingClose} size="small">
              <CheckCircle size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Use quick tagging to quickly add tags to one or more listings. These tags can be used as filter in many places and help you grouping and finding this listings more easily.
          </Typography>
          
          <FormControlLabel
            control={
              <Checkbox
                checked={quickTaggingData.replaceTags}
                onChange={(e) => setQuickTaggingData(prev => ({ ...prev, replaceTags: e.target.checked }))}
              />
            }
            label="Replace tags instead of adding"
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Tags"
              placeholder="Tags"
              value={quickTaggingData.tags}
              onChange={(e) => setQuickTaggingData(prev => ({ ...prev, tags: e.target.value }))}
              required
            />
            <TextField
              fullWidth
              label="Listings"
              placeholder="Listings"
              value={quickTaggingData.listings}
              onChange={(e) => setQuickTaggingData(prev => ({ ...prev, listings: e.target.value }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleQuickTaggingClose} sx={{ color: 'error.main' }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleQuickTaggingSubmit}
            disabled={!quickTaggingData.tags.trim()}
            sx={{ bgcolor: 'grey.400', '&:hover': { bgcolor: 'grey.500' } }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Column Settings Popover */}
      {columnSettingsAnchor && (
        <Popover
          open={columnSettingsOpen}
          anchorEl={columnSettingsAnchor}
          onClose={handleColumnSettingsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: 3,
            }
          }}
        >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <TextField
            size="small"
            placeholder="Find column"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <List dense>
            {Object.entries(visibleColumns).map(([key, visible]) => (
              <ListItem key={key} sx={{ px: 0 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={visible}
                      onChange={() => handleColumnToggle(key)}
                    />
                  }
                  label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
      )}

      {/* Listing Detail Modal */}
      <Dialog open={listingDetailOpen} onClose={handleListingDetailClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {selectedListing?.propertyName} ({selectedListing?.listingId})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedListing?.location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<Edit size={16} />}>
                Edit
              </Button>
              <Button variant="outlined" startIcon={<Edit size={16} />}>
                Calendar
              </Button>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedListing && (
            <Box>
              {/* Listing Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs
                  value={currentListingTab}
                  onChange={(e, newValue) => setCurrentListingTab(newValue)}
                >
                  <Tab label="Basic info" value="basic-info" />
                  <Tab label="Address" value="address" />
                  <Tab label="Media" value="media" />
                  <Tab label="Amenities" value="amenities" />
                  <Tab label="Price & fees" value="price-fees" />
                  <Tab label="Additional info & Policies" value="additional-info" />
                  <Tab label="Booking settings" value="booking-settings" />
                  <Tab label="Channel specific" value="channel-specific" />
                  <Tab label="Owner, Contact and Inv..." value="owner-contact" />
                  <Tab label="Attachment" value="attachment" />
                  <Tab label="Custom fields" value="custom-fields" />
                  <Tab label="Bed types" value="bed-types" />
                  <Tab label="License info" value="license-info" />
                  <Tab label="Financial settings" value="financial-settings" />
                  <Tab label="Payment accounts" value="payment-accounts" />
                  <Tab label="Guest portal" value="guest-portal" />
                  <Tab label="Linked Listings" value="linked-listings" />
                </Tabs>
              </Box>

              {/* Tab Content */}
              {currentListingTab === 'basic-info' && (
                <Box>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 6 }}>
                      <TextField
                        fullWidth
                        label="External Listing Name"
                        value={selectedListing.externalName}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Eye size={16} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Tags"
                        placeholder="Tags"
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        value={selectedListing.description}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <TextField
                        fullWidth
                        label="Person capacity"
                        value={selectedListing.capacity}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Eye size={16} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Property type"
                        value={selectedListing.propertyType}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Eye size={16} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Room type"
                        value={selectedListing.roomType}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Eye size={16} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Number of bedrooms"
                        value={selectedListing.bedrooms}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Eye size={16} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Number of beds"
                        value={selectedListing.beds}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Eye size={16} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {currentListingTab === 'address' && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>Address</Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 6 }}>
                      <TextField
                        fullWidth
                        label="Enter your address"
                        placeholder="Enter a location"
                        sx={{ mb: 2 }}
                      />
                      {/* Map placeholder */}
                      <Box sx={{ height: 300, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                          Map will be displayed here
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <TextField
                        fullWidth
                        label="Address"
                        value="Lago di Martignano, 54"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Eye size={16} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Public address"
                        value="Lago di Martignano, 54"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Eye size={16} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Country"
                        value="Italy"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Eye size={16} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="State"
                        value="Lazio"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Eye size={16} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="City"
                        value="Anguillara Sabazia"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Eye size={16} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Other tabs content would go here */}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleListingDetailClose}>Close</Button>
          <Button variant="contained" onClick={handleTranslationsOpen}>
            Translations
          </Button>
        </DialogActions>
      </Dialog>

      {/* Translations Right Sidebar */}
      <Drawer
        anchor="right"
        open={translationsOpen}
        onClose={handleTranslationsClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 400,
            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Translations
            </Typography>
            <IconButton onClick={handleTranslationsClose} size="small">
              <CheckCircle size={20} />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Language Selector */}
          <Box sx={{ mb: 3 }}>
            <Select
              fullWidth
              value={translationData.language}
              onChange={(e) => setTranslationData(prev => ({ ...prev, language: e.target.value }))}
            >
              <MenuItem value="Italian">🇮🇹 Italian</MenuItem>
              <MenuItem value="English">🇺🇸 English</MenuItem>
              <MenuItem value="Spanish">🇪🇸 Spanish</MenuItem>
              <MenuItem value="French">🇫🇷 French</MenuItem>
            </Select>
          </Box>

          {/* Translation Form */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Listing name
              </Typography>
              <TextField
                fullWidth
                value={translationData.listingName}
                onChange={(e) => setTranslationData(prev => ({ ...prev, listingName: e.target.value }))}
                placeholder="500m DAL LAGO La Dimora del Cavaliere Martignano"
                size="small"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={translationData.description}
                onChange={(e) => setTranslationData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="A LUXURY HOME si trova nel cuore di un PARCO NATURALE..."
                size="small"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                House rules
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={translationData.houseRules}
                onChange={(e) => setTranslationData(prev => ({ ...prev, houseRules: e.target.value }))}
                placeholder="Norme per l'alloggio: 1. Non disturbare gli altri ospiti..."
                size="small"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Rental agreement
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={translationData.rentalAgreement}
                onChange={(e) => setTranslationData(prev => ({ ...prev, rentalAgreement: e.target.value }))}
                placeholder="Body text"
                size="small"
              />
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button
              variant="outlined"
              onClick={handleTranslationsClose}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleTranslationSubmit}
              sx={{ flex: 1 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleActionMenuClose}>
          <Edit size={16} style={{ marginRight: 8 }} />
          Edit internal listing name
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Edit size={16} style={{ marginRight: 8 }} />
          Edit external listing name
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <ListIcon size={16} style={{ marginRight: 8 }} />
          See listing tasks
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Link size={16} style={{ marginRight: 8 }} />
          iCal link
        </MenuItem>
      </Menu>

      {/* Edit functionality moved to separate page */}
    </DashboardContent>
  );
}
