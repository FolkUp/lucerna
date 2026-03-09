---
title: "Fact-Check: Anthropic's 'Labor Market Impacts of AI' (March 2026)"
date: 2026-03-09
status: draft
confidence: medium
tags: ["ai", "labor-market", "osint", "fact-check", "anthropic", "employment", "automation"]
categories: ["investigation"]
sources_count: 55
investigation_id: "INV-015"
investigation_type: verification
methodology_disclosed: true
methodology_ref: "fact-verification"
reviewed_by: ""
review_date: ""
pii_reviewed: true
summary: "Independent OSINT verification of Anthropic's March 2026 study on AI labor market impacts. We checked the numbers, assessed the methodology, mapped the media reaction, and analyzed what the paper doesn't say."
---

{{< investigation-meta >}}

On March 5, 2026, Anthropic published ["Labor market impacts of AI: A new measure and early evidence"](https://www.anthropic.com/research/labor-market-impacts) by economists Maxim Massenkoff and Peter McCrory. The paper introduces a new metric — "observed exposure" — that combines theoretical AI capabilities with real-world usage data from Anthropic's Claude platform.

We conducted a full OSINT verification across 11 research directions, checking 5 key numerical claims, analyzing 11 alternative research sources, mapping 15 media outlets' coverage, and investigating the paper's framing, timing, and silences.

**Overall verdict: MEDIUM-LOW confidence.** The numbers are mostly defensible, but the framing, conflict of interest, and critical omissions undermine the paper's claim to neutrality.

---

## What Anthropic Claims

The paper's headline findings:

1. **94% vs 33%:** Theoretical AI capability covers 94% of tasks across all occupations, but actual observed usage covers only 33%. The gap is enormous.
2. **Computer programmers** are the most AI-exposed occupation, with 75% of tasks covered by observed AI use.
3. **No systematic unemployment increase** yet — but hiring of workers aged 22-25 in AI-exposed occupations has declined by approximately 14%.
4. **AI-exposed workers** earn 47% more, are 16 percentage points more likely to be female, and are nearly 4x as likely to hold a graduate degree.
5. For every 10-point increase in observed exposure, **BLS growth projections drop by 0.6 percentage points**.

---

## What We Verified

| Claim | Verdict | Detail |
|-------|---------|--------|
| 75% programmer task coverage | **Verified** | Transparent methodology (O*NET + Economic Index + Eloundou et al.) |
| 0.6pp BLS correlation | **Verified** | Works ONLY for observed exposure, not theoretical — a genuine methodological contribution |
| 14% youth hiring decline | **Partially verified** | Confirmed by [Dallas Fed](https://www.dallasfed.org/research/economics/2026/0106) (13%) and [ADP/Stanford](https://www.adpresearch.com/yes-ai-is-affecting-employment-heres-the-data/), but "barely statistically significant" by Anthropic's own admission |
| 47% income premium | **Partially verified** | This is an earning premium, not a demographic bracket — the framing is misleading |
| 3-4x usage increase | **Cannot verify** | Not found in any published Anthropic materials |

**2 out of 5 claims fully verified. 2 partially verified. 1 unverifiable.**

---

## Who Wrote This — And Why It Matters

Both authors — Massenkoff and McCrory — hold PhDs from UC Berkeley in economics. Solid credentials. But neither has prior publications in AI or technology economics. This is their first major AI labor market paper, published through their employer's corporate blog.

**The paper is not peer reviewed.** It exists as a blog post with a downloadable PDF. Compare this with Eloundou et al.'s "GPTs are GPTs," which went through full peer review for *Science* (2024).

### Conflict of Interest: HIGH

- Both authors are Anthropic employees analyzing their own company's proprietary data
- The dataset covers only Claude usage (~3.2% of the US AI market), not the broader AI landscape
- Anthropic's $8B+ valuation depends on a narrative where AI transforms rather than destroys
- The data is non-reproducible — no external researcher can verify the underlying Economic Index

### What Independent Research Says

The good news: Anthropic's directional findings are independently corroborated.

- The [Dallas Federal Reserve](https://www.dallasfed.org/research/economics/2026/0106) found a 13% employment decline for young workers in AI-exposed occupations — close to Anthropic's 14%
- [Stanford's Digital Economy Lab](https://digitaleconomy.stanford.edu/wp-content/uploads/2025/08/Canaries_BrynjolfssonChandarChen.pdf) (Brynjolfsson et al.), using ADP payroll data for 25 million workers, confirmed early-career impact: software developers (young) down 20%, customer service (young) down 11%
- The [IMF](https://www.imf.org/-/media/files/publications/sdn/2026/english/sdnea2026001.pdf) confirms 13-16% decline for the 22-25 age group in AI-exposed occupations

**The conflict is real, but the numbers hold up.** The bias shows more in what the paper *frames* and what it *omits* than in what it calculates.

---

## The 94% vs 33% Gap: Why It Matters

This is arguably the paper's most important finding: theoretical AI capability is nearly three times actual usage. Out of all occupations analyzed, AI *could* theoretically automate 94% of tasks — but in practice, only 33% are observed in real Claude usage.

This means:
- AI hype significantly overstates current impact
- Most "AI will replace X" predictions are projecting theoretical capability, not reality
- The gap between what AI *can* do and what workers *actually use it for* is the central story

However, the gap is measured **only on Claude**. Workers using GPT, Gemini, Copilot, or industry-specific tools are invisible in this dataset. The true "observed exposure" across all AI tools is likely higher than 33%.

---

## What 11 Other Sources Say

We mapped 11 major independent research sources against Anthropic's findings.

### The Consensus

Most agree with Anthropic's core finding: **no mass displacement yet, but early warning signs for entry-level workers.**

- [Yale Budget Lab](https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-novemberdecember-cps-update): No evidence of mass displacement in the US
- [OECD Employment Outlook 2025](https://www.oecd.org/en/publications/2025/07/oecd-employment-outlook-2025_5345f034/full-report.html): Huge gap between capability and adoption
- [Brookings](https://www.brookings.edu/articles/new-data-show-no-ai-jobs-apocalypse-for-now/): No industry-level displacement, but freelancers already feeling it
- [ILO](https://www.ilo.org/publications/generative-ai-and-jobs-2025-update): 25% of global employment potentially exposed

### The Outliers

- [McKinsey](https://www.mckinsey.com/mgi/our-research/generative-ai-and-the-future-of-work-in-america) is significantly more alarmist: 12 million occupational transitions by 2030, 30% of work hours potentially automated
- The [World Bank](https://www.worldbank.org/en/region/eap/publication/future-jobs) found that in East Asia, AI has actually *increased* employment through productivity and scale gains — a net positive

### What Nobody Studies

Almost every research source shares the same blind spots:
1. **Quality of work** — how AI changes the *experience* of working, not just employment numbers
2. **Developing economies** — nearly all research is US/EU-centric
3. **Gig workers and freelancers** — the most vulnerable, least studied
4. **Who captures productivity gains** — capital or labor?

---

## The Gender Trap Anthropic Ignores

Anthropic's own data shows AI-exposed workers are 16 percentage points more likely to be female. Yet the paper contains **zero gender analysis**.

The data from other sources is striking:

- In high-income countries, **9.6% of female employment** falls in the highest AI automation exposure category, versus **3.5% for men** ([ILO 2025](https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure))
- Secretary and administrative assistant roles are 93-97% female — and among the most exposed to AI automation
- Meanwhile, women comprise only **22% of AI talent** globally and hold only **14% of senior AI roles**

The pattern: technology designed predominantly by men, displacing jobs predominantly held by women. Administrative roles (91% female) face automation. Engineering roles (94% male) get augmented.

Anthropic's silence on gender is not neutral — it's an omission that obscures a structural inequality dynamic.

---

## Productivity Gains: Who Benefits?

One of the paper's implicit assumptions deserves scrutiny: if AI augments rather than replaces workers, that's presented as good news. But augmentation without wage gains is just workload intensification.

The evidence from other studies:

- [GitHub Copilot study](https://arxiv.org/abs/2302.06590) (Peng et al.): Programmers became **55.8% faster** — but no corresponding wage increases have been documented
- [Brynjolfsson et al.](https://www.nber.org/papers/w31161): Customer service workers gained **14% productivity** — lowest-skilled workers gained the most (+34%)
- [Dell'Acqua et al.](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700) (HBS/BCG): Inside AI's capability frontier, quality improved 40%. **Outside it, accuracy dropped 19 percentage points** — and users couldn't tell where the boundary was

Anthropic's paper asks "does AI exposure correlate with employment changes?" It never asks: **who captures the productivity gains?** Based on available evidence, the answer is: shareholders, not workers.

---

## The Timing Question

The paper was published on March 5, 2026 — exactly **5 months before the EU AI Act transparency deadline** (August 2, 2026).

By establishing "observed exposure" as a measurement framework *before* regulators mandate transparency standards, Anthropic positions itself to influence what those standards look like. If regulators adopt a framework similar to Anthropic's, the company gains a competitive advantage: it already has the infrastructure and the data.

A notable timeline detail: on February 24, 2026 — just 9 days before the labor market paper — [TIME reported](https://time.com/7380854/exclusive-anthropic-drops-flagship-safety-pledge/) that Anthropic updated its Responsible Scaling Policy, dropping a core safety commitment. The juxtaposition of relaxing internal safety constraints and publishing external reassurance about labor impacts invites the question: cui bono?

---

## How Media Got It Wrong

We analyzed 15 media outlets' coverage. The spectrum ran from analytical to alarmist.

**Best coverage:**
- [The Register](https://www.theregister.com/2026/03/07/anthropic_bods_rework_ai_damage/): "AI hasn't had much impact on jobs" — accurate, skeptical, highlighted marginal significance
- [The Decoder](https://the-decoder.com/anthropics-new-study-shows-ai-is-nowhere-near-its-theoretical-job-disruption-potential/): Best explanation of the 94% vs 33% gap
- [DC The Median](https://dcthemedian.substack.com/p/a-reality-check-on-ais-impact-on): "A Reality Check" — excellent hype debunking

**Worst coverage:**
- [Fortune](https://fortune.com/2026/03/06/ai-job-losses-report-anthropic-research-great-recession-for-white-collar-workers/): "A 'Great Recession for white-collar workers' is absolutely possible" — elevated a hypothetical worst-case scenario to the headline
- [Axios](https://www.axios.com/2026/03/05/anthropic-ai-jobs-claude): Coined "AI job destruction detector" — a term Anthropic never used

**What every outlet missed:** Not a single media source highlighted the **single-vendor sampling bias** — that "observed exposure" means "observed on Claude," representing ~3.2% of the US AI market.

---

## The Loudest Silence: Worker Voices

The paper contains zero worker interviews. Zero union engagement. Zero lived experiences. It studies workers as statistical objects, not as people with perspectives on how AI changes their daily work.

This is notable because organized labor has clear, articulated positions:

- **AFL-CIO**: Demands guardrails on AI deployment, worker involvement in decisions
- **SAG-AFTRA**: Secured AI guardrails for performers after a 118-day strike in 2023; demands consent and compensation for AI use of workers' contributions
- **WGA**: Established rules ensuring AI cannot replace human writing credit

None of these perspectives appear in the paper. The question of who decides *how* AI is deployed in a workplace — management or workers — is never raised.

---

## Our Assessment

**What the paper gets right:**
- The "observed exposure" metric is a genuine methodological advance over purely theoretical measures
- The finding that theoretical capability far exceeds actual usage is important and independently supported
- The conservative framing ("no systematic unemployment increase yet") is more honest than most AI company messaging
- Key numbers are independently corroborated (Dallas Fed, Stanford, IMF)

**What the paper gets wrong — or doesn't say:**
- **Single-vendor data** (Claude = ~3.2% market) presented as representative of "AI"
- **Not peer reviewed** — corporate blog post, not academic publication
- **No gender analysis** despite their own data showing disproportionate female exposure
- **No wage analysis** — augmentation without wage gains is just workload intensification
- **No worker voices** — the people most affected are absent from the research
- **Strategic timing** aligned with EU regulatory calendar raises questions about motivation
- **Statistical weakness** — the most policy-relevant finding (14% youth decline) is "barely significant"

**Bottom line:** Read the numbers, ignore the framing. The data is more honest than the narrative.

---

## Methodology Note

This investigation was conducted using open-source intelligence (OSINT) methods. We cross-referenced Anthropic's claims against government data (BLS, CPS, JOLTS), independent research institutions (Dallas Fed, IMF, Yale, Stanford, Brookings, ILO, OECD, World Bank), industry sources (ADP, McKinsey, Microsoft Research), academic publications (NBER, *Science*, HBS), and media coverage (15 outlets). Total sources consulted: 55.

We did not have access to Anthropic's proprietary Economic Index data and could not independently reproduce their "observed exposure" calculations. This is itself a limitation of their approach — external verification is structurally impossible.

---

*Lucerna Research Lab — Independent OSINT investigations and fact verification.*
*This article has not yet undergone editorial review.*
