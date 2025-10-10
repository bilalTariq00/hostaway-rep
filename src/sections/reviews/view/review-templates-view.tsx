import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for review templates
const mockReviewTemplates = [
  {
    id: 1,
    name: 'Standard Review Template',
    description: 'Basic template for general property reviews',
    category: 'General',
    questions: [
      'How was your overall experience?',
      'Rate the cleanliness of the property',
      'How was the communication with the host?',
      'Would you recommend this property to others?',
    ],
    createdAt: '2024-01-15',
    status: 'Active',
    usageCount: 45,
  },
  {
    id: 2,
    name: 'Luxury Property Template',
    description: 'Specialized template for high-end properties',
    category: 'Luxury',
    questions: [
      'Rate the luxury amenities provided',
      'How was the quality of service?',
      'Rate the property maintenance',
      'How was the check-in/check-out process?',
      'Rate the overall value for money',
    ],
    createdAt: '2024-01-20',
    status: 'Active',
    usageCount: 23,
  },
  {
    id: 3,
    name: 'Business Travel Template',
    description: 'Template designed for business travelers',
    category: 'Business',
    questions: [
      'How was the WiFi connection?',
      'Rate the workspace setup',
      'How was the noise level?',
      'Rate the location for business needs',
      'How was the overall productivity?',
    ],
    createdAt: '2024-01-25',
    status: 'Active',
    usageCount: 18,
  },
  {
    id: 4,
    name: 'Family Stay Template',
    description: 'Template for family-friendly properties',
    category: 'Family',
    questions: [
      'How family-friendly was the property?',
      'Rate the safety features',
      'How was the space for children?',
      'Rate the nearby family attractions',
      'Would you stay here again with family?',
    ],
    createdAt: '2024-02-01',
    status: 'Draft',
    usageCount: 0,
  },
  {
    id: 5,
    name: 'Pet-Friendly Template',
    description: 'Template for pet-friendly accommodations',
    category: 'Pet-Friendly',
    questions: [
      'How pet-friendly was the property?',
      'Rate the pet amenities provided',
      'How was the outdoor space for pets?',
      'Rate the pet policies and rules',
      'Would you recommend for pet owners?',
    ],
    createdAt: '2024-02-05',
    status: 'Active',
    usageCount: 12,
  },
  {
    id: 6,
    name: 'Long-term Stay Template',
    description: 'Template for extended stays (30+ days)',
    category: 'Long-term',
    questions: [
      'How was the property for long-term living?',
      'Rate the kitchen facilities',
      'How was the storage space?',
      'Rate the maintenance during your stay',
      'How was the overall comfort for extended stay?',
    ],
    createdAt: '2024-02-10',
    status: 'Inactive',
    usageCount: 8,
  },
];

