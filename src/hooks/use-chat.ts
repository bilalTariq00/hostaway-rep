import { useRef, useState, useEffect, useCallback } from 'react';

import { useSocket } from 'src/contexts/socket-context';

// ----------------------------------------------------------------------

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  sentAt: number;
  receivedAt?: number;
  responseTime?: number; // Calculated response time in seconds
  isOwn: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isConnected: boolean;
  error: string | null;
}

export interface ChatActions {
  sendMessage: (message: string, receiverId: string) => void;
  clearMessages: () => void;
  retryConnection: () => void;
  emitTyping: (isTyping: boolean) => void;
}

// ----------------------------------------------------------------------

// Global conversation storage to maintain separate message histories
const conversationMessages = new Map<string, ChatMessage[]>();

export function useChat(conversationId?: string, currentUserId?: string, initialMessages?: ChatMessage[]) {
  const { socket, isConnected, emit, on, off } = useSocket();
  
  // State management with optimized updates
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for performance optimization
  const lastMessageRef = useRef<ChatMessage | null>(null);
  const messageIdCounter = useRef(0);
  const pendingMessages = useRef<Map<string, ChatMessage>>(new Map());

  // Load conversation-specific messages or initial messages
  useEffect(() => {
    if (conversationId) {
      const conversationMsgs = conversationMessages.get(conversationId) || [];
      if (conversationMsgs.length > 0) {
        setMessages(conversationMsgs);
        console.log(`📱 [${conversationId}] Loaded ${conversationMsgs.length} messages for conversation`);
      } else if (initialMessages && initialMessages.length > 0) {
        // Load initial messages if no conversation messages exist
        setMessages(initialMessages);
        conversationMessages.set(conversationId, initialMessages);
        console.log(`📱 [${conversationId}] Loaded ${initialMessages.length} initial messages for conversation`);
      } else {
        setMessages([]);
        console.log(`📱 [${conversationId}] No messages found for conversation`);
      }
    }
  }, [conversationId, initialMessages]);

  // Generate unique message ID
  const generateMessageId = useCallback(() => `msg_${Date.now()}_${++messageIdCounter.current}`, []);

  // Calculate response time between messages
  const calculateResponseTime = useCallback((currentMessage: ChatMessage, previousMessage: ChatMessage | null): number | undefined => {
    if (!previousMessage || previousMessage.senderId === currentMessage.senderId) {
      return undefined; // No response time for first message or same sender
    }
    
    const responseTime = (currentMessage.receivedAt || currentMessage.sentAt) - previousMessage.sentAt;
    return Math.max(0, responseTime / 1000); // Convert to seconds, ensure non-negative
  }, []);

  // Optimized message sending with immediate UI update
  const sendMessage = useCallback((messageText: string, receiverId: string) => {
    if (!socket || !isConnected || !messageText.trim()) {
      setError('Not connected to server or empty message');
      return;
    }

    const messageId = generateMessageId();
    const sentAt = Date.now();
    
    // Create optimistic message
    const optimisticMessage: ChatMessage = {
      id: messageId,
      senderId: currentUserId || 'current-user',
      receiverId,
      message: messageText.trim(),
      sentAt,
      isOwn: true,
    };

    console.log(`📤 [${conversationId}] Sending message:`, {
      messageId,
      senderId: optimisticMessage.senderId,
      receiverId,
      message: messageText.trim(),
      sentAt: new Date(sentAt).toLocaleTimeString(),
      conversationId
    });

    // Store pending message for confirmation
    pendingMessages.current.set(messageId, optimisticMessage);

    // Optimistically add to UI immediately for low latency
    setMessages(prev => {
      const newMessages = [...prev, optimisticMessage];
      lastMessageRef.current = optimisticMessage;
      
      // Store in conversation-specific storage
      if (conversationId) {
        conversationMessages.set(conversationId, newMessages);
        console.log(`💾 [${conversationId}] Stored ${newMessages.length} messages in conversation storage`);
      }
      
      return newMessages;
    });

    // Emit to server
    emit('message:send', {
      messageId,
      senderId: optimisticMessage.senderId,
      receiverId,
      message: messageText.trim(),
      sentAt,
      conversationId,
    });

    // Clear any previous errors
    setError(null);
  }, [socket, isConnected, emit, conversationId, generateMessageId, currentUserId]);

  // Handle incoming messages with response time calculation
  const handleIncomingMessage = useCallback((data: {
    messageId: string;
    senderId: string;
    receiverId: string;
    message: string;
    sentAt: number;
    receivedAt: number;
    conversationId?: string;
  }) => {
    const receivedAt = Date.now();
    
    // Only process messages for the current conversation
    if (conversationId && data.conversationId !== conversationId) {
      console.log(`🚫 [${conversationId}] Ignoring message for different conversation: ${data.conversationId}`);
      return;
    }
    
    console.log(`📥 [${conversationId}] Received message:`, {
      messageId: data.messageId,
      senderId: data.senderId,
      receiverId: data.receiverId,
      message: data.message,
      sentAt: new Date(data.sentAt).toLocaleTimeString(),
      receivedAt: new Date(receivedAt).toLocaleTimeString(),
      conversationId
    });
    
    // Calculate response time
    const responseTime = calculateResponseTime(
      { id: data.messageId, ...data, receivedAt, isOwn: data.senderId === (currentUserId || 'current-user') },
      lastMessageRef.current
    );

    if (responseTime) {
      console.log(`⚡ [${conversationId}] Response time: ${responseTime.toFixed(2)}s`);
    }

    const newMessage: ChatMessage = {
      id: data.messageId,
      senderId: data.senderId,
      receiverId: data.receiverId,
      message: data.message,
      sentAt: data.sentAt,
      receivedAt,
      responseTime,
      isOwn: data.senderId === (currentUserId || 'current-user'),
    };

    // Update messages with response time
    setMessages(prev => {
      const updatedMessages = [...prev, newMessage];
      lastMessageRef.current = newMessage;
      
      // Store in conversation-specific storage
      if (conversationId) {
        conversationMessages.set(conversationId, updatedMessages);
        console.log(`💾 [${conversationId}] Updated conversation storage with ${updatedMessages.length} messages`);
      }
      
      return updatedMessages;
    });

    // Update pending message if it exists (confirmation)
    if (pendingMessages.current.has(data.messageId)) {
      pendingMessages.current.delete(data.messageId);
      console.log(`✅ [${conversationId}] Message ${data.messageId} confirmed and removed from pending`);
    }
  }, [calculateResponseTime, currentUserId, conversationId]);

  // Handle message confirmation from server
  const handleMessageConfirmation = useCallback((data: {
    messageId: string;
    status: 'delivered' | 'failed';
  }) => {
    if (data.status === 'failed') {
      setError('Failed to send message');
      // Remove failed message from UI
      setMessages(prev => prev.filter(msg => msg.id !== data.messageId));
      pendingMessages.current.delete(data.messageId);
    }
  }, []);

  // Clear all messages
  const clearMessages = useCallback(() => {
    console.log(`🗑️ [${conversationId}] Clearing all messages`);
    setMessages([]);
    lastMessageRef.current = null;
    pendingMessages.current.clear();
    setError(null);
    
    // Clear conversation-specific storage
    if (conversationId) {
      conversationMessages.delete(conversationId);
      console.log(`💾 [${conversationId}] Cleared conversation storage`);
    }
  }, [conversationId]);

  // Retry connection
  const retryConnection = useCallback(() => {
    if (socket && !isConnected) {
      socket.connect();
    }
  }, [socket, isConnected]);

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return undefined;

    // Listen for incoming messages
    on('message:receive', handleIncomingMessage);
    on('message:confirm', handleMessageConfirmation);

    return () => {
      off('message:receive', handleIncomingMessage);
      off('message:confirm', handleMessageConfirmation);
    };
  }, [socket, on, off, handleIncomingMessage, handleMessageConfirmation]);

  // Cleanup on unmount
  useEffect(() => () => {
      pendingMessages.current.clear();
    }, []);

  // Update connection status
  useEffect(() => {
    if (!isConnected && pendingMessages.current.size > 0) {
      setError('Connection lost. Messages may not be delivered.');
    } else if (isConnected) {
      setError(null);
    }
  }, [isConnected]);

  // Emit typing indicator
  const emitTyping = useCallback((isTyping: boolean) => {
    if (socket && isConnected && conversationId) {
      emit('typing', {
        conversationId,
        userId: currentUserId || 'current-user',
        isTyping,
      });
    }
  }, [socket, isConnected, emit, conversationId, currentUserId]);

  return {
    // State
    messages,
    isConnected,
    error,
    
    // Actions
    sendMessage,
    clearMessages,
    retryConnection,
    emitTyping,
  };
}
