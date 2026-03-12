---
title: "GDPR and AI: Legal Basis, Data Transfers, and Compliance"
date: 2026-02-25
status: verified
confidence: high
tags: ["gdpr", "ai", "data-protection", "privacy", "compliance"]
categories: ["investigation"]
series: ["EU AI Act"]
series_order: 3
sources_count: 14
investigation_id: "INV-011-3"
investigation_type: research
methodology_disclosed: true
reviewed_by: "FolkUp Editorial"
review_date: 2026-02-28
pii_reviewed: true
summary: "Comprehensive analysis of GDPR compliance for AI systems: legal basis for processing, international data transfers, DPIA requirements, data subject rights, and enforcement trends. Includes practical guidance for AI deployers and content creators."
---

# GDPR and AI: Legal Basis, Data Transfers, and Compliance

**Research Date:** February 25, 2026
**Scope:** GDPR application to AI systems
**Audience:** Developers, publishers, AI deployers in EU/Portugal

---

## Executive Summary

GDPR applies fully to AI systems processing personal data. This investigation examines:

- Legal basis for AI data processing (legitimate interest vs. consent)
- International data transfers (EU-US, SCCs, TIA requirements)
- DPIA (Data Protection Impact Assessment) requirements
- Rights of data subjects in AI context
- Recent enforcement actions and penalties

Key finding: "Legitimate interest" (Article 6(1)(f)) is the most common legal basis for AI processing, requiring documented balancing test and mitigation measures.

---

## 1. Legal Basis for AI Data Processing

### 1.1 Applicable Legal Bases (Article 6 GDPR)

AI data processing requires a legal basis under **Article 6(1) GDPR**. For AI content generation and development, applicable bases:

#### a) Legitimate Interest — Article 6(1)(f)

**Most common legal basis for AI processing.**

EDPB in Opinion 28/2024 confirmed legitimate interest **can** serve as legal basis for developing and using AI models. Requires **three-step test**:

**Step 1 — Identify Legitimate Interest:**
- Creating informational content for public encyclopedic projects — recognized as legitimate interest
- Improving quality and completeness of content — also legitimate interest
- Developing open-source tools — falls under innovation activity

**Step 2 — Necessity Test:**
- Using AI API necessary to achieve stated purpose (generating quality content)
- No less intrusive way to achieve same result with same quality
- Processing limited to minimally necessary data volume

**Step 3 — Balancing Test:**
- Data subjects' interests (control over personal data, financial interests)
- Their rights and freedoms (data protection, freedom of expression, access to information)
- Impact of processing on data subjects (determined by risks)
- Reasonable expectations of data subjects regarding processing

**Critically important:** Balancing test must be **documented** (Legitimate Interest Assessment, LIA). CNIL (France) in February 2025 recommendations emphasized LIA documentation is mandatory for any AI use based on legitimate interest.

**Mitigation measures in balancing test:**
- Data minimization: don't transfer personal data to API if not necessary
- Pseudonymization: replace identifiers before sending to API
- Right to object (opt-out): provide data subjects ability to object under Article 21
- Transparency: notice of AI use in Privacy Policy

#### b) Consent — Article 6(1)(a)

Consent **not optimal basis** for most AI scenarios because:
- Content generated not about specific users, but as informational material
- Obtaining prior consent from all potential data subjects mentioned in encyclopedic content is practically impossible
- Consent must be freely given, specific, informed and unambiguous (Article 4(11))
- Can be withdrawn at any time (Article 7(3)), creating operational complexity

**Exception:** Consent may be correct basis for processing registered users' data (through authentication systems) if their data transferred to AI API.

#### c) Contract Performance — Article 6(1)(b)

Not applicable in most scenarios, as content generation through AI is not part of contractual relations with website visitors.

### 1.2 Controller and Processor Roles

In context of using AI APIs:

