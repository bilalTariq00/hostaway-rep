import React, { useState } from 'react';
import { Edit, Plus, Trash2, MoreVertical } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for message templates
const mockTemplates = [
  {
    id: 1,
    name: 'Welcome Message',
    group: 'Check-in',
    listings: 5,
    channels: ['Airbnb', 'Booking.com'],
  },
  {
    id: 2,
    name: 'Check-out Instructions',
    group: 'Check-out',
    listings: 3,
    channels: ['Airbnb', 'VRBO'],
  },
  {
    id: 3,
    name: 'House Rules Reminder',
    group: 'General',
    listings: 8,
    channels: ['Airbnb', 'Booking.com', 'VRBO'],
  },
  {
    id: 4,
    name: 'WiFi Information',
    group: 'Check-in',
    listings: 6,
    channels: ['Airbnb', 'Direct'],
  },
];

const mockGroups = [
  { id: 1, name: 'Check-in', count: 3 },
  { id: 2, name: 'Check-out', count: 2 },
  { id: 3, name: 'General', count: 5 },
  { id: 4, name: 'Emergency', count: 1 },
];

export function MessageTemplatesView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('message-templates');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'message-templates') {
      router.push(`/inbox/${newValue}`);
    }
  };

  const handleAddTemplate = () => {
    // Navigate to add template form
    console.log('Navigate to add template form');
  };

  const handleAddGroup = () => {
    // Navigate to add group form
    console.log('Navigate to add group form');
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Guest Messaging
        </Typography>

        {/* Tabs */}
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Inbox" value="inbox" />
          <Tab label="Message Templates" value="message-templates" />
          <Tab label="Automations" value="automations" />
          <Tab label="Manage Messages" value="manage-messages" />
        </Tabs>
      </Box>

      {/* Message Templates Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Message Templates
            </Typography>
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={handleAddTemplate}
            >
              Add New Template
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Group</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Number of Listings</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Channels</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTemplates.map((template) => (
                <TableRow key={template.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {template.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: 'primary.50',
                        color: 'primary.main',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}
                    >
                      {template.group}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {template.listings} listings
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {template.channels.map((channel, index) => (
                        <Box
                          key={index}
                          sx={{
                            px: 1,
                            py: 0.25,
                            borderRadius: 0.5,
                            backgroundColor: 'grey.100',
                            fontSize: '0.7rem',
                            color: 'text.secondary',
                          }}
                        >
                          {channel}
                        </Box>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" color="primary">
                        <Edit size={16} />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Trash2 size={16} />
                      </IconButton>
                      <IconButton size="small">
                        <MoreVertical size={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Message Template Groups Section */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Message Template Groups
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Plus size={16} />}
              onClick={handleAddGroup}
            >
              Add New Group
            </Button>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2 }}>
            {mockGroups.map((group) => (
              <Card key={group.id} variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {group.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {group.count} templates
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton size="small" color="primary">
                      <Edit size={16} />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Trash2 size={16} />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>
    </DashboardContent>
  );
}
