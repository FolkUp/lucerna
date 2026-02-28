---
title: "EU AI Act Compliance Checklist: Practical Guide for Digital Publishers"
date: 2026-02-25
status: verified
confidence: high
tags: ["eu-ai-act", "gdpr", "compliance", "checklist", "guide"]
categories: ["investigation"]
series: ["EU AI Act"]
series_order: 6
sources_count: 10
investigation_id: "INV-011-6"
investigation_type: research
methodology_disclosed: true
reviewed_by: "FolkUp Editorial"
review_date: 2026-02-28
pii_reviewed: true
summary: "Comprehensive compliance checklist for small digital publishers using AI tools: immediate actions, timeline-based tasks, documentation requirements, Privacy Policy templates, and risk mitigation strategies. Practical implementation guide for GDPR and EU AI Act."
---

# EU AI Act Compliance Checklist: Practical Guide for Digital Publishers

**Research Date:** February 25, 2026
**Target Audience:** Small digital publishers, content creators, open-source developers using AI tools
**Scope:** EU AI Act + GDPR compliance

---

## Executive Summary

This checklist provides actionable guidance for small digital publishers using AI tools (Claude, ChatGPT, etc.) for content creation. Focus areas:

- **Immediate actions** (before next deployment)
- **Short-term tasks** (3 months)
- **Medium-term preparation** (12 months)
- **Ongoing compliance** requirements

**Key Timeline:**
- **Now:** Privacy Policy, disclaimers, basic GDPR compliance
- **By August 2, 2026:** Article 50 transparency obligations (AI content labeling)
- **Ongoing:** Editorial control documentation, monitoring regulatory changes

---

## 1. Immediate Actions (Do NOW)

**Deadline:** Before next release/deployment

### 1.1 Privacy Policy (Política de Privacidade)

**Required for GDPR compliance (Articles 13-14).**

- [ ] **Create Privacy Policy** on each website (Portuguese + English versions)
- [ ] Specify data controller (name, address, email, NIF if company)
- [ ] List all collected data types:
  - Authentication system: email, username, password hash, IP on login, session tokens
  - Analytics (if self-hosted like Umami): anonymized visit data (no cookies, no PII)
  - Payment/donations (if Ko-fi): processed by third party, link to their Privacy Policy
  - Contact forms (if any): email, name, message content
- [ ] Specify legal basis for processing (Art. 6 GDPR):
  - Authentication: **consent** or **contract performance**
  - Analytics: **legitimate interest** — traffic analysis
  - Donations: **consent** or **contract performance**
- [ ] Describe data subject rights (Art. 15-22 GDPR):
  - Right to access, rectification, erasure, portability
  - Right to object, restriction of processing
  - Right to withdraw consent
  - Right to complaint with CNPD (Portugal) or local DPA
- [ ] Specify data retention periods
- [ ] Specify international data transfers (if applicable):
  - AI API (Anthropic, OpenAI) → US (if PII in prompts)
  - Donation platform → UK/US
- [ ] Provide contact for data protection questions
- [ ] Date of last update prominently displayed

**Template structure:** See Appendix A

### 1.2 Cookie Policy / Banner

- [ ] **Self-hosted analytics (Umami, etc.) without cookies:** Cookie consent banner **NOT REQUIRED**
  - However: if other cookies used (session cookies), need cookie notice
- [ ] **Authentication session cookies:** These are "strictly necessary" cookies
  - Strictly necessary cookies: consent banner **not required** under ePrivacy Directive
  - But must **mention in Cookie Policy**
- [ ] Create Cookie Policy listing:
  - Session cookie: name, duration, purpose
  - Absence of marketing/analytics cookies

### 1.3 Terms of Use (Termos de Utilização)

- [ ] **Create Terms of Use** for each website
- [ ] Include:
  - Service description
  - Content usage conditions (link to license: CC BY-SA / CC BY)
  - Disclaimer: content is informational, doesn't replace professional advice
  - **Special disclaimer for sensitive content** (mushroom identification, health advice, etc.)
  - Account usage rules (for authenticated resources)
  - Limitation of liability
  - Applicable law: Portugal / EU
  - Dispute resolution

