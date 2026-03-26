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

  var searchWrap = mk('div');
  searchWrap.style.padding = '0 16px 12px';
  var searchInput = mk('input', 'sb-search');
  searchInput.type = 'text';
  searchInput.placeholder = 'Buscar módulo...';
  searchWrap.appendChild(searchInput);
  sb.appendChild(searchWrap);

  sb.appendChild(mk('div', 'sb-sep'));

  var navList = mk('div', 'sb-nav-list');
  var itemElements = [];
  var groupElements = [];

  /* Itens agrupados */
  var currentGroup = null;
  
  var visitedMods = [];
  try {
    visitedMods = JSON.parse(localStorage.getItem('modulos_visitados') || '[]');
  } catch(e) {}

  MODULOS.forEach(function (mod, i) {
    if (mod.group !== currentGroup) {
      currentGroup = mod.group;
      var grpEl = mk('div', 'sb-grp', currentGroup);
      navList.appendChild(grpEl);
      groupElements.push({ name: currentGroup, el: grpEl, activeCount: 0 });
    }

    var isVisited = visitedMods.indexOf(i) !== -1;
    var item = mk('div', 'sb-item' + (i === 0 ? ' on' : '') + (isVisited ? ' visited' : ''));
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

    item.onclick = (function (idx) {
      return function () { go(idx); };
    })(i);

    itemElements.push({ mod: mod, el: item, grpIdx: groupElements.length - 1 });
    navList.appendChild(item);
  });

  searchInput.oninput = function (e) {
    var term = e.target.value.toLowerCase();
    var termClean = typeof unaccent !== 'undefined' ? unaccent(term) : term;
    
    groupElements.forEach(function (g) { g.activeCount = 0; });

    itemElements.forEach(function (it, idx) {
      var match = true;
      if (termClean) {
        var text = (it.mod.label + ' ' + (it.mod.titulo || '') + ' ' + (it.mod.subtitulo || '')).toLowerCase();
        
        var pnl = document.getElementById('p' + idx);
        if (pnl) {
          text += ' ' + (pnl.textContent || pnl.innerText).toLowerCase();
        }

        var textClean = typeof unaccent !== 'undefined' ? unaccent(text) : text;
        
        if (textClean.indexOf(termClean) === -1) match = false;
      }
      if (match) {
        it.el.style.display = 'flex';
        groupElements[it.grpIdx].activeCount++;
      } else {
        it.el.style.display = 'none';
      }
    });

    groupElements.forEach(function (g) {
      g.el.style.display = g.activeCount > 0 ? 'block' : 'none';
    });
  };

  sb.appendChild(navList);

  /* Rodapé */
  var foot = mk('div', 'sb-foot');
  foot.appendChild(mk('p', '', 'Sec. de Administração'));
  var p2 = mk('p', '', 'Março de 2026');
  p2.style.marginTop = '2px';
  foot.appendChild(p2);
  
  var btnFs = mk('button', 'sb-btn-fs', 'Modo Apresentação');
  btnFs.onclick = function() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(function(e){});
      btnFs.textContent = 'Sair da Apresentação';
    } else {
      document.exitFullscreen();
      btnFs.textContent = 'Modo Apresentação';
    }
  };
  foot.appendChild(btnFs);
  
  sb.appendChild(foot);

  /* Overlay para mobile */
  var overlay = mk('div', 'sb-overlay');
  overlay.onclick = function () {
    sb.classList.remove('open');
    overlay.classList.remove('open');
  };
  if (sb.parentNode) {
    sb.parentNode.insertBefore(overlay, sb);
  } else {
    document.body.appendChild(overlay);
  }
}
