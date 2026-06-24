# Pocoes & Solucoes

Loja de pocoes medieval da bruxa **Annabelle Merigold**, no Beco da Ultima Saida.
Projeto da Atividade Pratica 2 (SCC0219), com tema medieval em estilo cartunesco.

## Tecnologias

Conforme a especificacao, sem dependencias alem do necessario:

- **Web Service:** Node.js + Express
- **Banco de dados:** Sequelize + sqlite3 (em memoria — os dados sao recriados a cada reinicio)
- **Frontend:** HTML, CSS e JavaScript puro (Vanilla) consumindo a API via **AJAX** (`fetch`)

## Estrutura

```
.
├── server.js            # Servidor Express + rotas da API + arquivos estaticos
├── db.js                # Conexao Sequelize (sqlite em memoria), modelo Pocao e seed
├── public/
│   ├── index.html       # Pagina do comprador (loja, historia, contato)
│   ├── admin.html       # Pagina de administracao (cadastrar / listar / remover)
│   ├── css/styles.css   # Tema medieval cartunesco
│   ├── js/store.js      # Carrega as pocoes na loja via AJAX
│   ├── js/admin.js      # CRUD da administracao via AJAX
│   └── images/          # Imagens cartunescas das pocoes e do cenario
└── package.json
```

## Como executar

```bash
npm install      # ou pnpm install
npm start        # inicia o servidor em http://localhost:3000
```

- Loja do comprador: `http://localhost:3000/`
- Administracao: `http://localhost:3000/admin.html`

> Observacao: o banco e **em memoria**. Toda vez que o servidor reinicia,
> as 6 pocoes iniciais sao recriadas e quaisquer alteracoes sao perdidas.

## API (Web Service)

| Metodo | Rota               | Descricao                          |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/api/pocoes`      | Lista todas as pocoes              |
| GET    | `/api/pocoes/:id`  | Retorna uma pocao                  |
| POST   | `/api/pocoes`      | Cadastra uma pocao                 |
| DELETE | `/api/pocoes/:id`  | Remove uma pocao                   |

Corpo esperado no `POST` (JSON):

```json
{
  "nome": "Pocao da Coragem",
  "descricao": "Deixa o bebedor destemido por uma noite.",
  "preco": 250,
  "imagem": "/images/minha-pocao.png"
}
```

## Funcionalidades

### Pagina do comprador
- Descricao da loja e do que e vendido
- Historia da loja (fundada em 1867)
- Catalogo de pocoes carregado dinamicamente da API
- Rodape com informacoes de contato

### Pagina de administracao
- Formulario para cadastrar novas pocoes
- Lista de todas as pocoes cadastradas
- Botao para remover pocoes
