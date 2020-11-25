const AnuncioModelo = require('../models/anuncios')
const Firebase = require('../firebase/Firebase')

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
    async listarTodosVenda(){
      return await AnuncioModelo.findAll({where:{
        tipo_anuncio:"Vendo"
      }})
    }
    async listarTodosAluga(){
      return await AnuncioModelo.findAll({where:{
        tipo_anuncio:"Alugo"
      }})
    }
    async atualizarTipoImovel(TImovel,id){
      return await AnuncioModelo.update({tipo_imovel:TImovel},{where:{id:id}})
    }
    async atualizarTipoAnuncio(Item,id){
      return await AnuncioModelo.update({tipo_anuncio:Item},{where:{id:id}})
    }
    async atualizarcep(Item,id){
      return await AnuncioModelo.update({cep:Item},{where:{id:id}})
    }
    async atualizarCidade(Item,id){
      return await AnuncioModelo.update({cidade:Item},{where:{id:id}})
    }
    async atualizarEstado(Item,id){
      return await AnuncioModelo.update({estadoUF:Item},{where:{id:id}})
    }
    async atualizarBairro(Item,id){
      return await AnuncioModelo.update({bairro:Item},{where:{id:id}})
    }
    async atualizarEndereco(Item,id){
      return await AnuncioModelo.update({endereco:Item},{where:{id:id}})
    }
    async atualizarNumero(Item,id){
      return await AnuncioModelo.update({numero:Item},{where:{id:id}})
    }
    async atualizarComplemento(Item,id){
      return await AnuncioModelo.update({complemento:Item},{where:{id:id}})
    }
    async atualizarQuartos(Item,id){
      return await AnuncioModelo.update({quartos:Item},{where:{id:id}})
    }
    async atualizarBanheiros(Item,id){
      return await AnuncioModelo.update({banheiros:Item},{where:{id:id}})
    }
    async atualizarArea(Item,id){
      return await AnuncioModelo.update({arem2:Item},{where:{id:id}})
    }
    async atualizarVagas(Item,id){
      return await AnuncioModelo.update({vagas:Item},{where:{id:id}})
    }
    async atualizarDescricao(Item,id){
      return await AnuncioModelo.update({descricao:Item},{where:{id:id}})
    }
    async atualizarValor(Item,id){
      return await AnuncioModelo.update({valor:Item},{where:{id:id}})
    }
    async atualizarFotoAnuncio(foto_perfil_nome,path,id){
      try {
        const [name, ext] = foto_perfil_nome.split('.')
        foto_perfil_nome = await Firebase.upload_anuncio(String(path), name)
        return await AnuncioModelo.update({ fotoURL: foto_perfil_nome}, { where: { id: id } })
      } catch (error) {
        console.log("Erro atualizarFotoPerfil - ClienteController: " + error)
        return null;
      }
    }
  }
  
module.exports = new Anuncio()