import React, { useState } from 'react';
import { 
  Eye, 
  Star, 
  Plus, 
  Send, 
  Copy, 
  Clock, 
  Search, 
  Filter, 
  Archive, 
  Calendar, 
  Paperclip,
  ChevronDown,
  MoreVertical
} from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    origin: 'Airbnb',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    lastMessage: 'Thank you for the wonderful stay! The apartment was perfect.',
    timestamp: '2 min ago',
    unread: true,
    status: 'active'
  },
  {
    id: 2,
    name: 'Mike Chen',
    origin: 'Booking.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    lastMessage: 'Is there parking available at the property?',
    timestamp: '1 hour ago',
    unread: false,
    status: 'active'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    origin: 'VRBO',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    lastMessage: 'Can we check in early tomorrow?',
    timestamp: '3 hours ago',
    unread: true,
    status: 'snoozed'
  },
  {
    id: 4,
    name: 'David Brown',
    origin: 'Direct',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    lastMessage: 'The WiFi password is not working',
    timestamp: '1 day ago',
    unread: false,
    status: 'archived'
  }
];

const mockMessages = [
  {
    id: 1,
    sender: 'guest',
    message: 'Hi! I\'m checking in tomorrow. What time can I arrive?',
    timestamp: '10:30 AM',
    isRead: true
  },
  {
    id: 2,
    sender: 'host',
    message: 'Hello! Check-in is at 3 PM, but you can arrive as early as 2 PM if the property is ready.',
    timestamp: '10:32 AM',
    isRead: true
  },
  {
    id: 3,
    sender: 'guest',
    message: 'Perfect! And is there parking available?',
    timestamp: '10:35 AM',
    isRead: true
  },
  {
    id: 4,
    sender: 'host',
    message: 'Yes, there\'s a dedicated parking spot right in front of the building. I\'ll send you the details.',
    timestamp: '10:37 AM',
    isRead: false
  }
];

