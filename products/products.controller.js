const { createProduct, obtenerProductoPorId, eliminarProductoPorId, modificarProducto, buscarProducto } = require("./products.service")

const createProductController = async (req, res) => { 
    const product = req.body 
    try {
        const result = await createProduct(product) 
        res.status(201).json({ result }) 
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}

const getProductByIdController = async (req, res) => { 
    try {
        const { pid } = req.params 
        const result = await obtenerProductoPorId(pid) 
        res.status(200).json({ result }) 
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}

const deleteProductById = async (req, res) => { 
    try {
        const { pid } = req.params 
        const result = await eliminarProductoPorId(pid) 
        res.status(200).json({ result }) 
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}

const putProduct = async (req, res) => {
    try {
        const { pid } = req.params 
        const product = req.body 
        const result = await modificarProducto(pid, product)
        res.status(200).json({ result })
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const result = await buscarProducto()
        res.status(200).json({ result })
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}


module.exports = { createProductController, getProductByIdController, deleteProductById, putProduct, getAllProducts }