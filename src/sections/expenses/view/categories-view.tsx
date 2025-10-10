import { useState } from 'react';
import {
  X,
  Pencil,
  Search,
} from 'lucide-react';

import {
  Box,
  Tab,
  Tabs,
  Paper,
  Table,
  Button,
  Dialog,
  Drawer,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  Pagination,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  InputAdornment,
  TableContainer,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for categories
const mockCategories = [
  {
    id: 1,
    name: 'Pulizia Aggiuntiva',
  },
  {
    id: 2,
    name: 'TV',
  },
];

export function CategoriesView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // New state for category management
  const [categories, setCategories] = useState(mockCategories);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const [categoryName, setCategoryName] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/expenses-extras/expenses');
    if (newValue === 1) router.push('/expenses-extras/extras');
    if (newValue === 3) router.push('/expenses-extras/automations');
  };

  // Category management handlers
  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryName('');
    setSidebarOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setSidebarOpen(true);
  };

  const handleSaveCategory = () => {
    if (categoryName.trim()) {
      if (editingCategory) {
        // Update existing category
        setCategories(prev => prev.map(cat => 
          cat.id === editingCategory.id ? { ...cat, name: categoryName.trim() } : cat
        ));
      } else {
        // Add new category
        const newCategory = {
          id: Math.max(...categories.map(cat => cat.id)) + 1,
          name: categoryName.trim(),
        };
        setCategories(prev => [...prev, newCategory]);
      }
      setSidebarOpen(false);
      setEditingCategory(null);
      setCategoryName('');
    }
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setEditingCategory(null);
    setCategoryName('');
  };

  const handleDeleteClick = (category: any) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryToDelete.id));
    }
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Expenses and Extras
          </Typography>
          <Button variant="contained" onClick={handleAddCategory}>
            Add Category
          </Button>
        </Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
            },
            '& .Mui-selected': {
              color: 'primary.main',
              fontWeight: 600,
            },
            '& .MuiTabs-indicator': {
              bgcolor: 'primary.main',
            },
          }}
        >
          <Tab label="Expenses" />
          <Tab label="Extras" />
          <Tab label="Categories" />
          <Tab label="Automations" />
        </Tabs>
      </Box>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} color="#666" />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 250 }}
        />
      </Paper>

      {/* Categories Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category name</TableCell>
                  <TableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 500, 
                        color: 'primary.main', 
                        cursor: 'pointer', 
                        '&:hover': { textDecoration: 'underline' } 
                      }}
                      onClick={() => handleEditCategory(category)}
                    >
                      {category.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditCategory(category)}
                        sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteClick(category)}
                        sx={{ '&:hover': { bgcolor: 'error.lighter' } }}
                      >
                        <X size={16} color="#ef4444" />
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
            Show 25 per page
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      </Paper>

      {/* Add Category Sidebar */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={handleSidebarClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 400,
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editingCategory ? 'Edit category' : 'Add new category'}
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <X size={20} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Category name *"
            placeholder="Enter category name..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />

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
              onClick={handleSaveCategory}
              sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              {editingCategory ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete &quot;{categoryToDelete?.name}&quot;? This action cannot be undone.
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
