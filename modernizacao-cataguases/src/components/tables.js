/* tables.js — tabelas comparativas */

/**
 * Renderiza a tabela comparativa CLT vs Estatuto.
 * Requer: utils.js (mk), COMPARATIVO_REGIMES de src/data/comparativos.js.
 * @param {HTMLElement} container - onde inserir o tbl-wrap
 */
function buildTabelaComparativa(container) {
  var wrap = mk('div', 'tbl-wrap');
  var tbl = mk('table', 'tbl');

  /* Cabeçalho */
  var thead = mk('thead');
  var hr = mk('tr');
  var cabecalhos = ['Aspecto', 'CLT (hoje)', 'Estatutário (proposto)'];
  cabecalhos.forEach(function(h, i) {
    var th = mk('th', '', h);
    if (i === 0) th.style.width = '22%';
    hr.appendChild(th);
  });
  thead.appendChild(hr);
  tbl.appendChild(thead);

  /* Corpo */
  var tbody = mk('tbody');
  COMPARATIVO_REGIMES.tabela.forEach(function(row) {
    var tr = mk('tr');

    var tdAspecto = mk('td', '', row.aspecto);
    tdAspecto.style.fontWeight = '500';
    tr.appendChild(tdAspecto);
    tr.appendChild(mk('td', '', row.clt));
    tr.appendChild(mk('td', '', row.estatuto));

    tbody.appendChild(tr);
  });
  tbl.appendChild(tbody);

  wrap.appendChild(tbl);
  container.appendChild(wrap);
}

/**
 * Renderiza uma caixa VS (lado a lado) usando arrays de itens.
 * @param {Array}       data      - array de {sym:'+'/'-', txt, neg:bool}
 * @param {HTMLElement} container - onde inserir os itens
 * @param {boolean}     isClt     - true = usa vs-sym-b, false = vs-sym-g
 */
function buildVsItems(data, container, isClt) {
  data.forEach(function(item) {
    var div = mk('div', 'vs-li' + (item.neg ? ' neg' : ''));
    var sym = mk('span', item.sym === '+' ? (isClt ? 'vs-sym-b' : 'vs-sym-g') : 'vs-sym-r', item.sym);
    div.appendChild(sym);
    div.appendChild(document.createTextNode(item.txt));
    container.appendChild(div);
  });
}
