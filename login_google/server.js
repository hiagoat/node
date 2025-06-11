// SERVER.JS
// Carregando as configurações

require('dotenv').config()

if (!process.env.ID || !process.env.SECRET) {
    console.error("ERRO: As credenciais não estão configuradas")
    process.exit(1)
}

const express = require("express")
const sessao = require("express-session")
const passport = require("passport")
const Google = require("passport-google-oauth20").Strategy
const mysql = require("mysql2/promise")

const app = express()

app.use(sessao({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'senai',
    database: process.env.DB_NAME || 'login_db',
})

async function criarTabela() {
    try {
        const conn = await db.getConnection();
        await conn.execute(`
            CREATE TABLE IF NOT EXISTS usuario(
                id INT AUTO_INCREMENT PRIMARY KEY,
                googleId VARCHAR(255) UNIQUE,
                email VARCHAR(255),
                nome VARCHAR(255),
            )
            `)
        conn.release()
        console.log("Tabela de usuario criada com sucesso")
    } catch (erro) {
        console.error("Erro ao criar tabela", erro)
    }
}
criarTabela()

// Configurar login com google
passport.use(new Google({
    clientID: process.env.ID,
    clientSecret: process.env.SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    async function (token, refresh, perfil, done) {
        try {
            const conn = await db.getConnection()
            const [rown] = await conn.execute(
                "SELECT * FROM usuario WHERE googleId = ?",
                [perfil.id]
            )
            if (rows.length == 0) {
                await conn.execute(
                    "INSERT INTO usuario (googleId, email, nome)VALUES(?,?,?)",
                    [perfil.id, perfil.emails[0].value, perfil.displayName]
                )
            }
            conn.release()
            return done(null, perfil)
        } catch (erro) {
            return done(erro, null)
        }
    }))

// Salva o usuário
passport.serializeUser((user, done) => {
    done(null, user)
})

// Recuperar o usuário
passport.deserializeUser((user, done) => {
    done(null, user)
})
// Configura arquivos estaticos
app.use(express.static("public"))
// Rotas
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})
// Login com Google
app.get("/auth/google",
    passport.authenticate("google", { scope: ['profile', 'email'] })
)
// Callback do Google
app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        console.log("Autenticado:", req.user)
        res.redirect("/dashboard")
    }
)

// Dashboard
app.get("/dashboard", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/")
    }
    res.sendFile(__dirname + "/public/dashboard.html")
})

// Dados do usuário
app.get("/api/usuario", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ erro: "Não autenticado" })
    }
    req.json(req.user)
})
// Logout
app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/")
    })
})

// Iniciar o servidor
const porta = 3000
app.listen(porta, () => {
    console.log("Servidor rodando em")
    console.log(`http://localhost/${porta}`)
    console.log("Credenciais carregadas com sucesso")
})