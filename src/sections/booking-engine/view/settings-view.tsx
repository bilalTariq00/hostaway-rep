import React, { useState } from 'react';
import { Code, Globe, Search, BarChart, Languages, Settings as SettingsIcon } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

const amenities = [
  'Beach Front',
  'Swimming Pool',
  'WiFi',
  'Parking',
  'Kitchen',
  'Air Conditioning',
  'Pet Friendly',
  'Garden',
  'Balcony',
  'Fireplace',
];

export function SettingsView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('settings');
  const [settingsTab, setSettingsTab] = useState('basic');
  const [languageSettingsOpen, setLanguageSettingsOpen] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['Beach Front', 'WiFi']);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'settings') {
      router.push(`/booking-engine/${newValue}`);
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Booking Engine
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Your Webpage is published on Domusferiae.holdayfuture.com
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value="1" displayEmpty>
              <MenuItem value="1">Version 1</MenuItem>
              <MenuItem value="2">Version 2</MenuItem>
              <MenuItem value="3">Version 3</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Tabs */}
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Design" value="design" />
          <Tab label="Listings" value="listings" />
          <Tab label="Pages" value="pages" />
          <Tab label="Settings" value="settings" />
          <Tab label="Translation" value="translations" />
        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Side - Settings Tabs */}
        <Box sx={{ flex: 1, maxWidth: 300 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Settings
              </Typography>
              <Tabs
                orientation="vertical"
                value={settingsTab}
                onChange={(e, newValue) => setSettingsTab(newValue)}
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                <Tab
                  label="Basic"
                  value="basic"
                  icon={<SettingsIcon size={16} />}
                  iconPosition="start"
                />
                <Tab
                  label="Advanced"
                  value="advanced"
                  icon={<Code size={16} />}
                  iconPosition="start"
                />
              </Tabs>
            </CardContent>
          </Card>
        </Box>

        {/* Right Side - Settings Content */}
        <Box sx={{ flex: 1 }}>
          {settingsTab === 'basic' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Website Name */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Website Name (SEO meta title)
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter website name"
                    defaultValue="Domusferiae Holiday Rentals"
                  />
                </CardContent>
              </Card>

              {/* Favicon & Logo */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Branding
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="outlined" startIcon={<Globe size={16} />}>
                      Upload Favicon
                    </Button>
                    <Button variant="outlined" startIcon={<Globe size={16} />}>
                      Upload Booking Engine Logo
                    </Button>
                    <TextField
                      fullWidth
                      label="Logo URL"
                      placeholder="https://example.com/logo.png"
                    />
                  </Box>
                </CardContent>
              </Card>

              {/* Search Results */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Show in search results
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <FormControlLabel control={<Switch defaultChecked />} label="Listing" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Review" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Exact listing" />
                    <FormControlLabel control={<Switch />} label="More options" />
                  </Box>
                </CardContent>
              </Card>

              {/* Language Settings */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Language Settings
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Languages size={16} />}
                    onClick={() => setLanguageSettingsOpen(true)}
                  >
                    Open Language Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Reservation Settings */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Reservation Settings
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <FormControlLabel control={<Switch defaultChecked />} label="Allow Inquire" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Instant Booking" />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Require ID Verification"
                    />
                    <FormControlLabel control={<Switch />} label="Require Phone Verification" />
                  </Box>
                </CardContent>
              </Card>

              {/* Amenities Order */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Amenities Order
                  </Typography>
                  <List>
                    {amenities.map((amenity) => (
                      <ListItem key={amenity} disablePadding>
                        <ListItemButton
                          onClick={() => handleAmenityToggle(amenity)}
                          sx={{ borderRadius: 1, mb: 0.5 }}
                        >
                          <ListItemText primary={amenity} />
                          <Switch checked={selectedAmenities.includes(amenity)} size="small" />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>
          )}

          {settingsTab === 'advanced' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Domain Settings */}
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Globe size={20} />
                    Choose Domain Name
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Configure your custom domain, subdomain, and SSL settings
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField fullWidth label="Custom Domain" placeholder="yourdomain.com" />
                    <TextField fullWidth label="Subdomain" placeholder="booking.yourdomain.com" />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable SSL Certificate"
                    />
                  </Box>
                </CardContent>
              </Card>

              {/* Scripts */}
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Code size={20} />
                    Scripts
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Add custom scripts for header, top banner, body, search bar, and calendar widget
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Header Scripts"
                      placeholder="<!-- Google Analytics -->"
                    />
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Body Scripts"
                      placeholder="<!-- Custom tracking code -->"
                    />
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Search Bar Scripts"
                      placeholder="<!-- Search widget scripts -->"
                    />
                  </Box>
                </CardContent>
              </Card>

              {/* Analytics */}
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <BarChart size={20} />
                    Analytics
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField fullWidth label="Google Analytics ID" placeholder="GA-XXXXXXXXX" />
                    <TextField fullWidth label="Facebook Pixel ID" placeholder="1234567890" />
                    <TextField
                      fullWidth
                      label="Custom Analytics Code"
                      multiline
                      rows={3}
                      placeholder="<!-- Custom analytics -->"
                    />
                  </Box>
                </CardContent>
              </Card>

              {/* SEO */}
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Search size={20} />
                    SEO
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Meta Description"
                      multiline
                      rows={2}
                      placeholder="Describe your website for search engines"
                    />
                    <TextField
                      fullWidth
                      label="Keywords"
                      placeholder="holiday rentals, vacation homes, beach houses"
                    />
                    <TextField
                      fullWidth
                      label="Sitemap URL"
                      placeholder="https://yourdomain.com/sitemap.xml"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Box>

      {/* Language Settings Drawer */}
      <Drawer
        anchor="right"
        open={languageSettingsOpen}
        onClose={() => setLanguageSettingsOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 400,
            p: 3,
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Language Settings
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Default Language</InputLabel>
            <Select value="en" label="Default Language">
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="de">German</MenuItem>
              <MenuItem value="it">Italian</MenuItem>
            </Select>
          </FormControl>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Available Languages
          </Typography>

          {['English', 'Spanish', 'French', 'German', 'Italian'].map((language) => (
            <Box
              key={language}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="body2">{language}</Typography>
              <Switch defaultChecked={language === 'English'} />
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={() => setLanguageSettingsOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained">Save Changes</Button>
        </Box>
      </Drawer>
    </DashboardContent>
  );
}
