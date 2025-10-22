import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tv,
  Eye,
  Edit,
  Wind,
  Wifi,
  Flame,
  Heart,
  Share,
  Waves,
  Camera,
  Coffee,
  Trash2,
  Dumbbell,
  ArrowLeft,
  Cigarette,
  CheckCircle,
  PartyPopper,
} from 'lucide-react';

import {
  Box,
  Card,
  Chip,
  Avatar,
  Button,
  Dialog,
  IconButton,
  Typography,
  CardContent,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

// Mock data for the listing
const mockListingDetail = {
  id: 1,
  propertyName: 'La Dimora Del Cecchino (200204)',
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  propertyType: 'Entire home/apt',
  maxGuests: 6,
  bedrooms: 3,
  beds: 3,
  bathrooms: 2,
  checkIn: '15:00',
  checkOut: '10:00',
  availability: '365 days',
  freeCancellation: true,
  amenities: [
    'Wifi',
    'TV',
    'Kitchen',
    'Heating',
    'Air conditioning',
    'Washer',
    'Dryer',
    'Free parking on premises',
    'Pool',
    'Hot tub',
    'Gym',
    'Indoor fireplace',
    'Smoking allowed',
    'Pets allowed',
    'Events allowed',
  ],
  basePrice: '€100.00',
  longTermDiscounts: 'No discounts',
  additionalFees: 'No additional fees',
  address: 'Via del Cecchino, 01010 Capodimonte VT, Italy',
  directions: 'No directions',
  reviews: 'No reviews yet',
  cancellationPolicy: 'Flexible',
  houseRules: 'No house rules',
  guestRequirements: 'No guest requirements',
  instantBooking: false,
  minimumStay: '1 night',
  maximumStay: '30 nights',
  payoutMethod: 'Bank transfer',
  payoutCurrency: 'EUR',
  taxes: 'No taxes',
  legalInformation: 'No legal information',
  translations: 'No translations',
  photos: 30,
};

export default function ListingDetailPage() {
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState('');

  const handleBack = () => {
    navigate('/listings');
  };

  const handleEdit = (section: string) => {
    setEditingSection(section);
    setEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setEditModalOpen(false);
    setEditingSection('');
  };

  const renderSectionContent = (title: string, content: any, hasEdit = true) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">{title}</Typography>
          {hasEdit && (
            <Button variant="outlined" size="small" onClick={() => handleEdit(title.toLowerCase())}>
              Edit
            </Button>
          )}
        </Box>
        {content}
      </CardContent>
    </Card>
  );

  const renderAmenities = () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {mockListingDetail.amenities.map((amenity, index) => (
        <Chip
          key={index}
          label={amenity}
          variant="outlined"
          size="small"
          icon={
            amenity === 'Wifi' ? (
              <Wifi size={16} />
            ) : amenity === 'TV' ? (
              <Tv size={16} />
            ) : amenity === 'Kitchen' ? (
              <Coffee size={16} />
            ) : amenity === 'Heating' ? (
              <Flame size={16} />
            ) : amenity === 'Air conditioning' ? (
              <Wind size={16} />
            ) : amenity === 'Pool' ? (
              <Waves size={16} />
            ) : amenity === 'Gym' ? (
              <Dumbbell size={16} />
            ) : amenity === 'Smoking allowed' ? (
              <Cigarette size={16} />
            ) : amenity === 'Pets allowed' ? (
              <Heart size={16} />
            ) : amenity === 'Events allowed' ? (
              <PartyPopper size={16} />
            ) : (
              <CheckCircle size={16} />
            )
          }
        />
      ))}
    </Box>
  );

  const renderPricingSection = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="body1">Base price: {mockListingDetail.basePrice}</Typography>
        <Box>
          <Button size="small" variant="outlined" sx={{ mr: 1 }}>
            Edit
          </Button>
          <Button size="small" variant="outlined" sx={{ mr: 1 }}>
            View
          </Button>
          <Button size="small" color="error" variant="outlined">
            Delete
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="body1">
          Long term discounts: {mockListingDetail.longTermDiscounts}
        </Typography>
        <Box>
          <Button size="small" variant="outlined" sx={{ mr: 1 }}>
            Edit
          </Button>
          <Button size="small" variant="outlined" sx={{ mr: 1 }}>
            View
          </Button>
          <Button size="small" color="error" variant="outlined">
            Delete
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1">Additional fees: {mockListingDetail.additionalFees}</Typography>
        <Box>
          <Button size="small" variant="outlined" sx={{ mr: 1 }}>
            Edit
          </Button>
          <Button size="small" variant="outlined" sx={{ mr: 1 }}>
            View
          </Button>
          <Button size="small" color="error" variant="outlined">
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowLeft size={24} />
        </IconButton>
        <Typography variant="h4">Listing Details</Typography>
      </Box>

      {/* Profile Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <Avatar
              src={mockListingDetail.image}
              alt={mockListingDetail.propertyName}
              sx={{ width: 80, height: 80 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {mockListingDetail.propertyName}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" startIcon={<Eye size={16} />}>
                  View listing
                </Button>
                <Button variant="outlined" startIcon={<Share size={16} />}>
                  Share
                </Button>
                <Button variant="outlined" startIcon={<Edit size={16} />}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" startIcon={<Trash2 size={16} />}>
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>

          <Typography variant="h6" sx={{ mb: 2 }}>
            About this listing
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {mockListingDetail.description}
          </Typography>
        </CardContent>
      </Card>

      {/* Main Content Sections */}
      {renderSectionContent(
        'The space',
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Property type: {mockListingDetail.propertyType}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Max guests: {mockListingDetail.maxGuests}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Bedrooms: {mockListingDetail.bedrooms}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Beds: {mockListingDetail.beds}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Bathrooms: {mockListingDetail.bathrooms}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Check-in: {mockListingDetail.checkIn}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Check-out: {mockListingDetail.checkOut}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Availability: {mockListingDetail.availability}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">
              Free cancellation: {mockListingDetail.freeCancellation ? 'Yes' : 'No'}
            </Typography>
          </Box>
        </Box>
      )}

      {renderSectionContent('Amenities', renderAmenities())}

      {renderSectionContent('Pricing', renderPricingSection())}

      {renderSectionContent(
        'Availability',
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            All days are available
          </Typography>
          <Typography variant="body1">Blocked dates</Typography>
        </Box>
      )}

      {renderSectionContent(
        'Photos',
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">{mockListingDetail.photos} photos</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ width: 60, height: 40, bgcolor: 'grey.200', borderRadius: 1 }} />
            <Box sx={{ width: 60, height: 40, bgcolor: 'grey.200', borderRadius: 1 }} />
            <Box sx={{ width: 60, height: 40, bgcolor: 'grey.200', borderRadius: 1 }} />
          </Box>
        </Box>
      )}

      {renderSectionContent(
        'Location',
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Address: {mockListingDetail.address}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Directions: {mockListingDetail.directions}</Typography>
          </Box>
        </Box>
      )}

      {renderSectionContent(
        'Reviews',
        <Typography variant="body1">{mockListingDetail.reviews}</Typography>
      )}

      {renderSectionContent(
        'Policies',
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">
              Cancellation policy: {mockListingDetail.cancellationPolicy}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">House rules: {mockListingDetail.houseRules}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">
              Guest requirements: {mockListingDetail.guestRequirements}
            </Typography>
          </Box>
        </Box>
      )}

      {renderSectionContent(
        'Booking settings',
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">
              Instant booking: {mockListingDetail.instantBooking ? 'On' : 'Off'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Minimum stay: {mockListingDetail.minimumStay}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Maximum stay: {mockListingDetail.maximumStay}</Typography>
          </Box>
        </Box>
      )}

      {renderSectionContent(
        'Payout settings',
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Payout method: {mockListingDetail.payoutMethod}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">
              Payout currency: {mockListingDetail.payoutCurrency}
            </Typography>
          </Box>
        </Box>
      )}

      {renderSectionContent(
        'Cancellation policy',
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {mockListingDetail.cancellationPolicy}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cancel up to 24 hours before check-in for a full refund.
          </Typography>
        </Box>
      )}

      {renderSectionContent(
        'House rules',
        <Typography variant="body1">{mockListingDetail.houseRules}</Typography>
      )}

      {renderSectionContent(
        'Guest requirements',
        <Typography variant="body1">{mockListingDetail.guestRequirements}</Typography>
      )}

      {renderSectionContent(
        'Taxes',
        <Typography variant="body1">{mockListingDetail.taxes}</Typography>
      )}

      {renderSectionContent(
        'Legal information',
        <Typography variant="body1">{mockListingDetail.legalInformation}</Typography>
      )}

      {renderSectionContent(
        'Translation',
        <Typography variant="body1">{mockListingDetail.translations}</Typography>
      )}

      {/* Map Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Map
          </Typography>
          <Box
            sx={{
              height: 300,
              bgcolor: 'grey.200',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Map View
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Photo Gallery */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Photo Gallery
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Array.from({ length: 30 }, (_, i) => (
              <Box
                key={i}
                sx={{
                  width: '120px',
                  height: 120,
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Camera size={24} color="#666" />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleCloseEdit} maxWidth="md" fullWidth>
        <DialogTitle>Edit {editingSection}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Edit form for {editingSection} would go here...</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