**Key disclaimer for encyclopedias:** "This content is provided for informational purposes only. For critical decisions (health, safety, legal matters), always consult qualified professionals."

### 1.4 AI Content Disclosure

**Important:** Under Article 50(4) editorial control exception, formal "AI-generated" labeling is legally **not mandatory** IF content underwent documented human review with editorial responsibility. However, **voluntary disclosure** is best practice.

- [ ] **Option A (Recommended): "Methodology" section on each encyclopedia site**
  - Describe content creation process: research, writing, verification, editing
  - Mention use of various tools and technologies for content preparation
  - Emphasize editorial control and verification role
  - Specify who holds editorial responsibility

- [ ] **Option B (Minimal): Mention in footer or About page**
  - Brief note about automated tools use in content preparation
  - Link to full methodology

- [ ] **For each article:**
  - Field `status` (verified/unverified) — in frontmatter
  - Field `confidence` (high/medium/low) — in frontmatter
  - Field `sources[]` — in frontmatter
  - **Add:** Field `reviewed_by` or `editor` + `review_date` in frontmatter (documents editorial control)

### 1.5 Basic GDPR Steps

- [ ] **Records of Processing Activities (ROPA):**
  - Create internal document (not published)
  - For each processing: purpose, data categories, recipients, retention periods, safeguards
  - Required per Art. 30 GDPR (exception for <250 employees doesn't apply if processing not occasional)

- [ ] **Data Processing Agreements (DPA):**
  - Donation platform: verify DPA in their Terms
  - AI API provider: verify DPA/Terms of Service — **don't send users' PII through API**
  - VPS provider: verify DPA

- [ ] **Authentication system — GDPR settings:**
  - Enable account deletion mechanism (user self-service)
  - Enable data export capability
  - Configure consent flow on registration
  - Configure Terms & Conditions flow
  - Verify session and log retention periods
  - Encrypt data at rest (database)

- [ ] **Data Protection contact:**
  - Designate contact email for data subject requests
  - DPO **formally not required** (individual/small business, not core data processing activity)
  - But contact person mandatory

### 1.6 Security Baseline

- [ ] HTTPS on all sites (if using nginx + Let's Encrypt, already covered)
- [ ] Update Docker containers (authentication, analytics, site builder)
- [ ] Strong VPS passwords, SSH keys
- [ ] Database backups (contains PII if authentication system)
- [ ] Access logging

---

## 2. Short-Term Actions (Within 3 Months)

**Deadline:** By May 2026

### 2.1 Prepare for EU AI Act (Article 50 effective August 2, 2026)

- [ ] **Document editorial process (Editorial Workflow):**
  - Create internal document describing article creation process for each topic
  - Record: who generates, who verifies, who approves for publication
  - Designate **responsible editor** (editorial responsibility) — individual or company
  - Maintain review log: date, reviewer, what verified
  - **This is key condition for applying Article 50(4) exception**

- [ ] **Prepare labeling system (if exception doesn't apply):**
  - Machine-readable metadata: `<meta name="content-origin" content="ai-assisted, human-reviewed">`
  - Or schema.org markup: `"creativeWorkStatus": "AI-assisted"`
  - Monitor Code of Practice finalization (expected June 2026)

- [ ] **Conduct AI literacy training (Art. 4 — already in force since Feb 2, 2025):**
  - Obligation to ensure sufficient AI literacy level of staff
  - For individual: document own knowledge and AI work experience
  - Create internal document: which AI systems used, how, for what

- [ ] **Classify all AI systems used:**
  - AI API for content generation: provider, version, purpose, risk category
  - AI API for code development assistance
  - Other AI tools (if any)

### 2.2 DPIA (Data Protection Impact Assessment)

- [ ] **Assess DPIA necessity:**
  - DPIA mandatory if processing "likely to result in high risk" (Art. 35 GDPR)
  - For current small-scale operations: **DPIA formally not mandatory**, but recommended
  - Authentication with user data: conduct mini-DPIA
  - Encyclopedias without PII: DPIA not needed

- [ ] **Create simplified DPIA for authentication:**
  - Processing description
  - Necessity and proportionality
  - Risks to data subjects
  - Mitigation measures

### 2.3 Documentation to Create

- [ ] **Internal documents (NOT published):**
  - [ ] Records of Processing Activities (ROPA) — processing registry
  - [ ] AI System Inventory — inventory of AI systems used
  - [ ] Editorial Workflow Documentation — editorial control process
  - [ ] Data Retention Schedule — retention/deletion schedule
  - [ ] Security Measures Documentation — security measures description
  - [ ] Incident Response Plan — incident response plan

- [ ] **Public documents:**
  - [ ] Privacy Policy (PT + EN) — on each site
  - [ ] Terms of Use (PT + EN) — on each site
  - [ ] Cookie Policy — on sites with authentication
  - [ ] Content Methodology / About — on encyclopedias
  - [ ] Licensing page — LICENSE, LICENSE-CONTENT files

### 2.4 Copyright Risk Assessment

- [ ] **Analyze risks of AI-generated content under CC license:**
  - Under current EU law: AI-generated content **not protected** by copyright without significant human contribution
  - If content substantially edited by human → may be protected
  - CC license on unprotected content = legal uncertainty
  - **Recommendation:** Position content as "AI-assisted, human-edited"

- [ ] **Verify AI content doesn't infringe others' copyright:**
  - AI providers (Claude, GPT) don't quote verbatim protected texts (Usage Policies)
  - But monitor output for matches with existing texts
  - Especially for: scientific descriptions, rules explanations, interpretations

---

## 3. Medium-Term Actions (Within 12 Months)

**Deadline:** By February 2027

### 3.1 If Establishing Company (Portugal)

- [ ] **Preparation for registration:**
  - Obtain NIF (if resident, already have)
  - Choose CAE (Classificação de Actividades Económicas):
    - **62010** — Computer programming activities
    - **63120** — Web portals
    - **58190** — Other publishing activities (for encyclopedias)
  - Verify name availability in RNPC
  - Minimum share capital: €1 (recommended €1,000-€5,000)

- [ ] **Registration procedure (Empresa na Hora or Empresa Online):**
  - Empresa na Hora: ~€220-360, 1 day for basic registration
  - Empresa Online: cheaper but longer
  - Required: Contabilista Certificado (accountant), ~€100-200/month for small business
  - Social Security registration
  - Bank account opening: ~4 weeks

- [ ] **Legal address:**
  - Home address acceptable for Lda
  - Or virtual office: ~€30-80/month

### 3.2 Transfer Responsibility to Company

- [ ] **Transfer projects to legal entity:**
  - Transfer domains to Lda
  - Update Privacy Policy (controller = Lda instead of individual)
  - Update Terms of Use
  - Update LICENSE files (copyright holder = Company Lda)
  - Update donation platform account

- [ ] **Designate Lda as data controller:**
  - Update all legal documents
  - Lda = Data Controller, individual = Gerente (Managing Director)

### 3.3 Regulator Registration

- [ ] **ANACOM (AI Act market surveillance):**
  - As of February 2026, formal deployer registration **not required**
  - Monitor updates: ANACOM may introduce mandatory registration
  - Website: https://www.anacom.pt

- [ ] **CNPD (data protection):**
  - DPO appointment **not mandatory** for small business
  - But notification to CNPD may be required for certain processing types
  - On data breach: mandatory notification within 72 hours (Art. 33 GDPR)
  - Website: https://www.cnpd.pt

- [ ] **Finanças (tax authority):**
  - Automatic upon Lda registration
  - Ko-fi donations: may classify as income, verify with accountant
  - IRC (corporate tax): 21% standard rate, startup incentives available

### 3.4 Insurance

- [ ] **Professional Liability Insurance:**
  - **NOT mandatory** by law for IT companies in Portugal
  - Recommended when scaling
  - Approximate cost: €300-800/year for small IT business
  - Covers: content errors, privacy violations, damage from incorrect information
  - **Especially important for encyclopedias on sensitive topics** (mushroom identification, health)
  - Providers: Tranquilidade, AIG Portugal, Howden

- [ ] **Cyber Insurance:**
  - Covers: data breaches, cyberattacks, breach notification costs
  - Approximate cost: €200-500/year
  - Recommended when >100 users in authentication system

---

## 4. Ongoing Compliance

### 4.1 Regulatory Change Monitoring

- [ ] **Subscribe to updates:**
  - EU AI Act Newsletter: https://artificialintelligenceact.substack.com
  - ANACOM (Portugal): https://www.anacom.pt
  - CNPD (Portugal): https://www.cnpd.pt
  - AI Office (EC): https://digital-strategy.ec.europa.eu/en/policies/ai-office
  - European AI Act portal: https://artificialintelligenceact.eu

- [ ] **Key dates to track:**
  - **June 2026:** Finalization of Code of Practice on AI content labeling
  - **August 2, 2026:** Article 50 enters force (transparency obligations) and high-risk AI obligations
  - **August 2, 2027:** High-risk AI in regulated products obligations enter force
  - **March 2026:** European Parliament vote on "Copyright and Generative AI" report
  - **Ongoing:** Portuguese AI Act national implementation

### 4.2 Periodic Document Updates

| Document | Update Frequency | Trigger |
|----------|-----------------|---------|
| Privacy Policy | Annually + on changes | New data type, new processor, controller change |
| Terms of Use | Annually + on changes | New functionality, license change |
| Cookie Policy | On cookie changes | Adding/removing cookies |
| Content Methodology | On process changes | New AI tool, workflow change |
| ROPA | Quarterly | New data processing |
| AI System Inventory | Quarterly | New AI tool, model update |
| DPIA | Annually (if applicable) | Processing scale/nature change |
| Editorial Workflow | On process changes | New tool, new reviewer |

### 4.3 Training Data / Prompt Documentation

- [ ] **For encyclopedias:**
  - Store main prompts (templates) used for content generation
  - Document which external sources used for verification
  - Don't store PII in prompts (no user PII → minimal risk)
  - **Not necessary to store every prompt** — templates and methodology sufficient

- [ ] **For code:**
  - AI-assisted code: **no special AI Act requirements**
  - Standard open-source license requirements: SPDX, attribution
  - No obligation to disclose AI use in code writing (AI Act doesn't cover developer tools)

### 4.4 Incident Response

- [ ] **Create Incident Response Plan:**

  **1. Data Breach (authentication data leak):**
     - Notify CNPD within 72 hours (Art. 33 GDPR)
     - Notify affected users (Art. 34 GDPR) if high risk
     - Document incident, causes, measures

  **2. Incorrect encyclopedia content (mushroom ID error, etc.):**
     - Immediately correct or remove article
     - Post correction notice
     - Document incident

  **3. Copyright infringement (DMCA/Copyright claim):**
     - Notice and Takedown procedure
     - Contact email for complaints in Terms of Use
     - Investigation and response within 14 days

  **4. AI system malfunction:**
     - Stop publishing content from affected source
     - Review previously published content
     - Document

- [ ] **Notification templates:**
  - CNPD data breach notification
  - User data breach notification
  - Content correction notice

### 4.5 Periodic Audits

| Audit Type | Frequency | Responsible |
|-----------|-----------|-------------|
| Infrastructure security | Quarterly | Technical lead |
| Privacy Policy vs actual processing alignment | Semi-annually | Owner |
| Dependency license audit | Each major release | Owner |
| Document currency check | Quarterly | Owner |
| Encyclopedia content accuracy | Ongoing, scheduled | Owner / experts |

---

## 5. Risk Assessment Matrix

### Risk Scale

**Likelihood:** Low (1) | Medium (2) | High (3)
**Impact:** Low (1) | Medium (2) | High (3) | Critical (4)
**Priority:** Risk = Likelihood × Impact

### 5.1 Regulatory Risks

| # | Risk | Likelihood | Impact | Score | Mitigation | Priority |
|---|------|-----------|--------|-------|-----------|----------|
| R1 | CNPD fine for missing Privacy Policy | Medium (2) | High (3) | **6** | Create Privacy Policy immediately | **P0** |
| R2 | Fine for Art. 50 AI Act violation (from Aug 2026) | Low (1) | High (3) | **3** | Document editorial control, prepare labeling | **P1** |
| R3 | Fine for missing ROPA (Art. 30 GDPR) | Low (1) | Medium (2) | **2** | Create ROPA within 3 months | **P2** |
| R4 | AI literacy obligation violation (Art. 4) | Very low | Low (1) | **1** | Document AI competency | **P3** |

### 5.2 Data Risks

| # | Risk | Likelihood | Impact | Score | Mitigation | Priority |
|---|------|-----------|--------|-------|-----------|----------|
| D1 | Authentication data breach (user PII) | Low (1) | Critical (4) | **4** | Encryption, access controls, backups, incident response plan | **P0** |
| D2 | Unauthorized VPS access | Low (1) | High (3) | **3** | SSH keys, firewall, updates, monitoring | **P1** |
| D3 | Data loss (backups) | Low (1) | Medium (2) | **2** | Regular backups, test recovery | **P2** |

### 5.3 Content Risks

| # | Risk | Likelihood | Impact | Score | Mitigation | Priority |
|---|------|-----------|--------|-------|-----------|----------|
| C1 | Encyclopedia error → harm (mushroom poisoning) | Low (1) | Critical (4) | **4** | Disclaimers, verified-only for toxicity, safety protocol, insurance | **P0** |
| C2 | Copyright infringement in AI content | Low (1) | Medium (2) | **2** | Uniqueness verification, editorial review, takedown procedure | **P2** |
| C3 | Inaccurate information in encyclopedia | Medium (2) | Low (1) | **2** | Verified/unverified system, sources, feedback mechanism | **P2** |
| C4 | AI hallucination — false facts | Medium (2) | Medium (2) | **4** | Editorial review, fact-checking, confidence markers | **P1** |

---

## Appendix A: Privacy Policy Template

**File:** `privacy-policy.md` (PT + EN) on each site

**Structure:**

1. **Controller Identity** — Who we are (controller: name, NIF, address, email)
2. **Data Collected** — What data we collect:
   - Account data (email, username) — through authentication
   - Analytics data (anonymized) — through self-hosted analytics
   - Donation data — through third-party (link to their Privacy Policy)
3. **Legal Basis** — Legal basis (Art. 6 GDPR):
   - Consent — for account registration
   - Legitimate interest — for analytics
   - Contract performance — for service provision
4. **Purposes** — Processing purposes
5. **Data Sharing** — Who we share with (sub-processors: donation platform, VPS provider)
6. **International Transfers** — Cross-border transfers (if any)
7. **Retention Periods** — Storage periods
8. **Data Subject Rights** — Rights (access, rectification, erasure, portability, objection, restriction)
9. **Security** — Security measures
10. **Cookies** — Cookie description (or link to Cookie Policy)
11. **Changes** — Policy modification procedure
12. **Contact** — Contact for questions + right to complaint with CNPD

---

## Appendix B: Key Resources

### Legislation
- [EU AI Act (Regulation 2024/1689)](https://artificialintelligenceact.eu/)
- [GDPR (Regulation 2016/679)](https://gdpr.eu/)
- [Article 50: Transparency Obligations](https://artificialintelligenceact.eu/article/50/)
- [Article 99: Penalties](https://artificialintelligenceact.eu/article/99/)

### Guidance
- [EU AI Act Implementation Timeline](https://artificialintelligenceact.eu/implementation-timeline/)
- [Code of Practice on AI Content Transparency](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content)
- [FOSS Exemptions in EU AI Act (Linux Foundation)](https://linuxfoundation.eu/newsroom/ai-act-explainer)
- [CNIL AI Recommendations](https://www.cnil.fr/en/ai-cnil-finalises-its-recommendations-development-artificial-intelligence-systems)

### Portugal-Specific
- [ANACOM](https://www.anacom.pt)
- [CNPD](https://www.cnpd.pt)
- [Portugal AI Regulation (CMS)](https://cms.law/en/int/expert-guides/ai-regulation-scanner/portugal)
- [Portugal AI Regulation (Chambers 2025)](https://practiceguides.chambers.com/practice-guides/artificial-intelligence-2025/portugal)

---

> **Disclaimer:** This checklist compiled from public sources and current as of February 25, 2026. It is not legal advice. For legally significant decisions, consultation with licensed lawyer in Portugal specializing in EU AI Act and GDPR recommended.

{{< disclaimer type="legal" >}}
