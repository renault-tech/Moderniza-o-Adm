/* charts.js — gráfico de barras FGTS */

/**
 * Renderiza o gráfico de barras comparativo de rendimento.
 * Requer: utils.js (mk), FGTS_SIMULACAO de src/data/comparativos.js.
 * @param {HTMLElement} container - elemento onde inserir as barras
 */
function buildBarras(container) {
  FGTS_SIMULACAO.alternativas.forEach(function(alt) {
    var row = mk('div', 'bar-row');

    row.appendChild(mk('div', 'bar-lbl', alt.label));

    var track = mk('div', 'bar-track');
    var fill = mk('div', 'bar-fill');
    fill.style.width = alt.larguraBarra + '%';
    fill.style.background = alt.cor;
    track.appendChild(fill);
    row.appendChild(track);

    var val = mk('div', 'bar-val');
    var milhar = Math.floor(alt.valorFinal / 1000) * 1000;
    val.textContent = '~R$ ' + milhar.toLocaleString('pt-BR');
    row.appendChild(val);

    container.appendChild(row);
  });
}
