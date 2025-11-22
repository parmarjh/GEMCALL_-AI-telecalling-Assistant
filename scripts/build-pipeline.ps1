# GEMCALL Build and Test Pipeline
# Runs full CI/CD pipeline locally

Write-Host "`n🚀 GEMCALL Build Pipeline" -ForegroundColor Cyan
Write-Host ("=" * 50) -ForegroundColor Gray

$startTime = Get-Date

# Step 1: Clean
Write-Host "`n1️⃣  Cleaning..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "   ✅ Removed dist/" -ForegroundColor Green
}
if (Test-Path "coverage") {
    Remove-Item -Recurse -Force "coverage"
    Write-Host "   ✅ Removed coverage/" -ForegroundColor Green
}

# Step 2: Install Dependencies
Write-Host "`n2️⃣  Installing dependencies..." -ForegroundColor Yellow
npm ci
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Dependency installation failed!" -ForegroundColor Red
    exit 1
}
Write-Host "   ✅ Dependencies installed" -ForegroundColor Green

# Step 3: Type Check (optional)
Write-Host "`n3️⃣  Type checking..." -ForegroundColor Yellow
Write-Host "   ℹ️  TypeScript check (via build)" -ForegroundColor Cyan

# Step 4: Run Tests
Write-Host "`n4️⃣  Running tests..." -ForegroundColor Yellow
npm test -- --run --coverage
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Tests failed!" -ForegroundColor Red
    exit 1
}
Write-Host "   ✅ All tests passed" -ForegroundColor Green

# Step 5: Build
Write-Host "`n5️⃣  Building for production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Check build size
$distSize = (Get-ChildItem "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "   ✅ Build successful" -ForegroundColor Green
Write-Host "   📦 Build size: $([math]::Round($distSize, 2)) MB" -ForegroundColor Cyan

# Step 6: Build Preview
Write-Host "`n6️⃣  Build can be previewed with:" -ForegroundColor Yellow
Write-Host "   npx vite preview" -ForegroundColor Cyan

# Summary
$duration = (Get-Date) - $startTime
Write-Host "`n" -NoNewline
Write-Host ("=" * 50) -ForegroundColor Gray
Write-Host "✅ Pipeline Complete!" -ForegroundColor Green
Write-Host "⏱️  Duration: $([math]::Round($duration.TotalSeconds, 1))s" -ForegroundColor Cyan
Write-Host ""
