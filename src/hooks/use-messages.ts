import { useState, useEffect, useCallback } from 'react';

import { useSocket } from 'src/contexts/socket-context';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderType: 'host' | 'guest';
  message: string;
  timestamp: string;
  isRead: boolean;
  messageType?: 'text' | 'image' | 'file';
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
}

export interface Conversation {
  id: string;
  name: string;
  origin: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  status: 'active' | 'archived' | 'snoozed';
  bookingDates: string;
  propertyName: string;
  statusIcon: 'hourglass' | 'unread' | 'read';
  participants: Array<{
    id: string;
    name: string;
    type: 'host' | 'guest';
    isOnline: boolean;
  }>;
}

export function useMessages(conversationId?: string) {
  const { socket, isConnected, emit, on, off } = useSocket();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load conversations
  const loadConversations = useCallback(async () => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      // For now, we'll simulate with mock data
      const mockConversations: Conversation[] = [
        {
          id: '1',
          name: 'Polina',
          origin: 'Airbnb',
          avatar: 'P',
          lastMessage: 'Hello! I wanted to check if it would b',
          timestamp: '19:36',
          unread: true,
          status: 'active',
          bookingDates: '27 Oct 25 → 01 Nov 25',
          propertyName: 'Elegant 2BR Apt | Balcony, AC, Near',
          statusIcon: 'hourglass',
          participants: [
            { id: 'host-1', name: 'Manuel Sciarria', type: 'host', isOnline: true },
            { id: 'guest-1', name: 'Polina', type: 'guest', isOnline: false }
          ]
        },
        {
          id: '2',
          name: 'Alexandra Kirkland',
          origin: 'Airbnb',
          avatar: 'A',
          lastMessage: 'Thank you for the wonderful stay!',
          timestamp: '19:22',
          unread: false,
          status: 'active',
          bookingDates: '15 Nov 25 → 20 Nov 25',
          propertyName: 'Modern Studio in City Center',
          statusIcon: 'read',
          participants: [
            { id: 'host-1', name: 'Manuel Sciarria', type: 'host', isOnline: true },
            { id: 'guest-2', name: 'Alexandra Kirkland', type: 'guest', isOnline: true }
          ]
        },
        {
          id: '3',
          name: 'Monica Dovarch',
          origin: 'Booking.com',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
          lastMessage: 'Is there parking available at the property?',
          timestamp: '18:45',
          unread: true,
          status: 'active',
          bookingDates: '05 Dec 25 → 10 Dec 25',
          propertyName: 'Luxury Penthouse with View',
          statusIcon: 'unread',
          participants: [
            { id: 'host-1', name: 'Manuel Sciarria', type: 'host', isOnline: true },
            { id: 'guest-3', name: 'Monica Dovarch', type: 'guest', isOnline: false }
          ]
        },
        {
          id: '4',
          name: 'Yury Burman',
          origin: 'Airbnb',
          avatar: 'Y',
          lastMessage: 'Can we check in early tomorrow?',
          timestamp: '17:30',
          unread: false,
          status: 'active',
          bookingDates: '22 Dec 25 → 28 Dec 25',
          propertyName: 'Cozy Apartment Near Metro',
          statusIcon: 'read',
          participants: [
            { id: 'host-1', name: 'Manuel Sciarria', type: 'host', isOnline: true },
            { id: 'guest-4', name: 'Yury Burman', type: 'guest', isOnline: true }
          ]
        }
      ];
      setConversations(mockConversations);
    } catch {
      setError('Failed to load conversations');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load messages for a specific conversation
  const loadMessages = useCallback(async (convId: string) => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      const mockMessages: Message[] = [
        {
          id: '1',
          conversationId: convId,
          senderId: 'host-1',
          senderName: 'Team Domus Feriae',
          senderType: 'host',
          message: `Dear Yury,

We hope you had a wonderful stay at our property! 🌟

As your hosts, we would be incredibly grateful if you could take a moment to leave us a 5-star review. Your feedback means the world to us and helps other travelers discover our beautiful space.

Reviews are crucial for hosts like us - they help us maintain our Superhost status and continue providing exceptional experiences for future guests.

If there's anything we could have done better, please let us know privately, and we'll make sure to improve for next time.

Thank you for choosing our property for your stay!

Warm regards. ❤️

Team Domus Feriae`,
          timestamp: '01 Sep 25 13:02',
          isRead: true
        }
      ];
      setMessages(mockMessages);
    } catch {
      setError('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback((messageText: string, targetConversationId: string) => {
    if (!socket || !isConnected) {
      setError('Not connected to server');
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId: targetConversationId,
      senderId: 'host-1',
      senderName: 'Manuel Sciarria',
      senderType: 'host',
      message: messageText,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    // Emit message to server
    emit('send_message', {
      conversationId: targetConversationId,
      message: newMessage
    });

    // Optimistically add message to local state
    setMessages(prev => [...prev, newMessage]);

    // Update conversation's last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === targetConversationId 
          ? { 
              ...conv, 
              lastMessage: messageText.length > 50 ? messageText.substring(0, 50) + '...' : messageText,
              timestamp: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })
            }
          : conv
      )
    );
  }, [socket, isConnected, emit]);

  // Mark message as read
  const markAsRead = useCallback((targetConversationId: string) => {
    if (!socket || !isConnected) return;

    emit('mark_as_read', { conversationId: targetConversationId });
    
    setConversations(prev => 
      prev.map(conv => 
        conv.id === targetConversationId 
          ? { ...conv, unread: false, statusIcon: 'read' as const }
          : conv
      )
    );
  }, [socket, isConnected, emit]);

  // Set up real-time listeners
  useEffect(() => {
    if (!socket) return undefined;

    // Listen for new messages
    const handleNewMessage = (data: { conversationId: string; message: Message }) => {
      setMessages(prev => {
        // Only add if it's for the current conversation
        if (data.conversationId === conversationId) {
          return [...prev, data.message];
        }
        return prev;
      });

      // Update conversation list
      setConversations(prev => 
        prev.map(conv => 
          conv.id === data.conversationId 
            ? { 
                ...conv, 
                lastMessage: data.message.message.length > 50 
                  ? data.message.message.substring(0, 50) + '...' 
                  : data.message.message,
                timestamp: new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                }),
                unread: data.message.senderType === 'guest',
                statusIcon: data.message.senderType === 'guest' ? 'unread' as const : 'read' as const
              }
            : conv
        )
      );
    };

    // Listen for message read status
    const handleMessageRead = (data: { conversationId: string; messageId: string }) => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === data.messageId 
            ? { ...msg, isRead: true }
            : msg
        )
      );
    };

    // Listen for typing indicators
    const handleTyping = (data: { conversationId: string; userId: string; isTyping: boolean }) => {
      // Handle typing indicators
      console.log('User typing:', data);
    };

    // Listen for user online status
    const handleUserStatus = (data: { userId: string; isOnline: boolean }) => {
      setConversations(prev => 
        prev.map(conv => ({
          ...conv,
          participants: conv.participants.map(participant => 
            participant.id === data.userId 
              ? { ...participant, isOnline: data.isOnline }
              : participant
          )
        }))
      );
    };

    on('new_message', handleNewMessage);
    on('message_read', handleMessageRead);
    on('typing', handleTyping);
    on('user_status', handleUserStatus);

    return () => {
      off('new_message', handleNewMessage);
      off('message_read', handleMessageRead);
      off('typing', handleTyping);
      off('user_status', handleUserStatus);
    };
  }, [socket, conversationId, on, off]);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
    return undefined;
  }, [loadConversations]);

  // Load messages when conversation changes
  useEffect(() => {
    if (conversationId) {
      loadMessages(conversationId);
    }
    return undefined;
  }, [conversationId, loadMessages]);

  return {
    conversations,
    messages,
    isLoading,
    error,
    isConnected,
    sendMessage,
    markAsRead,
    loadConversations,
    loadMessages
  };
}
