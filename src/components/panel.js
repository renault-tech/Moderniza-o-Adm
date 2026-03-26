/* panel.js — renderização dos 12 painéis e navegação */

/* ============================================================
   Dados locais específicos de cada painel
   (não reutilizados em outros contextos)
   ============================================================ */

var MOD1_EH = [
  'Regularização jurídica do funcionalismo',
  'Novo estatuto substituindo a Lei nº 52/1951',
  'Novo PCCV unificado com progressões claras',
  'Processo voluntário — cada servidor decide',
  'Participativo — comissões com representantes eleitos',
  'Protetor de direitos adquiridos',
  'Resposta ao TAC do Ministério Público'
];
var MOD1_NAOE = [
  'Imposição de mudança de regime',
  'Perda do FGTS acumulado',
  'Redução de salários ou vantagens conquistadas',
  'Risco ao emprego do servidor',
  'Processo secreto ou sem participação',
  'Projeto já protocolado na Câmara'
];
var MOD1_PILARES = [
  {
    titulo: 'Novo Estatuto',
    descricao: 'Lei municipal atualizada · Direitos, deveres e garantias · Estabilidade constitucional · Regime disciplinar justo',
    bg: '#EFF6FF',
    cor: '#0071e3'
  },
  {
    titulo: 'Novo PCCV',
    descricao: 'Tabela salarial unificada · Progressão por tempo e mérito · Reconhecimento de qualificação · Carreira estruturada',
    bg: '#EEEDFE',
    cor: '#6e6ce3'
  },
  {
    titulo: 'Migração voluntária',
    descricao: 'Opção individual de cada servidor · Sem coerção · Com todas as informações para decisão consciente',
    bg: '#F0FDF4',
    cor: '#2d9d57'
  }
];

/* Visão geral (vs-cards) do Módulo 05 — versão resumida */
var MOD4_VS_CLT = [
  { sym: '+', txt: 'FGTS 8% mensal garantido', neg: false },
  { sym: '+', txt: '13º salário e férias com 1/3', neg: false },
  { sym: '+', txt: 'Proteção das vantagens conquistadas', neg: false },
  { sym: '+', txt: 'Jornada 30h com base legal (LC 2003)', neg: false },
  { sym: '−', txt: 'Estabilidade apenas processual/judicial', neg: true },
  { sym: '−', txt: 'Progressões futuras menos protegidas', neg: true },
  { sym: '−', txt: 'Regime irregular na adm. direta (MP)', neg: true }
];
var MOD4_VS_EST = [
  { sym: '+', txt: 'Estabilidade constitucional automática (art. 41)', neg: false },
  { sym: '+', txt: 'Demissão sem PAD é nula de pleno direito', neg: false },
  { sym: '+', txt: 'Progressões futuras são direito do cargo', neg: false },
  { sym: '+', txt: 'Jornada 30h mantida e fixada no estatuto', neg: false },
  { sym: '−', txt: 'Sem FGTS futuro (saldo sacado na transição)', neg: true },
  { sym: '+', txt: 'Regime regular na administração direta', neg: false },
  { sym: '+', txt: 'Irredutibilidade salarial constitucional', neg: false }
];

/* PCCV — Módulo 07 */
var MOD6_PCCV_PODE = [
  'Tabela salarial com níveis e referências claras',
  'Progressão horizontal por tempo de serviço',
  'Progressão vertical por mérito ou titulação',
  'Adicionais de qualificação e especialização',
  'Gratificações por função ou responsabilidade',
  'Licenças além do mínimo legal'
];
var MOD6_PCCV_NAO = [
  'Estabilidade constitucional automática (art. 41 CF/88)',
  'Proteção de progressões futuras ainda não atingidas',
  'Processo disciplinar com rigor de PAD estatutário',
  'Vínculo institucional que dispensa ato de gestão',
  'Segurança jurídica plena sobre benefícios futuros'
];
var MOD6_PCCV_FLOW = [
  { titulo: 'Ingresso por concurso público', descricao: 'Enquadramento no nível inicial do cargo', estilo: 'gray' },
  { titulo: 'Progressão horizontal', descricao: 'A cada triênio ou quinquênio, o servidor avança um nível na tabela — automaticamente', estilo: 'blue' },
  { titulo: 'Progressão vertical', descricao: 'Nova titulação ou avaliação aprovada avança para referência superior', estilo: 'blue' },
  { titulo: 'Servidor que migrou da CLT', descricao: 'Enquadrado no nível equivalente ao já conquistado — sem retrocesso', estilo: 'green' },
  { titulo: 'Topo de carreira', descricao: 'Máxima referência salarial do cargo · aposentadoria pelo INSS', estilo: 'gray' }
];

