---
title: "EU AI Act: Enforcement, Penalties, and Regulatory Practice"
date: 2026-02-25
status: verified
confidence: high
tags: ["eu-ai-act", "enforcement", "penalties", "dpa", "regulatory"]
categories: ["investigation"]
series: ["EU AI Act"]
series_order: 5
sources_count: 13
investigation_id: "INV-011-5"
investigation_type: research
methodology_disclosed: true
reviewed_by: "FolkUp Editorial"
review_date: 2026-02-28
pii_reviewed: true
summary: "Analysis of EU AI Act and GDPR enforcement landscape: penalty structure, recent fines (OpenAI €15M, Clearview €100M+), European AI Office powers, national authorities' readiness, and risk assessment for small developers."
---

# EU AI Act: Enforcement, Penalties, and Regulatory Practice

**Research Date:** February 25, 2026
**Scope:** Enforcement mechanisms and regulatory practice for AI systems in EU
**Audience:** Developers, publishers, SMEs

---

## Executive Summary

As of February 2026, EU AI Act enforcement is in early stages, while GDPR-based AI enforcement is active and growing. Key findings:

- **No formal AI Act enforcement actions yet** — implementation timeline still unfolding
- **GDPR AI penalties escalating:** OpenAI (€15M), Luka/Replika (€5M), Clearview AI (€100M+ cumulative)
- **European AI Office** operational since 2025, full enforcement powers from August 2, 2026
- **Portugal's ANACOM** appointed September 2025, still building capacity
- **Risk for small developers:** Low — regulators focus on large operators with mass impact
- **Penalty structure favors SMEs:** Article 99(6) applies lower of fixed amount or % of turnover

---

## 1. EU AI Act Penalty Structure

### 1.1 Three-Tier System (Article 99)

| Tier | Violation | Maximum for Enterprises | Maximum (Fixed) |
|------|-----------|------------------------|-----------------|
| **1 (maximum)** | Prohibited practices (Article 5) | 7% of annual worldwide turnover | €35,000,000 |
| **2** | Other Regulation obligations | 3% of annual worldwide turnover | €15,000,000 |
| **3 (minimum)** | Providing incorrect information to authorities | 1% of annual worldwide turnover | €7,500,000 |

**The higher of two amounts applies** (% of turnover or fixed amount) — for regular enterprises.

### 1.2 SME Protection (Article 99(6))

> *"In the case of SMEs, including start-ups, each fine referred to in this Article shall be up to the percentages or amount referred to in paragraphs 3, 4 and 5, whichever thereof is lower."*

**For SMEs/startups — the LOWER of two amounts applies.**

**Example calculation** (Article 50 violation = tier 2):
- Annual turnover: €100,000
- 3% of €100,000 = €3,000
- Fixed amount = €15,000,000
- **For SME fine = up to €3,000** (lower of two)
- **For large enterprise fine = up to €15,000,000** (higher of two)

This proportionality clause provides **significant protection** for small businesses.

### 1.3 Natural Persons

**Article 99 does not contain separate provisions on fines for natural persons not operating as enterprises.**

Key points:
1. Definitions of "provider" and "deployer" in Article 3 include natural persons
2. Article 99(1) states fines must be "effective, proportionate and dissuasive"
3. **Specific fine amounts for natural persons** determined at **national level** by each Member State
4. Article 99(8) delegates to Member States powers to determine rules for imposing fines on public authorities

**For Portugal:** ANACOM appointed as coordinating authority (September 2025). Specific rules for natural persons will be determined by Portuguese implementing legislation.

### 1.4 Factors in Determining Fine (Article 99(7))

When imposing fine, authorities consider:
- Nature, gravity and duration of violation
- Purposes and context of violation
- Size and market share of violator
- Previous violations
- Degree of cooperation with supervisory authority
- Categories of personal data affected
- Voluntary measures to mitigate damage
- Degree of responsibility and measures taken for compliance

---

## 2. Current Enforcement Status (February 2026)

### 2.1 EU AI Act Enforcement Timeline

| Date | What Enters Enforcement |
|------|----------------------|
| February 2, 2025 | **Prohibited practices (Article 5)** — enforceable, but no formal actions yet |
| August 2, 2025 | Penalty regime active; GPAI obligations enforceable |
| August 2, 2026 | **Full enforcement powers** for high-risk AI, transparency obligations (Article 50), European AI Office |
| August 2, 2027 | High-risk AI in regulated products |

### 2.2 Actual Enforcement (as of February 2026)

**By February 2026, no formal enforcement action under EU AI Act officially announced.** This explained by:

