/* supabase-loader.js
   Busca os dados do Supabase via REST nativo e sobrescreve os arrays globais do frontend.
   Se offline ou com erro, mantem silenciosamente os dados dos arquivos locais.
   Chamado por main.js depois da renderizacao inicial. */

(function () {
  'use strict';

  var SB_URL = 'https://qnsqqgtdgcscqlziikdc.supabase.co/rest/v1';
  var SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuc3FxZ3RkZ2NzY3Fsemlpa2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MzY5OTEsImV4cCI6MjA5MDAxMjk5MX0.oUNHQDBEAL3kttil86Ny_YJeVVAK9ShZLiVspEh7vAg';

  function getLocalModuleDefaults(idx) {
    if (typeof MODULOS === 'undefined' || !MODULOS[idx]) return null;
    return MODULOS[idx];
  }

  function mapModulo(row, idx) {
    var local = getLocalModuleDefaults(idx) || {};
    return {
      id: idx,
      num: row.num || local.num || '',
      label: row.label || local.label || '',
      color: row.color || local.color || '#0071e3',
      badge: row.badge || local.badge || null,
      group: row.group_name || local.group || '',
      titulo: row.titulo || local.titulo || '',
      subtitulo: row.subtitulo || local.subtitulo || '',
      chips: isArray(row.chips) ? row.chips : (isArray(local.chips) ? local.chips : [])
    };
  }

  function mapTimeline(row) {
    return {
      status: row.status || 'ok',
      data: row.data_evento || '',
      titulo: row.titulo || '',
      descricao: row.descricao || '',
      badge: row.badge || null,
      referencia: row.referencia || ''
    };
  }

  function mapCronograma(row) {
    return {
      status: row.status || 'ok',
      data: row.data_fase || '',
      fase: row.fase || '',
      titulo: row.titulo || '',
      descricao: row.descricao || '',
      entregaveis: isArray(row.entregaveis) ? row.entregaveis : []
    };
  }

  function mapSetor(row) {
    return {
      nome: row.nome || '',
      cor: row.cor || '#0071e3',
      descricao: row.descricao || '',
      itens: isArray(row.itens) ? row.itens : [],
      refs: row.refs || ''
    };
  }

  function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  var SYNC_TABLES = [
    { table: 'modulos', gvar: 'MODULOS', map: mapModulo, min: 12, order: 'num.asc' },
    { table: 'achados', gvar: 'ACHADOS', map: null, min: 10, order: 'num.asc' },
    { table: 'faq', gvar: 'FAQ', map: null, min: 5, order: 'id.asc' },
    { table: 'mitos', gvar: 'MITOS', map: null, min: 5, order: 'id.asc' },
    { table: 'timeline', gvar: 'TIMELINE', map: mapTimeline, min: 5, order: 'id.asc' },
    { table: 'cronograma', gvar: 'CRONOGRAMA', map: mapCronograma, min: 3, order: 'id.asc' },
    { table: 'setores', gvar: 'SETORES', map: mapSetor, min: 3, order: 'id.asc' }
  ];

  function rebuild() {
    var sb = document.getElementById('sidebar');
    var main = document.getElementById('main');

    while (sb && sb.firstChild) {
      sb.removeChild(sb.firstChild);
    }
    while (main && main.firstChild) {
      main.removeChild(main.firstChild);
    }

    if (typeof buildSidebar === 'function') buildSidebar();
    if (typeof buildPanels === 'function') buildPanels();

    var hash = window.location.hash;
    if (hash && hash.indexOf('#modulo-') === 0) {
      var idx = parseInt(hash.replace('#modulo-', ''), 10) - 1;
      if (!isNaN(idx) && typeof go === 'function') {
        go(idx, true);
        return;
      }
    }

    if (typeof go === 'function') go(0, true);
  }

  function buildRequestUrl(cfg, useAtivo) {
    var url = SB_URL + '/' + cfg.table + '?select=*';
    if (useAtivo !== false) {
      url += '&ativo=eq.true';
    }
    url += '&order=' + encodeURIComponent(cfg.order || 'id.asc');
    return url;
  }

  function requestTable(cfg, done, useAtivo) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', buildRequestUrl(cfg, useAtivo), true);
    xhr.setRequestHeader('apikey', SB_KEY);
    xhr.setRequestHeader('Authorization', 'Bearer ' + SB_KEY);
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onreadystatechange = function () {
      var rows;
      var mapped;
      var i;

      if (xhr.readyState !== 4) return;

      if (xhr.status < 200 || xhr.status >= 300) {
        if (useAtivo !== false && xhr.status === 400) {
          requestTable(cfg, done, false);
          return;
        }
        done(false);
        return;
      }

      try {
        rows = JSON.parse(xhr.responseText);
      } catch (e) {
        done(false);
        return;
      }

      if (!isArray(rows) || rows.length < cfg.min) {
        done(false);
        return;
      }

      if (cfg.map) {
        mapped = [];
        for (i = 0; i < rows.length; i++) {
          mapped.push(cfg.map(rows[i], i));
        }
        window[cfg.gvar] = mapped;
      } else {
        window[cfg.gvar] = rows;
      }

      done(true);
    };

    xhr.onerror = function () {
      done(false);
    };

    xhr.send(null);
  }

  window.syncFromSupabase = function () {
    var pending = SYNC_TABLES.length;
    var changed = false;
    var i;

    if (!window.XMLHttpRequest || !pending) return;

    function finish(hasChanged) {
      if (hasChanged) changed = true;
      pending -= 1;
      if (pending === 0 && changed) rebuild();
    }

    for (i = 0; i < SYNC_TABLES.length; i++) {
      requestTable(SYNC_TABLES[i], finish);
    }
  };
}());
