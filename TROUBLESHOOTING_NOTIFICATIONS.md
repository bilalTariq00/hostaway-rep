# Troubleshooting: Notifications Not Appearing

If notifications are being created (you see success messages in console) but they're not appearing on screen, follow these steps:

## ✅ What's Working
- Permission is **Granted** ✓
- Service Worker is **Active** ✓
- Notifications are being created (console shows success)

## 🔍 Why They Might Not Show

### 1. **Do Not Disturb Mode**
- **macOS**: System Preferences → Notifications → Focus → Check if Do Not Disturb is enabled
- **Windows**: Action Center → Focus Assist (disable if enabled)
- **Browser**: Chrome has "Quiet notifications" mode - check `chrome://settings/content/notifications`

### 2. **Browser Window Focus**
Many browsers **suppress notifications when the tab/window is active** to avoid distraction.

**Solution:**
1. **Minimize the browser window** (Cmd+M on Mac, Win+D on Windows)
2. Then click "Test Direct Browser Notification"
3. Check if notification appears

### 3. **Browser Settings**

#### Chrome/Edge:
1. Go to: `chrome://settings/content/notifications`
2. Make sure localhost is in "Allowed" list
3. Check for "Use quieter messaging" - **disable it**
4. Try: `chrome://flags` → Search "notifications" → Enable all notification-related flags

#### Firefox:
1. Go to: `about:preferences#privacy`
2. Scroll to "Permissions" → Notifications → Settings
3. Ensure notifications are enabled
4. Check "Block new requests asking to allow notifications" - should be unchecked

### 4. **System Notification Settings**

#### macOS:
1. System Preferences → Notifications & Focus
2. Find your browser (Chrome/Firefox/etc.)
3. Ensure:
   - ✅ Allow Notifications
   - ✅ Show in Notification Center
   - ✅ Show on Lock Screen (optional)
   - ✅ Banners (or Alerts)

#### Windows:
1. Settings → System → Notifications & actions
2. Find your browser
3. Ensure notifications are enabled
4. Check "Focus assist" - should be off

### 5. **Check System Notification Center**
Even if notifications don't pop up, they might be in your system notification center:
- **macOS**: Click the time in top-right → Check notifications
- **Windows**: Click the notification icon in system tray
- **Linux**: Check notification panel/tray

## 🧪 Quick Tests

### Test 1: Minimize Browser
1. Minimize browser completely (or switch to another app)
2. Wait 2 seconds
3. Click "Test Direct Browser Notification"
4. Check if notification appears

### Test 2: Check Console for `onshow`
When you click a test button, check browser console for:
- `✅ [Notifications] Notification DISPLAYED on screen` ← **This means it appeared!**
- If you see this but no visual, notifications are being suppressed by system

### Test 3: Browser Notification Test
1. Click "Test Direct Browser Notification" button
2. Check console for: `✅ [Test] Direct notification showed!`
3. If this appears but you can't see notification, it's a system/browser setting issue

## 🔧 Manual Fixes

### Chrome Specific:
```
1. chrome://settings/content/notifications
2. Add localhost to allowed sites
3. chrome://flags → Search "notifications" → Enable "Enable native notifications"
4. Restart browser
```

### macOS Specific:
```
1. System Preferences → Notifications → [Your Browser]
2. Enable "Allow Notifications"
3. Set alert style to "Banners" or "Alerts" (not "None")
4. Check "Show in Notification Center"
```

### Focus Mode:
Many systems have "Focus" or "Do Not Disturb" that blocks ALL notifications:
- **macOS**: Control Center → Focus → Turn off
- **Windows**: Action Center → Focus Assist → Off
- **iPhone/iPad**: Settings → Focus → Turn off all Focus modes

## 📱 Testing on Mobile
If testing on mobile:
- **iOS Safari**: Notifications only work if app is added to home screen (PWA mode)
- **Android Chrome**: Should work, but check app notification settings

## 🎯 What This Means

**If console shows notifications are created but they don't appear:**
- ✅ Your code is working correctly
- ✅ Browser Notification API is working
- ❌ System/Browser is suppressing visual display

This is **normal behavior** - many browsers suppress notifications when:
- Tab is active/focused
- Window is maximized
- System is in Focus/Do Not Disturb mode

## ✅ Fallback: In-Page Notifications

I've added an **in-page notification component** that will show notifications directly on the page if browser notifications are suppressed. This ensures users always see important alerts.

Try the "Test Direct Browser Notification" button - if browser notification is suppressed, you'll see an in-page notification as a fallback.

## Still Not Working?

1. **Try a different browser** (Chrome, Firefox, Edge, Safari)
2. **Check browser console** for any errors in red
3. **Try incognito/private mode** (rules out extensions)
4. **Restart browser** completely
5. **Test on different device** (mobile, different computer)

The notification system is working - the issue is browser/OS suppressing the visual display. The in-page notification fallback ensures users still see alerts!


