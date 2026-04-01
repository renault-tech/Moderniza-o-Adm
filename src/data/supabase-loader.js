/* supabase-loader.js
   Busca os dados do Supabase e sobrescreve os arrays globais do frontend.
   Se offline ou com erro, mantém silenciosamente os dados dos arquivos locais.
   Chamado por main.js depois da renderização inicial. */

(function () {
  'use strict';

  var SB_URL = 'https://qnsqqgtdgcscqlziikdc.supabase.co';
  var SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuc3FxZ3RkZ2NzY3Fsemlpa2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MzY5OTEsImV4cCI6MjA5MDAxMjk5MX0.oUNHQDBEAL3kttil86Ny_YJeVVAK9ShZLiVspEh7vAg';

  /* ── Mapeadores de campo ───────────────────────────────────────── */

  function mapModulo(row, idx) {
    return {
      id: idx,
      num: row.num || '',
      label: row.label || '',
      color: row.color || '#0071e3',
      badge: row.badge || null,
      group: row.group_name || '',          /* group_name → group */
      titulo: row.titulo || '',
      subtitulo: row.subtitulo || '',
      chips: Array.isArray(row.chips) ? row.chips : []
    };
  }

  function mapTimeline(row) {
    return {
      status: row.status || 'ok',
      data: row.data_evento || '',          /* data_evento → data */
      titulo: row.titulo || '',
      descricao: row.descricao || '',
      badge: row.badge || null,
      referencia: row.referencia || ''
    };
  }

  function mapCronograma(row) {
    return {
      status: row.status || 'ok',
      data: row.data_fase || '',            /* data_fase → data */
      fase: row.fase || '',
      titulo: row.titulo || '',
      descricao: row.descricao || '',
      entregaveis: Array.isArray(row.entregaveis) ? row.entregaveis : []
    };
  }

  function mapSetor(row) {
    return {
      nome: row.nome || '',
      cor: row.cor || '#0071e3',
      descricao: row.descricao || '',
      itens: Array.isArray(row.itens) ? row.itens : [],
      refs: row.refs || ''
    };
  }

  /* ── Sincronização ─────────────────────────────────────────────── */

  /* Tabelas a sincronizar: nome, variável global, mapeador, mínimo de linhas */
  var SYNC_TABLES = [
    { table: 'modulos',    gvar: 'MODULOS',    map: mapModulo,    min: 12 },
    { table: 'achados',    gvar: 'ACHADOS',    map: null,         min: 10 },
    { table: 'faq',        gvar: 'FAQ',        map: null,         min: 5  },
    { table: 'mitos',      gvar: 'MITOS',      map: null,         min: 5  },
    { table: 'timeline',   gvar: 'TIMELINE',   map: mapTimeline,  min: 5  },
    { table: 'cronograma', gvar: 'CRONOGRAMA', map: mapCronograma,min: 3  },
    { table: 'setores',    gvar: 'SETORES',    map: mapSetor,     min: 3  }
  ];

  function rebuild() {
    var sb   = document.getElementById('sidebar');
    var main = document.getElementById('main');
    if (sb)   sb.innerHTML   = '';
    if (main) main.innerHTML = '';

    if (typeof buildSidebar === 'function') buildSidebar();
    if (typeof buildPanels  === 'function') buildPanels();

    /* Restaurar navegação por hash */
    var hash = window.location.hash;
    if (hash && hash.indexOf('#modulo-') === 0) {
      var idx = parseInt(hash.replace('#modulo-', ''), 10) - 1;
      if (!isNaN(idx) && typeof go === 'function') go(idx, true);
    }
  }

  window.syncFromSupabase = function () {
    if (typeof window.supabase === 'undefined') return;

    var db = window.supabase.createClient(SB_URL, SB_KEY);
    var changed = false;

    var fetches = SYNC_TABLES.map(function (cfg) {
      return db.from(cfg.table).select('*').order('id').then(function (res) {
        if (res.error || !res.data || res.data.length < cfg.min) return;
        window[cfg.gvar] = cfg.map
          ? res.data.map(function (row, i) { return cfg.map(row, i); })
          : res.data;
        changed = true;
      });
    });

    Promise.all(fetches).then(function () {
      if (changed) rebuild();
    }).catch(function () { /* offline — mantém dados locais */ });
  };
}());
