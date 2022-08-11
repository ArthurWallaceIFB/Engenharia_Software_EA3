const IIngredienteDAO = require('./Interfaces/IIngredienteDAO');

const mongoose = require('mongoose');
const Ingrediente = require('../models/Ingrediente');

class IngredienteDAO extends IIngredienteDAO{
  constructor(){
    super();
  }
  async buscarIngredientes(req, res)
    {
        let ingredientes = await Ingrediente.find();
        return ingredientes;
    }
}
module.exports = IngredienteDAO;