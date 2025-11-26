# Server Restart Required

The upload route has been added but the server needs to be restarted to pick up the new route.

## To Fix the 404 Error:

1. **Stop the current server** (if running):
   - Press `Ctrl+C` in the terminal where the server is running
   - Or kill the process: `pkill -f "node server.js"`

2. **Restart the server**:
   ```bash
   npm run server
   ```
   Or if using the dev command:
   ```bash
   npm run dev
   ```

3. **Verify the route is working**:
   - Check the console for: `✅ Upload routes registered at /api/uploads`
   - Test the endpoint: `curl http://localhost:3001/api/uploads/test`

## The Upload Route

The upload route is registered at:
- `POST /api/uploads` - Upload single file
- `POST /api/uploads/multiple` - Upload multiple files
- `DELETE /api/uploads/:filename` - Delete file
- `GET /api/uploads/test` - Test endpoint (no auth required)

All routes (except test) require authentication via Bearer token.

## Troubleshooting

If you still get 404 after restarting:

1. Check that the server is running on port 3001
2. Verify the route is in `server.js` at line 367
3. Check the console for any import errors
4. Make sure `routes/uploads.js` exists and exports the router correctly

