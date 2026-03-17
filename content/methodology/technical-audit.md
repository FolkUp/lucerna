---
title: "Technical Audit Methodology"
description: "Full framework for auditing websites and web apps: UX, tech stack, performance, security, SEO, and business viability analysis."
date: 2026-02-25
status: verified
confidence: high
tags: [methodology, technical-audit, ux, security, performance, seo, web-development]
categories: [methodology]
reviewed_by: "FolkUp Editorial"
review_date: 2026-02-28
pii_reviewed: true
---

## Overview

Full framework for evaluating websites, web applications, and digital products. Covers UX, technology stack, performance, security, SEO, and business viability.

## Process

### Phase 1: First Impression (30 seconds)

Open the site cold. Note immediately:
- Does it load fast? (target: < 3s)
- Is the purpose clear within 5 seconds?
- Does navigation make sense?
- Is it mobile-friendly?
- Any visual bugs or layout issues?

### Phase 2: Stack Analysis

#### Frontend
- Framework/library (React, Vue, vanilla, etc.)
- CSS approach (Tailwind, Bootstrap, custom)
- JavaScript bundle size and loading strategy
- Image optimization (WebP, lazy loading, responsive)

#### Backend
- Server technology (visible headers, response patterns)
- API structure (REST, GraphQL, etc.)
- Authentication mechanism
- Error handling (do errors leak information?)

#### Third-party Services
- Analytics (Google Analytics, Plausible, etc.)
- CDN usage
- Payment processing
- Chat/support widgets
- Cookie consent implementation

#### SEO
- Meta tags (title, description, OG, Twitter)
- Structured data (JSON-LD, microdata)
- Sitemap.xml and robots.txt
- Canonical URLs
- Mobile-friendliness (Google Mobile-Friendly Test)
- Core Web Vitals (LCP, FID, CLS)

#### Performance
- Lighthouse score (Performance, Accessibility, Best Practices, SEO)
- TTFB, FCP, LCP
- Bundle analysis
- Caching strategy (headers, service worker)

#### Security
- HTTPS configuration (SSL Labs grade)
- Security headers (CSP, HSTS, X-Frame-Options, etc.)
- Cookie security flags (Secure, HttpOnly, SameSite)
- Visible vulnerabilities (exposed .env, directory listing, etc.)

### Phase 3: UX/UI Checklist

- [ ] Clear value proposition above the fold
- [ ] Consistent navigation across pages
- [ ] Accessible (WCAG 2.1 AA minimum)
- [ ] Responsive across breakpoints (mobile, tablet, desktop)
- [ ] Forms have proper validation and error messages
- [ ] Loading states for async operations
- [ ] 404 page exists and is helpful
- [ ] Contact/support information accessible
- [ ] Consistent typography and spacing
- [ ] Color contrast meets standards (4.5:1)

### Phase 4: Monetization & Conversion

- Revenue model analysis (subscription, freemium, ads, etc.)
- Conversion funnel mapping
- CTA placement and clarity
- Pricing page (if applicable)
- Competitor comparison (brief)

### Phase 5: Bug & Tech Debt Classification

| Severity | Definition | Example |
|----------|-----------|---------|
| **Critical** | Blocks core functionality or causes data loss | Payment fails, login broken |
| **Serious** | Degrades experience significantly | Layout breaks on mobile, slow load |
| **Cosmetic** | Visual issues that don't block usage | Misaligned elements, typos |

### Phase 6: Cost Estimation

#### Option A: Redesign (fix existing)
- Estimate hours per severity level
- Apply hourly rate range (junior/mid/senior)
- Include project management overhead (15-20%)

#### Option B: Rebuild (from scratch)
- Estimate by component (frontend, backend, integrations)
- Include discovery/design phase
- Include testing and deployment

#### ROI Framework
```
ROI = (Projected Revenue Increase - Cost of Fix) / Cost of Fix × 100%
```

Consider:
- Conversion rate improvement potential
- SEO traffic improvement potential
- Reduced support costs
- Reduced tech debt maintenance

## Report Format

```markdown
# Technical Audit: [Site/Product Name]

## Executive Summary
[2-3 sentence overview]

## Scores
| Category | Score (1-10) |
|----------|-------------|
| Performance | |
| UX/UI | |
| SEO | |
| Security | |
| Code Quality | |
| **Overall** | |

## Key Findings
[Top 5 issues by impact]

## Detailed Analysis
[Full analysis by category]

## Recommendations
[Prioritized action items]

## Cost Estimate
[Option A vs Option B with justification]
```
