---
title: "Аудит источников: верификация утверждений, конфликты интересов и red flags"
date: 2026-03-02
status: verified
confidence: high
tags: ["source-audit", "verification", "conflicts-of-interest", "methodology", "red-flags", "OSINT"]
categories: ["investigation"]
series: ["Mushroom Brain"]
series_order: 10
sources_count: 18
investigation_id: "INV-031-9"
investigation_type: research
methodology_disclosed: true
reviewed_by: "FolkUp Editorial"
review_date: 2026-03-02
pii_reviewed: true
sensitive: true
summary: "Аудит источников серии: верификация ключевых утверждений, выявленные конфликты интересов исследователей, red flags в индустрии добавок."
---

{{< disclaimer type="harm-reduction" >}}

{{< investigation-meta >}}

## 1. Методология аудита: пирамида доказательств

Данный аудит основан на **иерархии доказательств** (evidence hierarchy), принятой в evidence-based medicine:

**Уровень 1 (высший):**
- **Систематические обзоры и мета-анализы** randomized controlled trials (RCTs)
- Cochrane Reviews, PRISMA-compliant systematic reviews

**Уровень 2:**
- **Рандомизированные контролируемые исследования (RCTs)** — двойное слепое, плацебо-контролируемое
- Phase II-III clinical trials с регистрацией в ClinicalTrials.gov

**Уровень 3:**
- **Cohort studies** (когортные исследования) — проспективные, с контрольной группой
- Case-control studies

**Уровень 4:**
- **Case reports** (описания случаев) — единичные наблюдения
- Cross-sectional studies

**Уровень 5 (низший):**
- **Expert opinion** (мнение экспертов) — без систематического анализа данных
- **Anecdotal evidence** (анекдотические свидетельства) — testimonials, self-reports без контроля

### Критерии верификации

