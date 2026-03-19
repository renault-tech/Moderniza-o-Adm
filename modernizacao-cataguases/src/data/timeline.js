var TIMELINE = [
  {
    status: 'ok',
    data: '1943',
    titulo: 'Decreto-Lei nº 5.452 — a CLT',
    descricao: 'Criada para regular relações de trabalho no setor privado, com foco na proteção do trabalhador hipossuficiente. Não foi concebida para a administração pública direta.',
    badge: null,
    referencia: 'Decreto-Lei nº 5.452/1943'
  },
  {
    status: 'ok',
    data: '1988',
    titulo: 'CF/88 — arts. 37 e 39',
    descricao: 'A Constituição exige concurso público para ingresso no serviço público (art. 37, II) e originalmente determinava Regime Jurídico Único para todos os servidores da administração direta, autárquica e fundacional (art. 39).',
    badge: null,
    referencia: 'CF/88, arts. 37 e 39'
  },
  {
    status: 'ok',
    data: '1990',
    titulo: 'Lei Federal nº 8.112/1990',
    descricao: 'Institui o Regime Jurídico dos Servidores Públicos Civis da União. Os arts. 241 a 243 estabelecem o modelo de migração voluntária CLT→estatutário, com aproveitamento integral do tempo de serviço anterior. Este é o precedente federal que Cataguases seguirá.',
    badge: 'Modelo do município',
    referencia: 'Lei Federal nº 8.112/1990, arts. 241–243'
  },
  {
    status: 'ok',
    data: '1998',
    titulo: 'EC nº 19/1998 — Reforma administrativa',
    descricao: 'Emenda Constitucional suprimiu a obrigatoriedade do Regime Jurídico Único do art. 39 da CF/88, permitindo regime misto (CLT + estatutário) na administração pública. Contestada por vício formal no processo legislativo.',
    badge: null,
    referencia: 'Emenda Constitucional nº 19/1998'
  },
  {
    status: 'ok',
    data: '1999',
    titulo: 'STF suspende EC 19/1998 — ADI 2.135',
    descricao: 'O STF concede liminar suspendendo os efeitos da EC 19/1998 por vício formal no processo legislativo. O julgamento fica suspenso por 25 anos, gerando incerteza jurídica nacional sobre qual regime é obrigatório na administração direta.',
    badge: null,
    referencia: 'ADI 2.135 — liminar de 1999'
  },
  {
    status: 'ok',
    data: '2017',
    titulo: 'TST — ArgInc 105100/1996',
    descricao: 'O Tribunal Pleno do TST firma entendimento: a transmudação automática de regime CLT→estatutário é válida apenas para servidores estáveis pelo art. 19 do ADCT (admitidos antes de 05/10/1983 sem concurso). Para os demais, não é possível a transmudação automática.',
    badge: 'Referência para Cataguases',
    referencia: 'TST — ArgInc 105100-93.1996.5.04.0018, DEJT 18/9/2017'
  },
  {
    status: 'ok',
    data: 'nov/2024',
    titulo: 'STF julga ADI 2.135 — decisão definitiva',
    descricao: 'O STF, por maioria, declara CONSTITUCIONAL a EC 19/1998 e a supressão do Regime Jurídico Único. Municípios podem ter servidores nos dois regimes simultaneamente. Importante: essa decisão NÃO revoga TACs já firmados nem sana irregularidades documentadas.',
    badge: 'Marco central',
    referencia: 'STF — ADI 2.135, novembro/2024'
  },
  {
    status: 'ok',
    data: '2024',
    titulo: 'TST — Súmula 390',
    descricao: 'Consolida entendimento sobre estabilidade do servidor público celetista concursado da administração direta: tem direito à estabilidade do art. 41 da CF/88. A proteção existe, mas é processualmente diferente da estabilidade estatutária automática.',
    badge: null,
    referencia: 'TST — Súmula nº 390'
  },
  {
    status: 'now',
    data: '2026',
    titulo: 'Cataguases — Processo em curso',
    descricao: 'Com base no panorama pós-ADI 2.135 e no TAC com o MP/MG, o município inicia a modernização administrativa. O modelo é voluntário, baseado na Lei 8.112/1990, com consulta formal à CEF sobre o procedimento de rescisão instrumental para saque do FGTS.',
    badge: 'Fase atual',
    referencia: 'Portaria nº 109/2026 · Contrato INTEC nº 016/2025'
  }
];

if (typeof module !== 'undefined') module.exports = { TIMELINE: TIMELINE };
