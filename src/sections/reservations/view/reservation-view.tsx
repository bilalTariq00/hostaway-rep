import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Edit, ArrowLeft, ChevronDown } from 'lucide-react';

import {
  Box,
  Chip,
  Table,
  Avatar,
  Button,
  Divider,
  TableRow,
  Accordion,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  TableContainer,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';
import { useHostaway } from 'src/contexts/hostaway-context';
import { useReservations } from 'src/contexts/reservations-context';

export default function ReservationView() {
  const router = useRouter();
  const { reservationId } = useParams<{ reservationId?: string }>();
  const { reservations } = useReservations();
  const { reservations: hostawayReservations, properties: hostawayProperties, hasCredentials } = useHostaway();

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
    reviews: false,
  });

  const handleSectionToggle = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Find the reservation
  const reservation = reservations.find((r) => r.id.toString() === reservationId);
  
  // Find corresponding Hostaway data if available
  const hostawayReservation = hasCredentials ? 
    hostawayReservations.find((r) => r.id.toString() === reservationId) : null;
  const hostawayProperty = hostawayReservation && hasCredentials ? 
    hostawayProperties.find((p) => p.id === hostawayReservation.propertyId) : null;

  const handleBack = () => {
    router.push('/reservations');
  };

  const handleEdit = () => {
    router.push(`/reservations/${reservationId}/edit`);
  };

  if (!reservation) {
    return (
      <DashboardContent>
        <Box sx={{ p: 2, textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Reservation not found
          </Typography>
          <Button variant="contained" onClick={() => router.push('/reservations')} sx={{ mt: 2 }}>
            Back to Reservations
          </Button>
        </Box>
      </DashboardContent>
    );
  }

  // Enhanced data using Hostaway data when available, fallback to mock data
  const formData = {
    // Guest Information
    name: hostawayReservation?.guestName || reservation.guestName || 'Paula',
    guestFirstName: (hostawayReservation?.guestName || reservation.guestName || 'Paula').split(' ')[0],
    guestLastName: (hostawayReservation?.guestName || reservation.guestName || 'Paula').split(' ').slice(1).join(' ') || 'Guest last name',
    email: hostawayReservation?.guestEmail || reservation.email || 'Email',
    phone: reservation.phone || '',
    phoneCountry: '+1',
    guestCountry: 'US',
    guestCity: 'City',
    guestLanguage: 'en',
    currency: hostawayReservation?.currency || 'eur',
    channel: hostawayReservation?.source || reservation.channel || 'Airbnb',
    hostawayReservationId: hostawayReservation?.id.toString() || '43591387',
    channelReservationId: '363365-thread-2195871272-5441115527-2025-08-17-125-4',
    listing: hostawayProperty?.name || reservation.property || 'Via di Acqua Bullicante 113 (363365)',
    guestPhoto: null as File | null,

    // Reservation Details
    checkInDate: hostawayReservation?.checkIn || reservation.checkInDate || '2025-08-17',
    checkInTime: '15:00',
    checkOutDate: hostawayReservation?.checkOut || reservation.checkOutDate || '2025-12-20',
    checkOutTime: '10:00',
    numberOfNights: reservation.nights || 125,
    numberOfGuests: hostawayReservation?.guests || reservation.guests || 4,
    children: 0,
    infants: 0,
    pets: 0,
    rentalAgreement: 'not-required',

    // Notes
    guestNote: 'Guest note',
    hostNote: 'Host note',

    // Policy and Status
    cancellationPolicy: 'moderate',
    reservationDate: '2025-06-15',
    reservationStored: 'no',
    synced: 'yes',
    instantBooked: 'no',
    channelActive: 'yes',
    status: hostawayReservation?.status || reservation.status || 'inquiry',
    commissionBooking: '0',
    importMethod: 'threadsImport',

    // Fees and Discounts
    extraFees: '',
    extraDiscounts: '',
    couponName: '',

    // Financial Fields
    baseRate: '12147.30',
    totalPrice: '12147.30',
    lastUpdated: '2025-06-15 16:54:15',
    originalTotalPrice: '12163.8',
    airbnbPayoutSum: '10557.52',

    // Custom Fields
    checkinOnlineStatus: 'MISSING_GUESTS',
    checkinOnlineUrl: 'https://guest.chekin.com/UoD84sT',
    checkinReservationUrl: 'https://dashboard.chekin.com/bookings/e301c5e5a59b4b12a3bac420b772c118',
    cityTax: 'NOT_USED',
    identityVerificationStatus: 'NOT_USED',
    remoteAccessLink: 'https://guest.chekin.com/UoDvYE0',
    upsellingLink: 'https://guest.chekin.com/UoD658v',

    // Additional Fields
    manuallyChecked: false,
    doorCode: '',
    doorCodeVendor: '',
    doorCodeInstructions: '',
  };

  return (
    <DashboardContent>
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            mb: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="text"
                startIcon={<ArrowLeft size={16} />}
                onClick={handleBack}
                sx={{
                  color: 'text.secondary',
                  px: 1,
                  py: 0.5,
                  '&:hover': {
                    bgcolor: 'grey.100',
                    color: 'text.primary',
                  },
                }}
              >
                Reservations
              </Button>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {formData.name} / {formData.checkInDate?.split('-')[1]}{' '}
                {formData.checkInDate?.split('-')[2]} - {formData.checkOutDate?.split('-')[1]}{' '}
                {formData.checkOutDate?.split('-')[2]} / {formData.numberOfGuests} guests
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{
                  borderColor: 'grey.300',
                  color: 'text.secondary',
                  px: 2,
                  py: 0.5,
                  '&:hover': {
                    borderColor: 'grey.400',
                    bgcolor: 'grey.50',
                  },
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleEdit}
                startIcon={<Edit size={16} />}
                sx={{
                  bgcolor: 'primary.main',
                  px: 2,
                  py: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    boxShadow: 2,
                  },
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>

          {/* Reservation Summary */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Chip
              label={formData.status.toUpperCase()}
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.darker',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Channel: {formData.channel}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Listing: {formData.listing}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mode: View Only
            </Typography>
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
            },
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
              },
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 2,
                p: 1.5,
                bgcolor: 'grey.50',
                borderRadius: 1,
                width: 'fit-content',
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                {formData.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Guest Photo
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formData.guestPhoto ? formData.guestPhoto.name : 'No photo uploaded'}
                </Typography>
              </Box>
            </Box>

            {/* Guest Information Fields - Read Only */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Name"
                value={formData.name}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Guest First Name"
                value={formData.guestFirstName}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Guest Last Name"
                value={formData.guestLastName}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Email"
                value={formData.email}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Country Code"
                  value={formData.phoneCountry}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    minWidth: 100,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      '& .MuiOutlinedInput-input': {
                        color: 'text.secondary',
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Phone"
                  value={formData.phone}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      '& .MuiOutlinedInput-input': {
                        color: 'text.secondary',
                      },
                    },
                  }}
                />
              </Box>
              <TextField
                fullWidth
                size="small"
                label="Guest Country"
                value={formData.guestCountry}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Guest City"
                value={formData.guestCity}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Guest Language"
                value={formData.guestLanguage}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Currency"
                value={formData.currency}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Channel"
                value={formData.channel}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Hostaway Reservation ID"
                value={formData.hostawayReservationId}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Channel Reservation ID"
                value={formData.channelReservationId}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
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
            },
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
              },
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
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Check-in Date"
                type="date"
                value={formData.checkInDate}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Check-out Date"
                type="date"
                value={formData.checkOutDate}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Number of Guests"
                type="number"
                value={formData.numberOfGuests}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
            </Box>

            {/* Guest Count Fields */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Children"
                type="number"
                value={formData.children}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Infants"
                type="number"
                value={formData.infants}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Pets"
                type="number"
                value={formData.pets}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
            </Box>

            {/* Additional Fields */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Listing"
                value={formData.listing}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Rental Agreement"
                value={formData.rentalAgreement}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Status"
                value={formData.status}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Number of Nights"
                type="number"
                value={formData.numberOfNights}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
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
            },
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
              },
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
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                label="Guest Note"
                value={formData.guestNote}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                label="Host Note"
                value={formData.hostNote}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Financial Fields Section */}
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
            },
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
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Financial Fields
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Financial calculations and pricing information
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
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
                      <Typography variant="caption" color="text.secondary">
                        View Only
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total price from channel</TableCell>
                    <TableCell align="right">€{formData.totalPrice}</TableCell>
                    <TableCell align="center">
                      <Typography variant="caption" color="text.secondary">
                        View Only
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Airbnb payout sum</TableCell>
                    <TableCell align="right">€{formData.airbnbPayoutSum}</TableCell>
                    <TableCell align="center">
                      <Typography variant="caption" color="text.secondary">
                        View Only
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, fontSize: '0.875rem', color: 'text.secondary' }}>
              Last updated on: {formData.lastUpdated}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Policy & Status Section */}
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
            },
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
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Policy & Status
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Cancellation policy and reservation status
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Cancellation Policy"
                value={formData.cancellationPolicy}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Reservation Date"
                value={formData.reservationDate}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Reservation Stored"
                value={formData.reservationStored}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Synced"
                value={formData.synced}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Instant Booked"
                value={formData.instantBooked}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Channel Active"
                value={formData.channelActive}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Commission Booking"
                value={formData.commissionBooking}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
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
                      color: 'text.secondary',
                    },
                  },
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Fees & Discounts Section */}
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
            },
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
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Fees & Discounts
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Additional fees, discounts, and pricing information
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Extra Fees"
                value={formData.extraFees}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Extra Discounts"
                value={formData.extraDiscounts}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Coupon Name"
                value={formData.couponName}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
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
            },
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
              },
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
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Payment methods
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Manually checked: {formData.manuallyChecked ? 'Yes' : 'No'}
              </Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Method</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>€{formData.totalPrice}</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell align="center">
                      <Typography variant="caption" color="text.secondary">
                        View Only
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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
            },
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
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Expenses and Extras
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Additional expenses and extra services
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'grey.50',
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                No expenses or extras found
              </Typography>
              <Typography variant="caption" color="text.secondary">
                View Only Mode
              </Typography>
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
            },
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
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Custom Fields
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Additional reservation-specific data
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Check-in Online Status"
                value={formData.checkinOnlineStatus}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Check-in Online URL"
                value={formData.checkinOnlineUrl}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Check-in Reservation URL"
                value={formData.checkinReservationUrl}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="City Tax"
                value={formData.cityTax}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Identity Verification Status"
                value={formData.identityVerificationStatus}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Remote Access Link"
                value={formData.remoteAccessLink}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Upselling Link"
                value={formData.upsellingLink}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Door Code & Access Section */}
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
            },
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
              },
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
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Door Code"
                value={formData.doorCode}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Door Code Vendor"
                value={formData.doorCodeVendor}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                label="Door Code Instructions"
                value={formData.doorCodeInstructions}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  gridColumn: '1 / -1',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& .MuiOutlinedInput-input': {
                      color: 'text.secondary',
                    },
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
            },
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
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Attachment
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Documents and file attachments
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'grey.50',
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                No attachments found
              </Typography>
              <Typography variant="caption" color="text.secondary">
                View Only Mode
              </Typography>
            </Box>
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
            },
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
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Tasks
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Reservation-related tasks and checklists
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'grey.50',
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                There are no tasks
              </Typography>
              <Typography variant="caption" color="text.secondary">
                View Only Mode
              </Typography>
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
            },
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
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Alteration Logs
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  History of changes and modifications
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'grey.50',
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                No alteration logs found
              </Typography>
              <Typography variant="caption" color="text.secondary">
                View Only Mode
              </Typography>
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
            },
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
              },
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
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'grey.50',
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                No results.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                View Only Mode
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </DashboardContent>
  );
}
