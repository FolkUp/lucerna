---
title: "Copyright and AI in the EU: TDM Exceptions, Authorship, and Risks"
date: 2026-02-25
status: verified
confidence: high
tags: ["copyright", "ai", "text-data-mining", "authorship", "eu-law"]
categories: ["investigation"]
series: ["EU AI Act"]
series_order: 4
sources_count: 16
investigation_id: "INV-011-4"
investigation_type: research
methodology_disclosed: true
reviewed_by: "FolkUp Editorial"
review_date: 2026-02-28
pii_reviewed: true
summary: "Detailed legal analysis of copyright issues in AI context: Text and Data Mining exceptions, AI authorship standards, open-source license compatibility, infringement risks, and recent case law (GEMA v. OpenAI, Getty v. Stability AI)."
---

# Copyright and AI in the EU: TDM Exceptions, Authorship, and Risks

**Research Date:** February 25, 2026
**Jurisdiction:** European Union / Portugal
**Scope:** Copyright implications of AI-generated content

---

## Executive Summary

Copyright law in the EU distinguishes between AI **training** (covered by TDM exceptions) and AI **output** (subject to standard copyright rules). Key findings:

- **Text and Data Mining (TDM)** exceptions (Articles 3-4, DSM Directive) apply to AI training, not to publishing output
- **AI-generated content** without substantial human contribution is **not protected** by copyright in EU
- **Human authorship requirement** — only "author's own intellectual creation" qualifies for protection (Infopaq standard)
- **Recent case law:** GEMA v. OpenAI (Germany) — "memorization" is copyright infringement; Kneschke v. LAION (Germany) — machine-readable opt-out required
- **CJEU case pending:** Like Company v. Google (C-250/25) — first EU AI copyright case, decision expected 2026-2027

---

## 1. DSM Directive: TDM Exceptions

### 1.1 General Context

Directive (EU) 2019/790 of April 17, 2019 on copyright and related rights in the Digital Single Market (DSM Directive) introduced two key exceptions for text and data mining (TDM).

**TDM Definition** (Article 2(2)): any automated analytical technique aimed at analyzing text and data in digital form to generate information, including but not limited to patterns, trends and correlations.

### 1.2 Article 3 — TDM for Scientific Research

**Subjects:** Research organizations and cultural heritage institutions (libraries, museums, archives, film archives).

**Conditions:**
- Applies only to organizations acting in public interest
- Materials must be lawfully accessible
- Exception is mandatory — rights holders **cannot** opt out
- Only for scientific purposes

**Relevance for content creators:** Article 3 **not directly applicable**, as individual publishers are not research organizations or cultural heritage institutions. However, it applies to AI providers (Anthropic, OpenAI) who may use research partnerships.

### 1.3 Article 4 — TDM for Any Purpose

**Subjects:** Any person, including commercial organizations and individuals.

**Conditions:**
- Materials must be lawfully accessible
- Rights holders **may opt out** by reserving their rights "in an appropriate manner" (machine-readable)
- Article 4(3): reservation must be expressed explicitly, including in machine-readable form

**Opt-out Mechanism:**
- Robots Exclusion Protocol (robots.txt) — de facto standard, but interim solution
- No single harmonized standard at EU level (as of 2026)
- EUIPO planning creation of centralized machine-readable opt-out registry

### 1.4 Application to AI Training vs. AI Use

**Critical Distinction:**

Articles 3 and 4 regulate **training** of AI models, not **use** of already trained models for content generation. This confirmed by:

- **EU AI Act (2024/1689):** Article 53 explicitly references Article 4 of DSM Directive in context of training general-purpose AI models (GPAI), confirming TDM exception applicable to AI training.
- **Munich Court decision in GEMA v. OpenAI (November 2025):** Court distinguished reproduction for data analysis (covered by TDM) and "memorization" in model (not covered).

**For AI tool users (i.e., publisher using Claude):** TDM questions primarily concern **providers** of AI (Anthropic). Publisher using Claude for writing texts is on **output side** — here different legal norms apply (authorship, originality, potential third-party rights infringement).

### 1.5 Transposition in Portugal

