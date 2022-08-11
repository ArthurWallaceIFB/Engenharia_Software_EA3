const express = require('express');
const bodyParser = require('body-parser');
//================================
const mongoose = require('mongoose');
var cors = require('cors');

const IRoutes = require('./IRoutes.js');

const app = express();


const config = require('../config.js');


let IngredienteController = require('../controllers/' + config.IIngredienteController);
let ingredienteController = new IngredienteController();

let ClienteController = require('../controllers/' + config.IClienteController);
let clienteController = new ClienteController();

let ProdutoController = require('../controllers/' + config.IProdutoController);
let produtoController = new ProdutoController();

let PedidoController = require('../controllers/' + config.IPedidoController);
let pedidoController = new PedidoController();

class Routes extends IRoutes {

  constructor() {
    super();
    mongoose.connect('mongodb+srv://ifb:ifb123@cluster0.lsybq6n.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
  } // finaliza construtor

  get() {
    app.get('/', (req, res) => {
      res.send('Rest API com Polimorfismo');
    });

    //Ingrediente
    app.get('/ingrediente/buscar', ingredienteController.buscarIngredientes);


    //Cliente
    app.get('/cliente/buscar/:CPF', clienteController.buscarCliente);


    //Produto
    app.get('/produto/buscar', produtoController.buscarProdutos);


    //Pedido
    app.get('/pedido/buscar/:idPedido', pedidoController.buscarPedido);
    app.get('/pedido/buscarPedidos/:CPFCliente', pedidoController.buscarPedidosCliente);
  }
  post() {
    //Cliente
    app.post('/cliente', clienteController.criarCliente);

    //Cliente
    app.post('/pedido', pedidoController.criarPedido);
  }
  put(){
    app.put('/cliente/:CPF', clienteController.atualizarCliente);

    app.put('/pedido/:idPedido', pedidoController.atualizarPedido);
  }
  delete(){
    app.delete('/pedido/:idPedido', pedidoController.deletarPedido);
  }
  listen() {
    app.listen(3000, () => {
      console.log('server started on port 3000')
      console.log('http://localhost:3000')
    });
  }

}
module.exports = Routes;
