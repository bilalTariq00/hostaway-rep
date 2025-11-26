import { initializeApp } from 'firebase/app';
import { getToken, onMessage, getMessaging, type Messaging } from 'firebase/messaging';

// Firebase configuration
// In production, use environment variables. For development, fallback to defaults.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || (import.meta.env.PROD ? '' : 'AIzaSyAXYIW2QyrQgPK28fJxioOU_rYfKBDgxZQ'),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'hostaway-918b7.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'hostaway-918b7',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'hostaway-918b7.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '192565803775',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || (import.meta.env.PROD ? '' : '1:192565803775:web:8ef706aec1e989a48e2aca'),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-W6MZ1LGS9Y',
};

// Initialize Firebase only if we have minimum required config
let app: ReturnType<typeof initializeApp> | undefined;
let isFirebaseConfigured = false;

try {
  // Only initialize if we have required config
  if (firebaseConfig.apiKey && firebaseConfig.appId) {
    app = initializeApp(firebaseConfig);
    isFirebaseConfigured = true;
    if (!import.meta.env.PROD) {
      console.log('✅ [FCM] Firebase initialized successfully');
      console.log('✅ [FCM] Project:', firebaseConfig.projectId);
    }
  } else {
    if (!import.meta.env.PROD) {
      console.warn('⚠️ [FCM] Firebase not configured - missing API_KEY or APP_ID');
      console.warn('ℹ️ [FCM] Set VITE_FIREBASE_API_KEY and VITE_FIREBASE_APP_ID in production');
    }
    isFirebaseConfigured = false;
  }
} catch (error) {
  console.error('❌ [FCM] Firebase initialization error:', error);
  isFirebaseConfigured = false;
}

// Initialize Firebase Cloud Messaging and get a reference to the service
let messaging: Messaging | null = null;

if (typeof window !== 'undefined' && 'serviceWorker' in navigator && isFirebaseConfigured && app) {
  try {
    messaging = getMessaging(app);
    console.log('✅ [FCM] Firebase Messaging initialized');
  } catch (error) {
    console.error('❌ [FCM] Firebase messaging initialization error:', error);
    console.warn('ℹ️ [FCM] Push notifications will use browser notifications only');
  }
}

// Register service worker
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Service Worker registered:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
}

// Request permission and get FCM token (with graceful fallback)
export async function requestNotificationPermission(): Promise<string | null> {
  console.log('🔔 [FCM] Requesting notification permission...');
  
  // First, check browser notification permission
  const permission = await Notification.requestPermission();
  console.log(`📋 [FCM] Browser permission status: ${permission}`);
  
  if (permission !== 'granted') {
    console.warn(`⚠️ [FCM] Notification permission ${permission}.`);
    if (permission === 'denied') {
      console.log('ℹ️ [FCM] User denied permission. They need to enable it in browser settings.');
    }
    // Still return a flag so browser notifications can work
    localStorage.setItem('notificationPermission', permission);
    return null;
  }

  // Permission granted, store it
  localStorage.setItem('notificationPermission', 'granted');
  
  // Try to get FCM token if Firebase is configured
  if (!messaging) {
    console.warn('⚠️ [FCM] Firebase messaging not available');
    console.log('ℹ️ [FCM] Notifications will use browser notifications only (graceful fallback)');
    console.log('ℹ️ [FCM] To enable FCM, configure Firebase in .env.local:');
    console.log('   - VITE_FIREBASE_API_KEY');
    console.log('   - VITE_FIREBASE_APP_ID');
    console.log('   - VITE_FIREBASE_VAPID_KEY');
    return 'browser-only'; // Return a flag indicating browser notifications work
  }

  try {
    // Register service worker first
    console.log('📦 [FCM] Registering service worker...');
    const swRegistration = await registerServiceWorker();
    if (!swRegistration) {
      console.warn('⚠️ [FCM] Service worker registration failed - will use browser notifications');
      return 'browser-only';
    }

    // Check VAPID key
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
    if (!vapidKey || vapidKey === 'YOUR_VAPID_KEY' || vapidKey.trim() === '') {
      console.warn('⚠️ [FCM] VAPID key not set - will use browser notifications only');
      console.log('ℹ️ [FCM] Add VITE_FIREBASE_VAPID_KEY to your .env.local file for FCM');
      return 'browser-only';
    }
    console.log('✅ [FCM] VAPID key found:', vapidKey.substring(0, 20) + '...');
    
        console.log('✅ [FCM] Permission granted, requesting FCM token...');

        // Get registration token with timeout
        let tokenReceived = false;
        const tokenPromise = getToken(messaging, {
          vapidKey,
          serviceWorkerRegistration: await navigator.serviceWorker.ready,
        }).then((token) => {
          tokenReceived = true;
          console.log('✅ [FCM] Token received successfully!');
          console.log('🔑 [FCM] Token:', token.substring(0, 50) + '...');
          return token;
        }).catch((error) => {
          console.error('❌ [FCM] Error getting token:', error);
          throw error;
        });

        // Add timeout to prevent hanging (only warns if no token was received)
        const timeoutPromise = new Promise<null>((resolve) => {
          setTimeout(() => {
            if (!tokenReceived) {
              console.warn('⚠️ [FCM] Token request timeout - will use browser notifications');
            }
            resolve(null);
          }, 10000); // 10 second timeout
        });

        const token = await Promise.race([tokenPromise, timeoutPromise]);
        
        // If token was received successfully, store it and return
        if (token && tokenReceived) {
          // Store token in localStorage
          localStorage.setItem('fcmToken', token);
          return token;
        } else {
          console.warn('⚠️ [FCM] No registration token available.');
          console.log('ℹ️ [FCM] This might happen if:');
          console.log('   - Service worker is not properly registered');
          console.log('   - VAPID key is incorrect');
          console.log('   - Firebase project is not properly configured');
          console.log('ℹ️ [FCM] Fallback: Browser notifications will still work');
          return 'browser-only';
        }
  } catch (error: any) {
    console.error('❌ [FCM] Error retrieving token:', error);
    console.error('🔍 [FCM] Error details:', error?.message || error);
    console.log('ℹ️ [FCM] Fallback: Browser notifications will still work');
    // Don't throw - return null so browser notifications can work
    return null;
  }
}

// Listen for foreground messages
export function onMessageListener(): Promise<any> {
  return new Promise((resolve) => {
    if (!messaging) {
      resolve(null);
      return;
    }

    onMessage(messaging, (payload) => {
      console.log('Message received in foreground:', payload);
      resolve(payload);
    });
  });
}

// Get stored FCM token
export function getStoredFCMToken(): string | null {
  return localStorage.getItem('fcmToken');
}

// Store FCM token for a user
export function storeFCMTokenForUser(userId: string, token: string): void {
  const userTokens = JSON.parse(localStorage.getItem('userFCMTokens') || '{}');
  userTokens[userId] = token;
  localStorage.setItem('userFCMTokens', JSON.stringify(userTokens));
}

// Get FCM token for a user
export function getFCMTokenForUser(userId: string): string | null {
  const userTokens = JSON.parse(localStorage.getItem('userFCMTokens') || '{}');
  return userTokens[userId] || null;
}

export { messaging };
