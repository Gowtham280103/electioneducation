#!/bin/bash

# Election Process Educator AI - Quick Deployment Script

echo "🚀 Starting deployment process..."
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Add all files
echo ""
echo "📝 Adding files to Git..."
git add .
echo "✅ Files added"

# Commit
echo ""
echo "💾 Committing changes..."
git commit -m "🎉 Deploy: Election Process Educator AI with impressive UI"
echo "✅ Changes committed"

# Check if remote exists
if git remote | grep -q 'origin'; then
    echo ""
    echo "✅ Remote 'origin' already exists"
else
    echo ""
    echo "⚠️  Please add your GitHub repository URL:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    exit 1
fi

# Push to GitHub
echo ""
echo "🌐 Pushing to GitHub..."
git branch -M main
git push -u origin main
echo "✅ Pushed to GitHub"

# Build for production
echo ""
echo "🔨 Building for production..."
npm run build
echo "✅ Build complete"

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Go to vercel.com or netlify.com"
echo "   2. Import your GitHub repository"
echo "   3. Deploy with one click!"
echo ""
echo "🌐 Your app will be live in 2-3 minutes!"
echo ""
echo "✨ Good luck with the hackathon! 🏆"
