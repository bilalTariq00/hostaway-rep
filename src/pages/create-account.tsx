import { useNavigate } from 'react-router';
import React, { useRef, useState } from 'react';
import { Eye, Camera, EyeOff, Search, Upload, UserPlus } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useAuth, type User, type UserRole } from 'src/contexts/auth-context';

// Client interface
interface Client {
  id: string;
  name: string;
  email: string;
  status?: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

// Get clients from localStorage (in a real app, this would come from an API)
const getClients = (): Client[] => {
  const savedClients = JSON.parse(localStorage.getItem('clients') || '[]');
  // If no clients exist, create some default ones
  if (savedClients.length === 0) {
    const defaultClients: Client[] = [
      { id: 'client1', name: 'Luxury Rentals LLC', email: 'contact@luxuryrentals.com', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'client2', name: 'Vacation Homes Inc', email: 'info@vacationhomes.com', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'client3', name: 'Premium Properties', email: 'hello@premiumprops.com', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'client4', name: 'Elite Stays', email: 'support@elitestays.com', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ];
    localStorage.setItem('clients', JSON.stringify(defaultClients));
    return defaultClients;
  }
  return savedClients;
};

// Mock properties data with client assignments (in a real app, this would come from an API)
const mockProperties = [
  { id: '305034', name: 'La Dimora Del Cavaliere', location: 'Anguillara Sabazia, Italy', clientId: 'client1' },
  { id: '305035', name: 'Navigli', location: 'Milano, Italy', clientId: 'client1' },
  { id: '305225', name: 'Polacchi42', location: 'Roma, Italy', clientId: 'client2' },
  { id: '305421', name: 'Superattico - Via Del Corso 43', location: 'Roma, Italy', clientId: 'client2' },
  { id: '306532', name: 'Montecatini Terme', location: 'Montecatini Terme, Italy', clientId: 'client3' },
  { id: '306533', name: 'Tuscany Villa', location: 'Florence, Italy', clientId: 'client3' },
  { id: '306534', name: 'Coastal Retreat', location: 'Amalfi, Italy', clientId: 'client4' },
];

const roleDescriptions = {
  associate: 'Lowest level workers with basic access to assigned properties',
  supervisor: 'Manages Associates and has elevated access to assigned properties',
  manager: 'Super admins with full access to all properties and system management',
};

interface CreateAccountPageProps {
  userToEdit?: User;
  viewMode?: boolean;
  onClose?: () => void;
}

export function CreateAccountPage({ userToEdit, viewMode = false, onClose }: CreateAccountPageProps = {}) {
  const navigate = useNavigate();
  const { createUser, updateUser, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: userToEdit?.name || '',
    email: userToEdit?.email || '',
    password: '',
    confirmPassword: '',
    role: (userToEdit?.role || '') as UserRole | '',
    status: userToEdit?.status || 'active' as 'active' | 'inactive' | 'suspended',
    assignedClients: userToEdit?.assignedClients || [],
    assignedProperties: userToEdit?.assignedProperties || [],
    assignedUsers: userToEdit?.assignedUsers || [],
    assignedManager: userToEdit?.assignedManager || '',
    assignedSupervisor: userToEdit?.assignedSupervisor || '',
    phone: '',
    company: 'Hostaway Inc',
    country: 'United States',
    state: '',
    city: '',
    address: '',
    zipCode: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(userToEdit?.avatar || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get available users for assignment (only associates for supervisors and managers)
  const getAvailableUsers = () => {
    const createdUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
    return createdUsers.filter((user: User) => user.role === 'associate');
  };

  // Get available managers for associates to select
  const getAvailableManagers = () => {
    const createdUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
    return createdUsers.filter((user: User) => user.role === 'manager');
  };

  // Get available supervisors for associates to select
  const getAvailableSupervisors = () => {
    const createdUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
    return createdUsers.filter((user: User) => user.role === 'supervisor');
  };

  // Get available properties based on selected clients
  const getAvailableProperties = () => {
    if (formData.assignedClients.length === 0) {
      return [];
    }
    return mockProperties.filter(property => 
      formData.assignedClients.includes(property.clientId)
    );
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleClientToggle = (clientId: string) => {
    setFormData(prev => {
      const newClients = prev.assignedClients.includes(clientId)
        ? prev.assignedClients.filter(id => id !== clientId)
        : [...prev.assignedClients, clientId];
      
      // Clear properties when clients change
      return {
        ...prev,
        assignedClients: newClients,
        assignedProperties: []
      };
    });
  };

  const handlePropertyToggle = (propertyId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedProperties: prev.assignedProperties.includes(propertyId)
        ? prev.assignedProperties.filter(id => id !== propertyId)
        : [...prev.assignedProperties, propertyId]
    }));
  };

  const handleUserToggle = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedUsers: prev.assignedUsers.includes(userId)
        ? prev.assignedUsers.filter(id => id !== userId)
        : [...prev.assignedUsers, userId]
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, JPG, PNG, or GIF)');
        return;
      }
      
