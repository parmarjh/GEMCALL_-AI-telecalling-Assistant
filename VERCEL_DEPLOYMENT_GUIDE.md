# 🚀 Vercel Production Deployment & Testing Guide

## Complete Guide to Deploy GEMCALL to Vercel Production

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Method 1: Deploy via Vercel CLI (Recommended)](#method-1-deploy-via-vercel-cli-recommended)
3. [Method 2: Deploy via Vercel Dashboard (Web)](#method-2-deploy-via-vercel-dashboard-web)
4. [Environment Variables Setup](#environment-variables-setup)
5. [Testing Production Deployment](#testing-production-deployment)
6. [Troubleshooting](#troubleshooting)
7. [CI/CD with GitHub](#cicd-with-github)

---

## ✅ Prerequisites

Before deploying, ensure you have:

- ✅ Vercel account (free) - [Sign up here](https://vercel.com/signup)
- ✅ Code pushed to GitHub
- ✅ Gemini API key
- ✅ JioCX credentials (optional, for phone features)
- ✅ Node.js 18+ installed locally

---

## 🔧 Method 1: Deploy via Vercel CLI (Recommended)

### Step 1: Install Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Verify installation
vercel --version
```

### Step 2: Login to Vercel

```bash
# Login to your Vercel account
vercel login

# Follow the prompts to authenticate
# You can use Email, GitHub, GitLab, or Bitbucket
```

### Step 3: Navigate to Your Project

```bash
cd d:\181125\gemcall
```

### Step 4: Deploy to Production

```bash
# First deployment (interactive setup)
vercel

# Follow the prompts:
# ? Set up and deploy "d:\181125\gemcall"? [Y/n] Y
# ? Which scope do you want to deploy to? [Your username]
# ? Link to existing project? [y/N] N
# ? What's your project's name? gemcall-ai-telecalling
# ? In which directory is your code located? ./
# ? Want to override the settings? [y/N] N
```

### Step 5: Deploy to Production

```bash
# Deploy to production environment
vercel --prod

# This will:
# 1. Build your project
# 2. Upload assets to Vercel
# 3. Assign a production URL
# 4. Display the URL (e.g., https://gemcall-ai-telecalling.vercel.app)
```

---

## 🌐 Method 2: Deploy via Vercel Dashboard (Web)

### Step 1: Go to Vercel Dashboard

1. Visit [vercel.com/new](https://vercel.com/new)
2. Sign in with your GitHub account
3. Authorize Vercel to access your repositories

### Step 2: Import Your GitHub Repository

1. Click **"Import Project"**
2. Select **"Import Git Repository"**
3. Search for: `GEMCALL_-AI-telecalling-Assistant`
4. Click **"Import"**

### Step 3: Configure Project Settings

**Framework Preset:** Vite  
**Root Directory:** `./` (leave default)  
**Build Command:** `npm run build`  
**Output Directory:** `dist`  
**Install Command:** `npm install`

### Step 4: Add Environment Variables (See Section Below)

### Step 5: Deploy

Click **"Deploy"** button and wait 2-3 minutes for build to complete.

---

## 🔐 Environment Variables Setup

You **MUST** add environment variables for the app to work in production.

### Via Vercel CLI:

```bash
# Add Gemini API Key (Required)
vercel env add GEMINI_API_KEY

# When prompted:
# ? What's the value of GEMINI_API_KEY? [Enter your actual API key]
# ? Add GEMINI_API_KEY to which Environments? Production, Preview, Development
# ? Add GEMINI_API_KEY to which Git branch? (leave blank for all)

# Add JioCX credentials (Optional)
vercel env add JIOCX_ORGANIZATION_NAME
vercel env add JIOCX_USERNAME
vercel env add JIOCX_PASSWORD
vercel env add JIOCX_API_KEY
vercel env add JIOCX_SENDER_ID
vercel env add JIOCX_DLT_ENTITY_ID
vercel env add JIOCX_API_BASE_URL
```

### Via Vercel Dashboard:

1. Go to your project dashboard on Vercel
2. Click **Settings** → **Environment Variables**
3. Add each variable:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `GEMINI_API_KEY` | Your Gemini API key | Production, Preview, Development |
| `JIOCX_ORGANIZATION_NAME` | Your JioCX org | Production, Preview, Development |
| `JIOCX_USERNAME` | Your JioCX username | Production, Preview, Development |
| `JIOCX_PASSWORD` | Your JioCX password | Production, Preview, Development |
| `JIOCX_API_KEY` | Your JioCX API key | Production, Preview, Development |
| `JIOCX_SENDER_ID` | Your sender ID | Production, Preview, Development |
| `JIOCX_DLT_ENTITY_ID` | Your DLT entity ID | Production, Preview, Development |
| `JIOCX_API_BASE_URL` | `https://api.jiocx.com/v1` | Production, Preview, Development |

4. Click **"Save"** for each variable

### ⚠️ Important: Redeploy After Adding Env Variables

```bash
# Redeploy to apply environment variables
vercel --prod
```

Or via dashboard: Click **"Redeploy"** button

---

## 🧪 Testing Production Deployment

### 1. Access Your Production URL

After deployment completes, you'll receive a URL:

```
✅ Production: https://gemcall-ai-telecalling.vercel.app
```

### 2. Basic Functionality Test Checklist

Open your production URL and test:

#### **Homepage Tests:**
- [ ] Page loads without errors
- [ ] Navigation menu works
- [ ] No console errors (press F12 to check)

#### **Web Call Mode Tests:**
- [ ] Navigate to "Live Call"
- [ ] Select "🌐 Web Call" mode
- [ ] Click "Start Call"
- [ ] Grant microphone permission
- [ ] Verify AI responds to voice input
- [ ] Click "End Call" to disconnect

#### **Phone Call Mode Tests (if JioCX configured):**
- [ ] Select "📞 Real Phone" mode
- [ ] Phone number input field appears
- [ ] Add contact manually or import CSV
- [ ] Enter your phone number
- [ ] Add contact to queue
- [ ] Click "Start Queue"
- [ ] Verify status shows "Initiating call..."
- [ ] Receive call on your phone
- [ ] Check call connects to contact

#### **Chatbot Tests:**
- [ ] Navigate to "Chatbot"
- [ ] Send a test message
- [ ] Verify AI responds correctly
- [ ] Check conversation history persists

#### **Image Generation Tests:**
- [ ] Navigate to "Image Generation"
- [ ] Enter a prompt
- [ ] Click "Generate"
- [ ] Verify image generates successfully

### 3. Performance Testing

Use these tools to test production performance:

#### **Lighthouse (Built into Chrome DevTools):**

1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
4. Click "Analyze page load"
5. Review scores (aim for 90+ on all)

#### **Vercel Analytics:**

1. Go to your project on Vercel dashboard
2. Click "Analytics" tab
3. Monitor:
   - Page load times
   - Core Web Vitals
   - Geographic performance

### 4. Error Monitoring

#### **Check Vercel Logs:**

```bash
# View real-time logs via CLI
vercel logs [your-deployment-url] --follow

# View logs in dashboard
# Go to Project → Deployments → Select deployment → View Function Logs
```

#### **Check Browser Console:**

1. Open production app
2. Press F12 (Developer Tools)
3. Go to "Console" tab
4. Look for errors (red messages)
5. Check "Network" tab for failed requests

### 5. API Testing

#### **Test Gemini API Connection:**

1. Open browser console on production site
2. Go to Chatbot or Live Call
3. Trigger AI interaction
4. Check console for API responses
5. Verify no 401/403 errors

#### **Test JioCX API Connection:**

1. Switch to Phone Call mode
2. Try initiating a call
3. Check browser console for API calls
4. Look for successful authentication
5. Verify call status updates

---

## 🔧 Troubleshooting

### Issue 1: "Build Failed"

**Error:** `Build failed with exit code 1`

**Solution:**

```bash
# Test build locally first
npm run build

# If local build works:
1. Check Vercel build logs for specific error
2. Ensure all dependencies are in package.json
3. Check Node.js version matches (18+)
4. Redeploy: vercel --prod
```

---

### Issue 2: "Environment Variables Not Working"

**Symptoms:**
- App loads but features don't work
- Console shows "API key undefined"

**Solution:**

1. Verify env variables are added in Vercel dashboard
2. Check variable names are EXACTLY correct (case-sensitive)
3. Redeploy after adding variables
4. Check Vite config uses correct env variable names

```bash
# Redeploy to apply new environment variables
vercel --prod --force
```

---

### Issue 3: "404 on Page Refresh"

**Symptoms:** Refreshing non-home pages shows 404

**Solution:** Already handled in `vercel.json` with rewrites. If still occurring:

1. Verify `vercel.json` is in root directory
2. Check `vercel.json` has correct rewrites configuration
3. Redeploy

---

### Issue 4: "Microphone Not Working in Production"

**Symptoms:** Microphone permission denied on HTTPS

**Solution:**

Vercel automatically provides HTTPS, but ensure:
1. URL starts with `https://` (not `http://`)
2. Browser permissions are granted
3. No mixed content warnings in console

---

### Issue 5: "JioCX Calls Failing in Production"

**Symptoms:** Phone calls don't work in production

**Checklist:**
- [ ] All JioCX env variables added to Vercel
- [ ] Variables contain actual values (not placeholders)
- [ ] JioCX API base URL is correct
- [ ] Account has sufficient credits
- [ ] Test API from production using browser console

---

## 🔄 CI/CD with GitHub

### Enable Automatic Deployments

Vercel automatically deploys when you push to GitHub:

**Production Deployments:**
- Trigger: Push to `main` branch
- URL: `https://your-project.vercel.app`

**Preview Deployments:**
- Trigger: Push to any other branch or PR
- URL: `https://your-project-git-branch.vercel.app`

### Workflow:

```bash
# Make changes locally
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically:
# 1. Detects push to main
# 2. Builds project
# 3. Runs tests (if configured)
# 4. Deploys to production
# 5. Sends notification with URL
```

### Disable Auto-Deploy (if needed):

1. Go to Project Settings on Vercel
2. Click **Git** tab
3. Under **Production Branch**, uncheck auto-deploy
4. Save

---

## 📊 Deployment Commands Reference

### CLI Commands:

```bash
# Deploy to preview (staging)
vercel

# Deploy to production
vercel --prod

# Deploy and force rebuild
vercel --prod --force

# View deployment logs
vercel logs [deployment-url]

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]

# Check deployment status
vercel inspect [deployment-url]

# Set environment variable
vercel env add [VAR_NAME]

# List environment variables
vercel env ls

# Pull environment variables to .env.local
vercel env pull
```

---

## 📈 Performance Optimization Checklist

Before deploying to production:

- [x] ✅ Build succeeds locally: `npm run build`
- [x] ✅ Tests pass: `npm test`
- [ ] ✅ Environment variables configured in Vercel
- [ ] ✅ `.vercelignore` excludes unnecessary files
- [ ] ✅ Images optimized (if any)
- [ ] ✅ Code minified (automatic with Vite)
- [ ] ✅ Dead code removed
- [ ] ✅ Console logs removed/minimized

---

## 🎯 Production Testing Checklist

After deployment:

### Functional Testing:
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] API calls succeed
- [ ] Authentication works (if applicable)
- [ ] File uploads work (if applicable)

### Performance Testing:
- [ ] Lighthouse score > 90
- [ ] Page load < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] No console errors
- [ ] No failed network requests

### Cross-Browser Testing:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### Responsive Testing:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## 🔗 Useful Links

- **Vercel Documentation:** https://vercel.com/docs
- **Vercel CLI Reference:** https://vercel.com/docs/cli
- **Vite Deployment Guide:** https://vitejs.dev/guide/static-deploy.html
- **Your Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Support:** https://vercel.com/support

---

## 💡 Tips for Production

1. **Use Environment Variables for ALL secrets** - Never hardcode API keys
2. **Enable Vercel Analytics** - Monitor performance in real-time
3. **Set up Custom Domain** - Use your own domain instead of `.vercel.app`
4. **Enable Branch Previews** - Test changes before merging to main
5. **Monitor Logs** - Check Vercel logs regularly for errors
6. **Use Vercel Edge Functions** - For backend logic if needed
7. **Set up Monitoring** - Use Sentry or similar for error tracking

---

## 🎉 Success!

Your GEMCALL AI Telecalling Assistant should now be live on Vercel! 

**Share your deployment URL:**
```
https://gemcall-ai-telecalling.vercel.app
```

**Test thoroughly and enjoy!** 🚀

---

## 📞 Need Help?

- **Vercel Discord:** https://vercel.com/discord
- **GitHub Issues:** Create an issue in your repository
- **Vercel Support:** chat.vercel.com

---

**Last Updated:** November 2025  
**Version:** 1.0
