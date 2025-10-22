import type { User as UserType } from 'src/contexts/auth-context';

import { useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, ChevronDown } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
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

import { CreateAccountPage } from './create-account';

// Mock clients data (same as in create-account page)
const mockClients = [
  { id: 'client1', name: 'Luxury Rentals LLC', email: 'contact@luxuryrentals.com' },
  { id: 'client2', name: 'Vacation Homes Inc', email: 'info@vacationhomes.com' },
  { id: 'client3', name: 'Premium Properties', email: 'hello@premiumprops.com' },
  { id: 'client4', name: 'Elite Stays', email: 'support@elitestays.com' },
];

// Mock properties data with client assignments (same as in create-account page)
const mockProperties = [
  {
    id: '305034',
    name: 'La Dimora Del Cavaliere',
    location: 'Anguillara Sabazia, Italy',
    clientId: 'client1',
  },
  { id: '305035', name: 'Navigli', location: 'Milano, Italy', clientId: 'client1' },
  { id: '305225', name: 'Polacchi42', location: 'Roma, Italy', clientId: 'client2' },
  {
    id: '305421',
    name: 'Superattico - Via Del Corso 43',
    location: 'Roma, Italy',
    clientId: 'client2',
  },
  {
    id: '306532',
    name: 'Montecatini Terme',
    location: 'Montecatini Terme, Italy',
    clientId: 'client3',
  },
  { id: '306533', name: 'Tuscany Villa', location: 'Florence, Italy', clientId: 'client3' },
  { id: '306534', name: 'Coastal Retreat', location: 'Amalfi, Italy', clientId: 'client4' },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'associate':
      return 'primary';
    case 'supervisor':
      return 'warning';
    case 'manager':
      return 'success';
    case 'user':
      return 'default';
    case 'team':
      return 'secondary';
    default:
      return 'default';
  }
};

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'associate':
      return 'Associate';
    case 'supervisor':
      return 'Supervisor';
    case 'manager':
      return 'Manager';
    case 'user':
      return 'User';
    case 'team':
      return 'Team';
    default:
      return role;
  }
};

const getClientNames = (clientIds: string[] = []) =>
  clientIds.map((id) => mockClients.find((c) => c.id === id)?.name || `Client ${id}`).join(', ');

const getPropertyNames = (propertyIds: string[] = []) =>
  propertyIds
    .map((id) => mockProperties.find((p) => p.id === id)?.name || `Property ${id}`)
    .join(', ');

const getManagedUserNames = (userIds: string[] = []) => {
  const createdUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
  return userIds
    .map((id) => createdUsers.find((u: UserType) => u.id === id)?.name || `User ${id}`)
    .join(', ');
};

const getManagerName = (managerId?: string) => {
  if (!managerId) return 'No manager assigned';
  const createdUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
  const manager = createdUsers.find((u: UserType) => u.id === managerId);
  return manager ? manager.name : `Manager ${managerId}`;
};

const getSupervisorName = (supervisorId?: string) => {
  if (!supervisorId) return 'No supervisor assigned';
  const createdUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
  const supervisor = createdUsers.find((u: UserType) => u.id === supervisorId);
  return supervisor ? supervisor.name : `Supervisor ${supervisorId}`;
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'warning';
    case 'suspended':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusLabel = (status?: string) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'inactive':
      return 'Inactive';
    case 'suspended':
      return 'Suspended';
    default:
      return 'Active';
  }
};