| Participant | GDPR Role | Basis |
|-------------|-----------|-------|
| Developer/Publisher | **Controller** (Article 4(7)) | Determines purposes and means of processing |
| AI Provider | **Processor** (Article 4(8)) | Processes data per controller's instructions |
| AI Provider's Subprocessors (AWS, etc.) | **Subprocessors** | Processing in chain |

**Controller Obligations:**
- Execute DPA (Data Processing Agreement) with AI provider — **automatically included** in commercial Terms of Service
- Maintain processing register (Article 30) — even for individual developers with non-occasional processing
- Ensure legal basis for each type of processing
- Inform data subjects (Articles 13, 14)

### 1.3 Digital Omnibus Proposal (November 2025)

On November 19, 2025, European Commission published **Digital Omnibus** package, including GDPR amendments:

- **New Article 88c GDPR (draft):** explicitly confirms AI model development and operation may be pursued as legitimate interest, subject to necessity and balancing test
- **Expansion of Article 9:** allows processing limited volume of residual special categories of data when developing AI, if their complete removal requires disproportionate effort
- **Status:** Legislative proposal at negotiation stage, **not yet in force**

---

## 2. International Data Transfers

### 2.1 Legal Framework: GDPR Chapter V

Transfer of personal data to third countries (outside EEA) regulated by **GDPR Chapter V (Articles 44-49)**.

Using AI APIs from US-based providers constitutes cross-border data transfer.

### 2.2 Transfer Mechanisms

#### a) Adequacy Decision (Article 45)

**EU-US Data Privacy Framework (DPF)** — adopted July 10, 2023 by European Commission (Decision C(2023) 4745). Allows data transfer to US organizations certified under DPF.

**Important to verify:** Whether AI provider is included in DPF registry. As of research date, many AI providers **have not confirmed** publicly their DPF certification.

#### b) Standard Contractual Clauses (SCCs) — Article 46(2)(c)

Most AI providers include SCCs in their DPA:
- **Module 2** (controller → processor) — primary for this scenario
- **Module 3** (processor → processor) — for subprocessor chain

SCCs updated by Commission Decision 2021/914 of June 4, 2021.

**Additional requirements after Schrems II (CJEU C-311/18):**
- Transfer Impact Assessment (TIA) — assessment of recipient country's legislation
- Additional safeguards (encryption, pseudonymization)
- Assessment of government access to data

#### c) Derogations (Article 49)

As one-time derogation (not for systematic transfer):
- Explicit consent of data subject (Article 49(1)(a))
- Necessity for contract performance (Article 49(1)(b))
- Important public interests (Article 49(1)(d))

**Not applicable for regular API use** — Article 49 intended for one-time transfers.

### 2.3 Regional Processing (Some AI Providers)

Some AI providers launched multi-regional data processing:

- **For EU users:** data processed and stored **only in EU** (when selecting EU region)
- **Key distinction:** data processing (inference) may occur in EU, but historical data storage may have been in US

**Recommendation:** Explicitly select EU region in API settings to minimize cross-border transfer risks.

### 2.4 Practical Steps

1. **Sign DPA with AI provider** — available through API console, automatically included in commercial terms
2. **Conduct TIA** — assess risks of data transfer to third country considering FISA 702 and Executive Order 14086
3. **Select EU region** for data processing (if available)
4. **Minimize transfer** — don't include personal data in prompts if not necessary
5. **Consider Zero Data Retention** — for maximum protection

---

## 3. Data Protection Impact Assessment (DPIA)

### 3.1 When DPIA Required (Article 35 GDPR)

Article 35(1) requires DPIA when type of processing, **particularly using new technologies**, considering nature, scope, context and purposes, **likely to result in high risk** to rights and freedoms of natural persons.

**Article 35(3) — mandatory cases:**
- (a) Systematic and extensive evaluation of personal aspects based on automated processing, including profiling
- (b) Large-scale processing of special categories of data (Article 9) or conviction data (Article 10)
- (c) Systematic large-scale monitoring of publicly accessible places

### 3.2 EDPB Criteria for Determining DPIA Necessity

