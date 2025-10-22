import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { HeaderSection } from 'src/layouts/core';

// ----------------------------------------------------------------------

const messages = [
  {
    id: 1,
    sender: 'John Doe',
    message: 'Hey, how are you doing?',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    sender: 'Jane Smith',
    message: 'Can we schedule a meeting for tomorrow?',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    sender: 'Mike Johnson',
    message: 'Thanks for the update!',
    time: '3 hours ago',
    unread: false,
  },
];

export default function MessagesPage() {
  return (
    <>
      <HeaderSection>
        <Typography variant="h4">Messages</Typography>
      </HeaderSection>

      <Box sx={{ p: 3 }}>
        <Card>
          <CardHeader title="Recent Messages" />
          <List>
            {messages.map((msg) => (
              <ListItem key={msg.id} divider>
                <Avatar sx={{ mr: 2 }}>{msg.sender.charAt(0)}</Avatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2">{msg.sender}</Typography>
                      {msg.unread && (
                        <Chip label="New" size="small" color="primary" variant="filled" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {msg.message}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        {msg.time}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Card>
      </Box>
    </>
  );
}
