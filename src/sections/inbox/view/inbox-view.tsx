import React, { useState } from 'react';
import {
  X,
  Clock,
  Filter,
  Search,
  Archive,
  Calendar,
  ChevronDown,
  ExternalLink,
  MoreVertical,
  MessageSquare,
} from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { RealmChat } from 'src/components/chat';
import { ResponseRateDisplay } from 'src/components/response-rate';

// This data is now handled by the useMessages hook

export function InboxView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [selectedConversationId, setSelectedConversationId] = useState<string>('4'); // Start with Yury Burman
  const [bulkUpdateOpen, setBulkUpdateOpen] = useState(false);
  const [conversationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHelpWidget, setShowHelpWidget] = useState(true);
  // newMessage state is now handled by the ChatInput component

  // Header button states (kept for future use)
  const [isStarred, setIsStarred] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [isSnoozed, setIsSnoozed] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showSnoozeDialog, setShowSnoozeDialog] = useState(false);
  const [notesText, setNotesText] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [snoozeDate, setSnoozeDate] = useState('');
  const [snoozeTime, setSnoozeTime] = useState('');

// Chat functionality is now handled by RealmChat component
  
  // Mock conversations data for the sidebar (you can replace this with real data)
  const [conversations, setConversations] = useState([
    {
      id: '1',
      name: 'Polina',
      origin: 'Airbnb',
      avatar: 'P',
      lastMessage: 'Hi! Can I check in at 2 PM instead of 3 PM?',
      timestamp: '19:36',
      unread: true,
      status: 'active',
      bookingDates: '27 Oct 25 → 01 Nov 25',
      propertyName: 'Elegant 2BR Apt | Balcony, AC, Near',
      statusIcon: 'hourglass',
      initialMessages: [
        {
          id: 'msg-1-1',
          senderId: '1',
          message: 'Hi! Can I check in at 2 PM instead of 3 PM?',
          sentAt: Date.now() - 3600000, // 1 hour ago
          isOwn: false,
        },
      ],
    },
    {
      id: '2',
      name: 'Alexandra Kirkland',
      origin: 'Airbnb',
      avatar: 'A',
      lastMessage: 'You: Perfect! The WiFi password is on the fridge',
      timestamp: '19:22',
      unread: false,
      status: 'active',
      bookingDates: '15 Nov 25 → 20 Nov 25',
      propertyName: 'Modern Studio in City Center',
      statusIcon: 'read',
      initialMessages: [
        {
          id: 'msg-2-1',
          senderId: '2',
          message: 'Thank you for the wonderful stay! The apartment was perfect.',
          sentAt: Date.now() - 7200000, // 2 hours ago
          isOwn: false,
        },
        {
          id: 'msg-2-2',
          senderId: 'host',
          message: 'Perfect! The WiFi password is on the fridge',
          sentAt: Date.now() - 3600000, // 1 hour ago
          isOwn: true,
        },
      ],
    },
    {
      id: '3',
      name: 'Monica Dovarch',
      origin: 'Booking.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Thanks! Is there a coffee machine?',
      timestamp: '18:45',
      unread: true,
      status: 'active',
      bookingDates: '05 Dec 25 → 10 Dec 25',
      propertyName: 'Luxury Penthouse with View',
      statusIcon: 'unread',
      initialMessages: [
        {
          id: 'msg-3-1',
          senderId: '3',
          message: 'Is there parking available at the property?',
          sentAt: Date.now() - 10800000, // 3 hours ago
          isOwn: false,
        },
        {
          id: 'msg-3-2',
          senderId: 'host',
          message: 'Yes, there is free parking in the garage.',
          sentAt: Date.now() - 9000000, // 2.5 hours ago
          isOwn: true,
        },
        {
          id: 'msg-3-3',
          senderId: '3',
          message: 'Thanks! Is there a coffee machine?',
          sentAt: Date.now() - 7200000, // 2 hours ago
          isOwn: false,
        },
      ],
    },
    {
      id: '4',
      name: 'Yury Burman',
      origin: 'Airbnb',
      avatar: 'Y',
      lastMessage: 'jgjkg',
      timestamp: '17:30',
      unread: false,
      status: 'active',
      bookingDates: '22 Dec 25 → 28 Dec 25',
      propertyName: 'Cozy Apartment Near Metro',
      statusIcon: 'read',
      initialMessages: [
        {
          id: 'msg-4-1',
          senderId: '4',
          message: 'Can we check in early tomorrow? We arrive at 10 AM.',
          sentAt: Date.now() - 14400000, // 4 hours ago
          isOwn: false,
        },
        {
          id: 'msg-4-2',
          senderId: 'host',
          message: 'Yes, early check-in is available. I\'ll send you the key code.',
          sentAt: Date.now() - 12600000, // 3.5 hours ago
          isOwn: true,
        },
        {
          id: 'msg-4-3',
          senderId: '4',
          message: 'jgjkg',
          sentAt: Date.now() - 10800000, // 3 hours ago
          isOwn: false,
        },
      ],
    },
    {
      id: '5',
      name: 'Sarah Johnson',
      origin: 'Airbnb',
      avatar: 'S',
      lastMessage: 'You: The key is under the flower pot',
      timestamp: '16:15',
      unread: false,
      status: 'active',
      bookingDates: '30 Nov 25 → 05 Dec 25',
      propertyName: 'Downtown Loft with City View',
      statusIcon: 'read',
      initialMessages: [
        {
          id: 'msg-5-1',
          senderId: '5',
          message: 'Where can I find the key for check-in?',
          sentAt: Date.now() - 18000000, // 5 hours ago
          isOwn: false,
        },
        {
          id: 'msg-5-2',
          senderId: 'host',
          message: 'The key is under the flower pot',
          sentAt: Date.now() - 16200000, // 4.5 hours ago
          isOwn: true,
        },
      ],
    },
    {
      id: '6',
      name: 'Michael Chen',
      origin: 'Booking.com',
      avatar: 'M',
      lastMessage: 'Is the heating working properly?',
      timestamp: '15:42',
      unread: true,
      status: 'active',
      bookingDates: '12 Dec 25 → 18 Dec 25',
      propertyName: 'Modern 1BR Near University',
      statusIcon: 'unread',
      initialMessages: [
        {
          id: 'msg-6-1',
          senderId: '6',
          message: 'Is the heating working properly?',
          sentAt: Date.now() - 21600000, // 6 hours ago
          isOwn: false,
        },
      ],
    },
    {
      id: '7',
      name: 'Emma Wilson',
      origin: 'Airbnb',
      avatar: 'E',
      lastMessage: 'You: Check-out is at 11 AM. Have a great trip!',
      timestamp: '14:20',
      unread: false,
      status: 'active',
      bookingDates: '08 Nov 25 → 12 Nov 25',
      propertyName: 'Charming Studio in Historic District',
      statusIcon: 'read',
      initialMessages: [
        {
          id: 'msg-7-1',
          senderId: '7',
          message: 'What time is check-out?',
          sentAt: Date.now() - 25200000, // 7 hours ago
          isOwn: false,
        },
        {
          id: 'msg-7-2',
          senderId: 'host',
          message: 'Check-out is at 11 AM. Have a great trip!',
          sentAt: Date.now() - 23400000, // 6.5 hours ago
          isOwn: true,
        },
      ],
    },
    {
      id: '8',
      name: 'David Rodriguez',
      origin: 'Airbnb',
      avatar: 'D',
      lastMessage: 'Can you recommend good restaurants nearby?',
      timestamp: '13:55',
      unread: true,
      status: 'active',
      bookingDates: '25 Dec 25 → 02 Jan 26',
      propertyName: 'Luxury Penthouse with Terrace',
      statusIcon: 'unread',
      initialMessages: [
        {
          id: 'msg-8-1',
          senderId: '8',
          message: 'Can you recommend good restaurants nearby?',
          sentAt: Date.now() - 28800000, // 8 hours ago
          isOwn: false,
        },
      ],
    },
    {
      id: '9',
      name: 'Lisa Thompson',
      origin: 'Airbnb',
      avatar: 'L',
      lastMessage: '', // No messages yet
      timestamp: '12:30',
      unread: false,
      status: 'active',
      bookingDates: '15 Jan 26 → 20 Jan 26',
      propertyName: 'Modern Studio Downtown',
      statusIcon: 'read',
      initialMessages: [], // No initial messages
    },
    {
      id: '10',
      name: 'James Wilson',
      origin: 'Booking.com',
      avatar: 'J',
      lastMessage: '', // No messages yet
      timestamp: '11:15',
      unread: false,
      status: 'active',
      bookingDates: '28 Jan 26 → 02 Feb 26',
      propertyName: 'Cozy Cabin Retreat',
      statusIcon: 'read',
      initialMessages: [], // No initial messages
    },
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'inbox') {
      router.push(`/inbox/${newValue}`);
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    // Messages will be automatically loaded by the useChat hook
  };

  // Function to update the last message in conversation list
  const updateLastMessage = (conversationId: string, message: string, isOwn: boolean) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const displayMessage = isOwn ? `You: ${message}` : message;
        return {
          ...conv,
          lastMessage: displayMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          unread: !isOwn, // Mark as unread if it's not our own message
        };
      }
      return conv;
    }));
  };

  // Message sending is now handled by RealmChat component

  // Key press handling is now managed by the ChatInput component

  // Header button handlers (kept for future use)
  const handleAddNotes = () => {
    setShowNotes(true);
  };

  const handleStarGuest = () => {
    setIsStarred(!isStarred);
    console.log('Starred guest:', !isStarred);
  };

  const handleAssignConversation = () => {
    setShowAssignDialog(true);
  };

  const handleArchive = () => {
    setIsArchived(!isArchived);
    console.log('Archived conversation:', !isArchived);
  };

  const handleSnooze = () => {
    setShowSnoozeDialog(true);
  };

  const handleHideDetails = () => {
    setShowHelpWidget(!showHelpWidget);
  };

  const handleSaveNotes = () => {
    console.log('Notes saved:', notesText);
    setShowNotes(false);
    setNotesText('');
  };

  const handleAssignUser = () => {
    console.log('Assigned to:', assignedUser);
    setShowAssignDialog(false);
    setAssignedUser('');
  };

  const handleSnoozeConversation = () => {
    console.log('Snoozed until:', snoozeDate, snoozeTime);
    setIsSnoozed(true);
    setShowSnoozeDialog(false);
    setSnoozeDate('');
    setSnoozeTime('');
  };

  const filteredConversations = conversations
    .filter((conv) => {
      if (conversationFilter === 'all') return conv.status === 'active';
      if (conversationFilter === 'archived') return conv.status === 'archived';
      if (conversationFilter === 'snoozed') return conv.status === 'snoozed';
      return true;
    })
    .filter((conv) => conv.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const selectedConversation = conversations.find((conv) => conv.id === selectedConversationId);

  return (
    <DashboardContent maxWidth={false} sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, fontSize: '1.5rem' }}>
          Guest Messaging
        </Typography>

        {/* Tabs */}
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ minHeight: 'auto' }}>
          <Tab label="Inbox" value="" sx={{ minHeight: 'auto', py: 1 }} />
          <Tab
            label="Message Templates"
            value="message-templates"
            sx={{ minHeight: 'auto', py: 1 }}
          />
          <Tab label="Automations" value="automations" sx={{ minHeight: 'auto', py: 1 }} />
          <Tab label="Manage Messages" value="manage-messages" sx={{ minHeight: 'auto', py: 1 }} />
        </Tabs>
      </Box>

      <Box
        sx={{
          display: 'flex',
          height: 'calc(100vh - 120px)',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          border: '1px solid #e9ecef',
          borderRadius: 1,
        }}
      >
        {/* Left Sidebar - Conversations */}
        <Box
          sx={{
            width: 380,
            borderRight: '1px solid',
            borderColor: '#e9ecef',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
          }}
        >
          {/* Controls */}
          <Box
            sx={{
              p: 1.5,
              borderBottom: '1px solid',
              borderColor: '#e9ecef',
              backgroundColor: '#f8f9fa',
            }}
          >
            <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
              <IconButton
                sx={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  width: 32,
                  height: 32,
                  '&:hover': {
                    backgroundColor: '#45a049',
                  },
                }}
              >
                <Filter size={14} />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: conversationFilter === 'all' ? '#4caf50' : '#ffffff',
                  color: conversationFilter === 'all' ? 'white' : '#6c757d',
                  border: '1px solid #e9ecef',
                  width: 32,
                  height: 32,
                  '&:hover': {
                    backgroundColor: conversationFilter === 'all' ? '#45a049' : '#f8f9fa',
                    borderColor: '#4caf50',
                  },
                }}
              >
                <MessageSquare size={14} />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: conversationFilter === 'archived' ? '#4caf50' : '#ffffff',
                  color: conversationFilter === 'archived' ? 'white' : '#6c757d',
                  border: '1px solid #e9ecef',
                  width: 32,
                  height: 32,
                  '&:hover': {
                    backgroundColor: conversationFilter === 'archived' ? '#45a049' : '#f8f9fa',
                    borderColor: '#4caf50',
                  },
                }}
              >
                <Archive size={14} />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: conversationFilter === 'snoozed' ? '#4caf50' : '#ffffff',
                  color: conversationFilter === 'snoozed' ? 'white' : '#6c757d',
                  border: '1px solid #e9ecef',
                  width: 32,
                  height: 32,
                  '&:hover': {
                    backgroundColor: conversationFilter === 'snoozed' ? '#45a049' : '#f8f9fa',
                    borderColor: '#4caf50',
                  },
                }}
              >
                <Clock size={14} />
              </IconButton>
            </Box>
            <TextField
              placeholder="Search guests..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  borderRadius: 2,
                  border: '1px solid #e9ecef',
                  fontSize: '14px',
                  height: '36px',
                  '&:hover': {
                    borderColor: '#4caf50',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                    borderColor: '#4caf50',
                    boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.1)',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} color="#6c757d" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Conversation List */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {filteredConversations.map((conversation) => (
                <Box
                  key={conversation.id}
                  onClick={() => handleConversationSelect(conversation.id)}
                  sx={{
                    p: 1.5,
                    borderBottom: '1px solid',
                    borderColor: '#f5f5f5',
                    cursor: 'pointer',
                    backgroundColor:
                      selectedConversation?.id === conversation.id ? '#f0fdfd' : 'white',
                    borderLeft:
                      selectedConversation?.id === conversation.id
                        ? '3px solid #4caf50'
                        : '3px solid transparent',
                    '&:hover': {
                      backgroundColor:
                        selectedConversation?.id === conversation.id ? '#f0fdfd' : '#f8f9fa',
                    },
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor:
                            conversation.avatar.length === 1 ? '#4caf50' : 'transparent',
                          color: conversation.avatar.length === 1 ? 'white' : 'inherit',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                        }}
                        src={conversation.avatar.length > 1 ? conversation.avatar : undefined}
                      >
                        {conversation.avatar.length === 1 ? conversation.avatar : undefined}
                      </Avatar>
                      {conversation.origin === 'Airbnb' && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -2,
                            right: -2,
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            backgroundColor: '#ff5a5f',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.6rem',
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        >
                          A
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            color:
                              selectedConversation?.id === conversation.id ? '#1976d2' : '#1a1a1a',
                          }}
                        >
                          {conversation.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.75rem',
                            color: '#6c757d',
                          }}
                        >
                          {conversation.timestamp}
                        </Typography>
                      </Box>

                      {conversation.lastMessage && (
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '0.8rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: conversation.unread ? 500 : 400,
                            color: conversation.unread ? '#1a1a1a' : '#6c757d',
                          }}
                        >
                          {conversation.lastMessage}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>

        {/* Center - Chat Interface */}
        <Box
          sx={{
            flex: showHelpWidget ? 1 : 2,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            borderRight: showHelpWidget ? '1px solid' : 'none',
            borderColor: '#f0f0f0',
            position: 'relative',
          }}
        >
          {selectedConversation ? (
            <>
              {/* RealChat Interface */}
              <RealmChat
                conversationId={selectedConversationId}
                currentUserId={`user-${selectedConversationId}`}
                receiverId={selectedConversation?.id || 'guest-1'}
                receiverName={selectedConversation?.name || 'Guest'}
                receiverAvatar={selectedConversation?.avatar || 'G'}
                sx={{ flex: 1 }}
                onToggleSidebar={handleHideDetails}
                isSidebarOpen={showHelpWidget}
                initialMessages={selectedConversation?.initialMessages || []}
                onMessageSent={updateLastMessage}
              />
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Select a conversation to start messaging
              </Typography>
            </Box>
          )}
        </Box>

        {/* Right Sidebar - Reservation Details */}
        {selectedConversation && showHelpWidget && (
          <Box
            sx={{
              width: 320,
              borderLeft: '1px solid',
              borderColor: '#e0e0e0',
              backgroundColor: '#ffffff',
              boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom: '1px solid',
                borderColor: '#e0e0e0',
                backgroundColor: '#f8f9fa',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  Reservation
                </Typography>
                <Chip
                  label="MODIFIED"
                  size="small"
                  color="warning"
                  sx={{ fontSize: '0.7rem', height: 20 }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <IconButton size="small" sx={{ width: 28, height: 28 }}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      backgroundColor: '#ff5a5f',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.5rem',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    A
                  </Box>
                </IconButton>
                <IconButton size="small" sx={{ width: 28, height: 28 }}>
                  <ExternalLink size={14} />
                </IconButton>
                <IconButton size="small" sx={{ width: 28, height: 28 }}>
                  <Calendar size={14} />
                </IconButton>
                <IconButton size="small" sx={{ width: 28, height: 28 }}>
                  <MoreVertical size={14} />
                </IconButton>
                <IconButton size="small" sx={{ width: 28, height: 28 }}>
                  <ChevronDown size={14} />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ p: 2, maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  color: '#1976d2',
                  fontSize: '0.9rem',
                  lineHeight: 1.3,
                }}
              >
                Luxury Stay in Rome - Steps from Metro A Cornelia (372243)
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  fontSize: '0.8rem',
                  lineHeight: 1.4,
                }}
              >
                Via Giuseppe de Camillis, 3
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.5,
                    fontSize: '0.8rem',
                    fontWeight: 500,
                  }}
                >
                  Email:
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    fontSize: '0.8rem',
                  }}
                >
                  Phone: 🇱🇻 +371 29 589 056
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{ width: 6, height: 6, backgroundColor: '#ff5a5f', borderRadius: '50%' }}
                  />
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    Airbnb
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.5,
                    fontSize: '0.8rem',
                    fontWeight: 500,
                  }}
                >
                  Number of nights: 6
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: '0.8rem',
                  }}
                >
                  Number of guests: 3
                </Typography>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.5,
                    fontSize: '0.8rem',
                    fontWeight: 500,
                  }}
                >
                  €639.05 of €639.05
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip
                    label="Paid"
                    size="small"
                    color="success"
                    sx={{ fontSize: '0.7rem', height: 18 }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.5,
                    fontSize: '0.8rem',
                  }}
                >
                  Total price: €639.05
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                  Payout sum: €451.39
                </Typography>
              </Box>

              {/* Response Rate Display */}
              <ResponseRateDisplay 
                conversationId={selectedConversationId} 
                sx={{ mt: 2 }}
              />

              {/* Help Widget */}
              {showHelpWidget && (
                <Box
                  sx={{
                    position: 'relative',
                    backgroundColor: '#f0f0f0',
                    borderRadius: 1.5,
                    p: 1.5,
                    mt: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MessageSquare size={14} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        fontSize: '0.8rem',
                      }}
                    >
                      Hi. Need any help?
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => setShowHelpWidget(false)}
                      sx={{ ml: 'auto', p: 0.5, width: 20, height: 20 }}
                    >
                      <X size={10} />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>

      {/* Floating Action Button */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24 }}>
        <Badge badgeContent={3} color="error">
          <Button
            variant="contained"
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              backgroundColor: '#ff6b35',
              '&:hover': { backgroundColor: '#e55a2b' },
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            <MessageSquare size={24} />
          </Button>
        </Badge>
      </Box>

      {/* Bulk Update Modal */}
      <Dialog
        open={bulkUpdateOpen}
        onClose={() => setBulkUpdateOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Bulk update</DialogTitle>
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
          <Button variant="contained" onClick={() => setBulkUpdateOpen(false)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Notes Modal */}
      <Dialog open={showNotes} onClose={() => setShowNotes(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Notes</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Add notes about this conversation..."
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNotes(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveNotes}>
            Save Notes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign Conversation Modal */}
      <Dialog
        open={showAssignDialog}
        onClose={() => setShowAssignDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Assign Conversation</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Assign to"
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
            sx={{ mt: 2 }}
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Select team member</option>
            <option value="manuel">Manuel Sciarria</option>
            <option value="sarah">Sarah Johnson</option>
            <option value="mike">Mike Wilson</option>
            <option value="lisa">Lisa Brown</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAssignDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAssignUser}>
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snooze Conversation Modal */}
      <Dialog
        open={showSnoozeDialog}
        onClose={() => setShowSnoozeDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Snooze Conversation</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Snooze until date"
              type="date"
              fullWidth
              value={snoozeDate}
              onChange={(e) => setSnoozeDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Time"
              type="time"
              fullWidth
              value={snoozeTime}
              onChange={(e) => setSnoozeTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSnoozeDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSnoozeConversation}>
            Snooze
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
