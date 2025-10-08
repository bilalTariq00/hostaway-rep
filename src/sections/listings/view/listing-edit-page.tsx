import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X,
  Info,
  Save,
  Globe,
  Calendar,
  ArrowLeft,
  RefreshCw,
  PlusCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import {
  Box,
  Tab,
  Chip,
  Tabs,
  Button,
  Drawer,
  Select,
  Switch,
  MenuItem,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
  FormControlLabel,
} from '@mui/material';

// Mock data for the listing being edited
const mockListingData = {
  id: 1,
  propertyName: "Superattico - Via Del Corso 43",
  externalName: "[Sky Domus] Historic Center Penthouse With Jacuzzi",
  capacity: 5,
  propertyType: "Apartment",
  roomType: "Entire home",
  bedrooms: 2,
  beds: 3,
  description: "PENTHOUSE con JACUZZI, panoramica e lussuosa nel cuore di ROMA, su Via del Corso che regala una vista mozzafiato su PIAZZA VENEZIA e PIAZZA DEL POPOLO. A meno di 5 minuti a piedi dai monumenti storici più importanti, come PIAZZA DI SPAGNA E DEL POPOLO, FONTANA DI TREVI ed altri !",
  address: "Via del Corso 43, Rome, Italy",
  city: "Rome",
  country: "Italy",
  amenities: ["Wifi", "TV", "Kitchen", "Heating", "Air conditioning", "Pool", "Jacuzzi"],
  basePrice: 150,
  cleaningFee: 25,
  instantBookable: true,
  minimumNights: 2,
  checkInTime: "15:00",
  checkOutTime: "11:00"
};

