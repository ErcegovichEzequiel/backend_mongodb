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

const buscarUsuarioPorId = async (_id) => {
    try {
        const usuario = await User.findById(_id)
        if (!usuario) {
            throw { status: 404, message: 'USUARIO CON ID: ' + _id + ' NO ENCONTRADO' }
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
        }
    }
}

// funcion que elimine usuario por id
const eliminarUsuario = async (_id) => {
    try {
        const usuario = await User.findByIdAndDelete(_id)
        if (!usuario) {
            throw { status: 404, message: 'USUARIO CON ID: ' + _id + ' NO ENCONTRADO' }
        } else{
            return { ok: true, status: 200, message: 'Se elimino el usuario con ID: ' + _id }
        }
    }
    catch (error) {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }
    }

// funcion que actualice usuario por id
const actualizarUsuarioPorId = async (_id, usuario) => {
        try {
            const usuarioActualizado = await User.findByIdAndUpdate(_id, usuario, { new: true })
            if (!usuarioActualizado) {
                throw { status: 404, message: 'USUARIO CON ID: ' + _id + ' NO ENCONTRADO' }
            } 
                return { ok: true, status: 200, message: 'Se actualizo el usuario con ID: ' + _id }            
        }
        catch (error) {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }
    }

    module.exports = { buscarUsuarioPorEmail, insertarUsuario, buscarTodosLosUsuarios, eliminarUsuario, actualizarUsuarioPorId, buscarUsuarioPorId } 
