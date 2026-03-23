/* setores.js — impactos da modernização por secretaria/setor */
/* Todos os dados numéricos derivam diretamente dos 17 achados INTEC 2024 */

var SETORES = [
  {
    nome: 'Toda a folha de pagamento',
    cor: '#e8453c',
    descricao: 'Achados que afetam a totalidade dos 2.573 servidores ativos, independentemente do setor.',
    itens: [
      {
        tipo: 'd',
        texto: 'FGTS depositado de forma irregular para grande parte do quadro — prejuízo de R$ 5.126.502,98 (Achado 1). Risco de cobrança pelo Ministério Público e pela CEF.'
      },
      {
        tipo: 'w',
        texto: '1.428 servidores registram jornada acima de 30h/semana sem amparo legal identificado (Achado 13). Risco de ação trabalhista coletiva.'
      },
      {
        tipo: 'd',
        texto: '171 contratos por tempo determinado ultrapassaram o prazo máximo de 2 anos — impacto financeiro de R$ 11.065.994,16 (Achado 5). Irregularidade estrutural com risco de nulidade dos vínculos.'
      },
      {
        tipo: 'w',
        texto: 'Base de cálculo das horas extras aplicada incorretamente em toda a folha (Achado 2). Servidores podem estar recebendo valores superiores ou inferiores ao devido.'
      },
      {
        tipo: 's',
        texto: 'A migração para o estatuto encerra os contratos CLT irregulares via rescisão instrumental, eliminando o risco jurídico dos vínculos vencidos para quem aderir voluntariamente.'
      }
    ],
    refs: 'Achados 1, 2, 5, 13'
  },
  {
    nome: 'Saúde',
    cor: '#e8453c',
    descricao: 'Servidores da ESF, médicos, enfermeiros, agentes comunitários de saúde e saúde mental.',
    itens: [
      {
        tipo: 'd',
        texto: 'Adicional ESF pago a 44 servidores sem base legal identificada — impacto de R$ 1.252.224,62 (Achado 10). Risco de devolução retroativa e responsabilidade do ordenador de despesa.'
      },
      {
        tipo: 'w',
        texto: 'Médicos psiquiatras recebendo gratificação de permanência abaixo do valor devido conforme Lei nº 4.344/2016 (Achado 11). Necessário revisão e complementação.'
      },
      {
        tipo: 'w',
        texto: 'Gratificação de periculosidade com pagamentos irregulares — parte dos servidores recebe a mais e parte recebe a menos conforme Lei nº 4.342/2016 (Achado 6).'
      },
      {
        tipo: 's',
        texto: 'O estatuto permite fixar adicionais específicos por lei municipal, dando base jurídica estável para gratificações de saúde sem risco de questionamento.'
      }
    ],
    refs: 'Achados 6, 10, 11'
  },
  {
    nome: 'Educação',
    cor: '#0071e3',
    descricao: 'Professores, pedagogos, coordenadores pedagógicos e demais servidores das unidades de ensino.',
    itens: [
      {
        tipo: 'w',
        texto: '450 servidores estão recebendo adicional por tempo de serviço abaixo do valor correto (Achado 12), calculado incorretamente com base nas datas de admissão.'
      },
      {
        tipo: 'w',
        texto: '22 servidores da Educação recebem adicional por tempo de serviço acima do devido — risco de cobrança dos valores pagos a maior (Achado 12). Valor total pago a mais: R$ 67.365,57.'
      },
      {
        tipo: 's',
        texto: 'A modernização inclui a elaboração do PCCV, que estabelece progressões e adicionais com critérios claros e base legal, encerrando as inconsistências do adicional por tempo de serviço.'
      }
    ],
    refs: 'Achado 12 — LC nº 3.800/2009'
  },
  {
    nome: 'Procuradoria Municipal',
    cor: '#6e6ce3',
    descricao: 'Procuradores e advogados públicos municipais.',
    itens: [
      {
        tipo: 'w',
        texto: 'Honorários de sucumbência pagos em desconformidade com a legislação — falta lei municipal específica que regulamente o tema para procuradores (Achado 17).'
      },
      {
        tipo: 's',
        texto: 'O processo de modernização prevê a edição de lei municipal específica para procuradores, regularizando os honorários e dando segurança jurídica ao pagamento.'
      }
    ],
    refs: 'Achado 17'
  },
  {
    nome: 'Contratos e Compras',
    cor: '#bf8600',
    descricao: 'Agentes de contratação e servidores que atuam em processos licitatórios.',
    itens: [
      {
        tipo: 'w',
        texto: 'Agentes de contratação recebem abaixo do devido conforme a nova lei de licitações (Lei Federal nº 14.133/2021) combinada com a Lei Municipal nº 4.946/2023 (Achado 14).'
      },
      {
        tipo: 's',
        texto: 'A revisão dos valores no contexto do PCCV corrigirá a defasagem e adequará a remuneração à responsabilidade exigida pela Lei nº 14.133/2021.'
      }
    ],
    refs: 'Achado 14 — Lei Federal nº 14.133/2021'
  }
];

if (typeof module !== 'undefined') module.exports = { SETORES: SETORES };
