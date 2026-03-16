---
title: "Caso OSINT: Reconstrução de Carreira de Programador a Partir da Pegada Digital"
description: "Caso OSINT: reconstruir 15 anos de carreira de programador via GitHub e blog técnico. Demonstração metodológica com dados redigidos."
date: 2026-03-11
slug: "osint-career-reconstruction-case"
status: partially_verified
confidence: high
tags: ["osint", "due-diligence", "methodology", "career-reconstruction", "fintech", "case-study"]
categories: ["investigation"]
sources_count: 5
investigation_id: "INV-035"
investigation_type: dossier
methodology_disclosed: true
methodology_ref: "osint-verification"
reviewed_by: "FolkUp Editorial Board"
review_date: "2026-03-12"
pii_reviewed: true
summary: "Caso metodológico: como reconstruir a trajetória profissional de um programador a partir de dados abertos (GitHub, blog técnico). Todos os dados pessoais do sujeito foram redigidos. Demonstração de técnicas OSINT sem revelar a identidade."
---

{{< investigation-meta >}}

{{< disclaimer type="pii" text="**Aviso sobre Dados Pessoais.** Todos os identificadores pessoais neste documento foram redigidos (ocultados). Este material é uma demonstração de metodologia OSINT utilizando dados reais (mas anonimizados). Se acredita ser o sujeito desta investigação e deseja exercer os seus direitos ao abrigo do RGPD (acesso, apagamento, oposição), contacte-nos: **privacy@folkup.app**" >}}

{{< disclaimer type="osint-ethics" >}}

---

> **Resumo INV-035.** Reconstrução de carreira de um engenheiro de software europeu exclusivamente a partir de fontes abertas (GitHub API, blog técnico). Analisados: ~20 repositórios públicos, 8 artigos, ~300 comentários. Identificados 4 períodos de carreira (~15 anos): protocolos de rede (programação funcional) → enterprise Java → fintech/bases de dados colunares → programação de sistemas (Rust, C, asm). Nível profissional: Principal/Staff Engineer (decil superior fintech). Avaliação OPSEC: ALTA — minimização deliberada de divulgação pessoal. Ligação a grande organização financeira: MUITO ALTA (circunstancial). Red flags: nenhuma. Todos os identificadores pessoais redigidos — esta é uma demonstração de metodologia, não uma exposição.
>
> *Painel de investigação: CyberGonzo (perfilagem OSINT), Alpha+Beta (verificação adversarial)*

---

## Sujeito da Investigação

**Blog técnico:** {{< redacted len="24" >}}
**GitHub:** {{< redacted len="22" >}}
**Localização:** Europa (confirmado via GitHub API)
**Data da investigação:** 2026
**Tipo:** Auditoria OSINT de autor por pedido de cliente

> **Nota metodológica:** A reconstrução de carreira baseia-se na análise de atividade pública (GitHub, blog técnico). Ligações a empregadores específicos são hipóteses com níveis de confiança indicados, não factos confirmados. Todos os dados foram obtidos de fontes abertas. Identificadores pessoais foram redigidos para proteger a privacidade do sujeito.

---

## 1. Identificação

| Campo | Valor | Confiança |
|-------|-------|-----------|
| **Nome real** | {{< redacted len="18" >}} | CONFIRMADO (GitHub API) |
| **Localização** | Europa | CONFIRMADO (GitHub API) |
| **GitHub** | {{< redacted len="24" >}} | CONFIRMADO |
| **Blog técnico** | {{< redacted len="24" >}} | CONFIRMADO |
| **LinkedIn** | Perfil verificado não encontrado | — |
| **Email** | Não divulgado | — |
| **Empresa** | Não divulgada | — |

### Avaliação OPSEC: ALTA

Minimização deliberada de divulgação:
- GitHub: sem bio, sem empresa, sem email, sem blog
- Blog técnico: sem nome, sem empresa, sem localização, sem redes sociais
- LinkedIn: não encontrado (vários homónimos — stacks não correspondem)
- Plataformas profissionais: vazio
- CV/currículo formal: não existe em acesso público
- **Típico de funcionários de corporações financeiras** (NDA + política corporativa)

---

## 2. Blog Técnico — Perfil e Estatísticas

| Métrica | Valor |
|---------|-------|
| **Username** | {{< redacted len="12" >}} |
| **Registo** | 2022 |
| **Última atividade** | 2026 |
| **Artigos** | ~10 |
| **Comentários** | ~300 |
| **Favoritos** | ~350 |
| **Seguidores** | <10 |

---

## 3. GitHub — Repositórios (~20 públicos)

### Fintech / Stack Financeiro

| Repo | Período | Linguagem | Descrição |
|------|---------|-----------|-----------|
| {{< redacted len="10" >}} | anos 2020 | C++ | Fork de linguagem fintech de domínio específico, portado para LLVM moderno + Windows |
| {{< redacted len="10" >}} | anos 2020 | Java | Fork de cliente Java para base de dados colunar, otimização significativa de serialização |
| {{< redacted len="12" >}} | anos 2020 | Java | Fork de IDE para base de dados colunar |

