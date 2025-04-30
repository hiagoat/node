// NODE -> MODULO FS -> SCRIPT.JS
const fs = require("fs")

fs.writeFileSync("mensagem.txt", "Oi, criei esse arquivo pelo node")
console.log("Arquivo criado com sucesso!")

const conteudo = fs.readFileSync("mensagem.txt", "utf-8")
console.log("Conteúdo do arquivo:")
console.log(conteudo)

function tarefaDemorada() {
    const agora = new Date();
    const futuro = agora.getTime() + 3000
    while (new Date().getTime() < futuro) {}
}

console.log("Iniciado o programa...")
console.log("Executando tarefa 1")
tarefaDemorada()
console.log("Tarefa 1 concluida")

console.log("Executando tarefa 2")
tarefaDemorada()
console.log("Tarefa 2 concluida")
console.log("Programa finalizado")