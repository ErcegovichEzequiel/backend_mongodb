const { validacionExistencia } = require("../helpers/validation.helper");
const jwt = require('jsonwebtoken');

const verifyTokenMiddlewar = (req, res, next) => {
    const token = req.headers['authorization'];
    validacionExistencia(token)
    if (token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, datos) => {
            if (error) {
                console.error("Error en verifyTokenMiddlewar:", error);
                return res.status(401).json({ status: 401, ok: false, message: "No autorizado, token invalido" });
            } else {
                req.user = datos;
                next();
            }
        });
    } else {
        return res.status(400).json({ status: 400, ok: false, message: "No autorizado, debe proporcionar un token valido" });
    }
}
module.exports = { verifyTokenMiddlewar };
