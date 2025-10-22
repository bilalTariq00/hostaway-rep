import React, { useState } from 'react';
import {
  Eye,
  Home,
  Info,
  Globe,
  Contact,
  ChevronUp,
  ChevronDown,
  List as ListIcon,
} from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

const pageIcons = {
  home: Home,
  'all-listings': ListIcon,
  about: Info,
  contact: Contact,
};

const mockPages = [
  { id: 'home', name: 'Home', icon: 'home', expanded: true },
  { id: 'all-listings', name: 'All Listings', icon: 'all-listings', expanded: false },
  { id: 'about', name: 'About', icon: 'about', expanded: false },
  { id: 'contact', name: 'Contact', icon: 'contact', expanded: false },
];

const headerMenuItems = [
  { id: 'home', name: 'Home', active: true },
  { id: 'all-listings', name: 'All Listings', active: false },
  { id: 'about', name: 'About', active: false },
  { id: 'contact', name: 'Contact', active: false },
];

const footerMenuItems = [
  { id: 'privacy', name: 'Privacy Policy', active: false },
  { id: 'terms', name: 'Terms of Service', active: false },
  { id: 'cookies', name: 'Cookie Policy', active: false },
  { id: 'help', name: 'Help Center', active: false },
];

export function PagesView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('pages');
  const [pages, setPages] = useState(mockPages);
  const [selectedPage, setSelectedPage] = useState('home');
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [footerExpanded, setFooterExpanded] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'pages') {
      router.push(`/booking-engine/${newValue}`);
    }
  };

  const handlePageToggle = (pageId: string) => {
    setPages((prev) =>
      prev.map((page) => (page.id === pageId ? { ...page, expanded: !page.expanded } : page))
    );
  };

  const handlePageSelect = (pageId: string) => {
    setSelectedPage(pageId);
  };

  const handlePreview = (pageId: string) => {
    window.open(`https://domusferiae.holdayfuture.com/${pageId}`, '_blank');
  };

  const getPageIcon = (iconName: string) => {
    const IconComponent = pageIcons[iconName as keyof typeof pageIcons] || Home;
    return <IconComponent size={20} />;
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
        {/* Left Side - Pages Management */}
        <Box sx={{ flex: 1, maxWidth: 400 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Pages for your website
              </Typography>
              <List>
                {pages.map((page) => (
                  <React.Fragment key={page.id}>
                    <ListItemButton
                      onClick={() => handlePageToggle(page.id)}
                      sx={{ borderRadius: 1, mb: 0.5 }}
                    >
                      <ListItemIcon>{getPageIcon(page.icon)}</ListItemIcon>
                      <ListItemText primary={page.name} />
                      {page.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </ListItemButton>
                    <Collapse in={page.expanded} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton
                          sx={{ pl: 4, py: 0.5 }}
                          onClick={() => handlePageSelect(page.id)}
                        >
                          <ListItemText
                            primary="Edit Page"
                            sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem' } }}
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ pl: 4, py: 0.5 }}
                          onClick={() => handlePreview(page.id)}
                        >
                          <ListItemText
                            primary="Preview Page"
                            sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem' } }}
                          />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Header Menu
              </Typography>
              <List>
                <ListItemButton
                  onClick={() => setHeaderExpanded(!headerExpanded)}
                  sx={{ borderRadius: 1, mb: 0.5 }}
                >
                  <ListItemText primary="Home" />
                  {headerExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </ListItemButton>
                <Collapse in={headerExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {headerMenuItems.map((item) => (
                      <ListItemButton
                        key={item.id}
                        sx={{ pl: 4, py: 0.5 }}
                        onClick={() => handlePageSelect(item.id)}
                      >
                        <ListItemText
                          primary={item.name}
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontSize: '0.875rem',
                              fontWeight: item.active ? 600 : 400,
                              color: item.active ? 'primary.main' : 'text.primary',
                            },
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Footer Menu
              </Typography>
              <List>
                <ListItemButton
                  onClick={() => setFooterExpanded(!footerExpanded)}
                  sx={{ borderRadius: 1, mb: 0.5 }}
                >
                  <ListItemText primary="Pages" />
                  {footerExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </ListItemButton>
                <Collapse in={footerExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {footerMenuItems.map((item) => (
                      <ListItemButton
                        key={item.id}
                        sx={{ pl: 4, py: 0.5 }}
                        onClick={() => handlePageSelect(item.id)}
                      >
                        <ListItemText
                          primary={item.name}
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontSize: '0.875rem',
                              fontWeight: item.active ? 600 : 400,
                              color: item.active ? 'primary.main' : 'text.primary',
                            },
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Right Side - Preview */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ height: 'fit-content', position: 'sticky', top: 20 }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Eye size={20} />
                  {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Page Preview
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Globe size={16} />}
                  onClick={() => handlePreview(selectedPage)}
                >
                  Open in New Tab
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
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                  position: 'relative',
                }}
              >
                {/* Mock Page Preview */}
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
                    {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Page
                  </Typography>

                  {selectedPage === 'home' && (
                    <Box>
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                          Welcome to Domusferiae
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                          Discover your perfect holiday rental
                        </Typography>
                        <Button variant="contained" size="large">
                          Search Properties
                        </Button>
                      </Box>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                        {[1, 2, 3].map((item) => (
                          <Box
                            key={item}
                            sx={{
                              bgcolor: 'white',
                              p: 2,
                              borderRadius: 2,
                              textAlign: 'center',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                          >
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              Property {item}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {selectedPage === 'all-listings' && (
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        All Available Properties
                      </Typography>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                        {[1, 2, 3, 4].map((item) => (
                          <Box
                            key={item}
                            sx={{
                              bgcolor: 'white',
                              p: 2,
                              borderRadius: 2,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                          >
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              Property {item}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Beautiful property description...
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {selectedPage === 'about' && (
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        About Domusferiae
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        We are dedicated to providing exceptional holiday rental experiences...
                      </Typography>
                      <Typography variant="body1">
                        Our mission is to connect travelers with the perfect accommodations...
                      </Typography>
                    </Box>
                  )}

                  {selectedPage === 'contact' && (
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Contact Us
                      </Typography>
                      <Box sx={{ display: 'grid', gap: 2 }}>
                        <TextField label="Name" fullWidth size="small" />
                        <TextField label="Email" fullWidth size="small" />
                        <TextField label="Message" multiline rows={3} fullWidth size="small" />
                        <Button variant="contained">Send Message</Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </DashboardContent>
  );
}
