---
title: "FlightPath3D — Disputa Laboral & Estudo de Caso de Simulação Salarial"
date: 2026-03-21
slug: "flightpath3d-labor-case-study"
status: partially_verified
confidence: high
tags: ["labor-law", "salary-simulation", "tax-irregularity", "osint", "portugal", "flightpath3d", "whistleblower"]
categories: ["investigation"]
sources_count: 45
investigation_id: "INV-2026-0321-FP3D-LABOR"
investigation_type: case-study
methodology_disclosed: true
methodology_ref: "osint-verification"
reviewed_by: "FolkUp Editorial Board"
review_date: "2026-03-21"
pii_reviewed: true
pii_reviewed_by: "Editorial Board"
pii_review_date: "2026-03-21"
naming_justified: true
legal_risk: high
summary: "Um estudo de caso documentando um esquema sistemático de simulação salarial na FlightPath3D (Betria Interactive LLC) envolvendo canais duplos de salário, sub-declaração da segurança social e despedimento injustificado de um colaborador residente em Portugal. Aborda estrutura corporativa, análise de provas, caminhos legais e considerações de denunciante."
---

{{< investigation-meta >}}

{{< disclaimer type="legal" >}}

{{< disclaimer type="pii" >}}

{{< disclaimer type="osint-ethics" >}}

---

> **Sumário do Caso.** Este estudo de caso documenta um esquema sistemático de simulação salarial operado pela **FlightPath3D** (nome comercial da Betria Interactive LLC) através da sua subsidiária portuguesa **Smart Travel Software, Unipessoal Lda**. O esquema envolvia o pagamento a colaboradores de um salário declarado inferior ao seu montante contratual, suplementando a diferença através de um canal paralelo offshore via Payoneer — reduzindo efetivamente as contribuições de segurança social e obrigações fiscais. O sujeito, **Arnie K.**, trabalhou para o grupo durante aproximadamente 17 anos antes de ser despedido em outubro de 2024. Esta publicação segue metodologia OSINT utilizando informações publicamente disponíveis e documentos legitimamente na posse do sujeito.
>
> *Para a auditoria OSINT complementar da empresa, consulte: [FlightPath3D — Auditoria OSINT da Empresa]({{< relref "/investigations/flightpath3d-osint-audit" >}})*

---

## 1. Estrutura Corporativa

Para uma análise detalhada da estrutura corporativa da FlightPath3D, consulte a [Auditoria OSINT da Empresa]({{< relref "/investigations/flightpath3d-osint-audit" >}}).

Em resumo, o grupo opera através de entidades interconectadas:

```
Betria Interactive LLC (Califórnia, 2012)
  ├── DBA: FlightPath3D (registo de marca 2017)
  ├── CEO: Boris Veksler — Co-Fundador
  ├── Presidente: Duncan Jackson — Co-Fundador
  │
  ├── Betria Systems, Inc (Califórnia) — entidade de pessoal/PEO
  │
  ├── Smart Travel Software, Unipessoal Lda (Portugal, 2022)
  │   ├── NIF: PT517034948
  │   ├── Capital: €1 (mínimo)
  │   └── Signatário: um representante da empresa ("Diretor de Serviços")
  │
  └── {{< redacted len="10" >}} (Rússia, 2011–~2022)
        └── {{< redacted len="8" >}} — {{< redacted len="6" >}} colaboradores
```

**Prova de velo corporativo** sugere que estas entidades funcionam como uma única empresa: domínio de e-mail partilhado (@flightpath3d.com para todas as entidades), gestão entre entidades (CEO da Betria Interactive assina documentos da Smart Travel), infraestrutura partilhada (git.betria.com, jira.betria.com) e reuniões da empresa misturando colaboradores de todas as entidades.

---

## 2. Histórico de Emprego

### 2.1 17 Anos de Envolvimento Contínuo

A relação profissional de Arnie K. com o grupo Betria/FlightPath3D abrange aproximadamente **17 anos**:

