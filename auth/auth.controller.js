// const { validacionExistencia } = require("../helpers/validation.helper")
// const { registerService, loginService } = require("./auth.service")
// const jwt = require('jsonwebtoken') // libreria para generar el token

// const loginController = async (req, res) => {
//     const { email, password } = req.body
//     try {
//         const token = await loginService({ email, password })
//         res.status(200).json({ ok: true, message: "Usuario logueado", token: token })
//     }
//     catch (error) {
//         res.status(error.status).json(error)
//     }
// }

// const registerController = async (req, res) => { // Controlador de registro de usuario
//     const { email, password } = req.body
//     try {
//         const result = await registerService({ email, password })
//         res.status(200).json(result) //responde con el resultado, el resultado es un objeto con el ok y el message que viene del servicio de registro en el auth.service
//     }
//     catch (error) {
//         res.status(error.status).json(error)
//     }
// }


// const verifyTokenController = (req, res) => {
//     const token = req.headers['authorization']
//     if (!validacionExistencia(token) || !isNaN(token) || token === undefined || token === null) {
//         res.status(400).json({ status: 400, ok: false, message: "No autorizado, debe proporcionar un token valido" })
//     }
//     const esValido = jwt.verify(token, process.env.JWT_SECRET_KEY)
//     if (!esValido) {
//         res.status(401).json({ status: 401, ok: false, message: "No autorizado, token invalido" })
//     }
//     else {
//         res.status(200).json({ status: 200, ok: true, message: "Token valido, usuario logueado" })
//     }
// }


// module.exports = { loginController, registerController, verifyTokenController }


const { validacionExistencia } = require("../helpers/validation.helper");
const { registerService, loginService } = require("./auth.service");
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await loginService({ email, password });
        res.status(200).json({ ok: true, message: "Usuario logueado", token: token });
    } catch (error) {
        console.error("Error en loginController:", error);
        res.status(error.status || 500).json(error);
    }
}

const registerController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await registerService({ email, password });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error en registerController:", error);
        res.status(error.status || 500).json(error);
    }
}

const verifyTokenController = (req, res) => {
    const token = req.headers['authorization'];
    if (!validacionExistencia(token) || !isNaN(token) || token === undefined || token === null) {
        return res.status(400).json({ status: 400, ok: false, message: "No autorizado, debe proporcionar un token valido" });
    }
    try {
        const esValido = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!esValido) {
            return res.status(401).json({ status: 401, ok: false, message: "No autorizado, token invalido" });
        } else {
            return res.status(200).json({ status: 200, ok: true, message: "Token valido, usuario logueado" });
        }
    } catch (error) {
        console.error("Error en verifyTokenController:", error);
        return res.status(500).json({ status: 500, ok: false, message: "Error interno del servidor" });
    }
}

module.exports = { loginController, registerController, verifyTokenController };
