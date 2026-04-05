# LCRN-131 Hero Image Optimization Pipeline
# WebP responsive variants for glass wall poster
# Enhanced Alice v2.0 — Banking-level performance pipeline

param(
    [Parameter(Mandatory=$true)]
    [string]$InputImage,

    [Parameter(Mandatory=$true)]
    [string]$OutputDir,

    [string]$BaseName = "glass-wall-poster"
)

Write-Host "🔧 LCRN-131 Hero Image Pipeline — $BaseName" -ForegroundColor Green

# Verify cwebp availability
if (-not (Get-Command cwebp -ErrorAction SilentlyContinue)) {
    Write-Error "cwebp not found. Install WebP tools first."
    exit 1
}

# Create output directory
New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null

# Responsive breakpoints (Brand Guide v2.5 compliant)
$variants = @(
    @{ width=1920; height=1080; quality=80; suffix="" }          # Desktop hero
    @{ width=1200; height=675;  quality=75; suffix="-1200w" }    # Tablet landscape
    @{ width=768;  height=432;  quality=75; suffix="-768w" }     # Tablet portrait
    @{ width=480;  height=270;  quality=70; suffix="-480w" }     # Mobile
)

Write-Host "📐 Generating responsive variants..."

foreach ($variant in $variants) {
    $outputFile = Join-Path $OutputDir "$BaseName$($variant.suffix).webp"

    $cmd = "cwebp -q $($variant.quality) -resize $($variant.width) $($variant.height) `"$InputImage`" -o `"$outputFile`""

    Write-Host "   → $($variant.width)×$($variant.height) @ Q$($variant.quality)" -ForegroundColor Cyan

    Invoke-Expression $cmd

    if (Test-Path $outputFile) {
        $size = [math]::Round((Get-Item $outputFile).Length / 1KB, 1)
        Write-Host "     ✅ $outputFile ($size KB)" -ForegroundColor Green
    } else {
        Write-Error "     ❌ Failed to generate $outputFile"
    }
}

# Generate srcset attribute for HTML
Write-Host "`n📋 Hugo shortcode srcset attribute:" -ForegroundColor Yellow
Write-Host "poster_url=`"/images/investigations/oxymiron/$BaseName.webp`""
Write-Host "poster_srcset=`"/images/investigations/oxymiron/$BaseName-480w.webp 480w, /images/investigations/oxymiron/$BaseName-768w.webp 768w, /images/investigations/oxymiron/$BaseName-1200w.webp 1200w, /images/investigations/oxymiron/$BaseName.webp 1920w`""
Write-Host "poster_sizes=`"(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1200px) 1200px, 1920px`""

Write-Host "`n🎯 LCRN-131 Pipeline Complete — Ready for Hugo integration" -ForegroundColor Green