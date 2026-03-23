/* charts.js — gráfico de barras FGTS */

/**
 * Renderiza o gráfico de barras comparativo de rendimento.
 * Requer: utils.js (mk), FGTS_SIMULACAO de src/data/comparativos.js.
 * @param {HTMLElement} container - elemento onde inserir as barras
 */
function buildBarras(container, valorBase, anos) {
  if (!valorBase) valorBase = FGTS_SIMULACAO.valorBase || 50000;
  if (!anos) anos = FGTS_SIMULACAO.anos || 10;

  while (container.firstChild) { container.removeChild(container.firstChild); }
  var maxVal = 0;

  FGTS_SIMULACAO.alternativas.forEach(function (alt) {
    alt.calcValor = valorBase * Math.pow(1 + alt.taxaAnual, anos);
    if (alt.calcValor > maxVal) maxVal = alt.calcValor;
  });

  FGTS_SIMULACAO.alternativas.forEach(function (alt) {
    var row = mk('div', 'bar-row');

    row.appendChild(mk('div', 'bar-lbl', alt.label));

    var track = mk('div', 'bar-track');
    var fill = mk('div', 'bar-fill');
    var widthPct = maxVal > 0 ? (alt.calcValor / maxVal) * 100 : 0;
    fill.style.width = widthPct + '%';
    fill.style.background = alt.cor;
    track.appendChild(fill);
    row.appendChild(track);

    var val = mk('div', 'bar-val');
    val.textContent = 'R$ ' + Math.floor(alt.calcValor).toLocaleString('pt-BR');
    row.appendChild(val);

    container.appendChild(row);
  });
}