/* ============================================================
   Render helper local
   ============================================================ */

function mkProBox(headTxt, headCls, itens, isDot) {
  var box = mk('div', 'pro-box');
  box.appendChild(mk('div', 'pro-box-head ' + headCls, headTxt));
  itens.forEach(function (t) { box.appendChild(mkProItem(t, isDot)); });
  return box;
}

/* ============================================================
   Funções de renderização — uma por módulo
   ============================================================ */

function render0() {
  var pnl = mk('div', 'pnl on');
  pnl.id = 'p0';
  pnl.appendChild(mkPhead(MODULOS[0].chips, MODULOS[0].titulo, MODULOS[0].subtitulo));

  var body = mk('div', 'pbody');

  /* KPIs */
  var kpiGrid = mk('div', 'g4');
  var kpis = [
    { l: 'Servidores ativos', v: '2.573', d: 'Folha 2024 · sistema Betha', cor: null },
    { l: 'Achados INTEC', v: '17', d: 'Não conformidades legais', cor: '#e8453c' },
    { l: 'Prejuízo FGTS', v: 'R$ 5,1 mi', d: 'Depósitos irregulares em 2024', cor: '#e8453c' },
    { l: 'Contratos vencidos', v: '171', d: 'Acima de 2 anos · R$ 11 mi', cor: '#bf8600' }
  ];
  kpis.forEach(function (k) {
    var kpi = mk('div', 'kpi');
    kpi.appendChild(mk('div', 'kpi-l', k.l));
    var v = mk('div', 'kpi-v', k.v);
    if (k.cor) v.style.color = k.cor;
    kpi.appendChild(v);
    kpi.appendChild(mk('div', 'kpi-d', k.d));
    kpiGrid.appendChild(kpi);
  });
  body.appendChild(mkSec('Números do diagnóstico', kpiGrid));

  /* Achados */
  var achGrid = mk('div', 'achg');
  ACHADOS.forEach(function (a) {
    var div = mk('div', 'ach');
    var num = mk('div', 'ach-n', a.num);
    num.style.background = a.gravidade === 'd' ? 'var(--color-background-danger)' : 'var(--color-background-warning)';
    num.style.color = a.gravidade === 'd' ? 'var(--color-text-danger)' : 'var(--color-text-warning)';
    div.appendChild(num);
    var bd = mk('div');
    bd.appendChild(mk('div', 'ach-t', a.titulo));
    bd.appendChild(mk('div', 'ach-d', a.descricao));
    div.appendChild(bd);
    achGrid.appendChild(div);
  });
  body.appendChild(mkSec('Os 17 achados da auditoria', achGrid));

  /* Contexto jurídico */
  var ctx = mk('div', 'g2');
  ctx.appendChild(mkCard(
    'Estatuto vigente: Lei nº 52/1951',
    'Um instrumento de 75 anos, anterior à CF/88 e a toda a legislação trabalhista moderna. Não contempla estabilidade constitucional, avaliação de desempenho, progressão por mérito ou qualquer mecanismo moderno de gestão de pessoas.'
  ));
  ctx.appendChild(mkCard(
    'TAC com o Ministério Público',
    'Título executivo extrajudicial (Lei nº 7.347/1985, art. 5º, §6º). Não é recomendação: é obrigação jurídica vinculante com prazos e consequências em caso de descumprimento. O município assumiu esse compromisso formalmente.'
  ));
  body.appendChild(mkSec('Contexto jurídico', ctx));

  pnl.appendChild(body);
  return pnl;
}

function render1() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p1';
  pnl.appendChild(mkPhead(MODULOS[1].chips, MODULOS[1].titulo, MODULOS[1].subtitulo));

  var body = mk('div', 'pbody');

  var proscons = mk('div', 'pros-cons');
  proscons.appendChild(mkProBox('A modernização É', 'pro-head-g', MOD1_EH, true));
  proscons.appendChild(mkProBox('A modernização NÃO É', 'pro-head-r', MOD1_NAOE, false));
  body.appendChild(mkSec('A modernização é e não é', proscons));

  var pilGrid = mk('div', 'g3');
  MOD1_PILARES.forEach(function (p) {
    pilGrid.appendChild(mkCard(p.titulo, p.descricao, p.cor, p.bg));
  });
  body.appendChild(mkSec('Os três pilares', pilGrid));

  body.appendChild(mkCallout('Nenhum projeto foi protocolado na Câmara Municipal até a presente data. O processo participativo com as comissões setoriais ainda está em andamento.', 'w'));

  pnl.appendChild(body);
  return pnl;
}

