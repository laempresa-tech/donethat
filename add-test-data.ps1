# Script to add 50 test entries to DoneThat database

Write-Host ""
Write-Host "=== Adding 50 Test Entries to Database ===" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:8888/.netlify/functions/submit-form"
$successCount = 0
$errorCount = 0

for ($i = 1; $i -le 50; $i++) {
    $userType = if ($i % 2 -eq 0) { "expert" } else { "user" }
    $email = "testuser$i@example.com"
    
    $body = @{
        email = $email
        userType = $userType
    } | ConvertTo-Json

    try {
        $response = Invoke-WebRequest -Uri $baseUrl -Method POST -Body $body -ContentType 'application/json' -UseBasicParsing -ErrorAction SilentlyContinue

        if ($response.StatusCode -eq 201) {
            $successCount++
            Write-Host "✓ Added: $email ($userType) - [$successCount/50]" -ForegroundColor Green
        }
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 409) {
            Write-Host "⊘ Skipped: $email (already exists)" -ForegroundColor Yellow
        } else {
            $errorCount++
            Write-Host "✗ Failed: $email" -ForegroundColor Red
        }
    }
    
    # Small delay to avoid overwhelming the server
    Start-Sleep -Milliseconds 100
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Successfully added: $successCount entries" -ForegroundColor Green
Write-Host "Errors/Skipped: $errorCount entries" -ForegroundColor Yellow
Write-Host ""
Write-Host "Done! Check the admin dashboard at http://localhost:8888/admin" -ForegroundColor Cyan
Write-Host 'API Key: admin@donethatapp123' -ForegroundColor Yellow
Write-Host ""
