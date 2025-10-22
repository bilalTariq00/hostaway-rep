import { useState } from 'react';
import { X, Info, Filter, Pencil, Search, Download, Settings, MoreVertical } from 'lucide-react';

import {
  Box,
  Tab,
  Chip,
  Menu,
  Tabs,
  Paper,
  Table,
  Button,
  Dialog,
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

// Mock data for statements
const mockStatements = [
  {
    id: 1,
    statementName: 'Via matera, 39 - DF Method September [Da Pubblicare]',
    status: 'DRAFT',
    dates: 'Sep 01, 2025 to Sep 30, 2025',
    owners: '',
    createdBy: 'Team | Domus',
    createdOn: 'Sep 30, 2025',
    total: 129.08,
  },
  {
    id: 2,
    statementName: 'Navigli - DF Method September [Da Pubblicare]',
    status: 'DRAFT',
    dates: 'Sep 01, 2025 to Sep 30, 2025',
    owners: '',
    createdBy: 'Team | Domus',
    createdOn: 'Sep 28, 2025',
    total: 695.97,
  },
  {
    id: 3,
    statementName: 'Polacchi42 - CL method - September [Da Saldare]',
    status: 'PUBLISHED',
    dates: 'Sep 01, 2025 to Sep 30, 2025',
    owners: 'Manuel Sciarria',
    createdBy: 'Team | Domus',
    createdOn: 'Sep 28, 2025',
    total: 1759.65,
  },
  {
    id: 4,
    statementName: 'Via del Corso - CL method - September [Da Pubblicare]',
    status: 'DRAFT',
    dates: 'Sep 01, 2025 to Sep 30, 2025',
    owners: 'Manuel Sciarria',
    createdBy: 'Team | Domus',
    createdOn: 'Sep 28, 2025',
    total: 5490.32,
  },
  {
    id: 5,
    statementName: 'Via Acqua Bulicante - DF Method September [Da Pagare]',
    status: 'PUBLISHED',
    dates: 'Sep 01, 2025 to Sep 30, 2025',
    owners: '',
    createdBy: 'Team | Domus',
    createdOn: 'Sep 28, 2025',
    total: 900.0,
  },
  {
    id: 6,
    statementName: 'Montecatini Terme CL method September [Pagata]',
    status: 'DRAFT',
    dates: 'Sep 01, 2025 to Sep 30, 2025',
    owners: 'Manuel Sciarria',
    createdBy: 'Team | Domus',
    createdOn: 'Sep 28, 2025',
    total: 548.06,
  },
  {
    id: 7,
    statementName: 'Monteverde - Quattroventi CL method September',
    status: 'DRAFT',
    dates: 'Sep 01, 2025 to Sep 30, 2025',
    owners: 'Manuel Sciarria',
    createdBy: 'Team | Domus',
    createdOn: 'Sep 28, 2025',
    total: 1408.26,
  },
];

// All possible columns for the statements table
const allColumns = [
  { key: 'statement', label: 'Statement', sortable: true, mandatory: true },
  { key: 'status', label: 'Status', sortable: true, mandatory: false },
  { key: 'dates', label: 'Dates', sortable: true, mandatory: false },
  { key: 'owners', label: 'Owners', sortable: true, mandatory: false },
  { key: 'createdBy', label: 'Created by', sortable: true, mandatory: false },
  { key: 'createdOn', label: 'Created on', sortable: true, mandatory: false },
  { key: 'total', label: 'Total', sortable: true, mandatory: false },
];

export function StatementsView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);

  // New state for dynamic table functionality
  const [statements, setStatements] = useState(mockStatements);
  const [selectedStatements, setSelectedStatements] = useState<number[]>([]);
  const [columnSettingsAnchor, setColumnSettingsAnchor] = useState<null | HTMLElement>(null);
  const [columnSearchTerm, setColumnSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.slice(0, 7).map((col) => col.key)
  );

  // Modal states
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [unpublishModalOpen, setUnpublishModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [downloadMenuAnchor, setDownloadMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedStatement, setSelectedStatement] = useState<any>(null);

  // Form data for modals
  const [formData, setFormData] = useState({
    statementName: '',
    assignOwner: '',
    selectWhoCanAccess: '',
  });

  const [templateFormData, setTemplateFormData] = useState({
    template: '',
    statementName: '',
  });

  const [duplicateFormData, setDuplicateFormData] = useState({
    statementName: '',
    assignOwner: '',
    selectOneOwnerToAutoFill: '',
    selectWhoCanAccess: '',
  });

  const [settingsFormData, setSettingsFormData] = useState({
    statementName: '',
    assignOwner: '',
    selectOneOwnerToAutoFill: '',
    selectWhoCanAccess: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) router.push('/owner-statements/auto');
  };

  // Form handlers
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTemplateInputChange = (field: string, value: any) => {
    setTemplateFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateStatement = () => {
    if (formData.statementName.trim()) {
      const newStatement = {
        id: Math.max(...statements.map((s) => s.id)) + 1,
        statementName: formData.statementName,
        status: 'DRAFT',
        dates: 'Sep 01, 2025 to Sep 30, 2025',
        owners: formData.assignOwner || '',
        createdBy: 'Team | Domus',
        createdOn: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
        total: 0,
      };
      setStatements((prev) => [...prev, newStatement]);
      setSidebarOpen(false);
      setFormData({ statementName: '', assignOwner: '', selectWhoCanAccess: '' });
    }
  };

  const handleCreateFromTemplate = () => {
    if (templateFormData.statementName.trim()) {
      const newStatement = {
        id: Math.max(...statements.map((s) => s.id)) + 1,
        statementName: templateFormData.statementName,
        status: 'DRAFT',
        dates: 'Sep 01, 2025 to Sep 30, 2025',
        owners: '',
        createdBy: 'Team | Domus',
        createdOn: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
        total: 0,
      };
      setStatements((prev) => [...prev, newStatement]);
      setTemplateModalOpen(false);
      setTemplateFormData({ template: '', statementName: '' });
    }
  };

  const handleEditStatement = (statement: any) => {
    // Navigate to edit page
    router.push(`/statements/${statement.id}/edit`);
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, statement: any) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedStatement(statement);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedStatement(null);
  };

  const handleDownloadClick = (event: React.MouseEvent<HTMLElement>, statement: any) => {
    setDownloadMenuAnchor(event.currentTarget);
    setSelectedStatement(statement);
  };

  const handleDownloadClose = () => {
    setDownloadMenuAnchor(null);
    setSelectedStatement(null);
  };

  const handleDownloadPDF = () => {
    console.log(`Downloading PDF for statement: ${selectedStatement?.statementName}`);
    alert(`Downloading PDF for "${selectedStatement?.statementName}"`);
    handleDownloadClose();
  };

  const handleDownloadExcel = () => {
    console.log(`Downloading Excel for statement: ${selectedStatement?.statementName}`);
    alert(`Downloading Excel for "${selectedStatement?.statementName}"`);
    handleDownloadClose();
  };

  const handleDuplicateClick = () => {
    if (selectedStatement) {
      setDuplicateFormData({
        statementName: `Copy of ${selectedStatement.statementName}`,
        assignOwner: '',
        selectOneOwnerToAutoFill: '',
        selectWhoCanAccess: 'Managers Domus,Team | Domus',
      });
      setDuplicateModalOpen(true);
    }
    handleActionMenuClose();
  };

  const handleSettingsClick = () => {
    if (selectedStatement) {
      setSettingsFormData({
        statementName: selectedStatement.statementName,
        assignOwner: '',
        selectOneOwnerToAutoFill: '',
        selectWhoCanAccess: 'Managers Domus,Team | Domus',
      });
      setSettingsModalOpen(true);
    }
    handleActionMenuClose();
  };

  const handleUnpublishClick = () => {
    setUnpublishModalOpen(true);
    handleActionMenuClose();
  };

  const handleArchiveClick = () => {
    setArchiveModalOpen(true);
    handleActionMenuClose();
  };

  const handleDuplicateFormChange = (field: string, value: any) => {
    setDuplicateFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSettingsFormChange = (field: string, value: any) => {
    setSettingsFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateDuplicate = () => {
    if (duplicateFormData.statementName.trim()) {
      const newStatement = {
        id: Math.max(...statements.map((s) => s.id)) + 1,
        statementName: duplicateFormData.statementName,
        status: 'DRAFT',
        dates: 'Sep 01, 2025 to Sep 30, 2025',
        owners: duplicateFormData.assignOwner || '',
        createdBy: 'Team | Domus',
        createdOn: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
        total: 0,
      };
      setStatements((prev) => [...prev, newStatement]);
      setDuplicateModalOpen(false);
      setDuplicateFormData({
        statementName: '',
        assignOwner: '',
        selectOneOwnerToAutoFill: '',
        selectWhoCanAccess: '',
      });
    }
  };

  const handleSaveSettings = () => {
    if (selectedStatement && settingsFormData.statementName.trim()) {
      setStatements((prev) =>
        prev.map((statement) =>
          statement.id === selectedStatement.id
            ? { ...statement, statementName: settingsFormData.statementName }
            : statement
        )
      );
      setSettingsModalOpen(false);
      setSettingsFormData({
        statementName: '',
        assignOwner: '',
        selectOneOwnerToAutoFill: '',
        selectWhoCanAccess: '',
      });
    }
  };

  const handleUnpublishConfirm = () => {
    if (selectedStatement) {
      setStatements((prev) =>
        prev.map((statement) =>
          statement.id === selectedStatement.id ? { ...statement, status: 'DRAFT' } : statement
        )
      );
      setUnpublishModalOpen(false);
    }
  };

  const handleArchiveConfirm = () => {
    if (selectedStatement) {
      setStatements((prev) =>
        prev.map((statement) =>
          statement.id === selectedStatement.id ? { ...statement, status: 'ARCHIVED' } : statement
        )
      );
      setArchiveModalOpen(false);
    }
  };

  const handleAddStatement = () => {
    setFormData({ statementName: '', assignOwner: '', selectWhoCanAccess: '' });
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setFormData({ statementName: '', assignOwner: '', selectWhoCanAccess: '' });
  };

  const handleAddFromTemplate = () => {
    setTemplateFormData({ template: '', statementName: '' });
    setTemplateModalOpen(true);
  };

  const handleTemplateClose = () => {
    setTemplateModalOpen(false);
    setTemplateFormData({ template: '', statementName: '' });
  };

  // Column settings handlers
  const handleColumnSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setColumnSettingsAnchor(event.currentTarget);
  };

  const handleColumnSettingsClose = () => {
    setColumnSettingsAnchor(null);
  };

  const handleColumnToggle = (columnKey: string) => {
    const column = allColumns.find((col) => col.key === columnKey);
    if (column?.mandatory) return;

    setVisibleColumns((prev) =>
      prev.includes(columnKey) ? prev.filter((key) => key !== columnKey) : [...prev, columnKey]
    );
  };

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedStatements(statements.map((statement) => statement.id));
    } else {
      setSelectedStatements([]);
    }
  };

  const handleSelectStatement = (statementId: number) => {
    setSelectedStatements((prev) =>
      prev.includes(statementId) ? prev.filter((id) => id !== statementId) : [...prev, statementId]
    );
  };

  // Data processing
  const filteredStatements = statements.filter(
    (statement) =>
      statement.statementName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      statement.owners.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredStatements].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const filteredColumns = allColumns.filter((column) =>
    column.label.toLowerCase().includes(columnSearchTerm.toLowerCase())
  );

  const totalAmount = filteredStatements.reduce((sum, statement) => sum + statement.total, 0);
  const totalPages = Math.ceil(filteredStatements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStatements = sortedData.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Owner statements
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={handleAddFromTemplate}>
              Add from template
            </Button>
            <Button variant="contained" onClick={handleAddStatement}>
              + Add statement
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
          <Tab label="Statements" />
          <Tab label="Auto-statements" />
        </Tabs>
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

      {/* Statements Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <TableContainer sx={{ maxHeight: 600, overflowY: 'auto', overflowX: 'auto' }}>
          <Table sx={{ minWidth: visibleColumns.length * 120 }}>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell padding="checkbox" sx={{ fontWeight: 600 }}>
                  <Checkbox
                    indeterminate={
                      selectedStatements.length > 0 && selectedStatements.length < statements.length
                    }
                    checked={selectedStatements.length === statements.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {allColumns.map(
                  (column) =>
                    visibleColumns.includes(column.key) && (
                      <TableCell
                        key={column.key}
                        sx={{
                          fontWeight: 600,
                          minWidth: 120,
                          whiteSpace: 'nowrap',
                          cursor: column.sortable ? 'pointer' : 'default',
                          '&:hover': column.sortable ? { bgcolor: 'grey.100' } : {},
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
                )}
                <TableCell
                  sx={{
                    position: 'sticky',
                    right: 0,
                    bgcolor: 'background.paper',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                    zIndex: 10,
                    px: 0,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={handleColumnSettingsClick}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { bgcolor: 'grey.100', color: 'text.primary' },
                    }}
                  >
                    <Settings size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentStatements.map((statement, index) => (
                <TableRow key={statement.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedStatements.includes(statement.id)}
                      onChange={() => handleSelectStatement(statement.id)}
                    />
                  </TableCell>
                  {allColumns.map(
                    (column) =>
                      visibleColumns.includes(column.key) && (
                        <TableCell key={column.key} sx={{ minWidth: 120, whiteSpace: 'nowrap' }}>
                          {column.key === 'statement' && (
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                color: 'primary.main',
                                cursor: 'pointer',
                                '&:hover': { color: 'primary.dark' },
                              }}
                              onClick={() => handleEditStatement(statement)}
                            >
                              {statement.statementName}
                            </Typography>
                          )}
                          {column.key === 'status' && (
                            <Chip
                              label={statement.status}
                              size="small"
                              color={statement.status === 'PUBLISHED' ? 'success' : 'default'}
                              sx={{
                                bgcolor:
                                  statement.status === 'PUBLISHED' ? 'success.main' : 'grey.300',
                                color: statement.status === 'PUBLISHED' ? 'white' : 'text.primary',
                                fontWeight: 600,
                              }}
                            />
                          )}
                          {column.key === 'dates' && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {statement.dates}
                            </Typography>
                          )}
                          {column.key === 'owners' && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {statement.owners || '—'}
                            </Typography>
                          )}
                          {column.key === 'createdBy' && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {statement.createdBy}
                            </Typography>
                          )}
                          {column.key === 'createdOn' && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {statement.createdOn}
                            </Typography>
                          )}
                          {column.key === 'total' && (
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, color: 'primary.main' }}
                            >
                              €{statement.total.toFixed(2)}
                            </Typography>
                          )}
                        </TableCell>
                      )
                  )}
                  <TableCell
                    sx={{
                      position: 'sticky',
                      right: 0,
                      bgcolor: index % 2 === 0 ? 'white' : 'grey.50',
                      borderLeft: '1px solid',
                      borderColor: 'divider',
                      zIndex: 10,
                      px: 0,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditStatement(statement)}
                        sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => handleDownloadClick(e, statement)}
                        sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
                      >
                        <Download size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => handleActionMenuOpen(e, statement)}
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
            TOTAL
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            €{totalAmount.toFixed(2)}
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
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              &lt;
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  size="small"
                  variant={currentPage === pageNum ? 'contained' : 'outlined'}
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
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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

      {/* Add Statement Modal */}
      <Dialog open={sidebarOpen} onClose={handleSidebarClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              New statement
            </Typography>
            <IconButton onClick={handleSidebarClose}>
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <TextField
              fullWidth
              label="Statement name *"
              placeholder="Enter statement name..."
              value={formData.statementName}
              onChange={(e) => handleInputChange('statementName', e.target.value)}
              required
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
                onChange={(e) => handleInputChange('assignOwner', e.target.value)}
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
                <Typography variant="body2">Select who can access this statement ⓘ</Typography>
                <Info size={16} color="#666" />
              </Box>
              <TextField
                fullWidth
                placeholder="Team | Domus x"
                value={formData.selectWhoCanAccess}
                onChange={(e) => handleInputChange('selectWhoCanAccess', e.target.value)}
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
          <Button onClick={handleSidebarClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateStatement}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Template Modal */}
      <Dialog open={templateModalOpen} onClose={handleTemplateClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              New statement from template (auto-statement)
            </Typography>
            <IconButton onClick={handleTemplateClose}>
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Template (Auto-statement) *</InputLabel>
              <Select
                label="Template (Auto-statement) *"
                value={templateFormData.template}
                onChange={(e) => handleTemplateInputChange('template', e.target.value)}
              >
                <MenuItem value="monthly">Monthly Statement Template</MenuItem>
                <MenuItem value="quarterly">Quarterly Statement Template</MenuItem>
                <MenuItem value="yearly">Yearly Statement Template</MenuItem>
                <MenuItem value="property">Property Statement Template</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Statement name *"
              placeholder="Enter statement name..."
              value={templateFormData.statementName}
              onChange={(e) => handleTemplateInputChange('statementName', e.target.value)}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTemplateClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateFromTemplate}>
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
        <MenuItem onClick={handleSettingsClick}>
          <Settings size={16} style={{ marginRight: 8 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleUnpublishClick}>Unpublish (Draft)</MenuItem>
        <MenuItem onClick={handleDuplicateClick}>Duplicate</MenuItem>
        <MenuItem onClick={handleArchiveClick} sx={{ color: 'warning.main' }}>
          Archive
        </MenuItem>
      </Menu>

      {/* Download Menu */}
      <Menu
        anchorEl={downloadMenuAnchor}
        open={Boolean(downloadMenuAnchor)}
        onClose={handleDownloadClose}
      >
        <MenuItem onClick={handleDownloadPDF}>Owner statement (pdf)</MenuItem>
        <MenuItem onClick={handleDownloadExcel}>Excel file (xlsx)</MenuItem>
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

      {/* Duplicate Statement Modal */}
      <Dialog
        open={duplicateModalOpen}
        onClose={() => setDuplicateModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Duplicate statement
            </Typography>
            <IconButton onClick={() => setDuplicateModalOpen(false)}>
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <TextField
              fullWidth
              label="Statement name *"
              placeholder="Enter statement name..."
              value={duplicateFormData.statementName}
              onChange={(e) => handleDuplicateFormChange('statementName', e.target.value)}
              required
            />

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2">Assign owner</Typography>
                <Info size={16} color="#666" />
              </Box>
              <TextField
                fullWidth
                placeholder="Select owner..."
                value={duplicateFormData.assignOwner}
                onChange={(e) => handleDuplicateFormChange('assignOwner', e.target.value)}
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
                <Typography variant="body2">
                  Select one owner to auto-fill the owner data
                </Typography>
                <Info size={16} color="#666" />
              </Box>
              <TextField
                fullWidth
                placeholder="Select owner..."
                value={duplicateFormData.selectOneOwnerToAutoFill}
                onChange={(e) =>
                  handleDuplicateFormChange('selectOneOwnerToAutoFill', e.target.value)
                }
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
                <Typography variant="body2">Select who can access this statement</Typography>
                <Info size={16} color="#666" />
              </Box>
              <TextField
                fullWidth
                placeholder="Managers Domus, Team | Domus"
                value={duplicateFormData.selectWhoCanAccess}
                onChange={(e) => handleDuplicateFormChange('selectWhoCanAccess', e.target.value)}
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
          <Button onClick={() => setDuplicateModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateDuplicate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Statement Settings Modal */}
      <Dialog
        open={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Statement settings
            </Typography>
            <IconButton onClick={() => setSettingsModalOpen(false)}>
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <TextField
              fullWidth
              label="Statement name *"
              placeholder="Enter statement name..."
              value={settingsFormData.statementName}
              onChange={(e) => handleSettingsFormChange('statementName', e.target.value)}
              required
            />

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2">Assign owner</Typography>
                <Info size={16} color="#666" />
              </Box>
              <TextField
                fullWidth
                placeholder="Select owner..."
                value={settingsFormData.assignOwner}
                onChange={(e) => handleSettingsFormChange('assignOwner', e.target.value)}
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
                <Typography variant="body2">
                  Select one owner to auto-fill the owner data
                </Typography>
                <Info size={16} color="#666" />
              </Box>
              <TextField
                fullWidth
                placeholder="Select owner..."
                value={settingsFormData.selectOneOwnerToAutoFill}
                onChange={(e) =>
                  handleSettingsFormChange('selectOneOwnerToAutoFill', e.target.value)
                }
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
                <Typography variant="body2">Select who can access this statement</Typography>
                <Info size={16} color="#666" />
              </Box>
              <TextField
                fullWidth
                placeholder="Managers Domus, Team | Domus"
                value={settingsFormData.selectWhoCanAccess}
                onChange={(e) => handleSettingsFormChange('selectWhoCanAccess', e.target.value)}
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
          <Button onClick={() => setSettingsModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveSettings}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Unpublish Statement Modal */}
      <Dialog
        open={unpublishModalOpen}
        onClose={() => setUnpublishModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Unpublish (draft) statement
            </Typography>
            <IconButton onClick={() => setUnpublishModalOpen(false)}>
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Unpublishing a statement removes the owner&apos;s access to it in Hostaway and changes
            its status to Unpublish (Draft). You can re-publish it anytime when it&apos;s ready.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to Unpublish (Draft) this statement now?
          </Typography>
          <FormControlLabel control={<Checkbox />} label="Don't show this again" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUnpublishModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUnpublishConfirm}>
            Unpublish
          </Button>
        </DialogActions>
      </Dialog>

      {/* Archive Statement Modal */}
      <Dialog
        open={archiveModalOpen}
        onClose={() => setArchiveModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Archive statement
            </Typography>
            <IconButton onClick={() => setArchiveModalOpen(false)}>
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Archiving a statement removes the owner&apos;s access to it in Hostaway and updates its
            status to Archived. You can re-archive it back anytime when it&apos;s ready.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to archive this statement now?
          </Typography>
          <FormControlLabel control={<Checkbox />} label="Don't show this again" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setArchiveModalOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleArchiveConfirm}
            sx={{ bgcolor: 'warning.main' }}
          >
            Archive
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
