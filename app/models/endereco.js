var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var endereco = new Schema ({
  pais: {type: String},
  cep: {type: String, min: 8, max: 8},
  bairro: {type: String},
  rua: {type: String}
})

module.exports = mongoose.model('Endereco', endereco);
