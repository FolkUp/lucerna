# Lucerna — FolkUp Research Lab

## Проект

- **Имя:** Lucerna (лат. "фонарь")
- **Код бэклога:** LC
- **Репо:** FolkUp/lucerna (private → будет public после launch)
- **Назначение:** публичный OSINT research site — расследования, верификации, методологии
- **URL:** https://lucerna.folkup.app
- **Техстек:** Hugo + Blowfish theme, VPS nginx, Umami analytics

## Структура

### Публикуемый контент (content/)
- `investigations/` — глубокие расследования + серии (EU AI Act и др.)
- `verifications/` — факт-чеки конкретных утверждений
- `methodology/` — методологии OSINT (верификация, аудит, оценка источников)
- `toolkit/` — промпты и инструменты
- `about/` — о проекте + editorial policy
- `legal/` — Privacy Policy, Terms, Cookie Policy

### Операционные файлы
- `_meta/` — операционные файлы (в репо)
- `research/`, `dossiers/`, `audits/`, `prompts/` — перенесены в vault (LCRN-071, 14.03.2026), в .gitignore

## Правила работы

### Hugo build
- `hugo --gc --minify` = 0 errors (всегда перед коммитом), 23 PT i18n warnings = known issue
- Тема: Blowfish (git submodule)
- Конфиг: `config/_default/` (split config формат)

### Качество контента
- Нейтральная позиция: факты и разные точки зрения
- Минимум 2 источника для verified-статей
- Confidence level: high / medium / low в frontmatter
- PII review перед публикацией

### Публикация
- Двойное одобрение: (1) Андрей + (2) бренд-менеджер
- Перед публикацией: PII review, reviewed_by + review_date

### OSINT Frontmatter
- status: verified | partially_verified | unverified | draft
- confidence: high | medium | low
- investigation_id: INV-NNN
- investigation_type: verification | research | dossier | audit
- pii_reviewed: true/false

### Schema divergence: sources_count vs sources[]
- Энциклопедический фреймворк FolkUp требует `sources: []` (массив URL)
- Lucerna использует `sources_count: N` (число) + inline citations в тексте
- Причина: OSINT-расследования содержат 14–60+ источников, перечисление в frontmatter непрактично
- Решение валидировано Alpha-ревьюером: «semantically defensible — consulted ≠ cited»
- При аудитах: `sources_count` ≠ нарушение схемы, это проект-специфичная конвенция
- Также используется `date:` (Hugo native) вместо `date_created`/`date_updated`

### i18n
- EN (default) + RU + PT
- Суффиксный формат: `file.md` + `file.ru.md` + `file.pt.md`
- PT i18n: `i18n/pt.yaml` содержит theme + custom keys (Blowfish theme не имеет `pt.yaml`, только `pt-PT.yaml` → Hugo не fallback'ит)
- Known issue: 23 PT i18n warnings в Hugo build — non-blocking, translations render correctly

### Лицензии
- Код: MIT (LICENSE)
- Контент: CC BY-SA 4.0 (LICENSE-CONTENT)

## Разрешения

- Коммит/пуш без подтверждения (приватный репо, единственный разработчик)
- WebFetch/WebSearch свободно для ресёрча
