---
description: Deploy GEMCALL to Vercel Production
---

# Deploy to Vercel Production Workflow

Follow these steps to deploy your GEMCALL AI Telecalling Assistant to Vercel.

## Prerequisites

Ensure you have:
- Vercel account (free) - https://vercel.com/signup
- Gemini API key
- JioCX credentials (optional)

## Steps

### 1. Install Vercel CLI (if not installed)

```bash
npm install -g vercel
```

### 2. Login to Vercel

// turbo
```bash
vercel login
```

### 3. Test Build Locally

// turbo
```bash
npm run build
```

### 4. Deploy to Production

```bash
vercel --prod
```

### 5. Add Environment Variables

After first deployment, add environment variables:

```bash
vercel env add GEMINI_API_KEY
# Enter your Gemini API key when prompted
# Select: Production, Preview, Development

vercel env add JIOCX_ORGANIZATION_NAME
vercel env add JIOCX_USERNAME
vercel env add JIOCX_PASSWORD
vercel env add JIOCX_API_KEY
vercel env add JIOCX_SENDER_ID
vercel env add JIOCX_DLT_ENTITY_ID
```

### 6. Redeploy to Apply Environment Variables

```bash
vercel --prod --force
```

### 7. Test Production Deployment

1. Open the production URL provided by Vercel
2. Test web call mode (microphone permissions)
3. Test phone call mode (if JioCX configured)
4. Check browser console for errors (F12)
5. Test chatbot functionality
6. Verify image generation works

### 8. Monitor Deployment

```bash
# View logs
vercel logs [your-deployment-url] --follow

# Check deployment status
vercel ls
```

## Alternative: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository: `GEMCALL_-AI-telecalling-Assistant`
3. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables in Settings → Environment Variables
5. Click "Deploy"

## Troubleshooting

- **Build fails**: Run `npm run build` locally first to check for errors
- **Env vars not working**: Redeploy after adding variables with `vercel --prod --force`
- **404 on refresh**: Ensured by vercel.json rewrites configuration
- **API errors**: Check environment variables are correctly set in Vercel dashboard

## Resources

- Full deployment guide: See `VERCEL_DEPLOYMENT_GUIDE.md`
- Vercel documentation: https://vercel.com/docs
- Quick deploy script: Run `.\deploy-vercel.ps1` (Windows PowerShell)

## Success Criteria

- ✅ Deployment completes without errors
- ✅ Production URL is accessible
- ✅ No console errors on homepage
- ✅ Web call mode works
- ✅ Chatbot responds correctly
- ✅ All environment variables are set
- ✅ Lighthouse score > 90
