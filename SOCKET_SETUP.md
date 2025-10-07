# Socket.IO Real-time Messaging Setup

This guide will help you set up Socket.IO for real-time messaging in your inbox application.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Server Setup

1. **Install server dependencies:**
   ```bash
   # Copy the server package.json
   cp server-package.json package.json
   
   # Install dependencies
   npm install
   ```

2. **Start the Socket.IO server:**
   ```bash
   # For development (with auto-restart)
   npm run dev
   
   # Or for production
   npm start
   ```

   The server will run on `http://localhost:3001`

## Client Configuration

The client is already configured to connect to the Socket.IO server. The connection URL can be configured via environment variables:

1. **Create a `.env` file in the root directory:**
   ```env
   VITE_SOCKET_URL=http://localhost:3001
   ```

2. **If no environment variable is set, it defaults to `http://localhost:3001`**

## Features Implemented

### Real-time Messaging
- ✅ Send and receive messages in real-time
- ✅ Message read status indicators
- ✅ Connection status indicator
- ✅ Typing indicators (ready for implementation)
- ✅ User online/offline status

### Socket Events

**Client to Server:**
- `send_message` - Send a new message
- `mark_as_read` - Mark messages as read
- `typing` - Send typing indicator
- `user_status` - Update user online status
- `join_conversation` - Join a conversation room

**Server to Client:**
- `new_message` - Receive new messages
- `message_read` - Message read confirmation
- `typing` - Receive typing indicators
- `user_status` - User status updates

## Testing the Real-time Features

1. **Start both the React app and Socket.IO server:**
   ```bash
   # Terminal 1 - Socket.IO server
   npm run dev
   
   # Terminal 2 - React app
   npm run dev
   ```

2. **Open multiple browser tabs/windows** to simulate different users

3. **Send messages** and see them appear in real-time across all connected clients

## Customization

### Adding New Message Types
You can extend the message interface in `src/hooks/use-messages.ts`:

```typescript
export interface Message {
  // ... existing fields
  messageType?: 'text' | 'image' | 'file' | 'location' | 'system';
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
}
```

### Adding Typing Indicators
The typing functionality is already set up. To enable it, add this to your message input:

```typescript
const [isTyping, setIsTyping] = useState(false);

// In your input onChange handler
const handleInputChange = (e) => {
  setNewMessage(e.target.value);
  
  if (!isTyping) {
    setIsTyping(true);
    emit('typing', { conversationId, userId: 'current-user', isTyping: true });
  }
  
  // Clear typing indicator after 3 seconds
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    setIsTyping(false);
    emit('typing', { conversationId, userId: 'current-user', isTyping: false });
  }, 3000);
};
```

### Adding File Uploads
To add file upload support, you can extend the message interface and add file handling in the Socket.IO server.

## Troubleshooting

### Connection Issues
- Check that the Socket.IO server is running on the correct port
- Verify the `VITE_SOCKET_URL` environment variable
- Check browser console for connection errors

### Messages Not Appearing
- Ensure both client and server are running
- Check that users are in the same conversation room
- Verify Socket.IO events are being emitted correctly

### Performance Issues
- Consider implementing message pagination for large conversations
- Add message caching for better performance
- Implement message compression for large payloads

## Production Deployment

For production deployment:

1. **Update the Socket.IO server URL** in your environment variables
2. **Configure CORS** properly for your domain
3. **Add authentication** to Socket.IO connections
4. **Implement rate limiting** to prevent spam
5. **Add message persistence** to a database
6. **Configure Redis** for horizontal scaling

## Security Considerations

- Add authentication middleware to Socket.IO
- Validate all incoming messages
- Implement rate limiting
- Sanitize user input
- Use HTTPS in production
- Implement proper CORS policies
