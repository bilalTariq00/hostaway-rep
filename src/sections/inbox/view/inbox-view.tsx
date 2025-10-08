import React, { useState } from 'react';
import { 
  X, 
  Eye, 
  Edit, 
  Send, 
  Star, 
  User, 
  Clock, 
  Wand2, 
  Filter, 
  Search, 
  Archive, 
  Calendar, 
  Paperclip, 
  ArrowRight, 
  ChevronDown, 
  ExternalLink, 
  MoreVertical, 
  MessageSquare 
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
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { useMessages } from 'src/hooks/use-messages';

import { DashboardContent } from 'src/layouts/dashboard';

// This data is now handled by the useMessages hook

export function InboxView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [selectedConversationId, setSelectedConversationId] = useState<string>('4'); // Start with Yury Burman
  const [bulkUpdateOpen, setBulkUpdateOpen] = useState(false);
  const [conversationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHelpWidget, setShowHelpWidget] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  
  // Header button states
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

  // Use the real-time messaging hook
  const {
    conversations,
    messages,
    isLoading,
    isConnected,
    sendMessage,
    markAsRead
  } = useMessages(selectedConversationId);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    if (newValue !== 'inbox') {
      router.push(`/inbox/${newValue}`);
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    markAsRead(conversationId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversationId) {
      sendMessage(newMessage.trim(), selectedConversationId);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  // Header button handlers
  const handleMarkAsUnread = () => {
    if (selectedConversationId) {
      // In a real app, this would call an API to mark as unread
      console.log('Marking conversation as unread:', selectedConversationId);
      // Update conversation status in the hook
      markAsRead(selectedConversationId); // This would be reversed in real implementation
    }
  };

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

  const filteredConversations = conversations.filter(conv => {
    if (conversationFilter === 'all') return conv.status === 'active';
    if (conversationFilter === 'archived') return conv.status === 'archived';
    if (conversationFilter === 'snoozed') return conv.status === 'snoozed';
    return true;
  }).filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId);

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
          <Tab label="Message Templates" value="message-templates" sx={{ minHeight: 'auto', py: 1 }} />
          <Tab label="Automations" value="automations" sx={{ minHeight: 'auto', py: 1 }} />
          <Tab label="Manage Messages" value="manage-messages" sx={{ minHeight: 'auto', py: 1 }} />
        </Tabs>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        height: 'calc(100vh - 120px)',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        border: '1px solid #e9ecef',
        borderRadius: 1
      }}>
        {/* Left Sidebar - Conversations */}
        <Box sx={{ 
          width: 380, 
          borderRight: '1px solid', 
          borderColor: '#e9ecef', 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: '#ffffff'
        }}>
          {/* Controls */}
          <Box sx={{ 
            p: 1.5, 
            borderBottom: '1px solid', 
            borderColor: '#e9ecef',
            backgroundColor: '#f8f9fa'
          }}>
            <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
              <IconButton sx={{ 
                backgroundColor: '#4caf50', 
                color: 'white', 
                width: 32,
                height: 32,
                '&:hover': { 
                  backgroundColor: '#45a049'
                }
              }}>
                <Filter size={14} />
              </IconButton>
              <IconButton sx={{ 
                backgroundColor: conversationFilter === 'all' ? '#4caf50' : '#ffffff', 
                color: conversationFilter === 'all' ? 'white' : '#6c757d',
                border: '1px solid #e9ecef',
                width: 32,
                height: 32,
                '&:hover': { 
                  backgroundColor: conversationFilter === 'all' ? '#45a049' : '#f8f9fa',
                  borderColor: '#4caf50'
                }
              }}>
                <MessageSquare size={14} />
              </IconButton>
              <IconButton sx={{ 
                backgroundColor: conversationFilter === 'archived' ? '#4caf50' : '#ffffff', 
                color: conversationFilter === 'archived' ? 'white' : '#6c757d',
                border: '1px solid #e9ecef',
                width: 32,
                height: 32,
                '&:hover': { 
                  backgroundColor: conversationFilter === 'archived' ? '#45a049' : '#f8f9fa',
                  borderColor: '#4caf50'
                }
              }}>
                <Archive size={14} />
              </IconButton>
              <IconButton sx={{ 
                backgroundColor: conversationFilter === 'snoozed' ? '#4caf50' : '#ffffff', 
                color: conversationFilter === 'snoozed' ? 'white' : '#6c757d',
                border: '1px solid #e9ecef',
                width: 32,
                height: 32,
                '&:hover': { 
                  backgroundColor: conversationFilter === 'snoozed' ? '#45a049' : '#f8f9fa',
                  borderColor: '#4caf50'
                }
              }}>
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
                    borderColor: '#4caf50'
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                    borderColor: '#4caf50',
                    boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.1)'
                  }
                }
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
            {isLoading ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Loading conversations...
                </Typography>
              </Box>
            ) : (
              filteredConversations.map((conversation) => (
                <Box
                  key={conversation.id}
                  onClick={() => handleConversationSelect(conversation.id)}
                  sx={{
                    p: 1.5,
                    borderBottom: '1px solid',
                    borderColor: '#f5f5f5',
                    cursor: 'pointer',
                    backgroundColor: selectedConversation?.id === conversation.id ? '#f0fdfd' : 'white',
                    borderLeft: selectedConversation?.id === conversation.id ? '3px solid #4caf50' : '3px solid transparent',
                    '&:hover': {
                      backgroundColor: selectedConversation?.id === conversation.id ? '#f0fdfd' : '#f8f9fa'
                    },
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        backgroundColor: conversation.avatar.length === 1 ? '#4caf50' : 'transparent',
                        color: conversation.avatar.length === 1 ? 'white' : 'inherit',
                        fontSize: '0.9rem',
                        fontWeight: 600
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
                          fontWeight: 'bold'
                        }}
                      >
                        A
                      </Box>
                    )}
                  </Box>
                  
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ 
                        fontWeight: 600, 
                        fontSize: '0.9rem',
                        color: selectedConversation?.id === conversation.id ? '#1976d2' : '#1a1a1a'
                      }}>
                        {conversation.name}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        fontSize: '0.75rem',
                        color: '#6c757d'
                      }}>
                        {conversation.timestamp}
                      </Typography>
                    </Box>
                    
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: '0.8rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontWeight: conversation.unread ? 500 : 400,
                        color: conversation.unread ? '#1a1a1a' : '#6c757d'
                      }}
                    >
                      {conversation.lastMessage}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              ))
            )}
          </Box>
        </Box>

        {/* Center - Chat Interface */}
        <Box sx={{ 
          flex: showHelpWidget ? 1 : 2, 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          borderRight: showHelpWidget ? '1px solid' : 'none',
          borderColor: '#f0f0f0',
          position: 'relative'
        }}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <Box sx={{ 
                p: 1.5, 
                borderBottom: '1px solid', 
                borderColor: '#f0f0f0',
                backgroundColor: '#fafbfc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                minHeight: showHelpWidget ? '60px' : '80px'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: showHelpWidget ? 40 : 48, 
                        height: showHelpWidget ? 40 : 48, 
                        backgroundColor: selectedConversation.avatar.length === 1 ? '#4caf50' : 'transparent',
                        color: selectedConversation.avatar.length === 1 ? 'white' : 'inherit',
                        fontSize: showHelpWidget ? '1rem' : '1.2rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                      }}
                      src={selectedConversation.avatar.length > 1 ? selectedConversation.avatar : undefined}
                    >
                      {selectedConversation.avatar.length === 1 ? selectedConversation.avatar : undefined}
                    </Avatar>
                    <Box>
                      <Typography variant={showHelpWidget ? "h6" : "h5"} sx={{ 
                        fontWeight: 600, 
                        color: '#1a1a1a',
                        mb: showHelpWidget ? 0 : 0.5,
                        fontSize: showHelpWidget ? '1.1rem' : '1.25rem'
                      }}>
                        {selectedConversation.name}
                      </Typography>
                      {!showHelpWidget && (
                        <Typography variant="body2" sx={{ 
                          color: '#6c757d',
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}>
                          {selectedConversation.bookingDates} • {selectedConversation.propertyName}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'nowrap' }}>
                    <Tooltip title="Mark as unread">
                      <IconButton 
                        size="small" 
                        onClick={handleMarkAsUnread}
                        sx={{
                          backgroundColor: '#f8f9fa',
                          color: '#6c757d',
                          width: showHelpWidget ? 32 : 36,
                          height: showHelpWidget ? 32 : 36,
                          borderRadius: 1.5,
                          '&:hover': { 
                            backgroundColor: '#e9ecef',
                            color: '#4caf50',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Eye size={showHelpWidget ? 14 : 16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add notes">
                      <IconButton 
                        size="small" 
                        onClick={handleAddNotes}
                        sx={{
                          backgroundColor: '#f8f9fa',
                          color: '#6c757d',
                          width: showHelpWidget ? 32 : 36,
                          height: showHelpWidget ? 32 : 36,
                          borderRadius: 1.5,
                          '&:hover': { 
                            backgroundColor: '#e9ecef',
                            color: '#4caf50',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Edit size={showHelpWidget ? 14 : 16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={isStarred ? "Unstar guest" : "Star guest"}>
                      <IconButton 
                        size="small" 
                        onClick={handleStarGuest}
                        sx={{ 
                          color: isStarred ? '#ff9800' : '#6c757d',
                          backgroundColor: isStarred ? '#fff3e0' : '#f8f9fa',
                          width: showHelpWidget ? 32 : 36,
                          height: showHelpWidget ? 32 : 36,
                          borderRadius: 1.5,
                          '&:hover': { 
                            backgroundColor: isStarred ? '#ffe0b2' : '#e9ecef',
                            color: isStarred ? '#ff9800' : '#4caf50'
                          }
                        }}
                      >
                        <Star size={showHelpWidget ? 12 : 14} fill={isStarred ? '#ff9800' : 'none'} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Assign conversation">
                      <IconButton 
                        size="small" 
                        onClick={handleAssignConversation}
                        sx={{
                          backgroundColor: '#f8f9fa',
                          color: '#6c757d',
                          width: showHelpWidget ? 32 : 36,
                          height: showHelpWidget ? 32 : 36,
                          borderRadius: 1.5,
                          '&:hover': { 
                            backgroundColor: '#e9ecef',
                            color: '#4caf50'
                          }
                        }}
                      >
                        <User size={showHelpWidget ? 12 : 14} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={isArchived ? "Unarchive" : "Archive"}>
                      <IconButton 
                        size="small" 
                        onClick={handleArchive}
                        sx={{ 
                          color: isArchived ? '#f44336' : '#6c757d',
                          backgroundColor: isArchived ? '#ffebee' : '#f8f9fa',
                          width: showHelpWidget ? 32 : 36,
                          height: showHelpWidget ? 32 : 36,
                          borderRadius: 1.5,
                          '&:hover': { 
                            backgroundColor: isArchived ? '#ffcdd2' : '#e9ecef',
                            color: isArchived ? '#f44336' : '#4caf50'
                          }
                        }}
                      >
                        <Archive size={showHelpWidget ? 12 : 14} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={isSnoozed ? "Unsnooze" : "Snooze"}>
                      <IconButton 
                        size="small" 
                        onClick={handleSnooze}
                        sx={{ 
                          color: isSnoozed ? '#ff9800' : '#6c757d',
                          backgroundColor: isSnoozed ? '#fff3e0' : '#f8f9fa',
                          width: showHelpWidget ? 32 : 36,
                          height: showHelpWidget ? 32 : 36,
                          borderRadius: 1.5,
                          '&:hover': { 
                            backgroundColor: isSnoozed ? '#ffe0b2' : '#e9ecef',
                            color: isSnoozed ? '#ff9800' : '#4caf50'
                          }
                        }}
                      >
                        <Clock size={showHelpWidget ? 12 : 14} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={showHelpWidget ? "Show details" : "Hide details"}>
                      <IconButton 
                        size="small" 
                        onClick={handleHideDetails}
                        sx={{
                          backgroundColor: '#f8f9fa',
                          color: '#6c757d',
                          width: showHelpWidget ? 32 : 36,
                          height: showHelpWidget ? 32 : 36,
                          borderRadius: 1.5,
                          '&:hover': { 
                            backgroundColor: '#e9ecef',
                            color: '#4caf50'
                          }
                        }}
                      >
                        <ArrowRight size={showHelpWidget ? 12 : 14} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>

              {/* Messages */}
              <Box sx={{ 
                flex: 1, 
                p: 2, 
                overflow: 'auto', 
                backgroundColor: '#f8f9fa',
                minHeight: 0,
                maxHeight: 'calc(100vh - 280px)'
              }}>
                {isLoading ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      Loading messages...
                    </Typography>
                  </Box>
                ) : messages.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No messages yet. Start the conversation!
                    </Typography>
                  </Box>
                ) : (
                  messages.map((message) => (
                    <Box 
                      key={message.id} 
                      sx={{ 
                        mb: 3,
                        display: 'flex',
                        justifyContent: message.senderType === 'host' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <Box sx={{ maxWidth: '70%' }}>
                        <Box
                          sx={{
                            backgroundColor: message.senderType === 'host' ? '#1976d2' : 'white',
                            color: message.senderType === 'host' ? 'white' : 'text.primary',
                            borderRadius: 2,
                            p: 3,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            borderLeft: message.senderType === 'host' ? 'none' : '4px solid #ff6b35',
                            borderRight: message.senderType === 'host' ? '4px solid #1565c0' : 'none'
                          }}
                        >
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              lineHeight: 1.6, 
                              whiteSpace: 'pre-line',
                              color: 'inherit'
                            }}
                          >
                            {message.message}
                          </Typography>
                        </Box>
                        
                        {/* Message metadata */}
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            justifyContent: message.senderType === 'host' ? 'flex-end' : 'flex-start',
                            alignItems: 'center', 
                            mt: 1,
                            gap: 1
                          }}
                        >
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ fontSize: '0.75rem' }}
                          >
                            {message.senderName} • {new Date(message.timestamp).toLocaleString()}
                          </Typography>
                          {message.isRead && message.senderType === 'host' && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#4caf50' }} />
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                Read
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>

              {/* Message Input */}
              <Box sx={{ 
                p: 2, 
                borderTop: '1px solid', 
                borderColor: '#f0f0f0', 
                backgroundColor: '#fafbfc',
                minHeight: '80px'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mb: 1 }}>
                  <IconButton 
                    size="small"
                    sx={{
                      backgroundColor: '#f8f9fa',
                      color: '#6c757d',
                      width: 36,
                      height: 36,
                      borderRadius: 1.5,
                      mb: 0.5,
                      '&:hover': { 
                        backgroundColor: '#e9ecef',
                        color: '#4caf50',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Paperclip size={16} />
                  </IconButton>
                  <IconButton 
                    size="small"
                    sx={{
                      backgroundColor: '#f8f9fa',
                      color: '#6c757d',
                      width: 36,
                      height: 36,
                      borderRadius: 1.5,
                      mb: 0.5,
                      '&:hover': { 
                        backgroundColor: '#e9ecef',
                        color: '#4caf50',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Clock size={16} />
                  </IconButton>
                  <IconButton 
                    size="small"
                    sx={{
                      backgroundColor: '#f8f9fa',
                      color: '#6c757d',
                      width: 36,
                      height: 36,
                      borderRadius: 1.5,
                      mb: 0.5,
                      '&:hover': { 
                        backgroundColor: '#e9ecef',
                        color: '#4caf50',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Wand2 size={16} />
                  </IconButton>
                  <TextField
                    fullWidth
                    placeholder="Type a message"
                    multiline
                    maxRows={2}
                    size="small"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={!isConnected}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        fontSize: '0.9rem'
                      }
                    }}
                  />
                  <Button 
                    variant="contained" 
                    onClick={handleSendMessage}
                    disabled={!isConnected || !newMessage.trim()}
                    sx={{ 
                      backgroundColor: '#ff6b35',
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      minWidth: 'auto',
                      height: 36,
                      mb: 0.5,
                      '&:hover': { backgroundColor: '#e55a2b' },
                      '&:disabled': { backgroundColor: '#ccc' }
                    }}
                  >
                    <Send size={16} />
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="body2" sx={{ 
                    color: '#4caf50',
                    fontWeight: 500,
                    fontSize: '0.85rem'
                  }}>
                    Send message as Manuel Sciarria
                  </Typography>
                  {!isConnected && (
                    <Typography variant="caption" sx={{ 
                      color: '#f44336',
                      fontSize: '0.75rem',
                      fontWeight: 500
                    }}>
                      (Disconnected)
                    </Typography>
                  )}
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
        </Box>

        {/* Right Sidebar - Reservation Details */}
        {selectedConversation && showHelpWidget && (
          <Box sx={{ 
            width: 320, 
            borderLeft: '1px solid', 
            borderColor: '#e0e0e0', 
            backgroundColor: '#ffffff',
            boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
            zIndex: 1
          }}>
            <Box sx={{ 
              p: 2, 
              borderBottom: '1px solid', 
              borderColor: '#e0e0e0',
              backgroundColor: '#f8f9fa'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  Reservation
                </Typography>
                <Chip label="MODIFIED" size="small" color="warning" sx={{ fontSize: '0.7rem', height: 20 }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <IconButton size="small" sx={{ width: 28, height: 28 }}>
                  <Box sx={{ width: 14, height: 14, backgroundColor: '#ff5a5f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', color: 'white', fontWeight: 'bold' }}>A</Box>
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
              <Typography variant="subtitle2" sx={{ 
                fontWeight: 600, 
                mb: 1, 
                color: '#1976d2',
                fontSize: '0.9rem',
                lineHeight: 1.3
              }}>
                Luxury Stay in Rome - Steps from Metro A Cornelia (372243)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ 
                mb: 2, 
                fontSize: '0.8rem',
                lineHeight: 1.4
              }}>
                Via Giuseppe de Camillis, 3
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ 
                  mb: 0.5, 
                  fontSize: '0.8rem',
                  fontWeight: 500
                }}>Email:</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ 
                  mb: 1, 
                  fontSize: '0.8rem'
                }}>Phone: 🇱🇻 +371 29 589 056</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 6, height: 6, backgroundColor: '#ff5a5f', borderRadius: '50%' }} />
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Airbnb</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ 
                  mb: 0.5, 
                  fontSize: '0.8rem',
                  fontWeight: 500
                }}>Number of nights: 6</Typography>
                <Typography variant="body2" sx={{ 
                  mb: 1, 
                  fontSize: '0.8rem'
                }}>Number of guests: 3</Typography>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ 
                  mb: 0.5, 
                  fontSize: '0.8rem',
                  fontWeight: 500
                }}>€639.05 of €639.05</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip label="Paid" size="small" color="success" sx={{ fontSize: '0.7rem', height: 18 }} />
                </Box>
                <Typography variant="body2" sx={{ 
                  mb: 0.5, 
                  fontSize: '0.8rem'
                }}>Total price: €639.05</Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Payout sum: €451.39</Typography>
              </Box>

              {/* Help Widget */}
              {showHelpWidget && (
                <Box sx={{ 
                  position: 'relative',
                  backgroundColor: '#f0f0f0',
                  borderRadius: 1.5,
                  p: 1.5,
                  mt: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MessageSquare size={14} />
                    <Typography variant="body2" sx={{ 
                      fontWeight: 500,
                      fontSize: '0.8rem'
                    }}>
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
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <MessageSquare size={24} />
          </Button>
        </Badge>
      </Box>

          {/* Bulk Update Modal */}
          <Dialog open={bulkUpdateOpen} onClose={() => setBulkUpdateOpen(false)} maxWidth="sm" fullWidth>
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
              <Button variant="contained" onClick={() => setBulkUpdateOpen(false)}>Confirm</Button>
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
              <Button variant="contained" onClick={handleSaveNotes}>Save Notes</Button>
            </DialogActions>
          </Dialog>

          {/* Assign Conversation Modal */}
          <Dialog open={showAssignDialog} onClose={() => setShowAssignDialog(false)} maxWidth="sm" fullWidth>
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
              <Button variant="contained" onClick={handleAssignUser}>Assign</Button>
            </DialogActions>
          </Dialog>

          {/* Snooze Conversation Modal */}
          <Dialog open={showSnoozeDialog} onClose={() => setShowSnoozeDialog(false)} maxWidth="sm" fullWidth>
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
              <Button variant="contained" onClick={handleSnoozeConversation}>Snooze</Button>
            </DialogActions>
          </Dialog>
    </DashboardContent>
  );
}
