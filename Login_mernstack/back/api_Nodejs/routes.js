const express = require('express')
const route = express.Router()

const userController = require("./src/controllers/userController.js")

// listar usuários
route.get('/users', userController.getUsers);

// Rota de Cadastro
route.post('/register', userController.register);

// Rota de Login
route.post('/login', userController.login);



module.exports = route