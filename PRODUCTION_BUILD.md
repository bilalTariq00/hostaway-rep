# Production Build Guide

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The build output will be in the `dist` folder.

## Environment Variables for Production

**IMPORTANT**: In production, you MUST set these environment variables:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
VITE_FIREBASE_PROJECT_ID=hostaway-918b7
VITE_FIREBASE_AUTH_DOMAIN=hostaway-918b7.firebaseapp.com
VITE_FIREBASE_STORAGE_BUCKET=hostaway-918b7.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=192565803775
VITE_FIREBASE_MEASUREMENT_ID=G-W6MZ1LGS9Y
```

### Development vs Production

- **Development**: Uses default values if env vars are not set (for local testing)
- **Production**: Requires env vars to be set - app will not initialize Firebase without them

## Deployment

### Vercel
1. Set environment variables in Vercel dashboard
2. Deploy from GitHub/GitLab

### Railway
1. Set environment variables in Railway dashboard
2. Deploy from connected repository

### Other Platforms
Make sure environment variables are set before building:
```bash
export VITE_FIREBASE_API_KEY=...
export VITE_FIREBASE_APP_ID=...
# ... etc
npm run build
```

## Notification System

The notification system includes:
- **Browser notifications**: Primary method
- **In-page notifications**: Fallback when browser notifications are suppressed
- **FCM push notifications**: For background delivery (requires Firebase config)

## Build Checks

After building, verify:
1. ✅ Firebase initializes without errors (check browser console)
2. ✅ Service worker registers correctly
3. ✅ FCM token can be retrieved
4. ✅ Notifications work (test with notification test page)

## Troubleshooting

### Firebase not initializing in production
- Check that `VITE_FIREBASE_API_KEY` and `VITE_FIREBASE_APP_ID` are set
- Verify env vars are available at build time (not runtime)

### Notifications not showing
- Check browser notification permissions
- Use in-page notification fallback (automatic)
- Check console for errors


