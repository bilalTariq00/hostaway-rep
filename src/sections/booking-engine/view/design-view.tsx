import React, { useState } from 'react';
import { Eye, Type, Globe, Upload, Palette, Settings as SettingsIcon } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

export function DesignView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('design');
  const [darkenSearch, setDarkenSearch] = useState(false);
  const [roundedElements, setRoundedElements] = useState(true);
  const [shadowButtons, setShadowButtons] = useState(true);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'design') {
      router.push(`/booking-engine/${newValue}`);
    }
  };

  const colorFields = [
    { label: 'Brand Color', key: 'brandColor', value: '#1976d2' },
    { label: 'Middle Color', key: 'middleColor', value: '#42a5f5' },
    { label: 'Dark Color', key: 'darkColor', value: '#1565c0' },
    { label: 'Header Color', key: 'headerColor', value: '#ffffff' },
    { label: 'Header Text Color', key: 'headerTextColor', value: '#000000' },
    { label: 'Footer Color', key: 'footerColor', value: '#f5f5f5' },
    { label: 'Footer Text Color', key: 'footerTextColor', value: '#666666' },
  ];

  const fontOptions = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins',
    'Source Sans Pro',
    'Nunito',
  ];

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
        {/* Left Side - Controls */}
        <Box sx={{ flex: 1, maxWidth: 400 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Upload size={20} />
                Background Image
              </Typography>
              <Button variant="outlined" fullWidth startIcon={<Upload size={16} />}>
                Upload Background Image
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SettingsIcon size={20} />
                Search Bar Settings
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkenSearch}
                    onChange={(e) => setDarkenSearch(e.target.checked)}
                  />
                }
                label="Darken to highlight search bar"
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Palette size={20} />
                Colors
              </Typography>
              {colorFields.map((field) => (
                <Box key={field.key} sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    {field.label}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 1,
                        backgroundColor: field.value,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    />
                    <TextField
                      size="small"
                      value={field.value}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Type size={20} />
                Font Options
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Headings
                </Typography>
                <FormControl fullWidth size="small">
                  <Select value="Inter">
                    {fontOptions.map((font) => (
                      <MenuItem key={font} value={font}>
                        {font}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Text
                </Typography>
                <FormControl fullWidth size="small">
                  <Select value="Inter">
                    {fontOptions.map((font) => (
                      <MenuItem key={font} value={font}>
                        {font}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SettingsIcon size={20} />
                Elements
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={roundedElements}
                    onChange={(e) => setRoundedElements(e.target.checked)}
                  />
                }
                label="Rounded elements"
                sx={{ mb: 1, display: 'block' }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={shadowButtons}
                    onChange={(e) => setShadowButtons(e.target.checked)}
                  />
                }
                label="Shadow behind buttons"
              />
            </CardContent>
          </Card>
        </Box>

        {/* Right Side - Preview */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ height: 'fit-content', position: 'sticky', top: 20 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Eye size={20} />
                  Preview
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Globe size={16} />}
                  onClick={() => window.open('https://domusferiae.holdayfuture.com', '_blank')}
                >
                  View Live
                </Button>
              </Box>
              
              {/* Preview Content */}
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden',
                  minHeight: 500,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  position: 'relative',
                }}
              >
                {/* Mock Website Preview */}
                <Box sx={{ p: 3, color: 'white' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Domusferiae Holiday Rentals
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: darkenSearch ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)',
                      p: 2,
                      borderRadius: roundedElements ? 2 : 0,
                      mb: 3,
                    }}
                  >
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Search for your perfect holiday rental...
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {[1, 2, 3].map((item) => (
                      <Box
                        key={item}
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.1)',
                          p: 2,
                          borderRadius: roundedElements ? 2 : 0,
                          flex: '1 1 200px',
                          minHeight: 100,
                          boxShadow: shadowButtons ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Property {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </DashboardContent>
  );
}
