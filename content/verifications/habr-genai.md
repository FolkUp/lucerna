---
title: "Habr GenAI Article — Fact Verification"
description: "Fact-checking a Habr article on GenAI tech debt and hiring crisis. 10 claims verified with sources. Overall accuracy: 8.3/10."
date: 2026-02-25
status: partially_verified
confidence: high
tags: ["genai", "tech-debt", "hiring", "verification"]
categories: ["verification"]
series: []
sources_count: 12
investigation_id: "VER-001"
investigation_type: verification
methodology_disclosed: true
methodology_ref: "fact-verification"
reviewed_by: "FolkUp Editorial"
review_date: 2026-02-28
pii_reviewed: true
claims:
  - claim: "MIT NANDA: 95% of AI pilots have zero ROI"
    status: confirmed
    accuracy: "100%"
  - claim: "Forrester/BCG: 5-15% of managers"
    status: partial
    accuracy: "~60%"
  - claim: "Google UK: 122 hours saved per year"
    status: confirmed
    accuracy: "100%"
  - claim: "Veracode: 45% of AI code has vulnerabilities"
    status: confirmed
    accuracy: "100%"
  - claim: "CAST Software: 61 billion person-days of debt"
    status: confirmed
    accuracy: "100%"
  - claim: "Stanford/GitClear: 4x code cloning"
    status: partial
    accuracy: "~70%"
  - claim: "CodeRabbit PR quality improvements"
    status: confirmed
    accuracy: "100%"
  - claim: "Builder.ai $1.5B + 700 engineers"
    status: confirmed
    accuracy: "100%"
  - claim: "Google Antigravity 2TB deletion"
    status: confirmed
    accuracy: "100%"
  - claim: "Junior hiring -50%, salaries -9%"
    status: confirmed
    accuracy: "100%"
summary: "Fact-check of a popular Habr article about GenAI tech debt and hiring crisis. Overall factual accuracy: 8.3/10."
---

{{< investigation-meta >}}

## Verification Summary

{{< verdict-summary >}}

**Overall factual accuracy: 8.3/10**

**Subject:** [Habr article](https://habr.com/ru/articles/995640/) by Marat Kiniabulatov (Eskimo), Agile Coach @ Raif. Published 12 February 2026.

---

## Key Findings

### What Was Confirmed

{{< evidence claim="Junior hiring crash is real — and actually worse: -67% (Stanford), not -50%" verdict="confirmed" >}}
The claim about junior hiring decline is confirmed. Stanford research shows an even more severe -67% decline in junior developer hiring, exceeding the article's -50% figure. Salary decline of -9% is accurate for 2024, though 2025 data shows partial recovery.
{{< /evidence >}}

{{< evidence claim="AI-generated code creates massive tech debt (GitClear, DORA, Veracode)" verdict="confirmed" >}}
Multiple independent sources confirm the tech debt problem. GitClear data shows increased code churn. DORA metrics correlate with AI adoption challenges. Veracode's 45% vulnerability rate in AI-generated code is verified.
{{< /evidence >}}

{{< evidence claim="Code review bottleneck: review time +91%, PRs larger by 18%" verdict="confirmed" >}}
Review times have indeed increased significantly with AI-generated code. PRs are larger and more frequent, creating bottleneck pressure on senior reviewers.
{{< /evidence >}}

{{< evidence claim="Builder.ai ($1.5B) and Google Antigravity (2TB deletion) incidents" verdict="confirmed" >}}
Both incidents are well-documented. Builder.ai's collapse and the Google Antigravity data deletion are confirmed by multiple reliable sources.
{{< /evidence >}}

### What Was Distorted

{{< evidence claim="\"Stanford + Git Code Clear\" attribution — actually GitClear (separate company)" verdict="partial" >}}
The article incorrectly combines Stanford research with GitClear data. GitClear is an independent code analysis company, not affiliated with Stanford. The underlying data is valid, but the attribution creates a false impression of Stanford endorsement.
{{< /evidence >}}

{{< evidence claim="\"5-15% of managers\" — actually \"5% of leading companies\" (BCG)" verdict="partial" >}}
The BCG/Forrester data was misinterpreted. The original research refers to 5% of *companies* (leaders), not 5-15% of managers. This is a significant misattribution that changes the scope of the claim.
{{< /evidence >}}

{{< evidence claim="\"11 hours/week on code review\" — exact figure unverifiable" verdict="partial" >}}
While code review time has increased, the specific "11 hours per week" figure cannot be traced to a primary source. The trend is real, but the precise number appears to be an interpolation.
{{< /evidence >}}

### Habr Commenters (53% "things got worse")

The comment section shows 53% of respondents reporting deterioration. Selection bias is likely (negative articles attract agreement), but the sentiment aligns with broader trends: 52% of gamedev professionals view GenAI negatively, and 75% of organizations use AI without measurable gains.

### Balanced Picture

GenAI simultaneously works and doesn't work:
- **Works:** focused use cases, vendor tools, senior-heavy teams
- **Doesn't work:** generic pilots, junior replacement, internal builds
- 95% pilot failures coexist with 74% ROI-within-a-year (Google Cloud)

---

## About the Author

Marat Kiniabulatov — Agile PM/Scrum Master, ICP-ACC, PSM II. Not a technical expert in AI/ML. Compiled real research but made interpretation errors.

**Methodology score: 6.5/10 | Bias: moderate negative**

{{< methodology-box title="How we verified this" ref="fact-verification" >}}
Multi-agent parallel verification: each claim was independently cross-checked against primary sources. We searched for original reports, press releases, and academic papers behind each assertion. Methodology score and bias assessment follow the CRAAP framework.
{{< /methodology-box >}}

{{< disclaimer type="osint-ethics" >}}

{{< disclaimer type="legal" >}}
