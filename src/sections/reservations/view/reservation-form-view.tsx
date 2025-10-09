import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  User,
  Edit,
  Save,
  X,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Upload,
  FileText,
  CreditCard,
  Calculator,
  ShoppingCart,
  Key,
  Paperclip,
  Clipboard,
  RefreshCw,
  Star,
  ChevronDown,
} from 'lucide-react';

import {
  Box,
  Chip,
  Alert,
  Table,
  Avatar,
  Button,
  Select,
  Switch,
  Divider,
  Checkbox,
  MenuItem,
  Snackbar,
  TableRow,
  Accordion,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
  InputAdornment,
  TableContainer,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';
import { useReservations } from 'src/contexts/reservations-context';

export default function ReservationFormView() {
  const router = useRouter();
  const { reservationId } = useParams<{ reservationId?: string }>();
  const { reservations, addReservation, updateReservation } = useReservations();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Check if we're in edit mode
  const isEditMode = !!reservationId;
  const existingReservation = isEditMode ? reservations.find(r => r.id.toString() === reservationId) : null;

  const [formData, setFormData] = useState({
    // Guest Information
    name: isEditMode ? (existingReservation?.guestName || '') : '',
    guestFirstName: isEditMode ? (existingReservation?.guestName?.split(' ')[0] || '') : '',
    guestLastName: isEditMode ? (existingReservation?.guestName?.split(' ').slice(1).join(' ') || '') : '',
    email: isEditMode ? (existingReservation?.email || '') : '',
    phone: isEditMode ? (existingReservation?.phone || '') : '',
    phoneCountry: '+1',
    guestCountry: '',
    guestCity: '',
    guestLanguage: 'en',
    currency: 'eur',
    channel: isEditMode ? (existingReservation?.channel || '') : '',
    hostawayReservationId: '',
    channelReservationId: '',
    listing: isEditMode ? (existingReservation?.property || '') : '',
    guestPhoto: null as File | null,

    // Reservation Details
    checkInDate: isEditMode ? (existingReservation?.checkInDate || '') : '',
    checkInTime: '15:00',
    checkOutDate: isEditMode ? (existingReservation?.checkOutDate || '') : '',
    checkOutTime: '10:00',
    numberOfNights: isEditMode ? (existingReservation?.nights || 0) : 0,
    numberOfGuests: isEditMode ? (existingReservation?.guests || 1) : 1,
    children: 0,
    infants: 0,
    pets: 0,
    rentalAgreement: 'not-required',

    // Notes
    guestNote: '',
    hostNote: '',

    // Policy and Status
    cancellationPolicy: 'moderate',
    reservationDate: '',
    reservationStored: 'no',
    synced: 'yes',
    instantBooked: 'no',
    channelActive: 'yes',
    status: isEditMode ? (existingReservation?.status || 'inquiry') : 'inquiry',
    commissionBooking: '0',
    importMethod: 'threadsImport',

    // Fees and Discounts
    extraFees: '',
    extraDiscounts: '',
    couponName: '',

    // Financial Fields
    baseRate: '',
    totalPrice: '',
    lastUpdated: '',
    originalTotalPrice: '',
    airbnbPayoutSum: '',

    // Custom Fields
    checkinOnlineStatus: '',
    checkinOnlineUrl: '',
    checkinReservationUrl: '',
    cityTax: '',
    identityVerificationStatus: '',
    remoteAccessLink: '',
    upsellingLink: '',

    // Additional Fields
    manuallyChecked: false,
    doorCode: '',
    doorCodeVendor: '',
    doorCodeInstructions: ''
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basicInfo: true,
    reservationDetails: true,
    notes: false,
    policy: false,
    fees: false,
    payment: false,
    financialFields: false,
    expenses: false,
    customFields: false,
    doorCode: false,
    attachment: false,
    tasks: false,
    alterationLogs: false,
    reviews: false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        guestPhoto: file
      }));
    }
  };

  const handleSectionToggle = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = () => {
    if (!formData.checkInDate || !formData.checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * 75;

    const reservation = {
      guestName: formData.name,
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      status: formData.status,
      property: formData.listing,
      nights,
      guests: parseInt(formData.numberOfGuests.toString()) || 1,
      totalAmount,
      email: formData.email,
      phone: formData.phone,
      channel: formData.channel
    };

    if (isEditMode && existingReservation) {
      updateReservation(existingReservation.id, reservation);
    } else {
      addReservation(reservation);
    }

    setSnackbarOpen(true);
    setTimeout(() => {
      router.push('/reservations');
    }, 1500);
  };

  const handleCancel = () => {
    router.push('/reservations');
  };

  return (
    <DashboardContent>
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          mb: 2, 
          bgcolor: 'background.paper', 
          borderRadius: 1, 
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 1
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="text"
                startIcon={<ArrowLeft size={16} />}
                onClick={handleCancel}
                sx={{ 
                  color: 'text.secondary',
                  px: 1,
                  py: 0.5,
                  '&:hover': {
                    bgcolor: 'grey.100',
                    color: 'text.primary'
                  }
                }}
              >
                Reservations
              </Button>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {isEditMode ? (
                  formData.name ? `${formData.name} / ${formData.checkInDate?.split('-')[1]} ${formData.checkInDate?.split('-')[2]} - ${formData.checkOutDate?.split('-')[1]} ${formData.checkOutDate?.split('-')[2]} / ${formData.numberOfGuests} guests` : 'Edit Reservation'
                ) : (
                  'New Reservation'
                )}
              </Typography>
              </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                startIcon={<X size={16} />}
                sx={{ 
                  borderColor: 'grey.300',
                  color: 'text.secondary',
                  px: 2,
                  py: 0.5,
                  '&:hover': {
                    borderColor: 'grey.400',
                    bgcolor: 'grey.50'
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={<Save size={16} />}
                sx={{ 
                  bgcolor: 'primary.main',
                  px: 2,
                  py: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    boxShadow: 2
                  }
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
          
          {/* Reservation Summary */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flexWrap: 'wrap'
          }}>
            <Chip 
              label={formData.status.toUpperCase()} 
              sx={{ 
                bgcolor: 'primary.light',
                color: 'primary.darker',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            />
            {formData.channel && (
              <Typography variant="body2" color="text.secondary">
                Channel: {formData.channel}
              </Typography>
            )}
            {formData.listing && (
              <Typography variant="body2" color="text.secondary">
                Listing: {formData.listing}
              </Typography>
            )}
            {isEditMode && (
              <Typography variant="body2" color="text.secondary">
                Mode: Edit Existing Reservation
              </Typography>
            )}
            {!isEditMode && (
              <Typography variant="body2" color="text.secondary">
                Mode: Create New Reservation
              </Typography>
            )}
          </Box>
        </Box>

        {/* Guest Information Section */}
        <Accordion 
          expanded={expandedSections.basicInfo} 
          onChange={() => handleSectionToggle('basicInfo')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Guest Information
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Personal details and contact information
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            {/* Guest Photo */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5, 
              mb: 2,
              p: 1.5,
              bgcolor: 'grey.50',
              borderRadius: 1,
              width: 'fit-content',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
            onClick={() => document.getElementById('photo-upload')?.click()}
            >
              <Avatar sx={{ 
                width: 40, 
                height: 40, 
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                {formData.guestPhoto ? (
                  <img 
                    src={URL.createObjectURL(formData.guestPhoto)} 
                    alt="Guest" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  />
                ) : (
                  formData.name ? formData.name.charAt(0).toUpperCase() : '?'
                )}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Guest Photo
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formData.guestPhoto ? formData.guestPhoto.name : 'Click to upload'}
                </Typography>
              </Box>
              {formData.guestPhoto && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData(prev => ({ ...prev, guestPhoto: null }));
                  }}
                  sx={{
                    color: 'error.main',
                    '&:hover': { bgcolor: 'error.light' }
                  }}
                >
                  <Trash2 size={16} />
                </IconButton>
              )}
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoUpload}
              />
            </Box>

            {/* Guest Information Fields */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gap: 2 
            }}>
              <TextField
                fullWidth
                size="small"
                label="Name *"
                placeholder="Enter guest full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={16} color="#666" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Guest First Name"
                placeholder="Enter first name"
                value={formData.guestFirstName}
                onChange={(e) => handleInputChange('guestFirstName', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Guest Last Name"
                placeholder="Enter last name"
                value={formData.guestLastName}
                onChange={(e) => handleInputChange('guestLastName', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                type="email"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={16} color="#666" />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 100 }}>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={formData.phoneCountry}
                    onChange={(e) => handleInputChange('phoneCountry', e.target.value)}
                    label="Country"
                    sx={{ borderRadius: 1 }}
                    IconComponent={() => <ChevronDown size={16} />}
                  >
                    <MenuItem value="+1">🇺🇸 +1</MenuItem>
                    <MenuItem value="+44">🇬🇧 +44</MenuItem>
                    <MenuItem value="+49">🇩🇪 +49</MenuItem>
                    <MenuItem value="+33">🇫🇷 +33</MenuItem>
                    <MenuItem value="+39">🇮🇹 +39</MenuItem>
                    <MenuItem value="+34">🇪🇸 +34</MenuItem>
                  </Select>
                </FormControl>
              <TextField
                fullWidth
                size="small"
                label="Phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
                />
              </Box>
              <FormControl fullWidth size="small">
                <InputLabel>Guest Country</InputLabel>
                <Select
                  value={formData.guestCountry}
                  onChange={(e) => handleInputChange('guestCountry', e.target.value)}
                  label="Guest Country"
                  sx={{ borderRadius: 1 }}
                  IconComponent={() => <ChevronDown size={16} />}
                >
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="CA">Canada</MenuItem>
                  <MenuItem value="GB">United Kingdom</MenuItem>
                  <MenuItem value="DE">Germany</MenuItem>
                  <MenuItem value="FR">France</MenuItem>
                  <MenuItem value="IT">Italy</MenuItem>
                  <MenuItem value="ES">Spain</MenuItem>
                  <MenuItem value="AU">Australia</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                size="small"
                label="Guest City"
                placeholder="Enter city"
                value={formData.guestCity}
                onChange={(e) => handleInputChange('guestCity', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MapPin size={16} color="#666" />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl fullWidth size="small">
                <InputLabel>Guest Language</InputLabel>
                <Select
                  value={formData.guestLanguage}
                  onChange={(e) => handleInputChange('guestLanguage', e.target.value)}
                  label="Guest Language"
                  sx={{ borderRadius: 1 }}
                  IconComponent={() => <ChevronDown size={16} />}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                  <MenuItem value="it">Italian</MenuItem>
                  <MenuItem value="pt">Portuguese</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  label="Currency"
                  sx={{ borderRadius: 1 }}
                  IconComponent={() => <ChevronDown size={16} />}
                >
                  <MenuItem value="usd">USD ($)</MenuItem>
                  <MenuItem value="eur">EUR (€)</MenuItem>
                  <MenuItem value="gbp">GBP (£)</MenuItem>
                  <MenuItem value="cad">CAD (C$)</MenuItem>
                  <MenuItem value="aud">AUD (A$)</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Channel</InputLabel>
                <Select
                  value={formData.channel}
                  onChange={(e) => handleInputChange('channel', e.target.value)}
                  label="Channel"
                  sx={{ borderRadius: 1 }}
                  IconComponent={() => <ChevronDown size={16} />}
                >
                  <MenuItem value="Hostaway Direct">Hostaway Direct</MenuItem>
                  <MenuItem value="Airbnb">Airbnb</MenuItem>
                  <MenuItem value="Booking.com">Booking.com</MenuItem>
                  <MenuItem value="VRBO">VRBO</MenuItem>
                  <MenuItem value="Expedia">Expedia</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                size="small"
                label="Hostaway Reservation ID"
                placeholder="Enter Hostaway reservation ID"
                value={formData.hostawayReservationId}
                onChange={(e) => handleInputChange('hostawayReservationId', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Channel Reservation ID"
                placeholder="Enter channel reservation ID"
                value={formData.channelReservationId}
                onChange={(e) => handleInputChange('channelReservationId', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Reservation Details Section */}
        <Accordion 
          expanded={expandedSections.reservationDetails} 
          onChange={() => handleSectionToggle('reservationDetails')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Reservation Details
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Dates, guests, and booking information
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            {/* Date and Time Fields */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 2,
              mb: 2
            }}>
              <TextField
                fullWidth
                size="small"
                label="Check-in Date *"
                type="date"
                value={formData.checkInDate}
                onChange={(e) => handleInputChange('checkInDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calendar size={16} color="#666" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Check-out Date *"
                type="date"
                value={formData.checkOutDate}
                onChange={(e) => handleInputChange('checkOutDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calendar size={16} color="#666" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Number of Guests"
                type="number"
                value={formData.numberOfGuests}
                onChange={(e) => handleInputChange('numberOfGuests', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={16} color="#666" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Guest Count Fields */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gap: 2,
              mb: 2
            }}>
              <TextField
                fullWidth
                size="small"
                label="Children"
                type="number"
                value={formData.children}
                onChange={(e) => handleInputChange('children', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Infants"
                type="number"
                value={formData.infants}
                onChange={(e) => handleInputChange('infants', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Pets"
                type="number"
                value={formData.pets}
                onChange={(e) => handleInputChange('pets', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
            </Box>

            {/* Additional Fields */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gap: 2
            }}>
              <TextField
                fullWidth
                size="small"
                label="Listing"
                placeholder="Enter property name"
                value={formData.listing}
                onChange={(e) => handleInputChange('listing', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <FormControl fullWidth size="small">
                <InputLabel>Rental Agreement</InputLabel>
                <Select
                  value={formData.rentalAgreement}
                  onChange={(e) => handleInputChange('rentalAgreement', e.target.value)}
                  label="Rental Agreement"
                  sx={{ borderRadius: 1 }}
                  IconComponent={() => <ChevronDown size={16} />}
                >
                  <MenuItem value="not-required">Not required</MenuItem>
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                  <MenuItem value="luxury">Luxury</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  label="Status"
                  sx={{ borderRadius: 1 }}
                  IconComponent={() => <ChevronDown size={16} />}
                >
                  <MenuItem value="inquiry">Inquiry threads</MenuItem>
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                size="small"
                label="Number of Nights"
                type="number"
                value={formData.numberOfNights}
                onChange={(e) => handleInputChange('numberOfNights', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Notes Section */}
        <Accordion 
          expanded={expandedSections.notes} 
          onChange={() => handleSectionToggle('notes')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Notes & Communication
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Guest and host notes, special requests
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 2
            }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                label="Guest Note"
                placeholder="Enter any special guest requests or notes"
                value={formData.guestNote}
                onChange={(e) => handleInputChange('guestNote', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                label="Host Note"
                placeholder="Enter internal host notes or instructions"
                value={formData.hostNote}
                onChange={(e) => handleInputChange('hostNote', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Policy and Status Section */}
        <Accordion 
          expanded={expandedSections.policy} 
          onChange={() => handleSectionToggle('policy')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Policy & Status
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Cancellation policy, booking status, and sync settings
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gap: 2
            }}>
              <TextField
                fullWidth
                size="small"
                label="Cancellation Policy"
                value="Moderate - Guests can cancel at least five days before check-in for a full refund."
                InputProps={{
                  readOnly: true,
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary'
                    }
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Reservation Date"
                type="date"
                value={formData.reservationDate}
                onChange={(e) => handleInputChange('reservationDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <FormControl fullWidth size="small">
                <InputLabel>Reservation Stored</InputLabel>
                <Select
                  value={formData.reservationStored}
                  onChange={(e) => handleInputChange('reservationStored', e.target.value)}
                  label="Reservation Stored"
                  sx={{ borderRadius: 1 }}
                  IconComponent={() => <ChevronDown size={16} />}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Synced</InputLabel>
                <Select
                  value={formData.synced}
                  onChange={(e) => handleInputChange('synced', e.target.value)}
                  label="Synced"
                  sx={{ borderRadius: 1 }}
                  IconComponent={() => <ChevronDown size={16} />}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Instant Booked</InputLabel>
                <Select
                  value={formData.instantBooked}
                  onChange={(e) => handleInputChange('instantBooked', e.target.value)}
                  label="Instant Booked"
                  sx={{ borderRadius: 1 }}
                  IconComponent={() => <ChevronDown size={16} />}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Channel Active</InputLabel>
                <Select
                  value={formData.channelActive}
                  onChange={(e) => handleInputChange('channelActive', e.target.value)}
                  label="Channel Active"
                  sx={{ borderRadius: 1 }}
                  IconComponent={() => <ChevronDown size={16} />}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                size="small"
                label="Import Method"
                value={formData.importMethod}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary'
                    }
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Commission Booking"
                placeholder="Enter commission amount"
                value={formData.commissionBooking}
                onChange={(e) => handleInputChange('commissionBooking', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.manuallyChecked}
                    onChange={(e) => handleInputChange('manuallyChecked', e.target.checked)}
                    color="primary"
                  />
                }
                label="Manually Checked"
                sx={{ alignSelf: 'center' }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Fees and Discounts Section */}
        <Accordion 
          expanded={expandedSections.fees} 
          onChange={() => handleSectionToggle('fees')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
             
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Fees & Discounts
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Extra fees, discounts, and pricing information
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gap: 2
            }}>
              <FormControl fullWidth size="small">
                <InputLabel>Extra Fees</InputLabel>
                <Select
                  value={formData.extraFees}
                  onChange={(e) => handleInputChange('extraFees', e.target.value)}
                  label="Extra Fees"
                  sx={{ borderRadius: 1 }}
                  IconComponent={() => <ChevronDown size={16} />}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="cleaning">Cleaning Fee</MenuItem>
                  <MenuItem value="service">Service Fee</MenuItem>
                  <MenuItem value="pet">Pet Fee</MenuItem>
                  <MenuItem value="late-checkout">Late Checkout</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Extra Discounts</InputLabel>
                <Select
                  value={formData.extraDiscounts}
                  onChange={(e) => handleInputChange('extraDiscounts', e.target.value)}
                  label="Extra Discounts"
                  sx={{ borderRadius: 1 }}
                  IconComponent={() => <ChevronDown size={16} />}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="early-bird">Early Bird</MenuItem>
                  <MenuItem value="long-stay">Long Stay</MenuItem>
                  <MenuItem value="repeat-guest">Repeat Guest</MenuItem>
                  <MenuItem value="seasonal">Seasonal</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                size="small"
                label="Coupon Name"
                placeholder="Enter coupon code or name"
                value={formData.couponName}
                onChange={(e) => handleInputChange('couponName', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <Button
                variant="outlined"
                size="small"
                sx={{ 
                  alignSelf: 'center',
                  borderRadius: 1,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    bgcolor: 'primary.50'
                  }
                }}
              >
                Apply
              </Button>
            </Box>
            
            {/* Financial Summary */}
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Price Breakdown
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Concept</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Base rate</TableCell>
                      <TableCell align="right">€{formData.baseRate}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" sx={{ mr: 1 }}>
                          <Edit size={16} />
                        </IconButton>
                        <IconButton size="small">
                          <Trash2 size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>TOTAL PRICE</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>€{formData.totalPrice}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small" sx={{ mr: 1 }}>
                          <Edit size={16} />
                        </IconButton>
                        <IconButton size="small">
                          <Trash2 size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'text.secondary' }}>
                <span>Last updated on: {formData.lastUpdated || 'Not available'}</span>
                <span>Original total price: {formData.originalTotalPrice ? `€${formData.originalTotalPrice}` : 'Not set'}</span>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Payment Section */}
        <Accordion 
          expanded={expandedSections.payment} 
          onChange={() => handleSectionToggle('payment')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Payment
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Payment methods and transaction details
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Payment methods
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControlLabel
                  control={<Checkbox checked={formData.manuallyChecked} />}
                  label="Manually checked"
                />
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Plus size={16} />}
                  sx={{ 
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  + Add payment method
                </Button>
              </Box>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Payment method</TableCell>
                    <TableCell>Default method</TableCell>
                    <TableCell>Owner name</TableCell>
                    <TableCell>Card expiry</TableCell>
                    <TableCell>Added on</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                      No payment methods found
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        {/* Financial Fields and Formulas Section */}
        <Accordion 
          expanded={expandedSections.financialFields} 
          onChange={() => handleSectionToggle('financialFields')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Financial fields and formulas
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Financial calculations and automated formulas
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Financial fields
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Plus size={16} />}
                sx={{ 
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': { 
                    borderColor: 'primary.dark',
                    bgcolor: 'primary.50'
                  }
                }}
              >
                + Add field
              </Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Concept</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Base rate</TableCell>
                    <TableCell align="right">{formData.baseRate ? `€${formData.baseRate}` : '-'}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" sx={{ mr: 1 }}>
                        <Edit size={16} />
                      </IconButton>
                      <IconButton size="small">
                        <Trash2 size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total price from channel</TableCell>
                    <TableCell align="right">{formData.totalPrice ? `€${formData.totalPrice}` : '-'}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" sx={{ mr: 1 }}>
                        <Edit size={16} />
                      </IconButton>
                      <IconButton size="small">
                        <Trash2 size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Airbnb payout sum</TableCell>
                    <TableCell align="right">{formData.airbnbPayoutSum ? `€${formData.airbnbPayoutSum}` : '-'}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" sx={{ mr: 1 }}>
                        <Edit size={16} />
                      </IconButton>
                      <IconButton size="small">
                        <Trash2 size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, fontSize: '0.875rem', color: 'text.secondary' }}>
              Last updated on: {formData.lastUpdated || 'Not available'}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Expenses and Extras Section */}
        <Accordion 
          expanded={expandedSections.expenses} 
          onChange={() => handleSectionToggle('expenses')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Expenses and extras
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Additional costs and extra services
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box sx={{ 
              textAlign: 'center', 
              py: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}>
              <Box sx={{ 
                width: 120, 
                height: 120, 
                bgcolor: 'grey.100', 
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
              }}>
                <ShoppingCart size={48} color="#666" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                No expenses or extras found
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Plus size={16} />}
                  sx={{ 
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  + Add expense
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Plus size={16} />}
                  sx={{ 
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  + Add extra
                </Button>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Custom Fields Section */}
        <Accordion 
          expanded={expandedSections.customFields} 
          onChange={() => handleSectionToggle('customFields')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Custom fields
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Additional reservation-specific data
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2
            }}>
              <TextField
                fullWidth
                size="small"
                label="Check-in Online Status - {{reservation_checkin_online_status}}"
                value={formData.checkinOnlineStatus}
                onChange={(e) => handleInputChange('checkinOnlineStatus', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Check-in Online URL - {{reservation_checkin_online_url}}"
                value={formData.checkinOnlineUrl}
                onChange={(e) => handleInputChange('checkinOnlineUrl', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Check-in Reservation URL - {{reservation_checkin_reservation_url}}"
                value={formData.checkinReservationUrl}
                onChange={(e) => handleInputChange('checkinReservationUrl', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="city tax - {{reservation_city_tax}}"
                placeholder="city tax"
                value={formData.cityTax}
                onChange={(e) => handleInputChange('cityTax', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Identity Verification Status - {{reservation_identity_verification_status}}"
                value={formData.identityVerificationStatus}
                onChange={(e) => handleInputChange('identityVerificationStatus', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Remote Access Link - {{reservation_remote_access_link}}"
                value={formData.remoteAccessLink}
                onChange={(e) => handleInputChange('remoteAccessLink', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Upselling Link - {{reservation_upselling_link}}"
                value={formData.upsellingLink}
                onChange={(e) => handleInputChange('upsellingLink', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Door Code Section */}
        <Accordion 
          expanded={expandedSections.doorCode} 
          onChange={() => handleSectionToggle('doorCode')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Door Code & Access
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Access codes and entry instructions
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 2
            }}>
              <TextField
                fullWidth
                size="small"
                label="Door Code"
                placeholder="Enter door access code"
                value={formData.doorCode}
                onChange={(e) => handleInputChange('doorCode', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Door Code Vendor"
                placeholder="Enter door code provider"
                value={formData.doorCodeVendor}
                onChange={(e) => handleInputChange('doorCodeVendor', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Instructions"
                placeholder="Enter access instructions"
                value={formData.doorCodeInstructions}
                onChange={(e) => handleInputChange('doorCodeInstructions', e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Attachment Section */}
        <Accordion 
          expanded={expandedSections.attachment} 
          onChange={() => handleSectionToggle('attachment')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Attachment
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  File attachments and documents
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box sx={{ 
              border: '2px dashed',
              borderColor: 'primary.main',
              borderRadius: 1,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.dark',
                bgcolor: 'primary.50'
              }
            }}
            onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Box sx={{ mb: 2 }}>
                <Upload size={48} color="#00A76F" />
              </Box>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                Drop files to upload or
              </Typography>
              <Typography 
                component="span" 
                sx={{ 
                  color: 'primary.main', 
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  '&:hover': { color: 'primary.dark' }
                }}
              >
                Browse
              </Typography>
              <input
                id="file-upload"
                type="file"
                multiple
                style={{ display: 'none' }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
              No attached files
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Tasks Section */}
        <Accordion 
          expanded={expandedSections.tasks} 
          onChange={() => handleSectionToggle('tasks')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Tasks
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Reservation-related tasks and reminders
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box sx={{ 
              textAlign: 'center', 
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                There are no tasks
              </Typography>
              <Button
                variant="contained"
                size="small"
                startIcon={<Plus size={16} />}
                sx={{ 
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                Add task
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Alteration Logs Section */}
        <Accordion 
          expanded={expandedSections.alterationLogs} 
          onChange={() => handleSectionToggle('alterationLogs')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Alteration logs
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Reservation change history and modifications
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box sx={{ 
              textAlign: 'center', 
              py: 4,
              color: 'text.secondary'
            }}>
              No alteration logs found
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Reviews Section */}
        <Accordion 
          expanded={expandedSections.reviews} 
          onChange={() => handleSectionToggle('reviews')}
          sx={{ 
            mb: 2, 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
            '&.Mui-expanded': {
              margin: '0 0 16px 0',
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={16} />}
            sx={{ 
              bgcolor: 'grey.50',
              color: 'text.primary',
              borderRadius: '4px 4px 0 0',
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': {
                margin: '4px 0',
                '&.Mui-expanded': {
                  margin: '4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Reviews
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Guest reviews and ratings
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box sx={{ 
              textAlign: 'center', 
              py: 4,
              color: 'text.secondary'
            }}>
              No results.
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Success Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            Reservation {isEditMode ? 'updated' : 'saved'} successfully!
          </Alert>
        </Snackbar>
      </Box>
    </DashboardContent>
  );
}