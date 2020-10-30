const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const session = require('express-session');

const database = new Sequelize(require('./configs/database'));
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

const rotas = require('./router');
app.use(rotas)

database.authenticate().then(() => {console.log("Database!")})




app.listen(3000,()=>{
    console.log("Server running!")
});