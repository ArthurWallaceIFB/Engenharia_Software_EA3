const IIngredienteController = require('./interfaces/IIngredienteController.js');
const config = require('../config.js');

let IngredienteDAO = require('../DAO/' + config.IIngredienteDAO);
let ingredienteDAO = new IngredienteDAO();

class IngredienteController extends IIngredienteController{
  constructor(){
    super();
       
  }
  async buscarIngredientes(req, res)
    {
        let ingredientes = await ingredienteDAO.buscarIngredientes();
        return res.json(ingredientes);
    }
}
module.exports = IngredienteController;