/* sidebar.js — renderização da navegação lateral */

/**
 * Constrói o sidebar usando MODULOS.
 * Requer: utils.js carregado antes (mk, mkPill).
 * Requer: MODULOS definido em src/data/modulos.js.
 * Requer: função go(idx) definida em panel.js/main.js.
 */
function buildSidebar() {
  var sb = document.getElementById('sidebar');
  if (!sb) return;

  /* Cabeçalho */
  var head = mk('div', 'sb-head');
  var logoRow = mk('div', 'sb-logo-row');

  var icon = mk('div', 'sb-icon');
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z');
  var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  poly.setAttribute('points', '9 22 9 12 15 12 15 22');
  svg.appendChild(path);
  svg.appendChild(poly);
  icon.appendChild(svg);
  logoRow.appendChild(icon);

  var titleWrap = mk('div');
  titleWrap.appendChild(mk('div', 'sb-title', 'Modernização'));
  titleWrap.appendChild(mk('div', 'sb-sub', 'Cataguases · 2026'));
  logoRow.appendChild(titleWrap);
  head.appendChild(logoRow);
  sb.appendChild(head);
  sb.appendChild(mk('div', 'sb-sep'));

  /* Itens agrupados */
  var currentGroup = null;
  MODULOS.forEach(function(mod, i) {
    if (mod.group !== currentGroup) {
      currentGroup = mod.group;
      sb.appendChild(mk('div', 'sb-grp', currentGroup));
    }

    var item = mk('div', 'sb-item' + (i === 0 ? ' on' : ''));
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'Módulo ' + mod.num + ': ' + mod.label);

    var dot = mk('div', 'sb-dot');
    dot.style.background = mod.color;
    dot.textContent = mod.num;
    item.appendChild(dot);

    item.appendChild(mk('div', 'sb-lbl', mod.label));

    if (mod.badge) {
      item.appendChild(mk('div', 'sb-badge', mod.badge));
    }

    item.onclick = (function(idx) {
      return function() { go(idx); };
    })(i);

    sb.appendChild(item);
  });

  /* Rodapé */
  var foot = mk('div', 'sb-foot');
  foot.appendChild(mk('p', '', 'Sec. de Administração'));
  var p2 = mk('p', '', 'Março de 2026');
  p2.style.marginTop = '2px';
  foot.appendChild(p2);
  sb.appendChild(foot);
}
