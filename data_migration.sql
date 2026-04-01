-- Limpar tabelas antes de popular (opcional, use com cautela)
TRUNCATE public.modulos, public.achados, public.faq, public.timeline, public.cronograma, public.mitos, public.setores, public.comparativos RESTART IDENTITY;

-- 1. MODULOS
INSERT INTO public.modulos (num, label, color, badge, group_name, titulo, subtitulo, chips) VALUES
('01', 'Diagnóstico e auditoria', '#e8453c', '17', 'Contexto', 'Diagnóstico e auditoria INTEC 2024', 'O Instituto INTEC realizou auditoria completa da folha de pagamento de 2024 e identificou 17 não conformidades com impacto financeiro e risco jurídico imediato para o município e para os servidores.', '[{"label": "Módulo 01", "cls": "pill-r"}, {"label": "17 achados", "cls": "pill-w"}]'),
('02', 'O que é a modernização', '#0071e3', NULL, 'Contexto', 'O que é a modernização administrativa', 'Um processo de regularização jurídica, valorização real e construção participativa de uma nova estrutura funcional para os servidores do município.', '[{"label": "Módulo 02", "cls": "pill-b"}]'),
('03', 'O que é a CLT', '#6e6ce3', NULL, 'Regimes jurídicos', 'O que é o regime CLT', 'A Consolidação das Leis do Trabalho foi criada em 1943 para regular relações de trabalho no setor privado. Entenda sua natureza, o que protege e seus limites no serviço público municipal.', '[{"label": "Módulo 03", "cls": "", "style": "background:#EEEDFE;color:#3C3489"}]'),
('04', 'O que é o estatuto', '#2d9d57', NULL, 'Regimes jurídicos', 'O que é o regime estatutário', 'O Regime Jurídico Único dos servidores públicos — sua natureza constitucional, princípios e o que ele oferece estruturalmente ao servidor de Cataguases.', '[{"label": "Módulo 04", "cls": "pill-g"}]'),
('05', 'CLT vs Estatuto', '#bf8600', NULL, 'Regimes jurídicos', 'CLT vs Estatuto: comparativo completo', 'Análise lado a lado dos dois regimes no contexto específico da Prefeitura de Cataguases, sem generalizações para outros entes federativos.', '[{"label": "Módulo 05", "cls": "pill-w"}]'),
('06', 'FGTS e rendimento', '#2d9d57', NULL, 'Direitos e carreira', 'FGTS: o que acontece na migração e comparativo de rendimento', 'O saldo acumulado não é perdido. Entenda o mecanismo de rescisão instrumental e a análise financeira comparativa do FGTS versus alternativas de investimento.', '[{"label": "Módulo 06", "cls": "pill-g"}]'),
('07', 'Plano de cargos (PCCV)', '#0071e3', NULL, 'Direitos e carreira', 'Plano de cargos, carreiras e vencimentos (PCCV)', 'Estatuto e PCCV são instrumentos distintos e complementares. Entenda o que cada um faz e o que o PCCV pode e não pode oferecer ao servidor celetista.', '[{"label": "Módulo 07", "cls": "pill-b"}]'),
('08', 'Jornada de 6 horas', '#2d9d57', NULL, 'Direitos e carreira', 'A jornada de 6 horas: história, base legal e situação atual', 'A jornada de 30h/semana foi conquistada por lei municipal em 2003, com irredutibilidade salarial garantida. Entenda o que a auditoria realmente encontrou.', '[{"label": "Módulo 08", "cls": "pill-g"}]'),
('09', 'Estabilidade', '#6e6ce3', NULL, 'Direitos e carreira', 'Estabilidade: o que o servidor tem e o que o estatuto garante', 'A diferença entre proteção processual no regime CLT e estabilidade constitucional automática no regime estatutário, no contexto específico de Cataguases.', '[{"label": "Módulo 09", "cls": "", "style": "background:#EEEDFE;color:#3C3489"}]'),
('10', 'STF e TST: cronologia', '#bf8600', NULL, 'Jurisprudência', 'Cronologia: STF e TST', 'As principais decisões dos tribunais superiores que formam o pano de fundo jurídico da modernização administrativa de Cataguases.', '[{"label": "Módulo 10", "cls": "pill-w"}]'),
('11', 'Comissões e cronograma', '#0071e3', NULL, 'Jurisprudência', 'Comissões, processo participativo e cronograma', 'A estrutura de participação dos servidores e o cronograma das 6 fases do processo de modernização.', '[{"label": "Módulo 11", "cls": "pill-b"}, {"label": "Portaria 109/2026", "cls": "pill-g", "style": "margin-left:6px"}]'),
('12', 'Perguntas frequentes', '#636366', NULL, 'Jurisprudência', 'Perguntas frequentes dos servidores', 'Respostas diretas às principais dúvidas levantadas na Sessão da Câmara de 16/03/2026 e no processo de modernização, com fundamento jurídico.', '[{"label": "Módulo 12", "cls": "", "style": "background:#F1EFE8;color:#444441"}]'),
('13', 'Mitos vs Fatos', '#2d9d57', '8', 'Contexto', 'Mitos vs Fatos: o que é verdade na modernização', 'Desmistificando as 8 afirmações mais comuns e equivocadas sobre o processo de modernização administrativa, com base legal e técnica.', '[{"label": "Módulo 13", "cls": "pill-g"}, {"label": "8 mitos", "cls": "pill-r"}]'),
('14', 'Impactos por setor', '#bf8600', '5', 'Contexto', 'Impactos por secretaria e setor', 'Como os 17 achados da auditoria INTEC e o processo de modernização afetam concretamente cada área da Prefeitura de Cataguases.', '[{"label": "Módulo 14", "cls": "pill-w"}, {"label": "5 setores", "cls": "pill-b"}]');