export function ReviewTemplatesView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [reviewTemplates, setReviewTemplates] = useState(mockReviewTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);

  // Load templates from localStorage
  const loadReviewTemplates = () => {
    const savedTemplates = localStorage.getItem('reviewTemplates');
    if (savedTemplates) {
      setReviewTemplates(JSON.parse(savedTemplates));
    }
  };

  // Save templates to localStorage
  const saveReviewTemplates = (templates: any[]) => {
    localStorage.setItem('reviewTemplates', JSON.stringify(templates));
    setReviewTemplates(templates);
  };

  useEffect(() => {
    loadReviewTemplates();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/reviews/manage-reviews');
    if (newValue === 1) router.push('/reviews/auto-reviews');
  };

  const handleAddTemplate = () => {
    router.push('/reviews/templates/new');
  };

  const handleViewTemplate = (template: any) => {
    router.push(`/reviews/templates/${template.id}/view`);
  };

  const handleEditTemplate = (template: any) => {
    router.push(`/reviews/templates/${template.id}/edit`);
  };

  const handleDuplicateTemplate = (template: any) => {
    setSelectedTemplate(template);
    setDuplicateDialogOpen(true);
  };

  const handleDeleteTemplate = (template: any) => {
    setSelectedTemplate(template);
    setDeleteDialogOpen(true);
  };

  const handleDuplicateConfirm = () => {
    if (selectedTemplate) {
      const newTemplate = {
        ...selectedTemplate,
        id: Date.now(),
        name: `${selectedTemplate.name} (Copy)`,
        status: 'Draft',
        usageCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      const updatedTemplates = [...reviewTemplates, newTemplate];
      saveReviewTemplates(updatedTemplates);
    }
    setDuplicateDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedTemplate) {
      const updatedTemplates = reviewTemplates.filter(t => t.id !== selectedTemplate.id);
      saveReviewTemplates(updatedTemplates);
    }
    setDeleteDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleDuplicateCancel = () => {
    setDuplicateDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedTemplate(null);
  };

  const filteredTemplates = reviewTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Reviews
        </Typography>

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
          <Tab label="Manage Reviews" />
          <Tab label="Auto Reviews" />
          <Tab label="Review Templates" />
        </Tabs>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Search review templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 400 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={"eva:search-fill" as any} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Review Templates Grid */}
      <Grid container spacing={3}>
        {filteredTemplates.map((template) => (
          <Grid key={template.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'grey.50',
                border: 1,
                borderColor: 'grey.200',
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                {/* Header with Name and Status */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, flex: 1, color: 'text.primary' }}>
                    {template.name}
                  </Typography>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: template.status === 'Active' ? 'success.lighter' : 
                              template.status === 'Draft' ? 'warning.lighter' : 'error.lighter',
                      color: template.status === 'Active' ? 'success.darker' : 
                             template.status === 'Draft' ? 'warning.darker' : 'error.darker',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    {template.status}
                  </Box>
                </Box>

                {/* Description */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {template.description}
                </Typography>

                {/* Category and Usage */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Category: {template.category}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Used {template.usageCount} times
                  </Typography>
                </Box>

                {/* Questions Preview */}
                <Box sx={{ flex: 1, mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Questions ({template.questions.length}):
                  </Typography>
                  <Box sx={{ maxHeight: 120, overflow: 'auto' }}>
                    {template.questions.slice(0, 3).map((question: string, index: number) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5, fontSize: '0.875rem' }}>
                        • {question}
                      </Typography>
                    ))}
                    {template.questions.length > 3 && (
                      <Typography variant="caption" color="text.secondary">
                        +{template.questions.length - 3} more questions
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Created Date */}
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 2 }}>
                  Created: {template.createdAt}
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 'auto' }}>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => handleViewTemplate(template)}
                  >
                    <Iconify icon={"eva:eye-fill" as any} sx={{ mr: 0.5 }} />
                    View
                  </Button>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <Iconify icon={"eva:edit-fill" as any} sx={{ mr: 0.5 }} />
                    Edit
                  </Button>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => handleDuplicateTemplate(template)}
                  >
                    <Iconify icon={"eva:copy-fill" as any} sx={{ mr: 0.5 }} />
                    Copy
                  </Button>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    color="error"
                    onClick={() => handleDeleteTemplate(template)}
                  >
                    <Iconify icon={"eva:trash-2-fill" as any} sx={{ mr: 0.5 }} />
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            No review templates found
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first review template to get started'}
          </Typography>
          <Button variant="contained" onClick={handleAddTemplate}>
            Create Review Template
          </Button>
        </Box>
      )}

      {/* Duplicate Confirmation Dialog */}
      <Dialog open={duplicateDialogOpen} onClose={handleDuplicateCancel}>
        <DialogTitle>Duplicate Template</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to duplicate &quot;{selectedTemplate?.name}&quot;? 
            This will create a copy with &quot;(Copy)&quot; added to the name.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDuplicateCancel}>Cancel</Button>
          <Button onClick={handleDuplicateConfirm} variant="contained">
            Duplicate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Template</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete &quot;{selectedTemplate?.name}&quot;? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
