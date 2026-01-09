/**
 * Generate PWA icons from logo.png
 */
const sharp = require('sharp');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const logoPath = path.join(__dirname, '../public/logo.png');
const outputDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
  console.log('🎨 Generating PWA icons from logo.png...\n');
  
  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    
    await sharp(logoPath)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Generated icon-${size}x${size}.png`);
  }
  
  // Generate maskable icon (with padding for safe zone)
  const maskablePath = path.join(outputDir, 'icon-maskable.png');
  await sharp(logoPath)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 13, g: 27, b: 42, alpha: 1 } // #0D1B2A
    })
    .png()
    .toFile(maskablePath);
  
  console.log('✅ Generated icon-maskable.png (with safe zone)');
  
  // Generate favicon
  const faviconPath = path.join(__dirname, '../public/favicon.png');
  await sharp(logoPath)
    .resize(32, 32, {
      fit: 'cover',
      position: 'center'
    })
    .png()
    .toFile(faviconPath);
  
  console.log('✅ Generated favicon.png');
  
  console.log('\n🎉 All icons generated successfully!');
}

generateIcons().catch(console.error);
