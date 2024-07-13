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

const buscarUsuarioPorEmail = async (email) => { 
    try {
        const usuario = await User.findOne({ email: email }) 
        if (!usuario) {
            return null
        }
        return usuario
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

const insertarUsuario = async (usuario) => { 
    try {
        const nuevoUsuario = new User(usuario)   
        await nuevoUsuario.save() 
        return true 
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' } 
    }
}

module.exports = { buscarUsuarioPorEmail, insertarUsuario } 