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
    }
    
});

module.exports = usuario;