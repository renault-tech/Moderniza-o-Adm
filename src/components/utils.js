/* utils.js — utilitários compartilhados entre componentes */

/**
 * Cria um elemento DOM com classe e texto opcionais.
 * @param {string} tag   - nome do elemento (div, span, p, etc.)
 * @param {string} [cls] - className opcional
 * @param {string} [txt] - textContent opcional
 */
function mk(tag, cls, txt) {
  var el = document.createElement(tag);
  if (cls) el.className = cls;
  if (txt !== undefined) el.textContent = txt;
  return el;
}

/**
 * Cria um pill/chip de status.
 * @param {string} label  - texto do pill
 * @param {string} cls    - classe CSS (ex: 'pill-r', 'pill-b')
 * @param {string} [style] - estilo inline opcional
 */
function mkPill(label, cls, style) {
  var span = mk('span', 'pill ' + cls, label);
  if (style) span.setAttribute('style', style);
  return span;
}

/**
 * Cria o cabeçalho de um painel (phead).
 * @param {Array}  chips     - array de {label, cls, style}
 * @param {string} titulo    - título h2
 * @param {string} subtitulo - parágrafo descritivo
 */
function mkPhead(chips, titulo, subtitulo) {
  var phead = mk('div', 'phead');
  var top = mk('div', 'phead-top');

  var burger = mk('button', 'burger-menu');
  burger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16" stroke-width="2" stroke-linecap="round"/></svg>';
  burger.onclick = function () {
    var sb = document.getElementById('sidebar');
    var overlay = document.querySelector('.sb-overlay');
    if (sb) sb.classList.add('open');
    if (overlay) overlay.classList.add('open');
  };
  top.appendChild(burger);

  chips.forEach(function (c) {
    top.appendChild(mkPill(c.label, c.cls || '', c.style || null));
  });
  
  var printBtn = mk('button', 'print-btn');
  printBtn.title = 'Imprimir este módulo';
  printBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  printBtn.onclick = function () { window.print(); };
  top.appendChild(printBtn);
  
  phead.appendChild(top);
  phead.appendChild(mk('h2', '', titulo));
  if (subtitulo) phead.appendChild(mk('p', '', subtitulo));
  return phead;
}

/**
 * Cria um container de seção com label e conteúdo.
 * @param {string}      [labelTxt] - texto do sec-label (opcional)
 * @param {HTMLElement} [content]  - elemento filho opcional
 */
function mkSec(labelTxt, content) {
  var div = mk('div');
  if (labelTxt) div.appendChild(mk('div', 'sec-label', labelTxt));
  if (content) div.appendChild(content);
  return div;
}

/**
 * Cria um callout colorido.
 * @param {string} txt  - texto do callout
 * @param {string} tipo - 'i' | 's' | 'w' | 'd'
 * @param {string} [extraStyle] - estilo inline adicional (ex: 'font-size:14px')
 */
function mkCallout(txt, tipo, extraStyle) {
  var div = mk('div', 'hl hl-' + tipo, txt);
  if (extraStyle) div.setAttribute('style', extraStyle);
  return div;
}

/**
 * Cria um item de pros/contras.
 * @param {string}  txt      - texto do item
 * @param {boolean} isGreen  - true = dot verde, false = dot vermelho
 */
function mkProItem(txt, isGreen) {
  var div = mk('div', 'pro-item');
  div.appendChild(mk('div', isGreen ? 'dot-g' : 'dot-r'));
  div.appendChild(mk('span', '', txt));
  return div;
}

/**
 * Cria um bloco de fluxo com título, descrição e estilo.
 * @param {string} titulo   - título do step
 * @param {string} descricao - descrição do step
 * @param {string} cls      - 'gray' | 'blue' | 'green'
 */
function mkFlowStep(titulo, descricao, cls) {
  var div = mk('div', 'flow-step ' + (cls || ''));
  div.appendChild(mk('div', 'flow-step-t', titulo));
  div.appendChild(mk('div', 'flow-step-d', descricao));
  return div;
}

/**
 * Cria uma seta de fluxo (↓).
 */
function mkArrow() {
  return mk('div', 'flow-arrow', '↓');
}

/**
 * Cria um card simples.
 * @param {string} titulo    - título do card
 * @param {string} descricao - descrição do card
 * @param {string} [borderColor] - cor da borda superior (hex)
 * @param {string} [bgColor]     - cor de fundo (hex)
 */
function mkCard(titulo, descricao, borderColor, bgColor) {
  var div = mk('div', 'card');
  if (borderColor) div.style.borderTop = '2px solid ' + borderColor;
  if (bgColor) div.style.background = bgColor;
  div.appendChild(mk('div', 'card-t', titulo));
  div.appendChild(mk('div', 'card-d', descricao));
  return div;
}

/**
 * Remove acentos de uma string, transformando caracteres acentuados em suas versões não acentuadas.
 * @param {string} str - string original
 * @returns {string} string sem acentos
 */
function unaccent(str) {
  if (!str) return '';
  var mapa = {
    'á':'a', 'à':'a', 'ã':'a', 'â':'a', 'ä':'a',
    'é':'e', 'è':'e', 'ê':'e', 'ë':'e',
    'í':'i', 'ì':'i', 'î':'i', 'ï':'i',
    'ó':'o', 'ò':'o', 'õ':'o', 'ô':'o', 'ö':'o',
    'ú':'u', 'ù':'u', 'û':'u', 'ü':'u',
    'ç':'c', 'ñ':'n'
  };
  return str.replace(/[áàãâäéèêëíìîïóòõôöúùûüçñ]/g, function(match) { return mapa[match]; });
}

/**
 * Envolve termos do glossário com spans interativos para os tooltips.
 * @param {HTMLElement} container - O elemento root a ser escaneado.
 */
function applyGlossary(container) {
  if (typeof GLOSSARIO === 'undefined') return;
  
  var terms = GLOSSARIO.slice().sort(function(a, b) { return b.termo.length - a.termo.length; });
  
  var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
  var nodes = [];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  
  nodes.forEach(function(node) {
    if (node.parentNode && (node.parentNode.tagName === 'A' || node.parentNode.tagName === 'H2' || node.parentNode.tagName === 'H3')) return;
    if (node.parentNode && node.parentNode.classList.contains('tooltip')) return;

    var text = node.nodeValue;
    var replaced = false;
    var newHtml = text;

    terms.forEach(function(g) {
      var regex = new RegExp('\\b(' + g.termo + ')\\b', 'gi');
      if (regex.test(newHtml)) {
        replaced = true;
        newHtml = newHtml.replace(regex, '<span class="tooltip" data-tip="' + g.definicao + '">$1</span>');
      }
    });

    if (replaced) {
      var span = document.createElement('span');
      span.innerHTML = newHtml;
      while(span.firstChild) {
        node.parentNode.insertBefore(span.firstChild, node);
      }
      node.parentNode.removeChild(node);
    }
  });
}