### Programação de Sistemas / Ferramentas

| Repo | Período | Linguagem | Descrição |
|------|---------|-----------|-----------|
| {{< redacted len="8" >}} | anos 2020 | Java | Assembler/disassembler JVM |
| {{< redacted len="6" >}} | anos 2020 | Java | Biblioteca de manipulação de bytecode Java |
| {{< redacted len="8" >}} | anos 2020 | Rust | Extração de áudio de recursos de jogos |
| {{< redacted len="14" >}} | anos 2020 | C | Aplicação GUI nativa |

### Programação Funcional

| Repo | Período | Linguagem | Descrição |
|------|---------|-----------|-----------|
| {{< redacted len="10" >}} | anos 2010 | Funcional | Implementação de protocolo de rede |
| {{< redacted len="16" >}} | anos 2020 | Scheme | Fork de interpretador |
| {{< redacted len="12" >}} | anos 2020 | C | Fork de Lisp mínimo |

### Engenharia Reversa (hobby)

| Repo | Período | Linguagem | Descrição |
|------|---------|-----------|-----------|
| {{< redacted len="16" >}} | anos 2020 | asm | Projeto RE retro computing |
| {{< redacted len="16" >}} | anos 2010-2020 | asm | Outro projeto RE retro computing |

### Enterprise / Outros

| Repo | Ano | Linguagem | Descrição |
|------|-----|-----------|-----------|
| {{< redacted len="14" >}} | 2017 | Java | Utilitários de framework enterprise |
| {{< redacted len="14" >}} | 2017 | HTML | Exemplos de framework frontend |
| {{< redacted len="20" >}} | 2019 | — | Treino em análise binária |

---

## 4. Publicações — Análise de Artigos (8 no total)

| # | Tema | Período | Visualizações | Votos | Originalidade |
|---|------|---------|---------------|-------|---------------|
| 1 | Linguagem fintech de domínio específico | 2020s | milhares | positivos | MÉDIA-ALTA |
| 2-5 | Série sobre internos de base de dados (várias partes) | 2020s | milhares | positivos | MÉDIA |
| 6 | RE retro computing, continuação | 2020s | milhares | positivos | ALTA |
| 7 | Ferramentas de programação de sistemas | 2020s | milhares | positivos | ALTA |
| 8 | RE retro computing | 2020s | milhares | positivos | ALTA |

### Avaliação de Originalidade

**ALTA (confirmada pelo GitHub):**
- Artigos de RE — confirmados por repositórios com código de baixo nível
- Artigo sobre ferramentas de sistemas — caso único, altas avaliações da comunidade

**MÉDIA-ALTA:**
- Linguagem fintech de domínio específico — revisão original, fork no GitHub confirma expertise

**MÉDIA (risco: compilação):**
- Série sobre internos de base de dados (várias partes) — análise técnica profunda, mas requer verificação a nível de frase contra documentação oficial

**Veredicto geral:** plágio não detetado. Todos os artigos contêm análise autoral original.

---

## 5. Comentários — Perfil Comportamental

- **Total:** ~300 comentários
- **Tom:** direto, crítico, exigente de evidências
- **Abordagem:** contesta afirmações, não aceita mainstream sem argumentos

### Temas-chave
1. Limitações de modelos generativos na geração de código (cético)
2. Design de linguagens de programação (símbolos vs verbosidade)
3. Segurança de memória em novas linguagens
4. Distinguir "ter requisitos" vs "não introduzir bugs"

### Estilo Característico
- {{< redacted len="30" >}}
- {{< redacted len="20" >}}
- Menciona trabalhar com múltiplas linguagens e ferramentas diariamente

---

## 6. Reconstrução de Carreira

### Período 1: Protocolos de Rede (~anos 2010) | Confiança: ALTA

**Indicadores:** implementação de protocolo de rede em linguagem funcional
**Função provável:** Middle → Senior Software Engineer

### Período 2: Enterprise (~anos 2010 — 2020) | Confiança: MÉDIA-ALTA

**Indicadores:** utilitários de framework enterprise, exemplos de framework frontend, treino em análise binária
**Função provável:** Senior Developer / Technical Lead

### Período 3: Fintech / Bases de Dados Colunares (~anos 2020) | Confiança: MUITO ALTA

**Indicadores:**
- Fork de IDE para base de dados colunar — usado predominantemente em fintech
- Otimização significativa de serialização Java para base de dados colunar
- Fork de linguagem fintech de domínio específico

**Detalhe crítico do README:**
> *{{< redacted len="40" >}}*

Linguagem de insider — conhece os processos internos da organização.

**Função provável:** Senior/Principal Software Engineer

### Período 4: Programação de Sistemas (anos 2020) | Confiança: ALTA

**Indicadores:** assembler JVM, biblioteca de bytecode, ferramentas Rust, interpretadores Scheme/Lisp
**Função provável:** Principal/Staff Engineer, direção R&D

### Stack Tecnológico por Período

