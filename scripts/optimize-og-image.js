// Script to generate an optimized og-image.jpg file
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const publicDir = path.join(__dirname, '../public');
const sourceImage = path.join(publicDir, 'og-image.jpg');
const outputImage = path.join(publicDir, 'og-image-optimized.jpg');

// Create directory if it doesn't exist
if (!fs.existsSync(path.dirname(outputImage))) {
  fs.mkdirSync(path.dirname(outputImage), { recursive: true });
}

console.log('Optimizing og-image.jpg...');

try {
  // Using built-in tools to optimize the image
  // For Windows, this assumes ImageMagick is available
  // You may need to install it: https://imagemagick.org/script/download.php
  execSync(`magick convert "${sourceImage}" -resize 1200x630 -quality 85 "${outputImage}"`, { stdio: 'inherit' });
  
  console.log(`Optimized image saved to: ${outputImage}`);
  console.log('After confirming the image quality, rename it to og-image.jpg');
  
} catch (error) {
  console.error('Error optimizing image:', error.message);
  console.log('Manual optimization recommendation:');
  console.log('1. Use an image editor to resize the image to 1200x630 pixels');
  console.log('2. Compress the image to reduce file size (aim for <200KB)');
  console.log('3. Replace the existing og-image.jpg with the optimized version');
} 