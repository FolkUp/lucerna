---
title: "EU AI Act: Overview and Risk Classification"
description: "Legal analysis of EU AI Act: risk classification, FOSS exemptions, transparency obligations. Practical guide for content creators and publishers."
date: 2026-02-25
status: verified
confidence: high
tags: ["eu-ai-act", "regulation", "artificial-intelligence", "europe", "compliance"]
categories: ["investigation"]
series: ["EU AI Act"]
series_order: 1
sources_count: 15
investigation_id: "INV-011-1"
investigation_type: research
methodology_disclosed: true
reviewed_by: "FolkUp Editorial"
review_date: 2026-02-28
pii_reviewed: true
summary: "Comprehensive legal analysis of the EU AI Act (Regulation 2024/1689), covering risk classification, FOSS exceptions, roles, transparency obligations, and practical implications for digital publishers and content creators."
---

# EU AI Act: Overview and Risk Classification

**Research Date:** February 25, 2026
**Scope:** EU Regulation (EU) 2024/1689 on Artificial Intelligence
**Jurisdiction:** European Union / Portugal

---

## Executive Summary

The EU AI Act establishes a comprehensive regulatory framework for artificial intelligence systems based on risk classification. This investigation examines:

- Four-tier risk classification system
- Free and Open Source Software (FOSS) exemptions
- Provider, deployer, and distributor roles
- Transparency obligations (Article 50)
- Implementation timeline and enforcement

Key finding: Content creators using AI tools for text generation are classified as **deployers** of limited-risk AI systems, subject to transparency obligations from August 2, 2026.

---

## 1. Risk Classification System

The EU AI Act establishes four risk levels:

### 1.1 Risk Tiers

| Level | Description | Regulation |
|-------|-------------|-----------|
| **Unacceptable** | Social scoring, manipulative systems, real-time biometric identification | Complete ban (Article 5) |
| **High-risk** | Systems in healthcare, education, justice, critical infrastructure (Annex III) | Full compliance obligations (Articles 6–27) |
| **Limited** | Systems interacting with people, content generation, deepfakes | Transparency obligations (Article 50) |
| **Minimal** | Spam filters, recommendation systems, development tools | Minimal or no obligations |

### 1.2 Definition of AI System (Article 3(1))

> *"AI system" means a machine-based system that is designed to operate with varying levels of autonomy and that may exhibit adaptiveness after deployment, and that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments.*

**Key distinction:** Using AI tools through APIs makes you a **deployer**, not a provider. The AI model developer is the **provider**.

---

## 2. FOSS Exemption (Open Source)

### 2.1 Article 2(12) — Scope

> *"This Regulation shall not apply to AI systems released under free and open-source licences, unless they are placed on the market or put into service as high-risk AI systems or as an AI system that falls under Article 5 or 50."*

**Structure:**

```
Open-source AI system → EXEMPT from Regulation
    EXCEPT when:
    ├── Classified as HIGH-RISK (Article 6)
    ├── Falls under prohibited practices (Article 5)
    └── Falls under transparency obligations (Article 50)
```

### 2.2 Recital 102 — Definition of Free and Open License

A license must allow:
- **Access** (open access)
- **Use** (usage)
- **Modification** (modify)
- **Redistribution** (redistribute)

**All four rights must be present.** Permitted restrictions:
- Attribution requirements
- Copyleft (share-alike) conditions

### 2.3 Recital 103 — Monetization and Exemptions

**Cannot claim FOSS exemptions if:**
- AI components provided for a fee
- Monetized through technical support or services
- Provided through a platform connected to the AI component
- Personal data used (except for security/compatibility)

**However:**
> *"The fact of making AI components available through open repositories should not, in itself, constitute a monetisation."*

**Exception for microenterprises:** Transactions between microenterprises excluded from monetization definition.

### 2.4 Voluntary Donations (Ko-fi, Patreon, etc.)

The Regulation does not explicitly define "voluntary donations" in the monetization context. Analytical conclusion:

- Ko-fi donations are **voluntary contributions** not conditioned on access to AI components
- Recital 103 refers to components "provided against a price" — donations are not a price for a specific product
- Legal uncertainty remains until clarifications from the Commission or case law emerge

**Recommendation:** Until guidance is published, consider voluntary donations without ties to specific AI functions as **likely not constituting** monetization under Recital 103.

---

## 3. Roles: Provider / Deployer / Distributor

### 3.1 Definitions (Article 3)

**Provider (Article 3(3)):**
> A natural or legal person that **develops** an AI system or GPAI model (or commissions development) and **places** it on the market or **puts it into service** under its name or trademark, for a fee or free of charge.

**Deployer (Article 3(4)):**
> A natural or legal person **using** an AI system under its authority, except for personal non-professional use.

