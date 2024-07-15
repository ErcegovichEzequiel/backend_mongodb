const express = require('express')

const { verifyTokenMiddlewar } = require('../auth/auth.middleware')
const { postCartController, getCartController, deleteProductFromCartController, deleteAllProductsFromCartController } = require('./carts.controller')

const cartsRouter = express.Router()

cartsRouter.get('/',verifyTokenMiddlewar, getCartController) // obtener todos los productos del carrito
cartsRouter.post('/agregarAlCart', verifyTokenMiddlewar, postCartController) // Agregar un producto al carrito 
cartsRouter.delete('/:product_id', verifyTokenMiddlewar, deleteProductFromCartController) // borra borrar un producto por su id



module.exports = { cartsRouter }
