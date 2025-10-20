import type { User as UserType } from 'src/contexts/auth-context';

import { useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock properties data (same as in create-account page)
const mockProperties = [
  { id: '305034', name: 'La Dimora Del Cavaliere', location: 'Anguillara Sabazia, Italy' },
  { id: '305035', name: 'Navigli', location: 'Milano, Italy' },
  { id: '305225', name: 'Polacchi42', location: 'Roma, Italy' },
  { id: '305421', name: 'Superattico - Via Del Corso 43', location: 'Roma, Italy' },
  { id: '306532', name: 'Montecatini Terme', location: 'Montecatini Terme, Italy' },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'associate': return 'primary';
    case 'supervisor': return 'warning';
    case 'manager': return 'success';
    case 'user': return 'default';
    case 'team': return 'secondary';
    default: return 'default';
  }
};

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'associate': return 'Associate';
    case 'supervisor': return 'Supervisor';
    case 'manager': return 'Manager';
    case 'user': return 'User';
    case 'team': return 'Team';
    default: return role;
  }
};

const getStatusColor = (role: string) => {
  // For demo purposes, assign status based on role
  switch (role) {
    case 'manager': return 'success';
    case 'supervisor': return 'warning';
    case 'associate': return 'error';
    default: return 'default';
  }
};

const getStatusLabel = (role: string) => {
  switch (role) {
    case 'manager': return 'Active';
    case 'supervisor': return 'Pending';
    case 'associate': return 'Banned';
    default: return 'Active';
  }
};

export function UserManagementPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);

  useEffect(() => {
    // Load created users from localStorage
    const createdUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
    setUsers(createdUsers);
  }, []);

  const handleViewUser = (user: UserType) => {
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('createdUsers', JSON.stringify(updatedUsers));
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedUser(null);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map((user) => user.id);
      setSelectedUsers(newSelected);
      return;
    }
    setSelectedUsers([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, userId: string) => {
    const selectedIndex = selectedUsers.indexOf(userId);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedUsers, userId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelected = newSelected.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1),
      );
    }

    setSelectedUsers(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (userId: string) => selectedUsers.indexOf(userId) !== -1;

  // Pagination
  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            User Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage created user accounts and their property assignments
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate('/create-account')}
          sx={{ height: 'fit-content' }}
        >
          Create Account
        </Button>
      </Box>

      <Card>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                    checked={users.length > 0 && selectedUsers.length === users.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Phone
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Company
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Role
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Status
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                    <Typography variant="body2" color="text.secondary">
                      No users created yet. Create your first user account to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => {
                  const isItemSelected = isSelected(user.id);
                  const labelId = `enhanced-table-checkbox-${user.id}`;

                  return (
                    <TableRow
                      key={user.id}
                      hover
                      onClick={(event) => handleClick(event, user.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                            {user.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {user.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          +1 (555) 123-4567
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          Hostaway Inc
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getRoleLabel(user.role)}
                          color={getRoleColor(user.role) as any}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(user.role)}
                          color={getStatusColor(user.role) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewUser(user);
                            }}
                            color="primary"
                          >
                            <Eye size={16} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Edit functionality would go here
                            }}
                            color="primary"
                          >
                            <Edit size={16} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteUser(user.id);
                            }}
                            color="error"
                          >
                            <Trash2 size={16} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              // More options would go here
                            }}
                          >
                            <MoreHorizontal size={16} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={dense}
                onChange={(event) => setDense(event.target.checked)}
              />
            }
            label="Dense"
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Rows per page:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
          />
        </Box>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {selectedUser?.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h6">{selectedUser?.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedUser?.email}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Role Information
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Chip
                label={selectedUser ? getRoleLabel(selectedUser.role) : ''}
                color={selectedUser ? getRoleColor(selectedUser.role) as any : 'default'}
                sx={{ mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {selectedUser?.role === 'associate' && 'Lowest level workers with basic access to assigned properties'}
                {selectedUser?.role === 'supervisor' && 'Manages Associates and has elevated access to assigned properties'}
                {selectedUser?.role === 'manager' && 'Super admins with full access to all properties and system management'}
              </Typography>
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              Assigned Properties
            </Typography>
            {selectedUser?.assignedProperties && selectedUser.assignedProperties.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {selectedUser.assignedProperties.map((propertyId) => {
                  const property = mockProperties.find(p => p.id === propertyId);
                  return (
                    <Card key={propertyId} variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {property ? property.name : `Property ${propertyId}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {property ? property.location : ''} (ID: {propertyId})
                      </Typography>
                    </Card>
                  );
                })}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No properties assigned
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}