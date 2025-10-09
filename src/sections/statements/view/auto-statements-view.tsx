import { useState } from 'react';
import {
  Filter,
  Info,
  MoreVertical,
  Pencil,
  Play,
  Search,
  Settings,
  X,
} from 'lucide-react';

import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Select,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for auto-statements
const mockAutoStatements = [
  {
    id: 1,
    autoStatementName: 'Monthly Auto Statement',
    description: 'Automated monthly statement generation',
    frequency: 'Monthly',
    owner: 'John Doe',
    status: 'Active',
    lastGenerated: '2024-01-31',
    nextGeneration: '2024-02-29',
    total: 12500.00,
  },
  {
    id: 2,
    autoStatementName: 'Quarterly Auto Statement',
    description: 'Automated quarterly statement generation',
    frequency: 'Quarterly',
    owner: 'Jane Smith',
    status: 'Active',
    lastGenerated: '2024-01-31',
    nextGeneration: '2024-04-30',
    total: 37500.00,
  },
  {
    id: 3,
    autoStatementName: 'Weekly Auto Statement',
    description: 'Automated weekly statement generation',
    frequency: 'Weekly',
    owner: 'Mike Johnson',
    status: 'Inactive',
    lastGenerated: '2024-01-28',
    nextGeneration: '2024-02-04',
    total: 3200.00,
  },
  {
    id: 4,
    autoStatementName: 'Property Auto Statement',
    description: 'Automated property statement generation',
    frequency: 'Monthly',
    owner: 'Sarah Wilson',
    status: 'Active',
    lastGenerated: '2024-01-31',
    nextGeneration: '2024-02-29',
    total: 8750.00,
  },
];

// Define all possible columns for dynamic table
const allColumns = [
  { key: 'autoStatement', label: 'Auto-Statement', sortable: true },
  { key: 'frequency', label: 'Frequency', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'lastGenerated', label: 'Last Generated', sortable: true },
  { key: 'nextGeneration', label: 'Next Generation', sortable: true },
  { key: 'total', label: 'Total', sortable: true },
];

