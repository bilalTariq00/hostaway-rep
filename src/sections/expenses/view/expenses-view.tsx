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

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for expenses
const mockExpenses = [
  {
    id: 1,
    name: 'Prenotazione Fuori Portale',
    date: '2025-09-30',
    category: '',
    listing: 'Via di Acqua Bullicante 113',
    reservation: '',
    owner: '',
    ownerStatement: 'Via Acqua Bulicante - DF Method September [Da Pagare]',
    amount: 900.0,
    hasAttachment: false,
  },
  {
    id: 2,
    name: 'Accessori Guest',
    date: '2025-09-02',
    category: '',
    listing: 'Splendido appartamento due passi dal Vaticano',
    reservation: '',
    owner: '',
    ownerStatement: 'Via Nicolo V - DF Method September [Pagata]',
    amount: 9.37,
    hasAttachment: false,
  },
  {
    id: 3,
    name: 'Sgorgo',
    date: '2025-09-18',
    category: '',
    listing: 'Splendido appartamento due passi dal Vaticano',
    reservation: '',
    owner: '',
    ownerStatement: 'Via Nicolo V - DF Method September [Pagata]',
    amount: 50.0,
    hasAttachment: false,
  },
  {
    id: 4,
    name: 'Cleaning Extra Fondo',
    date: '2025-09-30',
    category: '',
    listing: 'Splendido appartamento due passi dal Vaticano',
    reservation: '',
    owner: '',
    ownerStatement: 'Via Nicolo V - DF Method September [Pagata]',
    amount: 65.0,
    hasAttachment: false,
  },
  {
    id: 5,
    name: 'Elegant Roman',
    date: '2025-09-15',
    category: '',
    listing: 'Elegant Roman Apartment',
    reservation: '',
    owner: '',
    ownerStatement: 'Roman Method [Da Pagare]',
    amount: 200.0,
    hasAttachment: false,
  },
];

