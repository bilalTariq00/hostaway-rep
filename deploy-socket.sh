#!/bin/bash

# 🚀 Socket.IO Server Deployment Script for Railway

echo "🚀 Deploying Socket.IO Server to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway (if not already logged in)
echo "🔐 Checking Railway authentication..."
if ! railway whoami &> /dev/null; then
    echo "Please login to Railway:"
    railway login
fi

# Deploy to Railway
echo "📦 Deploying to Railway..."
railway up

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Copy your Railway app URL (e.g., https://your-app.up.railway.app)"
echo "2. Update the CORS origins in server.js with your Railway URL"
echo "3. Deploy your frontend to Vercel"
echo "4. Update the socket connection URL in your frontend"
echo ""
echo "🔗 Railway Dashboard: https://railway.app/dashboard"
