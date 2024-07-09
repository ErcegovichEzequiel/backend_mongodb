const { validacionExistencia } = require("../helpers/validation.helper")
const jwt = require('jsonwebtoken') // libreria para generar el token       

const verifyTokenMiddlewar = (req, res, next) => {
    const token = req.headers['authorization']

    if (!validacionExistencia(token) || !isNaN(token) || token === undefined || token === null) {
        res.status(400).json({ status: 400, ok: false, message: "No autorizado, debe proporcionar un token valido" })
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, datos) => { //valida el token

        if (error) { //si el token es invalido devuelve un error
            res.status(401).json({ status: 401, ok: false, message: "No autorizado, token invalido" })
        }
        else {
            req.user = datos //guarda los datos del usuario en la peticion para usarlos en el controlador
            next()
        }
    })
}


module.exports = { verifyTokenMiddlewar }