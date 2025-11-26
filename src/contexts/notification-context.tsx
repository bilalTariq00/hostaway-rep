import type { ReactNode} from 'react';

import { useState, useEffect, useContext, useCallback, createContext } from 'react';

import { useAuth } from './auth-context';
import { onMessageListener, storeFCMTokenForUser, requestNotificationPermission } from '../services/firebase-config';
import {
  notifyAdminWarning,
  notifyMessageReceived,
  notifyMessageReminder,
  notifyPerformanceWarning,
} from '../services/notification-service';

interface NotificationContextType {
  isPermissionGranted: boolean;
  requestPermission: () => Promise<boolean>;
  sendMessageNotification: (userId: string, senderName: string, message: string, conversationId: string) => Promise<void>;
  sendReminderNotification: (userId: string, senderName: string, conversationId: string) => Promise<void>;
  sendPerformanceWarning: (workerId: string, ratedByName: string, qualityScore: number, feedback?: string) => Promise<void>;
  sendAdminWarning: (userId: string, adminName: string, warningMessage: string) => Promise<void>;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const { user } = useAuth();
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  // Check notification permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setIsPermissionGranted(Notification.permission === 'granted');
    }
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const token = await requestNotificationPermission();
      // If we got permission (even if no FCM token), consider it success
      const permission = localStorage.getItem('notificationPermission');
      if (permission === 'granted') {
        setIsPermissionGranted(true);
        if (token && token !== 'browser-only' && user) {
          storeFCMTokenForUser(user.id, token);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      // Check if permission was granted even if FCM failed
      const permission = localStorage.getItem('notificationPermission');
      if (permission === 'granted') {
        setIsPermissionGranted(true);
        return true;
      }
      return false;
    }
  }, [user]);

  // Set up FCM token when user logs in
  useEffect(() => {
    if (user && isPermissionGranted) {
      requestPermission();
    }
  }, [user, isPermissionGranted, requestPermission]);

  // Listen for foreground messages
  useEffect(() => {
    if (isPermissionGranted) {
      onMessageListener()
        .then((payload) => {
          if (payload) {
            console.log('Foreground message received:', payload);
            // Show browser notification if received in foreground
            if (payload.notification) {
              new Notification(payload.notification.title || 'New Notification', {
                body: payload.notification.body,
                icon: payload.notification.icon,
                data: payload.data,
              });
            }
          }
        })
        .catch((err) => {
          console.error('Error in onMessageListener:', err);
        });
    }
  }, [isPermissionGranted]);

  // Send message notification
  const sendMessageNotification = useCallback(
    async (userId: string, senderName: string, message: string, conversationId: string) => {
      // Check permission directly (more reliable than state)
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        await notifyMessageReceived(userId, senderName, message, conversationId);
      } else {
        console.warn('⚠️ [Notifications] Cannot send - permission not granted. Current:', Notification.permission);
      }
    },
    []
  );

  // Send reminder notification
  const sendReminderNotification = useCallback(
    async (userId: string, senderName: string, conversationId: string) => {
      // Check permission directly (more reliable than state)
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        await notifyMessageReminder(userId, senderName, conversationId);
      } else {
        console.warn('⚠️ [Notifications] Cannot send - permission not granted. Current:', Notification.permission);
      }
    },
    []
  );

  // Send performance warning
  const sendPerformanceWarning = useCallback(
    async (workerId: string, ratedByName: string, qualityScore: number, feedback?: string) => {
      // Check permission directly (more reliable than state)
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        await notifyPerformanceWarning(workerId, ratedByName, qualityScore, feedback);
      } else {
        console.warn('⚠️ [Notifications] Cannot send - permission not granted. Current:', Notification.permission);
      }
    },
    []
  );

  // Send admin warning
  const sendAdminWarning = useCallback(
    async (userId: string, adminName: string, warningMessage: string) => {
      // Check permission directly (more reliable than state)
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        await notifyAdminWarning(userId, adminName, warningMessage);
      } else {
        console.warn('⚠️ [Notifications] Cannot send - permission not granted. Current:', Notification.permission);
      }
    },
    []
  );

  const value: NotificationContextType = {
    isPermissionGranted,
    requestPermission,
    sendMessageNotification,
    sendReminderNotification,
    sendPerformanceWarning,
    sendAdminWarning,
  };

  // Initialize notification helper for easy access from anywhere
  useEffect(() => {
    // Dynamically import and initialize helper to avoid circular dependency
    if (isPermissionGranted) {
      import('../utils/notification-helper').then((module) => {
        module.initNotificationHelper(value);
      });
    }
  }, [isPermissionGranted, value]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications(): NotificationContextType {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

