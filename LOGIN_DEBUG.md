# Login API Call Debugging Guide

## Issue
Login API calls are not working properly.

## Changes Made

### 1. Enhanced Error Handling in `auth-context.tsx`
- Added detailed console logging for login attempts
- Added check for JSON response before parsing
- Better error messages for network failures
- Logs API URL being used
- Logs response status and headers

### 2. Improved Environment Detection in `environment.ts`
- Better detection of development vs production
- More detailed logging of environment variables
- Checks both `import.meta.env.DEV/PROD` and `MODE`

## How to Debug

### Step 1: Check Browser Console
Open browser DevTools → Console tab and look for:
- `🔐 Attempting login to: [URL]` - Shows the API URL being used
- `📡 Login response status: [status]` - Shows HTTP status
- `❌` messages - Shows specific errors

### Step 2: Check Network Tab
Open browser DevTools → Network tab:
1. Filter by "login"
2. Check the OPTIONS request (preflight) - should return `204`
3. Check the POST request - should return `200` with JSON response
4. Look at Request URL, Status Code, and Response

### Step 3: Common Issues

#### Issue: OPTIONS returns 404
**Solution**: The CORS fix in `server.js` should handle this. Make sure:
- Backend is redeployed with latest changes
- `app.options('*', ...)` handler is registered before routes

#### Issue: CORS Error
**Symptoms**: Console shows "CORS policy" error
**Solution**: 
- Check that your frontend origin is in the CORS allowed origins
- Check Railway logs for CORS blocking messages
- Temporarily, CORS allows all origins for debugging

#### Issue: Network Error
**Symptoms**: "Failed to fetch" or "NetworkError"
**Solution**:
- Verify API URL is correct: Check console for `🌐 API connecting to: [URL]`
- Verify backend is running: Check Railway dashboard
- Check if API URL has correct protocol (https vs http)

#### Issue: Wrong API URL
**Symptoms**: Requests going to wrong server
**Solution**:
- Check environment variables in Vercel:
  - `VITE_API_URL` should be `https://server-production-f979.up.railway.app`
  - `VITE_SOCKET_URL` should be `https://server-production-f979.up.railway.app`
- Rebuild frontend after setting env vars

#### Issue: Non-JSON Response
**Symptoms**: Console shows "Non-JSON response"
**Solution**:
- Check backend is returning JSON
- Check backend error logs
- Verify route is registered correctly

## Testing

### Test Login Locally
```bash
# Start backend
cd /path/to/backend
npm start

# In browser console, check:
# Should see: 🌐 API connecting to: http://localhost:3001
```

### Test Login in Production
```bash
# Check Vercel environment variables
# Should see: 🌐 API connecting to: https://server-production-f979.up.railway.app
```

### Manual API Test
```bash
curl -X POST https://server-production-f979.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Next Steps

1. **Check Console Logs**: Look for the detailed logging messages
2. **Check Network Tab**: Verify requests are being made correctly
3. **Check Backend Logs**: Look at Railway logs for server-side errors
4. **Verify Environment**: Make sure `VITE_API_URL` is set in Vercel

## Expected Console Output (Success)

```
🔌 Socket.IO connecting to: https://server-production-f979.up.railway.app
🌐 API connecting to: https://server-production-f979.up.railway.app
🏗️ Environment: production
🔐 Attempting login to: https://server-production-f979.up.railway.app/api/auth/login
📡 Login response status: 200 OK
📦 Login response data: {success: true, token: "...", user: {...}}
✅ Login successful!
```

## Expected Console Output (Failure)

```
🔐 Attempting login to: https://server-production-f979.up.railway.app/api/auth/login
📡 Login response status: 401 Unauthorized
❌ Login failed: Invalid email or password
```

