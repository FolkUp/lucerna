---
title: "Промпт для верификации фактов"
date: 2026-02-25
status: verified
confidence: high
tags: [toolkit, prompt, verification, fact-checking, osint]
categories: [toolkit]
reviewed_by: "FolkUp Editorial"
review_date: 2026-03-01
pii_reviewed: true
---

## Использование
Используйте этот промпт для верификации утверждений, заявлений или тезисов из статей, презентаций или любого публичного контента.

> **Примечание:** промпт ниже на английском языке — это рабочий язык большинства AI-моделей.

## Промпт

```
Verify the following claim using open-source intelligence:

**Claim:** [CLAIM]
**Source:** [WHERE THE CLAIM APPEARED]
**Context:** [BRIEF CONTEXT]

## Your task:

### 1. Decompose the claim
Break it into individual verifiable assertions.

### 2. Verify each assertion
For each sub-claim:
- Search for primary sources (academic papers, official statistics, original research)
- Search for corroborating secondary sources
- Note any contradicting evidence
- Rate confidence: high / medium / low

### 3. Evaluate the source
- Author credentials and affiliations
- Publication venue reputation
- Methodology used (if applicable)
- Potential conflicts of interest
- Date of publication

### 4. Check for bias
- Framing analysis (what's emphasized vs. omitted)
- Language analysis (objective vs. persuasive)
- Funding or commercial interests
- Selection bias in data or examples

### 5. Provide context
- Historical background relevant to the claim
- Expert consensus on the topic
- Related research or events
- Cultural or regional factors

### 6. Verdict
Rate the overall claim:
- TRUE: Fully supported by evidence
- MOSTLY TRUE: Core claim accurate, minor inaccuracies
- MIXED: Some parts true, some false or misleading
- MOSTLY FALSE: Core claim inaccurate despite some true elements
- FALSE: Contradicted by evidence
- UNVERIFIABLE: Insufficient evidence to determine

### 7. Confidence level
- High / Medium / Low with justification

## Output format:
Structured markdown with numbered sources. Include a "Limitations" section.
Maintain neutral, analytical tone throughout.
```

## Переменные
- `[CLAIM]` — точная формулировка проверяемого утверждения
- `[WHERE THE CLAIM APPEARED]` — URL статьи, презентация и т.д.
- `[BRIEF CONTEXT]` — почему это важно, что послужило поводом для проверки

## Примечания
- Основан на методологии: `methodology/fact-verification`
- Для мультиагентного использования запустите 4 экземпляра с разным фокусом (см. методологию)
- Всегда включайте раздел «Ограничения»
