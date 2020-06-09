var express = require('express')
var Mensagem = require('../models/mensagem')
var routes = express.Router()

// GET – Rota para obter todas as mensagens (http://localhost:8080/api/mensagens)
routes.get('/mensagens', (req, res) => {
  Mensagem.find({}).exec().then(
    mensagens => {
      res.json(mensagens)
      responder(res, true, "", mensagens)
    }, erro => {
      responder(res, false, "", erro)
    })
})

// GET – Rota para obter uma mensagem por ID (http://localhost:8080/api/mensagens/:id)
routes.get('/mensagens/:id', (req, res) => {
  Mensagem.findById(req.params.id).select('emissor receptor titulo descricao nivelSeguranca').exec().then(
    mensagem => {
      if (mensagem) {
        responder(res, true, "", mensagem)
      } else {
        responder(res, false, "Mensagem não encontrada.", undefined)
      }
    }, erro => {
        responder(res, false, "Mensagem não encontrada.", undefined)
    })
})

// POST – Rota para criar uma nova mensagem (http://localhost:8080/api/mensagens)
routes.post('/mensagens', (req, res) => {
  var mensagem = new Mensagem ({
    emissor: req.body.emissor,
    receptor: req.body.receptor,
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    nivelSeguranca: req.body.nivelSeguranca
  })

  mensagem.save().then(
   () => {
     responder(res, true, "", mensagem)
   }, erro => {
     responder(res, false, "Falha ao criar mensagem.", mensagem)
   })
})

// DEL – Rota para remover uma mensagem por ID (http://localhost:8080/api/mensagens/:id)
routes.delete('/mensagens/:id', (req, res) => {
  Mensagem.findByIdAndRemove(req.params.id).select('_id titulo receptor').exec().then(
    mensagem => {
      if (mensagem) {
        responder(res, true, "", mensagem)
      } else {
        responder(res, false, "Mensagem não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Mensagem não encontrado.", undefined)
    })
})

// POST – Rota para enviar uma nova mensagem (http://localhost:8080/api/mensagens)

// POST – Rota para agendar uma nova mensagem (http://localhost:8080/api/mensagens)

/* função para responder os erros e sucessos
valores padrão passados por parametro */
function responder(res, sucesso=true, mensagem="", resultado){
  res.json({
    sucesso: sucesso,
    resultado: resultado,
    mensagem: mensagem
  })
}

module.exports = routes;
