# How to Add Real-Time Notifications Anywhere in Your App

## ✅ Current Status

**Notifications are ALREADY working for messages!** The chat system automatically sends notifications when:
- ✅ A new message is received
- ✅ A message hasn't been responded to in 5 minutes (reminder)
- ✅ Associates receive messages (notifies their manager/supervisor too)

## 🚀 Easy Way: Use Notification Helper (Anywhere in Your App)

### Simple Example - Trigger from Any Component

```typescript
import { notify, notifyNewMessage, notifyCustomEvent } from 'src/utils/notification-helper';

// In any component or function:
await notify({
  title: 'New Task Assigned',
  message: 'You have been assigned a new task',
  type: 'info',
  userId: 'user-123',
});

// Or use helper functions:
await notifyNewMessage('John Doe', 'Hello!', 'conversation-123');
await notifyCustomEvent('System Alert', 'Your session is about to expire');
```

## 📍 Where You Can Add Notifications

### 1. **In Messages (Already Working! ✅)**

Notifications are automatically sent when messages are received. You can customize this in:
- `src/hooks/use-chat.ts` (lines 210-253)

### 2. **In Any Component**

```typescript
import { useNotifications } from 'src/contexts/notification-context';

function MyComponent() {
  const { sendMessageNotification } = useNotifications();
  
  const handleSomethingHappened = async () => {
    await sendMessageNotification(
      'user-123',           // userId
      'System',             // senderName
      'Something happened!', // message
      'event-id'            // conversationId
    );
  };
  
  return <button onClick={handleSomethingHappened}>Trigger Notification</button>;
}
```

### 3. **In Custom Hooks**

```typescript
import { useNotifications } from 'src/contexts/notification-context';

export function useMyCustomHook() {
  const { sendMessageNotification } = useNotifications();
  
  const doSomething = async () => {
    // Your logic here
    await sendMessageNotification('user-123', 'System', 'Task completed', 'task-123');
  };
  
  return { doSomething };
}
```

### 4. **From Server/API Calls**

```typescript
// After API call completes
fetch('/api/something')
  .then(() => {
    // Notify user
    import('src/utils/notification-helper').then(({ notify }) => {
      notify({
        title: 'Operation Complete',
        message: 'Your request was processed successfully',
        type: 'info',
      });
    });
  });
```

### 5. **In Socket Listeners**

```typescript
import { useSocket } from 'src/contexts/socket-context';
import { useNotifications } from 'src/contexts/notification-context';

function MyComponent() {
  const { on } = useSocket();
  const { sendMessageNotification } = useNotifications();
  
  useEffect(() => {
    on('custom-event', (data) => {
      // Send notification when custom event happens
      sendMessageNotification(
        data.userId,
        'Event System',
        data.message,
        data.eventId
      );
    });
  }, [on, sendMessageNotification]);
}
```

## 🎯 Common Notification Scenarios

### Task Completion
```typescript
await notify({
  title: 'Task Completed',
  message: `Task "${taskName}" was completed by ${completedBy}`,
  type: 'info',
});
```

### New Assignment
```typescript
await notify({
  title: 'New Assignment',
  message: `You have been assigned to: ${assignmentName}`,
  type: 'message',
  userId: assigneeId,
});
```

### System Alerts
```typescript
await notify({
  title: 'System Alert',
  message: 'Your session will expire in 5 minutes',
  type: 'warning',
});
```

### Booking Updates
```typescript
await notify({
  title: 'Booking Updated',
  message: `Booking #${bookingId} has been modified`,
  type: 'info',
  userId: 'manager-123',
});
```

## 🔧 Available Notification Functions

### From `useNotifications()` Hook:
- `sendMessageNotification(userId, senderName, message, conversationId)`
- `sendReminderNotification(userId, senderName, conversationId)`
- `sendPerformanceWarning(workerId, ratedByName, qualityScore, feedback?)`
- `sendAdminWarning(userId, adminName, warningMessage)`

### From Helper Utility:
- `notify(options)` - Generic notification
- `notifyNewMessage(senderName, message, conversationId, receiverId?)`
- `notifyTaskComplete(taskName, completedBy)`
- `notifyCustomEvent(title, message, userId?)`

## 📝 Example: Add Notification to Any Page

```typescript
// In src/pages/my-page.tsx
import { useNotifications } from 'src/contexts/notification-context';

export function MyPage() {
  const { sendMessageNotification } = useNotifications();
  
  const handleButtonClick = async () => {
    // Send notification
    await sendMessageNotification(
      'user-123',
      'My Page',
      'Button was clicked!',
      'page-event-1'
    );
  };
  
  return <button onClick={handleButtonClick}>Click Me</button>;
}
```

## ✨ Automatic Notifications (Already Configured)

✅ **Messages**: Auto-notifies on new messages  
✅ **Reminders**: Auto-notifies after 5 minutes of no response  
✅ **Performance Warnings**: Auto-notifies on bad ratings  
✅ **Manager Notifications**: Auto-notifies managers when associates receive messages  

## 🎨 Notification Types

- **Message**: Standard message notification
- **Reminder**: Urgent reminder (requireInteraction: true)
- **Warning**: Performance or system warning
- **Info**: General information

## 📌 Quick Reference

**Import:**
```typescript
import { useNotifications } from 'src/contexts/notification-context';
// OR
import { notify } from 'src/utils/notification-helper';
```

**Use:**
```typescript
const { sendMessageNotification } = useNotifications();
await sendMessageNotification(userId, 'Sender', 'Message', 'conv-id');
```

That's it! Notifications work everywhere in your app! 🎉






