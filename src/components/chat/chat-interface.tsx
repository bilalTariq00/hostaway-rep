import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useChat } from 'src/hooks/use-chat';

import { ChatInput } from './chat-input';
import { MessageList } from './message-components';

// ----------------------------------------------------------------------

interface ChatInterfaceProps {
  receiverId: string;
  conversationId?: string;
  className?: string;
  sx?: any;
}

export function ChatInterface({
  receiverId,
  conversationId,
  className,
  sx,
}: ChatInterfaceProps) {
  const {
    messages,
    isConnected,
    error,
    sendMessage,
    clearMessages,
    retryConnection,
  } = useChat(conversationId);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle typing indicator
  const handleTyping = (typing: boolean) => {
    setIsTyping(typing);
  };

  // Handle message sending
  const handleSendMessage = (message: string, targetReceiverId: string) => {
    sendMessage(message, targetReceiverId);
  };

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'background.default',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        ...sx,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Chat with {receiverId}
          </Typography>
          
          {/* Connection status */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isConnected ? (
              <>
                <Wifi size={16} color="#4caf50" />
                <Typography variant="caption" sx={{ color: 'success.main' }}>
                  Connected
                </Typography>
              </>
            ) : (
              <>
                <WifiOff size={16} color="#f44336" />
                <Typography variant="caption" sx={{ color: 'error.main' }}>
                  Disconnected
                </Typography>
              </>
            )}
          </Box>

          {/* Typing indicator */}
          {isTyping && (
            <Typography variant="caption" sx={{ color: 'primary.main', fontStyle: 'italic' }}>
              {receiverId} is typing...
            </Typography>
          )}
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            onClick={retryConnection}
            disabled={isConnected}
            sx={{
              backgroundColor: 'grey.100',
              '&:hover': {
                backgroundColor: 'grey.200',
              },
            }}
          >
            <RefreshCw size={16} />
          </IconButton>
          
          <Button
            size="small"
            variant="outlined"
            onClick={clearMessages}
            sx={{ minWidth: 'auto', px: 2 }}
          >
            Clear
          </Button>
        </Box>
      </Box>

      {/* Error display */}
      {error && (
        <Alert
          severity="error"
          sx={{
            m: 2,
            borderRadius: 2,
          }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={retryConnection}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Messages area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <MessageList
          messages={messages}
          showResponseTime
          showAvatar
        />
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input area */}
      <ChatInput
        onSendMessage={handleSendMessage}
        receiverId={receiverId}
        disabled={!isConnected}
        placeholder={`Message ${receiverId}...`}
        maxLength={1000}
        showTypingIndicator
        onTyping={handleTyping}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

export { ChatInput } from './chat-input';
export { useChat } from 'src/hooks/use-chat';
// Export individual components for flexibility
export { MessageList } from './message-components';
