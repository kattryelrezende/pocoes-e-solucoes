# Poções & Soluções

Loja de poções medieval da bruxa **Annabelle Merigold**, no Beco da Última Saída.
Projeto da Atividade Prática 2 (SCC0219), com tema medieval.

## Tecnologias

Conforme a especificação:

- **Web Service:** Node.js + Express
- **Banco de dados:** Sequelize + sqlite3 (em memória — os dados são recriados a cada reinício)
- **Frontend:** HTML, CSS e JavaScript puro (Vanilla) consumindo a API via **AJAX** (`fetch`)

## Estrutura

```
.
├── server.js            # Servidor Express + rotas da API + arquivos estáticos
├── db.js                # Conexão Sequelize (sqlite em memoria), modelo Poção e seed
├── public/
│   ├── index.html       # Página do comprador (loja, história, contato)
│   ├── admin.html       # Página de administração (cadastrar / listar / remover)
│   ├── css/styles.css   # Tema medieval 
│   ├── js/store.js      # Carrega as poções na loja via AJAX
│   ├── js/admin.js      # CRUD da administração via AJAX
│   └── images/          # Imagens das poções e do cenário
└── package.json
```

## Como executar

```bash
npm install      # ou pnpm install
npm start        # inicia o servidor em http://localhost:3000
```

- Loja do comprador: `http://localhost:3000/`
- Administração: `http://localhost:3000/admin.html`

> Observacao: o banco é **em memoria**. Toda vez que o servidor reinicia,
> as 6 poções iniciais são recriadas e quaisquer alterações são perdidas.

## API (Web Service)

| Metodo | Rota               | Descricao                          |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/api/pocoes`      | Lista todas as poções              |
| GET    | `/api/pocoes/:id`  | Retorna uma poção                  |
| POST   | `/api/pocoes`      | Cadastra uma poção                 |
| DELETE | `/api/pocoes/:id`  | Remove uma poção                   |

Corpo esperado no `POST` (JSON):

```json
{
  "nome": "Poção da Coragem",
  "descricao": "Deixa o bebedor destemido por uma noite.",
  "preco": 250,
  "imagem": "https://algum-site/minha-pocao.png"
}
```

## Funcionalidades

### Página do comprador
- Descrição da loja e do que é vendido
- História da loja (fundada em 1867)
- Catálogo de poções carregado dinamicamente da API
- Rodapé com informações de contato

### Página de administração
- Formulário para cadastrar novas poções
- Lista de todas as poções cadastradas
- Botão para remover poções
