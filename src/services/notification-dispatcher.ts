/**
 * Notification Dispatcher
 * Handles both browser and in-page notifications with fallback
 */

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  data?: any;
  requireInteraction?: boolean;
  type?: 'message_received' | 'message_reminder' | 'performance_warning' | 'admin_warning';
}

// Store in-page notification callback
let inPageNotificationCallback: ((options: NotificationOptions) => void) | null = null;

/**
 * Register callback for in-page notifications
 */
export function registerInPageNotificationCallback(
  callback: (options: NotificationOptions) => void
) {
  inPageNotificationCallback = callback;
}

/**
 * Remove in-page notification callback
 */
export function unregisterInPageNotificationCallback() {
  inPageNotificationCallback = null;
}

/**
 * Dispatch notification - tries browser first, falls back to in-page
 */
export async function dispatchNotification(options: NotificationOptions): Promise<boolean> {
  let browserNotificationShown = false;
  
  // Try browser notification first
  if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    try {
      let notificationShown = false;
      
      const notificationOptions: any = {
        body: options.body,
        icon: options.icon || '/favicon.ico',
        badge: options.badge || '/favicon.ico',
        requireInteraction: options.requireInteraction || false,
        data: options.data,
        tag: options.data?.conversationId || options.type || 'notification',
        silent: false,
      };
      // image is supported but not in all TypeScript definitions
      if (options.image) {
        notificationOptions.image = options.image;
      }
      const notification = new Notification(options.title, notificationOptions);

      notification.onshow = () => {
        notificationShown = true;
        browserNotificationShown = true;
        console.log('✅ [Notifications] Browser notification displayed');
      };

      notification.onerror = (error) => {
        console.error('❌ [Notifications] Browser notification error:', error);
      };

      notification.onclose = () => {
        console.log('ℹ️ [Notifications] Browser notification closed');
      };

      notification.onclick = () => {
        console.log('🖱️ [Notifications] Browser notification clicked');
        window.focus();
        notification.close();
        
        // Handle navigation
        if (options.data?.conversationId) {
          window.location.href = `/inbox?conversation=${options.data.conversationId}`;
        } else if (options.type === 'performance_warning') {
          window.location.href = '/supervisor-dashboard';
        } else if (options.type === 'admin_warning') {
          window.location.href = '/super-admin-analytics';
        }
      };

      // Check if notification was suppressed after a short delay
      setTimeout(() => {
        if (!notificationShown) {
          // Notification may have been suppressed - use in-page fallback
          console.warn('⚠️ [Notifications] Browser notification may be suppressed');
          if (inPageNotificationCallback) {
            console.log('ℹ️ [Notifications] Falling back to in-page notification');
            inPageNotificationCallback(options);
          }
        }
      }, 500);

      // Auto-close after delay if not requireInteraction
      if (!options.requireInteraction) {
        setTimeout(() => {
          if (notification) {
            notification.close();
          }
        }, 10000);
      }
    } catch (error) {
      console.error('❌ [Notifications] Failed to create browser notification:', error);
    }
  }

  // If browser notification didn't show and we have in-page callback, show that
  if (!browserNotificationShown && inPageNotificationCallback) {
    setTimeout(() => {
      if (!browserNotificationShown && inPageNotificationCallback) {
        console.log('ℹ️ [Notifications] Using in-page notification fallback');
        inPageNotificationCallback(options);
      }
    }, 600);
  }

  return browserNotificationShown || inPageNotificationCallback !== null;
}

