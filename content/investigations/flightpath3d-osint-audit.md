---
title: "FlightPath3D — OSINT Company Audit"
date: 2026-03-13
slug: "flightpath3d-osint-audit"
status: partially_verified
confidence: medium-high
tags: ["osint", "due-diligence", "company-audit", "aviation", "ife", "flightpath3d"]
categories: ["investigation"]
sources_count: 60
investigation_id: "INV-2026-0313-FP3D"
investigation_type: audit
methodology_disclosed: true
methodology_ref: "osint-verification"
reviewed_by: "FolkUp Editorial Board"
review_date: "2026-03-13"
pii_reviewed: true
summary: "Detailed OSINT audit of FlightPath3D (Betria Interactive LLC) — IFE company producing interactive moving maps for commercial aviation. Covers: corporate structure, website claims verification, client base, competitive landscape, leadership changes, Portugal subsidiary, Russia connection, AI disruption risk, incidents/scandals, trade press analysis."
---

{{< investigation-meta >}}

---

> **INV-2026-0313-FP3D Summary.** FlightPath3D is the trade name (DBA) of **Betria Interactive, LLC** — a California-registered IFE company deployed on 5,000+ aircraft. Market leader in interactive moving maps. Overall assessment: **verified legitimate company with inflated marketing, structural opacity, and unresolved geopolitical risks.** 14.4% of claimed client base independently verified (11 VERIFIED + 2 PROBABLE out of 90+), including United, American, Lufthansa, Qatar, BA, Southwest, Cathay, Delta, Norwegian, ANA, Riyadh Air. The "Betria" name was quietly retired from public use circa 2016–2017 when the FlightPath3D trademark was registered. Portugal subsidiary = minimum-capital shell entity. Russian roots (BIN64 subsidiary operated 2011–2022, 33 staff) largely unaddressed. Key person risk: HIGH (no board, no succession). 1 US patent granted. Zero scandals/complaints/litigation found. AI disruption risk: MEDIUM-LOW.
>
> *Investigation: 3 sessions, 9 research agents, ~60 open sources consulted*

---

## 1. Corporate Structure & Identity

### Legal Entity