EDPB (former WP29) defined **9 criteria** (Guidelines WP 248 rev.01). If processing meets **two or more criteria**, DPIA **presumptively mandatory**:

| # | Criterion | Applicability to AI Content Generation |
|---|----------|--------------------------------------|
| 1 | Evaluation or scoring | **No** — content doesn't evaluate people |
| 2 | Automated decision-making with legal effects | **No** — content generation doesn't make decisions |
| 3 | Systematic monitoring | **Potentially** — if analytics present |
| 4 | Sensitive data or highly personal data | **Depends on content** — if encyclopedia contains health, ethnicity info |
| 5 | Large-scale processing | **No** — individual/small scale |
| 6 | Matching or combining datasets | **No** |
| 7 | Data concerning vulnerable persons | **Potentially** — if content accessible to minors |
| 8 | Innovative use or application of new technologies | **Yes** — use of generative AI |
| 9 | Processing preventing exercise of rights | **No** |

**Conservative Recommendation:** Conduct DPIA even if formally could argue not mandatory. This:
- Demonstrates accountability principle (Article 5(2))
- Reduces regulatory risks
- CNIL and EDPS in generative AI guidelines (October 2025) unambiguously recommend DPIA for any generative AI use with personal data

### 3.3 DPIA Content (Article 35(7))

DPIA must include at minimum:

1. **Systematic description** of processing and its purposes, including, where applicable, controller's legitimate interest
2. **Assessment of necessity and proportionality** of processing in relation to purposes
3. **Assessment of risks** to rights and freedoms of data subjects
4. **Measures** to address risks, including safeguards, security measures and mechanisms ensuring protection

---

## 4. Data Subject Rights

### 4.1 Article 22 — Automated Decision-Making

**Text of Article 22(1):**
> Data subject has right not to be subject to decision based solely on automated processing, including profiling, which produces legal effects concerning him or her or similarly significantly affects him or her.

**Applicability to AI content generation:**

Article 22 **likely does NOT apply** directly to generating encyclopedic content, because:
- Content generation is not a "decision" regarding specific data subject
- No "legal effects" or "significant impact" on subject
- Content undergoes human moderation before publication

**However** if AI used for:
- Making decisions about user access/blocking → Article 22 applies
- Personalizing content based on user profile → may apply
- Automated comment moderation → potentially applies

### 4.2 "Right to Explanation"

GDPR **does not contain explicit** "right to explanation". However, combination of several articles creates **de facto right to meaningful information**:

- **Article 13(2)(f):** When collecting data from subject — information about automated decision-making, including profiling, and meaningful information about logic, as well as significance and envisaged consequences
- **Article 14(2)(g):** Same when obtaining data not from subject
- **Article 15(1)(h):** Right of access — includes information about automated decision-making

### 4.3 Other Data Subject Rights in AI Context

| Right | GDPR Article | Applicability to AI Content |
|-------|-------------|----------------------------|
| Right of access | 15 | Subject can request what data about them is processed by AI |
| Right to rectification | 16 | If AI generated inaccurate information about person |
| Right to erasure | 17 | "Right to be forgotten" — delete AI content containing personal data |
| Right to restriction | 18 | Restrict processing during accuracy verification |
| Right to object | 21 | Object to processing based on legitimate interest |
| Right to data portability | 20 | Limited applicability — data not provided by subject |

### 4.4 Practical Consequences

- Need **process for handling** data subject requests (Article 12 — response within 1 month)
- For content containing personal data about real people, must have mechanism for correction/deletion
- Right to object under Article 21 requires **individual consideration** of each case

---

## 5. Privacy Notices

### 5.1 Mandatory Elements of Privacy Policy (Articles 13-14 GDPR)

When using AI for content generation, Privacy Policy **must include**:

