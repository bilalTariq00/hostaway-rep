import React, { useState } from 'react';
import { Send, Users, AlertCircle } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';

import { DashboardContent } from 'src/layouts/dashboard';
import { useAuth, type User } from 'src/contexts/auth-context';
import { useNotifications } from 'src/contexts/notification-context';
import { useMessageQuality } from 'src/contexts/message-quality-context';

export function AdminWarningsPage() {
  const theme = useTheme();
  const { user } = useAuth();
  const { sendAdminWarning } = useNotifications();
  const { getAllWorkersPerformance } = useMessageQuality();
  
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [warningType, setWarningType] = useState<'associate' | 'supervisor' | 'manager'>('associate');
  const [sentWarnings, setSentWarnings] = useState<Array<{
    userId: string;
    userName: string;
    message: string;
    timestamp: Date;
  }>>([]);

  // Get all workers based on type
  const allWorkers = getAllWorkersPerformance();
  const filteredWorkers = allWorkers.filter(w => {
    if (warningType === 'associate') return w.role === 'associate';
    if (warningType === 'supervisor') return w.role === 'supervisor';
    if (warningType === 'manager') return w.role === 'manager';
    return false;
  });

  const handleSendWarning = () => {
    if (!selectedUserId || !warningMessage.trim() || !user) {
      return;
    }

    const selectedWorker = allWorkers.find(w => w.workerId === selectedUserId);
    if (!selectedWorker) return;

    // Send the warning notification
    sendAdminWarning(selectedUserId, user.name, warningMessage);

    // Track sent warning
    setSentWarnings(prev => [...prev, {
      userId: selectedUserId,
      userName: selectedWorker.workerName,
      message: warningMessage,
      timestamp: new Date(),
    }]);

    // Reset form
    setSelectedUserId('');
    setWarningMessage('');
  };

  // Load created users from localStorage for better user selection
  const [createdUsers, setCreatedUsers] = useState<User[]>([]);
  
  React.useEffect(() => {
    const stored = localStorage.getItem('createdUsers');
    if (stored) {
      setCreatedUsers(JSON.parse(stored));
    }
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Send Warning Notifications
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Send push notifications to team members as warnings or alerts
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Send Warning Form */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AlertCircle size={20} color={theme.palette.warning.main} />
                  <Typography variant="h6">Send Warning</Typography>
                </Box>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Recipient Type</InputLabel>
                  <Select
                    value={warningType}
                    label="Recipient Type"
                    onChange={(e) => {
                      setWarningType(e.target.value as 'associate' | 'supervisor' | 'manager');
                      setSelectedUserId(''); // Reset selection when type changes
                    }}
                  >
                    <MenuItem value="associate">Associate</MenuItem>
                    <MenuItem value="supervisor">Supervisor</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Select Recipient</InputLabel>
                  <Select
                    value={selectedUserId}
                    label="Select Recipient"
                    onChange={(e) => setSelectedUserId(e.target.value)}
                  >
                    {filteredWorkers.map((worker) => (
                      <MenuItem key={worker.workerId} value={worker.workerId}>
                        {worker.workerName} ({worker.role})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Warning Message"
                  placeholder="Enter warning message here..."
                  value={warningMessage}
                  onChange={(e) => setWarningMessage(e.target.value)}
                />

                <Button
                  variant="contained"
                  startIcon={<Send size={20} />}
                  onClick={handleSendWarning}
                  disabled={!selectedUserId || !warningMessage.trim()}
                  sx={{
                    alignSelf: 'flex-start',
                    px: 3,
                  }}
                >
                  Send Warning Notification
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sent Warnings History */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Users size={20} color={theme.palette.primary.main} />
                  <Typography variant="h6">Sent Warnings</Typography>
                </Box>
              }
            />
            <CardContent>
              {sentWarnings.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  No warnings sent yet
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {sentWarnings.slice().reverse().map((warning, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        backgroundColor: theme.palette.warning.light + '08',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Avatar sx={{ bgcolor: 'warning.main', width: 32, height: 32 }}>
                          {warning.userName.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {warning.userName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {warning.timestamp.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {warning.message}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}


