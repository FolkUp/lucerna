# Zone Promotion Request

## Project Information

- **Project Name:** <!-- e.g., Lucerna -->
- **Domain:** <!-- e.g., lucerna.folkup.app -->
- **Current Zone:** <!-- Zone 0+1 (Staging) | Zone 2 (Community) | Zone 3 (Public) -->
- **Target Zone:** <!-- Zone 2 (Community) | Zone 3 (Public) -->
- **Requested by:** @<!-- GitHub username -->
- **Date:** <!-- YYYY-MM-DD -->

## Promotion Justification

<!-- Why is this project ready to move to the next zone? What value does it provide? -->

---

## Gate 1: Content Quality

- [ ] Editorial review by fornit team completed
- [ ] All articles have `status: verified` or `partially_verified`
- [ ] Sources cited (≥2 for verified articles)
- [ ] PII review completed (no personal identifiable information exposed)
- [ ] All articles have `reviewed_by` + `review_date` in frontmatter

**Reviewer:** <!-- Name of content reviewer -->
**Review Date:** <!-- YYYY-MM-DD -->

---

## Gate 2: Technical Readiness

### Build & Validation
- [ ] Hugo build: 0 errors, 0 warnings (`hugo --gc --minify`)
- [ ] All internal links valid (no broken relref)
- [ ] All images optimized and loading correctly

### SEO & Indexing
- [ ] `robots.txt` present with `Allow: /` and `Sitemap:` directives
- [ ] `sitemap.xml` valid and accessible
- [ ] Meta descriptions on all pages
- [ ] OG tags present (title, description, image PNG/JPG 1200×630)
- [ ] Canonical URLs configured
- [ ] Hreflang tags configured (if multilingual)

### Security
- [ ] Security headers: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- [ ] CSP (Content Security Policy) configured
- [ ] SSL certificate valid and not expiring within 30 days
- [ ] No secrets or credentials in codebase

**Reviewer:** @Cooper (security lead)
**Review Date:** <!-- YYYY-MM-DD -->

---

## Gate 3: Legal Compliance

### Legal Pages
- [ ] Privacy Policy (all content languages)
- [ ] Terms of Use (all content languages)
- [ ] Cookie Policy (all content languages)
- [ ] Legal pages accessible from all main pages (footer)

### Licensing
- [ ] Code license file present (MIT → `LICENSE`)
- [ ] Content license file present (CC BY-SA 4.0 → `LICENSE-CONTENT`)
- [ ] Third-party license audit completed (`_meta/license-audit.md`)
- [ ] All fonts, images, third-party code properly attributed

### EU AI Act (Art. 50)
- [ ] Editorial workflow documented
- [ ] AI Transparency Statement published (if AI-assisted content present)
- [ ] `reviewed_by` + `review_date` in frontmatter for AI-assisted articles

### GDPR & ePrivacy
- [ ] Cookie consent mechanism (if cookies used)
- [ ] Analytics configured with privacy mode (Umami/Plausible)
- [ ] No PII collected without consent
- [ ] Data retention policy documented

**Reviewer:** @Лев (legal lead)
**Review Date:** <!-- YYYY-MM-DD -->

---

## Gate 4: Brand & Approval

- [ ] Brand review: voice, tone, messaging align with FolkUp identity
- [ ] Visual identity: Brand Guide v2.5 compliance (colors, fonts, spacing)
- [ ] DNS configured for public access
- [ ] Nginx configuration updated for target zone
- [ ] Google Search Console verified (if Zone 3)
- [ ] **Andrey's explicit approval** ("публикуем")

**Reviewer:** @Фонарщик (brand lead)
**Review Date:** <!-- YYYY-MM-DD -->

**Andrey's Approval:** <!-- [ ] Approved | Date: YYYY-MM-DD -->

---

## Rollback Procedure

In case of issues post-promotion, follow these steps (technical rollback ~5 min):

1. **Add X-Robots-Tag to nginx:**
   ```nginx
   add_header X-Robots-Tag "noindex, nofollow, noarchive" always;
   ```

2. **Enable htpasswd auth** (if reverting to Zone 0+1):
   ```nginx
   auth_basic "Restricted Access";
   auth_basic_user_file /etc/nginx/.htpasswd;
   ```

3. **Reload nginx:**
   ```bash
   nginx -t && nginx -s reload
   ```

4. **Update robots.txt:**
   ```
   User-agent: *
   Disallow: /
   ```

5. **Verify rollback:**
   ```bash
   curl -I https://domain.folkup.app | grep -i "x-robots-tag\|location"
   ```

6. **Notify team:** Post in #incidents or #ops channel

**Rollback Owner:** <!-- Name of person responsible for rollback -->

---

## Post-Promotion Checklist

- [ ] Submit sitemap to Google Search Console (Zone 3 only)
- [ ] Monitor indexing status (first 48 hours)
- [ ] Check analytics for traffic patterns
- [ ] Verify all legal pages accessible
- [ ] Test auth flows (Zone 2 only)
- [ ] Update project documentation (README, deployment docs)
- [ ] Update `.claude/SESSION_CONTEXT.md` with new zone status
- [ ] Announce to team (#announcements)

---

## Additional Notes

<!-- Any additional context, known issues, dependencies, or special considerations -->

---

## Reviewer Sign-offs

| Gate | Reviewer | Status | Date |
|------|----------|--------|------|
| Content Quality | <!-- Name --> | ⏳ Pending | <!-- YYYY-MM-DD --> |
| Technical Readiness | @Cooper | ⏳ Pending | <!-- YYYY-MM-DD --> |
| Legal Compliance | @Лев | ⏳ Pending | <!-- YYYY-MM-DD --> |
| Brand & Approval | @Фонарщик | ⏳ Pending | <!-- YYYY-MM-DD --> |
| **Final Approval** | **@Andrey** | **⏳ Pending** | <!-- YYYY-MM-DD --> |

**Status key:** ⏳ Pending | ✅ Approved | ❌ Rejected | ⚠️ Conditional

---

## Deployment Plan

<!-- Describe deployment steps, timing, downtime (if any), and coordination required -->

**Deployment Window:** <!-- e.g., 2026-03-15 14:00-16:00 UTC -->
**Estimated Downtime:** <!-- e.g., None | ~5 minutes -->
**Deploy Owner:** <!-- Name -->

---

**Zone Promotion PR Template v1.0** | FolkUp Operations | Last updated: 2026-03-10
