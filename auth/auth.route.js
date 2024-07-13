const express = require("express");
const { loginController, registerController, verifyTokenController } = require("./auth.controller");
const authRouter = express.Router();

authRouter.post('/login', loginController); 
authRouter.post('/register', registerController); 
authRouter.get("/verify-token", verifyTokenController); 

module.exports = { authRouter }