export function AutoStatementsView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New state for dynamic table functionality
  const [autoStatements, setAutoStatements] = useState(mockAutoStatements);
  const [selectedAutoStatements, setSelectedAutoStatements] = useState<number[]>([]);
  const [columnSettingsAnchor, setColumnSettingsAnchor] = useState<null | HTMLElement>(null);
  const [columnSearchTerm, setColumnSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(0, 7).map(col => col.key));
  
  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedAutoStatement, setSelectedAutoStatement] = useState<any>(null);
  
  // Form data for modal
  const [formData, setFormData] = useState({
    autoStatementName: '',
    description: '',
    assignOwner: '',
    selectWhoCanAccess: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/owner-statements/statements');
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, autoStatement: any) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedAutoStatement(autoStatement);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedAutoStatement(null);
  };

  const handleAddAutoStatement = () => {
    setFormData({
      autoStatementName: '',
      description: '',
      assignOwner: '',
      selectWhoCanAccess: '',
    });
    setAddModalOpen(true);
  };

  const handleModalClose = () => {
    setAddModalOpen(false);
    setFormData({
      autoStatementName: '',
      description: '',
      assignOwner: '',
      selectWhoCanAccess: '',
    });
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateAutoStatement = () => {
    if (formData.autoStatementName.trim()) {
      const newAutoStatement = {
        id: Math.max(...autoStatements.map(s => s.id)) + 1,
        autoStatementName: formData.autoStatementName,
        description: formData.description,
        frequency: 'Monthly',
        owner: formData.assignOwner || '',
        status: 'Active',
        lastGenerated: new Date().toISOString().split('T')[0],
        nextGeneration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        total: 0,
      };
      setAutoStatements(prev => [...prev, newAutoStatement]);
      handleModalClose();
    }
  };

  const handleStatusToggle = (autoStatementId: number) => {
    setAutoStatements(prev => prev.map(autoStatement => 
      autoStatement.id === autoStatementId 
        ? { ...autoStatement, status: autoStatement.status === 'Active' ? 'Inactive' : 'Active' }
        : autoStatement
    ));
  };

  const handleColumnSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setColumnSettingsAnchor(event.currentTarget);
  };

  const handleColumnSettingsClose = () => {
    setColumnSettingsAnchor(null);
  };

  const handleColumnToggle = (columnKey: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnKey) 
        ? prev.filter(col => col !== columnKey)
        : [...prev, columnKey]
    );
  };

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAutoStatements(filteredAutoStatements.map(autoStatement => autoStatement.id));
    } else {
      setSelectedAutoStatements([]);
    }
  };

  const handleSelectAutoStatement = (autoStatementId: number, checked: boolean) => {
    if (checked) {
      setSelectedAutoStatements(prev => [...prev, autoStatementId]);
    } else {
      setSelectedAutoStatements(prev => prev.filter(id => id !== autoStatementId));
    }
  };

  // Filter and sort auto-statements
  const filteredAutoStatements = autoStatements.filter(autoStatement =>
    autoStatement.autoStatementName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    autoStatement.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAutoStatements = [...filteredAutoStatements].sort((a, b) => {
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

  const totalAmount = filteredAutoStatements.reduce((sum, autoStatement) => sum + autoStatement.total, 0);
  const totalPages = Math.ceil(sortedAutoStatements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAutoStatements = sortedAutoStatements.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Owner Statements
          </Typography>
          <Button variant="contained" onClick={handleAddAutoStatement}>
            Add Auto-statement
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
          <Tab label="Statements" />
          <Tab label="Auto-statements" />
        </Tabs>
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" startIcon={<Filter size={16} />}>
            Filters
          </Button>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="2 statuses" onDelete={() => {}} />
            <Typography variant="body2" color="error" sx={{ cursor: 'pointer' }}>
              Reset filters
            </Typography>
          </Box>
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
            sx={{ minWidth: 250, ml: 'auto' }}
          />
        </Box>
      </Paper>

      {/* Auto-statements Table */}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAutoStatements.length === currentAutoStatements.length && currentAutoStatements.length > 0}
                    indeterminate={selectedAutoStatements.length > 0 && selectedAutoStatements.length < currentAutoStatements.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableCell>
                {allColumns.map((column) => {
                  if (!visibleColumns.includes(column.key)) return null;
                  
                  return (
                    <TableCell
                      key={column.key}
                      onClick={() => column.sortable && handleSort(column.key)}
                      sx={{
                        cursor: column.sortable ? 'pointer' : 'default',
                        userSelect: 'none',
                        fontWeight: 600,
                        position: 'relative',
                        ...(column.key === 'total' && { textAlign: 'right' }),
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {column.label}
                        {sortColumn === column.key && (
                          <Typography variant="caption" sx={{ color: 'primary.main' }}>
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                  );
                })}
                <TableCell 
                  align="center" 
                  sx={{ 
                    position: 'sticky', 
                    right: 0, 
                    bgcolor: 'background.paper',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                    minWidth: 120,
                    fontWeight: 600
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    Actions
                    <IconButton 
                      size="small" 
                      onClick={handleColumnSettingsClick}
                      sx={{ 
                        ml: 1,
                        '&:hover': { bgcolor: 'grey.100' }
                      }}
                    >
                      <Settings size={16} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentAutoStatements.map((autoStatement) => (
                <TableRow 
                  key={autoStatement.id}
                  hover
                  sx={{ 
                    '&:hover': { bgcolor: 'grey.50' },
                    ...(selectedAutoStatements.includes(autoStatement.id) && {
                      bgcolor: 'primary.lighter',
                      '&:hover': { bgcolor: 'primary.lighter' }
                    })
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAutoStatements.includes(autoStatement.id)}
                      onChange={(e) => handleSelectAutoStatement(autoStatement.id, e.target.checked)}
                    />
                  </TableCell>
                  
                  {visibleColumns.includes('autoStatement') && (
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 500 }}>
                        {autoStatement.autoStatementName}
                      </Typography>
                    </TableCell>
                  )}
                  
                  {visibleColumns.includes('frequency') && (
                    <TableCell>
                      <Chip
                        label={autoStatement.frequency}
                        size="small"
                        color="info"
                      />
                    </TableCell>
                  )}
                  
                  {visibleColumns.includes('owner') && (
                    <TableCell>
                      <Typography variant="body2">
                        {autoStatement.owner}
                      </Typography>
                    </TableCell>
                  )}
                  
                  {visibleColumns.includes('status') && (
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Switch
                          checked={autoStatement.status === 'Active'}
                          onChange={() => handleStatusToggle(autoStatement.id)}
                          size="small"
                        />
                        <Chip
                          label={autoStatement.status}
                          size="small"
                          color={autoStatement.status === 'Active' ? 'success' : 'default'}
                        />
                      </Box>
                    </TableCell>
                  )}
                  
                  {visibleColumns.includes('lastGenerated') && (
                    <TableCell>
                      <Typography variant="body2">
                        {autoStatement.lastGenerated}
                      </Typography>
                    </TableCell>
                  )}
                  
                  {visibleColumns.includes('nextGeneration') && (
                    <TableCell>
                      <Typography variant="body2">
                        {autoStatement.nextGeneration}
                      </Typography>
                    </TableCell>
                  )}
                  
                  {visibleColumns.includes('total') && (
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        €{autoStatement.total.toLocaleString()}
                      </Typography>
                    </TableCell>
                  )}
                  
                  <TableCell 
                    align="center"
                    sx={{ 
                      position: 'sticky', 
                      right: 0, 
                      bgcolor: 'background.paper',
                      borderLeft: '1px solid',
                      borderColor: 'divider',
                      px: 0
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton 
                        size="small" 
                        sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
                      >
                        <Play size={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleActionMenuOpen(e, autoStatement)}
                        sx={{ '&:hover': { bgcolor: 'grey.100' } }}
                      >
                        <MoreVertical size={16} />
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
            Total
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            €{totalAmount.toLocaleString()}
          </Typography>
        </Box>
      </Paper>

      {/* Pagination */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Show 50 per page
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {startIndex + 1}-{Math.min(endIndex, sortedAutoStatements.length)} of {sortedAutoStatements.length}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Button
                size="small"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              <Button
                size="small"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* New Auto-statement Modal */}
      <Dialog open={addModalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              New auto-statement
            </Typography>
            <IconButton onClick={handleModalClose}>
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2">Auto-statement name *</Typography>
                <Info size={16} color="#666" />
              </Box>
              <TextField
                fullWidth
                placeholder="Enter auto-statement name..."
                value={formData.autoStatementName}
                onChange={(e) => handleFormChange('autoStatementName', e.target.value)}
                required
              />
            </Box>

            <TextField
              fullWidth
              label="Description"
              placeholder="Enter description..."
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
            />

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2">Assign owner</Typography>
                <Info size={16} color="#666" />
              </Box>
              <TextField
                fullWidth
                placeholder="Select owner..."
                value={formData.assignOwner}
                onChange={(e) => handleFormChange('assignOwner', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2">▼</Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2">Select who can access statements created from this auto-statement</Typography>
                <Info size={16} color="#666" />
              </Box>
              <TextField
                fullWidth
                placeholder="Team | Domus"
                value={formData.selectWhoCanAccess}
                onChange={(e) => handleFormChange('selectWhoCanAccess', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2">▼</Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateAutoStatement}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={handleActionMenuClose}>
          <Pencil size={16} style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Play size={16} style={{ marginRight: 8 }} />
          Run Now
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>

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
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Column Settings
          </Typography>
          <TextField
            size="small"
            placeholder="Search columns..."
            value={columnSearchTerm}
            onChange={(e) => setColumnSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
            sx={{ width: '100%', mb: 2 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {allColumns
              .filter(column => 
                column.label.toLowerCase().includes(columnSearchTerm.toLowerCase())
              )
              .map((column) => (
                <Box key={column.key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Checkbox
                    checked={visibleColumns.includes(column.key)}
                    onChange={() => handleColumnToggle(column.key)}
                    size="small"
                  />
                  <Typography variant="body2">{column.label}</Typography>
                </Box>
              ))}
          </Box>
        </Box>
      </Popover>

    </DashboardContent>
  );
}
