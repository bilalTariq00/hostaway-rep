import React, { useState, useEffect } from 'react';
import { Bell, Send, XCircle, CheckCircle, AlertCircle } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { useAuth } from 'src/contexts/auth-context';
import { DashboardContent } from 'src/layouts/dashboard';
import { useNotifications } from 'src/contexts/notification-context';
import {
  getStoredFCMToken,
  registerServiceWorker,
  requestNotificationPermission,
} from 'src/services/firebase-config';
import {
  notifyAdminWarning,
  notifyMessageReceived,
  notifyMessageReminder,
  notifyPerformanceWarning,
} from 'src/services/notification-service';

import { InPageNotification } from 'src/components/in-page-notification';

export function NotificationTestPage() {
  const theme = useTheme();
  const { user } = useAuth();
  const {
    isPermissionGranted,
    requestPermission,
    sendMessageNotification,
    sendReminderNotification,
    sendPerformanceWarning,
    sendAdminWarning,
  } = useNotifications();

  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [serviceWorkerStatus, setServiceWorkerStatus] = useState<string>('checking...');
  const [testMessage, setTestMessage] = useState('This is a test notification');
  const [notificationSupported, setNotificationSupported] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<Array<{ type: string; status: 'success' | 'error' | 'warning'; message: string }>>([]);
  const [showInPageNotification, setShowInPageNotification] = useState(false);
  const [inPageNotificationData, setInPageNotificationData] = useState<{ title: string; body: string; type: 'info' | 'success' | 'warning' | 'error' } | null>(null);

  // Check browser support
  useEffect(() => {
    const isSupported = 'Notification' in window && 'serviceWorker' in navigator;
    setNotificationSupported(isSupported);
  }, []);

  // Check FCM token and permission
  useEffect(() => {
    const token = getStoredFCMToken();
    setFcmToken(token);
    
    // Check permission status
    const permission = localStorage.getItem('notificationPermission');
    console.log('🔍 [Test] Current permission:', Notification.permission);
    console.log('🔍 [Test] Stored permission:', permission);
    console.log('🔍 [Test] FCM Token in storage:', token ? 'Found' : 'Not found');
      console.log('🔍 [Test] Environment check:');
      console.log('  - VAPID_KEY:', import.meta.env.VITE_FIREBASE_VAPID_KEY ? 'Set' : 'Not set');
      // Check actual Firebase config values (not just env vars, since we have defaults)
      const hasApiKey = import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAXYIW2QyrQgPK28fJxioOU_rYfKBDgxZQ';
      const hasAppId = import.meta.env.VITE_FIREBASE_APP_ID || '1:192565803775:web:8ef706aec1e989a48e2aca';
      console.log('  - API_KEY:', hasApiKey ? 'Set (using default or env)' : 'Not set');
      console.log('  - APP_ID:', hasAppId ? 'Set (using default or env)' : 'Not set');
  }, []);

  // Check service worker status
  useEffect(() => {
    const checkServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            if (registration.active) {
              setServiceWorkerStatus('Active ✓');
            } else if (registration.installing) {
              setServiceWorkerStatus('Installing...');
            } else if (registration.waiting) {
              setServiceWorkerStatus('Waiting...');
            }
          } else {
            setServiceWorkerStatus('Not registered');
          }
        } catch (error) {
          setServiceWorkerStatus('Error: ' + (error as Error).message);
        }
      } else {
        setServiceWorkerStatus('Not supported');
      }
    };
    checkServiceWorker();
  }, []);

  // Request permission handler
  const handleRequestPermission = async () => {
    try {
      console.log('🔔 [Test] Requesting permission...');
      const token = await requestNotificationPermission();
      
      // Update token display
      const updatedToken = getStoredFCMToken();
      setFcmToken(updatedToken);
      
      // Check permission status
      const permission = localStorage.getItem('notificationPermission');
      const browserPermission = Notification.permission;
      
      if (browserPermission === 'granted') {
        if (token && token !== 'browser-only') {
          setTestResults((prev) => [
            ...prev,
            {
              type: 'Permission',
              status: 'success',
              message: `Notification permission granted! FCM Token received. (${token.substring(0, 20)}...)`,
            },
          ]);
        } else if (token === 'browser-only') {
          setTestResults((prev) => [
            ...prev,
            {
              type: 'Permission',
              status: 'success',
              message: 'Notification permission granted! Using browser notifications (FCM not configured - add API_KEY and APP_ID to .env.local for full FCM support).',
            },
          ]);
        } else {
          setTestResults((prev) => [
            ...prev,
            {
              type: 'Permission',
              status: 'warning',
              message: 'Notification permission granted, but FCM token not available. Browser notifications will work, but FCM push requires Firebase API_KEY, APP_ID, and VAPID_KEY in .env.local',
            },
          ]);
        }
      } else if (browserPermission === 'denied') {
        setTestResults((prev) => [
          ...prev,
          {
            type: 'Permission',
            status: 'error',
            message: 'Permission denied. Please enable notifications in your browser settings and try again.',
          },
        ]);
      } else {
        setTestResults((prev) => [
          ...prev,
          {
            type: 'Permission',
            status: 'error',
            message: 'Permission not granted. Please click "Allow" when prompted.',
          },
        ]);
      }
    } catch (error) {
      console.error('Error in handleRequestPermission:', error);
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Permission',
          status: 'error',
          message: `Error: ${(error as Error).message}`,
        },
      ]);
    }
  };

  // Test message notification
  const testMessageNotification = async () => {
    if (!user) {
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Message Notification',
          status: 'error',
          message: 'User not logged in',
        },
      ]);
      return;
    }

    // Check permission first
    if (Notification.permission !== 'granted') {
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Message Notification',
          status: 'error',
          message: `Permission not granted. Current status: ${Notification.permission}. Please click "Request Notification Permission" first.`,
        },
      ]);
      return;
    }

    try {
      await sendMessageNotification(user.id, 'Test User', testMessage, 'test-conversation-1');
      // Notification was dispatched (may show as browser or in-page)
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Message Notification',
          status: 'success',
          message: 'Message notification sent successfully! Check if notification appears.',
        },
      ]);
    } catch (error) {
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Message Notification',
          status: 'error',
          message: 'Failed to send notification. Check browser console for details.',
        },
      ]);
    }
  };

  // Test reminder notification
  const testReminderNotification = async () => {
    if (!user) {
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Reminder Notification',
          status: 'error',
          message: 'User not logged in',
        },
      ]);
      return;
    }

    if (Notification.permission !== 'granted') {
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Reminder Notification',
          status: 'error',
          message: `Permission not granted. Current status: ${Notification.permission}`,
        },
      ]);
      return;
    }

    try {
      await sendReminderNotification(user.id, 'Test User', 'test-conversation-1');
      // Notification was dispatched
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Reminder Notification',
          status: 'success',
          message: 'Reminder notification sent! Check if it appears (may be in system notification area or as in-page notification).',
        },
      ]);
    } catch (error) {
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Reminder Notification',
          status: 'error',
          message: 'Failed to send. Check browser console.',
        },
      ]);
    }
  };

  // Test direct browser notification (bypass service)
  const testDirectBrowserNotification = () => {
    if (Notification.permission !== 'granted') {
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Direct Browser Test',
          status: 'error',
          message: `Permission not granted. Status: ${Notification.permission}`,
        },
      ]);
      return;
    }

    try {
      console.log('🔔 [Test] Creating direct browser notification...');
      let notificationShowed = false;
      
      const notification = new Notification('Direct Browser Test', {
        body: 'This is a direct browser notification test. Can you see this?',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'direct-test',
        requireInteraction: true,
        silent: false,
      });

      notification.onshow = () => {
        notificationShowed = true;
        console.log('✅ [Test] Direct notification showed!');
        setTestResults((prev) => [
          ...prev,
          {
            type: 'Direct Browser Test',
            status: 'success',
            message: '✅ Browser notification appeared! If you can&apos;t see it, check system notification center.',
          },
        ]);
      };

      notification.onerror = (error) => {
        console.error('❌ [Test] Direct notification error:', error);
        setTestResults((prev) => [
          ...prev,
          {
            type: 'Direct Browser Test',
            status: 'error',
            message: `Error: ${error}`,
          },
        ]);
      };

      notification.onclose = () => {
        console.log('ℹ️ [Test] Direct notification closed');
      };

      // Check after a short delay if notification showed
      setTimeout(() => {
        if (!notificationShowed) {
          console.warn('⚠️ [Test] Notification may have been suppressed');
          // Show in-page notification as fallback
          setInPageNotificationData({
            title: 'Direct Browser Test',
            body: 'Browser notification was created but may be suppressed. Check system notification center or try minimizing the browser window.',
            type: 'warning',
          });
          setShowInPageNotification(true);
        }
      }, 500);
    } catch (error) {
      console.error('❌ [Test] Failed to create direct notification:', error);
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Direct Browser Test',
          status: 'error',
          message: `Failed: ${(error as Error).message}`,
        },
      ]);
    }
  };

  // Test performance warning
  const testPerformanceWarning = async () => {
    if (!user) return;
    try {
      await sendPerformanceWarning(user.id, 'Test Supervisor', 65, 'Test feedback message');
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Performance Warning',
          status: 'success',
          message: 'Performance warning notification sent successfully!',
        },
      ]);
    } catch (error) {
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Performance Warning',
          status: 'error',
          message: `Error: ${(error as Error).message}`,
        },
      ]);
    }
  };

  // Test admin warning
  const testAdminWarning = async () => {
    if (!user) return;
    try {
      await sendAdminWarning(user.id, 'Test Admin', testMessage);
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Admin Warning',
          status: 'success',
          message: 'Admin warning notification sent successfully!',
        },
      ]);
    } catch (error) {
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Admin Warning',
          status: 'error',
          message: `Error: ${(error as Error).message}`,
        },
      ]);
    }
  };

  // Test direct notification service
  const testDirectService = async (type: 'message' | 'reminder' | 'performance' | 'admin') => {
    if (!user) return;
    try {
      if (type === 'message') {
        await notifyMessageReceived(user.id, 'Test User', testMessage, 'test-conv');
      } else if (type === 'reminder') {
        await notifyMessageReminder(user.id, 'Test User', 'test-conv');
      } else if (type === 'performance') {
        await notifyPerformanceWarning(user.id, 'Test Supervisor', 65, 'Test feedback');
      } else if (type === 'admin') {
        await notifyAdminWarning(user.id, 'Test Admin', testMessage);
      }
      setTestResults((prev) => [
        ...prev,
        {
          type: `Direct ${type} Service`,
          status: 'success',
          message: `${type} notification sent via direct service!`,
        },
      ]);
    } catch (error) {
      setTestResults((prev) => [
        ...prev,
        {
          type: `Direct ${type} Service`,
          status: 'error',
          message: `Error: ${(error as Error).message}`,
        },
      ]);
    }
  };

  // Register service worker
  const handleRegisterServiceWorker = async () => {
    try {
      const registration = await registerServiceWorker();
      if (registration) {
        setServiceWorkerStatus('Registered ✓');
        setTestResults((prev) => [
          ...prev,
          {
            type: 'Service Worker',
            status: 'success',
            message: 'Service worker registered successfully!',
          },
        ]);
      }
    } catch (error) {
      setTestResults((prev) => [
        ...prev,
        {
          type: 'Service Worker',
          status: 'error',
          message: `Error: ${(error as Error).message}`,
        },
      ]);
    }
  };

  return (
    <>
      {/* In-page notification fallback */}
      {showInPageNotification && inPageNotificationData && (
        <InPageNotification
          title={inPageNotificationData.title}
          body={inPageNotificationData.body}
          type={inPageNotificationData.type}
          duration={8000}
          onClose={() => {
            setShowInPageNotification(false);
            setInPageNotificationData(null);
          }}
        />
      )}
      
      <DashboardContent maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Push Notification Test Page
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Test and verify your push notification setup
        </Typography>
      </Box>

      {/* Status Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                {notificationSupported ? (
                  <CheckCircle size={24} color={theme.palette.success.main} />
                ) : (
                  <XCircle size={24} color={theme.palette.error.main} />
                )}
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Browser Support
                  </Typography>
                  <Typography variant="h6">
                    {notificationSupported ? 'Supported' : 'Not Supported'}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                {isPermissionGranted ? (
                  <CheckCircle size={24} color={theme.palette.success.main} />
                ) : (
                  <AlertCircle size={24} color={theme.palette.warning.main} />
                )}
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Permission
                  </Typography>
                  <Typography variant="h6">
                    {isPermissionGranted ? 'Granted' : 'Not Granted'}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                {fcmToken ? (
                  <CheckCircle size={24} color={theme.palette.success.main} />
                ) : (
                  <XCircle size={24} color={theme.palette.error.main} />
                )}
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    FCM Token
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>
                    {fcmToken && fcmToken !== 'browser-only' ? (
                      <Box>
                        <Box>Present ✓</Box>
                        <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'success.main' }}>
                          {fcmToken.substring(0, 30)}...
                        </Typography>
                      </Box>
                    ) : fcmToken === 'browser-only' ? (
                      <Box sx={{ color: 'warning.main' }}>
                        Browser Only
                      </Box>
                    ) : (
                      'Not Found'
                    )}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                {serviceWorkerStatus.includes('✓') || serviceWorkerStatus.includes('Active') ? (
                  <CheckCircle size={24} color={theme.palette.success.main} />
                ) : (
                  <AlertCircle size={24} color={theme.palette.warning.main} />
                )}
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Service Worker
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: '0.9rem' }}>
                    {serviceWorkerStatus}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Setup Actions */}
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Setup" />
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Current Permission Status: <strong>{Notification.permission}</strong>
              </Typography>
              {Notification.permission === 'denied' && (
                <Box sx={{ p: 1.5, bgcolor: 'error.light + 20', borderRadius: 1, mb: 2 }}>
                  <Typography variant="body2" color="error.main" sx={{ fontWeight: 600, mb: 0.5 }}>
                    ⚠️ Permission Denied
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Notifications are blocked. Please enable them in your browser settings:
                    <br />• Chrome/Edge: Settings → Privacy → Site Settings → Notifications
                    <br />• Firefox: Settings → Privacy → Permissions → Notifications
                    <br />• Safari: Preferences → Websites → Notifications
                  </Typography>
                </Box>
              )}
              {Notification.permission === 'default' && (
                <Box sx={{ p: 1.5, bgcolor: 'info.light + 20', borderRadius: 1, mb: 2 }}>
                  <Typography variant="body2" color="info.main" sx={{ fontWeight: 600, mb: 0.5 }}>
                    ℹ️ Permission Not Requested
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Click the button below to request notification permission. You&apos;ll see a browser prompt.
                  </Typography>
                </Box>
              )}
              <Button 
                variant="contained" 
                onClick={handleRequestPermission} 
                startIcon={<Bell />}
                disabled={Notification.permission === 'denied'}
              >
                {Notification.permission === 'denied' 
                  ? 'Permission Denied - Enable in Browser Settings' 
                  : 'Request Notification Permission'}
              </Button>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Service Worker Status: {serviceWorkerStatus}
              </Typography>
              <Button variant="outlined" onClick={handleRegisterServiceWorker}>
                Register Service Worker
              </Button>
            </Box>
            {fcmToken && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  FCM Token:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    p: 1,
                    bgcolor: 'grey.100',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    wordBreak: 'break-all',
                  }}
                >
                  {fcmToken}
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Test Notifications */}
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Test Notifications" />
        <CardContent>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Test Message"
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              placeholder="Enter test message here..."
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={testMessageNotification}
                  startIcon={<Send />}
                  disabled={!isPermissionGranted || Notification.permission !== 'granted'}
                  title={Notification.permission !== 'granted' ? 'Please grant notification permission first' : 'Test notification'}
                >
                  Test Message
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={testReminderNotification}
                  startIcon={<Bell />}
                  disabled={!isPermissionGranted}
                >
                  Test Reminder
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={testPerformanceWarning}
                  startIcon={<AlertCircle />}
                  disabled={!isPermissionGranted}
                >
                  Test Performance
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={testAdminWarning}
                  startIcon={<AlertCircle />}
                  disabled={!isPermissionGranted}
                >
                  Test Admin Warning
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                ⚠️ Notifications Not Showing? Try This:
              </Typography>
              <Button 
                variant="contained" 
                color="warning"
                onClick={testDirectBrowserNotification}
                sx={{ mb: 2 }}
              >
                Test Direct Browser Notification
              </Button>
              <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 2 }}>
                This bypasses all services and directly calls the browser Notification API.
                <br />If this doesn&apos;t show, check:
                <br />• Browser notification settings (Do Not Disturb mode?)
                <br />• System notification settings
                <br />• Try minimizing and maximizing the browser window
                <br />• Check if notifications appear in system notification center
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Test Direct Service (Bypass Context):
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button size="small" variant="text" onClick={() => testDirectService('message')}>
                  Direct Message
                </Button>
                <Button size="small" variant="text" onClick={() => testDirectService('reminder')}>
                  Direct Reminder
                </Button>
                <Button size="small" variant="text" onClick={() => testDirectService('performance')}>
                  Direct Performance
                </Button>
                <Button size="small" variant="text" onClick={() => testDirectService('admin')}>
                  Direct Admin
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader title="Test Results" />
          <CardContent>
            <Stack spacing={1}>
              {testResults.map((result, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    bgcolor: result.status === 'success' ? theme.palette.success.light + '20' : theme.palette.error.light + '20',
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {result.status === 'success' ? (
                      <CheckCircle size={20} color={theme.palette.success.main} />
                    ) : (
                      <XCircle size={20} color={theme.palette.error.main} />
                    )}
                    <Chip
                      label={result.type}
                      size="small"
                      color={result.status === 'success' ? 'success' : 'error'}
                    />
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {result.message}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
            {testResults.length > 10 && (
              <Button
                size="small"
                onClick={() => setTestResults([])}
                sx={{ mt: 2 }}
              >
                Clear Results
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Debug Info */}
      <Card sx={{ mt: 3 }}>
        <CardHeader title="Debug Information" />
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Environment Variables (check console for actual values):
              </Typography>
              <Typography variant="body2" component="pre" sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1, fontSize: '0.85rem' }}>
                {`VITE_FIREBASE_VAPID_KEY: ${import.meta.env.VITE_FIREBASE_VAPID_KEY ? 'Set ✓' : 'Not set ✗'}`}
                {import.meta.env.VITE_FIREBASE_VAPID_KEY && `\n  Value: ${import.meta.env.VITE_FIREBASE_VAPID_KEY.substring(0, 30)}...`}
                {(() => {
                  // Check actual config (has defaults now)
                  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAXYIW2QyrQgPK28fJxioOU_rYfKBDgxZQ';
                  const appId = import.meta.env.VITE_FIREBASE_APP_ID || '1:192565803775:web:8ef706aec1e989a48e2aca';
                  return `\nVITE_FIREBASE_API_KEY: ${apiKey ? 'Set ✓ (default)' : 'Not set ✗ ⚠️ REQUIRED FOR FCM'}${import.meta.env.VITE_FIREBASE_API_KEY ? ' (env)' : ' (using default)'}
VITE_FIREBASE_AUTH_DOMAIN: ${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'hostaway-918b7.firebaseapp.com (default)'}
VITE_FIREBASE_MESSAGING_SENDER_ID: ${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '192565803775 (default)'}
VITE_FIREBASE_APP_ID: ${appId ? 'Set ✓ (default)' : 'Not set ✗ ⚠️ REQUIRED FOR FCM'}${import.meta.env.VITE_FIREBASE_APP_ID ? ' (env)' : ' (using default)'}`;
                })()}
              </Typography>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'warning.light + 20', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  ⚠️ Notifications Not Appearing?
                </Typography>
                <Typography variant="body2" component="div" sx={{ fontSize: '0.85rem' }}>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <li><strong>Check browser Do Not Disturb mode</strong> - Disable it if enabled</li>
                    <li><strong>Check system notification settings</strong> - Ensure browser can show notifications</li>
                    <li><strong>Try minimizing the browser window</strong> - Some browsers only show notifications when window is minimized</li>
                    <li><strong>Check system notification center</strong> - Notifications might be there but not popping up</li>
                    <li><strong>Chrome/Edge:</strong> Check chrome://settings/content/notifications</li>
                    <li><strong>Firefox:</strong> Check about:preferences#privacy → Notifications</li>
                    <li><strong>Try the &quot;Test Direct Browser Notification&quot; button</strong> above</li>
                  </Box>
                </Typography>
              </Box>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light + 20', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  ℹ️ FCM Token Not Found?
                </Typography>
                <Typography variant="body2" component="div" sx={{ fontSize: '0.85rem' }}>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <li>Add VITE_FIREBASE_API_KEY and VITE_FIREBASE_APP_ID to .env.local</li>
                    <li>Restart dev server after adding env variables</li>
                    <li>Browser notifications work even without FCM token!</li>
                  </Box>
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Check Browser Console for detailed logs
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Open DevTools (F12) → Console tab to see FCM token, service worker status, and any errors.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </DashboardContent>
    </>
  );
}

