var express = require("express");
const app = new express.Router();

const produtoController = require('../controllers/anuncios');
const anuncioModelo = require('../models/anuncios')
const clienteModelo = require('../models/clientes')
const clienteController = require('../controllers/clientes')

const multer = require('multer');
const uploadConfig = require('../configs/multer');
const upload = multer(uploadConfig);

const Firebase = require('../firebase/Firebase');
const { upload_anuncio } = require("../firebase/Firebase");


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
app.get("/perfil", async (req, res) =>{
    clienteModelo.findOne({where:{id:req.session.user.id}}).then((cliente)=>{
        res.render("perfil",{user:cliente});
    }).catch((err)=>{
        res.redirect('/')
    })
    
})
app.get("/meus-anuncios", async (req, res) =>{
    anuncioModelo.findAll({where:{idUsuario:req.session.user.id}}).then((item)=>{
        res.render("meus_anuncios",{itens:item});
    }).catch((err)=>{
        res.redirect('/')
    })
    
})
app.get("/meu-anuncio-ver/:id", async(req,res)=>{
    anuncioModelo.findOne({where:{id:req.params.id,idUsuario:req.session.user.id}}).then((item)=>{
        res.render("meu_anuncio_ver",{item:item})
    }).catch(()=>{
        res.rendirect("/")
    })
})
app.get("/anuncio-ver/:id", async(req,res)=>{
    anuncioModelo.findOne({where:{id:req.params.id}}).then((item)=>{
        clienteModelo.findOne({where:{id:item.idUsuario},attributes:['nome','email','telefone']}).then((anunciante)=>{
            res.render("ver_anuncio",{item:item,anunciante:anunciante})
        })
        
    }).catch(()=>{
        res.rendirect("/")
    })
})
app.get('/logout', async(req,res)=>{
    req.session.user = null;
    res.redirect('/')
})
app.post("/cadastro-anuncio",upload.single('filename'), async (req, res) => {
    try {
        var { filename: img_filename } = req.file;
        var path = req.file.path;
        img_filename = String(img_filename)
        const [name, ext] = img_filename.split('.')
        img_filename = await Firebase.upload_anuncio(String(path), name)
        anuncioModelo.create(req.body).then((produto)=>{
            anuncioModelo.update({ fotoURL: img_filename }, { where: { id: produto.id } })
            console.log('sucesso na publicação!')
        }).catch((err)=>{
            console.log('ERRO: '+ err)
        })
        
        res.redirect('/home');
    } catch (error) {
        console.log('erro na publicacao')
        res.redirect('/anunciar')
    }
})
app.get('/editar-nome', async (req, res) => {
    const nome = await clienteModelo.findOne({where:{id:req.session.user.id},attributes:['nome']})
    res.render('editar/nome',{nome:nome.nome})
})
app.get('/editar-telefone', async (req, res) => {
    const telefone = await clienteModelo.findOne({where:{id:req.session.user.id},attributes:['telefone']})
    res.render('editar/telefone',{telefone:telefone.telefone})
})
app.get('/editar-senha', async (req, res) => {
    res.render('editar/senha')
})
app.post('/editar-nome', async (req, res) => {
    try {
        clienteController.atualizarNome(req.body.nome,req.session.user.id).then(()=>{
            console.log('nome editado!')
        }).catch(()=>{
            console.log('nome não editado!')
        })
        res.redirect('/perfil');
    } catch (error) {
        console.log('erro na edicao')
        res.redirect('/perfil')
    }
})
app.post('/editar-telefone', async (req, res) => {
    try {
        clienteController.atualizarTelefone(req.body.telefone,req.session.user.id).then(()=>{
            console.log('telefone editado!')
        }).catch(()=>{
            console.log('telefone não editado!')
        })
        res.redirect('/perfil');
    } catch (error) {
        console.log('erro na edicao')
        res.redirect('/perfil')
    }
})
app.post('/editar-senha', async (req, res) => {
    try {
        if(req.body.senha_antiga == req.session.user.password){
            clienteController.atualizarSenha(req.body.senha_nova,req.session.user.id).then(()=>{
                console.log('senha editado!')
            }).catch(()=>{
                console.log('senha não editado!')
            })
        }else{
            console.log('senha errado')
        }
        
        res.redirect('/perfil');
    } catch (error) {
        console.log('erro na edicao')
        res.redirect('/perfil')
    }
})
app.get('/editar-tipo-imovel-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['tipo_imovel']}).then((anuncio)=>{
        res.render('editar/anuncio/tipo_imovel',{item:anuncio.tipo_imovel,id:req.params.id})
    })
})
app.get('/editar-tipo-anuncio-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['tipo_anuncio']}).then((anuncio)=>{
        res.render('editar/anuncio/tipo_anuncio',{item:anuncio.tipo_anuncio,id:req.params.id})
    })
})
app.get('/editar-arem2-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['arem2']}).then((anuncio)=>{
        res.render('editar/anuncio/arem2',{item:anuncio.arem2,id:req.params.id})
    })
})
app.get('/editar-bairro-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['bairro']}).then((anuncio)=>{
        res.render('editar/anuncio/bairro',{item:anuncio.bairro,id:req.params.id})
    })
})
app.get('/editar-banheiros-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['banheiros']}).then((anuncio)=>{
        res.render('editar/anuncio/banheiros',{item:anuncio.banheiros,id:req.params.id})
    })
})
app.get('/editar-cep-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['cep']}).then((anuncio)=>{
        res.render('editar/anuncio/cep',{item:anuncio.cep,id:req.params.id})
    })
})
app.get('/editar-cidade-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['cidade']}).then((anuncio)=>{
        res.render('editar/anuncio/cidade',{item:anuncio.cidade,id:req.params.id})
    })
})
app.get('/editar-complemento-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['complemento']}).then((anuncio)=>{
        res.render('editar/anuncio/complemento',{item:anuncio.complemento,id:req.params.id})
    })
})
app.get('/editar-descricao-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['descricao']}).then((anuncio)=>{
        res.render('editar/anuncio/descricao',{item:anuncio.descricao,id:req.params.id})
    })
})
app.get('/editar-endereco-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['endereco']}).then((anuncio)=>{
        res.render('editar/anuncio/endereco',{item:anuncio.endereco,id:req.params.id})
    })
})
app.get('/editar-estado-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['estadoUF']}).then((anuncio)=>{
        res.render('editar/anuncio/estado',{item:anuncio.estadoUF,id:req.params.id})
    })
})
app.get('/editar-numero-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['numero']}).then((anuncio)=>{
        res.render('editar/anuncio/numero',{item:anuncio.numero,id:req.params.id})
    })
})
app.get('/editar-quartos-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['quartos']}).then((anuncio)=>{
        res.render('editar/anuncio/quartos',{item:anuncio.quartos,id:req.params.id})
    })
})
app.get('/editar-vagas-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['vagas']}).then((anuncio)=>{
        res.render('editar/anuncio/vagas',{item:anuncio.vagas,id:req.params.id})
    })
})
app.get('/editar-valor-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{idUsuario:req.session.user.id,id:req.params.id},attributes:['valor']}).then((anuncio)=>{
        res.render('editar/anuncio/valor',{item:anuncio.valor,id:req.params.id})
    })
})
app.get('/editar-foto-perfil',async(req,res)=>{

    clienteModelo.findOne({where:{id:req.session.user.id},attributes:['fotoURL']}).then((cliente)=>{
        res.render('editar/foto',{foto:cliente.fotoURL})
    })
})
app.get('/editar-foto-anuncio/:id',async(req,res)=>{
    anuncioModelo.findOne({where:{id:req.params.id},attributes:['fotoURL']}).then((anuncio)=>{
        res.render('editar/anuncio/foto',{foto:anuncio.fotoURL,id:req.params.id})
    }).catch((e)=>{
        console.log(e)
    })
})
app.post('/editar-foto-perfil',upload.single('filename'),async(req,res)=>{
    try {
        var { filename: img_filename } = req.file;
        console.log(img_filename + req.file.path)
        clienteController.atualizarFoto(img_filename,String(req.file.path),req.session.user.id).then(()=>{
            res.redirect('/perfil')
        }).catch(()=>{
            res.redirect('/')
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-foto-anuncio',upload.single('filename'),async(req,res)=>{
    try {
        var { filename: img_filename } = req.file;
        console.log(img_filename)
        produtoController.atualizarFotoAnuncio(img_filename,req.file.path,req.body.id).then(()=>{
            res.redirect('/meus-anuncios')
        }).catch(()=>{
            res.redirect('/meus-anuncios')
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-tipo-imovel-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarTipoImovel(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-tipo-anuncio-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarTipoAnuncio(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-arem2-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarArea(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-bairro-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarBairro(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-banheiros-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarBanheiros(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-cep-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarcep(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-cidade-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarCidade(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-complemento-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarComplemento(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-descricao-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarDescricao(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-endereco-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarEndereco(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-estado-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarEstado(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-numero-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarNumero(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-quartos-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarQuartos(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-vagas-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarVagas(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/editar-valor-anuncio',async(req,res)=>{
    try {
        await produtoController.atualizarValor(req.body.item,req.body.id)
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
app.post('/excluir-anuncio',async(req,res)=>{
    try {
        await anuncioModelo.destroy({
            where:{
              id:req.body.id
            }
        })
        res.redirect('/meus-anuncios')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = app