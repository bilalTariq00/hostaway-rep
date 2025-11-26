# Firebase Push Notifications Setup Guide

This guide will help you set up Firebase Cloud Messaging (FCM) for push notifications in your application.

## Prerequisites

1. Firebase project created (hostaway-918b7)
2. Firebase Admin SDK credentials (already in `src/backend/hostaway-918b7-firebase-adminsdk-fbsvc-1ed266dad3.json`)
3. Firebase Web App configuration

## Step 1: Get Firebase Web App Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **hostaway-918b7**
3. Click the gear icon ⚙️ → **Project Settings**
4. Scroll down to **Your apps** section
5. If you don't have a web app, click **Add app** → **Web** (</>)
6. Copy the `firebaseConfig` object that looks like this:
   ```javascript
   {
     apiKey: "AIza...",
     authDomain: "hostaway-918b7.firebaseapp.com",
     projectId: "hostaway-918b7",
     storageBucket: "hostaway-918b7.appspot.com",
     messagingSenderId: "108389266548124784838",
     appId: "1:108389266548124784838:web:..."
   }
   ```

## Step 2: Get VAPID Key

1. In Firebase Console, go to **Project Settings**
2. Click on the **Cloud Messaging** tab
3. Under **Web Push certificates**, if there's no key, click **Generate key pair**
4. Copy the **Key pair** (this is your VAPID key)

## Step 3: Update Environment Variables

Create a `.env` file in the root directory (or update existing one):

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=hostaway-918b7.firebaseapp.com
VITE_FIREBASE_MESSAGING_SENDER_ID=108389266548124784838
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
```

## Step 4: Update Firebase Configuration

Update `src/services/firebase-config.ts` with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  projectId: 'hostaway-918b7',
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

Also update `public/firebase-messaging-sw.js` with the same configuration for the service worker.

## Step 5: Enable Cloud Messaging API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: **hostaway-918b7**
3. Go to **APIs & Services** → **Library**
4. Search for "Firebase Cloud Messaging API"
5. Click **Enable**

## Step 6: Service Worker Setup

The service worker file is located at `public/firebase-messaging-sw.js`. Make sure:
- The file is accessible at `/firebase-messaging-sw.js` when deployed
- Update the Firebase configuration in the service worker file with your actual values

## Step 7: Request Notification Permission

The app will automatically request notification permission when:
- User logs in
- User opens the inbox/chat interface

You can also manually request permission using:
```typescript
import { requestNotificationPermission } from 'src/services/firebase-config';

const token = await requestNotificationPermission();
```

## Notification Features Implemented

### 1. Message Received Notifications
- **When**: A new message is received
- **Recipients**: 
  - Associate (direct receiver)
  - Manager/Supervisor (if associate receives message)

### 2. Message Reminder Notifications
- **When**: User doesn't respond within 5 minutes
- **Recipients**: The associate who received the message

### 3. Performance Warning Notifications
- **When**: 
  - Supervisor/Manager rates associate ≤ 2 stars
  - Performance quality score is below 70%
  - Feedback contains negative indicators
- **Recipients**: The associate being rated

### 4. Admin Warning Notifications
- **When**: Super Admin sends a warning through the admin warnings page
- **Recipients**: Selected associate, supervisor, or manager

## Testing Push Notifications

### Local Testing
1. Run the app: `npm run dev`
2. Open browser console
3. Check for FCM token in console logs
4. Test notifications by:
   - Sending a message to an associate
   - Waiting 5 minutes without responding
   - Rating an associate poorly
   - Sending admin warning (super-admin only)

### Production Testing
1. Deploy the app
2. Ensure service worker is accessible
3. Test on HTTPS (required for push notifications)
4. Test on different browsers:
   - Chrome/Edge: Full support
   - Firefox: Full support
   - Safari: Limited support (macOS/iOS)

## Troubleshooting

### No FCM Token Received
- Check browser console for errors
- Verify Firebase configuration is correct
- Check that service worker is registered
- Ensure HTTPS is used (or localhost for development)

### Notifications Not Showing
- Check browser notification permissions
- Verify service worker is active (check DevTools → Application → Service Workers)
- Check browser console for errors
- Ensure Firebase Cloud Messaging API is enabled

### Service Worker Not Registering
- Check that `public/firebase-messaging-sw.js` exists
- Verify file is accessible at `/firebase-messaging-sw.js`
- Check browser console for registration errors
- Ensure HTTPS is used (required for service workers)

### Background Notifications Not Working
- Verify service worker has correct Firebase configuration
- Check service worker logs in DevTools
- Ensure `firebase-messaging-sw.js` is in the `public` directory

## Admin Warning Page

Super admins can send warnings through the admin warnings page:
- Navigate to `/admin-warnings` (you may need to add this route)
- Select recipient type (Associate/Supervisor/Manager)
- Select specific recipient
- Enter warning message
- Click "Send Warning Notification"

## Backend Integration (Future)

Currently, notifications are sent client-side. For production, you should:
1. Send FCM tokens to your backend
2. Store tokens in database with user IDs
3. Use Firebase Admin SDK on backend to send notifications
4. Handle token refresh and expiration

## Security Notes

⚠️ **Important**: 
- Never commit `.env` file with actual credentials
- Add `.env` to `.gitignore`
- Use environment variables for all Firebase keys
- Restrict Firebase API keys in Firebase Console → API restrictions
- Use HTTPS in production (required for service workers and push notifications)

## Additional Resources

- [Firebase Cloud Messaging Documentation](https://firebase.google.com/docs/cloud-messaging)
- [Web Push Notifications Guide](https://web.dev/push-notifications-overview/)
- [Service Workers Guide](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)


