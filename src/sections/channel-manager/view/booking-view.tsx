import React, { useState } from 'react';
import { Info, Plus, Save, Search, XCircle, Settings, ArrowLeft, RefreshCw, ExternalLink } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
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

// Mock data for Booking.com listings
const mockBookingListings = [
  {
    id: 1,
    hostawayId: '435936',
    airbnbId: '1511573482518902817',
    bookingId: '',
    name: 'Stylish Roman Escape | Near Colosseum & Metro',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    mapping: '',
  },
  {
    id: 2,
    hostawayId: '409692',
    airbnbId: '1456567062074002009',
    bookingId: '14637363',
    name: 'Chic Roman Stay | 2BR Near Colosseum & Metro',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    mapping: '1463736301 - Two-Bedroom Apartment',
  },
  {
    id: 3,
    hostawayId: '407792',
    airbnbId: '1442574288455034967',
    bookingId: '14493050',
    name: 'Modern 1BR w/ Private Balcony | Near Colosseum',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    mapping: '1449305001 - One-Bedroom Apartment',
  },
  {
    id: 4,
    hostawayId: '403800',
    airbnbId: '1442586212263612164',
    bookingId: '14440253',
    name: 'Elegant 2BR Apt | Balcony, AC, Near Colosseum',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    mapping: '1444025301 - Two-Bedroom Apartment',
  },
  {
    id: 5,
    hostawayId: '403059',
    airbnbId: '1298410148621602295',
    bookingId: '13387847',
    name: 'Nel cuore di Testaccio',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    mapping: '1338784701 - Two-Bedroom Apartment',
  },
  {
    id: 6,
    hostawayId: '402423',
    airbnbId: '1440569470027463361',
    bookingId: '14439960',
    name: 'Splendido appartamento due passi dal Vaticano',
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    mapping: '1443996001 - One-Bedroom Apar',
  },
];

