---
title: "OSINT Verification Methodology"
description: "OSINT methodology for career reconstruction and corporate structure analysis using public records, registries, and tiered source verification."
date: 2026-03-13
weight: 4
status: verified
confidence: high
tags: [methodology, osint, verification, open-sources, career-reconstruction]
categories: [methodology]
reviewed_by: "FolkUp Editorial"
review_date: 2026-03-13
pii_reviewed: true
---

## Overview

Structured process for verifying claims through open-source intelligence (OSINT). Applied primarily to career reconstruction, corporate structure analysis, and public record cross-referencing. This methodology governs investigations that rely on publicly available data rather than leaked or classified materials.

## Process

### 1. Scope Definition

Before beginning an OSINT investigation:
- Define **research questions** — what specific claims or gaps in the record need verification
- Identify **target entities** — individuals, companies, or organizations under review
- Establish **temporal boundaries** — date ranges relevant to the investigation
- Document **jurisdictional context** — which legal frameworks govern the data

### 2. Source Collection

Gather information from tiered source categories:

| Tier | Source Type | Examples |
|------|-----------|----------|
| **Tier 1 — Primary** | Official registries, filings, court records | Company registries, trademark databases, EDGAR, court docket systems |
| **Tier 2 — Secondary** | Professional platforms, press, industry databases | LinkedIn (archived), industry publications, press releases |
| **Tier 3 — Tertiary** | Social media, forums, cached pages | Web archives, social media posts, user reviews |

Rules:
- Always start with Tier 1 sources before descending
- Minimum 2 independent sources for any factual claim
- Archive all web sources at time of access (Wayback Machine, screenshots with timestamps)

### 3. Career Reconstruction

When reconstructing an individual's professional history:
- Cross-reference **company registries** with stated employment periods
- Verify **corporate roles** through official filings (director appointments, beneficial ownership)
- Check for **temporal overlaps** or gaps that contradict public statements
- Document **corporate connections** (shared directors, parent/subsidiary relationships)

### 4. Corporate OSINT

When analysing corporate structures:
- Map **ownership chains** from beneficial owner to operating entities
- Identify **jurisdictional arbitrage** (entities in different countries for regulatory advantage)
- Cross-reference **registered addresses** with actual operations
- Verify **financial claims** against filed accounts where available

### 5. Cross-Verification Matrix

Each claim must pass through multiple independent verification paths:

| Path | Method | Confidence Contribution |
|------|--------|------------------------|
| **Registry** | Official corporate/government records | +40% |
| **Archival** | Web archives, cached versions | +25% |
| **Publication** | Press coverage, industry reports | +20% |
| **Social** | Professional profiles, public statements | +15% |

A claim achieves **high confidence** when registry + at least one other path converge.

## Quality Criteria

- **Provenance:** Every factual assertion traces to a specific, citable source
- **Timeliness:** Sources dated; staleness flagged when data is >2 years old
- **Independence:** At least 2 sources that are not derived from each other
- **Completeness:** Gaps in the record are explicitly documented, not papered over
- **Reproducibility:** Another researcher could follow the same steps and reach the same conclusions

---

## Methodology in Practice

This framework is applied throughout Lucerna case studies. See [OSINT Case Study: Iterative Employment Verification — Subject-Delta Technical Profile]({{< relref "/investigations/iterative-osint-methodology-case" >}}) for a detailed three-phase case demonstrating iterative cross-verification, timeline reconstruction, and edge case handling in professional due diligence.