function render2() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p2';
  pnl.appendChild(mkPhead(MODULOS[2].chips, MODULOS[2].titulo, MODULOS[2].subtitulo));

  var body = mk('div', 'pbody');

  body.appendChild(mkCard(
    'Origem e natureza jurídica',
    'A CLT (Decreto-Lei nº 5.452/1943) foi concebida para equilibrar a desigualdade natural entre empregador e empregado no setor privado. Seu princípio central é a proteção da parte mais fraca da relação trabalhista. Em Cataguases, servidores da administração direta foram contratados sob esse regime — uma situação que o Ministério Público considera estruturalmente irregular, pois a administração direta não deveria usar o regime privado como regra geral.'
  ));

  var proscons = mk('div', 'pros-cons');
  proscons.appendChild(mkProBox('O que a CLT garante', 'pro-head-g', COMPARATIVO_REGIMES.vantagens_clt, true));
  proscons.appendChild(mkProBox('Limitações no serviço público', 'pro-head-r', COMPARATIVO_REGIMES.desvantagens_clt, false));
  body.appendChild(mkSec('Vantagens para o servidor municipal', proscons));

  body.appendChild(mkCallout('Em Cataguases, o servidor celetista concursado não é empregado público (que integra empresa pública ou sociedade de economia mista). É um servidor da administração direta sob regime atípico, o que gera a irregularidade apontada no diagnóstico.', 'i'));

  pnl.appendChild(body);
  return pnl;
}

function render3() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p3';
  pnl.appendChild(mkPhead(MODULOS[3].chips, MODULOS[3].titulo, MODULOS[3].subtitulo));

  var body = mk('div', 'pbody');

  body.appendChild(mkCard(
    'Natureza e fundamento constitucional',
    'No regime estatutário o vínculo entre o servidor e o Estado é institucional, não contratual. O servidor ocupa um cargo público criado por lei. Seus direitos e deveres não decorrem de um acordo bilateral, mas do estatuto e da Constituição Federal. A prefeitura não age como empregadora — age como poder público organizando seus quadros para prestar serviços à população. Base constitucional: art. 39 da CF/88.'
  ));

  var proscons = mk('div', 'pros-cons');
  proscons.appendChild(mkProBox('Vantagens do estatuto', 'pro-head-g', COMPARATIVO_REGIMES.vantagens_estatuto, true));
  proscons.appendChild(mkProBox('Limitações', 'pro-head-r', COMPARATIVO_REGIMES.desvantagens_estatuto, false));
  body.appendChild(mkSec(null, proscons));

  body.appendChild(mkCallout('No modelo proposto para Cataguases, quem migrar não faz novo estágio probatório e tem todo o tempo de serviço anterior reconhecido integralmente. As limitações típicas do estatuto para novos ingressantes não se aplicam à migração de servidores já estáveis.', 's'));

  pnl.appendChild(body);
  return pnl;
}

function render4() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p4';
  pnl.appendChild(mkPhead(MODULOS[4].chips, MODULOS[4].titulo, MODULOS[4].subtitulo));

  var body = mk('div', 'pbody');

  /* VS lado a lado */
  var vs = mk('div', 'vs');
  var cltCard = mk('div', 'vs-card vs-clt');
  cltCard.appendChild(mk('div', 'vs-head vs-head-b', 'Regime CLT (hoje)'));
  var cltItems = mk('div');
  buildVsItems(MOD4_VS_CLT, cltItems, true);
  cltCard.appendChild(cltItems);

  var estCard = mk('div', 'vs-card vs-est');
  estCard.appendChild(mk('div', 'vs-head vs-head-g', 'Regime Estatutário (proposto)'));
  var estItems = mk('div');
  buildVsItems(MOD4_VS_EST, estItems, false);
  estCard.appendChild(estItems);

  vs.appendChild(cltCard);
  vs.appendChild(estCard);
  body.appendChild(mkSec('Visão geral', vs));

  /* Tabela detalhada */
  var tblSec = mk('div');
  tblSec.appendChild(mk('div', 'sec-label', 'Tabela detalhada'));
  buildTabelaComparativa(tblSec);
  body.appendChild(tblSec);

  body.appendChild(mkCallout('Ponto neutro para Cataguases: aposentadoria pelo INSS em ambos os regimes. O município não adota RPPS, portanto esse aspecto não diferencia os dois regimes localmente.', 'i'));

  pnl.appendChild(body);
  return pnl;
}

