import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Edit,
  Mail,
  Star,
  Phone,
  MapPin,
  Trash2,
  Calendar,
  ArrowLeft,
} from 'lucide-react';

import {
  Box,
  Card,
  Chip,
  List,
  Avatar,
  Button,
  Dialog,
  ListItem,
  IconButton,
  Typography,
  CardContent,
  DialogTitle,
  ListItemText,
  ListItemIcon,
  DialogActions,
  DialogContent,
} from '@mui/material';

// Mock data for user details
const mockUserDetail = {
  id: 1,
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  avatar: '/assets/images/avatars/avatar_1.jpg',
  status: 'Active',
  joinDate: '2023-01-15',
  lastLogin: '2024-01-20',
  totalBookings: 12,
  totalSpent: '$2,450.00',
  rating: 4.8,
  address: {
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  },
  preferences: {
    language: 'English',
    currency: 'USD',
    notifications: true,
    marketing: false
  },
  recentBookings: [
    { id: 1, property: 'Luxury Apartment Downtown', date: '2024-01-15', amount: '$250.00', status: 'Completed' },
    { id: 2, property: 'Beach House Villa', date: '2024-01-10', amount: '$450.00', status: 'Completed' },
    { id: 3, property: 'Mountain Cabin Retreat', date: '2024-01-05', amount: '$180.00', status: 'Upcoming' }
  ],
  notes: 'VIP customer with excellent payment history. Prefers properties with parking and WiFi.'
};

export default function UserDetailView() {
  const { guestName } = useParams();
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleBack = () => {
    navigate('/reservations');
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Handle delete logic here
    setDeleteDialogOpen(false);
    navigate('/reservations');
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            variant="text" 
            startIcon={<ArrowLeft size={20} />}
            onClick={handleBack}
            sx={{ color: 'text.secondary' }}
          >
            Back to Reservations
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Guest Profile: {decodeURIComponent(guestName || '')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button 
            variant="outlined" 
            startIcon={<Edit size={16} />}
            onClick={handleEdit}
          >
            Edit Guest
          </Button>
          <IconButton 
            color="error" 
            onClick={handleDelete}
          >
            <Trash2 size={20} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Guest Information Card */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '0 0 300px' }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Avatar
                    src={mockUserDetail.avatar}
                    sx={{ width: 80, height: 80, mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {mockUserDetail.name}
                  </Typography>
                  <Chip 
                    label={mockUserDetail.status} 
                    color="success" 
                    size="small" 
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Star size={16} color="#ffc107" />
                    <Typography variant="body2">
                      {mockUserDetail.rating}/5.0
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Member since {new Date(mockUserDetail.joinDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Contact Information */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Contact Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Mail size={20} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email" 
                      secondary={mockUserDetail.email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone size={20} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Phone" 
                      secondary={mockUserDetail.phone}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <MapPin size={20} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Address" 
                      secondary={`${mockUserDetail.address.street}, ${mockUserDetail.address.city}, ${mockUserDetail.address.state} ${mockUserDetail.address.zipCode}`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Booking Statistics */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Booking Statistics
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                    <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600 }}>
                      {mockUserDetail.totalBookings}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Bookings
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                    <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
                      {mockUserDetail.totalSpent}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Spent
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                    <Typography variant="h4" color="info.main" sx={{ fontWeight: 600 }}>
                      {mockUserDetail.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average Rating
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                    <Typography variant="h4" color="warning.main" sx={{ fontWeight: 600 }}>
                      {mockUserDetail.lastLogin}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last Login
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Recent Bookings */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Recent Bookings
            </Typography>
            <List>
              {mockUserDetail.recentBookings.map((booking, index) => (
                <ListItem key={booking.id} divider={index < mockUserDetail.recentBookings.length - 1}>
                  <ListItemIcon>
                    <Calendar size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={booking.property}
                    secondary={`${booking.date} • ${booking.amount} • ${booking.status}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Notes
            </Typography>
            <Typography variant="body1">
              {mockUserDetail.notes}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Guest Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Edit guest form would be implemented here with all the necessary fields.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEditClose}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Guest</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this guest? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