- Most Member States did not appoint national competent authorities by August 2, 2025 deadline (including Portugal, France, Germany, Italy, Belgium — only 7 of 27 countries met deadline)
- Penalty regime entered force only August 2, 2025
- Full enforcement powers for GPAI with Commission — from August 2, 2026

**However**, several investigations reportedly underway:
- Emotion recognition systems in workplaces at multinational corporations
- Predictive policing algorithms in EU law enforcement
- Social scoring elements in employee management platforms

### 2.3 Digital Omnibus — Mitigation (November 2025)

November 19, 2025, European Commission published Digital Omnibus on AI proposal:

- **Delay for high-risk AI systems**: application of rules tied to availability of compliance tools (standards), maximum delay — 16 months
- **New deadlines**: Annex III — no later than December 2, 2027; Annex I — no later than August 2, 2028
- **Expansion of SME privileges** to small-mid cap companies (SMC): simplified documentation, proportionate fines
- **Permission to process** special categories of data for bias detection (with safeguards)

**Status**: proposal submitted to Council and Parliament; additional amendments and negotiations expected.

---

## 3. GDPR Enforcement: AI-Related Penalties

### 3.1 General GDPR Statistics

- Since 2018: over **2,800 fines**, cumulative volume — **~€5.88 billion**
- 2024: **~€1.2 billion** in fines
- 2025: **~€2.3 billion** in fines (38% year-over-year growth)

### 3.2 Major AI-Related Fines

| Date | Authority | Entity | Amount | Reason |
|------|-----------|--------|--------|--------|
| Oct 2022 | CNIL (France) | Clearview AI | €20M | Illegal biometric data collection, facial recognition |
| May 2023 | CNIL (France) | Clearview AI | €5.2M | Non-compliance with previous order (penalty payments) |
| May 2024 | Dutch DPA (Netherlands) | Clearview AI | €30.5M | Illegal biometric database, no legal basis |
| Dec 2024 | AEPD (Spain) | La Liga | €1M | Biometric recognition at stadiums |
| Dec 2024 | AEPD (Spain) | FC Osasuna | €200,000 | Facial recognition at stadium |
| Dec 2024 | Garante (Italy) | OpenAI | €15M | ChatGPT: no legal basis, transparency, age protection, breach |
| 2025 | Hamburg DPA (Germany) | Financial company | ~€500,000 | Automated credit decisions without human oversight (Art. 22) |
| Apr 2025 | Garante (Italy) | Luka Inc (Replika) | €5M | AI companion: legal basis, transparency, age verification |

### 3.3 Italy: Garante vs OpenAI — Detailed Analysis

**Timeline:**

| Date | Event |
|------|-------|
| March 2023 | Garante temporarily blocked ChatGPT in Italy |
| April 2023 | Block lifted after OpenAI measures |
| January 2024 | Garante notified OpenAI of GDPR violations |
| December 20, 2024 | **Fine €15 million** |

**Violations Identified:**
1. **Lack of legal basis** (Art. 6 GDPR) — training ChatGPT on personal data without proper legal basis
2. **Transparency violation** — insufficient user information
3. **No age verification** — no mechanism to protect children under 13
4. **Failure to report data breach** — March 2023 breach not timely reported to Garante

**Additional Requirements:**
- 6-month public education campaign about ChatGPT operation and data subject rights

**Current Status:** OpenAI appealed, calling fine "disproportionate" — allegedly 20 times company's Italy revenue for disputed period.

**Significance:** First major GDPR fine specifically for generative AI system. Establishes precedent that AI providers must have valid legal basis for training data processing.

### 3.4 Clearview AI — Cumulative EU Enforcement

**Clearview AI fined 7 times** by various EU DPAs since 2020:

| Country | Authority | Amount |
|---------|-----------|--------|
| France | CNIL | €25.2M |
| Netherlands | Dutch DPA | €30.5M |
| Italy | Garante | €20M |
| UK | ICO | £7.5M |
| Greece | HDPA | €20M |
| **Total (approximate)** | | **>€100M** |

**Pattern:** Persistent non-compliance across jurisdictions. Dutch DPA examining possibility of **personal liability of company directors**.

**Lesson:** Even claiming "no EU presence" doesn't exempt from GDPR — territoriality principle applies if processing EU residents' data.

---

## 4. European AI Office

### 4.1 Structure and Resources

- **Created:** within European Commission structure
- **Staff:** over 125 employees (technologists, lawyers, economists, policy specialists), with expansion plans
- **Functions:** investigate violations, assess model capabilities, request documentation, access GPAI model source code, impose corrective measures

### 4.2 Powers

