const ClienteModelo = require('../models/clientes')
const Firebase = require('../firebase/Firebase')

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
    async atualizarNome(nome,id){
      return await ClienteModelo.update({nome:nome}, { where: { id: id } })
    }
    async atualizarTelefone(telefone,id){
      return await ClienteModelo.update({telefone:telefone}, { where: { id: id } })
    }
    async atualizarSenha(senha,id){
      return await ClienteModelo.update({senha:senha}, { where: { id: id } })
    }
    async atualizarFoto(foto_nome,path,id){
      try {
        const [name, ext] = foto_nome.split('.')
        foto_nome = await Firebase.upload_anuncio(String(path), name)
        return await ClienteModelo.update({ fotoURL: foto_nome}, { where: { id: id } })
      } catch (error) {
        console.log("Erro atualizarFotoPerfil - ClienteController: " + error)
        return null;
      }
    }
  }
  
module.exports = new Cliente()