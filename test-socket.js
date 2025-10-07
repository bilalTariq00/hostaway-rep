// Simple test script to verify Socket.IO connection
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('✅ Connected to Socket.IO server');
  
  // Test sending a message
  socket.emit('send_message', {
    conversationId: 'test-conversation',
    message: {
      id: 'test-1',
      conversationId: 'test-conversation',
      senderId: 'test-user',
      senderName: 'Test User',
      senderType: 'host',
      message: 'Hello from test script!',
      timestamp: new Date().toISOString(),
      isRead: false
    }
  });
  
  console.log('📤 Test message sent');
});

socket.on('new_message', (data) => {
  console.log('📨 Received message:', data);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from server');
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
});

// Keep the script running
setTimeout(() => {
  console.log('🔄 Test completed, disconnecting...');
  socket.disconnect();
  process.exit(0);
}, 5000);