function render5() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p5';
  pnl.appendChild(mkPhead(MODULOS[5].chips, MODULOS[5].titulo, MODULOS[5].subtitulo));

  var body = mk('div', 'pbody');

  body.appendChild(mkCallout('O servidor que migrar para o estatutário saca o saldo integral do FGTS acumulado, sem perda alguma, por meio da rescisão instrumental do contrato CLT.', 's', 'font-size:14px;font-weight:500'));

  var flowSec = mk('div');
  flowSec.appendChild(mk('div', 'sec-label', 'Fluxo da rescisão instrumental'));
  buildFlow(FGTS_FLUXO, flowSec);
  body.appendChild(flowSec);

  var rendSec = mk('div');
  rendSec.appendChild(mk('div', 'sec-label', 'Simulador interativo de Rendimento: FGTS vs alternativas'));

  var descCard = mk('div', 'card');
  descCard.style.marginBottom = '15px';
  descCard.appendChild(mk('div', 'card-d', 'O FGTS rende TR + 3% ao ano. Ao sacar o saldo na migração e aplicar na poupança ou em renda fixa (CDI/Tesouro Selic), o rendimento projetado altera. Use os seletores abaixo para simular opções com o seu cenário no ato da migração:'));
  rendSec.appendChild(descCard);

  var calcBox = mk('div', 'card');
  calcBox.style.marginBottom = '20px';

  var row1 = mk('div');
  row1.style.marginBottom = '10px';
  var lbl1 = mk('div', 'sec-label', 'Saldo do FGTS: R$ 50.000');
  var input1 = mk('input');
  input1.type = 'range';
  input1.min = '10000';
  input1.max = '200000';
  input1.step = '5000';
  input1.value = '50000';
  input1.style.width = '100%';
  row1.appendChild(lbl1);
  row1.appendChild(input1);

  var row2 = mk('div');
  var lbl2 = mk('div', 'sec-label', 'Prazo projetado: 10 anos');
  var input2 = mk('input');
  input2.type = 'range';
  input2.min = '1';
  input2.max = '20';
  input2.step = '1';
  input2.value = '10';
  input2.style.width = '100%';
  row2.appendChild(lbl2);
  row2.appendChild(input2);

  calcBox.appendChild(row1);
  calcBox.appendChild(row2);
  rendSec.appendChild(calcBox);

  var barsCont = mk('div');
  buildBarras(barsCont, 50000, 10);
  rendSec.appendChild(barsCont);

  var resultCard = mk('div', 'fgts-result');
  rendSec.appendChild(resultCard);

  function calcGanho(valorBase, anos) {
    var taxaFgts = 0.03;
    var taxaCdi = 0.11;
    var fgts = valorBase * Math.pow(1 + taxaFgts, anos);
    var cdi = valorBase * Math.pow(1 + taxaCdi, anos);
    return { fgts: Math.floor(fgts), cdi: Math.floor(cdi), diff: Math.floor(cdi - fgts) };
  }

  function updateResultCard(valorBase, anos) {
    while (resultCard.firstChild) { resultCard.removeChild(resultCard.firstChild); }
    var g = calcGanho(valorBase, anos);
    var row = mk('div', 'fgts-result-row');

    var itemFgts = mk('div', 'fgts-result-item');
    var lblFgts = mk('div', 'fgts-result-lbl', 'FGTS (TR + 3% a.a.)');
    var valFgts = mk('div', 'fgts-result-val fgts-result-val--r', 'R$ ' + g.fgts.toLocaleString('pt-BR'));
    itemFgts.appendChild(lblFgts);
    itemFgts.appendChild(valFgts);

    var itemCdi = mk('div', 'fgts-result-item');
    var lblCdi = mk('div', 'fgts-result-lbl', '100% CDI (~11% a.a.)');
    var valCdi = mk('div', 'fgts-result-val fgts-result-val--g', 'R$ ' + g.cdi.toLocaleString('pt-BR'));
    itemCdi.appendChild(lblCdi);
    itemCdi.appendChild(valCdi);

    var itemDiff = mk('div', 'fgts-result-item fgts-result-item--hl');
    var lblDiff = mk('div', 'fgts-result-lbl', 'Ganho adicional ao investir (CDI vs FGTS)');
    var valDiff = mk('div', 'fgts-result-val fgts-result-val--g', '+ R$ ' + g.diff.toLocaleString('pt-BR'));
    itemDiff.appendChild(lblDiff);
    itemDiff.appendChild(valDiff);

    row.appendChild(itemFgts);
    row.appendChild(itemCdi);
    row.appendChild(itemDiff);
    resultCard.appendChild(row);
  }

  updateResultCard(50000, 10);

  function updateCalc() {
    var v = parseInt(input1.value, 10);
    var a = parseInt(input2.value, 10);
    lbl1.textContent = 'Saldo do FGTS: R$ ' + v.toLocaleString('pt-BR');
    lbl2.textContent = 'Prazo projetado: ' + a + (a === 1 ? ' ano' : ' anos');
    buildBarras(barsCont, v, a);
    updateResultCard(v, a);
  }

  input1.oninput = updateCalc;
  input2.oninput = updateCalc;

  body.appendChild(rendSec);

  body.appendChild(mkCallout('Simulação ilustrativa com base em médias históricas. Rendimentos passados não garantem resultados futuros. Valores brutos sem considerar IR.', 'w', 'font-size:12px'));
  body.appendChild(mkCallout('Quem preferir ficar na CLT: nenhuma consequência. Contrato continua vigente, FGTS continua sendo depositado normalmente (8% mensal) e todos os direitos trabalhistas são preservados.', 'i'));

  pnl.appendChild(body);
  return pnl;
}

