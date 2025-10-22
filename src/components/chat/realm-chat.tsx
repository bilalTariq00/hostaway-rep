import React, { useRef, useState, useEffect } from 'react';
import {
  Send,
  Wifi,
  Smile,
  Phone,
  Video,
  Search,
  WifiOff,
  Paperclip,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useChat } from 'src/hooks/use-chat';

// ----------------------------------------------------------------------

interface RealmChatProps {
  conversationId: string;
  currentUserId?: string;
  receiverId?: string;
  receiverName?: string;
  receiverAvatar?: string;
  sx?: object;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export function RealmChat({
  conversationId,
  currentUserId = 'user-1',
  receiverId = 'user-2',
  receiverName = 'Guest',
  receiverAvatar = 'G',
  sx,
  onToggleSidebar,
  isSidebarOpen = true,
}: RealmChatProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { messages, sendMessage, isConnected, error, emitTyping } = useChat(conversationId, currentUserId);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle typing indicator
  const handleTyping = (isTypingStatus: boolean) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    if (isTypingStatus) {
      emitTyping(isTypingStatus);
      typingTimeoutRef.current = setTimeout(() => {
        emitTyping(false);
        setIsTyping(false);
      }, 2000);
    } else {
      emitTyping(false);
      setIsTyping(false);
    }
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setMessage(text);
    
    if (text.length > 0) {
      setIsTyping(true);
      handleTyping(true);
    } else {
      setIsTyping(false);
      handleTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && isConnected) {
      sendMessage(message.trim(), receiverId);
      setMessage('');
      setIsTyping(false);
      handleTyping(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: number) => new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

  const formatResponseTime = (responseTime?: number) => {
    if (!responseTime) return null;
    
    if (responseTime < 1) {
      return `${Math.round(responseTime * 1000)}ms`;
    }
    return `${responseTime.toFixed(1)}s`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#f8fafc',
        ...sx,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: 'white',
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
            }}
          >
            {receiverAvatar}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {receiverName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {isConnected ? (
                <Wifi size={12} color="green" />
              ) : (
                <WifiOff size={12} color="red" />
              )}
              <Typography variant="caption" color="text.secondary">
                {isConnected ? 'Online' : 'Offline'}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small">
            <Phone size={18} />
          </IconButton>
          <IconButton size="small">
            <Video size={18} />
          </IconButton>
          <IconButton size="small">
            <Search size={18} />
          </IconButton>
          {onToggleSidebar && (
            <IconButton 
              size="small" 
              onClick={onToggleSidebar}
              sx={{ 
                bgcolor: 'action.hover',
                '&:hover': { 
                  bgcolor: 'action.selected' 
                }
              }}
            >
              {isSidebarOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </IconButton>
          )}
          <IconButton size="small">
            <MoreVertical size={18} />
          </IconButton>
        </Box>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {messages.length === 0 ? (
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
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                color: 'white',
                fontSize: '2rem',
              }}
            >
              {receiverAvatar}
            </Avatar>
            <Typography variant="h6" color="text.secondary">
              Start a conversation with {receiverName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Send a message to begin chatting
            </Typography>
          </Box>
        ) : (
          messages.map((msg, index) => {
            const isOwn = msg.isOwn;
            const showAvatar = index === 0 || messages[index - 1]?.senderId !== msg.senderId;
            
            return (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: isOwn ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  gap: 1,
                  mb: 1,
                }}
              >
                {!isOwn && showAvatar && (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontSize: '0.8rem',
                    }}
                  >
                    {receiverAvatar}
                  </Avatar>
                )}
                
                {!isOwn && !showAvatar && <Box sx={{ width: 32 }} />}
                
                <Box
                  sx={{
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isOwn ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: isOwn ? 'primary.main' : 'white',
                      color: isOwn ? 'white' : 'text.primary',
                      borderRadius: 2,
                      px: 2,
                      py: 1.5,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      borderTopLeftRadius: isOwn ? 16 : 4,
                      borderTopRightRadius: isOwn ? 4 : 16,
                    }}
                  >
                    <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                      {msg.message}
                    </Typography>
                  </Box>
                  
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(msg.sentAt)}
                    </Typography>
                    {msg.responseTime && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'success.main',
                          fontWeight: 500,
                          fontSize: '0.7rem',
                        }}
                      >
                        ⚡ {formatResponseTime(msg.responseTime)}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            );
          })
        )}
        
        {/* Typing Indicator */}
        {isTyping && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
            }}
          >
            <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
              {receiverAvatar}
            </Avatar>
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                px: 2,
                py: 1,
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {receiverName} is typing...
              </Typography>
            </Box>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>

      {/* Error Display */}
      {error && (
        <Box
          sx={{
            p: 1,
            backgroundColor: alpha('#f44336', 0.1),
            borderTop: '1px solid',
            borderColor: 'error.main',
          }}
        >
          <Typography variant="caption" color="error.main">
            {error}
          </Typography>
        </Box>
      )}

      {/* Message Input */}
      <Box
        sx={{
          p: 2,
          backgroundColor: 'white',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            sx={{
              color: 'text.secondary',
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          >
            <Smile size={20} />
          </IconButton>
          
          <IconButton
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          >
            <Paperclip size={20} />
          </IconButton>
          
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${receiverName}...`}
            disabled={!isConnected}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f8fafc',
                '&:hover': {
                  backgroundColor: '#f1f5f9',
                },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                },
              },
            }}
          />
          
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={!isConnected || !message.trim()}
            sx={{
              minWidth: 'auto',
              px: 2,
              py: 1.2,
              borderRadius: 2,
              height: 48,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              '&:disabled': {
                backgroundColor: 'action.disabled',
              },
            }}
          >
            <Send size={20} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
