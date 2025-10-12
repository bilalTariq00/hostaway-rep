import { useState } from 'react';
import { Copy, Edit, Link, Filter, Search, XCircle, Calendar, Download, FileText, Settings, RefreshCw, MoreHorizontal } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';


// Mock data for listings
const mockListings = [
  {
    id: 1,
    title: 'La Dimora Del Cavaliere',
    propertyId: '305034',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    airbnb: true,
    booking: true,
    vrbo: true,
    expedia: false,
    partners: true,
    ical: false,
    customIcal: false,
  },
  {
    id: 2,
    title: 'Navigli',
    propertyId: '305035',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    airbnb: true,
    booking: true,
    vrbo: true,
    expedia: false,
    partners: true,
    ical: false,
    customIcal: false,
  },
  {
    id: 3,
    title: 'Polacchi42',
    propertyId: '305225',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    airbnb: true,
    booking: true,
    vrbo: true,
    expedia: false,
    partners: false,
    ical: false,
    customIcal: false,
  },
  {
    id: 4,
    title: 'Superattico - Via Del Corso 43',
    propertyId: '305421',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    airbnb: true,
    booking: true,
    vrbo: true,
    expedia: false,
    partners: false,
    ical: false,
    customIcal: false,
  },
  {
    id: 5,
    title: 'Montecatini Terme',
    propertyId: '306532',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    airbnb: true,
    booking: true,
    vrbo: true,
    expedia: false,
    partners: false,
    ical: false,
    customIcal: false,
  },
  {
    id: 6,
    title: 'Monteverde - Quattroventi',
    propertyId: '308582',
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    airbnb: true,
    booking: true,
    vrbo: true,
    expedia: false,
    partners: false,
    ical: false,
    customIcal: false,
  },
  {
    id: 7,
    title: 'La Storta',
    propertyId: '310867',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    airbnb: true,
    booking: true,
    vrbo: false,
    expedia: false,
    partners: false,
    ical: false,
    customIcal: false,
    hasCalendarIssue: true,
  },
  {
    id: 8,
    title: '[5 Min From Trastevere] Chic Apt',
    propertyId: '317154',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    airbnb: true,
    booking: true,
    vrbo: true,
    expedia: false,
    partners: false,
    ical: false,
    customIcal: false,
  },
  {
    id: 9,
    title: 'Via Poggio Tulliano',
    propertyId: '332386',
    image: 'https://images.unsplash.com/photo-1560448204-5e9c5a5b5b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    airbnb: true,
    booking: true,
    vrbo: true,
    expedia: false,
    partners: false,
    ical: false,
    customIcal: false,
  },
  {
    id: 10,
    title: 'Via Dei Marruccini | San Lorenzo',
    propertyId: '345603',
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    airbnb: true,
    booking: true,
    vrbo: true,
    expedia: false,
    partners: false,
    ical: false,
    customIcal: false,
  },
  {
    id: 11,
    title: 'Via di Acqua Bullicante 113',
    propertyId: '363365',
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    airbnb: true,
    booking: true,
    vrbo: false,
    expedia: false,
    partners: false,
    ical: false,
    customIcal: false,
  },
];

const channels = [
  { 
    key: 'airbnb', 
    name: 'Airbnb', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',
    color: '#FF5A5F',
    letter: 'A'
  },
  { 
    key: 'booking', 
    name: 'Booking.com', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Booking.com_logo.svg',
    color: '#003580',
    letter: 'B'
  },
  { 
    key: 'vrbo', 
    name: 'Vrbo', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Vrbo_logo.svg',
    color: '#00A699',
    letter: 'W'
  },
  { 
    key: 'expedia', 
    name: 'Expedia', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Expedia_logo.svg',
    color: '#000000',
    letter: '→'
  },
  { 
    key: 'partners', 
    name: 'Partners', 
    logo: 'https://via.placeholder.com/24x24/8B5CF6/FFFFFF?text=V',
    color: '#8B5CF6',
    letter: 'V'
  },
  { 
    key: 'ical', 
    name: 'iCAL', 
    logo: 'https://via.placeholder.com/24x24/3B82F6/FFFFFF?text=📅',
    color: '#3B82F6',
    letter: '📅'
  },
  { 
    key: 'customIcal', 
    name: 'Custom iCAL', 
    logo: 'https://via.placeholder.com/24x24/8B5CF6/FFFFFF?text=📅',
    color: '#8B5CF6',
    letter: '📅'
  },
];

