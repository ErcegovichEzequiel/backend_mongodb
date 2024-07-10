// const { buscarUsuarioPorEmail, insertarUsuario } = require("./auth.repository")
// const { validacionUsuaruioRegistro, validacionUsuaruioLogin } = require("./utils/validationUser.util")
// const bcrypt = require('bcrypt') // libreria para encriptar el password
// const jwt = require('jsonwebtoken') // libreria para generar el token

// const registerService = async (usuario) => {
//     try {
//         const { email, password } = usuario //desestructuracion de usuario
//         // validacionUsuaruioRegistro({ email, password, passwordConfirm, edad, nombre, apellido }) //validacion del usuario, la validacion se hace en el helper de la carpeta utils y lo que hace es retornar un error si el usuario no cumple con las validaciones

//         const usuarioExistente = await buscarUsuarioPorEmail(usuario.email) // Buscar usuario por email en la base de datos, arroja null o el usuario, si es null no existe el usuario

//         if (usuarioExistente) {
//             throw { status: 400, message: 'ERROR: Email ya registrado' }
//         }

//          const passwordHash = await bcrypt.hash(usuario.password, 10) // encriptar el password

//         const result = await insertarUsuario({ email: usuario.email, password: passwordHash }) // insertar el usuario en la base de datos

//         if (result) { // valida si se inserto el usuario
//             return { ok: true, message: 'Se inserto nuevo usuario' }
//         }
//     }
//     catch (error) {
//         if (error.status) {
//             throw error
//         } else {
//             throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
//         }
//     }
// }

// const loginService = async (usuario) => {
//     try {
//         const { email, password } = usuario
//         validacionUsuaruioLogin(email, password)
//         const usuarioExistente = await buscarUsuarioPorEmail(usuario.email) //arroja null o el usuario
//         if (!usuarioExistente) {
//             throw { status: 400, message: 'ERROR: No existe el usuario con ese email' }
//         }
//         const esCorrecta = await bcrypt.compare(password, usuarioExistente.password)

//         if (!esCorrecta) {
//             throw { status: 400, message: 'ERROR: Contraseña incorrecta' }
//         } else {
//             const token = jwt.sign({ email, user_id: usuarioExistente.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }) //genera el token para el usuario logueado
//             return token
//         }
//     }
//     catch (error) {
//         if (error.status) {
//             throw error
//         }
//         else {
//             throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
//         }
//     }
// }

// module.exports = { registerService, loginService }

const { buscarUsuarioPorEmail, insertarUsuario } = require("./auth.repository");
const { validacionUsuaruioRegistro, validacionUsuaruioLogin } = require("./utils/validationUser.util");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerService = async (usuario) => {
    try {
        const { email, password } = usuario;
        const usuarioExistente = await buscarUsuarioPorEmail(usuario.email);

        if (usuarioExistente) {
            throw { status: 400, message: 'ERROR: Email ya registrado' };
        }

        const passwordHash = await bcrypt.hash(usuario.password, 10);
        const result = await insertarUsuario({ email: usuario.email, password: passwordHash });

        if (result) {
            return { ok: true, message: 'Se inserto nuevo usuario' };
        }
    } catch (error) {
        console.error("Error en registerService:", error);
        if (error.status) {
            throw error;
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' };
        }
    }
}

const loginService = async (usuario) => {
    try {
        const { email, password } = usuario;
        validacionUsuaruioLogin(email, password);
        const usuarioExistente = await buscarUsuarioPorEmail(usuario.email);

        if (!usuarioExistente) {
            throw { status: 400, message: 'ERROR: No existe el usuario con ese email' };
        }

        const esCorrecta = await bcrypt.compare(password, usuarioExistente.password);

        if (!esCorrecta) {
            throw { status: 400, message: 'ERROR: Contraseña incorrecta' };
        } else {
            const token = jwt.sign({ email, user_id: usuarioExistente.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            return token;
        }
    } catch (error) {
        console.error("Error en loginService:", error);
        if (error.status) {
            throw error;
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' };
        }
    }
}

module.exports = { registerService, loginService };
