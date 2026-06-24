/* ============================================================
   Administração: cadastra, lista e remove poções consumindo o
   Web Service via AJAX (fetch).
   ============================================================ */

const form = document.getElementById("form-pocao")
const botaoSalvar = document.getElementById("botao-salvar")
const tabela = document.getElementById("tabela-pocoes")
const estado = document.getElementById("estado-lista")
const contador = document.getElementById("contador")
const toast = document.getElementById("toast")

function formatarPreco(valor) {
  return `${Number(valor).toLocaleString("pt-BR")} moedas`
}

function escapar(texto) {
  const div = document.createElement("div")
  div.textContent = texto == null ? "" : String(texto)
  return div.innerHTML
}

let toastTimer
function mostrarToast(mensagem, erro = false) {
  toast.textContent = mensagem
  toast.style.borderColor = erro ? "var(--vermelho-selo)" : "var(--ouro)"
  toast.classList.add("toast--visivel")
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove("toast--visivel"), 3200)
}

// Monta uma linha da lista de poções com botão de remover.
function criarLinha(pocao) {
  const linha = document.createElement("div")
  linha.className = "linha-pocao"
  linha.innerHTML = `
    <img class="linha-pocao__img" src="${escapar(pocao.imagem)}" alt="Poção ${escapar(pocao.nome)}" />
    <div class="linha-pocao__info">
      <div class="linha-pocao__nome">${escapar(pocao.nome)}</div>
      <div class="linha-pocao__desc">${escapar(pocao.descricao)}</div>
    </div>
    <span class="linha-pocao__preco">${formatarPreco(pocao.preco)}</span>
    <button class="botao botao--perigo" type="button" data-id="${pocao.id}" data-nome="${escapar(pocao.nome)}">
      Remover
    </button>
  `
  linha.querySelector("button").addEventListener("click", () => removerPocao(pocao.id, pocao.nome))
  return linha
}

// Lista todas as poções (AJAX GET).
async function carregarPocoes() {
  try {
    const resposta = await fetch("/api/pocoes")
    if (!resposta.ok) throw new Error("Falha na resposta do servidor")
    const pocoes = await resposta.json()

    tabela.innerHTML = ""
    contador.textContent = pocoes.length

    if (!pocoes.length) {
      tabela.innerHTML = '<p class="aviso">Nenhuma poção cadastrada ainda.</p>'
      return
    }

    pocoes.forEach((pocao) => tabela.appendChild(criarLinha(pocao)))
  } catch (erro) {
    console.log("[v0] Erro ao listar poções:", erro.message)
    tabela.innerHTML = '<p class="aviso aviso--erro">Não foi possível carregar as poções.</p>'
  }
}

// Cadastra uma nova poção (AJAX POST).
async function cadastrarPocao(evento) {
  evento.preventDefault()

  const dados = {
    nome: form.nome.value.trim(),
    descricao: form.descricao.value.trim(),
    imagem: form.imagem.value.trim(),
    preco: form.preco.value,
  }

  if (!dados.nome || !dados.descricao || !dados.imagem || dados.preco === "") {
    mostrarToast("Preencha todos os campos.", true)
    return
  }

  botaoSalvar.disabled = true
  botaoSalvar.textContent = "Cadastrando..."

  try {
    const resposta = await fetch("/api/pocoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    })

    const corpo = await resposta.json()
    if (!resposta.ok) throw new Error(corpo.erro || "Erro ao cadastrar")

    form.reset()
    mostrarToast(`Poção "${corpo.nome}" cadastrada com sucesso!`)
    await carregarPocoes()
  } catch (erro) {
    console.log("[v0] Erro ao cadastrar poção:", erro.message)
    mostrarToast(erro.message, true)
  } finally {
    botaoSalvar.disabled = false
    botaoSalvar.textContent = "Cadastrar poção"
  }
}

// Remove uma poção (AJAX DELETE).
async function removerPocao(id, nome) {
  if (!window.confirm(`Remover a poção "${nome}"?`)) return

  try {
    const resposta = await fetch(`/api/pocoes/${id}`, { method: "DELETE" })
    const corpo = await resposta.json()
    if (!resposta.ok) throw new Error(corpo.erro || "Erro ao remover")

    mostrarToast(`Poção "${nome}" removida.`)
    await carregarPocoes()
  } catch (erro) {
    console.log("[v0] Erro ao remover poção:", erro.message)
    mostrarToast(erro.message, true)
  }
}

form.addEventListener("submit", cadastrarPocao)
carregarPocoes()