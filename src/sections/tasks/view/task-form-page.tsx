import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for tasks
const mockTasks = [
  {
    id: 1,
    title: 'Property Inspection',
    description: 'Conduct thorough inspection of the property',
    startDate: '2024-01-15',
    startTime: '09:00',
    endDate: '2024-01-15',
    endTime: '17:00',
    category: 'Inspection',
    listing: 'Beach Villa',
    channel: 'Airbnb',
    reservation: 'RES-001',
    status: 'To Do',
    assignee: 'John Doe',
    supervisor: 'Jane Smith',
    group: 'Maintenance Team',
    cost: '150',
    costCurrency: 'USD',
    costDescription: 'Inspection fee',
    autoGenerateExpense: true,
    checklist: [
      'Check all lights and switches',
      'Test air conditioning',
      'Inspect bathroom fixtures',
      'Check kitchen appliances',
    ],
    attachments: [],
    customFields: [],
    feedbackScore: 4,
    resolutionNote: 'Task completed successfully',
    feedbackNote: 'Good work done',
  },
  {
    id: 2,
    title: 'Guest Welcome',
    description: 'Prepare welcome package for new guests',
    startDate: '2024-01-20',
    startTime: '14:00',
    endDate: '2024-01-20',
    endTime: '16:00',
    category: 'Guest Service',
    listing: 'Mountain Cabin',
    channel: 'Booking.com',
    reservation: 'RES-002',
    status: 'In Progress',
    assignee: 'Mike Johnson',
    supervisor: 'Sarah Wilson',
    group: 'Guest Services',
    cost: '75',
    costCurrency: 'USD',
    costDescription: 'Welcome package materials',
    autoGenerateExpense: false,
    checklist: [
      'Prepare welcome package',
      'Set up guest information folder',
      'Check cleanliness standards',
    ],
    attachments: [],
    customFields: [],
    feedbackScore: 5,
    resolutionNote: 'Excellent guest service',
    feedbackNote: 'Guests were very happy',
  },
];