export function ExpensesView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedExpenses, setSelectedExpenses] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [customViewModalOpen, setCustomViewModalOpen] = useState(false);
  const [downloadAnchor, setDownloadAnchor] = useState<null | HTMLElement>(null);

  // Form state for Add Expense
  const [formData, setFormData] = useState({
    expenseName: '',
    description: '',
    date: '2025-10-09',
    amount: 0,
    categories: '',
    listing: '',
    reservation: '',
    owner: '',
    attachments: null as FileList | null,
  });

  // State for expenses list
  const [expenses, setExpenses] = useState(mockExpenses);
  const [editingExpense, setEditingExpense] = useState<any>(null);

  // Column visibility state
  const [columnSettingsAnchor, setColumnSettingsAnchor] = useState<null | HTMLElement>(null);
  const [columnSearchTerm, setColumnSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState([
    'name',
    'date',
    'categories',
    'listing',
    'reservation',
    'owner',
    'ownerStatement',
    'amount',
  ]);

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<any>(null);

  // Attachment dropdown state
  const [attachmentAnchor, setAttachmentAnchor] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) router.push('/expenses-extras/extras');
    if (newValue === 2) router.push('/expenses-extras/categories');
    if (newValue === 3) router.push('/expenses-extras/automations');
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedExpenses(expenses.map((expense) => expense.id));
    } else {
      setSelectedExpenses([]);
    }
  };

  const handleSelectExpense = (expenseId: number) => {
    setSelectedExpenses((prev) =>
      prev.includes(expenseId) ? prev.filter((id) => id !== expenseId) : [...prev, expenseId]
    );
  };

  const handleDownloadClick = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadAnchor(event.currentTarget);
  };

  const handleDownloadClose = () => {
    setDownloadAnchor(null);
  };

  const handleAddExpense = () => {
    setSidebarOpen(true);
    setEditingExpense(null);
  };

  const handleEditExpense = (expense: any) => {
    setEditingExpense(expense);
    setFormData({
      expenseName: expense.name,
      description: expense.ownerStatement,
      date: expense.date,
      amount: expense.amount,
      categories: expense.category,
      listing: expense.listing,
      reservation: expense.reservation,
      owner: expense.owner,
      attachments: null,
    });
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    // Reset form data when closing
    setFormData({
      expenseName: '',
      description: '',
      date: '2025-10-09',
      amount: 0,
      categories: '',
      listing: '',
      reservation: '',
      owner: '',
      attachments: null,
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAmountChange = (operation: 'increment' | 'decrement') => {
    setFormData((prev) => ({
      ...prev,
      amount: operation === 'increment' ? prev.amount + 1 : Math.max(0, prev.amount - 1),
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        attachments: files,
      }));
    }
  };

  const handleCreateExpense = () => {
    if (editingExpense) {
      if (editingExpense.isDuplicating) {
        // Create new duplicate expense
        const duplicatedExpense = {
          id: Math.max(...expenses.map((e) => e.id)) + 1, // Generate new ID
          name: formData.expenseName || 'New Expense',
          date: formData.date,
          category: formData.categories,
          listing: formData.listing,
          reservation: formData.reservation,
          owner: formData.owner,
          ownerStatement: formData.description || '',
          amount: formData.amount,
          hasAttachment: Boolean(formData.attachments && formData.attachments.length > 0),
        };

        // Add to expenses list
        setExpenses((prev) => [duplicatedExpense, ...prev]);
      } else {
        // Update existing expense
        const updatedExpense = {
          ...editingExpense,
          name: formData.expenseName || 'New Expense',
          date: formData.date,
          category: formData.categories,
          listing: formData.listing,
          reservation: formData.reservation,
          owner: formData.owner,
          ownerStatement: formData.description || '',
          amount: formData.amount,
          hasAttachment: Boolean(formData.attachments && formData.attachments.length > 0),
        };

        setExpenses((prev) =>
          prev.map((expense) => (expense.id === editingExpense.id ? updatedExpense : expense))
        );
      }
    } else {
      // Create new expense object
      const newExpense = {
        id: Math.max(...expenses.map((e) => e.id)) + 1, // Generate new ID
        name: formData.expenseName || 'New Expense',
        date: formData.date,
        category: formData.categories,
        listing: formData.listing,
        reservation: formData.reservation,
        owner: formData.owner,
        ownerStatement: formData.description || '',
        amount: formData.amount,
        hasAttachment: Boolean(formData.attachments && formData.attachments.length > 0),
      };

      // Add to expenses list
      setExpenses((prev) => [newExpense, ...prev]);
    }

    // Reset form and close sidebar
    handleSidebarClose();
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

  // Column visibility handlers
  const handleColumnSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setColumnSettingsAnchor(event.currentTarget);
  };

  const handleColumnSettingsClose = () => {
    setColumnSettingsAnchor(null);
  };

  const handleColumnToggle = (columnKey: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnKey) ? prev.filter((col) => col !== columnKey) : [...prev, columnKey]
    );
  };

  // Delete handlers
  const handleDeleteClick = (expense: any) => {
    setExpenseToDelete(expense);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (expenseToDelete) {
      setExpenses((prev) => prev.filter((expense) => expense.id !== expenseToDelete.id));
      setDeleteDialogOpen(false);
      setExpenseToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setExpenseToDelete(null);
  };

  // Attachment handlers
  const handleAttachmentClick = (event: React.MouseEvent<HTMLElement>, expense: any) => {
    setAttachmentAnchor(event.currentTarget);
  };

  const handleAttachmentClose = () => {
    setAttachmentAnchor(null);
  };

  const handleAttachmentUpload = () => {
    // Handle file upload logic here
    handleAttachmentClose();
  };

  const handleAttachmentCopy = () => {
    // Handle copy attachment logic here
    handleAttachmentClose();
  };

  // Duplicate handler
  const handleDuplicateExpense = (expense: any) => {
    // Set the expense for duplication (not editing)
    setEditingExpense({ ...expense, isDuplicating: true });
    setFormData({
      expenseName: `${expense.name} (Copy)`,
      description: expense.ownerStatement,
      date: new Date().toISOString().split('T')[0], // Today's date
      amount: expense.amount,
      categories: expense.category,
      listing: expense.listing,
      reservation: expense.reservation,
      owner: expense.owner,
      attachments: null as FileList | null,
    });

    // Open sidebar for duplication
    setSidebarOpen(true);
  };

  // Column configuration
  const allColumns = [
    { key: 'name', label: 'Name', mandatory: true },
    { key: 'date', label: 'Date', mandatory: true },
    { key: 'description', label: 'Description', mandatory: false },
    { key: 'categories', label: 'Categories', mandatory: false },
    { key: 'listing', label: 'Listing', mandatory: true },
    { key: 'listingId', label: 'Listing Id', mandatory: false },
    { key: 'reservation', label: 'Reservation', mandatory: false },
    { key: 'reservationId', label: 'Reservation Id', mandatory: false },
    { key: 'owner', label: 'Owner', mandatory: false },
    { key: 'ownerStatement', label: 'Owner statements', mandatory: true },
    { key: 'amount', label: 'Amount', mandatory: true },
    { key: 'currency', label: 'Currency', mandatory: false },
    { key: 'status', label: 'Status', mandatory: false },
    { key: 'createdAt', label: 'Created At', mandatory: false },
    { key: 'updatedAt', label: 'Updated At', mandatory: false },
  ];

  const filteredExpenses = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExpenses = filteredExpenses.slice(startIndex, endIndex);

  // Pagination calculations
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  // Responsive pagination logic
  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 3; // Show max 3 page numbers

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // Always show first page
      items.push(1);

      if (currentPage > 3) {
        items.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          items.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        items.push('...');
      }

      // Always show last page
      if (totalPages > 1) {
        items.push(totalPages);
      }
    }

    return items;
  };

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
            <Button variant="contained" onClick={handleAddExpense} startIcon={<Plus size={16} />}>
              Add Expense
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

      {/* Expenses Title and Actions */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Expenses
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

      {/* Expenses Table */}
      <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600, overflowY: 'auto', overflowX: 'auto' }}>
          <Table sx={{ minWidth: 1200 }}>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell
                  padding="checkbox"
                  sx={{ bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}
                >
                  <Checkbox
                    indeterminate={
                      selectedExpenses.length > 0 && selectedExpenses.length < expenses.length
                    }
                    checked={selectedExpenses.length === expenses.length}
                    onChange={handleSelectAll}
                    sx={{ color: 'text.secondary' }}
                  />
                </TableCell>
                {allColumns.map(
                  (column) =>
                    visibleColumns.includes(column.key) && (
                      <TableCell
                        key={column.key}
                        sx={{
                          bgcolor: 'grey.50',
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          fontWeight: 600,
                          color: 'text.primary',
                        }}
                      >
                        {column.label}
                      </TableCell>
                    )
                )}
                <TableCell
                  align="center"
                  sx={{
                    position: 'sticky',
                    right: 0,
                    bgcolor: 'grey.50',
                    borderLeft: '1px solid',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={handleColumnSettingsClick}
                    sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'grey.100' } }}
                  >
                    <Settings size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentExpenses.map((expense, index) => (
                <TableRow key={expense.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                  <TableCell
                    padding="checkbox"
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <Checkbox
                      checked={selectedExpenses.includes(expense.id)}
                      onChange={() => handleSelectExpense(expense.id)}
                      sx={{ color: 'text.secondary' }}
                    />
                  </TableCell>
                  {allColumns.map(
                    (column) =>
                      visibleColumns.includes(column.key) && (
                        <TableCell
                          key={column.key}
                          sx={{ borderBottom: '1px solid', borderColor: 'divider', minWidth: 120 }}
                        >
                          {column.key === 'name' && (
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                color: 'primary.main',
                                cursor: 'pointer',
                                '&:hover': { color: 'primary.dark' },
                              }}
                              onClick={() => handleEditExpense(expense)}
                            >
                              {expense.name}
                            </Typography>
                          )}
                          {column.key === 'date' && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {expense.date}
                            </Typography>
                          )}
                          {column.key === 'description' && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              —
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
                                '&:hover': { textDecoration: 'underline' },
                              }}
                              onClick={() => router.push('/listings/1')}
                            >
                              {expense.listing}
                            </Typography>
                          )}
                          {column.key === 'listingId' && (
                            <Typography
                              variant="body2"
                              sx={{ color: 'text.secondary', fontFamily: 'monospace' }}
                            >
                              —
                            </Typography>
                          )}
                          {column.key === 'reservation' && (
                            <Typography
                              variant="body2"
                              sx={{ color: 'text.secondary', textAlign: 'center' }}
                            >
                              —
                            </Typography>
                          )}
                          {column.key === 'reservationId' && (
                            <Typography
                              variant="body2"
                              sx={{ color: 'text.secondary', fontFamily: 'monospace' }}
                            >
                              —
                            </Typography>
                          )}
                          {column.key === 'owner' && (
                            <Typography
                              variant="body2"
                              sx={{ color: 'text.secondary', textAlign: 'center' }}
                            >
                              —
                            </Typography>
                          )}
                          {column.key === 'ownerStatement' && (
                            <Typography
                              variant="body2"
                              sx={{ color: 'text.primary', lineHeight: 1.4 }}
                            >
                              {expense.ownerStatement}
                            </Typography>
                          )}
                          {column.key === 'amount' && (
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, color: 'error.main', textAlign: 'right' }}
                            >
                              -€{expense.amount.toFixed(2)}
                            </Typography>
                          )}
                          {column.key === 'currency' && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              EUR
                            </Typography>
                          )}
                          {column.key === 'status' && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              —
                            </Typography>
                          )}
                          {column.key === 'createdAt' && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              —
                            </Typography>
                          )}
                          {column.key === 'updatedAt' && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              —
                            </Typography>
                          )}
                        </TableCell>
                      )
                  )}
                  <TableCell
                    align="center"
                    sx={{
                      position: 'sticky',
                      right: 0,
                      bgcolor: index % 2 === 0 ? 'white' : 'grey.50',
                      borderLeft: '1px solid',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      zIndex: 1,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditExpense(expense)}
                        sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => handleAttachmentClick(e, expense)}
                        sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
                      >
                        <Paperclip size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDuplicateExpense(expense)}
                        sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
                      >
                        <Copy size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(expense)}
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

      {/* Total Amount - Sticky */}
      <Paper
        sx={{ p: 2, mb: 2, position: 'sticky', bottom: 0, bgcolor: 'background.paper', zIndex: 1 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            TOTAL
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'error.main' }}>
            -€{totalAmount.toFixed(2)}
          </Typography>
        </Box>
      </Paper>

      {/* Pagination */}
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              TOTAL
            </Typography>
            <Select value={itemsPerPage} size="small" sx={{ minWidth: 120 }}>
              <MenuItem value={25}>Show 25 per page</MenuItem>
              <MenuItem value={50}>Show 50 per page</MenuItem>
              <MenuItem value={100}>Show 100 per page</MenuItem>
            </Select>
          </Box>
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
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              &lt;
            </Button>
            {getPaginationItems().map((item, index) =>
              item === '...' ? (
                <Typography
                  key={`ellipsis-${index}`}
                  variant="body2"
                  sx={{ px: 1, color: 'text.secondary' }}
                >
                  ...
                </Typography>
              ) : (
                <Button
                  key={item}
                  size="small"
                  variant={item === currentPage ? 'contained' : 'outlined'}
                  onClick={() => setCurrentPage(item as number)}
                  sx={{ minWidth: 32 }}
                >
                  {item}
                </Button>
              )
            )}
            <Button
              size="small"
              variant="outlined"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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

      {/* Add Expense Sidebar */}
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
            {editingExpense?.isDuplicating
              ? 'Duplicate expense'
              : editingExpense
                ? 'Edit expense'
                : 'Add new expense'}
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <X size={20} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Expense Name Field */}
          <TextField
            fullWidth
            label="Expense name *"
            placeholder="Enter expense name..."
            value={formData.expenseName}
            onChange={(e) => handleInputChange('expenseName', e.target.value)}
            required
          />

          {/* Large Description Text Area */}
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter description or notes..."
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '1rem',
                padding: 2,
              },
            }}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />

          {/* Date Field */}
          <TextField
            fullWidth
            label="Date *"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Calendar size={20} color="#666" />
                </InputAdornment>
              ),
            }}
          />

          {/* Amount Field with Increment/Decrement */}
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Amount *
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => handleAmountChange('decrement')}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <Minus size={16} />
              </IconButton>
              <TextField
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    textAlign: 'center',
                  },
                }}
              />
              <IconButton
                onClick={() => handleAmountChange('increment')}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <Plus size={16} />
              </IconButton>
            </Box>
          </Box>

          {/* Categories Dropdown */}
          <FormControl fullWidth>
            <InputLabel>Categories</InputLabel>
            <Select
              value={formData.categories}
              onChange={(e) => handleInputChange('categories', e.target.value)}
              label="Categories"
            >
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="utilities">Utilities</MenuItem>
              <MenuItem value="repairs">Repairs</MenuItem>
              <MenuItem value="marketing">Marketing</MenuItem>
              <MenuItem value="cleaning">Cleaning</MenuItem>
              <MenuItem value="supplies">Supplies</MenuItem>
            </Select>
          </FormControl>

          {/* Listing Dropdown */}
          <FormControl fullWidth>
            <InputLabel>Listing</InputLabel>
            <Select
              value={formData.listing}
              onChange={(e) => handleInputChange('listing', e.target.value)}
              label="Listing"
            >
              <MenuItem value="via-acqua">Via di Acqua Bullicante 113</MenuItem>
              <MenuItem value="vaticano">Splendido appartamento due passi dal Vaticano</MenuItem>
              <MenuItem value="elegant-roman">Elegant Roman Apartment</MenuItem>
              <MenuItem value="la-dimora">La Dimora Del Cavaliere</MenuItem>
              <MenuItem value="navigli">Navigli</MenuItem>
              <MenuItem value="polacchi">Polacchi42</MenuItem>
            </Select>
          </FormControl>

          {/* Reservation Dropdown */}
          <FormControl fullWidth>
            <InputLabel>Reservation</InputLabel>
            <Select
              value={formData.reservation}
              onChange={(e) => handleInputChange('reservation', e.target.value)}
              label="Reservation"
            >
              <MenuItem value="res-001">RES-001</MenuItem>
              <MenuItem value="res-002">RES-002</MenuItem>
              <MenuItem value="res-003">RES-003</MenuItem>
              <MenuItem value="res-004">RES-004</MenuItem>
            </Select>
          </FormControl>

          {/* Owner Dropdown */}
          <FormControl fullWidth>
            <InputLabel>Owner</InputLabel>
            <Select
              value={formData.owner}
              onChange={(e) => handleInputChange('owner', e.target.value)}
              label="Owner"
            >
              <MenuItem value="john-doe">John Doe</MenuItem>
              <MenuItem value="jane-smith">Jane Smith</MenuItem>
              <MenuItem value="mike-johnson">Mike Johnson</MenuItem>
              <MenuItem value="sarah-wilson">Sarah Wilson</MenuItem>
            </Select>
          </FormControl>

          {/* Attachments Section */}
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Attachments
            </Typography>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'primary.lighter',
                },
              }}
            >
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
                >
                  <Upload size={24} color="#666" />
                  <Typography variant="body2" color="text.secondary">
                    Drop files to upload or Browse
                  </Typography>
                </Box>
              </label>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button fullWidth variant="outlined" onClick={handleSidebarClose} sx={{ py: 1.5 }}>
              Cancel
            </Button>
            <Button fullWidth variant="contained" onClick={handleCreateExpense} sx={{ py: 1.5 }}>
              {editingExpense?.isDuplicating ? 'Duplicate' : editingExpense ? 'Update' : 'Create'}
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
              Upload your expense data file
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
          <TextField fullWidth label="View Name" placeholder="Enter view name..." sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCustomViewClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCustomViewClose}>
            Create View
          </Button>
        </DialogActions>
      </Dialog>

      {/* Column Visibility Settings Popover */}
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
        sx={{ mt: 1 }}
      >
        <Box sx={{ p: 2, minWidth: 250 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Find column"
            value={columnSearchTerm}
            onChange={(e) => setColumnSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} color="#666" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          {allColumns
            .filter((column) => column.label.toLowerCase().includes(columnSearchTerm.toLowerCase()))
            .map((column) => (
              <FormControlLabel
                key={column.key}
                control={
                  <Checkbox
                    checked={visibleColumns.includes(column.key)}
                    onChange={() => handleColumnToggle(column.key)}
                    disabled={column.mandatory}
                    size="small"
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      color: column.mandatory ? 'text.disabled' : 'text.primary',
                      fontSize: '0.875rem',
                    }}
                  >
                    {column.label}
                    {column.mandatory && ' (Required)'}
                  </Typography>
                }
                sx={{ display: 'block', mb: 0.5 }}
              />
            ))}
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
        <DialogTitle>Delete Expense</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete &quot;{expenseToDelete?.name}&quot;? This action cannot
            be undone.
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
