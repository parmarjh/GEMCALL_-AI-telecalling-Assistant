# GEMCALL - Development Operations Guide

## Overview
This guide covers website design iteration, quality assurance, monitoring, and automation workflows for the GEMCALL project.

---

## 1. 🎨 Iterating on Website Designs and Implementations

### Design Iteration Workflow

#### Step 1: Component-Based Design
```bash
# Create new component or modify existing
# Components are in: d:\181125\gemcall\components\
```

**Key Components:**
- `HomePage.tsx` - Landing page and hero section
- `Auth.tsx` - Login/signup interface
- `VideoGenerator.tsx` - Video creation UI
- `FastResponse.tsx` - Quick query interface
- `Chatbot.tsx` - Conversational AI
- `ImageGenerator.tsx` - Image creation
- `LiveCall.tsx` - Voice calling interface

#### Step 2: Design System
**Color Palette:**
```css
Primary: Indigo (600-500)
Secondary: Purple (600-500)
Accent: Pink, Green, Yellow (for stats/highlights)
Background: Gray (900-950)
Text: White, Gray (300-400)
```

**Gradients:**
- `from-indigo-600 to-purple-600` - Primary actions
- `from-gray-900 via-indigo-950 to-gray-900` - Backgrounds
- Various opacity levels for depth

#### Step 3: Testing Design Changes

**Live Preview:**
```bash
npm run dev
# Navigate to http://localhost:3000/
# Hot Module Replacement (HMR) updates automatically
```

**Browser Testing Checklist:**
- [ ] Chrome/Edge (primary)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile responsive (DevTools)
- [ ] Dark mode consistency
- [ ] Accessibility (contrast, ARIA)

#### Step 4: Design Iteration Best Practices

**Component Structure:**
```typescript
// 1. Imports
import React, { useState, useEffect } from 'react';

// 2. TypeScript interfaces
interface ComponentProps {
  // ...
}

// 3. Component with state
const Component: React.FC<ComponentProps> = ({ props }) => {
  // State management
  // Event handlers
  // Effects
  
  return (
    // JSX with Tailwind classes
  );
};

export default Component;
```

**Styling Guidelines:**
- Use Tailwind utility classes
- Consistent spacing (p-4, p-6, p-8)
- Rounded corners (rounded-lg, rounded-xl)
- Shadows for depth (shadow-lg, shadow-2xl)
- Transitions for interactions (transition-all, duration-300)
- Hover states for all interactive elements

---

## 2. ✅ Quality Assurance Testing

### QA Testing Checklist

#### Manual Testing

**Authentication Flow:**
```bash
# Test Case 1: Sign Up
1. Navigate to http://localhost:3000/
2. Click "Sign Up" tab
3. Enter name, email, password
4. Verify validation errors for invalid inputs
5. Submit form
6. Verify redirect to main app
7. Refresh page - should remain logged in
8. Check localStorage has 'gemcall_auth_user'

# Test Case 2: Login
1. Logout if logged in
2. Click "Sign In" tab
3. Enter email and password
4. Submit form
5. Verify successful login
6. Check session persistence

# Test Case 3: Logout
1. Click logout button
2. Verify redirect to auth page
3. Check localStorage cleared
4. Try accessing app directly - should show auth
```

**Feature Testing:**

```bash
# Video Generator
1. Navigate to Video Generation
2. Enter prompt: "Test video"
3. Select duration: 5 seconds
4. Select aspect ratio: 16:9
5. Click "Generate Video"
6. Wait for generation
7. Verify video plays
8. Test download button
9. Test "Generate New" button

# Fast Response
1. Navigate to Fast Response
2. Click quick question
3. Click "Ask"
4. Verify response appears
5. Check response time displayed
6. Verify history updates
7. Test clear history
8. Test multiple queries

# Image Generator
1. Navigate to Image Generation
2. Enter prompt
3. Click "Generate"
4. Wait for image
5. Verify image displays
6. Test with different prompts

# Chatbot
1. Navigate to AI Chatbot
2. Send message
3. Verify streaming response
4. Test conversation context
5. Test clear chat
6. Verify localStorage persistence
```

#### Automated Testing

**Running Tests:**
```bash
# Run all tests
npm test

# Run specific test file
npm test -- VideoGenerator.test.tsx

# Run with coverage
npm test -- --coverage

# Watch mode for development
npm test -- --watch
```

**Test Structure:**
```typescript
// Component.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  it('handles user interaction', () => {
    // Test user interactions
  });
});
```

**Test Coverage Goals:**
- Unit tests: 80%+
- Integration tests: 60%+
- E2E tests: Critical paths

