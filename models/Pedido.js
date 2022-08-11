const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PedidoSchema = new Schema(
    {
        codigo: String,
        dataHora: { type: Date, default: Date.now },
        taxaEntrega: Number,
        desconto: Number,
        valorTotal: Number,
        formaPagamento: String,
        statusPedido: String,
        observacoes: String,
        cliente: { type : mongoose.Schema.Types.ObjectId, ref : 'Cliente' },
        produtos: [{ type : mongoose.Schema.Types.ObjectId, ref : 'Produto' }]
  }
);

module.exports = mongoose.model('Pedido', PedidoSchema);