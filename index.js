var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var config = require('config')
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/usuario')
var router = express.Router()

mongoose.Promise = global.Promise;

app.use(bodyParser.json())

router.use(require('./app/routes/rotas_usuario'))
app.use('/api', router)

var server = app.listen(8080, function(){
  console.log('Example app listening on port 8080!')
  console.log(config.ambiente)
})

app.get('/', function(req, res) {
    res.send('Olá! Seja Bem vindo ao Secret Mail!');
});


module.exports = server;
