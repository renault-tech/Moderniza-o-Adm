var CRONOGRAMA = [
  {
    status: 'ok',
    data: '2024–2025',
    fase: 'Fase 1',
    titulo: 'Diagnóstico',
    descricao: 'Contratação do INTEC (Contrato nº 016/2025) · Auditoria completa da folha de pagamento referente ao exercício de 2024 · Identificação dos 17 achados · Entrega do Relatório Final de Auditoria Trabalhista',
    entregaveis: [
      'Relatório Final de Auditoria Trabalhista INTEC',
      'Matriz dos 17 achados de conformidade',
      'Diagnóstico do quadro de 2.573 servidores'
    ]
  },
  {
    status: 'ok',
    data: 'fev/2026',
    fase: 'Fase 2',
    titulo: 'Estruturação participativa',
    descricao: 'Publicação da Portaria nº 1.551/2025 (Comissão Geral Coordenadora) · Publicação da Portaria nº 109/2026 (estrutura completa das comissões setoriais) · Realização das eleições para representantes setoriais · Posse dos representantes eleitos',
    entregaveis: [
      'Portaria nº 109/2026 publicada',
      'Eleições realizadas em 28/02/2026',
      'Comissões setoriais empossadas'
    ]
  },
  {
    status: 'now',
    data: '2026 — em curso',
    fase: 'Fase 3',
    titulo: 'Construção dos instrumentos',
    descricao: 'INTEC elabora a minuta do novo Estatuto dos Servidores · INTEC elabora o novo organograma municipal e o PCCV (Plano de Cargos, Carreiras e Vencimentos) · Comissões setoriais analisam as minutas e propõem ajustes por área',
    entregaveis: [
      'Minuta do novo Estatuto (INTEC)',
      'Novo organograma municipal',
      'Novo PCCV unificado',
      'Relatórios periódicos das comissões setoriais'
    ]
  },
  {
    status: 'pend',
    data: 'a definir',
    fase: 'Fase 4',
    titulo: 'Audiências públicas',
    descricao: 'Consulta ampla a todos os 2.573 servidores municipais · Período de contribuições e emendas ao texto das minutas · Consolidação final dos documentos incorporando as contribuições',
    entregaveis: [
      'Audiências públicas por secretaria',
      'Relatório de contribuições dos servidores',
      'Documentos consolidados pós-audiências'
    ]
  },
  {
    status: 'pend',
    data: 'a definir',
    fase: 'Fase 5',
    titulo: 'Tramitação legislativa',
    descricao: 'Envio dos projetos de lei à Câmara Municipal · Debates, audiências legislativas e votação · Aprovação e publicação das novas leis (Estatuto e PCCV)',
    entregaveis: [
      'Projetos de lei protocolados na Câmara',
      'Aprovação do novo Estatuto',
      'Aprovação do novo PCCV'
    ]
  },
  {
    status: 'pend',
    data: 'a definir',
    fase: 'Fase 6',
    titulo: 'Implementação e migração',
    descricao: 'Publicação das novas leis no Diário Oficial · Abertura do prazo formal para migração voluntária de regime · Enquadramento de todos os servidores na nova estrutura de cargos e vencimentos · Rescisões instrumentais e saques do FGTS',
    entregaveis: [
      'Publicação do Estatuto e do PCCV',
      'Período de opção de migração aberto',
      'Rescisões instrumentais processadas junto à CEF',
      'Enquadramento de todos os servidores no novo PCCV'
    ]
  }
];

if (typeof module !== 'undefined') module.exports = { CRONOGRAMA: CRONOGRAMA };
