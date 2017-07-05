var express = require('express')
var User = require('../modelos/usuario')
var buscaCep = require('busca-cep');
var routes = express.Router()

// GET – Rota para obter todos os usuários (http://localhost:8080/api/users)
routes.get('/users', (req, res) => {
  User.find({}).exec().then(
    users => {
      responder(res, true, "", users)
    }, erro => {
      responder(res, false, "", erro)
    })
})

// GET – Rota para obter um usuário por ID (http://localhost:8080/api/users/:id)
routes.get('/users/:id', (req, res) => {
  User.findById(req.params.id).select('_id nome usrnome genero dataNascimento emailSecundario').exec().then(
    user => {
      if (user) {
        responder(res, true, "", user)
      } else {
        responder(res, false, "Usuário não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Usuário não encontrado.", undefined)
    }) // then
})

// POST – Rota para cadastrar um novo usuário (http://localhost:8080/api/users)
routes.post('/users', (req, res) => {
  var user = new User ({
    nome: req.body.nome,
    usrnome: req.body.usrnome,
    senha: req.body.senha,
    genero: req.body.genero,
    emailSecundario: req.body.emailSecundario,
    dataNascimento: req.body.dataNascimento
  })

  user.save().then(
   () => {
     responder(res, true, "", user)
   }, erro => {
     responder(res, false, "Falha ao cadastrar usuário.", user)
   })
})

// DEL – Rota para remover um usuário por ID (http://localhost:8080/api/users/:id)
routes.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id).select('_id nome usrnome').exec().then(
    user => {
      if (user) {
        responder(res, true, "", user)
      } else {
        responder(res, false, "Usuário não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Usuário não encontrado.", undefined)
    }) // then
})

// GET - Rota para buscar um endereco através do cep (http://localhost:8080/api/:cep)
routes.get('/buscaCEP', (req, res) => {
  buscaCep('59374-000').then(endereco => {
    res.json({cidade: endereco.localidade,
              estado: endereco.uf})
    }, erro => {
      responder(res, false, "", erro)
    })
})

/* função para responder os erros e sucessos
valores padrão passados por parametro */
function responder(res, success=true, message="", result){
  res.json({
    success: success,
    result: result,
    message: message
  })
}

module.exports = routes;
