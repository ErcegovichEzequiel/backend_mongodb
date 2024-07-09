const { agregarAlCarritoService, obtenerCarritoService, eliminarProductoDelCarritoService } = require('./carts.service')

const postCartController = async (req, res) => {
    try {
        const { product_id, cantidad } = req.body
        const user = req.user
        const result = await agregarAlCarritoService({ user_id: user.user_id, product_id, cantidad })
        res.status(result.status).json(result)
    }
    catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message })

    }
}

const getCartController = async (req, res) => {
    try {
        const user = req.user
        const result = await obtenerCarritoService(user.user_id)
        res.status(result.status).json(result)
    }
    catch (error) {
        const status = error.status || 500
        res.status(status).json({ error: error.message })
    }
}

const deleteProductFromCartController = async (req, res) => {
    try {
        const { product_id } = req.params
        const user = req.user
        const resultado = await eliminarProductoDelCarritoService(user.user_id, product_id)
        res.status(resultado.status).json(resultado)
    }
    catch (error) {
        const status = error.status || 500
        res.status(status).json({ error: error.message })
    }
}

module.exports = { postCartController, getCartController, deleteProductFromCartController }