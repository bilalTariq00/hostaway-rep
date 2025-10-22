import { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
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
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for custom fields
const mockCustomFields = [
  {
    id: 1,
    name: 'Guest ID Number',
    type: 'Text',
    publicVariable: 'guest_id_number',
  },
  {
    id: 2,
    name: 'Special Requests',
    type: 'Text Area',
    publicVariable: 'special_requests',
  },
  {
    id: 3,
    name: 'Emergency Contact',
    type: 'Text',
    publicVariable: 'emergency_contact',
  },
  {
    id: 4,
    name: 'Dietary Restrictions',
    type: 'Dropdown',
    publicVariable: 'dietary_restrictions',
  },
  {
    id: 5,
    name: 'Check-in Time Preference',
    type: 'Time',
    publicVariable: 'checkin_time_preference',
  },
];

export function CustomFieldsView() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<number | null>(null);
  const [customFields, setCustomFields] = useState(mockCustomFields);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Text',
    public: true,
  });

  const handleBackClick = () => {
    router.push('/reservations');
  };

  const handleOpenDrawer = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      name: '',
      type: 'Text',
      public: true,
    });
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      name: '',
      type: 'Text',
      public: true,
    });
  };

  const handleInputChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSwitchChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.checked,
    });
  };

  const handleSave = () => {
    if (isEditMode && editingId) {
      // Update existing field
      setCustomFields((prev) =>
        prev.map((field) =>
          field.id === editingId
            ? {
                ...field,
                name: formData.name,
                type: formData.type,
                publicVariable: formData.name.toLowerCase().replace(/\s+/g, '_'),
              }
            : field
        )
      );
    } else {
      // Add new field
      const newField = {
        id: Math.max(...customFields.map((f) => f.id), 0) + 1,
        name: formData.name,
        type: formData.type,
        publicVariable: formData.name.toLowerCase().replace(/\s+/g, '_'),
      };
      setCustomFields((prev) => [...prev, newField]);
    }
    handleCloseDrawer();
  };

  const handleEdit = (id: number) => {
    const field = customFields.find((f) => f.id === id);
    if (field) {
      setIsEditMode(true);
      setEditingId(id);
      setFormData({
        name: field.name,
        type: field.type,
        public: true, // Assuming all fields are public for now
      });
      setIsDrawerOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    setFieldToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (fieldToDelete) {
      setCustomFields((prev) => prev.filter((field) => field.id !== fieldToDelete));
      setDeleteDialogOpen(false);
      setFieldToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setFieldToDelete(null);
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleBackClick} sx={{ mr: 1 }}>
            <Iconify icon={'eva:arrow-left-fill' as any} />
          </IconButton>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Reservations
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Custom Fields
          </Typography>
          <Button variant="contained" onClick={handleOpenDrawer}>
            Add Custom Field
          </Button>
        </Box>
      </Box>

      {/* Custom Fields Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Public Variable</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customFields.map((field) => (
                <TableRow key={field.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {field.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{field.type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        bgcolor: 'grey.100',
                        px: 1,
                        py: 0.5,
                        borderRadius: 0.5,
                      }}
                    >
                      {field.publicVariable}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small" onClick={() => handleEdit(field.id)}>
                        <Iconify icon={'eva:edit-fill' as any} width={16} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(field.id)}>
                        <Iconify icon={'eva:close-fill' as any} width={16} />
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
              {isEditMode ? 'Edit custom field' : 'Add custom field'}
            </Typography>
            <IconButton onClick={handleCloseDrawer} size="small">
              <Iconify icon="solar:trash-bin-trash-bold" width={20} />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Form */}
          <Box sx={{ flex: 1 }}>
            {/* Custom field name */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Custom field name
                </Typography>
                <Typography component="span" sx={{ color: 'error.main', ml: 0.5 }}>
                  *
                </Typography>
                <Tooltip title="Enter a descriptive name for your custom field">
                  <IconButton size="small" sx={{ ml: 0.5, p: 0.5 }}>
                    <Iconify icon="solar:eye-bold" width={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <TextField
                fullWidth
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange('name')}
                size="small"
                required
              />
            </Box>

            {/* Type */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Type
              </Typography>
              <FormControl fullWidth size="small">
                <Select value={formData.type} onChange={handleInputChange('type')} displayEmpty>
                  <MenuItem value="Text">Text</MenuItem>
                  <MenuItem value="Text Area">Text Area</MenuItem>
                  <MenuItem value="Number">Number</MenuItem>
                  <MenuItem value="Dropdown">Dropdown</MenuItem>
                  <MenuItem value="Date">Date</MenuItem>
                  <MenuItem value="Time">Time</MenuItem>
                  <MenuItem value="Checkbox">Checkbox</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Public */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Public
                </Typography>
                <Tooltip title="Make this field visible to guests">
                  <IconButton size="small" sx={{ ml: 0.5, p: 0.5 }}>
                    <Iconify icon="solar:eye-bold" width={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.public}
                    onChange={handleSwitchChange('public')}
                    color="primary"
                  />
                }
                label={formData.public ? 'Yes' : 'No'}
                sx={{ m: 0 }}
              />
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
              disabled={!formData.name.trim()}
              sx={{ flex: 1 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Delete Custom Field
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this custom field? This action cannot be undone.
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