| Período | Entidade | Arranjo | Pagamento |
|---------|----------|---------|-----------|
| ~2008 | ClubSpaces (precursor) | Colaborador fundador | Desconhecido |
| 2007–2015 | Betria Systems | Programador | Numerário (zero documentação) |
| 2015–2022 | {{< redacted len="6" >}} (Rússia) | Colaborador (contrato #32) | Mínimo declarado + suplementos |
| 2016–2022 | Betria Systems/Interactive | Contratado (acordo EUA) | Payoneer USD ($2.100–2.365/mês) |
| 2022–2025 | Smart Travel (Portugal) | Colaborador (contrato permanente) | **€2.800/mês contratual** |
| 2022–2024 | Betria Interactive/Systems | "Contratado" simultâneo | Payoneer EUR (~€1.277/mês) |

A transição de uma entidade para outra não alterou o trabalho real realizado — Arnie K. continuou a trabalhar nos mesmos produtos (mapas interativos FlightPath3D, TripBits), utilizando a mesma infraestrutura, reportando à mesma gestão, participando nas mesmas reuniões da empresa.

### 2.2 Contrato de Trabalho Português

- **Assinado:** 25 de julho de 2022
- **Tipo:** Permanente (CONTRATO DE TRABALHO SEM TERMO)
- **Empregador:** Smart Travel Software, Unipessoal Lda
- **Salário base:** **€2.800/mês**
- **Horário:** Isento de horário de trabalho

Notável: a aplicação NISS (segurança social) foi apresentada em 24 de março de 2022 — **seis meses antes da Smart Travel sequer ser constituída** (8 de junho de 2022). A mudança de Rússia para Portugal foi organizada pelo CEO e um representante de RH.

### 2.3 Canal Duplo de Salário

Oito dias após iniciar na Smart Travel, a conta Payoneer do sujeito foi atualizada para receber pagamentos em EUR. A cronologia:

- **4 de outubro de 2022:** Programa EUR solicitado
- **4 de outubro de 2022:** Programa EUR aprovado (42 minutos depois)
- **9 de janeiro de 2023:** Programa EUR ativado
- **11 de janeiro de 2023:** Primeiro pagamento em EUR — €1.280

De janeiro de 2023 em diante, Arnie K. recebeu dois fluxos de rendimento paralelos pelo mesmo trabalho:

1. **Salário Smart Travel:** €1.200/mês declarados à Segurança Social (de um contrato de €2.800)
2. **Payoneer Betria:** ~€1.277/mês (líquido, verificado por CSV) via transferência offshore

Um formulário W-8BEN (declaração IRS para "serviços pessoais independentes") foi apresentado em 1 de abril de 2023 — tornando o sujeito simultaneamente um **colaborador** (Categoria A) da Smart Travel PT e um **contratado independente** da Betria US pelo mesmo trabalho, mesmo endereço, mesmo NIF.

---

## 3. Alegado Esquema de Simulação Salarial

### 3.1 Como Funcionava

O esquema alegadamente operava entre aproximadamente **17 colaboradores** (identificados através de perfis LinkedIn publicamente disponíveis, abrangendo 9 países; os destinatários efetivos de pagamentos Payoneer não foram independentemente verificados para todos os indivíduos):

1. **Salário contratual:** €2.800/mês (escrito no contrato de trabalho)
2. **Declarado à Segurança Social:** €1.200/mês (o montante efetivamente reportado)
3. **Diferença:** Paga via Payoneer da Betria Interactive/Systems (entidades EUA propriedade do mesmo CEO)
4. **Economia fiscal estimada para empregador:** ~€8.363 **(estimado)** em contribuições SS evitadas apenas para este colaborador

### 3.2 Os Números

**Sub-Declaração de Segurança Social:**

| Ano | Base SS (Declarada) | Contratual | Sub-Declarada |
|-----|-------------------|-----------|---------------|
| 2022 (3 meses) | €4.142,56 | ~€8.400 | -€4.257 |
| 2023 | €19.339,60 | €33.600 | **-€14.260** |
| 2024 | €16.905,60 | €33.600 | **-€16.694** |
| **Total** | **€40.387,76** | **€75.600** | **-€35.212** |

**Pagamentos Payoneer (EUR, Verificados por CSV):**

| Período | Origem | Pagamentos | Total |
|---------|--------|-----------|-------|
| Jan 2023 – Out 2024 | Betria Systems / Interactive | 19 | €27.542,86 |
| Pós-despedimento (2025–2026) | Betria Interactive | 13 | €16.061 |
| Pós-despedimento (2025–2026) | um representante da empresa (pessoal) | 8 | €6.386 |
| **Total EUR** | | **40** | **€49.989,86** |

Adicionalmente, ~$50.900 foram pagos em USD via Payoneer durante 2020–2022 (período pré-Portugal).

### 3.3 Prova de Sistematidade

As provas sugerem que isto não foi um arranjo isolado:
- **~17 colaboradores** em 9 países receberam pagamentos Payoneer da Betria por trabalho realizado sob contratos de trabalho locais
- A ativação de EUR ocorreu 8 dias após o emprego em PT — indicando um esquema pré-planeado, não uma contratação orgânica de contratado
- Comunicações internas (100+ mensagens) referem "оф. часть зп" (parte oficial do salário) — distinguindo explicitamente entre porções declaradas e não declaradas
- Um representante da empresa fez **transferências pessoais** para a conta Payoneer do ex-colaborador, totalizando €6.386 — alegadamente ocultando a natureza corporativa dos pagamentos

---

## 4. Implicações Fiscais

### 4.1 Exposição

O sujeito enfrenta exposição fiscal por rendimento Payoneer não declarado:

| Ano | Payoneer Não Declarado | Est. IRS | Est. SS |
|-----|----------------------|----------|---------|
| 2022 | ~€2.560 | ~€582 | ~€445 |
| 2023 | €16.000 (CSV 10 pagamentos) | ~€3.315 | ~€2.534 |
| 2024 | €11.543 (CSV 9 pagamentos) | ~€2.424 | ~€1.853 |
| **Total** | **~€30.102** | **~€6.321** | **~€4.832** |

**Custo estimado de divulgação voluntária: €12.500–€15.500** (incluindo IRS + SS + penalidades a 12,5% mínimo sob Art. 30 RGIT)

### 4.2 Exposição DAC7

Sob a Directiva 2021/514/UE (DAC7), transposta pela Lei 56/2023, a Payoneer já reportou:
- **Dados 2023** à Autoridade Tributária até 31 de janeiro de 2025
- **Dados 2024** até 31 de janeiro de 2026

Ambos os anos já estão na posse da AT — divulgação voluntária é urgente.

### 4.3 Responsabilidade Empregador vs. Colaborador

A retenção na fonte é a **obrigação do empregador** sob Art. 99 CIRS. A Smart Travel era responsável pela retenção correta de IRS e SS sobre o salário contratual completo de €2.800. A exposição do sujeito é principalmente por rendimento Payoneer não declarado recebido separadamente como pagamentos "contratado".

---

## 5. Despedimento & Acordo de Separação

### 5.1 Padrão de Despedimento

O despedimento seguiu um padrão sistemático documentado em múltiplos ex-colaboradores:

1. **Desconexão de infraestrutura primeiro:** Acesso a todos os sistemas (Git, e-mail, Jira, VPN) revogado antes da notificação
2. **Assinatura no mesmo dia:** Sujeito apresentado com Acordo de Separação no dia do anúncio
3. **Sem aconselhamento legal:** Sujeito não recebeu tempo para consultar um advogado
4. **Choque e pressão:** Assinado sob coação emocional, sem compreender totalmente todas as implicações

O mesmo padrão foi aplicado a outros colaboradores que saíram — era política da empresa, não uma exceção.

### 5.2 Acordo de Separação

- **Assinado:** 4 de outubro de 2024
- **Fundamento:** Art. 349–350 CdT (cessação por mútuo acordo)
- **Término efetivo:** 31 de janeiro de 2025
- **Formato:** Bilingue (Português + Russo), 7 páginas

Cláusulas-chave:
- **Cl. 2.3 (Renúncia Total):** Sujeito renuncia a TODOS os direitos incluindo "diferenças salariais"
- **Cl. 4 (NDA Ilimitado):** Confidencialidade perpétua + não-denigração, sem compensação pela obrigação NDA
- **Cl. 5 (Renúncia ao Tribunal Condicional):** Renúncia do direito de processar, mas **condicional** a "cumprido integralmente pela ENTIDADE EMPREGADORA" (cumprimento total pelo empregador)

### 5.3 Anulabilidade da AS

Múltiplos fundamentos legais suportam o desafio do Acordo de Separação:

| Fundamento | Fundamento Legal | Avaliação |
|-----------|-----------------|-----------|
| Irrenunciabilidade | Art. 12(2) CdT — direitos laborais passados não podem ser renunciados | FORTE |
| Coação moral (duress) | Art. 255–256 CC — assinado sob pressão, sem advogado | FORTE |
| Simulação | Art. 240 CC — AS baseado em €1.200, contrato diz €2.800 | FORTE |
| Renúncia condicional | Cl. 5 — empregador não cumpriu promessas (ver §6.1) | FORTE |
| Irregularidades de assinatura | Art. 256 CP — ver §5.4 abaixo | FORTE (pendente de análise forense) |
| NDA Ilimitado | Sem compensação, termo perpétuo = excessivo | MODERADA |

### 5.4 Irregularidades de Assinatura

O CEO assinou o documento como "5th of OCTOBER, 2024" (formato inglês), enquanto o sujeito assinou "04.10.2024." O documento afirma que foi assinado "em Setúbal" — contudo, **não foi independentemente confirmado se o CEO estava fisicamente presente em Setúbal no momento da assinatura.**

Um representante de RH coletou sistematicamente assinaturas de colaboradores em fundos transparentes (formato PNG) e as inseriu em documentos — esta era prática padrão da empresa, não específica a este caso.

**[NECESSITA ANÁLISE FORENSE]** — avaliação visual apenas. Análise forense de PDF de metadados, camadas e timestamps NÃO foi conduzida.

### 5.5 Alegada Codificação Incorreta da Segurança Social

O empregador apresentou o término à Segurança Social codificando-o como **Art. 400/401 CdT (resignação voluntária)** — quando na realidade o sujeito foi despedido. Isto privou o sujeito de subsídio de desemprego e compensação de rescisão.

---

## 6. Eventos Pós-Despedimento

### 6.1 Promessas Quebradas

No despedimento, o empregador prometeu:
1. Ajuda com renovação de visto/permissão de residência — **NÃO entregue**
2. Carta de recomendação — **NÃO entregue**
3. Emprego fictício para visto se necessário — **NÃO entregue**

O sujeito renovou a permissão de residência sozinho. A categoria de imigração foi **rebaixada** de "Atividade Altamente Qualificada" para residência temporária geral.

### 6.2 Esquema Contínuo

4,5 meses após despedimento, um representante de RH contactado pelo sujeito ofereceu um novo arranjo:

1. **Contrato fictício** — unicamente para gerar recibos para renovação de visto
2. **Sujeito financia próprio "salário"** — deposita numerário, recebe-o de volta em cartão como "salário"
3. **Componente numerário** — "trazer numerário primeiro, vem para o seu cartão"
4. **Colaborador cobre contribuição SS 23,75% do empregador**

**O sujeito recusou.** Esta proposta sugere que o alegado esquema de simulação salarial continuava, não era histórico. O advogado da empresa alegadamente preparou o projeto de contrato fictício.

### 6.3 Pagamentos Pós-Despedimento

Apesar do despedimento, pagamentos Payoneer continuaram:
- **Betria Interactive:** 13 pagamentos, €16.061 (fev 2025 — fev 2026)
- **um representante da empresa (transferências pessoais):** 8 pagamentos, €6.386

Total pós-despedimento: €22.447. Estes incluíram pagamentos por um membro da família também a trabalhar para a empresa, encaminhados através da conta Payoneer do sujeito — forçando o sujeito a declarar e pagar impostos sobre rendimento de outra pessoa.

---

## 7. Panorama de Provas

### 7.1 Categorias de Provas

| Categoria | Itens | Verificação |
|-----------|-------|------------|
| Contratos & Acordos | 6 | Documentos originais |
| Recibos | 9 | Originais formato SENDYS |
| Registos Payoneer | 7+ | Exportações CSV, e-mails verificados DKIM |
| Declarações fiscais | 9 | Governamentais emitidas |
| Registos Segurança Social | 7 | Extratos Segurança Social Direta |
| Extratos bancários | 8+ | Registos banco CGD |
| E-mails (DKIM-verificados) | 8 | Verificação criptográfica |
| Comunicações internas | 35.000+ mensagens | Arquivo de plataforma (1,4 GB) |
| Repositórios Git | 4 repos, 1.803 commits | Posse legítima |
| OSINT (LinkedIn) | 49 capturas de ecrã | Perfis públicos |

### 7.2 Prova Crítica

1. **Contrato de Trabalho** — €2.800/mês por escrito, assinado por um representante da empresa
2. **W-8BEN** — estatuto simultâneo de colaborador + contratado independente, mesmo proprietário — prova disposicional de simulação
3. **CSV Payoneer** — 40 pagamentos EUR totalizando €49.989,86 (trilho de auditoria completo)
4. **Cronologia de Ativação EUR** — canal EUR solicitado 8 dias após emprego em PT = esquema duplo deliberado
5. **Comunicações Internas** — 100+ mensagens documentando "parte oficial do salário" (reconhecimento de salário duplo)
6. **Commits Git** — 1.803 commits em 5+ anos, padrão de trabalho de colaborador (dias úteis 9–19)
7. **Proposta pós-despedimento** — representante de RH propõe contrato fictício + esquema numerário = alegada irregularidade contínua
8. **Acordo de Separação** — irregularidades de assinatura do CEO, documento alega assinatura em Setúbal enquanto CEO estava no exterior [NECESSITA ANÁLISE FORENSE]
9. **Eliminação de e-mail corporativo** — 17 anos de e-mail destruído = supressão de prova
10. **Convites de reunião da empresa** — criptograficamente verificados DKIM/SPF/DMARC, misturando todas as entidades

### 7.3 Cadeia de Custódia

Todas as provas foram recolhidas através de meios legítimos:
- Portátil corporativo voluntariamente devolvido ao sujeito pelo empregador no despedimento
- E-mails da conta de e-mail pessoal do sujeito (DKIM-verificados)
- Registos Payoneer da própria conta do sujeito
- Extratos bancários da própria conta bancária do sujeito
- Dados LinkedIn de perfis publicamente acessíveis
- Repositórios Git clonados durante emprego legítimo

---

## 8. Análise Legal

### 8.1 Prazo de Limitação Padrão Expirou

Art. 337 CdT prevê um prazo de limitação de 1 ano para reclamações laborais — expirou aproximadamente em 1 de fevereiro de 2026 (contado a partir da data de término da AS de 31 de janeiro de 2025).

Contudo, três caminhos legais alternativos permanecem disponíveis:

### 8.2 Caminho 1: Enriquecimento Injustificado (Art. 473–482 CC)

- **Prazo de limitação de 3 anos** a partir do conhecimento — válido até aproximadamente janeiro de 2028
- Empregador enriquecido por ~€35.212 em contribuições SS evitadas + diferenças salariais
- Recuperação esperada: €40.000–52.000
- Avaliação: 60–70% probabilidade de sucesso

### 8.3 Caminho 2: Nulidade por Simulação (Art. 240–243, 286 CC)

- **Sem prazo de limitação** (Art. 286: "a todo o tempo")
- Declaração de salário simulada (€1.200 vs. €2.800 contratual) = nulidade absoluta
- Qualquer parte pode invocar em qualquer momento
- Este é o fundamento legal mais forte

### 8.4 Caminho 3: Adesão Criminal (Art. 104 RGIT + Art. 71 CPP)

- **Prazo de limitação de 10 anos** para alegada fraude tributária qualificada
- Reclamações civis podem-se juntar a processos criminais
- Esquema sistemático em ~17 colaboradores = fator agravante
- Recuperação esperada: até €52.000 + juros

### 8.5 Probabilidade de Acordo

*Nota: Esta secção representa a análise legal pessoal do autor e não faz parte da investigação OSINT.*

Baseado em análise legal adversária (isto não é um parecer jurídico):
- **Probabilidade de ganho do empregador: 15–25%**
- **Probabilidade de acordo: 80%+**
- Intervalo de acordo: €45.000–65.000
- Líquido após divulgação voluntária própria: €30.000–50.000

Alavanca chave de acordo: potencial exposição criminal ao abrigo do Art. 104 RGIT afeta não apenas este caso mas o alegado esquema completo de ~17 colaboradores em múltiplas jurisdições.

### 8.6 Acordo de Separação — Por Que É Inaplicável

1. **Art. 12(2) CdT:** Não se pode renunciar direitos a salário passado não pago
2. **Art. 255–256 CC:** Assinado sob coação sem aconselhamento legal
3. **Art. 240 CC:** AS calculado de €1.200 simulado, não €2.800 contratual
4. **Cláusula 5 condição:** Empregador falhou em cumprir promessas (ajuda com visto, carta de referência)
5. **Art. 256 CP:** Irregularidades de assinatura pendentes de análise forense
6. **Lei 93/2021:** Proteção de denunciante sobrepõe-se a NDA contratual para divulgações de interesse público
7. **Justificação de sobreposição ao NDA:** Esta publicação é justificada ao abrigo da Lei 93/2021 Art. 15 (condições para divulgação pública), que permite divulgação pública quando: (a) canais de reporte interno estão indisponíveis (o autor foi despedido, sem acesso aos canais internos do empregador), e (b) reporte externo a autoridades competentes foi iniciado (divulgação voluntária apresentada à Autoridade Tributária). Adicionalmente, a cláusula NDA (Cl. 4) é discutivelmente nula como não-compensada e de duração ilimitada (Art. 280 CC — objecto contrário à lei)

---

## 9. Avaliação de Risco

### 9.1 Exposição do Empregador

| Risco | Nível | Âmbito |
|------|-------|--------|
| Alegada fraude tributária qualificada (Art. 104 RGIT) | CRÍTICO | ~17 colaboradores, múltiplas jurisdições |
| Penalidades Segurança Social | ELEVADO | €35.212 sub-declarados para apenas um colaborador |
| Rasgamento do véu corporativo | ELEVADO | Prova esmagadora de entidade única |
| Perda de clientes de companhias aéreas | ELEVADO | 90+ companhias aéreas com requisitos de conformidade |
| Reportagem cruzada DAC7 | CRÍTICO | 17 destinatários Payoneer em múltiplas jurisdições |
| Processamento criminal (Art. 103–104 RGIT) | MODERADO-ELEVADO | Alegadas irregularidades documentais [pendente análise forense] |

### 9.2 Considerações de Timing

| Ação | Timing Recomendado |
|-----|-------------------|
| Divulgação voluntária | PRIMEIRO — imediatamente |
| Contratação de advogado | Concorrente com VD |
| Carta de acordo | Após VD apresentada |
| Relatório de denunciante (se acordo falhar) | 30 dias após tentativa de acordo |
| Divulgação pública | ÚLTIMA — após processos legais |

---

## Direito de Resposta

Aos sujeitos desta investigação — incluindo FlightPath3D (Betria Interactive LLC), Boris Veksler e Duncan Jackson — é oferecido o direito de resposta a quaisquer e todas as alegações contidas nesta publicação. Qualquer resposta recebida será publicada como adenda a este estudo de caso, sem edição e na íntegra.

Respostas podem ser submetidas para: **editorial@folkup.app**

---

## 10. Metodologia

{{< methodology-box >}}

Este estudo de caso foi compilado utilizando:

1. **Análise de documentos** — contratos de trabalho, recibos, declarações fiscais, extratos bancários, registos Payoneer (todos da posse legítima do sujeito)
2. **OSINT** — registos da empresa, perfis LinkedIn, registos de domínio, informação corporativa publicamente disponível
3. **Análise forense de e-mail** — verificação de headers de e-mail DKIM/SPF/DMARC
4. **Análise de repositório Git** — histórico de commits e padrões de contribuidor (legitimamente retidos)
5. **Referência cruzada financeira** — rendimento declarado vs. obrigações contratuais vs. pagamentos reais
6. **Consulta de painel de especialistas** — direito laboral, direito fiscal, verificação OSINT, revisão adversária

Verificação de dados e análise foram realizadas utilizando ferramentas OSINT automatizadas e ferramentas automatizadas de processamento de documentos. Todos os afirmações factuais são independentemente originadas e verificadas contra documentos primários.

**Esta publicação não constitui aconselhamento legal.**

{{< /methodology-box >}}

### Proteção de Dados — Teste de Equilíbrio RGPD Art. 6(1)(f)

Esta publicação processa dados pessoais com base no interesse legítimo (RGPD Art. 6(1)(f)):

- **Interesse legítimo:** O interesse do autor em documentar uma disputa laboral na qual é a parte lesada, combinado com o interesse público em expor alegada sub-declaração sistemática de segurança social afetando aproximadamente 17 colaboradores em múltiplas jurisdições
- **Necessidade:** A publicação é necessária porque alternativas menos invasivas foram consideradas e verificadas como insuficientes: (1) arbitragem privada não aborda a natureza multi-colaborador e transfronteiriça do alegado esquema; (2) canais de reporte interno estão indisponíveis (o autor foi despedido); (3) um registo público documentado serve tanto potenciais processos judiciais como o interesse público na transparência empresarial. O nível de dados pessoais divulgados é o mínimo necessário para fundamentar as alegações
- **Equilíbrio:** Os interesses de privacidade dos indivíduos nomeados — Boris Veksler, CEO; Duncan Jackson, Presidente — ambos atuando em capacidade profissional/executiva em empresas publicamente registadas, são superados pelo interesse público. Os indivíduos nomeados detêm autoridade de decisão sobre as práticas documentadas. Figuras não públicas são anonimizadas. Dados financeiros referem-se a práticas empresariais, não a finanças pessoais dos indivíduos nomeados
- **Notificação de sujeitos de dados:** Os sujeitos de dados nomeados serão notificados através do processo de Direito de Resposta (ver acima) antes da publicação, em conformidade com o RGPD Art. 14
- **Salvaguardas:** Auditoria PII independente conduzida, anonimização aplicada a figuras não públicas, direito de resposta oferecido, divulgação voluntária iniciada pelo autor para retificar a sua própria participação

### Justificação de Nomeação — Teste Triplo

Pessoas nomeadas nesta publicação foram avaliadas segundo um teste de três partes:

| Pessoa | Interesse Público | Proporcionalidade | Capacidade Profissional | Resultado |
|--------|-------------------|-------------------|------------------------|-----------|
| Boris Veksler | CEO e co-fundador de empresa empregando ~17 pessoas em múltiplas jurisdições em alegado esquema de simulação salarial | Nomeado apenas em capacidade profissional como decisor | Dirigente publicamente registado (OpenCorporates, LinkedIn, registos de marca USPTO) | APROVADO |
| Duncan Jackson | Presidente e co-fundador, signatário de decisões corporativas | Nomeado apenas em capacidade profissional | Dirigente publicamente registado (OpenCorporates, LinkedIn) | APROVADO |

Todos os outros indivíduos são anonimizados via shortcodes `{{</* redacted */>}}` ou referências baseadas em função ("representante de RH," "representante da empresa").

### Limitações

- Estimativas financeiras são aproximações analíticas, não avaliações vinculativas
- Análise forense do Acordo de Separação NÃO foi conduzida — avaliação visual apenas
- Algumas provas (arquivo de e-mail corporativo, gestão de projeto interna) são mantidas pelo empregador
- O total USD do Payoneer requer uma declaração certificada para uso em tribunal
- A conexão entre o contador pessoal do sujeito e a Smart Travel é [NÃO VERIFICADO]
- O autor reconhece ter sido participante no esquema de salário duplo, beneficiando também de obrigações fiscais pessoais reduzidas durante o período de sub-declaração. Procedimentos de divulgação voluntária estão a ser iniciados para retificar esta situação

---

### Avaliação Global

A prova suporta fortemente a existência de um esquema sistemático de simulação salarial. A estrutura de salário duplo, sub-declaração de segurança social e encaminhamento de pagamento entre entidades indicam evitação fiscal deliberada a nível organizacional. A posição do sujeito como colaborador de 17 anos, combinada com as circunstâncias do despedimento e eventos pós-despedimento, cria um caso convincente tanto para recuperação civil como para potencial ação de denunciante.

| Métrica | Avaliação |
|--------|----------|
| **Força de Prova** | ELEVADA — multi-origem, independentemente verificável, autenticada criptograficamente |
| **Caminhos Legais** | 3 rotas viáveis apesar de expiração de prazo de limitação padrão |
| **Probabilidade de Acordo** | 80%+ com posição de negociação forte |

---

*Autor: Arnie K.*
*Investigation ID: INV-2026-0321-FP3D-LABOR*
*Publicado: [RASCUNHO — AINDA NÃO PUBLICADO]*

{{< disclaimer type="legal" >}}
