import { Sequelize, DataTypes } from "sequelize"

// Cria a conexão com o banco SQLite em modo memória.
// Os dados existem apenas enquanto o servidor estiver em execução.
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
})

// Modelo Pocao: nome, descrição, imagem e preço (em moedas).
const Pocao = sequelize.define(
  "Pocao",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Guardamos apenas a URL/caminho da imagem, conforme permitido pela atividade.
    imagem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.INTEGER, // valor em "moedas"
      allowNull: false,
      validate: { min: 0 },
    },
  },
  {
    tableName: "pocoes",
  },
)

// Poções iniciais usadas para popular o banco (exemplos fornecidos na atividade).
const POCOES_INICIAIS = [
  {
    nome: "Poção Blue Sky",
    descricao:
      "Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.",
    imagem: "https://i.ibb.co/ZzS7xb2/rsz-sky.png",
    preco: 300,
  },
  {
    nome: "Poção do Perfume Misterioso",
    descricao:
      "Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.",
    imagem: "https://i.ibb.co/pyhZJXf/rsz-lilas.png",
    preco: 200,
  },
  {
    nome: "Poção de Pinus",
    descricao:
      "Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.",
    imagem: "https://i.ibb.co/DkzdL1q/rsz-pinus.png",
    preco: 3000,
  },
  {
    nome: "Poção da Beleza Eterna",
    descricao: "Veneno que mata rápido.",
    imagem: "https://i.ibb.co/9p872NK/rsz-1beleza.png",
    preco: 100,
  },
  {
    nome: "Poção do Arco-Íris",
    descricao: "Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.",
    imagem: "https://i.ibb.co/PrC09MP/rsz-2unicornio.png",
    preco: 120,
  },
  {
    nome: "Caldeirão das Verdades Secretas",
    descricao:
      "As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.",
    imagem: "https://i.ibb.co/s9Lyvj8/rsz-verdades.png",
    preco: 150,
  },
]

// Cria as tabelas e insere as poções iniciais.
export async function inicializarBanco() {
  await sequelize.sync({ force: true })
  await Pocao.bulkCreate(POCOES_INICIAIS)
  console.log("[v0] Banco em memória inicializado com", POCOES_INICIAIS.length, "poções.")
}

export { sequelize, Pocao }