**Betria Interactive, LLC** is registered in California (entity #201234110155). "FlightPath3D" is a DBA (doing business as) trade name — not a separate company, subsidiary, or product. The FLIGHTPATH3D trademark (US Reg. #5348873) was filed November 2016 and registered December 2017, owned by Betria Interactive, LLC.

The "Betria" name ceased to appear in public marketing circa 2016–2017, coinciding with the trademark filing. No press release or formal rebrand announcement was found. Employees on LinkedIn list their affiliation as "FlightPath3D / Betria Interactive LLC." Founding date is disputed: CBInsights lists 2007, California filing indicates 2012, and the About page references 2013 (first airline deployment).

```
Betria Interactive LLC (California, 2012, #201234110155)
  ├── DBA: FlightPath3D (trademark #5348873, reg. 2017)
  ├── CEO & Co-Founder: Boris Veksler
  ├── President & Co-Founder: Duncan Jackson
  ├── VP Engineering: Ruben Girgidov (St. Petersburg)
  ├── HQ: 15770 Laguna Canyon Rd, Ste 200, Irvine, CA 92618
  │   (expanded early 2026, 3× previous size)
  ├── Revenue: ~$3.8-5M est. (bootstrapped, $0 VC)
  ├── Inc. 5000 (2025, rank #4725)
  │
  ├── Betria Systems, Inc (California) — staffing/PEO entity
  │
  ├── Smart Travel Software Unipessoal LDA (Portugal, 2022)
  │     ├── NIF: PT517034948
  │     ├── Capital: €1,000 (minimum legal requirement)
  │     ├── Address: Praça do Bocage 111, 2900-213 Setúbal
  │     └── Status: "International R&D Center" (per FP3D website)
  │
  └── BIN64 / ООО БИН64 (Russia, St. Petersburg, est. 2011)
        ├── INN: 7842455555, OGRN: 1117847272608
        ├── Director: Ruben Girgidov
        ├── Staff: 33 employees (2021)
        └── Domain: bin64.ru (dead/inactive since ~2022)
```

**Sources:**
- [Betria Interactive — OpenCorporates](https://opencorporates.com/companies/us_ca/201234110155)
- [FlightPath3D trademark — USPTO via Justia](https://trademarks.justia.com/872/28/flightpath3d-87228680.html)
- [Betria Interactive — D&B](https://www.dnb.com/business-directory/company-profiles.betria_interactive_llc.html)
- [Smart Travel Software registry — Racius](https://www.racius.com/smart-travel-software-unipessoal-lda/)
- [BIN64 registry — Beboss.ru](https://www.beboss.ru/biz/7842455555-ooo-bin64)
- [FlightPath3D Contact page](https://flightpath3d.com/contact)

---

## 2. Website Claims Verification

| # | Claim | Source | Verification | Status |
|---|-------|--------|-------------|--------|
| 1 | "100 airlines" | About page | Trade press: "90+" (Aug 2025), "80+" (May 2024) | **EXAGGERATED** |
| 2 | "4,000+ aircraft" | About page | Own press release: 5,000 (May 2024) | **OUTDATED** |
| 3 | "400M passengers/year" | About page | Confirmed by multiple trade sources | **VERIFIED** |
| 4 | "Founded 2013" | About page | Norwegian launch confirmed (May 2013) | **VERIFIED** |
| 5 | Inc. 5000 (2025) | About page | PAX Intl, Aircraft Interiors confirm | **VERIFIED** |
| 6 | APEX Innovation Award 2023 | About page | Confirmed — Best IFE (Southwest) | **VERIFIED** |
| 7 | APEX Innovation Award 2026 | About page | Confirmed — Kids Map | **VERIFIED** |
| 8 | Onboard Hospitality Award 2025 | About page | Confirmed — Best Accessibility | **VERIFIED** |
| 9 | PAX Readership Award 2025 | About page | Confirmed | **VERIFIED** |
| 10 | WIRED "only travel buddy" | About page | Confirmed — genuine quote | **VERIFIED** |
| 11 | "1B passengers by 2030" | About page | Originally "by 2021" (2018 press release) — goal missed, quietly moved | **GOALPOST MOVED** |

### Key Inconsistencies

1. **Airline count inflation:** About page says "100 airlines" → trade press says "90+" (12.5% inflation)
2. **Aircraft count stale:** About page shows "4,000+" → own news announced "5,000" in May 2024
3. **Goal post moving:** "1 billion passengers by 2021" (BusinessWire, Dec 2018) → missed → now "by 2030" with no acknowledgment
4. **HQ confusion:** Multiple addresses found (Lake Forest, Irvine Jeffrey Rd, Irvine Laguna Canyon)

**Sources:**
- [FlightPath3D About page](https://flightpath3d.com/about)
- [Inc. 5000 coverage (PAX Intl)](https://www.pax-intl.com/ife-connectivity/inflight-entertainment/2025/08/12/flightpath3d-makes-2025-inc.-5000-list/)
- [5,000 aircraft milestone (Simple Flying)](https://simpleflying.com/flightpath3d-guide/)
- [275M passengers / 1B goal (BusinessWire, 2018)](https://www.businesswire.com/news/home/20181205005240/en/FlightPath3D-Exceeds-275m-Airline-Passengers-Map-2018)

---

## 3. Client Base Verification

### Independently Verified Airlines

| Airline | Source | Year | Confidence |
|---------|--------|------|-----------|
| Norwegian Air Shuttle | RGN, BusinessWire | 2013 (first customer) | VERIFIED |
| All Nippon Airways (ANA) | AII, FTE | 2018 (50th customer) | VERIFIED |
| British Airways | PaxEx | 2020 | VERIFIED |
| Southwest Airlines | RGN, FTE | 2022 | VERIFIED |
| Lufthansa Group | RGN, PaxEx | 2022 | VERIFIED |
| American Airlines | Simple Flying | 2024 | VERIFIED |
| Cathay Pacific | RGN | 2024 | VERIFIED |
| Delta Air Lines | PaxEx | 2024 (Accessibility Map) | VERIFIED |
| Qatar Airways | FTE | 2024 | VERIFIED |
| Riyadh Air | RGN | 2025 (pre-launch) | VERIFIED |
| United Airlines | RGN, PaxEx, FTE | 2025 | VERIFIED |
| EL AL | FP3D news | 2024 | PROBABLE |
| Starlux Airlines | Aircraft Interiors Intl | 2024 | PROBABLE |

### Still Unverified

Air China, Emirates, Singapore Airlines, JetBlue, Turkish Airlines — listed on FP3D website or Tracxn, but no independent trade press confirmation found.

### Client Departures

**NONE FOUND.** In 13 years of operation, zero publicly known client losses. This is statistically unusual for SaaS/aviation — either genuine excellence or insufficient public visibility.

### Complaints & Reviews

- **BBB:** No listing
- **Trustpilot:** 1 review, 3.6/5 (positive)
- **Glassdoor:** Empty — one interview review (2016), no employee reviews
- **Forums (Reddit, FlyerTalk, airliners.net):** No complaints found
- **Trade press:** Zero negative coverage

### Assessment

**"90+ airlines" → 14.4% verification rate (13/90+).** The claim trajectory (50 → 60 → 85 → 90+) is internally consistent. Independent evidence covers 11 verified + 2 probable airlines, including major carriers (United, American, Lufthansa, Qatar, BA). The gap may be due to NDAs common in aviation contracts, but it cannot be ruled out that the number includes regional/charter operators counted individually.

**Sources:**
- [50th airline (ANA) — Aircraft Interiors Intl](https://www.aircraftinteriorsinternational.com/news/industry-news/flightpath3d-signs-ana-as-50th-airline-customer.html)
- [60th airline — RGN](https://runwaygirlnetwork.com/2019/09/press-release-flightpath3d-surpasses-60th-airline-customer-milestone/)
- [Delta Accessibility Map — PaxEx](https://paxex.aero/delta-boosts-moving-map-accessibility-with-flightpath3d-update/)
- [Cathay Pacific — RGN](https://runwaygirlnetwork.com/2024/06/flightpath3d-flight-journey-cathay-pacific/)
- [Riyadh Air — RGN](https://runwaygirlnetwork.com/2025/09/riyadh-air-flightpath3d/)

---

## 4. Competitive Landscape

| Company | Product | Airlines | Aircraft | Key Differentiator |
|---------|---------|----------|----------|--------------------|
| **FlightPath3D** | FP3D + Luci AI | 90+ | 5,000+ commercial + 1,500 biz/gov | Interactive 3D, AI companion, SaaS cloud |
| **Panasonic Avionics** | Arc 3D | 35 | 1,000+ | 4K, integrated Panasonic IFE ecosystem |
| **Collins Aerospace** | Airshow | Legacy | Unknown (shrinking) | 90-95% pre-2013, now legacy |
| **Bluebox Aviation** | Blueview + Map | IndiGo, HK Airlines, Caribbean | Unknown | Wireless IFE, EU patent on ADS-B map |
| **GeoFusion** | 3DMaps | Via Thales | Unknown | 3D Earth, cockpit view, Thales IFE |

### Market Context

- **IFE market:** $7.05B (2025) → $10.49B (2030), CAGR 8.27%
- **FlightPath3D position:** Market leader in moving maps since overtaking Collins Airshow post-2013
- **Panasonic Arc:** Direct competitor, catching up (debuted 2019, now integrated Flightradar24 data)
- **Bluebox:** European patent threat for wireless moving map technology

**Key trend:** BYOD/wireless IFE growing → FP3D responded with "FlightPath3D Cloud" SaaS (2025)

**Sources:**
- [Panasonic Arc enhancements (RGN, Oct 2025)](https://runwaygirlnetwork.com/2025/10/panasonic-avionics-enhances-arc-3d-inflight-map-platform/)
- [IFE market forecast (Fortune Business Insights)](https://www.fortunebusinessinsights.com/in-flight-entertainment-connectivity-market-102519)
- [Bluebox patent (RGN, May 2024)](https://runwaygirlnetwork.com/2024/05/blueboxs-european-patent-moving-map/)
- [FlightPath3D Cloud (PAX Intl)](https://www.pax-intl.com/ife-connectivity/inflight-entertainment/2025/04/07/embargo-flightpath3d-enables-easier-deployments-with-cloud-based-map/)

---

## 5. Leadership & Governance

### Leadership Team

| Person | Role | Background | Public Visibility | Confidence |
|--------|------|-----------|-------------------|------------|
| Boris Veksler | CEO & Co-Founder | UCLA MBA (1996–98), ThreatSTOP, TradeBeam, Clubspaces. 20+ years Internet/mobile/IFE | High — APEX profile, industry speaking | VERIFIED |
| Duncan Jackson | President & Co-Founder | CIM Marketing diploma (1994–95), WhereWeFly, ACTIVE Network, Affinity Sports | Low — no interviews or conferences found | PARTIALLY VERIFIED |
| Ruben Girgidov | VP Engineering | Based in St. Petersburg | Low | — |
| David Dyrnaes | Ex-COO (departed ~2018–2019) | Now Solution Architect at Cloudvirga (mortgage tech). Has aviation patents. Previously at Panasonic Avionics | Confirmed departure, unrelated current role | VERIFIED |

### Recent Hires (March 2026)

| Name | Title | Background | Signal |
|------|-------|-----------|--------|
| Prashant Vyas | VP, Middle East | Thales, Safran, **Panasonic Avionics** | Hired from direct competitor |
| Howie Lewis | VP, Business Aviation | Gogo, Airshow, EMS Satcom | BizAv expansion |
| Ross Derham | Director, Product Management | **Boeing**, **Meta** (3D/AI) | AI integration focus |

### Operational Expansion

- **Portugal:** "Engineering expansion in 2025" (PAX Intl, March 2026) — first public acknowledgment of PT operations
- **Irvine HQ:** Tripled in size (early 2026), new engineering labs and client collaboration areas

### Assessment

**Key Person Risk: HIGH.** No board of directors, advisory board, or succession plan visible. Two co-founders with sole authority. Three senior hires in one month signal **growth mode**, not distress — hiring from Panasonic (direct competitor) and Meta/Boeing (AI/3D expertise) indicates strategic direction: Middle East expansion + AI integration + business aviation market. Recent VP hires represent horizontal expansion, not succession depth.

**Source:** [PAX International, March 12, 2026](https://www.pax-intl.com/ife-connectivity/inflight-entertainment/2026/03/12/flightpath3d-expands-leadership-and-operations/)

---

## 6. Portugal Office Analysis

### Facts

- **Legal entity:** Smart Travel Software, Unipessoal LDA
- **NIF:** PT517034948
- **Founded:** June 8, 2022
- **Capital:** €1,000 (minimum legal requirement for Unipessoal Lda)
- **Activity code:** Computer programming, IT consulting
- **Website listing:** "International R&D Center" at Praça do Bocage 111, Setúbal

### Red Flags

1. **Minimum capital** (€1k) — no real investment, legal minimum
2. **Founded 2022** — 10 years after FP3D — not original R&D vision, cost-cutting expansion
3. **Zero public footprint** — no press releases, no job postings, no trade mentions outside FP3D website
4. **"Unipessoal"** = single-member company = wholly-owned subsidiary
5. **Address discrepancies** — multiple addresses found in different documents
6. **First public mention: March 2026** — company existed 4 years before being publicly acknowledged as "R&D Center"

### Assessment

**Labor arbitrage shell with recent legitimization effort.** The entity was created in 2022 as a cost-optimization vehicle (Portugal wages < US), operated invisibly for 4 years, and is now being retroactively positioned as an "International R&D Center" to support the growth narrative.

**Source:** [Racius business registry](https://www.racius.com/smart-travel-software-unipessoal-lda/)

---

## 7. Russian Roots

### BIN64 (ООО БИН64)

- **INN:** 7842455555, **OGRN:** 1117847272608
- **Location:** Saint Petersburg, Russia
- **Established:** 2011 (per OGRN registration)
- **Staff:** 33 employees (2021, latest available data)
- **Domain:** bin64.ru — dead/inactive since approximately 2022
- **Activity:** Software development, data processing, IT consulting

### Timeline

The company had a significant development presence in Russia for over a decade (2011–2022). Official press releases (2013) confirm "offices in St. Petersburg, Russia." BIN64 was the engineering arm of FlightPath3D, employing 33 staff in Saint Petersburg as of 2021. Post-February 2022, FP3D stopped publicly mentioning Russian operations and the BIN64 domain went inactive.

### Sanctions Screening

- **OFAC:** No matches found for BIN64 or Betria Interactive
- **EU sanctions:** No matches found
- **Note:** WebSearch-based screening only — formal screening through compliance databases not performed

### Assessment

**Quiet distancing without full severance.** The company operated a 33-person engineering office in Russia for over 10 years. Post-2022, Russian operations appear to have been wound down or moved elsewhere (Portugal subsidiary registered in 2022 may have absorbed some functions). This creates:
- **Reputational risk:** Aviation industry is sensitive to Russia ties post-2022
- **IP risk:** Code developed over a decade by Russian entity — ownership and export control questions

**Sources:**
- [BIN64 registry (Beboss.ru)](https://www.beboss.ru/biz/7842455555-ooo-bin64)
- [Betria Interactive press release (PRWeb, 2013)](https://www.prweb.com/releases/2013/7/prweb10948936.htm)

---

## 8. AI Disruption Assessment

### Threat Level: **MEDIUM-LOW**

**Defensive moats:**
1. **Integration complexity:** Airline IFE systems (Panasonic, Thales, Collins platforms), regulatory certification, 2-3 year deployment cycles
2. **Proprietary data:** Millions of POI descriptions, AI-parsed + human-reviewed destination content
3. **Installed base:** 5,000+ aircraft = switching cost for airlines
4. **Relationships:** 13 years of airline partnerships, B2B trust

**FP3D's AI moves:**
- **Luci:** AI companion launched September 2023, deployed on 700+ aircraft by August 2024. Reported 19 million messages to 2.6 million passengers. 100,000+ POI database
- **Ross Derham:** Boeing/Meta hire for AI product direction
- **FlightPath3D Cloud:** SaaS model addresses BYOD trend
- **Destination Stories:** AI-curated content (September 2025)

**Luci — Transparency Gap:** The term "AI" appears 40+ times in FP3D press materials, but no third-party AI vendor has been identified in any public source. The company has neither disclosed using an external model (OpenAI, Google, etc.) nor explicitly claimed proprietary AI development. This is a notable transparency gap for a product marketed as an "AI companion."

**Could AI disrupt FP3D?**
- Content generation: YES — AI can create POI descriptions, curate stories
- 3D visualization: PARTIALLY — game engines exist, but aviation-grade is specialized
- Airline integration: NO — certifications, relationships, API access = years to build
- **Net assessment:** AI more likely to be a tool FP3D uses than a weapon against them. Main risk: content commoditization compressing margins.

**Sources:**
- [Luci 700 installs (RGN, Aug 2024)](https://runwaygirlnetwork.com/2024/08/luci-tops-700-installs/)
- [AI companion launch (RGN, Sept 2023)](https://runwaygirlnetwork.com/2023/09/flightpath3d-seeks-to-revolutionize-paxex-with-ai-inflight-companion/)

---

## 9. Incidents, Scandals, Complaints

**NONE FOUND across all vectors searched:**
- No court cases (California Secretary of State: active status)
- No BBB listing or complaints
- No Glassdoor employee reviews (one interview review from 2016)
- No negative trade press coverage
- No data breaches or security incidents
- No client complaints on forums

**Assessment:** Anomalously clean. Possible explanations:
1. Genuinely well-run company with happy clients
2. Too small/niche to attract scrutiny
3. NDAs suppress negative feedback
4. B2B model = no consumer-facing complaints

---

## 10. Trade Press Analysis

### Independent Coverage Quality

| Publication | Independence | Tone | Volume |
|-------------|-------------|------|--------|
| Runway Girl Network | High (editorial) | Positive-neutral | 10+ articles |
| PAX International | High (trade press) | Positive-neutral | 5+ articles |
| Simple Flying | Medium (consumer) | Positive | 2 articles |
| Onboard Hospitality | High (trade press) | Positive-neutral | 3+ articles |
| PaxEx.Aero | High (trade press) | Positive-neutral | 3+ articles |
| Aircraft Interiors Intl | High (trade press) | Neutral | 2+ articles |
| FlightGlobal | High (Tier 1) | Neutral | 1 article |
| WIRED | High (mainstream) | Positive | 1 article (quote used in marketing) |

**Assessment:** Coverage is consistently positive, primarily milestone/partnership announcements. **No investigative or critical articles found.** This is typical for niche B2B aviation tech — trade press covers announcements, not controversies.

---

## 11. Intellectual Property & Litigation

**Patents:**
- **US 9,989,370** (granted) — "Real-time multimodal travel estimation and routing system" — Inventors: Jackson, Veksler, Dyrnaes. Also filed as WIPO WO2017160374A1
- Additional registered trademark: FLIGHTPATH2D (Reg. #5318959). Main trademark covered in Section 1
- Core 3D rendering and data integration technology protected as trade secrets

**Litigation:** ZERO. No lawsuits found involving Betria Interactive, FlightPath3D, or Smart Travel Software in any jurisdiction searched.

**Bluebox Patent Threat:** EP3563573 (European, granted 2023, 19 EU countries) — covers ADS-B wireless moving maps. MEDIUM risk to FP3D wireless offerings in EU if same technology used. No active disputes found.

---

## 12. Financial Health Indicators

| Indicator | Finding | Confidence |
|-----------|---------|-----------|
| Inc. 5000 (2025) | Rank #4725, 3-year revenue growth 2021-2024 | VERIFIED |
| Revenue bracket | Minimum $2M (2024) to qualify. Specific figures paywalled | PARTIALLY VERIFIED |
| VC funding | $0 raised — confirmed | VERIFIED |
| Government contracts | No SAM.gov registration | NOT FOUND |
| Hiring activity | 1 green card filing in 3 years, no current openings | SINGLE SOURCE |

**Assessment:** Lean, bootstrapped operation with confirmed growth. Low hiring activity suggests automation-heavy or contractor-based model.

---

## 13. Conference Presence

| Event | Year(s) | Evidence | Type |
|-------|---------|----------|------|
| APEX EXPO | 2024-2025 | Booth #1135, product launches | Exhibitor |
| AIX Hamburg | 2024-2025 | Product demos, partner exhibitions | Exhibitor |
| Crystal Cabin Award | 2025 | Accessibility Map shortlisted | Nominee |
| FTE | — | Mentions only, no booth evidence | Mention |

**Assessment:** Regular exhibitor at two most important aviation IFE conferences. Consistent physical presence — not a paper company.

---

## 14. Overall Verdict

### Strengths

- Real product with verified deployment (5,000+ aircraft confirmed by multiple sources)
- Market leader in moving maps (overtook Collins Airshow)
- Genuine awards from recognized industry bodies (APEX, PAX, Onboard Hospitality)
- Strategic AI integration (Luci, hiring from Meta/Boeing)
- Clean public record — no scandals, complaints, or lawsuits found
- Confirmed major airline clients: United, American, Lufthansa, Qatar, BA, Southwest, Cathay, Delta, Norwegian, ANA, Riyadh Air
- Granted US patent (multimodal travel routing)
- Consistent conference presence at APEX EXPO and AIX Hamburg

### Weaknesses

- Marketing inflation (numbers rounded up, failed goals quietly moved)
- Client verification rate: 14.4% (13/90+) — improving but still low
- Limited transparency on leadership, financials, employee count
- Luci AI: no vendor or proprietary technology disclosure despite heavy "AI" marketing
- Portugal subsidiary = minimum-capital shell, invisible for 4 years before public acknowledgment
- Russian roots (10+ years in St. Petersburg) largely unaddressed in sanctions-sensitive era
- No Glassdoor presence = either tiny team or suppressed reviews
- Quiet rebrand from Betria to FlightPath3D with no public explanation

### Risk Matrix

| Risk | Severity | Likelihood | Notes |
|------|----------|-----------|-------|
| Marketing inflation discovered by client | Medium | Medium | "100 airlines" claim not independently verifiable |
| Russia sanctions exposure | High | Low | No matches found; 10+ years of Russian operations largely unaddressed |
| Portugal entity labor issues | Medium | Medium | €1k shell + labor arbitrage pattern |
| AI transparency gap (Luci) | Medium | Medium | No vendor disclosure despite heavy marketing |
| Panasonic Arc catching up | Medium | Medium | 35 → growing, integrated ecosystem |
| AI content commoditization | Low | High | Margins may compress but moat holds |
| Key person risk (Veksler/Jackson) | High | Low | Bootstrapped, no succession plan visible |

### Final Assessment

**FlightPath3D (DBA of Betria Interactive, LLC) is a verified legitimate company** with a real product, strong market position, and confirmed major airline clients. However, it operates with significant structural opacity: a quiet rebrand from Betria with no public explanation, Russian engineering roots spanning 10+ years in St. Petersburg, a minimum-capital Portugal shell invisible for 4 years, no disclosed AI technology stack despite heavy marketing, no public leadership page, no Glassdoor presence, and a low client verification rate. The company engages in typical SaaS marketing inflation — not fraudulent, but not fully transparent either.

**For business decisions:** verify specific claims directly with FP3D and request client references. Do not rely on website numbers as verified facts.

---

## Methodology

This investigation was conducted using exclusively open sources (OSINT):

1. **Phase 1** — 4 research directions: website/claims verification, client base analysis, competitive landscape/industry, leadership/incidents
2. **Phase 2** — 3 research directions: leadership deep-dive, IP/litigation/financial, conference presence/client verification
3. **Phase 3** — 2 research directions: corporate identity (Betria/DBA relationship), AI technology verification (Luci)
4. **Source triangulation** — ~60 web sources cross-referenced
5. **Corporate registry verification** — California SOS, Portuguese Racius, Russian business registries, USPTO, WIPO, OpenCorporates, D&B

**Sources:** public websites, trade press archives, business registries, patent databases, trademark databases, industry databases, search engines
**Limitations:** no access to financial filings (LLC), no formal sanctions screening databases, no insider interviews, Inc. 5000 revenue data paywalled, California SOS CAPTCHA-protected

*9 research agents across 3 phases, ~60 open sources consulted*
*Investigation date: 13.03.2026*
*Next review: on request*
