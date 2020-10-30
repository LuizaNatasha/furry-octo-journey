const AnuncioModelo = require('../models/anuncios')

class Anuncio {
    async criar(body) {
      try {
        await AnuncioModelo.create(body)
        return true;
      } catch (error) {
        console.log("Erro na criação do Anuncio: " + error)
        return false;
      }
    }
    async obterDadosId(id) {
      return await AnuncioModelo.findOne({ where: { id: id } })
    }
    
    async atualizar(dados) {
      return await AnuncioModelo.update(dados, { where: { id: dados.id } })
    }
  }
  
module.exports = new Anuncio()