import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  X,
  Plus,
  Save,
  Star,
  Calendar,
  ArrowLeft,
} from 'lucide-react';

import {
  Box,
  Button,
  Select,
  Checkbox,
  MenuItem,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for task details
const mockTaskData = {
  id: 1,
  title: 'Property Inspection',
  description: 'Conduct thorough inspection of Villa Del Sol',
  startDate: '2024-02-15',
  startTime: '09:00',
  endDate: '2024-02-15',
  endTime: '17:00',
  category: 'Maintenance',
  listing: 'Villa Del Sol',
  channel: 'Airbnb',
  reservation: 'RES-001',
  status: 'To Do',
  assignee: 'John Doe',
  supervisor: 'Jane Smith',
  group: 'Maintenance Team',
  cost: 150.00,
  costCurrency: 'EUR',
  costDescription: 'Inspection and minor repairs',
  autoGenerateExpense: false,
  feedbackScore: 0,
  resolutionNote: '',
  feedbackNote: '',
};

export default function TaskFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState(mockTaskData);
  const [checklistItems, setChecklistItems] = useState<string[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleBack = () => {
    navigate('/tasks');
  };

  const handleSave = () => {
    console.log('Saving task...', formData);
    // In a real app, this would save the task
    navigate('/tasks');
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklistItems(prev => [...prev, newChecklistItem.trim()]);
      setNewChecklistItem('');
    }
  };

  const handleRemoveChecklistItem = (index: number) => {
    setChecklistItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddAttachment = () => {
    // In a real app, this would open a file picker
    console.log('Adding attachment...');
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="text"
              startIcon={<ArrowLeft size={20} />}
              onClick={handleBack}
              sx={{ color: 'primary.main' }}
            >
              Back to Tasks
            </Button>
          </Box>
          <Button variant="contained" onClick={handleSave} startIcon={<Save size={16} />}>
            Save task
          </Button>
        </Box>
        
        <TextField
          fullWidth
          placeholder="Task title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          sx={{ 
            '& .MuiOutlinedInput-root': { 
              fontSize: '1.5rem',
              fontWeight: 600,
              '& fieldset': { border: 'none' }
            }
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Column */}
        <Box sx={{ flex: 2 }}>
          {/* Schedule */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Schedule
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
                <TextField
                  fullWidth
                  label="Start date (Local time)"
                  placeholder="Start date (Loc..."
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Calendar size={16} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
                <TextField
                  fullWidth
                  label="Start time (Local time)"
                  placeholder="Start time (Local tin"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="body2">▼</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
                <TextField
                  fullWidth
                  label="End date (Local time)"
                  placeholder="End date (Loc..."
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Calendar size={16} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
                <TextField
                  fullWidth
                  label="End time (Local time)"
                  placeholder="End time (Local tim"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="body2">▼</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Details */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Details
            </Typography>
            <TextField
              fullWidth
              label="Description"
              placeholder="Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Box>

          {/* Link */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Link
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                    <MenuItem value="Cleaning">Cleaning</MenuItem>
                    <MenuItem value="Inspection">Inspection</MenuItem>
                    <MenuItem value="Guest Service">Guest Service</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
                <FormControl fullWidth>
                  <InputLabel>Listing</InputLabel>
                  <Select
                    value={formData.listing}
                    label="Listing"
                    onChange={(e) => handleInputChange('listing', e.target.value)}
                  >
                    <MenuItem value="Villa Del Sol">Villa Del Sol</MenuItem>
                    <MenuItem value="Navigli Apartment">Navigli Apartment</MenuItem>
                    <MenuItem value="Polacchi42">Polacchi42</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
                <FormControl fullWidth>
                  <InputLabel>Channel</InputLabel>
                  <Select
                    value={formData.channel}
                    label="Channel"
                    onChange={(e) => handleInputChange('channel', e.target.value)}
                  >
                    <MenuItem value="Airbnb">Airbnb</MenuItem>
                    <MenuItem value="Booking.com">Booking.com</MenuItem>
                    <MenuItem value="Direct">Direct</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
                <FormControl fullWidth>
                  <InputLabel>Reservation</InputLabel>
                  <Select
                    value={formData.reservation}
                    label="Reservation"
                    onChange={(e) => handleInputChange('reservation', e.target.value)}
                  >
                    <MenuItem value="RES-001">RES-001</MenuItem>
                    <MenuItem value="RES-002">RES-002</MenuItem>
                    <MenuItem value="RES-003">RES-003</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          {/* Task checklist */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Task checklist
            </Typography>
            <Button
              variant="text"
              startIcon={<Plus size={16} />}
              sx={{ color: 'primary.main', mb: 2 }}
            >
              ADD CHECKLIST
            </Button>
            <Box sx={{ minHeight: 200, border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Add checklist item..."
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  size="small"
                />
                <Button variant="contained" onClick={handleAddChecklistItem}>
                  Add
                </Button>
              </Box>
              {checklistItems.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Checkbox size="small" />
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {item}
                  </Typography>
                  <IconButton size="small" onClick={() => handleRemoveChecklistItem(index)}>
                    <X size={16} />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Attachments */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Attachments
            </Typography>
            <Button
              variant="text"
              startIcon={<Plus size={16} />}
              sx={{ color: 'primary.main' }}
              onClick={handleAddAttachment}
            >
              ADD ATTACHMENT
            </Button>
            {attachments.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                No attachments added yet.
              </Typography>
            )}
          </Box>

          {/* Custom fields */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Custom fields
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No custom fields added.
            </Typography>
          </Box>
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: 1 }}>
          {/* Status */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Status
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => handleInputChange('status', e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <Box sx={{ width: 12, height: 12, bgcolor: 'warning.main', borderRadius: '50%', mr: 1 }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Users */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Users
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Assignee</InputLabel>
                <Select
                  value={formData.assignee}
                  label="Assignee"
                  onChange={(e) => handleInputChange('assignee', e.target.value)}
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
                >
                  <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                  <MenuItem value="Sarah Wilson">Sarah Wilson</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Group</InputLabel>
                <Select
                  value={formData.group}
                  label="Group"
                  onChange={(e) => handleInputChange('group', e.target.value)}
                >
                  <MenuItem value="Maintenance Team">Maintenance Team</MenuItem>
                  <MenuItem value="Cleaning Team">Cleaning Team</MenuItem>
                  <MenuItem value="Guest Services">Guest Services</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Cost */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Cost
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Cost"
                  placeholder="Cost"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                />
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={formData.costCurrency}
                    label="Currency"
                    onChange={(e) => handleInputChange('costCurrency', e.target.value)}
                  >
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TextField
                fullWidth
                label="Cost description"
                placeholder="Cost description"
                multiline
                rows={3}
                value={formData.costDescription}
                onChange={(e) => handleInputChange('costDescription', e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.autoGenerateExpense}
                    onChange={(e) => handleInputChange('autoGenerateExpense', e.target.checked)}
                  />
                }
                label="Automatically generate an expense when the task is marked as done"
              />
            </Box>
          </Box>

          {/* Resolution */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Resolution
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Feedback score
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <IconButton
                      key={star}
                      size="small"
                      onClick={() => handleInputChange('feedbackScore', star)}
                    >
                      <Star
                        size={20}
                        fill={star <= formData.feedbackScore ? '#FFD700' : 'none'}
                        stroke="#FFD700"
                      />
                    </IconButton>
                  ))}
                </Box>
              </Box>
              <TextField
                fullWidth
                label="Resolution note"
                placeholder="Resolution note"
                multiline
                rows={3}
                value={formData.resolutionNote}
                onChange={(e) => handleInputChange('resolutionNote', e.target.value)}
              />
              <TextField
                fullWidth
                label="Feedback note"
                placeholder="Feedback note"
                multiline
                rows={3}
                value={formData.feedbackNote}
                onChange={(e) => handleInputChange('feedbackNote', e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardContent>
  );
}
