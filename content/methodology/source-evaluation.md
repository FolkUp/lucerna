---
title: "Source Evaluation Methodology"
date: 2026-02-25
status: verified
confidence: high
tags: [methodology, osint, sources, craap-test, verification, reliability]
categories: [methodology]
reviewed_by: "FolkUp Editorial"
review_date: 2026-02-28
pii_reviewed: true
---

## Overview

Framework for evaluating the reliability and quality of information sources. Combines the CRAAP test with a tiered classification system.

## CRAAP Test

Evaluate every source against five criteria:

### Currency
- When was the information published or last updated?
- Is the topic time-sensitive?
- Are links functional and content current?

| Rating | Criteria |
|--------|----------|
| Strong | Published within last 2 years; regularly updated |
| Adequate | Published within last 5 years; still relevant |
| Weak | Over 5 years old; may be outdated |

### Relevance
- Does the information relate to your research question?
- Who is the intended audience?
- Is the information at an appropriate level (not too basic/advanced)?

| Rating | Criteria |
|--------|----------|
| Strong | Directly addresses the research question; expert audience |
| Adequate | Related to the topic; general audience |
| Weak | Tangentially related; different context |

### Authority
- Who is the author/publisher/source?
- What are the author's credentials or qualifications?
- Is there contact information?
- What is the URL domain? (.edu, .gov, .org, .com)

| Rating | Criteria |
|--------|----------|
| Strong | Named expert with verifiable credentials; institutional affiliation |
| Adequate | Named author with some credentials; established publication |
| Weak | Anonymous; no credentials; unknown publication |

### Accuracy
- Is the information supported by evidence?
- Has it been reviewed or refereed?
- Can you verify the information from other sources?
- Is the language objective and free of emotion?

| Rating | Criteria |
|--------|----------|
| Strong | Peer-reviewed; multiple corroborating sources; data-backed |
| Adequate | Editorial review; some corroboration; mostly factual |
| Weak | No review process; unverified; emotional language |

### Purpose
- Why does this information exist?
- Is the intent to inform, teach, sell, entertain, or persuade?
- Are there obvious biases or conflicts of interest?

| Rating | Criteria |
|--------|----------|
| Strong | Informational/educational; no commercial interest; transparent funding |
| Adequate | Some commercial element but factual content; disclosed bias |
| Weak | Primarily promotional; undisclosed conflicts; propaganda |

## Source Tiers

### Tier 1: Primary Sources
Direct, first-hand evidence:
- Original research papers and datasets
- Government statistics and official records
- Court documents and legal filings
- Eyewitness accounts and interviews
- Company financial filings (SEC, etc.)
- Patents and technical specifications

### Tier 2: Secondary Sources
Analysis and interpretation of primary sources:
- Academic review articles
- Quality journalism (investigative reporting)
- Industry analysis reports
- Books by subject matter experts
- Conference proceedings

### Tier 3: Tertiary Sources
Compilations and summaries:
- Encyclopedias and textbooks
- Wikipedia (as a starting point, not a citation)
- Industry directories
- News aggregators
- Social media posts (as leads, not evidence)

## Quick Reference

When citing sources in Lucerna investigations:

1. **Always** prefer Tier 1 over Tier 2 over Tier 3
2. **Minimum** 2 independent sources for any claim marked as "verified"
3. **Flag** when only Tier 3 sources are available
4. **Note** CRAAP weaknesses in the source list
5. **Date** when you accessed online sources

## Source Documentation Format

```markdown
## Sources

1. [Author Last, First. "Title." Publication, Date. URL (accessed YYYY-MM-DD)]
   - Tier: [1/2/3]
   - CRAAP: [Strong/Adequate/Weak]
   - Notes: [Any relevant context]
```
