# CLAUDE.md — Instruções para o Claude Code

Este arquivo orienta o Claude Code sobre como trabalhar neste projeto.

---

## Contexto do projeto

Este é o **Painel Interativo de Comunicação Institucional** da Prefeitura Municipal de Cataguases (MG), voltado ao processo de Modernização Administrativa. O público-alvo são servidores públicos municipais, vereadores e cidadãos.

O projeto atual é um **arquivo HTML único** (`index.html`) com CSS e JavaScript inline. O objetivo ao trabalhar com o Claude Code é **refatorar progressivamente** esse arquivo em uma estrutura de projeto organizada, mantendo zero dependências externas por padrão.

---

## Regras absolutas — nunca quebre estas

1. **Nunca use template literals com dados dentro de strings que geram HTML** — esse foi o bug central do projeto. Todo conteúdo dinâmico deve ser gerado via `document.createElement` + `textContent`. Jamais use `.innerHTML` com dados variáveis.

2. **Zero dependências externas por padrão** — o sistema precisa funcionar offline e em ambientes sem CDN. Se adicionar uma biblioteca, ela deve ser copiada localmente para `public/libs/`.

3. **Compatibilidade ES5** — o JavaScript deve funcionar sem transpilação. Use `var`, `function`, closures clássicas. Não use arrow functions, `const/let`, spread, destructuring ou async/await no código principal.

4. **Conteúdo institucional é sensível** — não altere dados, valores financeiros, referências legais ou nomes de servidores sem instrução explícita. Preserve a exatidão factual de todos os 17 achados de auditoria.

5. **Design Apple-first** — mantenha o sistema visual: fonte `-apple-system`, raios de borda 10–12px, paleta neutra com acentos azul `#0071e3` e fundo sidebar `#1c1c1e`. Não introduza gradientes, sombras fortes ou elementos decorativos.

---

## Arquitetura atual

O projeto está em **fase de refatoração**. O estado atual é:

```
index.html          ← arquivo único com tudo inline (CSS + JS + HTML)
```

O estado-alvo é:

```
index.html          ← estrutura HTML limpa, sem estilos ou scripts inline
src/
  styles/           ← CSS separado por responsabilidade
  data/             ← dados separados dos componentes
  components/       ← funções de renderização por componente
```

### Prioridade de refatoração

1. Extrair CSS inline → `src/styles/`
2. Extrair arrays de dados → `src/data/`
3. Extrair funções de renderização → `src/components/`
4. O `index.html` final deve ter apenas estrutura semântica e imports

---

## Padrões de código

### JavaScript — como escrever componentes

```javascript
// CORRETO — criar elementos via DOM
function renderCard(title, description) {
  var wrapper = document.createElement('div');
  wrapper.className = 'card';

  var t = document.createElement('div');
  t.className = 'card-t';
  t.textContent = title;

  var d = document.createElement('div');
  d.className = 'card-d';
  d.textContent = description;

  wrapper.appendChild(t);
  wrapper.appendChild(d);
  return wrapper;
}

// ERRADO — nunca faça isso
function renderCard(title, description) {
  return '<div class="card"><div class="card-t">' + title + '</div></div>';
}

// ERRADO — nunca faça isso com template literals e dados
container.innerHTML = items.map(function(item) {
  return '<div>' + item.name + '</div>';
}).join('');
```

### Event listeners com índice em loop

```javascript
// CORRETO — closure para capturar o índice
items.forEach(function(item, i) {
  btn.onclick = (function(idx) {
    return function() { toggle(idx); };
  })(i);
});

// ERRADO — captura errada de i
items.forEach(function(item, i) {
  btn.onclick = function() { toggle(i); }; // sempre usa o i final
});
```

### CSS — variáveis e tokens

Sempre usar variáveis CSS do design system antes de valores hardcoded:

```css
/* CORRETO */
color: var(--color-text-primary);
background: var(--color-background-secondary);
border: 0.5px solid var(--color-border-tertiary);

/* ERRADO — só use hardcoded para cores do brand */
color: #333;
background: #f5f5f5;
```

Exceções permitidas para hardcoded (cores do brand da prefeitura):
- `#0071e3` — azul Apple / acento principal
- `#1c1c1e` — fundo sidebar (macOS dark)
- `#2d9d57` — verde sucesso
- `#e8453c` — vermelho perigo
- `#bf8600` — âmbar atenção
- `#6e6ce3` — roxo informação

---

## Estrutura de dados esperada

### Formato de um módulo

```javascript
var MODULOS = [
  {
    id: 0,
    num: '01',
    label: 'Diagnóstico e auditoria',
    color: '#e8453c',
    badge: '17',
    group: 'Contexto',
    titulo: 'Diagnóstico e auditoria INTEC 2024',
    subtitulo: 'O Instituto INTEC realizou auditoria...',
    chips: [
      { label: 'Auditoria INTEC 2024', style: 'pill-r' },
      { label: '17 achados', style: 'pill-w' }
    ]
  }
];
```

