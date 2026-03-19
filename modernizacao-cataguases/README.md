# Modernização Administrativa — Cataguases/MG

> **Painel interativo de comunicação institucional**  
> Secretaria Municipal de Administração · Prefeitura de Cataguases · 2026

---

## Visão geral

Aplicação web interativa que consolida todas as informações do processo de modernização administrativa da Prefeitura Municipal de Cataguases. O sistema funciona como guia navegável com 12 módulos temáticos, destinado a servidores públicos, vereadores, imprensa e população em geral.

O painel foi concebido para ser utilizado em:
- Reuniões presenciais com servidores (projeção)
- Audiências públicas na Câmara Municipal
- Portal da transparência da prefeitura
- Distribuição via link interno (intranet)
- Aplicativo Cataguases Mais

---

## Stack tecnológica atual

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML5 + CSS3 + JavaScript vanilla (ES5 compatível) |
| Estilo | CSS customizado, design system Apple-inspired |
| Dados | Arrays JavaScript estáticos (inline) |
| Build | Nenhum (arquivo único, zero dependências) |
| Deploy | Qualquer servidor estático ou CDN |

---

## Estrutura do projeto

```
modernizacao-cataguases/
│
├── README.md                  ← este arquivo
├── CLAUDE.md                  ← instruções para o Claude Code
├── index.html                 ← aplicação principal (entry point)
│
├── src/
│   ├── data/
│   │   ├── achados.js         ← 17 achados da auditoria INTEC
│   │   ├── modulos.js         ← metadados dos 12 módulos
│   │   ├── faq.js             ← perguntas frequentes e respostas
│   │   ├── timeline.js        ← cronologia STF/TST/Cataguases
│   │   ├── cronograma.js      ← 6 fases do processo
│   │   └── comparativos.js    ← dados de CLT vs Estatuto e FGTS
│   │
│   ├── components/
│   │   ├── sidebar.js         ← componente de navegação lateral
│   │   ├── panel.js           ← componente de painel de conteúdo
│   │   ├── cards.js           ← cards, KPIs e callouts
│   │   ├── flow.js            ← fluxogramas e timelines
│   │   ├── tables.js          ← tabelas comparativas
│   │   ├── faq.js             ← acordeão de FAQ
│   │   └── charts.js          ← gráficos de barras (FGTS)
│   │
│   └── styles/
│       ├── base.css           ← reset, variáveis CSS, tipografia
│       ├── sidebar.css        ← estilos da navegação lateral
│       ├── panels.css         ← estilos dos painéis de conteúdo
│       ├── components.css     ← cards, callouts, pills, badges
│       ├── tables.css         ← tabelas comparativas
│       └── dark-mode.css      ← suporte a tema escuro
│
├── public/
│   ├── favicon.ico
│   └── logo-cataguases.png    ← logotipo da prefeitura
│
└── docs/
    ├── ARCHITECTURE.md        ← decisões de arquitetura
    ├── CONTENT-GUIDE.md       ← guia de atualização de conteúdo
    ├── MODULES.md             ← documentação de cada módulo
    └── DEPLOY.md              ← instruções de publicação
```

---

## Módulos disponíveis

| # | Módulo | Status | Dados-chave |
|---|--------|--------|-------------|
| 01 | Diagnóstico e auditoria INTEC | Estável | 17 achados, R$ 5,1 mi FGTS, 2.573 servidores |
| 02 | O que é a modernização | Estável | 3 pilares, lista É/NÃO É |
| 03 | O que é o regime CLT | Estável | Vantagens e limitações |
| 04 | O que é o regime estatutário | Estável | Art. 41 CF/88, hipóteses de perda |
| 05 | CLT vs Estatuto | Estável | Tabela comparativa, visão dual |
| 06 | FGTS e rendimento | Estável | Rescisão instrumental, simulação |
| 07 | Plano de Cargos (PCCV) | Estável | Fluxo de carreira |
| 08 | Jornada de 6 horas | Estável | LC 3.231 e 3.242/2003 |
| 09 | Estabilidade | Estável | Art. 41 CF/88, PAD |
| 10 | STF e TST: cronologia | Estável | ADI 2.135, Lei 8.112/1990 |
| 11 | Comissões e cronograma | Estável | Portaria 109/2026, 6 fases |
| 12 | Perguntas frequentes | Estável | 10 FAQs com fundamento |

---

## Problemas conhecidos e backlog de melhorias

### Bugs a corrigir

- [ ] **BUG-001** · Sidebar não fecha em viewport estreito (mobile < 768px)
- [ ] **BUG-002** · Scroll do painel principal não retorna ao topo ao trocar de módulo em alguns browsers
- [ ] **BUG-003** · Tabela comparativa (módulo 05) ultrapassa o container em telas < 600px
- [ ] **BUG-004** · FAQ: clique duplo rápido abre e fecha sem animação suave

