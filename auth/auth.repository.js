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

// funcion que busque todos los usuarios
const buscarTodosLosUsuarios = async () => {
    try {
        const usuarios = await User.find({})
        return usuarios
    }
    catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }    }
}

// funcion que elimine usuario por id
const eliminarUsuarioPorId = async (id) => {
    try {
        const usuario = await User.findByIdAndDelete(id)
        return usuario
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

// funcion que actualice usuario por id
const actualizarUsuarioPorId = async (id, usuario) => {
    try {
        const usuarioActualizado = await User.findByIdAndUpdate(id, usuario)
        return usuarioActualizado
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

module.exports = { buscarUsuarioPorEmail, insertarUsuario, buscarTodosLosUsuarios, eliminarUsuarioPorId, actualizarUsuarioPorId } 
