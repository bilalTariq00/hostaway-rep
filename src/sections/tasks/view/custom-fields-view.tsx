import { useState } from 'react';

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

  const handleBackToTasks = () => {
    router.push('/tasks/manage-tasks');
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const handleAddCustomField = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handlePublicToggle = (fieldId: number) => {
    // In a real app, this would update the field's public status
    console.log('Toggle public status for field:', fieldId);
  };

  const filteredFields = mockCustomFields.filter(field =>
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
                      <IconButton size="small">
                        <Iconify icon={"eva:edit-fill" as any} width={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={handleActionMenuOpen}
                      >
                        <Iconify icon={"eva:more-vertical-fill" as any} width={16} />
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
            Add Custom Field
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
          />

          <FormControl fullWidth>
            <InputLabel>Field Type</InputLabel>
            <Select label="Field Type">
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
            <Switch />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Options (for dropdown/checkbox)
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter option..."
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              placeholder="Enter option..."
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              placeholder="Enter option..."
              size="small"
              sx={{ mb: 1 }}
            />
            <Button variant="outlined" size="small" startIcon={<Iconify icon={"eva:plus-fill" as any} />}>
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
              onClick={handleSidebarClose}
            >
              Add Field
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:edit-fill" as any} sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:copy-fill" as any} sx={{ mr: 1 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:settings-fill" as any} sx={{ mr: 1 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose} sx={{ color: 'error.main' }}>
          <Iconify icon={"eva:trash-2-fill" as any} sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}