Portugal transposed Directive 2019/790 via **Decreto-Lei n.º 47/2023 of June 19, 2023**, effective July 4, 2023. Decree introduced amendments to:

- **CDADC** (Código do Direito de Autor e dos Direitos Conexos)
- **Decreto-Lei n.º 122/2000** (transposition of Directive 96/9/EC on database protection)
- **Lei n.º 26/2015** (regulation of collective rights management organizations)

Introduced TDM exceptions:
- Exception for bulk data mining
- Permission for parody, pastiche, and caricature
- Facilitation of cultural heritage preservation
- Permission for didactic illustration in online environment

---

## 2. AI Authorship and Copyright Protection

### 2.1 Human Authorship Requirement

**Portuguese Copyright Law (CDADC):**

**Article 11 CDADC — Titularidade (Ownership):**
> "O direito de autor pertence ao criador intelectual da obra" (Copyright belongs to the intellectual creator of the work).

**Article 1(1) CDADC — Definition of Work:**
> Works are intellectual creations in literary, scientific and artistic fields, in whatever form expressed, and as such protected by this Code.

**Key Conclusion:** Portuguese law unambiguously requires **human authorship**. AI cannot be "criador intelectual" (intellectual creator). This fully aligns with pan-European approach based on CJEU case law.

### 2.2 Infopaq Standard — EU Originality Criterion

CJEU decision in **Infopaq International A/S v. Danske Dagblades Forening (C-5/08, 2009)** established unified originality standard for all EU:

> Work is original if it represents "author's own intellectual creation" and reflects their "personal contribution".

This standard applies in Portugal through:
- Supremacy of EU law (primacy of CJEU interpretation)
- Consistency with Article 1 CDADC

### 2.3 AI Participation Spectrum

| Degree of AI Participation | Copyright Status in Portugal/EU |
|---|---|
| **Fully autonomous generation** (simple prompt → result) | **Not protected** by copyright. No human "criador intelectual". Content effectively in public domain. |
| **Substantial AI participation with moderation** (selecting from variants, editing, iterating prompts) | **Gray zone.** Depends on volume and character of human contribution. |
| **AI as tool** (human determines structure, edits, substantially reworks AI output) | **Likely protected.** If human creative contribution sufficient to meet Infopaq standard. |
| **Minimal AI participation** (spell check, grammar suggestions) | **Protected.** Authorship belongs to human. |

### 2.4 European Parliament Position (2025)

Draft report of European Parliament "Copyright and Generative AI" (June 2025):

> "AI-generated content (i.e., content created without human authorship) should remain ineligible for copyright protection" — AI-generated content without human authorship should remain outside copyright protection.

However, Parliament clarifies for AI-**assisted** works:
- Simple prompt input **insufficient** for authorship claim
- Actions of **selecting results, iterating prompts, editing, creatively combining** AI-generated content **may qualify** as intellectual creation

### 2.5 Moral Rights (Direitos Morais)

**Article 56 CDADC and following** establish author's moral rights:

**Composition of Moral Rights:**
1. **Right of attribution** (direito de paternidade) — right to be named as author
2. **Right to integrity of work** (direito à integridade da obra) — right to prevent alterations distorting work
3. **Right of first disclosure** (direito de divulgação) — right to decide when and how work first disclosed
4. **Right of withdrawal** (direito de retirada) — right to withdraw work from circulation

**Characteristics:**
- **Inalienable** (inalienáveis) — cannot be transferred or alienated
- **Irrevocable** (irrenunciáveis) — cannot be waived
- **Perpetual** (perpétuos) — survive even after economic rights expire

**Consequences for AI Content:**

If AI-generated content **is not** a work under CDADC (i.e., has no human author):
- Moral rights **do not arise** — no one to be their bearer
- Creates legal vacuum: no moral rights, but also not public domain in traditional sense

If publisher substantially reworked AI content:
- Moral rights arise for **publisher** as creator of derivative/reworked work
- Attributing authorship with minimal contribution may qualify as **fraud** or **misrepresentation**

---

## 3. Open-Source Licenses and AI Content

### 3.1 Fundamental Problem

Open-source licenses (MIT, Apache-2.0, CC) assume existence of **licensor** — person holding copyright in licensed material. If AI-generated content **not protected** by copyright:

