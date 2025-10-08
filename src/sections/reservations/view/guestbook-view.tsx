import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for guestbook
const mockGuests = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1 555-0123',
    idNumber: 'ID123456789',
    idPhoto: 'Uploaded',
    selfie: 'Uploaded',
    dateOfBirth: '1985-03-15',
    city: 'New York',
    country: 'United States',
    reservations: 3,
    relatedProperties: 'La Dimora Del Cavaliere',
    agreeToMarketing: true,
  },
  {
    id: 2,
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@email.com',
    phone: '+34 666-7890',
    idNumber: 'ES987654321',
    idPhoto: 'Uploaded',
    selfie: 'Pending',
    dateOfBirth: '1990-07-22',
    city: 'Madrid',
    country: 'Spain',
    reservations: 1,
    relatedProperties: 'Navigli',
    agreeToMarketing: false,
  },
  {
    id: 3,
    firstName: 'David',
    lastName: 'Johnson',
    email: 'david.johnson@email.com',
    phone: '+44 777-4567',
    idNumber: 'UK456789123',
    idPhoto: 'Pending',
    selfie: 'Uploaded',
    dateOfBirth: '1988-11-08',
    city: 'London',
    country: 'United Kingdom',
    reservations: 2,
    relatedProperties: 'Polacchi42',
    agreeToMarketing: true,
  },
];

export function GuestbookView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [hasReservation, setHasReservation] = useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState<number | null>(null);
  const [guests, setGuests] = useState(mockGuests);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    agreeToMarketing: false,
  });

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setHasReservation(false);
    setAgreeToMarketing(false);
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      country: '',
      agreeToMarketing: false,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      country: '',
      agreeToMarketing: false,
    });
  };

  const handleInputChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleCheckboxChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.checked,
    });
  };

  const handleSave = () => {
    if (isEditMode && editingId) {
      // Update existing guest
      setGuests(prev => prev.map(guest => 
        guest.id === editingId 
          ? { 
              ...guest, 
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              city: formData.city,
              country: formData.country,
              agreeToMarketing: formData.agreeToMarketing,
            }
          : guest
      ));
    } else {
      // Add new guest
      const newGuest = {
        id: Math.max(...guests.map(g => g.id), 0) + 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        idNumber: 'ID' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        idPhoto: 'Pending',
        selfie: 'Pending',
        dateOfBirth: '1990-01-01',
        city: formData.city,
        country: formData.country,
        reservations: 0,
        relatedProperties: 'La Dimora Del Cavaliere',
        agreeToMarketing: formData.agreeToMarketing,
      };
      setGuests(prev => [...prev, newGuest]);
    }
    handleCloseModal();
  };

  const handleEdit = (id: number) => {
    const guest = guests.find(g => g.id === id);
    if (guest) {
      setIsEditMode(true);
      setEditingId(id);
      setFormData({
        firstName: guest.firstName,
        lastName: guest.lastName,
        email: guest.email,
        phone: guest.phone,
        city: guest.city,
        country: guest.country,
        agreeToMarketing: guest.agreeToMarketing,
      });
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    setGuestToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (guestToDelete) {
      setGuests(prev => prev.filter(guest => guest.id !== guestToDelete));
      setDeleteDialogOpen(false);
      setGuestToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setGuestToDelete(null);
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !selectedCountry || guest.country === selectedCountry;
    const matchesReservation = !hasReservation || guest.reservations > 0;
    const matchesMarketing = !agreeToMarketing || guest.agreeToMarketing;

    return matchesSearch && matchesCountry && matchesReservation && matchesMarketing;
  });

  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGuests = filteredGuests.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Guestbook
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" onClick={handleOpenModal}>
              Add
            </Button>
            <Button variant="outlined" endIcon={<Iconify icon={"eva:arrow-down-fill" as any} />}>
              Download Report
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            size="small"
            placeholder="Search by guest name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          <TextField
            select
            size="small"
            placeholder="Select Country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            sx={{ minWidth: 150 }}
            SelectProps={{ native: true }}
          >
            <option value="">All Countries</option>
            <option value="United States">United States</option>
            <option value="Spain">Spain</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Italy">Italy</option>
            <option value="France">France</option>
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={hasReservation}
                onChange={(e) => setHasReservation(e.target.checked)}
              />
            }
            label="Has Reservation"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={agreeToMarketing}
                onChange={(e) => setAgreeToMarketing(e.target.checked)}
              />
            }
            label="Agree to Marketing Email"
          />
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Paper>

      {/* Guestbook Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>ID Number</TableCell>
                <TableCell>ID Photo</TableCell>
                <TableCell>Selfie</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Reservations</TableCell>
                <TableCell>Related Properties</TableCell>
                <TableCell>Agree to Marketing</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {guest.firstName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {guest.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {guest.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {guest.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {guest.idNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={guest.idPhoto}
                      size="small"
                      color={guest.idPhoto === 'Uploaded' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={guest.selfie}
                      size="small"
                      color={guest.selfie === 'Uploaded' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(guest.dateOfBirth).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {guest.city}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {guest.country}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {guest.reservations}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {guest.relatedProperties}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={guest.agreeToMarketing ? 'Yes' : 'No'}
                      size="small"
                      color={guest.agreeToMarketing ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton 
                        size="small"
                        onClick={() => handleEdit(guest.id)}
                        sx={{
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'primary.main',
                            bgcolor: 'primary.50'
                          }
                        }}
                      >
                        <Iconify icon="solar:pen-bold" width={16} />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDelete(guest.id)}
                        sx={{
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'error.main',
                            bgcolor: 'error.50'
                          }
                        }}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Show 20 per page
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      </Paper>

      {/* Add/Edit Guest Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {isEditMode ? 'Edit Guest' : 'Add new guest'}
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <Iconify icon="solar:trash-bin-trash-bold" width={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              fullWidth
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              size="small"
            />
            <TextField
              fullWidth
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              size="small"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              size="small"
            />
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              size="small"
            />
            <TextField
              fullWidth
              label="City"
              value={formData.city}
              onChange={handleInputChange('city')}
              size="small"
            />
            <Select
              fullWidth
              value={formData.country}
              onChange={handleInputChange('country')}
              displayEmpty
              size="small"
            >
              <MenuItem value="">Choose country</MenuItem>
              <MenuItem value="United States">United States</MenuItem>
              <MenuItem value="Spain">Spain</MenuItem>
              <MenuItem value="United Kingdom">United Kingdom</MenuItem>
              <MenuItem value="Italy">Italy</MenuItem>
              <MenuItem value="France">France</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
            </Select>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeToMarketing}
                  onChange={handleCheckboxChange('agreeToMarketing')}
                />
              }
              label="Agreed to marketing e-mails"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()}
          >
            {isEditMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Delete Guest
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this guest? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