export function UserManagementPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<null | HTMLElement>(null);
  const [userToChangeStatus, setUserToChangeStatus] = useState<UserType | null>(null);
  const [newStatus, setNewStatus] = useState<'active' | 'inactive' | 'suspended'>('active');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Load created users from localStorage
    const createdUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
    // Ensure all users have a status field
    const usersWithStatus = createdUsers.map((user: UserType) => ({
      ...user,
      status: user.status || 'active',
    }));
    setUsers(usersWithStatus);
  }, []);

  const handleViewUser = (user: UserType) => {
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleEditUser = (user: UserType) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      const updatedUsers = users.filter((user) => user.id !== userToDelete);
      setUsers(updatedUsers);
      localStorage.setItem('createdUsers', JSON.stringify(updatedUsers));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setStatusChangeDialogOpen(false);
    setSelectedUser(null);
    setUserToDelete(null);
    setUserToChangeStatus(null);
    setStatusMenuAnchor(null);
  };

  const handleStatusMenuOpen = (event: React.MouseEvent<HTMLElement>, user: UserType) => {
    event.stopPropagation();
    setStatusMenuAnchor(event.currentTarget);
    setUserToChangeStatus(user);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchor(null);
    // Don't clear userToChangeStatus here - we need it for the confirmation dialog
  };

  const handleStatusSelect = (status: 'active' | 'inactive' | 'suspended') => {
    if (userToChangeStatus) {
      setNewStatus(status);
      setStatusChangeDialogOpen(true);
      handleStatusMenuClose();
    }
  };

  const confirmStatusChange = () => {
    if (userToChangeStatus) {
      const updatedUsers = users.map((user) =>
        user.id === userToChangeStatus.id ? { ...user, status: newStatus } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem('createdUsers', JSON.stringify(updatedUsers));
      setStatusChangeDialogOpen(false);
      setUserToChangeStatus(null);
    }
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
        selectedUsers.slice(selectedIndex + 1)
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
                    Clients
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Properties
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Managed Users
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Manager
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Supervisor
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
                  <TableCell colSpan={13} align="center" sx={{ py: 8 }}>
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
                          <Avatar
                            sx={{
                              bgcolor: user.avatar ? 'transparent' : 'primary.main',
                              width: 40,
                              height: 40,
                              backgroundImage: user.avatar ? `url(${user.avatar})` : 'none',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                            }}
                          >
                            {!user.avatar && user.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {user.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.email}</Typography>
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
                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 150 }}>
                          {user.assignedClients && user.assignedClients.length > 0
                            ? getClientNames(user.assignedClients)
                            : 'No clients assigned'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 150 }}>
                          {user.assignedProperties && user.assignedProperties.length > 0
                            ? getPropertyNames(user.assignedProperties)
                            : 'No properties assigned'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 150 }}>
                          {user.assignedUsers && user.assignedUsers.length > 0
                            ? getManagedUserNames(user.assignedUsers)
                            : 'No users managed'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 150 }}>
                          {getManagerName(user.assignedManager)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 150 }}>
                          {getSupervisorName(user.assignedSupervisor)}
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={getStatusLabel(user.status)}
                            color={getStatusColor(user.status) as any}
                            size="small"
                          />
                          <IconButton
                            size="small"
                            onClick={(e) => handleStatusMenuOpen(e, user)}
                            sx={{ ml: 1 }}
                          >
                            <ChevronDown size={14} />
                          </IconButton>
                        </Box>
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
                              handleEditUser(user);
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
              <Checkbox checked={dense} onChange={(event) => setDense(event.target.checked)} />
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
      {/* View User Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <CreateAccountPage
            userToEdit={selectedUser || undefined}
            viewMode
            onClose={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <CreateAccountPage
            userToEdit={selectedUser || undefined}
            viewMode={false}
            onClose={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this user? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Dropdown Menu */}
      <Menu
        anchorEl={statusMenuAnchor}
        open={Boolean(statusMenuAnchor)}
        onClose={handleStatusMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleStatusSelect('active')}>
          <Chip label="Active" color="success" size="small" sx={{ mr: 1 }} />
          Active
        </MenuItem>
        <MenuItem onClick={() => handleStatusSelect('inactive')}>
          <Chip label="Inactive" color="warning" size="small" sx={{ mr: 1 }} />
          Inactive
        </MenuItem>
        <MenuItem onClick={() => handleStatusSelect('suspended')}>
          <Chip label="Suspended" color="error" size="small" sx={{ mr: 1 }} />
          Suspended
        </MenuItem>
      </Menu>

      {/* Status Change Confirmation Dialog */}
      <Dialog open={statusChangeDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to change {userToChangeStatus?.name}&apos;s status to{' '}
            <Chip
              label={getStatusLabel(newStatus)}
              color={getStatusColor(newStatus) as any}
              size="small"
            />
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={confirmStatusChange} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