**Per Article 13 (data from subject):**
1. Identity and contact details of controller (Article 13(1)(a))
2. Purposes of processing and legal basis (Article 13(1)(c))
3. Controller's legitimate interests, if processing based on Article 6(1)(f) (Article 13(1)(d))
4. Recipients of data or categories of recipients (Article 13(1)(e))
5. **Intention to transfer data to third country** and reference to appropriate safeguards (Article 13(1)(f))
6. Data retention period (Article 13(2)(a))
7. Data subject rights (Article 13(2)(b-d))
8. Right to lodge complaint with supervisory authority — CNPD (Article 13(2)(d))
9. **Existence of automated decision-making, including profiling** (Article 13(2)(f))

**Per Article 14 (data not from subject — e.g., if AI generates content about third parties):**
- All above elements
- Source of data (Article 14(2)(f))
- Categories of data processed (Article 14(1)(d))

### 5.2 Specific AI Disclosures

**Per GDPR:**
- Fact of AI use for content generation
- What categories of data may be processed through AI API
- Legal basis for such processing
- Information about data recipient (AI provider) and third country transfer
- Reference to DPA and SCCs

**Per AI Act (Article 50 — from August 2026):**
- AI-generated content must be marked in machine-readable format
- Users must be notified about interaction with AI system
- Publications on public interest topics created by AI must be clearly labeled

### 5.3 Recommended Privacy Policy Structure

**Multi-level approach (WP29/EDPB recommendation):**

**Level 1 — Banner/short notice:**
- Use of analytics
- Fact of AI use for content
- Link to full policy

**Level 2 — Full privacy policy:**
- All mandatory elements per Articles 13-14
- Separate section on AI processing
- Separate section on international transfers

**Level 3 — Detailed disclosures:**
- LIA (Legitimate Interest Assessment) — available on request
- DPIA (summary) — available on request
- List of subprocessors

---

## 6. Recent Enforcement Actions

### 6.1 Italy: Garante vs OpenAI (ChatGPT)

**Timeline:**

| Date | Event |
|------|-------|
| March 2023 | Garante temporarily blocked ChatGPT in Italy |
| April 2023 | Block lifted after OpenAI measures |
| January 2024 | Garante notified OpenAI of GDPR violations |
| December 20, 2024 | **Fine €15 million** |

**Violations Identified:**
1. **Lack of legal basis** (Art. 6 GDPR) — training ChatGPT on personal data without proper legal basis
2. **Transparency violation** — insufficient information to users
3. **Lack of age verification** — no mechanism to protect children under 13
4. **Failure to report data breach** — March 2023 breach not timely reported to Garante

**Additional Requirements:**
- 6-month public education campaign about ChatGPT operation and data subject rights

**Current Status:** OpenAI appealed, calling fine "disproportionate" — allegedly 20 times company's revenue in Italy for disputed period.

### 6.2 Italy: Garante vs Luka Inc. (Replika)

**Timeline:**

| Date | Event |
|------|-------|
| February 2023 | Garante imposed temporary ban on Replika in Italy |
| April 10, 2025 | **Fine €5 million** |

**Violations Identified:**
1. Lack of legal basis for processing before February 2, 2023
2. Inadequate privacy policy
3. **Complete absence of age verification** — despite claim minors not permitted
4. After measures taken: users could change birth date without verification, bypass "cooling-off period" through incognito mode

### 6.3 Netherlands: Dutch DPA vs Clearview AI

**Decision May 16, 2024: fine €30.5 million**

**Violations:**
- Unlawful processing of biometric data without legal basis (Art. 6 GDPR)
- Creating illegal database of photos and biometric codes
- Insufficient information to data subjects
- Failure to fulfill access requests (Art. 12, 15, 17 GDPR)

**Additionally:**
- Penalties up to €5.1 million for non-compliance imposed
- DPA examining possibility of **personal liability of company directors**
- Clearview claims no presence or clients in EU — DPA rejects

**Context:** Clearview AI fined **7 times** by various EU DPAs since 2020, cumulative total — **over €100 million**.

### 6.4 Spain: AEPD

**General statistics for 2024:** €35.5 million fines (19% increase vs 2023), 10 fines over €1 million.

