import { useState } from 'react';
import { Edit, Copy, Filter, Search, Trash2, XCircle, Download, Settings, CheckCircle, MoreHorizontal } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';


// Mock data for listings
const mockListings = [
  {
    id: 1,
    title: 'Villa Del Sol - Luxury Beachfront',
    airbnb: true,
    booking: true,
    vrbo: false,
    expedia: true,
    direct: false,
  },
  {
    id: 2,
    title: 'Mountain Cabin Retreat',
    airbnb: true,
    booking: false,
    vrbo: true,
    expedia: false,
    direct: true,
  },
  {
    id: 3,
    title: 'Downtown Apartment Suite',
    airbnb: false,
    booking: true,
    vrbo: false,
    expedia: true,
    direct: true,
  },
  {
    id: 4,
    title: 'Cozy Studio in Arts District',
    airbnb: true,
    booking: true,
    vrbo: true,
    expedia: false,
    direct: false,
  },
  {
    id: 5,
    title: 'Historic Townhouse',
    airbnb: false,
    booking: false,
    vrbo: true,
    expedia: true,
    direct: true,
  },
];

const channelIcons = {
  airbnb: '🏠',
  booking: '📅',
  vrbo: '🏖️',
  expedia: '✈️',
  direct: '🌐',
};

export function ListingMappingView() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(mockListings.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSettingsClick = (property: any) => {
    setSelectedProperty(property);
    setSettingsOpen(true);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === 'channels') {
      router.push('/channel-manager/channels');
    }
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
            sx={{ textTransform: 'none' }}
          >
            Filters
          </Button>
          <TextField
            placeholder="Search listings..."
            size="small"
            sx={{ minWidth: 300 }}
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
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Channels</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {listing.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      {Object.entries(channelIcons).map(([channel, icon]) => (
                        <Box
                          key={channel}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            opacity: listing[channel as keyof typeof listing] ? 1 : 0.3,
                            minWidth: 40,
                          }}
                        >
                          <Box sx={{ fontSize: 20, mb: 0.5 }}>{icon}</Box>
                          <Typography variant="caption" sx={{ fontSize: 10 }}>
                            {listing[channel as keyof typeof listing] ? 'ON' : 'OFF'}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleSettingsClick(listing)}
                        sx={{ color: 'text.secondary' }}
                      >
                        <Settings size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={handleMenuClick}
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
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color="primary"
        />
      </Box>

      {/* Settings Sidebar */}
      <Drawer
        anchor="right"
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 400,
            p: 3,
          },
        }}
      >
        {selectedProperty && (
          <>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              {selectedProperty.title}
            </Typography>

            {/* Channel Apps */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Channel Apps
              </Typography>
              {Object.entries(channelIcons).map(([channel, icon]) => (
                <Box
                  key={channel}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ fontSize: 24 }}>{icon}</Box>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {channel}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {selectedProperty[channel as keyof typeof selectedProperty] 
                        ? `Listed in ${channel}` 
                        : 'Not listed'
                      }
                    </Typography>
                    {selectedProperty[channel as keyof typeof selectedProperty] ? (
                      <CheckCircle size={20} color="var(--mui-palette-success-main)" />
                    ) : (
                      <XCircle size={20} color="var(--mui-palette-error-main)" />
                    )}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Configuration */}
            <Box sx={{ mb: 4 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Number of months or markup</InputLabel>
                <Select
                  value=""
                  label="Number of months or markup"
                >
                  <MenuItem value="1">1 month</MenuItem>
                  <MenuItem value="3">3 months</MenuItem>
                  <MenuItem value="6">6 months</MenuItem>
                  <MenuItem value="12">12 months</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Save Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Save Changes
            </Button>
          </>
        )}
      </Drawer>

      {/* More Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Edit size={16} style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Copy size={16} style={{ marginRight: 8 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Trash2 size={16} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}
