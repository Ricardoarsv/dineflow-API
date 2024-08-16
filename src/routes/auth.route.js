const express = require('express')
const AuthController = require('../controllers/auth.controller')

const authRouter = express.Router()

// User routes
authRouter.post('/login', AuthController.signIn)

module.exports = authRouter
