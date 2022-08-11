const IClienteDAO = require('./Interfaces/IClienteDAO');

const mongoose = require('mongoose');
const Cliente = require('../models/Cliente');

class ClienteDAO extends IClienteDAO {
  constructor() {
    super();
  }

  async buscarCliente(CPF) {
    let cliente = await Cliente.findOne({ CPF: CPF });

    return cliente;
  }

  async criarCliente(cliente) {
    const novoCliente = await Cliente.create(cliente);

    return novoCliente;
  }
  
  async atualizarCliente(CPF, cliente) {
    let atualizadoCliente = await Cliente.findOneAndUpdate({ CPF: CPF }, cliente, { returnDocument: 'after' });

    return atualizadoCliente;
  }
}
module.exports = ClienteDAO;