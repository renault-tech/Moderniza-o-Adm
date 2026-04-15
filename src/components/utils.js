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

function mkSvg(viewBox) {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  return svg;
}

function appendSvgPath(svg, d, strokeWidth, lineCap, lineJoin) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  if (strokeWidth) path.setAttribute('stroke-width', strokeWidth);
  if (lineCap) path.setAttribute('stroke-linecap', lineCap);
  if (lineJoin) path.setAttribute('stroke-linejoin', lineJoin);
  svg.appendChild(path);
}

function mkMenuIcon() {
  var svg = mkSvg('0 0 24 24');
  appendSvgPath(svg, 'M4 6h16M4 12h16M4 18h16', '2', 'round', null);
  return svg;
}

function mkPrintIcon() {
  var svg = mkSvg('0 0 24 24');
  appendSvgPath(svg, 'M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z', '2', 'round', 'round');
  return svg;
}

var PANEL_ZOOM_STORAGE_KEY = 'modernizacao_panel_zoom';
var PANEL_ZOOM_MIN = 0.9;
var PANEL_ZOOM_MAX = 1.15;
var PANEL_ZOOM_STEP = 0.05;
var panelZoomValue = 1;

function roundPanelZoom(value) {
  return Math.round(value * 100) / 100;
}

function normalizePanelZoom(value) {
  var num = typeof value === 'number' ? value : parseFloat(value);
  if (isNaN(num)) return 1;
  if (num < PANEL_ZOOM_MIN) num = PANEL_ZOOM_MIN;
  if (num > PANEL_ZOOM_MAX) num = PANEL_ZOOM_MAX;
  return roundPanelZoom(num);
}

function readStoredPanelZoom() {
  try {
    return normalizePanelZoom(localStorage.getItem(PANEL_ZOOM_STORAGE_KEY));
  } catch (e) {
    return 1;
  }
}

function updateZoomControls() {
  var label = Math.round(panelZoomValue * 100) + '%';
  var labels = document.querySelectorAll('.zoom-reset');
  var zoomOutButtons = document.querySelectorAll('.zoom-btn-minus');
  var zoomInButtons = document.querySelectorAll('.zoom-btn-plus');
  var i;

  for (i = 0; i < labels.length; i++) {
    labels[i].textContent = label;
    if (panelZoomValue === 1) {
      labels[i].classList.remove('is-active');
    } else {
      labels[i].classList.add('is-active');
    }
    labels[i].setAttribute('aria-label', 'Tamanho atual ' + label + '. Clique para voltar ao ajuste automático');
  }

  for (i = 0; i < zoomOutButtons.length; i++) {
    zoomOutButtons[i].disabled = panelZoomValue <= PANEL_ZOOM_MIN;
  }

  for (i = 0; i < zoomInButtons.length; i++) {
    zoomInButtons[i].disabled = panelZoomValue >= PANEL_ZOOM_MAX;
  }
}

function applyPanelZoom(value) {
  var panels = document.querySelectorAll('.pnl');
  var normalized = normalizePanelZoom(value);
  var i;

  panelZoomValue = normalized;

  for (i = 0; i < panels.length; i++) {
    if ('zoom' in panels[i].style) {
      panels[i].style.zoom = String(normalized);
      panels[i].style.transform = '';
      panels[i].style.transformOrigin = '';
      panels[i].style.width = '100%';
    } else {
      panels[i].style.zoom = '';
      panels[i].style.transform = normalized === 1 ? '' : 'scale(' + normalized + ')';
      panels[i].style.transformOrigin = normalized === 1 ? '' : 'top left';
      panels[i].style.width = normalized === 1 ? '100%' : (100 / normalized) + '%';
    }
  }

  updateZoomControls();
  return normalized;
}

function setPanelZoom(value) {
  var normalized = applyPanelZoom(value);
  try {
    if (normalized === 1) {
      localStorage.removeItem(PANEL_ZOOM_STORAGE_KEY);
    } else {
      localStorage.setItem(PANEL_ZOOM_STORAGE_KEY, String(normalized));
    }
  } catch (e) {}
  return normalized;
}

function getPanelZoom() {
  return panelZoomValue;
}

function adjustPanelZoom(delta) {
  return setPanelZoom(roundPanelZoom(panelZoomValue + delta));
}

