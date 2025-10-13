import React, { useState } from 'react';
import { Copy, Info, Plug, Calendar, Settings, FileCheck, ArrowRight, CreditCard, CheckCircle, MessageSquare } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
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


// Mock data for channels
const mockChannels = [
  {
    id: 1,
    name: 'Airbnb',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',
    color: '#FF5A5F',
    status: 'active',
    type: 'config',
    partnerBadge: 'Preferred Plus airbnb Partner 2023',
  },
  {
    id: 2,
    name: 'Booking.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Booking.com_logo.svg',
    color: '#003580',
    status: 'active',
    type: 'config',
    partnerBadge: 'Booking.com Premier Connectivity Partner 2023',
  },
  {
    id: 3,
    name: 'Expedia',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Expedia_logo.svg',
    color: '#000000',
    status: 'not-connected',
    type: 'activate',
  },
  {
    id: 4,
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    color: '#4285F4',
    status: 'active',
    type: 'config',
  },
  {
    id: 5,
    name: 'Vrbo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Vrbo_logo.svg',
    color: '#00A699',
    status: 'active',
    type: 'config',
    partnerBadge: 'ELITE SOFTWARE PARTNER 2024',
  },
  {
    id: 6,
    name: 'Marriott',
    logo: 'https://via.placeholder.com/24x24/FF6B35/FFFFFF?text=M',
    color: '#FF6B35',
    status: 'not-connected',
    type: 'activate',
  },
  {
    id: 7,
    name: 'Homeaway iCAL',
    logo: 'https://via.placeholder.com/24x24/3B82F6/FFFFFF?text=🏠',
    color: '#3B82F6',
    status: 'not-connected',
    type: 'activate',
  },
  {
    id: 8,
    name: 'Vrbo iCAL',
    logo: 'https://via.placeholder.com/24x24/00A699/FFFFFF?text=W',
    color: '#00A699',
    status: 'not-connected',
    type: 'activate',
    hasInfo: true,
  },
  {
    id: 9,
    name: 'Custom iCAL',
    logo: 'https://via.placeholder.com/24x24/8B5CF6/FFFFFF?text=📅',
    color: '#8B5CF6',
    status: 'not-connected',
    type: 'activate',
    hasInfo: true,
  },
];


