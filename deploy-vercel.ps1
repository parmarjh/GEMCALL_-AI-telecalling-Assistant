# GEMCALL Vercel Deployment Script
# This script helps you deploy your app to Vercel

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  GEMCALL Vercel Deployment" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "Checking for Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✅ Vercel CLI installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI found!" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Choose deployment option:" -ForegroundColor Cyan
Write-Host "1. Deploy to Preview (Staging)" -ForegroundColor White
Write-Host "2. Deploy to Production" -ForegroundColor White
Write-Host "3. Just build locally (test)" -ForegroundColor White
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🚀 Deploying to Preview..." -ForegroundColor Yellow
        Write-Host ""
        vercel
    }
    "2" {
        Write-Host ""
        Write-Host "🚀 Deploying to Production..." -ForegroundColor Yellow
        Write-Host ""
        vercel --prod
    }
    "3" {
        Write-Host ""
        Write-Host "🔨 Building locally..." -ForegroundColor Yellow
        Write-Host ""
        npm run build
        Write-Host ""
        Write-Host "✅ Build completed! Check the 'dist' folder." -ForegroundColor Green
        Write-Host ""
        Write-Host "To preview: npm run preview" -ForegroundColor Cyan
    }
    default {
        Write-Host ""
        Write-Host "❌ Invalid choice. Exiting." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Deployment Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 For detailed guide, see: VERCEL_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
