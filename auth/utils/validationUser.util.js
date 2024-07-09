const { validacionEmail, validacionExistencia, validacionConfirmacionPassword } = require("../../helpers/validation.helper")


const validacionUsuaruioRegistro = (usuario) => {

    if (!validacionExistencia(usuario.nombre)) { // Valida si el usuario coloco un nombre
        throw { message: 'Debe colocar un nombre', status: 400 }
    }

    if (!validacionExistencia(usuario.apellido)) { // Valida si el usuario coloco un apellido
        throw { message: 'Debe colocar un apellido', status: 400 }
    }

    if (!validacionExistencia(usuario.edad)) { // Valida si el usuario coloco una edad
        throw { message: 'Debe colocar una edad', status: 400 }
    }

    if (usuario.edad < 18) { // Valida si la edad es mayor a 18
        throw { message: 'Debe ser mayor de 18 años', status: 400 }
    }

    if (!validacionExistencia(usuario.email)) { // Valida si el usuario coloco un email
        throw { message: 'Debe colocar un email', status: 400 }
    }

    if (!validacionEmail(usuario.email)) { //Esto se llama exprecion regular, lo encontre como regex. Controla si el email es valido con los signos requeridos (@ y .)
        throw { message: 'Email no valido', status: 400 }
    }

    if (!validacionExistencia(usuario.password)) { // Valida si el usuario coloco un password
        throw { message: 'Debe colocar un password', status: 400 }
    }

    validacionConfirmacionPassword(usuario.password, usuario.passwordConfirm)
}

const validacionUsuaruioLogin = (email, password) => {
    if (!validacionExistencia(email)) { // Valida si el usuario coloco un email
        throw { message: 'Debe colocar un email', status: 400 }
    }

    if (!validacionEmail(email)) { //Esto se llama exprecion regular, lo encontre como regex. Controla si el email es valido con los signos requeridos (@ y .)
        throw { message: 'Email no valido', status: 400 }
    }

    if (!validacionExistencia(password)) { // Valida si el usuario coloco un password
        throw { message: 'Debe colocar un password', status: 400 }
    }
}

module.exports = { validacionUsuaruioRegistro, validacionUsuaruioLogin }

