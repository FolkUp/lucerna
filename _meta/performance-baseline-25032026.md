# Performance Baseline — LCRN-114 SEO Enhancement
**Date:** 2026-03-25
**Project:** Lucerna OSINT Hub
**Purpose:** Pre-optimization baseline measurement per Alpha hostile verification

## CSS Bundle Analysis (Local Build)

### Raw CSS Files
- **themes/blowfish/assets/css/compiled/main.css:** 143KB (theme-owned, non-modifiable)
- **assets/css/custom.css:** 52KB (project-owned)
- **assets/css/declassified.css:** 13KB (project-owned)
- **assets/css/schemes/lucerna.css:** 1.4KB (project-owned)
- **Total Raw CSS:** 209.4KB

### Compiled CSS Bundle (Hugo Build)
- **main.bundle.min.css:** 152KB (compiled + minified)
- **declassified.min.css:** 7.7KB (separate bundle)
- **Total Compiled CSS:** ~160KB

### CSS Optimization Potential
- **Theme CSS:** 143KB (cannot be modified, PurgeCSS risk high)
- **Project CSS:** 66.4KB (custom + declassified + schemes)
- **Optimization Target:** Project CSS 66KB → <50KB (realistic target)
- **Risk Assessment:** Blowfish theme dynamic classes require careful whitelisting

## Hugo Configuration Analysis

### Critical SEO Blocker Identified
```yaml
enableRobotsTXT: false  # ⚠️ BLOCKS ALL SEARCH ENGINE INDEXING
```
**Impact:** Entire site excluded from Google indexing
**Priority:** P0 immediate fix
**Estimated ROI:** Highest possible (enables SEO entirely)

### Build Performance
- **Hugo build time:** ~17 seconds for 1,247 pages
- **Build command:** `hugo --gc --minify`
- **Multi-language:** EN/PT/RU (suffixing strategy)
- **Content files:** 157 total (13 investigations, 83 studies)

## Live Site Performance (BLOCKED)

### Connection Status
- **Site URL:** https://lucerna.folkup.app/
- **Status:** HTTP 521 (Server down)
- **Issue:** Possible VPS/nginx connectivity problem
- **Impact:** Cannot measure live Core Web Vitals baseline

### Required Live Measurements (PENDING)
- **LCP (Largest Contentful Paint):** Target <2.5s
- **FID (First Input Delay):** Target <100ms
- **CLS (Cumulative Layout Shift):** Target <0.1
- **Lighthouse Score:** Current baseline unknown
- **Mobile Performance:** Testing pending server access
- **Multi-language Performance:** EN/PT/RU comparison needed

## Technical SEO Baseline (Local Analysis)

### Structured Data Status ✅ GOOD FOUNDATION
- **WebSite schema:** Implemented (name, description, URL, publisher)
- **Organization schema:** Implemented (Lucerna OSINT, logo, sameAs)
- **Article schema:** Basic implementation exists (needs enhancement)
- **BreadcrumbList:** Already implemented in schema.html
- **Location:** `layouts/partials/schema.html`

### Sitemap Configuration ✅ EXCELLENT
- **Main sitemap:** `/sitemap.xml` (sitemap index)
- **Language sitemaps:** `/en/sitemap.xml`, `/pt/sitemap.xml`, `/ru/sitemap.xml`
- **hreflang annotations:** Properly implemented
- **lastmod dates:** Current (2026-03-23)
- **Content coverage:** All 157 files included

### robots.txt Configuration ⚠️ DISABLED
- **Current status:** `enableRobotsTXT: false`
- **Expected location:** `/robots.txt`
- **Content:** Should reference sitemaps for all languages
- **Impact:** Complete SEO blockade until enabled

## Internal Architecture Assessment

### Multi-Language Structure ✅ OPTIMIZED
- **Strategy:** Suffixing (article.md, article.pt.md, article.ru.md)
- **hreflang:** Properly configured in templates
- **URL structure:** Clean paths for all languages
- **Content consistency:** Manual review required for 157 files

### Theme Safety Analysis ✅ MODIFICATION-SAFE
- **Theme:** Blowfish (Hugo theme)
- **Custom layouts:** 22 files in `layouts/` directory
- **Asset separation:** Custom CSS properly isolated in `assets/`
- **Safety branch:** `feature/seo-enhancement` active
- **Rollback capability:** Git-based, documented procedure

## Baseline Conclusions

### Immediate High-Impact Fixes
1. **robots.txt enable:** Single line change, massive SEO impact
2. **Live site connectivity:** Resolve VPS/nginx access for performance measurement
3. **Article schema enhancement:** Modify existing implementation

### Performance Optimization Scope
- **Realistic CSS target:** 160KB → <130KB (project CSS optimization)
- **High-risk avoided:** Theme CSS PurgeCSS deferred to separate phase
- **Critical CSS extraction:** Analysis-only phase (implementation separate)

### SEO Enhancement Priorities
1. **Technical foundation:** robots.txt, live site access, schema enhancement
2. **Content strategy:** EU AI Act landing page, internal linking
3. **Performance optimization:** Critical CSS analysis, bundle size review

## Next Steps (Phase 3A Implementation)

### 3A.1: Immediate Fix (0.5h)
- Change `enableRobotsTXT: false` → `true`
- Verify robots.txt generation and deployment

### 3A.2: Live Site Baseline (2h)
- Resolve VPS connectivity (coordinate with infrastructure team)
- Lighthouse audit: homepage + investigation + methodology templates
- Document Core Web Vitals baseline

### 3A.3: Schema Enhancement (4h)
- Modify existing Article schema in `layouts/partials/schema.html`
- Add investigation-specific fields without duplication
- Validate with Google Rich Results Test

### 3A.4: Critical CSS Analysis (6h)
- Above-fold content pattern analysis
- Blowfish dynamic class mapping for whitelist safety
- Critical CSS extraction plan (implementation deferred)

**Status:** ✅ LOCAL BASELINE COMPLETE, LIVE BASELINE PENDING VPS ACCESS
**Quality Gate:** All measurements documented before optimization begins
**Risk Assessment:** robots.txt fix = zero risk, high reward

// Алиса