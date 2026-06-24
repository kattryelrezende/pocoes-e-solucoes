/* ============================================================
   Loja (comprador): recupera as poções do Web Service via AJAX
   e monta a grade de produtos dinamicamente.
   ============================================================ */

// Ano atual no rodapé.
document.getElementById("ano").textContent = new Date().getFullYear()

const grade =
  document.getElementById("grade-pocoes") || document.getElementById("grade-Poções")
const estado =
  document.getElementById("estado-pocoes") || document.getElementById("estado-Poções")
const toast = document.getElementById("toast")

// Formata o preço em "moedas".
function formatarPreco(valor) {
  return `${Number(valor).toLocaleString("pt-BR")} moedas`
}

// Escapa texto para evitar injeção de HTML ao montar os cards.
function escapar(texto) {
  const div = document.createElement("div")
  div.textContent = texto == null ? "" : String(texto)
  return div.innerHTML
}

// Mostra uma mensagem temporária (toast) na tela.
let toastTimer
function mostrarToast(message) {
  toast.textContent = message
  toast.classList.add("toast--visivel")
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove("toast--visivel"), 3000)
}

// Monta o HTML de um card de poção.
function criarCard(pocao) {
  const artigo = document.createElement("article")
  artigo.className = "card"
  artigo.innerHTML = `
    <div class="card__figura">
      <img src="${escapar(pocao.imagem)}" alt="Poção ${escapar(pocao.nome)}" loading="lazy" />
    </div>
    <div class="card__corpo">
      <h3 class="card__nome">${escapar(pocao.nome)}</h3>
      <p class="card__descricao">${escapar(pocao.descricao)}</p>
      <div class="card__rodape">
        <span class="card__preco">${formatarPreco(pocao.preco)}<span>Preço</span></span>
        <button class="botao botao--esmeralda" type="button" data-nome="${escapar(pocao.nome)}">
          Comprar
        </button>
      </div>
    </div>
  `
  // O botão "Comprar" não precisa de funcionalidade real nesta entrega.
  artigo.querySelector("button").addEventListener("click", (evento) => {
    mostrarToast(`"${evento.currentTarget.dataset.nome}" foi reservada! (compra ainda não implementada)`)
  })
  return artigo
}

// Recupera as poções do Web Service usando AJAX (fetch).
async function carregarPocoes() {
  try {
    const resposta = await fetch("/api/pocoes")
    if (!resposta.ok) throw new Error("Falha na resposta do servidor")
    const pocoes = await resposta.json()

    grade.innerHTML = ""

    if (!pocoes.length) {
      grade.innerHTML = '<p class="aviso">Nenhuma poção cadastrada no momento. Volte em breve!</p>'
      return
    }

    pocoes.forEach((pocao) => grade.appendChild(criarCard(pocao)))
  } catch (erro) {
    console.log("[v0] Erro ao carregar poções:", erro.message)
    grade.innerHTML =
      '<p class="aviso aviso--erro">Não foi possível invocar as poções. Verifique se o servidor está em execução e tente novamente.</p>'
  }
}

carregarPocoes()