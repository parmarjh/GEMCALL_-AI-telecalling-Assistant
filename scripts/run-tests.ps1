# GEMCALL Test Runner
# Runs all tests with coverage and generates report

param(
    [switch]$Watch,
    [switch]$Coverage,
    [string]$File = ""
)

Write-Host "`n🧪 GEMCALL Test Runner" -ForegroundColor Cyan
Write-Host ("=" * 50) -ForegroundColor Gray

# Build command
$testCmd = "npm test --"

if ($File) {
    $testCmd += " $File"
    Write-Host "`n📝 Running tests for: $File" -ForegroundColor Yellow
}
else {
    Write-Host "`n📝 Running all tests..." -ForegroundColor Yellow
}

if ($Coverage) {
    $testCmd += " --coverage"
    Write-Host "   📊 Coverage enabled" -ForegroundColor Cyan
}

if ($Watch) {
    $testCmd += " --watch"
    Write-Host "   👀 Watch mode enabled" -ForegroundColor Cyan
}
else {
    $testCmd += " --run"
}

Write-Host "`n🚀 Executing: $testCmd" -ForegroundColor Gray
Write-Host ""

# Run tests
Invoke-Expression $testCmd

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ All tests passed!" -ForegroundColor Green
    
    if ($Coverage -and (Test-Path "coverage")) {
        Write-Host "`n📊 Coverage report generated in ./coverage" -ForegroundColor Cyan
    }
}
else {
    Write-Host "`n❌ Some tests failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