**AI-related decisions:**
- **La Liga** (National Professional Football League): **fine €1 million** (December 2024) — biometric recognition at stadium entrances without GDPR compliance
- **FC Osasuna**: **fine €200,000** (December 3, 2024) — facial recognition system use at El Sadar stadium in 2022-2023 season

**Strategic priorities AEPD 2024-2025:**
- Enhanced proactive monitoring of AI and biometric systems use
- Monitoring workplace technologies and school surveillance systems

---

## 7. Practical Recommendations

### 7.1 Immediate Actions (Priority P0-P1)

#### P0 — Critical:

1. **Privacy Policy** for each public website
   - All mandatory elements per Articles 13-14
   - Section on AI processing
   - Section on international transfers (AI provider/third country)
   - In local language + English

2. **DPA with AI provider** — confirm execution through API console

3. **Records of Processing (Article 30)** — document all processing types:
   - AI API: prompts, responses, data categories
   - Analytics: analytical data
   - Authentication: authentication data

#### P1 — High Priority:

4. **Legitimate Interest Assessment (LIA)** — document three-step test for using AI API

5. **DPIA** — conduct for using generative AI, at minimum simplified

6. **Select EU region** in AI API — minimize cross-border transfers

7. **Data subject request procedure** — response template, deadlines (1 month per Article 12)

### 7.2 For Small Digital Publishers

**Most practical and safe approach:**

1. **Content:** Establish formal human review process for all AI-generated content + take editorial responsibility + add transparent disclaimer (not mandatory, but builds trust)

2. **Code (libraries, apps):** No specific GDPR obligations if product itself is not processing personal data

3. **Voluntary donations:** Structure as voluntary contributions without ties to specific AI functions — to maintain open-source status

4. **Documentation:** Keep records of content creation process — useful during inspections

---

## Sources

### Legislation and Regulations
- [Regulation (EU) 2016/679 (GDPR) — full text](https://gdpr-info.eu/)
- [Article 6 GDPR — Lawfulness of processing](https://gdpr-info.eu/art-6-gdpr/)
- [Article 22 GDPR — Automated decision-making](https://gdpr-info.eu/art-22-gdpr/)
- [Article 35 GDPR — Impact assessment](https://gdpr-info.eu/art-35-gdpr/)
- [EU AI Act — Article 50: Transparency obligations](https://artificialintelligenceact.eu/article/50/)

### EDPB/EDPS Opinions and Guidelines
- [EDPB Opinion 28/2024 — AI models and personal data (PDF)](https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf)
- [EDPS: Revised Guidance on Generative AI (October 2025)](https://www.edps.europa.eu/press-publications/press-news/press-releases/2025/edps-unveils-revised-guidance-generative-ai-strengthening-data-protection-rapidly-changing-digital-era_en)

### National DPA Recommendations
- [CNIL: AI system development — recommendations for GDPR compliance](https://www.cnil.fr/en/ai-system-development-cnils-recommendations-to-comply-gdpr)
- [CNIL: AI and GDPR — new recommendations (February 2025)](https://www.cnil.fr/en/ai-and-gdpr-cnil-publishes-new-recommendations-support-responsible-innovation)

### Enforcement and Penalties
- [Italy fines OpenAI €15M EUR](https://thehackernews.com/2024/12/italy-fines-openai-15-million-for.html)
- [Italy fines Replika (Luka Inc) €5M EUR](https://www.edpb.europa.eu/news/national-news/2025/ai-italian-supervisory-authority-fines-company-behind-chatbot-replika_en)
- [Dutch DPA fines Clearview AI €30.5M EUR](https://www.autoriteitpersoonsgegevens.nl/en/current/dutch-dpa-imposes-a-fine-on-clearview-because-of-illegal-data-collection-for-facial-recognition)
- [GDPR Enforcement Tracker](https://www.enforcementtracker.com/)

---

*This report constitutes the result of legal research (OSINT) and is not legal advice. For specific legal decisions, consultation with qualified lawyer specializing in EU/Portugal data protection recommended.*

{{< disclaimer type="legal" >}}