- **No copyright → nothing to license → license potentially invalid**
- Material de facto in public domain
- Any person may use it without complying with license conditions

### 3.2 MIT and Apache-2.0 for AI-Generated Code

#### MIT License

**Text:** "Permission is hereby granted, free of charge, to any person obtaining a copy of this software..."

**Problems:**
- License contains **copyright notice** — "Copyright (c) [year] [name]"
- If code generated by AI without substantial human contribution, **licensor may have no copyright**
- Without copyright, license becomes **legally meaningless** (but not harmful)
- Third parties may use code without complying with MIT conditions (but unlikely anyone will contest)

**In practice:** MIT license on AI-assisted code where human made substantial contribution (architecture, logic, selection, review) is **legally valid** for human contribution.

#### Apache License 2.0

**Additional conditions:** Patent licensing (patent grant) and requirement to note modifications.

**Problems:**
- Same as MIT, plus: AI patent license **impossible** (AI cannot own patents)
- If code substantially reworked by human — license valid for reworked part

### 3.3 Creative Commons for AI Content

#### Creative Commons Position (as of 2025-2026)

Creative Commons took following positions:

1. **AI-generated content and CC licenses:**
   - CC licenses require copyright holder as licensor
   - If content not protected by copyright (purely AI-generated), CC license **technically inapplicable**
   - CC supports principle that "copyright and related rights are unwarranted for AI-generated outputs"

2. **Using CC content for AI training:**
   - CC believes "the use of works to train AI should be considered non-infringing by default"
   - Strictly from copyright perspective, special permission from licensor for AI training **not required** to extent such permission is necessary at all

3. **ShareAlike and AI training:**
   - Research by Open Future (2025): most ShareAlike/CopyLeft licenses **ineffective** when licensed materials used for AI training
   - Reason: if training falls under TDM exceptions, license conditions don't apply to this use

#### Specific CC Licenses and AI Content

| License | Applicability to AI Content | Problems |
|---|---|---|
| **CC BY 4.0** | Inapplicable without copyright | No subject for attribution |
| **CC BY-SA 4.0** | Inapplicable without copyright | ShareAlike doesn't bind without copyright |
| **CC BY-NC 4.0** | Inapplicable without copyright | NC restriction doesn't work without copyright |
| **CC0 (Public Domain Dedication)** | **Most honest variant** | Correctly reflects absence of copyright |

### 3.4 Attribution Requirements for AI-Generated Text

**Current situation:**
- No legal requirement in EU/Portugal to indicate AI as "author"
- EU AI Act requires labeling AI-generated content (but obligation lies with AI providers, not users)
- Some CC licenses (CC BY) require attribution — but if content AI-generated, attribution **to AI legally meaningless** (AI cannot be rights holder)

**Practical recommendation:** Indicating AI participation is matter of **ethics and transparency**, not legal copyright requirement. However, **EU AI Act** may create such requirement through AI regulation line (not copyright).

---

## 4. Copyright Infringement Risks

### 4.1 Risk of Reproducing Protected Material in AI Output

**Issue:** LLMs trained on massive text corpora, including protected works. Risk exists that AI output will contain fragments substantially matching protected works of third parties.

**Munich Court decision in GEMA v. OpenAI (42 O 14139/24, November 11, 2025)** established:
- "Memorization" of protected works in AI model is **reproduction** under copyright law
- TDM exception **does not cover** reproduction through memorization in model output
- OpenAI ordered to cease such actions, pay damages, provide information on usage volumes

**For AI user (publisher):**

Reproduction risk exists when:
- Asking AI to paraphrase/summarize specific sources
- Generating text on narrow topic with few source materials
- Copying AI output without checking for plagiarism

### 4.2 Liability for Publishing AI Content Infringing Third-Party Rights

**Who is liable?**

Under EU and Portuguese law, liability may fall on:

1. **AI provider** (Anthropic/OpenAI) — for training model on protected content and for "memorization"
2. **AI user** (publisher) — for **publishing** content infringing third-party rights

**Articles 195-199 CDADC** qualify unauthorized use of work as:
- **Usurpação** (usurpation) — using another's work under own name
- **Contrafacção** (counterfeiting) — unauthorized reproduction

