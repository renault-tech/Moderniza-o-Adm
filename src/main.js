/* main.js — inicialização da aplicação */

window.addEventListener('load', function () {
  buildPanels();
  buildSidebar();

  function handleHash() {
    var hash = window.location.hash;
    if (hash && hash.indexOf('#modulo-') === 0) {
      var idx = parseInt(hash.replace('#modulo-', ''), 10) - 1;
      if (!isNaN(idx) && typeof MODULOS !== 'undefined' && idx >= 0 && idx < MODULOS.length) {
        go(idx, true);
      }
    }
  }

  handleHash();
  window.addEventListener('hashchange', handleHash);

  /* Sincronizar com fonte remota somente quando carregada explicitamente. */
  if (typeof syncFromSupabase === 'function') syncFromSupabase();

  if (typeof syncFromSupabase === 'function') {
    if (document.addEventListener) {
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden) syncFromSupabase();
      });
    }

    if (window.setInterval) {
      window.setInterval(function () {
        syncFromSupabase();
      }, 60000);
    }
  }

  /* Navegação por teclado (FEAT-001). */
  window.addEventListener('keydown', function(e) {
    e = e || window.event;
    if (!e.target || !e.target.tagName) return;

    /* Ignora digitação em campos editáveis. */
    var tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    var key = e.key || '';
    var code = e.keyCode || e.which;
    if (key === 'ArrowRight' || key === 'ArrowDown' || code === 39 || code === 40) {
      if (e.preventDefault) e.preventDefault();
      var nextIdx = (typeof window.currentIdx !== 'undefined' ? window.currentIdx : 0) + 1;
      if (typeof MODULOS !== 'undefined' && nextIdx < MODULOS.length) {
        go(nextIdx);
      }
    } else if (key === 'ArrowLeft' || key === 'ArrowUp' || code === 37 || code === 38) {
      if (e.preventDefault) e.preventDefault();
      var prevIdx = (typeof window.currentIdx !== 'undefined' ? window.currentIdx : 0) - 1;
      if (prevIdx >= 0) {
        go(prevIdx);
      }
    }
  });
});
