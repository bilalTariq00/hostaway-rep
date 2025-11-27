import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import autoTaskRoutes from './routes/autoTasks.js';
import checklistTemplateRoutes from './routes/checklistTemplates.js';
import uploadRoutes from './routes/uploads.js';
import userRoutes from './routes/users.js';
import listingRoutes from './routes/listings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all origins
// IMPORTANT: For development, we allow all origins. For production, restrict this.
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✅ CORS: Allowing request with no origin');
      return callback(null, true);
    }
    
    const allowedOrigins = [
      "http://localhost:3039",
      "http://localhost:5173", // Vite dev server
      /\.vercel\.app$/, // Allow all Vercel deployments (production, preview, etc.)
      /\.onrender\.com$/ // Allow Render deployments for testing
    ];
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      console.log(`✅ CORS: Allowing origin: ${origin}`);
      callback(null, true);
    } else {
      console.log(`⚠️  CORS: Unknown origin: ${origin} - ALLOWING for now (restrict in production)`);
      // Temporarily allow all origins for debugging - restrict in production
      callback(null, true);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly for all routes
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  console.log(`🔍 OPTIONS preflight request from: ${origin}`);
  console.log(`   Path: ${req.path}`);
  console.log(`   Method: ${req.method}`);
  
  // Allow any origin for OPTIONS (browser will enforce actual request)
  res.header('Access-Control-Allow-Origin', origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  res.sendStatus(204);
});

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3039",
      /\.vercel\.app$/, // Allow all Vercel deployments (production, preview, etc.)
      /\.onrender\.com$/ // Allow Render deployments for testing
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Store connected users and their status
const connectedUsers = new Map();
const userPresence = new Map(); // userId -> { status: 'online'|'offline', lastSeen: timestamp }

// Response rate tracking
const pendingMessages = new Map(); // messageId -> { senderId, receiverId, sentAt, conversationId }
const responseStats = new Map(); // conversationId -> { totalSent: number, totalResponses: number, responseRate: number }
const responseTimeWindow = 5 * 60 * 1000; // 5 minutes in milliseconds

// Helper function to check if a message is a response to a pending message
function checkIfResponse(newMessage, conversationId) {
  const conversationPendingMessages = Array.from(pendingMessages.values())
    .filter(msg => msg.conversationId === conversationId && msg.receiverId === newMessage.senderId);
  
  for (const pendingMsg of conversationPendingMessages) {
    const timeDiff = newMessage.sentAt - pendingMsg.sentAt;
    if (timeDiff > 0 && timeDiff <= responseTimeWindow) {
      return {
        isResponse: true,
        originalMessageId: pendingMsg.messageId,
        responseTime: timeDiff
      };
    }
  }
  return { isResponse: false };
}

// Helper function to update response statistics
function updateResponseStats(conversationId, isResponse = false) {
  if (!responseStats.has(conversationId)) {
    responseStats.set(conversationId, { totalSent: 0, totalResponses: 0, responseRate: 0 });
  }
  
  const stats = responseStats.get(conversationId);
  stats.totalSent++;
  
  if (isResponse) {
    stats.totalResponses++;
  }
  
  stats.responseRate = (stats.totalResponses / stats.totalSent) * 100;
  
  console.log(`📊 [RESPONSE STATS] Conversation ${conversationId}: ${stats.totalResponses}/${stats.totalSent} responses (${stats.responseRate.toFixed(1)}%)`);
  
  return stats;
}

// Helper function to clean up old pending messages
function cleanupOldPendingMessages() {
  const now = Date.now();
  for (const [messageId, message] of pendingMessages.entries()) {
    if (now - message.sentAt > responseTimeWindow) {
      pendingMessages.delete(messageId);
    }
  }
}

