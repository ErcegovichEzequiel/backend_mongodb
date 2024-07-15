const { validacionEmail, validacionExistencia, validacionConfirmacionPassword } = require("../../helpers/validation.helper")

const validacionUsuaruioRegistro = (usuario) => {

    // if (!validacionExistencia(usuario.nombre)) { 
    //     throw { message: 'Debe colocar un nombre', status: 400 }
    // }

    // if (!validacionExistencia(usuario.apellido)) { 
    //     throw { message: 'Debe colocar un apellido', status: 400 }
    // }

    // if (!validacionExistencia(usuario.edad)) { 
    //     throw { message: 'Debe colocar una edad', status: 400 }
    // }

    // if (usuario.edad < 18) { 
    //     throw { message: 'Debe ser mayor de 18 años', status: 400 }
    // }

    if (!validacionExistencia(usuario.email)) { 
        throw { message: 'Debe colocar un email', status: 400 }
    }

    if (!validacionEmail(usuario.email)) { 
        throw { message: 'Email no valido', status: 400 }
    }

    if (!validacionExistencia(usuario.password)) { 
        throw { message: 'Debe colocar un password', status: 400 }
    }
    // validacionConfirmacionPassword(usuario.password, usuario.passwordConfirm)
}
const validacionUsuaruioLogin = (email, password) => {
    if (!validacionExistencia(email)) { 
        throw { message: 'Debe colocar un email', status: 400 }
    }
    if (!validacionEmail(email)) { 
        throw { message: 'Email no valido', status: 400 }
    }
    if (!validacionExistencia(password)) { 
        throw { message: 'Debe colocar un password', status: 400 }
    }
}

module.exports = { validacionUsuaruioRegistro, validacionUsuaruioLogin }

