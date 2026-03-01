---
title: "Deep Dossier Prompt"
date: 2026-02-25
status: verified
confidence: high
tags: [toolkit, prompt, investigation, osint, multi-agent]
categories: [toolkit]
reviewed_by: "FolkUp Editorial"
review_date: 2026-02-28
pii_reviewed: true
---

## Usage
Use this prompt for in-depth investigation of a topic, person, organization, or event. Designed for the 4-agent parallel model.

## Master Prompt (Coordinator)

```
Conduct a deep OSINT investigation on: [TOPIC]

## Context
[WHY THIS INVESTIGATION IS NEEDED]

## Scope
- Time period: [DATES OR "all available"]
- Geography: [REGIONS OF INTEREST]
- Depth: [OVERVIEW / STANDARD / DEEP]

## Investigation areas:

### 1. Core facts
- Key dates, names, events
- Official records and documents
- Verifiable data points

### 2. Network analysis
- Related persons/organizations
- Connections and affiliations
- Funding sources and financial flows

### 3. Timeline reconstruction
- Chronological sequence of events
- Cause and effect relationships
- Key turning points

### 4. Context and background
- Historical context
- Cultural factors
- Political landscape
- Expert opinions and academic analysis

### 5. Contradictions and gaps
- Conflicting accounts
- Missing information
- Unanswered questions
- Areas requiring further investigation

## Output format:
Comprehensive markdown dossier with:
- Executive summary (1 paragraph)
- Detailed findings by section
- Timeline (if applicable)
- Source list with tier ratings
- Confidence assessment per section
- Recommendations for further research
- Limitations disclosure

Maintain analytical neutrality throughout.
All claims must cite specific sources.
```

## Agent Prompts (Parallel)

### Agent 1: Fact-Checker
```
Focus exclusively on verifying factual claims about [TOPIC].
Check dates, names, statistics, quotes against primary sources.
Flag anything unverifiable. Provide source for each verified fact.
```

### Agent 2: Methodology Critic
```
Evaluate the quality of available information about [TOPIC].
Assess methodology of key sources. Identify weakest links in
the evidence chain. Rate overall evidence quality.
```

### Agent 3: Bias Detector
```
Analyze information about [TOPIC] for bias and conflicts of interest.
Check who benefits from each narrative. Identify omissions.
Map stakeholder interests. Flag propaganda or PR-driven content.
```

### Agent 4: Context Researcher
```
Provide deep context for [TOPIC]. Historical background,
cultural factors, related events, expert analysis.
Connect dots that other agents might miss.
Focus on "why" not just "what."
```

## Variables
- `[TOPIC]` — investigation subject
- `[WHY THIS INVESTIGATION IS NEEDED]` — purpose and motivation
- `[DATES OR "all available"]` — time scope
- `[REGIONS OF INTEREST]` — geographic scope
- `[OVERVIEW / STANDARD / DEEP]` — depth level

## Notes
- Based on methodology: `methodology/fact-verification.md`
- Proven on: hymn-democratic-youth dossier
- For sensitive topics: add explicit ethics boundaries to each agent prompt
- Synthesis happens AFTER all 4 agents complete (no cross-contamination)
