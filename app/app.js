const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const session = require('express-session');

const database = new Sequelize(require('./configs/database'));
const clienteController = require('./controllers/clientes');
var app = express();



app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine","ejs");
app.set("views","./views");

app.use(express.static("./public"));

app.use(session({
    secret: 'datacav',
    cookie: { maxAge: 30000000 }
}))




app.post("/", function (req, res) {
    //validar
    res.redirect('/');
})

app.get("/", function (req, res) {
    res.render("inicio");
})

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
        res.redirect('/home')
        console.log('autenticado!')
    } else {
        console.log('Erro de Autenticação')
        res.redirect("/")
    }
    

})

app.get("/cadastro", function (req, res) {
    res.render("cadastro");
})
const rotas = require('./router');
app.use(rotas)


database.authenticate().then(() => {console.log("Database!")})




app.listen(3000,()=>{
    console.log("Server running!")
});