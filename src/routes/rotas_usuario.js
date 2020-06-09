var express = require('express')
var Usuario = require('../models/usuario')
var buscaCep = require('busca-cep');
var routes = express.Router()

// GET – Rota para obter todos os usuários (http://localhost:8080/api/usuarios)
routes.get('/usuarios', (req, res) => {
  Usuario.find({}).exec().then(
    usuarios => {
      responder(res, true, "", usuarios)
    }, erro => {
      responder(res, false, "", erro)
    })
})

// GET – Rota para obter um usuário por ID (http://localhost:8080/api/usuarios/:id)
routes.get('/usuarios/:id', (req, res) => {
  Usuario.findById(req.params.id).select('_id nome usrnome cpf genero dataNascimento emailSecundario').exec().then(
    usuario => {
      if (usuario) {
        responder(res, true, "", Usuario)
      } else {
        responder(res, false, "Usuário não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Usuário não encontrado.", undefined)
    })
})

// POST – Rota para cadastrar um novo usuário (http://localhost:8080/api/usuarios)
routes.post('/usuarios', (req, res) => {
  var usuario = new Usuario ({
    nome: req.body.nome,
    usrnome: req.body.usrnome,
    cpf: req.body.cpf,
    senha: req.body.senha,
    genero: req.body.genero,
    emailSecundario: req.body.emailSecundario,
    dataNascimento: req.body.dataNascimento
  })

  Usuario.save().then(
   () => {
     responder(res, true, "", usuario)
   }, erro => {
     responder(res, false, "Falha ao cadastrar usuário.", usuario)
   })
})

// DEL – Rota para remover um usuário por ID (http://localhost:8080/api/usuarios/:id)
routes.delete('/usuarios/:id', (req, res) => {
  Usuario.findByIdAndRemove(req.params.id).select('_id nome usrnome').exec().then(
    usuario => {
      if (usuario) {
        responder(res, true, "", usuario)
      } else {
        responder(res, false, "Usuário não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Usuário não encontrado.", undefined)
    })
})

// GET - Rota para buscar um endereco através do cep (http://localhost:8080/api/:cep)
// routes.get('/buscaCEP', (req, res) => {
//   buscaCep('59374-000').then(endereco => {
//     res.json({cidade: endereco.localidade,
//               estado: endereco.uf})
//     }, erro => {
//       responder(res, false, "", erro)
//     })
// })

/* função para responder os erros e sucessos
valores padrão passados por parametro */
function responder(res, sucesso=true, message="", resultado){
  res.json({
    sucesso: sucesso,
    resultado: resultado,
    message: message
  })
}

module.exports = routes;
