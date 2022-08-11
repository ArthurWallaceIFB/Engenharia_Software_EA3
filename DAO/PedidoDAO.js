const IPedidoDAO = require('./Interfaces/IPedidoDAO');

const mongoose = require('mongoose');
const Pedido = require('../models/Pedido');

class PedidoDAO extends IPedidoDAO {
  constructor() {
    super();
  }

  async buscarPedido(idPedido) {
    let pedido = await Pedido.findOne({ codigo: idPedido });

    return pedido;
  }

  async buscarPedidosCliente(CPF) {
    let pedido = await Pedido.findOne({ CPF: CPF });

    return pedido;
  }

  async criarPedido(pedido) {
    const novoPedido = await Pedido.create(pedido);

    return novoPedido;
  }
  
  async atualizarPedido(CPF, pedido) {
    let atualizadoPedido = await Pedido.findOneAndUpdate({ CPF: CPF }, pedido, { returnDocument: 'after' });

    return atualizadoPedido;
  }

  async deletarPedido(pedido) {
    let atualizadoPedido = await Pedido.findOneAndUpdate({ CPF: CPF }, pedido, { returnDocument: 'after' });

    return atualizadoPedido;
  }
}
module.exports = PedidoDAO;