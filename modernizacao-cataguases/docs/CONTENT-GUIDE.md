# Guia de atualização de conteúdo

Este guia é para quem precisa atualizar informações no painel sem conhecimento técnico de programação. As alterações são feitas nos arquivos da pasta `src/data/`.

---

## Atualizar um achado de auditoria

Arquivo: `src/data/achados.js`

Cada achado tem esta estrutura:

```javascript
{
  num: '1',                          // número do achado (não alterar)
  titulo: 'FGTS irregular',          // título curto para o card
  descricao: 'Prejuízo R$ 5,1 mi',  // descrição curta para o card
  gravidade: 'd',                    // 'd' = danger (vermelho) ou 'w' = warning (amarelo)
  lei: 'Art. 37, II, CF/88',        // referência legal
  recomendacao: 'Texto...'           // recomendação do auditor
}
```

Para atualizar o valor financeiro de um achado, localize o achado pelo número e altere os campos `valorPago`, `valorDevido` ou `impactoFinanceiro`.

---

## Atualizar uma pergunta frequente

Arquivo: `src/data/faq.js`

Cada pergunta tem esta estrutura:

```javascript
{
  pergunta: 'Texto da pergunta?',
  resposta: 'Texto completo da resposta...',
  fundamento: 'Referência legal curta.'
}
```

Para adicionar uma nova pergunta, copie um bloco existente, cole ao final da lista (antes do `]`) e preencha os três campos. Lembre de adicionar uma vírgula após o `}` do item anterior.

---

## Atualizar o cronograma

Arquivo: `src/data/cronograma.js`

Para marcar uma fase como concluída:
- Altere `status: 'pend'` para `status: 'ok'`
- Atualize o campo `data` com a data real de conclusão

Para marcar uma fase como em andamento:
- Altere o `status` para `'now'`
- Mantenha apenas uma fase com status `'now'` por vez

---

## Atualizar a linha do tempo jurídica

Arquivo: `src/data/timeline.js`

Para adicionar um novo evento jurídico:

```javascript
{
  status: 'ok',          // 'ok' = concluído, 'now' = atual, 'pend' = futuro
  data: '2026',          // data ou período
  titulo: 'Nome do evento ou lei',
  descricao: 'Descrição completa do evento e seus impactos.',
  badge: null,           // null ou texto curto para destaque (ex: 'Marco central')
  referencia: 'Lei/decisão de referência'
}
```

---

## Regras para não errar

1. Não remova as vírgulas entre os itens dos arrays
2. Não use aspas duplas dentro de campos de texto — use aspas simples ou caractere `'`
3. Preserve os campos `num` dos achados — eles são a chave de identificação
4. Não altere valores financeiros sem confirmação do auditor responsável
5. Não altere referências legais sem validação da Procuradoria Municipal
