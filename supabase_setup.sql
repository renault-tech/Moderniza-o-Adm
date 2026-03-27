-- 1. Tabelas de Conteúdo

CREATE TABLE IF NOT EXISTS public.modulos (
    id SERIAL PRIMARY KEY,
    num TEXT,
    label TEXT,
    color TEXT,
    badge TEXT,
    group_name TEXT,
    titulo TEXT,
    subtitulo TEXT,
    chips JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.achados (
    id SERIAL PRIMARY KEY,
    num TEXT,
    titulo TEXT,
    descricao TEXT,
    gravidade TEXT,
    lei TEXT,
    recomendacao TEXT,
    extras JSONB, -- Para campos variados como servidoresAfetados, impactoFinanceiro, etc.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.faq (
    id SERIAL PRIMARY KEY,
    pergunta TEXT,
    resposta TEXT,
    fundamento TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.timeline (
    id SERIAL PRIMARY KEY,
    status TEXT,
    data_evento TEXT,
    titulo TEXT,
    descricao TEXT,
    badge TEXT,
    referencia TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cronograma (
    id SERIAL PRIMARY KEY,
    status TEXT,
    data_fase TEXT,
    fase TEXT,
    titulo TEXT,
    descricao TEXT,
    entregaveis JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.mitos (
    id SERIAL PRIMARY KEY,
    mito TEXT,
    fato TEXT,
    lei TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.setores (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    cor TEXT,
    descricao TEXT,
    itens JSONB,
    refs TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.comparativos (
    id SERIAL PRIMARY KEY,
    chave TEXT UNIQUE, -- ex: 'comparativo_regimes', 'fgts_simulacao', 'fgts_fluxo'
    dados JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar RLS (Row Level Security)

ALTER TABLE public.modulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cronograma ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mitos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.setores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comparativos ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Segurança

-- Política: Acesso público apenas para leitura (Anon)
CREATE POLICY "Leitura pública para todos" ON public.modulos FOR SELECT USING (true);
CREATE POLICY "Leitura pública para todos" ON public.achados FOR SELECT USING (true);
CREATE POLICY "Leitura pública para todos" ON public.faq FOR SELECT USING (true);
CREATE POLICY "Leitura pública para todos" ON public.timeline FOR SELECT USING (true);
CREATE POLICY "Leitura pública para todos" ON public.cronograma FOR SELECT USING (true);
CREATE POLICY "Leitura pública para todos" ON public.mitos FOR SELECT USING (true);
CREATE POLICY "Leitura pública para todos" ON public.setores FOR SELECT USING (true);
CREATE POLICY "Leitura pública para todos" ON public.comparativos FOR SELECT USING (true);

-- Política: Acesso total para usuários autenticados (Admin)
CREATE POLICY "Admin pode tudo" ON public.modulos FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin pode tudo" ON public.achados FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin pode tudo" ON public.faq FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin pode tudo" ON public.timeline FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin pode tudo" ON public.cronograma FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin pode tudo" ON public.mitos FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin pode tudo" ON public.setores FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin pode tudo" ON public.comparativos FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Função para atualizar o 'updated_at' automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_modulos_updated_at BEFORE UPDATE ON public.modulos FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_achados_updated_at BEFORE UPDATE ON public.achados FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
-- ... repetir para as demais se necessário, mas o básico está feito.
