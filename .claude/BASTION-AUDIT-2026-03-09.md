# Bastion Doctrine — Consolidated Ecosystem Audit

**Date:** 2026-03-09
**Agents:** Cooper Security (a4266c9, sonnet) + SEO Expert (a97a211, sonnet)
**Review:** Alpha (opus) FAIL → gaps found + fixed | Beta (sonnet) PASS with caveats
**Principle:** "Людям — контент. Роботам — запрет. Наша экосистема — наши правила."

---

## Executive Summary

| Metric | Value |
|--------|-------|
| **Domains in DNS** | 17 (16 active + 1 disabled) |
| **Domains audited** | 16 (9 Tier 1 + 3 Tier 2-3 + 2 Infra + 1 Tier 4 + 1 dead) |
| **Bastion PASS** | 5 (folkup.app, lucerna, docs, rss, auth) |
| **Bastion WARN** | 9 |
| **Bastion FAIL** | 2 (tarot.folkup.life, johndoe.folkup.life) |
| **SEO-ready for promotion** | 1/9 Tier 1 (padel.folkup.fit only) |
| **Critical blockers** | 5 |
| **Not reachable** | vera.folkup.life (DNS DISABLED), folkup.fit (522 origin dead) |

### Alpha+Beta Review Findings (post-audit)

**Alpha found 4 missing domains:**
1. **johndoe.folkup.life** = DayForge (Tier 4 APP). 200 OK, good security headers, but NO robots.txt, NO X-Robots-Tag → **FAIL**
2. **folkup.city** (root) = FolkUp landing via Cloudflare. 200 OK, robots.txt present (Cloudflare Content-Signal format) → **OK**
3. **vera.folkup.life** = DNS DISABLED, no response → N/A
4. **folkup.fit** (bare domain) = 522 origin unreachable → dead, no nginx config

**Alpha also noted:** retro-tech (Tier 1 per infra.md) = dialup.folkup.city (confirmed)

