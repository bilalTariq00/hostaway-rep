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

// Mock data for auto reviews
const mockAutoReviews = [
  {
    id: 1,
    name: 'Post-Checkout Review Request',
    event: 'Check-out',
    listing: 'Villa Del Sol',
    creationDate: '2024-01-15',
    description: 'Automatically sends review request after guest checkout',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Welcome Review Prompt',
    event: 'Check-in',
    listing: 'Navigli Apartment',
    creationDate: '2024-01-20',
    description: 'Sends review prompt during guest welcome process',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Mid-Stay Feedback',
    event: 'Mid-stay',
    listing: 'Polacchi42',
    creationDate: '2024-01-25',
    description: 'Requests feedback during the middle of guest stay',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Extended Stay Review',
    event: 'Extended Stay',
    listing: 'Superattico - Via Del C...',
    creationDate: '2024-02-01',
    description: 'Special review request for guests staying longer than 7 days',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Cancellation Review',
    event: 'Cancellation',
    listing: 'All Listings',
    creationDate: '2024-02-05',
    description: 'Sends review request for cancelled reservations',
    status: 'Draft',
  },
  {
    id: 6,
    name: 'Repeat Guest Review',
    event: 'Repeat Guest',
    listing: 'Villa Del Sol',
    creationDate: '2024-02-10',
    description: 'Customized review request for returning guests',
    status: 'Active',
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
                '&:hover': {
                  boxShadow: 3,
                },
                border: 1,
                borderColor: 'grey.200',
              }}
            >
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Name at the top */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {autoReview.name}
                </Typography>

                {/* Description */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flex: 1 }}>
                  {autoReview.description}
                </Typography>

                {/* Details */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Event:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {autoReview.event}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Listing:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {autoReview.listing}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Creation Date:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {autoReview.creationDate}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Status:
                    </Typography>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: autoReview.status === 'Active' ? 'success.lighter' : 
                                autoReview.status === 'Inactive' ? 'error.lighter' : 'warning.lighter',
                        color: autoReview.status === 'Active' ? 'success.darker' : 
                               autoReview.status === 'Inactive' ? 'error.darker' : 'warning.darker',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}
                    >
                      {autoReview.status}
                    </Box>
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                  <Button size="small" variant="outlined">
                    <Iconify icon={"eva:edit-fill" as any} sx={{ mr: 0.5 }} />
                    Edit
                  </Button>
                  <Button size="small" variant="outlined">
                    <Iconify icon={"eva:copy-fill" as any} sx={{ mr: 0.5 }} />
                    Copy
                  </Button>
                  <Button size="small" variant="outlined" color="error">
                    <Iconify icon={"eva:trash-2-fill" as any} sx={{ mr: 0.5 }} />
                    Delete
                  </Button>
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
