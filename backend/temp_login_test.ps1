$body = '{"email":"director.di@test.com","motDePasse":"1234"}'
try {
  $response = Invoke-WebRequest -Uri 'http://localhost:5000/api/auth/login' -Method Post -Body $body -ContentType 'application/json' -UseBasicParsing
  Write-Host "STATUS: $($response.StatusCode)"
  Write-Host "BODY: $($response.Content)"
} catch {
  $resp = $_.Exception.Response
  if ($resp -ne $null) {
    $stream = $resp.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $text = $reader.ReadToEnd()
    Write-Host "ERROR_STATUS: $($resp.StatusCode.Value__)"
    Write-Host "ERROR_BODY: $text"
  } else {
    Write-Host "ERROR: $_"
  }
}
