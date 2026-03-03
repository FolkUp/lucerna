---
title: "Source Audit: Verification of Claims, Conflicts of Interest, and Red Flags"
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
summary: "Source audit of the series: verification of key claims, identified conflicts of interest among researchers, red flags in the supplements industry."
---

{{< disclaimer type="harm-reduction" >}}

{{< investigation-meta >}}

## 1. Audit Methodology: The Evidence Pyramid

This audit is based on the **evidence hierarchy** adopted in evidence-based medicine:

**Level 1 (highest):**
- **Systematic reviews and meta-analyses** of randomized controlled trials (RCTs)
- Cochrane Reviews, PRISMA-compliant systematic reviews

**Level 2:**
- **Randomized controlled trials (RCTs)** — double-blind, placebo-controlled
- Phase II-III clinical trials registered at ClinicalTrials.gov

**Level 3:**
- **Cohort studies** — prospective, with control group
- Case-control studies

**Level 4:**
- **Case reports** — individual observations
- Cross-sectional studies

**Level 5 (lowest):**
- **Expert opinion** — without systematic data analysis
- **Anecdotal evidence** — testimonials, self-reports without controls

### Verification Criteria

For each claim we assessed:
- **Number of studies:** n ≥ 3 independent RCTs = sufficient for preliminary conclusions
- **Design quality:** randomization, blinding, placebo control, sample size (n ≥ 30 desirable)
- **Replication:** Were results reproduced in independent labs?
- **Publication bias:** Industry funding? Was the trial pre-registered?
- **Effect size:** Statistically significant ≠ clinically significant (Cohen's d, OR, RR)
- **Conflict of interest:** Who conducted and funded the study?

### Verdicts

- ✅ **Confirmed** — ≥2 quality RCTs, reproducible results, consensus in scientific community
- ⚠️ **Partially confirmed** — RCTs exist, but results are contradictory or limited by small samples
- ❌ **Refuted** — quality studies showed no effect
- [UNVERIFIED] **Insufficient data** — only in vitro, animal studies, or low-quality observational data

## 2. Lion's Mane (Hericium erinaceus) claims: Verification table

| Claim | Evidence Level | Number of RCTs | Effect Size | Verdict |
|-------|----------------|-----------------|-------------|---------|
| **Cognitive function improvement in healthy adults** | 2-3 | 3 RCTs (n=31, 41, 30) | Contradictory: 1 improvement in 1/3 tests, 1 worsening of delayed recall, 1 improvement during intake | ⚠️ **Partial** [1] |
| **Improvement in mild cognitive impairment (MCI)** | 2 | 1 RCT (n=30, 16 weeks) | MMSE improved by ~2 points, but effect disappeared 4 weeks after discontinuation | ⚠️ **Partial** [1] |
| **NGF (nerve growth factor) stimulation *in vitro*** | 2 | Multiple *in vitro* studies | Erinacines A-K and hericenones showed NGF biosynthesis stimulation in cell culture | ✅ **Confirmed** [2] |
| **Blood-brain barrier (BBB) crossing** | 4 | No RCTs, theoretical models | Hericenones and erinacines — low molecular weight, *potentially* cross BBB | [UNVERIFIED] [2] |
| **Neuroprotection (anti-Alzheimer's)** | 3 | Animal models (mice, rats) | Reduction of amyloid-β plaque in mouse models; no human trials | [UNVERIFIED] [3] |
| **Reduction of brain fog, improved mental clarity** | 5 | No RCTs | Only self-reports from observational studies and testimonials | [UNVERIFIED] [4] |
| **Antidepressant effect** | 2 | 1 RCT (n=30, 4 weeks) | Improvement on Hospital Anxiety and Depression Scale (HADS), but small sample | ⚠️ **Partial** [5] |

### Detailed Analysis

**Cognitive functions:**

Systematic review by Alzheimer's Drug Discovery Foundation states: *"Cognitive effects with Lion's mane have been mixed based on small and short-duration clinical trials"* [1]. Critical problems:
- **Sample sizes too small:** n=30-41, insufficient statistical power
- **Durations short-term:** 4-16 weeks, long-term effects unknown
- **Contradictory:** one study shows memory worsening [1]

⚠️ **WARNING:** Marketing claims *"boost memory"*, *"enhance focus"* **are not supported** by existing data. FDA has not approved Lion's Mane for treatment of cognitive impairment.

**NGF stimulation:**

*In vitro* data are compelling: erinacines and hericenones **do indeed** stimulate NGF synthesis in astroglial cell culture [2]. But:
- *In vitro* ≠ *in vivo*
- Unknown if systemic NGF is sufficient for clinical effects
- NGF **does not cross** blood-brain barrier freely; requires intranasal or direct brain delivery for therapeutic application

**Conclusion:** Lion's Mane shows **biological activity**, but clinical efficacy for cognitive enhancement is **not convincingly proven**.

## 3. Psilocybin claims: Full-dose vs. microdosing

| Claim | Evidence Level | Number of RCTs | Effect Size | Verdict |
|-------|----------------|-----------------|-------------|---------|
| **Full-dose for treatment-resistant depression (TRD)** | 2 | 2 Phase II RCTs (n=27, 59) | Large reduction in MADRS/HAM-D, effect lasts 12+ months | ✅ **Confirmed** [6] |
| **Full-dose for end-of-life anxiety (cancer patients)** | 2 | 2 RCTs (n=29, 51) | Significant reduction in anxiety and depression for 6-12 months | ✅ **Confirmed** [7] |
| **Microdosing for cognitive enhancement** | 2-3 | 4 placebo-controlled RCTs | **No differences** between microdose and placebo in most studies | ❌ **Refuted** [8] |
| **Microdosing for mood and well-being** | 3 | 1 large RCT (n=large sample) | Both groups (microdose and placebo) improved **equally**; breaking blind explains small differences | ❌ **Placebo effect** [9] |
| **Microdosing for creativity** | 3 | Observational studies, no RCTs | Self-reported improvements, but publication bias and expectancy bias | [UNVERIFIED] [8] |
| **Neuroplasticity (dendritic sprouting)** | 2 | Animal models + 1 human neuroimaging RCT | Psilocybin increases dendritic spine density in mice; in humans — changes in DMN connectivity | ✅ **Confirmed** [10] |

### Detailed Analysis

**Full-dose psilocybin-assisted therapy:**

Evidence base for **therapeutic doses** (25 mg+) in depression and anxiety is **strong**:
- Johns Hopkins: 71% of participants with treatment-resistant depression **no longer met criteria** for MDD after 2 sessions [6]
- Effect persists **12 months** without repeat doses [6]
- FDA granted psilocybin **Breakthrough Therapy Designation** for TRD in 2018

**BUT:** Efficacy requires **psychotherapeutic support** (integration therapy), not simply taking a pill. This is **psilocybin-assisted therapy**, not pharmacotherapy in the classic sense.

**Microdosing:**

Systematic review 2024 (Polito & Liknaitzky) in Journal of Psychopharmacology: *"It is not yet possible to determine whether microdosing is a placebo"* [8]. Key findings:
- Largest RCT (2025, Murphy et al.): **both groups** (microdose LSD and placebo) showed significant improvements in psychological parameters, **with no differences between groups** [9]
- Only statistically significant differences on acute scales explained by **breaking blind** (participants guessed which group they were in)
- *"Microdosing users make up a self-selected sample with optimistic expectations"* → massive expectancy bias [8]

⚠️ **WARNING:** The microdosing industry (Third Wave, Microdosing Institute) sells courses, guides, retreats based on **anecdotal evidence**, not RCTs. This is **marketing outpacing science**.

**Conclusion:** Full-dose psilocybin = promising therapy for specific indications. Microdosing = most likely placebo.

## 4. Microdosing LSD claims: Most studied psychedelic for microdoses

| Claim | Evidence Level | Number of RCTs | Effect Size | Verdict |
|-------|----------------|-----------------|-------------|---------|
| **Mood improvement** | 2 | 3 placebo-controlled RCTs | Small effects, not exceeding placebo when accounting for breaking blind | ❌ **Placebo** [9] |
| **Creativity and problem-solving** | 3 | 1 RCT (acute effects) | Small improvement in divergent thinking *during* action, but not after | ⚠️ **Partial** [11] |
| **Energy and productivity** | 4 | Observational studies | Self-reports, strong expectancy bias | [UNVERIFIED] [8] |
| **Reduction of anxiety and depression** | 2 | 2 RCTs | Placebo group improved **just as much** as microdose group | ❌ **Placebo** [8] |
| **Breaking blind in studies** | 2 | Meta-analysis | 40-60% of participants correctly guess whether they're taking LSD → distorts results | ✅ **Confirmed** [9] |

### Detailed Analysis

**Breaking blind problem:**

One critical issue in microdosing research: **participants often guess** whether they're taking active substance or placebo, due to:
- Subtle perceptual changes
- Bodily sensations
- Expectancy (they *want* to feel an effect and interpret any sensations as proof)

2025 study (Murphy et al.) showed: participants who correctly guessed their group reported **stronger effects** than those who guessed incorrectly [9]. This indicates **expectancy-driven reporting**, not pharmacological effect.

**Neurobiology vs. subjective experience:**

Paradox: there are **neurobiological changes** (6 neuroimaging studies showed changes in brain connectivity [8]), but **subjective improvements don't exceed placebo** in well-controlled RCTs.

Possible explanations:
1. Doses too small for clinical effects (threshold problem)
2. Neurobiological changes don't correlate with functional improvements
3. Placebo effect so strong it masks real (but small) pharmacological effects

**Conclusion:** For LSD microdosing there is **no convincing evidence** of clinical benefit exceeding placebo. Self-reported benefits most likely due to expectancy and ritual.

## 5. Amanita muscaria claims: ☠️ Special attention to safety

| Claim | Evidence Level | Number of RCTs | Effect Size | Verdict |
|-------|----------------|-----------------|-------------|---------|
| **Psychoactive effects (muscimol, GABA_A agonist)** | 2 | No RCTs, but pharmacology well-studied | Muscimol = potent GABA_A agonist, causes sedation, visual changes, ataxia | ✅ **Confirmed** [12] |
| **Toxicity (ibotenic acid, muscimol)** | 2 | Toxicology studies | LD50 (rats): ibotenic acid 129 mg/kg, muscimol 45 mg/kg. In humans — relatively low acute toxicity | ⚠️ **Moderate toxicity** [12] |
| **Lethality** | 4 | Case reports | Deaths from A. muscaria **extremely rare** with modern medical care; historical reports | ✅ **Rarely lethal** [13] |
| **Therapeutic application** | 5 | No RCTs | Only anecdotal evidence and historical traditions (Siberia) | [UNVERIFIED] |
| **Organ toxicity (liver, kidneys)** | 2 | Case reports, toxicology | **Does not cause** organ damage, unlike Amanita phalloides (death cap) | ✅ **No organ toxicity** [12] |
| **"Safe" after drying/boiling** | 3 | Preparation studies | Drying converts ibotenic acid → muscimol (less toxic). Parboiling reduces toxicity | ⚠️ **Partial** [12] |

### Detailed Analysis

**Pharmacology:**

Amanita muscaria contains two main psychoactive components:
- **Ibotenic acid:** NMDA glutamate receptor agonist → excitotoxic, can cause brain lesions *in vivo* [12]
- **Muscimol:** formed by decarboxylation of ibotenic acid (drying, heating); potent GABA_A agonist → sedation, anxiolysis, ataxia [12]

Active dose: **~6 mg muscimol** or **30-60 mg ibotenic acid** ≈ **1 cap** of medium A. muscaria [12].

**⚠️ CRITICAL PROBLEM:** Amount of active substances **varies greatly**:
- Between regions (Europe vs. North America vs. Siberia)
- Between seasons (spring/summer: **up to 10× more** ibotenic acid and muscimol than autumn) [12]
- Between individual mushrooms

This makes **dosing extremely unreliable**.

**Clinical effects of poisoning:**

Onset: 30 minutes - 2 hours. Symptoms:
- **CNS:** confusion, dizziness, agitation, ataxia, visual/auditory hallucinations
- **Less common:** nausea, vomiting, tachycardia, bradycardia, hypertension, hypothermia/hyperthermia, metabolic acidosis [13]
- **Rare:** seizures, coma

☠️ **WARNING:** Fatal intoxications **extremely rare**, but possible at extremely high doses or combined with other substances [13]. Deaths documented in historical journal articles, but with modern medical treatment lethality is close to zero.

**Preparation methods:**

- **Drying:** converts ibotenic acid → muscimol via decarboxylation, reducing excitotoxicity
- **Parboiling:** reduces content of both alkaloids, but also reduces psychoactivity
- **Lye treatment:** used in Eleusinian Mysteries hypothesis, destroys toxins [see {{< ref "mushroom-brain-myths" >}}]

⚠️ **WARNING:** Even after processing, dosing is **unpredictable**. Homemade preparation = high risk of poisoning.

**Conclusion:** Amanita muscaria **not recommended** for recreational use due to:
1. Unpredictability of dosing
2. Unpleasant side effects (nausea, ataxia, confusion)
3. Potential for ibotenic acid to cause brain lesions
4. Absence of therapeutic RCTs

## 6. Conflict of Interest: Who funds research?

### Industry-funded vs. independent research

**Problem:** Studies funded by manufacturers are **3-4 times more likely** to show positive results than independent ones [14]. This is not necessarily fraud — it's **subtle bias** at all stages:

1. **Study design:** choice of favorable comparators, endpoints, populations
2. **Data analysis:** selective reporting, p-hacking, HARKing (Hypothesizing After Results are Known)
3. **Publication:** positive results published, negative ones in "file drawer"
4. **Interpretation:** overstating significance, downplaying limitations

### Paul Stamets / Host Defense

**Conflict:**
- Stamets — **owner** of Host Defense (largest mushroom supplement manufacturer, 12% market share) [15]
- Stamets — **patent holder** of Stamets Stack (psilocybin + Lion's Mane + niacin) [16]
- Stamets — **public advocate** for mushrooms (lecturer, author, character in "Fantastic Fungi")

Host Defense funds **its own research** on products. Results published in peer-reviewed journals, but:
- Stamets — co-author
- Funding disclosure: "Funded by Fungi Perfecti"
- **No** independent study has reproduced claimed effects of Host Defense products at the same level

⚠️ **This does not mean the research is falsified**, but requires **skeptical assessment**.

### MAPS (Multidisciplinary Association for Psychedelic Studies) / Lykos

**Funding:**
- MAPS founded by Rick Doblin (1986) as advocacy organization for psychedelic legalization
- Funding: private donations + crowdfunding
- MAPS PBC (Lykos Therapeutics) — commercial division developing MDMA therapy

**Conflict:**
- MAPS has **ideological mission** of legalization, not just scientific
- FDA rejected MAPS's MDMA therapy in 2024, citing **flawed study design** (MAPP1 and MAPP2 trials) [17]
- Critics point to **expectancy bias** and **breaking blind** in MAPS studies

### Johns Hopkins Center for Psychedelic Research

**Funding:**
- **$17 million from private donors**: Steven & Alexandra Cohen Foundation, Matt Mullenweg (co-founder WordPress) [18]
- NIH grant (2021) — **first in 50 years** federal grant for psychedelics [18]

**Conflict:**
- Matthew Johnson (Johns Hopkins professor) — **clinical advisor** for MindMed, public psychedelic pharmaceutical company [18]
- Potential conflict: positive study results → MindMed stock growth

⚠️ **BUT:** Johns Hopkins has strict **disclosure policies** and publishes conflicts in articles.

### Conclusion: Caveat lector (let the reader beware)

When evaluating research **always check**:
- Funding source
- Author affiliations
- Conflicts of interest statement
- Preregistration (protocol registration before study begins)

**Red flags:**
- No conflict disclosure
- Industry-funded without independent replication
- Author = manufacturer = advocate (like Stamets)

## 7. Publication bias: "File drawer problem"

### Definition

**Publication bias** — systematic tendency to publish studies with **positive results** and not publish studies with **null findings** or negative results.

### Scale of the problem

Meta-analysis by Ioannidis (2005) *"Why Most Published Research Findings Are False"*:
- **≤50%** of published findings are reproduced in independent studies
- For "hot" scientific fields (psychedelics research = hot in 2020s) this percentage is **even lower**

### Psychedelics research and publication bias

**Problems:**

1. **Expectancy-driven journals:** psychedelic journals (Journal of Psychedelic Studies, Frontiers in Psychiatry: Psychopharmacology) more inclined to publish positive results
2. **Media hype:** positive findings get PR (Johns Hopkins press releases), negative ones — silence
3. **Crowdfunding incentives:** Kickstarter projects promise breakthrough results, not null findings

**Evidence:**

Systematic review of microdosing studies (2024): *"13 out of 19 (68%) of microdosing studies with controlled doses reported pre-registration"* [8]. This is **better** than psychology average (~30% preregistration), but still means **32% weren't pre-registered** → risk of HARKing and selective reporting.

### Funnel plot asymmetry

**Funnel plot** — graphical method for detecting publication bias. For Lion's Mane and psilocybin, funnel plots show **asymmetry**, indicating:
- Absence of negative studies with small samples (small-study effect)
- Probable underreporting of null findings

### Replication crisis

**Psychedelic research** has not escaped the replication crisis that has swept psychology and neuroscience:
- Many classic findings (e.g., Leary's Concord Prison Experiment) **don't reproduce**
- **Registered Replication Reports** (RRRs) for psychedelics are still absent

## 8. Red flags: How to recognize unreliable sources

### Consumer checklist

**🚩 RED FLAGS:**

1. **Miracle claims:** "Cures Alzheimer's", "Reverses aging", "Boosts IQ by 20 points"
   - If it sounds too good to be true — it probably is

2. **Testimonials instead of data:** "I took Lion's Mane and my memory improved!" without RCTs
   - Anecdotal evidence = lowest level of evidence

3. **Proprietary blends:** "Our unique formula contains 10 mushrooms" without dosage disclosure
   - Impossible to verify efficacy; often = underdosing of active components

4. **No third-party testing:** absence of COA (Certificate of Analysis), HPLC data
   - Possibly low beta-glucan content, presence of fillers

5. **References to "ancient wisdom":** "Used in Traditional Chinese Medicine for 2000 years"
   - Traditional use ≠ clinical efficacy; TCM also used mercury and arsenic

6. **Buzzwords without substance:** "Clinically proven", "Scientifically validated" without PubMed references
   - Check: are there actual peer-reviewed articles?

7. **Celebrity endorsements:** "Recommended by Joe Rogan / Tim Ferriss"
   - Celebrities aren't scientists; their endorsements = marketing, not science

8. **No disclaimer:** no FDA disclaimer "not intended to diagnose, treat, cure…"
   - DSHEA violation; may receive FDA warning letter

9. **Exaggerated language:** "Revolutionary", "Breakthrough", "Miracle mushroom"
   - Scientific articles use restrained language; marketing — hype

10. **Conflict of interest not disclosed:** article author = company owner, but not stated
    - Ethical violation; undermines trust

### ✅ GREEN FLAGS (reliable sources):

1. **Peer-reviewed publications** in top journals (Nature, Science, JAMA Psychiatry, Lancet)
2. **Preregistration** at ClinicalTrials.gov or OSF
3. **Replication** by independent labs
4. **Transparent funding disclosure**
5. **Nuanced conclusions:** "promising but preliminary", "requires further research"
6. **Third-party verification:** ConsumerLab, NSF, USP seals
7. **HPLC data** in COA with specific beta-glucan numbers
8. **Systematic reviews / meta-analyses** (Cochrane, PRISMA)

## 9. Quality of evidence base: Summary by series topics

| Topic | Evidence Level | Consensus | Recommendation |
|------|----------------------|-----------|--------------|
| **Lion's Mane for cognitive enhancement** | Low-Medium | Contradictory RCTs, small samples | **Insufficient data** for clinical recommendations. Need large-scale RCTs |
| **Full-dose psilocybin for TRD** | High | Consistent positive results in Phase II trials | **Promising therapy**, FDA approval expected ~2026-2027 |
| **Microdosing (LSD/psilocybin)** | Medium | Most RCTs show placebo effect | **Not recommended** as evidence-based intervention; most likely placebo |
| **Amanita muscaria therapeutic** | Very low | No RCTs, only anecdotal evidence | **Not recommended**; high risk, zero proven benefit |
| **Mushroom supplements (beta-glucans)** | Medium | Beta-glucans bioactive *in vitro*, but health claims not approved by EFSA/FDA | **Possible benefit** for immunity, but claims exaggerated |
| **Stamets Stack (psilocybin + LM + niacin)** | Low | 1 observational study, no RCTs | **Experimental**; patent ≠ proof of efficacy |
| **Stoned Ape Hypothesis** | Absent | Scientific consensus: unfalsifiable, no evidence | **Speculative mythology**, not science |
| **Soma = Amanita muscaria** | Very low | Remains disputed; no archaeological proof | **Interesting hypothesis**, but unverifiable |
| **Eleusinian kykeon = ergot** | Low-Medium | Experimental confirmation of lye treatment possibility (2026) | **Plausible**, but not proven |
| **Santa = shaman with fly agaric** | Absent | Sámi scholars categorically refute | **Debunked**; cultural appropriation |

### Overall conclusion

**Biohacking mushroom supplement industry:**
- Market growing faster than evidence base
- [MARKETING] Claims outpace science by 5-10 years
- Regulatory gap (DSHEA) allows sales without proof of efficacy
- Product quality extremely variable (fruiting body vs. mycelium on grain)

**Psychedelic research:**
- Full-dose psilocybin/MDMA = legitimate therapeutic avenue, but Phase III trials needed
- Microdosing = most likely placebo, despite massive hype
- Publication bias and conflicts of interest distort literature

**Cultural myths:**
- Some (Soma, Eleusinian Mysteries) — intriguing but unverifiable
- Others (Santa-shaman) — debunked
- "Lenin is a mushroom" — brilliant media commentary, not serious theory

**Informed consumer:**
- Demand RCTs, not testimonials
- Check conflicts of interest
- Skeptically assess miracle claims
- Consult physician before taking supplements

---

## Sources

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
