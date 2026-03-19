/* main.js — inicialização da aplicação */

window.addEventListener('load', function () {
  buildSidebar();
  buildPanels();

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
});
