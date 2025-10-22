import { useState } from 'react';
import { Save, Info, Code, ArrowLeft, ChevronDown } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for listings
const mockListings = [
  {
    id: 305034,
    name: 'La Dimora Del Cavaliere',
    image:
      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-1.webp',
    selected: false,
  },
  {
    id: 305035,
    name: 'Navigli',
    image:
      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-2.webp',
    selected: false,
  },
  {
    id: 305225,
    name: 'Polacchi42',
    image:
      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-3.webp',
    selected: false,
  },
  {
    id: 305421,
    name: 'Superattico - Via Del Corso 43',
    image:
      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-4.webp',
    selected: false,
  },
  {
    id: 306532,
    name: 'Montecatini Terme',
    image:
      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-5.webp',
    selected: false,
  },
  {
    id: 308582,
    name: 'Monteverde - Quattroventi',
    image:
      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-6.webp',
    selected: false,
  },
  {
    id: 310867,
    name: 'La Storta',
    image:
      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-1.webp',
    selected: false,
  },
  {
    id: 317154,
    name: '[5 Min From Trastevere] Chic Apt',
    image:
      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-2.webp',
    selected: false,
  },
  {
    id: 332386,
    name: 'Via Poggio Tulliano',
    image:
      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-3.webp',
    selected: false,
  },
  {
    id: 345603,
    name: 'Via Dei Marruccini | San Lorenzo',
    image:
      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-4.webp',
    selected: false,
  },
  {
    id: 363365,
    name: 'Via di Acqua Bullicante 113',
    image:
      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-5.webp',
    selected: false,
  },
  {
    id: 363366,
    name: 'Via Matera 23A -',
    image:
      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-6.webp',
    selected: false,
  },
];

export function TemplateCreateView() {
  const router = useRouter();
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templateColor, setTemplateColor] = useState('#23c6c8');
  const [message, setMessage] = useState('');
  const [groupTemplate, setGroupTemplate] = useState('');
  const [channel, setChannel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const [listings, setListings] = useState(mockListings);
  const [selectAll, setSelectAll] = useState(false);
  const [autoApply, setAutoApply] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleListingSelect = (listingId: number) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === listingId ? { ...listing, selected: !listing.selected } : listing
      )
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setListings((prev) => prev.map((listing) => ({ ...listing, selected: !selectAll })));
  };

  const handleSave = () => {
    // Create new template object
    const newTemplate = {
      id: Date.now(), // Simple ID generation
      name: templateName,
      description: templateDescription,
      color: templateColor,
      message,
      group: groupTemplate || 'General',
      channel: channel || 'All',
      listings: listings.filter((l) => l.selected).length,
      channels: channel ? [channel] : ['Airbnb', 'Booking.com'],
      selectedListings: listings.filter((l) => l.selected),
    };

    // Store in localStorage for persistence (in real app, this would be an API call)
    const existingTemplates = JSON.parse(localStorage.getItem('messageTemplates') || '[]');
    const updatedTemplates = [...existingTemplates, newTemplate];
    localStorage.setItem('messageTemplates', JSON.stringify(updatedTemplates));

    // Navigate back to templates page
    router.push('/inbox/templates');
  };

  const handleBack = () => {
    router.push('/inbox/templates');
  };

  const filteredListings = listings.filter((listing) =>
    listing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton sx={{ p: 1 }} onClick={handleBack}>
            <ArrowLeft size={20} />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Template
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Save size={20} />}
          onClick={handleSave}
          disabled={!templateName.trim() || !message.trim()}
          sx={{
            bgcolor: '#23c6c8',
            '&:hover': { bgcolor: '#1fb3b5' },
            '&:disabled': { bgcolor: 'grey.300' },
            px: 3,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          Save
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Left Side - Template Form */}
        <Box sx={{ flex: 1, maxWidth: 600 }}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Template Details
            </Typography>

            {/* Template Name */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Template name *
              </Typography>
              <TextField
                fullWidth
                placeholder="Template name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {/* Template Description */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Template description
              </Typography>
              <TextField
                fullWidth
                placeholder="Template description"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {/* Template Color */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Template color:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: templateColor,
                    border: '2px solid #e0e0e0',
                    cursor: 'pointer',
                  }}
                />
                <TextField
                  value={templateColor}
                  onChange={(e) => setTemplateColor(e.target.value)}
                  sx={{
                    width: 120,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Message */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Message *
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'grey.100',
                    '&:hover': { bgcolor: 'grey.200' },
                  }}
                >
                  <Code size={16} />
                </IconButton>
              </Box>
            </Box>

            {/* Link to Group Template */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Link to group template
                </Typography>
                <Tooltip title="Link this template to a group template">
                  <Info size={16} color="#666" />
                </Tooltip>
              </Box>
              <FormControl fullWidth>
                <Select
                  value={groupTemplate}
                  onChange={(e) => setGroupTemplate(e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Link to group template</em>
                  </MenuItem>
                  <MenuItem value="welcome">Welcome Template</MenuItem>
                  <MenuItem value="checkin">Check-in Template</MenuItem>
                  <MenuItem value="checkout">Check-out Template</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Channel */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Channel
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Channel</em>
                  </MenuItem>
                  <MenuItem value="airbnb">Airbnb</MenuItem>
                  <MenuItem value="booking">Booking.com</MenuItem>
                  <MenuItem value="direct">Direct Booking</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Card>
        </Box>

        {/* Right Side - Listings */}
        <Box sx={{ flex: 1, maxWidth: 600 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Listings
            </Typography>

            {/* Search and Filter */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                placeholder="Type to search listings"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <FormControl sx={{ minWidth: 150 }}>
                <Select
                  value={selectedTags}
                  onChange={(e) => setSelectedTags(e.target.value)}
                  displayEmpty
                  startAdornment={
                    <InputAdornment position="start">
                      <ChevronDown size={16} />
                    </InputAdornment>
                  }
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select tags</em>
                  </MenuItem>
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="villa">Villa</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleSelectAll}
                sx={{
                  bgcolor: '#23c6c8',
                  '&:hover': { bgcolor: '#1fb3b5' },
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Select all
              </Button>
            </Box>

            {/* Listings Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                mb: 3,
                maxHeight: 400,
                overflowY: 'auto',
              }}
            >
              {currentListings.map((listing) => (
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
                    '&:hover': {
                      borderColor: '#23c6c8',
                      boxShadow: '0 2px 8px rgba(35, 198, 200, 0.1)',
                    },
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
                      flexShrink: 0,
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

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
                color="primary"
                size="small"
              />
            </Box>

            {/* Auto Apply Checkbox */}
            <FormControlLabel
              control={
                <Checkbox checked={autoApply} onChange={(e) => setAutoApply(e.target.checked)} />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">
                    Automatically apply template to new listings
                  </Typography>
                  <Tooltip title="This will automatically apply this template to any new listings you add">
                    <Info size={16} color="#666" />
                  </Tooltip>
                </Box>
              }
            />
          </Card>
        </Box>
      </Box>

      {/* Floating Help Widget */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
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
            gap: 1,
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
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
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
              justifyContent: 'center',
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
