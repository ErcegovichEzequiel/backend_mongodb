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
const seleccionarProductoPorId = async (pid) => { 
    try {
        const producto = await Product.findById(pid) 
        if (!producto) {
            throw { status: 404, message: 'PRODUCTO CON ID: ' + pid + ' NO ENCONTRADO' } 
        }
        else {
            return producto 
        }
    }
    catch (error) {
        if (error.status === 404) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }
    }
}

const insertarProducto = async ({ titulo, precio, descripcion, stock, codigo }) => { 
    try {
        const nuevoProducto = new Product({ titulo, precio, descripcion, stock, codigo }) 
        await nuevoProducto.save() 
        return nuevoProducto._id 
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN EL SERVIDORrrrrr' } 
    }
}

const eliminarProducto = async (pid) => {
    try {
        const resultado = await Product.findByIdAndDelete(pid)
        if (!resultado) {
            throw { status: 404, message: 'PRODUCTO CON ID: ' + pid + ' NO ENCONTRADO' } 
        }
        else {
            return { ok: true, status: 200, message: 'PRODUCTO CON ID: ' + pid + ' ELIMINADO CORRECTAMENTE' }
        }
    }
    catch (error) {
        if (error.status === 404) {
            throw error
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN EL SERVIDOR' } 
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