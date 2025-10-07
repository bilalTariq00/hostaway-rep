import React, { useState, useEffect } from 'react';
import { X, Info, Save, Send, Clock, Pause, Calendar, ArrowLeft } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for message details
const mockMessageData = {
  1: {
    id: 1,
    title: 'GENERICO - chiavi al sicuro',
    subject: 'Keys safely stored!',
    message: `Dear {{guest_first_name}},

Just a friendly reminder to leave the keys safely in the place where you found them at the end of your stay. This is essential for us to manage the keys effectively.

If you found the keys in the lockbox, please remember to return them after use.

There's no need to reset the code — just place the keys back inside and scramble the combination to lock it securely.

Additionally, we kindly ask that you turn off all lights and air conditioners before your departure.

Check-out is at 10:00; any delays may result in additional charges.

Thank you for your cooperation, and I hope you had a wonderful stay. ❤️

Best regards.`,
    ccEmail1: 'host@example.com',
    ccEmail2: 'manager@example.com',
    scheduledDate: '2025-10-08',
    scheduledTime: '10:00',
    guest: {
      name: 'Lynda Leclerc',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    },
    checkIn: '05 Oct',
    checkOut: '08 Oct',
    listing: 'Elegant Roman Escape • Wa...',
    channel: 'Airbnb',
    scheduledBy: '08 Oct 2025, 10:00 am',
    status: 'Scheduled',
  },
  2: {
    id: 2,
    title: 'Welcome Message',
    subject: 'Welcome to your stay!',
    message: `Dear {{guest_first_name}},

Welcome to your stay! We hope you have a wonderful time.

Please find the check-in instructions below:
- Check-in time: 3:00 PM
- Check-out time: 11:00 AM
- Keys are in the lockbox

If you need anything, please don't hesitate to contact us.

Best regards.`,
    ccEmail1: 'welcome@example.com',
    ccEmail2: '',
    scheduledDate: '2024-12-19',
    scheduledTime: '14:00',
    guest: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    },
    checkIn: '20 Dec',
    checkOut: '25 Dec',
    listing: 'Beach House Villa',
    channel: 'Booking.com',
    scheduledBy: '19 Dec 2024, 2:00 PM',
    status: 'Scheduled',
  },
};

