import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for auto reviews matching the image
const mockAutoReviews = [
  {
    id: 1,
    name: 'recensioni',
    event: '2 days after checkout',
    listings: ['La Dimora Del Cavaliere', 'Navigli', 'Polacchi42'],
    creationDate: '2024-09-14 11:21:18',
  },
  {
    id: 2,
    name: 'welcome feedback',
    event: '1 day after check-in',
    listings: ['Navigli', 'Polacchi42'],
    creationDate: '2024-09-15 09:30:45',
  },
  {
    id: 3,
    name: 'mid-stay review',
    event: '3 days after check-in',
    listings: ['La Dimora Del Cavaliere', 'Navigli', 'Polacchi42', 'Superattico'],
    creationDate: '2024-09-16 14:15:22',
  },
  {
    id: 4,
    name: 'checkout reminder',
    event: '1 day before checkout',
    listings: ['Navigli', 'Polacchi42'],
    creationDate: '2024-09-17 10:45:33',
  },
  {
    id: 5,
    name: 'post-stay review',
    event: '1 day after checkout',
    listings: ['La Dimora Del Cavaliere', 'Navigli', 'Polacchi42', 'Superattico', 'Villa Del Sol'],
    creationDate: '2024-09-18 16:20:11',
  },
];

export function AutoReviewsView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/reviews/manage-reviews');
    if (newValue === 2) router.push('/reviews/templates');
  };

  const filteredAutoReviews = mockAutoReviews.filter(review =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Reviews
        </Typography>

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
          <Tab label="Manage Reviews" />
          <Tab label="Auto Reviews" />
          <Tab label="Review Templates" />
        </Tabs>
      </Box>

      {/* Auto Review Names Title */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Auto Review Names
        </Typography>
        
        {/* Search Bar */}
        <TextField
          placeholder="Search by auto reviews name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 400 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={"eva:search-fill" as any} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Auto Reviews Cards */}
      <Grid container spacing={3}>
        {filteredAutoReviews.map((autoReview) => (
          <Grid key={autoReview.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'grey.50',
                border: 1,
                borderColor: 'grey.200',
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                {/* Name at the top */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  {autoReview.name}
                </Typography>

                {/* Event */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Event: {autoReview.event}
                  </Typography>
                </Box>

                {/* Listings */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                    Listings:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {autoReview.listings.slice(0, 3).map((listing, index) => (
                      <Typography 
                        key={index} 
                        variant="body2" 
                        sx={{ 
                          color: 'primary.main',
                          fontWeight: 500,
                        }}
                      >
                        {listing}
                        {index < Math.min(autoReview.listings.length, 3) - 1 && ', '}
                      </Typography>
                    ))}
                    {autoReview.listings.length > 3 && (
                      <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
                        More+{autoReview.listings.length - 3}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Creation Date */}
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Creation date: {autoReview.creationDate}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredAutoReviews.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            No auto reviews found
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first auto review to get started'}
          </Typography>
          <Button variant="contained">
            Create Auto Review
          </Button>
        </Box>
      )}
    </DashboardContent>
  );
}
