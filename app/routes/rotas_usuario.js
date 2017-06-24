var express = require('express')
var User = require('../models/usuario')
var buscaCep = require('busca-cep');
var routes = express.Router()

// rota para retornar todos os usuarios (GET http://localhost:8080/api/users)
routes.get('/users', (req, res) => {
  User.find({}).select('_id nome usrnome').exec().then(
    users => {
      res.json({message: "Usuários do Secret Mail."})
    }, erro => {
      res.json({message: "erro"})
    })
})

// metodo para buscar um endereco através do cep
buscaCep('59374-000')
  .then(endereco => {
    console.log(endereco.localidade);
    console.log(endereco.uf);
  })
  .catch(erro => {
    console.log('Erro: statusCode ${erro.statusCode} e mensagem ${erro.message}');
  });

module.exports = routes;
