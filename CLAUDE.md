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

### Внутренний контент (НЕ публикуется)
- `research/` — ресёрч для энциклопедий и проектов FolkUp
- `dossiers/` — исходные досье
- `audits/` — техаудиты и IP-аудиты
- `prompts/` — исходные промпты
- `_meta/` — операционные файлы

## Правила работы

### Hugo build
- `hugo --gc --minify` = 0 errors, 0 warnings (всегда перед коммитом)
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

### i18n
- EN (default) + RU
- Суффиксный формат: `file.md` + `file.ru.md`

### Лицензии
- Код: MIT (LICENSE)
- Контент: CC BY-SA 4.0 (LICENSE-CONTENT)

## Разрешения

- Коммит/пуш без подтверждения (приватный репо, единственный разработчик)
- WebFetch/WebSearch свободно для ресёрча
