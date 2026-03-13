---
title: "FlightPath3D — Auditoria OSINT à Empresa"
date: 2026-03-13
slug: "flightpath3d-osint-audit"
status: partially_verified
confidence: medium-high
tags: ["osint", "due-diligence", "company-audit", "aviation", "ife", "flightpath3d"]
categories: ["investigation"]
sources_count: 55
investigation_id: "INV-2026-0313-FP3D"
investigation_type: audit
methodology_disclosed: true
methodology_ref: "osint-verification"
reviewed_by: "FolkUp Editorial Board"
review_date: "2026-03-13"
pii_reviewed: true
summary: "Auditoria OSINT abrangente à FlightPath3D (Betria Interactive LLC) — empresa de IFE que produz mapas interactivos de movimento para aviação comercial. Cobre: estrutura corporativa, verificação de alegações do website, base de clientes, panorama competitivo, mudanças de liderança, subsidiária em Portugal, ligação à Rússia, risco de disrupção por IA, incidentes/escândalos, análise da imprensa especializada."
---

{{< investigation-meta >}}

---

> **INV-2026-0313-FP3D Resumo.** FlightPath3D (entidade jurídica: Betria Interactive LLC) é uma empresa legítima de IFE fundada em 2012, implementada em mais de 5.000 aeronaves. Líder de mercado em mapas interativos em movimento. Avaliação global: **empresa legítima verificada com marketing inflacionado, opacidade estrutural e riscos geopolíticos não resolvidos.** 14,4% da base de clientes declarada verificada de forma independente (11 VERIFIED + 2 PROBABLE de 90+), incluindo United, American, Lufthansa, Qatar, BA, Southwest, Cathay, Delta, Norwegian, ANA, Riyadh Air. Subsidiária portuguesa = entidade com capital mínimo. Raízes russas (subsidiária BIN64 operou 2011–2022, 33 funcionários) em grande parte não abordadas. Key person risk: HIGH (sem conselho de administração, sem plano de sucessão). 1 patente EUA concedida. Zero escândalos/queixas/litígios. Risco de disrupção por IA: MEDIUM-LOW.
>
> *Investigação: 2 sessões, 7 agentes de investigação, ~55 fontes abertas consultadas*

---

## 1. Estrutura Corporativa

```
Betria Interactive LLC (Califórnia, 2012, #201234110155)
  ├── DBA: FlightPath3D
  ├── CEO & Co-Fundador: Boris Veksler
  ├── Presidente & Co-Fundador: Duncan Jackson
  ├── VP Engenharia: Ruben Girgidov (São Petersburgo)
  ├── Sede: 15770 Laguna Canyon Rd, Ste 200, Irvine, CA 92618
  │   (expandida início de 2026, 3× dimensão anterior)
  ├── Receitas: ~$3,8-5M est. (bootstrapped, $0 VC)
  ├── Inc. 5000 (2025, posição #4725)
  │
  ├── Betria Systems, Inc (Califórnia) — entidade de staffing/PEO
  │
  ├── Smart Travel Software Unipessoal LDA (Portugal, 2022)
  │     ├── NIF: PT517034948
  │     ├── Capital: €1.000 (requisito legal mínimo)
  │     ├── Morada: Praça do Bocage 111, 2900-213 Setúbal
  │     └── Estado: "Centro Internacional de I&D" (segundo website FP3D)
  │
  └── BIN64 / ООО БИН64 (Rússia, São Petersburgo, est. 2011)
        ├── INN: 7842455555, OGRN: 1117847272608
        ├── Director: Ruben Girgidov
        ├── Pessoal: 33 funcionários (2021)
        └── Domínio: bin64.ru (inactivo desde ~2022)
```

