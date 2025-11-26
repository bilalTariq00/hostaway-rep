# Building for Production with Push Notifications

## Environment Variables Setup

Create a `.env.local` file (for development) or set environment variables in your production environment:

```bash
# Required for FCM (push notifications via Firebase)
VITE_FIREBASE_VAPID_KEY='your-vapid-key-here'

# Optional but recommended for full FCM functionality
VITE_FIREBASE_API_KEY='your-api-key'
VITE_FIREBASE_AUTH_DOMAIN='hostaway-918b7.firebaseapp.com'
VITE_FIREBASE_MESSAGING_SENDER_ID='108389266548124784838'
VITE_FIREBASE_APP_ID='your-app-id'
```

## Graceful Degradation

The app is designed to work **even without Firebase configuration**:

1. **With full Firebase config**: Full FCM push notifications
2. **With only VAPID key**: FCM push notifications work
3. **Without Firebase**: Falls back to browser notifications only (still works!)

## Building

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The built files will be in the `dist/` directory
```

## Important Notes for Production

### 1. Service Worker File
The service worker (`public/firebase-messaging-sw.js`) will be copied to `dist/` during build.
Make sure it's accessible at `/firebase-messaging-sw.js` when deployed.

### 2. HTTPS Required
- Service workers require HTTPS (or localhost)
- Push notifications require HTTPS (or localhost)
- Make sure your production site uses HTTPS

### 3. Environment Variables in Production

For different hosting platforms:

**Vercel:**
- Go to Project Settings → Environment Variables
- Add all `VITE_*` variables

**Netlify:**
- Go to Site Settings → Build & Deploy → Environment
- Add all `VITE_*` variables

**Railway:**
- Go to Project Settings → Variables
- Add all `VITE_*` variables

**Docker:**
```dockerfile
ENV VITE_FIREBASE_VAPID_KEY=your-key
ENV VITE_FIREBASE_API_KEY=your-key
# ... etc
```

### 4. Update Service Worker for Production

Before building, update `public/firebase-messaging-sw.js` with your production Firebase config:

```javascript
const firebaseConfig = {
  projectId: 'hostaway-918b7',
  apiKey: 'YOUR_PRODUCTION_API_KEY',
  authDomain: 'hostaway-918b7.firebaseapp.com',
  messagingSenderId: '108389266548124784838',
  appId: 'YOUR_PRODUCTION_APP_ID',
};
```

**Note**: Service workers can't access environment variables, so you need to hardcode or use a build script.

## Testing the Build Locally

```bash
# Build
npm run build

# Preview the build
npm start

# Or use a simple HTTP server
cd dist
python3 -m http.server 8080
# Then open http://localhost:8080
```

## Verification Checklist

Before deploying, verify:

- [ ] All environment variables are set in production
- [ ] `firebase-messaging-sw.js` has correct production config
- [ ] HTTPS is configured (required for service workers)
- [ ] Build completes without errors
- [ ] Service worker registers correctly in production
- [ ] Notifications work (even if just browser notifications)

## Troubleshooting Build Issues

### Build Fails
- Check for TypeScript errors: `npm run build` will show them
- Ensure all imports are correct

### Service Worker Not Found
- Verify `public/firebase-messaging-sw.js` exists
- Check build output includes the file in `dist/`

### Notifications Not Working After Build
- Check browser console for errors
- Verify HTTPS is enabled
- Check that environment variables are accessible
- Verify service worker is registered (DevTools → Application → Service Workers)

## Production Deployment

The notification system will:
1. ✅ Work with full Firebase config (best experience)
2. ✅ Work with just VAPID key (good experience)
3. ✅ Work with browser notifications only (basic experience)

Users will get notifications regardless of Firebase configuration level!


