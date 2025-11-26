import { useEffect } from 'react';

import { useInPageNotifications } from 'src/hooks/use-in-page-notifications';

import { registerInPageNotificationCallback, unregisterInPageNotificationCallback } from 'src/services/notification-dispatcher';

import { InPageNotificationStack } from './in-page-notification-stack';

/**
 * Global notification manager that provides in-page notification fallback
 * when browser notifications are suppressed
 */
export function GlobalNotificationManager() {
  const { showNotification, notifications, removeNotification } = useInPageNotifications();

  useEffect(() => {
    // Register callback for in-page notifications
    registerInPageNotificationCallback((options) => {
      // Map notification types to alert types
      let alertType: 'info' | 'success' | 'warning' | 'error' = 'info';
      if (options.type === 'performance_warning' || options.type === 'admin_warning') {
        alertType = 'warning';
      } else if (options.type === 'message_received') {
        alertType = 'info';
      } else if (options.type === 'message_reminder') {
        alertType = 'warning';
      }

      showNotification(
        options.title,
        options.body,
        alertType,
        options.requireInteraction ? 0 : 8000 // 0 means don't auto-close
      );
    });

    // Cleanup on unmount
    return () => {
      unregisterInPageNotificationCallback();
    };
  }, [showNotification]);

  return <InPageNotificationStack notifications={notifications} onRemove={removeNotification} />;
}