**Beta practical improvements adopted:**
- Phase 1 time estimate: 45-50 min (not 30)
- Mandatory: `nginx -t` + backup before reload
- Mandatory: curl verification AFTER each change
- hreflang downgraded P1 → P2 (doesn't block promotion)

---

## CRITICAL BLOCKERS (P0)

### 1. tarot.folkup.life — X-Robots-Tag: noindex,nofollow on PUBLIC site
- **Both agents confirmed**: HTTP header `X-Robots-Tag: noindex, nofollow`
- **Impact**: Site completely blocked from Google/Bing indexing
- **Root cause**: nginx config likely copied from auth-protected template
- **Fix**: Remove X-Robots-Tag from tarot nginx server block
- **Effort**: ~5 min (SSH + nginx reload)

### 2. comic.folkup.app — Missing robots.txt (404)
- **Impact**: No explicit crawling guidance, search engines guess
- **Fix**: Add robots.txt (Allow: /)
- **Effort**: ~5 min

### 3. dialup.folkup.city — Missing robots.txt (404)
- **Impact**: Same as comic — no guidance for crawlers
- **Fix**: Add robots.txt (Allow: /, Sitemap: /sitemap.xml)
- **Effort**: ~5 min

### 4. folkup.app — Missing sitemap.xml
- **Impact**: Landing page links to 7+ encyclopedias but has no sitemap
- **Fix**: Generate and deploy sitemap.xml
- **Effort**: ~15 min (manual or Hugo build)

### 5. johndoe.folkup.life (DayForge) — No robot blocking (Alpha finding)
- **Tier 4 APP auth**: App-level auth blocks humans, but NO robot blocking
- **No X-Robots-Tag**: header missing
- **No robots.txt**: /robots.txt returns DayForge HTML (no file)
- **Fix**: Add X-Robots-Tag: noindex,nofollow + robots.txt Disallow:/
- **Effort**: ~5 min (nginx config)

---

## HIGH PRIORITY (P1)

### 5. Empty meta descriptions (3 sites)
- **cogumelos.folkup.fit**: Meta description EMPTY, OG description EMPTY
- **tarot.folkup.life**: Meta description EMPTY, OG description EMPTY
- **dialup.folkup.city**: Meta description EMPTY, OG description EMPTY
- **Impact**: Google will auto-generate snippets (suboptimal)
- **Fix**: Add description in Hugo config or frontmatter per site
- **Effort**: ~15 min per site

### 6. Missing hreflang (4 multilingual sites) — downgraded to P2 per Beta
- **setubal.folkup.city**: 3 langs, NO hreflang
- **cogumelos.folkup.fit**: 2 langs, NO hreflang
- **barnes.folkup.city**: 2 langs, NO hreflang
- **tarot.folkup.life**: 2 langs, NO hreflang
- **Impact**: Duplicate content risk, wrong language in SERPs (NOT a promotion blocker)
- **Fix**: Hugo template or head partial (varies by theme: Relearn, Hextra, Congo)
- **Effort**: ~30 min per site (theme-dependent) — Alpha: 3-4h total realistic

### 7. Missing Sitemap in robots.txt (2 sites)
- **barnes.folkup.city**: robots.txt exists but no Sitemap: directive
- **tarot.folkup.life**: robots.txt exists but no Sitemap: directive
- **Fix**: Add `Sitemap: https://domain/sitemap.xml` to robots.txt
- **Effort**: ~2 min each

### 8. quest.folkup.app — Broken sitemap
- **robots.txt declares sitemap**: but URL returns HTML instead of XML
- **Fix**: Hugo config or custom sitemap generation
- **Effort**: ~15 min

### 9. ecosystem.folkup.app — Missing X-Robots-Tag (auth-protected)
- **Impact**: Auth redirect blocks crawlers, but explicit noindex = defense in depth
- **Fix**: Add `X-Robots-Tag: noindex, nofollow` to nginx
- **Effort**: ~5 min

### 10. setubal.folkup.city — Missing canonical, OG image SVG
- **No canonical link**: on homepage
- **OG image is SVG**: social media requires PNG/JPG 1200x630
- **Fix**: Hugo head partial + convert coat of arms to PNG
- **Effort**: ~20 min

---

## MEDIUM PRIORITY (P2)

### 11. Duplicate HSTS headers (11 domains)
- Two Strict-Transport-Security headers with different max-age values
- Domains: setubal, padel, cogumelos, tarot, comic, quest, lucerna, docs, auth, barnes(some), ecosystem
- **Fix**: Deduplicate in nginx configs
- **Effort**: ~30 min (SSH, edit all affected configs)

### 12. Duplicate security headers (docs.folkup.app, barnes.folkup.city)
- X-Frame-Options, X-Content-Type-Options duplicated
- **Fix**: Remove duplicate add_header lines in nginx
- **Effort**: ~10 min

### 13. monitor.folkup.app — Missing security headers
- No X-Content-Type-Options, Referrer-Policy, CSP
- **Fix**: Add headers to Umami nginx proxy config
- **Effort**: ~10 min

---

## TIER COMPLIANCE MATRIX

| Domain | Tier | Auth | X-Robots | robots.txt | Sitemap | Hreflang | Meta Desc | Bastion |
|--------|------|------|----------|------------|---------|----------|-----------|---------|
| setubal.folkup.city | 1 PUBLIC | - | OK (none) | OK (Allow+Disallow) | OK (3 lang) | MISSING | OK | WARN |
| padel.folkup.fit | 1 PUBLIC | - | OK (none) | OK (Allow+Sitemap) | OK (3 lang) | OK | OK | **PASS** |
| cogumelos.folkup.fit | 1 PUBLIC | - | OK (none) | OK (Allow+Sitemap) | OK (2 lang) | MISSING | EMPTY | WARN |
| barnes.folkup.city | 1 PUBLIC | - | OK (none) | MINIMAL | OK (2 lang) | MISSING | OK | WARN |
| tarot.folkup.life | 1 PUBLIC | - | **NOINDEX** | MINIMAL | OK (2 lang) | MISSING | EMPTY | **FAIL** |
| folkup.app | 1 PUBLIC | - | OK (none) | OK (Allow) | MISSING | OK | OK | WARN |
| comic.folkup.app | 1 PUBLIC | - | OK (none) | **404** | N/A | OK | OK | WARN |
| quest.folkup.app | 1 PUBLIC | - | OK (none) | OK (Allow) | BROKEN | MISSING | OK | WARN |
| dialup.folkup.city | 1 PUBLIC | - | OK (none) | **404** | OK | MISSING | EMPTY | WARN |
| lucerna.folkup.app | 2 TEAM | Keycloak | noindex | redirect | N/A | N/A | N/A | **PASS** |
| ecosystem.folkup.app | 2 TEAM | Keycloak | **MISSING** | redirect | N/A | N/A | N/A | WARN |
| docs.folkup.app | 3 INVITE | Keycloak | noindex | redirect | N/A | N/A | N/A | **PASS** |
| rss.folkup.app | 4 APP | App | N/A | Disallow:/ | N/A | N/A | N/A | **PASS** |
| auth.folkup.app | INFRA | - | none | Disallow:/ | N/A | N/A | N/A | **PASS** |
| monitor.folkup.app | INFRA | App | MISSING | Disallow:/ | N/A | N/A | N/A | WARN |

---

## ACTION PLAN (Alpha+Beta reviewed)

### Phase 1 — Critical nginx (SSH to VPS, ~50 min)
**Pre-flight:** backup all affected nginx configs (`cp *.conf *.bak-2026-03-09`)

1. Remove X-Robots-Tag from tarot.folkup.life nginx config
2. Add X-Robots-Tag: noindex,nofollow to ecosystem.folkup.app nginx
3. Add X-Robots-Tag: noindex,nofollow + robots.txt to johndoe.folkup.life (DayForge)
4. `nginx -t` → if OK → `nginx -s reload`
5. **Verify:** `curl -I` each changed domain, confirm changes

**Rollback:** restore `.bak-*` files → `nginx -t` → `nginx -s reload`

### Phase 2 — Hugo/Content fixes (~1.5 hours)
6. Add robots.txt to comic.folkup.app (Hugo build or static file)
7. Add robots.txt to dialup.folkup.city (Hugo build)
8. Add Sitemap: directive to barnes + tarot robots.txt
9. Fix folkup.app sitemap.xml
10. Fix quest.folkup.app sitemap URL
11. Fill meta descriptions for cogumelos, tarot, dialup

### Phase 3 — SEO Optimization (P2, ~3-4 hours)
12. Add hreflang to setubal, cogumelos, barnes, tarot (4 different themes)
13. Fix setubal canonical + OG image (SVG→PNG)

### Phase 4 — Technical Debt (P2, ~1 hour)
14. Deduplicate HSTS headers across all nginx configs
15. Deduplicate other security headers (docs, barnes)
16. Add missing security headers to monitor.folkup.app (X-Content-Type-Options, Referrer-Policy, CSP)

### Not actionable
- **vera.folkup.life**: DNS DISABLED, no response — no action needed
- **folkup.fit** (bare domain): 522, no nginx config — add redirect to folkup.app or leave dead
- **folkup.city** (root): serving via Cloudflare, robots.txt OK — no action needed

---

**Promotion readiness after Phase 1+2:** ~6/9 Tier 1 sites (padel, folkup.app, setubal, barnes, cogumelos, quest)
**Full readiness after Phase 3:** 9/9 Tier 1 sites
**Estimated total:** Phase 1 (50 min) + Phase 2 (1.5h) = **~2.5 hours for promotion-ready state**

---

*Alpha+Beta review complete. Ready for Andrey's approval.*
