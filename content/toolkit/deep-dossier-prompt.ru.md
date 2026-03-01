---
title: "Промпт для глубокого досье"
date: 2026-02-25
status: verified
confidence: high
tags: [toolkit, prompt, investigation, osint, multi-agent]
categories: [toolkit]
reviewed_by: "FolkUp Editorial"
review_date: 2026-03-01
pii_reviewed: true
---

## Использование
Используйте этот промпт для углублённого расследования темы, персоны, организации или события. Разработан для параллельной модели 4 агентов.

> **Примечание:** промпты ниже на английском языке — это рабочий язык большинства AI-моделей.

## Мастер-промпт (координатор)

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

## Промпты агентов (параллельные)

### Агент 1: Фактчекер
```
Focus exclusively on verifying factual claims about [TOPIC].
Check dates, names, statistics, quotes against primary sources.
Flag anything unverifiable. Provide source for each verified fact.
```

### Агент 2: Критик методологии
```
Evaluate the quality of available information about [TOPIC].
Assess methodology of key sources. Identify weakest links in
the evidence chain. Rate overall evidence quality.
```

### Агент 3: Детектор предубеждений
```
Analyze information about [TOPIC] for bias and conflicts of interest.
Check who benefits from each narrative. Identify omissions.
Map stakeholder interests. Flag propaganda or PR-driven content.
```

### Агент 4: Исследователь контекста
```
Provide deep context for [TOPIC]. Historical background,
cultural factors, related events, expert analysis.
Connect dots that other agents might miss.
Focus on "why" not just "what."
```

## Переменные
- `[TOPIC]` — предмет расследования
- `[WHY THIS INVESTIGATION IS NEEDED]` — цель и мотивация
- `[DATES OR "all available"]` — временной диапазон
- `[REGIONS OF INTEREST]` — географический охват
- `[OVERVIEW / STANDARD / DEEP]` — уровень глубины

## Примечания
- Основан на методологии: `methodology/fact-verification`
- Проверен на: досье «Гимн демократической молодёжи»
- Для чувствительных тем: добавьте явные этические границы в каждый промпт агента
- Синтез результатов — только ПОСЛЕ завершения работы всех 4 агентов (без перекрёстного загрязнения)
