---
title: "Fact Verification Methodology"
description: "Structured OSINT methodology for verifying claims using 4-agent parallel analysis. Reduce bias, increase coverage, verify with primary sources."
date: 2026-02-25
status: verified
confidence: high
tags: [methodology, osint, fact-checking, verification, multi-agent]
categories: [methodology]
reviewed_by: "FolkUp Editorial"
review_date: 2026-02-28
pii_reviewed: true
---

## Overview

Structured process for verifying claims, statements, and assertions using open-source intelligence. Designed for multi-agent parallel analysis to reduce individual bias and increase coverage.

## Process

### 1. Claim Selection

Select claims for verification based on:
- **Impact:** How many people does this affect?
- **Virality:** Is this being widely shared/cited?
- **Verifiability:** Can this be checked against primary sources?
- **Risk:** What happens if this is wrong?

Priority matrix:

| | High Impact | Low Impact |
|---|---|---|
| **High Virality** | P0 — Verify immediately | P1 — Queue |
| **Low Virality** | P1 — Queue | P2 — As resources allow |

### 2. Claim Decomposition

Break complex claims into atomic, verifiable sub-claims:
- Extract each factual assertion separately
- Identify implicit assumptions
- Note what would need to be true for the claim to hold

### 3. Parallel Investigation (4-Agent Model)

Deploy four independent investigators simultaneously:

| Agent | Role | Focus |
|-------|------|-------|
| **Fact-Checker** | Verify assertions against primary sources | Data, statistics, quotes, dates, names |
| **Methodology Critic** | Evaluate how conclusions were reached | Sample size, methodology, peer review, replication |
| **Bias Detector** | Identify conflicts of interest and framing | Funding, affiliations, selection bias, omissions |
| **Context Researcher** | Provide historical and cultural context | Background, related events, expert consensus |

Rules:
- Each agent works independently (no cross-contamination)
- Each agent produces a structured report
- Reports are synthesized only after all complete

### 4. Source Evaluation

For each source used, assess using CRAAP test (see `source-evaluation.md`):
- Is this a primary, secondary, or tertiary source?
- What tier does it fall into?
- Are there corroborating sources?

### 5. Confidence Assessment

| Level | Criteria |
|-------|----------|
| **High** | 3+ independent primary sources agree; methodology sound; no significant bias detected |
| **Medium** | 2 sources agree OR primary source with minor methodological concerns |
| **Low** | Single source, secondary sources only, or significant methodology/bias issues |

### 6. Report Format

```markdown
# Verification: [Claim Title]

## Claim
[Exact claim being verified]

## Source
[Where the claim appeared]

## Verdict
[TRUE / MOSTLY TRUE / MIXED / MOSTLY FALSE / FALSE / UNVERIFIABLE]

## Confidence
[high / medium / low]

## Evidence Summary
[Key findings from each agent]

## Sources
[Numbered list of all sources consulted]

## Limitations
[What we couldn't verify and why]
```

## Publication Rules

- Maintain neutral tone — present evidence, not opinions
- Disclose limitations explicitly
- Never claim certainty beyond what evidence supports
- Distinguish between "unverified" and "false"
- Credit sources appropriately
