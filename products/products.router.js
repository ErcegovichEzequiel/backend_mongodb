const express = require('express')
const { createProductController, getProductByIdController, deleteProductById, putProduct, getAllProducts } = require('./products.controller')
const productRouter = express.Router()

productRouter.get('/', getAllProducts) 
productRouter.post('/createProduct', createProductController ) 
productRouter.put('/:pid', putProduct) 
productRouter.delete('/:pid', deleteProductById) 
productRouter.get('/:pid', getProductByIdController) 

module.exports = {productRouter};