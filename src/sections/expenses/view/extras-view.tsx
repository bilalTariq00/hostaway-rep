import { useState } from 'react';
import {
  X,
  Copy,
  Plus,
  Minus,
  Filter,
  Pencil,
  Search,
  Upload,
  Calendar,
  Download,
  Settings,
  Paperclip,
} from 'lucide-react';

import {
  Box,
  Tab,
  Menu,
  Tabs,
  Paper,
  Table,
  Button,
  Dialog,
  Drawer,
  Select,
  Popover,
  Checkbox,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  InputAdornment,
  TableContainer,
  FormControlLabel,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for extras
const mockExtras = [
  {
    id: 1,
    name: 'Prenotazione Fuori Portale',
    date: '2025-09-01',
    category: '',
    listing: 'Via di Acqua Bullicante 113',
    reservation: '',
    owner: '',
    ownerStatement: 'Via Acqua Bulicante - DF Method September [Da Pagare]',
    amount: 900.00,
    hasAttachment: true,
  },
  {
    id: 2,
    name: 'Prenotazione Fuori Portale',
    date: '2025-09-01',
    category: '',
    listing: 'Stylish Apt | Balcony + AC + Aqueduct View',
    reservation: '',
    owner: '',
    ownerStatement: 'Circ. Casilina 151 - DF Method September [Da Pagare]',
    amount: 1300.00,
    hasAttachment: true,
  },
  {
    id: 3,
    name: 'A2A Energia S.P.A',
    date: '2025-08-30',
    category: '',
    listing: 'Navigli',
    reservation: '',
    owner: '',
    ownerStatement: 'Navigli - DF Method August [Da Pubblicare]',
    amount: 136.00,
    hasAttachment: true,
  },
  {
    id: 4,
    name: 'Guadagno Maggio Totale [Booking]',
    date: '2025-06-30',
    category: '',
    listing: 'Elegant 2BR Apt | Balcony, AC, Near Colosseum',
    reservation: '',
    owner: '',
    ownerStatement: '',
    amount: 2841.57,
    hasAttachment: true,
  },
  {
    id: 5,
    name: 'Check In di Persona [Domus Omaggio]',
    date: '2025-05-31',
    category: '',
    listing: 'Elegant Roman Escape • Walk to the Colosseum',
    reservation: '',
    owner: '',
    ownerStatement: 'DF - Elegant Roman Escape • Walk to the Colosseum May 2025',
    amount: 120.00,
    hasAttachment: true,
  },
];

// All possible columns for the extras table
const allColumns = [
  { key: 'name', label: 'Name', sortable: true, mandatory: true },
  { key: 'date', label: 'Date', sortable: true, mandatory: false },
  { key: 'categories', label: 'Categories', sortable: false, mandatory: false },
  { key: 'listing', label: 'Listing', sortable: true, mandatory: false },
  { key: 'reservation', label: 'Reservation', sortable: false, mandatory: false },
  { key: 'owner', label: 'Owner', sortable: false, mandatory: false },
  { key: 'ownerStatement', label: 'Owner statements', sortable: false, mandatory: false },
  { key: 'amount', label: 'Amount', sortable: true, mandatory: false },
];

export function ExtrasView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [customViewModalOpen, setCustomViewModalOpen] = useState(false);
  const [downloadAnchor, setDownloadAnchor] = useState<null | HTMLElement>(null);
  
  // New state for dynamic table functionality
  const [extras, setExtras] = useState(mockExtras);
  const [editingExtra, setEditingExtra] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [extraToDelete, setExtraToDelete] = useState<any>(null);
  const [columnSettingsAnchor, setColumnSettingsAnchor] = useState<null | HTMLElement>(null);
  const [columnSearchTerm, setColumnSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(0, 8).map(col => col.key));
  
  // Attachment dropdown state
  const [attachmentAnchor, setAttachmentAnchor] = useState<null | HTMLElement>(null);
  const [attachmentExtra, setAttachmentExtra] = useState<any>(null);
  
  // Form data for sidebar
  const [formData, setFormData] = useState({
    extraName: '',
    description: '',
    date: '2025-10-09',
    amount: 0,
    categories: '',
    listing: '',
    reservation: '',
    owner: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/expenses-extras/expenses');
    if (newValue === 2) router.push('/expenses-extras/categories');
    if (newValue === 3) router.push('/expenses-extras/automations');
  };

  // Form handlers
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmountChange = (delta: number) => {
    setFormData(prev => ({ ...prev, amount: Math.max(0, prev.amount + delta) }));
  };

  const handleCreateExtra = () => {
    const newExtra = {
      id: Math.max(...extras.map(e => e.id)) + 1,
      name: formData.extraName || 'New Extra',
      date: formData.date,
      category: formData.categories,
      listing: formData.listing,
      reservation: formData.reservation,
      owner: formData.owner,
      ownerStatement: formData.description,
      amount: formData.amount,
      hasAttachment: false,
    };

    if (editingExtra) {
      if (editingExtra.isDuplicating) {
        setExtras(prev => [...prev, newExtra]);
      } else {
        setExtras(prev => prev.map(extra => 
          extra.id === editingExtra.id ? { ...newExtra, id: editingExtra.id } : extra
        ));
      }
    } else {
      setExtras(prev => [...prev, newExtra]);
    }

    setSidebarOpen(false);
    setEditingExtra(null);
    setFormData({
      extraName: '',
      description: '',
      date: '2025-10-09',
      amount: 0,
      categories: '',
      listing: '',
      reservation: '',
      owner: '',
    });
  };

  const handleEditExtra = (extra: any) => {
    setEditingExtra(extra);
    setFormData({
      extraName: extra.name,
      description: extra.ownerStatement,
      date: extra.date,
      amount: extra.amount,
      categories: extra.category,
      listing: extra.listing,
      reservation: extra.reservation,
      owner: extra.owner,
    });
    setSidebarOpen(true);
  };

  const handleDuplicateExtra = (extra: any) => {
    setEditingExtra({ ...extra, isDuplicating: true });
    setFormData({
      extraName: `${extra.name} (Copy)`,
      description: extra.ownerStatement,
      date: new Date().toISOString().split('T')[0],
      amount: extra.amount,
      categories: extra.category,
      listing: extra.listing,
      reservation: extra.reservation,
      owner: extra.owner,
    });
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setEditingExtra(null);
    setFormData({
      extraName: '',
      description: '',
      date: '2025-10-09',
      amount: 0,
      categories: '',
      listing: '',
      reservation: '',
      owner: '',
    });
  };

  const handleDeleteClick = (extra: any) => {
    setExtraToDelete(extra);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (extraToDelete) {
      setExtras(prev => prev.filter(extra => extra.id !== extraToDelete.id));
    }
    setDeleteDialogOpen(false);
    setExtraToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setExtraToDelete(null);
  };

  // Column settings handlers
  const handleColumnSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setColumnSettingsAnchor(event.currentTarget);
  };

  const handleColumnSettingsClose = () => {
    setColumnSettingsAnchor(null);
  };

  const handleColumnToggle = (columnKey: string) => {
    const column = allColumns.find(col => col.key === columnKey);
    if (column?.mandatory) return;

    setVisibleColumns(prev => 
      prev.includes(columnKey) 
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Attachment handlers
  const handleAttachmentClick = (event: React.MouseEvent<HTMLElement>, extra: any) => {
    setAttachmentAnchor(event.currentTarget);
    setAttachmentExtra(extra);
  };

  const handleAttachmentClose = () => {
    setAttachmentAnchor(null);
    setAttachmentExtra(null);
  };

  const handleAttachmentUpload = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.txt';
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        console.log(`Uploading ${files.length} file(s) for extra: ${attachmentExtra?.name}`);
        // Here you would typically upload the files to your server
        // For now, we'll just show a success message
        alert(`Successfully uploaded ${files.length} file(s) for "${attachmentExtra?.name}"`);
      }
    };
    
    input.click();
    handleAttachmentClose();
  };

  const handleAttachmentCopy = () => {
    console.log(`Copying attachment for extra: ${attachmentExtra?.name}`);
    // Here you would implement the copy attachment logic
    alert(`Copying attachment for "${attachmentExtra?.name}"`);
    handleAttachmentClose();
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedExtras(extras.map(extra => extra.id));
    } else {
      setSelectedExtras([]);
    }
  };

  const handleSelectExtra = (extraId: number) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleDownloadClick = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadAnchor(event.currentTarget);
  };

  const handleDownloadClose = () => {
    setDownloadAnchor(null);
  };

  const handleAddExtra = () => {
    setSidebarOpen(true);
  };

  const handleImportClick = () => {
    setImportModalOpen(true);
  };

  const handleImportClose = () => {
    setImportModalOpen(false);
  };

  const handleCustomViewClick = () => {
    setCustomViewModalOpen(true);
  };

  const handleCustomViewClose = () => {
    setCustomViewModalOpen(false);
  };

  // Data processing
  const filteredExtras = extras.filter(extra =>
    extra.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredExtras].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const filteredColumns = allColumns.filter(column =>
    column.label.toLowerCase().includes(columnSearchTerm.toLowerCase())
  );

  const totalAmount = filteredExtras.reduce((sum, extra) => sum + extra.amount, 0);
  const totalPages = Math.ceil(filteredExtras.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExtras = sortedData.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Expenses and Extras
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={handleImportClick} startIcon={<Upload size={16} />}>
              Import
            </Button>
            <Button
              variant="outlined"
              onClick={handleDownloadClick}
              endIcon={<Download size={16} />}
            >
              Download Report
            </Button>
            <Menu
              anchorEl={downloadAnchor}
              open={Boolean(downloadAnchor)}
              onClose={handleDownloadClose}
            >
              <MenuItem onClick={handleDownloadClose}>Export CSV</MenuItem>
              <MenuItem onClick={handleDownloadClose}>Export Excel</MenuItem>
              <MenuItem onClick={handleDownloadClose}>Export PDF</MenuItem>
            </Menu>
            <Button variant="contained" onClick={handleAddExtra} startIcon={<Plus size={16} />}>
              Add Extra
            </Button>
          </Box>
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

      {/* Extras Title and Actions */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Extras
          </Typography>
          <Button variant="outlined" onClick={handleCustomViewClick}>
            New Custom View
          </Button>
        </Box>
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" startIcon={<Filter size={16} />}>
            Filter
          </Button>
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
        </Box>
      </Paper>

      {/* Extras Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <TableContainer sx={{ maxHeight: 600, overflowY: 'auto', overflowX: 'auto' }}>
          <Table sx={{ minWidth: visibleColumns.length * 120 }}>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell padding="checkbox" sx={{ fontWeight: 600 }}>
                  <Checkbox
                    indeterminate={selectedExtras.length > 0 && selectedExtras.length < extras.length}
                    checked={selectedExtras.length === extras.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {allColumns.map((column) => (
                  visibleColumns.includes(column.key) && (
                    <TableCell 
                      key={column.key} 
                      sx={{ 
                        fontWeight: 600, 
                        minWidth: 120, 
                        whiteSpace: 'nowrap',
                        cursor: column.sortable ? 'pointer' : 'default',
                        '&:hover': column.sortable ? { bgcolor: 'grey.100' } : {}
                      }}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {column.label}
                        {column.sortable && (
                          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 0.5 }}>
                            <Box sx={{ fontSize: '10px', lineHeight: 1 }}>
                              {sortColumn === column.key && sortDirection === 'asc' ? '▲' : '△'}
                            </Box>
                            <Box sx={{ fontSize: '10px', lineHeight: 1 }}>
                              {sortColumn === column.key && sortDirection === 'desc' ? '▼' : '▽'}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                  )
                ))}
                <TableCell 
                  sx={{ 
                    position: 'sticky', 
                    right: 0, 
                    bgcolor: 'background.paper', 
                    borderLeft: '1px solid', 
                    borderColor: 'divider',
                    zIndex: 10,
                    px: 0
                  }}
                >
                  <IconButton 
                    size="small" 
                    onClick={handleColumnSettingsClick}
                    sx={{ 
                      color: 'text.secondary',
                      '&:hover': { bgcolor: 'grey.100', color: 'text.primary' }
                    }}
                  >
                    <Settings size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentExtras.map((extra, index) => (
                <TableRow key={extra.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedExtras.includes(extra.id)}
                      onChange={() => handleSelectExtra(extra.id)}
                    />
                  </TableCell>
                  {allColumns.map((column) => (
                    visibleColumns.includes(column.key) && (
                      <TableCell key={column.key} sx={{ minWidth: 120, whiteSpace: 'nowrap' }}>
                        {column.key === 'name' && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500, 
                              color: 'primary.main', 
                              cursor: 'pointer', 
                              '&:hover': { color: 'primary.dark' } 
                            }}
                            onClick={() => handleEditExtra(extra)}
                          >
                      {extra.name}
                    </Typography>
                        )}
                        {column.key === 'date' && (
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {extra.date}
                    </Typography>
                        )}
                        {column.key === 'categories' && (
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            —
                          </Typography>
                        )}
                        {column.key === 'listing' && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'primary.main', 
                              cursor: 'pointer', 
                              '&:hover': { textDecoration: 'underline' } 
                            }}
                            onClick={() => router.push('/listings/1')}
                          >
                      {extra.listing}
                    </Typography>
                        )}
                        {column.key === 'reservation' && (
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            —
                    </Typography>
                        )}
                        {column.key === 'owner' && (
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            —
                    </Typography>
                        )}
                        {column.key === 'ownerStatement' && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'primary.main', 
                              cursor: 'pointer', 
                              '&:hover': { textDecoration: 'underline' } 
                            }}
                          >
                      {extra.ownerStatement}
                    </Typography>
                        )}
                        {column.key === 'amount' && (
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      €{extra.amount.toFixed(2)}
                    </Typography>
                        )}
                  </TableCell>
                    )
                  ))}
                  <TableCell 
                    sx={{ 
                      position: 'sticky', 
                      right: 0, 
                      bgcolor: index % 2 === 0 ? 'white' : 'grey.50', 
                      borderLeft: '1px solid', 
                      borderColor: 'divider',
                      zIndex: 10,
                      px: 0
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleAttachmentClick(e, extra)}
                        sx={{ 
                          color: extra.hasAttachment ? 'primary.main' : 'text.secondary',
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        <Paperclip size={16} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDuplicateExtra(extra)}>
                        <Copy size={16} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleEditExtra(extra)}>
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteClick(extra)}>
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

      {/* Total Amount */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            TOTAL
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            €{totalAmount.toFixed(2)}
          </Typography>
        </Box>
      </Paper>

      {/* Pagination */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Show {itemsPerPage} per page
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Button 
              size="small" 
              variant="outlined" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              FIRST
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              &lt;
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  size="small"
                  variant={currentPage === pageNum ? "contained" : "outlined"}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button 
              size="small" 
              variant="outlined" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              &gt;
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              LAST
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Add Extra Sidebar */}
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
            {editingExtra?.isDuplicating ? 'Duplicate extra' : editingExtra ? 'Edit extra' : 'Add new extra'}
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <X size={20} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Extra name *"
            placeholder="Enter extra name..."
            value={formData.extraName}
            onChange={(e) => handleInputChange('extraName', e.target.value)}
            required
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            placeholder="Enter description..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />

          <TextField
            fullWidth
            type="date"
            label="Date *"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Calendar size={16} />
                </InputAdornment>
              ),
            }}
            required
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 60 }}>Amount *</Typography>
            <IconButton 
              size="small" 
              onClick={() => handleAmountChange(-1)}
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              <Minus size={16} />
            </IconButton>
            <TextField
              size="small"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
              sx={{ flex: 1 }}
            />
            <IconButton 
              size="small" 
              onClick={() => handleAmountChange(1)}
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              <Plus size={16} />
            </IconButton>
          </Box>

          <FormControl fullWidth>
            <InputLabel>Categories</InputLabel>
            <Select 
              label="Categories"
              value={formData.categories}
              onChange={(e) => handleInputChange('categories', e.target.value)}
            >
              <MenuItem value="transportation">Transportation</MenuItem>
              <MenuItem value="amenities">Amenities</MenuItem>
              <MenuItem value="services">Services</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Listing</InputLabel>
            <Select 
              label="Listing"
              value={formData.listing}
              onChange={(e) => handleInputChange('listing', e.target.value)}
            >
              <MenuItem value="listing1">Via di Acqua Bullicante 113</MenuItem>
              <MenuItem value="listing2">Stylish Apt | Balcony + AC + Aqueduct View</MenuItem>
              <MenuItem value="listing3">Navigli</MenuItem>
              <MenuItem value="listing4">Elegant 2BR Apt | Balcony, AC, Near Colosseum</MenuItem>
              <MenuItem value="listing5">Elegant Roman Escape • Walk to the Colosseum</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Reservation</InputLabel>
            <Select 
              label="Reservation"
              value={formData.reservation}
              onChange={(e) => handleInputChange('reservation', e.target.value)}
            >
              <MenuItem value="">—</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Owner</InputLabel>
            <Select 
              label="Owner"
              value={formData.owner}
              onChange={(e) => handleInputChange('owner', e.target.value)}
            >
              <MenuItem value="">—</MenuItem>
            </Select>
          </FormControl>

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
              onClick={handleCreateExtra}
              sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              {editingExtra?.isDuplicating ? 'Duplicate' : editingExtra ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Import Modal */}
      <Dialog open={importModalOpen} onClose={handleImportClose} maxWidth="sm" fullWidth>
        <DialogTitle>Import Data</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Upload your extras data file
            </Typography>
            <Button variant="contained" component="label">
              Choose File
              <input type="file" hidden />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImportClose}>Cancel</Button>
          <Button variant="contained" onClick={handleImportClose}>
            Import
          </Button>
        </DialogActions>
      </Dialog>

      {/* Custom View Modal */}
      <Dialog open={customViewModalOpen} onClose={handleCustomViewClose} maxWidth="sm" fullWidth>
        <DialogTitle>New Custom View</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="View Name"
            placeholder="Enter view name..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCustomViewClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCustomViewClose}>
            Create View
          </Button>
        </DialogActions>
      </Dialog>

      {/* Column Settings Popover */}
      <Popover
        open={Boolean(columnSettingsAnchor)}
        anchorEl={columnSettingsAnchor}
        onClose={handleColumnSettingsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, minWidth: 250 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Column Settings
          </Typography>
          <TextField
            size="small"
            placeholder="Find column"
            value={columnSearchTerm}
            onChange={(e) => setColumnSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2, width: '100%' }}
          />
          <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
            {filteredColumns.map((column) => (
              <FormControlLabel
                key={column.key}
                control={
                  <Checkbox
                    checked={visibleColumns.includes(column.key)}
                    onChange={() => handleColumnToggle(column.key)}
                    disabled={column.mandatory}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {column.label}
                    {column.mandatory && (
                      <Typography variant="caption" color="text.secondary">
                        (Required)
                      </Typography>
                    )}
                  </Box>
                }
                sx={{ width: '100%', mb: 0.5 }}
              />
            ))}
          </Box>
        </Box>
      </Popover>

      {/* Attachment Dropdown Menu */}
      <Menu
        anchorEl={attachmentAnchor}
        open={Boolean(attachmentAnchor)}
        onClose={handleAttachmentClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleAttachmentUpload}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Upload size={16} />
            <Typography variant="body2">Upload File</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleAttachmentCopy}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Copy size={16} />
            <Typography variant="body2">Copy Attachment</Typography>
          </Box>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Extra</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete &quot;{extraToDelete?.name}&quot;? This action cannot be undone.
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
