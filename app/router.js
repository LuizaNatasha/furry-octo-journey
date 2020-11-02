var express = require("express");
const app = new express.Router();

const clienteController = require('./controllers/clientes');
const produtoController = require('./controllers/anuncios');

app.post("/", function (req, res) {
    //validar
    res.redirect('/');
})

app.get("/anunciar", function (req, res) {
    res.render("anunciar", { id_usuario: req.session.user.id });
})
app.get("/home", function (req, res) {
    res.render("home");
})
app.get("/comprar", async(req, res) =>{
    const itens = await produtoController.listarTodosVenda()
    res.render("comprar",{itens:itens});
})
app.get("/alugar", async(req, res) =>{
    const itens = await produtoController.listarTodosAluga()
    res.render("alugar",{itens:itens});
})
app.get("/perfil", function (req, res) {
    res.render("perfil");
})
app.get("/", function (req, res) {
    res.render("inicio");
})
app.get("/cadastro", function (req, res) {
    res.render("cadastro");
})
app.get('/logout', async(req,res)=>{
    req.session.user = null;
    res.redirect('/')
})

// posts

app.post("/cadastro-usuario", async (req, res) => {
    try {
        await clienteController.criar(req.body)
        console.log('sucesso no cadatro de cliente!')
        res.redirect('/');
    } catch (error) {
        console.log(error)
        res.redirect('/cadastro')
    }
})

app.post('/autenticar', async (req, res) => {
    console.log('autenticando')
    var resposta = undefined;
    resposta = await clienteController.procurar(req.body.email, req.body.senha)
    if (resposta != undefined) {
        req.session.user = {
            id: resposta.id,
            email: req.body.email,
            password: req.body.senha
        }
        console.log(req.session.user)
        res.redirect('/home')
        console.log('autenticado!')
    } else {
        console.log('Erro de Autenticação')
        res.redirect("/")
    }
    

})

app.post("/cadastro-anuncio", async (req, res) => {
    console.log('cadastro')
    try {
        await produtoController.criar(req.body)
        console.log('sucesso na publicação!')
        res.redirect('/home');
    } catch (error) {
        console.log('erro na publicacao')
        res.redirect('/anunciar')
    }
})

module.exports = app