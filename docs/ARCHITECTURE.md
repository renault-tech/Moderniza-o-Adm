# Arquitetura do sistema

## Decisões de design

### Por que JavaScript vanilla (ES5)?

O sistema precisa funcionar em:
- Computadores da prefeitura com browsers desatualizados (IE11 em alguns casos)
- Ambientes sem conexão com internet (apresentações offline)
- Projetores e smart TVs com browsers embutidos

Portanto, zero transpilação, zero bundlers obrigatórios, zero dependências externas.

### Por que DOM puro em vez de innerHTML?

O bug central da v1 do sistema foi usar `innerHTML` com dados dinâmicos dentro de strings/template literals. O browser recebia o código JavaScript não executado como texto literal e renderizava o código-fonte em vez do conteúdo.

A regra agora é absoluta:
- `element.textContent = valor` para texto
- `element.setAttribute(attr, valor)` para atributos
- `element.appendChild(child)` para estrutura
- **Nunca** `element.innerHTML = string_com_dados`

### Por que o conteúdo é gerado no JavaScript e não no HTML?

Para facilitar a manutenção: alterar um dado (ex.: número de servidores afetados por um achado) requer editar apenas o arquivo de dados `src/data/achados.js`, não vasculhar o HTML.

---

## Fluxo de renderização

```
Carregamento da página
        ↓
DOMContentLoaded dispara
        ↓
init() em main.js
        ↓
buildSidebar() → lê MODULOS[] → cria itens no DOM
        ↓
go(0) → ativa o primeiro módulo
        ↓
renderPanel(0) → chama a função de render do módulo
        ↓
buildAchados(), buildFAQ(), buildTimeline() etc.
        ↓
Evento click no sidebar → go(i) → renderPanel(i)
```

---

## Convenções de nomenclatura

### Classes CSS
- `.sb-*` — sidebar
- `.pnl` — painel principal
- `.ph` — panel header
- `.pbody` — panel body
- `.kpi` — metric card (Key Performance Indicator)
- `.ach` — item de achado de auditoria
- `.tl-*` — timeline
- `.faq-*` — FAQ accordion
- `.vs-*` — comparativo visual (versus)
- `.bar-*` — gráfico de barras

### Funções JavaScript
- `go(i)` — navegar para o módulo i
- `render*(container, data)` — renderizar componente no container
- `mk*(...)` — criar e retornar um elemento DOM
- `build*()` — construir seção completa de um painel
- `toggle*(i)` — alternar estado de um elemento (ex: FAQ)

### Arquivos de dados
Cada arquivo exporta uma ou mais variáveis em `ALL_CAPS_SNAKE_CASE`:
- `ACHADOS` — array de objetos
- `FAQ` — array de objetos
- `TIMELINE` — array de objetos
- `CRONOGRAMA` — array de objetos
- `COMPARATIVO_REGIMES` — objeto com sub-arrays

---

## Módulos e suas dependências de dados

| Módulo | Arquivo de dados | Componentes usados |
|--------|-----------------|-------------------|
| 01 — Diagnóstico | `achados.js` | KPIs, AchadosGrid, Cards |
| 02 — Modernização | `modulos.js` | ProsCons, PilaresGrid |
| 03 — CLT | `comparativos.js` | ProsCons, Callout |
| 04 — Estatuto | `comparativos.js` | ProsCons, Callout, CardGrid |
| 05 — CLT vs Estatuto | `comparativos.js` | VSBox, Table |
| 06 — FGTS | `comparativos.js` | Flow, BarChart, Callout |
| 07 — PCCV | embutido | ProsCons, Flow, Cards |
| 08 — Jornada | embutido | Cards, Table, Callouts |
| 09 — Estabilidade | embutido | VSBox, CardGrid, Callout |
| 10 — STF/TST | `timeline.js` | Timeline |
| 11 — Comissões | `cronograma.js` | Flow, Timeline |
| 12 — FAQ | `faq.js` | FAQAccordion |

---

## Guia de performance

O sistema é leve por design. Manter assim:

- Não carregar fontes externas (usar `-apple-system`)
- Não carregar imagens (usar SVG ou CSS shapes)
- Não usar CSS transitions longas (máximo 150ms)
- Não usar `setInterval` ou polling
- Lazy-render: só construir o DOM de um painel quando ele for ativado pela primeira vez

---

## Acessibilidade (mínimo)

- Todos os botões interativos devem ter `aria-label` descritivo
- FAQ deve usar `aria-expanded` para indicar estado
- Navegação por teclado: Tab para sidebar, Enter para ativar módulo
- Contraste mínimo WCAG AA para todos os textos