export function MessageEditView() {
  const router = useRouter();
  const [messageId, setMessageId] = useState<number | null>(null);
  const [messageData, setMessageData] = useState<any>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [ccEmail1, setCcEmail1] = useState('');
  const [ccEmail2, setCcEmail2] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [overrideChanges, setOverrideChanges] = useState(true);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const id = parseInt(pathParts[pathParts.length - 1]);
    setMessageId(id);

    const data = mockMessageData[id as keyof typeof mockMessageData];
    if (data) {
      setMessageData(data);
      setSubject(data.subject);
      setMessage(data.message);
      setCcEmail1(data.ccEmail1 || '');
      setCcEmail2(data.ccEmail2 || '');
      setScheduledDate(data.scheduledDate || '');
      setScheduledTime(data.scheduledTime || '');
    } else {
      router.push('/inbox/manage');
    }
  }, [router]);

  const handleBack = () => {
    router.push('/inbox/manage');
  };

  const handleSendNow = () => {
    setSendDialogOpen(true);
  };

  const handleSave = () => {
    setSaveDialogOpen(true);
  };

  const handlePause = () => {
    setPauseDialogOpen(true);
  };

  const handleCancel = () => {
    setCancelDialogOpen(true);
  };

  const confirmSend = () => {
    // Update message status to sent
    setMessageData((prev: any) => ({ ...prev, status: 'Sent' }));
    setSendDialogOpen(false);
    // Show success message or redirect
    setTimeout(() => {
      router.push('/inbox/manage');
    }, 1000);
  };

  const confirmSave = () => {
    // Update the message in localStorage and navigate back
    const updatedMessage = {
      ...messageData,
      subject,
      message,
      ccEmail1,
      ccEmail2,
      scheduledDate,
      scheduledTime,
      // Update the schedule display format
      schedule: `${scheduledDate} ${scheduledTime}`,
    };

    // Update localStorage
    const existingMessages = JSON.parse(localStorage.getItem('manageMessages') || '[]');
    const updatedMessages = existingMessages.map((msg: any) => 
      msg.id === messageId ? updatedMessage : msg
    );
    localStorage.setItem('manageMessages', JSON.stringify(updatedMessages));

    setSaveDialogOpen(false);
    // Navigate back to show updated table
    router.push('/inbox/manage');
  };

  const confirmPause = () => {
    // Update message status to paused
    setMessageData((prev: any) => ({ ...prev, status: 'Paused' }));
    setPauseDialogOpen(false);
  };

  const confirmCancel = () => {
    // Remove message and redirect
    setCancelDialogOpen(false);
    router.push('/inbox/manage');
  };

  if (!messageData) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleBack} sx={{ p: 1 }}>
            <ArrowLeft size={20} />
          </IconButton>
          <Typography variant="h4">{messageData.title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Send size={20} />}
            onClick={handleSendNow}
            sx={{
              bgcolor: '#23c6c8',
              '&:hover': { bgcolor: '#1fb3b5' },
            }}
          >
            Send now
          </Button>
          <Button
            variant="outlined"
            startIcon={<Save size={20} />}
            onClick={handleSave}
            sx={{ borderColor: '#e0e0e0', color: '#666' }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            startIcon={<Pause size={20} />}
            onClick={handlePause}
            sx={{ borderColor: '#e0e0e0', color: '#666' }}
          >
            Pause
          </Button>
          <Button
            variant="outlined"
            startIcon={<X size={20} />}
            onClick={handleCancel}
            sx={{ borderColor: '#f44336', color: '#f44336' }}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        {/* Left Side - Message Content */}
        <Box sx={{ flex: 2, minWidth: 0 }}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Content</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={overrideChanges}
                    onChange={(e) => setOverrideChanges(e.target.checked)}
                    color="primary"
                  />
                }
                label="Override manual changes if reservation updates"
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Subject Field */}
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Subject *
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <IconButton size="small" sx={{ border: '1px solid #e0e0e0' }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{}</Typography>
                  </IconButton>
                </Box>
                <FormControl size="small" sx={{ mt: 1, minWidth: 200 }}>
                  <InputLabel>Subject preview</InputLabel>
                  <Select label="Subject preview">
                    <MenuItem value="preview">Subject preview</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Message Field */}
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Message *
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <TextField
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    multiline
                    rows={12}
                    variant="outlined"
                    size="small"
                  />
                  <IconButton size="small" sx={{ border: '1px solid #e0e0e0', mt: 1 }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{}</Typography>
                  </IconButton>
                </Box>
                <FormControl size="small" sx={{ mt: 1, minWidth: 200 }}>
                  <InputLabel>Message preview</InputLabel>
                  <Select label="Message preview">
                    <MenuItem value="preview">Message preview</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* CC for Outgoing Messages Section */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Add any address you wish to include as a CC for outgoing messages
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="CC email 1 (Optional)"
                    placeholder="CC email 1"
                    value={ccEmail1}
                    onChange={(e) => setCcEmail1(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    label="CC email 2 (Optional)"
                    placeholder="CC email 2"
                    value={ccEmail2}
                    onChange={(e) => setCcEmail2(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Box>

              {/* Scheduled by Section */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Scheduled by
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                      Date *
                    </Typography>
                    <TextField
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <IconButton size="small" onClick={() => setScheduledDate('')}>
                                <X size={16} />
                              </IconButton>
                              <IconButton size="small">
                                <Calendar size={16} />
                              </IconButton>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                      Time *
                    </Typography>
                    <TextField
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton size="small">
                              <Clock size={16} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Attachments Section */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="h6">
                    Attachments (up to 10 files)
                  </Typography>
                  <Tooltip title="Upload files to attach to your message">
                    <IconButton size="small">
                      <Info size={16} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box
                    sx={{
                      flex: 1,
                      border: '2px dashed #e0e0e0',
                      borderRadius: 2,
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: '#23c6c8',
                        bgcolor: '#f0f9ff',
                      },
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Drop files to upload or
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Browse
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No attached files
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Right Side - Reservation Info */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Reservation info</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundImage: `url('${messageData.guest.avatar}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {messageData.guest.name}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Check-in / Check-out
                </Typography>
                <Typography variant="body2">
                  {messageData.checkIn} / {messageData.checkOut}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Listing
                </Typography>
                <Typography variant="body2">
                  {messageData.listing}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Channel
                </Typography>
                <Typography variant="body2">
                  {messageData.channel}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Scheduled by
                </Typography>
                <Typography variant="body2">
                  {messageData.scheduledBy}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>

      {/* Send Now Confirmation Dialog */}
      <Dialog open={sendDialogOpen} onClose={() => setSendDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Message Now</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to send this message now? This message will be sent immediately instead of at the scheduled time.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSendDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmSend} color="primary" variant="contained">
            Send Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Save Confirmation Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Save Changes</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to save the changes to this message?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pause Confirmation Dialog */}
      <Dialog open={pauseDialogOpen} onClose={() => setPauseDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Pause Message</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to pause this message? The message will not be sent at the scheduled time.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPauseDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmPause} color="warning" variant="contained">
            Pause
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cancel Message</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this message? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)} color="inherit">
            Keep Message
          </Button>
          <Button onClick={confirmCancel} color="error" variant="contained">
            Cancel Message
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
