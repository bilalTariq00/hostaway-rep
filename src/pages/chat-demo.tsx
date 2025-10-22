import { Send } from 'lucide-react';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { ChatInterface } from 'src/components/chat';

// ----------------------------------------------------------------------

export function ChatDemoView() {
  const [receiverId, setReceiverId] = useState('user-123');
  const [conversationId, setConversationId] = useState('conv-demo');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleStartChat = () => {
    if (receiverId.trim()) {
      setIsChatOpen(true);
    }
  };

  return (
    <DashboardContent>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Real-time Chat Demo
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Experience high-performance real-time messaging with response time calculation.
          Messages are sent instantly with optimistic UI updates for minimal latency.
        </Typography>

        {/* Configuration */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Chat Configuration
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Receiver ID"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                placeholder="Enter receiver ID"
                sx={{ flex: 1 }}
              />
              <TextField
                label="Conversation ID"
                value={conversationId}
                onChange={(e) => setConversationId(e.target.value)}
                placeholder="Enter conversation ID"
                sx={{ flex: 1 }}
              />
            </Box>

            <Button
              variant="contained"
              onClick={handleStartChat}
              startIcon={<Send size={20} />}
              disabled={!receiverId.trim()}
              sx={{ borderRadius: 2 }}
            >
              Start Chat
            </Button>
          </CardContent>
        </Card>

        {/* Features */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Features
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  ⚡ Low Latency
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Optimistic UI updates for instant message display
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  📊 Response Time
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Automatic calculation and display of response times
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  🔄 Real-time Sync
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Socket.IO powered real-time message delivery
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  📱 Typing Indicators
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Live typing status with debounced updates
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  🛡️ Error Handling
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Connection status monitoring and retry logic
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  🎨 Modern UI
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Beautiful Material-UI components with animations
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        {isChatOpen && (
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ height: '600px' }}>
                <ChatInterface
                  receiverId={receiverId}
                  conversationId={conversationId}
                  sx={{ height: '100%' }}
                />
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        {!isChatOpen && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                How to Test
              </Typography>
              
              <Box component="ol" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Open this page in multiple browser tabs or devices
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Use different receiver IDs to simulate different users
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Send messages and observe response time calculations
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Test typing indicators by typing in the input field
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Disconnect/reconnect to test error handling
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </DashboardContent>
  );
}
