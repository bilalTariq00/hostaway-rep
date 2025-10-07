import React, { useState } from 'react';
import { 
  X, 
  Eye, 
  Edit, 
  Send, 
  Star, 
  User, 
  Wifi, 
  Clock, 
  Wand2, 
  Filter, 
  Search, 
  Archive, 
  WifiOff, 
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
    error,
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

  const getStatusIcon = (statusIcon: string) => {
    switch (statusIcon) {
      case 'hourglass':
        return <Clock size={12} style={{ color: '#ff9800' }} />;
      case 'unread':
        return <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2196f3' }} />;
      case 'read':
        return <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#9e9e9e', border: '1px solid #fff' }} />;
      default:
        return null;
    }
  };

  return (
    <DashboardContent maxWidth={false} sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '2rem' }}>
              Guest messaging
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isConnected ? (
                <Tooltip title="Connected">
                  <Wifi size={20} color="#4caf50" />
                </Tooltip>
              ) : (
                <Tooltip title="Disconnected">
                  <WifiOff size={20} color="#f44336" />
                </Tooltip>
              )}
              {error && (
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
              )}
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={() => setBulkUpdateOpen(true)}
            sx={{ 
              backgroundColor: '#e3f2fd', 
              color: '#1976d2',
              '&:hover': { backgroundColor: '#bbdefb' }
            }}
          >
            Bulk update
          </Button>
        </Box>

        {/* Tabs */}
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ 
          '& .MuiTab-root': { 
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1rem'
          },
          '& .Mui-selected': {
            color: '#1976d2 !important',
            fontWeight: 600
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#1976d2',
            height: 3
          }
        }}>
          <Tab label="Inbox" value="inbox" />
          <Tab label="Message templates" value="message-templates" />
          <Tab label="Automations" value="automations" />
          <Tab label="Manage messages" value="manage-messages" />
        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', height: 'calc(100vh - 140px)' }}>
        {/* Left Sidebar - Conversations */}
        <Box sx={{ width: 400, borderRight: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
          {/* Controls */}
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <IconButton sx={{ backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1565c0' } }}>
                <Filter size={16} />
              </IconButton>
              <IconButton sx={{ backgroundColor: conversationFilter === 'all' ? '#1976d2' : '#f5f5f5', color: conversationFilter === 'all' ? 'white' : '#666' }}>
                <MessageSquare size={16} />
              </IconButton>
              <IconButton sx={{ backgroundColor: conversationFilter === 'archived' ? '#1976d2' : '#f5f5f5', color: conversationFilter === 'archived' ? 'white' : '#666' }}>
                <Archive size={16} />
              </IconButton>
              <IconButton sx={{ backgroundColor: conversationFilter === 'snoozed' ? '#1976d2' : '#f5f5f5', color: conversationFilter === 'snoozed' ? 'white' : '#666' }}>
                <Clock size={16} />
              </IconButton>
            </Box>
            <TextField
              placeholder="Search guests"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} />
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
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    backgroundColor: selectedConversation?.id === conversation.id ? '#f3f4f6' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#f9fafb',
                    }
                  }}
                >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        backgroundColor: conversation.avatar.length === 1 ? '#374151' : 'transparent',
                        color: conversation.avatar.length === 1 ? 'white' : 'inherit',
                        fontSize: '0.875rem',
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
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {conversation.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getStatusIcon(conversation.statusIcon)}
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          {conversation.timestamp}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', display: 'block', mb: 0.5 }}>
                      {conversation.bookingDates}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: '0.8rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontWeight: conversation.unread ? 500 : 400
                      }}
                    >
                      {conversation.propertyName}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: '0.8rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontWeight: conversation.unread ? 500 : 400,
                        color: conversation.unread ? '#1976d2' : 'text.secondary'
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
        <Box sx={{ flex: showHelpWidget ? 1 : 2, display: 'flex', flexDirection: 'column' }}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', backgroundColor: '#fafafa' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {selectedConversation.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Mark as unread">
                      <IconButton size="small" onClick={handleMarkAsUnread}>
                        <Eye size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add notes">
                      <IconButton size="small" onClick={handleAddNotes}>
                        <Edit size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={isStarred ? "Unstar guest" : "Star guest"}>
                      <IconButton 
                        size="small" 
                        onClick={handleStarGuest}
                        sx={{ color: isStarred ? '#ff9800' : 'inherit' }}
                      >
                        <Star size={16} fill={isStarred ? '#ff9800' : 'none'} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Assign conversation">
                      <IconButton size="small" onClick={handleAssignConversation}>
                        <User size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={isArchived ? "Unarchive" : "Archive"}>
                      <IconButton 
                        size="small" 
                        onClick={handleArchive}
                        sx={{ color: isArchived ? '#f44336' : 'inherit' }}
                      >
                        <Archive size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={isSnoozed ? "Unsnooze" : "Snooze"}>
                      <IconButton 
                        size="small" 
                        onClick={handleSnooze}
                        sx={{ color: isSnoozed ? '#ff9800' : 'inherit' }}
                      >
                        <Clock size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={showHelpWidget ? "Show details" : "Hide details"}>
                      <IconButton size="small" onClick={handleHideDetails}>
                        <ArrowRight size={16} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, p: 3, overflow: 'auto', backgroundColor: '#f8f9fa' }}>
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
              <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', backgroundColor: 'white' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <IconButton size="small">
                    <Paperclip size={16} />
                  </IconButton>
                  <IconButton size="small">
                    <Clock size={16} />
                  </IconButton>
                  <IconButton size="small">
                    <Wand2 size={16} />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Type a message"
                    multiline
                    maxRows={3}
                    size="small"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={!isConnected}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
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
                      px: 3,
                      '&:hover': { backgroundColor: '#e55a2b' },
                      '&:disabled': { backgroundColor: '#ccc' }
                    }}
                  >
                    <Send size={16} />
                  </Button>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Send message as Manuel Sciarria
                  {!isConnected && (
                    <span style={{ color: '#f44336', marginLeft: 8 }}>
                      (Disconnected)
                    </span>
                  )}
                </Typography>
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
          <Box sx={{ width: 350, borderLeft: '1px solid', borderColor: 'divider', backgroundColor: '#fafafa' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Reservation
                </Typography>
                <Chip label="MODIFIED" size="small" color="warning" />
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <IconButton size="small">
                  <Box sx={{ width: 16, height: 16, backgroundColor: '#ff5a5f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'white', fontWeight: 'bold' }}>A</Box>
                </IconButton>
                <IconButton size="small">
                  <ExternalLink size={16} />
                </IconButton>
                <IconButton size="small">
                  <Calendar size={16} />
                </IconButton>
                <IconButton size="small">
                  <MoreVertical size={16} />
                </IconButton>
                <IconButton size="small">
                  <ChevronDown size={16} />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#1976d2' }}>
                Luxury Stay in Rome - Steps from Metro A Cornelia (372243)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Via Giuseppe de Camillis, 3
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Email:</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Phone: 🇱🇻 +371 29 589 056</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, backgroundColor: '#ff5a5f', borderRadius: '50%' }} />
                  <Typography variant="body2">Airbnb</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Number of nights: 6</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Number of guests: 3</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>€639.05 of €639.05</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip label="Paid" size="small" color="success" />
                </Box>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Total price: €639.05</Typography>
                <Typography variant="body2">Payout sum: €451.39</Typography>
              </Box>

              {/* Help Widget */}
              {showHelpWidget && (
                <Box sx={{ 
                  position: 'relative',
                  backgroundColor: '#f0f0f0',
                  borderRadius: 2,
                  p: 2,
                  mt: 2
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <MessageSquare size={16} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Hi. Need any help?
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => setShowHelpWidget(false)}
                      sx={{ ml: 'auto', p: 0.5 }}
                    >
                      <X size={12} />
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