export function BookingView() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [legalEntityModalOpen, setLegalEntityModalOpen] = useState(false);
  const [propertyIdModalOpen, setPropertyIdModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [legalEntityId, setLegalEntityId] = useState('');
  const [propertyId, setPropertyId] = useState('');

  const handleBack = () => {
    router.push('/channel-manager/channels');
  };

  const handleAction = (action: string, listing: any) => {
    switch (action) {
      case 'Settings':
        setSelectedListing(listing);
        setSettingsOpen(true);
        break;
      case 'Export':
        setSupportModalOpen(true);
        break;
      default:
        console.log(`${action} for ${listing.name}`);
    }
  };

  const handleConnectProperty = () => {
    if (propertyId.trim()) {
      console.log('Connecting property with ID:', propertyId);
      // Here you would typically make an API call to connect the property
      setPropertyIdModalOpen(false);
      setPropertyId(''); // Reset the input
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <IconButton onClick={handleBack} sx={{ color: 'text.secondary' }}>
            <ArrowLeft size={20} />
          </IconButton>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Channels
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: '#003580',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/Booking.com_logo.svg"
                alt="Booking.com"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)'
                }}
              />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#003580' }}>
              Booking.com
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Plus size={14} />}
              onClick={() => setSupportModalOpen(true)}
              sx={{ 
                textTransform: 'none', 
                bgcolor: 'primary.main',
                fontSize: '0.75rem',
                px: 2,
                py: 2.5,
                height: 32,
                minWidth: 'auto',
                borderRadius: 1,
                fontWeight: 500,
                boxShadow: '0 2px 8px rgba(0, 166, 153, 0.25)',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  boxShadow: '0 4px 12px rgba(0, 166, 153, 0.35)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Add Legal Entity ID
            </Button>
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={() => setTermsModalOpen(true)}
              sx={{ textTransform: 'none', bgcolor: 'primary.main', }}
            >
               Connect new B.com property
            </Button>
            <IconButton sx={{ color: 'text.secondary' }}>
              <Save size={20} />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshCw size={16} />}
            sx={{ textTransform: 'none', borderColor: '#9E9E9E', color: '#424242' }}
          >
            Bulk update rate plans
          </Button>
          
          <TextField
            placeholder="Search by listing"
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

      {/* Listings Table */}
      <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'grey.200' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  <Checkbox />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Hostaway Listing ID</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Airbnb Listing ID</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Booking.com Property ID</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Listing Name</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Multi-unit</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Settings/ markup</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Mapping</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockBookingListings.map((listing) => (
                <TableRow key={listing.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {listing.hostawayId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {listing.airbnbId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {listing.bookingId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={listing.image}
                        alt={listing.name}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 500,
                          color: '#1976D2',
                          cursor: 'pointer',
                          '&:hover': {
                            textDecoration: 'underline',
                          }
                        }}
                      >
                        {listing.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {/* Multi-unit column - empty in reference */}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Settings size={14} />}
                      sx={{ textTransform: 'none', borderColor: '#2196F3', color: '#1976D2' }}
                      onClick={() => handleAction('Settings', listing)}
                    >
                      Settings
                    </Button>
                  </TableCell>
                  <TableCell>
                    {listing.mapping ? (
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {listing.mapping}
                      </Typography>
                    ) : (
                      <Select
                        size="small"
                        value=""
                        displayEmpty
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="">
                          <em>Select...</em>
                        </MenuItem>
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                      </Select>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ 
                          textTransform: 'none', 
                          borderColor: listing.id === 1 ? '#9E9E9E' : '#F44336',
                          color: listing.id === 1 ? '#424242' : '#F44336',
                          fontSize: '0.75rem'
                        }}
                        onClick={() => handleAction('Unmap', listing)}
                      >
                        Unmap
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ 
                          textTransform: 'none', 
                          borderColor: listing.id === 1 ? '#9E9E9E' : '#FF9800',
                          color: listing.id === 1 ? '#424242' : '#FF9800',
                          fontSize: '0.75rem'
                        }}
                        onClick={() => handleAction('Export', listing)}
                      >
                        Export
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<ExternalLink size={14} />}
                        sx={{ 
                          textTransform: 'none', 
                          borderColor: '#9E9E9E',
                          color: '#424242',
                          fontSize: '0.75rem'
                        }}
                        onClick={() => handleAction('Open', listing)}
                      >
                        Open
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Terms Confirmation Modal */}
      <Dialog
        open={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            bgcolor: 'white',
            maxHeight: '80vh',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center', mb: 2, color: '#333' }}>
            Please confirm the next statements to continue
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', lineHeight: 1.6 }}>
            The following Hostaway terms of services apply to the use of the Hostaway software including all channel connections and 3rd party connections.
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 1 }}>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <img 
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzRweCIgaGVpZ2h0PSIzNXB4IiB2aWV3Qm94PSIwIDAgMzQgMzUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA2My4xICgxMDEwMTApIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPjU3MzJCMUNCLUU3MzMtNEE2Qy1BQ0E5LTBEMjM3OEE3NEQ0NTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTGVnYWwtc3RhdGVtZW50cy1zdmctaWNvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNTAuMDAwMDAwLCAtMTg0LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMTE0LUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MS4wMDAwMDAsIDE4NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LjM1MzU4NTExLDYgTDI5LjY0NjQxNDksNiBDMzAuOTQ2MjY0MSw2IDMyLDcuMDUzNzM1OTUgMzIsOC4zNTM1ODUxMSBMMzIsMjcgQzMyLDMwLjMxMzcwODUgMjkuMzEzNzA4NSwzMyAyNiwzMyBMNi4zNTM1ODUxMSwzMyBDNS4wNTM3MzU5NSwzMyA0LDMxLjk0NjI2NDEgNCwzMC42NDY0MTQ5IEw0LDguMzUzNTg1MTEgQzQsNy4wNTM3MzU5NSA1LjA1MzczNTk1LDYgNi4zNTM1ODUxMSw2IFoiIGlkPSJSZWN0YW5nbGUtQ29weS0zMSIgc3Ryb2tlPSIjNzg4OTk5IiBmaWxsPSIjRTdFQUYzIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC4zNTM1ODUxMSw0IEwyNy42NDY0MTQ5LDQgQzI4Ljk0NjI2NDEsNCAzMCw1LjA1MzczNTk1IDMwLDYuMzUzNTg1MTEgTDMwLDI3IEMzMCwyOS4yMDkxMzkgMjguMjA5MTM5LDMxIDI2LDMxIEw0LjM1MzU4NTExLDMxIEMzLjA1MzczNTk1LDMxIDIsMjkuOTQ2MjY0MSAyLDI4LjY0NjQxNDkgTDIsNi4zNTM1ODUxMSBDMiw1LjA1MzczNTk1IDMuMDUzNzM1OTUsNCA0LjM1MzU4NTExLDQgWiIgaWQ9IlJlY3RhbmdsZS1Db3B5LTMxIiBzdHJva2U9IiM3ODg5OTkiIGZpbGw9IiNFN0VBRjMiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtQ29weS0zMSIgc3Ryb2tlPSIjNzg4OTk5IiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIyIiB3aWR0aD0iMjgiIGhlaWdodD0iMjciIHJ4PSIyLjM1MzU4NTExIj48L3JlY3Q+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMi4zNTM1ODUxMSwyIEwyNS42NDY0MTQ5LDIgQzI2Ljk0NjI2NDEsMiAyOCwzLjA1MzczNTk1IDI4LDQuMzUzNTg1MTEgTDI4LDkgTDI4LDkgTDAsOSBMMCw0LjM1MzU4NTExIEMyLjg0OTAzNTk4ZS0xNiwzLjA1MzczNTk1IDEuMDUzNzM1OTUsMiAyLjM1MzU4NTExLDIgWiIgaWQ9IlJlY3RhbmdsZS1Db3B5LTMyIiBzdHJva2U9IiM3ODg5OTkiIGZpbGw9IiNDNUNDRDciPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtQ29weS0zMyIgc3Ryb2tlPSIjNzg4OTk5IiBmaWxsPSIjRjhGOUZDIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4PSIxOCIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNSIgcng9IjEiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtQ29weS0zMyIgc3Ryb2tlPSIjNzg4OTk5IiBmaWxsPSIjRjhGOUZDIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4PSIyMyIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNSIgcng9IjEiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtQ29weS0zNSIgc3Ryb2tlPSIjNzg4OTk5IiBmaWxsPSIjRjhGOUZDIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4PSIxMyIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNSIgcng9IjEiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtQ29weS0zNyIgc3Ryb2tlPSIjNzg4OTk5IiBmaWxsPSIjRjhGOUZDIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4PSI4IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI1IiByeD0iMSI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS1Db3B5LTM5IiBzdHJva2U9IiM3ODg5OTkiIGZpbGw9IiNGOEY5RkMiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHg9IjMiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjUiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjRTdFQUYzIiB4PSIzIiB5PSIxMiIgd2lkdGg9IjYiIGhlaWdodD0iNiIgcng9IjAuNSI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS1Db3B5LTE2IiBmaWxsPSIjRTdFQUYzIiB4PSIxMSIgeT0iMTIiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIHJ4PSIwLjUiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtQ29weS0xOCIgZmlsbD0iI0U3RUFGMyIgeD0iMTkiIHk9IjEyIiB3aWR0aD0iNiIgaGVpZ2h0PSI2IiByeD0iMC41Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjRTdFQUYzIiB4PSIzIiB5PSIyMCIgd2lkdGg9IjYiIGhlaWdodD0iNiIgcng9IjAuNSI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS1Db3B5LTE2IiBmaWxsPSIjRTdFQUYzIiB4PSIxMSIgeT0iMjAiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIHJ4PSIwLjUiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aC0xMC1Db3B5LTExIiBzdHJva2U9IiM3ODg5OTkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcG9pbnRzPSIxMi41IDE1LjI2MzM1ODIgMTMuMzc1Njc2IDE2LjUgMTUuNSAxMy41Ij48L3BvbHlsaW5lPgogICAgICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJQYXRoLTEwLUNvcHktMTEiIHN0cm9rZT0iIzc4ODk5OSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBwb2ludHM9IjIwLjUgMTUuMjYzMzU4MiAyMS4zNzU2NzYgMTYuNSAyMy41IDEzLjUiPjwvcG9seWxpbmU+CiAgICAgICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlBhdGgtMTAtQ29weS0xMSIgc3Ryb2tlPSIjNzg4OTk5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHBvaW50cz0iMTIuNSAyMy4yNjMzNTgyIDEzLjM3NTY3NiAyNC41IDE1LjUgMjEuNSI+PC9wb2x5bGluZT4KICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aC0xMC1Db3B5LTExIiBzdHJva2U9IiM3ODg5OTkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcG9pbnRzPSI0LjUgMjMuMjYzMzU4MiA1LjM3NTY3NTk3IDI0LjUgNy41IDIxLjUiPjwvcG9seWxpbmU+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLUNvcHktMTgiIGZpbGw9IiNFN0VBRjMiIHg9IjE5IiB5PSIyMCIgd2lkdGg9IjYiIGhlaWdodD0iNiIgcng9IjAuNSI+PC9yZWN0PgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
                alt="Document"
                style={{ width: '20px', height: '20px' }}
              />
              <Typography variant="body2">
                When Booking.com is connected, all current Hostaway availability and rates will be uploaded and replace current Booking.com settings.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <img 
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzRweCIgaGVpZ2h0PSIzOXB4IiB2aWV3Qm94PSIwIDAgMzQgMzkiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA2My4xICgxMDEwMTApIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPkREMTdENUYwLTJBNTgtNDhCRi1CQkEyLTcxMEFBMTdDRjdFODwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTGVnYWwtc3RhdGVtZW50cy1zdmctaWNvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03OC4wMDAwMDAsIC0xODIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMzciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc5LjAwMDAwMCwgMTgyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTk2LUNvcHktMiIgc3Ryb2tlPSIjNzg4OTk5Ij4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAuMjM5NzUwNSw0LjgzNjAwMDEyIEwyNy45NzIwMDE1LDQuODM2MDAwMTIgQzI4LjUyMzczNCw0LjgzNjAwMDEyIDI4Ljk3MTAwMTUsNS4yODMyNjc2OCAyOC45NzEwMDE1LDUuODM1MDAwMTggTDI4Ljk3MTAwMTUsMzQuODA2MDAxNyBDMjguOTcxMDAxNSwzNi40NjExOTkyIDI3LjYyOTE5ODgsMzcuODAzMDAxOSAyNS45NzQwMDE0LDM3LjgwMzAwMTkgTDQuOTk1MDAwMjYsMzcuODAzMDAxOSBDNC40NDMyNjc3NywzNy44MDMwMDE5IDMuOTk2MDAwMjEsMzcuMzU1NzM0MyAzLjk5NjAwMDIxLDM2LjgwNDAwMTggTDMuOTk2MDAwMjEsMTEuMDczMDAwNSBMMy45OTYwMDAyMSwxMS4wNzMwMDA1IEwxMC4yMzk3NTA1LDQuODM2MDAwMTIgWiIgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iI0U3RUFGMyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik04LjI0MTc1MDQzLDIuODM4MDAwMDIgTDI1Ljk3NDAwMTQsMi44MzgwMDAwMiBDMjYuNTI1NzMzOSwyLjgzODAwMDAyIDI2Ljk3MzAwMTQsMy4yODUyNjc1OCAyNi45NzMwMDE0LDMuODM3MDAwMDcgTDI2Ljk3MzAwMTQsMzMuODA3MDAxNiBDMjYuOTczMDAxNCwzNC45MTA0NjY2IDI2LjA3ODQ2NjMsMzUuODA1MDAxOCAyNC45NzUwMDEzLDM1LjgwNTAwMTggTDIuOTk3MDAwMTYsMzUuODA1MDAxOCBDMi40NDUyNjc2NiwzNS44MDUwMDE4IDEuOTk4MDAwMTEsMzUuMzU3NzM0MiAxLjk5ODAwMDExLDM0LjgwNjAwMTcgTDEuOTk4MDAwMTEsOS4wNzUwMDAzNSBMMS45OTgwMDAxMSw5LjA3NTAwMDM1IEw4LjI0MTc1MDQzLDIuODM4MDAwMDIgWiIgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iI0U3RUFGMyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LjI0Mzc1MDMzLDAuODM5OTk5OTE0IEwyMy45NzYwMDEzLDAuODM5OTk5OTE0IEMyNC41Mjc3MzM4LDAuODM5OTk5OTE0IDI0Ljk3NTAwMTMsMS4yODcyNjc0NyAyNC45NzUwMDEzLDEuODM4OTk5OTcgTDI0Ljk3NTAwMTMsMzIuODA4MDAxNiBDMjQuOTc1MDAxMywzMy4zNTk3MzQxIDI0LjUyNzczMzgsMzMuODA3MDAxNiAyMy45NzYwMDEzLDMzLjgwNzAwMTYgTDAuOTk5MDAwMDUzLDMzLjgwNzAwMTYgQzAuNDQ3MjY3NTU4LDMzLjgwNzAwMTYgMi4wMjc3MTUzMmUtMTUsMzMuMzU5NzM0MSAwLDMyLjgwODAwMTYgTDAsNy4wNzcwMDAyNCBMMCw3LjA3NzAwMDI0IEw2LjI0Mzc1MDMzLDAuODM5OTk5OTE0IFoiIGlkPSJSZWN0YW5nbGUiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS45OTQwMDAzMiwwLjgzOTk5OTkxNCBMNS45OTQwMDAzMiw1LjgzNTAwMDE4IEM1Ljk5NDAwMDMyLDYuMzg2NzMyNjcgNS41NDY3MzI3Niw2LjgzNDAwMDIzIDQuOTk1MDAwMjYsNi44MzQwMDAyMyBMMCw2LjgzNDAwMDIzIEwwLDYuODM0MDAwMjMgTDUuOTk0MDAwMzIsMC44Mzk5OTk5MTQgWiIgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiNGRkZGRkYiIHg9IjMuOTk2MDAwMjEiIHk9IjExLjgyOTAwMDUiIHdpZHRoPSIxNi45ODMwMDA5IiBoZWlnaHQ9IjE3Ljk4MjAwMDkiIHJ4PSIwLjk5OTAwMDA1MyI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPSI0LjQ5NTUwMDI0IiB5MT0iMTQuODI2MDAwNyIgeDI9IjIwLjQ3OTUwMTEiIHkyPSIxNC44MjYwMDA3IiBpZD0iTGluZS0zMiIgZmlsbD0iI0ZGRkZGRiI+PC9saW5lPgogICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPSI0LjQ5NTUwMDI0IiB5MT0iMTcuODIzMDAwOCIgeDI9IjIwLjQ3OTUwMTEiIHkyPSIxNy44MjMwMDA4IiBpZD0iTGluZS0zMi1Db3B5IiBmaWxsPSIjRkZGRkZGIj48L2xpbmU+CiAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9IjQuNDk1NTAwMjQiIHkxPSIyMC44MjAwMDEiIHgyPSIyMC40Nzk1MDExIiB5Mj0iMjAuODIwMDAxIiBpZD0iTGluZS0zMi1Db3B5LTQiIGZpbGw9IiNGRkZGRkYiPjwvbGluZT4KICAgICAgICAgICAgICAgICAgICA8bGluZSB4MT0iNC40OTU1MDAyNCIgeTE9IjI2LjgxNDAwMTMiIHgyPSIyMC40Nzk1MDExIiB5Mj0iMjYuODE0MDAxMyIgaWQ9IkxpbmUtMzItQ29weS0zIiBmaWxsPSIjRkZGRkZGIj48L2xpbmU+CiAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9IjQuNDk1NTAwMjQiIHkxPSIyMy44MTcwMDExIiB4Mj0iMjAuNDc5NTAxMSIgeTI9IjIzLjgxNzAwMTEiIGlkPSJMaW5lLTMyLUNvcHktMiIgZmlsbD0iI0ZGRkZGRiI+PC9saW5lPgogICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPSI3LjQ5MjUwMDM5IiB5MT0iMTIuMzI4NTAwNSIgeDI9IjcuNDkyNTAwMzkiIHkyPSIyOS4zMTE1MDE0IiBpZD0iTGluZS0zMyIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSI+PC9saW5lPgogICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPSIxNy40ODI1MDA5IiB5MT0iMTEuODI5MDAwNSIgeDI9IjE3LjQ4MjUwMDkiIHkyPSIyOC44MTIwMDE0IiBpZD0iTGluZS0zMyIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSI+PC9saW5lPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTEyNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTcuNTAwMDAwLCAxNi41MDAwMDApIHJvdGF0ZSgtNS4wMDAwMDApIHRyYW5zbGF0ZSgtMTcuNTAwMDAwLCAtMTYuNTAwMDAwKSB0cmFuc2xhdGUoNC4wMDAwMDAsIDMuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTExLjU2MDAwMDMsMTkuMTIwMDAwNiBDMTUuNzM1MjczMiwxOS4xMjAwMDA2IDE5LjEyMDAwMDYsMTUuNzM1MjczMiAxOS4xMjAwMDA2LDExLjU2MDAwMDMgQzE5LjEyMDAwMDYsNy43NjQ5MTkyNiAxNi4zMjM2MjEzLDQuNjIyOTY3NjEgMTIuNjc4OTUyNiw0LjA4MjIzNTMgQzEyLjMxMzgyOTEsNC4wMjgwNjQ2NCAxMS45NDAxOTIxLDQgMTEuNTYwMDAwMyw0IEM3LjM4NDcyNzQzLDQgNCw3LjM4NDcyNzQzIDQsMTEuNTYwMDAwMyBDNCwxNS43MzUyNzMyIDcuMzg0NzI3NDMsMTkuMTIwMDAwNiAxMS41NjAwMDAzLDE5LjEyMDAwMDYgWiIgaWQ9Ik92YWwiIHN0cm9rZT0iIzc4ODk5OSIgc3Ryb2tlLXdpZHRoPSIxLjA4MDAwMDA0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS41NjAwMDAsIDExLjU2MDAwMCkgcm90YXRlKDQ1LjAwMDAwMCkgdHJhbnNsYXRlKC0xMS41NjAwMDAsIC0xMS41NjAwMDApICI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS41NjAwMDAzLDYuMTYwMDAwMDkgQzkuMjMwNzI4NzQsNi4xNjAwMDAwOSA3LjI0NTkwNjU2LDcuNjM0NzYzMTYgNi40ODgzMzM2Nyw5LjcwMTQ4OTM4IiBpZD0iUGF0aCIgc3Ryb2tlPSIjRTdFQUYzIiBzdHJva2Utd2lkdGg9IjEuMDgwMDAwMDQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPSIxNy4yNzYzMjUyIiB5MT0iMTcuMjc2MzI1MiIgeDI9IjI1LjkxNjMyNTUiIHkyPSIyNS45MTYzMjU1IiBpZD0iTGluZS0zMSIgc3Ryb2tlPSIjNzg4OTk5IiBzdHJva2Utd2lkdGg9IjEuMDgwMDAwMDQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPSIxOS45NzYzMjUzIiB5MT0iMTkuOTc2MzI1MyIgeDI9IjI1LjkxNjMyNTUiIHkyPSIyNS45MTYzMjU1IiBpZD0iTGluZS0zMSIgc3Ryb2tlPSIjNzg4OTk5IiBzdHJva2Utd2lkdGg9IjMuMjQwMDAwMTMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aC0xMC1Db3B5LTExIiBzdHJva2U9IiM3ODg5OTkiIHN0cm9rZS13aWR0aD0iMi4xNjAwMDAwOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS41NjAwMDAsIDEyLjEwMDAwMCkgcm90YXRlKDUuMDAwMDAwKSB0cmFuc2xhdGUoLTExLjU2MDAwMCwgLTEyLjEwMDAwMCkgIiBwb2ludHM9IjguMzIwMDAwMTcgMTIuMTAwMDAwMyAxMC41NDQ1MzQ0IDE0LjgwMDAwMDQgMTQuODAwMDAwNCA5LjQwMDAwMDIxIj48L3BvbHlsaW5lPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
                alt="Checklist"
                style={{ width: '20px', height: '20px' }}
              />
              <Typography variant="body2">
                I will ensure that my rates and availability are up to date on Hostaway before connecting.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <img 
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0NHB4IiB2aWV3Qm94PSIwIDAgNDAgNDQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA2My4xICgxMDEwMTApIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPjlDQ0E4NEVCLUQwRDYtNDJDMS1COEE3LTNGNzYyMUUzNEQ0RjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTGVnYWwtc3RhdGVtZW50cy1zdmctaWNvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTIuMDAwMDAwLCAtMTEwLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtODMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxMy4wMDAwMDAsIDExMS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC03MyI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEuNzc2MzU2ODRlLTE1LDE4IEMzLjgwMzY3OTMyLDE5LjQ1MzYgNy40MzcyMjI0LDIwLjE4MDQwMDEgMTAuOTAwNjI5MiwyMC4xODA0MDAxIEMxNi4wOTU3Mzk1LDIwLjE4MDQwMDEgMTYuMDg5ODYwMywxOCAyMS4yNjAzMDExLDE4IEMyNC43MDcyNjE2LDE4IDI4LjE1MzgyODIsMTguNzI2OCAzMS42MDAwMDA5LDIwLjE4MDQwMDEgTDMxLjYwMDAwMDksMzYuMTcwMDAwNSBDMjguMTU5Njk3NywzNC43MTY0MDA1IDI0LjcxMzEzMTEsMzMuOTg5NjAwNCAyMS4yNjAzMDExLDMzLjk4OTYwMDQgQzE2LjA4MTA1NjEsMzMuOTg5NjAwNCAxNi4zMzU2Njk1LDM2LjE3MDAwMDUgMTAuOTAwNjI5MiwzNi4xNzAwMDA1IEM3LjI3NzI2OTA0LDM2LjE3MDAwMDUgMy42NDM3MjU5NiwzNS40NDMyMDA1IDEuNzc2MzU2ODRlLTE1LDMzLjk4OTYwMDQgTDEuNzc2MzU2ODRlLTE1LDE4IFoiIGlkPSJSZWN0YW5nbGUtQ29weS01NiIgc3Ryb2tlPSIjNzg4OTk5IiBmaWxsPSIjRTdFQUYzIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjgwMDAwMCwgMjcuMDg1MDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xNS44MDAwMDAsIC0yNy4wODUwMDApICI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLjc3NjM1Njg0ZS0xNSwxNSBDMy44MDM2NzkzMiwxNi40NTM2IDcuNDM3MjIyNCwxNy4xODA0MDAxIDEwLjkwMDYyOTIsMTcuMTgwNDAwMSBDMTYuMDk1NzM5NSwxNy4xODA0MDAxIDE2LjA4OTg2MDMsMTUgMjEuMjYwMzAxMSwxNSBDMjQuNzA3MjYxNiwxNSAyOC4xNTM4MjgyLDE1LjcyNjggMzEuNjAwMDAwOSwxNy4xODA0MDAxIEwzMS42MDAwMDA5LDMzLjE3MDAwMDUgQzI4LjE1OTY5NzcsMzEuNzE2NDAwNSAyNC43MTMxMzExLDMwLjk4OTYwMDQgMjEuMjYwMzAxMSwzMC45ODk2MDA0IEMxNi4wODEwNTYxLDMwLjk4OTYwMDQgMTYuMzM1NjY5NSwzMy4xNzAwMDA1IDEwLjkwMDYyOTIsMzMuMTcwMDAwNSBDNy4yNzcyNjkwNCwzMy4xNzAwMDA1IDMuNjQzNzI1OTYsMzIuNDQzMjAwNSAxLjc3NjM1Njg0ZS0xNSwzMC45ODk2MDA0IEwxLjc3NjM1Njg0ZS0xNSwxNSBaIiBpZD0iUmVjdGFuZ2xlLUNvcHktNTYiIHN0cm9rZT0iIzc4ODk5OSIgZmlsbD0iI0U3RUFGMyIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNS44MDAwMDAsIDI0LjA4NTAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMTUuODAwMDAwLCAtMjQuMDg1MDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMS43NzYzNTY4NGUtMTUsMTIgQzMuODAzNjc5MzIsMTMuNDUzNiA3LjQzNzIyMjQsMTQuMTgwNDAwMSAxMC45MDA2MjkyLDE0LjE4MDQwMDEgQzE2LjA5NTczOTUsMTQuMTgwNDAwMSAxNi4wODk4NjAzLDEyIDIxLjI2MDMwMTEsMTIgQzI0LjcwNzI2MTYsMTIgMjguMTUzODI4MiwxMi43MjY4IDMxLjYwMDAwMDksMTQuMTgwNDAwMSBMMzEuNjAwMDAwOSwzMC4xNzAwMDA1IEMyOC4xNTk2OTc3LDI4LjcxNjQwMDUgMjQuNzEzMTMxMSwyNy45ODk2MDA0IDIxLjI2MDMwMTEsMjcuOTg5NjAwNCBDMTYuMDgxMDU2MSwyNy45ODk2MDA0IDE2LjMzNTY2OTUsMzAuMTcwMDAwNSAxMC45MDA2MjkyLDMwLjE3MDAwMDUgQzcuMjc3MjY5MDQsMzAuMTcwMDAwNSAzLjY0MzcyNTk2LDI5LjQ0MzIwMDUgMS43NzYzNTY4NGUtMTUsMjcuOTg5NjAwNCBMMS43NzYzNTY4NGUtMTUsMTIgWiIgaWQ9IlJlY3RhbmdsZS1Db3B5LTU2IiBzdHJva2U9IiM3ODg5OTkiIGZpbGw9IiNFN0VBRjMiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUuODAwMDAwLCAyMS4wODUwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTE1LjgwMDAwMCwgLTIxLjA4NTAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEuNzc2MzU2ODRlLTE1LDkgQzMuODAzNjc5MzIsMTAuNDUzNiA3LjQzNzIyMjQsMTEuMTgwNDAwMSAxMC45MDA2MjkyLDExLjE4MDQwMDEgQzE2LjA5NTczOTUsMTEuMTgwNDAwMSAxNi4wODk4NjAzLDkgMjEuMjYwMzAxMSw5IEMyNC43MDcyNjE2LDkgMjguMTUzODI4Miw5LjcyNjgwMDAyIDMxLjYwMDAwMDksMTEuMTgwNDAwMSBMMzEuNjAwMDAwOSwyNy4xNzAwMDA1IEMyOC4xNTk2OTc3LDI1LjcxNjQwMDUgMjQuNzEzMTMxMSwyNC45ODk2MDA0IDIxLjI2MDMwMTEsMjQuOTg5NjAwNCBDMTYuMDgxMDU2MSwyNC45ODk2MDA0IDE2LjMzNTY2OTUsMjcuMTcwMDAwNSAxMC45MDA2MjkyLDI3LjE3MDAwMDUgQzcuMjc3MjY5MDQsMjcuMTcwMDAwNSAzLjY0MzcyNTk2LDI2LjQ0MzIwMDUgMS43NzYzNTY4NGUtMTUsMjQuOTg5NjAwNCBMMS43NzYzNTY4NGUtMTUsOSBaIiBpZD0iUmVjdGFuZ2xlLUNvcHktNTYiIHN0cm9rZT0iIzc4ODk5OSIgZmlsbD0iI0U3RUFGMyIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNS44MDAwMDAsIDE4LjA4NTAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMTUuODAwMDAwLCAtMTguMDg1MDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMS43NzYzNTY4NGUtMTUsNiBDMy44MDM2NzkzMiw3LjQ1MzYwMDA0IDcuNDM3MjIyNCw4LjE4MDQwMDA2IDEwLjkwMDYyOTIsOC4xODA0MDAwNiBDMTYuMDk1NzM5NSw4LjE4MDQwMDA2IDE2LjA4OTg2MDMsNiAyMS4yNjAzMDExLDYgQzI0LjcwNzI2MTYsNiAyOC4xNTM4MjgyLDYuNzI2ODAwMDIgMzEuNjAwMDAwOSw4LjE4MDQwMDA2IEwzMS42MDAwMDA5LDI0LjE3MDAwMDUgQzI4LjE1OTY5NzcsMjIuNzE2NDAwNSAyNC43MTMxMzExLDIxLjk4OTYwMDQgMjEuMjYwMzAxMSwyMS45ODk2MDA0IEMxNi4wODEwNTYxLDIxLjk4OTYwMDQgMTYuMzM1NjY5NSwyNC4xNzAwMDA1IDEwLjkwMDYyOTIsMjQuMTcwMDAwNSBDNy4yNzcyNjkwNCwyNC4xNzAwMDA1IDMuNjQzNzI1OTYsMjMuNDQzMjAwNSAxLjc3NjM1Njg0ZS0xNSwyMS45ODk2MDA0IEwxLjc3NjM1Njg0ZS0xNSw2IFoiIGlkPSJSZWN0YW5nbGUtQ29weS01NiIgc3Ryb2tlPSIjNzg4OTk5IiBmaWxsPSIjRTdFQUYzIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjgwMDAwMCwgMTUuMDg1MDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xNS44MDAwMDAsIC0xNS4wODUwMDApICI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLjc3NjM1Njg0ZS0xNSwzIEMzLjgwMzY3OTMyLDQuNDUzNjAwMDQgNy40MzcyMjI0LDUuMTgwNDAwMDYgMTAuOTAwNjI5Miw1LjE4MDQwMDA2IEMxNi4wOTU3Mzk1LDUuMTgwNDAwMDYgMTYuMDg5ODYwMywzIDIxLjI2MDMwMTEsMyBDMjQuNzA3MjYxNiwzIDI4LjE1MzgyODIsMy43MjY4MDAwMiAzMS42MDAwMDA5LDUuMTgwNDAwMDYgTDMxLjYwMDAwMDksMjEuMTcwMDAwNSBDMjguMTU5Njk3NywxOS43MTY0MDA1IDI0LjcxMzEzMTEsMTguOTg5NjAwNCAyMS4yNjAzMDExLDE4Ljk4OTYwMDQgQzE2LjA4MTA1NjEsMTguOTg5NjAwNCAxNi4zMzU2Njk1LDIxLjE3MDAwMDUgMTAuOTAwNjI5MiwyMS4xNzAwMDA1IEM3LjI3NzI2OTA0LDIxLjE3MDAwMDUgMy42NDM3MjU5NiwyMC40NDMyMDA1IDEuNzc2MzU2ODRlLTE1LDE4Ljk4OTYwMDQgTDEuNzc2MzU2ODRlLTE1LDMgWiIgaWQ9IlJlY3RhbmdsZS1Db3B5LTU2IiBzdHJva2U9IiM3ODg5OTkiIGZpbGw9IiNFN0VBRjMiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUuODAwMDAwLCAxMi4wODUwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTE1LjgwMDAwMCwgLTEyLjA4NTAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTEyOCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLjc3NjM1Njg0ZS0xNSwwIEMzLjgwMzY3OTMyLDEuNDUzNjAwMDQgNy40MzcyMjI0LDIuMTgwNDAwMDYgMTAuOTAwNjI5MiwyLjE4MDQwMDA2IEMxNi4wOTU3Mzk1LDIuMTgwNDAwMDYgMTYuMDg5ODYwMywwIDIxLjI2MDMwMTEsMCBDMjQuNzA3MjYxNiwwIDI4LjE1MzgyODIsMC43MjY4MDAwMiAzMS42MDAwMDA5LDIuMTgwNDAwMDYgTDMxLjYwMDAwMDksMTguMTcwMDAwNSBDMjguMTU5Njk3NywxNi43MTY0MDA1IDI0LjcxMzEzMTEsMTUuOTg5NjAwNCAyMS4yNjAzMDExLDE1Ljk4OTYwMDQgQzE2LjA4MTA1NjEsMTUuOTg5NjAwNCAxNi4zMzU2Njk1LDE4LjE3MDAwMDUgMTAuOTAwNjI5MiwxOC4xNzAwMDA1IEM3LjI3NzI2OTA0LDE4LjE3MDAwMDUgMy42NDM3MjU5NiwxNy40NDMyMDA1IDEuNzc2MzU2ODRlLTE1LDE1Ljk4OTYwMDQgTDEuNzc2MzU2ODRlLTE1LDAgWiIgaWQ9IlJlY3RhbmdsZS1Db3B5LTU2IiBzdHJva2U9IiM3ODg5OTkiIGZpbGw9IiNFN0VBRjMiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUuODAwMDAwLCA5LjA4NTAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMTUuODAwMDAwLCAtOS4wODUwMDApICI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlBhdGgtMTAtQ29weSIgc3Ryb2tlPSIjNzg4OTk5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI4LjM0NTgxOCwgNC4xODA1NTcpIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTI4LjM0NTgxOCwgLTQuMTgwNTU3KSAiIHBvaW50cz0iMjkuNTMwODE4MyAzLjc4NTU1NjU4IDI3LjE2MDgxODIgMi45OTU1NTY1NiAyNy4xNjA4MTgyIDUuMzY1NTU2NjIiPjwvcG9seWxpbmU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aC0xMC1Db3B5LTIiIHN0cm9rZT0iIzc4ODk5OSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBwb2ludHM9IjQuMjQyNzU2NDggMi45OTU1NTY1NiAxLjg3Mjc1NjQyIDMuNzg1NTU2NTggMS44NzI3NTY0MiA2LjE1NTU1NjY0Ij48L3BvbHlsaW5lPgogICAgICAgICAgICAgICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlBhdGgtMTAtQ29weS0zIiBzdHJva2U9IiM3ODg5OTkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjguMDU3NzU2LCAxMy41NzU1NTcpIHNjYWxlKC0xLCAtMSkgdHJhbnNsYXRlKC0yOC4wNTc3NTYsIC0xMy41NzU1NTcpICIgcG9pbnRzPSIyOS4yNDI3NTY1IDExLjk5NTU1NjYgMjYuODcyNzU2NCAxMi43ODU1NTY2IDI2Ljg3Mjc1NjQgMTUuMTU1NTU2NiI+PC9wb2x5bGluZT4KICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJQYXRoLTEwLUNvcHktNCIgc3Ryb2tlPSIjNzg4OTk5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDU3NzU2LCAxNC4xODA1NTcpIHNjYWxlKDEsIC0xKSB0cmFuc2xhdGUoLTMuMDU3NzU2LCAtMTQuMTgwNTU3KSAiIHBvaW50cz0iNC4yNDI3NTY0OCAxMy43ODU1NTY2IDEuODcyNzU2NDIgMTIuOTk1NTU2NiAxLjg3Mjc1NjQyIDE1LjM2NTU1NjYiPjwvcG9seWxpbmU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMi44MzI3NjI0LDEwLjExOTkzNTMgQzIzLjQ4ODI4OTksMTAuNTU3OTQwNyAyNC4xNDY2MjMzLDEwLjgxMDAwMDMgMjQuODA3NzYyNSwxMC44NzYxMTQzIEMyNS40Njg5MDE2LDEwLjk0MjIyODIgMjYuMTI3MjM1LDEwLjgyMTgzNTIgMjYuNzgyNzYyNSwxMC41MTQ5MzUzIiBpZD0iUGF0aC0xNSIgc3Ryb2tlPSIjNzg4OTk5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0LjgwNzc2MiwgMTAuNTA2ODEzKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0yNC44MDc3NjIsIC0xMC41MDY4MTMpICI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNC4wMjA1NDgxNiw3LjM0NDM5NTM3IEM0LjY3NjA3NTY3LDcuNzgyNDAwNzQgNS4zMzQ0MDkwMyw4LjAzNDQ2MDM4IDUuOTk1NTQ4MjEsOC4xMDA1NzQzIEM2LjY1NjY4NzQsOC4xNjY2ODgyMiA3LjMxNTAyMDc1LDguMDQ2Mjk1MjUgNy45NzA1NDgyNyw3LjczOTM5NTM4IiBpZD0iUGF0aC0xNSIgc3Ryb2tlPSIjNzg4OTk5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuOTk1NTQ4LCA3LjczMTI3Mykgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtNS45OTU1NDgsIC03LjczMTI3MykgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtQ29weS0zNCIgc3Ryb2tlPSIjNzg4OTk5IiBmaWxsPSIjRjhGOUZDIiBjeD0iMTUuMzE2MTgyNSIgY3k9IjkuMDUxMTY4NCIgcj0iNS45MjUwMDAxNiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNS42MTQ3Mjk1LDEzLjE5MTYzNzUgTDE1LjYxNDcyOTUsMTIuMDc4MzQ3IEMxNi4yOTg3NzksMTIuMDAzMTAxNSAxNi44MjIwNzY4LDExLjgwNDcyNzIgMTcuMTg0NjIzMSwxMS40ODMyMjM5IEMxNy41NDcxNjkzLDExLjE2MTcyMDYgMTcuNzI4NDQyNCwxMC43NTMwMDExIDE3LjcyODQ0MjQsMTAuMjU3MDY1MiBDMTcuNzI4NDQyNCw5Ljg1Njg5NjI0IDE3LjYwMzYwMzQsOS41MTgyOTE3NSAxNy4zNTM5MjUzLDkuMjQxMjUxNyBDMTcuMTA0MjQ3Myw4Ljk2NDIxMTY2IDE2LjY1NDQ4NDcsOC43MDA4NTI2MSAxNi4wMDQ2Mzc3LDguNDUxMTc0NTQgTDE2LjAwNDYzNzcsOC40NTExNzQ1NCBMMTUuNjE0NzI5NSw4LjMwMjM5Mzc4IEwxNS42MTQ3Mjk1LDYuNDM0OTM4NjggQzE2LjE0NDg2NzksNi40NzU5ODE2NCAxNi42Nzg0MjY1LDYuNjAyNTMwOCAxNy4yMTU0MDUzLDYuODE0NTg2MTQgTDE3LjIxNTQwNTMsNi44MTQ1ODYxNCBMMTcuNTg5OTIyNCw1Ljg3NTcyODIyIEMxNi45Njc0Mzc0LDUuNjE5MjA5NjYgMTYuMzA5MDM5Nyw1LjQ3ODk3OTUxIDE1LjYxNDcyOTUsNS40NTUwMzc3OCBMMTUuNjE0NzI5NSw1LjQ1NTAzNzc4IEwxNS42MTQ3Mjk1LDQuNjA4NTI2NTQgTDE0LjkzMjM5MDEsNC42MDg1MjY1NCBMMTQuOTMyMzkwMSw1LjQ3MDQyODkgQzE0LjMwMzA2NDYsNS41MzU0MTM2IDEzLjgwNDU2MzUsNS43MjAxMDY5NiAxMy40MzY4ODY5LDYuMDI0NTA4OTggQzEzLjA2OTIxMDMsNi4zMjg5MTEgMTIuODg1MzcyLDYuNzE3MTA5MDkgMTIuODg1MzcyLDcuMTg5MTAzMjQgQzEyLjg4NTM3Miw3LjYzMDMxNTE2IDEzLjAxNDQ4NjQsOC4wMDA1NTY5NCAxMy4yNzI3MTUxLDguMjk5ODI4NiBDMTMuNTMwOTQzNyw4LjU5OTEwMDI1IDEzLjk0MDUxODQsOC44NTY0NzM4NyAxNC41MDE0MzksOS4wNzE5NDk0NiBMMTQuNTAxNDM5LDkuMDcxOTQ5NDYgTDE0LjkzMjM5MDEsOS4yMzA5OTA5NiBMMTQuOTMyMzkwMSwxMS4xNDk3NDk4IEMxNC42MjExNDc2LDExLjE0NjMyOTUgMTQuMjY4ODYyMSwxMS4wOTU4ODA5IDEzLjg3NTUzMzcsMTAuOTk4NDAzOCBDMTMuNDgyMjA1MiwxMC45MDA5MjY4IDEzLjEzODQ3MDMsMTAuNzgwMzYzMSAxMi44NDQzMjkxLDEwLjYzNjcxMjcgTDEyLjg0NDMyOTEsMTAuNjM2NzEyNyBMMTIuODQ0MzI5MSwxMS43MTkyMjEgQzEzLjM4ODE0ODQsMTEuOTY1NDc4OCAxNC4wODQxNjg4LDEyLjA5NTQ0ODIgMTQuOTMyMzkwMSwxMi4xMDkxMjkyIEwxNC45MzIzOTAxLDEyLjEwOTEyOTIgTDE0LjkzMjM5MDEsMTMuMTkxNjM3NSBMMTUuNjE0NzI5NSwxMy4xOTE2Mzc1IFogTTE0LjkzMjM5MDEsOC4wNTEwMDU1OSBDMTQuNjE0MzA3MSw3LjkyNDQ1NjQ0IDE0LjM5NDU1NjIsNy43OTYxOTcxNiAxNC4yNzMxMzc0LDcuNjY2MjI3NzYgQzE0LjE1MTcxODcsNy41MzYyNTgzNSAxNC4wOTEwMDkzLDcuMzczNzk2NiAxNC4wOTEwMDkzLDcuMTc4ODQyNDkgQzE0LjA5MTAwOTMsNi45OTA3Mjg4OSAxNC4xNjI4MzQ1LDYuODMzMzk3NSAxNC4zMDY0ODQ4LDYuNzA2ODQ4MzUgQzE0LjQ1MDEzNTIsNi41ODAyOTkxOSAxNC42NTg3NzAzLDYuNDk2NTAzMTMgMTQuOTMyMzkwMSw2LjQ1NTQ2MDE2IEwxNC45MzIzOTAxLDYuNDU1NDYwMTYgTDE0LjkzMjM5MDEsOC4wNTEwMDU1OSBaIE0xNS42MTQ3Mjk1LDExLjEwODcwNjggTDE1LjYxNDcyOTUsOS40NzIxMTg0MSBDMTUuOTM5NjUzLDkuNTkxODI3MDcgMTYuMTcxMzc0OCw5LjcxNTgxMTA0IDE2LjMwOTg5NDgsOS44NDQwNzAzMiBDMTYuNDQ4NDE0OCw5Ljk3MjMyOTYgMTYuNTE3Njc0OCwxMC4xMzU2NDY0IDE2LjUxNzY3NDgsMTAuMzM0MDIwOCBDMTYuNTE3Njc0OCwxMC43NTgxMzE0IDE2LjIxNjY5MywxMS4wMTYzNjAxIDE1LjYxNDcyOTUsMTEuMTA4NzA2OCBMMTUuNjE0NzI5NSwxMS4xMDg3MDY4IFoiIGlkPSIkIiBmaWxsPSIjNzg4OTk5IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9IjE0Ljk4NjA5NTkiIHkxPSI0LjUxMDk2MTc3IiB4Mj0iMTUuNjEzOTA0MSIgeTI9IjEzLjQ4OTAzODIiIGlkPSJMaW5lLTM1IiBzdHJva2U9IiM3ODg5OTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjMwMDAwMCwgOS4wMDAwMDApIHJvdGF0ZSg0LjAwMDAwMCkgdHJhbnNsYXRlKC0xNS4zMDAwMDAsIC05LjAwMDAwMCkgIj48L2xpbmU+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTEzMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIuMDAwMDAwLCAyMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLUNvcHktMiIgc3Ryb2tlPSIjNzg4OTk5IiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHg9IjAiIHk9IjAiIHdpZHRoPSIyNiIgaGVpZ2h0PSIxOSIgcng9IjEuMDkyODk4OTEiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjNzg4OTk5IiB4PSIxLjgxODk4OTRlLTEyIiB5PSIzLjE2NjY2NjY3IiB3aWR0aD0iMjYiIGhlaWdodD0iNC4yMjIyMjIyMiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiNEMEQ2RTciIHg9IjIiIHk9IjE0Ljc3Nzc3NzgiIHdpZHRoPSIzIiBoZWlnaHQ9IjIuMTExMTExMTEiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iI0QwRDZFNyIgeD0iNiIgeT0iMTQuNzc3Nzc3OCIgd2lkdGg9IjUiIGhlaWdodD0iMi4xMTExMTExMSIgcng9IjEiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjRDBENkU3IiB4PSIyIiB5PSIxMS42MTExMTExIiB3aWR0aD0iMTEiIGhlaWdodD0iMi4xMTExMTExMSIgcng9IjEuMDU1NTU1NTYiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbCIgZmlsbD0iI0QwRDZFOCIgY3g9IjIxLjUiIGN5PSIxNC4yNSIgcng9IjIuNSIgcnk9IjIuNjM4ODg4ODkiPjwvZWxsaXBzZT4KICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBpZD0iT3ZhbCIgZmlsbD0iIzc4ODk5OSIgY3g9IjE3LjUiIGN5PSIxNC4yNSIgcng9IjIuNSIgcnk9IjIuNjM4ODg4ODkiPjwvZWxsaXBzZT4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
                alt="Credit Card"
                style={{ width: '20px', height: '20px' }}
              />
              <Typography variant="body2">
                When different currencies are used in Booking.com and Hostaway, I will immediately adjust the markup to reflect this to avoid bookings at low rates.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <img 
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSI0NHB4IiB2aWV3Qm94PSIwIDAgNDcgNDQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA2My4xICgxMDEwMTApIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPjlDQTgzNEExLTIyNDAtNDlFOS1BRkQ1LUJDNDE2ODkzMDYwNzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8cmVjdCBpZD0icGF0aC0xIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTkiIGhlaWdodD0iMzQiIHJ4PSIxLjU2MDAwMDA2Ij48L3JlY3Q+CiAgICAgICAgPGZpbHRlciB4PSItNS4zJSIgeT0iLTIuOSUiIHdpZHRoPSIxMTUuOCUiIGhlaWdodD0iMTA1LjklIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJmaWx0ZXItMiI+CiAgICAgICAgICAgIDxmZU1vcnBob2xvZ3kgcmFkaXVzPSIwLjUiIG9wZXJhdG9yPSJkaWxhdGUiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dTcHJlYWRPdXRlcjEiPjwvZmVNb3JwaG9sb2d5PgogICAgICAgICAgICA8ZmVPZmZzZXQgZHg9IjEiIGR5PSIwIiBpbj0ic2hhZG93U3ByZWFkT3V0ZXIxIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSI+PC9mZU9mZnNldD4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIGluMj0iU291cmNlQWxwaGEiIG9wZXJhdG9yPSJvdXQiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlQ29tcG9zaXRlPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMC40NzA1ODgyMzUgICAwIDAgMCAwIDAuNTM3MjU0OTAyICAgMCAwIDAgMCAwLjYgIDAgMCAwIDEgMCIgdHlwZT0ibWF0cml4IiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlQ29sb3JNYXRyaXg+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTGVnYWwtc3RhdGVtZW50cy1zdmctaWNvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNDQuMDAwMDAwLCAtMTEwLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtOTgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0NS4wMDAwMDAsIDExMS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4LjAwMDAwMCwgMy4wMDAwMDApIiBmaWxsPSIjRjhGOUZDIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzc4ODk5OSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE2Ljc1MDMxNTEsMjEuNjcwNzM3IEMxNi45ODU2OTMxLDIwLjY3MTU1NjkgMTcuMDU0MzUxMiwxOS42OTA3NzQgMTYuOTU0OTQ2MiwxOC43NTQ3MzI2IEw3LjgyMzI2NjA0LDE4Ljc1NDczMjYgQzIuNjg4MDg1OTEsMTguNzU0NzMyNiAwLjM4MDI1MTkzNSwxNC43MzM3Mjg1IDAuMzAyMDQxMzczLDkuNjcwNTY4ODYgQzAuMjIyMzM4MjQzLDQuNTE3MzM3MzMgMi40NzMwMDY4NiwwLjMgNy42ODExNzM1NywwLjMgTDE5LjQ4NTU5NTIsMC4zIEMyNC42MzE2NzExLDAuMyAyNi45MzU5MjI5LDQuMzQyNDkxODcgMjYuOTk2MjIyNiw5LjQxNjU0MjU0IEMyNy4wNDE1OTY3LDEzLjIyNDU4MjUgMjYuNzMwMjIxNywxNi42MjQwNjExIDIzLjE2NTIyMywxOC4wNjU4MDAzIEMyMi4zOTc3NDQ2LDIwLjM1NzMzNTUgMjAuMjE0NTY1NCwyMS45OTA5OTI2IDE4LjUxMzkzMzQsMjIuOTU5NDEyOCBMMTYuNzYxOTU3MiwyMy45NTY5NzM4IEMxNi41MjA3NTgyLDI0LjA5NDQzNjUgMTYuMjI5NTU4MiwyMy44ODE2MTk2IDE2LjI5MjU0NDUsMjMuNjE0MDUzIEwxNi43NTAzMTUxLDIxLjY3MDczNyBaIiBpZD0iUGF0aCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTEyMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEuMDAwMDAwLCA4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUiPgogICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNmaWx0ZXItMikiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHN0cm9rZT0iIzc4ODk5OSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSIjRTdFQUYzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMS41NjAwMDAwNiwwIEwxNy40Mzk5OTk5LDAgQzE4LjMwMTU2NDIsLTMuODAzMTEzODllLTE2IDE5LDAuNjk4NDM1ODE4IDE5LDEuNTYwMDAwMDYgTDE5LDUgTDE5LDUgTDAsNSBMMCwxLjU2MDAwMDA2IEMtMy4yNzU1NTc5NGUtMTYsMC42OTg0MzU4MTggMC42OTg0MzU4MTgsLTYuMzc3NzgyMDllLTE3IDEuNTYwMDAwMDYsMCBaIiBpZD0iUmVjdGFuZ2xlIiBzdHJva2U9IiM3ODg5OTkiIGZpbGwtb3BhY2l0eT0iMC41IiBmaWxsPSIjNzg4OTk5Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEuNTYwMDAwMDYsMjggTDE3LjQzOTk5OTksMjggQzE4LjMwMTU2NDIsMjggMTksMjguNjk4NDM1OCAxOSwyOS41NjAwMDAxIEwxOSwzNCBMMTksMzQgTDAsMzQgTDAsMjkuNTYwMDAwMSBDLTEuMDU1MTExODllLTE2LDI4LjY5ODQzNTggMC42OTg0MzU4MTgsMjggMS41NjAwMDAwNiwyOCBaIiBpZD0iUmVjdGFuZ2xlIiBzdHJva2U9IiM3ODg5OTkiIGZpbGwtb3BhY2l0eT0iMC41IiBmaWxsPSIjNzg4OTk5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5LjUwMDAwMCwgMzEuMDAwMDAwKSBzY2FsZSgxLCAtMSkgdHJhbnNsYXRlKC05LjUwMDAwMCwgLTMxLjAwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iIzc4ODk5OSIgY3g9IjkiIGN5PSIzMSIgcj0iMSI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9IjYuOTY4NzUiIHkxPSIyLjUiIHgyPSIxMi4wMzEyNSIgeTI9IjIuNSIgaWQ9IkxpbmUtMzAiIHN0cm9rZT0iIzc4ODk5OSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNSwxNS43NzEyMjE4IEM0LjI4ODcyODU4LDE1LjA0NDcyNzMgMy44OTIxOTgyNiwxNC41NTg1MTU3IDMuNzYxMzA4OTMsMTMuMzEwNDk3NyBDMS4xMzQzMTUxOCwxMy4yNjMwNzY0IDAsOS41NDUxNjQxOCAwLDYuNzgxOTk5NTYgQzAsMy4wNDI0NTMwOSAyLjA0MzczNzcxLDcuMjgzMDYzMDRlLTEzIDUuNjIxMzY5MDksNy4yODMwNjMwNGUtMTMgTDEzLjg3ODYzMDksNy4yODMwNjMwNGUtMTMgQzE3LjQ1NjEzMTMsNy4yODMwNjMwNGUtMTMgMTkuNSwzLjA0MjQ1MzA5IDE5LjUsNi43ODE5OTk1NiBDMTkuNSwxMC41MjE1NDYgMTcuNDU2MjYyMywxMy41NjM4NjY0IDEzLjg3ODYzMDksMTMuNTYzODY2NCBMNy40NzU1MDU0MiwxMy41NjM4NjY0IEM3LjQyMDQ3MDk4LDE0LjEyMzUwNDggNy40NDI3NDY4MywxNC43MDYwOTY2IDcuNTQxNjc3NzcsMTUuMjk2NTE2MyBMNy44Mzg0NzA2MiwxNy4wNjg4MzcxIEM3Ljg3OTM1MzM0LDE3LjMxMjk2NTggNy42MTI5NjA0NywxNy40ODg3NjQ5IDcuNDA4OTM5OTYsMTcuMzUyMzcxMyBDNi4yNzcxNjA5MywxNi43ODI2MDEzIDUuNDc0MTgwOTUsMTYuMjU1NTUxNSA1LDE1Ljc3MTIyMTggWiIgaWQ9IlBhdGgiIHN0cm9rZT0iIzc4ODk5OSIgZmlsbD0iI0U3RUFGMyIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMTAyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2LjAwMDAwMCwgMjEuMDAwMDAwKSIgZmlsbD0iI0Y4RjlGQyIgc3Ryb2tlPSIjNzg4OTk5Ij4KICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiB4PSIxIiB5PSIwIiB3aWR0aD0iMTgiIGhlaWdodD0iMTIiIHJ4PSIwLjc4MDAwMDAzMSI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLjQxNTg5MjY0LDUgTDE3Ljg2NDYyOTIsNSBDMTguMjk1NDExNCw1IDE4LjY0NDYyOTMsNS4zNDkyMTc5MSAxOC42NDQ2MjkzLDUuNzgwMDAwMDMgQzE4LjY0NDYyOTMsNi4wNDQyNDg1MSAxOC41MTA4Mzk5LDYuMjkwNTI4MjMgMTguMjg5MTU5LDYuNDM0MzUwNDcgTDEwLjE1ODI0NSwxMS43MDk1Mjg4IEM5Ljg4ODMzMjY3LDExLjg4NDY0MjcgOS41Mzg1OTMxLDExLjg3NjA1OSA5LjI3NzU5NjI0LDExLjY4NzkxNDkgTDEuOTU5NzczNjMsNi40MTI3MzY1NSBDMS42MTAzMjI5LDYuMTYwODI4OTggMS41MzEyNDg1NSw1LjY3MzMzMTc1IDEuNzgzMTU2MTIsNS4zMjM4ODEwMiBDMS45Mjk3NjExNiw1LjEyMDUwNzg3IDIuMTY1MTg2MjgsNSAyLjQxNTg5MjY0LDUgWiIgaWQ9IlJlY3RhbmdsZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAuMjUwMDAwLCA4LjUwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMTAuMjUwMDAwLCAtOC41MDAwMDApICI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLjQxNTg5MjY0LDAgTDE3Ljg2NDYyOTIsMCBDMTguMjk1NDExNCwtNi40MDc0MDQ2M2UtMTUgMTguNjQ0NjI5MywwLjM0OTIxNzkwOSAxOC42NDQ2MjkzLDAuNzgwMDAwMDMxIEMxOC42NDQ2MjkzLDEuMDQ0MjQ4NTEgMTguNTEwODM5OSwxLjI5MDUyODIzIDE4LjI4OTE1OSwxLjQzNDM1MDQ3IEwxMC4xNTgyNDUsNi43MDk1Mjg4MyBDOS44ODgzMzI2Nyw2Ljg4NDY0MjcxIDkuNTM4NTkzMSw2Ljg3NjA1ODk4IDkuMjc3NTk2MjQsNi42ODc5MTQ5IEwxLjk1OTc3MzYzLDEuNDEyNzM2NTUgQzEuNjEwMzIyOSwxLjE2MDgyODk4IDEuNTMxMjQ4NTUsMC42NzMzMzE3NTMgMS43ODMxNTYxMiwwLjMyMzg4MTAyNCBDMS45Mjk3NjExNiwwLjEyMDUwNzg3MSAyLjE2NTE4NjI4LC0zLjk4MDM1MmUtMTYgMi40MTU4OTI2NCwwIFoiIGlkPSJSZWN0YW5nbGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
                alt="Message"
                style={{ width: '20px', height: '20px' }}
              />
              <Typography variant="body2">
                Booking.com will manually activate my guest messaging connection with the Hostaway software. This may take a couple of weeks. Until then I will have to manage the guest messaging from the Booking.com platform.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <img 
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDJweCIgaGVpZ2h0PSI0MXB4IiB2aWV3Qm94PSIwIDAgNDIgNDEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA2My4xICgxMDEwMTApIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPjE0OERBNjhCLUE0NUEtNDUyMy1BRjRCLTIwQTBENTNBODk2MzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8cmVjdCBpZD0icGF0aC0xIiB4PSIxNiIgeT0iMCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iMyI+PC9yZWN0PgogICAgICAgIDxmaWx0ZXIgeD0iLTQuMiUiIHk9Ii00LjIlIiB3aWR0aD0iMTEyLjUlIiBoZWlnaHQ9IjExMi41JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iZmlsdGVyLTIiPgogICAgICAgICAgICA8ZmVNb3JwaG9sb2d5IHJhZGl1cz0iMC41IiBvcGVyYXRvcj0iZGlsYXRlIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93U3ByZWFkT3V0ZXIxIj48L2ZlTW9ycGhvbG9neT4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PSIxIiBkeT0iMSIgaW49InNoYWRvd1NwcmVhZE91dGVyMSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVPZmZzZXQ+CiAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSI+PC9mZUNvbXBvc2l0ZT4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAuNzcyNTQ5MDIgICAwIDAgMCAwIDAuOCAgIDAgMCAwIDAgMC44NDMxMzcyNTUgIDAgMCAwIDEgMCIgdHlwZT0ibWF0cml4IiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlQ29sb3JNYXRyaXg+CiAgICAgICAgPC9maWx0ZXI+CiAgICAgICAgPGNpcmNsZSBpZD0icGF0aC0zIiBjeD0iMjgiIGN5PSIxMiIgcj0iNy4yIj48L2NpcmNsZT4KICAgICAgICA8ZmlsdGVyIHg9Ii02LjklIiB5PSItNi45JSIgd2lkdGg9IjExMy45JSIgaGVpZ2h0PSIxMTMuOSUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImZpbHRlci00Ij4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PSIxIiBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldElubmVyMSI+PC9mZU9mZnNldD4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dPZmZzZXRJbm5lcjEiIGluMj0iU291cmNlQWxwaGEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiBrMj0iLTEiIGszPSIxIiByZXN1bHQ9InNoYWRvd0lubmVySW5uZXIxIj48L2ZlQ29tcG9zaXRlPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMC43NzI1NDkwMiAgIDAgMCAwIDAgMC44ICAgMCAwIDAgMCAwLjg0MzEzNzI1NSAgMCAwIDAgMSAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dJbm5lcklubmVyMSI+PC9mZUNvbG9yTWF0cml4PgogICAgICAgIDwvZmlsdGVyPgogICAgICAgIDxwYXRoIGQ9Ik0yNC43MDg2MzUsMjAuNDU3MjA5OSBMMTYuNDU3MjExMSwyOC43MDg1NzA4IEMxNS44NDc1OTY1LDI5LjMxODE4NTQgMTUuODQ3NTk2NSwzMC4zMDY1MzY5IDE2LjQ1NzIwOTcsMzAuOTE2MTUgTDE2LjU3NTc1MTQsMzEuMDIzMjk2NyBDMTcuMDY2MTkyMSwzMS40MjMzMTY4IDE3Ljc0MzA0MzcsMzEuNDgwNTM2OCAxOC4yODY4MDUzLDMxLjE5NDk2MzMgTDE4LjMwMTk5OTgsMzEuMTg1MDY4NyBMMjMuNjM5Nzg4NSwzNS4yOTc5NzU1IEwyMy43ODE4NDI4LDM1LjQxMjA1NzMgQzI0LjU1NjA5NjYsMzUuOTg5NTU3NCAyNS41ODc0NTUsMzYuMDcyMjY3MyAyNi40NDQ2NTc0LDM1LjY2OTIwNjUgTDI2LjQ5NDk5OTgsMzUuNjQzMDY4NyBMMjkuOTc5ODMzOCwzOC4zNTQyNTE1IEwzMS4wNjM5OTk4LDM3LjI3MDA2ODcgTDMyLjU2MzUzNTcsMzguNzcwNzkxMSBMMzQuNzcxMTgwNCwzNi41NjM5ODA3IEwzMy4yNzA5OTk4LDM1LjA2MzA2ODcgTDM0LjM1NDcyNjQsMzMuOTc5NDM5NCBMMzEuNjQxOTk5OCwzMC40OTAwNjg3IEwzMS42ODc2NDcsMzAuMzk2ODM2MyBDMzIuMDkzMzc4NCwyOS40ODU1OTA0IDMxLjk1Njg5MTQsMjguNDAyNDI2NSAzMS4yODA3OTI3LDI3LjYxODUxNTggTDI3LjE4Njk5OTgsMjIuMzAwMDY4NyBMMjcuMTk0Nzk2MywyMi4yODY4ODkyIEMyNy41MDQzMzM1LDIxLjY5NzgzODYgMjcuNDExNDcyNCwyMC45NTI0Njk0IDI2LjkxNjIxMjksMjAuNDU3MjA5OSBDMjYuMzA2NTk5NywxOS44NDc1OTY3IDI1LjMxODI0ODIsMTkuODQ3NTk2NyAyNC43MDg2MzUsMjAuNDU3MjA5OSBaIiBpZD0icGF0aC01Ij48L3BhdGg+CiAgICAgICAgPGZpbHRlciB4PSItMi43JSIgeT0iLTIuNyUiIHdpZHRoPSIxMDUuMyUiIGhlaWdodD0iMTEwLjclIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJmaWx0ZXItNiI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeD0iMCIgZHk9IjEiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVPZmZzZXQ+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjc3MjU0OTAyICAgMCAwIDAgMCAwLjggICAwIDAgMCAwIDAuODQzMTM3MjU1ICAwIDAgMCAxIDAiIHR5cGU9Im1hdHJpeCIgaW49InNoYWRvd09mZnNldE91dGVyMSI+PC9mZUNvbG9yTWF0cml4PgogICAgICAgIDwvZmlsdGVyPgogICAgICAgIDxwYXRoIGQ9Ik04LjcwODYzNTAzLDQuNDU3MjA5ODcgTDAuNDU3MjExMDUzLDEyLjcwODU3MDggQy0wLjE1MjQwMzQ1OSwxMy4zMTgxODU0IC0wLjE1MjQwMzQ1OSwxNC4zMDY1MzY5IDAuNDU3MjA5NzAzLDE0LjkxNjE1IEwwLjU3NTc1MTQxNCwxNS4wMjMyOTY3IEMxLjA2NjE5MjA5LDE1LjQyMzMxNjggMS43NDMwNDM2OCwxNS40ODA1MzY4IDIuMjg2ODA1MzIsMTUuMTk0OTYzMyBMMi4zMDE5OTk4MywxNS4xODUwNjg3IEw3LjYzOTc4ODUsMTkuMjk3OTc1NSBMNy43ODE4NDI4NSwxOS40MTIwNTczIEM4LjU1NjA5NjYzLDE5Ljk4OTU1NzQgOS41ODc0NTUwMSwyMC4wNzIyNjczIDEwLjQ0NDY1NzQsMTkuNjY5MjA2NSBMMTAuNDk0OTk5OCwxOS42NDMwNjg3IEwxMy45Nzk4MzM4LDIyLjM1NDI1MTUgTDE1LjA2Mzk5OTgsMjEuMjcwMDY4NyBMMTYuNTYzNTM1NywyMi43NzA3OTExIEwxOC43NzExODA0LDIwLjU2Mzk4MDcgTDE3LjI3MDk5OTgsMTkuMDYzMDY4NyBMMTguMzU0NzI2NCwxNy45Nzk0Mzk0IEwxNS42NDE5OTk4LDE0LjQ5MDA2ODcgTDE1LjY4NzY0NywxNC4zOTY4MzYzIEMxNi4wOTMzNzg0LDEzLjQ4NTU5MDQgMTUuOTU2ODkxNCwxMi40MDI0MjY1IDE1LjI4MDc5MjcsMTEuNjE4NTE1OCBMMTEuMTg2OTk5OCw2LjMwMDA2ODY3IEwxMS4xOTQ3OTYzLDYuMjg2ODg5MTkgQzExLjUwNDMzMzUsNS42OTc4Mzg1NiAxMS40MTE0NzI0LDQuOTUyNDY5MzggMTAuOTE2MjEyOSw0LjQ1NzIwOTg3IEMxMC4zMDY1OTk3LDMuODQ3NTk2NzEgOS4zMTgyNDgxOSwzLjg0NzU5NjcxIDguNzA4NjM1MDMsNC40NTcyMDk4NyBaIiBpZD0icGF0aC03Ij48L3BhdGg+CiAgICAgICAgPGZpbHRlciB4PSItMi43JSIgeT0iLTguMCUiIHdpZHRoPSIxMDUuMyUiIGhlaWdodD0iMTEwLjclIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJmaWx0ZXItOCI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeD0iMCIgZHk9Ii0xIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlT2Zmc2V0PgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMC43NzI1NDkwMiAgIDAgMCAwIDAgMC44ICAgMCAwIDAgMCAwLjg0MzEzNzI1NSAgMCAwIDAgMSAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVDb2xvck1hdHJpeD4KICAgICAgICA8L2ZpbHRlcj4KICAgICAgICA8cGF0aCBkPSJNMTUuNzAwNjU3MiwxNi42MDA0NzExIEwxNy4yMDExMjgyLDE1LjEgTDIwLjk1MTcwNzQsMTguODUwNTc5MSBDMjEuMzY2MDU4NCwxOS4yNjQ5MzAyIDIxLjM2NjA1ODQsMTkuOTM2Njk5MiAyMC45NTE3MDc0LDIwLjM1MTA1MDIgQzIwLjUzNzM1NjQsMjAuNzY1NDAxMiAxOS44NjU1ODczLDIwLjc2NTQwMTIgMTkuNDUxMjM2MywyMC4zNTEwNTAyIEwxNS43MDA2NTcyLDE2LjYwMDQ3MTEgWiIgaWQ9InBhdGgtOSI+PC9wYXRoPgogICAgICAgIDxmaWx0ZXIgeD0iLTIxLjclIiB5PSItMjEuNyUiIHdpZHRoPSIxMzkuNyUiIGhlaWdodD0iMTU3LjclIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJmaWx0ZXItMTAiPgogICAgICAgICAgICA8ZmVNb3JwaG9sb2d5IHJhZGl1cz0iMC41IiBvcGVyYXRvcj0iZGlsYXRlIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93U3ByZWFkT3V0ZXIxIj48L2ZlTW9ycGhvbG9neT4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PSIwIiBkeT0iMSIgaW49InNoYWRvd1NwcmVhZE91dGVyMSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVPZmZzZXQ+CiAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSI+PC9mZUNvbXBvc2l0ZT4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAuNzcyNTQ5MDIgICAwIDAgMCAwIDAuOCAgIDAgMCAwIDAgMC44NDMxMzcyNTUgIDAgMCAwIDEgMCIgdHlwZT0ibWF0cml4IiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlQ29sb3JNYXRyaXg+CiAgICAgICAgPC9maWx0ZXI+CiAgICAgICAgPHBhdGggZD0iTTExLjIsMjEuMTAxMTI4MiBMMTIuNjk5OTA0MSwxOS42MDEyMjQyIEwxNi40NTEwNTAyLDIzLjM1MTgwMzMgQzE2Ljg2NTQwMTIsMjMuNzY1NTg3MyAxNi44NjU0MDEyLDI0LjQzNzM1NjQgMTYuNDUxMDUwMiwyNC44NTE3MDc0IEMxNi4wMzY2OTkyLDI1LjI2NjA1ODQgMTUuMzY0OTMwMiwyNS4yNjYwNTg0IDE0Ljk1MDU3OTEsMjQuODUxNzA3NCBMMTEuMiwyMS4xMDExMjgyIFoiIGlkPSJwYXRoLTExIj48L3BhdGg+CiAgICAgICAgPGZpbHRlciB4PSItMjEuNyUiIHk9Ii0yMS43JSIgd2lkdGg9IjEzOS43JSIgaGVpZ2h0PSIxNTcuNyUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImZpbHRlci0xMiI+CiAgICAgICAgICAgIDxmZU1vcnBob2xvZ3kgcmFkaXVzPSIwLjUiIG9wZXJhdG9yPSJkaWxhdGUiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dTcHJlYWRPdXRlcjEiPjwvZmVNb3JwaG9sb2d5PgogICAgICAgICAgICA8ZmVPZmZzZXQgZHg9IjAiIGR5PSIxIiBpbj0ic2hhZG93U3ByZWFkT3V0ZXIxIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSI+PC9mZU9mZnNldD4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIGluMj0iU291cmNlQWxwaGEiIG9wZXJhdG9yPSJvdXQiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlQ29tcG9zaXRlPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMC43NzI1NDkwMiAgIDAgMCAwIDAgMC44ICAgMCAwIDAgMCAwLjg0MzEzNzI1NSAgMCAwIDAgMSAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVDb2xvck1hdHJpeD4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJMZWdhbC1zdGF0ZW1lbnRzLXN2Zy1pY29ucyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMC4wMDAwMDAsIC0xODEuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMzgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIzMi4wMDAwMDAsIDIwMS41MDAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTIzMi4wMDAwMDAsIC0yMDEuNTAwMDAwKSB0cmFuc2xhdGUoMjEyLjAwMDAwMCwgMTgyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTEzMyI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTEzNCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUtQ29weS0yMCI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNmaWx0ZXItMikiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBzdHJva2U9IiM3ODg5OTkiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iT3ZhbCI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9IiNFN0VBRjMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgeGxpbms6aHJlZj0iI3BhdGgtMyI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNmaWx0ZXItNCkiIHhsaW5rOmhyZWY9IiNwYXRoLTMiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBzdHJva2U9IiM3ODg5OTkiIHN0cm9rZS13aWR0aD0iMSIgeGxpbms6aHJlZj0iI3BhdGgtMyI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9IjI1LjYiIHkxPSI5LjYiIHgyPSIyNS42IiB5Mj0iMTQuNCIgaWQ9IkxpbmUtMjciIHN0cm9rZT0iIzc4ODk5OSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPSIzMC40IiB5MT0iOS42IiB4Mj0iMzAuNCIgeTI9IjE0LjQiIGlkPSJMaW5lLTI3IiBzdHJva2U9IiM3ODg5OTkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iQ29tYmluZWQtU2hhcGUiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIxIiBmaWx0ZXI9InVybCgjZmlsdGVyLTYpIiB4bGluazpocmVmPSIjcGF0aC01Ij48L3VzZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiB4bGluazpocmVmPSIjcGF0aC01Ij48L3VzZT4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aCIgc3Ryb2tlPSIjNzg4OTk5IiBmaWxsPSIjQzVDQ0Q3IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHBvaW50cz0iMzMuNjg5MDMwOSAzMy45MzgwMTA4IDI5LjkzODM4ODggMzcuNjg4NTg5OSAyNi41NjI2NTk2IDM1LjA2MzA2NDggMzEuMDYzNDQyOCAzMC41NjI3ODU2Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBzdHJva2U9IiM3ODg5OTkiIGZpbGw9IiNFN0VBRjMiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSIzNC4wNjQwMDY5IDM2LjU2MzkxMzkgMzIuNTYzNTM1OSAzOC4wNjM4MTc5IDMxLjA2MzA2NDggMzYuNTYzOTEzOSAzMi41NjM1MzU5IDM1LjA2MzQ0MjgiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI2LjU2MjY1OTYsMjIuMzExMTcxMyBMMTguMzExMjM0MywzMC41NjI1OTY2IEMxNy44OTY4ODMzLDMwLjk3Njk0NzcgMTcuMjI1MTE0MywzMC45NzY5NDc3IDE2LjgxMDc2MzMsMzAuNTYyNTk2NiBDMTYuMzk2NDEyMiwzMC4xNDgyNDU2IDE2LjM5NjQxMjIsMjkuNDc2NDc2NiAxNi44MTA3NjMzLDI5LjA2MjEyNTYgTDI1LjA2MjE4ODYsMjAuODEwNzYzMyBDMjUuNDc2NTM5NiwyMC4zOTY0MTIyIDI2LjE0ODMwODYsMjAuMzk2NDEyMiAyNi41NjI2NTk2LDIwLjgxMDc2MzMgQzI2Ljk3Njk0NzcsMjEuMjI1MDUxMyAyNi45NzY5NDc3LDIxLjg5Njg4MzMgMjYuNTYyNjU5NiwyMi4zMTExNzEzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjNzg4OTk5IiBmaWxsPSIjRTdFQUYzIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTMwLjc5NTM3NzgsMzAuODMwMzQ2NyBMMjYuODMwNjYxNywzNC43OTU2Mjk4IEMyNi4wNDQ4NjI2LDM1LjU4MDkyNDggMjQuNzg2MzExNiwzNS42Mjc2MDc5IDIzLjk0NDg4MzUsMzQuOTAxODQ3OCBMMTguMzExMjM0MywzMC41NjI4NDg2IEwyNi41NjI1OTY2LDIyLjMxMTQyMzMgTDMwLjkwMjE2MjgsMjcuOTQ1MDcyNSBDMzEuNjI3OTIyOSwyOC43ODY1NjM2IDMxLjU4MTE3NjgsMzAuMDQ1MDUxNiAzMC43OTUzNzc4LDMwLjgzMDM0NjciIGlkPSJQYXRoIiBzdHJva2U9IiM3ODg5OTkiIGZpbGw9IiNDNUNDRDciIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iQ29tYmluZWQtU2hhcGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkuMzg1NTkwLCAxMy4zODUzOTYpIHNjYWxlKC0xLCAtMSkgdHJhbnNsYXRlKC05LjM4NTU5MCwgLTEzLjM4NTM5NikgIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMSIgZmlsdGVyPSJ1cmwoI2ZpbHRlci04KSIgeGxpbms6aHJlZj0iI3BhdGgtNyI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgeGxpbms6aHJlZj0iI3BhdGgtNyI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHN0cm9rZT0iIzc4ODk5OSIgZmlsbD0iI0M1Q0NENyIgZmlsbC1ydWxlPSJub256ZXJvIiBwb2ludHM9IjEuMDc0OTc2MDEgOC44MjU4MDcxNiA0LjgyNTYxODE2IDUuMDc1MjI4MDEgOC4yMDEzNDczIDcuNzAwNzUzMTIgMy43MDA1MDExMiAxMi4yMDEwMzIzIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik04LjIwMTM0NzMsMjAuNDUyNTgzNiBMMTYuNDUyNzcyNiwxMi4yMDExNTgzIEMxNi44NjcxMjM2LDExLjc4NjgwNzMgMTcuNTM4ODkyNywxMS43ODY4MDczIDE3Ljk1MzI0MzcsMTIuMjAxMTU4MyBDMTguMzY3NTk0NywxMi42MTU1MDkzIDE4LjM2NzU5NDcsMTMuMjg3Mjc4MyAxNy45NTMyNDM3LDEzLjcwMTYyOTQgTDkuNzAxODE4MzYsMjEuOTUzMDU0NyBDOS4yODc0NjczNCwyMi4zNjc0MDU3IDguNjE1Njk4MzEsMjIuMzY3NDA1NyA4LjIwMTM0NzMsMjEuOTUzMDU0NyBDNy43ODcwNTkyOCwyMS41Mzg3MDM3IDcuNzg3MDU5MjgsMjAuODY2ODcxNiA4LjIwMTM0NzMsMjAuNDUyNTgzNiIgaWQ9IlBhdGgiIHN0cm9rZT0iIzc4ODk5OSIgZmlsbD0iI0U3RUFGMyIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjk2ODYyOTEzLDExLjkzMzQ3MTMgTDcuOTMzMzQ1MjksNy45NjgxODgxMyBDOC43MTkxNDQzMiw3LjE4Mjg5MzEgOS45Nzc2OTUzNyw3LjEzNjIxMDEgMTAuODE5MTIzNCw3Ljg2MTk3MDEzIEwxNi40NTI3NzI2LDEyLjIwMDk2OTMgTDguMjAxNDEwMywyMC40NTIzOTQ2IEwzLjg2MTg0NDEzLDE0LjgxODc0NTQgQzMuMTM2MDg0MSwxMy45NzcyNTQ0IDMuMTgyODMwMSwxMi43MTg3NjYzIDMuOTY4NjI5MTMsMTEuOTMzNDcxMyIgaWQ9IlBhdGgiIHN0cm9rZT0iIzc4ODk5OSIgZmlsbD0iI0M1Q0NENyIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJQYXRoIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMSIgZmlsdGVyPSJ1cmwoI2ZpbHRlci0xMCkiIHhsaW5rOmhyZWY9IiNwYXRoLTkiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBzdHJva2U9IiM3ODg5OTkiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiB4bGluazpocmVmPSIjcGF0aC05Ij48L3VzZT4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iUGF0aCI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNmaWx0ZXItMTIpIiB4bGluazpocmVmPSIjcGF0aC0xMSI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHN0cm9rZT0iIzc4ODk5OSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHhsaW5rOmhyZWY9IiNwYXRoLTExIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMjAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCA0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjAwMDAwMCwgMTYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNTAwMDAwLCAwLjUwMDAwMCkiPjwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTExOCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNzAwMDAwLCAwLjcwMDAwMCkiIGZpbGw9IiNFN0VBRjMiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjNzg4OTk5Ij4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBwb2ludHM9IjYuNzIzNTEwNjRlLTEzIDEuNDk5OTA0MDYgMS41MDA0NzEwNiAtMy42MzkzMTEwN2UtMTMgMy4wMDA5NDIxMiAxLjQ5OTkwNDA2IDEuNTAwNDcxMDYgMy4wMDAzNzUxMiI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExLjIwMDAwMCwgMTEuMTAwMDAwKSI+PC9nPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
                alt="Settings"
                style={{ width: '20px', height: '20px' }}
              />
              <Typography variant="body2">
                When I change my room mapping in Booking.com after connection, I will remap my listing in Hostaway.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <img 
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSIzNHB4IiB2aWV3Qm94PSIwIDAgNDAgMzQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA2My4xICgxMDEwMTApIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPkI0MkNGNEQyLTM5RDgtNDYzNy05NDI5LTlDQzMzNEVERDdFRjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTGVnYWwtc3RhdGVtZW50cy1zdmctaWNvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTIuMDAwMDAwLCAtMjQ5LjAwMDAwMCkiIHN0cm9rZT0iIzc4ODk5OSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMjYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxMy4wMDAwMDAsIDI1MC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMDEiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLDE5IEwxNiwxOSBMMTYsMzEgQzE2LDMxLjU1MjI4NDcgMTUuNTUyMjg0NywzMiAxNSwzMiBMMiwzMiBDMS40NDc3MTUyNSwzMiAxLDMxLjU1MjI4NDcgMSwzMSBMMSwxOSBMMSwxOSBaIiBpZD0iUmVjdGFuZ2xlLUNvcHktNzMiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMSwyOC42MjUgTDEwLDI4LjYyNSBMMTAsMzIgTDIsMzIgQzEuNDQ3NzE1MjUsMzIgMSwzMS41NTIyODQ3IDEsMzEgTDEsMjguNjI1IEwxLDI4LjYyNSBaIiBpZD0iUmVjdGFuZ2xlLUNvcHktNzQiIGZpbGw9IiNDNUNDRDciPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIsMjIgTDE2LDIyIEwxNiwyMiBMMTYsMzEgQzE2LDMxLjU1MjI4NDcgMTUuNTUyMjg0NywzMiAxNSwzMiBMMTAsMzIgTDEwLDMyIEwxMCwyNCBDMTAsMjIuODk1NDMwNSAxMC44OTU0MzA1LDIyIDEyLDIyIFoiIGlkPSJSZWN0YW5nbGUtQ29weS03NSIgZmlsbD0iI0M1Q0NENyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtQ29weS03NiIgZmlsbD0iI0U3RUFGMyIgeD0iNCIgeT0iMjIiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIHJ4PSIwLjU2MjUiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICA8bGluZSB4MT0iMTMuNSIgeTE9IjI2LjQ2ODc1IiB4Mj0iMTMuNSIgeTI9IjI3LjQwNjI1IiBpZD0iTGluZS0xMS1Db3B5LTMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtQ29weS00MCIgZmlsbD0iI0ZGRkZGRiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOC41MDAwMDAsIDEyLjUwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtOC41MDAwMDAsIC0xMi41MDAwMDApICIgeD0iMSIgeT0iNiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjEzIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEuMjk4Mjc0OTksMC40MDU3MTA5MzUgTDE1LjU0NDU1MzUsNC44NTc2NzI5NiBDMTUuODE1NTEwOSw0Ljk0MjM0NzE3IDE2LDUuMTkzMjg3NTEgMTYsNS40NzcxNjcxOCBMMTYsNS41IEMxNiw1Ljc3NjE0MjM3IDE1Ljc3NjE0MjQsNiAxNS41LDYgTDAsNiBMMCw2IEwwLDEuMzYwMTkwOTEgQy02Ljc2MzUzNzUxZS0xNywwLjgwNzkwNjE2NCAwLjQ0NzcxNTI1LDAuMzYwMTkwOTEzIDEsMC4zNjAxOTA5MTMgQzEuMTAxMTU1MDMsMC4zNjAxOTA5MTMgMS4yMDE3MjQ1NCwwLjM3NTUzODkyIDEuMjk4Mjc0OTksMC40MDU3MTA5MzUgWiIgaWQ9IlJlY3RhbmdsZS1Db3B5LTQ2IiBmaWxsPSIjNzg4OTk5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgMy4wMDAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTguMDAwMDAwLCAtMy4wMDAwMDApICI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMi41LDguMzk3NTM2ODYgTDguNSw5LjE0NzUzNjg2IEw4LjUsMTYuNSBMMTIuNSwxNi41IEwxMi41LDguMzk3NTM2ODYgWiIgaWQ9IlJlY3RhbmdsZS1Db3B5LTQ5IiBmaWxsPSIjRTdFQUYzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC41MDAwMDAsIDEyLjUwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMTAuNTAwMDAwLCAtMTIuNTAwMDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOC41LDguMzk3NTM2ODYgTDQuNSw5LjE0NzUzNjg2IEw0LjUsMTYuNSBMOC41LDE2LjUgTDguNSw4LjM5NzUzNjg2IFoiIGlkPSJSZWN0YW5nbGUtQ29weS00OSIgZmlsbD0iI0U3RUFGMyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDE1IEwxNS40Mzc1LDE1IEMxNS43NDgxNjAyLDE1IDE2LDE1LjI1MTgzOTggMTYsMTUuNTYyNSBMMTYsMTguNDM3NSBDMTYsMTguNzQ4MTYwMiAxNS43NDgxNjAyLDE5IDE1LjQzNzUsMTkgTDAsMTkgTDAsMTkgTDAsMTUgWiIgaWQ9IlJlY3RhbmdsZS1Db3B5LTU3IiBmaWxsPSIjQzVDQ0Q3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgMTcuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC04LjAwMDAwMCwgLTE3LjAwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtOTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyLjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMCwxOSBMMTUsMTkgTDE1LDMxIEMxNSwzMS41NTIyODQ3IDE0LjU1MjI4NDcsMzIgMTQsMzIgTDEsMzIgQzAuNDQ3NzE1MjUsMzIgNi43NjM1Mzc1MWUtMTcsMzEuNTUyMjg0NyAwLDMxIEwwLDE5IEwwLDE5IFoiIGlkPSJSZWN0YW5nbGUtQ29weS03MyIgZmlsbD0iI0ZGRkZGRiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy41MDAwMDAsIDI1LjUwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtNy41MDAwMDAsIC0yNS41MDAwMDApICI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LDI4LjYyNSBMMTUsMjguNjI1IEwxNSwzMiBMNywzMiBDNi40NDc3MTUyNSwzMiA2LDMxLjU1MjI4NDcgNiwzMSBMNiwyOC42MjUgTDYsMjguNjI1IFoiIGlkPSJSZWN0YW5nbGUtQ29weS03NCIgZmlsbD0iI0M1Q0NENyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAuNTAwMDAwLCAzMC4zMTI1MDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTEwLjUwMDAwMCwgLTMwLjMxMjUwMCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTIsMjIgTDYsMjIgTDYsMjIgTDYsMzEgQzYsMzEuNTUyMjg0NyA1LjU1MjI4NDc1LDMyIDUsMzIgTDAsMzIgTDAsMzIgTDAsMjQgQy0xLjM1MjcwNzVlLTE2LDIyLjg5NTQzMDUgMC44OTU0MzA1LDIyIDIsMjIgWiIgaWQ9IlJlY3RhbmdsZS1Db3B5LTc1IiBmaWxsPSIjQzVDQ0Q3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjAwMDAwMCwgMjcuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0zLjAwMDAwMCwgLTI3LjAwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS1Db3B5LTc2IiBmaWxsPSIjRTdFQUYzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC41MDAwMDAsIDIzLjUwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMTAuNTAwMDAwLCAtMjMuNTAwMDAwKSAiIHg9IjkiIHk9IjIyIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiByeD0iMC41NjI1Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9IjIuNSIgeTE9IjI2LjQ2ODc1IiB4Mj0iMi41IiB5Mj0iMjcuNDA2MjUiIGlkPSJMaW5lLTExLUNvcHktMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyLjUwMDAwMCwgMjYuOTM3NTAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0yLjUwMDAwMCwgLTI2LjkzNzUwMCkgIj48L2xpbmU+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS1Db3B5LTQwIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSI2IiB3aWR0aD0iMTUiIGhlaWdodD0iMTMiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMS4yOTgyNzQ5OSwwLjQwNTcxMDkzNSBMMTUuNTQ0NTUzNSw0Ljg1NzY3Mjk2IEMxNS44MTU1MTA5LDQuOTQyMzQ3MTcgMTYsNS4xOTMyODc1MSAxNiw1LjQ3NzE2NzE4IEwxNiw1LjUgQzE2LDUuNzc2MTQyMzcgMTUuNzc2MTQyNCw2IDE1LjUsNiBMMCw2IEwwLDYgTDAsMS4zNjAxOTA5MSBDLTYuNzYzNTM3NTFlLTE3LDAuODA3OTA2MTY0IDAuNDQ3NzE1MjUsMC4zNjAxOTA5MTMgMSwwLjM2MDE5MDkxMyBDMS4xMDExNTUwMywwLjM2MDE5MDkxMyAxLjIwMTcyNDU0LDAuMzc1NTM4OTIgMS4yOTgyNzQ5OSwwLjQwNTcxMDkzNSBaIiBpZD0iUmVjdGFuZ2xlLUNvcHktNDYiIGZpbGw9IiM3ODg5OTkiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNy41LDguMzk3NTM2ODYgTDMuNSw5LjE0NzUzNjg2IEwzLjUsMTYuNSBMNy41LDE2LjUgTDcuNSw4LjM5NzUzNjg2IFoiIGlkPSJSZWN0YW5nbGUtQ29weS00OSIgZmlsbD0iI0U3RUFGMyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS41LDguMzk3NTM2ODYgTDcuNSw5LjE0NzUzNjg2IEw3LjUsMTYuNSBMMTEuNSwxNi41IEwxMS41LDguMzk3NTM2ODYgWiIgaWQ9IlJlY3RhbmdsZS1Db3B5LTQ5IiBmaWxsPSIjRTdFQUYzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5LjUwMDAwMCwgMTIuNTAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC05LjUwMDAwMCwgLTEyLjUwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsMTUgTDE1LjQzNzUsMTUgQzE1Ljc0ODE2MDIsMTUgMTYsMTUuMjUxODM5OCAxNiwxNS41NjI1IEwxNiwxOC40Mzc1IEMxNiwxOC43NDgxNjAyIDE1Ljc0ODE2MDIsMTkgMTUuNDM3NSwxOSBMMCwxOSBMMCwxOSBMMCwxNSBaIiBpZD0iUmVjdGFuZ2xlLUNvcHktNTciIGZpbGw9IiNDNUNDRDciPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
                alt="Calendar"
                style={{ width: '20px', height: '20px' }}
              />
              <Typography variant="body2">
                I am not using multi-room availability in my listings on Booking.com. My inventory has to consist of 1 room available per day per room type.
              </Typography>
            </Box>
          </Box>
          
          <FormControlLabel
            control={
              <Checkbox 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                sx={{
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                I agree to Hostaway{' '}
                <Typography component="span" sx={{ color: 'primary.main', textDecoration: 'underline', cursor: 'pointer', fontWeight: 500 }}>
                  terms & conditions
                </Typography>
              </Typography>
            }
            sx={{ mt: 3, mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2, justifyContent: 'center' }}>
          <Button 
            onClick={() => setTermsModalOpen(false)}
            sx={{ 
              textTransform: 'none', 
              color: '#666',
              bgcolor: '#E0E0E0',
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#D0D0D0',
              }
            }}
          >
            Close
          </Button>
          <Button 
            variant="contained"
            disabled={!agreedToTerms}
            onClick={() => {
              setTermsModalOpen(false);
              setLegalEntityModalOpen(true);
            }}
            sx={{ 
              textTransform: 'none', 
              bgcolor: agreedToTerms ? 'primary.main' : '#E0E0E0',
              color: agreedToTerms ? 'white' : '#999',
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: agreedToTerms ? 'primary.dark' : '#E0E0E0',
              }
            }}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>

      {/* Support Contact Modal */}
      <Dialog
        open={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        maxWidth="xl"
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            bgcolor: 'white',
            width: '50vw',
            maxWidth: 'none',
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center' }}>
            Please, contact support for export
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 2, py: 2 }}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Message
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              placeholder="Please describe your request..."
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Or enter Legal Entity ID below
              </Typography>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <Info size={16} />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              label="Legal Entity ID"
              value={legalEntityId}
              onChange={(e) => setLegalEntityId(e.target.value)}
              placeholder="Enter your Legal Entity ID"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  minHeight: 56,
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1rem',
                },
                '& .MuiOutlinedInput-input': {
                  fontSize: '1rem',
                  padding: '16px 14px',
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="outlined"
            onClick={() => setSupportModalOpen(false)}
            sx={{ 
              textTransform: 'none', 
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                bgcolor: 'grey.50',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={() => setSupportModalOpen(false)}
            sx={{ 
              textTransform: 'none', 
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Legal Entity Modal */}
      <Dialog
        open={legalEntityModalOpen}
        onClose={() => setLegalEntityModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            bgcolor: '#F8F9FA',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'start', mb: 2, color: '#333' }}>
          Please add your Booking.com Property ID and then map its rooms to your Hostaway listings


          </Typography>
         
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 2 }}>
         
          
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Property ID"
              value={legalEntityId}
              onChange={(e) => setLegalEntityId(e.target.value)}
              placeholder="Enter your Property ID"
              sx={{ mb: 3 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 4, gap: 2, justifyContent: 'end' }}>
          <Button 
            onClick={() => setLegalEntityModalOpen(false)}
            sx={{ 
              textTransform: 'none', 
              color: '#666',
              bgcolor: '#E0E0E0',
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#D0D0D0',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={() => setLegalEntityModalOpen(false)}
            sx={{ 
              textTransform: 'none', 
              bgcolor: 'primary.main',
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Add Property
          </Button>
        </DialogActions>
      </Dialog>

      {/* Property ID Modal */}
      <Dialog
        open={propertyIdModalOpen}
        onClose={() => setPropertyIdModalOpen(false)}
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            bgcolor: 'white',
            p: 3,
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center', mb: 3, color: '#333' }}>
          Please add your Booking.com Property ID and then map its rooms to your Hostaway listings
        </Typography>
        
        <TextField
          fullWidth
          label="Property ID"
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
          placeholder="Enter your Booking.com Property ID"
          sx={{ mb: 3 }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleConnectProperty}
            sx={{
              textTransform: 'none',
              bgcolor: 'primary.main',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Connect
          </Button>
        </Box>
      </Dialog>

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
        {selectedListing && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Property Settings
              </Typography>
              <IconButton onClick={() => setSettingsOpen(false)}>
                <XCircle size={20} />
              </IconButton>
            </Box>

            {/* Property Information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Property Information
              </Typography>
              <TextField
                fullWidth
                label="Property Name"
                value={selectedListing.name}
                sx={{ mb: 2 }}
                onChange={(e) => {
                  setSelectedListing({ ...selectedListing, name: e.target.value });
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Property ID: {selectedListing.hostawayId}
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
                <Select value="12" label="Number of months">
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
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                All Channel Settings
              </Typography>
              
              {/* Booking.com */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: '#003580',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    color: 'white',
                    fontWeight: 'bold',
                    overflow: 'hidden',
                  }}
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/Booking.com_logo.svg"
                    alt="Booking.com"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Booking.com
                </Typography>
              </Box>
              
              <FormControlLabel
                control={<Switch checked color="success" />}
                label="Is listed in Booking.com?"
                sx={{ mb: 2 }}
              />
              
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
                value="1"
                sx={{ mb: 2 }}
              />
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  textTransform: 'none', 
                  bgcolor: 'primary.main', 
                  mb: 3,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }}
              >
                Save
              </Button>

              {/* Airbnb */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: '#FF5A5F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    color: 'white',
                    fontWeight: 'bold',
                    overflow: 'hidden',
                  }}
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
                    alt="Airbnb"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Airbnb
                </Typography>
              </Box>
              
              <FormControlLabel
                control={<Switch checked color="success" />}
                label="Is listed in Airbnb?"
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Markup"
                value="0%"
                sx={{ mb: 2 }}
              />
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  textTransform: 'none', 
                  bgcolor: 'primary.main', 
                  mb: 3,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }}
              >
                Save
              </Button>

              {/* Other channels... */}
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Additional channels can be configured here...
              </Typography>
            </Box>

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
    </DashboardContent>
  );
}
