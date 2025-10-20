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

import { useAuth, type UserRole } from 'src/contexts/auth-context';

// Mock properties data (in a real app, this would come from an API)
const mockProperties = [
  { id: '305034', name: 'La Dimora Del Cavaliere', location: 'Anguillara Sabazia, Italy' },
  { id: '305035', name: 'Navigli', location: 'Milano, Italy' },
  { id: '305225', name: 'Polacchi42', location: 'Roma, Italy' },
  { id: '305421', name: 'Superattico - Via Del Corso 43', location: 'Roma, Italy' },
  { id: '306532', name: 'Montecatini Terme', location: 'Montecatini Terme, Italy' },
];

const roleDescriptions = {
  associate: 'Lowest level workers with basic access to assigned properties',
  supervisor: 'Manages Associates and has elevated access to assigned properties',
  manager: 'Super admins with full access to all properties and system management',
};

export function CreateAccountPage() {
  const navigate = useNavigate();
  const { createUser, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole | '',
    assignedProperties: [] as string[],
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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handlePropertyToggle = (propertyId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedProperties: prev.assignedProperties.includes(propertyId)
        ? prev.assignedProperties.filter(id => id !== propertyId)
        : [...prev.assignedProperties, propertyId]
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
      const createSuccess = await createUser({
        name: formData.name,
        email: formData.email,
        role: formData.role as UserRole,
        assignedProperties: formData.assignedProperties,
      });

      if (createSuccess) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/user-management');
        }, 2000);
      } else {
        setError('Failed to create account. Please try again.');
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
              Account Created Successfully!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The new user account has been created and can now log in with their assigned role.
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
          <Typography color="text.primary">Create Account</Typography>
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
                    label="Full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                  <TextField
                    fullWidth
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
                    label="Phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="State/Region"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Zip/Code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      label="Role"
                    >
                      <MenuItem value="associate">Associate</MenuItem>
                      <MenuItem value="supervisor">Supervisor</MenuItem>
                      <MenuItem value="manager">Manager</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
                  <TextField
                    fullWidth
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

                <Typography variant="subtitle2" gutterBottom>
                  Assign Properties
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Select which properties this user will have access to:
                </Typography>

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
                  options={mockProperties}
                  getOptionLabel={(option) => `${option.name} (${option.location})`}
                  value={mockProperties.filter(prop => formData.assignedProperties.includes(prop.id))}
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

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/user-management')}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Save Changes'}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}