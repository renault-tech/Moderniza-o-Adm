var COMPARATIVO_REGIMES = {
  tabela: [
    {
      aspecto: 'Natureza do vínculo',
      clt: 'Contratual — regido pela CLT',
      estatuto: 'Institucional — regido pelo estatuto e CF/88'
    },
    {
      aspecto: 'Estabilidade',
      clt: 'Proteção via contestação judicial na JT',
      estatuto: 'Automática após 3 anos · art. 41 CF/88'
    },
    {
      aspecto: 'FGTS',
      clt: '8% mensal obrigatório pelo empregador',
      estatuto: 'Saldo sacado na transição · sem depósito futuro'
    },
    {
      aspecto: 'Previdência',
      clt: 'INSS (regime geral)',
      estatuto: 'INSS — mesma situação (sem RPPS em Cataguases)'
    },
    {
      aspecto: 'Jornada 30h/semana',
      clt: 'LC 3.231 e 3.242/2003 — base legal existente',
      estatuto: 'Mantida e incorporada ao novo estatuto por lei municipal'
    },
    {
      aspecto: 'Progressão futura',
      clt: 'Pode ser alterada antes de ser atingida (Súmula 51 TST)',
      estatuto: 'Direito do cargo — aplicada automaticamente ao atingir a condição'
    },
    {
      aspecto: 'Foro de disputas',
      clt: 'Justiça do Trabalho',
      estatuto: 'Vara de Fazenda Pública'
    },
    {
      aspecto: 'Demissão',
      clt: 'Requer motivação · contestável na JT',
      estatuto: 'Só via PAD · sentença judicial · avaliação negativa'
    },
    {
      aspecto: 'Irredutibilidade salarial',
      clt: 'Protegida pelo art. 468 da CLT',
      estatuto: 'Garantida pela CF/88 (art. 37, XV)'
    },
    {
      aspecto: 'Alteração das regras',
      clt: 'Vantagens incorporadas ao contrato individual são protegidas',
      estatuto: 'Lei pode alterar apenas fatos futuros; direitos adquiridos protegidos'
    }
  ],

  vantagens_clt: [
    'FGTS com depósito mensal obrigatório de 8%',
    'Décimo terceiro salário e férias com 1/3 adicional',
    'Jornada 30h/semana garantida por lei municipal (LCs 3.231 e 3.242/2003)',
    'Inalterabilidade lesiva — alterações contratuais lesivas são vedadas (art. 468 CLT)',
    'Acesso à Justiça do Trabalho especializada em direitos sociais',
    'Proteção das vantagens já incorporadas ao contrato individual'
  ],

  desvantagens_clt: [
    'Estabilidade apenas processual — depende de ação na Justiça do Trabalho para se efetivar',
    'Progressões futuras menos protegidas — podem ser alteradas antes de serem atingidas (Súmula 51 TST)',
    'Regime estruturalmente irregular na administração direta municipal (MP)',
    'Vínculo contratual — direitos decorrem do contrato, não diretamente da lei pública',
    'FGTS depositado irregularmente para grande parte do quadro — risco de cobrança'
  ],

  vantagens_estatuto: [
    'Estabilidade constitucional automática após 3 anos de estágio probatório (art. 41, CF/88)',
    'Demissão só via PAD, sentença ou avaliação negativa — sem essas hipóteses, é nula de pleno direito',
    'Progressões futuras são direito do cargo — aplicadas automaticamente ao cumprir a condição',
    'Jornada pode ser fixada diretamente por lei municipal sem negociação coletiva',
    'Irredutibilidade de vencimentos garantida pela CF/88 (art. 37, XV)',
    'Processo disciplinar rigoroso com contraditório e ampla defesa obrigatórios',
    'Regime regular e compatível com a administração direta municipal'
  ],

  desvantagens_estatuto: [
    'Sem FGTS mensal futuro — saldo acumulado é sacado integralmente na transição via rescisão instrumental',
    'Alterações legislativas dependem de aprovação na Câmara (mesmo risco que a CLT tem por nova lei)',
    'Estágio probatório obrigatório para novos ingressantes (dispensado para quem migrar por já ter estabilidade)'
  ]
};

var FGTS_SIMULACAO = {
  valorBase: 50000,
  anos: 10,
  alternativas: [
    {
      label: 'FGTS (TR + 3% a.a.)',
      taxaAnual: 0.03,
      valorFinal: 67196,
      percentualAcumulado: 34,
      cor: '#e8453c',
      larguraBarra: 23
    },
    {
      label: 'Poupança (~6% a.a.)',
      taxaAnual: 0.06,
      valorFinal: 89542,
      percentualAcumulado: 79,
      cor: '#bf8600',
      larguraBarra: 44
    },
    {
      label: '100% CDI (~11% a.a.)',
      taxaAnual: 0.11,
      valorFinal: 142045,
      percentualAcumulado: 184,
      cor: '#2d9d57',
      larguraBarra: 100
    },
    {
      label: 'Tesouro Selic (~11% a.a.)',
      taxaAnual: 0.11,
      valorFinal: 142045,
      percentualAcumulado: 184,
      cor: '#0071e3',
      larguraBarra: 100
    }
  ]
};

var FGTS_FLUXO = [
  {
    titulo: 'Servidor decide migrar voluntariamente',
    descricao: 'Decisão individual, sem pressão ou prazo forçado. O servidor que preferir continuar na CLT não sofre nenhuma consequência.',
    estilo: 'gray'
  },
  {
    titulo: 'Prefeitura formaliza a rescisão instrumental junto à CEF',
    descricao: 'O contrato CLT é extinto formalmente apenas para fins de liberação do FGTS. Não é demissão. Não gera multa de 40%.',
    estilo: 'blue'
  },
  {
    titulo: 'Servidor saca o saldo integral da conta vinculada',
    descricao: '100% do valor acumulado disponível para saque imediato. O servidor pode aplicar em investimentos de maior rendimento.',
    estilo: 'green'
  },
  {
    titulo: 'Imediata investidura no cargo estatutário equivalente',
    descricao: 'Com aproveitamento integral do tempo de serviço anterior. Sem novo estágio probatório. Sem redução de vencimentos.',
    estilo: 'green'
  },
  {
    titulo: 'Regime estatutário vigente a partir daí',
    descricao: 'Direitos regidos pelo novo estatuto e pela CF/88. Sem novos depósitos de FGTS. Estabilidade constitucional do art. 41.',
    estilo: 'blue'
  }
];

if (typeof module !== 'undefined') {
  module.exports = {
    COMPARATIVO_REGIMES: COMPARATIVO_REGIMES,
    FGTS_SIMULACAO: FGTS_SIMULACAO,
    FGTS_FLUXO: FGTS_FLUXO
  };
}