#### Error Handling QA

**Error Scenarios to Test:**
1. **Network Failures**
   - Offline mode
   - Timeout
   - 500 errors

2. **Invalid Input**
   - Empty fields
   - Special characters
   - Extremely long input

3. **API Errors**
   - Invalid API key
   - Rate limiting
   - Content filtering

4. **Browser Compatibility**
   - localStorage disabled
   - Cookies disabled
   - JavaScript disabled

---

## 3. 📊 Monitoring Dashboards

### Application Monitoring

#### Performance Metrics

**Key Metrics to Track:**
```javascript
// Response Times
- Video Generation: Target <10s
- Fast Response: Target <1s
- Image Generation: Target <5s
- Chat Response: Target <2s

// User Engagement
- Daily Active Users
- Feature Usage Stats
- Session Duration
- Error Rate

// Technical Metrics
- API Success Rate
- Component Load Time
- Bundle Size
- Memory Usage
```

#### Client-Side Monitoring

**Add to components:**
```typescript
// Performance tracking
const startTime = performance.now();

// ... operation ...

const endTime = performance.now();
const duration = endTime - startTime;
console.log(`Operation took ${duration}ms`);

// Error tracking
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Send to monitoring service
});
```

#### Browser DevTools Monitoring

**Chrome DevTools:**
```bash
# Performance Tab
1. Start recording
2. Perform actions
3. Stop recording
4. Analyze:
   - FCP (First Contentful Paint)
   - LCP (Largest Contentful Paint)
   - TBT (Total Blocking Time)
   - CLS (Cumulative Layout Shift)

# Network Tab
1. Monitor API calls
2. Check response times
3. Identify slow requests
4. Verify caching

# Console Tab
1. Watch for errors
2. Monitor warnings
3. Check API responses
```

#### Monitoring Dashboard Setup

**Recommended Tools:**
1. **Vercel Analytics** (if deployed to Vercel)
   - Real User Monitoring
   - Web Vitals
   - Audience insights

2. **Google Analytics 4**
   - User behavior
   - Feature usage
   - Conversion tracking

3. **Sentry** (Error Tracking)
   - Real-time error alerts
   - Error grouping
   - Source maps

**Example: Adding Monitoring:**
```typescript
// utils/monitoring.ts
export const trackEvent = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined') {
    // Google Analytics
    (window as any).gtag?.('event', eventName, data);
    
    // Console log for development
    console.log('Event:', eventName, data);
  }
};

// In components:
trackEvent('video_generated', {
  duration: settings.duration,
  aspectRatio: settings.aspectRatio,
});
```

---

## 4. 🤖 Automating Routine Tasks

### CI/CD Automation

#### GitHub Actions Workflow

**Create `.github/workflows/ci.yml`:**
```yaml
name: CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint || echo "No lint script"
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      if: success()

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Vercel
      run: |
        npm i -g vercel
        vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

#### Automated Scripts

**Create `scripts/` directory:**

**1. `scripts/check-health.ps1`:**
```powershell
# Check application health
Write-Host "🔍 Checking GEMCALL Health..." -ForegroundColor Cyan

# Check if dev server is running
$response = try {
    Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5
} catch {
    $null
}

if ($response) {
    Write-Host "✅ Dev server is running" -ForegroundColor Green
} else {
    Write-Host "❌ Dev server is not running" -ForegroundColor Red
    Write-Host "   Run: npm run dev" -ForegroundColor Yellow
}

# Check node_modules
if (Test-Path "node_modules") {
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Dependencies not installed" -ForegroundColor Red
    Write-Host "   Run: npm install" -ForegroundColor Yellow
}

# Check .env.local
if (Test-Path ".env.local") {
    Write-Host "✅ Environment file exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  No .env.local file" -ForegroundColor Yellow
    Write-Host "   Copy .env.example to .env.local" -ForegroundColor Gray
}
```

**2. `scripts/run-tests.ps1`:**
```powershell
# Automated test runner
Write-Host "🧪 Running GEMCALL Tests..." -ForegroundColor Cyan

# Run tests with coverage
npm test -- --coverage --run

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ All tests passed!" -ForegroundColor Green
} else {
    Write-Host "❌ Tests failed!" -ForegroundColor Red
    exit 1
}
```

**3. `scripts/build-and-test.ps1`:**
```powershell
# Full build and test pipeline
Write-Host "🚀 Running Full Build Pipeline..." -ForegroundColor Cyan

# Clean
Write-Host "`n1. Cleaning..." -ForegroundColor Yellow
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }

