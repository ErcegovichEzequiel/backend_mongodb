const { conectionMongoose } = require('../config/conection.mongodb')
const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    codigo: {
        type: String,
        required: true
    }
})

const Product = conectionMongoose.model('products', productSchema)
const seleccionarProductoPorId = async (pid) => { //funcion para buscar un producto por id
    try {
        const producto = await Product.findById(pid) // busca el proyecto en la base de datos
        if (!producto) {// valida si hay resultados 
            throw { status: 404, message: 'PRODUCTO CON ID: ' + pid + ' NO ENCONTRADO' } // retorna el error de proyecto no encontrado en la base de datos
        }
        else {
            return producto // retorna el producto encontrado
        }
    }
    catch (error) {
        if (error.status === 404) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }// retorna el error interno en la base de datos
    }
}

const insertarProducto = async ({ titulo, precio, descripcion, stock, codigo }) => { //funcion para insertar un producto
    try {
        const nuevoProducto = new Product({ titulo, precio, descripcion, stock, codigo }) // crea un nuevo producto
        await nuevoProducto.save() // ejecuta la consulta en la base de datos, retorna el id del producto insertado en la base de datos y el status de la insercion.
        return nuevoProducto._id // retorna el id del proyecto insertado
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN EL SERVIDORrrrrr' } // retorna el error interno en la base de datos
    }
}

const eliminarProducto = async (pid) => {
    try {
        const resultado = await Product.findByIdAndDelete(pid)
        if (!resultado) {
            throw { status: 404, message: 'PRODUCTO CON ID: ' + pid + ' NO ENCONTRADO' } // retorna el error de proyecto no encontrado en la base de datos
        }
        else {
            return { ok: true, status: 200, message: 'PRODUCTO CON ID: ' + pid + ' ELIMINADO CORRECTAMENTE' }
        }
    }
    catch (error) {
        if (error.status === 404) {
            throw error
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN EL SERVIDOR' } // retorna el error interno en la base de datos
        }
    }
}

const seleccionarTodosLosProductos = async () => {
    try {
        const productos = await Product.find({})
        return productos
    }
    catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }
    }
}

const modificarProductoPorId = async (pid, nuevosDatos) => {
    try {
        const resultado = await Product.findByIdAndUpdate(pid, nuevosDatos, { new: true });
        if (!resultado) {
            throw { status: 404, message: 'PRODUCTO CON ID: ' + pid + ' NO ENCONTRADO' };
        }
        return resultado;
    } catch (error) {
        if (error.status === 404) {
            throw error;
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN EL SERVIDOR' };
        }
    }
}



module.exports = { seleccionarProductoPorId, modificarProductoPorId, insertarProducto, eliminarProducto, seleccionarTodosLosProductos }