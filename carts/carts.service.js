const { obtenerOCrearCarrito, agregarAlCarrito, obtenerCarritoDetallado, eliminarProductoDelCarrito } = require('./carts.repository')


const agregarAlCarritoService = async (datos) => {
    try {
        const { user_id, product_id, cantidad } = datos
        const carrito = await obtenerOCrearCarrito(user_id)
        const carritoId = carrito.id
        await agregarAlCarrito(carritoId, product_id, cantidad)
        return { status: 200, message: 'Producto agregado al carrito' }
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

const obtenerCarritoService = async (user_id) => {
    try {
        const carrito = await obtenerOCrearCarrito(user_id)
        const carritoId = carrito.id
        const carritoDetallado = await obtenerCarritoDetallado(carritoId)
        return { status: 200, message: 'Carrito Obtenido: ', carrito: carritoDetallado }
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

const eliminarProductoDelCarritoService = async (user_id, product_id) => {
    try {
        const carrito = await obtenerOCrearCarrito(user_id)
        await eliminarProductoDelCarrito(carrito.id, product_id)
        const carritoDetallado = await obtenerCarritoDetallado(carrito.id)
        return { status: 200, message: 'Producto eliminado del carrito', carrito: carritoDetallado }
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    } 
}

module.exports = { agregarAlCarritoService, obtenerCarritoService, eliminarProductoDelCarritoService }