export function ListingMappingView() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  // Filter listings based on search term
  const filteredListings = mockListings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.propertyId.includes(searchTerm)
  );

  // Get current page listings
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSettingsClick = (property: any) => {
    setSelectedProperty(property);
    setSettingsOpen(true);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, listingId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedListingId(listingId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedListingId(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === 'channels') {
      router.push('/channel-manager/channels');
    }
  };

  const handleChannelToggle = (property: any, channel: string) => {
    // Update the property's channel status
    const updatedProperty = { ...property, [channel]: !property[channel] };
    setSelectedProperty(updatedProperty);
  };

  const handleTitleClick = (property: any) => {
    // Navigate to listing detail page
    router.push(`/listings/${property.propertyId}`);
  };

  const handleMenuAction = (action: string) => {
    const listing = mockListings.find(l => l.id === selectedListingId);
    if (listing) {
      switch (action) {
        case 'edit':
          setSelectedProperty(listing);
          setSettingsOpen(true);
          break;
        case 'csv':
          console.log('CSV export for:', listing.title);
          break;
        case 'ical':
          console.log('Export iCal link for:', listing.title);
          break;
        case 'custom':
          console.log('Custom iCals for:', listing.title);
          break;
        case 'link':
          console.log('Link child listings for:', listing.title);
          break;
        case 'convert':
          console.log('Convert to multi-unit:', listing.title);
          break;
        default:
          console.log('Unknown action:', action);
          break;
      }
    }
    handleMenuClose();
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Channel Manager
        </Typography>
        
        {/* Tabs */}
        <Tabs value="listing-mapping" onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Listing Mapping" value="listing-mapping" />
          <Tab label="Channels" value="channels" />
        </Tabs>

        {/* Subtitle and Export Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Listing mapping
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Download size={16} />}
            sx={{ textTransform: 'none' }}
          >
            Export CSV
          </Button>
        </Box>

        {/* Filters and Search */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<Filter size={16} />}
            sx={{ textTransform: 'none', bgcolor: '#E3F2FD', borderColor: '#2196F3', color: '#1976D2' }}
          >
            Filters
          </Button>
          <TextField
            placeholder="Search listings..."
            size="small"
            sx={{ minWidth: 300 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Table */}
      <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'grey.200' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Title</TableCell>
                {channels.map((channel) => (
                  <TableCell key={channel.key} sx={{ fontWeight: 600, fontSize: '0.9rem', textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: channel.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          color: 'white',
                          fontWeight: 'bold',
                          overflow: 'hidden',
                        }}
                      >
                        {channel.logo && !channel.logo.includes('placeholder') ? (
                          <img 
                            src={channel.logo} 
                            alt={channel.name}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'contain',
                              filter: 'brightness(0) invert(1)'
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                              if (nextElement) {
                                nextElement.style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <Box sx={{ display: channel.logo && !channel.logo.includes('placeholder') ? 'none' : 'flex' }}>
                          {channel.letter}
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                ))}
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentListings.map((listing) => (
                <TableRow key={listing.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={listing.image}
                        alt={listing.title}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography 
                          variant="body2" 
                          sx={{
                            fontWeight: 500,
                            cursor: 'pointer',
                            color: 'primary.main',
                            '&:hover': {
                              textDecoration: 'underline',
                              color: 'primary.dark',
                            }
                          }}
                          onClick={() => handleTitleClick(listing)}
                        >
                          {listing.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ({listing.propertyId})
                          </Typography>
                        {listing.hasCalendarIssue && (
                          <Box sx={{ display: 'inline-flex', alignItems: 'center', ml: 1 }}>
                            <Calendar size={12} color="red" />
                          </Box>
                        )}
                        </Box>
                    </Box>
                  </TableCell>
                  {channels.map((channel) => (
                    <TableCell key={channel.key} sx={{ textAlign: 'center' }}>
                      <Chip
                        label={listing[channel.key as keyof typeof listing] ? 'ON' : 'OFF'}
                        size="small"
                        color={listing[channel.key as keyof typeof listing] ? 'success' : 'error'}
                        sx={{ 
                          fontSize: '0.7rem',
                          height: 24,
                          minWidth: 40,
                          cursor: 'pointer',
                          '&:hover': {
                            opacity: 0.8,
                          }
                        }}
                        onClick={() => handleChannelToggle(listing, channel.key)}
                      />
                    </TableCell>
                  ))}
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <IconButton
                        size="small"
                        onClick={() => handleSettingsClick(listing)}
                        sx={{ color: 'text.secondary' }}
                      >
                        <Settings size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, listing.id)}
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
      </Card>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredListings.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>

      {/* Settings Sidebar */}
      <Drawer
        anchor="right"
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 450,
            p: 3,
          },
        }}
      >
        {selectedProperty && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Property Settings
            </Typography>
              <IconButton onClick={() => setSettingsOpen(false)}>
                <XCircle size={20} />
              </IconButton>
            </Box>

            {/* Property Name Edit */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Property Information
              </Typography>
              <TextField
                fullWidth
                label="Property Name"
                value={selectedProperty.title}
                sx={{ mb: 2 }}
                onChange={(e) => {
                  setSelectedProperty({ ...selectedProperty, title: e.target.value });
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Property ID: {selectedProperty.propertyId}
                    </Typography>
            </Box>

            {/* Booking Window */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Booking window
              </Typography>
              <FormControlLabel
                control={<Switch disabled />}
                label="Activate"
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Number of months</InputLabel>
                <Select value="" label="Number of months">
                  <MenuItem value="1">1 month</MenuItem>
                  <MenuItem value="3">3 months</MenuItem>
                  <MenuItem value="6">6 months</MenuItem>
                  <MenuItem value="12">12 months</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" disabled fullWidth sx={{ textTransform: 'none' }}>
                Save
              </Button>
            </Box>

            {/* All Channel Settings */}
            {channels.map((channel) => (
              <Box key={channel.key} sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: channel.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      color: 'white',
                      fontWeight: 'bold',
                      overflow: 'hidden',
                    }}
                  >
                    {channel.logo && !channel.logo.includes('placeholder') ? (
                      <img 
                        src={channel.logo} 
                        alt={channel.name}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain',
                          filter: 'brightness(0) invert(1)'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <Box sx={{ display: channel.logo && !channel.logo.includes('placeholder') ? 'none' : 'flex' }}>
                      {channel.letter}
                    </Box>
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {channel.name}
                  </Typography>
                </Box>
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={selectedProperty[channel.key as keyof typeof selectedProperty]}
                      onChange={() => handleChannelToggle(selectedProperty, channel.key)}
                      color="success"
                    />
                  }
                  label={`Is listed in ${channel.name}?`}
                  sx={{ mb: 2 }}
                />
                
                {channel.key !== 'ical' && channel.key !== 'customIcal' && (
                  <TextField
                    fullWidth
                    label="Markup"
                    value={
                      channel.key === 'airbnb' ? '15' : 
                      channel.key === 'booking' ? '10' : 
                      channel.key === 'vrbo' ? '30' : 
                      channel.key === 'expedia' ? '20' : 
                      channel.key === 'partners' ? '25' : '0'
                    }
                    sx={{ mb: 2 }}
                  />
                )}
                
                {channel.key === 'booking' && (
                  <Box sx={{ mb: 2 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<RefreshCw size={16} />}
                      sx={{ textTransform: 'none', mb: 2 }}
                    >
                      Re-sync
                    </Button>
                    <TextField
                      fullWidth
                      label="Min stay"
                      placeholder="Enter minimum stay"
                      sx={{ mb: 1 }}
                    />
                  </Box>
                )}
                
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ textTransform: 'none', bgcolor: '#00A699' }}
                >
                  Save
                </Button>
              </Box>
            ))}

            {/* Close Button */}
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setSettingsOpen(false)}
              sx={{ textTransform: 'none', mt: 2 }}
            >
              Close
            </Button>
          </>
        )}
      </Drawer>

      {/* More Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            minWidth: 200,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          },
        }}
      >
        <MenuItem onClick={() => handleMenuAction('edit')}>
          <Edit size={16} style={{ marginRight: 8 }} />
          Edit listing name
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('csv')}>
          <FileText size={16} style={{ marginRight: 8 }} />
          CSV export
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('ical')}>
          <Calendar size={16} style={{ marginRight: 8 }} />
          Export iCal link
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('custom')}>
          <Calendar size={16} style={{ marginRight: 8 }} />
          Custom iCals
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('link')}>
          <Link size={16} style={{ marginRight: 8 }} />
          Link child listings
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('convert')}>
          <Copy size={16} style={{ marginRight: 8 }} />
          Convert to multi-unit
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}