Both forms entail **civil and criminal liability**.

**For publisher:** Publishing AI-generated content that reproduces protected works may lead to:
- Copyright infringement lawsuit
- Obligation to remove content
- Compensation for damages
- In theory — criminal liability (though in practice unlikely for good-faith publisher)

### 4.3 Safe Harbors and Defenses

**E-Commerce Directive (2000/31/EC) and Digital Services Act (DSA, 2022/2065):**

Safe harbor for **hosting providers**: liability exemption if provider:
- Did not know about infringement
- Acted expeditiously after receiving notice (notice-and-takedown)

**Applicability to individual publisher:**
- Publisher publishing own content (including AI-assisted) — **not a hosting provider**
- Safe harbor **does not apply** — publisher bears **direct liability** for published content
- Ignorance of AI reproduction **does not exempt** from liability (strict copyright liability)

**Possible Defenses:**
- **Good faith** — mitigating circumstance, but not exemption
- **De minimis** — if matching fragment insignificant
- **Independent creation** — if can prove AI created text independently (difficult to prove)
- **TDM exceptions** — apply to **training**, not to **publishing output**

---

## 5. Recent Case Law

### 5.1 Germany: GEMA v. OpenAI (Munich Regional Court, November 11, 2025)

**Essence:** GEMA (German music rights management organization) sued OpenAI for using song lyrics in ChatGPT training.

**Decision:**
- "Memorization" of linguistic works in AI model is **reproduction** under copyright — both in model processing and in output to users
- TDM exception **covers** reproduction when creating training data, but **does NOT cover** the training process itself
- GEMA **validly implemented opt-out** per §44b UrhG (transposition of Art. 4(3) DSM Directive)
- OpenAI ordered to: cease violations; pay damages; provide information on usage volumes and revenues received
- Penalty for non-compliance: up to €250,000 or imprisonment

**Significance:** First decision establishing "memorization" of works in AI model is copyright infringement. Critical distinction between "data analysis" (TDM) and "memorization".

### 5.2 Germany: Kneschke v. LAION (OLG Hamburg, December 10, 2025)

**Essence:** Photographer Robert Kneschke sued LAION e.V. for including his photos in LAION 5B dataset for AI training without consent.

**First instance decision (Hamburg, September 2024):** In favor of LAION. Photo use falls under TDM exception for scientific research (§60d UrhG, transposition of Art. 3 DSM Directive).

**Appeal decision (OLG Hamburg, December 2025):** Confirmed. Additionally court established:
- **Opt-out** by plaintiff was **invalid**, as expressed in **natural language** (not machine-readable)
- Court considered state of technology **at time of download (2021)**: plaintiff did not prove technologies of that time could reliably interpret language restrictions in ToS or source code
- For valid opt-out, **machine-readable** form necessary

**Significance:** Confirms TDM exception for scientific purposes applicable to AI training; opt-out must be machine-readable.

### 5.3 UK: Getty Images v. Stability AI (High Court, November 4, 2025)

**Essence:** Getty Images sued Stability AI for using millions of Getty images to train Stable Diffusion.

**Decision:**
- Court **rejected** Getty's main copyright claims
- Getty admitted lack of evidence that Stable Diffusion training and development conducted in UK
- Before final arguments, Getty **withdrew** primary copyright and database rights claims
- Court established **limited trademark infringement**: Getty/iStock watermarks appeared in images generated by early Stable Diffusion versions
- **Key legal holding:** "article" for secondary infringement purposes may be intangible, but final model trained on protected works outside UK and not containing their copies is not infringing copy

**Getty received permission to appeal.**

**Significance:** First AI copyright decision in UK. Territoriality of training matters.

### 5.4 CJEU: Like Company v. Google Ireland (C-250/25)

**Preliminary reference from April 3, 2025, Budapest District Court.**

**Essence:** Hungarian publisher Like Company claims Google Gemini (formerly Bard) reproduces and summarizes substantial parts of copyright articles without authorization.

**Key Questions to CJEU:**
1. Is LLM training **reproduction** under Art. 2 InfoSoc Directive?
2. If training is reproduction, does it fall under **TDM exception** Art. 4 DSM Directive?
3. Questions on applicability of press publisher rights

