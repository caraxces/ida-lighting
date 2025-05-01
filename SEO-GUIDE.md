# SEO Guide for IDA Lighting Website

## Troubleshooting Zalo Sharing Issues

This guide addresses issues with meta tags not appearing when sharing links on Zalo.

### Identified Problems

1. **Relative URLs in meta tags**: Zalo requires absolute URLs with domain name for images.
2. **Large image file sizes**: The `og-image.jpg` is 9MB, which is too large for social sharing.
3. **Missing Zalo-specific meta tags**: Zalo may need specific meta tags to properly render previews.
4. **Image dimensions**: Social platforms prefer specific image dimensions.

### Solutions Implemented

1. **Updated meta tags in `app/layout.tsx`**:
   - Changed relative paths to absolute URLs including domain name
   - Added Zalo-specific meta tags

2. **Image Optimization**:
   - Created a script to optimize the OG image (`scripts/optimize-og-image.js`)
   - Target size: 1200x630 pixels, <200KB

### Manual Steps Required

1. **Optimize the OG image**:
   ```
   # If you have ImageMagick installed
   node scripts/optimize-og-image.js
   
   # Manual alternative
   1. Use an image editor to resize og-image.jpg to 1200x630 pixels
   2. Compress the image to <200KB
   3. Replace public/og-image.jpg with the optimized version
   ```

2. **Test Zalo Sharing**:
   - Use Zalo's sharing debugger (if available)
   - Or manually test by sharing the URL in a Zalo chat
   - Check if preview shows correct title, description, and image

3. **Additional Checks**:
   - Ensure your server is not blocking Zalo's crawler
   - Check if robots.txt allows crawling
   - Verify the website is accessible (no IP restrictions or geo-blocking)

### Zalo Social Sharing Requirements

- **Image dimensions**: 1200x630 pixels (optimal)
- **Image formats**: JPG or PNG
- **File size**: <200KB recommended
- **Metadata**: Must include title, description, and image
- **URL format**: Must be publicly accessible

### Troubleshooting

If sharing issues persist:
1. Check if your website is accessible to Zalo's crawler
2. Ensure the meta tags are being rendered in the HTML source (not just in the JavaScript/React code)
3. Confirm your URL is not being blocked by Zalo
4. Wait for Zalo to re-crawl your site (this may take 24-48 hours) 