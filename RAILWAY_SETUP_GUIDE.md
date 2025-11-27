# Railway Backend Setup Guide

## Understanding the Architecture

```
┌─────────────────┐         ┌──────────────┐         ┌──────────────┐
│   Your Browser  │ ───────> │   Railway     │ ───────> │ MongoDB Atlas│
│  (Frontend)     │  API    │  (Backend)    │  DB      │  (Database)  │
│ localhost:3039  │  Calls   │  server.js    │  Calls   │  Your Data   │
└─────────────────┘         └──────────────┘         └──────────────┘
```

- **Railway** = Hosts your Node.js backend server (`server.js`)
- **MongoDB Atlas** = Your database (stores users, tasks, etc.)
- **Your Frontend** = Makes API calls to Railway, Railway queries MongoDB Atlas

## Current Problem

1. ✅ Your local `server.js` has CORS fixes
2. ❌ Railway is still running OLD code (no CORS fixes)
3. ❌ Railway might not have `MONGO_DB_URI` environment variable set

## Step 1: Set MongoDB URI in Railway

Your `.env.local` has the MongoDB URI, but Railway needs it too!

### In Railway Dashboard:

1. Go to your Railway project: https://railway.app
2. Click on your service
3. **IMPORTANT: Set Root Directory to `backend/`**
   - Go to **Settings** → **Root Directory**
   - Set to: `backend`
   - This tells Railway where your backend code is located
4. Go to **Variables** tab
4. Add these environment variables:

```
MONGO_DB_URI=mongodb+srv://bilal002ta_db_user:LkO92QHxyMuRlT3O@cluster0.nqa39gl.mongodb.net/
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
PORT=3001
```

**Important**: Use the same MongoDB URI from your `.env.local` file.

## Step 2: Deploy Updated Code to Railway

### Option A: If Railway is connected to GitHub (Auto-deploy)

1. **Commit your changes:**
   ```bash
   git add backend/
   git commit -m "Reorganize backend into separate folder"
   git push origin main
   ```
   
   **Note**: The backend is now in the `backend/` folder, so make sure Railway's root directory is set to `backend/`

2. **Railway will auto-deploy** - Check Railway dashboard for deployment status

### Option B: Manual Deploy via Railway CLI

If you have Railway CLI installed:
```bash
railway up
```

### Option C: Deploy via Railway Dashboard

1. Go to Railway dashboard
2. Click on your service
3. Go to **Settings** → **Deploy**
4. Trigger a new deployment

## Step 3: Verify Deployment

After deployment, check Railway logs. You should see:
```
✅ MongoDB Connected: cluster0-shard-00-00.nqa39gl.mongodb.net
🔍 OPTIONS preflight request from: http://localhost:3039
✅ CORS: Allowing origin: http://localhost:3039
```

## Step 4: Test the API

After deployment, test the OPTIONS request:
```bash
curl -X OPTIONS https://server-production-f979.up.railway.app/api/auth/login \
  -H "Origin: http://localhost:3039" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Should return `204 No Content` with `Access-Control-Allow-Origin: http://localhost:3039`

## Quick Checklist

- [ ] MongoDB URI set in Railway environment variables
- [ ] JWT_SECRET set in Railway environment variables
- [ ] Updated `server.js` committed and pushed to GitHub
- [ ] Railway deployment completed successfully
- [ ] Railway logs show MongoDB connection successful
- [ ] OPTIONS request returns 204 (not 404)

## Common Issues

### Issue: "MONGO_DB_URI is not defined"
**Fix**: Add `MONGO_DB_URI` to Railway environment variables

### Issue: "OPTIONS returns 404"
**Fix**: Deploy the updated `server.js` with the OPTIONS handler

### Issue: "CORS error still happening"
**Fix**: 
1. Check Railway logs for CORS messages
2. Verify `http://localhost:3039` is in allowed origins
3. Clear browser cache and try again

## Environment Variables Summary

### Local Development (.env.local)
```
MONGO_DB_URI=mongodb+srv://...
VITE_API_URL=https://server-production-f979.up.railway.app
VITE_SOCKET_URL=https://server-production-f979.up.railway.app
```

### Railway (Backend Server)
```
MONGO_DB_URI=mongodb+srv://... (same as local)
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=3001
```

