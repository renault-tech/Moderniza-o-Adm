# Deploy e publicação

## Opções de publicação

### Opção 1 — Pasta estática offline-first (mais simples)

O portal público funciona sem build e sem dependências externas, mas deve ser distribuído com a pasta `src/` junto do `index.html`:

```bash
# Servir com Python (sem instalação adicional)
python3 -m http.server 8080
# Acessar em: http://localhost:8080
```

Para distribuir: enviar a pasta do projeto compactada, preservando `index.html` e `src/`.

### Opção 2 — Servidor estático local (Prefeitura)

Copiar a pasta do projeto para o servidor da intranet da prefeitura:

```bash
# A pasta completa do projeto vai para:
/var/www/html/modernizacao/

# Ou no IIS (Windows Server):
C:\inetpub\wwwroot\modernizacao\
```

Acessível em: `http://intranet.cataguases.mg.gov.br/modernizacao`

### Opção 3 — Portal da Transparência

Copiar `index.html` para o diretório público do portal:

```bash
scp -r ./modernizacao-cataguases/ usuario@servidor:/var/www/portal/modernizacao/
```

### Opção 4 — GitHub Pages (gratuito, sem servidor)

```bash
# Inicializar repositório Git
git init
git add .
git commit -m "Painel modernização administrativa v1.0"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/prefeitura-cataguases/modernizacao
git push -u origin main

# Ativar GitHub Pages nas configurações do repositório
# Selecionar: Settings → Pages → Source: main → /root
# URL gerada: https://prefeitura-cataguases.github.io/modernizacao
```

### Opção 5 — Aplicativo Cataguases Mais

Para integrar ao app Cataguases Mais, o painel pode ser exibido como WebView:
- URL do servidor interno: `http://[ip-servidor]/modernizacao/`
- Ou embutir o HTML diretamente como asset local no app

---

## Verificação antes do deploy

```bash
# 1. Verificar HTML válido
npx html-validate index.html

# 2. Testar todos os módulos manualmente
# Abrir no browser e clicar em cada um dos 14 itens do sidebar
# Verificar que o conteúdo aparece corretamente (sem código-fonte visível)

# 3. Testar FAQ
# Abrir módulo 12 e clicar em cada pergunta
# Verificar que abre e fecha corretamente

# 4. Testar em mobile
# Abrir DevTools → Toggle device toolbar → iPhone 12 (390px)
# Verificar que o conteúdo é legível

# 5. Testar offline
# Desconectar da internet e abrir o arquivo
# Verificar que tudo funciona (sem dependências externas)
```

---

## Versionamento

Ao publicar uma nova versão:

1. Atualizar a data no rodapé do sidebar em `index.html`
2. Documentar as alterações no `CHANGELOG.md`
3. Fazer backup da versão anterior antes de substituir

---

## Backup

Manter backup das versões anteriores:

```
/backup/modernizacao/
  v1.0-2026-03-18.html
  v1.1-2026-04-01.html
  v2.0-2026-05-15.html
```