function render6() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p6';
  pnl.appendChild(mkPhead(MODULOS[6].chips, MODULOS[6].titulo, MODULOS[6].subtitulo));

  var body = mk('div', 'pbody');

  var dif = mk('div');
  dif.appendChild(mk('div', 'sec-label', 'Estatuto ≠ PCCV'));
  var g2 = mk('div', 'g2');
  g2.appendChild(mkCard('Estatuto responde:', 'Como é a relação do servidor com o Estado? Quais são seus direitos, deveres, garantias e proteções institucionais?', '#0071e3'));
  g2.appendChild(mkCard('PCCV responde:', 'Qual é o cargo? Quanto recebe? Como cresce na carreira? Quais são as tabelas salariais e os critérios de progressão?', '#6e6ce3'));
  dif.appendChild(g2);
  var hl = mkCallout('São complementares — um não substitui o outro. O estatuto sem PCCV é uma casca sem estrutura de carreira. O PCCV sem estatuto é uma tabela sem garantias institucionais.', 'i');
  hl.style.marginTop = '10px';
  dif.appendChild(hl);
  body.appendChild(dif);

  var proscons = mk('div', 'pros-cons');
  proscons.appendChild(mkProBox('O PCCV pode oferecer ao servidor CLT', 'pro-head-g', MOD6_PCCV_PODE, true));
  proscons.appendChild(mkProBox('O PCCV não consegue oferecer', 'pro-head-r', MOD6_PCCV_NAO, false));
  body.appendChild(mkSec(null, proscons));

  var flowSec = mk('div');
  flowSec.appendChild(mk('div', 'sec-label', 'Fluxo da carreira com o novo PCCV'));
  buildFlow(MOD6_PCCV_FLOW, flowSec);
  body.appendChild(flowSec);

  pnl.appendChild(body);
  return pnl;
}

