---
title: "Technical Specifications"
slug: technical-specs
date_created: 2026-03-26
date_updated: 2026-03-26
status: verified
draft: true
---

# Oxymiron Investigation — Technical Specifications

**Investigation:** "Organization" by Oxymiron — OSINT Investigation of a Cultural Phenomenon
**Phase:** 5A Technical Foundation
**Date:** 2026-03-26
**Target:** LCP <2.5s | WCAG 2.1 AA | Brand Guide v2.5

## Stack Architecture

### Hugo + Blowfish Integration ✅
- **Theme:** Blowfish (not Hextra) — native Timeline shortcode support
- **Timeline:** Built-in `{{</* timeline */>}}` + `{{</* timelineItem */>}}` shortcodes
- **Performance:** Server-side rendering, no external JS dependencies
- **Compatibility:** Fully compatible with existing Lucerna setup

### Content Structure ✅
```
/content/investigations/oxymiron-organizatsiya/
├── index.ru.md          # Primary (Russian)
├── index.en.md          # Cultural adaptation (English)
├── images/              # WebP optimized assets
├── TECHNICAL_SPECS.md   # This document
└── data/                # Timeline JSON data (future)
```

### Performance Foundation ✅

#### Mobile-First Breakpoints
- **Base:** 320px+ (mobile priority)
- **Tablet:** 768px+ (enhanced layout)
- **Desktop:** 1024px+ (full experience)

#### CSS Performance Strategy
- **Critical CSS:** Inline above-the-fold styles
- **Lazy CSS:** `longread.css` preloaded but not render-blocking
- **Font optimization:** `font-display: swap` on all typefaces
- **Containment:** `contain: layout` on major sections

#### Image Pipeline
- **Format:** WebP primary, JPG fallback
- **Responsive:** 3 sizes (mobile/tablet/desktop)
- **Lazy loading:** Native `loading="lazy"` attribute
- **Aspect ratio:** Declared to prevent layout shifts

## Brand Guide v2.5 Compliance

### Typography
- **Headings:** Playfair Display (self-hosted)
- **Body:** System font stack with fallbacks
- **Logo:** Pacifico (brand consistency)

### Color Palette D
- **Primary:** CSS custom properties from Lucerna scheme
- **Accent:** Brand-compliant accent colors
- **Neutral:** Responsive light/dark mode support

### Component Standards
- **Timeline:** Enhanced with brand colors
- **Sections:** Consistent padding and spacing
- **Cards:** Brand-compliant shadows and borders

## Accessibility (WCAG 2.1 AA)

### Visual Standards
- **Contrast:** 4.5:1 minimum for normal text
- **Focus:** Visible outline on all interactive elements
- **Touch targets:** 44×44px minimum size

### Motion & Animation
- **Reduced motion:** `prefers-reduced-motion` support
- **Performance:** GPU-accelerated animations only
- **Optional:** Smooth scroll enhancements are progressive

### Screen Reader Support
- **Semantic HTML:** Proper heading hierarchy (h1→h2→h3)
- **ARIA:** Labels on timeline elements
- **Live regions:** Progress announcements

## Performance Budget

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** <2.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1

### Resource Budget
- **CSS payload:** <50KB (compressed)
- **Image payload:** Progressive loading
- **JavaScript:** <25KB initial (enhancements only)

### Monitoring
- **Development:** Console logging for vitals
- **Production:** Lighthouse CI integration
- **Real User:** Performance observer API

## Technical Implementation

### Hugo Shortcodes Used
```markdown
{{</* timeline */>}}
  {{</* timelineItem icon="music" header="Header" badge="2015" */>}}
  Content here
  {{</* /timelineItem */>}}
{{</* /timeline */>}}
```

### CSS Architecture
- **Base:** `assets/css/custom.css` (existing)
- **Enhancement:** `assets/css/longread.css` (new)
- **Layout:** `layouts/investigations/single-longread.html` (new)

### Build Process
```bash
# Image optimization
npm run optimize-images

# Full longread build
npm run build-longread

# Development preview
hugo serve --disableFastRender
```

## Content Assembly Strategy

### Phase Approach
1. **Phase 5B:** Content creation (OSINT investigation)
2. **Phase 5C:** Timeline data population
3. **Phase 5D:** Multimedia integration
4. **Phase 5E:** Performance testing & optimization

### Bilingual Strategy
- **Primary:** Russian (`index.ru.md`) — cultural authenticity
- **Secondary:** English (`index.en.md`) — cultural adaptation, not translation
- **Navigation:** Hugo multilingual routing
- **SEO:** `hreflang` attributes for both versions

## Quality Assurance

### Pre-Launch Checklist
- [ ] Hugo build: 0 errors, 0 warnings
- [ ] Timeline functionality verified
- [ ] Mobile responsiveness tested
- [ ] Performance targets met (Lighthouse)
- [ ] Accessibility audit passed
- [ ] Brand Guide compliance verified

### Testing Matrix
- **Browsers:** Chrome, Firefox, Safari, Edge
- **Devices:** iPhone SE, iPad, Desktop 1920px
- **Performance:** 3G throttling simulation
- **Accessibility:** Screen reader testing

## Next Steps

1. **Content Development:** Fill placeholder sections with investigation content
2. **Asset Preparation:** Collect and optimize music video frames
3. **Timeline Data:** Create structured timeline JSON
4. **Performance Testing:** Validate against LCP <2.5s target
5. **Accessibility Audit:** Full WCAG 2.1 AA verification

---

**Status:** Technical foundation complete ✅
**Ready for:** Content assembly phase
**Performance:** Foundation optimized for LCP <2.5s target