const Sequelize = require("sequelize");
const sequelize = new Sequelize(require("../configs/database"));


const usuario = sequelize.define('clientes',{
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        defaultValue : "NÃO INSERIDO"
    },
    fotoURL:{
        type: Sequelize.STRING,
        defaultValue : 'https://e3z7c6v7.rocketcdn.me/blog/wp-content/uploads/2019/01/267577-paginas-de-erro-saiba-identificar-e-solucionar-o-problema.jpg'
    }
    
});

module.exports = usuario;