---
title: "LCRN-132 Deployment Readiness Checklist"
slug: deployment-readiness-checklist
date_created: 2026-03-28
status: draft
---

# LCRN-132 Deployment Readiness Checklist

**Project:** Oxymiron "Организация" Investigation
**Audit Date:** 2026-03-28
**Current Status:** Staging-Ready | Production pending Phase 0C + 0D

---

## ✅ Phase 0B — Architecture Verification (COMPLETE)

- [x] Blowfish shortcodes (`timeline` + `timelineItem`) verified present
- [x] YAML data structure created (`data/oxymiron_timeline.yaml`, 350+ lines)
- [x] 3 armor layers documented (Literature, Visual, Semantic)
- [x] 6 timeline events mapped with evidence chains
- [x] Hugo build tested: 0 errors, 0 warnings
- [x] Content mapping: 100% article timeline extracted
- [x] Accessibility semantics verified (WCAG 2.1 AA structure)

**Deliverables:**
- [x] `data/oxymiron_timeline.yaml` ✅
- [x] `ARCHITECTURE_AUDIT.md` ✅

---

## ✅ Phase 1 — Component Implementation (COMPLETE)

### HTML/CSS Components
- [x] Hero video partial created (`layouts/partials/hero-video-investigation.html`)
- [x] Hero shortcode created (`layouts/shortcodes/hero-investigation.html`)
- [x] Hero CSS created (`assets/css/hero-investigation.css`)
- [x] Brand Guide v2.5 Palette D colors applied
- [x] Underground resistance visual aesthetics coded
- [x] Responsive mobile-first design implemented
- [x] Dark mode support added
- [x] Reduced motion animations included

### Content Integration
- [x] Article frontmatter complete (23 fields)
- [x] All required metadata present (title, status, tags, sources, etc.)
- [x] Publication compliance fields (pii_reviewed, naming_justified, legal_risk)
- [x] Bilingual parity (RU/EN versions synchronized)
- [x] Cross-language date/timeline corrections applied

**Deliverables:**
- [x] `layouts/partials/hero-video-investigation.html` ✅
- [x] `layouts/shortcodes/hero-investigation.html` ✅
- [x] `assets/css/hero-investigation.css` ✅
- [x] `HERO_IMPLEMENTATION.md` ✅

**Status Note:** Components ready for staging. Assets required for production.

---

## ⏳ Phase 0C — Asset Creation (NOT STARTED)

### Poster Image (Required for LCP <2.5s)

**Specification:**
- [ ] Source: Underground resistance visual aesthetics concept
- [ ] Dimensions: 1920×1080 (16:9)
- [ ] Format: WebP primary + JPG fallback
- [ ] Size target: <150KB optimized
- [ ] Content: Cryptographic patterns with seismographic elements
- [ ] Alt text: "Поэтическая криптография — визуальная метафора культурного сопротивления"

**Creation Steps:**
1. [ ] Create underground resistance visual concept with cryptographic elements
2. [ ] Design at 1920×1080 maintaining aspect ratio
3. [ ] Convert to WebP with quality 85
4. [ ] Create JPG fallback (quality 85)
5. [ ] Optimize to <150KB target
6. [ ] Place at `static/images/investigations/oxymiron/underground-resistance-poster.webp`

**Estimated Time:** 3-4 hours

---

### Background Video (Optional but improves experience)

**Specification:**
- [ ] Source: Cultural seismography visual concept
- [ ] Dimensions: 1920×1080 (16:9)
- [ ] Duration: 10-30 seconds loop
- [ ] Format: MP4 (H.264 + AAC)
- [ ] Size target: <2MB for LCP <2.5s
- [ ] Audio: Muted (required for autoplay)
- [ ] Content: Seismographic patterns with cryptographic overlays

**Creation Steps:**
1. [ ] Design cultural seismography visual elements
2. [ ] Animate cryptographic pattern sequences
3. [ ] Render video using animation software:
   ```bash
   ffmpeg -i source.mp4 \
     -ss 00:00:XX -to 00:00:YY \
     -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" \
     -c:v libx264 -preset slow -crf 28 \
     -c:a aac -b:a 128k \
     -movflags +faststart \
     temp.mp4
   ```
4. [ ] Optimize to <2MB:
   ```bash
   ffmpeg -i temp.mp4 -c:v libx264 -crf 30 -c:a aac -b:a 96k output.mp4
   ```
