/* conteudo-modulos.js — Dados embutidos dos painéis */

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

if (typeof module !== 'undefined') {
  module.exports = {
    MOD1_EH: MOD1_EH,
    MOD1_NAOE: MOD1_NAOE,
    MOD1_PILARES: MOD1_PILARES,
    MOD4_VS_CLT: MOD4_VS_CLT,
    MOD4_VS_EST: MOD4_VS_EST,
    MOD6_PCCV_PODE: MOD6_PCCV_PODE,
    MOD6_PCCV_NAO: MOD6_PCCV_NAO,
    MOD6_PCCV_FLOW: MOD6_PCCV_FLOW
  };
}
