const { createProduct, obtenerProductoPorId, eliminarProductoPorId, modificarProducto, buscarProducto } = require("./products.service")

const createProductController = async (req, res) => { // Controlador de creacion de producto.
    const product = req.body // Trae el producto del body. El body de la peticion tiene email, password, passwordConfirm, edad, nombre, apellido, que trajo del front.
    try {
        const result = await createProduct(product) // llamada al servicio de creacion de producto en el service de products y retorna el objeto creado.
        res.status(201).json({ result }) // responde con el objeto creado en el controlador de creacion de producto.
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}

const getProductByIdController = async (req, res) => { // Controlador de obtencion de producto por id.
    try {
        const { pid } = req.params // Trae el id del body. El "params" es un objeto que se envia en la peticion. Se coloca en el url. Ej. http://localhost:8080/api/products/:pid el ":pid" es un marcador de posicion, en este caso el id, por ejemplo si queremos traer el producto con el id 1, el ":pid" va a ser 1.
        const result = await obtenerProductoPorId(pid) // llamada al servicio de creacion de producto en el service de projects y retorna el objeto creado.
        res.status(200).json({ result }) // responde con el objeto creado en el controlador de creacion de producto.
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}

const deleteProductById = async (req, res) => { // Controlador de eliminacion de producto por id.
    try {
        const { pid } = req.params // tomo de los param el numero de id.
        const result = await eliminarProductoPorId(pid) // elimina el producto
        res.status(200).json({ result }) // responde con el objeto creado en el controlador de creacion de producto.
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}

const putProduct = async (req, res) => {// Controlador de modificacion de producto por id.
    try {
        const { pid } = req.params // tomo de los param el numero de id.
        const product = req.body // Trae el producto del body.
        const result = await modificarProducto(pid, product)
        res.status(200).json({ result })
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}

const getAllProducts = async (req, res) => {// Controlador de obtencion de todos los Productos.
    try {
        const result = await buscarProducto()
        res.status(200).json({ result })
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}


module.exports = { createProductController, getProductByIdController, deleteProductById, putProduct, getAllProducts }