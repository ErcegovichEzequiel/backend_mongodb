const express = require("express");
const { loginController, registerController, verifyTokenController } = require("./auth.controller");
const authRouter = express.Router();





authRouter.post("/login", loginController); // ruta para el login, recibe el email y el password en el body.

authRouter.post("/register", registerController); // ruta para el registro, recibe el email, el password, el passwordConfirm, la edad, el nombre y el apellido en el body.

authRouter.get("/verify-token", verifyTokenController); // ruta para verificar el token. Recibe el token en el header. El "header" es un objeto que se envia en la peticion.


module.exports = {authRouter}