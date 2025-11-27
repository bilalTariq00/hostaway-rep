# Real-Time Notification Examples - Add Notifications Anywhere!

## ✅ Yes! You Can Add Notifications Anywhere!

The notification system is **already working for messages**, and you can easily add it to **any component, page, or event** in your app!

## 🎯 Quick Examples

### Example 1: Add to a Button Click

```typescript
// In any component
import { useNotifications } from 'src/contexts/notification-context';

function MyComponent() {
  const { sendMessageNotification } = useNotifications();
  
  const handleClick = async () => {
    await sendMessageNotification(
      'user-123',              // userId
      'System',                // senderName
      'Button was clicked!',   // message
      'event-id'               // conversationId
    );
  };
  
  return <button onClick={handleClick}>Click Me</button>;
}
```

### Example 2: Add to Form Submission

```typescript
import { useNotifications } from 'src/contexts/notification-context';

function BookingForm() {
  const { sendMessageNotification } = useNotifications();
  
  const handleSubmit = async (formData) => {
    // Process form...
    
    // Notify user
    await sendMessageNotification(
      currentUserId,
      'Booking System',
      `Booking for ${formData.propertyName} has been created!`,
      `booking-${formData.id}`
    );
  };
}
```

### Example 3: Add to Socket Events

```typescript
import { useSocket } from 'src/contexts/socket-context';
import { useNotifications } from 'src/contexts/notification-context';

function MyComponent() {
  const { on } = useSocket();
  const { sendMessageNotification } = useNotifications();
  
  useEffect(() => {
    on('reservation:updated', (data) => {
      // Notify when reservation is updated
      sendMessageNotification(
        data.userId,
        'Reservation System',
        `Reservation #${data.reservationId} has been updated`,
        `reservation-${data.reservationId}`
      );
    });
  }, [on, sendMessageNotification]);
}
```

### Example 4: Add to Task Completion

```typescript
import { useNotifications } from 'src/contexts/notification-context';

function TaskManager() {
  const { sendMessageNotification } = useNotifications();
  
  const completeTask = async (task) => {
    // Complete task logic...
    
    // Notify assignee
    await sendMessageNotification(
      task.assigneeId,
      'Task Manager',
      `Task "${task.name}" has been completed`,
      `task-${task.id}`
    );
    
    // Notify manager
    if (task.managerId) {
      await sendMessageNotification(
        task.managerId,
        'Task Manager',
        `Task "${task.name}" was completed by ${task.assigneeName}`,
        `task-${task.id}`
      );
    }
  };
}
```

## 📍 Already Working Automatically

### ✅ Messages (Inbox/Chat)
**Location**: `src/hooks/use-chat.ts`

**What it does**:
- ✅ Sends notification when new message arrives
- ✅ Sends reminder after 5 minutes if no response
- ✅ Notifies manager/supervisor when associate receives message

**Where it triggers**:
- Inbox page
- Chat interface
- Message components

### ✅ Performance Warnings
**Location**: `src/pages/supervisor-dashboard.tsx`

**What it does**:
- ✅ Sends notification when associate gets bad rating
- ✅ Includes feedback in notification

## 🚀 Easy Helper Functions

I've created a helper utility you can use **without needing React hooks**:

```typescript
import { notify, notifyNewMessage, notifyCustomEvent } from 'src/utils/notification-helper';

// Simple notification
await notify({
  title: 'Alert',
  message: 'Something happened!',
  type: 'info',
  userId: 'user-123',
});

// New message notification
await notifyNewMessage('John Doe', 'Hello!', 'conversation-123');

// Custom event
await notifyCustomEvent('System Update', 'New features available');
```

## 📝 Real Examples from Your Code

### Current: Messages Auto-Notify
```typescript
// src/hooks/use-chat.ts (lines 211-253)
// Automatically sends notification when message received
if (!newMessage.isOwn && user) {
  sendMessageNotification(data.receiverId, senderName, data.message, conversationId || '');
}
```

### You Can Add Similar Logic to:

1. **Reservations**:
```typescript
// When reservation is created
await sendMessageNotification(
  managerId,
  'Reservation System',
  `New reservation #${reservationId} created`,
  `reservation-${reservationId}`
);
```

2. **Tasks**:
```typescript
// When task is assigned
await sendMessageNotification(
  assigneeId,
  'Task Manager',
  `You have been assigned: ${taskName}`,
  `task-${taskId}`
);
```

3. **Bookings**:
```typescript
// When booking is modified
await sendMessageNotification(
  ownerId,
  'Booking System',
  `Booking #${bookingId} was modified`,
  `booking-${bookingId}`
);
```

## 🎨 Available Functions

All from `useNotifications()` hook:

1. **`sendMessageNotification(userId, senderName, message, conversationId)`**
   - Use for: Messages, alerts, general notifications

2. **`sendReminderNotification(userId, senderName, conversationId)`**
   - Use for: Reminders, urgent alerts

3. **`sendPerformanceWarning(workerId, ratedByName, qualityScore, feedback?)`**
   - Use for: Performance issues, warnings

4. **`sendAdminWarning(userId, adminName, warningMessage)`**
   - Use for: Admin alerts, system warnings

## 🔧 Step-by-Step: Add to Any Component

```typescript
// 1. Import the hook
import { useNotifications } from 'src/contexts/notification-context';

// 2. Use in your component
function MyPage() {
  const { sendMessageNotification } = useNotifications();
  
  // 3. Call when event happens
  const handleEvent = async () => {
    await sendMessageNotification(
      'user-id',      // Who to notify
      'Event Name',   // Sender name
      'Message here', // What happened
      'event-id'      // Unique ID for conversation
    );
  };
  
  return <button onClick={handleEvent}>Trigger</button>;
}
```

## 💡 Pro Tips

1. **Always use `await`** - Notifications are async
2. **Use unique conversationId** - Helps group related notifications
3. **Check permission first** - The hook handles this, but good to know
4. **Browser + In-page fallback** - Notifications work even if browser blocks them!

## ✅ Summary

**YES!** You can add notifications:
- ✅ To messages (already working!)
- ✅ To any button/action
- ✅ To any page/component
- ✅ To socket events
- ✅ To API responses
- ✅ To form submissions
- ✅ **ANYWHERE!**

Just use `useNotifications()` hook or the helper functions! 🎉






