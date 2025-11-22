# GEMCALL Quick Fix Script
# Fixes common development issues automatically

Write-Host "`n 🔧 GEMCALL Quick Fix" -ForegroundColor Cyan
Write-Host ("=" * 50) -ForegroundColor Gray

# Ask user what to fix
Write-Host "`nWhat would you like to fix?" -ForegroundColor Yellow
Write-Host "1. Clear cache and reinstall dependencies" -ForegroundColor White
Write-Host "2. Reset build (clear dist and rebuild)" -ForegroundColor White
Write-Host "3. Fix git issues (reset to last commit)" -ForegroundColor White
Write-Host "4. Full reset (nuclear option - cleans everything)" -ForegroundColor White
Write-Host "5. Fix port conflict (kill process on 3000)" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host "`n🗑️  Clearing cache and reinstalling..." -ForegroundColor Yellow
        
        if (Test-Path "node_modules") {
            Write-Host "   Removing node_modules..." -ForegroundColor Gray
            Remove-Item -Recurse -Force "node_modules"
        }
        
        if (Test-Path "node_modules\.vite") {
            Write-Host "   Clearing Vite cache..." -ForegroundColor Gray
            Remove-Item -Recurse -Force "node_modules\.vite"
        }
        
        if (Test-Path "package-lock.json") {
            Write-Host "   Removing package-lock.json..." -ForegroundColor Gray
            Remove-Item -Force "package-lock.json"
        }
        
        Write-Host "   Installing fresh dependencies..." -ForegroundColor Gray
        npm install
        
        Write-Host "`n   ✅ Dependencies reinstalled!" -ForegroundColor Green
    }
    
    "2" {
        Write-Host "`n🏗️  Resetting build..." -ForegroundColor Yellow
        
        if (Test-Path "dist") {
            Write-Host "   Removing dist..." -ForegroundColor Gray
            Remove-Item -Recurse -Force "dist"
        }
        
        if (Test-Path "node_modules\.vite") {
            Write-Host "   Clearing Vite cache..." -ForegroundColor Gray
            Remove-Item -Recurse -Force "node_modules\.vite"
        }
        
        Write-Host "   Rebuilding..." -ForegroundColor Gray
        npm run build
        
        Write-Host "`n   ✅ Build reset complete!" -ForegroundColor Green
    }
    
    "3" {
        Write-Host "`n⚠️  Git Reset Warning!" -ForegroundColor Red
        Write-Host "   This will discard all uncommitted changes!" -ForegroundColor Yellow
        $confirm = Read-Host "   Are you sure? (yes/no)"
        
        if ($confirm -eq "yes") {
            Write-Host "   Resetting to last commit..." -ForegroundColor Gray
            git reset --hard HEAD
            git clean -fd
            Write-Host "`n   ✅ Git reset complete!" -ForegroundColor Green
        }
        else {
            Write-Host "`n   ❌ Cancelled" -ForegroundColor Red
        }
    }
    
    "4" {
        Write-Host "`n⚠️  NUCLEAR OPTION WARNING!" -ForegroundColor Red
        Write-Host "   This will delete:" -ForegroundColor Yellow
        Write-Host "   - node_modules/" -ForegroundColor Red
        Write-Host "   - dist/" -ForegroundColor Red
        Write-Host "   - coverage/" -ForegroundColor Red
        Write-Host "   - package-lock.json" -ForegroundColor Red
        Write-Host "   - All uncommitted git changes" -ForegroundColor Red
        $confirm = Read-Host "`n   Type 'RESET' to confirm"
        
        if ($confirm -eq "RESET") {
            Write-Host "`n   🗑️  Deleting everything..." -ForegroundColor Gray
            
            @("node_modules", "dist", "coverage", "package-lock.json") | ForEach-Object {
                if (Test-Path $_) {
                    Remove-Item -Recurse -Force $_
                    Write-Host "   ✅ Removed $_" -ForegroundColor Green
                }
            }
            
            git reset --hard HEAD
            git clean -fd
            
            Write-Host "`n   📦 Reinstalling..." -ForegroundColor Gray
            npm install
            
            Write-Host "`n   ✅ Full reset complete!" -ForegroundColor Green
            Write-Host "   💡 Run 'npm run dev' to start fresh" -ForegroundColor Cyan
        }
        else {
            Write-Host "`n   ❌ Cancelled" -ForegroundColor Red
        }
    }
    
    "5" {
        Write-Host "`n🔌 Fixing port 3000..." -ForegroundColor Yellow
        
        $process = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue |
        Select-Object -ExpandProperty OwningProcess -Unique
        
        if ($process) {
            $processInfo = Get-Process -Id $process
            Write-Host "   Found process: $($processInfo.ProcessName) (PID: $process)" -ForegroundColor Cyan
            
            $confirm = Read-Host "   Kill this process? (yes/no)"
            if ($confirm -eq "yes") {
                Stop-Process -Id $process -Force
                Write-Host "`n   ✅ Process killed!" -ForegroundColor Green
                Write-Host "   💡 Port 3000 is now free" -ForegroundColor Cyan
            }
            else {
                Write-Host "`n   ❌ Cancelled" -ForegroundColor Red
            }
        }
        else {
            Write-Host "   ℹ️  No process found on port 3000" -ForegroundColor Cyan
        }
    }
    
    default {
        Write-Host "`n❌ Invalid choice!" -ForegroundColor Red
    }
}

Write-Host ""
