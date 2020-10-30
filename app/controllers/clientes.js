const ClienteModelo = require('../models/clientes')

class Cliente {
    async criar(body) {
      try {
        await ClienteModelo.create(body)
        return true;
      } catch (error) {
        console.log("Erro na criação do Cliente: " + error)
        return false;
      }
    }
    async procurar(email, senha) {
      return await ClienteModelo.findOne({ where: { email: email, senha: senha } })
  
    }
    async obterDadosId(id) {
      return await ClienteModelo.findOne({ where: { id: id } })
    }
    
    async atualizar(dados) {
      return await ClienteModelo.update(dados, { where: { id: dados.id } })
    }
  }
  
module.exports = new Cliente()