**This is first case** where CJEU formally considers legal issues specifically concerning generative AI.

**Expected decision:** late 2026 — 2027. Decision will be binding for all Member State courts (including Portugal).

---

## 6. Practical Recommendations

### 6.1 For Content Creators

**Copyright risk analysis of AI-generated content under CC license:**
- Under current EU law: AI-generated content **not protected** by copyright without significant human contribution
- If content substantially edited by human → may be protected
- CC license on unprotected content = legal uncertainty
- **Recommendation:** Position content as "AI-assisted, human-edited" (which corresponds to actual process)

**Verify AI content doesn't infringe others' copyright:**
- Claude doesn't quote verbatim protected texts (Anthropic Usage Policy)
- But control output data for matches with existing texts
- Especially for: scientific descriptions, rules, card interpretations

### 6.2 For Code Developers

**AI-assisted code and copyright:**

| Scenario | Copyright Status | Open-source License Validity |
|---|---|---|
| **AI wrote all code from one prompt** | Not protected; no human author | License meaningless |
| **AI generated code, developer refactored and substantially reworked** | Likely protected by developer | License valid |
| **Developer wrote architecture, AI completed implementation, developer reviewed and edited** | Protected by developer | License valid |
| **AI suggested autocompletion, developer accepted/modified** | Protected by developer | License valid |

**"Sufficient human contribution" criterion:**

European Parliament (2025) established for AI-assisted works:
- **Insufficient:** simply enter prompt
- **May be sufficient:** selecting results, iterating prompts, editing, creative combining

For code, **sufficient contribution** may include:
- Defining architecture and design
- Writing specifications and tests
- Code review and refactoring AI output
- Integrating AI fragments into overall structure
- Debugging and fixing errors

### 6.3 Disclaimers

**For encyclopedias and informational content:**

1. **General disclaimer on site (footer/sidebar):**
   - "This project is informational resource created by community. Materials prepared using various tools and technologies, including automated data processing. All materials undergo editorial review and verification against available sources. Authors not responsible for accuracy, completeness or currency of published information. Use information at your own risk."

2. **Legal pages:** Privacy Policy, Terms of Use, Licensing page

---

## Sources

### EU Legislation
- Directive (EU) 2019/790 — Copyright in the Digital Single Market (DSM Directive)
- Directive 96/9/EC — Legal Protection of Databases
- Directive 2001/29/EC — Information Society Directive (InfoSoc)
- Regulation (EU) 2024/1689 — EU AI Act

### Portuguese Legislation
- Decreto-Lei n.º 63/85 — CDADC (Código do Direito de Autor e dos Direitos Conexos)
- Decreto-Lei n.º 47/2023 — DSM Directive transposition
- Decreto-Lei n.º 122/2000 — Database legal protection

### Case Law
- CJEU, C-5/08, Infopaq International A/S v. Danske Dagblades Forening (2009)
- CJEU, C-250/25, Like Company v. Google Ireland (pending, expected 2026-2027)
- LG München I, 42 O 14139/24, GEMA v. OpenAI (November 11, 2025)
- OLG Hamburg, 5 U 104/24, Kneschke v. LAION (December 10, 2025)
- English High Court, Getty Images v. Stability AI (November 4, 2025)

### Research and Expert Opinions
- [European Copyright Society: Opinion on Copyright and Generative AI (January 2025)](https://europeancopyrightsociety.org/)
- [European Parliament: Generative AI and Copyright (July 2025)](https://www.europarl.europa.eu/)
- [EUIPO: Development of Generative AI from a Copyright Perspective (May 2025)](https://www.euipo.europa.eu/)
- [Creative Commons: Understanding CC Licenses and Generative AI](https://creativecommons.org/2023/08/18/understanding-cc-licenses-and-generative-ai/)
- [Open Future: The Impact of Share Alike/CopyLeft Licensing on Generative AI](https://openfuture.eu/)

---

*This document prepared for research purposes and is not legal advice. For legal decisions, consult qualified lawyer specializing in intellectual property in Portugal/EU jurisdiction.*

{{< disclaimer type="legal" >}}
