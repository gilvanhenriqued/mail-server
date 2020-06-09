var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var mensagem = new Schema ({
  emissor: {type: String},
  receptor: {type: String},
  titulo: {type: String},
  descricao: {type: String},
//  anexo: {type: String},
  nivelSeguranca: {type: Number, min: 1, max: 3}
})

module.exports = mongoose.model('Mensagem', mensagem);
