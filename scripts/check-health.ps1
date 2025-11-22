# GEMCALL Health Check Script
# Checks if all systems are operational

Write-Host "`n[HEALTH CHECK] GEMCALL System Status" -ForegroundColor Cyan
Write-Host ("=" * 50) -ForegroundColor Gray

# Check 1: Dev Server
Write-Host "`n[SERVER] Checking Dev Server..." -ForegroundColor Yellow
$response = try {
    Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 3 -UseBasicParsing
    $true
}
catch {
    $false
}

if ($response) {
    Write-Host "   [OK] Dev server is running on http://localhost:3000" -ForegroundColor Green
}
else {
    Write-Host "   [ERROR] Dev server is NOT running" -ForegroundColor Red
    Write-Host "   [TIP] Run: npm run dev" -ForegroundColor Yellow
}

# Check 2: Dependencies
Write-Host "`n[DEPS] Checking Dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   [OK] node_modules exists" -ForegroundColor Green
    
    # Check key packages
    $packages = @("react", "vite", "@google/genai")
    foreach ($pkg in $packages) {
        if (Test-Path "node_modules\$pkg") {
            Write-Host "   [OK] $pkg installed" -ForegroundColor Green
        }
        else {
            Write-Host "   [WARN] $pkg missing" -ForegroundColor Yellow
        }
    }
}
else {
    Write-Host "   [ERROR] node_modules NOT found" -ForegroundColor Red
    Write-Host "   [TIP] Run: npm install" -ForegroundColor Yellow
}

# Check 3: Environment File
Write-Host "`n[ENV] Checking Environment..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    Write-Host "   [OK] .env.local exists" -ForegroundColor Green
    
    # Check for API key (without revealing it)
    $envContent = Get-Content ".env.local" -Raw
    if ($envContent -match "GEMINI_API_KEY=\w+") {
        Write-Host "   [OK] GEMINI_API_KEY is set" -ForegroundColor Green
    }
    else {
        Write-Host "   [WARN] GEMINI_API_KEY may not be set" -ForegroundColor Yellow
    }
}
else {
    Write-Host "   [WARN] .env.local NOT found" -ForegroundColor Yellow
    Write-Host "   [TIP] Copy .env.example to .env.local and add your API key" -ForegroundColor Gray
}

# Check 4: Build Output
Write-Host "`n[BUILD] Checking Build..." -ForegroundColor Yellow
if (Test-Path "dist") {
    $distSize = (Get-ChildItem "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "   [OK] Build exists ($([math]::Round($distSize, 2)) MB)" -ForegroundColor Green
}
else {
    Write-Host "   [INFO] No build found (run: npm run build)" -ForegroundColor Cyan
}

# Check 5: Git Status
Write-Host "`n[GIT] Checking Git..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "   [OK] Git repository initialized" -ForegroundColor Green
    
    # Check for uncommitted changes
    $gitStatus = git status --short
    if ($gitStatus) {
        $changedFiles = ($gitStatus | Measure-Object).Count
        Write-Host "   [WARN] $changedFiles uncommitted file(s)" -ForegroundColor Yellow
    }
    else {
        Write-Host "   [OK] Working directory clean" -ForegroundColor Green
    }
}
else {
    Write-Host "   [ERROR] Not a git repository" -ForegroundColor Red
}

# Check 6: Port Availability
Write-Host "`n[PORT] Checking Ports..." -ForegroundColor Yellow
$tcpConnection = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($tcpConnection) {
    Write-Host "   [OK] Port 3000 is in use (dev server running)" -ForegroundColor Green
}
else {
    Write-Host "   [INFO] Port 3000 is available" -ForegroundColor Cyan
}

# Summary
Write-Host "`n" -NoNewline
Write-Host ("=" * 50) -ForegroundColor Gray
Write-Host "[COMPLETE] Health Check Complete!" -ForegroundColor Cyan
Write-Host ""
