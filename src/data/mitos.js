/* mitos.js — 8 mitos e fatos sobre a modernização administrativa */

var MITOS = [
  {
    mito: 'Vou perder o meu FGTS acumulado.',
    fato: 'Não. O saldo integral é liberado via rescisão instrumental junto à CEF. Não é demissão, não gera multa de 40% e 100% do valor acumulado fica disponível para saque imediato.',
    lei: 'Art. 14, § 2º, Lei 8.036/1990 — rescisão instrumental autorizada para fins de migração de regime.'
  },
  {
    mito: 'A migração para o estatuto é obrigatória.',
    fato: 'Não. A adesão é estritamente voluntária. O servidor que preferir continuar no regime CLT não sofre nenhuma penalidade, redução de salário ou qualquer consequência negativa.',
    lei: 'Portaria 109/2026 — processo de migração voluntária; ADCT art. 19, CF/88.'
  },
  {
    mito: 'Vou perder a jornada de 6 horas (30h/semana).',
    fato: 'Não. A jornada de 30h/semana foi estabelecida por lei municipal (LCs 3.231 e 3.242/2003) e será incorporada ao novo estatuto. A irredutibilidade salarial impede qualquer redução.',
    lei: 'LC 3.231/2003 e LC 3.242/2003 — Cataguases; art. 7º, VI, CF/88 (irredutibilidade).'
  },
  {
    mito: 'Terei que fazer novo concurso público ou novo estágio probatório.',
    fato: 'Não. O aproveitamento do tempo de serviço anterior é integral. Quem migrar é investido imediatamente no cargo estatutário equivalente, sem novo concurso e sem novo estágio probatório.',
    lei: 'ADCT art. 19, CF/88 — estabilidade especial para servidores com mais de 5 anos à data da promulgação; Portaria 109/2026.'
  },
  {
    mito: 'Meu salário vai diminuir com a mudança de regime.',
    fato: 'Não. A irredutibilidade de vencimentos é garantia constitucional expressa. Nenhum servidor pode ter seu salário reduzido em decorrência da migração.',
    lei: 'Art. 37, XV, CF/88 — irredutibilidade dos vencimentos dos servidores públicos.'
  },
  {
    mito: 'O estatuto pode ser alterado pela prefeitura a qualquer momento, prejudicando servidores.',
    fato: 'Apenas fatos futuros podem ser regulados por nova lei. Direitos adquiridos, atos jurídicos perfeitos e situações jurídicas já consolidadas são intangíveis pela legislação superveniente.',
    lei: 'Art. 5º, XXXVI, CF/88 — direito adquirido; Súmula 51, TST — proteção de cláusulas contratuais já incorporadas.'
  },
  {
    mito: 'No estatuto não tenho proteção contra demissão — posso ser mandado embora mais facilmente.',
    fato: 'Ao contrário: a estabilidade constitucional (art. 41, CF/88) só permite demissão via PAD com contraditório, sentença judicial transitada em julgado ou avaliação periódica negativa. Na CLT, a proteção depende de ação na Justiça do Trabalho.',
    lei: 'Art. 41, CF/88 — estabilidade após 3 anos de efetivo exercício; art. 41, § 1º — hipóteses taxativas de perda do cargo.'
  },
  {
    mito: 'Quem não migrar será prejudicado ou pressionado pela prefeitura.',
    fato: 'Não. O contrato CLT continua plenamente vigente. O FGTS segue sendo depositado (8% mensais), todos os direitos trabalhistas são preservados e o servidor não sofre nenhum tipo de discriminação.',
    lei: 'Art. 468, CLT — vedação de alteração contratual lesiva; art. 3º, IV, CF/88 — proibição de discriminação.'
  }
];

if (typeof module !== 'undefined') module.exports = { MITOS: MITOS };
