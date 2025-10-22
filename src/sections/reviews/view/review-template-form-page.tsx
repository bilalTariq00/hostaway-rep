import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

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
];

export function ReviewTemplateFormPage() {
  const router = useRouter();
  const { id } = useParams();
  const location = useLocation();

  const isEdit = location.pathname.includes('/edit');
  const isDuplicate = location.pathname.includes('/duplicate');
  const isView = location.pathname.includes('/view');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'General',
    questions: [''],
    status: 'Active',
  });

  // Load template data for edit/duplicate/view modes
  useEffect(() => {
    if (id && (isEdit || isDuplicate || isView)) {
      const savedTemplates = localStorage.getItem('reviewTemplates');
      let templates = mockReviewTemplates;

      if (savedTemplates) {
        templates = JSON.parse(savedTemplates);
      }

      const template = templates.find((t: any) => t.id === parseInt(id));
      if (template) {
        setFormData({
          name: isDuplicate ? `${template.name} (Copy)` : template.name,
          description: template.description,
          category: template.category,
          questions: template.questions.length > 0 ? template.questions : [''],
          status: isDuplicate ? 'Draft' : template.status,
        });
      }
    }
  }, [id, isEdit, isDuplicate, isView]);

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData((prev) => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  const handleAddQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, ''],
    }));
  };

  const handleRemoveQuestion = (index: number) => {
    if (formData.questions.length > 1) {
      const newQuestions = formData.questions.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        questions: newQuestions,
      }));
    }
  };

  const handleSaveTemplate = () => {
    const savedTemplates = localStorage.getItem('reviewTemplates');
    let templates = mockReviewTemplates;

    if (savedTemplates) {
      templates = JSON.parse(savedTemplates);
    }

    const templateData = {
      ...formData,
      id: isEdit ? parseInt(id!) : Date.now(),
      createdAt: isEdit
        ? templates.find((t: any) => t.id === parseInt(id!))?.createdAt
        : new Date().toISOString().split('T')[0],
      usageCount: isEdit ? templates.find((t: any) => t.id === parseInt(id!))?.usageCount || 0 : 0,
    };

    if (isEdit) {
      // Update existing template
      const updatedTemplates = templates.map((t: any) =>
        t.id === parseInt(id!) ? templateData : t
      );
      localStorage.setItem('reviewTemplates', JSON.stringify(updatedTemplates));
    } else {
      // Create new template or duplicate
      const newTemplates = [...templates, templateData];
      localStorage.setItem('reviewTemplates', JSON.stringify(newTemplates));
    }

    router.push('/reviews/templates');
  };

  const handleDeleteTemplate = () => {
    if (isEdit) {
      const savedTemplates = localStorage.getItem('reviewTemplates');
      let templates = mockReviewTemplates;

      if (savedTemplates) {
        templates = JSON.parse(savedTemplates);
      }

      const updatedTemplates = templates.filter((t: any) => t.id !== parseInt(id!));
      localStorage.setItem('reviewTemplates', JSON.stringify(updatedTemplates));
    }

    router.push('/reviews/templates');
  };

  const getPageTitle = () => {
    if (isView) return 'View Review Template';
    if (isEdit) return 'Edit Review Template';
    if (isDuplicate) return 'Duplicate Review Template';
    return 'Create Review Template';
  };

  return (
    <DashboardContent maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => router.push('/reviews/templates')} sx={{ mr: 1 }}>
            <Iconify icon={'eva:arrow-back-fill' as any} />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {getPageTitle()}
          </Typography>
        </Box>
      </Box>

      {/* Form */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Basic Information */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Basic Information
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Template Name"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  disabled={isView}
                  fullWidth
                />

                <TextField
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  disabled={isView}
                  multiline
                  rows={3}
                  fullWidth
                />

                <FormControl fullWidth disabled={isView}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) => handleFormChange('category', e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="Luxury">Luxury</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Family">Family</MenuItem>
                    <MenuItem value="Pet-Friendly">Pet-Friendly</MenuItem>
                    <MenuItem value="Long-term">Long-term</MenuItem>
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.status === 'Active'}
                      onChange={(e) =>
                        handleFormChange('status', e.target.checked ? 'Active' : 'Inactive')
                      }
                      disabled={isView}
                    />
                  }
                  label="Active"
                />
              </Box>
            </Box>

            {/* Questions */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Review Questions
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {formData.questions.map((question, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      label={`Question ${index + 1}`}
                      value={question}
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                      disabled={isView}
                      fullWidth
                    />
                    {!isView && formData.questions.length > 1 && (
                      <IconButton onClick={() => handleRemoveQuestion(index)} color="error">
                        <Iconify icon={'eva:minus-circle-fill' as any} />
                      </IconButton>
                    )}
                  </Box>
                ))}

                {!isView && (
                  <Button
                    variant="outlined"
                    startIcon={<Iconify icon={'eva:plus-fill' as any} />}
                    onClick={handleAddQuestion}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Add Question
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {!isView && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={() => router.push('/reviews/templates')}>
            Cancel
          </Button>
          {isEdit && (
            <Button variant="outlined" color="error" onClick={handleDeleteTemplate}>
              Delete Template
            </Button>
          )}
          <Button variant="contained" onClick={handleSaveTemplate}>
            {isEdit ? 'Update Template' : 'Save Template'}
          </Button>
        </Box>
      )}

      {isView && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={() => router.push('/reviews/templates')}>
            Back to Templates
          </Button>
        </Box>
      )}
    </DashboardContent>
  );
}
