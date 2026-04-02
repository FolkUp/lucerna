---
title: "LCRN-131 Visual Content Creation — Technical Specifications"
date_created: 2026-04-02
date_updated: 2026-04-02
status: execution_ready
priority: P0
---

# LCRN-131 Visual Content Creation — Phase 1 Technical Specifications

**Enhanced Alice v2.0 Cartouche Autonome Execution**
**TARGET:** Magazine-quality "модная красивая и удобная статья"
**STATUS:** Technical foundation operational → asset creation critical path

---

## 🎯 CRITICAL PATH: Asset Requirements

### 1. HERO IMAGE SPECIFICATION (P0 BLOCKER)

**Underground Resistance Visual Aesthetics**

#### Technical Requirements
```
Dimensions: 1920×1080 (16:9 aspect ratio)
Format: WebP primary + JPG fallback
Size: <150KB optimized
Color space: sRGB
DPI: 72 (web optimized)
```

#### Visual Composition — Underground Resistance Aesthetic
- **Central Element:** Cryptographic cipher wheels + underground network patterns + stenographic shadows
- **Metaphor:** Поэтическая криптография + cultural seismography + underground resistance communication
- **Lighting:** Deep charcoal ambience with muted gold highlights — encrypted knowledge emerging through resistance channels
- **Framing:** Cultural investigator decoding underground messages, viewer as co-conspirator in resistance archaeology
- **Text Overlay Space:** Clear areas for Russian headline text with resistance-coded styling + samizdat typography

#### Brand Integration — Underground Resistance Palette (Brand Guide v2.5)
```css
/* Underground Resistance Color Palette */
Deep Charcoal: rgb(23, 20, 18)     /* Primary resistance background */
Muted Gold: rgb(184, 134, 11)      /* Encrypted highlights + cipher accents */
Encrypted Blue: rgb(37, 99, 144)   /* Cryptographic elements + underground networks */
Samizdat Gray: rgb(82, 76, 67)     /* Secondary text + resistance shadows */
```

#### Performance Optimization
- **Critical CSS inlined:** Above-the-fold rendering
- **Lazy loading:** Below-fold progressive enhancement
- **Aspect ratio declared:** Prevent layout shifts
- **Preload hint:** `<link rel="preload" as="image">`

#### Accessibility Compliance (WCAG 2.1 AA)
- **Alt text:** "Подпольная криптография — визуальная метафора сопротивления и поэтического шифрования в расследовании 'Организация' Оксимирона"
- **Contrast ratio:** Minimum 4.5:1 for text overlays
- **Screen reader:** Semantic description of visual metaphor

---

### 2. TIMELINE ANIMATIONS SPECIFICATION

**Cultural Impact Visualization 2021-2026**

#### Technical Architecture
```javascript
// Intersection Observer API (performance-first)
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      entry.target.classList.add('animate-in');
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
});
```

#### Animation Specifications

**Timeline Entry Animation**
- **Trigger:** 30% visible in viewport
- **Duration:** 0.8s ease-out
- **Transform:** `translateY(40px)` → `translateY(0)` + `opacity: 0` → `opacity: 1`
- **Stagger:** 150ms delay between consecutive items
- **GPU Acceleration:** `transform3d(0,0,0)` for smooth performance

**Interactive Hover States**
- **Desktop:** Subtle scale(1.02) on timeline item hover
- **Touch devices:** 44×44px minimum touch targets
- **Focus indicators:** 2px teal outline for keyboard navigation
- **Disabled on reduced motion:** `@media (prefers-reduced-motion: reduce)`

#### Key Timeline Dates with Interactions
```markdown
November 12, 2021 → "Смутное Время" release
├── Interactive: Album cover preview
├── Context: Cultural moment analysis
└── Animation: Pulse effect on data point

February 2022 → First cultural responses
├── Interactive: Tweet gallery modal
├── Context: Viral spread visualization
└── Animation: Network expansion effect

Present (2026) → Investigation completion
├── Interactive: Full timeline overview
├── Context: Cultural impact summary
└── Animation: Completion badge
```

