// PAINEL.JS
// BUSCA AS INFORMAÇÕES DO USUÁRIO NO SERVIDOR
fetch('api/usuario')
    .then(resposta => resposta.json())
    .then(usuario => {
        //Atualiza o nome do usuário na pag dashboard
        document.getElementById("nome-usuario").textContent = usuario.displayName
        document.getElementById("email-usuario").textContent = usuario.emails[0]. value
    })
    .catch(erro =>{
        console.error("Erro ao buscar dados do usuário", erro)
        window.location.href = '/'
        // redireciona para a pag inicial caso der erro
    })