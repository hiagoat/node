const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,//0 que o usuario digita = entrada
    output: process.stdout// que aparece para ele = saída
})
let resolvidos = {
    grampeador: false,
    papeis: false,
    almofada: false
}

function menuPrincipal() {
    console.log("\nVoce esta em uma sala trancada")
    console.log("Ao seu redor, voce vê:")
    console.log("1. Um grampeador velho")
    console.log("2. Um monte de papeis amassados na mesa")
    console.log("3. Uma almofada fora do lugar")
    console.log("4. Tentar abrir a porta")

    rl.question("nO que você deseja fazer?", (resposta) => {
        switch (resposta.trim()) {
            case "1":
                investigarGrampeador()
                break
            case "2":
                investigarPapeis()
                break
            case "3":
                investigarAlmofada()
                break
            case "4":
                verificarSaida()
                break
            default:
                console.log("Escolha inválida")
                menuPrincipal()
        }
    })
}
function investigarGrampeador() {
    if (resolvidos.grampeador) {
        console.log("Você ja resolveu esse desafio")
        return menuPrincipal()
    }
    rl.question("\n Dentro do grampeador tem um bilhete: 'Sou cheio de buracos, mas seguro a água. O que eu sou?'", (resposta) => {
        if (resposta.trim().toLowerCase() == "esponja") {
            console.log("Acertou! Você desbloqueou o chave que estava no grampeador") 
            resolvidos.grampeador = true
    } else {
            console.log("Resposta Errada. Tente novamente depois")
        }
        menuPrincipal()

    })
}
function investigarPapeis(){
    if(resolvidos.papeis){
        console.log("Você já resolveu esse desafio")
        return menuPrincipal()
    }
    rl.question("\nUm dos papéis diz: 'Qual palavra está sempre escrita errada no dicionário?'", (resposta) => {
        if(resposta.trim().toLowerCase() == "errada"){
            console.log("Acertou! Você encontrou a chave no meio dos papéis")
        } else {
            console.log("Errou! Não é isso")
        }
        menuPrincipal()
    })
}
function investigarAlmofada(){
    if(resolvidos.almofada){
        console.log("Você já resolveu esse desafio")
        return menuPrincipal()
    }
    rl.question("\nNa almofada, tem um enigma: 'Estou no começo, no meio, mas nunca no fim. Quem sou?'", (resposta) => {
        if(resposta.trim().toLowerCase().includes("letra e")){
            console.log("Você acertou! A chave estava dentro da almofada")
            resolvidos.almofada = true
        } else {
            console.log("Não é isso, Pense um pouco mais")
        }
        menuPrincipal()
    })
}
function verificarSaida(){
    if(resolvidos.grampeador && resolvidos.almofada && resolvidos.papeis){
        console.log("Você encontrou as 3 chaves")
        console.log("Parabéns, você escapou")
        rl.close
    } else {
        console.log("A porta ainda está fechada. Você não resolveu os enigmas")
        menuPrincipal()   
    }
}
console.log("Bem vindo ao Escape Room")
menuPrincipal()