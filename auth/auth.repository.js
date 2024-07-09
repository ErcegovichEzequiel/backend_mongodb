// const { query } = require('../config/connectio.sql') // importa la libreria de la base de datos. "query" es una funcion que permite ejecutar consultas en la base de datos.
const { conectionMongoose } = require('../config/conection.mongodb')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})
const User = conectionMongoose.model('Users', userSchema)

const buscarUsuarioPorEmail = async (email) => { //funcion para buscar un usuario por email
    try {
        const usuario = await User.findOne({ email: email }) // Buscar usuario por email en la base de datos, arroja null o el usuario, si es null no existe el usuario
        if (!usuario) {
            return null
        }
        return usuario
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

const insertarUsuario = async (usuario) => { // funcion para insertar un usuario
    try {
        const nuevoUsuario = new User(usuario) // crea un nuevo usuario   
        await nuevoUsuario.save() // ejecuta la consulta en la base de datos, retorna el id del usuario insertado en la base de datos y el status de la insercion.
        return true // retorna true, significa que se inserto el usuario
    }
    catch (error) {
        throw { status: 500, message: "Error papu" } // retorna el error interno en la base de datos
    }
}



module.exports = { buscarUsuarioPorEmail, insertarUsuario } 