      // Validate file size (3MB)
      if (file.size > 3 * 1024 * 1024) {
        setError('File size must be less than 3MB');
        return;
      }
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.role) {
      setError('Please select a role');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      let updateSuccess = false;
      
      if (userToEdit) {
        // Update existing user
        updateSuccess = await updateUser(userToEdit.id, {
          name: formData.name,
          email: formData.email,
          role: formData.role as UserRole,
          status: formData.status,
          assignedClients: formData.assignedClients,
          assignedProperties: formData.assignedProperties,
          assignedUsers: formData.assignedUsers,
          assignedManager: formData.assignedManager,
          assignedSupervisor: formData.assignedSupervisor,
          avatar: uploadedImage || undefined,
        });
      } else {
        // Create new user
        updateSuccess = await createUser({
          name: formData.name,
          email: formData.email,
          role: formData.role as UserRole,
          status: formData.status,
          assignedClients: formData.assignedClients,
          assignedProperties: formData.assignedProperties,
          assignedUsers: formData.assignedUsers,
          assignedManager: formData.assignedManager,
          assignedSupervisor: formData.assignedSupervisor,
          avatar: uploadedImage || undefined,
        });
      }

      if (updateSuccess) {
        setSuccess(true);
        setTimeout(() => {
          if (onClose) {
            onClose();
          } else {
            navigate('/user-management');
          }
        }, 2000);
      } else {
        setError(`Failed to ${userToEdit ? 'update' : 'create'} account. Please try again.`);
      }
    } catch {
      setError('An error occurred. Please try again.');
    }
  };

  if (success) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Card sx={{ maxWidth: 400, width: '100%', mx: 2 }}>
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 2, bgcolor: 'success.main' }}>
              <UserPlus size={32} />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {userToEdit ? 'Account Updated Successfully!' : 'Account Created Successfully!'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userToEdit 
                ? 'The user account has been updated successfully.'
                : 'The new user account has been created and can now log in with their assigned role.'
              }
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link color="inherit" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Dashboard
          </Link>
          <Link color="inherit" href="/user-management" onClick={(e) => { e.preventDefault(); navigate('/user-management'); }}>
            User Management
          </Link>
          <Typography color="text.primary">
            {viewMode ? 'View Account' : userToEdit ? 'Edit Account' : 'Create Account'}
          </Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '300px 1fr' }, gap: 3 }}>
          {/* Left Column - Avatar and Controls */}
          <Card sx={{ height: 'fit-content' }}>
            <CardContent sx={{ p: 3 }}>
              {/* Status */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Status
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ 
                    px: 2, 
                    py: 0.5, 
                    borderRadius: 1, 
                    backgroundColor: '#fff3e0',
                    color: '#ef6c00',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    Pending
                  </Box>
                </Box>
              </Box>

              {/* Avatar */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    cursor: 'pointer',
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    '&:hover .upload-overlay': {
                      opacity: 1,
                    },
                    '&:hover .avatar-circle': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    }
                  }}
                  onClick={handleImageClick}
                >
                  <Box
                    className="avatar-circle"
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mx: 'auto', 
                      mb: 2, 
                      borderRadius: '50%',
                      border: '2px dashed',
                      borderColor: uploadedImage ? 'transparent' : 'grey.400',
                      backgroundColor: uploadedImage ? 'transparent' : 'grey.100',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundImage: uploadedImage ? `url(${uploadedImage})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      overflow: 'hidden'
                    }}
                  >
                    {!uploadedImage && (
                      <Box sx={{ textAlign: 'center', color: 'grey.500' }}>
                        <Camera size={32} />
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontSize: '0.7rem' }}>
                          Upload photo
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  {/* Upload Overlay */}
                  <Box
                    className="upload-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      cursor: 'pointer',
                      zIndex: 1
                    }}
                  >
                    <Box sx={{ textAlign: 'center', color: 'white' }}>
                      <Upload size={24} />
                      <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                        Upload photo
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  max size of 3 Mb
                </Typography>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </Box>

              {/* Account Controls */}
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={emailVerified}
                      onChange={(e) => setEmailVerified(e.target.checked)}
                      color="success"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Email verified
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Disabling this will automatically send the user a verification email
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              <Button
                variant="contained"
                color="error"
                fullWidth
                disabled
                sx={{ mb: 2 }}
              >
                Delete user
              </Button>
            </CardContent>
          </Card>

          {/* Right Column - Form */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                User Information
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    disabled={viewMode}
                    label="Full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                  <TextField
                    fullWidth
                    disabled={viewMode}
                    label="Email address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    disabled={viewMode}
                    label="Phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    disabled={viewMode}
                    label="Company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    disabled={viewMode}
                    label="Country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    disabled={viewMode}
                    label="State/Region"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    disabled={viewMode}
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    disabled={viewMode}
                    label="Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    disabled={viewMode}
                    label="Zip/Code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      disabled={viewMode}
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      label="Role"
                    >
                      <MenuItem value="associate">Associate</MenuItem>
                      <MenuItem value="supervisor">Supervisor</MenuItem>
                      <MenuItem value="manager">Manager</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      disabled={viewMode}
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="suspended">Suspended</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
                  <TextField
                    fullWidth
                    disabled={viewMode}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    disabled={viewMode}
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {formData.role && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Role Description
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {roleDescriptions[formData.role as keyof typeof roleDescriptions]}
                    </Typography>
                  </Box>
                )}

                {/* Client and Property Assignment - Only for Associates */}
                {formData.role === 'associate' && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      Assign Clients
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      First, select which clients this user will work with:
                    </Typography>

                    {/* Selected Clients Badges */}
                    {formData.assignedClients.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                          Selected Clients ({formData.assignedClients.length}):
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {formData.assignedClients.map((clientId) => {
                            const client = getClients().find(c => c.id === clientId);
                            return (
                              <Chip
                                key={clientId}
                                label={client ? client.name : `Client ${clientId}`}
                                onDelete={() => handleClientToggle(clientId)}
                                color="secondary"
                                variant="outlined"
                                size="small"
                              />
                            );
                          })}
                        </Box>
                      </Box>
                    )}

                    <Autocomplete
                      multiple
                      disabled={viewMode}
                      options={getClients()}
                      getOptionLabel={(option) => `${option.name} (${option.email})`}
                      value={getClients().filter(client => formData.assignedClients.includes(client.id))}
                      onChange={(event, newValue) => {
                        const selectedIds = newValue.map(client => client.id);
                        setFormData(prev => ({
                          ...prev,
                          assignedClients: selectedIds,
                          assignedProperties: [] // Clear properties when clients change
                        }));
                      }}
                      filterOptions={(options, { inputValue }) =>
                        options.filter(option =>
                          option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                          option.email.toLowerCase().includes(inputValue.toLowerCase()) ||
                          option.id.includes(inputValue)
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search and select clients..."
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search size={20} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      renderOption={(props, option) => (
                        <Box component="li" {...props}>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {option.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {option.email}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      renderTags={() => null} // Hide tags since we show them above
                      sx={{ mb: 3 }}
                    />

                    <Typography variant="subtitle2" gutterBottom>
                      Assign Manager & Supervisor
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Select which Manager and Supervisor will oversee this Associate:
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
                      <FormControl fullWidth>
                        <InputLabel>Manager</InputLabel>
                        <Select
                          disabled={viewMode}
                          value={formData.assignedManager}
                          onChange={(e) => handleInputChange('assignedManager', e.target.value)}
                          label="Manager"
                        >
                          <MenuItem value="">
                            <em>No Manager Assigned</em>
                          </MenuItem>
                          {getAvailableManagers().map((manager: User) => (
                            <MenuItem key={manager.id} value={manager.id}>
                              {manager.name} ({manager.email})
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl fullWidth>
                        <InputLabel>Supervisor</InputLabel>
                        <Select
                          disabled={viewMode}
                          value={formData.assignedSupervisor}
                          onChange={(e) => handleInputChange('assignedSupervisor', e.target.value)}
                          label="Supervisor"
                        >
                          <MenuItem value="">
                            <em>No Supervisor Assigned</em>
                          </MenuItem>
                          {getAvailableSupervisors().map((supervisor: User) => (
                            <MenuItem key={supervisor.id} value={supervisor.id}>
                              {supervisor.name} ({supervisor.email})
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    <Typography variant="subtitle2" gutterBottom>
                      Assign Properties
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Then, select which properties from the assigned clients this user will have access to:
                    </Typography>

                    {formData.assignedClients.length === 0 && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        Please select clients first to see their available properties.
                      </Alert>
                    )}

                    {/* Selected Properties Badges */}
                    {formData.assignedProperties.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                          Selected Properties ({formData.assignedProperties.length}):
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {formData.assignedProperties.map((propertyId) => {
                            const property = mockProperties.find(p => p.id === propertyId);
                            return (
                              <Chip
                                key={propertyId}
                                label={property ? property.name : `Property ${propertyId}`}
                                onDelete={() => handlePropertyToggle(propertyId)}
                                color="primary"
                                variant="outlined"
                                size="small"
                              />
                            );
                          })}
                        </Box>
                      </Box>
                    )}

                    {/* Property Search Dropdown */}
                    <Autocomplete
                      multiple
                      disabled={formData.assignedClients.length === 0 || viewMode}
                      options={getAvailableProperties()}
                      getOptionLabel={(option) => `${option.name} (${option.location})`}
                      value={getAvailableProperties().filter(prop => formData.assignedProperties.includes(prop.id))}
                      onChange={(event, newValue) => {
                        const selectedIds = newValue.map(prop => prop.id);
                        setFormData(prev => ({ ...prev, assignedProperties: selectedIds }));
                      }}
                      filterOptions={(options, { inputValue }) =>
                        options.filter(option =>
                          option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                          option.location.toLowerCase().includes(inputValue.toLowerCase()) ||
                          option.id.includes(inputValue)
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search and select properties..."
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search size={20} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      renderOption={(props, option) => (
                        <Box component="li" {...props}>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {option.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {option.location} (ID: {option.id})
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      renderTags={() => null} // Hide tags since we show them above
                      sx={{ mb: 2 }}
                    />
                  </>
                )}

                {/* User Assignment for Supervisors and Managers */}
                {(formData.role === 'supervisor' || formData.role === 'manager') && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      Assign Users
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Select which Associates this {formData.role} will manage:
                    </Typography>

                    {/* Selected Users Badges */}
                    {formData.assignedUsers.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                          Selected Users ({formData.assignedUsers.length}):
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {formData.assignedUsers.map((userId) => {
                            const user = getAvailableUsers().find((u: User) => u.id === userId);
                            return (
                              <Chip
                                key={userId}
                                label={user ? user.name : `User ${userId}`}
                                onDelete={() => handleUserToggle(userId)}
                                color="info"
                                variant="outlined"
                                size="small"
                              />
                            );
                          })}
                        </Box>
                      </Box>
                    )}

                    <Autocomplete
                      multiple
                      disabled={viewMode}
                      options={getAvailableUsers()}
                      getOptionLabel={(option) => `${option.name} (${option.email})`}
                      value={getAvailableUsers().filter((user: User) => formData.assignedUsers.includes(user.id))}
                      onChange={(event, newValue) => {
                        const selectedIds = newValue.map(user => user.id);
                        setFormData(prev => ({ ...prev, assignedUsers: selectedIds }));
                      }}
                      filterOptions={(options, { inputValue }) =>
                        options.filter(option =>
                          option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                          option.email.toLowerCase().includes(inputValue.toLowerCase()) ||
                          option.id.includes(inputValue)
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search and select users to manage..."
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search size={20} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      renderOption={(props, option) => (
                        <Box component="li" {...props}>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {option.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {option.email}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      renderTags={() => null} // Hide tags since we show them above
                      sx={{ mb: 2 }}
                    />
                  </>
                )}

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => onClose ? onClose() : navigate('/user-management')}
                    disabled={isLoading}
                  >
                    {viewMode ? 'Close' : 'Cancel'}
                  </Button>
                  {!viewMode && (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                    >
                      {isLoading 
                        ? (userToEdit ? 'Updating Account...' : 'Creating Account...') 
                        : (userToEdit ? 'Update Account' : 'Create Account')
                      }
                    </Button>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}