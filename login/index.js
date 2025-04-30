const express = require('express')
const mysql = require('mysql2')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const porta = 3000

// Conexão com o MySQL
const banco = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Miguel@2007',
    database: 'sistema_login'
})

banco.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar com o MySQL", erro)
        return
    }
    console.log("Conectado ao MySQL")
})

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'segredo',
    resave: true,
    saveUninitialized: true
}))

// Rotas de páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"))
})

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "cadastro.html"))
})

// Cadastro
app.post('/cadastro', async (req, res) => {
    const { nome, senha } = req.body
    const senhaCriptografada = await bcrypt.hash(senha, 10)

    banco.query("INSERT INTO usuario (nome, senha) VALUES (?, ?)", [nome, senhaCriptografada],
        (erro) => {
            if (erro) {
                console.error("Erro ao cadastrar", erro)
                return res.status(500).send("Erro ao cadastrar usuário")
            }
            res.redirect('/login')
        }
    )
})

// Login
app.post('/login', async (req, res) => {
    const { nome, senha } = req.body

    banco.query("SELECT * FROM usuario WHERE nome = ?", [nome], async (erro, resultado) => {
        if (erro) {
            console.error("Erro no login", erro)
            return res.status(500).send("Erro no login")
        }

        if (resultado.length === 0) {
            return res.status(401).send("Usuário não encontrado")
        }

        const usuario = resultado[0]
        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (senhaValida) {
            req.session.logado = true
            req.session.nome = nome
            res.redirect('/painel')
        } else {
            res.status(401).send("Senha incorreta")
        }
    })
})

// Painel
app.get('/painel', (req, res) => {
    if (req.session.logado) {
        res.sendFile(path.join(__dirname, "public", "painel.html"))
    } else {
        res.redirect('/login')
    }
})

// Logout
app.get('/sair', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

// Inicia servidor
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
})
