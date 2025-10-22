import { Send, Smile, Paperclip } from 'lucide-react';
import React, { useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

// ----------------------------------------------------------------------

interface ChatInputProps {
  onSendMessage: (message: string, receiverId: string) => void;
  receiverId: string;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  showTypingIndicator?: boolean;
  onTyping?: (isTyping: boolean) => void;
}

export function ChatInput({
  onSendMessage,
  receiverId,
  disabled = false,
  placeholder = 'Type a message...',
  maxLength = 1000,
  showTypingIndicator = true,
  onTyping,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle typing indicator with debouncing
  const handleTypingChange = useCallback((value: string) => {
    setMessage(value);
    
    if (!showTypingIndicator || !onTyping) return;

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set typing to true immediately
    if (value.length > 0 && !isTyping) {
      setIsTyping(true);
      onTyping(true);
    }

    // Set typing to false after 1 second of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTyping(false);
    }, 1000);
  }, [isTyping, onTyping, showTypingIndicator]);

  // Send message handler
  const handleSendMessage = useCallback(() => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    onSendMessage(trimmedMessage, receiverId);
    setMessage('');
    
    // Clear typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setIsTyping(false);
    onTyping?.(false);
  }, [message, disabled, onSendMessage, receiverId, onTyping]);

  // Handle Enter key press
  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Handle paste events
  const handlePaste = useCallback((event: React.ClipboardEvent) => {
    const pastedText = event.clipboardData.getData('text');
    if (pastedText.length > maxLength) {
      event.preventDefault();
      setMessage(pastedText.substring(0, maxLength));
    }
  }, [maxLength]);

  // Auto-focus on mount
  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, []);

  // Cleanup typing timeout on unmount
  useEffect(() => () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }, []);

  const canSend = message.trim().length > 0 && !disabled;
  const characterCount = message.length;
  const isNearLimit = characterCount > maxLength * 0.8;

  return (
    <Box
      sx={{
        p: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Character count */}
      {isNearLimit && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mb: 1,
            color: characterCount >= maxLength ? 'error.main' : 'warning.main',
            textAlign: 'right',
          }}
        >
          {characterCount}/{maxLength}
        </Typography>
      )}

      {/* Input area */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
        {/* Attachment button */}
        <IconButton
          size="small"
          disabled={disabled}
          sx={{
            backgroundColor: 'grey.100',
            '&:hover': {
              backgroundColor: 'grey.200',
            },
            '&:disabled': {
              backgroundColor: 'grey.50',
            },
          }}
        >
          <Paperclip size={16} />
        </IconButton>

        {/* Emoji button */}
        <IconButton
          size="small"
          disabled={disabled}
          sx={{
            backgroundColor: 'grey.100',
            '&:hover': {
              backgroundColor: 'grey.200',
            },
            '&:disabled': {
              backgroundColor: 'grey.50',
            },
          }}
        >
          <Smile size={16} />
        </IconButton>

        {/* Message input */}
        <TextField
          ref={textFieldRef}
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => handleTypingChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
          disabled={disabled}
          placeholder={placeholder}
          inputProps={{ maxLength }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'grey.50',
              },
              '&.Mui-focused': {
                backgroundColor: 'background.paper',
              },
            },
            '& .MuiInputBase-input': {
              fontSize: '0.875rem',
              lineHeight: 1.5,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSendMessage}
                  disabled={!canSend}
                  sx={{
                    minWidth: 'auto',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: canSend ? 'primary.main' : 'grey.300',
                    '&:hover': {
                      backgroundColor: canSend ? 'primary.dark' : 'grey.400',
                    },
                    '&:disabled': {
                      backgroundColor: 'grey.300',
                    },
                  }}
                >
                  <Send size={16} />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Connection status */}
      {disabled && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 1,
            color: 'error.main',
            textAlign: 'center',
          }}
        >
          Disconnected - Messages will be queued
        </Typography>
      )}
    </Box>
  );
}
