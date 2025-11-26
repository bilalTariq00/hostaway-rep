# 🚀 Quick Deployment Guide

## ✅ Build Status: READY

Your project is **build-ready** and tested. Follow these steps to deploy:

## 📦 Step 1: Build Locally (Optional Test)

```bash
npm install
npm run build
```

This creates the `dist/` folder with production-ready files.

## 🌐 Step 2: Deploy Backend (Railway)

1. **Go to Railway**: https://railway.app
2. **New Project** → Deploy from GitHub
3. **Set Environment Variables**:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=3001
   ```
4. **Get Railway URL**: Copy your app URL (e.g., `https://your-app.up.railway.app`)
5. **Update CORS** in `server.js`:
   - Add your frontend domain to the `origin` array
   - Redeploy

## 🎨 Step 3: Deploy Frontend (Vercel)

1. **Go to Vercel**: https://vercel.com
2. **Import Project** from GitHub
3. **Configure**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Set Environment Variables**:
   ```
   VITE_API_URL=https://your-railway-app.up.railway.app
   VITE_SOCKET_URL=https://your-railway-app.up.railway.app
   ```
5. **Deploy**

## ✅ Step 4: Verify

1. Open your Vercel URL
2. Check browser console - should show:
   ```
   🔌 Socket.IO connecting to: https://your-railway-app.up.railway.app
   🌐 API connecting to: https://your-railway-app.up.railway.app
   🏗️ Environment: production
   ```
3. Test login functionality

## 🔧 Troubleshooting

### APIs not working?
- ✅ Check `VITE_API_URL` is set in Vercel
- ✅ Rebuild frontend after setting env vars
- ✅ Verify CORS includes your Vercel domain

### CORS errors?
- ✅ Update `server.js` CORS origins
- ✅ Restart Railway server

### Build fails?
- ✅ Run `npm run build` locally to see errors
- ✅ Check TypeScript: `npx tsc --noEmit`

## 📚 Full Documentation

See `BUILD_READY.md` for complete deployment guide.

