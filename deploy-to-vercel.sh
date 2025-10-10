#!/bin/bash

# KRUX Finance - Vercel Deployment Script

echo "🚀 KRUX Finance - Vercel Deployment"
echo "===================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is ready"
echo ""

# Build the project
echo "🔨 Building the project..."
vite build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    
    # Deploy to Vercel
    echo "🌐 Deploying to Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Deployment successful!"
        echo ""
        echo "📝 Next steps:"
        echo "   1. Open the deployment URL in your browser"
        echo "   2. Test customer login with: +919876543210"
        echo "   3. Test agent login with: amit.kumar / demo123"
        echo ""
    else
        echo "❌ Deployment failed. Please check the error above."
        exit 1
    fi
else
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi
