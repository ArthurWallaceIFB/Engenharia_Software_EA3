const IPedidoDAO = require('./Interfaces/IPedidoDAO');

const mongoose = require('mongoose');
const Pedido = require('../models/Pedido');

class PedidoDAO extends IPedidoDAO {
  constructor() {
    super();
  }

  async buscarPedido(idPedido) {
    let pedido = await Pedido.findOne({ codigo: idPedido }).populate('cliente produtos');

    return pedido;
  }

  async buscarPedidosCliente(CPF) {
    let pedido = await Pedido.find({ CPF: CPF }).populate('cliente produtos');

    return pedido;
  }

  async criarPedido(pedido) {
    const novoPedido = await Pedido.create(pedido);

    return novoPedido;
  }
  
  async atualizarPedido(idPedido, pedido) {
    console.log("Aqui");
    console.log(idPedido, pedido)
    let atualizadoPedido = await Pedido.findOneAndUpdate({ codigo: idPedido }, pedido, { returnDocument: 'after' });

    return atualizadoPedido;
  }

  async deletarPedido(idPedido) {
    let atualizadoPedido = await Pedido.deleteOne({ codigo: idPedido });

    return atualizadoPedido;
  }
}
module.exports = PedidoDAO;