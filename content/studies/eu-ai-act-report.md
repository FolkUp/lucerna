---
title: "EU AI Act Compliance: A Practical Guide for Small Publishers (2026)"
date: 2026-02-25
status: verified
confidence: high
tags: ["eu-ai-act", "gdpr", "compliance", "copyright", "portugal", "regulation"]
categories: ["investigation"]
series: ["EU AI Act"]
series_order: 7
sources_count: 30
investigation_id: "INV-011"
investigation_type: research
methodology_disclosed: true
methodology_ref: "source-evaluation"
reviewed_by: "FolkUp Editorial"
review_date: 2026-02-28
pii_reviewed: true
summary: "Comprehensive analysis of EU AI Act obligations for small-scale digital publishers. Covers Art. 50 transparency, GDPR intersections, copyright, enforcement, and compliance roadmap."
---

{{< investigation-meta >}}

This is the summary report from a series of 6 detailed research papers analyzing the legal landscape for small digital publishers using generative AI tools in the EU. Each paper explores a specific domain in depth.

## Series Overview

1. [EU AI Act — Structure and Applicability]({{< ref "/studies/eu-ai-act-overview" >}})
2. [Portugal — National Implementation]({{< ref "/studies/eu-ai-act-portugal" >}})
3. [GDPR and AI Intersections]({{< ref "/studies/eu-ai-act-gdpr" >}})
4. [Copyright and AI in the EU]({{< ref "/studies/eu-ai-act-copyright" >}})
5. [Enforcement Landscape]({{< ref "/studies/eu-ai-act-enforcement" >}})
6. [Compliance Checklist]({{< ref "/studies/eu-ai-act-checklist" >}})

---

## Executive Summary

Small-scale digital publishers (encyclopedias, blogs, research sites) using AI tools face a **medium overall legal risk** in the EU as of February 2026.

The primary obligation is **Article 50 transparency** — but it comes with a critical exemption for editorially-reviewed content.

### Key Takeaways

1. **You're a deployer, not a provider.** Small publishers using commercial AI tools are classified as "deployers" under the AI Act — with significantly lighter obligations than providers.

2. **Art. 50(4) is your main obligation.** If you publish AI-generated text that informs the public, you must either: (a) disclose that it's AI-generated, or (b) have editorial review + editorial responsibility — which exempts you from disclosure.

3. **Code is not regulated.** AI Act does not regulate source code, commit messages, or technical documentation as "AI output."

4. **GDPR is already in effect.** Privacy policies and data processing records are required now — not in August 2026.

5. **Enforcement is near-zero.** As of February 2026, no EU country has issued fines under the AI Act. National authorities (CNPD, ANACOM in Portugal) are resource-constrained.

---

## The Art. 50 Transparency Requirement

### What It Says

Deployers must disclose that text, published to inform the public on matters of public interest, has been artificially generated or manipulated.

### The Editorial Exemption

Art. 50(4) contains an exemption: disclosure is **not required** if the AI-generated text:
1. Has undergone **human review or editorial control** — substantive, not automated
2. A natural or legal person holds **editorial responsibility** for the publication

The Draft Code of Practice (December 2025) clarifies:
- There must be a documented review process
- It must be identifiable who reviewed and approved the content
- The review must be substantive, not merely formal

### What to Prepare

| Element | What's Needed |
|---------|--------------|
| Editorial workflow | Documented process of human review |
| `reviewed_by` field | Identifiable reviewer in each article |
| `review_date` field | Date of editorial approval |
| Editorial policy page | Public page naming the responsible editor |

**Deadline:** Art. 50 takes effect **August 2, 2026**.

---

## GDPR Intersection Points

AI use intersects with GDPR in several ways:

1. **Lawful basis for input data.** If you feed personal data into AI tools, you need a lawful basis (typically legitimate interest, with balancing test).
2. **Data minimization.** Don't feed unnecessary personal data into AI tools.
3. **Transparency.** Privacy policy should mention data processing tools.
4. **Data transfers.** Most commercial AI providers process data in the US — check Standard Contractual Clauses.
5. **EDPB Opinion 28/2024** clarified that GDPR applies to all phases of AI lifecycle.

### Required Documents

- Privacy Policy (on every public website)
- Records of Processing Activities (ROPA) — internal document
- Data Processing Agreements with AI tool providers

---

## Copyright Considerations

### Text Data Mining (TDM) Exception

EU DSM Copyright Directive (2019/790), Art. 3-4:
- **Art. 3:** TDM for scientific research (broad exception)
- **Art. 4:** TDM for all purposes — unless rightholders opt out

