import React, { useState } from 'react';
import { X, Send, Edit, Pause, Search, MoreVertical } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for managed messages
const mockMessages = [
  {
    id: 1,
    subject: 'Welcome to your stay!',
    status: 'Scheduled',
    listing: 'Beach House Villa',
    schedule: '2024-12-20 10:00 AM',
    trigger: 'Booking Confirmed',
    event: 'Check-in',
    checkIn: '2024-12-20',
    checkOut: '2024-12-25',
    guest: 'Sarah Johnson',
  },
  {
    id: 2,
    subject: 'Check-in instructions',
    status: 'Sent',
    listing: 'Downtown Apartment',
    schedule: '2024-12-19 2:00 PM',
    trigger: '24 Hours Before',
    event: 'Check-in',
    checkIn: '2024-12-20',
    checkOut: '2024-12-22',
    guest: 'Mike Chen',
  },
  {
    id: 3,
    subject: 'House rules reminder',
    status: 'Paused',
    listing: 'Mountain Cabin',
    schedule: '2024-12-18 6:00 PM',
    trigger: 'Check-in Day',
    event: 'General',
    checkIn: '2024-12-19',
    checkOut: '2024-12-23',
    guest: 'Emma Wilson',
  },
  {
    id: 4,
    subject: 'Check-out reminder',
    status: 'Scheduled',
    listing: 'City Center Loft',
    schedule: '2024-12-21 11:00 AM',
    trigger: '1 Day Before',
    event: 'Check-out',
    checkIn: '2024-12-18',
    checkOut: '2024-12-22',
    guest: 'David Brown',
  },
  {
    id: 5,
    subject: 'Review request',
    status: 'Cancelled',
    listing: 'Lakeside Cottage',
    schedule: '2024-12-17 3:00 PM',
    trigger: 'After Check-out',
    event: 'Review',
    checkIn: '2024-12-15',
    checkOut: '2024-12-17',
    guest: 'Lisa Anderson',
  },
];

export function ManageMessagesView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('manage-messages');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'manage-messages') {
      router.push(`/inbox/${newValue}`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'warning';
      case 'Sent':
        return 'success';
      case 'Paused':
        return 'info';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockMessages.length / itemsPerPage);

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

      {/* Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Scheduled by (from)</InputLabel>
              <Select label="Scheduled by (from)">
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Scheduled by (to)</InputLabel>
              <Select label="Scheduled by (to)">
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select label="Status">
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="sent">Sent</MenuItem>
                <MenuItem value="paused">Paused</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>

            <TextField
              placeholder="Search guest..."
              size="small"
              sx={{ minWidth: 200 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Automation</InputLabel>
              <Select label="Automation">
                <MenuItem value="all">All Automations</MenuItem>
                <MenuItem value="welcome">Welcome Messages</MenuItem>
                <MenuItem value="checkin">Check-in</MenuItem>
                <MenuItem value="checkout">Check-out</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Listing</InputLabel>
              <Select label="Listing">
                <MenuItem value="all">All Listings</MenuItem>
                <MenuItem value="beach">Beach House Villa</MenuItem>
                <MenuItem value="downtown">Downtown Apartment</MenuItem>
                <MenuItem value="mountain">Mountain Cabin</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel>Limit</InputLabel>
              <Select label="Limit">
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="50">50</MenuItem>
                <MenuItem value="100">100</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Listing</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Schedule</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Trigger</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Event</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Check-in</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Check-out</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Guest</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockMessages.map((message) => (
                <TableRow
                  key={message.id}
                  hover
                  onMouseEnter={() => setHoveredRow(message.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  sx={{ position: 'relative' }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {message.subject}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={message.status}
                      color={getStatusColor(message.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {message.listing}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {message.schedule}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {message.trigger}
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
                      {message.event}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {message.checkIn}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {message.checkOut}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {message.guest}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {hoveredRow === message.id ? (
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton size="small" color="primary" title="Send">
                          <Send size={16} />
                        </IconButton>
                        <IconButton size="small" color="warning" title="Pause">
                          <Pause size={16} />
                        </IconButton>
                        <IconButton size="small" color="error" title="Cancel">
                          <X size={16} />
                        </IconButton>
                        <IconButton size="small" color="default" title="Edit">
                          <Edit size={16} />
                        </IconButton>
                      </Box>
                    ) : (
                      <IconButton size="small">
                        <MoreVertical size={16} />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </DashboardContent>
  );
}