**Distributor (Article 3(7)):**
> A natural or legal person in the supply chain (other than provider or importer) that makes an AI system available on the EU market.

### 3.2 Classification for Content Creators

#### Scenario: Using AI API for content generation

```
AI model developer → Provider (GPAI model)
    ↓
Content Creator → Deployer (uses AI tool under their control)
    ↓
Website Users → End users (not regulated)
```

**Content Creator = Deployer** because:
- Does **not develop** the AI system — uses existing commercial AI tool
- Does **not place** the AI tool on the market — model belongs to the provider
- Uses AI system **under their authority**
- Use is **professional** (not personal non-professional)

### 3.3 Deployer Obligations

| Risk Level | Deployer Obligations |
|-----------|---------------------|
| **Minimal** | AI literacy (Article 4) |
| **Limited** | Article 50 (transparency) + AI literacy |
| **High** | Articles 26–27 (full set) + AI literacy |

---

## 4. Transparency Obligations (Article 50)

### 4.1 Structure of Article 50

**Paragraph 1 — Interactive AI systems:**
> Providers of AI systems intended to interact with natural persons must inform them that they are interacting with an AI system, unless obvious from the circumstances.

**Paragraph 2 — Providers of generative systems (labeling):**
> Providers of AI systems, including GPAI systems, generating synthetic audio, images, video or text, shall ensure that the outputs are **marked in a machine-readable format** and **detectable as artificially generated or manipulated**.

**Paragraph 3 — Emotion recognition / biometric categorization:**
> Deployers must inform natural persons when such systems are in operation.

**Paragraph 4 — Deepfakes and AI-generated text (MOST RELEVANT):**
> Deployers of AI systems generating or manipulating:
>
> **(a) Images, audio, video (deepfakes):** must disclose that content is artificially generated or manipulated.
>
> **(b) Text published to inform the public on matters of public interest:** must disclose that text is artificially generated or manipulated.

### 4.2 Exceptions from Article 50(4)

**Exception 1 — Artistic and creative works:**
> If content is part of an **evidently artistic, creative, satirical, fictional or analogous work**, the disclosure obligation is limited to disclosure in an appropriate manner that does not hamper the display or enjoyment of the work.

**Exception 2 — Editorial control (for text):**
> The disclosure obligation **does not apply** if AI-generated text has undergone a **process of human review or editorial control** and a natural or legal person holds **editorial responsibility** for the publication.

**Exception 3 — Law enforcement:**
> The obligation does not apply if use is authorized by law for detection, prevention, investigation or prosecution of criminal offences.

### 4.3 Editorial Control Exception — Practical Application

To qualify for the editorial control exception, you must:

1. **Establish internal procedures** — documented editorial workflow for AI-generated content
2. **Ensure human review** — each article reviewed by a human editor
3. **Take editorial responsibility** — formally accept responsibility for content
4. **Maintain records** — documentation of which materials underwent editorial control

If the exception **does not apply** (no human review):
- Must **disclose** that text is generated or manipulated by AI
- Form of disclosure — "in an appropriate manner" (specifics in Code of Practice)

### 4.4 Effective Date

**Article 50 enters into full force on August 2, 2026.**

Draft Code of Practice on labeling and disclosure of AI content:
- First draft: December 17, 2025
- Second draft: March 2026
- Final version: June 2026

---

## 5. Implementation Timeline

### 5.1 Key Dates

| Date | What Enters into Force | Status |
|------|----------------------|--------|
| **August 1, 2024** | Regulation entered into force | ✅ In force |
| **February 2, 2025** | Prohibited practices (Article 5) + AI literacy (Article 4) | ✅ In force |
| **August 2, 2025** | GPAI obligations (Chapter V, Articles 51–56) + Governance | ✅ In force |
| **August 2, 2026** | **Full application** — high-risk systems (Annex III), transparency obligations (Article 50), penalties | ⏳ Upcoming |
| **August 2, 2027** | High-risk systems in regulated products (Annex I) + GPAI models placed before August 2025 | ⏳ Upcoming |

### 5.2 What is Already in Force (as of February 25, 2026)

1. **Article 4 — AI Literacy (since February 2, 2025):**
   - Obligation to ensure "sufficient level of AI literacy" of staff
   - Applies to ALL operators (providers and deployers) regardless of risk level
   - Deployers must understand capabilities and limitations of AI systems used

2. **Article 5 — Prohibited Practices (since February 2, 2025):**
   - Social scoring, manipulative systems, biometric identification in public spaces (with exceptions)

3. **Chapter V — GPAI (since August 2, 2025):**
   - Obligations for **providers** of GPAI models
   - For deployers/downstream users — indirect impact

### 5.3 Digital Omnibus Proposal (November 19, 2025)