5. [ ] Test file size (if >2MB, increase crf to 32-34)
6. [ ] Place at `static/videos/cultural-seismography-loop.mp4`

**Estimated Time:** 2-3 hours (including encoding + optimization)

---

### Poster Alternative (Fallback)

If creating custom seismography visual is complex:
- [ ] Generate using design tools with prompt: "Underground resistance aesthetic, cryptographic patterns, cultural seismography, minimal dark palette"
- [ ] Use same specs as above (1920×1080, <150KB)
- [ ] Note in article that poster represents conceptual underground resistance aesthetic

**Estimated Time:** 1 hour (if needed)

---

## ⏳ Phase 0D — Performance & Accessibility Testing (NOT STARTED)

### Lighthouse Performance Audit

**Desktop (Chrome DevTools):**
- [ ] LCP (Largest Contentful Paint): Target <2.5s
- [ ] FID (First Input Delay): Target <100ms
- [ ] CLS (Cumulative Layout Shift): Target <0.1
- [ ] Overall score: Target >90

**Mobile (Chrome DevTools):**
- [ ] LCP: Target <4s (3G network simulation)
- [ ] FID: Target <100ms
- [ ] CLS: Target <0.1
- [ ] Overall score: Target >85

**Test Procedure:**
1. [ ] Deploy to staging with actual poster + video assets
2. [ ] Open in Chrome DevTools → Lighthouse
3. [ ] Simulate Mobile Slow 4G throttling
4. [ ] Run audit 3 times, record average
5. [ ] If LCP >2.5s, optimize:
   - Reduce poster size further
   - Reduce video bitrate (crf 32-34)
   - Enable lazy loading for offscreen content
6. [ ] Document results in performance-audit.md

**Estimated Time:** 2 hours

---

### WCAG 2.1 AA Accessibility Audit

**Automated (axe DevTools browser extension):**
- [ ] Run axe audit on full article page
- [ ] Fix any "Critical" or "Serious" violations
- [ ] Document any "Moderate" findings

**Manual Testing:**
- [ ] Keyboard navigation: Tab through all interactive elements
- [ ] Focus indicators: Visible on all focusable elements (hero, timeline, links)
- [ ] Screen reader: Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] Color contrast: All text 4.5:1 minimum (use WebAIM tool)
- [ ] Touch targets: Hero video play button ≥44×44px
- [ ] Reduced motion: Verify animations disable with `prefers-reduced-motion`
- [ ] High contrast mode: Test in Windows high contrast settings

**Test Procedure:**
1. [ ] Deploy to staging with actual assets
2. [ ] Run axe DevTools on article page
3. [ ] Note any violations
4. [ ] Manual tests on desktop + mobile
5. [ ] Document results in accessibility-audit.md

**Estimated Time:** 1-2 hours

---

### Cross-Browser Testing

- [ ] Chrome 120+: Hero video autoplay, resistance effect animations
- [ ] Firefox 121+: Video fallback handling, CSS variables
- [ ] Safari 17+: iOS video policies (autoplay restrictions)
- [ ] Edge 120+: Windows high contrast mode support
- [ ] Mobile (iOS Safari 17+): Touch interactions, viewport scaling
- [ ] Mobile (Chrome Android): Same as desktop

**Test Procedure:**
1. [ ] Deploy to staging
2. [ ] Open article in each browser
3. [ ] Check: hero renders, poster displays, timeline loads
4. [ ] Check: video plays (desktop), poster-only fallback (mobile)
5. [ ] Check: no JavaScript errors in console
6. [ ] Document any browser-specific issues

**Estimated Time:** 1-2 hours

---

## 🎯 Phase 1 — Final Approval & Deployment (PENDING)

### Content Quality Final Check

- [ ] **Reading:** Article flows logically from hero → timeline → layers
- [ ] **Accuracy:** All dates verified 2021 (not 2015)
- [ ] **Sources:** 11+ sources listed, all relevant + accessible
- [ ] **Tone:** Detective narrative maintained throughout
- [ ] **Cultural sensitivity:** No offensive language or stereotypes
- [ ] **PII review:** Completed by КиберГонзо (signed off in frontmatter)

---

### Brand Compliance Final Check

