const { buscarUsuarioPorEmail, insertarUsuario, buscarTodosLosUsuarios, eliminarUsuario, actualizarUsuarioPorId, buscarUsuarioPorId } = require("./auth.repository")
const { validacionUsuaruioRegistro, validacionUsuaruioLogin } = require("./utils/validationUser.util")
const bcrypt = require('bcrypt') // libreria para encriptar el password
const jwt = require('jsonwebtoken') // libreria para generar el token

const registerService = async (usuario) => {
    try {
        const { email, password } = usuario 
         validacionUsuaruioRegistro({ email, password, passwordConfirm, edad, nombre, apellido }) 

        const usuarioExistente = await buscarUsuarioPorEmail(usuario.email) 

        if (usuarioExistente) {
            throw { status: 400, message: 'ERROR: Email ya registrado' }
        }

         const passwordHash = await bcrypt.hash(usuario.password, 10) 

        const result = await insertarUsuario({ email: usuario.email, password: passwordHash }) 

        if (result) { 
            return { ok: true, message: 'Se inserto nuevo usuario' }
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

const loginService = async (usuario) => {
    try {
        const { email, password } = usuario
        validacionUsuaruioLogin(email, password)
        const usuarioExistente = await buscarUsuarioPorEmail(usuario.email) 
        if (!usuarioExistente) {
            throw { status: 400, message: 'ERROR: No existe el usuario con ese email' }
        }
        const esCorrecta = await bcrypt.compare(password, usuarioExistente.password)

        if (!esCorrecta) {
            throw { status: 400, message: 'ERROR: Contraseña incorrecta' }
        } 
            const token = jwt.sign({ email, user_id: usuarioExistente.id }, process.env.JWT_SECRET_KEY, { expiresIn: '48h' }) 
            return token
        
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

// servicio que busque todos los usuarios
const buscarTodosLosUsuariosService = async () => {
    try {
        const usuarios = await buscarTodosLosUsuarios()
        if (usuarios.length === 0) {
            throw { status: 404, message: 'No hay usuarios registrados' }
        }
        return { ok: true, status: 200, message: 'Se encontraron: ' + usuarios.length + ' usuarios', usuarios: usuarios }
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }     
    }
}   

const eliminarUsuarioPorId = async (_id) => {
    try {
        const usuario = await buscarUsuarioPorId(_id)
        if (usuario){
            await eliminarUsuario(_id)
            return { ok: true, status: 200 , message: 'Usuario con ID: ' + _id + ' eliminado correctamente' }
        }
        else{
            throw { status: 400, message: 'ERROR: No existe el usuario con ese ID' }
        }
    }
    catch (error) {
        if (error.status) {
            throw error
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }    }
}

const modificarUsuarioPorId = async (_id, nuevosDatos) => {
    try {
        const usuario = await buscarUsuarioPorId(_id)
        if (usuario){
            const result = await actualizarUsuarioPorId(_id, nuevosDatos)
            return { ok: true, status: 200 , message: 'Usuario con ID: ' + _id + ' modificado correctamente' }
        }
        else{
            throw { status: 400, message: 'ERROR: No existe el usuario con ID: ' + _id }
        }
    }
    catch (error) {
        if (error.status) {
            throw error
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }    }
}



module.exports = { registerService, loginService, buscarTodosLosUsuariosService, eliminarUsuarioPorId, modificarUsuarioPorId }
