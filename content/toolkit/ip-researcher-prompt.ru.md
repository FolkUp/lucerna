---
title: "Промпт для анализа интеллектуальной собственности"
date: 2026-02-25
status: verified
confidence: high
tags: [toolkit, prompt, ip, copyright, licensing, legal]
categories: [toolkit]
reviewed_by: "FolkUp Editorial"
review_date: 2026-03-01
pii_reviewed: true
---

## Использование
Используйте этот промпт для анализа прав интеллектуальной собственности, соответствия лицензионным требованиям и рисков нарушения авторских прав в программных проектах.

> **Примечание:** промпт ниже на английском языке — это рабочий язык большинства AI-моделей.

## Промпт

```
Conduct an intellectual property and licensing analysis for: [PROJECT]

## Context
[PROJECT DESCRIPTION AND WHY THIS ANALYSIS IS NEEDED]

## Analyze:

### 1. License inventory
- Project license (type, SPDX identifier)
- All dependency licenses (direct + transitive)
- Content licenses (images, fonts, icons, text)
- Third-party code snippets (>10 lines)

### 2. Compatibility matrix
- Are all dependency licenses compatible with project license?
- Are there copyleft licenses (GPL, AGPL) in a permissive project?
- Are there commercial/proprietary licenses that restrict distribution?
- Font licenses (OFL, commercial, restricted)
- Image licenses (CC variants, stock photo, rights-managed)

### 3. Attribution compliance
- Are all required attributions present? (NOTICE file, README, etc.)
- Are copyright holders correctly identified?
- Are license texts included where required?

### 4. Risk assessment
For each finding, classify:
- **Critical:** License violation that could result in legal action
- **High:** Missing attribution or incompatible license
- **Medium:** Ambiguous licensing, needs clarification
- **Low:** Best practice improvement

### 5. Code provenance
- Is all code original or properly attributed?
- Any code that resembles existing open-source projects?
- Contributor License Agreement (CLA) status
- Copyright assignment clarity

### 6. Recommendations
- Immediate actions (fix violations)
- Short-term improvements (add missing attributions)
- Long-term strategy (license policy, CLA, audit schedule)

## Output format:
Structured markdown report with:
- Executive summary
- Risk matrix (Critical/High/Medium/Low counts)
- Detailed findings per category
- Action items with priority
- Source list

Use clear, factual language suitable for legal review.
```

## Переменные
- `[PROJECT]` — название проекта и URL репозитория
- `[PROJECT DESCRIPTION AND WHY THIS ANALYSIS IS NEEDED]` — контекст

## Примечания
- Основан на опыте: аудит IP CityMap/SetubalMap (INV-001)
- Проверяйте соответствие IP-законодательству ЕС
- На что обращать внимание: GPL в MIT-проектах, CC BY-NC в коммерческих, нелицензированные шрифты/изображения
- Для внутренних проектов FolkUp: сверяйте с индексом `_meta/license-audit.md`
