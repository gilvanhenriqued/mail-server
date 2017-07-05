var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var usuario = new Schema ({
  nome: {type: String},
  usrnome: {type: String},
  senha: {type: String},
	genero: {type: String},
	emailSecundario: {type: String},
  dataNascimento: {type: Date}
  // endereco: {type: Endereco}
})

module.exports = mongoose.model('Usuario', usuario);
