import React, { useState } from 'react';
import { Plus, Check, Search } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for listings
const mockListings = [
  {
    id: 1,
    title: 'Villa Del Sol - Luxury Beachfront',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    selected: true,
  },
  {
    id: 2,
    title: 'Mountain Cabin Retreat',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    selected: false,
  },
  {
    id: 3,
    title: 'Downtown Apartment Suite',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    selected: true,
  },
  {
    id: 4,
    title: 'Cozy Studio in Arts District',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    selected: false,
  },
  {
    id: 5,
    title: 'Historic Townhouse',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    selected: true,
  },
  {
    id: 6,
    title: 'Modern Loft with City Views',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
    selected: false,
  },
];

export function ListingsView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('listings');
  const [autoAddListings, setAutoAddListings] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listings, setListings] = useState(mockListings);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'listings') {
      router.push(`/booking-engine/${newValue}`);
    }
  };

  const handleListingToggle = (id: number) => {
    setListings(prev => prev.map(listing => 
      listing.id === id ? { ...listing, selected: !listing.selected } : listing
    ));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 20;
  const totalPages = Math.ceil(listings.length / itemsPerPage);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Booking Engine
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Your Webpage is published on Domusferiae.holdayfuture.com
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value="1" displayEmpty>
              <MenuItem value="1">Version 1</MenuItem>
              <MenuItem value="2">Version 2</MenuItem>
              <MenuItem value="3">Version 3</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Tabs */}
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Design" value="design" />
          <Tab label="Listings" value="listings" />
          <Tab label="Pages" value="pages" />
          <Tab label="Settings" value="settings" />
          <Tab label="Translation" value="translations" />
        </Tabs>
      </Box>

      {/* Search Listings Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Search listings for your website
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={autoAddListings}
                onChange={(e) => setAutoAddListings(e.target.checked)}
              />
            }
            label="Add automatically new listing"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search listings..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Select Tags</InputLabel>
            <Select
              multiple
              value={selectedTags}
              onChange={(e) => setSelectedTags(e.target.value as string[])}
              label="Select Tags"
            >
              <MenuItem value="beach">Beach</MenuItem>
              <MenuItem value="mountain">Mountain</MenuItem>
              <MenuItem value="city">City</MenuItem>
              <MenuItem value="luxury">Luxury</MenuItem>
              <MenuItem value="budget">Budget</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Listings Grid */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
          {listings.map((listing) => (
            <Card key={listing.id} sx={{ position: 'relative', overflow: 'hidden' }}>
              <Box
                sx={{
                  height: 200,
                  backgroundImage: `url(${listing.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: 'rgba(0,0,0,0.6)',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleListingToggle(listing.id)}
                >
                  {listing.selected ? (
                    <Check size={16} color="white" />
                  ) : (
                    <Plus size={16} color="white" />
                  )}
                </Box>
              </Box>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {listing.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="Beach" size="small" color="primary" />
                  <Chip label="Luxury" size="small" color="secondary" />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color="primary"
        />
      </Box>

      {/* Footer Info */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing 20 listings per page
        </Typography>
      </Box>
    </DashboardContent>
  );
}
