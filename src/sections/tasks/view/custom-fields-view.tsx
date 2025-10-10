import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for custom fields
const mockCustomFields = [
  {
    id: 1,
    name: 'Property Type',
    type: 'Dropdown',
    public: true,
    options: ['Villa', 'Apartment', 'House', 'Studio'],
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Guest Notes',
    type: 'Text Area',
    public: false,
    options: [],
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    name: 'Check-in Time',
    type: 'Time',
    public: true,
    options: [],
    createdAt: '2024-01-25',
  },
  {
    id: 4,
    name: 'Special Requirements',
    type: 'Checkbox',
    public: true,
    options: ['Wheelchair Access', 'Pet Friendly', 'Smoking Allowed'],
    createdAt: '2024-02-01',
  },
  {
    id: 5,
    name: 'Priority Level',
    type: 'Number',
    public: false,
    options: [],
    createdAt: '2024-02-05',
  },
];

export function CustomFieldsView() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [customFields, setCustomFields] = useState<any[]>([]);
  const [selectedField, setSelectedField] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    public: false,
    options: [] as string[],
  });

  // Load custom fields from localStorage
  const loadCustomFields = () => {
    const savedFields = localStorage.getItem('customFields');
    if (savedFields) {
      return JSON.parse(savedFields);
    }
    return mockCustomFields;
  };

  useEffect(() => {
    setCustomFields(loadCustomFields());
  }, []);

  const handleBackToTasks = () => {
    router.push('/tasks/manage-tasks');
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, field: any) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedField(field);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedField(null);
  };

  const handleAddCustomField = () => {
    setIsEditMode(false);
    setFormData({
      name: '',
      type: '',
      public: false,
      options: [],
    });
    setSidebarOpen(true);
  };

  const handleEditField = () => {
    if (selectedField) {
      setIsEditMode(true);
      setFormData({
        name: selectedField.name,
        type: selectedField.type,
        public: selectedField.public,
        options: [...selectedField.options],
      });
      setSidebarOpen(true);
    }
    handleActionMenuClose();
  };

  const handleDeleteField = () => {
    setDeleteDialogOpen(true);
    handleActionMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (selectedField) {
      const updatedFields = customFields.filter((field: any) => field.id !== selectedField.id);
      localStorage.setItem('customFields', JSON.stringify(updatedFields));
      setCustomFields(updatedFields);
    }
    setDeleteDialogOpen(false);
    setSelectedField(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedField(null);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setIsEditMode(false);
    setFormData({
      name: '',
      type: '',
      public: false,
      options: [],
    });
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, ''],
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option),
    }));
  };

  const handleRemoveOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleSaveField = () => {
    const fieldsData = loadCustomFields();
    
    if (isEditMode && selectedField) {
      const updatedFields = fieldsData.map((field: any) =>
        field.id === selectedField.id
          ? {
              ...field,
              name: formData.name,
              type: formData.type,
              public: formData.public,
              options: formData.options.filter(option => option.trim() !== ''),
            }
          : field
      );
      localStorage.setItem('customFields', JSON.stringify(updatedFields));
      setCustomFields(updatedFields);
    } else {
      const newField = {
        id: Date.now(),
        name: formData.name,
        type: formData.type,
        public: formData.public,
        options: formData.options.filter(option => option.trim() !== ''),
        createdAt: new Date().toISOString().split('T')[0],
      };
      const updatedFields = [...fieldsData, newField];
      localStorage.setItem('customFields', JSON.stringify(updatedFields));
      setCustomFields(updatedFields);
    }
    
    handleSidebarClose();
  };

  const handlePublicToggle = (fieldId: number) => {
    const updatedFields = customFields.map((field: any) =>
      field.id === fieldId ? { ...field, public: !field.public } : field
    );
    localStorage.setItem('customFields', JSON.stringify(updatedFields));
    setCustomFields(updatedFields);
  };

  const filteredFields = customFields.filter(field =>
    field.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFields.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFields = filteredFields.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Back Button */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <IconButton onClick={handleBackToTasks}>
            <Iconify icon={"eva:arrow-back-fill" as any} />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Custom Fields
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <TextField
            placeholder="Search custom fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={"eva:search-fill" as any} />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" onClick={handleAddCustomField}>
            Add Custom Fields
          </Button>
        </Box>
      </Box>

      {/* Custom Fields Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Public</TableCell>
                <TableCell>Options</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentFields.map((field) => (
                <TableRow key={field.id}>
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
                    <Switch
                      checked={field.public}
                      onChange={() => handlePublicToggle(field.id)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {field.options.length > 0 ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {field.options.slice(0, 2).map((option, index) => (
                          <Typography key={index} variant="caption" sx={{ 
                            bgcolor: 'grey.100', 
                            px: 1, 
                            py: 0.5, 
                            borderRadius: 1,
                            fontSize: '0.75rem'
                          }}>
                            {option}
                          </Typography>
                        ))}
                        {field.options.length > 2 && (
                          <Typography variant="caption" color="text.secondary">
                            +{field.options.length - 2} more
                          </Typography>
                        )}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No options
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {field.createdAt}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => {
                          setSelectedField(field);
                          handleEditField();
                        }}
                      >
                        <Iconify icon={"eva:edit-fill" as any} width={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleActionMenuOpen(e, field)}
                      >
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

      {/* Pagination */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Show 50 per page
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      </Paper>

      {/* Add Custom Field Sidebar */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={handleSidebarClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 500,
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {isEditMode ? 'Edit Custom Field' : 'Add Custom Field'}
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <Iconify icon={"eva:close-fill" as any} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Field Name"
            placeholder="Enter field name..."
            value={formData.name}
            onChange={(e) => handleFormChange('name', e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>Field Type</InputLabel>
            <Select 
              label="Field Type"
              value={formData.type}
              onChange={(e) => handleFormChange('type', e.target.value)}
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="textarea">Text Area</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="dropdown">Dropdown</MenuItem>
              <MenuItem value="checkbox">Checkbox</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="time">Time</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="url">URL</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2">Public Field</Typography>
            <Switch 
              checked={formData.public}
              onChange={(e) => handleFormChange('public', e.target.checked)}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Options (for dropdown/checkbox)
            </Typography>
            {formData.options.map((option, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Enter option..."
                  size="small"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <IconButton 
                  size="small" 
                  onClick={() => handleRemoveOption(index)}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={"eva:close-fill" as any} width={16} />
                </IconButton>
              </Box>
            ))}
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<Iconify icon={"eva:plus-fill" as any} />}
              onClick={handleAddOption}
            >
              Add Option
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleSidebarClose}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSaveField}
            >
              {isEditMode ? 'Update Field' : 'Add Field'}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Custom Field?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedField?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}

