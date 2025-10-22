import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);

// Enable CORS for all origins
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
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

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
