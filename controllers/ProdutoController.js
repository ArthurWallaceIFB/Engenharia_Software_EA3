const IProdutoController = require('./interfaces/IProdutoController.js');
const config = require('../config.js');

let ProdutoDAO = require('../DAO/' + config.IProdutoDAO);
let ingredienteDAO = new ProdutoDAO();

class ProdutoController extends IProdutoController {
  constructor() {
    super();

  }
  async buscarProdutos(req, res) {
    let produtos = await ingredienteDAO.buscarProdutos();
    return res.json(produtos);
  }
}
module.exports = ProdutoController;