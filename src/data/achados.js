var ACHADOS = [
  {
    num: '1',
    titulo: 'FGTS irregular',
    descricao: 'Prejuízo R$ 5,1 mi ao erário',
    gravidade: 'd',
    valorPago: 5195410.92,
    valorDevido: 68907.94,
    prejuizo: 5126502.98,
    lei: 'Art. 37, II, CF/88 · Art. 19 ADCT · Jurisprudência TST',
    recomendacao: 'Revisar todos os recolhimentos de FGTS e verificar junto à CEF os meios legais para o município reaver os depósitos indevidos.'
  },
  {
    num: '2',
    titulo: 'Horas extras',
    descricao: 'Base de cálculo incorreta',
    gravidade: 'w',
    lei: 'LC nº 3.023/2001, arts. 50 e 51 · Lei nº 4.223/2015, art. 4º',
    recomendacao: 'Corrigir a base de cálculo das horas extras conforme legislação vigente e parametrizar o sistema.'
  },
  {
    num: '3',
    titulo: 'Adicional pós-graduação',
    descricao: 'Valores superiores e inferiores ao devido',
    gravidade: 'w',
    lei: 'LC nº 3.024/2001',
    recomendacao: 'Revisar os valores pagos e ajustar conforme fichas funcionais de cada servidor.'
  },
  {
    num: '4',
    titulo: 'Acumulação de cargos',
    descricao: '7 servidores · R$ 32.600,06 indevidos em horas extras',
    gravidade: 'd',
    servidoresAfetados: 7,
    valorIrregular: 32600.06,
    lei: 'Constituição Federal de 1988 — vedação de acumulação ilegal',
    recomendacao: 'Verificar a efetiva prestação de serviços nos dois cargos exercidos e abrir PAD quando cabível.'
  },
  {
    num: '5',
    titulo: 'Contratos por tempo determinado vencidos',
    descricao: '171 servidores acima de 2 anos · R$ 11 mi',
    gravidade: 'd',
    servidoresAfetados: 171,
    impactoFinanceiro: 11065994.16,
    lei: 'Lei Municipal nº 4.223/2015',
    recomendacao: 'Regularizar os casos identificados por meio de novos processos seletivos e/ou concurso público.'
  },
  {
    num: '6',
    titulo: 'Gratificação de periculosidade',
    descricao: 'Pagamentos irregulares (indevidos e inferiores)',
    gravidade: 'w',
    lei: 'Lei nº 4.342/2016',
    recomendacao: 'Revisar os valores pagos e corrigir conforme a legislação específica.'
  },
  {
    num: '7',
    titulo: 'Licença sem vencimento',
    descricao: '11 servidores com prazo superior ao legal',
    gravidade: 'w',
    servidoresAfetados: 11,
    lei: 'Lei Ordinária nº 3.024/2001, art. 62',
    recomendacao: 'Atualizar o sistema com registros de finalização das licenças e inserir dispositivo que impeça lançamentos acima do prazo legal.'
  },
  {
    num: '8',
    titulo: 'Gratificação de fiscalização',
    descricao: 'Pagamentos inferiores ao devido',
    gravidade: 'w',
    lei: 'LC nº 3.023/2001, art. 71',
    recomendacao: 'Inserir dispositivo no sistema que impeça lançamentos sem considerar o valor base do vencimento.'
  },
  {
    num: '9',
    titulo: 'Teto remuneratório',
    descricao: '1 servidor recebeu R$ 22.628,05 acima do teto legal',
    gravidade: 'd',
    servidoresAfetados: 1,
    lei: 'Lei Ordinária nº 3.023/2001',
    recomendacao: 'Ajustar a remuneração para o limite permitido por lei, parametrizando o sistema para não permitir lançamentos acima do percentual máximo.'
  },
  {
    num: '10',
    titulo: 'Adicional ESF',
    descricao: '44 serv. sem base legal · R$ 1.252.224,62',
    gravidade: 'd',
    servidoresAfetados: 44,
    impactoFinanceiro: 1252224.62,
    lei: 'LC nº 4.404/2017 · Lei Municipal nº 4.143/2014, Anexo I',
    recomendacao: 'Rastrear dispositivos legais que prevejam o pagamento do adicional ESF para servidores de outros cargos. Na ausência, excluir o adicional da folha.'
  },
  {
    num: '11',
    titulo: 'Permanência Médicos Psiquiatras',
    descricao: 'Pagamentos inferiores ao devido',
    gravidade: 'w',
    lei: 'Lei nº 4.344/2016',
    recomendacao: 'Revisar os valores pagos e ajustar o crédito devido com respectiva averbação em folha.'
  },
  {
    num: '12',
    titulo: 'Adicional por tempo de serviço (Educação)',
    descricao: '450 servidores prejudicados · 22 recebendo a mais',
    gravidade: 'w',
    servidoresAfetadosMais: 22,
    servidoresAfetadosMenos: 450,
    valorPagoSuperior: 109931.85,
    valorDevidoSuperior: 42566.28,
    lei: 'LC nº 3.800/2009',
    recomendacao: 'Revisar os valores pagos conforme as datas de admissão e ajustar os créditos devidos.'
  },
  {
    num: '13',
    titulo: 'Jornada de trabalho',
    descricao: '1.428 servidores acima de 30h/semana',
    gravidade: 'w',
    servidoresAfetados: 1428,
    lei: 'LC nº 3.242/2003 · LC nº 3.231/2003',
    recomendacao: 'Verificar individualmente as fichas dos servidores e buscar legislação específica que assegure a jornada superior a 30h. Na ausência, regularizar a jornada.'
  },
  {
    num: '14',
    titulo: 'Agentes de contratação',
    descricao: 'Pagamentos inferiores ao devido',
    gravidade: 'w',
    lei: 'Lei Federal nº 14.133/2021 · Lei Municipal nº 4.946/2023',
    recomendacao: 'Revisar os valores pagos e ajustar o crédito devido com respectiva averbação em folha.'
  },
  {
    num: '15',
    titulo: 'Progressão horizontal',
    descricao: 'Irregularidades identificadas',
    gravidade: 'w',
    lei: 'LC nº 3.023/2001 e LC nº 3.024/2001',
    recomendacao: 'Verificar as progressões realizadas e corrigir as inconsistências identificadas.'
  },
  {
    num: '16',
    titulo: 'Aposentadoria RPPS',
    descricao: 'Servidores aposentados sem amparo legal após 01/10/2010',
    gravidade: 'd',
    lei: 'Lei Municipal nº 3.811/2010 · Lei Municipal nº 3.865/2010',
    recomendacao: 'Verificar a situação de cada servidor aposentado e regularizar conforme o regime previdenciário aplicável.'
  },
  {
    num: '17',
    titulo: 'Honorários de sucumbência',
    descricao: 'Pagamentos em desconformidade com a legislação',
    gravidade: 'w',
    lei: 'Legislação específica sobre honorários de procuradores municipais',
    recomendacao: 'Editar lei municipal específica para procuradores e regularizar os pagamentos.'
  }
];

if (typeof module !== 'undefined') module.exports = { ACHADOS: ACHADOS };
