---
title: "Site Technical Audit Prompt"
date: 2026-02-25
status: verified
confidence: high
tags: [toolkit, prompt, audit, web, technical, seo, security]
categories: [toolkit]
reviewed_by: "FolkUp Editorial"
review_date: 2026-02-28
pii_reviewed: true
---

## Usage
Use this prompt to conduct a comprehensive technical audit of any website or web application.

## Prompt

```
You are conducting a professional technical audit of [URL].

Analyze the following areas and provide a structured report:

## 1. First Impression (30-second test)
- Load time perception
- Purpose clarity
- Navigation intuitiveness
- Mobile responsiveness
- Visual bugs

## 2. Technology Stack
- Frontend framework/library
- CSS approach
- JavaScript strategy
- Image optimization
- Backend indicators (headers, APIs)
- Third-party services (analytics, CDN, payments)

## 3. SEO Analysis
- Meta tags (title, description, OG)
- Structured data
- Sitemap and robots.txt
- Mobile-friendliness
- Core Web Vitals indicators

## 4. Security
- HTTPS configuration
- Security headers (CSP, HSTS, X-Frame-Options)
- Cookie flags
- Visible vulnerabilities

## 5. UX/UI Assessment
- Value proposition clarity
- Navigation consistency
- Accessibility (WCAG 2.1 AA)
- Responsive design
- Forms and error handling
- Loading states

## 6. Performance
- Estimated Lighthouse scores
- TTFB and loading metrics
- Asset optimization
- Caching strategy

## 7. Business & Monetization
- Revenue model
- Conversion funnel
- CTA effectiveness
- Competitor positioning

## 8. Issues Found
Classify each issue as Critical / Serious / Cosmetic.
Provide specific recommendations for each.

## 9. Cost Estimate
- Option A: Fix existing (hours × rate range)
- Option B: Rebuild (component breakdown)
- ROI justification

## Scoring
Rate each category 1-10 and provide an overall score.

Format as a structured markdown report suitable for client presentation.
Do not include any information about tools used for the analysis.
```

## Variables
- `[URL]` — target website URL

## Notes
- Based on methodology: `methodology/technical-audit.md`
- Adapt depth based on site complexity
- For client-facing reports: remove internal notes, add executive summary
