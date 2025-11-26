import React, { useState, useEffect } from 'react';
import { X, Bell, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

interface InPageNotificationProps {
  title: string;
  body: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose?: () => void;
}

export function InPageNotification({
  title,
  body,
  type = 'info',
  duration = 5000,
  onClose,
}: InPageNotificationProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setOpen(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [duration, onClose]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  if (!open) return null;

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 9999,
          minWidth: 320,
          maxWidth: 500,
          boxShadow: theme.shadows[8],
        }}
      >
        <Alert
          severity={type}
          icon={getIcon()}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <X size={16} />
            </IconButton>
          }
          sx={{
            '& .MuiAlert-message': {
              width: '100%',
            },
          }}
        >
          <Box>
            <Box sx={{ fontWeight: 600, mb: 0.5 }}>{title}</Box>
            <Box sx={{ fontSize: '0.875rem', opacity: 0.9 }}>{body}</Box>
          </Box>
        </Alert>
      </Box>
    </Slide>
  );
}

