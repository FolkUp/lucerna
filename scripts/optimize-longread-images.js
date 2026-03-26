#!/usr/bin/env node

/**
 * Longread Image Optimization Pipeline
 * Optimizes images for multimedia investigations with WebP conversion
 * Brand Guide v2.5 compliant | Performance target: LCP <2.5s
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const CONFIG = {
  input: 'content/investigations/oxymiron-organizatsiya/images',
  output: 'static/images/investigations/oxymiron',
  formats: ['webp', 'jpg'], // WebP primary, JPG fallback
  sizes: {
    mobile: { width: 390, quality: 80 },
    tablet: { width: 768, quality: 85 },
    desktop: { width: 1200, quality: 90 }
  },
  // Brand Guide v2.5 overlay settings
  brandOverlay: {
    enabled: false, // Enable only for hero images
    logo: 'assets/img/folkup-logo-white.svg',
    position: 'bottom-right',
    opacity: 0.8
  }
};

async function optimizeImage(inputPath, outputDir, filename) {
  const name = path.parse(filename).name;
  const results = [];

  try {
    // Create output directory
    await fs.promises.mkdir(outputDir, { recursive: true });

    // Generate responsive sizes
    for (const [sizeName, config] of Object.entries(CONFIG.sizes)) {
      const image = sharp(inputPath);

      // Get original dimensions
      const metadata = await image.metadata();
      console.log(`Processing: ${filename} (${metadata.width}x${metadata.height})`);

      // Resize maintaining aspect ratio
      const resized = image.resize(config.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });

      // Generate WebP (primary format)
      const webpPath = path.join(outputDir, `${name}-${sizeName}.webp`);
      await resized
        .webp({ quality: config.quality, effort: 6 })
        .toFile(webpPath);

      // Generate JPG fallback
      const jpgPath = path.join(outputDir, `${name}-${sizeName}.jpg`);
      await resized
        .jpeg({ quality: config.quality, progressive: true })
        .toFile(jpgPath);

      results.push({
        size: sizeName,
        webp: webpPath,
        jpg: jpgPath,
        dimensions: `${config.width}px`
      });
    }

    return results;
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
    return [];
  }
}

async function generateImageManifest(results, outputDir) {
  const manifest = {
    generated: new Date().toISOString(),
    investigation: 'oxymiron-organizatsiya',
    performance_target: 'LCP <2.5s',
    brand_compliance: 'Brand Guide v2.5',
    images: results
  };

  const manifestPath = path.join(outputDir, 'image-manifest.json');
  await fs.promises.writeFile(
    manifestPath,
    JSON.stringify(manifest, null, 2)
  );

  console.log(`✅ Image manifest generated: ${manifestPath}`);
  return manifestPath;
}

async function generateImageShortcodes(results, outputDir) {
  let shortcodes = `<!-- Oxymiron Investigation Image Shortcodes -->
<!-- Generated: ${new Date().toISOString()} -->
<!-- Usage: Copy shortcode into markdown content -->

`;

  results.forEach(result => {
    const name = path.basename(result.webp, '-mobile.webp');
    shortcodes += `<!-- ${name} - Responsive WebP with fallback -->
{{< picture
  src="/images/investigations/oxymiron/${name}"
  alt="${name} - Oxymiron Organization investigation"
  sizes="(max-width: 390px) 390px, (max-width: 768px) 768px, 1200px"
  loading="lazy"
>}}

`;
  });

  const shortcodesPath = path.join(outputDir, 'image-shortcodes.md');
  await fs.promises.writeFile(shortcodesPath, shortcodes);

  console.log(`✅ Image shortcodes generated: ${shortcodesPath}`);
  return shortcodesPath;
}

async function main() {
  console.log('🚀 Lucerna Longread Image Optimization Pipeline');
  console.log('Target: Oxymiron "Organization" Investigation');
  console.log('Performance Goal: LCP <2.5s\n');

  const inputDir = CONFIG.input;
  const outputDir = CONFIG.output;

  try {
    // Check if input directory exists
    if (!fs.existsSync(inputDir)) {
      console.log(`📁 Creating input directory: ${inputDir}`);
      await fs.promises.mkdir(inputDir, { recursive: true });

      // Create sample placeholder
      const placeholder = `# Oxymiron Investigation Images

Place source images here:
- Music video frames
- Timeline assets
- Cultural context imagery
- Literary reference visuals

Supported formats: JPG, PNG, TIFF
Recommended: High resolution originals
Output: WebP + JPG responsive images`;

      await fs.promises.writeFile(
        path.join(inputDir, 'README.md'),
        placeholder
      );

      console.log(`✅ Input directory ready. Add images to ${inputDir}/`);
      return;
    }

    // Process all images
    const files = await fs.promises.readdir(inputDir);
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|tiff)$/i.test(file) && !file.startsWith('.')
    );

    if (imageFiles.length === 0) {
      console.log(`⚠️  No images found in ${inputDir}/`);
      console.log('Add images (JPG, PNG, TIFF) and run again.');
      return;
    }

    console.log(`📸 Found ${imageFiles.length} images to process\n`);

    const allResults = [];
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const results = await optimizeImage(inputPath, outputDir, file);
      allResults.push(...results);
    }

    // Generate metadata
    await generateImageManifest(allResults, outputDir);
    await generateImageShortcodes(allResults, outputDir);

    console.log('\n🎉 Optimization complete!');
    console.log(`📊 Processed: ${imageFiles.length} source images`);
    console.log(`📷 Generated: ${allResults.length} optimized variants`);
    console.log(`📁 Output: ${outputDir}/`);
    console.log('\nNext steps:');
    console.log('1. Review image-shortcodes.md for Hugo integration');
    console.log('2. Test performance with Lighthouse');
    console.log('3. Verify Brand Guide v2.5 compliance');

  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { optimizeImage, CONFIG };