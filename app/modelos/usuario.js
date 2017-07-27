var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var usuario = new Schema ({
  nome: {type: String, require: "Defina seu nome", maxlength: 9},
  usrnome: {type: String, unique: true},
	cpf: {type: String, minlength: 14},
  senha: {type: String, minlength: 8},
	genero: {type: String},
	emailSecundario: {type: String},
  dataNascimento: {type: Date}
  // endereco: {type: Endereco}
})

module.exports = mongoose.model('Usuario', usuario);
