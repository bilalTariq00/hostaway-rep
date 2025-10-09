import { useState } from 'react';
import { 
  X,
  Edit,
  Info,
  Plus,
  ArrowLeft
} from 'lucide-react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for custom fields
const mockCustomFields = [
  {
    id: 1,
    name: 'Video',
    type: 'Text',
    public: true,
    variable: '{{listing_video}}',
  },
  {
    id: 2,
    name: 'Property Type',
    type: 'Dropdown',
    public: true,
    variable: 'property_type',
  },
  {
    id: 3,
    name: 'Max Guests',
    type: 'Number',
    public: false,
    variable: 'max_guests',
  },
  {
    id: 4,
    name: 'Check-in Instructions',
    type: 'Text Area',
    public: true,
    variable: 'checkin_instructions',
  },
  {
    id: 5,
    name: 'Amenities',
    type: 'Checkbox',
    public: true,
    variable: 'amenities',
  },
  {
    id: 6,
    name: 'House Rules',
    type: 'Text Area',
    public: false,
    variable: 'house_rules',
  },
];

export function ListingsCustomFieldsView() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [customFields, setCustomFields] = useState(mockCustomFields);
  const [editingField, setEditingField] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Text',
    public: true,
  });

  const handleBackClick = () => {
    router.push('/listings');
  };

  const handleAddCustomField = () => {
    setEditingField(null);
    setFormData({ name: '', type: 'Text', public: true });
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setEditingField(null);
    setFormData({ name: '', type: 'Text', public: true });
  };

  const handleFormSubmit = () => {
    if (editingField) {
      // Edit existing field
      setCustomFields(prev => prev.map(field => 
        field.id === editingField.id 
          ? { ...field, ...formData, variable: `{{${formData.name.toLowerCase().replace(/\s+/g, '_')}}}` }
          : field
      ));
    } else {
      // Add new field
      const newField = {
        id: Math.max(...customFields.map(f => f.id)) + 1,
        ...formData,
        variable: `{{${formData.name.toLowerCase().replace(/\s+/g, '_')}}}`,
      };
      setCustomFields(prev => [...prev, newField]);
    }
    handleSidebarClose();
  };

  const handleEdit = (field: any) => {
    setEditingField(field);
    setFormData({
      name: field.name,
      type: field.type,
      public: field.public,
    });
    setSidebarOpen(true);
  };

  const handleDeleteClick = (field: any) => {
    setFieldToDelete(field);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (fieldToDelete) {
      setCustomFields(prev => prev.filter(field => field.id !== fieldToDelete.id));
    }
    setDeleteDialogOpen(false);
    setFieldToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setFieldToDelete(null);
  };

  // Use all fields for now (search can be added later)
  const filteredFields = customFields;

  const totalPages = Math.ceil(filteredFields.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFields = filteredFields.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Top Header Bar */}
   

      {/* Main Content */}
      <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', p: 3 }}>
        {/* Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowLeft size={16} />}
            onClick={handleBackClick}
            sx={{ 
              color: 'text.secondary',
              textTransform: 'none',
              '&:hover': { bgcolor: 'transparent' }
            }}
          >
            Listings
          </Button>
        </Box>
        
        {/* Title */}
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
          Custom fields
        </Typography>

        {/* Add Custom Field Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            onClick={handleAddCustomField}
            sx={{
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            Add custom field
          </Button>
        </Box>

        {/* Custom Fields Table */}
        <Paper sx={{ mb: 3, bgcolor: 'white' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Public</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Variable</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentFields.map((field) => (
                  <TableRow key={field.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {field.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {field.type}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color={field.public ? 'success.main' : 'text.secondary'}>
                        {field.public ? 'Yes' : 'No'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ 
                        fontFamily: 'monospace', 
                        bgcolor: 'grey.100', 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: 0.5,
                        fontSize: '0.875rem'
                      }}>
                        {field.variable}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleEdit(field)}
                          sx={{ color: 'primary.main' }}
                        >
                          <Edit size={16} />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleDeleteClick(field)}
                          sx={{ color: 'error.main' }}
                        >
                          <X size={16} />
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
        <Paper sx={{ p: 2, bgcolor: 'white' }}>
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
      </Box>

      {/* Add/Edit Custom Field Sidebar */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={handleSidebarClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 400,
            bgcolor: 'white',
          },
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {editingField ? 'Edit custom field' : 'Add custom field'}
            </Typography>
            <IconButton onClick={handleSidebarClose} sx={{ color: 'text.secondary' }}>
              <X size={20} />
            </IconButton>
          </Box>

          {/* Form */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
            {/* Custom field name */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Custom field name
                </Typography>
                <Typography variant="body2" sx={{ color: 'error.main' }}>*</Typography>
                <Info size={16} color="#666" />
              </Box>
              <TextField
                fullWidth
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
              />
            </Box>

            {/* Type */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Type
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  sx={{
                    borderRadius: 1,
                  }}
                >
                  <MenuItem value="Text">Text</MenuItem>
                  <MenuItem value="Number">Number</MenuItem>
                  <MenuItem value="Dropdown">Dropdown</MenuItem>
                  <MenuItem value="Checkbox">Checkbox</MenuItem>
                  <MenuItem value="Text Area">Text Area</MenuItem>
                  <MenuItem value="Date">Date</MenuItem>
                  <MenuItem value="Time">Time</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Public */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Public
                </Typography>
                <Info size={16} color="#666" />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Switch
                  checked={formData.public}
                  onChange={(e) => setFormData({ ...formData, public: e.target.checked })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: 'success.main',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: 'success.main',
                    },
                  }}
                />
                <Typography variant="body2" color={formData.public ? 'success.main' : 'text.secondary'}>
                  {formData.public ? 'Yes' : 'No'}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleSidebarClose}
              sx={{
                borderColor: 'grey.300',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'grey.400',
                  bgcolor: 'grey.50'
                }
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleFormSubmit}
              disabled={!formData.name.trim()}
              sx={{
                bgcolor: 'success.main',
                '&:hover': { bgcolor: 'success.dark' },
                '&:disabled': { bgcolor: 'grey.300' }
              }}
            >
              {editingField ? 'Update' : 'Save'}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Delete Custom Field
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete the custom field &quot;{fieldToDelete?.name}&quot;? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                bgcolor: 'grey.50'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              bgcolor: 'error.main',
              '&:hover': { bgcolor: 'error.dark' }
            }}
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
