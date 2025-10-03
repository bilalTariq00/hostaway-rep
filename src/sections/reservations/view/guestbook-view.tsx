import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
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

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setHasReservation(false);
    setAgreeToMarketing(false);
  };

  const filteredGuests = mockGuests.filter(guest => {
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
            <Button variant="contained">
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
    </DashboardContent>
  );
}
