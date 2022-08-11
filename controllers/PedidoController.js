const IPedidoController = require('./interfaces/IPedidoController.js');
const config = require('../config.js');

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

    let idCliente = clienteDAO.buscarCliente(req.body.CPFCliente)._id || null;

    let produtos = [];

    if(req.body.itensPedido){
      req.body.itensPedido.map((item) => {
        let produto = produtoDAO.buscarProduto(item);
        if(produto && produto != null){
          produtos.push(produto._id);
        }
      })
    }

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

    const pedido =  await pedidoDAO.criarPedido(dadosPedido);

    return res.json(pedido);
  }
  async atualizarPedido(req, res) {
    let pedido = await pedidoDAO.atualizarPedido(req.params.idPedido, req.body);
    return res.json(pedido);
  }
  async deletarPedido(req, res) {
    let pedido = await pedidoDAO.deletarPedido(req.params.idPedido);
    return res.json(pedido);
  }
}
module.exports = PedidoController;