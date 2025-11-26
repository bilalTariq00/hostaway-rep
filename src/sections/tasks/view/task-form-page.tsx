/* eslint-disable perfectionist/sort-imports */
import { Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
/* eslint-enable perfectionist/sort-imports */

import { useRouter } from 'src/routes/hooks';

import { API_URL } from 'src/config/environment';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

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
    priority: 'Medium',
    assignee: '',
    supervisor: '',
    group: '',
    cost: '',
    costCurrency: 'USD',
    costDescription: '',
    autoGenerateExpense: false,
    checklist: [] as string[],
    attachments: [] as any[],
    customFields: [] as Array<{ name: string; value: any; type: 'text' | 'number' | 'date' | 'boolean' }>,
    feedbackScore: 0,
    resolutionNote: '',
    feedbackNote: '',
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setLoadingUsers(false);
          return;
        }

        const response = await fetch(`${API_URL}/api/users?status=active`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setUsers(data.data);
            console.log(`✅ Loaded ${data.data.length} users from database`);
          } else {
            console.error('Failed to load users:', data.message);
          }
        } else {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
          console.error('Error fetching users:', response.status, errorData.message);
          if (response.status === 404) {
            console.error('⚠️ Users API endpoint not found. Please restart the server.');
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Load existing task data for edit/duplicate/view modes
  useEffect(() => {
    const fetchTask = async () => {
      if (!id || (!isEdit && !isView && !isDuplicate)) return;

      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const response = await fetch(`${API_URL}/api/tasks/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            const task = data.data;
            
            // Convert checklist objects to strings if needed
            const checklistItems = task.checklist
              ? task.checklist.map((item: any) => (typeof item === 'string' ? item : item.item || ''))
              : [];

            if (isEdit || isView) {
              setFormData({
                title: task.title || '',
                description: task.description || '',
                startDate: task.startDate ? new Date(task.startDate).toISOString().split('T')[0] : '',
                startTime: task.startTime || '',
                endDate: task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '',
                endTime: task.endTime || '',
                category: task.category || '',
                listing: task.listing || '',
                channel: task.channel || '',
                reservation: task.reservation || '',
                status: task.status || 'To Do',
                priority: task.priority || 'Medium',
                assignee: task.assignee?._id?.toString() || task.assignee?.toString() || '',
                supervisor: task.supervisor?._id?.toString() || task.supervisor?.toString() || '',
                group: task.group || '',
                cost: task.cost?.toString() || '',
                costCurrency: task.costCurrency || 'USD',
                costDescription: task.costDescription || '',
                autoGenerateExpense: task.autoGenerateExpense || false,
                checklist: checklistItems,
                attachments: task.attachments || [],
                customFields: Array.isArray(task.customFields) 
                  ? task.customFields.map((cf: any) => {
                      let value = cf.value ?? '';
                      // Format date values for date input
                      if (cf.type === 'date' && value) {
                        if (value instanceof Date) {
                          value = value.toISOString().split('T')[0];
                        } else if (typeof value === 'string') {
                          try {
                            value = new Date(value).toISOString().split('T')[0];
                          } catch (e) {
                            value = '';
                          }
                        }
                      }
                      return {
                        name: cf.name || '',
                        value,
                        type: cf.type || 'text',
                      };
                    })
                  : [],
                feedbackScore: task.feedbackScore || 0,
                resolutionNote: task.resolutionNote || '',
                feedbackNote: task.feedbackNote || '',
              });
            } else if (isDuplicate) {
              setFormData({
                title: `${task.title || ''} (Copy)`,
                description: task.description || '',
                startDate: task.startDate ? new Date(task.startDate).toISOString().split('T')[0] : '',
                startTime: task.startTime || '',
                endDate: task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '',
                endTime: task.endTime || '',
                category: task.category || '',
                listing: task.listing || '',
                channel: task.channel || '',
                reservation: task.reservation || '',
                status: 'To Do',
                priority: task.priority || 'Medium',
                assignee: task.assignee?._id?.toString() || task.assignee?.toString() || '',
                supervisor: task.supervisor?._id?.toString() || task.supervisor?.toString() || '',
                group: task.group || '',
                cost: task.cost?.toString() || '',
                costCurrency: task.costCurrency || 'USD',
                costDescription: task.costDescription || '',
                autoGenerateExpense: task.autoGenerateExpense || false,
                checklist: checklistItems,
                attachments: task.attachments || [],
                customFields: task.customFields || [],
                feedbackScore: 0,
                resolutionNote: '',
                feedbackNote: '',
              });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id, isEdit, isDuplicate, isView]);

  const handleInputChange = (field: string, value: any) => {
    if (!isView) {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleAddChecklistItem = () => {
    if (!isView) {
      setFormData((prev) => ({
        ...prev,
        checklist: [...prev.checklist, ''],
      }));
    }
  };

  const handleChecklistChange = (index: number, value: string) => {
    if (!isView) {
      setFormData((prev) => ({
        ...prev,
        checklist: prev.checklist.map((item, i) => (i === index ? value : item)),
      }));
    }
  };

  const handleRemoveChecklistItem = (index: number) => {
    if (!isView) {
      setFormData((prev) => ({
        ...prev,
        checklist: prev.checklist.filter((_, i) => i !== index),
      }));
    }
  };

  const handleAddCustomField = () => {
    if (!isView) {
      setFormData((prev) => ({
        ...prev,
        customFields: [...prev.customFields, { name: '', value: '', type: 'text' as const }],
      }));
    }
  };

  const handleRemoveCustomField = (index: number) => {
    if (!isView) {
      setFormData((prev) => ({
        ...prev,
        customFields: prev.customFields.filter((_, i) => i !== index),
      }));
    }
  };

  const handleCustomFieldChange = (index: number, field: 'name' | 'value' | 'type', newValue: any) => {
    if (!isView) {
      setFormData((prev) => {
        const updated = [...prev.customFields];
        updated[index] = { ...updated[index], [field]: newValue };
        // Reset value when type changes
        if (field === 'type') {
          updated[index].value = newValue === 'boolean' ? false : newValue === 'number' ? 0 : '';
        }
        return { ...prev, customFields: updated };
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setUploading(true);

    try {
      const token = localStorage.getItem('authToken');
      
      if (!token || token.startsWith('mock-token-')) {
        alert('Please login with a real account to upload files. Use one of the seeded users:\n- superadmin@hostaway.com / superadmin123\n- manager@hostaway.com / manager123\n- associate@hostaway.com / associate123\n- team@hostaway.com / team123');
        setUploading(false);
        event.target.value = '';
        return;
      }

      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch(`${API_URL}/api/uploads`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
        throw new Error(errorData.message || `Upload failed: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          attachments: [...prev.attachments, result.data],
        }));
      } else {
        alert(result.message || 'File upload failed');
      }
    } catch (error: any) {
      console.error('File upload error:', error);
      alert(error.message || 'File upload failed. Please try again.');
    } finally {
      setUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleRemoveAttachment = (index: number) => {
    if (!isView) {
      setFormData((prev) => ({
        ...prev,
        attachments: prev.attachments.filter((_, i) => i !== index),
      }));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleSaveTask = async () => {
    if (isView) return;

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Not authenticated');
        return;
      }

      // Prepare task data
      const taskData: any = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority || 'Medium',
        assignee: formData.assignee || null,
        supervisor: formData.supervisor || null,
        group: formData.group || '',
        listing: formData.listing || '',
        channel: formData.channel || '',
        reservation: formData.reservation || '',
        category: formData.category || '',
        startDate: formData.startDate || null,
        startTime: formData.startTime || '',
        endDate: formData.endDate || null,
        endTime: formData.endTime || '',
        dueDate: formData.endDate || formData.startDate || null,
        cost: formData.cost ? parseFloat(formData.cost) : 0,
        costCurrency: formData.costCurrency || 'USD',
        costDescription: formData.costDescription || '',
        autoGenerateExpense: formData.autoGenerateExpense || false,
        checklist: formData.checklist
          .filter((item) => item.trim() !== '')
          .map((item) => ({ item, completed: false })),
        attachments: formData.attachments || [],
        customFields: formData.customFields
          .filter((field) => field.name.trim() !== '')
          .map((field) => ({
            name: field.name.trim(),
            value: field.type === 'number' ? (field.value ? parseFloat(field.value) : 0) : 
                   field.type === 'boolean' ? Boolean(field.value) :
                   field.type === 'date' ? (field.value ? new Date(field.value) : null) :
                   field.value,
            type: field.type,
          })),
        feedbackScore: formData.feedbackScore || 0,
        resolutionNote: formData.resolutionNote || '',
        feedbackNote: formData.feedbackNote || '',
      };

      let response;
      if (isEdit && id) {
        // Update existing task
        response = await fetch(`${API_URL}/api/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(taskData),
        });
      } else {
        // Create new task (including duplicate)
        response = await fetch(`${API_URL}/api/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(taskData),
        });
      }

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          router.push('/tasks/manage-tasks');
        } else {
          alert(data.message || 'Failed to save task');
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to save task' }));
        alert(errorData.message || 'Failed to save task');
      }
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const handleDeleteTask = async () => {
    if (!id) {
      setDeleteDialogOpen(false);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Authentication token not found. Please log in.');
        setDeleteDialogOpen(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Task deleted successfully.');
        router.push('/tasks/archive');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        console.error('Error deleting task:', response.status, errorData.message);
        alert(errorData.message || 'Failed to delete task.');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    } finally {
      setDeleteDialogOpen(false);
    }
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
              <Iconify icon={'eva:arrow-back-fill' as any} />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {getPageTitle()}
            </Typography>
          </Box>
          {!isReadOnly && (
            <Button variant="contained" onClick={handleSaveTask} disabled={!formData.title.trim()}>
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Task checklist
                </Typography>
                {!isReadOnly && (
                  <Button variant="text" color="primary" onClick={handleAddChecklistItem}>
                    ADD CHECKLIST
                  </Button>
                )}
              </Box>

              {formData.checklist.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Checkbox disabled sx={{ p: 0.5 }} />
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
                      <Iconify icon={'eva:trash-2-fill' as any} />
                    </IconButton>
                  )}
                </Box>
              ))}

              {formData.checklist.length === 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', py: 2 }}
                >
                  No checklist items added yet.
                </Typography>
              )}

              {!isReadOnly && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleAddChecklistItem}
                    startIcon={<Iconify icon={'eva:plus-fill' as any} />}
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Attachments
                </Typography>
                {!isReadOnly && (
                  <label>
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                      disabled={uploading}
                      accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.zip"
                    />
                    <Button
                      variant="text"
                      color="primary"
                      component="span"
                      disabled={uploading}
                      startIcon={<Iconify icon={uploading ? ('eva:loader-fill' as any) : ('eva:attach-fill' as any)} />}
                    >
                      {uploading ? 'Uploading...' : 'ADD ATTACHMENT'}
                    </Button>
                  </label>
                )}
              </Box>
              {formData.attachments.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No attachments added yet.
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {formData.attachments.map((attachment, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1.5,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                        <Iconify
                          icon={
                            attachment.type?.startsWith('image/')
                              ? ('eva:image-fill' as any)
                              : attachment.type === 'application/pdf'
                                ? ('eva:file-text-fill' as any)
                                : ('eva:file-fill' as any)
                          }
                          width={24}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {attachment.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatFileSize(attachment.size || 0)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {attachment.url && (
                          <IconButton
                            size="small"
                            onClick={() => window.open(`${API_URL}${attachment.url}`, '_blank')}
                            title="View file"
                          >
                            <Iconify icon={'eva:eye-fill' as any} width={18} />
                          </IconButton>
                        )}
                        {!isReadOnly && (
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveAttachment(index)}
                            color="error"
                            title="Remove file"
                          >
                            <Iconify icon={'eva:trash-2-fill' as any} width={18} />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Custom Fields */}
          {/* <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Custom fields
                </Typography>
                {!isReadOnly && (
                  <Button variant="text" color="primary" onClick={handleAddCustomField} startIcon={<Plus size={16} />}>
                    Add field
                  </Button>
                )}
              </Box>

              {formData.customFields.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No custom fields added.
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {formData.customFields.map((field, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'flex-start',
                        p: 2,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Field name"
                        value={field.name}
                        onChange={(e) => handleCustomFieldChange(index, 'name', e.target.value)}
                        disabled={isReadOnly}
                        size="small"
                      />
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={field.type}
                          label="Type"
                          onChange={(e) => handleCustomFieldChange(index, 'type', e.target.value)}
                          disabled={isReadOnly}
                        >
                          <MenuItem value="text">Text</MenuItem>
                          <MenuItem value="number">Number</MenuItem>
                          <MenuItem value="date">Date</MenuItem>
                          <MenuItem value="boolean">Boolean</MenuItem>
                        </Select>
                      </FormControl>
                      {field.type === 'text' && (
                        <TextField
                          fullWidth
                          label="Value"
                          value={field.value}
                          onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                          disabled={isReadOnly}
                          size="small"
                        />
                      )}
                      {field.type === 'number' && (
                        <TextField
                          fullWidth
                          label="Value"
                          type="number"
                          value={field.value}
                          onChange={(e) => handleCustomFieldChange(index, 'value', parseFloat(e.target.value) || 0)}
                          disabled={isReadOnly}
                          size="small"
                        />
                      )}
                      {field.type === 'date' && (
                        <TextField
                          fullWidth
                          label="Value"
                          type="date"
                          value={field.value ? (typeof field.value === 'string' ? field.value : new Date(field.value).toISOString().split('T')[0]) : ''}
                          onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                          disabled={isReadOnly}
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                      {field.type === 'boolean' && (
                        <FormControlLabel
                          control={
                            <Switch
                              checked={Boolean(field.value)}
                              onChange={(e) => handleCustomFieldChange(index, 'value', e.target.checked)}
                              disabled={isReadOnly}
                            />
                          }
                          label="Value"
                        />
                      )}
                      {!isReadOnly && (
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveCustomField(index)}
                          color="error"
                          sx={{ mt: 0.5 }}
                        >
                          <X size={16} />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card> */}
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
                    disabled={isReadOnly || loadingUsers}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {loadingUsers ? (
                      <MenuItem disabled>Loading users...</MenuItem>
                    ) : (
                      users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name} ({user.email}) - {user.role}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Supervisor</InputLabel>
                  <Select
                    value={formData.supervisor}
                    label="Supervisor"
                    onChange={(e) => handleInputChange('supervisor', e.target.value)}
                    disabled={isReadOnly || loadingUsers}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {loadingUsers ? (
                      <MenuItem disabled>Loading users...</MenuItem>
                    ) : (
                      users
                        .filter((user) => ['super-admin', 'manager', 'supervisor'].includes(user.role))
                        .map((user) => (
                          <MenuItem key={user.id} value={user.id}>
                            {user.name} ({user.email}) - {user.role}
                          </MenuItem>
                        ))
                    )}
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
                startIcon={<Iconify icon={'eva:trash-2-fill' as any} />}
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
