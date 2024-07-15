const express = require('express')
const { verifyTokenMiddlewar } = require('../auth/auth.middleware')
const { createProductController, getProductByIdController, deleteProductById, putProduct, getAllProducts } = require('./products.controller')
const productRouter = express.Router()

productRouter.get('/', verifyTokenMiddlewar, getAllProducts)
productRouter.post('/createProduct', verifyTokenMiddlewar, createProductController) //    Crear un nuevo producto 
productRouter.put('/:pid', verifyTokenMiddlewar, putProduct) // actualizar un producto por su id
productRouter.delete('/:pid', verifyTokenMiddlewar, deleteProductById) // borrar un producto por su id
productRouter.get('/:pid', verifyTokenMiddlewar, getProductByIdController) // obtener un producto por su id

module.exports = { productRouter };