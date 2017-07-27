var express = require('express')
var app = express()
var Usuario = require('../modelos/usuario')
var config = require('config')
var jwt = require('jsonwebtoken')
var routes = express.Router()

// POST - Rota de autenticação com token (POST http://localhost:3000/api/autenticar)
routes.post('/autenticar', function(req, res) {
  Usuario.findOne({
    usrnome: req.body.usrnome
  }, function(erro, usuario) {
        if (erro) throw erro;
    if (!usuario) {
      res.json({ sucesso: false, mensagem: 'Falha na autenticação. Usuário não encontrado.' });
    } else if (usuario) {
      // check if password matches
      if (usuario.senha != req.body.senha) {
        res.json({ sucesso: false, mensagem: 'Falha na autenticação. Senha incorreta.' });
      } else {
        // if usuario is found and password is right
        // create a token
        var token = jwt.sign(usuario._id, config.secret, {
          expiresIn: '1d' // expires in 24 hours
        });
        // return the information including token as JSON
        res.json({
          sucesso: true,
          mensagem: 'Aproveite seu token!',
          token: token
        });
      }
    }
  });
});

// Rota middleware para verificar o token
routes.use(function(req, res, next) {
  // obtendo o token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verificando secret
    jwt.verify(token, config.secret, function(erro, decoded) {
      if (erro) {
        return res.json({ sucesso: false, mensagem: 'Falha ao autenticar o token.' });
      } else {
        // se tudo ocorrer certo, salva a requisição para usar em outras rotas
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // se não retornar um token
    return res.status(403).send({
        sucesso: false,
        mensagem: 'Token não fornecido.'
    });

  }
});

// route para mostrar uma mensagem inicial (GET http://localhost:3000/api/)
routes.get('/', function(req, res) {
  res.json({ mensagem: 'Bem vindo ao Coworking :D !' });
});

module.exports = routes;