function render7() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p7';
  pnl.appendChild(mkPhead(MODULOS[7].chips, MODULOS[7].titulo, MODULOS[7].subtitulo));

  var body = mk('div', 'pbody');

  /* Duas leis municipais */
  var leiSec = mk('div');
  leiSec.appendChild(mk('div', 'sec-label', 'A base legal da conquista de 2003'));
  var g2 = mk('div', 'g2');
  g2.appendChild(mkCard(
    'LC nº 3.231/2003',
    'Alterou o art. 58 da LC 3.023/2001. Estabeleceu 30h/semana para os servidores em geral. Garantiu expressamente irredutibilidade salarial: o valor de 6 horas equivale ao que era pago por 8 horas.',
    '#2d9d57'
  ));
  g2.appendChild(mkCard(
    'LC nº 3.242/2003',
    'Alterou o art. 44 da LC 3.024/2001. Estabeleceu 30h/semana para o Grupo Ocupacional de Serviço Administrativo e demais quadros ocupacionais.',
    '#2d9d57'
  ));
  leiSec.appendChild(g2);
  var hl = mkCallout('A jornada de 6 horas tem base legal municipal sólida e irredutibilidade salarial garantida na própria lei. É uma conquista legítima aprovada pela Câmara Municipal. A modernização preserva essa conquista integralmente.', 's');
  hl.style.marginTop = '10px';
  leiSec.appendChild(hl);
  body.appendChild(leiSec);

  body.appendChild(mkCallout('O Achado nº 13 não diz que a jornada de 6 horas é irregular. Diz que 1.428 servidores estavam trabalhando acima de 30h/semana — acima do que a própria lei municipal determina. O problema é o descumprimento da jornada, não a jornada em si.', 'w'));

  /* Tabela de proteção */
  var tblSec = mk('div');
  tblSec.appendChild(mk('div', 'sec-label', 'Proteção da jornada nos dois regimes'));
  var wrap = mk('div', 'tbl-wrap');
  var tbl = mk('table', 'tbl');

  var thead = mk('thead');
  var hr = mk('tr');
  var ths = ['Aspecto', 'Regime CLT', 'Regime estatutário'];
  ths.forEach(function (h, i) {
    var th = mk('th', '', h);
    if (i === 0) th.style.width = '25%';
    hr.appendChild(th);
  });
  thead.appendChild(hr);
  tbl.appendChild(thead);

  var tbody = mk('tbody');
  var rows7 = [
    ['Base da jornada', 'Lei municipal LC 3.231 e 3.242/2003', 'Pode ser fixada diretamente no novo estatuto por lei municipal'],
    ['Para alterar', 'Precisa de nova lei municipal pela Câmara', 'Precisa de nova lei municipal pela Câmara — mesma proteção democrática'],
    ['Irredutibilidade', 'Garantida pela LC 3.231/2003', 'Pode ser incorporada expressamente ao novo estatuto'],
    ['Risco de alteração', 'Existe — por nova lei municipal', 'Existe — por nova lei municipal (mesmo mecanismo)']
  ];
  rows7.forEach(function (row) {
    var tr = mk('tr');
    row.forEach(function (cell, ci) {
      var td = mk('td', '', cell);
      if (ci === 0) td.style.fontWeight = '500';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  tbl.appendChild(tbody);
  wrap.appendChild(tbl);
  tblSec.appendChild(wrap);
  body.appendChild(tblSec);

  pnl.appendChild(body);
  return pnl;
}

function render8() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p8';
  pnl.appendChild(mkPhead(MODULOS[8].chips, MODULOS[8].titulo, MODULOS[8].subtitulo));

  var body = mk('div', 'pbody');

  /* VS estabilidade */
  var vsCltItens = [
    { sym: '+', txt: 'Proteção contra demissão arbitrária existe', neg: false },
    { sym: '−', txt: 'Proteção é processual: exige ação na Justiça do Trabalho', neg: true },
    { sym: '−', txt: 'Ônus de provar o arbítrio é do servidor', neg: true },
    { sym: '−', txt: 'Resultado depende da jurisprudência local da JT', neg: true },
    { sym: '−', txt: 'Demissão sem justa causa gera verbas rescisórias, não reintegração automática', neg: true }
  ];
  var vsEstItens = [
    { sym: '+', txt: 'Estabilidade constitucional automática após 3 anos (art. 41, CF/88)', neg: false },
    { sym: '+', txt: 'Demissão sem PAD é nula de pleno direito — sem ação judicial', neg: false },
    { sym: '+', txt: 'Ônus da prova é da administração no PAD', neg: false },
    { sym: '+', txt: 'Garantia constitucional uniforme em todo o país', neg: false },
    { sym: '+', txt: '3 hipóteses taxativas de perda do cargo, apenas', neg: false }
  ];

  var vs = mk('div', 'vs');
  var cltCard = mk('div', 'vs-card vs-clt');
  cltCard.appendChild(mk('div', 'vs-head vs-head-b', 'Servidor CLT concursado (hoje)'));
  buildVsItems(vsCltItens, cltCard, true);
  var estCard = mk('div', 'vs-card vs-est');
  estCard.appendChild(mk('div', 'vs-head vs-head-g', 'Servidor estatutário (proposto)'));
  buildVsItems(vsEstItens, estCard, false);
  vs.appendChild(cltCard);
  vs.appendChild(estCard);
  body.appendChild(vs);

  /* Hipóteses de perda do cargo */
  var hipSec = mk('div');
  hipSec.appendChild(mk('div', 'sec-label', 'Hipóteses de perda do cargo no estatuto (taxativas)'));
  var g3 = mk('div', 'g3');
  g3.appendChild(mkCard('Sentença judicial', 'Decisão definitiva do Poder Judiciário transitada em julgado', '#bf8600'));
  g3.appendChild(mkCard('PAD', 'Processo Administrativo Disciplinar com contraditório e ampla defesa garantidos pela CF/88', '#bf8600'));
  g3.appendChild(mkCard('Avaliação negativa', 'Resultado negativo em avaliação periódica de desempenho, na forma de lei complementar', '#bf8600'));
  hipSec.appendChild(g3);
  body.appendChild(hipSec);

  body.appendChild(mkCallout('Fora dessas três hipóteses, a demissão do servidor estatutário estável é nula de pleno direito — automaticamente, sem necessidade de ação judicial para se defender.', 's'));

  pnl.appendChild(body);
  return pnl;
}

function render9() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p9';
  pnl.appendChild(mkPhead(MODULOS[9].chips, MODULOS[9].titulo, MODULOS[9].subtitulo));

  var body = mk('div', 'pbody');

  var tlSec = mk('div');
  buildTimeline(tlSec);
  body.appendChild(tlSec);

  body.appendChild(mkCallout('A ADI 2.135 (nov/2024) liberou o regime misto, mas não extinguiu o TAC nem as 17 irregularidades documentadas pela auditoria INTEC. O processo de modernização é necessário independentemente da decisão do STF.', 'i'));

  pnl.appendChild(body);
  return pnl;
}

function render10() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p10';
  pnl.appendChild(mkPhead(MODULOS[10].chips, MODULOS[10].titulo, MODULOS[10].subtitulo));

  var body = mk('div', 'pbody');

  /* Estrutura das comissões */
  var comSec = mk('div');
  comSec.appendChild(mk('div', 'sec-label', 'Estrutura das comissões'));
  comSec.appendChild(mkFlowStep('Comissão Geral Coordenadora', '5 membros titulares + 1 suplente · Coordenada pela Secretaria de Administração · Instância central de deliberação', 'blue'));
  comSec.appendChild(mkArrow());
  var g2 = mk('div', 'g2');
  g2.appendChild(mkFlowStep('Setorial da Educação', '3 membros · 1 eleito pelos servidores', 'gray'));
  g2.appendChild(mkFlowStep('Setorial da Saúde', '3 membros · 1 eleito pelos servidores', 'gray'));
  g2.appendChild(mkFlowStep('Setorial das Demais Secretarias', '7 membros · 3 eleitos pelos servidores', 'gray'));
  g2.appendChild(mkFlowStep('Setorial do Estatuto do Servidor', '9 membros · 4 eleitos pelos servidores', 'gray'));
  comSec.appendChild(g2);
  body.appendChild(comSec);

  /* Cronograma */
  var cronSec = mk('div');
  cronSec.appendChild(mk('div', 'sec-label', 'Cronograma — 6 fases'));
  buildCronograma(cronSec);
  body.appendChild(cronSec);

  pnl.appendChild(body);
  return pnl;
}

