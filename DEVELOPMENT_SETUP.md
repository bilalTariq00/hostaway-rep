# 🚀 Development Setup Guide

This project now runs both the Socket.IO server and React development server together with a single command!

## 📋 Prerequisites

- Node.js >= 20
- npm or yarn

## 🛠️ Installation

```bash
npm install
```

## 🚀 Development Commands

### Single Command (Recommended)
```bash
npm run dev
```
This runs both servers simultaneously:
- **Socket.IO Server**: `http://localhost:3001`
- **React App**: `http://localhost:5173`

### Individual Commands
```bash
# Run only Socket.IO server
npm run server

# Run only React dev server  
npm run client

# Run Socket.IO server in dev mode
npm run dev:server

# Run React dev server in dev mode
npm run dev:client
```

## 🌐 Access Points

- **Main App**: http://localhost:5173
- **Chat Interface**: http://localhost:5173/inbox
- **Socket.IO Server**: http://localhost:3001
- **Socket.IO Endpoint**: http://localhost:3001/socket.io/

## 🔧 How It Works

The `npm run dev` command uses `concurrently` to run both servers:

1. **Socket.IO Server** (`server.js`)
   - Handles real-time chat functionality
   - Manages WebSocket connections
   - Processes message events
   - Runs on port 3001

2. **React Dev Server** (Vite)
   - Serves the frontend application
   - Hot module replacement
   - TypeScript compilation
   - Runs on port 5173

## 📱 Testing the Chat

1. **Start both servers**:
   ```bash
   npm run dev
   ```

2. **Open the chat interface**:
   - Go to http://localhost:5173/inbox
   - Select different conversations (Polina, Yury, Monica, Alexandra)
   - Send messages and see real-time updates

3. **Test multi-user chat**:
   - Open multiple browser tabs
   - Select different conversations in each tab
   - Send messages and watch them sync in real-time

## 🚀 Vercel Deployment

The project is configured to deploy both frontend and Socket.IO server on Vercel:

### Configuration Files

- **`vercel.json`**: Routes Socket.IO traffic to the server and static files to the frontend
- **`server.js`**: Socket.IO server with proper port handling for Vercel

### Deployment Steps

1. **Connect to Vercel**:
   ```bash
   npx vercel
   ```

2. **Deploy**:
   ```bash
   npx vercel --prod
   ```

3. **Environment Variables** (if needed):
   - Set `PORT` environment variable in Vercel dashboard
   - Socket.IO server will automatically use Vercel's assigned port

### Vercel Configuration Details

The `vercel.json` file handles:
- **Socket.IO routes**: `/socket.io/*` → Socket.IO server
- **Static files**: All other routes → React app
- **Build process**: Separate builds for server and client

## 🔍 Troubleshooting

### Port Conflicts
If you get port conflicts:
```bash
# Kill existing processes
pkill -f "node server.js"
pkill -f "vite"

# Start fresh
npm run dev
```

### Socket Connection Issues
- Check that both servers are running
- Verify Socket.IO server is accessible at `http://localhost:3001/socket.io/`
- Check browser console for connection errors

### Build Issues
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

## 📊 Console Logging

Both servers provide detailed logging:

### Socket.IO Server Logs
```
Socket.IO server running on port 3001
User connected: abc123
📤 [SERVER] Message received: {...}
📡 [SERVER] Message broadcasted to conversation 4
```

### React App Logs (Browser Console)
```
📱 [4] Loaded 0 messages for conversation
📤 [4] Sending message: {...}
💾 [4] Stored 1 messages in conversation storage
📥 [4] Received message: {...}
⚡ [4] Response time: 1.23s
```

## 🎯 Features

- ✅ **Real-time messaging** with Socket.IO
- ✅ **Conversation-specific chat** (separate histories per user)
- ✅ **Response time calculation** and display
- ✅ **Typing indicators** and user presence
- ✅ **Message confirmation** system
- ✅ **Optimistic UI updates** for low latency
- ✅ **Detailed console logging** for debugging
- ✅ **Vercel deployment ready**

## 📝 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both Socket.IO server and React dev server |
| `npm run server` | Run only Socket.IO server |
| `npm run client` | Run only React dev server |
| `npm run build` | Build for production |
| `npm run start` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |

---

**🎉 You're all set! Run `npm run dev` and start building amazing real-time chat experiences!**
