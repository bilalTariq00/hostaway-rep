
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for coupons
const mockCoupons = [
  {
    id: 1,
    name: 'Early Bird Discount',
    amount: '10%',
    lengthOfStay: '3+ nights',
    checkInDate: '2024-10-01',
    validity: '2024-12-31',
    maxUses: 100,
    currentUses: 25,
    listing: 'All Properties',
  },
  {
    id: 2,
    name: 'Weekend Special',
    amount: '€50',
    lengthOfStay: '2+ nights',
    checkInDate: '2024-11-01',
    validity: '2024-12-31',
    maxUses: 50,
    currentUses: 12,
    listing: 'La Dimora Del Cavaliere',
  },
  {
    id: 3,
    name: 'Long Stay Bonus',
    amount: '15%',
    lengthOfStay: '7+ nights',
    checkInDate: '2024-10-15',
    validity: '2025-01-31',
    maxUses: 200,
    currentUses: 45,
    listing: 'All Properties',
  },
  {
    id: 4,
    name: 'First Time Guest',
    amount: '€25',
    lengthOfStay: '1+ nights',
    checkInDate: '2024-09-01',
    validity: '2024-12-31',
    maxUses: 75,
    currentUses: 30,
    listing: 'Navigli',
  },
];

export function CouponsView() {

  const handleEdit = (id: number) => {
    console.log('Edit coupon:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete coupon:', id);
  };

  const handleDuplicate = (id: number) => {
    console.log('Duplicate coupon:', id);
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Coupons
          </Typography>
          <Button variant="contained">
            Add Coupon
          </Button>
        </Box>
      </Box>

      {/* Coupons Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Length of Stay</TableCell>
                <TableCell>Check-in Date</TableCell>
                <TableCell>Validity</TableCell>
                <TableCell>Max Uses</TableCell>
                <TableCell>Current Uses</TableCell>
                <TableCell>Listing</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {coupon.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'success.main' }}>
                      {coupon.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {coupon.lengthOfStay}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(coupon.checkInDate).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(coupon.validity).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {coupon.maxUses}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {coupon.currentUses}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {coupon.listing}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small" onClick={() => handleEdit(coupon.id)}>
                        <Iconify icon={"eva:edit-fill" as any} width={16} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDuplicate(coupon.id)}>
                        <Iconify icon={"eva:copy-fill" as any} width={16} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(coupon.id)}>
                        <Iconify icon={"eva:trash-2-fill" as any} width={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </DashboardContent>
  );
}
