var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var usuario = new Schema ({
  nome: {type: String},
  usrnome: {type: String},
  senha: {type: String, min: 6, max: 14},
  dataNascimento: {type: Date}
  // endereco: {type: Endereco}
})

module.exports = mongoose.model('Usuario', usuario);
