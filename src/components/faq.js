/* faq.js — acordeão de perguntas frequentes */

/**
 * Abre ou fecha um item do FAQ.
 * @param {number} i - índice do item
 */
function tfaq(i) {
  var a = document.getElementById('fa' + i);
  var ic = document.getElementById('fi' + i);
  if (!a || !ic) return;
  var isOpen = a.classList.toggle('open');
  ic.textContent = isOpen ? '×' : '+';
}

/**
 * Constrói o acordeão de FAQ a partir do array FAQ.
 * Requer: utils.js (mk), FAQ de src/data/faq.js.
 * @param {HTMLElement} container - elemento onde inserir o FAQ
 */
function buildFaq(container) {
  FAQ.forEach(function(item, i) {
    var wrap = mk('div', 'faq-item');

    var q = mk('div', 'faq-q');
    q.setAttribute('aria-expanded', 'false');
    q.onclick = (function(idx) {
      return function() {
        tfaq(idx);
        var isOpen = document.getElementById('fa' + idx).classList.contains('open');
        q.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      };
    })(i);

    q.appendChild(mk('div', 'faq-qt', item.pergunta));

    var ic = mk('div', 'faq-ic', '+');
    ic.id = 'fi' + i;
    q.appendChild(ic);

    var a = mk('div', 'faq-a');
    a.id = 'fa' + i;

    var inner = mk('div', 'faq-a-inner');
    inner.appendChild(mk('p', '', item.resposta));

    var ref = mk('div', 'faq-ref');
    var strong = mk('strong', '', 'Fundamento: ');
    ref.appendChild(strong);
    ref.appendChild(document.createTextNode(item.fundamento));
    inner.appendChild(ref);

    a.appendChild(inner);

    wrap.appendChild(q);
    wrap.appendChild(a);
    container.appendChild(wrap);
  });
}