export function ChannelsView() {
  const router = useRouter();
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [icalModalOpen, setIcalModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedListing, setSelectedListing] = useState('');
  const [icalLink, setIcalLink] = useState('');
  const [homeawayLink, setHomeawayLink] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [legalEntityId, setLegalEntityId] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === 'listing-mapping') {
      router.push('/channel-manager/listing-mapping');
    }
  };

  const handleConfigClick = (channel: any) => {
    setSelectedChannel(channel);
    if (channel.name === 'Airbnb') {
      router.push('/channel-manager/airbnb');
    } else if (channel.name === 'Booking.com') {
      router.push('/channel-manager/booking');
    }
  };

  const handleActivateClick = (channel: any) => {
    setSelectedChannel(channel);
    if (channel.name.includes('iCAL')) {
      if (channel.name === 'Homeaway iCAL') {
        setIcalModalOpen(true);
      } else {
        setTermsModalOpen(true);
      }
    } else if (channel.name === 'Booking.com') {
      setTermsModalOpen(true);
    } else {
      // For Expedia and other channels, show the terms modal
      setTermsModalOpen(true);
    }
  };


  const handleCopyLink = () => {
    navigator.clipboard.writeText(icalLink);
  };

  const handleActivateIcal = () => {
    setIcalModalOpen(false);
    // Show success message or redirect
  };

  const handleContactSupport = () => {
    setSupportModalOpen(false);
    // Handle support contact
  };

  const getInfoTooltipContent = (channel: any) => {
    if (channel.name === 'Vrbo iCAL') {
      return (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Vrbo iCAL Connection
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
            • Syncs availability between Hostaway and Vrbo
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
            • Updates are slower than API connections
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
            • Requires manual calendar export/import
          </Typography>
          <Typography variant="caption" sx={{ display: 'block' }}>
            • Guest messaging not supported
          </Typography>
        </Box>
      );
    }
    if (channel.name === 'Custom iCAL') {
      return (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Custom iCAL Connection
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
            • Connect any calendar that supports iCAL
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
            • Two-way sync with external calendars
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
            • Perfect for personal calendars
          </Typography>
          <Typography variant="caption" sx={{ display: 'block' }}>
            • Manual setup required
          </Typography>
        </Box>
      );
    }
    return '';
  };

  const getStatusChip = (status: string) => {
    if (status === 'active') {
      return (
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontSize: '0.7rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            minWidth: 60,
            textAlign: 'center',
            flexShrink: 0,
            height: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            boxShadow: '0 2px 6px rgba(0, 166, 153, 0.25)',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0, 166, 153, 0.35)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Active
        </Box>
      );
    }
    return (
      <Box
        sx={{
          bgcolor: 'grey.300',
          color: 'grey.700',
          px: 1.5,
          py: 0.5,
          borderRadius: 2,
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.3px',
          minWidth: 60,
          textAlign: 'center',
          flexShrink: 0,
          height: 26,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
          boxShadow: '0 2px 4px rgba(158, 158, 158, 0.2)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(158, 158, 158, 0.3)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        Not Connected
      </Box>
    );
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Channel Manager
        </Typography>
        
        {/* Tabs */}
        <Tabs value="channels" onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Listing Mapping" value="listing-mapping" />
          <Tab label="Channels" value="channels" />
        </Tabs>
      </Box>

      {/* Channels Table */}
      <Card sx={{ 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
        border: '1px solid', 
        borderColor: 'grey.200', 
        borderRadius: 3,
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        },
        transition: 'box-shadow 0.3s ease-in-out',
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F8F9FA' }}>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>Channel</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>Partner Badge</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', textAlign: 'center' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
        {mockChannels.map((channel) => (
                <TableRow key={channel.id} sx={{ 
                  '&:hover': { 
                    bgcolor: 'grey.50',
                    transform: 'scale(1.01)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}>
                  {/* Status Column */}
                  <TableCell sx={{ py: 2 }}>
                    {getStatusChip(channel.status)}
                  </TableCell>
                  
                  {/* Channel Column */}
                  <TableCell sx={{ py: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: channel.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          flexShrink: 0,
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
                        <Box sx={{ display: channel.logo && !channel.logo.includes('placeholder') ? 'none' : 'flex', color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>
                          {channel.name === 'Airbnb' ? 'A' : 
                           channel.name === 'Booking.com' ? 'B' : 
                           channel.name === 'Expedia' ? '7' : 
                           channel.name === 'Google' ? 'G' : 
                           channel.name === 'Vrbo' ? 'W' : 
                           channel.name === 'Marriott' ? 'M' : 
                           channel.name.includes('Homeaway') ? '🏠' : 
                           channel.name.includes('Vrbo iCAL') ? 'W' : '📅'}
                        </Box>
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem', color: '#333' }}>
                    {channel.name}
                  </Typography>
                    </Box>
                  </TableCell>
                  
                  {/* Partner Badge Column */}
                  <TableCell sx={{ py: 2 }}>
                    {channel.partnerBadge ? (
                      <Chip 
                        label={channel.partnerBadge} 
                        size="small" 
                        sx={{ 
                          fontSize: '0.7rem',
                          height: 24,
                          bgcolor: channel.name === 'Airbnb' ? '#FF5A5F' : 
                                  channel.name === 'Booking.com' ? '#003580' : 
                                  channel.name === 'Vrbo' ? '#00A699' : '#FF6B35',
                          color: 'white',
                          fontWeight: 600,
                          borderRadius: 2,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          '& .MuiChip-label': {
                            px: 1.2,
                            py: 0.4,
                            lineHeight: 1.2,
                          },
                          '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                          },
                          transition: 'all 0.2s ease-in-out',
                        }} 
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        -
                  </Typography>
                    )}
                  </TableCell>
                  
                  {/* Action Column */}
                  <TableCell sx={{ py: 2, textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      {channel.hasInfo && (
                        <Tooltip
                          title={getInfoTooltipContent(channel)}
                          arrow
                          placement="top"
                          enterDelay={300}
                          leaveDelay={200}
                          componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: 'grey.900',
                                color: 'white',
                                fontSize: '0.75rem',
                                maxWidth: 280,
                                '& .MuiTooltip-arrow': {
                                  color: 'grey.900',
                                },
                              },
                            },
                          }}
                        >
                          <Box sx={{ 
                            width: 20, 
                            height: 20, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            mr: 0.5,
                            cursor: 'pointer',
                            '&:hover': {
                              bgcolor: 'primary.dark',
                              transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease-in-out',
                          }}>
                            <Typography sx={{ color: 'white', fontSize: '0.7rem', fontWeight: 'bold' }}>i</Typography>
                </Box>
                        </Tooltip>
                      )}
                {channel.type === 'config' ? (
                  <Button
                    variant="outlined"
                          startIcon={<Settings size={14} />}
                    onClick={() => handleConfigClick(channel)}
                          sx={{ 
                            textTransform: 'none', 
                            borderColor: 'primary.main', 
                            color: 'primary.main',
                            fontSize: '0.8rem',
                            px: 2.5,
                            py: 0.8,
                            minWidth: 110,
                            height: 36,
                            borderRadius: 2,
                            fontWeight: 500,
                            borderWidth: 1.5,
                            '&:hover': {
                              borderColor: 'primary.dark',
                              bgcolor: 'primary.main',
                              color: 'white',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(0, 166, 153, 0.3)',
                            },
                            transition: 'all 0.2s ease-in-out',
                          }}
                        >
                          Configure
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                          startIcon={<ArrowRight size={14} />}
                    onClick={() => handleActivateClick(channel)}
                          sx={{ 
                            textTransform: 'none', 
                            bgcolor: 'primary.main',
                            fontSize: '0.8rem',
                            px: 2.5,
                            py: 0.8,
                            minWidth: 110,
                            height: 36,
                            borderRadius: 2,
                            fontWeight: 600,
                            boxShadow: '0 3px 10px rgba(0, 166, 153, 0.3)',
                            '&:hover': {
                              bgcolor: 'primary.dark',
                              boxShadow: '0 6px 16px rgba(0, 166, 153, 0.4)',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.2s ease-in-out',
                          }}
                  >
                    Activate
                  </Button>
                )}
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
            {selectedChannel?.name === 'Booking.com' ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <FileCheck size={20} color="#4CAF50" />
                  <Typography variant="body2">
                    When Booking.com is connected, all current Hostaway availability and rates will be uploaded and replace current Booking.com settings.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <CheckCircle size={20} color="#2196F3" />
                  <Typography variant="body2">
                    I will ensure that my rates and availability are up to date on Hostaway before connecting.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <CreditCard size={20} color="#FF9800" />
                  <Typography variant="body2">
                    When different currencies are used in Booking.com and Hostaway, I will immediately adjust the markup to reflect this to avoid bookings at low rates.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <MessageSquare size={20} color="#9C27B0" />
                  <Typography variant="body2">
                    Booking.com will manually activate my guest messaging connection with the Hostaway software. This may take a couple of weeks. Until then I will have to manage the guest messaging from the Booking.com platform.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Settings size={20} color="#607D8B" />
                  <Typography variant="body2">
                    When I change my room mapping in Booking.com after connection, I will remap my listing in Hostaway.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Calendar size={20} color="#795548" />
                  <Typography variant="body2">
                    I am not using multi-room availability in my listings on Booking.com. My inventory has to consist of 1 room available per day per room type.
                  </Typography>
                </Box>
              </>
            ) : selectedChannel?.name === 'Expedia' ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box sx={{ 
                    width: 24, 
                    height: 24, 
                   
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    mt: 0.5
                  }}>
                    <Plug size={24} color="#666" />
                  </Box>
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    I understand that the sync process is slower than an API connection.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box sx={{ 
                    width: 22, 
                    height: 22, 
                   
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    mt: 0.5
                  }}>
                    <FileCheck size={22} color="#666" />
                  </Box>
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    When the connection is made, I will check to ensure Hostaway reservations are seen in the Vrbo calendar and vice versa.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box sx={{ 
                    width: 22, 
                    height: 22, 
                   
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    mt: 0.5
                  }}>
                    <Calendar size={22} color="#666" />
                  </Box>
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    I understand that Vrbo is responsible for importing the Hostaway calendar and issues should be reported to Vrbo.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box sx={{ 
                    width: 22, 
                    height: 22, 
                  
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    mt: 0.5
                  }}>
                    <MessageSquare size={22} color="#666" />
                  </Box>
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    The guest messaging service is not available for this connection. I can manually use direct guest email as an alternative.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box sx={{ 
                    width: 22, 
                    height: 22, 
                  
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    mt: 0.5
                  }}>
                    <CreditCard size={22} color="#666" />
                  </Box>
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    Rates, listing settings, and guest message services are not supported by iCal.
            </Typography>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: 1, bgcolor: '#9C27B0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'white' }}>🔌</Typography>
            </Box>
          </Box>
                  <Typography variant="body2">
                    I understand that the sync process is slower than an API connection.
            </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <CheckCircle size={20} color="#4CAF50" />
                  <Typography variant="body2">
                    When the connection is made, I will check to ensure Hostaway reservations are seen in the Vrbo calendar and vice versa.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Calendar size={20} color="#2196F3" />
                    <CheckCircle size={20} color="#4CAF50" />
                  </Box>
                  <Typography variant="body2">
                    I understand that Vrbo is responsible for importing the Hostaway calendar and issues should be reported to Vrbo.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#2196F3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'white' }}>💬</Typography>
                    </Box>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#FF9800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'white' }}>📞</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    The guest messaging service is not available for this connection. I can manually use direct guest email as an alternative.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: 1, bgcolor: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white' }}>$</Typography>
                    </Box>
                    <Box sx={{ width: 20, height: 20, borderRadius: 1, bgcolor: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white' }}>💳</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    Rates, listing settings, and guest message services are not supported by iCal.
                  </Typography>
                </Box>
              </>
            )}
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
        <DialogActions sx={{ p: 4, gap: 2, justifyContent: 'center' }}>
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
              if (selectedChannel?.name === 'Booking.com') {
                setSupportModalOpen(true);
              } else {
                setSecondModalOpen(true);
              }
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

      {/* iCAL Setup Modal */}
      <Dialog
        open={icalModalOpen}
        onClose={() => setIcalModalOpen(false)}
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
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center' }}>
            Please open your Homeaway account and go to your Calendar
            </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 1 }}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Choose listing
                  </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select listing</InputLabel>
              <Select
                value={selectedListing}
                label="Select listing"
                onChange={(e) => setSelectedListing(e.target.value)}
              >
                <MenuItem value="listing1">La Dimora Del Cavaliere (305034)</MenuItem>
                <MenuItem value="listing2">Navigli (305035)</MenuItem>
                <MenuItem value="listing3">Polacchi42 (305225)</MenuItem>
                <MenuItem value="listing4">Superattico - Via Del Corso 43 (305421)</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Copy this link into your Homeaway calendar
            </Typography>
            <TextField
              fullWidth
              value={icalLink}
              onChange={(e) => setIcalLink(e.target.value)}
              placeholder="https://ical.hostaway.com/export/..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="outlined"
                      startIcon={<Copy size={16} />}
                      onClick={handleCopyLink}
                      sx={{ textTransform: 'none' }}
                    >
                      Copy
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Insert your Homeaway calendar export link:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={homeawayLink}
              onChange={(e) => setHomeawayLink(e.target.value)}
              placeholder="https://www.homeaway.com/ical/..."
              sx={{ mb: 2 }}
            />
                  </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 2 }}>
          <Button 
            variant="outlined"
            onClick={() => setIcalModalOpen(false)}
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
            onClick={handleActivateIcal}
            sx={{ textTransform: 'none', bgcolor: 'primary.main' }}
          >
            Activate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Support Contact Modal */}
      <Dialog
        open={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center' }}>
            Please, contact support for export
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Message
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              placeholder="Please describe your request..."
              sx={{ mb: 3 }}
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
              sx={{ mb: 3 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
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
            onClick={handleContactSupport}
            sx={{ textTransform: 'none', bgcolor: 'primary.main' }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Second Modal - Homeaway iCAL Setup */}
      <Dialog
        open={secondModalOpen}
        onClose={() => setSecondModalOpen(false)}
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
        <DialogTitle sx={{ pb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center', color: '#333' }}>
            Please open your Homeaway account and go to your Calendar
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 1 }}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              Choose listing
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select listing</InputLabel>
              <Select
                value={selectedListing}
                label="Select listing"
                onChange={(e) => setSelectedListing(e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E0E0E0',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00A699',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00A699',
                  },
                }}
              >
                <MenuItem value="listing1">La Dimora Del Cavaliere (305034)</MenuItem>
                <MenuItem value="listing2">Navigli (305035)</MenuItem>
                <MenuItem value="listing3">Polacchi42 (305225)</MenuItem>
                <MenuItem value="listing4">Superattico - Via Del Corso 43 (305421)</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              Copy this link into your Homeaway calendar
            </Typography>
            <TextField
              fullWidth
              value={icalLink}
              onChange={(e) => setIcalLink(e.target.value)}
              placeholder="https://ical.hostaway.com/export/..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="outlined"
                      startIcon={<Copy size={16} />}
                      onClick={handleCopyLink}
                      sx={{ 
                        textTransform: 'none',
                        borderColor: '#00A699',
                        color: '#00A699',
                        '&:hover': {
                          borderColor: '#008A7A',
                          bgcolor: '#F0F9F8',
                        }
                      }}
                    >
                      Copy
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00A699',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00A699',
                  },
                },
              }}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              Insert your Homeaway calendar export link:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={homeawayLink}
              onChange={(e) => setHomeawayLink(e.target.value)}
              placeholder="https://www.homeaway.com/ical/..."
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00A699',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00A699',
                  },
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 2, justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined"
            onClick={() => setSecondModalOpen(false)}
            sx={{ 
              textTransform: 'none', 
              color: 'primary.main',
              borderColor: 'primary.main', 
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={() => setSecondModalOpen(false)}
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
            Activate
            </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