#### Mobile-Responsive Adaptations
- **Mobile:** Vertical timeline (single column)
- **Tablet:** Enhanced spacing for touch interaction
- **Desktop:** Full horizontal timeline with parallax hints
- **Performance budget:** <25KB JavaScript total

---

### 3. EVIDENCE GALLERIES OPTIMIZATION

**Modal System для Source Documentation**

#### Technical Implementation
```html
<!-- Modal Trigger -->
<button class="evidence-trigger"
        data-evidence="source-01"
        aria-describedby="evidence-description">
  [Источник: РБК, 15.11.2021]
</button>

<!-- Modal Container -->
<div class="evidence-modal"
     id="evidence-modal-01"
     role="dialog"
     aria-labelledby="evidence-title"
     aria-modal="true">
  <!-- Evidence content -->
</div>
```

#### Gallery Features

**Thumbnail Grid**
- **Layout:** CSS Grid with `fr` units for responsive scaling
- **Lazy loading:** Native `loading="lazy"` + Intersection Observer fallback
- **Progressive enhancement:** Works without JavaScript

**Lightbox Functionality**
- **Keyboard navigation:** Arrow keys, Escape, Tab trap
- **Touch gestures:** Swipe on mobile devices
- **Close triggers:** Escape key, overlay click, X button
- **Focus management:** Return focus to trigger button

**Performance Optimizations**
- **Image formats:** WebP with JPEG fallbacks
- **Responsive images:** `srcset` with 3 breakpoints (480w, 768w, 1200w)
- **Preload critical:** First 3 evidence images above fold
- **Bundle size:** <15KB JavaScript + CSS combined

#### Accessibility Implementation
```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  .evidence-modal {
    background: #000;
    border: 2px solid #fff;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .evidence-modal {
    transform: none;
    transition: opacity 0.2s;
  }
}
```

---

## 📊 PERFORMANCE REQUIREMENTS

### Core Web Vitals Targets
```
LCP (Largest Contentful Paint): <2.5s
FID (First Input Delay): <100ms
CLS (Cumulative Layout Shift): <0.1
```

### Resource Budget Breakdown
```
CSS Payload: <50KB compressed
├── Critical inline: ~8KB (hero + above-fold)
├── Timeline styles: ~12KB (lazy loaded)
├── Evidence gallery: ~8KB (lazy loaded)
└── Brand components: ~15KB (cached)

JavaScript Payload: <25KB compressed
├── Timeline animations: ~8KB
├── Evidence modals: ~10KB
├── Performance observers: ~5KB
└── Accessibility enhancements: ~2KB

Image Payload:
├── Hero poster: <150KB (critical path)
├── Timeline thumbnails: <50KB each (lazy)
├── Evidence gallery: <200KB total (progressive)
└── Icons/graphics: <30KB (SVG optimized)
```

### Loading Strategy
1. **Critical path:** Hero image + inline CSS (LCP <2.5s)
2. **Progressive enhancement:** Timeline animations after user interaction
3. **Evidence gallery:** Lazy load on scroll intersection
4. **Performance monitoring:** Real User Metrics collection

---

## 🎨 BRAND GUIDE V2.5 INTEGRATION

### Visual Hierarchy
```css
/* Typography Scale */
h1.hero-title: clamp(2.5rem, 8vw, 4rem) /* Playfair Display */
h2.section-title: clamp(1.8rem, 4vw, 2.5rem)
h3.timeline-header: clamp(1.2rem, 3vw, 1.5rem)
p.body-text: clamp(1rem, 2vw, 1.125rem) /* System stack */
```

