/* flow.js — fluxos, timelines e cronograma */

/**
 * Renderiza uma lista de steps de fluxo com setas entre eles.
 * Requer: utils.js (mkFlowStep, mkArrow).
 * @param {Array}       steps     - array de {titulo, descricao, estilo}
 * @param {HTMLElement} container - onde inserir
 */
function buildFlow(steps, container) {
  steps.forEach(function(s, i) {
    container.appendChild(mkFlowStep(s.titulo, s.descricao, s.estilo));
    if (i < steps.length - 1) container.appendChild(mkArrow());
  });
}

/**
 * Renderiza a timeline (STF/TST/Cataguases).
 * Requer: utils.js (mk, mkPill), TIMELINE de src/data/timeline.js.
 * @param {HTMLElement} container - onde inserir
 */
function buildTimeline(container) {
  TIMELINE.forEach(function(item) {
    var row = mk('div', 'tl-row');

    var dot = mk('div', 'tl-dot tl-' + item.status);
    dot.textContent = item.status === 'ok' ? '✓' : (item.status === 'now' ? '●' : '○');
    row.appendChild(dot);

    var body = mk('div');
    body.style.flex = '1';
    body.style.paddingTop = '4px';

    var tt = mk('div', 'tl-tt', item.titulo);
    var dt = mk('span', 'tl-dt', item.data);
    tt.appendChild(dt);

    if (item.badge) {
      var badge = mkPill(item.badge, 'pill-b');
      badge.style.marginLeft = '6px';
      tt.appendChild(badge);
    }

    body.appendChild(tt);
    body.appendChild(mk('div', 'tl-dd', item.descricao));
    row.appendChild(body);
    container.appendChild(row);
  });
}

/**
 * Renderiza o cronograma das 6 fases.
 * Requer: utils.js (mk), CRONOGRAMA de src/data/cronograma.js.
 * @param {HTMLElement} container - onde inserir
 */
function buildCronograma(container) {
  CRONOGRAMA.forEach(function(item) {
    var row = mk('div', 'tl-row');

    var dotCls = item.status === 'ok' ? 'tl-ok' : (item.status === 'now' ? 'tl-now' : 'tl-pend');
    var dot = mk('div', 'tl-dot ' + dotCls);
    dot.textContent = item.status === 'ok' ? '✓' : (item.status === 'now' ? '●' : '○');
    row.appendChild(dot);

    var body = mk('div');
    body.style.flex = '1';
    body.style.paddingTop = '4px';

    var tt = mk('div', 'tl-tt', item.fase + ' — ' + item.titulo);
    var dt = mk('span', 'tl-dt', item.data);
    tt.appendChild(dt);

    body.appendChild(tt);
    body.appendChild(mk('div', 'tl-dd', item.descricao));
    row.appendChild(body);
    container.appendChild(row);
  });
}
