import { getFCMTokenForUser } from './firebase-config';

export type NotificationType = 
  | 'message_received' 
  | 'message_reminder' 
  | 'performance_warning' 
  | 'admin_warning';

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
  data?: {
    conversationId?: string;
    messageId?: string;
    workerId?: string;
    userId?: string;
    [key: string]: any;
  };
  icon?: string;
  badge?: string;
  image?: string;
  requireInteraction?: boolean;
}

// Store notifications for sending (in a real app, this would be sent to a backend)
const pendingNotifications: Map<string, NotificationPayload[]> = new Map();

/**
 * Send push notification to a user
 */
export async function sendPushNotification(
  userId: string,
  payload: NotificationPayload
): Promise<boolean> {
  try {
    // Check if browser notifications are supported
    if (typeof Notification === 'undefined') {
      console.error('❌ [Notifications] Browser does not support notifications');
      return false;
    }

    // Check if browser notifications are allowed
    if (Notification.permission === 'denied') {
      console.error(`❌ [Notifications] Permission denied for user ${userId}. User needs to enable notifications in browser settings.`);
      return false;
    }

    if (Notification.permission !== 'granted') {
      console.warn(`⚠️ [Notifications] Permission not granted yet for user ${userId}. Current status: ${Notification.permission}`);
      console.warn('ℹ️ [Notifications] User needs to grant notification permission first.');
      return false;
    }

    // In a real implementation, you would send this to your backend
    // which would then use Firebase Admin SDK to send the notification
    // For now, we'll store it locally and show a browser notification
    
    const token = getFCMTokenForUser(userId);
    
    // Even without FCM token, we can show browser notifications
    const hasFCM = token && token !== 'browser-only';
    if (!hasFCM) {
      console.log(`Using browser notifications for user ${userId} (FCM not configured)`);
    }

    // Store notification for backend processing
    if (!pendingNotifications.has(userId)) {
      pendingNotifications.set(userId, []);
    }
    pendingNotifications.get(userId)!.push(payload);

    // Show browser notification if permission is granted
    if (Notification.permission === 'granted') {
      try {
        // Use the notification dispatcher which has fallback to in-page notifications
        const { dispatchNotification } = await import('./notification-dispatcher');
        
        const shown = await dispatchNotification({
          title: payload.title,
          body: payload.body,
          icon: payload.icon,
          badge: payload.badge,
          image: payload.image,
          data: payload.data,
          requireInteraction: payload.requireInteraction,
          type: payload.type,
        });

        if (!shown) {
          console.log(`ℹ️ [Notifications] Notification dispatched (may use in-page fallback)`);
        }
      } catch (error: any) {
        console.error('❌ [Notifications] Failed to create notification:', error);
        // Try direct browser notification as last resort
        try {
          const notificationOptions: any = {
            body: payload.body,
            icon: payload.icon || '/favicon.ico',
            badge: payload.badge || '/favicon.ico',
            requireInteraction: payload.requireInteraction || false,
            data: payload.data,
            tag: payload.data?.conversationId || payload.type,
            silent: false,
          };
          // image is supported but not in all TypeScript definitions
          if (payload.image) {
            notificationOptions.image = payload.image;
          }
          const notification = new Notification(payload.title, notificationOptions);

          notification.onclick = () => {
            window.focus();
            notification.close();
            if (payload.data?.conversationId) {
              window.location.href = `/inbox?conversation=${payload.data.conversationId}`;
            } else if (payload.type === 'performance_warning') {
              window.location.href = '/supervisor-dashboard';
            } else if (payload.type === 'admin_warning') {
              window.location.href = '/super-admin-analytics';
            }
          };
        } catch (fallbackError) {
          console.error('❌ [Notifications] Fallback notification also failed:', fallbackError);
          return false;
        }
      }
    } else {
      console.warn(`⚠️ [Notifications] Cannot show notification - permission is: ${Notification.permission}`);
      return false;
    }

    console.log(`📲 [Notifications] Notification sent to user ${userId}:`, payload);
    return true;
  } catch (error) {
    console.error('Error sending push notification:', error);
    return false;
  }
}

/**
 * Send notification when a message is received
 */
export async function notifyMessageReceived(
  userId: string,
  senderName: string,
  message: string,
  conversationId: string
): Promise<boolean> {
  return sendPushNotification(userId, {
    type: 'message_received',
    title: `New message from ${senderName}`,
    body: message.length > 100 ? message.substring(0, 100) + '...' : message,
    data: {
      conversationId,
      senderName,
    },
    requireInteraction: false,
  });
}

/**
 * Send reminder notification if user hasn't responded in 5 minutes
 */
export async function notifyMessageReminder(
  userId: string,
  senderName: string,
  conversationId: string
): Promise<boolean> {
  return sendPushNotification(userId, {
    type: 'message_reminder',
    title: `Reminder: Unanswered message from ${senderName}`,
    body: 'You have an unanswered message. Please respond soon.',
    data: {
      conversationId,
      senderName,
    },
    requireInteraction: true,
  });
}

/**
 * Send performance warning notification to associate
 */
export async function notifyPerformanceWarning(
  workerId: string,
  ratedByName: string,
  qualityScore: number,
  feedback?: string
): Promise<boolean> {
  return sendPushNotification(workerId, {
    type: 'performance_warning',
    title: `Performance Warning from ${ratedByName}`,
    body: `Your message quality score is ${qualityScore}%. ${feedback || 'Please review your recent messages and improve your response quality.'}`,
    data: {
      workerId,
      ratedByName,
      qualityScore,
      feedback,
    },
    requireInteraction: true,
  });
}

/**
 * Send admin warning notification
 */
export async function notifyAdminWarning(
  userId: string,
  adminName: string,
  warningMessage: string
): Promise<boolean> {
  return sendPushNotification(userId, {
    type: 'admin_warning',
    title: `Warning from ${adminName}`,
    body: warningMessage,
    data: {
      userId,
      adminName,
    },
    requireInteraction: true,
  });
}

/**
 * Get pending notifications for a user (for backend processing)
 */
export function getPendingNotifications(userId: string): NotificationPayload[] {
  return pendingNotifications.get(userId) || [];
}

/**
 * Clear pending notifications for a user
 */
export function clearPendingNotifications(userId: string): void {
  pendingNotifications.delete(userId);
}

