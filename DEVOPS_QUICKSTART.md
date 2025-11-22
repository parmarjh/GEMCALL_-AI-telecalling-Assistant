# DevOps & Automation - Quick Reference

## 📁 File Structure

```
d:\181125\gemcall\
├── scripts/
│   ├── check-health.ps1      # Health check automation
│   ├── run-tests.ps1          # Test runner with options
│   ├── build-pipeline.ps1     # Full CI/CD pipeline
│   └── quick-fix.ps1          # Interactive problem solver
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions workflow
├── DEV_OPS_GUIDE.md           # Comprehensive guide
└── DEVOPS_QUICKSTART.md       # This file
```

## 🚀 Quick Commands

### Health Check
```powershell
.\scripts\check-health.ps1
```
**Checks:**
- Dev server status
- Dependencies installed
- Environment variables
- Build output
- Git status
- Port availability

### Run Tests
```powershell
# All tests
.\scripts\run-tests.ps1

# With coverage
.\scripts\run-tests.ps1 -Coverage

# Watch mode
.\scripts\run-tests.ps1 -Watch

# Specific file
.\scripts\run-tests.ps1 -File "VideoGenerator.test.tsx"
```

### Build Pipeline
```powershell
.\scripts\build-pipeline.ps1
```
**Steps:**
1. Clean dist and coverage
2. Install dependencies
3. Run tests with coverage
4. Build for production
5. Report build size

### Quick Fix
```powershell
.\scripts\quick-fix.ps1
```
**Options:**
1. Clear cache & reinstall
2. Reset build
3. Fix git issues
4. Full reset (nuclear)
5. Fix port conflicts

## 🔄 Development Workflow

### Daily Workflow
```powershell
# Start your day
git pull origin main
npm install  # if needed
.\scripts\check-health.ps1
npm run dev

# Before committing
.\scripts\run-tests.ps1 -Coverage
git add .
git commit -m "feat: description"
git push
```

### Pre-Deploy Workflow
```powershell
# Run full pipeline
.\scripts\build-pipeline.ps1

# If successful, deploy
# (See VERCEL_DEPLOYMENT_GUIDE.md)
```

## 🧪 Testing Scenarios

### Manual QA Checklist

**Authentication:**
- [ ] Sign up with new account
- [ ] Login with existing account
- [ ] Logout
- [ ] Session persists on refresh
- [ ] localStorage cleared on logout

**Video Generator:**
- [ ] Generate 5-second video
- [ ] Try different aspect ratios
- [ ] Download video
- [ ] Generate new video

**Fast Response:**
- [ ] Ask quick question
- [ ] Verify response time < 1s
- [ ] Check history updates
- [ ] Clear history

**Image Generator:**
- [ ] Generate image
- [ ] Try different prompts
- [ ] Download image

**Chatbot:**
- [ ] Send message
- [ ] Verify streaming
- [ ] Clear chat
- [ ] Persistence check

## 📊 Monitoring Dashboards

### Local Development
```powershell
# Browser DevTools
F12 → Performance Tab
- Record interaction
- Analyze metrics
- Check for bottlenecks

# Network Tab
- Monitor API calls
- Check response times
- Verify caching

# Console Tab
- Watch for errors
- Check API responses
```

### Production (if deployed)
- **Vercel Analytics**: Real user monitoring
- **Google Analytics**: User behavior
- **Sentry**: Error tracking

## 🤖 Automation Features

### GitHub Actions (`.github/workflows/ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main`
- Manual workflow dispatch

**Jobs:**
1. **Test & Build** - Runs tests and builds
2. **Deploy Production** - Auto-deploy to Vercel (main)
3. **Deploy Preview** - Preview deployments (PRs)
4. **Code Quality** - Linting, type-check, security

### Required Secrets (GitHub)
```
VERCEL_TOKEN          # From Vercel dashboard
VERCEL_ORG_ID        # Your Vercel organization ID
VERCEL_PROJECT_ID    # Your project ID
```

## 🔧 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```powershell
.\scripts\quick-fix.ps1
# Choose option 5
```

**Build errors:**
```powershell
.\scripts\quick-fix.ps1
# Choose option 2 (Reset build)
```

**Dependency issues:**
```powershell
.\scripts\quick-fix.ps1
# Choose option 1 (Clear cache)
```

**Everything broken:**
```powershell
.\scripts\quick-fix.ps1
# Choose option 4 (Nuclear reset)
# ⚠️ This will delete everything and start fresh!
```

### TypeScript Errors (IDE)

If IDE shows TypeScript errors but code works:
1. Reload IDE window
2. Restart TypeScript server (VS Code: `Ctrl+Shift+P` → "Restart TS Server")
3. Run `.\scripts\build-pipeline.ps1` to verify

## 📝 Code Quality Guidelines

### Before Committing
1. Run tests: `.\scripts\run-tests.ps1`
2. Check build: `npm run build`
3. Verify no console errors
4. Test in browser

### Component Checklist
- [ ] TypeScript types defined
- [ ] Error handling added
- [ ] Loading states implemented
- [ ] Responsive design tested
- [ ] Accessibility considered
- [ ] Comments for complex logic

## 🎯 Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Video Generation | < 10s | ~5-8s (demo) | 
| Fast Response | < 1s | ~500-800ms |
| Image Generation | < 5s | ~2-4s |
| Chat Response | < 2s | ~1-2s |
| Page Load (FCP) | < 1.5s | - |
| Bundle Size | < 500KB | Check with build |

## 📚 Additional Documentation

- **`DEV_OPS_GUIDE.md`** - Comprehensive operations guide
- **`VERCEL_DEPLOYMENT_GUIDE.md`** - Deployment instructions
- **`VIDEO_GENERATOR_DOCUMENTATION.md`** - Video feature docs
- **`AUTH_FIX_DOCUMENTATION.md`** - Authentication details
- **`README.md`** - Main project documentation

## ⚡ Pro Tips

1. **Use health check regularly**: `.\scripts\check-health.ps1`
2. **Test before pushing**: `.\scripts\run-tests.ps1 -Coverage`
3. **Full pipeline before deploy**: `.\scripts\build-pipeline.ps1`
4. **Quick fixes save time**: `.\scripts\quick-fix.ps1`
5. **Monitor console in dev**: Watch for errors early

## 🎓 Learning Resources

- **Vite Documentation**: https://vitejs.dev/
- **React Documentation**: https://react.dev/
- **Vercel Documentation**: https://vercel.com/docs
- **GitHub Actions**: https://docs.github.com/actions
- **Vitest**: https://vitest.dev/

---

**Last Updated**: 2025-11-22  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
