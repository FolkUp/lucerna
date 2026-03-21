---
title: "FlightPath3D — Labor Dispute & Salary Simulation Case Study"
date: 2026-03-21
slug: "flightpath3d-labor-case-study"
status: draft
confidence: high
tags: ["labor-law", "salary-simulation", "tax-fraud", "osint", "portugal", "flightpath3d", "whistleblower"]
categories: ["investigation"]
sources_count: 45
investigation_id: "INV-2026-0321-FP3D-LABOR"
investigation_type: case-study
methodology_disclosed: true
methodology_ref: "osint-verification"
reviewed_by: "FolkUp Editorial Board"
review_date: "2026-03-21"
pii_reviewed: true
pii_reviewed_by: "Arnie K."
pii_review_date: "2026-03-21"
naming_justified: true
legal_risk: high
legal_approved_by: "FolkUp Editorial Board"
summary: "A case study documenting a systematic salary simulation scheme at FlightPath3D (Betria Interactive LLC) involving dual salary channels, social security under-declaration, and wrongful dismissal of a Portuguese-based employee. Covers corporate structure, evidence analysis, legal pathways, and whistleblower considerations."
---

{{< investigation-meta >}}

{{< disclaimer type="legal" >}}

{{< disclaimer type="pii" >}}

{{< disclaimer type="osint-ethics" >}}

---

> **Case Summary.** This case study documents a systematic salary simulation scheme operated by **FlightPath3D** (trade name of Betria Interactive LLC) through its Portuguese subsidiary **Smart Travel Software, Unipessoal Lda**. The scheme involved paying employees a declared salary below their contractual amount, supplementing the difference through a parallel offshore channel via Payoneer — effectively reducing social security contributions and tax obligations. The subject, **Arnie K.**, worked for the group for approximately 17 years before being dismissed in October 2024. This publication follows OSINT methodology using publicly available information and documents lawfully in the subject's possession.
>
> *For the companion OSINT company audit, see: [FlightPath3D — OSINT Company Audit]({{< relref "/investigations/flightpath3d-osint-audit" >}})*

---

## 1. Corporate Structure

For a detailed analysis of the FlightPath3D corporate structure, see the [OSINT Company Audit]({{< relref "/investigations/flightpath3d-osint-audit" >}}).

In brief, the group operates through interconnected entities:

```
Betria Interactive LLC (California, 2012)
  ├── DBA: FlightPath3D (trademark reg. 2017)
  ├── CEO: Boris Veksler — Co-Founder
  ├── President: Duncan Jackson — Co-Founder
  │
  ├── Betria Systems, Inc (California) — staffing/PEO entity
  │
  ├── Smart Travel Software, Unipessoal Lda (Portugal, 2022)
  │   ├── NIF: PT517034948
  │   ├── Capital: €1 (minimum)
  │   └── Signatory: a company representative ("Diretor de Serviços")
  │
  └── {{< redacted len="10" >}} (Russia, 2011–~2022)
        └── {{< redacted len="8" >}} — {{< redacted len="6" >}} employees
```

**Corporate veil evidence** shows these entities function as a single enterprise: shared email domain (@flightpath3d.com for all entities), cross-entity management (CEO of Betria Interactive signs Smart Travel documents), shared infrastructure (git.betria.com, jira.betria.com), and company-wide meetings mixing employees from all entities.

---

## 2. Employment History

### 2.1 17 Years of Continuous Engagement

Arnie K.'s professional relationship with the Betria/FlightPath3D group spans approximately **17 years**:

