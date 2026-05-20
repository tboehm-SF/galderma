# Image Replacement Guide

## 🖼️ Images Needed from Original Site

This guide lists all the images that need to be replaced with actual Galderma assets.

## Priority 1: Hero Section

### Hero Patient Photo
**Location:** `components/Hero.tsx` (line ~54)
**Current:** CSS gradient placeholder with skin tones
**Needed:** Professional photo of patient (similar to aspirerewards.com)
**Requirements:**
- High resolution (1200x1600px minimum)
- Portrait orientation
- Patient looking at camera, hand near face
- Natural, warm lighting
- Rounded top (300px border radius)

**Where to get:**
- Galderma marketing asset library
- aspirerewards.com/landing (right-click save, if authorized)
- Professional photographer shoot

**How to replace:**
```tsx
// Replace the gradient div with:
<Image
  src="/images/hero-patient.jpg"
  alt="ASPIRE Rewards member"
  fill
  className="object-cover rounded-t-[300px]"
  priority
  sizes="(max-width: 1024px) 100vw, 45vw"
/>
```

## Priority 2: ASPIRE Logo

### Header Logo
**Location:** `components/Header.tsx` (line ~38)
**Current:** Text-based "ASPIRE" with letter-spacing
**Needed:** Official ASPIRE Galderma logo (SVG preferred)
**Requirements:**
- SVG format (vector, scalable)
- Transparent background
- ~150px width
- Navy blue (#4A5D7F) or official brand colors

**How to replace:**
```tsx
// Replace the span with:
<Image
  src="/images/aspire-logo.svg"
  alt="ASPIRE Galderma Rewards"
  width={150}
  height={40}
  priority
/>
```

## Priority 3: Perks Section

### Benefits/Lifestyle Photo
**Location:** `components/Perks.tsx` (line ~67)
**Current:** Beige gradient placeholder
**Needed:** Lifestyle photo of member using app or at treatment
**Requirements:**
- Aspect ratio: 16:9 (1920x1080px)
- Shows member engaged with ASPIRE program
- Professional quality
- Warm, inviting aesthetic

**Examples:**
- Person holding phone showing ASPIRE app
- Patient at aesthetic practice
- Close-up of rewards card/app interface

**How to replace:**
```tsx
<Image
  src="/images/perks-lifestyle.jpg"
  alt="ASPIRE member benefits"
  fill
  className="object-cover"
  sizes="(max-width: 1280px) 100vw, 1280px"
/>
```

## Optional: Product Logos/Icons

### Treatment Icons
If you want actual product logos instead of generic Lucide icons:

**Dysport® Logo**
- Use in Footer (Dysport section)
- SVG format, transparent background

**Restylane® Logo**
- Use in Footer (Restylane section)  
- SVG format, transparent background

**Sculptra® Logo**
- Use in Footer (Sculptra section)
- SVG format, transparent background

## How to Download Images from Original Site

### Method 1: Browser DevTools

1. Visit https://www.aspirerewards.com/landing
2. Right-click on image → "Inspect"
3. Find `<img>` tag in Elements panel
4. Copy `src` URL
5. Open URL in new tab
6. Right-click → "Save Image As..."

### Method 2: Network Tab

1. Open DevTools → Network tab
2. Refresh page
3. Filter by "Img"
4. Find hero image (usually largest file)
5. Right-click → "Open in new tab"
6. Save image

### Method 3: Wget/Curl Command

```bash
# Example (replace with actual URL):
curl -o public/images/hero-patient.jpg "https://www.aspirerewards.com/assets/hero.jpg"
```

## Image Optimization

After obtaining images, optimize them:

```bash
# Install optimization tools
npm install -g sharp-cli

# Optimize JPEG
sharp -i hero-patient.jpg -o hero-patient-optimized.jpg --quality 85

# Convert to WebP (better compression)
sharp -i hero-patient.jpg -o hero-patient.webp --quality 85
```

## File Structure

Save images to:
```
galderma/
└── public/
    └── images/
        ├── hero-patient.jpg (or .webp)
        ├── aspire-logo.svg
        ├── perks-lifestyle.jpg
        ├── dysport-logo.svg (optional)
        ├── restylane-logo.svg (optional)
        └── sculptra-logo.svg (optional)
```

## Next.js Image Component Benefits

Using Next.js `<Image>`:
- ✅ Automatic optimization
- ✅ Lazy loading
- ✅ Responsive sizing
- ✅ WebP format conversion
- ✅ Blur placeholder
- ✅ Priority loading for above-fold images

## Testing After Replacement

1. **Visual check:**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

2. **Lighthouse audit:**
   - Open DevTools → Lighthouse tab
   - Run performance audit
   - Check image optimization scores

3. **Mobile test:**
   - DevTools → Toggle device toolbar
   - Test on iPhone, iPad sizes

## Current Status

- [ ] Hero patient photo
- [ ] ASPIRE logo (using text placeholder)
- [ ] Perks lifestyle photo
- [ ] Product logos (optional)

## Legal Note

Ensure you have rights to use all images:
- ✅ Licensed from Galderma
- ✅ Created for ASPIRE program
- ✅ Stock photos with commercial license
- ❌ Downloaded without permission (copyright violation)

## Questions?

Contact Galderma marketing team for:
- Official asset library access
- Brand guidelines
- Approved photography
- Logo files

---

**Once you have the images, just drop them in `public/images/` and update the component code as shown above!**
