# Vercel Deployment Guide

This guide will help you deploy the KRUX Finance Customer Support System to Vercel.

## Prerequisites

- A Vercel account (sign up at https://vercel.com)
- Vercel CLI installed: `npm i -g vercel`
- Or use the Vercel Dashboard for deployment

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - KRUX Finance Support System"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Configure the project:
     - **Framework Preset**: Vite
     - **Build Command**: `vite build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Follow the prompts:**
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: krux-finance-support (or your choice)
   - Directory: `./` (current directory)
   - Override settings: No

## Configuration Files

The following files are already configured for Vercel deployment:

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration:
- Uses Vite as the framework
- Builds the project with `npm run build`
- Outputs to the `dist` directory
- Handles client-side routing with rewrites

## Important Notes

### Data Persistence
- This application uses **localStorage** for data persistence
- All data is stored in the browser (customer conversations, messages, tickets)
- Data is not shared between devices or browsers
- For production use, you would need to add a real backend database

### Mock Authentication
- The app uses mock authentication with predefined users:
  - **Customers**: +919876543210 (Rahul Sharma), +919876543211 (Priya Patel)
  - **Agents**: amit.kumar / demo123, sneha.singh / demo123

### Routes
The application has the following routes:
- `/` - Landing page
- `/customer-login` - Customer login
- `/chat` - Customer chat interface (requires login)
- `/agent-login` - Agent login
- `/dashboard` - Support dashboard (requires agent login)

## Testing Your Deployment

After deployment, test these features:

1. **Landing Page**
   - Navigate to your Vercel URL
   - Verify both "Customer Chat" and "Support Dashboard" cards are visible
   - Check theme toggle (light/dark mode)

2. **Customer Flow**
   - Click "Start Chat"
   - Login with a demo customer phone number
   - Test the chatbot responses
   - Try quick reply buttons

3. **Agent Flow**
   - Go back and click "Agent Login"
   - Login with demo agent credentials
   - View ticket queue
   - Open a conversation
   - Test quick replies and message sending

## Customization

To customize for production:

1. **Update Meta Tags** (client/index.html)
   - Change title and description
   - Add Open Graph tags for social sharing

2. **Add Real Backend**
   - Replace localStorage with API calls
   - Implement proper authentication
   - Add database for persistence

3. **Environment Variables**
   - Add in Vercel Dashboard under Settings → Environment Variables
   - Access in code with `import.meta.env.VITE_YOUR_VAR`

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure `build` script runs `vite build`
- Check Vercel build logs for specific errors

### Routing Issues
- Verify `vercel.json` rewrites are configured
- All routes should redirect to `/index.html` for client-side routing

### Blank Page
- Check browser console for errors
- Verify assets are loading from correct paths
- Check that base URL is configured correctly in `vite.config.ts`

## Demo Credentials

Include these in your project documentation:

**Customer Login:**
- Phone: +919876543210 (Rahul Sharma)
- Phone: +919876543211 (Priya Patel)

**Agent Login:**
- Username: amit.kumar | Password: demo123
- Username: sneha.singh | Password: demo123

## Support

For Vercel-specific issues, visit:
- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://vercel.com/community
- Vite Deployment Guide: https://vitejs.dev/guide/static-deploy.html

---

**Note**: This deployment guide assumes a frontend-only deployment using localStorage. For a production application with real data persistence, you'll need to set up a backend service and database.
