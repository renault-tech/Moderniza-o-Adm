-- migration_001_ativo.sql
-- Adiciona campo de controle de visibilidade (ativo) em todas as tabelas de conteudo.
-- Proposito: permitir que o admin desative registros sem excluir os dados.
-- Retroativo: DEFAULT true garante que todos os registros existentes recebam ativo = true automaticamente.
-- Seguro para reexecutar: ADD COLUMN IF NOT EXISTS e idempotente.
-- Execucao: Dashboard Supabase > SQL Editor > colar e executar.
-- URL do projeto: https://qnsqqgtdgcscqlziikdc.supabase.co

ALTER TABLE public.modulos      ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT true;
ALTER TABLE public.achados      ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT true;
ALTER TABLE public.faq          ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT true;
ALTER TABLE public.timeline     ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT true;
ALTER TABLE public.cronograma   ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT true;
ALTER TABLE public.setores      ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT true;
ALTER TABLE public.mitos        ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT true;
ALTER TABLE public.comparativos ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT true;

-- Verificacao pos-migration (executar separadamente no SQL Editor):
-- SELECT table_name, column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_schema = 'public'
--   AND column_name = 'ativo'
-- ORDER BY table_name;
-- Esperado: 8 linhas, uma por tabela listada acima.
