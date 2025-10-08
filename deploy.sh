#!/bin/bash

# Deployment script for Material Kit React project
echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in the 'dist' directory"
    echo "🌐 You can now deploy the contents of the 'dist' directory to your hosting service"
    echo ""
    echo "Deployment options:"
    echo "  - Netlify: Drag and drop the 'dist' folder to netlify.com"
    echo "  - Vercel: Run 'npx vercel --prod'"
    echo "  - GitHub Pages: Push to gh-pages branch"
    echo "  - Any static hosting service: Upload 'dist' folder contents"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
