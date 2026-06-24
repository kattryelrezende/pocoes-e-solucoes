import express from "express"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { inicializarBanco, Pocao } from "./db.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Permite ler corpo de requisições em JSON (usado pela página de administração).
app.use(express.json())

// Servimos os arquivos estáticos (HTML/CSS/JS/imagens) da pasta public.
app.use(express.static(path.join(__dirname, "public")))

/* ----------------------------- Web Service / API ----------------------------- */

// Listar todas as poções cadastradas.
app.get("/api/pocoes", async (req, res) => {
  try {
    const pocoes = await Pocao.findAll({ order: [["id", "ASC"]] })
    res.json(pocoes)
  } catch (erro) {
    console.log("[v0] Erro ao listar poções:", erro.message)
    res.status(500).json({ erro: "Não foi possível listar as poções." })
  }
})

// Buscar uma poção específica.
app.get("/api/pocoes/:id", async (req, res) => {
  try {
    const pocao = await Pocao.findByPk(req.params.id)
    if (!pocao) return res.status(404).json({ erro: "Poção não encontrada." })
    res.json(pocao)
  } catch (erro) {
    console.log("[v0] Erro ao buscar poção:", erro.message)
    res.status(500).json({ erro: "Não foi possível buscar a poção." })
  }
})

// Cadastrar uma nova poção.
app.post("/api/pocoes", async (req, res) => {
  try {
    const { nome, descricao, imagem, preco } = req.body

    if (!nome || !descricao || !imagem || preco === undefined || preco === "") {
      return res.status(400).json({ erro: "Preencha nome, descrição, imagem e preço." })
    }

    const precoNumero = Number(preco)
    if (Number.isNaN(precoNumero) || precoNumero < 0) {
      return res.status(400).json({ erro: "O preço deve ser um número maior ou igual a zero." })
    }

    const pocao = await Pocao.create({
      nome: String(nome).trim(),
      descricao: String(descricao).trim(),
      imagem: String(imagem).trim(),
      preco: Math.round(precoNumero),
    })

    res.status(201).json(pocao)
  } catch (erro) {
    console.log("[v0] Erro ao cadastrar poção:", erro.message)
    res.status(500).json({ erro: "Não foi possível cadastrar a poção." })
  }
})

// Remover uma poção.
app.delete("/api/pocoes/:id", async (req, res) => {
  try {
    const removidas = await Pocao.destroy({ where: { id: req.params.id } })
    if (removidas === 0) return res.status(404).json({ erro: "Poção não encontrada." })
    res.json({ mensagem: "Poção removida com sucesso." })
  } catch (erro) {
    console.log("[v0] Erro ao remover poção:", erro.message)
    res.status(500).json({ erro: "Não foi possível remover a poção." })
  }
})

/* --------------------------------- Início ----------------------------------- */

inicializarBanco()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[v0] Poções e Soluções rodando em http://localhost:${PORT}`)
    })
  })
  .catch((erro) => {
    console.log("[v0] Falha ao inicializar o banco:", erro.message)
    process.exit(1)
  })