const { validacionExistencia } = require("../helpers/validation.helper")
const { registerService, loginService, buscarTodosLosUsuariosService, eliminarUsuarioPorId, modificarUsuarioPorId } = require("./auth.service")
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

const buscarTodosLosUsuariosController = async (req, res) => {
    try {
        const result = await buscarTodosLosUsuariosService()
        res.status(200).json({ result })
    }
    catch (error) {
        res.status(error.status).json(error)
    }
}

const eliminarUsuaruioPorIdController = async (req, res) => {
    try {
        const {_id}= req.params
        const result = await eliminarUsuarioPorId(_id)
        res.status(200).json({ result })
    }
    catch (error) {
        res.status(error.status).json({error})
    }
}

const modificarUsuarioPorIdController = async (req, res) => {
    try {
        const {_id}= req.params
        const usuario = req.body
        const result = await modificarUsuarioPorId(_id, usuario)
        res.status(200).json({ result })
    }
    catch (error) {
        res.status(error.status).json({error})
    }
}

const verifyTokenController = (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ status: 400, ok: false, message: "No autorizado, debe proporcionar un token válido" });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(400).json({ status: 400, ok: false, message: "No autorizado, debe proporcionar un token válido" });
        }
        const esValido = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!esValido) {
            return res.status(401).json({ status: 401, ok: false, message: "No autorizado, token inválido" });
        }
        return res.status(200).json({ status: 200, ok: true, message: "Token válido, usuario logueado" });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ status: 401, ok: false, message: "Token expirado o inválido" });
        }
        return res.status(401).json({ status: 401, ok: false, message: "No autorizado, token inválido" });
    }
};


module.exports = { loginController, registerController, verifyTokenController, buscarTodosLosUsuariosController, eliminarUsuaruioPorIdController, modificarUsuarioPorIdController }