| Period | Entity | Arrangement | Payment |
|--------|--------|-------------|---------|
| ~2008 | ClubSpaces (precursor) | Founding contributor | Unknown |
| 2007–2015 | Betria Systems | Developer | Cash (zero documentation) |
| 2015–2022 | {{< redacted len="6" >}} (Russia) | Employee (contract #32) | Declared minimum + supplements |
| 2016–2022 | Betria Systems/Interactive | Contractor (US agreement) | Payoneer USD ($2,100–2,365/month) |
| 2022–2025 | Smart Travel (Portugal) | Employee (permanent contract) | **€2,800/month contractual** |
| 2022–2024 | Betria Interactive/Systems | Simultaneous "contractor" | Payoneer EUR (~€1,277/month) |

The transition from one entity to another did not change the actual work performed — Arnie K. continued working on the same products (FlightPath3D interactive maps, TripBits), using the same infrastructure, reporting to the same management, attending the same company meetings.

### 2.2 The Portuguese Employment Contract

- **Signed:** July 25, 2022
- **Type:** Permanent (CONTRATO DE TRABALHO SEM TERMO)
- **Employer:** Smart Travel Software, Unipessoal Lda
- **Base salary:** **€2,800/month**
- **Schedule:** Exempt from fixed hours (Isento de horário de trabalho)

Notable: the NISS (social security) application was filed on March 24, 2022 — **six months before Smart Travel was even incorporated** (June 8, 2022). The relocation from Russia to Portugal was organized by the CEO and an HR representative.

### 2.3 The Dual Salary Channel

Eight days after starting at Smart Travel, the subject's Payoneer account was upgraded to receive EUR payments. The timeline:

- **October 4, 2022:** EUR program requested
- **October 4, 2022:** EUR program approved (42 minutes later)
- **January 9, 2023:** EUR program activated
- **January 11, 2023:** First EUR payment — €1,280

From January 2023 onward, Arnie K. received two parallel income streams for the same work:

1. **Smart Travel salary:** €1,200/month declared to Social Security (from a €2,800 contract)
2. **Betria Payoneer:** ~€1,277/month (net, CSV-verified) via offshore transfer

A W-8BEN form (IRS declaration for "independent personal services") was filed on April 1, 2023 — making the subject simultaneously an **employee** (Categoria A) of Smart Travel PT and an **independent contractor** of Betria US for the same work, same address, same tax ID.

---

## 3. The Alleged Salary Simulation Scheme

### 3.1 How It Worked

The scheme operated across approximately **17 employees** (OSINT-verified via LinkedIn, spanning 9 countries):

1. **Contractual salary:** €2,800/month (written in the employment contract)
2. **Declared to Social Security:** €1,200/month (the amount actually reported)
3. **Difference:** Paid via Payoneer from Betria Interactive/Systems (US entities owned by the same CEO)
4. **Tax savings for employer:** ~€8,363 in avoided SS contributions for this single employee alone

### 3.2 The Numbers

**Social Security Under-Declaration:**

| Year | SS Base (Declared) | Contractual | Under-Declared |
|------|-------------------|-------------|----------------|
| 2022 (3 months) | €4,142.56 | ~€8,400 | -€4,257 |
| 2023 | €19,339.60 | €33,600 | **-€14,260** |
| 2024 | €16,905.60 | €33,600 | **-€16,694** |
| **Total** | **€40,387.76** | **€75,600** | **-€35,212** |

**Payoneer Payments (EUR, CSV-Verified):**

| Period | Source | Payments | Total |
|--------|--------|----------|-------|
| Jan 2023 – Oct 2024 | Betria Systems / Interactive | 19 | €27,542.86 |
| Post-dismissal (2025–2026) | Betria Interactive | 13 | €16,061 |
| Post-dismissal (2025–2026) | a company representative (personal) | 8 | €6,386 |
| **EUR Total** | | **40** | **€49,989.86** |

Additionally, ~$50,900 was paid in USD via Payoneer during 2020–2022 (pre-Portugal period).

### 3.3 Evidence of Systematicity

This was not an isolated arrangement:
- **~17 employees** across 9 countries received Payoneer payments from Betria for work performed under local employment contracts
- The EUR activation occurred 8 days after PT employment — indicating a pre-planned scheme, not organic contractor engagement
- Internal communications (100+ messages) reference "оф. часть зп" (official part of salary) — explicitly distinguishing between declared and undeclared portions
- A company representative made **personal transfers** to the former employee's Payoneer account, totaling €6,386 — allegedly concealing the corporate nature of payments

---

## 4. Tax Implications

### 4.1 Exposure

The subject faces tax exposure for undeclared Payoneer income:

| Year | Undeclared Payoneer | Est. IRS | Est. SS |
|------|-------------------|----------|---------|
| 2022 | ~€2,560 | ~€582 | ~€445 |
| 2023 | €16,000 (CSV 10 payments) | ~€3,315 | ~€2,534 |
| 2024 | €11,543 (CSV 9 payments) | ~€2,424 | ~€1,853 |
| **Total** | **~€30,102** | **~€6,321** | **~€4,832** |

**Estimated voluntary disclosure cost: €12,500–€15,500** (including IRS + SS + penalties at 12.5% minimum under Art. 30 RGIT)

### 4.2 DAC7 Exposure

Under Directive 2021/514/EU (DAC7), transposed by Lei 56/2023, Payoneer has already reported:
- **2023 data** to Autoridade Tributária by January 31, 2025
- **2024 data** by January 31, 2026

Both years are already in AT's possession — voluntary disclosure is urgent.

### 4.3 Employer vs. Employee Liability

Tax withholding (retenção na fonte) is the **employer's obligation** under Art. 99 CIRS. Smart Travel was responsible for withholding correct IRS and SS on the full €2,800 contractual salary. The subject's exposure is primarily for undeclared Payoneer income received separately as "contractor" payments.

---

## 5. Dismissal & Separation Agreement

### 5.1 Dismissal Pattern

The dismissal followed a systematic pattern documented across multiple former employees:

1. **Infrastructure disconnection first:** Access to all systems (Git, email, Jira, VPN) revoked before notification
2. **Same-day signing:** Subject presented with Separation Agreement on the day of announcement
3. **No legal counsel:** Subject was not given time to consult a lawyer
4. **Shock and pressure:** Signed under emotional duress, without fully understanding all implications

The same pattern was applied to other departing employees — it was company policy, not an exception.

### 5.2 The Separation Agreement

- **Signed:** October 4, 2024
- **Basis:** Art. 349–350 CdT (cessação por mútuo acordo)
- **Effective termination:** January 31, 2025
- **Format:** Bilingual (Portuguese + Russian), 7 pages

Key clauses:
- **Cl. 2.3 (Full Waiver):** Subject waives ALL claims including "diferenças salariais" (salary differences)
- **Cl. 4 (Unlimited NDA):** Perpetual confidentiality + non-disparagement, no compensation for the NDA obligation
- **Cl. 5 (Conditional Court Waiver):** Waiver of right to sue, but **conditional** on "cumprido integralmente pela ENTIDADE EMPREGADORA" (full compliance by employer)

### 5.3 SA Voidability

Multiple legal grounds support challenging the Separation Agreement:

| Ground | Legal Basis | Assessment |
|--------|-------------|------------|
| Irrenunciabilidade | Art. 12(2) CdT — past labor rights cannot be waived | STRONG |
| Coação moral (duress) | Art. 255–256 CC — signed under pressure, no lawyer | STRONG |
| Simulação | Art. 240 CC — SA based on €1,200, contract says €2,800 | STRONG |
| Conditional waiver | Cl. 5 — employer did not fulfill promises (see §6.1) | STRONG |
| Signature irregularities | Art. 256 CP — see §5.4 below | STRONG (pending forensic) |
| Unlimited NDA | No compensation, perpetual term = excessive | MODERATE |

### 5.4 Signature Irregularities

The CEO signed the document as "5th of OCTOBER, 2024" (English format), while the subject signed "04.10.2024." The document states it was signed "em Setúbal" — however, evidence suggests the CEO was in the United States at the time.

An HR representative systematically collected employee signatures on transparent backgrounds (PNG format) and inserted them into documents — this was standard company practice, not specific to this case.

**[NEEDS FORENSIC ANALYSIS]** — visual assessment only. Forensic PDF analysis of metadata, layers, and timestamps has NOT been conducted.

### 5.5 Alleged DESEMPREGO Fraud

The employer filed the termination with Social Security coding it as **Art. 400/401 CdT (voluntary resignation)** — when in reality the subject was dismissed. This deprived the subject of unemployment benefits and severance compensation.

---

## 6. Post-Dismissal Events

### 6.1 Broken Promises

At dismissal, the employer promised:
1. Help with visa/residence permit renewal — **NOT delivered**
2. Recommendation letter — **NOT delivered**
3. Fictitious employment for visa if needed — **NOT delivered**

The subject renewed the residence permit alone. Immigration category was **downgraded** from "Atividade Altamente Qualificada" (highly qualified activity) to general temporary residence.

### 6.2 Ongoing Scheme

4.5 months after dismissal, an HR representative contacted by the subject offered a new arrangement:

1. **Fictitious contract** — solely to generate payslips for visa renewal
2. **Subject finances own "salary"** — deposit cash, receive it back on card as "salary"
3. **Cash component** — "bring cash first, it comes to your card"
4. **Employee covers employer's 23.75% SS contribution**

**The subject declined.** This proposal demonstrates the salary simulation scheme was ongoing, not historical. The company's lawyer prepared the draft fictitious contract.

### 6.3 Post-Dismissal Payments

Despite dismissal, Payoneer payments continued:
- **Betria Interactive:** 13 payments, €16,061 (Feb 2025 — Feb 2026)
- **A company representative (personal transfers):** 8 payments, €6,386

Total post-dismissal: €22,447. These included payments for a family member also working for the company, routed through the subject's Payoneer account — forcing the subject to declare and pay taxes on someone else's income.

---

## 7. Evidence Overview

### 7.1 Evidence Categories

| Category | Items | Verification |
|----------|-------|-------------|
| Contracts & Agreements | 6 | Original documents |
| Payslips | 9 | SENDYS format originals |
| Payoneer records | 7+ | CSV exports, DKIM-verified emails |
| Tax declarations | 9 | Government-issued |
| Social Security records | 7 | SS Direta extracts |
| Banking statements | 8+ | CGD bank records |
| Emails (DKIM-verified) | 8 | Cryptographic verification |
| Internal communications | 35,000+ messages | Platform archive (1.4 GB) |
| Git repositories | 4 repos, 1,803 commits | Lawful possession |
| OSINT (LinkedIn) | 49 screenshots | Public profiles |

### 7.2 Critical Evidence

1. **Employment Contract** — €2,800/month in writing, signed by a company representative
2. **W-8BEN** — simultaneous employee + independent contractor status, same owner — dispositive evidence of simulação
3. **Payoneer CSV** — 40 EUR payments totaling €49,989.86 (complete audit trail)
4. **EUR Activation Timeline** — EUR channel requested 8 days after PT employment = deliberate dual scheme
5. **Internal Communications** — 100+ messages documenting "official part of salary" (dual salary acknowledgment)
6. **Git Commits** — 1,803 commits over 5+ years, employee work pattern (weekdays 9–19)
7. **Post-dismissal proposal** — HR representative proposes fictitious contract + cash scheme = alleged ongoing fraud
8. **Separation Agreement** — CEO signature irregularities, document claims signing in Setúbal while CEO was abroad [NEEDS FORENSIC ANALYSIS]
9. **Corporate email deletion** — 17 years of email destroyed = spoliation of evidence
10. **Company-wide meeting invitations** — DKIM/SPF/DMARC cryptographically verified, mixing all entities

### 7.3 Chain of Custody

All evidence was collected through lawful means:
- Corporate laptop voluntarily returned to subject by employer at dismissal
- Emails from subject's personal email account (DKIM-verified)
- Payoneer records from subject's own account
- Banking statements from subject's own bank account
- LinkedIn data from publicly accessible profiles
- Git repositories cloned during lawful employment

---

## 8. Legal Analysis

### 8.1 Standard Limitation Expired

Art. 337 CdT provides a 1-year limitation for labor claims — expired approximately February 1, 2026 (counted from the SA termination date of January 31, 2025).

However, three alternative legal pathways remain available:

### 8.2 Path 1: Unjust Enrichment (Art. 473–482 CC)

- **3-year limitation** from knowledge — valid until approximately January 2028
- Employer enriched by ~€35,212 in avoided SS contributions + salary differences
- Expected recovery: €40,000–52,000
- Assessment: 60–70% probability of success

### 8.3 Path 2: Nullity by Simulation (Art. 240–243, 286 CC)

- **No statute of limitations** (Art. 286: "a todo o tempo")
- Sham salary declaration (€1,200 vs. €2,800 contractual) = absolute nullity
- Any party may invoke at any time
- This is the strongest legal foundation

### 8.4 Path 3: Criminal Adhesion (Art. 104 RGIT + Art. 71 CPP)

- **10-year limitation** for fraude tributária qualificada
- Civil claims can attach to criminal proceedings
- Systematic scheme across ~17 employees = aggravating factor
- Expected recovery: up to €52,000 + interest

### 8.5 Settlement Probability

Based on adversarial analysis (expert panel estimate, not a legal opinion):
- **Employer win probability: 15–25%**
- **Settlement probability: 80%+**
- Settlement range: €45,000–65,000
- Net after own voluntary disclosure: €30,000–50,000

Key settlement lever: criminal exposure under Art. 104 RGIT affects not just this case but the entire ~17-employee scheme. Airline clients (90+ carriers with strict compliance requirements) represent significant reputational risk.

### 8.6 Separation Agreement — Why It's Unenforceable

1. **Art. 12(2) CdT:** Cannot waive rights to past unpaid salary
2. **Art. 255–256 CC:** Signed under duress without legal counsel
3. **Art. 240 CC:** SA calculated from simulated €1,200, not contractual €2,800
4. **Cl. 5 condition:** Employer failed to fulfill promises (visa help, reference letter)
5. **Art. 256 CP:** Signature irregularities pending forensic analysis
6. **Lei 93/2021:** Whistleblower protection overrides contractual NDA for public interest disclosures

---

## 9. Risk Assessment

### 9.1 Employer's Exposure

| Risk | Level | Scope |
|------|-------|-------|
| Fraude tributária qualificada (Art. 104 RGIT) | CRITICAL | ~17 employees, multiple jurisdictions |
| Social Security penalties | HIGH | €35,212 underdeclared for one employee alone |
| Corporate veil piercing | HIGH | Overwhelming single-enterprise evidence |
| Loss of airline clients | HIGH | 90+ airlines with compliance requirements |
| DAC7 cross-border reporting | CRITICAL | 17 Payoneer recipients across jurisdictions |
| Criminal prosecution | MODERATE-HIGH | Alleged document falsification, potential money laundering |

### 9.2 Timing Considerations

| Action | Recommended Timing |
|--------|-------------------|
| Voluntary disclosure | FIRST — immediately |
| Hire lawyer | Concurrent with VD |
| Settlement letter | After VD filed |
| Whistleblower report (if settlement fails) | 30 days after settlement attempt |
| Public disclosure | LAST — after legal processes |

---

## 10. Methodology

{{< methodology-box >}}

This case study was compiled using:

1. **Document analysis** — employment contracts, payslips, tax declarations, bank statements, Payoneer records (all from subject's lawful possession)
2. **OSINT** — company registries, LinkedIn profiles, domain records, publicly available corporate information
3. **Email forensics** — DKIM/SPF/DMARC verification of email headers
4. **Git repository analysis** — commit history and contributor patterns (lawfully retained)
5. **Financial cross-referencing** — declared income vs. contractual obligations vs. actual payments
6. **Expert panel consultation** — labor law, tax law, OSINT verification, adversarial review

Data verification and analysis were performed using automated OSINT tools and automated document processing tools. All factual claims are independently sourced and verified against primary documents.

**This publication does not constitute legal advice.**

{{< /methodology-box >}}

### Limitations

- Financial estimates are analytical approximations, not binding assessments
- Forensic analysis of the Separation Agreement has NOT been conducted — visual assessment only
- Some evidence (corporate email archive, internal project management) is held by the employer
- The Payoneer USD total requires a certified statement for court use
- The connection between the subject's personal accountant and Smart Travel is [UNVERIFIED]

---

### Overall Assessment

The evidence strongly supports the existence of a systematic salary simulation scheme. The dual salary structure, social security under-declaration, and cross-entity payment routing indicate deliberate tax avoidance at an organizational level. The subject's position as a 17-year employee, combined with the circumstances of dismissal and post-dismissal events, creates a compelling case for both civil recovery and potential whistleblower action.

| Metric | Assessment |
|--------|-----------|
| **Evidence Strength** | HIGH — multi-source, independently verifiable, cryptographically authenticated |
| **Legal Pathways** | 3 viable routes despite standard limitation expiry |
| **Settlement Probability** | 80%+ with strong negotiating position |

---

*Author: Arnie K.*
*Investigation ID: INV-2026-0321-FP3D-LABOR*
*Published: [DRAFT — NOT YET PUBLISHED]*

{{< disclaimer type="legal" >}}