export function InboxView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [bulkUpdateOpen, setBulkUpdateOpen] = useState(false);
  const [conversationFilter, setConversationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'inbox') {
      router.push(`/inbox/${newValue}`);
    }
  };

  const handleConversationSelect = (conversation: any) => {
    setSelectedConversation(conversation);
  };

  const filteredConversations = mockConversations.filter(conv => {
    if (conversationFilter === 'all') return conv.status === 'active';
    if (conversationFilter === 'archived') return conv.status === 'archived';
    if (conversationFilter === 'snoozed') return conv.status === 'snoozed';
    return true;
  }).filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Guest Messaging
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setBulkUpdateOpen(true)}
            startIcon={<MoreVertical size={16} />}
          >
            Bulk Update
          </Button>
        </Box>

        {/* Tabs */}
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Inbox" value="inbox" />
          <Tab label="Message Templates" value="message-templates" />
          <Tab label="Automations" value="automations" />
          <Tab label="Manage Messages" value="manage-messages" />
        </Tabs>
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<Filter size={16} />}
          sx={{ minWidth: 100 }}
        >
          Filters
        </Button>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant={conversationFilter === 'all' ? 'contained' : 'outlined'}
            onClick={() => setConversationFilter('all')}
            size="small"
          >
            All Conversations
          </Button>
          <Button
            variant={conversationFilter === 'archived' ? 'contained' : 'outlined'}
            onClick={() => setConversationFilter('archived')}
            size="small"
          >
            Archived
          </Button>
          <Button
            variant={conversationFilter === 'snoozed' ? 'contained' : 'outlined'}
            onClick={() => setConversationFilter('snoozed')}
            size="small"
          >
            Snoozed
          </Button>
        </Box>

        <TextField
          placeholder="Search guest..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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

      <Box sx={{ display: 'flex', height: 'calc(100vh - 300px)', gap: 2 }}>
        {/* Left Sidebar - Conversations */}
        <Card sx={{ width: 350, flexShrink: 0 }}>
          <CardContent sx={{ p: 0, height: '100%' }}>
            <List sx={{ height: '100%', overflow: 'auto' }}>
              {filteredConversations.map((conversation) => (
                <ListItem
                  key={conversation.id}
                  onClick={() => handleConversationSelect(conversation)}
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    backgroundColor: selectedConversation?.id === conversation.id ? 'primary.50' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={conversation.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: conversation.unread ? 600 : 400 }}>
                          {conversation.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {conversation.timestamp}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Chip 
                            label={conversation.origin} 
                            size="small" 
                            color="primary" 
                            sx={{ height: 20, fontSize: '0.7rem' }}
                          />
                          {conversation.unread && (
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: 'primary.main',
                              }}
                            />
                          )}
                        </Box>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: conversation.unread ? 500 : 400
                          }}
                        >
                          {conversation.lastMessage}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Right Side - Chat Interface */}
        <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={selectedConversation.avatar} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {selectedConversation.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedConversation.origin}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<Eye size={16} />}>
                      Mark as Unread
                    </Button>
                    <Button size="small" startIcon={<Plus size={16} />}>
                      Add Notes
                    </Button>
                    <Button size="small" startIcon={<Star size={16} />}>
                      Star Guest
                    </Button>
                    <Button size="small" startIcon={<MoreVertical size={16} />}>
                      Assign
                    </Button>
                    <Button size="small" startIcon={<Archive size={16} />}>
                      Archive
                    </Button>
                    <Button size="small" startIcon={<Clock size={16} />}>
                      Snooze
                    </Button>
                    <Button size="small" startIcon={<Eye size={16} />}>
                      Hide Details
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
                {mockMessages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.sender === 'host' ? 'flex-end' : 'flex-start',
                      mb: 2
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '70%',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: message.sender === 'host' ? 'primary.main' : 'grey.100',
                        color: message.sender === 'host' ? 'white' : 'text.primary'
                      }}
                    >
                      <Typography variant="body2">{message.message}</Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          opacity: 0.7, 
                          display: 'block', 
                          mt: 1,
                          textAlign: 'right'
                        }}
                      >
                        {message.timestamp}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button size="small" startIcon={<Paperclip size={16} />}>
                    File
                  </Button>
                  <Button size="small" startIcon={<Calendar size={16} />}>
                    Schedule
                  </Button>
                  <Button size="small" startIcon={<Send size={16} />}>
                    AI Reply
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    multiline
                    maxRows={3}
                    size="small"
                  />
                  <Button variant="contained" startIcon={<Send size={16} />}>
                    Send
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              flexDirection: 'column',
              gap: 2
            }}>
              <Typography variant="h6" color="text.secondary">
                Select a conversation to start messaging
              </Typography>
            </Box>
          )}
        </Card>

        {/* Right Sidebar - Details */}
        {selectedConversation && (
          <Card sx={{ width: 300, flexShrink: 0 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Details
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Reservations
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip label="Active" color="success" size="small" />
                  <Typography variant="body2">#12345</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Dec 15 - Dec 20, 2024
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Airbnb Share
                </Typography>
                <Button size="small" fullWidth variant="outlined">
                  View Listing
                </Button>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Calendar
                </Typography>
                <Button size="small" fullWidth variant="outlined" startIcon={<Calendar size={16} />}>
                  Open Calendar
                </Button>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Guest Portal
                </Typography>
                <Button size="small" fullWidth variant="outlined" startIcon={<Copy size={16} />}>
                  Copy URL
                </Button>
              </Box>

              <Box>
                <Button size="small" fullWidth variant="text" endIcon={<ChevronDown size={16} />}>
                  Show More
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Bulk Update Modal */}
      <Dialog open={bulkUpdateOpen} onClose={() => setBulkUpdateOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Bulk Update</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              select
              label="Mark message thread as"
              fullWidth
              SelectProps={{
                native: true,
              }}
            >
              <option value="read">Read</option>
              <option value="archived">Archived</option>
            </TextField>
            <TextField
              label="If the last activity happens on or before"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBulkUpdateOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setBulkUpdateOpen(false)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
