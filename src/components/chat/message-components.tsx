import type { ChatMessage } from 'src/hooks/use-chat';

import React, { memo } from 'react';
import { formatDistanceToNow } from 'date-fns';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

interface MessageBubbleProps {
  message: ChatMessage;
  showAvatar?: boolean;
  showResponseTime?: boolean;
}

export const MessageBubble = memo(function MessageBubble({
  message,
  showAvatar = true,
  showResponseTime = true,
}: MessageBubbleProps) {
  const isOwn = message.isOwn;
  const responseTime = message.responseTime;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOwn ? 'flex-end' : 'flex-start',
        mb: 2,
        alignItems: 'flex-end',
        gap: 1,
      }}
    >
      {/* Avatar for received messages */}
      {!isOwn && showAvatar && (
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: '0.875rem',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          {message.senderId.charAt(0).toUpperCase()}
        </Avatar>
      )}

      {/* Message content */}
      <Box sx={{ maxWidth: '70%', minWidth: '120px' }}>
        {/* Message bubble */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: isOwn ? 'primary.main' : 'grey.100',
            color: isOwn ? 'primary.contrastText' : 'text.primary',
            position: 'relative',
            wordBreak: 'break-word',
            '&::before': isOwn
              ? {
                  content: '""',
                  position: 'absolute',
                  right: -8,
                  bottom: 8,
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid',
                  borderLeftColor: 'primary.main',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                }
              : {
                  content: '""',
                  position: 'absolute',
                  left: -8,
                  bottom: 8,
                  width: 0,
                  height: 0,
                  borderRight: '8px solid',
                  borderRightColor: 'grey.100',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
              color: 'inherit',
            }}
          >
            {message.message}
          </Typography>
        </Paper>

        {/* Message metadata */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: isOwn ? 'flex-end' : 'flex-start',
            alignItems: 'center',
            mt: 0.5,
            gap: 1,
            px: 1,
          }}
        >
          {/* Timestamp */}
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.75rem',
              color: 'text.secondary',
            }}
          >
            {formatDistanceToNow(new Date(message.sentAt), { addSuffix: true })}
          </Typography>

          {/* Response time indicator */}
          {showResponseTime && responseTime !== undefined && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.25,
                borderRadius: 1,
                backgroundColor: 'success.light',
                color: 'success.contrastText',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                }}
              >
                ⚡ {responseTime < 1 ? `${(responseTime * 1000).toFixed(0)}ms` : `${responseTime.toFixed(1)}s`}
              </Typography>
            </Box>
          )}

          {/* Delivery status for own messages */}
          {isOwn && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.25,
              }}
            >
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  backgroundColor: 'success.main',
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.7rem',
                  color: 'text.secondary',
                }}
              >
                Delivered
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Avatar for sent messages */}
      {isOwn && showAvatar && (
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: '0.875rem',
            bgcolor: 'grey.300',
            color: 'text.secondary',
          }}
        >
          You
        </Avatar>
      )}
    </Box>
  );
});

// ----------------------------------------------------------------------

interface MessageListProps {
  messages: ChatMessage[];
  showResponseTime?: boolean;
  showAvatar?: boolean;
}

export const MessageList = memo(function MessageList({
  messages,
  showResponseTime = true,
  showAvatar = true,
}: MessageListProps) {
  if (messages.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flexDirection: 'column',
          gap: 2,
          color: 'text.secondary',
        }}
      >
        <Typography variant="h6">No messages yet</Typography>
        <Typography variant="body2">Start a conversation!</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        height: '100%',
        overflow: 'auto',
      }}
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          showAvatar={showAvatar}
          showResponseTime={showResponseTime}
        />
      ))}
    </Box>
  );
});
