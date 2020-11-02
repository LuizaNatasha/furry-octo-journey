const Sequelize = require("sequelize");
const sequelize = new Sequelize(require("../configs/database"));


const anuncios = sequelize.define('anuncios',{
    idUsuario:{
        type: Sequelize.INTEGER,
        references:{
            model:'clientes',
            key: 'id',
            onDelete: 'cascate',
            onUpdate: 'cascate'
        }
    },
    fotoURL:{
        type: Sequelize.STRING,
        defaultValue: 'https://e3z7c6v7.rocketcdn.me/blog/wp-content/uploads/2019/01/267577-paginas-de-erro-saiba-identificar-e-solucionar-o-problema.jpg'
    },
    tipo_imovel: {
        type: Sequelize.ENUM({
            values: [
                'Apartamento', 'Kitnet','Casa','Chácara','Flat']
          }),
        allowNull: false
    },
    tipo_anuncio: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
    },
    cidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    estadoUF:{
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    numero:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    complemento:{
        type: Sequelize.STRING,
        allowNull: false
    },
    quartos:{
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    banheiros:{
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    vagas:{
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    arem2:{
        type:Sequelize.FLOAT,
        allowNull: false
    },
    descricao:{
        type:Sequelize.TEXT
    },
    valor:{
        type:Sequelize.FLOAT,
        allowNull: false
    },
    iptu:{
        type:Sequelize.FLOAT,
        defaultValue:0
    }

    
    
});

module.exports = anuncios;