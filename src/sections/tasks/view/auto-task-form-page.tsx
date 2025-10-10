import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  X,
  Info,
  Plus,
  Save,
  ArrowLeft,
} from 'lucide-react';

import {
  Box,
  Card,
  Button,
  Select,
  Switch,
  Tooltip,
  Checkbox,
  MenuItem,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
  CardContent,
  FormControlLabel,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock listings data
const mockListings = [
  { id: '305034', name: 'La Dimora Del Cavaliere', image: '/assets/images/listing1.jpg' },
  { id: '305035', name: 'Navigli', image: '/assets/images/listing2.jpg' },
  { id: '305225', name: 'Polacchi42', image: '/assets/images/listing3.jpg' },
  { id: '305421', name: 'Superattico - Via Del Corso 43', image: '/assets/images/listing4.jpg' },
  { id: '306532', name: 'Montecatini Terme', image: '/assets/images/listing5.jpg' },
  { id: '308582', name: 'Monteverde - Quattroventi', image: '/assets/images/listing6.jpg' },
  { id: '310867', name: 'La Storta', image: '/assets/images/listing7.jpg' },
  { id: '317154', name: '[5 Min From Trastevere] Chic Apt', image: '/assets/images/listing8.jpg' },
  { id: '332386', name: 'Via Poggio Tulliano', image: '/assets/images/listing9.jpg' },
  { id: '363365', name: 'Via di Acqua Bullicante 113', image: '/assets/images/listing10.jpg' },
  { id: '345603', name: 'Via Dei Marruccini | San Lorenzo', image: '/assets/images/listing11.jpg' },
  { id: '363366', name: 'Via Matera 23A', image: '/assets/images/listing12.jpg' },
];

export function AutoTaskFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const isDuplicate = window.location.pathname.includes('/duplicate');
  
  // Load existing auto-tasks from localStorage
  const loadAutoTasks = () => {
    const tasksData = localStorage.getItem('autoTasks');
    if (tasksData) {
      return JSON.parse(tasksData);
    }
    return [];
  };
  
  const existingTasks = loadAutoTasks();
  const foundAutoTask = existingTasks.find((task: any) => task.id === parseInt(id || '0'));
  
  const initialData = isEdit && foundAutoTask ? {
    title: foundAutoTask.name || '',
    event: foundAutoTask.startingEvent || 'Check-in',
    startsAtValue: 0,
    startsAtUnit: 'Hours',
    startsAtTiming: 'At',
    startsAtEvent: foundAutoTask.startingEvent || 'Check-in',
    shouldEndByValue: 0,
    shouldEndByUnit: 'Hours',
    shouldEndByTiming: 'At',
    shouldEndByEvent: 'Check-out',
    description: foundAutoTask.description || '',
    checklistTemplate: 'Checklist template',
    attachments: [],
    addAutomaticallyNewListings: false,
    active: foundAutoTask.status === 'Active',
    assignee: 'Assignee user',
    supervisor: 'Supervisor user',
    group: 'User group',
    category: '',
    channel: foundAutoTask.linkedChannel || 'Channel',
    cost: '',
    costCurrency: 'Cost currency',
    costDescription: '',
    autoGenerateExpense: false,
    createTasksForExistingReservations: true,
    selectedListings: [],
  } : {};

  const [formData, setFormData] = useState({
    title: initialData.title || '',
    event: initialData.event || 'Check-in',
    startsAtValue: initialData.startsAtValue || 0,
    startsAtUnit: initialData.startsAtUnit || 'Hours',
    startsAtTiming: initialData.startsAtTiming || 'At',
    startsAtEvent: initialData.startsAtEvent || 'Check-in',
    shouldEndByValue: initialData.shouldEndByValue || 0,
    shouldEndByUnit: initialData.shouldEndByUnit || 'Hours',
    shouldEndByTiming: initialData.shouldEndByTiming || 'At',
    shouldEndByEvent: initialData.shouldEndByEvent || 'Check-out',
    description: initialData.description || '',
    checklistTemplate: initialData.checklistTemplate || 'Checklist template',
    attachments: initialData.attachments || [],
    addAutomaticallyNewListings: initialData.addAutomaticallyNewListings || false,
    active: initialData.active || false,
    assignee: initialData.assignee || 'Assignee user',
    supervisor: initialData.supervisor || 'Supervisor user',
    group: initialData.group || 'User group',
    category: initialData.category || '',
    channel: initialData.channel || 'Channel',
    cost: initialData.cost || '',
    costCurrency: initialData.costCurrency || 'Cost currency',
    costDescription: initialData.costDescription || '',
    autoGenerateExpense: initialData.autoGenerateExpense || false,
    createTasksForExistingReservations: initialData.createTasksForExistingReservations || true,
    selectedListings: initialData.selectedListings || [] as string[],
  });

  const [listingSearch, setListingSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleListingToggle = (listingId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedListings: prev.selectedListings.includes(listingId)
        ? prev.selectedListings.filter((itemId: string) => itemId !== listingId)
        : [...prev.selectedListings, listingId]
    }));
  };

  const handleSelectAllListings = () => {
    const allListingIds = mockListings.map(listing => listing.id);
    setFormData((prev) => ({
      ...prev,
      selectedListings: prev.selectedListings.length === allListingIds.length ? [] : allListingIds
    }));
  };

  const handleSaveAutoTask = () => {
    console.log('Saving auto-task:', formData);
    
    // Get existing auto-tasks from localStorage or use mock data
    const tasksData = JSON.parse(localStorage.getItem('autoTasks') || '[]');
    
    if (isDuplicate) {
      // Create a new auto-task with the duplicated data
      const newAutoTask = {
        id: Date.now(), // Generate new ID
        name: formData.title,
        startingEvent: formData.event,
        dueBefore: `${formData.shouldEndByValue} ${formData.shouldEndByUnit.toLowerCase()}`,
        linkedChannel: formData.channel,
        linkedListing: formData.selectedListings.length > 0 ? mockListings.find(l => l.id === formData.selectedListings[0])?.name || 'Multiple Listings' : 'No Listing',
        status: formData.active ? 'Active' : 'Inactive',
        description: formData.description,
      };
      
      const updatedAutoTasks = [...tasksData, newAutoTask];
      localStorage.setItem('autoTasks', JSON.stringify(updatedAutoTasks));
      console.log('Created duplicate auto-task:', newAutoTask);
    } else if (isEdit && id) {
      // Update existing auto-task
      const updatedAutoTasks = tasksData.map((task: any) => 
        task.id === parseInt(id) 
          ? {
              ...task,
              name: formData.title,
              startingEvent: formData.event,
              dueBefore: `${formData.shouldEndByValue} ${formData.shouldEndByUnit.toLowerCase()}`,
              linkedChannel: formData.channel,
              linkedListing: formData.selectedListings.length > 0 ? mockListings.find(l => l.id === formData.selectedListings[0])?.name || 'Multiple Listings' : 'No Listing',
              status: formData.active ? 'Active' : 'Inactive',
              description: formData.description,
            }
          : task
      );
      localStorage.setItem('autoTasks', JSON.stringify(updatedAutoTasks));
      console.log('Updated auto-task:', formData);
    } else {
      // Create new auto-task
      const newAutoTask = {
        id: Date.now(), // Generate new ID
        name: formData.title,
        startingEvent: formData.event,
        dueBefore: `${formData.shouldEndByValue} ${formData.shouldEndByUnit.toLowerCase()}`,
        linkedChannel: formData.channel,
        linkedListing: formData.selectedListings.length > 0 ? mockListings.find(l => l.id === formData.selectedListings[0])?.name || 'Multiple Listings' : 'No Listing',
        status: formData.active ? 'Active' : 'Inactive',
        description: formData.description,
      };
      
      const updatedAutoTasks = [...tasksData, newAutoTask];
      localStorage.setItem('autoTasks', JSON.stringify(updatedAutoTasks));
      console.log('Created new auto-task:', newAutoTask);
    }
    
    navigate('/tasks/manage-auto-tasks');
  };

  const filteredListings = mockListings.filter(listing =>
    listing.name.toLowerCase().includes(listingSearch.toLowerCase())
  );

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Button startIcon={<ArrowLeft size={16} />} onClick={() => navigate('/tasks/manage-auto-tasks')}>
          Back to auto-tasks
        </Button>
        <Button variant="contained" onClick={handleSaveAutoTask} startIcon={<Save size={16} />}>
          {isDuplicate ? 'Create Duplicate' : isEdit ? 'Update auto-task' : 'Save auto-task'}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Column */}
        <Box sx={{ flex: 2 }}>
          {/* Task Title */}
          <TextField
            fullWidth
            label="Task title"
            placeholder="Task title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            sx={{ mb: 4 }}
            helperText={isDuplicate ? 'This will create a new auto-task based on the original' : ''}
          />

          {/* Schedule */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Schedule
            </Typography>
            
            {/* Event */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Event
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FormControl sx={{ minWidth: 200 }}>
                  <Select
                    value={formData.event}
                    onChange={(e) => handleInputChange('event', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="Check-in">Check-in</MenuItem>
                    <MenuItem value="Check-out">Check-out</MenuItem>
                    <MenuItem value="Booking Confirmed">Booking Confirmed</MenuItem>
                    <MenuItem value="Issue Reported">Issue Reported</MenuItem>
                  </Select>
                </FormControl>
                <IconButton size="small">
                  <X size={16} />
                </IconButton>
                <IconButton size="small">
                  <Typography variant="body2">▼</Typography>
                </IconButton>
              </Box>
            </Box>

            {/* Starts at */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Starts at
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <TextField
                  type="number"
                  value={formData.startsAtValue}
                  onChange={(e) => handleInputChange('startsAtValue', parseInt(e.target.value) || 0)}
                  sx={{ width: 80 }}
                />
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {['Hours', 'Days'].map((unit) => (
                    <Button
                      key={unit}
                      variant={formData.startsAtUnit === unit ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => handleInputChange('startsAtUnit', unit)}
                      sx={{ minWidth: 'auto', px: 1 }}
                    >
                      {unit}
                    </Button>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {['Before', 'At', 'After'].map((timing) => (
                    <Button
                      key={timing}
                      variant={formData.startsAtTiming === timing ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => handleInputChange('startsAtTiming', timing)}
                      sx={{ minWidth: 'auto', px: 1 }}
                    >
                      {timing}
                    </Button>
                  ))}
                </Box>
                <FormControl sx={{ minWidth: 150 }}>
                  <Select
                    value={formData.startsAtEvent}
                    onChange={(e) => handleInputChange('startsAtEvent', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="Check-in">Check-in</MenuItem>
                    <MenuItem value="Check-out">Check-out</MenuItem>
                    <MenuItem value="Booking Confirmed">Booking Confirmed</MenuItem>
                    <MenuItem value="Issue Reported">Issue Reported</MenuItem>
                  </Select>
                </FormControl>
                <IconButton size="small">
                  <X size={16} />
                </IconButton>
                <IconButton size="small">
                  <Typography variant="body2">▼</Typography>
                </IconButton>
              </Box>
            </Box>

            {/* Should end by */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Should end by
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <TextField
                  type="number"
                  value={formData.shouldEndByValue}
                  onChange={(e) => handleInputChange('shouldEndByValue', parseInt(e.target.value) || 0)}
                  sx={{ width: 80 }}
                />
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {['Hours', 'Days'].map((unit) => (
                    <Button
                      key={unit}
                      variant={formData.shouldEndByUnit === unit ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => handleInputChange('shouldEndByUnit', unit)}
                      sx={{ minWidth: 'auto', px: 1 }}
                    >
                      {unit}
                    </Button>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {['Before', 'At', 'After'].map((timing) => (
                    <Button
                      key={timing}
                      variant={formData.shouldEndByTiming === timing ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => handleInputChange('shouldEndByTiming', timing)}
                      sx={{ minWidth: 'auto', px: 1 }}
                    >
                      {timing}
                    </Button>
                  ))}
                </Box>
                <FormControl sx={{ minWidth: 150 }}>
                  <Select
                    value={formData.shouldEndByEvent}
                    onChange={(e) => handleInputChange('shouldEndByEvent', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="Check-in">Check-in</MenuItem>
                    <MenuItem value="Check-out">Check-out</MenuItem>
                    <MenuItem value="Booking Confirmed">Booking Confirmed</MenuItem>
                    <MenuItem value="Issue Reported">Issue Reported</MenuItem>
                  </Select>
                </FormControl>
                <IconButton size="small">
                  <X size={16} />
                </IconButton>
                <IconButton size="small">
                  <Typography variant="body2">▼</Typography>
                </IconButton>
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
              multiline
              rows={4}
              label="Description"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Box>

          {/* Task checklist */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Task checklist
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Checklist template</InputLabel>
              <Select
                value={formData.checklistTemplate}
                label="Checklist template"
                onChange={(e) => handleInputChange('checklistTemplate', e.target.value)}
              >
                <MenuItem value="Checklist template">Checklist template</MenuItem>
                <MenuItem value="Cleaning Checklist">Cleaning Checklist</MenuItem>
                <MenuItem value="Maintenance Checklist">Maintenance Checklist</MenuItem>
                <MenuItem value="Inspection Checklist">Inspection Checklist</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Attachments */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Attachments
            </Typography>
            <Button variant="text" startIcon={<Plus size={16} />}>
              ADD ATTACHMENT
            </Button>
          </Box>

          {/* Listing */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Listing
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Switch
                checked={formData.addAutomaticallyNewListings}
                onChange={(e) => handleInputChange('addAutomaticallyNewListings', e.target.checked)}
              />
              <Typography variant="body2">Add automatically new listings</Typography>
              <Tooltip title="This will automatically add new listings to this auto-task">
                <Info size={16} />
              </Tooltip>
            </Box>
            
            <TextField
              fullWidth
              placeholder="Type to search listing..."
              value={listingSearch}
              onChange={(e) => setListingSearch(e.target.value)}
              sx={{ mb: 2 }}
            />
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select tags</InputLabel>
              <Select
                multiple
                value={selectedTags}
                onChange={(e) => setSelectedTags(e.target.value as string[])}
                label="Select tags"
              >
                <MenuItem value="luxury">Luxury</MenuItem>
                <MenuItem value="budget">Budget</MenuItem>
                <MenuItem value="family">Family</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </Select>
            </FormControl>
            
            <Button variant="contained" onClick={handleSelectAllListings} sx={{ mb: 2 }}>
              Select all
            </Button>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
              {filteredListings.map((listing) => (
                <Card key={listing.id} sx={{ position: 'relative' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: 'grey.200',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          Image
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {listing.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ({listing.id})
                        </Typography>
                      </Box>
                      <Checkbox
                        checked={formData.selectedListings.includes(listing.id)}
                        onChange={() => handleListingToggle(listing.id)}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: 1 }}>
          {/* Active */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Active
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Switch
                checked={formData.active}
                onChange={(e) => handleInputChange('active', e.target.checked)}
              />
              <Typography variant="body2">{formData.active ? 'Yes' : 'No'}</Typography>
            </Box>
          </Box>

          {/* Users */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Users
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Assignee</InputLabel>
              <Select
                value={formData.assignee}
                label="Assignee"
                onChange={(e) => handleInputChange('assignee', e.target.value)}
              >
                <MenuItem value="Assignee user">Assignee user</MenuItem>
                <MenuItem value="John Doe">John Doe</MenuItem>
                <MenuItem value="Mike Johnson">Mike Johnson</MenuItem>
                <MenuItem value="Tom Brown">Tom Brown</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Supervisor</InputLabel>
              <Select
                value={formData.supervisor}
                label="Supervisor"
                onChange={(e) => handleInputChange('supervisor', e.target.value)}
              >
                <MenuItem value="Supervisor user">Supervisor user</MenuItem>
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
                <MenuItem value="User group">User group</MenuItem>
                <MenuItem value="Cleaning Team">Cleaning Team</MenuItem>
                <MenuItem value="Maintenance Team">Maintenance Team</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Link */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Link
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="Maintenance">Maintenance</MenuItem>
                <MenuItem value="Cleaning">Cleaning</MenuItem>
                <MenuItem value="Inspection">Inspection</MenuItem>
                <MenuItem value="Guest Service">Guest Service</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Channel</InputLabel>
              <Select
                value={formData.channel}
                label="Channel"
                onChange={(e) => handleInputChange('channel', e.target.value)}
              >
                <MenuItem value="Channel">Channel</MenuItem>
                <MenuItem value="Airbnb">Airbnb</MenuItem>
                <MenuItem value="Booking.com">Booking.com</MenuItem>
                <MenuItem value="Direct">Direct</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Cost */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Cost
            </Typography>
            <TextField
              fullWidth
              label="Cost"
              placeholder="Cost"
              value={formData.cost}
              onChange={(e) => handleInputChange('cost', e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Cost currency</InputLabel>
              <Select
                value={formData.costCurrency}
                label="Cost currency"
                onChange={(e) => handleInputChange('costCurrency', e.target.value)}
              >
                <MenuItem value="Cost currency">Cost currency</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Cost description"
              placeholder="Cost description"
              value={formData.costDescription}
              onChange={(e) => handleInputChange('costDescription', e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.autoGenerateExpense}
                  onChange={(e) => handleInputChange('autoGenerateExpense', e.target.checked)}
                />
              }
              label="Automatically generate an expense when the task is marked as done"
              sx={{ mb: 1 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.createTasksForExistingReservations}
                  onChange={(e) => handleInputChange('createTasksForExistingReservations', e.target.checked)}
                />
              }
              label="Create tasks from this auto-task for existing reservations"
            />
          </Box>
        </Box>
      </Box>
    </DashboardContent>
  );
}