// Clean up old messages every minute
setInterval(cleanupOldPendingMessages, 60 * 1000);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining a conversation
  socket.on('join_conversation', (data) => {
    const { conversationId, userId } = data;
    socket.join(conversationId);
    connectedUsers.set(socket.id, { userId, conversationId });
    
    // Update user presence
    userPresence.set(userId, { 
      status: 'online', 
      lastSeen: Date.now(),
      socketId: socket.id 
    });
    
    // Notify others in the conversation about user coming online
    socket.to(conversationId).emit('user_status', {
      userId,
      status: 'online',
      timestamp: Date.now()
    });
    
    console.log(`User ${userId} joined conversation ${conversationId}`);
  });

  // Handle typing indicators
  socket.on('typing', (data) => {
    const { conversationId, userId, isTyping } = data;
    socket.to(conversationId).emit('typing', {
      conversationId,
      userId,
      isTyping,
      timestamp: Date.now()
    });
  });

  // Handle user status updates
  socket.on('user_status_update', (data) => {
    const { userId, status } = data;
    userPresence.set(userId, { 
      status, 
      lastSeen: Date.now(),
      socketId: socket.id 
    });
    
    // Broadcast status to all conversations the user is in
    const userConversations = Array.from(connectedUsers.values())
      .filter(user => user.userId === userId)
      .map(user => user.conversationId);
    
    userConversations.forEach(conversationId => {
      socket.to(conversationId).emit('user_status', {
        userId,
        status,
        timestamp: Date.now()
      });
    });
  });

  // Handle sending messages (legacy)
  socket.on('send_message', (data) => {
    const { conversationId, message } = data;
    console.log('Message received:', message);
    
    // Broadcast message to all users in the conversation
    io.to(conversationId).emit('new_message', {
      conversationId,
      message: {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      }
    });
  });

  // Handle new chat messages with response time calculation
  socket.on('message:send', (data) => {
    const { messageId, senderId, receiverId, message, sentAt, conversationId } = data;
    const receivedAt = Date.now();
    
    // Check if this is a response to a previous message
    const responseCheck = checkIfResponse({ senderId, sentAt }, conversationId);
    
    console.log(`📤 [SERVER] Message received:`, {
      messageId,
      senderId,
      receiverId,
      message,
      conversationId,
      sentAt: new Date(sentAt).toLocaleTimeString(),
      receivedAt: new Date(receivedAt).toLocaleTimeString(),
      processingTime: `${receivedAt - sentAt}ms`,
      isResponse: responseCheck.isResponse,
      responseTime: responseCheck.isResponse ? `${responseCheck.responseTime}ms` : 'N/A'
    });
    
    // Update response statistics
    if (conversationId) {
      const stats = updateResponseStats(conversationId, responseCheck.isResponse);
      
      // If this is a response, remove the original pending message
      if (responseCheck.isResponse) {
        pendingMessages.delete(responseCheck.originalMessageId);
        console.log(`🔄 [RESPONSE] Message ${messageId} is a response to ${responseCheck.originalMessageId} (${responseCheck.responseTime}ms)`);
      } else {
        // Store this message as pending for potential responses
        pendingMessages.set(messageId, {
          senderId,
          receiverId,
          sentAt,
          conversationId
        });
        console.log(`⏳ [PENDING] Message ${messageId} stored as pending for responses`);
      }
    }
    
    // Confirm message delivery to sender
    socket.emit('message:confirm', {
      messageId,
      status: 'delivered'
    });
    
    console.log(`✅ [SERVER] Message ${messageId} confirmed to sender ${senderId}`);
    
    // Broadcast to receiver (or all users in conversation)
    if (conversationId) {
      io.to(conversationId).emit('message:receive', {
        messageId,
        senderId,
        receiverId,
        message,
        sentAt,
        receivedAt,
        conversationId
      });
      console.log(`📡 [SERVER] Message ${messageId} broadcasted to conversation ${conversationId}`);
    } else {
      // Direct message to specific receiver
      io.emit('message:receive', {
        messageId,
        senderId,
        receiverId,
        message,
        sentAt,
        receivedAt,
        conversationId: null
      });
      console.log(`📡 [SERVER] Message ${messageId} sent directly to receiver ${receiverId}`);
    }
  });

  // Handle marking messages as read
  socket.on('mark_as_read', (data) => {
    const { conversationId } = data;
    io.to(conversationId).emit('message_read', {
      conversationId,
      messageId: data.messageId
    });
  });

  // Handle typing indicators
  socket.on('typing', (data) => {
    const { conversationId, userId, isTyping } = data;
    socket.to(conversationId).emit('typing', {
      conversationId,
      userId,
      isTyping
    });
  });

  // Handle user status updates
  socket.on('user_status', (data) => {
    const { userId, isOnline } = data;
    io.emit('user_status', { userId, isOnline });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      const { userId, conversationId } = user;
      
      // Update user presence to offline
      userPresence.set(userId, { 
        status: 'offline', 
        lastSeen: Date.now(),
        socketId: null 
      });
      
      // Notify others in the conversation about user going offline
      socket.to(conversationId).emit('user_status', {
        userId,
        status: 'offline',
        timestamp: Date.now()
      });
      
      console.log(`User ${userId} disconnected from conversation ${conversationId}`);
      connectedUsers.delete(socket.id);
    }
    console.log('User disconnected:', socket.id);
  });
});

