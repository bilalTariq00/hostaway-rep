import { useState, useEffect } from 'react';
import { Edit, Plus, Trash2 } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for message templates
const mockTemplates = [
  {
    id: 1,
    name: 'Welcome Message',
    group: 'Check-in',
    listings: 5,
    channels: ['Airbnb', 'Booking.com'],
    color: '#4caf50',
  },
  {
    id: 2,
    name: 'Check-out Instructions',
    group: 'Check-out',
    listings: 3,
    channels: ['Airbnb', 'VRBO'],
    color: '#ff9800',
  },
  {
    id: 3,
    name: 'House Rules Reminder',
    group: 'General',
    listings: 8,
    channels: ['Airbnb', 'Booking.com', 'VRBO'],
    color: '#f44336',
  },
  {
    id: 4,
    name: 'WiFi Information',
    group: 'Check-in',
    listings: 6,
    channels: ['Airbnb', 'Direct'],
    color: '#2196f3',
  },
];

const mockGroups = [
  { id: 1, name: 'Check-in', count: 3, listings: 3 },
  { id: 2, name: 'Check-out', count: 2, listings: 2 },
  { id: 3, name: 'General', count: 5, listings: 5 },
  { id: 4, name: 'Emergency', count: 1, listings: 1 },
];

export function MessageTemplatesView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('message-templates');
  const [templates, setTemplates] = useState(mockTemplates);
  const [groups, setGroups] = useState(mockGroups);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(null);
  const [groupDeleteDialogOpen, setGroupDeleteDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Load templates from localStorage on component mount
  useEffect(() => {
    const savedTemplates = localStorage.getItem('messageTemplates');
    if (savedTemplates) {
      const parsedTemplates = JSON.parse(savedTemplates);
      // Sort by ID (which is timestamp) to show newest first
      const sortedTemplates = parsedTemplates.sort((a: any, b: any) => b.id - a.id);
      setTemplates(prev => [...sortedTemplates, ...prev]);
    }

    const savedGroups = localStorage.getItem('templateGroups');
    if (savedGroups) {
      const parsedGroups = JSON.parse(savedGroups);
      // Sort by ID (which is timestamp) to show newest first
      const sortedGroups = parsedGroups.sort((a: any, b: any) => b.id - a.id);
      setGroups(prev => [...sortedGroups, ...prev]);
    }
  }, []);

  // Update localStorage whenever templates change
  useEffect(() => {
    // Only save to localStorage if we have templates (avoid saving on initial load)
    if (templates.length > 0) {
      const savedTemplates = templates.filter(t => t.id > 1000); // Only save user-created templates (IDs > 1000)
      localStorage.setItem('messageTemplates', JSON.stringify(savedTemplates));
    }
  }, [templates]);

  // Update localStorage whenever groups change
  useEffect(() => {
    // Only save to localStorage if we have groups (avoid saving on initial load)
    if (groups.length > 0) {
      const savedGroups = groups.filter(g => g.id > 1000); // Only save user-created groups (IDs > 1000)
      localStorage.setItem('templateGroups', JSON.stringify(savedGroups));
    }
  }, [groups]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'message-templates') {
      router.push(`/inbox/${newValue}`);
    }
  };

  const handleAddTemplate = () => {
    router.push('/inbox/template-create');
  };

  const handleAddGroup = () => {
    router.push('/inbox/template-group-create');
  };

  const handleEditGroup = (groupId: number) => {
    router.push(`/inbox/template-group-edit/${groupId}`);
  };

  const handleDeleteGroup = (groupId: number) => {
    setGroupToDelete(groupId);
    setGroupDeleteDialogOpen(true);
  };

  const confirmGroupDelete = () => {
    if (groupToDelete) {
      setGroups(prev => prev.filter(group => group.id !== groupToDelete));
      setGroupDeleteDialogOpen(false);
      setGroupToDelete(null);
    }
  };

  const cancelGroupDelete = () => {
    setGroupDeleteDialogOpen(false);
    setGroupToDelete(null);
  };

  const handleEditTemplate = (templateId: number) => {
    // Navigate to edit template form
    router.push(`/inbox/template-edit/${templateId}`);
  };

  const handleDeleteTemplate = (templateId: number) => {
    setTemplateToDelete(templateId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (templateToDelete) {
      // Update state - useEffect will handle localStorage update
      setTemplates(prev => prev.filter(template => template.id !== templateToDelete));
      
      setDeleteDialogOpen(false);
      setTemplateToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setTemplateToDelete(null);
  };


  // Pagination logic
  const totalPages = Math.ceil(templates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTemplates = templates.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Guest Messaging
        </Typography>

        {/* Tabs */}
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Inbox" value="" />
          <Tab label="Message Templates" value="message-templates" />
          <Tab label="Automations" value="automations" />
          <Tab label="Manage Messages" value="manage-messages" />
        </Tabs>
      </Box>

      {/* Message Templates Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Message Templates
            </Typography>
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={handleAddTemplate}
            >
              Add New Template
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Group</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Number of Listings</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Channels</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTemplates.map((template) => (
                <TableRow key={template.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                        {template.name}
                      </Typography>
                      {template.color && (
                        <Box
                          sx={{
                            display: 'inline-block',
                            width: 20,
                            height: 8,
                            borderRadius: 1,
                            bgcolor: template.color,
                            border: '1px solid #e0e0e0'
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: 'primary.50',
                        color: 'primary.main',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}
                    >
                      {template.group}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {template.listings} listings
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {template.channels.map((channel, index) => (
                        <Box
                          key={index}
                          sx={{
                            px: 1,
                            py: 0.25,
                            borderRadius: 0.5,
                            backgroundColor: 'grey.100',
                            fontSize: '0.7rem',
                            color: 'text.secondary',
                          }}
                        >
                          {channel}
                        </Box>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleEditTemplate(template.id)}
                      >
                        <Edit size={16} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                   
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="small"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Message Template Groups Section */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Message Template Groups
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Plus size={16} />}
              onClick={handleAddGroup}
            >
              Add New Group
            </Button>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2 }}>
            {groups.map((group) => (
              <Card key={group.id} variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {group.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {group.count || group.listings || 0} templates
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleEditGroup(group.id)}
                    >
                      <Edit size={16} />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Delete Template
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete this template? This action cannot be undone.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The template will be permanently removed from your account and cannot be recovered.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            variant="outlined"
            onClick={cancelDelete}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDelete}
            sx={{
              bgcolor: 'error.main',
              '&:hover': { bgcolor: 'error.dark' }
            }}
          >
            Delete Template
          </Button>
        </DialogActions>
      </Dialog>

      {/* Group Delete Confirmation Modal */}
      <Dialog
        open={groupDeleteDialogOpen}
        onClose={cancelGroupDelete}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Delete Template Group
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete this template group? This action cannot be undone.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The template group will be permanently removed from your account and cannot be recovered.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            variant="outlined"
            onClick={cancelGroupDelete}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmGroupDelete}
            sx={{
              bgcolor: 'error.main',
              '&:hover': { bgcolor: 'error.dark' }
            }}
          >
            Delete Group
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
