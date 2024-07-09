const express = require('express')

const { verifyTokenMiddlewar } = require('../auth/auth.middleware')
const { postCartController, getCartController, deleteProductFromCartController } = require('./carts.controller')

const cartsRouter = express.Router()

cartsRouter.get('/', verifyTokenMiddlewar, getCartController)
cartsRouter.post('/', verifyTokenMiddlewar, postCartController)
cartsRouter.delete('/:product_id', verifyTokenMiddlewar, deleteProductFromCartController)


module.exports = { cartsRouter }
