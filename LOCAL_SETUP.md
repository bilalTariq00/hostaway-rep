# Local Development Setup (No Railway Needed!)

## Architecture

```
React Frontend (localhost:3039) 
    ↓ API Calls
Node.js Backend (localhost:3001) 
    ↓ Database Queries
MongoDB Atlas (Cloud Database)
```

## Step 1: Update Frontend to Use Local Backend

Your `.env.local` should have:
```env
# Remove or comment out these lines:
# VITE_API_URL=https://server-production-f979.up.railway.app
# VITE_SOCKET_URL=https://server-production-f979.up.railway.app

# Frontend will automatically use localhost:3001 in development mode
```

The frontend is already configured to use `http://localhost:3001` in development mode!

## Step 2: Set Up Backend Environment

Create a `.env` file in the root directory (not `.env.local`):

```env
MONGO_DB_URI=mongodb+srv://bilal002ta_db_user:LkO92QHxyMuRlT3O@cluster0.nqa39gl.mongodb.net/
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
NODE_ENV=development
```

**Note**: Use the same MongoDB URI from your `.env.local` file.

## Step 3: Install Dependencies (if not already done)

```bash
npm install
```

## Step 4: Start the Backend Server

```bash
# Start just the backend
npm run server

# OR start both frontend and backend together
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0-shard-00-00.nqa39gl.mongodb.net
Socket.IO server running on port 3001
✅ Auth routes registered at /api/auth
```

## Step 5: Start the Frontend (if not using `npm run dev`)

In a separate terminal:
```bash
npm run dev:client
```

## Step 6: Test It!

1. Open browser: `http://localhost:3039`
2. Try to login
3. Check backend terminal for logs

## Benefits of Local Development

✅ **Faster** - No deployment needed  
✅ **Easier debugging** - See logs in terminal  
✅ **Free** - No Railway costs  
✅ **Full control** - Change code and restart instantly  

## Troubleshooting

### Backend won't start
- Check if port 3001 is already in use
- Verify MongoDB URI is correct
- Check `.env` file exists and has `MONGO_DB_URI`

### Can't connect to MongoDB
- Verify MongoDB Atlas network access allows `0.0.0.0/0` (all IPs)
- Check MongoDB URI is correct
- Check internet connection

### CORS errors
- The CORS fix in `server.js` already allows `localhost:3039`
- Make sure backend is running on port 3001

## Quick Start Commands

```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm run dev:client

# OR use one command for both:
npm run dev
```

## Environment Files Summary

### `.env` (Backend - Root directory)
```env
MONGO_DB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=development
```

### `.env.local` (Frontend - Root directory)
```env
# Remove Railway URLs - frontend will use localhost:3001 automatically
# VITE_API_URL=https://server-production-f979.up.railway.app
# VITE_SOCKET_URL=https://server-production-f979.up.railway.app
```

The frontend automatically uses `http://localhost:3001` in development mode!

