var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var config = require('config')
var morgan = require('morgan')
var mongoose = require('mongoose')
var router = express.Router()

mongoose.Promise = global.Promise;

app.use(bodyParser.json())

app.set('superSecret', config.secret); // variavel secreta de autenticação

router.use(require('./src/routes/rotas_autenticacao'))
router.use(require('./src/routes/rotas_usuario'))
router.use(require('./src/routes/rotas_mensagem'))

// app.use(express.static(__dirname + '/frontEnd'))
app.use('/api', router)

mongoose.connect(config.database,{
  useMongoClient: true
});

var server = app.listen(8080, function(){
  console.log('E-mail executando na porta 8080!')
  console.log(config.ambiente)
})

// configurações da autenticação com token

// jwt - criar, assinar, e verificar tokens
var jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// usado para requisições de log no console
app.use(morgan('dev'));

module.exports = server;
