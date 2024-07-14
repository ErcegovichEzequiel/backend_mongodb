const express = require("express");
const { loginController, registerController, verifyTokenController, buscarTodosLosUsuariosController } = require("./auth.controller");
const authRouter = express.Router();

authRouter.post('/login', loginController); 
authRouter.post('/register', registerController); 
authRouter.get("/verify-token", verifyTokenController); 
authRouter.get("/users", buscarTodosLosUsuariosController ) // obtener todos los usuarios
authRouter.delete("/_id", ) // eliminar un usuario por id
authRouter.put("/_id", ) // actualizar un usuario por id

module.exports = { authRouter }