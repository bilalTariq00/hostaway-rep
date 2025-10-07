import { useState, useEffect } from 'react';
import { Save, Info, ArrowLeft, ChevronDown } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for listings
const mockListings = [
  {
    id: 305034,
    name: 'La Dimora Del Cavaliere',
    image: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-1.webp',
    selected: false
  },
  {
    id: 305035,
    name: 'Navigli',
    image: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-2.webp',
    selected: false
  },
  {
    id: 305225,
    name: 'Polacchi42',
    image: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-3.webp',
    selected: true
  },
  {
    id: 305421,
    name: 'Superattico - Via Del Corso 43',
    image: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-4.webp',
    selected: false
  },
  {
    id: 306532,
    name: 'Montecatini Terme',
    image: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-5.webp',
    selected: false
  },
  {
    id: 308582,
    name: 'Monteverde - Quattroventi',
    image: 'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-6.webp',
    selected: false
  }
];

const exampleTemplates = [
  'Thank you for booking',
  'Before you arrive',
  'Welcome message',
  'Before you leave',
  'Leave a review'
];

export function AutomationCreateView() {
  const router = useRouter();
  const [automationName, setAutomationName] = useState('');
  const [ccEmail1, setCcEmail1] = useState('');
  const [ccEmail2, setCcEmail2] = useState('');
  const [subject, setSubject] = useState('');
  const [defaultMessage, setDefaultMessage] = useState('');
  const [eventTrigger, setEventTrigger] = useState('Reservation');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [listings, setListings] = useState(mockListings);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  // Load automation data to copy on component mount
  useEffect(() => {
    const automationToCopy = localStorage.getItem('automationToCopy');
    if (automationToCopy) {
      const parsedAutomation = JSON.parse(automationToCopy);
      setAutomationName(`${parsedAutomation.title} (Copy)`);
      setCcEmail1(parsedAutomation.ccEmail1 || '');
      setCcEmail2(parsedAutomation.ccEmail2 || '');
      setSubject(parsedAutomation.subject || '');
      setDefaultMessage(parsedAutomation.defaultMessage || '');
      setEventTrigger(parsedAutomation.eventTrigger || '');
      setSelectedChannels(parsedAutomation.selectedChannels || []);
      setListings(mockListings.map(l => ({
        ...l,
        selected: parsedAutomation.selectedListings?.some((sl: any) => sl.id === l.id) || false
      })));
      
      // Clear the copied data from localStorage
      localStorage.removeItem('automationToCopy');
    }
  }, []);

  const handleSave = () => {
    // Create new automation object
    const newAutomation = {
      id: Date.now(),
      title: automationName,
      subject,
      event: eventTrigger,
      channels: selectedChannels.map(name => ({
        name,
        color: name === 'Booking.com' ? '#003580' : '#FF5A5F',
        icon: name === 'Booking.com' ? '🏨' : '🏠'
      })),
      listing: listings.find(l => l.selected)?.name || 'Multiple Listings',
      creationDate: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      lastEdit: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      automationId: Math.floor(Math.random() * 1000000).toString(),
      isActive: true,
    };

    // Store in localStorage for persistence
    const existingAutomations = JSON.parse(localStorage.getItem('automations') || '[]');
    const updatedAutomations = [...existingAutomations, newAutomation];
    localStorage.setItem('automations', JSON.stringify(updatedAutomations));

    // Navigate back to automations page
    router.push('/inbox/automations');
  };

  const handleBack = () => {
    router.push('/inbox/automations');
  };

  const handleListingSelect = (listingId: number) => {
    setListings(prev => prev.map(listing => 
      listing.id === listingId 
        ? { ...listing, selected: !listing.selected }
        : listing
    ));
  };

  const handleSelectAll = () => {
    const allSelected = listings.every(l => l.selected);
    setListings(prev => prev.map(listing => ({ ...listing, selected: !allSelected })));
  };

  const handleChannelToggle = (channel: string) => {
    setSelectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchQuery.toLowerCase());
    return showSelectedOnly ? (listing.selected && matchesSearch) : matchesSearch;
  });

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton sx={{ p: 1 }} onClick={handleBack}>
            <ArrowLeft size={20} />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Automation
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{
              borderColor: '#e0e0e0',
              color: '#666',
              px: 3,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<Save size={20} />}
            onClick={handleSave}
            disabled={!automationName.trim() || !subject.trim() || !defaultMessage.trim()}
            sx={{
              bgcolor: '#23c6c8',
              '&:hover': { bgcolor: '#1fb3b5' },
              '&:disabled': { bgcolor: 'grey.300' },
              px: 3,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Save
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Left Side - Automation Form */}
        <Box sx={{ flex: 2, minWidth: 0 }}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Automation Details
            </Typography>
            
            {/* Automation Name */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Automation name *
              </Typography>
              <TextField
                fullWidth
                value={automationName}
                onChange={(e) => setAutomationName(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
            </Box>

            {/* CC Emails */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    CC email 1
                  </Typography>
                  <Tooltip title="Add CC recipients">
                    <Info size={16} color="#666" />
                  </Tooltip>
                </Box>
                <TextField
                  fullWidth
                  placeholder="CC email"
                  value={ccEmail1}
                  onChange={(e) => setCcEmail1(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    CC email 2
                  </Typography>
                  <Tooltip title="Add CC recipients">
                    <Info size={16} color="#666" />
                  </Tooltip>
                </Box>
                <TextField
                  fullWidth
                  placeholder="CC email"
                  value={ccEmail2}
                  onChange={(e) => setCcEmail2(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Subject */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Subject *
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: '#e0e0e0',
                    color: '#666',
                    minWidth: 'auto',
                    px: 1,
                    py: 0.5
                  }}
                >
                  {'{}'}
                </Button>
              </Box>
              <TextField
                fullWidth
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
            </Box>

            {/* Default Message */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Default message *
                </Typography>
                <Tooltip title="Message content with variables">
                  <Info size={16} color="#666" />
                </Tooltip>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: '#e0e0e0',
                    color: '#666',
                    minWidth: 'auto',
                    px: 1,
                    py: 0.5
                  }}
                >
                  {'{}'}
                </Button>
              </Box>
              <TextField
                fullWidth
                multiline
                rows={12}
                value={defaultMessage}
                onChange={(e) => setDefaultMessage(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
            </Box>

            {/* Languages Section */}
            <Accordion sx={{ mb: 3 }}>
              <AccordionSummary expandIcon={<ChevronDown size={16} />}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Languages
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Event trigger *
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 100 }}>
                    <Select
                      value="At"
                      displayEmpty
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e0e0e0'
                        }
                      }}
                    >
                      <MenuItem value="At">At</MenuItem>
                      <MenuItem value="Before">Before</MenuItem>
                      <MenuItem value="After">After</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={eventTrigger}
                      onChange={(e) => setEventTrigger(e.target.value)}
                      displayEmpty
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e0e0e0'
                        }
                      }}
                    >
                      <MenuItem value="Reservation">Reservation</MenuItem>
                      <MenuItem value="Check-in">Check-in</MenuItem>
                      <MenuItem value="Check-out">Check-out</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Additional Conditions */}
            <Accordion sx={{ mb: 3 }}>
              <AccordionSummary expandIcon={<ChevronDown size={16} />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Additional conditions
                  </Typography>
                  <Tooltip title="Set additional conditions for this automation">
                    <Info size={16} color="#23c6c8" />
                  </Tooltip>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Channels */}
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                      Channels
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {['Booking.com', 'Airbnb', 'VRBO', 'Direct'].map((channel) => (
                        <Box
                          key={channel}
                          onClick={() => handleChannelToggle(channel)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            border: '1px solid #e0e0e0',
                            cursor: 'pointer',
                            bgcolor: selectedChannels.includes(channel) ? '#f5f5f5' : 'white',
                            '&:hover': {
                              bgcolor: selectedChannels.includes(channel) ? '#eeeeee' : '#f9f9f9'
                            }
                          }}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: channel === 'Booking.com' ? '#003580' : 
                                      channel === 'Airbnb' ? '#FF5A5F' : 
                                      channel === 'VRBO' ? '#00A699' : '#666'
                            }}
                          />
                          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                            {channel}
                          </Typography>
                          {selectedChannels.includes(channel) && (
                            <IconButton size="small" sx={{ p: 0.5, ml: 0.5 }}>
                              <ArrowLeft size={12} />
                            </IconButton>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Listings */}
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                      Listings
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <TextField
                        placeholder="Type to search listings"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                          flex: 1,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                      <Button
                        variant="text"
                        onClick={() => setShowSelectedOnly(!showSelectedOnly)}
                        sx={{
                          color: showSelectedOnly ? '#23c6c8' : '#666',
                          textTransform: 'none'
                        }}
                      >
                        Show {listings.filter(l => l.selected).length} selected only
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleSelectAll}
                        sx={{
                          bgcolor: '#23c6c8',
                          '&:hover': { bgcolor: '#1fb3b5' },
                          borderRadius: 2
                        }}
                      >
                        Select all
                      </Button>
                    </Box>
                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(2, 1fr)', 
                      gap: 2,
                      maxHeight: 300,
                      overflowY: 'auto'
                    }}>
                      {filteredListings.map((listing) => (
                        <Paper
                          key={listing.id}
                          sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            cursor: 'pointer',
                            border: '1px solid #e0e0e0',
                            borderRadius: 2,
                            bgcolor: listing.selected ? '#e3f2fd' : 'white',
                            '&:hover': {
                              borderColor: '#23c6c8',
                              boxShadow: '0 2px 8px rgba(35, 198, 200, 0.1)'
                            }
                          }}
                          onClick={() => handleListingSelect(listing.id)}
                        >
                          <Box
                            sx={{
                              width: 60,
                              height: 40,
                              borderRadius: 1,
                              backgroundImage: `url('${listing.image}')`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              flexShrink: 0
                            }}
                          />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                              {listing.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {listing.id}
                            </Typography>
                          </Box>
                          <Checkbox
                            checked={listing.selected}
                            onChange={() => handleListingSelect(listing.id)}
                            sx={{ flexShrink: 0 }}
                          />
                        </Paper>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Card>
        </Box>

        {/* Right Side - Example Templates */}
        <Box sx={{ flex: 1, minWidth: 350, maxWidth: 400 }}>
          <Card sx={{ p: 3, position: 'sticky', top: 20, height: 'fit-content' }}>
            <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
              You can choose existing template as an example.
            </Typography>
            
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ChevronDown size={16} />}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Choose one of example templates
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {exampleTemplates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      onClick={() => {
                        // Set template content based on selection
                        if (template === 'Thank you for booking') {
                          setAutomationName('Reservation Confirmation');
                          setSubject('Thank you for your reservation! 🎉');
                          setDefaultMessage(`Hello {{guest_first_name}},

Thank you for choosing to stay at our {{listing_name}}! We're excited to host you and will do our best to make your stay unforgettable.

Best regards,
Your Host`);
                        } else if (template === 'Before you arrive') {
                          setAutomationName('Pre-arrival Instructions');
                          setSubject('Important information before your arrival');
                          setDefaultMessage(`Hello {{guest_first_name}},

Your stay at {{listing_name}} is approaching! Here are some important details:

- Check-in time: {{checkin_time}}
- Check-in location: {{checkin_location}}
- Key collection: {{key_instructions}}

If you have any questions, please don't hesitate to contact us.

Best regards,
Your Host`);
                        } else if (template === 'Welcome message') {
                          setAutomationName('Welcome Message');
                          setSubject('Welcome to your stay!');
                          setDefaultMessage(`Hello {{guest_first_name}},

Welcome to {{listing_name}}! We hope you have a wonderful stay.

Here are some quick tips:
- WiFi password: {{wifi_password}}
- Emergency contact: {{emergency_contact}}
- House rules: Please be respectful of the property and neighbors

Enjoy your stay!

Best regards,
Your Host`);
                        } else if (template === 'Before you leave') {
                          setAutomationName('Check-out Reminder');
                          setSubject('Check-out tomorrow');
                          setDefaultMessage(`Hello {{guest_first_name}},

Your check-out is tomorrow at {{checkout_time}}. Please remember to:

- Leave the keys at {{key_return_location}}
- Take all your belongings
- Leave the property in good condition

Thank you for staying with us!

Best regards,
Your Host`);
                        } else if (template === 'Leave a review') {
                          setAutomationName('Review Request');
                          setSubject('How was your stay?');
                          setDefaultMessage(`Hello {{guest_first_name}},

Thank you for staying at {{listing_name}}! We hope you had a wonderful time.

We would greatly appreciate it if you could take a moment to leave a review about your experience. Your feedback helps us improve and helps future guests make informed decisions.

You can leave a review here: {{review_url}}

Thank you again for choosing to stay with us!

Best regards,
Your Host`);
                        }
                      }}
                      sx={{
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        borderColor: '#e0e0e0',
                        color: '#666',
                        mb: 1,
                        '&:hover': {
                          borderColor: '#23c6c8',
                          color: '#23c6c8'
                        }
                      }}
                    >
                      {template}
                    </Button>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Card>
        </Box>
      </Box>

      {/* Floating Help Widget */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000
        }}
      >
        <Paper
          sx={{
            p: 2,
            mb: 1,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Typography variant="body2">Hi. Need any help?</Typography>
          <IconButton size="small">
            <ArrowLeft size={16} />
          </IconButton>
        </Paper>
        <Box
          sx={{
            width: 50,
            height: 50,
            bgcolor: '#ff6b35',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            3
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              top: -5,
              right: -5,
              width: 20,
              height: 20,
              bgcolor: '#ff0000',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="caption" sx={{ color: 'white', fontSize: '10px' }}>
              3
            </Typography>
          </Box>
        </Box>
      </Box>
    </DashboardContent>
  );
}