panelZoomValue = readStoredPanelZoom();

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
  burger.type = 'button';
  burger.setAttribute('aria-label', 'Abrir navegacao dos modulos');
  burger.appendChild(mkMenuIcon());
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

  var tools = mk('div', 'phead-tools');

  var zoomOutBtn = mk('button', 'tool-btn zoom-btn zoom-btn-minus', '-');
  zoomOutBtn.type = 'button';
  zoomOutBtn.title = 'Diminuir zoom do modulo';
  zoomOutBtn.setAttribute('aria-label', 'Diminuir zoom do modulo');
  zoomOutBtn.onclick = function () {
    adjustPanelZoom(-PANEL_ZOOM_STEP);
  };
  tools.appendChild(zoomOutBtn);

  var zoomResetBtn = mk('button', 'tool-btn zoom-reset', Math.round(getPanelZoom() * 100) + '%');
  zoomResetBtn.type = 'button';
  zoomResetBtn.title = 'Voltar ao ajuste automatico';
  zoomResetBtn.setAttribute('aria-label', 'Voltar ao ajuste automatico');
  zoomResetBtn.onclick = function () {
    setPanelZoom(1);
  };
  tools.appendChild(zoomResetBtn);

  var zoomInBtn = mk('button', 'tool-btn zoom-btn zoom-btn-plus', '+');
  zoomInBtn.type = 'button';
  zoomInBtn.title = 'Aumentar zoom do modulo';
  zoomInBtn.setAttribute('aria-label', 'Aumentar zoom do modulo');
  zoomInBtn.onclick = function () {
    adjustPanelZoom(PANEL_ZOOM_STEP);
  };
  tools.appendChild(zoomInBtn);

  var printBtn = mk('button', 'print-btn tool-btn');
  printBtn.type = 'button';
  printBtn.title = 'Imprimir este modulo';
  printBtn.setAttribute('aria-label', 'Imprimir este modulo');
  printBtn.appendChild(mkPrintIcon());
  printBtn.onclick = function () {
    window.print();
  };
  tools.appendChild(printBtn);

  top.appendChild(tools);

  phead.appendChild(top);
  phead.appendChild(mk('h2', '', titulo));
  if (subtitulo) phead.appendChild(mk('p', '', subtitulo));
  updateZoomControls();
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
  if (bgColor) {
    div.className += ' card-tint';
    div.style.background = bgColor;
  }
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
  
  var showText = window.NodeFilter ? NodeFilter.SHOW_TEXT : 4;
  var walker = document.createTreeWalker(container, showText, null, false);
  var nodes = [];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  
  nodes.forEach(function(node) {
    if (node.parentNode && (node.parentNode.tagName === 'A' || node.parentNode.tagName === 'H2' || node.parentNode.tagName === 'H3')) return;
    if (node.parentNode && node.parentNode.classList.contains('tooltip')) return;

    wrapGlossaryNode(node, terms);
  });
}

function isGlossaryWordChar(ch) {
  return !!ch && /[A-Za-z0-9À-ÿ]/.test(ch);
}

function findGlossaryMatch(text, start, terms) {
  var lower = text.toLowerCase();
  var best = null;
  var i;

  for (i = 0; i < terms.length; i++) {
    var term = terms[i];
    var label = term.termo || '';
    if (!label) continue;

    var labelLower = label.toLowerCase();
    var idx = lower.indexOf(labelLower, start);
    while (idx !== -1) {
      var before = idx > 0 ? text.charAt(idx - 1) : '';
      var after = text.charAt(idx + label.length);

      if (!isGlossaryWordChar(before) && !isGlossaryWordChar(after)) {
        if (!best || idx < best.index || (idx === best.index && label.length > best.length)) {
          best = {
            index: idx,
            length: label.length,
            definicao: term.definicao || ''
          };
        }
        break;
      }

      idx = lower.indexOf(labelLower, idx + 1);
    }
  }

  return best;
}

function wrapGlossaryNode(node, terms) {
  var text = node.nodeValue;
  var pos = 0;
  var matched = false;
  var frag = document.createDocumentFragment();

  while (pos < text.length) {
    var match = findGlossaryMatch(text, pos, terms);
    if (!match) {
      frag.appendChild(document.createTextNode(text.slice(pos)));
      break;
    }

    if (match.index > pos) {
      frag.appendChild(document.createTextNode(text.slice(pos, match.index)));
    }

    var span = mk('span', 'tooltip', text.substr(match.index, match.length));
    span.setAttribute('data-tip', match.definicao);
    frag.appendChild(span);
    pos = match.index + match.length;
    matched = true;
  }

  if (matched && node.parentNode) {
    node.parentNode.replaceChild(frag, node);
  }
}
