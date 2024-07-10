const express = require("express");
const { loginController, registerController, verifyTokenController } = require("./auth.controller");
const authRouter = express.Router();





authRouter.post('/login', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}, loginController); // ruta para el login, recibe el email y el password en el body.

authRouter.post('/register', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}, registerController); // ruta para el registro, recibe el email, el password, el passwordConfirm, la edad, el nombre y el apellido en el body.

authRouter.get("/verify-token", verifyTokenController); // ruta para verificar el token. Recibe el token en el header. El "header" es un objeto que se envia en la peticion.


module.exports = {authRouter}