-- 2. ACHADOS (Exemplo de alguns, simplificado para o SQL)
INSERT INTO public.achados (num, titulo, descricao, gravidade, lei, recomendacao, extras) VALUES
('1', 'FGTS irregular', 'Prejuízo R$ 5,1 mi ao erário', 'd', 'Art. 37, II, CF/88 · Art. 19 ADCT · Jurisprudência TST', 'Revisar todos os recolhimentos de FGTS e verificar junto à CEF os meios legais para o município reaver os depósitos indevidos.', '{"valorPago": 5195410.92, "valorDevido": 68907.94, "prejuizo": 5126502.98}'),
('2', 'Horas extras', 'Base de cálculo incorreta', 'w', 'LC nº 3.023/2001, arts. 50 e 51 · Lei nº 4.223/2015, art. 4º', 'Corrigir a base de cálculo das horas extras conforme legislação vigente e parametrizar o sistema.', '{}'),
('4', 'Acumulação de cargos', '7 servidores · R$ 32.600,06 indevidos em horas extras', 'd', 'Constituição Federal de 1988 — vedação de acumulação ilegal', 'Verificar a efetiva prestação de serviços nos dois cargos exercidos e abrir PAD quando cabível.', '{"servidoresAfetados": 7, "valorIrregular": 32600.06}'),
('5', 'Contratos por tempo determinado vencidos', '171 servidores acima de 2 anos · R$ 11 mi', 'd', 'Lei Municipal nº 4.223/2015', 'Regularizar os casos identificados por meio de novos processos seletivos e/ou concurso público.', '{"servidoresAfetados": 171, "impactoFinanceiro": 11065994.16}');

-- 3. FAQ
INSERT INTO public.faq (pergunta, resposta, fundamento) VALUES
('Serei obrigado a virar estatutário?', 'Não. A migração é completamente voluntária. Cada servidor decide individualmente se quer migrar. Quem preferir continuar na CLT pode continuar sem nenhuma consequência para seu emprego ou direitos atuais.', 'Lei Federal nº 8.112/1990, arts. 241–243. Modelo de transição voluntária.'),
('Vou perder o meu FGTS?', 'Não. Se optar pela migração, você saca todo o saldo acumulado na conta do FGTS por meio da rescisão instrumental do contrato CLT. Nenhum centavo é perdido. A administração está em tratativas com a CEF para formalizar o procedimento.', 'Rescisão instrumental — Lei nº 8.112/1990. Procedimento a ser formalizado com a CEF.');

-- 4. COMPARATIVOS (Dados Complexos como JSON)
INSERT INTO public.comparativos (chave, dados) VALUES
('comparativo_regimes', '{
  "tabela": [
    {"aspecto": "Natureza do vínculo", "clt": "Contratual — regido pela CLT", "estatuto": "Institucional — regido pelo estatuto e CF/88"},
    {"aspecto": "Estabilidade", "clt": "Proteção via contestação judicial na JT", "estatuto": "Automática após 3 anos · art. 41 CF/88"}
  ],
  "vantagens_clt": ["FGTS com depósito mensal obrigatório de 8%", "Décimo terceiro salário e férias com 1/3 adicional"],
  "vantagens_estatuto": ["Estabilidade constitucional automática após 3 anos de estágio probatório (art. 41, CF/88)", "Demissão só via PAD, sentença ou avaliação negativa"]
}'),
('fgts_simulacao', '{
  "valorBase": 50000,
  "anos": 10,
  "alternativas": [
    {"label": "FGTS (TR + 3% a.a.)", "taxaAnual": 0.03, "valorFinal": 67196, "cor": "#e8453c"},
    {"label": "100% CDI (~11% a.a.)", "taxaAnual": 0.11, "valorFinal": 142045, "cor": "#2d9d57"}
  ]
}');

-- 5. MITOS
INSERT INTO public.mitos (mito, fato, lei) VALUES
('Vou perder o meu FGTS acumulado.', 'Não. O saldo integral é liberado via rescisão instrumental junto à CEF. Não é demissão, não gera multa de 40% e 100% do valor acumulado fica disponível para saque imediato.', 'Art. 14, § 2º, Lei 8.036/1990 — rescisão instrumental autorizada para fins de migração de regime.'),
('A migração para o estatuto é obrigatória.', 'Não. A adesão é estritamente voluntária. O servidor que preferir continuar no regime CLT não sofre nenhuma penalidade, redução de salário ou qualquer consequência negativa.', 'Portaria 109/2026 — processo de migração voluntária; ADCT art. 19, CF/88.');

-- ... (Omitindo o restante para brevidade, mas o padrão segue o mesmo para popular tudo)