The European Commission proposed amendments:

- **Delay for high-risk systems (Annex III):** from August 2, 2026 to **no later than December 2, 2027** (tied to availability of harmonized standards)
- **Delay for regulated products (Annex I):** from August 2, 2027 to **no later than August 2, 2028**
- **Additional 6 months** for providers of generative AI systems placed before August 2, 2026, to comply with Article 50 (until February 2, 2027)
- **Proposed removal of AI literacy** obligation for non-high-risk systems

**Status:** This is a **proposal**, not yet adopted. Requires approval by Parliament and Council.

---

## 6. General-Purpose AI (GPAI) — Chapter V

### 6.1 GPAI Regulation Structure

Chapter V (Articles 51–56) regulates **providers** of GPAI models, not their users.

**Key distinction:**
```
GPAI model (commercial or open-source)
    → Provider = model developer
    → Downstream provider = integrates model into their AI system
    → Deployer = uses AI system
```

### 6.2 GPAI Provider Obligations (Article 53)

GPAI providers must:
- Prepare and maintain technical documentation of the model
- Provide information to downstream providers
- Establish policy for compliance with Copyright Directive
- Publish "sufficiently detailed" summary of data used for training

### 6.3 Open-source Exception for GPAI (Article 53(2))

GPAI model providers released under free and open-source licenses are **exempt from:**
- Article 53(1)(a) — technical documentation
- Article 53(1)(b) — information for downstream providers

**BUT must comply with:**
- Copyright policy (Copyright Directive)
- Publication of training data summary

**Systemic risk:** For GPAI with systemic risk (Article 55) — **no** open-source exceptions apply.

### 6.4 Code of Practice for GPAI

Final version of Code of Practice for GPAI models published **July 10, 2025**, approved by Commission and AI Board **August 1, 2025**.

Three chapters:
1. **Transparency** — documentation, information for downstream providers
2. **Copyright** — policy for Copyright Directive compliance
3. **Safety** — risk assessment, testing

---

## 7. Penalties (Article 99)

### 7.1 Three-tier Penalty System

| Tier | Violation | Maximum for Enterprises | Maximum (fixed) |
|------|-----------|------------------------|-----------------|
| **1 (maximum)** | Prohibited practices (Article 5) | 7% of annual worldwide turnover | €35,000,000 |
| **2** | Other Regulation obligations | 3% of annual worldwide turnover | €15,000,000 |
| **3 (minimum)** | Providing incorrect information to authorities | 1% of annual worldwide turnover | €7,500,000 |

**The higher of the two sums applies** (% of turnover or fixed amount) — for regular enterprises.

### 7.2 Proportionality for SMEs and Startups (Article 99(6))

> *"In the case of SMEs, including start-ups, each fine referred to in this Article shall be up to the percentages or amount referred to in paragraphs 3, 4 and 5, whichever thereof is lower."*

**For SMEs/startups — the LOWER of the two sums applies.**

Example calculation (Article 50 violation = tier 2):
- Annual turnover: €100,000
- 3% of €100,000 = €3,000
- Fixed amount = €15,000,000
- **For SME fine = up to €3,000** (lower of two)
- **For large enterprise fine = up to €15,000,000** (higher of two)

### 7.3 Natural Persons

**Article 99 does not contain separate provisions on fines for natural persons not operating as enterprises.**

Key points:
1. Definitions of "provider" and "deployer" in Article 3 include natural persons
2. Article 99(1) states that fines must be "effective, proportionate and dissuasive"
3. **Specific fine amounts for natural persons** determined at **national level** by each Member State
4. Article 99(8) delegates to Member States powers to determine rules for imposing fines on public authorities

**For Portugal:** ANACOM appointed as coordinating authority (September 2025). Specific rules for imposing fines on natural persons will be determined by Portuguese implementing legislation.

---

## 8. Recent Developments 2025-2026

### 8.1 Published Guidelines and Acts

| Date | Document | Status |
|------|----------|--------|
| **February 4, 2025** | Guidelines on Prohibited AI Practices (Article 5) | ✅ Published |
| **February 6, 2025** | Guidelines on AI System Definition (Article 3(1)) | ✅ Published |
| **July 18, 2025** | Draft Guidelines for GPAI Model Providers | ✅ Published |
| **July 10, 2025** | Final GPAI Code of Practice | ✅ Approved August 1, 2025 |
| **September 2025** | Portugal appointed ANACOM as coordinator | ✅ Appointed |
| **October 30, 2025** | prEN 18286 — first harmonized standard (QMS) | ✅ Public consultation |
| **November 19, 2025** | Digital Omnibus Proposal (AI Act simplification) | ⏳ Legislative proposal |
| **December 17, 2025** | First Draft Code of Practice on Transparency of AI-Generated Content (Article 50) | ✅ Published |
| **March 2026 (expected)** | Second Draft — Transparency Code of Practice | ⏳ In development |
| **June 2026 (expected)** | Final — Transparency Code of Practice | ⏳ Expected |

