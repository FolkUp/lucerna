# Publication Flow Architecture — 4 Zones

**Type:** Architecture Decision Record (ADR)
**Status:** ACCEPTED (Andrey, 2026-03-09)
**Author:** Alice (PM) + Alpha+Beta review
**Principle:** "Людям — контент. Роботам — запрет. Наша экосистема — наши правила."

---

## Context

FolkUp ecosystem has 17+ domains on a single VPS (Hetzner CX33). Projects move from private development to public availability. We need a formalized pipeline that controls who sees what at each stage, with clear promotion criteria and rollback procedures.

## Decision

Four publication zones, with Zone 0 and Zone 1 merged into a single staging zone.

---

## Zone 0+1 — Staging (Closed)

**Access:** htpasswd (nginx basic auth)
**Who:** Andrey + orchestra. Third parties (lawyers, experts, reviewers) by invitation only.
**Robot policy:** `X-Robots-Tag: noindex, nofollow` + `robots.txt Disallow: /`
**Purpose:** Active development, internal review, document sharing with trusted third parties.

### Access control
- Andrey creates/revokes htpasswd credentials manually
- No session expiry (htpasswd limitation — browser caches credentials)
- No audit trail (htpasswd limitation — cannot track who accessed when)
- Credentials communicated via secure channel (not email)

### Known limitations (Alpha catch)
- **No audit trail:** htpasswd does not log who accessed what
- **URL leakage:** staging URLs can leak via browser history, Slack pastes, email forwards
- **Browser caching:** credentials persist until browser restart; no "logout" mechanism
- **Password management tool:** TBD (Andrey: "обсудим позже")

---

## Zone 2 — Community / Площадь (Deferred)

> **STATUS: PLACEHOLDER.** Will be designed when real community users appear.

**Access:** Keycloak OAuth (human accounts only)
**Who:** Volunteers, freelancers, content contributors, interested community members.
**Robot policy:** `X-Robots-Tag: noindex, nofollow` (closed to crawlers)
**Purpose:** Collaboration space for real people with human accounts.

### Future requirements (from Andrey's brief)
- Keycloak authentication (no Google OAuth, no social login)
- Moderator fornit character ("Шалтай-Болтай пополам с глашатаем")
- Community features (notice board, announcements, navigation guide)
- Brand Manager to discuss specifics

---

## Zone 3 — Public

**Access:** Open to the world
**Who:** Everyone — humans and search engines
**Robot policy:** No `X-Robots-Tag` (allow indexing) + `robots.txt Allow: /` + `Sitemap:` directive
**Purpose:** Published content, SEO-optimized, full legal compliance.

### Requirements before promotion to Zone 3
- [ ] Content reviewed by editorial team (fornits)
- [ ] Andrey's final approval
- [ ] Full compliance checklist (see Promotion Criteria below)
- [ ] Brand review (Фонарщик) — voice, tone, positioning
- [ ] Legal review (Лев) — Privacy Policy, Terms, Cookie Policy, licenses
- [ ] Security review (Cooper) — headers, auth, secrets

---

## Infrastructure (Not part of Zone Flow)

These domains serve infrastructure functions and do not move between zones:

| Domain | Function | Auth |
|--------|----------|------|
| auth.folkup.app | Keycloak SSO | — |
| monitor.folkup.app | Umami analytics | App-level |
| rss.folkup.app | Miniflux RSS | App-level |
| folkup.city | Root landing (Cloudflare) | — |

---

## Current Domain Mapping

| Domain | Current Zone | Auth Method | Notes |
|--------|-------------|-------------|-------|
| **setubal.folkup.city** | Zone 3 (Public) | — | Live since 2026-03-07, GSC verified |
| **padel.folkup.fit** | Zone 3 (Public) | — | SEO-ready, Bastion PASS |
| **cogumelos.folkup.fit** | Zone 3 (Public) | — | Missing meta desc, hreflang |
| **barnes.folkup.city** | Zone 3 (Public) | — | Missing hreflang |
| **tarot.folkup.life** | Zone 3 (Public) | — | **BLOCKED: X-Robots-Tag noindex (Bastion P0)** |
| **folkup.app** | Zone 3 (Public) | — | Missing sitemap.xml |
| **comic.folkup.app** | Zone 3 (Public) | — | Missing robots.txt |
| **quest.folkup.app** | Zone 3 (Public) | — | Broken sitemap |
| **dialup.folkup.city** | Zone 3 (Public) | — | Missing robots.txt, meta desc |
| **lucerna.folkup.app** | Zone 0+1 (Staging) | Keycloak SSO | Research lab, not for public |
| **ecosystem.folkup.app** | Zone 0+1 (Staging) | Keycloak SSO | Dashboard, internal |
| **docs.folkup.app** | Zone 0+1 (Staging) | Keycloak SSO | Internal documentation |
| **johndoe.folkup.life** | Zone 0+1 (Staging) | App-level | DayForge personal tool |
| **vera.folkup.life** | — | DNS disabled | Inactive |
| **folkup.fit** | — | 522 origin dead | Needs redirect or cleanup |