- Request information and documentation from GPAI providers
- Conduct model capability assessments
- Request source code access
- Impose corrective measures
- Impose fines (from August 2, 2026)

### 4.3 Actual Activity

**GPAI Code of Practice** — published July 10, 2025:
- Three sections: (1) Transparency, (2) Copyright, (3) Safety
- Voluntary instrument, but de facto standard for demonstrating compliance

**Major Companies' Positions:**
- **OpenAI and Mistral:** signed Code of Practice
- **Meta:** **refused** to sign, claiming "legal uncertainty" and measures "exceeding AI Act"
- January 2026: AI Office began **formal investigation** regarding Meta's WhatsApp Business APIs — allegation of restricting competing AI providers

**GPAI Model Guidelines** — published 2025:
- Key GPAI concepts
- Classification of systemic risk models
- Transparency and safety obligations

### 4.4 Enforcement Timeline

| Date | Action |
|------|--------|
| August 2, 2025 | GPAI obligations entered force; AI Office cooperates with providers |
| August 2, 2026 | **Full enforcement powers**: fines, information requests, model withdrawal |
| August 2, 2027 | Deadline for models placed before August 2, 2025 |

---

## 5. National Authorities

### 5.1 Portugal: ANACOM

**Appointed September 2025** (late — deadline was August 2):
- **Role:** national market surveillance authority and single point of contact for EU AI Act
- **Challenge:** ANACOM historically **telecommunications regulator**, lacking AI specialization
- **Current status:** building internal competencies and coordination frameworks

**Powers:**
- Market surveillance of AI systems
- Coordination of all national AI authorities
- Information gathering and investigations
- Imposing corrective measures
- Administrative fines

### 5.2 Portugal: CNPD

**Comissão Nacional de Protecção de Dados:**
- Has GDPR jurisdiction over all AI systems processing personal data
- **Track record:** Worldcoin decision (2024) — first AI enforcement action in Portugal
- Resources: **limited**. CNPD historically one of least-funded DPAs in EU

**March 25, 2024 — Deliberação 2024/137:**
- Temporary 90-day restriction on Worldcoin's biometric data processing
- Over 300,000 people in Portugal had provided biometric data
- Violations: lack of legal basis, transparency issues, inability to delete data

### 5.3 Other Active DPAs

**France: CNIL**
- Published comprehensive AI guidance (February 2025, July 2025)
- Active enforcement: Clearview AI (€25.2M)
- Strategic priority: AI and biometric systems

**Spain: AEPD**
- 2024 statistics: €35.5M fines (19% increase)
- AI-related: La Liga (€1M), FC Osasuna (€200,000)
- Proactive monitoring of AI and biometric systems

**Italy: Garante**
- Most aggressive AI enforcer in EU
- OpenAI (€15M), Luka/Replika (€5M), Clearview AI (€20M)
- Temporary blocks: ChatGPT (March 2023), Replika (February 2023)

---

## 6. Risk Assessment for Small Developers

### 6.1 Historical Pattern: Who Gets Fined?

**Analysis of GDPR enforcement tracker (2018-2026):**

Overwhelming majority of large fines (tens/hundreds of millions) imposed on:
- **Big Tech:** Meta, Google, Amazon, Apple, Microsoft, TikTok
- **Telecom companies:** Vodafone, Tim, Orange
- **Large organizations:** H&M, British Airways, Marriott

**AI-specific fines** — exclusively on:
- Large AI companies (OpenAI, Luka Inc, Clearview AI)
- Large organizations implementing AI (La Liga, FC Osasuna)

**Fines for natural persons under GDPR exist:**
- Doctor: €5,000 for data processing principles violation
- Private person: €240 for insufficient legal basis
- Maximum formally — up to €20M / 4% turnover

### 6.2 Risk Profile: Individual Open-Source Developer in Portugal

**Factors REDUCING risk:**

1. **Project scale:** DPAs and regulators focus on mass violations (millions of data subjects). Open-source projects with limited audience — not priority
2. **Non-commercial purpose:** non-commercial projects attract less attention
3. **Open-source exemptions in AI Act:**
   - GPAI models under free/open-source licenses exempt from most obligations (except copyright and training data summary)
   - FOSS components used in high-risk AI exempt from downstream provider documentation obligations
4. **Penalty proportionality for SMEs:** lower of two amounts applies
5. **Portuguese regulator resources:**
   - CNPD — one of least-funded DPAs in EU
   - ANACOM — only beginning to build AI competencies
   - Priorities: large violators with mass citizen impact
6. **Deployer position:** using commercial AI services for content generation — deployer role, not provider. Main compliance burden — on model providers

