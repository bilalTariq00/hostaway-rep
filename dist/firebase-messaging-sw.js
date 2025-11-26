// Service Worker for Firebase Cloud Messaging
// This file must be in the public directory to be accessible

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Firebase configuration
// Note: In production, these should come from environment variables
// For now, using the project defaults (in production, use build-time replacement)
const firebaseConfig = {
  apiKey: 'AIzaSyAXYIW2QyrQgPK28fJxioOU_rYfKBDgxZQ',
  authDomain: 'hostaway-918b7.firebaseapp.com',
  projectId: 'hostaway-918b7',
  storageBucket: 'hostaway-918b7.firebasestorage.app',
  messagingSenderId: '192565803775',
  appId: '1:192565803775:web:8ef706aec1e989a48e2aca',
  measurementId: 'G-W6MZ1LGS9Y'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: payload.notification?.icon || '/favicon.ico',
    badge: payload.notification?.badge || '/favicon.ico',
    image: payload.notification?.image,
    data: payload.data,
    requireInteraction: payload.data?.requireInteraction || false,
    tag: payload.data?.conversationId || payload.data?.type || 'notification',
    actions: [
      {
        action: 'open',
        title: 'Open',
      },
      {
        action: 'close',
        title: 'Close',
      },
    ],
  };

  // Show notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click received.');

  event.notification.close();

  // Handle action clicks
  if (event.action === 'open') {
    // Open or focus the app
    const conversationId = event.notification.data?.conversationId;
    const urlToOpen = conversationId 
      ? `/inbox?conversation=${conversationId}`
      : '/inbox';

    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        // Check if there's already a window/tab open with the target URL
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // If no window is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  } else if (event.action === 'close') {
    // Just close the notification
    event.notification.close();
  } else {
    // Default: open the app
    const conversationId = event.notification.data?.conversationId;
    const urlToOpen = conversationId 
      ? `/inbox?conversation=${conversationId}`
      : '/inbox';

    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});