### Melhorias de funcionalidade

- [ ] **FEAT-001** · Modo de apresentação: tela cheia com navegação por teclado (setas)
- [ ] **FEAT-002** · Barra de busca global por palavra-chave
- [ ] **FEAT-003** · Botão "imprimir este módulo" com CSS de impressão
- [ ] **FEAT-004** · Compartilhamento de módulo por URL com hash (#modulo-06)
- [ ] **FEAT-005** · Indicador de progresso: módulos já visitados (localStorage)
- [ ] **FEAT-006** · Animação suave na troca de painéis (fade ou slide)
- [ ] **FEAT-007** · Tooltip com definição rápida ao hover em termos jurídicos
- [ ] **FEAT-008** · Modo de leitura simplificada para impressão/acessibilidade
- [ ] **FEAT-009** · Calculadora interativa de FGTS (slider de saldo + anos)
- [ ] **FEAT-010** · Gráfico de linha comparativo FGTS vs CDI interativo (Chart.js)
- [ ] **FEAT-011** · Glossário lateral de termos jurídicos
- [ ] **FEAT-012** · Exportar PDF do módulo atual

### Melhorias de conteúdo

- [ ] **CONT-001** · Adicionar módulo 13: Mitos e verdades (formato fact-check)
- [ ] **CONT-002** · Adicionar módulo 14: O que muda para cada secretaria (por área)
- [ ] **CONT-003** · Atualizar Fase 3 do cronograma com data real quando disponível
- [ ] **CONT-004** · Inserir logotipo oficial da Prefeitura de Cataguases no sidebar
- [ ] **CONT-005** · Adicionar referências completas em formato ABNT no módulo de jurisprudência
- [ ] **CONT-006** · Incluir link para download da Portaria 109/2026 em PDF
- [ ] **CONT-007** · Incluir link para download da NT-SEMAD-001/2026

### Melhorias de design

- [ ] **DESIGN-001** · Responsividade completa para mobile (sidebar colapsável)
- [ ] **DESIGN-002** · Suporte a dark mode via prefers-color-scheme
- [ ] **DESIGN-003** · Micro-animações nos cards ao hover
- [ ] **DESIGN-004** · Skeleton loading nos painéis ao navegar
- [ ] **DESIGN-005** · Aumentar contraste dos textos secundários (WCAG AA)

### Melhorias técnicas

- [ ] **TECH-001** · Separar dados dos componentes (arquivos `src/data/*.js`)
- [ ] **TECH-002** · Criar build com Vite para bundle otimizado
- [ ] **TECH-003** · Adicionar service worker para funcionamento offline
- [ ] **TECH-004** · Implementar testes de acessibilidade (a11y)
- [ ] **TECH-005** · Migrar para Web Components reutilizáveis
- [ ] **TECH-006** · Adicionar metadados Open Graph para compartilhamento social

---

## Como trabalhar com o Claude Code

Ver instruções completas em **CLAUDE.md**.

Comandos rápidos para o Claude Code:

```bash
# Abrir o projeto
cd modernizacao-cataguases

# Servir localmente (qualquer servidor estático serve)
npx serve . -p 3000
# ou
python3 -m http.server 3000

# Verificar HTML
npx html-validate index.html

# Verificar acessibilidade
npx axe index.html
```

---

## Referências legais e documentais

| Documento | Referência |
|-----------|-----------|
| Estatuto atual | Lei nº 52, de 4 de maio de 1951 |
| PCCV geral | Lei Complementar nº 3.023/2001 |
| PCCV educação | Lei Complementar nº 3.024/2001 |
| Jornada 30h — geral | Lei Complementar nº 3.231/2003 |
| Jornada 30h — adm. | Lei Complementar nº 3.242/2003 |
| Comissões | Portaria nº 109/2026 |
| Auditoria | Relatório Final INTEC — Contrato 016/2025 |
| Nota Técnica | NT-SEMAD-001/2026 |
| Referência federal | Lei Federal nº 8.112/1990, arts. 241–243 |
| STF | ADI 2.135 (nov/2024) |
| TST | Súmula nº 51; OJ 163 SDI-1 |
| TAC | Termo de Ajustamento de Conduta — MP/MG |

---

## Responsáveis

| Papel | Nome |
|-------|------|
| Secretário de Administração | Daniel Renault de Castro |
| Auditores INTEC | Dra. Cláudia Oliveira Vilas Boas / Prof. Heleno Rocha dos Santos Junior |
| Prefeito | José Henriques |

---

## Licença

Uso interno — Prefeitura Municipal de Cataguases. Todos os direitos reservados.