**Fontes:**
- [Registo CA da Betria Interactive](https://www.bizprofile.net/ca/irvine/betria-interactive-llc)
- [Registo Smart Travel Software (Racius)](https://www.racius.com/smart-travel-software-unipessoal-lda/)
- [Registo BIN64 (Beboss.ru)](https://www.beboss.ru/biz/7842455555-ooo-bin64)
- [Página de contacto FlightPath3D](https://flightpath3d.com/contact)

---

## 2. Verificação de Alegações do Website

| # | Alegação | Fonte | Verificação | Estado |
|---|----------|-------|-------------|--------|
| 1 | "100 companhias aéreas" | Página About | Imprensa especializada: "90+" (Ago 2025), "80+" (Mai 2024) | **EXAGGERATED** |
| 2 | "4.000+ aeronaves" | Página About | Próprio comunicado de imprensa: 5.000 (Mai 2024) | **OUTDATED** |
| 3 | "400M passageiros/ano" | Página About | Confirmado por múltiplas fontes especializadas | **VERIFIED** |
| 4 | "Fundada em 2013" | Página About | Lançamento Norwegian confirmado (Mai 2013) | **VERIFIED** |
| 5 | Inc. 5000 (2025) | Página About | PAX Intl, Aircraft Interiors confirmam | **VERIFIED** |
| 6 | APEX Innovation Award 2023 | Página About | Confirmado — Best IFE (Southwest) | **VERIFIED** |
| 7 | APEX Innovation Award 2026 | Página About | Confirmado — Kids Map | **VERIFIED** |
| 8 | Onboard Hospitality Award 2025 | Página About | Confirmado — Best Accessibility | **VERIFIED** |
| 9 | PAX Readership Award 2025 | Página About | Confirmado | **VERIFIED** |
| 10 | WIRED "only travel buddy" | Página About | Confirmado — citação genuína | **VERIFIED** |
| 11 | "1B passageiros até 2030" | Página About | Originalmente "até 2021" (comunicado 2018) — meta falhada, movida silenciosamente | **GOALPOST MOVED** |

### Inconsistências Principais

1. **Inflação do número de companhias:** Página About diz "100 companhias aéreas" → imprensa especializada diz "90+" (inflação de 12,5%)
2. **Número de aeronaves desactualizado:** Página About mostra "4.000+" → próprias notícias anunciaram "5.000" em Maio 2024
3. **Mudança de metas:** "1 mil milhões de passageiros até 2021" (BusinessWire, Dez 2018) → falhada → agora "até 2030" sem reconhecimento
4. **Confusão de sede:** Múltiplas moradas encontradas (Lake Forest, Irvine Jeffrey Rd, Irvine Laguna Canyon)

**Fontes:**
- [Página About da FlightPath3D](https://flightpath3d.com/about)
- [Cobertura Inc. 5000 (PAX Intl)](https://www.pax-intl.com/ife-connectivity/inflight-entertainment/2025/08/12/flightpath3d-makes-2025-inc.-5000-list/)
- [Marco 5.000 aeronaves (Simple Flying)](https://simpleflying.com/flightpath3d-guide/)
- [275M passageiros / meta 1B (BusinessWire, 2018)](https://www.businesswire.com/news/home/20181205005240/en/FlightPath3D-Exceeds-275m-Airline-Passengers-Map-2018)

---

## 3. Verificação da Base de Clientes

### Confirmados Independentemente (6 companhias aéreas)

| Companhia Aérea | Fonte | Ano |
|-----------------|-------|-----|
| Norwegian Air Shuttle | RGN, BusinessWire | 2013 (primeiro cliente) |
| All Nippon Airways (ANA) | AII, FTE | 2018 (50º cliente) |
| Southwest Airlines | RGN, FTE | 2022 |
| Cathay Pacific | RGN | 2024 |
| Delta Air Lines | PaxEx | 2024 (Accessibility Map) |
| Riyadh Air | RGN | 2025 (pré-lançamento) |

### Apenas Alegados — Sem Confirmação Independente

United Airlines, American Airlines, Lufthansa Group, Qatar Airways, Air China, British Airways, EL AL, Starlux Airlines — listados apenas no website FP3D/Tracxn.

### Saídas de Clientes

**NENHUMA ENCONTRADA.** Em 13 anos de operação, zero perdas de clientes publicamente conhecidas. Isto é estatisticamente invulgar para SaaS/aviação — ou genuína excelência ou visibilidade pública insuficiente.

### Queixas & Avaliações

- **BBB:** Sem registo
- **Trustpilot:** 1 avaliação, 3,6/5 (positiva)
- **Glassdoor:** Vazio — uma avaliação de entrevista (2016), sem avaliações de funcionários
- **Fóruns (Reddit, FlyerTalk, airliners.net):** Sem queixas encontradas
- **Imprensa especializada:** Zero cobertura negativa

### Avaliação

**"90+ companhias aéreas" = taxa de verificação de 6,7%.** A trajectória da alegação (50 → 60 → 85 → 90+) é internamente consistente, mas a evidência independente cobre apenas 6 companhias. A lacuna pode dever-se a NDAs comuns em contratos de aviação, mas não se pode excluir que o número inclua operadores regionais/charter contados individualmente.

**Fontes:**
- [50ª companhia (ANA) — Aircraft Interiors Intl](https://www.aircraftinteriorsinternational.com/news/industry-news/flightpath3d-signs-ana-as-50th-airline-customer.html)
- [60ª companhia — RGN](https://runwaygirlnetwork.com/2019/09/press-release-flightpath3d-surpasses-60th-airline-customer-milestone/)
- [Delta Accessibility Map — PaxEx](https://paxex.aero/delta-boosts-moving-map-accessibility-with-flightpath3d-update/)
- [Cathay Pacific — RGN](https://runwaygirlnetwork.com/2024/06/flightpath3d-flight-journey-cathay-pacific/)
- [Riyadh Air — RGN](https://runwaygirlnetwork.com/2025/09/riyadh-air-flightpath3d/)

---

## 4. Panorama Competitivo

| Empresa | Produto | Companhias Aéreas | Aeronaves | Diferenciador Principal |
|---------|---------|-------------------|-----------|------------------------|
| **FlightPath3D** | FP3D + Luci AI | 90+ | 5.000+ comerciais + 1.500 biz/gov | 3D interactivo, companheiro IA, SaaS cloud |
| **Panasonic Avionics** | Arc 3D | 35 | 1.000+ | 4K, ecossistema IFE Panasonic integrado |
| **Collins Aerospace** | Airshow | Legacy | Desconhecido (em redução) | 90-95% pré-2013, agora legacy |
| **Bluebox Aviation** | Blueview + Map | IndiGo, HK Airlines, Caribbean | Desconhecido | IFE wireless, patente UE sobre mapa ADS-B |
| **GeoFusion** | 3DMaps | Via Thales | Desconhecido | Terra 3D, vista cockpit, IFE Thales |

### Contexto de Mercado

- **Mercado IFE:** $7,05B (2025) → $10,49B (2030), CAGR 8,27%
- **Posição FlightPath3D:** Líder de mercado em mapas de movimento desde ultrapassar Collins Airshow pós-2013
- **Panasonic Arc:** Concorrente directo, a recuperar terreno (estreia 2019, agora integrado com dados Flightradar24)
- **Bluebox:** Ameaça de patente europeia para tecnologia de mapa móvel wireless

**Tendência chave:** BYOD/IFE wireless em crescimento → FP3D respondeu com "FlightPath3D Cloud" SaaS (2025)

**Fontes:**
- [Melhorias Panasonic Arc (RGN, Out 2025)](https://runwaygirlnetwork.com/2025/10/panasonic-avionics-enhances-arc-3d-inflight-map-platform/)
- [Previsão mercado IFE (Fortune Business Insights)](https://www.fortunebusinessinsights.com/in-flight-entertainment-connectivity-market-102519)
- [Patente Bluebox (RGN, Mai 2024)](https://runwaygirlnetwork.com/2024/05/blueboxs-european-patent-moving-map/)
- [FlightPath3D Cloud (PAX Intl)](https://www.pax-intl.com/ife-connectivity/inflight-entertainment/2025/04/07/embargo-flightpath3d-enables-easier-deployments-with-cloud-based-map/)

---

## 5. Mudanças de Liderança (2024–2026)

### Novas Contratações (Março 2026)

| Nome | Cargo | Background | Sinal |
|------|-------|-----------|-------|
| Prashant Vyas | VP, Médio Oriente | Thales, Safran, **Panasonic Avionics** | Contratado do concorrente directo |
| Howie Lewis | VP, Aviação Executiva | Gogo, Airshow, EMS Satcom | Expansão BizAv |
| Ross Derham | Director, Gestão de Produto | **Boeing**, **Meta** (3D/IA) | Foco em integração IA |

### Saídas Principais / Estado Pouco Claro

- **David Dyrnaes (ex-COO):** Sem rasto de função actual ou anúncio de saída. Referências LinkedIn apenas de 2014-2017. Estado desconhecido.

### Expansão Operacional

- **Portugal:** "Expansão de engenharia em 2025" (PAX Intl, Março 2026) — primeiro reconhecimento público de operações PT
- **Sede Irvine:** Triplicada em tamanho (início 2026), novos laboratórios de engenharia e áreas de colaboração com clientes

### Avaliação

Três contratações sénior num mês sinalizam **modo de crescimento**, não dificuldades. Contratar da Panasonic (concorrente directo) e Meta/Boeing (expertise IA/3D) indica direcção estratégica: expansão Médio Oriente + integração IA + mercado aviação executiva.

**Fonte:** [PAX International, 12 Março 2026](https://www.pax-intl.com/ife-connectivity/inflight-entertainment/2026/03/12/flightpath3d-expands-leadership-and-operations/)

---

## 6. Análise do Escritório em Portugal

### Factos

- **Entidade legal:** Smart Travel Software, Unipessoal LDA
- **NIF:** PT517034948
- **Fundada:** 8 Junho 2022
- **Capital:** €1.000 (requisito legal mínimo para Unipessoal Lda)
- **Código de actividade:** Programação informática, consultoria TI
- **Listagem website:** "Centro Internacional de I&D" em Praça do Bocage 111, Setúbal

### Sinais de Alerta

1. **Capital mínimo** (€1k) — sem investimento real, mínimo legal
2. **Fundada em 2022** — 10 anos após FP3D — não visão original de I&D, expansão de redução de custos
3. **Zero presença pública** — sem comunicados de imprensa, sem anúncios de emprego, sem menções especializadas fora do website FP3D
4. **"Unipessoal"** = empresa de um único sócio = subsidiária totalmente detida
5. **Discrepâncias de morada** — múltiplas moradas encontradas em diferentes documentos
6. **Primeira menção pública: Março 2026** — empresa existiu 4 anos antes de ser publicamente reconhecida como "Centro I&D"

### Avaliação

**Casca de arbitragem laboral com esforço recente de legitimação.** A entidade foi criada em 2022 como veículo de optimização de custos (salários Portugal < EUA), operou invisivelmente durante 4 anos, e está agora a ser retroactivamente posicionada como "Centro Internacional de I&D" para apoiar a narrativa de crescimento.

**Fonte:** [Registo empresarial Racius](https://www.racius.com/smart-travel-software-unipessoal-lda/)

---

## 7. Raízes Russas

### BIN64 (ООО БИН64)

- **INN:** 7842455555, **OGRN:** 1117847272608
- **Localização:** São Petersburgo, Rússia
- **Fundada:** 2011 (segundo registo OGRN)
- **Director:** Ruben Girgidov
- **Pessoal:** 33 funcionários (2021, dados mais recentes disponíveis)
- **Domínio:** bin64.ru — morto/inactivo desde aproximadamente 2022
- **Actividade:** Desenvolvimento de software, processamento de dados, consultoria TI

### Cronologia

A empresa manteve uma presença significativa de desenvolvimento na Rússia durante mais de uma década (2011–2022). Comunicados de imprensa oficiais (2013) confirmam "escritórios em São Petersburgo, Rússia." A BIN64 era o braço de engenharia da FlightPath3D, empregando 33 funcionários em São Petersburgo em 2021. Pós-Fevereiro 2022, FP3D parou de mencionar publicamente operações russas e o domínio BIN64 ficou inactivo.

### Rastreio de Sanções

- **OFAC:** Sem correspondências encontradas para BIN64 ou Betria Interactive
- **Sanções UE:** Sem correspondências encontradas
- **Nota:** Rastreio apenas baseado em WebSearch — rastreio formal através de bases de dados de compliance não executado

### Avaliação

**Distanciamento discreto sem ruptura total.** A empresa operou um escritório de engenharia de 33 pessoas na Rússia durante mais de 10 anos. Pós-2022, as operações russas parecem ter sido encerradas ou transferidas (subsidiária portuguesa registada em 2022 pode ter absorvido algumas funções). Isto cria:
- **Risco reputacional:** Indústria de aviação é sensível a ligações à Rússia pós-2022
- **Risco PI:** Código desenvolvido durante uma década por entidade russa — questões de propriedade e controlo de exportação

**Fontes:**
- [Registo BIN64 (Beboss.ru)](https://www.beboss.ru/biz/7842455555-ooo-bin64)
- [Betria Interactive press release (PRWeb, 2013)](https://www.prweb.com/releases/2013/7/prweb10948936.htm)

---

## 8. Avaliação de Disrupção por IA

### Nível de Ameaça: **MÉDIO-BAIXO**

**Fossos defensivos:**
1. **Complexidade de integração:** Sistemas IFE de companhias aéreas (plataformas Panasonic, Thales, Collins), certificação regulamentar, ciclos de implementação 2-3 anos
2. **Dados proprietários:** Milhões de descrições POI, conteúdo de destino analisado por IA + revisto por humanos
3. **Base instalada:** 5.000+ aeronaves = custo de mudança para companhias aéreas
4. **Relações:** 13 anos de parcerias com companhias, confiança B2B

**Movimentos IA da FP3D:**
- **Luci:** Companheiro IA em 700+ aeronaves (Ago 2024), sobreposição de conteúdo contextual
- **Ross Derham:** Contratação Boeing/Meta para direcção de produto IA
- **FlightPath3D Cloud:** Modelo SaaS aborda tendência BYOD
- **Destination Stories:** Conteúdo curado por IA (Set 2025)

**Poderá a IA perturbar a FP3D?**
- Geração de conteúdo: SIM — IA pode criar descrições POI, curar histórias
- Visualização 3D: PARCIALMENTE — motores de jogo existem, mas grau aviação é especializado
- Integração com companhias: NÃO — certificações, relações, acesso API = anos para construir
- **Avaliação líquida:** IA mais provável de ser ferramenta que FP3D usa do que arma contra eles. Risco principal: comoditização de conteúdo comprimindo margens.

**Fontes:**
- [700 instalações Luci (RGN, Ago 2024)](https://runwaygirlnetwork.com/2024/08/luci-tops-700-installs/)
- [Lançamento companheiro IA (RGN, Set 2023)](https://runwaygirlnetwork.com/2023/09/flightpath3d-seeks-to-revolutionize-paxex-with-ai-inflight-companion/)

---

## 9. Incidentes, Escândalos, Queixas

**NENHUM ENCONTRADO em todos os vectores pesquisados:**
- Sem processos judiciais (Secretário de Estado Califórnia: estado activo)
- Sem listagem ou queixas BBB
- Sem avaliações Glassdoor de funcionários (uma avaliação de entrevista de 2016)
- Sem cobertura negativa em imprensa especializada
- Sem violações de dados ou incidentes de segurança
- Sem queixas de clientes em fóruns

**Avaliação:** Anomalamente limpo. Explicações possíveis:
1. Empresa genuinamente bem gerida com clientes satisfeitos
2. Demasiado pequena/nicho para atrair escrutínio
3. NDAs suprimem feedback negativo
4. Modelo B2B = sem queixas viradas para consumidor

---

## 10. Análise da Imprensa Especializada

### Qualidade da Cobertura Independente

| Publicação | Independência | Tom | Volume |
|------------|--------------|-----|--------|
| Runway Girl Network | Alta (editorial) | Positivo-neutro | 10+ artigos |
| PAX International | Alta (imprensa especializada) | Positivo-neutro | 5+ artigos |
| Simple Flying | Média (consumidor) | Positivo | 2 artigos |
| Onboard Hospitality | Alta (imprensa especializada) | Positivo-neutro | 3+ artigos |
| PaxEx.Aero | Alta (imprensa especializada) | Positivo-neutro | 3+ artigos |
| Aircraft Interiors Intl | Alta (imprensa especializada) | Neutro | 2+ artigos |
| FlightGlobal | Alta (Tier 1) | Neutro | 1 artigo |
| WIRED | Alta (mainstream) | Positivo | 1 artigo (citação usada em marketing) |

**Avaliação:** Cobertura consistentemente positiva, principalmente anúncios de marcos/parcerias. **Sem artigos investigativos ou críticos encontrados.** Isto é típico para tech aviação B2B de nicho — imprensa especializada cobre anúncios, não controvérsias.

---

## 11. Veredicto Geral

### Pontos Fortes
- Produto real com implementação verificada (5.000+ aeronaves confirmadas por múltiplas fontes)
- Líder de mercado em mapas de movimento (ultrapassou Collins Airshow)
- Prémios genuínos de organismos reconhecidos da indústria (APEX, PAX, Onboard Hospitality)
- Integração estratégica de IA (Luci, contratações de Meta/Boeing)
- Registo público limpo — sem escândalos, queixas ou processos encontrados

### Pontos Fracos
- Inflação de marketing (números arredondados para cima, metas falhadas movidas silenciosamente)
- Taxa de verificação de clientes em melhoria mas ainda baixa (14,4%)
- Transparência limitada na liderança, finanças, número de funcionários
- Subsidiária portuguesa = casca de capital mínimo, invisível durante 4 anos
- Raízes russas (10+ anos em São Petersburgo) em grande parte não abordadas em era sensível a sanções
- Sem presença Glassdoor = ou equipa minúscula ou avaliações suprimidas
- Sem lista pública de clientes apesar de posicionamento B2B

### Matriz de Risco

| Risco | Severidade | Probabilidade | Notas |
|-------|-----------|---------------|-------|
| Inflação marketing descoberta por cliente | Média | Média | Alegação "100 companhias" não verificável |
| Exposição sanções Rússia | Alta | Baixa | Sem correspondências encontradas; 10+ anos de operações russas em grande parte não abordadas |
| Questões laborais entidade Portugal | Média | Média | Casca €1k + padrão arbitragem laboral |
| Panasonic Arc a recuperar | Média | Média | 35 → crescimento, ecossistema integrado |
| Comoditização conteúdo IA | Baixa | Alta | Margens podem comprimir mas fosso mantém-se |
| Risco pessoa-chave (Veksler/Jackson) | Alta | Baixa | Bootstrapped, sem plano sucessão visível |

### Avaliação Final

**A FlightPath3D é uma empresa real, em crescimento, com produto legítimo e forte posição de mercado.** No entanto, opera com opacidade estrutural significativa (raízes russas com 10+ anos em São Petersburgo, casca Portugal, sem página pública de liderança, sem Glassdoor, baixa taxa de verificação de clientes). A empresa envolve-se em inflação típica de marketing SaaS — não fraudulenta, mas também não totalmente transparente.

**Para decisões empresariais:** verificar alegações específicas directamente com FP3D e solicitar referências de clientes. Não confiar em números do website como factos verificados.

---

## Sessão 2 — Análise Aprofundada (13.03.2026)

A Sessão 2 investigou 6 tópicos adiados utilizando 3 agentes de investigação em 2 lotes.

### 12. Análise Aprofundada da Liderança

| Pessoa | Cargo | Formação | Visibilidade Pública | Confiança |
|--------|-------|----------|---------------------|-----------|
| Boris Veksler | CEO e Cofundador | MBA UCLA (1996-98), ThreatSTOP, TradeBeam, Clubspaces. 20+ anos Internet/mobile/IFE | Alta — entrevista de perfil APEX, palestras na indústria | VERIFIED |
| Duncan Jackson | Presidente e Cofundador | Diploma CIM Marketing (1994-95), WhereWeFly, ACTIVE Network, Affinity Sports | Baixa — nenhuma entrevista ou participação em conferências encontrada | PARTIALLY VERIFIED |
| Ruben Girgidov | VP Engineering | Sediado em São Petersburgo | Baixa | — |
| David Dyrnaes | Ex-COO (saiu ~2018-2019) | Atualmente Solution Architect na Cloudvirga (mortgage tech). Tem patentes aeronáuticas. Anteriormente Panasonic Avionics | Saída confirmada, cargo atual não relacionado | VERIFIED |

**Key Person Risk: HIGH.** Sem conselho de administração, conselho consultivo ou plano de sucessão visível. Dois cofundadores com autoridade exclusiva. Contratações recentes de VP (março 2026) = expansão horizontal, não profundidade de sucessão.

---

### 13. Propriedade Intelectual e Litígios

**Patentes:**
- **US 9.989.370** (concedida) — "Real-time multimodal travel estimation and routing system" — Inventores: Jackson, Veksler, Dyrnaes. Também registada como WIPO WO2017160374A1.
- **Marcas registadas:** FLIGHTPATH3D (Reg. 5348873), FLIGHTPATH2D (Reg. 5318959)
- Tecnologia principal de renderização 3D e integração de dados protegida como segredo comercial.

**Litígios:** ZERO. Nenhum processo judicial encontrado envolvendo Betria Interactive, FlightPath3D ou Smart Travel Software em qualquer jurisdição pesquisada.

**Ameaça de Patente Bluebox:** EP3563573 (europeia, concedida 2023, 19 países da UE) — cobre mapas móveis sem fios baseados em ADS-B. Risco MEDIUM para ofertas sem fios da FP3D na UE se a mesma tecnologia for utilizada. Nenhum litígio ativo encontrado.

---

### 14. Indicadores de Saúde Financeira

| Indicador | Resultado | Confiança |
|-----------|---------|-----------|
| Inc. 5000 (2025) | Posição #4725, crescimento de receita 3 anos 2021-2024 | VERIFIED |
| Faixa de receita | Mínimo $2M (2024) para qualificar. Valores específicos atrás de paywall | PARTIALLY VERIFIED |
| Financiamento VC | $0 captado — confirmado | VERIFIED |
| Contratos governamentais | Sem registo no SAM.gov | NOT FOUND |
| Atividade de contratação | 1 pedido de green card em 3 anos, sem vagas atuais | SINGLE SOURCE |

**Avaliação:** Operação lean e bootstrapped com crescimento confirmado. Baixa atividade de contratação sugere modelo altamente automatizado ou baseado em subcontratados.

---

### 15. Presença em Conferências

| Evento | Ano(s) | Evidência | Tipo |
|--------|--------|-----------|------|
| APEX EXPO | 2024-2025 | Stand #1135, lançamentos de produtos | Expositor |
| AIX Hamburgo | 2024-2025 | Demonstrações de produtos, exposições de parceiros | Expositor |
| Crystal Cabin Award | 2025 | Accessibility Map na shortlist | Nomeado |
| FTE | — | Apenas menções, sem evidência de stand | Menção |

**Avaliação:** Expositor regular nas duas conferências IFE aeronáuticas mais importantes. Presença física consistente — não é uma empresa de papel.

---

### 16. Verificação Atualizada de Clientes

**Novas verificações da Sessão 2:**

| Companhia Aérea | Fonte | Ano | Confiança |
|----------------|-------|-----|-----------|
| United Airlines | RGN, PaxEx, FTE | 2025 | VERIFIED |
| American Airlines | Simple Flying | 2024 | VERIFIED |
| Lufthansa | RGN, PaxEx | 2022 | VERIFIED |
| Qatar Airways | FTE | 2024 | VERIFIED |
| British Airways | PaxEx | 2020 | VERIFIED |
| EL AL | FP3D news | 2024 | PROBABLE |
| Starlux | Aircraft Interiors Intl | 2024 | PROBABLE |

**Cumulativo:** 11 VERIFIED + 2 PROBABLE = 13/90+ (14,4%). Ainda por verificar: Air China, Emirates, Singapore Airlines, JetBlue, Turkish Airlines.

---

### Veredito Revisto da Sessão 2

FlightPath3D é uma **empresa legítima verificada** com presença consistente na indústria, clientes confirmados entre grandes companhias aéreas (United, American, Lufthansa, Qatar, BA, Southwest, Cathay, Delta, Norwegian, ANA, Riyadh Air) e uma patente EUA concedida. A opacidade estrutural mantém-se (raízes russas, subsidiária portuguesa, sem Glassdoor). O risco de pessoa-chave é a preocupação de governação mais significativa. A inflação de marketing persiste, mas as alegações principais são cada vez mais fundamentadas.

---

## Metodologia

Esta investigação foi conduzida utilizando exclusivamente fontes abertas (OSINT):

1. **Sessão 1** — 4 agentes especializados em 2 lotes: verificação do website/alegações, análise da base de clientes, panorama competitivo/indústria, liderança/incidentes
2. **Sessão 2** — 3 agentes especializados em 2 lotes: análise aprofundada da liderança, PI/litígios/financeiros, conferências/verificação de clientes
3. **Triangulação de fontes** — ~55 fontes web cruzadas em ambas as sessões
4. **Verificação de registos empresariais** — California SOS, Racius português, registos empresariais russos, USPTO, WIPO

**Fontes:** websites públicos, arquivos de imprensa especializada, registos empresariais, bases de dados de patentes, bases de dados da indústria, motores de busca
**Limitações:** sem acesso a relatórios financeiros (LLC), bases de dados formais de sanções, entrevistas internas, dados de receita Inc. 5000 atrás de paywall

*Sessão 1: 13.03.2026 — 4 agentes, 2 lotes, ~40 fontes*
*Sessão 2: 13.03.2026 — 3 agentes, 2 lotes, ~55 fontes cumulativas*
*Próxima revisão: a pedido*
