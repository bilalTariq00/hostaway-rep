import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useRouter } from 'src/routes/hooks';
import { useParams } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for checklist templates
const mockChecklistTemplates = [
  {
    id: 1,
    name: 'Property Inspection Checklist',
    description: 'This is an example checklist template for property inspection tasks. Feel free to edit the items below.',
    tasks: [
      'Check all lights and switches',
      'Test air conditioning',
      'Inspect bathroom fixtures',
      'Check kitchen appliances',
      'Verify internet connection',
      'Test door locks and keys',
    ],
    active: true,
  },
  {
    id: 2,
    name: 'Guest Welcome Checklist',
    description: 'This checklist ensures all guest welcome procedures are completed properly.',
    tasks: [
      'Prepare welcome package',
      'Set up guest information folder',
      'Check cleanliness standards',
      'Verify amenities are working',
      'Prepare local recommendations',
      'Set up contact information',
    ],
    active: true,
  },
  {
    id: 3,
    name: 'Post-Checkout Cleanup',
    description: 'Complete cleanup checklist after guest checkout.',
    tasks: [
      'Remove all trash',
      'Clean all surfaces',
      'Wash and replace linens',
      'Restock amenities',
      'Check for damages',
      'Prepare for next guests',
    ],
    active: false,
  },
];

export function ChecklistTemplateFormPage() {
  const router = useRouter();
  const { id } = useParams();
  const isEdit = router.pathname.includes('/edit');
  const isDuplicate = router.pathname.includes('/duplicate');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tasks: [] as string[],
    active: false,
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Load existing checklist template data for edit/duplicate modes
  useEffect(() => {
    const loadChecklistTemplates = () => {
      const savedTemplates = localStorage.getItem('checklistTemplates');
      if (savedTemplates) {
        return JSON.parse(savedTemplates);
      }
      return mockChecklistTemplates;
    };

    const existingTemplates = loadChecklistTemplates();
    const foundTemplate = existingTemplates.find((template: any) => template.id === parseInt(id || '0'));

    if (isEdit && foundTemplate) {
      setFormData({
        name: foundTemplate.name || '',
        description: foundTemplate.description || '',
        tasks: foundTemplate.tasks || [],
        active: foundTemplate.active || false,
      });
    } else if (isDuplicate && foundTemplate) {
      setFormData({
        name: `${foundTemplate.name} (Copy)`,
        description: foundTemplate.description || '',
        tasks: foundTemplate.tasks || [],
        active: foundTemplate.active || false,
      });
    }
  }, [id, isEdit, isDuplicate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTask = () => {
    setFormData(prev => ({
      ...prev,
      tasks: [...prev.tasks, ''],
    }));
  };

  const handleTaskChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => i === index ? value : task),
    }));
  };

  const handleRemoveTask = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  const handleSaveTemplate = () => {
    const templatesData = JSON.parse(localStorage.getItem('checklistTemplates') || JSON.stringify(mockChecklistTemplates));
    
    if (isDuplicate) {
      const newTemplate = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        tasks: formData.tasks.filter(task => task.trim() !== ''),
        active: formData.active,
      };
      const updatedTemplates = [...templatesData, newTemplate];
      localStorage.setItem('checklistTemplates', JSON.stringify(updatedTemplates));
    } else if (isEdit && id) {
      const updatedTemplates = templatesData.map((template: any) =>
        template.id === parseInt(id)
          ? {
              ...template,
              name: formData.name,
              description: formData.description,
              tasks: formData.tasks.filter(task => task.trim() !== ''),
              active: formData.active,
            }
          : template
      );
      localStorage.setItem('checklistTemplates', JSON.stringify(updatedTemplates));
    } else {
      const newTemplate = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        tasks: formData.tasks.filter(task => task.trim() !== ''),
        active: formData.active,
      };
      const updatedTemplates = [...templatesData, newTemplate];
      localStorage.setItem('checklistTemplates', JSON.stringify(updatedTemplates));
    }
    
    router.push('/tasks/checklist-templates');
  };

  const handleDeleteTemplate = () => {
    if (id) {
      const templatesData = JSON.parse(localStorage.getItem('checklistTemplates') || JSON.stringify(mockChecklistTemplates));
      const updatedTemplates = templatesData.filter((template: any) => template.id !== parseInt(id));
      localStorage.setItem('checklistTemplates', JSON.stringify(updatedTemplates));
    }
    setDeleteDialogOpen(false);
    router.push('/tasks/checklist-templates');
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
              <Iconify icon="eva:arrow-back-fill" />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {getPageTitle()}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleSaveTemplate}
            disabled={!formData.name.trim() || formData.tasks.filter(task => task.trim() !== '').length === 0}
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Checklist
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={handleAddTask}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add
              </Button>
            </Box>

            {formData.tasks.map((task, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <IconButton size="small" sx={{ cursor: 'grab' }}>
                  <Iconify icon="eva:menu-fill" />
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
                  <Iconify icon="eva:trash-2-fill" />
                </IconButton>
              </Box>
            ))}

            {formData.tasks.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                No tasks added yet. Click "Add" to create your first task.
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
                startIcon={<Iconify icon="eva:trash-2-fill" />}
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