- [ ] **Color palette:** Brand Guide v2.5 Palette D (teal + amber)
- [ ] **Typography:** Playfair Display (headings) + system font (body)
- [ ] **Logo placement:** FolkUp logo in footer/header
- [ ] **Voice & tone:** Consistent with editorial style
- [ ] **Visual consistency:** Hero section matches rest of Lucerna

**Responsible:** Фонарщик (Brand Manager)

---

### Legal Compliance Final Check

- [ ] **Privacy Policy:** Present on lucerna.folkup.app (staging has htpasswd bypass)
- [ ] **Terms of Use:** Present
- [ ] **Cookie Policy:** Present (if tracking enabled)
- [ ] **License notices:** CC BY-SA 4.0 for content
- [ ] **Attribution:** All sources properly cited
- [ ] **EU AI Act Art. 50:** Transparency statement if applicable
- [ ] **Copyright:** No third-party content without permission

**Responsible:** Лев (Legal Compliance)

---

### Security Headers Verification

Verify on production instance:
```bash
curl -I https://lucerna.folkup.app/investigations/oxymiron-organizatsiya/
```

Expected headers:
- [x] `Strict-Transport-Security: max-age=31536000`
- [x] `X-Content-Type-Options: nosniff`
- [x] `X-Frame-Options: DENY`
- [x] `Referrer-Policy: strict-origin-when-cross-origin`
- [x] `Content-Security-Policy: ...` (should exist)

---

### Deployment Infrastructure

- [ ] DNS record created for lucerna.folkup.app (if moving from staging)
- [ ] HTTPS certificate valid (Let's Encrypt)
- [ ] nginx config updated for public access (remove htpasswd basic auth)
- [ ] `robots.txt` updated: `Allow: /` + `Sitemap: /sitemap.xml`
- [ ] `sitemap.xml` generated and valid
- [ ] 404/500 error pages configured
- [ ] Log monitoring enabled (Umami or equivalent)

---

### Google Search Console Setup

- [ ] Domain verified in GSC (lucerna.folkup.app)
- [ ] Sitemap submitted
- [ ] Hreflang tags verified (EN/RU language alternates)
- [ ] Mobile usability checked (no errors)
- [ ] Rich results tested (schema.org markup)
- [ ] Initial index request submitted for investigation pages

---

### Andrey Final Approval

- [ ] Review article content
- [ ] Review performance metrics (LCP <2.5s confirmed)
- [ ] Review WCAG audit results
- [ ] Review brand compliance
- [ ] Approve for public deployment
- [ ] Authorize git tag + push

**Sign-off:** ___________________ **Date:** ___________

---

## 📊 Deployment Timeline Estimate

| Phase | Task | Est. Time | Status |
|-------|------|-----------|--------|
| **0B** | Architecture Verification | 4h | ✅ COMPLETE |
| **1** | Component Implementation | 6h | ✅ COMPLETE |
| **0C** | Asset Creation | 8-10h | ⏳ PENDING |
| **0D** | Performance + WCAG Testing | 2-3h | ⏳ PENDING |
| **1** | Final Approval + Deployment | 1-2h | ⏳ PENDING |
| | **TOTAL TO PRODUCTION** | **21-26h** | ⏳ FROM NOW |

**Current Status:** Staging-ready today (Phases 0B + 1 complete)
**Public Release:** ~26 hours from start of Phase 0C (asset creation)

---

## 🚨 Critical Blockers (Must Resolve Before Zone 3)

1. **Poster image:** Must exist + be <150KB + load in <1s
2. **Video asset:** Must exist + be <2MB + play without autoplay issues
3. **LCP verification:** Must be <2.5s on 3G connection
4. **WCAG audit:** No critical violations, all PASS
5. **Andrey approval:** Explicit sign-off required

---

## 📝 Notes for Next Session

1. **Phase 0C Priority:** Assets are critical path. Start here.
2. **Video encoding:** Test different crf values (28-34) to hit <2MB target
3. **LCP testing:** Use Chrome DevTools throttling (Mobile Slow 4G) for realistic results
4. **Brand review:** Фонарщик should spot-check hero section on mobile
5. **Legal review:** Лев should verify all compliance fields before Zone 3

---

**Created:** 2026-03-28
**Updated:** (To be updated as phases complete)
**Next Review:** After Phase 0C asset creation
