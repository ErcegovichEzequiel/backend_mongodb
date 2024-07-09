const { seleccionarProductoPorId, insertarProducto, eliminarProducto, seleccionarTodosLosProductos, modificarProductoPorId } = require("./products.repository")
const { validacionCargaProducto } = require("./utils/validationProducts.utils")

const createProduct = async (product) => {
    try {
        validacionCargaProducto(product) // valida que los datos sean correctos, se pasa el objeto sin desestructurar para que pueda informar si cargo mas propiedades de las que se piden. Si le paso solo la desestructuracion, no tengo como informar si hay mas propiedades de las solicitadas.
        const resultado = await insertarProducto(product) // inserta el producto en la base de datos
        if (resultado) {
            return { ok: true, message: 'Se inserto nuevo producto', id: resultado._id , producto: product }          
        }
    }
    catch (error) {
        if (error.status) {
            throw error
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }
    }
}

const obtenerProductoPorId = async (pid) => {
    try {
        const producto = await seleccionarProductoPorId(pid) // busca el producto en la base de datos
        return { ok: true, status: 200, producto }
    }
    catch (error) {
        if (error.status) {
            throw error
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }
    }
}

const eliminarProductoPorId = async (pid) => {
    try {
        const producto = await seleccionarProductoPorId(pid) // busca el producto en la base de datos
        if (producto) { // valida si el producto existe
            await eliminarProducto(pid) // espera el resultado de eliminarProducto
            return { ok: true, status: 200, message: 'PRODUCTO CON ID: ' + pid + ' ELIMINADO CORRECTAMENTE' }
        } else {
            throw { status: 404, message: 'Producto no encontrado' }
        }
    } catch (error) {
        if (error.status) {
            throw error
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }
    }
}

const modificarProducto = async (pid, nuevosDatos) => {
    try {
        const producto = await seleccionarProductoPorId(pid);
        if (producto) {
            const resultado = await modificarProductoPorId(pid, nuevosDatos);
            return { ok: true, status: 200, message: 'PRODUCTO CON ID: ' + pid + ' MODIFICADO CORRECTAMENTE', producto: resultado };
        } else {
            throw { status: 404, message: 'PRODUCTO CON ID: ' + pid + ' NO ENCONTRADO' };
        }
    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' };
        }   
    }
}

const buscarProducto = async () => {
    try {
        const productos = await seleccionarTodosLosProductos()
        if (productos.length === 0) {
            throw { status: 404, message: 'PRODUCTOS NO ENCONTRADOS' }
        }
        return { ok: true, status: 200, message: 'PRODUCTOS ENCONTRADOS', productos: productos }

    } catch (error) {
        throw error
    }
}

module.exports = { createProduct, obtenerProductoPorId, eliminarProductoPorId, modificarProducto, buscarProducto }