| Período | Linguagens | Domínios |
|---------|------------|----------|
| Anos 2010 (início) | Funcional, C | Protocolos de rede, tempo real |
| Anos 2010 (fim) | Java, JavaScript | Enterprise, full-stack |
| Anos 2020 (início) | Java, BD colunar, C++ | Fintech, sistemas de trading |
| Anos 2020 (fim) | Rust, C, asm, Scheme | Programação de sistemas, ferramentas |

---

## 7. Ligação ao Empregador

### Probabilidade de ligação a grande organização financeira: MUITO ALTA (circunstancial)

**A FAVOR (sinais fortes):**
1. Fork de linguagem fintech de domínio específico — especialização restrita
2. Ferramentas de BD colunar — trabalho diário com stack fintech
3. Linguagem no README — conhecimento de processos internos
4. Java + BD colunar + low-latency = stack típico de sistemas de trading

**CONTRA:**
- Sem menções diretas ao empregador no perfil
- Fatores geopolíticos podem ter afetado o emprego

### Hipóteses Alternativas

| Tipo de Empregador | Confiança | Argumento |
|-------------------|-----------|-----------|
| Grande banco de investimento / fintech | ALTA | Linguagem de domínio + BD colunar + linguagem de insider |
| Prop trading / HFT | MÉDIA | BD colunar presente, mas linguagem de domínio improvável |
| Freelance/consultoria | BAIXA | Profundidade de expertise requer full-time |

---

## 8. Avaliação Profissional

### Nível: Principal/Staff Engineer (2026)

**Justificação:**
1. Amplo espectro — desde programação funcional até bytecode JVM e assembly de baixo nível
2. Experiência fintech: bases de dados colunares + linguagens de domínio
3. Contribuições open-source: otimização significativa de serialização, porting para LLVM moderno
4. Multiplataforma: múltiplas toolchains e sistemas operativos
5. Design de linguagens: interpretadores, assembler JVM

### Competências-chave (CV resumido)

**Linguagens:** Java, linguagens funcionais, Rust, C, C++, BD colunar, Python, JavaScript, Scheme, Lisp
**Domínios:** Fintech (sistemas de trading), protocolos de rede, programação de sistemas, engenharia reversa
**Especializações:** JVM internals, bytecode, otimização de performance, sistemas de baixa latência

---

## 9. Pesquisa de CV — Resultados

### CV Público: NÃO ENCONTRADO

### Homónimos Verificados (NÃO CORRESPONDEM)

| Perfil | Plataforma | Correspondência |
|--------|------------|-----------------|
| {{< redacted len="20" >}} | LinkedIn | 40% — stack não corresponde |
| {{< redacted len="22" >}} | ZoomInfo | 10% — especialização diferente |
| {{< redacted len="24" >}} | ZoomInfo | 5% — domínio diferente |

---

## 10. Conclusões

### Perfil
Engenheiro de software altamente qualificado ao nível Principal/Staff com uma combinação rara: programação funcional, enterprise Java, fintech (bases de dados colunares, linguagens de domínio), programação de sistemas (Rust, C, assembler). Decil superior de programadores na indústria fintech.

### Empregador Provável
Grande organização financeira (confiança: ALTA). Possível transição para consultoria/freelance devido a fatores geopolíticos.

### Carácter
Tecnicamente rigoroso, cético do hype da IA, valoriza factos sobre populismo. Um desafiador, não um conformista. Publica raramente mas com alta qualidade.

### RED FLAGS
Nenhuma. Perfil limpo. Estilo de comentário duro — dentro dos limites da discussão construtiva.

### Recomendações de Contacto
- **Funciona:** argumentos tecnicamente fundamentados com evidências
- **Não funciona:** marketing, hype, afirmações sem fundamento, PR fluff

---

## Metodologia

Esta investigação foi conduzida em 3 fases utilizando exclusivamente fontes abertas (OSINT):

1. **Perfilagem** — recolha de dados de perfis públicos (GitHub API, blog técnico)
2. **Análise de conteúdo** — avaliação de artigos, comentários, repositórios
3. **Verificação** — cruzamento de hipóteses com fontes independentes

**Fontes:** perfis públicos, GitHub API, motores de busca, plataformas profissionais
**Limitações:** sem acesso a mensagens privadas, repositórios privados, histórico completo. Perfil LinkedIn não confirmado.

### Porquê os Dados Estão Redigidos

O sujeito desta investigação é um indivíduo privado (não uma figura pública). De acordo com os princípios do RGPD e a nossa [Política Editorial](/pt/about/editorial-policy/), anonimizámos todos os identificadores pessoais preservando o valor metodológico do caso. O objetivo da publicação é demonstrar metodologia OSINT, não revelar a identidade do sujeito.

Se acredita ser o sujeito desta investigação, tem direito a:
- **Acesso** aos dados completos processados durante a investigação (RGPD Art. 15)
- **Oposição** ao processamento (RGPD Art. 21)
- **Apagamento** dos dados (RGPD Art. 17)
- **Direito de resposta** — publicaremos o seu comentário sem edição

Contacto: **privacy@folkup.app**