### Formato de um achado de auditoria

```javascript
var ACHADOS = [
  {
    num: '1',
    titulo: 'FGTS irregular',
    descricao: 'Prejuízo R$ 5,1 mi ao erário',
    gravidade: 'd',   // 'd' = danger, 'w' = warning
    valor: 5126502.98,
    lei: 'Art. 37, II, CF/88'
  }
];
```

### Formato de uma pergunta FAQ

```javascript
var FAQ = [
  {
    pergunta: 'Serei obrigado a virar estatutário?',
    resposta: 'Não. A migração é completamente voluntária...',
    fundamento: 'Lei Federal nº 8.112/1990, arts. 241–243.'
  }
];
```

---

## Funcionalidades prioritárias para implementar

### 1. Responsividade mobile (FEAT-001 / BUG-001)

A sidebar deve colapsar em viewports < 768px. Implementar:
- Botão hambúrguer no header mobile
- Sidebar como drawer com overlay
- Swipe para fechar (opcional)

```css
@media (max-width: 768px) {
  .app { flex-direction: column; }
  .sb { width: 100%; height: auto; }
  /* ou sidebar como drawer absoluto */
}
```

### 2. Navegação por URL hash (FEAT-004)

Permitir links diretos para módulos:

```javascript
// Ao carregar
window.addEventListener('load', function() {
  var hash = window.location.hash;
  if (hash) {
    var idx = parseInt(hash.replace('#modulo-', '')) - 1;
    if (!isNaN(idx)) go(idx);
  }
});

// Ao navegar
function go(i) {
  window.location.hash = 'modulo-' + (i + 1);
  // ... resto da função
}
```

### 3. Calculadora interativa de FGTS (FEAT-009)

Módulo 06 deve ter calculadora com:
- Slider: saldo atual do FGTS (R$ 10.000 — R$ 200.000)
- Slider: anos projetados (1–20)
- Output: valor ao final com FGTS vs 100% CDI
- Gráfico de barras atualizado em tempo real

### 4. Busca global (FEAT-002)

Campo de busca no topo da sidebar que:
- Filtra módulos pelo nome
- Abre o módulo que contém o termo buscado
- Destaca o termo encontrado

---

## Como adicionar um novo módulo

1. Adicionar entrada em `src/data/modulos.js`
2. Adicionar item no sidebar em `src/components/sidebar.js`
3. Criar o painel em `src/components/panels/modulo-XX.js`
4. Registrar no array de inicialização em `src/main.js`
5. Documentar em `docs/MODULES.md`

---

## Conteúdo sensível — não alterar sem instrução

Os seguintes dados devem ser preservados exatamente como estão:

- **17 achados**: números, títulos, valores e classificações
- **Valores financeiros**: R$ 5.126.502,98 (FGTS), R$ 11.065.994,16 (contratos), R$ 1.252.224,62 (ESF)
- **Contagem de servidores**: 2.573 ativos, 1.428 acima da jornada, 171 contratos vencidos
- **Referências legais**: todas as leis, artigos e súmulas citadas
- **Datas**: LC 3.231/2003, LC 3.242/2003, Portaria 109/2026, ADI 2.135 (nov/2024)
- **Nomes institucionais**: Daniel Renault de Castro, José Henriques, INTEC

---

## Testes mínimos antes de qualquer commit

```bash
# 1. Validar HTML
npx html-validate index.html

# 2. Testar acessibilidade básica
npx axe index.html --exit

# 3. Verificar que todos os 12 módulos navegam corretamente
# (manual — clicar em cada item do sidebar)

# 4. Verificar que o FAQ abre e fecha corretamente
# (manual — clicar em cada pergunta)

# 5. Verificar em mobile (DevTools → 375px)
# (manual — inspecionar em viewport mobile)
```

---

## Glossário de termos do domínio

| Termo | Significado |
|-------|-------------|
| CLT | Consolidação das Leis do Trabalho (Decreto-Lei 5.452/1943) |
| Estatuto | Regime Jurídico Único dos servidores públicos |
| PCCV | Plano de Cargos, Carreiras e Vencimentos |
| TAC | Termo de Ajustamento de Conduta (com o MP/MG) |
| FGTS | Fundo de Garantia do Tempo de Serviço |
| RPPS | Regime Próprio de Previdência Social (não adotado em Cataguases) |
| PAD | Processo Administrativo Disciplinar |
| INTEC | Instituto de Pesquisa, Gestão e Tecnologia (auditor contratado) |
| INSS | Instituto Nacional do Seguro Social (regime geral) |
| ADI | Ação Direta de Inconstitucionalidade |
| ADCT | Ato das Disposições Constitucionais Transitórias |
| STF | Supremo Tribunal Federal |
| TST | Tribunal Superior do Trabalho |
| JT | Justiça do Trabalho |
| MP | Ministério Público |
| CEF | Caixa Econômica Federal |
| CDI | Certificado de Depósito Interbancário (referência de rendimento) |
| TR | Taxa Referencial (base de cálculo do FGTS) |