This applies to AI providers training models, not to deployers using them.

### AI-Generated Content Ownership

No EU country recognizes AI-generated content as protectable by copyright. Only human-authored works qualify. However, substantially human-edited AI output may qualify — no definitive case law yet.

### Key Pending Case

**CJEU C-250/25 (Like Company v. Google Ireland)** — first EU court ruling on AI and copyright. Expected late 2026-2027. Will set binding precedent for all member states.

---

## Product Liability

**Directive (EU) 2024/2853 (PLD II)** explicitly includes software in the definition of "product." Transposition deadline: **December 9, 2026.**

Key implications:
- **Strict liability** — the producer must prove absence of defect
- Disclaimers are legally void in the context of EU product liability when the product is proven defective
- However, disclaimers can serve as evidence that the product was not intended for the purpose that caused harm

### High-Risk Content

Content about health, safety, identification of dangerous species — higher liability exposure. Disclaimers are necessary but not sufficient.

---

## Enforcement Landscape (February 2026)

| Authority | AI Act Role | Current Activity |
|-----------|------------|-----------------|
| EU AI Office | Central coordination | Setting up, no enforcement yet |
| National authorities | Primary enforcement | Mostly not yet designated |
| CNPD (Portugal) | GDPR | Active but resource-limited (~40 staff) |
| ANACOM (Portugal) | Likely AI Act authority | No AI-specific activity yet |

**First enforcement actions under AI Act expected: H2 2026 at earliest, likely 2027.**

### Realistic Risk Assessment for Small Publishers

- AI Act enforcement: **near-zero** for 2026
- GDPR enforcement: **low** for small operators (CNPD focuses on large companies)
- Copyright claims: **low** for original editorial content
- Product liability: **variable** depending on content domain

---

## Compliance Roadmap

### Immediate (This Week)

1. Create Privacy Policy on all public sites
2. Create Terms of Use with appropriate disclaimers
3. Start Records of Processing Activities (ROPA)
4. Subscribe to regulatory updates (AI Office, CNPD)

### Short-Term (1-3 Months)

5. Document editorial workflow
6. Add `reviewed_by` + `review_date` to content metadata
7. Prepare machine-readable metadata for AI transparency
8. Monitor second draft of Code of Practice (expected March 2026)

### Medium-Term (Before August 2026)

9. Finalize editorial policy page
10. Ensure all published content has editorial review documentation
11. Monitor final Code of Practice (expected June 2026)

### Long-Term (2026-2027)

12. Monitor PLD II transposition (deadline December 9, 2026)
13. Monitor CJEU C-250/25 ruling
14. Monitor Digital Omnibus developments

---

## Key Monitoring Events

| Event | Expected Date | Impact |
|-------|--------------|--------|
| Final Code of Practice on AI transparency | June 2026 | Defines specific marking requirements |
| **Art. 50 AI Act takes effect** | August 2, 2026 | Transparency obligations begin |
| PLD II transposition deadline | December 9, 2026 | Software = "product" under strict liability |
| CJEU C-250/25 ruling | Late 2026-2027 | First binding EU precedent on AI + copyright |
| Digital Omnibus | H2 2026 | May soften AI Act, add lawful basis for AI in GDPR |

---

## Key Sources

### Legislation
- [EU AI Act (Regulation 2024/1689)](https://artificialintelligenceact.eu/)
- [GDPR (Regulation 2016/679)](https://gdpr.eu/)
- [PLD II (Directive 2024/2853)](https://eur-lex.europa.eu/eli/dir/2024/2853/oj)
- [DSM Copyright Directive (2019/790)](https://eur-lex.europa.eu/eli/dir/2019/790/oj)

### Guidance
- [Art. 50 AI Act — full text](https://artificialintelligenceact.eu/article/50/)
- [Draft Code of Practice on AI Transparency (Dec 2025)](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content)
- [EDPB Opinion 28/2024](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en)
- [CNIL: AI and GDPR recommendations (Feb 2025)](https://www.cnil.fr/en/ai-and-gdpr-cnil-publishes-new-recommendations-support-responsible-innovation)

### Analysis
- [Bird & Bird: Draft Transparency Code of Practice](https://www.twobirds.com/en/insights/2026/taking-the-eu-ai-act-to-practice-understanding-the-draft-transparency-code-of-practice)
- [CMS: AI laws in Portugal](https://cms.law/en/int/expert-guides/ai-regulation-scanner/portugal)
- [Chambers: AI 2025 Portugal](https://practiceguides.chambers.com/practice-guides/artificial-intelligence-2025/portugal)

{{< disclaimer type="legal" >}}