function render11() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p11';
  pnl.appendChild(mkPhead(MODULOS[11].chips, MODULOS[11].titulo, MODULOS[11].subtitulo));

  var body = mk('div', 'pbody');
  var faqSec = mk('div');
  buildFaq(faqSec);
  body.appendChild(faqSec);

  pnl.appendChild(body);
  return pnl;
}

function render12() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p12';
  pnl.appendChild(mkPhead(MODULOS[12].chips, MODULOS[12].titulo, MODULOS[12].subtitulo));

  var body = mk('div', 'pbody');

  body.appendChild(mkCallout('Estas afirmações circulam entre servidores e na imprensa. Cada uma é analisada abaixo com base nos textos legais aplicáveis ao contexto de Cataguases.', 'i'));

  MITOS.forEach(function (item, i) {
    var card = mk('div', 'mito-card');

    var mitoRow = mk('div', 'mito-row');
    var mitoPill = mk('span', 'pill pill-r mito-pill', 'MITO ' + (i + 1));
    var mitoTxt = mk('div', 'mito-txt', item.mito);
    mitoRow.appendChild(mitoPill);
    mitoRow.appendChild(mitoTxt);

    var sep = mk('div', 'mito-sep');

    var fatoRow = mk('div', 'mito-row');
    var fatoPill = mk('span', 'pill pill-g mito-pill', 'FATO');
    var fatoTxt = mk('div', 'mito-fato-txt', item.fato);
    fatoRow.appendChild(fatoPill);
    fatoRow.appendChild(fatoTxt);

    var lei = mk('div', 'mito-lei', item.lei);

    card.appendChild(mitoRow);
    card.appendChild(sep);
    card.appendChild(fatoRow);
    card.appendChild(lei);
    body.appendChild(card);
  });

  pnl.appendChild(body);
  return pnl;
}