export function TaskFormPage() {
  const router = useRouter();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.includes('/edit');
  const isDuplicate = location.pathname.includes('/duplicate');
  const isView = location.pathname.includes('/view');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    category: '',
    listing: '',
    channel: '',
    reservation: '',
    status: 'To Do',
    assignee: '',
    supervisor: '',
    group: '',
    cost: '',
    costCurrency: 'USD',
    costDescription: '',
    autoGenerateExpense: false,
    checklist: [] as string[],
    attachments: [] as string[],
    customFields: [] as string[],
    feedbackScore: 0,
    resolutionNote: '',
    feedbackNote: '',
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Load existing task data for edit/duplicate/view modes
  useEffect(() => {
    const loadTasks = () => {
      const savedTasks = localStorage.getItem('tasks');
      const savedArchivedTasks = localStorage.getItem('archivedTasks');
      
      let allTasks: any[] = [];
      
      if (savedTasks) {
        allTasks = [...allTasks, ...JSON.parse(savedTasks)];
      }
      
      if (savedArchivedTasks) {
        allTasks = [...allTasks, ...JSON.parse(savedArchivedTasks)];
      }
      
      // If no saved tasks, use mock data
      if (allTasks.length === 0) {
        allTasks = mockTasks;
      }
      
      return allTasks;
    };

    const existingTasks = loadTasks();
    const foundTask = existingTasks.find((task: any) => task.id === parseInt(id || '0'));

    if ((isEdit || isView) && foundTask) {
      setFormData({
        title: foundTask.title || '',
        description: foundTask.description || '',
        startDate: foundTask.startDate || '',
        startTime: foundTask.startTime || '',
        endDate: foundTask.endDate || '',
        endTime: foundTask.endTime || '',
        category: foundTask.category || '',
        listing: foundTask.listing || '',
        channel: foundTask.channel || '',
        reservation: foundTask.reservation || '',
        status: foundTask.status || 'To Do',
        assignee: foundTask.assignee || '',
        supervisor: foundTask.supervisor || '',
        group: foundTask.group || '',
        cost: foundTask.cost || '',
        costCurrency: foundTask.costCurrency || 'USD',
        costDescription: foundTask.costDescription || '',
        autoGenerateExpense: foundTask.autoGenerateExpense || false,
        checklist: foundTask.checklist || [],
        attachments: foundTask.attachments || [],
        customFields: foundTask.customFields || [],
        feedbackScore: foundTask.feedbackScore || 0,
        resolutionNote: foundTask.resolutionNote || '',
        feedbackNote: foundTask.feedbackNote || '',
      });
    } else if (isDuplicate && foundTask) {
      setFormData({
        title: `${foundTask.title} (Copy)`,
        description: foundTask.description || '',
        startDate: foundTask.startDate || '',
        startTime: foundTask.startTime || '',
        endDate: foundTask.endDate || '',
        endTime: foundTask.endTime || '',
        category: foundTask.category || '',
        listing: foundTask.listing || '',
        channel: foundTask.channel || '',
        reservation: foundTask.reservation || '',
        status: 'To Do',
        assignee: foundTask.assignee || '',
        supervisor: foundTask.supervisor || '',
        group: foundTask.group || '',
        cost: foundTask.cost || '',
        costCurrency: foundTask.costCurrency || 'USD',
        costDescription: foundTask.costDescription || '',
        autoGenerateExpense: foundTask.autoGenerateExpense || false,
        checklist: foundTask.checklist || [],
        attachments: foundTask.attachments || [],
        customFields: foundTask.customFields || [],
        feedbackScore: 0,
        resolutionNote: '',
        feedbackNote: '',
      });
    }
  }, [id, isEdit, isDuplicate, isView]);

  const handleInputChange = (field: string, value: any) => {
    if (!isView) {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleAddChecklistItem = () => {
    if (!isView) {
      setFormData(prev => ({
        ...prev,
        checklist: [...prev.checklist, ''],
      }));
    }
  };

  const handleChecklistChange = (index: number, value: string) => {
    if (!isView) {
      setFormData(prev => ({
        ...prev,
        checklist: prev.checklist.map((item, i) => i === index ? value : item),
      }));
    }
  };

  const handleRemoveChecklistItem = (index: number) => {
    if (!isView) {
      setFormData(prev => ({
        ...prev,
        checklist: prev.checklist.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSaveTask = () => {
    if (isView) return;

    const loadTasks = () => {
      const savedTasks = localStorage.getItem('tasks');
      const savedArchivedTasks = localStorage.getItem('archivedTasks');
      
      let allTasks: any[] = [];
      
      if (savedTasks) {
        allTasks = [...allTasks, ...JSON.parse(savedTasks)];
      }
      
      if (savedArchivedTasks) {
        allTasks = [...allTasks, ...JSON.parse(savedArchivedTasks)];
      }
      
      // If no saved tasks, use mock data
      if (allTasks.length === 0) {
        allTasks = mockTasks;
      }
      
      return allTasks;
    };

    const tasksData = loadTasks();
    
    if (isDuplicate) {
      const newTask = {
        id: Date.now(),
        ...formData,
        checklist: formData.checklist.filter(item => item.trim() !== ''),
      };
      const updatedTasks = [...tasksData, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else if (isEdit && id) {
      const updatedTasks = tasksData.map((task: any) =>
        task.id === parseInt(id)
          ? {
              ...task,
              ...formData,
              checklist: formData.checklist.filter(item => item.trim() !== ''),
            }
          : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else {
      const newTask = {
        id: Date.now(),
        ...formData,
        checklist: formData.checklist.filter(item => item.trim() !== ''),
      };
      const updatedTasks = [...tasksData, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    
    router.push('/tasks/archive');
  };

  const handleDeleteTask = () => {
    if (id) {
      const loadTasks = () => {
        const savedTasks = localStorage.getItem('tasks');
        const savedArchivedTasks = localStorage.getItem('archivedTasks');
        
        let allTasks: any[] = [];
        
        if (savedTasks) {
          allTasks = [...allTasks, ...JSON.parse(savedTasks)];
        }
        
        if (savedArchivedTasks) {
          allTasks = [...allTasks, ...JSON.parse(savedArchivedTasks)];
        }
        
        // If no saved tasks, use mock data
        if (allTasks.length === 0) {
          allTasks = mockTasks;
        }
        
        return allTasks;
      };

      const tasksData = loadTasks();
      const updatedTasks = tasksData.filter((task: any) => task.id !== parseInt(id));
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    setDeleteDialogOpen(false);
    router.push('/tasks/archive');
  };

  const getPageTitle = () => {
    if (isView) return 'View Task';
    if (isEdit) return 'Edit Task';
    if (isDuplicate) return 'Duplicate Task';
    return 'Add Task';
  };

  const isReadOnly = isView;

  return (
    <DashboardContent maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => router.push('/tasks/archive')}>
              <Iconify icon={"eva:arrow-back-fill" as any} />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {getPageTitle()}
            </Typography>
          </Box>
          {!isReadOnly && (
            <Button
              variant="contained"
              onClick={handleSaveTask}
              disabled={!formData.title.trim()}
            >
              Save task
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Task Title */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Task title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter task title..."
              disabled={isReadOnly}
            />
          </Box>

          {/* Schedule */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Schedule
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Start date (Local time)"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    disabled={isReadOnly}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Start time (Local time)</InputLabel>
                    <Select
                      value={formData.startTime}
                      label="Start time (Local time)"
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      disabled={isReadOnly}
                    >
                      <MenuItem value="09:00">09:00</MenuItem>
                      <MenuItem value="10:00">10:00</MenuItem>
                      <MenuItem value="11:00">11:00</MenuItem>
                      <MenuItem value="12:00">12:00</MenuItem>
                      <MenuItem value="13:00">13:00</MenuItem>
                      <MenuItem value="14:00">14:00</MenuItem>
                      <MenuItem value="15:00">15:00</MenuItem>
                      <MenuItem value="16:00">16:00</MenuItem>
                      <MenuItem value="17:00">17:00</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="End date (Local time)"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    disabled={isReadOnly}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>End time (Local time)</InputLabel>
                    <Select
                      value={formData.endTime}
                      label="End time (Local time)"
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      disabled={isReadOnly}
                    >
                      <MenuItem value="09:00">09:00</MenuItem>
                      <MenuItem value="10:00">10:00</MenuItem>
                      <MenuItem value="11:00">11:00</MenuItem>
                      <MenuItem value="12:00">12:00</MenuItem>
                      <MenuItem value="13:00">13:00</MenuItem>
                      <MenuItem value="14:00">14:00</MenuItem>
                      <MenuItem value="15:00">15:00</MenuItem>
                      <MenuItem value="16:00">16:00</MenuItem>
                      <MenuItem value="17:00">17:00</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Details
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter description..."
                disabled={isReadOnly}
              />
            </CardContent>
          </Card>

          {/* Link */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Link
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      label="Category"
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      disabled={isReadOnly}
                    >
                      <MenuItem value="Inspection">Inspection</MenuItem>
                      <MenuItem value="Guest Service">Guest Service</MenuItem>
                      <MenuItem value="Maintenance">Maintenance</MenuItem>
                      <MenuItem value="Cleaning">Cleaning</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Listing</InputLabel>
                    <Select
                      value={formData.listing}
                      label="Listing"
                      onChange={(e) => handleInputChange('listing', e.target.value)}
                      disabled={isReadOnly}
                    >
                      <MenuItem value="Beach Villa">Beach Villa</MenuItem>
                      <MenuItem value="Mountain Cabin">Mountain Cabin</MenuItem>
                      <MenuItem value="City Apartment">City Apartment</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Channel</InputLabel>
                    <Select
                      value={formData.channel}
                      label="Channel"
                      onChange={(e) => handleInputChange('channel', e.target.value)}
                      disabled={isReadOnly}
                    >
                      <MenuItem value="Airbnb">Airbnb</MenuItem>
                      <MenuItem value="Booking.com">Booking.com</MenuItem>
                      <MenuItem value="Direct">Direct</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Reservation</InputLabel>
                    <Select
                      value={formData.reservation}
                      label="Reservation"
                      onChange={(e) => handleInputChange('reservation', e.target.value)}
                      disabled={isReadOnly}
                    >
                      <MenuItem value="RES-001">RES-001</MenuItem>
                      <MenuItem value="RES-002">RES-002</MenuItem>
                      <MenuItem value="RES-003">RES-003</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Task Checklist */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Task checklist
                </Typography>
                {!isReadOnly && (
                  <Button
                    variant="text"
                    color="primary"
                    onClick={handleAddChecklistItem}
                  >
                    ADD CHECKLIST
                  </Button>
                )}
              </Box>
              
              {formData.checklist.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Checkbox
                    disabled
                    sx={{ p: 0.5 }}
                  />
                  <TextField
                    fullWidth
                    value={item}
                    onChange={(e) => handleChecklistChange(index, e.target.value)}
                    placeholder="Enter checklist item..."
                    disabled={isReadOnly}
                    size="small"
                  />
                  {!isReadOnly && (
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveChecklistItem(index)}
                      sx={{ color: 'error.main' }}
                    >
                      <Iconify icon={"eva:trash-2-fill" as any} />
                    </IconButton>
                  )}
                </Box>
              ))}

              {formData.checklist.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No checklist items added yet.
                </Typography>
              )}

              {!isReadOnly && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleAddChecklistItem}
                    startIcon={<Iconify icon={"eva:plus-fill" as any} />}
                  >
                    Add
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Attachments
                </Typography>
                {!isReadOnly && (
                  <Button
                    variant="text"
                    color="primary"
                  >
                    ADD ATTACHMENT
                  </Button>
                )}
              </Box>
              <Typography variant="body2" color="text.secondary">
                No attachments added yet.
              </Typography>
            </CardContent>
          </Card>

          {/* Custom Fields */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Custom fields
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No custom fields added.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Status */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Status
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  disabled={isReadOnly}
                >
                  <MenuItem value="To Do">To Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>

          {/* Users */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Users
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Assignee</InputLabel>
                  <Select
                    value={formData.assignee}
                    label="Assignee"
                    onChange={(e) => handleInputChange('assignee', e.target.value)}
                    disabled={isReadOnly}
                  >
                    <MenuItem value="John Doe">John Doe</MenuItem>
                    <MenuItem value="Mike Johnson">Mike Johnson</MenuItem>
                    <MenuItem value="Tom Brown">Tom Brown</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Supervisor</InputLabel>
                  <Select
                    value={formData.supervisor}
                    label="Supervisor"
                    onChange={(e) => handleInputChange('supervisor', e.target.value)}
                    disabled={isReadOnly}
                  >
                    <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                    <MenuItem value="Sarah Wilson">Sarah Wilson</MenuItem>
                    <MenuItem value="David Lee">David Lee</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Group</InputLabel>
                  <Select
                    value={formData.group}
                    label="Group"
                    onChange={(e) => handleInputChange('group', e.target.value)}
                    disabled={isReadOnly}
                  >
                    <MenuItem value="Maintenance Team">Maintenance Team</MenuItem>
                    <MenuItem value="Guest Services">Guest Services</MenuItem>
                    <MenuItem value="Cleaning Team">Cleaning Team</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>

          {/* Cost */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Cost
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    label="Cost"
                    value={formData.cost}
                    onChange={(e) => handleInputChange('cost', e.target.value)}
                    disabled={isReadOnly}
                    type="number"
                  />
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={formData.costCurrency}
                      label="Currency"
                      onChange={(e) => handleInputChange('costCurrency', e.target.value)}
                      disabled={isReadOnly}
                    >
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="GBP">GBP</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Cost description"
                  value={formData.costDescription}
                  onChange={(e) => handleInputChange('costDescription', e.target.value)}
                  disabled={isReadOnly}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.autoGenerateExpense}
                      onChange={(e) => handleInputChange('autoGenerateExpense', e.target.checked)}
                      disabled={isReadOnly}
                    />
                  }
                  label="Automatically generate an expense when the task is marked as done"
                />
              </Box>
            </CardContent>
          </Card>

          {/* Resolution */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Resolution
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Feedback score
                  </Typography>
                  <Rating
                    value={formData.feedbackScore}
                    onChange={(_, value) => handleInputChange('feedbackScore', value || 0)}
                    disabled={isReadOnly}
                  />
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Resolution note"
                  value={formData.resolutionNote}
                  onChange={(e) => handleInputChange('resolutionNote', e.target.value)}
                  disabled={isReadOnly}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Feedback note"
                  value={formData.feedbackNote}
                  onChange={(e) => handleInputChange('feedbackNote', e.target.value)}
                  disabled={isReadOnly}
                />
              </Box>
            </CardContent>
          </Card>

          {isEdit && (
            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                startIcon={<Iconify icon={"eva:trash-2-fill" as any} />}
              >
                Delete Task
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this task? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
          <Button onClick={handleDeleteTask} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}