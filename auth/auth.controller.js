const { validacionExistencia } = require("../helpers/validation.helper")
const { registerService, loginService } = require("./auth.service")
const jwt = require('jsonwebtoken') 

const loginController = async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await loginService({ email, password })
        res.status(200).json({ ok: true, message: "Usuario logueado", token: token })
    }
    catch (error) {
        res.status(error.status).json(error)
    }
}
const registerController = async (req, res) => { 
    const { email, password } = req.body
    try {
        const result = await registerService({ email, password })
        res.status(200).json(result) 
    }
    catch (error) {
        res.status(error.status).json(error)
    }
}
const verifyTokenController = (req, res) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(400).json({ status: 400, ok: false, message: "No autorizado, debe proporcionar un token válido" })
    }
    try {
        const esValido = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!esValido) {
            return res.status(401).json({ status: 401, ok: false, message: "No autorizado, token inválido" })
        }
        return res.status(200).json({ status: 200, ok: true, message: "Token válido, usuario logueado" })
    } catch (error) {
        return res.status(401).json({ status: 401, ok: false, message: "No autorizado, token inválido" })
    }
}

module.exports = { loginController, registerController, verifyTokenController }