const IProdutoDAO = require('./Interfaces/IProdutoDAO');

const mongoose = require('mongoose');
const Produto = require('../models/Produto');

class ProdutoDAO extends IProdutoDAO {
  constructor() {
    super();
  }
  async buscarProdutos() {
    let produtos = await Produto.find().populate('ingredientes', 'codigo nome quantidade');
    return produtos;
  }
  async buscarProduto(idProduto) {
    let produtos = await Produto.findOne({ codigo : idProduto });
    return produtos;
  }
}
module.exports = ProdutoDAO;