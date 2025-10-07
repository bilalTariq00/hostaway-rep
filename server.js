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

// Store connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining a conversation
  socket.on('join_conversation', (data) => {
    const { conversationId, userId } = data;
    socket.join(conversationId);
    connectedUsers.set(socket.id, { userId, conversationId });
    console.log(`User ${userId} joined conversation ${conversationId}`);
  });

  // Handle sending messages
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
      console.log(`User ${user.userId} disconnected from conversation ${user.conversationId}`);
      connectedUsers.delete(socket.id);
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
