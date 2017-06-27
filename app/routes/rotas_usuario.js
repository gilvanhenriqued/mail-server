var express = require('express')
var User = require('../models/usuario')
var buscaCep = require('busca-cep');
var routes = express.Router()

// rota para retornar todos os usuarios (GET http://localhost:8080/api/users)
routes.get('/users', (req, res) => {
  User.find({}).exec().then(
    users => {
      res.json(users)
    }, erro => {
      res.json({sucess: false, details: erro})
    })
})

// rota para buscar um endereco através do cep
routes.get('/buscaCEP', (req, res) => {
  buscaCep('59374-000').then(endereco => {
    res.json({cidade: endereco.localidade,
              estado: endereco.uf})
    }, erro => {
      res.json({sucess: false, details: erro});
    })
})

// rota para cadastrar um novo usuario (POST http://localhost:8080/api/users)
routes.post('/users', (req, res) => {
  var user = new User ({
    nome: req.body.nome,
    endereco: req.body.endereco,
    email: req.body.email,
    senha: req.body.senha,
    tipoCliente: req.body.tipoCliente
  })

  user.save().then(
   () => {
     res.json({
       success: true,
       result: user
     })
   },
   erro => {
     res.json({
       success: false,
       details: erro,
       result: user
     })
   })
})

module.exports = routes;