**Factors INCREASING risk:**

1. **GDPR makes no distinction** between natural persons and companies — if processing personal data, rules apply
2. **Copyright risks:** if AI generates content reproducing copyright materials — publisher liable
3. **Transparency obligations (August 2026):** if project publishes AI-generated text to inform public — labeling obligation
4. **Complaints:** even small project can become investigation subject upon complaint from competitor, user or activist
5. **Precedent value:** regulators sometimes select "showcase cases" to establish precedent

### 6.3 Realistic Risk Assessment

| Risk Category | Level | Rationale |
|--------------|-------|-----------|
| AI Act fine | **Minimal** | Open-source exemptions; no prohibited practices; ANACOM lacks resources for small targets |
| GDPR fine | **Low** | If no PD processing (no registration, accounts, tracking) — practically zero |
| Copyright claim | **Low-Medium** | Depends on content; if AI generates encyclopedic articles — unlikely |
| Transparency obligations | **Medium (from Aug 2026)** | Article 50 requires AI content labeling for public information |
| DPA complaint | **Low** | Possible, but DPAs prioritize by violation scale |

---

## 7. Practical Guidance

### 7.1 Minimal Compliance Strategy

**Most practical and safe approach for small digital publishers:**

1. **Content:** Establish formal human review process for all AI-generated content + take editorial responsibility + add transparent disclaimer (not mandatory, but builds trust)

2. **Code (libraries, apps):** No specific AI Act obligations if product itself is not AI system

3. **Voluntary donations:** Structure as voluntary contributions without ties to specific AI functions — to maintain open-source status

4. **Documentation:** Keep records of content creation process — useful during inspections

### 7.2 Priority Actions

**Before August 2, 2026:**

1. **Document editorial workflow** — for Article 50 exemption (editorial control exception)
2. **Prepare labeling mechanisms** — if editorial control exemption doesn't apply
3. **Ensure no personal data** in AI prompts — minimize GDPR risks
4. **Copyright verification** — check AI output for plagiarism before publication

**Monitor:**
- Final Transparency Code of Practice (June 2026)
- ANACOM guidance and enforcement actions
- CJEU decision in C-250/25 (Like Company v. Google)

### 7.3 Red Flags (Avoid These)

❌ **Prohibited practices (Article 5)** — social scoring, manipulative AI, real-time biometric ID
❌ **Processing personal data without legal basis** — largest GDPR violation category
❌ **No Privacy Policy** — basic GDPR requirement, easy to fix
❌ **Publishing AI content without review** — copyright infringement risk
❌ **Ignoring data breach** — failure to report within 72 hours (Article 33)

---

## Sources

### Official Documents
- [EU AI Act (Regulation 2024/1689)](https://artificialintelligenceact.eu/)
- [Article 99: Penalties](https://artificialintelligenceact.eu/article/99/)
- [European AI Office](https://digital-strategy.ec.europa.eu/en/policies/ai-office)
- [GDPR (Regulation 2016/679)](https://gdpr.eu/)

### Regulator Decisions
- [Italy fines OpenAI €15M](https://thehackernews.com/2024/12/italy-fines-openai-15-million-for.html)
- [Italy fines Replika €5M](https://www.edpb.europa.eu/news/national-news/2025/ai-italian-supervisory-authority-fines-company-behind-chatbot-replika_en)
- [Dutch DPA fines Clearview AI €30.5M](https://www.autoriteitpersoonsgegevens.nl/en/current/dutch-dpa-imposes-a-fine-on-clearview-because-of-illegal-data-collection-for-facial-recognition)
- [CNPD suspends Worldcoin in Portugal](https://www.cnpd.pt/)
- [GDPR Enforcement Tracker](https://www.enforcementtracker.com/)

### Analytical Materials
- [Digital Omnibus Proposal (Nov 2025)](https://digital-strategy.ec.europa.eu/en/library/digital-omnibus-ai-regulation-proposal)
- [Code of Practice for GPAI](https://code-of-practice.ai/)
- [Portugal AI Regulation (Chambers 2025)](https://practiceguides.chambers.com/practice-guides/artificial-intelligence-2025/portugal)
- [AI Laws in Portugal (CMS)](https://cms.law/en/int/expert-guides/ai-regulation-scanner/portugal)
- [Linux Foundation: Open Source Developers and EU AI Act](https://linuxfoundation.eu/newsroom/ai-act-explainer)

---

*Report prepared February 25, 2026. Information current as of date of preparation. Regulatory environment actively evolving — monitoring of updates from European Commission, AI Office and national authorities recommended.*

{{< disclaimer type="legal" >}}
