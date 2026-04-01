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

  // Keyboard navigation (FEAT-001)
  window.addEventListener('keydown', function(e) {
    // Ignore if typing in input/textarea
    var tag = e.target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      var nextIdx = (typeof window.currentIdx !== 'undefined' ? window.currentIdx : 0) + 1;
      if (typeof MODULOS !== 'undefined' && nextIdx < MODULOS.length) {
        go(nextIdx);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      var prevIdx = (typeof window.currentIdx !== 'undefined' ? window.currentIdx : 0) - 1;
      if (prevIdx >= 0) {
        go(prevIdx);
      }
    }
  });
});
