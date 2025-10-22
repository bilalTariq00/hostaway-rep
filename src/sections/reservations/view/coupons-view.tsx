import { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for coupons
const mockCoupons = [
  {
    id: 1,
    name: 'MARION',
    amount: '25',
    amountType: 'Percentage',
    lengthOfStay: 'Minimum',
    lengthOfStayValue: '1',
    checkInFrom: '',
    checkInTo: '',
    validityFrom: '2025-04-22',
    validityTo: '2026-04-22',
    maxUses: '1',
    currentUses: 0,
    listings: '20 listings',
  },
  {
    id: 2,
    name: 'SHADY',
    amount: '150',
    amountType: 'Fixed',
    lengthOfStay: 'Minimum',
    lengthOfStayValue: '1',
    checkInFrom: '2025-02-03',
    checkInTo: '2025-02-08',
    validityFrom: '2024-12-20',
    validityTo: '2024-12-24',
    maxUses: '1',
    currentUses: 0,
    listings: '1 listing',
  },
  {
    id: 3,
    name: 'FINESETTIMANA',
    amount: '5',
    amountType: 'Fixed',
    lengthOfStay: 'Minimum',
    lengthOfStayValue: '1',
    checkInFrom: '2024-12-04',
    checkInTo: '2024-12-30',
    validityFrom: '2024-12-04',
    validityTo: '2024-12-31',
    maxUses: 'Unlimited',
    currentUses: 0,
    listings: 'All listings',
  },
];

export function CouponsView() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<number | null>(null);
  const [coupons, setCoupons] = useState(mockCoupons);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    amountType: 'Percentage',
    lengthOfStay: 'Minimum',
    lengthOfStayValue: '1',
    checkInFrom: '',
    checkInTo: '',
    validityFrom: '',
    validityTo: '',
    maxUses: 'Unlimited',
  });

  const handleOpenDrawer = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      name: '',
      amount: '',
      amountType: 'Percentage',
      lengthOfStay: 'Minimum',
      lengthOfStayValue: '1',
      checkInFrom: '',
      checkInTo: '',
      validityFrom: '',
      validityTo: '',
      maxUses: 'Unlimited',
    });
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      name: '',
      amount: '',
      amountType: 'Percentage',
      lengthOfStay: 'Minimum',
      lengthOfStayValue: '1',
      checkInFrom: '',
      checkInTo: '',
      validityFrom: '',
      validityTo: '',
      maxUses: 'Unlimited',
    });
  };

  const handleInputChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSave = () => {
    if (isEditMode && editingId) {
      // Update existing coupon
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === editingId
            ? {
                ...coupon,
                name: formData.name,
                amount: formData.amount,
                amountType: formData.amountType,
                lengthOfStay: formData.lengthOfStay,
                lengthOfStayValue: formData.lengthOfStayValue,
                checkInFrom: formData.checkInFrom,
                checkInTo: formData.checkInTo,
                validityFrom: formData.validityFrom,
                validityTo: formData.validityTo,
                maxUses: formData.maxUses,
              }
            : coupon
        )
      );
    } else {
      // Add new coupon
      const newCoupon = {
        id: Math.max(...coupons.map((c) => c.id), 0) + 1,
        name: formData.name,
        amount: formData.amount,
        amountType: formData.amountType,
        lengthOfStay: formData.lengthOfStay,
        lengthOfStayValue: formData.lengthOfStayValue,
        checkInFrom: formData.checkInFrom,
        checkInTo: formData.checkInTo,
        validityFrom: formData.validityFrom,
        validityTo: formData.validityTo,
        maxUses: formData.maxUses,
        currentUses: 0,
        listings: 'All listings',
      };
      setCoupons((prev) => [...prev, newCoupon]);
    }
    handleCloseDrawer();
  };

  const handleEdit = (id: number) => {
    const coupon = coupons.find((c) => c.id === id);
    if (coupon) {
      setIsEditMode(true);
      setEditingId(id);
      setFormData({
        name: coupon.name,
        amount: coupon.amount,
        amountType: coupon.amountType,
        lengthOfStay: coupon.lengthOfStay,
        lengthOfStayValue: coupon.lengthOfStayValue,
        checkInFrom: coupon.checkInFrom,
        checkInTo: coupon.checkInTo,
        validityFrom: coupon.validityFrom,
        validityTo: coupon.validityTo,
        maxUses: coupon.maxUses,
      });
      setIsDrawerOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    setCouponToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (couponToDelete) {
      setCoupons((prev) => prev.filter((coupon) => coupon.id !== couponToDelete));
      setDeleteDialogOpen(false);
      setCouponToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setCouponToDelete(null);
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Coupons
          </Typography>
          <Button variant="contained" onClick={handleOpenDrawer}>
            + Add coupon
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
                <TableCell>Length of stay</TableCell>
                <TableCell>Check-in dates</TableCell>
                <TableCell>Validity</TableCell>
                <TableCell>Max uses</TableCell>
                <TableCell>Current uses</TableCell>
                <TableCell>Listings</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {coupon.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'success.main' }}>
                      {coupon.amount}
                      {coupon.amountType === 'Percentage' ? '%' : ''}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {coupon.lengthOfStay} {coupon.lengthOfStayValue} night
                      {coupon.lengthOfStayValue !== '1' ? 's' : ''}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {coupon.checkInFrom && coupon.checkInTo
                        ? `From: ${coupon.checkInFrom} To: ${coupon.checkInTo}`
                        : 'No dates selected'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {coupon.validityFrom && coupon.validityTo
                        ? `From: ${coupon.validityFrom} To: ${coupon.validityTo}`
                        : 'No dates selected'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{coupon.maxUses}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {coupon.currentUses}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{coupon.listings}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(coupon.id)}
                        sx={{
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'primary.main',
                            bgcolor: 'primary.50',
                          },
                        }}
                      >
                        <Iconify icon="solar:pen-bold" width={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(coupon.id)}
                        sx={{
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'error.main',
                            bgcolor: 'error.50',
                          },
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

      {/* Right Sidebar Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 400,
            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {isEditMode ? 'Edit coupon' : 'Add coupon'}
            </Typography>
            <IconButton onClick={handleCloseDrawer} size="small">
              <Iconify icon="solar:trash-bin-trash-bold" width={20} />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Form */}
          <Box sx={{ flex: 1 }}>
            {/* Name */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Name
                </Typography>
                <Typography component="span" sx={{ color: 'error.main', ml: 0.5 }}>
                  *
                </Typography>
                <Tooltip title="Enter a unique name for your coupon">
                  <IconButton size="small" sx={{ ml: 0.5, p: 0.5 }}>
                    <Iconify icon="solar:eye-bold" width={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <TextField
                fullWidth
                placeholder="NAME"
                value={formData.name}
                onChange={handleInputChange('name')}
                size="small"
                required
              />
            </Box>

            {/* Amount and Type */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Amount
                </Typography>
                <Typography component="span" sx={{ color: 'error.main', ml: 0.5 }}>
                  *
                </Typography>
                <Tooltip title="Enter the discount amount">
                  <IconButton size="small" sx={{ ml: 0.5, p: 0.5 }}>
                    <Iconify icon="solar:eye-bold" width={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleInputChange('amount')}
                  size="small"
                  required
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={formData.amountType}
                    onChange={handleInputChange('amountType')}
                    displayEmpty
                  >
                    <MenuItem value="Percentage">Percentage</MenuItem>
                    <MenuItem value="Fixed">Fixed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Length of stay */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Length of stay
                </Typography>
                <Typography component="span" sx={{ color: 'error.main', ml: 0.5 }}>
                  *
                </Typography>
                <Tooltip title="Set minimum stay requirements">
                  <IconButton size="small" sx={{ ml: 0.5, p: 0.5 }}>
                    <Iconify icon="solar:eye-bold" width={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 100 }}>
                  <Select
                    value={formData.lengthOfStay}
                    onChange={handleInputChange('lengthOfStay')}
                    displayEmpty
                  >
                    <MenuItem value="Minimum">Minimum</MenuItem>
                    <MenuItem value="Maximum">Maximum</MenuItem>
                    <MenuItem value="Exact">Exact</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  size="small"
                  value={formData.lengthOfStayValue}
                  onChange={handleInputChange('lengthOfStayValue')}
                  type="number"
                  sx={{ width: 80 }}
                />
              </Box>
            </Box>

            {/* Max uses */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Max uses
                </Typography>
                <Tooltip title="Set maximum usage limit">
                  <IconButton size="small" sx={{ ml: 0.5, p: 0.5 }}>
                    <Iconify icon="solar:eye-bold" width={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <TextField
                fullWidth
                placeholder="Unlimited uses"
                value={formData.maxUses}
                onChange={handleInputChange('maxUses')}
                size="small"
              />
            </Box>

            {/* Check-in dates */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Check-in dates
                </Typography>
                <Tooltip title="Set valid check-in date range">
                  <IconButton size="small" sx={{ ml: 0.5, p: 0.5 }}>
                    <Iconify icon="solar:eye-bold" width={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  label="From"
                  type="date"
                  value={formData.checkInFrom}
                  onChange={handleInputChange('checkInFrom')}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  size="small"
                  label="To"
                  type="date"
                  value={formData.checkInTo}
                  onChange={handleInputChange('checkInTo')}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>

            {/* Validity */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Validity
                </Typography>
                <Tooltip title="Set coupon validity period">
                  <IconButton size="small" sx={{ ml: 0.5, p: 0.5 }}>
                    <Iconify icon="solar:eye-bold" width={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  label="From"
                  type="date"
                  value={formData.validityFrom}
                  onChange={handleInputChange('validityFrom')}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  size="small"
                  label="To"
                  type="date"
                  value={formData.validityTo}
                  onChange={handleInputChange('validityTo')}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{ display: 'flex', gap: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}
          >
            <Button variant="outlined" onClick={handleCloseDrawer} sx={{ flex: 1 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!formData.name.trim() || !formData.amount.trim()}
              sx={{ flex: 1 }}
            >
              {isEditMode ? 'Update' : 'Add coupon'}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Are you sure want to delete coupon?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">There will be no way to restore this information.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Delete coupon
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