export default function ListingEditPage() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('basic-info');
  const [translationsOpen, setTranslationsOpen] = useState(false);
  const [formData, setFormData] = useState(mockListingData);

  const handleBack = () => {
    navigate('/listings');
  };

  const handleTranslationsOpen = () => {
    setTranslationsOpen(true);
  };

  const handleTranslationsClose = () => {
    setTranslationsOpen(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving listing data:', formData);
    // Here you would typically save to your backend
    navigate('/listings');
  };

  const renderBasicInfoTab = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Basic info</Typography>
        <Button 
          variant="text" 
          size="small"
          sx={{ color: 'primary.main' }}
        >
          Learn how to Export to Airbnb PRO
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" sx={{ minWidth: 200, fontWeight: 500 }}>
            External Listing Name *
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Info size={16} color="#666" />
            <RefreshCw size={16} color="#666" />
          </Box>
          <TextField
            fullWidth
            value={formData.externalName}
            onChange={(e) => handleInputChange('externalName', e.target.value)}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" sx={{ minWidth: 200, fontWeight: 500 }}>
            Person capacity
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Info size={16} color="#666" />
            <RefreshCw size={16} color="#666" />
          </Box>
          <TextField
            fullWidth
            type="number"
            value={formData.capacity}
            onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" sx={{ minWidth: 200, fontWeight: 500 }}>
            Tags
          </Typography>
          <Info size={16} color="#666" />
          <TextField
            fullWidth
            placeholder="Tags"
            variant="outlined"
            size="small"
            select
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" sx={{ minWidth: 200, fontWeight: 500 }}>
            Property type *
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Info size={16} color="#666" />
            <RefreshCw size={16} color="#666" />
          </Box>
          <TextField
            fullWidth
            value={formData.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
            variant="outlined"
            size="small"
            select
          >
            <MenuItem value="Apartment">Apartment</MenuItem>
            <MenuItem value="House">House</MenuItem>
            <MenuItem value="Villa">Villa</MenuItem>
            <MenuItem value="Condo">Condo</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Typography variant="body1" sx={{ minWidth: 200, fontWeight: 500, mt: 1 }}>
            Description
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <PlusCircle size={16} color="#ff9800" />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" sx={{ minWidth: 200, fontWeight: 500 }}>
            Room type *
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Info size={16} color="#666" />
            <RefreshCw size={16} color="#666" />
          </Box>
          <TextField
            fullWidth
            value={formData.roomType}
            onChange={(e) => handleInputChange('roomType', e.target.value)}
            variant="outlined"
            size="small"
            select
          >
            <MenuItem value="Entire home">Entire home</MenuItem>
            <MenuItem value="Private room">Private room</MenuItem>
            <MenuItem value="Shared room">Shared room</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" sx={{ minWidth: 200, fontWeight: 500 }}>
            Number of bedrooms
          </Typography>
          <RefreshCw size={16} color="#666" />
          <TextField
            fullWidth
            type="number"
            value={formData.bedrooms}
            onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" sx={{ minWidth: 200, fontWeight: 500 }}>
            Number of beds
          </Typography>
          <RefreshCw size={16} color="#666" />
          <TextField
            fullWidth
            type="number"
            value={formData.beds}
            onChange={(e) => handleInputChange('beds', parseInt(e.target.value))}
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>
    </Box>
  );

  const renderAddressTab = () => (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Address</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField 
          fullWidth 
          label="Street Address" 
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          variant="outlined" 
        />
        <TextField 
          fullWidth 
          label="City" 
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          variant="outlined" 
        />
        <TextField 
          fullWidth 
          label="State/Province" 
          variant="outlined" 
        />
        <TextField 
          fullWidth 
          label="Postal Code" 
          variant="outlined" 
        />
        <TextField 
          fullWidth 
          label="Country" 
          value={formData.country}
          onChange={(e) => handleInputChange('country', e.target.value)}
          variant="outlined" 
        />
      </Box>
    </Box>
  );

  const renderAmenitiesTab = () => (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Amenities</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {formData.amenities.map((amenity, index) => (
          <Chip 
            key={index}
            label={amenity} 
            variant="outlined" 
            size="small"
            onDelete={() => {
              const newAmenities = formData.amenities.filter((_, i) => i !== index);
              handleInputChange('amenities', newAmenities);
            }}
          />
        ))}
      </Box>
    </Box>
  );

  const renderPricingTab = () => (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Price & fees</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField 
          fullWidth 
          label="Base Price (€)" 
          type="number"
          value={formData.basePrice}
          onChange={(e) => handleInputChange('basePrice', parseFloat(e.target.value))}
          variant="outlined" 
        />
        <TextField 
          fullWidth 
          label="Cleaning Fee (€)" 
          type="number"
          value={formData.cleaningFee}
          onChange={(e) => handleInputChange('cleaningFee', parseFloat(e.target.value))}
          variant="outlined" 
        />
        <TextField 
          fullWidth 
          label="Weekly Discount (%)" 
          type="number"
          variant="outlined" 
        />
        <TextField 
          fullWidth 
          label="Monthly Discount (%)" 
          type="number"
          variant="outlined" 
        />
      </Box>
    </Box>
  );

  const renderBookingTab = () => (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Booking settings</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControlLabel
          control={
            <Switch 
              checked={formData.instantBookable}
              onChange={(e) => handleInputChange('instantBookable', e.target.checked)}
            />
          }
          label="Instant Booking"
        />
        <TextField 
          fullWidth 
          label="Minimum Nights" 
          type="number"
          value={formData.minimumNights}
          onChange={(e) => handleInputChange('minimumNights', parseInt(e.target.value))}
          variant="outlined" 
        />
        <TextField 
          fullWidth 
          label="Check-in Time" 
          value={formData.checkInTime}
          onChange={(e) => handleInputChange('checkInTime', e.target.value)}
          variant="outlined" 
        />
        <TextField 
          fullWidth 
          label="Check-out Time" 
          value={formData.checkOutTime}
          onChange={(e) => handleInputChange('checkOutTime', e.target.value)}
          variant="outlined" 
        />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 3,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            variant="text" 
            startIcon={<ArrowLeft size={20} />}
            onClick={handleBack}
            sx={{ color: 'text.secondary' }}
          >
            Listings
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {formData.propertyName}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<Globe size={16} />}
            onClick={handleTranslationsOpen}
          >
            Translations
          </Button>
          <IconButton size="small">
            <ChevronLeft size={20} />
          </IconButton>
          <IconButton size="small">
            <ChevronRight size={20} />
          </IconButton>
          <Button 
            variant="contained" 
            startIcon={<Save size={16} />}
            onClick={handleSave}
            sx={{ bgcolor: 'primary.main' }}
          >
            Save
          </Button>
          <IconButton size="small">
            <Calendar size={20} />
          </IconButton>
        </Box>
      </Box>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, bgcolor: 'background.paper' }}>
        <Tabs 
          value={currentTab} 
          onChange={(e, newValue) => setCurrentTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Basic info" value="basic-info" />
          <Tab label="Address" value="address" />
          <Tab label="Media" value="media" />
          <Tab label="Amenities" value="amenities" />
          <Tab label="Price & fees" value="pricing" />
          <Tab label="Additional info & Policies" value="policies" />
          <Tab label="Booking settings" value="booking" />
          <Tab label="Channel specific" value="channels" />
          <Tab label="Owner, Contact and Inv..." value="owner" />
          <Tab label="Attachment" value="attachment" />
          <Tab label="Custom fields" value="custom-fields" />
          <Tab label="Bed types" value="bed-types" />
          <Tab label="License info" value="license" />
          <Tab label="Financial settings" value="financial" />
          <Tab label="Linked Listings" value="linked" />
          <Tab label="Payment accounts" value="payments" />
          <Tab label="Guest portal" value="guest-portal" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto', bgcolor: 'background.default' }}>
        {currentTab === 'basic-info' && renderBasicInfoTab()}
        {currentTab === 'address' && renderAddressTab()}
        {currentTab === 'amenities' && renderAmenitiesTab()}
        {currentTab === 'pricing' && renderPricingTab()}
        {currentTab === 'booking' && renderBookingTab()}
        
        {!['basic-info', 'address', 'amenities', 'pricing', 'booking'].includes(currentTab) && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              {currentTab.charAt(0).toUpperCase() + currentTab.slice(1).replace(/-/g, ' ')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Content for {currentTab} tab will be implemented here.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Translations Sidebar */}
      <Drawer
        anchor="right"
        open={translationsOpen}
        onClose={handleTranslationsClose}
        PaperProps={{
          sx: { width: 400 }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Translations</Typography>
            <IconButton onClick={handleTranslationsClose}>
              <X size={20} />
            </IconButton>
          </Box>
          
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value="en"
              label="Language"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="de">German</MenuItem>
              <MenuItem value="it">Italian</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Property Name"
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              size="small"
            />
          </Box>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="outlined" fullWidth onClick={handleTranslationsClose}>
              Cancel
            </Button>
            <Button variant="contained" fullWidth>
              Save Translation
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