---

## Promotion Criteria (Zone 0+1 → Zone 3)

A project moves to Zone 3 only when ALL gates pass:

### Gate 1: Content Quality
- [ ] Editorial review by fornit team
- [ ] All articles have `status: verified` or `partially_verified`
- [ ] Sources cited (≥2 for verified articles)
- [ ] PII review completed
- [ ] `reviewed_by` + `review_date` in frontmatter

### Gate 2: Technical Readiness
- [ ] Hugo build: 0 errors, 0 warnings
- [ ] `robots.txt` present with `Allow:` and `Sitemap:` directives
- [ ] `sitemap.xml` valid and accessible
- [ ] Meta descriptions on all pages
- [ ] OG tags (title, description, image in PNG/JPG 1200x630)
- [ ] Canonical URLs
- [ ] Hreflang tags (if multilingual)
- [ ] Security headers: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy

### Gate 3: Legal Compliance
- [ ] Privacy Policy (all content languages)
- [ ] Terms of Use (all content languages)
- [ ] Cookie Policy (all content languages)
- [ ] License files: CODE (MIT) + CONTENT (CC BY-SA 4.0)
- [ ] Third-party license audit (`_meta/license-audit.md`)
- [ ] EU AI Act Art. 50: editorial workflow documented, AI Transparency Statement

### Gate 4: Brand & Approval
- [ ] Brand review: voice, visual identity, Brand Guide v2.5 compliance
- [ ] Andrey's explicit approval ("публикуем")
- [ ] DNS + nginx configured for public access
- [ ] Google Search Console verified (if SEO target)

---

## Rollback (Zone 3 → Zone 0+1)

### Technical rollback (~5 min)
1. Add `X-Robots-Tag: noindex, nofollow` to nginx server block
2. Enable htpasswd basic auth in nginx
3. `nginx -t` → `nginx -s reload`
4. Update `robots.txt` to `Disallow: /`
5. Verify with `curl -I`

### Content retraction (Alpha catch — Google persistence)
**Google does not forget.** After content is public, even after de-indexing:
- Cached pages persist for days/weeks
- Backlinks from external sites persist indefinitely
- Social media shares persist indefinitely

**Retraction protocol:**
1. Technical rollback (above)
2. Submit URL removal request via Google Search Console
3. Add `410 Gone` for specific URLs if needed
4. Monitor Search Console for de-indexing confirmation
5. Document the retraction reason in project changelog

---

## Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | Password management tool for Zone 0+1 | Andrey | Deferred ("обсудим позже") |
| 2 | Zone 2 community features and timeline | Andrey + Brand Manager | Deferred |
| 3 | Automated promotion pipeline (CI/CD) | Infra | Future |
| 4 | Monitoring/alerting per zone | Infra | Future |
| 5 | htpasswd → something with audit trail | Security (Cooper) | Future |
| 6 | Single VPS = single failure domain for all zones | Infra | Accepted risk |

---

## Consequences

**Positive:**
- Clear separation of development and public content
- Formal gates prevent premature publication
- Rollback procedure documented before it's needed
- Password management gives Andrey direct control

**Negative:**
- htpasswd has no audit trail or session management
- Single VPS means all zones share failure domain
- Zone 2 deferred — no community collaboration until designed

**Accepted trade-offs:**
- htpasswd simplicity vs. Keycloak complexity for staging (Andrey's choice)
- Manual password management vs. automated tooling (deferred)

---

*Document created: 2026-03-09 | Alpha+Beta reviewed | Ready for Andrey's sign-off*
