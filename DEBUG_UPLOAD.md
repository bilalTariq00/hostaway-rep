# Debug Upload Route Issue

## Problem
Getting 404 error when trying to POST to `/api/uploads`

## Solution Steps

### 1. **RESTART THE SERVER** (Most Important!)
The route has been added but the server needs to be restarted:

```bash
# Stop the server (Ctrl+C or):
pkill -f "node server.js"

# Then restart:
npm run server
# OR
npm run dev
```

### 2. Check Console Output
After restarting, you should see:
```
📁 Upload routes module loaded
✅ Upload routes registered at /api/uploads
   Available endpoints:
   - POST /api/uploads (upload single file)
   - POST /api/uploads/multiple (upload multiple files)
   - DELETE /api/uploads/:filename (delete file)
   - GET /api/uploads/test (test endpoint)
```

### 3. Test the Route
```bash
# Test endpoint (no auth required)
curl http://localhost:3001/api/uploads/test

# Should return: {"success":true,"message":"Upload route is working"}
```

### 4. Verify Route Registration
Check that the route is in `server.js` at line 367:
```javascript
app.use('/api/uploads', uploadRoutes);
```

### 5. Check File Structure
Make sure these files exist:
- `routes/uploads.js` - The upload route file
- `server.js` - Should import uploadRoutes at line 12

## Common Issues

1. **Server not restarted** - Most common issue
2. **Port conflict** - Another process using port 3001
3. **Import error** - Check console for any import errors
4. **Route order** - Routes should be registered before Socket.IO handlers

## Quick Fix Command
```bash
# Kill existing server and restart
pkill -f "node server.js" && npm run server
```

