const validacionEmail = (email) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
}

const validacionConfirmacionPassword = (password, passwordConfirm) => {
    if (!password || !passwordConfirm) { // Valida si el usuario coloco un password
        throw { message: "Debe completar ambos campos", status: 400 }
    }

    if (password !== passwordConfirm) { // Contraseñas no coinciden
        throw { message: "Las contraseñas no coinciden", status: 400 }
    }

    return true // Contraseñas coinciden
}

const validacionExistencia = (valor) => { //validacion de existencia
    return Boolean(valor) // retorna true o false. Si es true, quiere decir que el valor existe, es decir que el usuario lleno el campo, si es false, el usuario no lleno el campo (el input)
}

const minYmaxCaracteres = (valor, min, max) => { //validacion de minimo y maximo de caracteres.

    return (valor.length >= min && valor.length <= max) // retorna true o false si el valor cumple con las validaciones pasadas por parametros.
}

const tipoDeDato = (valor, tipo) => { //validacion de tipo de dato
    return (typeof valor === tipo) // retorna true o false.
}

module.exports = { validacionEmail, validacionExistencia, validacionConfirmacionPassword, minYmaxCaracteres, tipoDeDato }