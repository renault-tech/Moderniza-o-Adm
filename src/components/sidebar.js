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

  var searchWrap = mk('div', 'sb-search-wrap');
  var searchInput = mk('input', 'sb-search');
  searchInput.type = 'text';
  searchInput.placeholder = 'Buscar número, título ou tema...';
  var searchMeta = mk('div', 'sb-search-meta', 'Busque por módulo, grupo ou conteúdo do painel');
  searchWrap.appendChild(searchInput);
  searchWrap.appendChild(searchMeta);
  sb.appendChild(searchWrap);

  sb.appendChild(mk('div', 'sb-sep'));

  var navList = mk('div', 'sb-nav-list');
  navList.setAttribute('tabindex', '0');
  navList.setAttribute('aria-label', 'Lista de módulos');
  var itemElements = [];
  var groupElements = [];
  var searchResults = [];
  var searchCursor = -1;
  var currentGroup = null;

  MODULOS.forEach(function (mod, i) {
    if (typeof RENDERERS !== 'undefined' && typeof RENDERERS[i] !== 'function') return;

    if (mod.group !== currentGroup) {
      currentGroup = mod.group;
      var grpEl = mk('div', 'sb-grp', currentGroup);
      navList.appendChild(grpEl);
      groupElements.push({ name: currentGroup, el: grpEl, activeCount: 0 });
    }

    var item = mk('div', 'sb-item' + (i === 0 ? ' on' : ''));
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'Módulo ' + mod.num + ': ' + mod.label);

    var dot = mk('div', 'sb-dot');
    dot.style.background = mod.color;
    dot.textContent = mod.num;
    item.appendChild(dot);

    item.appendChild(mk('div', 'sb-lbl', mod.label));

    item.onclick = (function (idx) {
      return function () { go(idx); };
    })(i);

    itemElements.push({ mod: mod, el: item, grpIdx: groupElements.length - 1 });
    navList.appendChild(item);
  });

  function normalizeSearchText(text) {
    var value = String(text || '').toLowerCase();
    return typeof unaccent !== 'undefined' ? unaccent(value) : value;
  }

  function getItemSearchSource(it, idx) {
    var text = [
      it.mod.num || '',
      it.mod.label || '',
      it.mod.group || '',
      it.mod.titulo || '',
      it.mod.subtitulo || ''
    ].join(' ');
    var pnl = document.getElementById('p' + idx);
    if (pnl) {
      text += ' ' + (pnl.textContent || pnl.innerText || '');
    }
    return normalizeSearchText(text);
  }

  function getItemSearchScore(it, idx, termClean) {
    if (!termClean) return 1;

    var label = normalizeSearchText(it.mod.label || '');
    var title = normalizeSearchText(it.mod.titulo || '');
    var subtitle = normalizeSearchText(it.mod.subtitulo || '');
    var group = normalizeSearchText(it.mod.group || '');
    var num = normalizeSearchText(it.mod.num || '');
    var source = getItemSearchSource(it, idx);

    if (num === termClean) return 900;
    if (label === termClean) return 820;
    if (title === termClean) return 780;
    if (label.indexOf(termClean) === 0) return 620;
    if (title.indexOf(termClean) === 0) return 560;
    if (num.indexOf(termClean) === 0) return 520;
    if (group.indexOf(termClean) !== -1) return 420;
    if (label.indexOf(termClean) !== -1) return 340;
    if (title.indexOf(termClean) !== -1) return 280;
    if (subtitle.indexOf(termClean) !== -1) return 220;
    if (source.indexOf(termClean) !== -1) return 140;
    return 0;
  }

  function applySearch(rawValue, shouldAutoOpen) {
    var termClean = normalizeSearchText(rawValue);
    var matches = [];

    groupElements.forEach(function (g) {
      g.activeCount = 0;
    });

    itemElements.forEach(function (it, idx) {
      var score = getItemSearchScore(it, idx, termClean);
      it.el.classList.remove('search-match');
      it.el.classList.remove('search-best');

      if (!termClean || score > 0) {
        it.el.style.display = 'flex';
        groupElements[it.grpIdx].activeCount++;
        if (termClean) {
          it.el.classList.add('search-match');
          matches.push({ idx: idx, score: score, item: it });
        }
      } else {
        it.el.style.display = 'none';
      }
    });

    groupElements.forEach(function (g) {
      g.el.style.display = g.activeCount > 0 ? 'block' : 'none';
    });

    if (!termClean) {
      searchResults = [];
      searchCursor = -1;
      searchMeta.textContent = 'Busque por módulo, grupo ou conteúdo do painel';
      return;
    }

    matches.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.idx - b.idx;
    });

    searchResults = matches;
    searchCursor = -1;

    if (!matches.length) {
      searchMeta.textContent = 'Nenhum módulo encontrado';
      return;
    }

    matches[0].item.el.classList.add('search-best');
    searchMeta.textContent = matches.length + ' módulo(s) encontrado(s) · Enter avança';

    if (matches[0].item.el.scrollIntoView) {
      matches[0].item.el.scrollIntoView(false);
    }

    if (shouldAutoOpen && termClean.length > 1 && window.currentIdx !== matches[0].idx) {
      go(matches[0].idx);
    }
  }

  searchInput.oninput = function (e) {
    applySearch(e.target.value || '', true);
  };

  searchInput.onkeydown = function (e) {
    var evt = e || window.event;
    var code = evt.keyCode || evt.which;

    if (code === 27) {
      searchInput.value = '';
      applySearch('', false);
      return;
    }

    if (code !== 13 || !searchResults.length) return;
    if (evt.preventDefault) evt.preventDefault();

    searchCursor = (searchCursor + 1) % searchResults.length;
    go(searchResults[searchCursor].idx);
  };

  sb.appendChild(navList);

  var foot = mk('div', 'sb-foot');
  foot.appendChild(mk('p', '', 'Sec. de Administração'));
  var p2 = mk('p', '', 'Março de 2026');
  p2.style.marginTop = '2px';
  foot.appendChild(p2);

  var btnTheme = mk('button', 'sb-btn-theme');
  btnTheme.type = 'button';
  function updateThemeButton() {
    var active = typeof getActiveTheme === 'function' ? getActiveTheme() : 'light';
    var label = active === 'dark' ? 'Tema claro' : 'Tema escuro';
    btnTheme.textContent = label;
    btnTheme.setAttribute('aria-label', 'Trocar para ' + label.toLowerCase());
    btnTheme.setAttribute('aria-pressed', active === 'dark' ? 'true' : 'false');
  }
  btnTheme.onclick = function () {
    if (typeof toggleTheme === 'function') toggleTheme();
    updateThemeButton();
  };
  updateThemeButton();
  foot.appendChild(btnTheme);

  var btnFs = mk('button', 'sb-btn-fs', 'Modo Apresentação');
  btnFs.type = 'button';
  btnFs.onclick = function() {
    if (!document.fullscreenElement) {
      var req = document.documentElement.requestFullscreen ||
        document.documentElement.webkitRequestFullscreen ||
        document.documentElement.msRequestFullscreen;
      if (req) {
        var result = req.call(document.documentElement);
        if (result && typeof result.catch === 'function') {
          result.catch(function(e){});
        }
      }
      btnFs.textContent = 'Sair da Apresentação';
    } else {
      var exit = document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;
      if (exit) exit.call(document);
      btnFs.textContent = 'Modo Apresentação';
    }
  };
  foot.appendChild(btnFs);

  sb.appendChild(foot);

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
