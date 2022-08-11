const IClienteController = require('./interfaces/IClienteController.js');
const config = require('../config.js');

let ClienteDAO = require('../DAO/' + config.IClienteDAO);
let clienteDAO = new ClienteDAO();

class ClienteController extends IClienteController {
  constructor() {
    super();

  }
  async buscarCliente(req, res) {
    
    let cliente = await clienteDAO.buscarCliente(req.params.CPF);

    return res.json(cliente);

  }
  async criarCliente(req, res) {
    const cliente =  await clienteDAO.criarCliente(req.body);

    return res.json(cliente);
  }
  async atualizarCliente(req, res) {
    let cliente = await clienteDAO.atualizarCliente(req.params.CPF, req.body);
    return res.json(cliente);
  }
}
module.exports = ClienteController;