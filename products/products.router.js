const express = require('express')
const { createProductController, getProductByIdController, deleteProductById, putProduct, getAllProducts } = require('./products.controller')
const productRouter = express.Router()


productRouter.get('/', getAllProducts) // Controlador de obtencion de proyectos.
productRouter.post('/createProduct', createProductController ) // Controlador de creacion de producto. 
productRouter.put('/:pid', putProduct) // Controlador de actualizacion de proyecto.
productRouter.delete('/:pid', deleteProductById) // Controlador de eliminacion de proyecto.
productRouter.get('/:pid', getProductByIdController) // Controlador de obtencion de proyecto por id.


module.exports = {productRouter};