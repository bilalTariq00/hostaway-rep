# Users API 404 Error - Fix Guide

## Problem
Getting `404 Not Found` when trying to access `/api/users?status=active` and users not showing in `/tasks/new`.

## Solution

### Step 1: Restart the Server
The users route was added after the server started. **You must restart the server** for the new route to be registered.

```bash
# Stop the current server (Ctrl+C)
# Then restart it:
npm run server
```

### Step 2: Verify Route Registration
After restarting, you should see in the console:
```
✅ User routes registered at /api/users
   Available endpoints:
   - GET /api/users (get all users)
   - GET /api/users/:id (get user by ID)
   - GET /api/users/by-role/:role (get users by role)
```

### Step 3: Test the Endpoint
After restarting, test the endpoint:

```bash
# Get a valid token first by logging in
# Then test:
curl -X GET "http://localhost:3001/api/users?status=active" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Step 4: Check Browser Console
Open the browser console (F12) and check for:
- Any error messages when loading `/tasks/new`
- Network tab showing the request to `/api/users`
- Response status and body

## Expected Behavior

1. **On page load** (`/tasks/new`):
   - Fetches users from `/api/users?status=active`
   - Shows "Loading users..." in dropdowns
   - Populates dropdowns with real users from database

2. **Assignee dropdown**:
   - Shows all active users
   - Format: `Name (email) - role`

3. **Supervisor dropdown**:
   - Shows only users with supervisor roles (super-admin, manager, supervisor)
   - Format: `Name (email) - role`

## Debugging

If still getting 404 after restart:

1. **Check server logs** for route registration
2. **Verify route is imported** in `server.js`:
   ```javascript
   import userRoutes from './routes/users.js';
   app.use('/api/users', userRoutes);
   ```

3. **Check route file exists**: `routes/users.js`

4. **Verify authentication**: Make sure you're logged in and have a valid token

5. **Check MongoDB connection**: Users route requires database connection

## All Users in Database

After seeding, you should have 14 users:
- 1 Super Admin
- 4 Managers (can be supervisors)
- 6 Associates (can be assignees)
- 3 Team members (can be assignees)

## Quick Test

1. Login with: `superadmin@hostaway.com` / `superadmin123`
2. Navigate to: `/tasks/new`
3. Check Assignee and Supervisor dropdowns
4. Should see all 14 users in Assignee dropdown
5. Should see 5 users (1 super-admin + 4 managers) in Supervisor dropdown

