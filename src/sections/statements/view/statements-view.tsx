import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for statements
const mockStatements = [
  {
    id: 1,
    statementName: 'Monthly Statement - Jan 2024',
    status: 'Published',
    statementDate: '2024-01-31',
    owner: 'John Doe',
    createdBy: 'Admin User',
    createdOn: '2024-01-30',
    total: 12500.00,
  },
  {
    id: 2,
    statementName: 'Q1 Statement - 2024',
    status: 'Draft',
    statementDate: '2024-03-31',
    owner: 'Jane Smith',
    createdBy: 'Manager',
    createdOn: '2024-03-25',
    total: 18750.00,
  },
  {
    id: 3,
    statementName: 'Property Statement - Villa Del Sol',
    status: 'Published',
    statementDate: '2024-02-15',
    owner: 'Mike Johnson',
    createdBy: 'Admin User',
    createdOn: '2024-02-14',
    total: 8750.00,
  },
  {
    id: 4,
    statementName: 'Weekly Statement - Week 8',
    status: 'Archived',
    statementDate: '2024-02-25',
    owner: 'Sarah Wilson',
    createdBy: 'Manager',
    createdOn: '2024-02-24',
    total: 3200.00,
  },
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) router.push('/statements/auto-statements');
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };


  const handleAddStatement = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleAddFromTemplate = () => {
    setTemplateModalOpen(true);
  };

  const handleTemplateClose = () => {
    setTemplateModalOpen(false);
  };

  const filteredStatements = mockStatements.filter(statement =>
    statement.statementName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    statement.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredStatements.reduce((sum, statement) => sum + statement.total, 0);
  const totalPages = Math.ceil(filteredStatements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStatements = filteredStatements.slice(startIndex, endIndex);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Owner Statements
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={handleAddFromTemplate}>
              Add from Template
            </Button>
            <Button variant="contained" onClick={handleAddStatement}>
              Add Statement
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
          <Button variant="outlined" startIcon={<Iconify icon={"eva:funnel-fill" as any} />}>
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
                  <Iconify icon={"eva:search-fill" as any} sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
        </Box>
      </Paper>

      {/* Statements Table */}
      <Paper sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Statement</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Statement Date</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Created On</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentStatements.map((statement) => (
                <TableRow key={statement.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {statement.statementName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={statement.status}
                      size="small"
                      color={
                        statement.status === 'Published'
                          ? 'success'
                          : statement.status === 'Draft'
                            ? 'warning'
                            : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {statement.statementDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {statement.owner}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {statement.createdBy}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {statement.createdOn}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      €{statement.total.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small">
                        <Iconify icon={"eva:edit-fill" as any} width={16} />
                      </IconButton>
                      <IconButton size="small">
                        <Iconify icon={"eva:download-fill" as any} width={16} />
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
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>
      </Paper>

      {/* Add Statement Sidebar */}
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
            Add Statement
          </Typography>
          <IconButton onClick={handleSidebarClose}>
            <Iconify icon={"eva:close-fill" as any} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Statement Name"
            placeholder="Enter statement name..."
          />

          <TextField
            fullWidth
            type="date"
            label="Statement Date"
            InputLabelProps={{ shrink: true }}
          />

          <FormControl fullWidth>
            <InputLabel>Owner</InputLabel>
            <Select label="Owner">
              <MenuItem value="john">John Doe</MenuItem>
              <MenuItem value="jane">Jane Smith</MenuItem>
              <MenuItem value="mike">Mike Johnson</MenuItem>
              <MenuItem value="sarah">Sarah Wilson</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Total Amount"
            type="number"
            placeholder="0.00"
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
              onClick={handleSidebarClose}
            >
              Add Statement
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Template Modal */}
      <Dialog open={templateModalOpen} onClose={handleTemplateClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add from Template</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Template"
              select
            >
              <MenuItem value="monthly">Monthly Statement Template</MenuItem>
              <MenuItem value="quarterly">Quarterly Statement Template</MenuItem>
              <MenuItem value="yearly">Yearly Statement Template</MenuItem>
              <MenuItem value="property">Property Statement Template</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Statement Name"
              placeholder="Enter statement name..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTemplateClose}>Cancel</Button>
          <Button variant="contained" onClick={handleTemplateClose}>
            Create Statement
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
          <Iconify icon={"eva:settings-fill" as any} sx={{ mr: 1 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:share-fill" as any} sx={{ mr: 1 }} />
          Publish
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose}>
          <Iconify icon={"eva:copy-fill" as any} sx={{ mr: 1 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleActionMenuClose} sx={{ color: 'warning.main' }}>
          <Iconify icon={"eva:archive-fill" as any} sx={{ mr: 1 }} />
          Archive
        </MenuItem>
      </Menu>

    </DashboardContent>
  );
}
