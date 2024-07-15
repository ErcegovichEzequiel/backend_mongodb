const express = require("express");
const { verifyTokenMiddlewar } = require("./auth.middleware");
const { loginController, registerController, verifyTokenController, buscarTodosLosUsuariosController, eliminarUsuaruioPorIdController, modificarUsuarioPorIdController } = require("./auth.controller");
const authRouter = express.Router();

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);
authRouter.get('/verify-token', verifyTokenController);
authRouter.get('/users', verifyTokenMiddlewar, buscarTodosLosUsuariosController)
authRouter.delete('/:_id', verifyTokenMiddlewar, eliminarUsuaruioPorIdController)
authRouter.put('/:_id', verifyTokenMiddlewar, modificarUsuarioPorIdController)

module.exports = { authRouter }