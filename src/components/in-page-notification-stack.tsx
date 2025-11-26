import React from 'react';

import Box from '@mui/material/Box';

import { InPageNotification } from './in-page-notification';

interface Notification {
  id: string;
  title: string;
  body: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

interface InPageNotificationStackProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export function InPageNotificationStack({ notifications, onRemove }: InPageNotificationStackProps) {
  return (
    <>
      {notifications.map((notification, index) => (
        <Box
          key={notification.id}
          sx={{
            position: 'fixed',
            top: 16 + index * 80,
            right: 16,
            zIndex: 9999 - index,
          }}
        >
          <InPageNotification
            title={notification.title}
            body={notification.body}
            type={notification.type}
            duration={notification.duration}
            onClose={() => onRemove(notification.id)}
          />
        </Box>
      ))}
    </>
  );
}