### 8.2 Standardization

- CEN/CENELEC developing harmonized standards for AI Act
- First standard (prEN 18286 — QMS) under public consultation since October 30, 2025
- Delays: original deadline April 30, 2025, moved to August 31, 2025, standards still in development
- Lack of ready standards — basis for Digital Omnibus proposal to postpone deadlines

---

## 9. Practical Recommendations

### 9.1 For Content Creators Using AI

**Priority 1 — Prepare for Article 50 (before August 2, 2026):**

1. **Determine which content generates "text to inform the public"**
   - Encyclopedias — yes
   - Personal blogs — depends
   - Documentation — depends

2. **Choose compliance strategy:**
   - **Option A (recommended):** Human review + editorial responsibility → exemption from disclosure obligation
   - **Option B:** Disclosure of AI involvement on websites (disclaimer/label)
   - **Option C:** Combined — review + transparent disclaimer

3. **Document processes:**
   - Describe editorial process (review pipeline)
   - Record who holds editorial responsibility
   - Maintain records of AI content review

**Priority 2 — AI Literacy (already in force):**

4. **Ensure own AI literacy:**
   - Understanding capabilities and limitations of AI tools used
   - Understanding risks of AI-generated content (hallucinations, bias)
   - Document (for yourself) key aspects of AI literacy

**Priority 3 — Monitoring:**

5. **Follow:**
   - Final version of Transparency Code of Practice (June 2026)
   - Fate of Digital Omnibus (may change deadlines)
   - Portuguese implementing legislation
   - ANACOM guidelines

### 9.2 Minimal Compliance Strategy

Most practical and safe approach for small digital publishers:

1. **Content:** Establish formal process of human review of all AI-generated content + take editorial responsibility + add transparent disclaimer (not mandatory, but builds trust)

2. **Code (libraries, apps):** No specific AI Act obligations if the product itself is not an AI system

3. **Voluntary donations:** Structure as voluntary contributions without ties to specific AI functions — to maintain open-source status

4. **Documentation:** Keep records of content creation process — useful during inspections

---

## Sources

### Official Texts
- [Regulation (EU) 2024/1689 — Official Journal (EUR-Lex)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)
- [AI Act Explorer — full text with navigation](https://artificialintelligenceact.eu/ai-act-explorer/)
- [Article 2: Scope](https://artificialintelligenceact.eu/article/2/)
- [Article 3: Definitions](https://artificialintelligenceact.eu/article/3/)
- [Article 4: AI Literacy](https://artificialintelligenceact.eu/article/4/)
- [Article 50: Transparency Obligations](https://artificialintelligenceact.eu/article/50/)
- [Article 99: Penalties](https://artificialintelligenceact.eu/article/99/)
- [Recital 102](https://artificialintelligenceact.eu/recital/102/)
- [Recital 103](https://artificialintelligenceact.eu/recital/103/)

### European Commission Guidelines
- [Guidelines on Prohibited AI Practices (Feb 2025)](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act)
- [Guidelines on AI System Definition (Feb 2025)](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application)
- [Guidelines for GPAI Model Providers (Jul 2025)](https://digital-strategy.ec.europa.eu/en/policies/guidelines-gpai-providers)
- [GPAI Code of Practice — Final Version (Jul 2025)](https://code-of-practice.ai/)
- [First Draft Code of Practice on Transparency of AI-Generated Content (Dec 2025)](https://digital-strategy.ec.europa.eu/en/library/first-draft-code-practice-transparency-ai-generated-content)
- [Digital Omnibus Proposal (Nov 2025)](https://digital-strategy.ec.europa.eu/en/library/digital-omnibus-ai-regulation-proposal)

### Analytical Materials
- [Linux Foundation EU: What Open Source Developers Need to Know about the EU AI Act](https://linuxfoundation.eu/newsroom/ai-act-explainer)
- [Hugging Face: What Open-Source Developers Need to Know about the EU AI Act's Rules for GPAI Models](https://huggingface.co/blog/yjernite/eu-act-os-guideai)
- [Orrick: The EU AI Act: Application to Open-Source Projects](https://www.orrick.com/en/Insights/2024/09/The-EU-AI-Act-Application-to-Open-Source-Projects)
- [Implementation Timeline](https://artificialintelligenceact.eu/implementation-timeline/)

---

*Report prepared February 25, 2026. Information current as of date of preparation. Regulatory environment is actively evolving — monitoring of updates from European Commission, AI Office and national authorities recommended.*

{{< disclaimer type="legal" >}}