// API endpoint to get response rate statistics
app.get('/api/response-stats', (req, res) => {
  const stats = {};
  for (const [conversationId, data] of responseStats.entries()) {
    stats[conversationId] = {
      ...data,
      pendingMessages: Array.from(pendingMessages.values())
        .filter(msg => msg.conversationId === conversationId).length
    };
  }
  
  res.json({
    success: true,
    data: stats,
    timestamp: new Date().toISOString()
  });
});

// API endpoint to get response stats for a specific conversation
app.get('/api/response-stats/:conversationId', (req, res) => {
  const { conversationId } = req.params;
  const stats = responseStats.get(conversationId);
  
  if (!stats) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found'
    });
  }
  
  const pendingCount = Array.from(pendingMessages.values())
    .filter(msg => msg.conversationId === conversationId).length;
  
  res.json({
    success: true,
    data: {
      ...stats,
      pendingMessages: pendingCount
    },
    timestamp: new Date().toISOString()
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Task routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auto-tasks', autoTaskRoutes);
app.use('/api/checklist-templates', checklistTemplateRoutes);

// User routes
app.use('/api/users', userRoutes);
console.log('✅ User routes registered at /api/users');
console.log('   Available endpoints:');
console.log('   - GET /api/users (get all users)');
console.log('   - GET /api/users/:id (get user by ID)');
console.log('   - GET /api/users/by-role/:role (get users by role)');

// Listing routes
app.use('/api/listings', listingRoutes);
console.log('✅ Listing routes registered at /api/listings');
console.log('   Available endpoints:');
console.log('   - GET /api/listings (get all listings)');
console.log('   - GET /api/listings/:id (get listing by ID)');
console.log('   - GET /api/listings/listing-id/:listingId (get by listingId)');
console.log('   - POST /api/listings (create listing - super-admin/manager)');
console.log('   - PUT /api/listings/:id (update listing - super-admin/manager)');
console.log('   - DELETE /api/listings/:id (delete listing - super-admin/manager)');
console.log('   - POST /api/listings/:id/archive (archive listing)');
console.log('   - POST /api/listings/:id/restore (restore listing)');

// File upload routes
app.use('/api/uploads', uploadRoutes);
console.log('✅ Upload routes registered at /api/uploads');
console.log('   Available endpoints:');
console.log('   - POST /api/uploads (upload single file)');
console.log('   - POST /api/uploads/multiple (upload multiple files)');
console.log('   - DELETE /api/uploads/:filename (delete file)');
console.log('   - GET /api/uploads/test (test endpoint)');

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
