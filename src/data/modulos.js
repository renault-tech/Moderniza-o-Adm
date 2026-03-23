/* modulos.js — metadados dos 12 módulos do painel */

var MODULOS = [
  {
    id: 0,
    num: '01',
    label: 'Diagnóstico e auditoria',
    color: '#e8453c',
    badge: '17',
    group: 'Contexto',
    titulo: 'Diagnóstico e auditoria INTEC 2024',
    subtitulo: 'O Instituto INTEC realizou auditoria completa da folha de pagamento de 2024 e identificou 17 não conformidades com impacto financeiro e risco jurídico imediato para o município e para os servidores.',
    chips: [
      { label: 'Módulo 01', cls: 'pill-r' },
      { label: '17 achados', cls: 'pill-w' }
    ]
  },
  {
    id: 1,
    num: '02',
    label: 'O que é a modernização',
    color: '#0071e3',
    badge: null,
    group: 'Contexto',
    titulo: 'O que é a modernização administrativa',
    subtitulo: 'Um processo de regularização jurídica, valorização real e construção participativa de uma nova estrutura funcional para os servidores do município.',
    chips: [
      { label: 'Módulo 02', cls: 'pill-b' }
    ]
  },
  {
    id: 2,
    num: '03',
    label: 'O que é a CLT',
    color: '#6e6ce3',
    badge: null,
    group: 'Regimes jurídicos',
    titulo: 'O que é o regime CLT',
    subtitulo: 'A Consolidação das Leis do Trabalho foi criada em 1943 para regular relações de trabalho no setor privado. Entenda sua natureza, o que protege e seus limites no serviço público municipal.',
    chips: [
      { label: 'Módulo 03', cls: '', style: 'background:#EEEDFE;color:#3C3489' }
    ]
  },
  {
    id: 3,
    num: '04',
    label: 'O que é o estatuto',
    color: '#2d9d57',
    badge: null,
    group: 'Regimes jurídicos',
    titulo: 'O que é o regime estatutário',
    subtitulo: 'O Regime Jurídico Único dos servidores públicos — sua natureza constitucional, princípios e o que ele oferece estruturalmente ao servidor de Cataguases.',
    chips: [
      { label: 'Módulo 04', cls: 'pill-g' }
    ]
  },
  {
    id: 4,
    num: '05',
    label: 'CLT vs Estatuto',
    color: '#bf8600',
    badge: null,
    group: 'Regimes jurídicos',
    titulo: 'CLT vs Estatuto: comparativo completo',
    subtitulo: 'Análise lado a lado dos dois regimes no contexto específico da Prefeitura de Cataguases, sem generalizações para outros entes federativos.',
    chips: [
      { label: 'Módulo 05', cls: 'pill-w' }
    ]
  },
  {
    id: 5,
    num: '06',
    label: 'FGTS e rendimento',
    color: '#2d9d57',
    badge: null,
    group: 'Direitos e carreira',
    titulo: 'FGTS: o que acontece na migração e comparativo de rendimento',
    subtitulo: 'O saldo acumulado não é perdido. Entenda o mecanismo de rescisão instrumental e a análise financeira comparativa do FGTS versus alternativas de investimento.',
    chips: [
      { label: 'Módulo 06', cls: 'pill-g' }
    ]
  },
  {
    id: 6,
    num: '07',
    label: 'Plano de cargos (PCCV)',
    color: '#0071e3',
    badge: null,
    group: 'Direitos e carreira',
    titulo: 'Plano de cargos, carreiras e vencimentos (PCCV)',
    subtitulo: 'Estatuto e PCCV são instrumentos distintos e complementares. Entenda o que cada um faz e o que o PCCV pode e não pode oferecer ao servidor celetista.',
    chips: [
      { label: 'Módulo 07', cls: 'pill-b' }
    ]
  },
  {
    id: 7,
    num: '08',
    label: 'Jornada de 6 horas',
    color: '#2d9d57',
    badge: null,
    group: 'Direitos e carreira',
    titulo: 'A jornada de 6 horas: história, base legal e situação atual',
    subtitulo: 'A jornada de 30h/semana foi conquistada por lei municipal em 2003, com irredutibilidade salarial garantida. Entenda o que a auditoria realmente encontrou.',
    chips: [
      { label: 'Módulo 08', cls: 'pill-g' }
    ]
  },
  {
    id: 8,
    num: '09',
    label: 'Estabilidade',
    color: '#6e6ce3',
    badge: null,
    group: 'Direitos e carreira',
    titulo: 'Estabilidade: o que o servidor tem e o que o estatuto garante',
    subtitulo: 'A diferença entre proteção processual no regime CLT e estabilidade constitucional automática no regime estatutário, no contexto específico de Cataguases.',
    chips: [
      { label: 'Módulo 09', cls: '', style: 'background:#EEEDFE;color:#3C3489' }
    ]
  },
  {
    id: 9,
    num: '10',
    label: 'STF e TST: cronologia',
    color: '#bf8600',
    badge: null,
    group: 'Jurisprudência',
    titulo: 'Cronologia: STF e TST',
    subtitulo: 'As principais decisões dos tribunais superiores que formam o pano de fundo jurídico da modernização administrativa de Cataguases.',
    chips: [
      { label: 'Módulo 10', cls: 'pill-w' }
    ]
  },
  {
    id: 10,
    num: '11',
    label: 'Comissões e cronograma',
    color: '#0071e3',
    badge: null,
    group: 'Jurisprudência',
    titulo: 'Comissões, processo participativo e cronograma',
    subtitulo: 'A estrutura de participação dos servidores e o cronograma das 6 fases do processo de modernização.',
    chips: [
      { label: 'Módulo 11', cls: 'pill-b' },
      { label: 'Portaria 109/2026', cls: 'pill-g', style: 'margin-left:6px' }
    ]
  },
  {
    id: 11,
    num: '12',
    label: 'Perguntas frequentes',
    color: '#636366',
    badge: null,
    group: 'Jurisprudência',
    titulo: 'Perguntas frequentes dos servidores',
    subtitulo: 'Respostas diretas às principais dúvidas levantadas na Sessão da Câmara de 16/03/2026 e no processo de modernização, com fundamento jurídico.',
    chips: [
      { label: 'Módulo 12', cls: '', style: 'background:#F1EFE8;color:#444441' }
    ]
  },
  {
    id: 12,
    num: '13',
    label: 'Mitos vs Fatos',
    color: '#2d9d57',
    badge: '8',
    group: 'Contexto',
    titulo: 'Mitos vs Fatos: o que é verdade na modernização',
    subtitulo: 'Desmistificando as 8 afirmações mais comuns e equivocadas sobre o processo de modernização administrativa, com base legal e técnica.',
    chips: [
      { label: 'Módulo 13', cls: 'pill-g' },
      { label: '8 mitos', cls: 'pill-r' }
    ]
  },
  {
    id: 13,
    num: '14',
    label: 'Impactos por setor',
    color: '#bf8600',
    badge: '5',
    group: 'Contexto',
    titulo: 'Impactos por secretaria e setor',
    subtitulo: 'Como os 17 achados da auditoria INTEC e o processo de modernização afetam concretamente cada área da Prefeitura de Cataguases.',
    chips: [
      { label: 'Módulo 14', cls: 'pill-w' },
      { label: '5 setores', cls: 'pill-b' }
    ]
  }
];

if (typeof module !== 'undefined') module.exports = { MODULOS: MODULOS };
