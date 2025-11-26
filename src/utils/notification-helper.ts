/**
 * Notification Helper Utility
 * Easy-to-use functions to trigger notifications from anywhere in the app
 * 
 * Usage:
 *   import { notify, notifyNewMessage } from 'src/utils/notification-helper';
 *   await notify({ title: 'Alert', message: 'Something happened!' });
 */

// Import the type from notification context
type NotificationContextType = {
  isPermissionGranted: boolean;
  requestPermission: () => Promise<boolean>;
  sendMessageNotification: (userId: string, senderName: string, message: string, conversationId: string) => Promise<void>;
  sendReminderNotification: (userId: string, senderName: string, conversationId: string) => Promise<void>;
  sendPerformanceWarning: (workerId: string, ratedByName: string, qualityScore: number, feedback?: string) => Promise<void>;
  sendAdminWarning: (userId: string, adminName: string, warningMessage: string) => Promise<void>;
};

// Store notification context instance (will be set by app initialization)
let notificationContext: NotificationContextType | null = null;

/**
 * Initialize notification helper with context
 * Automatically called by NotificationProvider - you don't need to call this manually
 */
export function initNotificationHelper(context: NotificationContextType) {
  notificationContext = context;
  console.log('✅ [NotificationHelper] Initialized - notifications available globally');
}

/**
 * Send a notification from anywhere in your app
 */
export async function notify(options: {
  title: string;
  message: string;
  type?: 'message' | 'reminder' | 'warning' | 'info';
  userId?: string;
  conversationId?: string;
}): Promise<void> {
  if (!notificationContext) {
    console.warn('⚠️ [Notifications] Notification context not initialized. Call initNotificationHelper() first.');
    return;
  }

  const userId = options.userId || 'current-user';

  switch (options.type) {
    case 'message':
      if (options.conversationId) {
        await notificationContext.sendMessageNotification(
          userId,
          options.title,
          options.message,
          options.conversationId
        );
      }
      break;
    case 'reminder':
      if (options.conversationId) {
        await notificationContext.sendReminderNotification(
          userId,
          options.title,
          options.conversationId
        );
      }
      break;
    case 'warning':
      await notificationContext.sendPerformanceWarning(
        userId,
        options.title,
        0, // qualityScore - can be passed if needed
        options.message
      );
      break;
    default:
      // Use message notification for generic notifications
      await notificationContext.sendMessageNotification(
        userId,
        options.title,
        options.message,
        options.conversationId || ''
      );
  }
}

/**
 * Notify when a new message is received
 */
export async function notifyNewMessage(
  senderName: string,
  message: string,
  conversationId: string,
  receiverId?: string
): Promise<void> {
  await notify({
    title: `New message from ${senderName}`,
    message,
    type: 'message',
    userId: receiverId,
    conversationId,
  });
}

/**
 * Notify when a task/completion event happens
 */
export async function notifyTaskComplete(
  taskName: string,
  completedBy: string
): Promise<void> {
  await notify({
    title: 'Task Completed',
    message: `${taskName} was completed by ${completedBy}`,
    type: 'info',
  });
}

/**
 * Notify for any custom event
 */
export async function notifyCustomEvent(
  title: string,
  message: string,
  userId?: string
): Promise<void> {
  await notify({
    title,
    message,
    type: 'info',
    userId,
  });
}

