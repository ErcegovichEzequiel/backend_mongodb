const { conectionMongoose } = require('../config/conection.mongodb')
const mongoose = require('mongoose')

// Esquema de la coleccion "carrito_productos" en la base de datos (productos) que une el producto con el carrito. Basicamente enlaza el carrito con el usuario.
const cartItemSchema = new mongoose.Schema({
    product_id: {
        type: conectionMongoose.Schema.Types.ObjectId, // tipo de dato ObjectId de mongoose (esto es una referencia a una coleccion)
        ref: 'products', // nombre de la coleccion en la base de datos (nombre de la coleccion)
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
})

const cartSchema = new mongoose.Schema({
    user_id: {
        type: conectionMongoose.Schema.Types.ObjectId, // tipo de dato ObjectId de mongoose (esto es una referencia a una coleccion)
        ref: 'Users', // nombre de la coleccion en la base de datos (nombre de la coleccion)
        required: true
    },
    items: [
        cartItemSchema // schema de la coleccion "carrito_productos" en la base de datos (productos)
    ]
})

const Cart = conectionMongoose.model('Carts', cartSchema)

const obtenerOCrearCarrito = async (user_id) => {
    try {
        let carrito = await Cart.findOne({ user_id: user_id })
        if (!carrito) {
            carrito = new Cart({ user_id: user_id, items: [] })
            await carrito.save()
        }
        return carrito
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

const agregarAlCarrito = async (cart_id, product_id, cantidad) => {
    try {
        let carrito = await Cart.findById(cart_id) // Buscar carrito por id en la base de datos
        if (!carrito) { // Si no existe el carrito en la base de datos devuelve un error
            throw { status: 404, message: 'CARRITO NO ENCONTRADO' }
        }
        const itemIndex = carrito.items.findIndex((item) => {
            return item.product_id.equals(product_id) // Comparar el id del producto con el id del producto en el carrito
        })
        if (itemIndex === -1) { // Si el item no existe en el carrito agrega el item al carrito
            carrito.items.push({ product_id: product_id, cantidad: cantidad })
        }
        else {
            carrito.items[itemIndex].cantidad += cantidad // Si el item ya existe en el carrito incrementa la cantidad
        }
        await carrito.save() // Guardar el carrito en la base de datos
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

const obtenerCarritoDetallado = async (cart_id) => {
    try {
        const carrito = await Cart.findById(cart_id).populate('items.product_id')
        if (!carrito) {
            throw { status: 404, message: 'CARRITO NO ENCONTRADO' }
        }
        return carrito
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

const eliminarProductoDelCarrito = async (cart_id, product_id) => {
    try {
        const carrito = await Cart.findById(cart_id);
        if (!carrito) {
            throw { status: 404, message: 'CARRITO NO ENCONTRADO' };
        }
        carrito.items = carrito.items.filter((item) => !item.product_id.equals(product_id));
        await carrito.save();
    } catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' };
    }
};


module.exports = { obtenerOCrearCarrito, agregarAlCarrito, obtenerCarritoDetallado, eliminarProductoDelCarrito }