### Underground Resistance Palette Application
```css
/* Underground Resistance Effects */
--resistance-primary: rgba(23, 20, 18, 0.95);     /* Deep charcoal cryptographic base */
--resistance-secondary: rgba(184, 134, 11, 0.08); /* Muted gold cipher traces */
--cryptographic-patterns: rgba(37, 99, 144, 0.06); /* Encrypted blue code overlays */

/* Timeline Accent Colors — Underground Resistance */
--timeline-point: rgb(184, 134, 11);     /* Muted gold resistance markers */
--timeline-line: rgba(37, 99, 144, 0.7); /* Encrypted blue investigation thread */
--timeline-hover: rgba(184, 134, 11, 0.9); /* Gold resistance interaction state */

/* Evidence Gallery — Resistance Aesthetic */
--modal-overlay: rgba(23, 20, 18, 0.98); /* Deep charcoal underground ambience */
--modal-border: rgb(184, 134, 11);       /* Muted gold cipher frame */
--modal-text: rgb(82, 76, 67);           /* Samizdat gray resistance text */
```

### Logo Integration Points
- **Header:** FolkUp logo top-right (mobile: hamburger menu)
- **Footer:** Full branding with Ko-fi donation CTA
- **Timeline:** Subtle FolkUp watermark on investigation completion
- **Evidence modals:** "Verified by FolkUp" badge on sources

---

## 🔧 IMPLEMENTATION ROADMAP

### Phase 1A: Hero Asset Creation (4-6h) — Underground Resistance
1. **Create frames:** Cryptographic cipher wheels + underground network patterns + stenographic elements
2. **Compose hero image:** Underground resistance aesthetic + поэтическая криптография + brand integration
3. **Optimize assets:** WebP conversion + performance testing
4. **Integration testing:** LCP measurement with underground resistance visual assets

### Phase 1B: Timeline Implementation (3-4h)
1. **Animation development:** Intersection Observer + CSS animations
2. **Interactive states:** Hover/focus/touch enhancements
3. **Mobile optimization:** Touch target sizing + gesture support
4. **Accessibility audit:** Screen reader + keyboard navigation

### Phase 1C: Evidence Gallery Polish (2-3h)
1. **Modal system:** Keyboard navigation + focus management
2. **Image optimization:** Responsive srcsets + lazy loading
3. **Performance tuning:** Bundle size optimization
4. **Cross-browser testing:** Safari, Firefox, Edge compatibility

### Phase 1D: Integration & Testing (2-3h)
1. **Performance validation:** Core Web Vitals measurement
2. **Accessibility audit:** WCAG 2.1 AA compliance verification
3. **Cross-device testing:** Mobile/tablet/desktop responsive
4. **Final optimization:** Critical CSS inlining + asset preloading

---

## ✅ ACCEPTANCE CRITERIA

### Technical Standards
- [ ] LCP <2.5s on 3G connection simulation
- [ ] WCAG 2.1 AA compliance verified (screen reader + keyboard)
- [ ] Brand Guide v2.5 color palette implementation
- [ ] Progressive enhancement (works without JavaScript)
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

### Visual Quality
- [ ] "Модная красивая и удобная" aesthetic achieved
- [ ] Underground resistance visual DNA authentically represented
- [ ] Cultural investigation narrative visually supported through poetic cryptography
- [ ] FolkUp brand integration seamless but not overwhelming

### Performance Targets
- [ ] Hero image loads and displays within LCP budget
- [ ] Timeline animations smooth on mid-range devices
- [ ] Evidence gallery responsive across all screen sizes
- [ ] Total JavaScript payload <25KB compressed

### Accessibility Compliance
- [ ] All interactive elements keyboard navigable
- [ ] Screen reader announcements clear and helpful
- [ ] High contrast mode supported
- [ ] Reduced motion preferences respected
- [ ] Touch targets minimum 44×44px

---

**EXECUTION AUTHORITY:** Enhanced Alice v2.0 Cartouche Autonome
**SUPERVISION REQUIRED:** Banking-level verification for all deliverables
**ESTIMATED COMPLETION:** Phase 1 deliverables ready within 11-15h total effort

**NEXT PHASE:** Asset creation → Performance testing → Magazine-quality publication