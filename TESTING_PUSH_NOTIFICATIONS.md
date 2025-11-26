# Testing Push Notifications - Quick Guide

Since you've already added your VAPID key to `.env.local`, here's how to test if push notifications are working:

## Quick Test Steps

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the test page:**
   - Open your browser and go to: `http://localhost:5173/notification-test` (or your dev server URL)
   - Or navigate directly: `http://localhost:5173/notification-test`

3. **Check the Status Cards:**
   - **Browser Support**: Should show "Supported" ✓
   - **Permission**: Will show "Not Granted" initially
   - **FCM Token**: Will be "Not Found" until you grant permission
   - **Service Worker**: Should show status

4. **Request Permission:**
   - Click "Request Notification Permission" button
   - Browser will show a permission prompt - click **"Allow"**
   - Wait for the status to update

5. **Check Browser Console (F12):**
   - Look for: `FCM Token: <long-token-string>`
   - Check for any errors in red
   - Service worker registration messages

6. **Test Notifications:**
   - Use any of the "Test" buttons on the page
   - You should see a browser notification appear
   - Check the "Test Results" section below for success/error messages

## What to Look For

### ✅ Success Indicators:
- Permission status shows "Granted"
- FCM Token shows "Present" with a token
- Service Worker shows "Active ✓"
- When you click test buttons, notifications appear
- Test Results show green "success" messages

### ❌ Common Issues:

**1. No FCM Token:**
- Check browser console for errors
- Verify `.env.local` has all required variables:
  ```
  VITE_FIREBASE_VAPID_KEY='BMc6C3IV-G1HKRMIXMMlaSf5HDkKa1yov8kXJvFqZGN3x3AxZEKF1sfUsJi0BiLYwJ3t65Ae7MjL31nZw-T8CUs'
  VITE_FIREBASE_API_KEY='your_api_key'
  VITE_FIREBASE_AUTH_DOMAIN='hostaway-918b7.firebaseapp.com'
  VITE_FIREBASE_MESSAGING_SENDER_ID='108389266548124784838'
  VITE_FIREBASE_APP_ID='your_app_id'
  ```
- **Important:** Restart your dev server after adding/changing `.env.local` variables!

**2. Service Worker Not Registering:**
- Check if `public/firebase-messaging-sw.js` exists
- Check browser console for service worker errors
- Verify file is accessible: `http://localhost:5173/firebase-messaging-sw.js`

**3. Notifications Not Showing:**
- Check browser notification settings (browser should allow notifications)
- Some browsers block notifications if site is not secure (HTTPS) or localhost
- Try a different browser (Chrome/Edge work best)

**4. Permission Denied:**
- Check browser's notification settings for your site
- For Chrome: Settings → Privacy → Notifications
- Click "Reset permissions" for localhost if needed

## Testing in Real Scenarios

### Test Message Notification:
1. Open inbox (`/inbox`)
2. Send a message from another user/guest
3. You should receive a notification

### Test Reminder Notification:
1. Receive a message
2. Wait 5 minutes without responding
3. You should receive a reminder notification

### Test Performance Warning:
1. As supervisor/manager, rate an associate with 1-2 stars
2. The associate should receive a performance warning notification

### Test Admin Warning:
1. As super-admin, go to `/admin-warnings`
2. Select a user and send a warning
3. That user should receive a notification

## Browser Console Commands

Open browser console (F12) and try:

```javascript
// Check if notification permission is granted
console.log('Permission:', Notification.permission);

// Check for FCM token
console.log('FCM Token:', localStorage.getItem('fcmToken'));

// Check service worker
navigator.serviceWorker.getRegistration().then(reg => console.log('SW:', reg));

// Check environment variables (after page loads)
console.log('VAPID Key set:', !!import.meta.env.VITE_FIREBASE_VAPID_KEY);
```

## Troubleshooting Checklist

- [ ] `.env.local` file exists in project root
- [ ] All Firebase env variables are set
- [ ] Dev server restarted after adding env variables
- [ ] Browser notification permission is "granted"
- [ ] Service worker file exists at `public/firebase-messaging-sw.js`
- [ ] No errors in browser console
- [ ] FCM token appears in console after requesting permission
- [ ] Test notifications appear when clicking test buttons

## Next Steps After Testing

Once notifications work in the test page:

1. **Test in actual inbox**: Send a real message and see if notification appears
2. **Test reminder**: Wait 5 minutes after receiving a message
3. **Test performance warning**: Rate someone poorly as supervisor
4. **Test admin warning**: Send warning as super-admin

## Production Checklist

Before deploying:
- [ ] Set all Firebase env variables in production environment
- [ ] Update `public/firebase-messaging-sw.js` with production Firebase config
- [ ] Use HTTPS (required for service workers and push notifications)
- [ ] Test on actual devices, not just desktop browsers
- [ ] Set up backend FCM token storage for production