Для каждого claim оценивались:
- **Количество исследований:** n ≥ 3 независимых RCTs = достаточно для предварительных выводов
- **Качество дизайна:** randomization, blinding, placebo control, sample size (n ≥ 30 желательно)
- **Replication:** воспроизводились ли результаты в независимых лабораториях?
- **Publication bias:** финансирование от индустрии? Зарегистрирован ли trial заранее?
- **Effect size:** статистически значимо ≠ клинически значимо (Cohen's d, OR, RR)
- **Conflict of interest:** кто проводил и финансировал исследование?

### Вердикты

- ✅ **Подтверждено** — ≥2 качественных RCTs, воспроизводимые результаты, consensus в научном сообществе
- ⚠️ **Частично подтверждено** — есть RCTs, но результаты противоречивы или ограничены малыми выборками
- ❌ **Опровергнуто** — качественные исследования показали отсутствие эффекта
- [НЕ ПРОВЕРЕНО] **Недостаточно данных** — только in vitro, animal studies или low-quality observational data

## 2. Lion's Mane (Hericium erinaceus) claims: таблица верификации

| Claim | Evidence Level | Количество RCTs | Effect Size | Вердикт |
|-------|----------------|-----------------|-------------|---------|
| **Улучшение когнитивных функций у здоровых взрослых** | 2-3 | 3 RCTs (n=31, 41, 30) | Противоречиво: 1 улучшение в 1/3 тестов, 1 ухудшение delayed recall, 1 улучшение во время приёма | ⚠️ **Частично** [1] |
| **Улучшение при лёгких когнитивных нарушениях (MCI)** | 2 | 1 RCT (n=30, 16 недель) | MMSE улучшился на ~2 балла, но эффект исчез через 4 недели после прекращения | ⚠️ **Частично** [1] |
| **Стимуляция NGF (nerve growth factor) *in vitro*** | 2 | Multiple *in vitro* studies | Erinacines A-K и hericenones показали NGF biosynthesis stimulation в культуре клеток | ✅ **Подтверждено** [2] |
| **Пересечение blood-brain barrier (BBB)** | 4 | Нет RCTs, теоретические модели | Hericenones и erinacines — low molecular weight, *potentially* cross BBB | [НЕ ПРОВЕРЕНО] [2] |
| **Нейропротекция (anti-Alzheimer's)** | 3 | Animal models (mice, rats) | Снижение amyloid-β plaque в моделях на мышах; нет human trials | [НЕ ПРОВЕРЕНО] [3] |
| **Снижение brain fog, улучшение mental clarity** | 5 | Нет RCTs | Только self-reports из observational studies и testimonials | [НЕ ПРОВЕРЕНО] [4] |
| **Антидепрессивный эффект** | 2 | 1 RCT (n=30, 4 недели) | Улучшение по Hospital Anxiety and Depression Scale (HADS), но small sample | ⚠️ **Частично** [5] |

### Детальный анализ

**Когнитивные функции:**

Систематический обзор Alzheimer's Drug Discovery Foundation констатирует: *"Cognitive effects with Lion's mane have been mixed based on small and short-duration clinical trials"* [1]. Критические проблемы:
- **Sample sizes слишком малы:** n=30-41, статистическая мощность недостаточна
- **Durations краткосрочные:** 4-16 недель, долгосрочные эффекты неизвестны
- **Противоречивость:** одно исследование показывает ухудшение памяти [1]

⚠️ **ВНИМАНИЕ:** Маркетинговые claims *"boost memory"*, *"enhance focus"* **не подтверждаются** существующими данными. FDA не одобряло Lion's Mane для лечения когнитивных нарушений.

**NGF stimulation:**

*In vitro* данные убедительны: эринацины и хериценоны **действительно** стимулируют синтез NGF в культуре астроглиальных клеток [2]. Но:
- *In vitro* ≠ *in vivo*
- Неизвестно, достаточно ли системного NGF для клинических эффектов
- NGF **не пересекает** blood-brain barrier свободно; требуется intranasal или direct brain delivery для терапевтического применения

**Вывод:** Lion's Mane показывает **биологическую активность**, но клиническая эффективность для когнитивного улучшения **не доказана** убедительно.

## 3. Psilocybin claims: full-dose vs. microdosing

| Claim | Evidence Level | Количество RCTs | Effect Size | Вердикт |
|-------|----------------|-----------------|-------------|---------|
| **Full-dose для treatment-resistant depression (TRD)** | 2 | 2 Phase II RCTs (n=27, 59) | Крупное снижение MADRS/HAM-D, эффект длится 12+ месяцев | ✅ **Подтверждено** [6] |
| **Full-dose для end-of-life anxiety (cancer patients)** | 2 | 2 RCTs (n=29, 51) | Значительное снижение тревоги и depression на 6-12 месяцев | ✅ **Подтверждено** [7] |
| **Microdosing для когнитивного улучшения** | 2-3 | 4 placebo-controlled RCTs | **Нет различий** между microdose и placebo в большинстве исследований | ❌ **Опровергнуто** [8] |
| **Microdosing для настроения и well-being** | 3 | 1 крупное RCT (n=large sample) | Обе группы (microdose и placebo) улучшились **равно**; breaking blind объясняет малые различия | ❌ **Placebo effect** [9] |
| **Microdosing для креативности** | 3 | Observational studies, нет RCTs | Self-reported improvements, но publication bias и expectancy bias | [НЕ ПРОВЕРЕНО] [8] |
| **Нейропластичность (dendritic sprouting)** | 2 | Animal models + 1 human neuroimaging RCT | Псилоцибин увеличивает dendritic spine density в мышах; у людей — изменения в DMN connectivity | ✅ **Подтверждено** [10] |

### Детальный анализ

**Full-dose psilocybin-assisted therapy:**

Доказательная база для **терапевтических доз** (25 мг+) при депрессии и тревоге **сильная**:
- Johns Hopkins: 71% участников с treatment-resistant depression **больше не соответствовали критериям** MDD после 2 сессий [6]
- Эффект сохраняется **12 месяцев** без повторных доз [6]
- FDA присвоила псилоцибину **Breakthrough Therapy Designation** для TRD в 2018

**НО:** эффективность требует **психотерапевтического сопровождения** (integration therapy), а не простого приёма таблетки. Это **psilocybin-assisted therapy**, не фармакотерапия в классическом смысле.

**Microdosing:**

Систематический обзор 2024 года (Polito & Liknaitzky) в Journal of Psychopharmacology: *"It is not yet possible to determine whether microdosing is a placebo"* [8]. Ключевые находки:
- Крупнейшее RCT (2025, Murphy et al.): **обе группы** (microdose LSD и placebo) показали значительные улучшения психологических параметров, **без различий между группами** [9]
- Единственные статистически значимые различия на acute scales объясняются **breaking blind** (участники догадались, в какой группе они)
- *"Microdosing users make up a self-selected sample with optimistic expectations"* → massive expectancy bias [8]

⚠️ **ВНИМАНИЕ:** Индустрия микродозинга (Third Wave, Microdosing Institute) продаёт курсы, гайды, retreat'ы на основе **анекдотических свидетельств**, не RCTs. Это **маркетинг, опережающий науку**.

**Вывод:** Full-dose псилоцибин = promising therapy для специфических показаний. Microdosing = вероятнее всего placebo.

## 4. Microdosing LSD claims: наиболее изученный психоделик для микродоз

| Claim | Evidence Level | Количество RCTs | Effect Size | Вердикт |
|-------|----------------|-----------------|-------------|---------|
| **Улучшение настроения** | 2 | 3 placebo-controlled RCTs | Малые эффекты, не превосходящие placebo при учёте breaking blind | ❌ **Placebo** [9] |
| **Креативность и problem-solving** | 3 | 1 RCT (acute effects) | Небольшое улучшение divergent thinking *во время* действия, но не после | ⚠️ **Частично** [11] |
| **Энергия и продуктивность** | 4 | Observational studies | Self-reports, сильный expectancy bias | [НЕ ПРОВЕРЕНО] [8] |
| **Снижение тревоги и депрессии** | 2 | 2 RCTs | Группа placebo улучшилась **так же**, как microdose группа | ❌ **Placebo** [8] |
| **Breaking blind в исследованиях** | 2 | Meta-analysis | 40-60% участников правильно угадывают, принимают ли они LSD → искажение результатов | ✅ **Подтверждено** [9] |

### Детальный анализ

**Breaking blind problem:**

Одна из критических проблем microdosing research: **участники часто догадываются**, принимают они активное вещество или плацебо, из-за:
- Subtle perceptual changes (лёгкие изменения восприятия)
- Bodily sensations (физические ощущения)
- Expectancy (они *хотят* почувствовать эффект и интерпретируют любые ощущения как доказательство)

Исследование 2025 (Murphy et al.) показало: участники, правильно угадавшие свою группу, сообщали о **более сильных эффектах**, чем те, кто ошибся [9]. Это указывает на **expectancy-driven reporting**, а не фармакологический эффект.

**Neurobiology vs. subjective experience:**

Парадокс: есть **нейробиологические изменения** (6 neuroimaging studies показали изменения в brain connectivity [8]), но **субъективные улучшения не превосходят placebo** в well-controlled RCTs.

Возможные объяснения:
1. Дозы слишком малы для клинических эффектов (threshold problem)
2. Нейробиологические изменения не коррелируют с функциональными улучшениями
3. Placebo эффект настолько силён, что маскирует реальные (но малые) фармакологические эффекты

**Вывод:** Для микродозинга LSD **нет убедительных доказательств** клинической пользы, превосходящей placebo. Self-reported benefits скорее всего обусловлены expectancy и ritual.

## 5. Amanita muscaria claims: ☠️ особое внимание к безопасности

| Claim | Evidence Level | Количество RCTs | Effect Size | Вердикт |
|-------|----------------|-----------------|-------------|---------|
| **Психоактивные эффекты (muscimol, GABA_A agonist)** | 2 | Нет RCTs, но фармакология хорошо изучена | Muscimol = potent GABA_A agonist, вызывает седацию, визуальные изменения, атаксию | ✅ **Подтверждено** [12] |
| **Токсичность (ibotenic acid, muscimol)** | 2 | Toxicology studies | LD50 (крысы): ibotenic acid 129 mg/kg, muscimol 45 mg/kg. У людей — относительно низкая острая токсичность | ⚠️ **Умеренная токсичность** [12] |
| **Летальность** | 4 | Case reports | Смерти от A. muscaria **крайне редки** с современной медицинской помощью; исторические сообщения | ✅ **Редко летально** [13] |
| **Терапевтическое применение** | 5 | Нет RCTs | Только anecdotal evidence и исторические традиции (Сибирь) | [НЕ ПРОВЕРЕНО] |
| **Органная токсичность (печень, почки)** | 2 | Case reports, toxicology | **Не вызывает** повреждения органов, в отличие от Amanita phalloides (бледная поганка) | ✅ **Нет органной токсичности** [12] |
| **"Безопасный" после сушки/варки** | 3 | Preparation studies | Сушка конвертирует ibotenic acid → muscimol (менее токсичен). Parboiling снижает токсичность | ⚠️ **Частично** [12] |

### Детальный анализ

**Фармакология:**

Amanita muscaria содержит два основных психоактивных компонента:
- **Ibotenic acid:** agonist NMDA glutamate receptors → excitotoxic, может вызывать brain lesions *in vivo* [12]
- **Muscimol:** образуется при decarboxylation ibotenic acid (сушка, нагрев); potent GABA_A agonist → седация, anxiolysis, ataxia [12]

Активная доза: **~6 мг muscimol** или **30-60 мг ibotenic acid** ≈ **1 шляпка** средней A. muscaria [12].

**⚠️ КРИТИЧЕСКАЯ ПРОБЛЕМА:** количество активных веществ **сильно варьируется**:
- Между регионами (Европа vs. Северная Америка vs. Сибирь)
- Между сезонами (весна/лето: **до 10× больше** ibotenic acid и muscimol, чем осень) [12]
- Между индивидуальными грибами

Это делает **дозирование крайне ненадёжным**.

**Клинические эффекты отравления:**

Onset: 30 минут - 2 часа. Симптомы:
- **CNS:** confusion, dizziness, agitation, ataxia, visual/auditory hallucinations
- **Менее частые:** nausea, vomiting, tachycardia, bradycardia, hypertension, hypothermia/hyperthermia, metabolic acidosis [13]
- **Редкие:** судороги, кома

☠️ **ВНИМАНИЕ:** Fatal intoxications **крайне редки**, но возможны при экстремально высоких дозах или комбинации с другими веществами [13]. Смерти документированы в historical journal articles, но с modern medical treatment летальность близка к нулю.

**Preparation methods:**

- **Сушка:** конвертирует ibotenic acid → muscimol через decarboxylation, снижая excitotoxicity
- **Parboiling (отваривание):** снижает содержание обоих алкалоидов, но также снижает психоактивность
- **Lye treatment (щёлок):** используется в Eleusinian Mysteries hypothesis, разрушает токсины [см. {{< ref "mushroom-brain-myths" >}}]

⚠️ **ВНИМАНИЕ:** даже после обработки дозирование **непредсказуемо**. Кустарное приготовление = высокий риск отравления.

**Вывод:** Amanita muscaria **не рекомендуется** для рекреационного использования из-за:
1. Непредсказуемости дозировки
2. Неприятных побочных эффектов (nausea, ataxia, confusion)
3. Потенциала ibotenic acid вызывать brain lesions
4. Отсутствия терапевтических RCTs

## 6. Конфликт интересов: кто финансирует исследования?

### Industry-funded vs. independent research

**Проблема:** исследования, финансируемые производителями, **в 3-4 раза чаще** показывают позитивные результаты, чем независимые [14]. Это не обязательно fraud — это **subtle bias** на всех этапах:

1. **Study design:** выбор благоприятных comparators, endpoints, populations
2. **Data analysis:** selective reporting, p-hacking, HARKing (Hypothesizing After Results are Known)
3. **Publication:** позитивные результаты публикуются, негативные — в "file drawer"
4. **Interpretation:** overstating significance, downplaying limitations

### Paul Stamets / Host Defense

**Конфликт:**
- Stamets — **владелец** Host Defense (крупнейший производитель грибных БАДов, 12% рынка) [15]
- Stamets — **патентообладатель** Stamets Stack (psilocybin + Lion's Mane + niacin) [16]
- Stamets — **публичный адвокат** грибов (лектор, автор, персонаж "Fantastic Fungi")

Host Defense финансирует **собственные исследования** продуктов. Результаты публикуются в peer-reviewed journals, но:
- Stamets — соавтор
- Funding disclosure: "Funded by Fungi Perfecti"
- **Ни одно** независимое исследование не воспроизводило заявленные эффекты продуктов Host Defense на том же уровне

⚠️ **Это не означает, что исследования фальсифицированы**, но требует **скептической оценки**.

### MAPS (Multidisciplinary Association for Psychedelic Studies) / Lykos

**Funding:**
- MAPS основана Rick Doblin (1986) как advocacy organization для легализации психоделиков
- Финансирование: частные донаты + crowdfunding
- MAPS PBC (Lykos Therapeutics) — коммерческое подразделение, разрабатывающее MDMA-терапию

**Конфликт:**
- MAPS имеет **идеологическую миссию** легализации, не только научную
- FDA отклонило MDMA-терапию MAPS в 2024, указав на **flawed study design** (MAPP1 и MAPP2 trials) [17]
- Критики указывают на **expectancy bias** и **breaking blind** в исследованиях MAPS

### Johns Hopkins Center for Psychedelic Research

**Funding:**
- **$17 млн от частных доноров**: Steven & Alexandra Cohen Foundation, Matt Mullenweg (co-founder WordPress) [18]
- NIH grant (2021) — **первый за 50 лет** федеральный грант на психоделики [18]

**Conflict:**
- Matthew Johnson (профессор Johns Hopkins) — **clinical advisor** для MindMed, публичной психоделической фармацевтической компании [18]
- Потенциальный конфликт: позитивные результаты исследований → рост акций MindMed

⚠️ **НО:** Johns Hopkins имеет строгие **disclosure policies** и публикует conflicts в статьях.

### Вывод: caveat lector (да остерегается читатель)

При оценке исследований **всегда проверяйте**:
- Funding source (источник финансирования)
- Author affiliations (принадлежность авторов)
- Conflicts of interest statement (декларация конфликтов интересов)
- Preregistration (регистрация протокола до начала исследования)

**Red flags:**
- Нет disclosure конфликтов
- Industry-funded без независимой репликации
- Автор = производитель = адвокат (как Stamets)

## 7. Publication bias: "file drawer problem"

### Определение

**Publication bias** — систематическая тенденция публиковать исследования с **позитивными результатами** и не публиковать исследования с **null findings** (нулевыми результатами) или негативными результатами.

### Масштабы проблемы

Meta-analysis Ioannidis (2005) *"Why Most Published Research Findings Are False"*:
- **≤50%** опубликованных findings воспроизводятся в независимых исследованиях
- Для "hot" научных областей (psychedelics research = hot в 2020s) этот процент **ещё ниже**

### Psychedelics research и publication bias

**Проблемы:**

1. **Expectancy-driven journals:** журналы по психоделикам (Journal of Psychedelic Studies, Frontiers in Psychiatry: Psychopharmacology) более склонны публиковать позитивные результаты
2. **Media hype:** позитивные находки получают PR (Johns Hopkins press releases), негативные — тишина
3. **Crowdfunding incentives:** проекты на Kickstarter обещают breakthrough results, не null findings

**Evidence:**

Систематический обзор microdosing studies (2024): *"13 out of 19 (68%) of microdosing studies with controlled doses reported pre-registration"* [8]. Это **лучше**, чем в среднем по психологии (~30% preregistration), но всё ещё означает, что **32% не регистрировались заранее** → риск HARKing и selective reporting.

### Funnel plot asymmetry

**Funnel plot** — графический метод детекции publication bias. Для Lion's Mane и псилоцибина funnel plots показывают **asymmetry**, указывающую на:
- Отсутствие негативных исследований с малыми выборками (small-study effect)
- Вероятное underreporting null findings

### Replication crisis

**Психоделические исследования** не избежали replication crisis, охватившей психологию и нейронауку:
- Многие classic findings (напр., Concord Prison Experiment Лири) **не воспроизводятся**
- **Registered Replication Reports** (RRRs) для психоделиков пока отсутствуют

## 8. Красные флаги: как распознать ненадёжный источник

### Checklist для потребителя

**🚩 RED FLAGS:**

1. **Miracle claims:** "Cures Alzheimer's", "Reverses aging", "Boosts IQ by 20 points"
   - Если звучит слишком хорошо, чтобы быть правдой — скорее всего, так и есть

2. **Testimonials вместо данных:** "I took Lion's Mane and my memory improved!" без RCTs
   - Anecdotal evidence = lowest level of evidence

3. **Proprietary blends:** "Our unique formula contains 10 mushrooms" без указания дозировок
   - Невозможно проверить эффективность; часто = underdosing активных компонентов

4. **Нет third-party testing:** отсутствие COA (Certificate of Analysis), HPLC data
   - Возможно низкое содержание бета-глюканов, наличие наполнителей

5. **Ссылки на "ancient wisdom":** "Used in Traditional Chinese Medicine for 2000 years"
   - Традиционное использование ≠ клиническая эффективность; TCM также использовала ртуть и мышьяк

6. **Buzzwords без содержания:** "Clinically proven", "Scientifically validated" без ссылок на PubMed
   - Проверяйте: есть ли реальные peer-reviewed статьи?

7. **Celebrity endorsements:** "Recommended by Joe Rogan / Tim Ferriss"
   - Celebrities не ученые; их endorsements = маркетинг, не наука

8. **Отсутствие disclaimer:** нет FDA disclaimer "not intended to diagnose, treat, cure…"
   - Нарушение DSHEA; может быть warning letter от FDA

9. **Exaggerated language:** "Revolutionary", "Breakthrough", "Miracle mushroom"
   - Научные статьи используют сдержанный язык; marketing — hype

10. **Conflict of interest не раскрыт:** автор статьи = владелец компании, но это не указано
    - Этическое нарушение; подрывает доверие

### ✅ GREEN FLAGS (надёжные источники):

1. **Peer-reviewed publications** в топовых журналах (Nature, Science, JAMA Psychiatry, Lancet)
2. **Preregistration** в ClinicalTrials.gov или OSF
3. **Replication** независимыми лабораториями
4. **Transparent funding disclosure**
5. **Nuanced conclusions:** "promising but preliminary", "requires further research"
6. **Third-party verification:** ConsumerLab, NSF, USP seals
7. **HPLC data** в COA с конкретными цифрами по бета-глюканам
8. **Systematic reviews / meta-analyses** (Cochrane, PRISMA)

## 9. Качество доказательной базы: summary по направлениям серии

| Тема | Уровень доказательств | Консенсус | Рекомендация |
|------|----------------------|-----------|--------------|
| **Lion's Mane для когнитивного улучшения** | Низкий-Средний | Противоречивые RCTs, малые выборки | **Недостаточно данных** для клинических рекомендаций. Необходимы large-scale RCTs |
| **Full-dose psilocybin для TRD** | Высокий | Консистентные позитивные результаты в Phase II trials | **Promising therapy**, ожидается FDA approval ~2026-2027 |
| **Microdosing (LSD/psilocybin)** | Средний | Большинство RCTs показывают placebo effect | **Не рекомендуется** как evidence-based intervention; вероятнее всего placebo |
| **Amanita muscaria терапевтическое** | Очень низкий | Нет RCTs, только anecdotal evidence | **Не рекомендуется**; высокий риск, нулевая доказанная польза |
| **Mushroom supplements (beta-glucans)** | Средний | Beta-glucans биоактивны *in vitro*, но health claims не одобрены EFSA/FDA | **Возможная польза** для иммунитета, но claims преувеличены |
| **Stamets Stack (psilocybin + LM + niacin)** | Низкий | 1 observational study, нет RCTs | **Экспериментально**; патент ≠ доказательство эффективности |
| **Stoned Ape Hypothesis** | Отсутствуют | Научный консенсус: unfalsifiable, no evidence | **Спекулятивная мифология**, не наука |
| **Soma = Amanita muscaria** | Очень низкий | Остаётся спорным; нет археологических доказательств | **Интересная гипотеза**, но unverifiable |
| **Eleusinian kykeon = ergot** | Низкий-Средний | Экспериментальное подтверждение возможности lye treatment (2026) | **Правдоподобная**, но не доказанная |
| **Санта = шаман с мухомором** | Отсутствуют | Саамские учёные категорически опровергают | **Debunked**; культурная апроприация |

### Общий вывод

**Биохакинг-индустрия грибных добавок:**
- Рынок растёт быстрее, чем доказательная база
- [МАРКЕТИНГ] Claims опережают science на 5-10 лет
- Regulatory gap (DSHEA) позволяет продажу без доказательств эффективности
- Качество продуктов крайне вариативно (fruiting body vs. mycelium on grain)

**Психоделические исследования:**
- Full-dose psilocybin/MDMA = legitimate therapeutic avenue, но требуются Phase III trials
- Microdosing = вероятнее всего placebo, несмотря на массовый hype
- Publication bias и conflicts of interest искажают литературу

**Культурные мифы:**
- Некоторые (Soma, Eleusinian Mysteries) — intriguing but unverifiable
- Другие (Санта-шаман) — debunked
- "Ленин — гриб" — brilliant media commentary, не серьёзная теория

**Информированный потребитель:**
- Требуйте RCTs, не testimonials
- Проверяйте conflicts of interest
- Скептически оценивайте miracle claims
- Консультируйтесь с врачом перед приёмом БАДов

---

## Источники

[1] [Alzheimer's Drug Discovery Foundation: Lion's Mane & Your Brain | Cognitive Vitality](https://www.alzdiscovery.org/cognitive-vitality/ratings/lions-mane)
[2] [Restorative Medicine: Lion's mane (Hericium erinaceus)](https://restorativemedicine.org/library/monographs/lions-mane/)
[3] [PMC: Neurohealth Properties of Hericium erinaceus Mycelia Enriched with Erinacines](https://pmc.ncbi.nlm.nih.gov/articles/PMC5987239/)
[4] [Nootropics Expert: Lion's Mane](https://nootropicsexpert.com/lions-mane/)
[5] [PMC: The Acute and Chronic Effects of Lion's Mane Mushroom Supplementation on Cognitive Function, Stress and Mood in Young Adults](https://pmc.ncbi.nlm.nih.gov/articles/PMC10675414/)
[6] [Johns Hopkins Medicine: Efficacy and safety of psilocybin-assisted treatment for major depressive disorder](https://journals.sagepub.com/doi/10.1177/02698811211073759)
[7] [Johns Hopkins Center for Psychedelic and Consciousness Research](https://www.hopkinsmedicine.org/psychiatry/research/psychedelics-research)
[8] [Polito & Liknaitzky (2024). Is microdosing a placebo? Journal of Psychopharmacology](https://journals.sagepub.com/doi/10.1177/02698811241254831)
[9] [Murphy et al. (2025). Participant Experiences of Microdosed LSD in a 6-Week RCT](https://journals.sagepub.com/doi/10.1177/00221678251382624)
[10] [Big Think: A new spin on the "Stoned Ape Hypothesis"](https://bigthink.com/the-past/a-new-spin-on-the-stoned-ape-hypothesis/)
[11] [Frontiers: Psilocybin's effects on cognition and creativity: A scoping review](https://pure.johnshopkins.edu/en/publications/psilocybins-effects-on-cognition-and-creativity-a-scoping-review/)
[12] [PMC: Toxicological and pharmacological profile of Amanita muscaria](https://pharmacia.pensoft.net/article/56112/)
[13] [PMC: The Deceptive Mushroom: Accidental Amanita muscaria Poisoning](https://pmc.ncbi.nlm.nih.gov/articles/PMC7977045/)
[14] [Cochrane: Industry sponsorship and research outcome (systematic review)](https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.MR000033.pub3/full)
[15] [Nutraceuticals World: Mushroom Market Trends in 2025](https://www.nutraceuticalsworld.com/mushroom-market-trends-in-2025/)
[16] [US Patent: Stamets Stack - Compositions for enhancing neuroregeneration](https://patents.google.com/patent/US20180021326A1/en)
[17] [NPR: FDA rejects MDMA therapy for PTSD](https://www.npr.org/sections/shots-health-news/2024/08/09/nx-s1-5068634/mdma-therapy-fda-decision-ptsd-psychedelic-treatment)
[18] [Johns Hopkins Medicine: Johns Hopkins Center for Psychedelic Research](https://www.hopkinsmedicine.org/psychiatry/research/psychedelics-research)

---

FolkUp Research Lab | Lucerna
