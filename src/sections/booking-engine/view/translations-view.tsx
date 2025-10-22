import React, { useState } from 'react';
import { Globe, FileText, Languages } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
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

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

const pageTranslations = [
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'all-listings', name: 'All Listings', icon: '📋' },
  { id: 'about', name: 'About', icon: 'ℹ️' },
  { id: 'contact', name: 'Contact', icon: '📞' },
  { id: 'privacy', name: 'Privacy Policy', icon: '🔒' },
  { id: 'terms', name: 'Terms of Service', icon: '📄' },
];

const mockTranslations = {
  home: {
    en: {
      title: 'Welcome to Domusferiae',
      subtitle: 'Discover your perfect holiday rental',
      searchPlaceholder: 'Search for your perfect holiday rental...',
      ctaButton: 'Search Properties',
    },
    es: {
      title: 'Bienvenido a Domusferiae',
      subtitle: 'Descubre tu alquiler de vacaciones perfecto',
      searchPlaceholder: 'Busca tu alquiler de vacaciones perfecto...',
      ctaButton: 'Buscar Propiedades',
    },
    fr: {
      title: 'Bienvenue à Domusferiae',
      subtitle: 'Découvrez votre location de vacances parfaite',
      searchPlaceholder: 'Recherchez votre location de vacances parfaite...',
      ctaButton: 'Rechercher des Propriétés',
    },
  },
  'all-listings': {
    en: {
      title: 'All Available Properties',
      subtitle: 'Find your perfect stay',
      filterLabel: 'Filter by',
      sortLabel: 'Sort by',
    },
    es: {
      title: 'Todas las Propiedades Disponibles',
      subtitle: 'Encuentra tu estancia perfecta',
      filterLabel: 'Filtrar por',
      sortLabel: 'Ordenar por',
    },
    fr: {
      title: 'Toutes les Propriétés Disponibles',
      subtitle: 'Trouvez votre séjour parfait',
      filterLabel: 'Filtrer par',
      sortLabel: 'Trier par',
    },
  },
};

export function TranslationsView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('translations');
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [translations, setTranslations] = useState(mockTranslations);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'translations') {
      router.push(`/booking-engine/${newValue}`);
    }
  };

  const handleTranslationChange = (field: string, value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [selectedPage]: {
        ...prev[selectedPage as keyof typeof prev],
        [selectedLanguage]: {
          ...(prev[selectedPage as keyof typeof prev] as any)?.[selectedLanguage],
          [field]: value,
        },
      },
    }));
  };

  const currentTranslations = (translations as any)[selectedPage]?.[selectedLanguage] || {};

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
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
        {/* Left Side - Page Selection */}
        <Box sx={{ flex: 1, maxWidth: 300 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <FileText size={20} />
                Page Content
              </Typography>
              <List>
                {pageTranslations.map((page) => (
                  <ListItem key={page.id} disablePadding>
                    <ListItemButton
                      selected={selectedPage === page.id}
                      onClick={() => setSelectedPage(page.id)}
                      sx={{ borderRadius: 1, mb: 0.5 }}
                    >
                      <Box sx={{ mr: 2, fontSize: 20 }}>{page.icon}</Box>
                      <ListItemText primary={page.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Languages size={20} />
                Language
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Select Language</InputLabel>
                <Select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  label="Select Language"
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Box>

        {/* Right Side - Translation Editor */}
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Globe size={20} />
                  {pageTranslations.find((p) => p.id === selectedPage)?.name} -{' '}
                  {languages.find((l) => l.code === selectedLanguage)?.name}
                </Typography>
                <Button variant="outlined" size="small">
                  Save Changes
                </Button>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Translation Fields */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {selectedPage === 'home' && (
                  <>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Page Title
                      </Typography>
                      <TextField
                        fullWidth
                        value={currentTranslations.title || ''}
                        onChange={(e) => handleTranslationChange('title', e.target.value)}
                        placeholder="Enter page title"
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Subtitle
                      </Typography>
                      <TextField
                        fullWidth
                        value={currentTranslations.subtitle || ''}
                        onChange={(e) => handleTranslationChange('subtitle', e.target.value)}
                        placeholder="Enter subtitle"
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Search Placeholder
                      </Typography>
                      <TextField
                        fullWidth
                        value={currentTranslations.searchPlaceholder || ''}
                        onChange={(e) =>
                          handleTranslationChange('searchPlaceholder', e.target.value)
                        }
                        placeholder="Enter search placeholder text"
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Call to Action Button
                      </Typography>
                      <TextField
                        fullWidth
                        value={currentTranslations.ctaButton || ''}
                        onChange={(e) => handleTranslationChange('ctaButton', e.target.value)}
                        placeholder="Enter button text"
                      />
                    </Box>
                  </>
                )}

                {selectedPage === 'all-listings' && (
                  <>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Page Title
                      </Typography>
                      <TextField
                        fullWidth
                        value={currentTranslations.title || ''}
                        onChange={(e) => handleTranslationChange('title', e.target.value)}
                        placeholder="Enter page title"
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Subtitle
                      </Typography>
                      <TextField
                        fullWidth
                        value={currentTranslations.subtitle || ''}
                        onChange={(e) => handleTranslationChange('subtitle', e.target.value)}
                        placeholder="Enter subtitle"
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Filter Label
                      </Typography>
                      <TextField
                        fullWidth
                        value={currentTranslations.filterLabel || ''}
                        onChange={(e) => handleTranslationChange('filterLabel', e.target.value)}
                        placeholder="Enter filter label"
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Sort Label
                      </Typography>
                      <TextField
                        fullWidth
                        value={currentTranslations.sortLabel || ''}
                        onChange={(e) => handleTranslationChange('sortLabel', e.target.value)}
                        placeholder="Enter sort label"
                      />
                    </Box>
                  </>
                )}

                {/* Generic fields for other pages */}
                {!['home', 'all-listings'].includes(selectedPage) && (
                  <>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Page Title
                      </Typography>
                      <TextField fullWidth placeholder="Enter page title" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Page Content
                      </Typography>
                      <TextField fullWidth multiline rows={4} placeholder="Enter page content" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Meta Description
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Enter meta description"
                      />
                    </Box>
                  </>
                )}
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 4,
                  pt: 3,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Button variant="outlined">Reset to Default</Button>
                <Button variant="contained">Save Translation</Button>
                <Button variant="outlined" startIcon={<Globe size={16} />}>
                  Preview Page
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </DashboardContent>
  );
}
