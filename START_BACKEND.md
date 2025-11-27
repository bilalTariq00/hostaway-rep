# How to Start Backend Server

## Problem
Frontend is trying to connect to `http://localhost:3001` but getting `ERR_CONNECTION_REFUSED` because the backend server is not running.

## Solution 1: Start Backend Server Locally (Recommended for Development)

### Step 1: Make sure you have dependencies installed
```bash
npm install
```

### Step 2: Check if you have a `.env` file with MongoDB connection
The server needs MongoDB connection string. Check if you have:
- `.env` file with `MONGODB_URI`
- Or set it as environment variable

### Step 3: Start the backend server
```bash
# Option A: Start just the backend server
npm run server

# Option B: Start both frontend and backend together
npm run dev
```

The server should start on port 3001 and you should see:
```
Socket.IO server running on port 3001
✅ Auth routes registered at /api/auth
```

### Step 4: Verify it's running
Open browser and go to: `http://localhost:3001/health`
You should see: `{"status":"ok","timestamp":"..."}`

## Solution 2: Use Production API (If you don't want to run backend locally)

If you want to use the Railway backend instead of running locally, you need to set environment variables:

### For Development:
Create a `.env.local` file in the root directory:
```env
VITE_API_URL=https://server-production-f979.up.railway.app
VITE_SOCKET_URL=https://server-production-f979.up.railway.app
```

Then restart your frontend dev server.

### For Production:
Set these in your Vercel environment variables:
- `VITE_API_URL=https://server-production-f979.up.railway.app`
- `VITE_SOCKET_URL=https://server-production-f979.up.railway.app`

## Quick Fix Right Now

**To start the backend server immediately:**

```bash
cd /Users/nc/Downloads/material-kit-react-main
npm run server
```

Keep this terminal open. The server will run and handle API requests.

Then in another terminal or your IDE, start the frontend:
```bash
npm run dev:client
```

Or use the combined command:
```bash
npm run dev
```

This will start both frontend and backend together.