# Install
Write-Host "`n2. Installing dependencies..." -ForegroundColor Yellow
npm ci

# Lint
Write-Host "`n3. Linting..." -ForegroundColor Yellow
# npm run lint

# Test
Write-Host "`n4. Testing..." -ForegroundColor Yellow
npm test -- --run

# Build
Write-Host "`n5. Building..." -ForegroundColor Yellow
npm run build

Write-Host "`n✅ Pipeline Complete!" -ForegroundColor Green
```

**4. `scripts/auto-deploy.ps1`:**
```powershell
# Automated deployment
param(
    [string]$Environment = "preview"
)

Write-Host "🚀 Deploying to $Environment..." -ForegroundColor Cyan

# Run tests first
.\scripts\run-tests.ps1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Tests failed, aborting deployment" -ForegroundColor Red
    exit 1
}

# Deploy
if ($Environment -eq "production") {
    vercel --prod
} else {
    vercel
}
```

#### Pre-commit Hooks

**Setup Husky:**
```bash
npm install --save-dev husky lint-staged

# Initialize
npx husky install
npx husky add .husky/pre-commit "npm test -- --run"
```

**Package.json addition:**
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "npm test -- --run",
      "git add"
    ]
  }
}
```

#### Scheduled Tasks

**Create scheduled task for monitoring:**

**Windows Task Scheduler:**
```powershell
# Create scheduled task to check health every hour
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" `
  -Argument "-File C:\path\to\gemcall\scripts\check-health.ps1"

$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) `
  -RepetitionInterval (New-TimeSpan -Hours 1)

Register-ScheduledTask -TaskName "GEMCALL-Health-Check" `
  -Action $action -Trigger $trigger
```

---

## 5. 📋 Workflow Integration

### Daily Development Workflow

```bash
# Morning routine
1. git pull origin main
2. npm install  # if package.json changed
3. npm run dev  # start dev server
4. Run: scripts\check-health.ps1

# During development
1. Make changes
2. Test in browser (HMR updates automatically)
3. Run affected tests: npm test -- Component.test.tsx
4. Commit changes

# Before commit
1. npm test -- --run
2. npm run build
3. git add .
4. git commit -m "descriptive message"
5. git push
```

### Weekly QA Workflow

```bash
# Every Monday
1. Run full test suite: npm test -- --coverage
2. Check bundle size: npm run build
3. Review error logs
4. Update dependencies: npm outdated
5. Document known issues

# Every Friday
1. Deploy to preview: vercel
2. Manual QA testing
3. Performance checks
4. Update documentation
```

---

## 6. 🔧 Troubleshooting Automation

### Common Issues & Auto-fixes

**Script: `scripts/fix-common-issues.ps1`:**
```powershell
Write-Host "🔧 Auto-fixing common issues..." -ForegroundColor Cyan

# Fix 1: Clear node_modules and reinstall
if (Test-Path "node_modules") {
    Write-Host "Clearing node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "node_modules"
}
npm install

# Fix 2: Clear Vite cache
if (Test-Path "node_modules/.vite") {
    Write-Host "Clearing Vite cache..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "node_modules/.vite"
}

# Fix 3: Clear dist
if (Test-Path "dist") {
    Write-Host "Clearing dist..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "dist"
}

# Fix 4: Rebuild
Write-Host "Rebuilding..." -ForegroundColor Yellow
npm run build

Write-Host "✅ Fixes applied!" -ForegroundColor Green
```

---

## 7. 📝 Documentation Automation

### Auto-generate Documentation

**Script to update README with latest features:**
```powershell
# scripts/update-docs.ps1
$features = @(
    "Authentication with persistent sessions",
    "Video Generation (Demo mode)",
    "Fast Response (<1s answers)",
    "Image Generation",
    "AI Chatbot",
    "Live Voice Calling"
)

Write-Host "📝 Current Features:" -ForegroundColor Cyan
$features | ForEach-Object { Write-Host "  ✅ $_" -ForegroundColor Green }
```

---

## Summary

This development operations guide provides:

✅ **Design Iteration** - Component-based workflow with design system  
✅ **QA Testing** - Manual and automated testing procedures  
✅ **Monitoring** - Performance tracking and dashboards  
✅ **Automation** - CI/CD, scripts, and scheduled tasks  

**All scripts are ready to use** in the `scripts/` directory (to be created).

**Next Steps:**
1. Create `.github/workflows/` for CI/CD
2. Create `scripts/` directory with automation scripts
3. Set up monitoring tools (Vercel Analytics, Sentry)
4. Configure pre-commit hooks
5. Schedule automated health checks