function render13() {
  var pnl = mk('div', 'pnl');
  pnl.id = 'p13';
  pnl.appendChild(mkPhead(MODULOS[13].chips, MODULOS[13].titulo, MODULOS[13].subtitulo));

  var body = mk('div', 'pbody');

  body.appendChild(mkCallout('Todos os dados abaixo derivam diretamente dos 17 achados da auditoria INTEC 2024. Nenhum valor foi estimado ou projetado — referências ao número do achado permitem cruzamento com o Módulo 01.', 'i'));

  SETORES.forEach(function (setor) {
    var card = mk('div', 'setor-card');

    var header = mk('div', 'setor-header');
    var dot = mk('span', 'setor-dot');
    dot.style.background = setor.cor;
    var nome = mk('span', 'setor-nome', setor.nome);
    header.appendChild(dot);
    header.appendChild(nome);
    card.appendChild(header);

    var desc = mk('div', 'setor-desc', setor.descricao);
    card.appendChild(desc);

    var lista = mk('div', 'setor-lista');
    setor.itens.forEach(function (item) {
      var row = mk('div', 'setor-item setor-item--' + item.tipo);
      var sym = mk('span', 'setor-sym');
      sym.textContent = item.tipo === 's' ? '✓' : item.tipo === 'd' ? '!' : '▲';
      var txt = mk('span', 'setor-item-txt', item.texto);
      row.appendChild(sym);
      row.appendChild(txt);
      lista.appendChild(row);
    });
    card.appendChild(lista);

    var refs = mk('div', 'setor-refs', setor.refs);
    card.appendChild(refs);

    body.appendChild(card);
  });

  pnl.appendChild(body);
  return pnl;
}

/* ============================================================
   Navegação
   ============================================================ */

var RENDERERS = [
  render0, render1, render2, render3, render4, render5,
  render6, render7, render8, render9, render10, render11,
  render12, render13
];

/**
 * Navega para o módulo de índice idx.
 * Atualiza sidebar e exibe o painel correspondente.
 * @param {number} idx - índice do módulo (0–11)
 */
function go(idx, skipHash) {
  var sbItems = document.querySelectorAll('.sb-item');
  var panels = document.querySelectorAll('.pnl');

  sbItems.forEach(function (it) { it.classList.remove('on'); });
  panels.forEach(function (p) { p.classList.remove('on'); });

  if (sbItems[idx]) sbItems[idx].classList.add('on');

  var pnl = document.getElementById('p' + idx);
  if (pnl) {
    pnl.classList.add('on');
    setTimeout(function() {
      var mainEl = document.querySelector('.main');
      if (mainEl) mainEl.scrollTop = 0;
    }, 0);
  }

  // Update currentIdx globally for keyboard nav
  window.currentIdx = idx;

  // Track progress
  try {
    var visited = JSON.parse(localStorage.getItem('modulos_visitados') || '[]');
    if (visited.indexOf(idx) === -1) {
      visited.push(idx);
      localStorage.setItem('modulos_visitados', JSON.stringify(visited));
    }
    // Update sidebar visually
    if (sbItems[idx]) sbItems[idx].classList.add('visited');
  } catch(e) {}

  if (!skipHash) {
    var newHash = 'modulo-' + (idx + 1);
    if (window.location.hash !== '#' + newHash) {
      if (history.pushState) {
        history.pushState(null, null, '#' + newHash);
      } else {
        window.location.hash = newHash;
      }
    }
  }

  var sb = document.getElementById('sidebar');
  var overlay = document.querySelector('.sb-overlay');
  if (sb) sb.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

/**
 * Pré-renderiza todos os 12 painéis no #main.
 */
function buildPanels() {
  var main = document.getElementById('main');
  if (!main) return;
  RENDERERS.forEach(function (renderFn) {
    main.appendChild(renderFn());
  });
  if (typeof applyGlossary === 'function') {
    applyGlossary(main);
  }
}
