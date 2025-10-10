# 🚀 Quick Deploy to Vercel

## Method 1: One-Click Deploy (Fastest)

### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "KRUX Finance Support System"

# Push to GitHub (create repo first on github.com)
git remote add origin https://github.com/YOUR_USERNAME/krux-finance.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect settings:
   - **Framework**: Vite ✅ (auto-detected)
   - **Build Command**: `vite build` ✅ (configured)
   - **Output Directory**: `dist/public` ✅ (configured)
5. Click "Deploy"
6. Wait ~2 minutes
7. Done! 🎉

## Method 2: Using Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Deploy
```bash
# Using the automated script
./deploy-to-vercel.sh

# OR manually
vite build
vercel --prod
```

## Method 3: Deploy from Replit

If you're on Replit, you can also:
1. Use Replit's built-in "Deploy" button
2. Your app will be live at `yourproject.replit.app`

## ✅ After Deployment

### Test Your Deployment

**Customer Flow:**
1. Visit your Vercel URL
2. Click "Start Chat"
3. Login: `+919876543210`
4. Chat with the bot

**Agent Flow:**
1. Click "Agent Login"
2. Username: `amit.kumar`
3. Password: `demo123`
4. Manage tickets

## 🔧 Configuration Files

The following files are configured for Vercel:

### ✅ vercel.json
```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist/public",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### ✅ .vercelignore
```
server
dist/index.js
*.log
node_modules
```

## 🐛 Troubleshooting

### Build fails?
```bash
# Test build locally first
npm run build

# Check for errors
npm run check
```

### Wrong output directory?
- Verify `vercel.json` has `"outputDirectory": "dist/public"`
- Frontend assets should be in `dist/public/`

### Routes not working?
- Check `vercel.json` has proper rewrites
- SPA routing requires all routes to serve `index.html`

## 📝 Demo Credentials

Include in your submission:

**Customers:**
- +919876543210 (Rahul Sharma)
- +919876543211 (Priya Patel)

**Agents:**
- amit.kumar / demo123
- sneha.singh / demo123

## 🎯 Submission Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Live URL tested and working
- [ ] Customer chat functional
- [ ] Agent dashboard functional
- [ ] README.md includes demo URL
- [ ] Demo credentials documented

---

**Your live URL will be:**
`https://krux-finance-XXXX.vercel.app`

Update your README with this URL for submission! ✨
