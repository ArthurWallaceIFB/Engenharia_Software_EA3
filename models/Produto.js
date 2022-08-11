const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProdutoSchema = new Schema(
    {
        codigo: String,
        nome: String,
        categoria: String,
        valor: Number,
        tamanho: String,
        ingredientes: [{ type : mongoose.Schema.Types.ObjectId, ref : 'Ingrediente' }]
  }
);

module.exports = mongoose.model('Produto', ProdutoSchema);