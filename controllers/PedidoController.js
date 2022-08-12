const IPedidoController = require('./interfaces/IPedidoController.js');
const config = require('../config.js');
const mongoose = require('mongoose');

let PedidoDAO = require('../DAO/' + config.IPedidoDAO);
let pedidoDAO = new PedidoDAO();

let ClienteDAO = require('../DAO/' + config.IClienteDAO);
let clienteDAO = new ClienteDAO();

let ProdutoDAO = require('../DAO/' + config.IProdutoDAO);
let produtoDAO = new ProdutoDAO();

class PedidoController extends IPedidoController {
  constructor() {
    super();

  }
  async buscarPedido(req, res) {

    let pedido = await pedidoDAO.buscarPedido(req.params.idPedido);

    return res.json(pedido);

  }
  async buscarPedidosCliente(req, res) {

    let pedido = await pedidoDAO.buscarPedidosCliente(req.params.CPFCliente);

    return res.json(pedido);

  }
  async criarPedido(req, res) {

    let cliente = await clienteDAO.buscarCliente(req.body.CPFCliente);
    let idCliente = cliente._id;

    let produtos = [];

    if (req.body.itensPedido) {
      await Promise.all(req.body.itensPedido.map(async (item) => {
        let produto = await produtoDAO.buscarProduto(item);
        console.log(produto, "produto");
        if (produto && produto != null) {
          produtos.push(mongoose.mongo.ObjectId(produto._id));
        }
        else {
          console.log("Erro");
          produtos.push("inválido");
        }
      }))
    }

    if (idCliente && produtos.every(element => element != "inválido")) {
      let dadosPedido = {
        "codigo": req.body.codigo,
        "taxaEntrega": req.body.taxaEntrega,
        "desconto": req.body.desconto,
        "valorTotal": req.body.valorTotal,
        "formaPagamento": req.body.formaPagamento,
        "statusPedido": req.body.statusPedido,
        "observacoes": req.body.observacoes,
        "cliente": idCliente,
        "produtos": produtos
      }

      const pedido = await pedidoDAO.criarPedido(dadosPedido);

      return res.json(pedido);

    }
    else {
      return res.status(400).json({ "Error": "Preenchimento inválido" });
    }
  }

  async atualizarPedido(req, res) {
    let cliente = await clienteDAO.buscarCliente(req.body.CPFCliente);
    let idCliente = cliente._id;

    let produtos = [];

    if (req.body.itensPedido) {
      await Promise.all(req.body.itensPedido.map(async (item) => {
        let produto = await produtoDAO.buscarProduto(item);
        console.log(produto, "produto");
        if (produto && produto != null) {
          produtos.push(mongoose.mongo.ObjectId(produto._id));
        }
        else {
          console.log("Erro");
          produtos.push("inválido");
        }
      }))
    }

    if (idCliente && produtos.every(element => element != "inválido")) {
      let dadosPedido = {
        "taxaEntrega": req.body.taxaEntrega,
        "desconto": req.body.desconto,
        "valorTotal": req.body.valorTotal,
        "formaPagamento": req.body.formaPagamento,
        "statusPedido": req.body.statusPedido,
        "observacoes": req.body.observacoes,
        "cliente": idCliente,
        "produtos": produtos
      }

      const pedido = await pedidoDAO.atualizarPedido(req.params.idPedido, dadosPedido);

      return res.json(pedido);

    }
    else {
      return res.status(400).json({ "Error": "Preenchimento inválido" });
    }

  }

  async deletarPedido(req, res) {
    let pedido = await pedidoDAO.deletarPedido(req.params.idPedido);
    return res.json(pedido);
  }
}
module.exports = PedidoController;