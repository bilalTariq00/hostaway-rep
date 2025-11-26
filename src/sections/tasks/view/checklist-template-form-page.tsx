import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { API_URL } from 'src/config/environment';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

export function ChecklistTemplateFormPage() {
  const router = useRouter();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.includes('/edit');
  const isDuplicate = location.pathname.includes('/duplicate');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tasks: [] as string[],
    active: false,
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch checklist template from backend for edit/view/duplicate
  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id || (!isEdit && !isDuplicate)) return;

      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const response = await fetch(`${API_URL}/api/checklist-templates/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            const template = data.data;
            
            // Convert tasks from objects to strings if needed
            const taskItems = Array.isArray(template.tasks)
              ? template.tasks.map((task: any) => (typeof task === 'string' ? task : task.item || ''))
              : [];

            if (isEdit) {
              setFormData({
                name: template.name || '',
                description: template.description || '',
                tasks: taskItems,
                active: template.isActive !== false,
              });
            } else if (isDuplicate) {
              setFormData({
                name: `${template.name || ''} (Copy)`,
                description: template.description || '',
                tasks: taskItems,
                active: template.isActive !== false,
              });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching checklist template:', error);
      }
    };

    fetchTemplate();
  }, [id, isEdit, isDuplicate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTask = () => {
    setFormData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, ''],
    }));
  };

  const handleTaskChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => (i === index ? value : task)),
    }));
  };

  const handleRemoveTask = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  const handleSaveTemplate = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Not authenticated');
        return;
      }

      // Prepare template data
      const templateData: any = {
        name: formData.name,
        description: formData.description || '',
        tasks: formData.tasks
          .filter((task) => task.trim() !== '')
          .map((task, index) => ({
            item: task,
            order: index,
          })),
        isActive: formData.active,
        category: '', // Can be added to form later if needed
      };

      let response;
      if (isEdit && id) {
        // Update existing template
        response = await fetch(`${API_URL}/api/checklist-templates/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(templateData),
        });
      } else {
        // Create new template (including duplicate)
        response = await fetch(`${API_URL}/api/checklist-templates`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(templateData),
        });
      }

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          router.push('/tasks/checklist-templates');
        } else {
          alert(data.message || 'Failed to save template');
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to save template' }));
        alert(errorData.message || 'Failed to save template');
      }
    } catch (error) {
      console.error('Error saving checklist template:', error);
      alert('Failed to save template. Please try again.');
    }
  };

  const handleDeleteTemplate = async () => {
    if (!id) {
      setDeleteDialogOpen(false);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Not authenticated');
        setDeleteDialogOpen(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/checklist-templates/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        router.push('/tasks/checklist-templates');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete template');
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      alert('Failed to delete template');
    }
    
    setDeleteDialogOpen(false);
  };

  const getPageTitle = () => {
    if (isEdit) return 'Edit Checklist Template';
    if (isDuplicate) return 'Duplicate Checklist Template';
    return 'Add Checklist Template';
  };

  return (
    <DashboardContent maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => router.push('/tasks/checklist-templates')}>
              <Iconify icon={'eva:arrow-back-fill' as any} />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {getPageTitle()}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleSaveTemplate}
            disabled={
              !formData.name.trim() ||
              formData.tasks.filter((task) => task.trim() !== '').length === 0
            }
          >
            Save checklist template
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Main Content */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Task title"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter checklist template name..."
              sx={{ mb: 2 }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
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
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Checklist
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={handleAddTask}
                startIcon={<Iconify icon={'eva:plus-fill' as any} />}
              >
                Add
              </Button>
            </Box>

            {formData.tasks.map((task, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <IconButton size="small" sx={{ cursor: 'grab' }}>
                  <Iconify icon={'eva:menu-fill' as any} />
                </IconButton>
                <TextField
                  fullWidth
                  value={task}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  placeholder="Enter task..."
                  size="small"
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveTask(index)}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-fill' as any} />
                </IconButton>
              </Box>
            ))}

            {formData.tasks.length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', py: 2 }}
              >
                No tasks added yet. Click &quot;Add&quot; to create your first task.
              </Typography>
            )}
          </Box>
        </Box>

        {/* Right Sidebar */}
        <Box sx={{ width: 300 }}>
          <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Active
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                />
              }
              label={formData.active ? 'Yes' : 'No'}
            />
          </Box>

          {isEdit && (
            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                startIcon={<Iconify icon={'eva:trash-2-fill' as any} />}
              >
                Delete Template
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this checklist template? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
          <Button onClick={handleDeleteTemplate} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
